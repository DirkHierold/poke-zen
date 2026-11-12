export type SoulState =
  | "IDLE"
  | "RUNNING"
  | "ECO"
  | "SUCCESS"
  | "FAILED"
  | "RESET_PROMPT"
  | "VIEW"

export const SESSION_SECONDS = 25 * 60

const KEYS = {
  state: "soul_state",
  reward: "current_reward_id",
  caught: "caught_ids",
  latest: "latest_catch_id",
} as const

export function getCaught(): number[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.caught) ?? "[]") || []
  } catch {
    return []
  }
}

export function addCaught(id: number) {
  const list = getCaught()
  if (!list.includes(id)) {
    list.push(id)
    localStorage.setItem(KEYS.caught, JSON.stringify(list))
  }
  localStorage.setItem(KEYS.latest, String(id))
}

export function getLatest(): number | null {
  const v = parseInt(localStorage.getItem(KEYS.latest) ?? "")
  return Number.isNaN(v) ? null : v
}

export function clearCaught() {
  localStorage.removeItem(KEYS.caught)
  localStorage.removeItem(KEYS.latest)
}

export function setSoulState(state: SoulState) {
  localStorage.setItem(KEYS.state, state)
}

export function getSoulState() {
  return localStorage.getItem(KEYS.state)
}

export function setReward(id: number | null) {
  if (id === null) localStorage.removeItem(KEYS.reward)
  else localStorage.setItem(KEYS.reward, String(id))
}

export function getReward(): number | null {
  const v = parseInt(localStorage.getItem(KEYS.reward) ?? "")
  return Number.isNaN(v) ? null : v
}
