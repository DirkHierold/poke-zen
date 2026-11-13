import { useCallback, useEffect, useRef, useState } from "react"

import { DEX_IDS, EVOLUTION_FROM } from "@/lib/pokemon"
import {
  SESSION_SECONDS,
  addCaught,
  clearCaught,
  getCaught,
  getLatest,
  getReward,
  getSoulState,
  setReward,
  setSoulState,
  type SoulState,
} from "@/lib/storage"

export function isEligible(id: number, caught: number[]) {
  const prereq = EVOLUTION_FROM[id]
  return prereq === undefined || caught.includes(prereq)
}

function pickRewardId(caught: number[]) {
  const uncaught = DEX_IDS.filter((id) => !caught.includes(id))
  const eligible = uncaught.filter((id) => isEligible(id, caught))
  const pool = eligible.length
    ? eligible
    : uncaught.length
      ? uncaught
      : DEX_IDS
  return pool[Math.floor(Math.random() * pool.length)]
}

function celebrateInEco() {
  try {
    navigator.vibrate?.([120, 60, 120])
  } catch {
    /* unsupported */
  }
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = ctx.currentTime
    osc.type = "sine"
    osc.frequency.setValueAtTime(880, t)
    osc.frequency.exponentialRampToValueAtTime(1320, t + 0.18)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(t + 0.4)
  } catch {
    /* audio unavailable */
  }
}

type Init = { game: SoulState; reward: number | null }

// A session that was RUNNING/ECO/FAILED on load means the page was left: show the fail screen until dismissed.
function readInit(): Init {
  const saved = getSoulState()
  const reward = getReward()
  if ((saved === "RUNNING" || saved === "ECO" || saved === "FAILED") && reward) {
    return { game: "FAILED", reward }
  }
  return { game: "IDLE", reward: null }
}

export function usePokeZen() {
  const [init] = useState(readInit)
  const [game, setGame] = useState<SoulState>(init.game)
  const [rewardId, setRewardId] = useState<number | null>(init.reward)
  const [viewId, setViewId] = useState<number | null>(null)
  const [seconds, setSeconds] = useState(SESSION_SECONDS)
  const [dim, setDim] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [caught, setCaught] = useState(getCaught)
  const [latest, setLatest] = useState(getLatest)

  const gameRef = useRef(game)

  // Persist the failure outside the initializer (StrictMode runs it twice).
  useEffect(() => {
    if (init.game === "FAILED") setSoulState("FAILED")
  }, [init])
  const lastTime = useRef(Date.now())
  const wakeLock = useRef<WakeLockSentinel | null>(null)

  const update = useCallback((next: SoulState) => {
    gameRef.current = next
    setGame(next)
    setSoulState(next)
  }, [])

  const releaseWakeLock = () => {
    wakeLock.current?.release().catch(() => {})
    wakeLock.current = null
  }

  const fail = useCallback(() => {
    update("FAILED")
    setDim(false)
    setLeaving(false)
    releaseWakeLock()
  }, [update])

  const start = useCallback(async () => {
    if (gameRef.current !== "IDLE") return
    const list = getCaught()
    if (DEX_IDS.every((id) => list.includes(id))) {
      gameRef.current = "RESET_PROMPT"
      setGame("RESET_PROMPT")
      return
    }
    const id = pickRewardId(list)
    setReward(id)
    setRewardId(id)
    setSeconds(SESSION_SECONDS)
    lastTime.current = Date.now()
    update("RUNNING")
    try {
      wakeLock.current = (await navigator.wakeLock?.request("screen")) ?? null
    } catch {
      /* wake lock denied */
    }
  }, [update])

  const requestLeave = useCallback(() => {
    if (gameRef.current === "ECO") {
      setDim(false)
      lastTime.current = Date.now()
      update("RUNNING")
    }
    setLeaving(true)
  }, [update])
  const cancelLeave = useCallback(() => setLeaving(false), [])

  const view = useCallback((id: number) => {
    if (gameRef.current !== "IDLE") return
    gameRef.current = "VIEW"
    setViewId(id)
    setGame("VIEW")
  }, [])

  const close = useCallback(() => {
    update("IDLE")
    setReward(null)
    setRewardId(null)
    setViewId(null)
    setDim(false)
    setLeaving(false)
    setCaught(getCaught())
    setLatest(getLatest())
  }, [update])

  const reset = useCallback(() => {
    clearCaught()
    close()
  }, [close])

  const succeed = useCallback(
    (id: number, wasDim: boolean) => {
      update("SUCCESS")
      addCaught(id)
      setCaught(getCaught())
      setLatest(id)
      setDim(false)
      setLeaving(false)
      if (wasDim) celebrateInEco()
      releaseWakeLock()
    },
    [update]
  )

  const running = game === "RUNNING" || game === "ECO"

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      const now = Date.now()
      const passed = now - lastTime.current
      lastTime.current = now
      if (passed > 4000) {
        fail()
        return
      }
      setSeconds((s) => s - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [running, fail])

  useEffect(() => {
    if (running && seconds <= 0 && rewardId) succeed(rewardId, dim)
  }, [running, seconds, rewardId, dim, succeed])

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden" && running) fail()
    }
    document.addEventListener("visibilitychange", onHide)
    return () => document.removeEventListener("visibilitychange", onHide)
  }, [running, fail])

  const tap = useCallback(() => {
    switch (gameRef.current) {
      case "RUNNING":
        if (leaving) return
        setDim(true)
        update("ECO")
        break
      case "ECO":
        if (leaving) return
        setDim(false)
        lastTime.current = Date.now()
        update("RUNNING")
        break
    }
  }, [leaving, update])

  return {
    game,
    rewardId,
    viewId,
    seconds,
    dim,
    leaving,
    caught,
    latest,
    start,
    view,
    tap,
    reset,
    close,
    requestLeave,
    cancelLeave,
    fail,
  }
}
