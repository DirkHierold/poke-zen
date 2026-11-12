import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { label } from "@/components/pokedex-grid"
import { type SoulState } from "@/lib/storage"
import { cn } from "@/lib/utils"

type Props = {
  game: SoulState
  dim: boolean
  leaving: boolean
  rewardId: number | null
  viewId: number | null
  seconds: number
  onTap: () => void
  onReset: () => void
  onLeave: () => void
  onStay: () => void
  onFlee: () => void
  onClose: () => void
}

function PokeballOutline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="white"
      strokeWidth="5"
      strokeLinecap="round"
      className={className}
    >
      <circle cx="50" cy="50" r="44" />
      <path d="M6 50h27M67 50h27" />
      <circle cx="50" cy="50" r="17" />
      <circle cx="50" cy="50" r="7" />
      <rect x="80" y="43" width="8" height="14" rx="2" strokeWidth="3" />
    </svg>
  )
}

const fmt = (s: number) =>
  `${String(Math.floor(Math.max(s, 0) / 60)).padStart(2, "0")}:${String(Math.max(s, 0) % 60).padStart(2, "0")}`

export function SessionOverlay({
  game,
  dim,
  leaving,
  rewardId,
  viewId,
  seconds,
  onTap,
  onReset,
  onLeave,
  onStay,
  onFlee,
  onClose,
}: Props) {
  const failed = game === "FAILED"
  const view = game === "VIEW"
  const success = game === "SUCCESS"
  const prompt = game === "RESET_PROMPT"
  const id = game === "VIEW" ? viewId : rewardId
  const showMon = (failed || success || view) && id
  const src = showMon
    ? failed
      ? `${import.meta.env.BASE_URL}showdown/back/${id}.gif`
      : `${import.meta.env.BASE_URL}showdown/${id}.gif`
    : `${import.meta.env.BASE_URL}poke-ball.png`
  const running = game === "RUNNING" || game === "ECO"
  const tone = failed
    ? "text-destructive"
    : success
      ? "text-success"
      : view
        ? "text-muted-foreground"
        : "text-foreground"

  const message = failed
    ? "Das Pokemon ist geflohen!"
    : success
      ? "Du hast ein neues Pokemon gefangen!"
      : null

  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation()
    fn()
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center",
        // OLED eco mode: pure black regardless of theme
        dim ? "bg-black" : "bg-background"
      )}
    >
      {!dim && (
        <div className="w-full max-w-3xl pt-[max(env(safe-area-inset-top),0.75rem)]">
          <Header />
        </div>
      )}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-4">
        <div
          className={cn(
            "flex size-40 items-center justify-center rounded-4xl border-4 bg-card transition-all duration-400",
            failed
              ? "border-destructive"
              : success
                ? "border-success"
                : view
                  ? "border-border"
                  : "border-primary",
            dim && "scale-45 border-transparent bg-transparent"
          )}
        >
          {dim ? (
            <PokeballOutline className="size-1/2 animate-wiggle" />
          ) : (
            <img
              src={src}
              alt=""
              className={cn(
                "size-4/5 object-contain",
                !showMon && "size-1/2",
                game === "RUNNING" && "animate-wiggle"
              )}
            />
          )}
        </div>
        <div className={cn("flex flex-col items-center gap-2", dim && "opacity-0")}>
          <p className={cn("min-h-6 text-lg font-medium", tone)}>
            {showMon ? label(id!) : ""}
          </p>
          {message && <p className={cn("text-center text-sm", tone)}>{message}</p>}
          {!prompt && game !== "VIEW" && (
            <p className={cn("text-4xl font-semibold tabular-nums", tone)}>
              {fmt(seconds)}
            </p>
          )}
          {running && leaving && (
            <p className="max-w-64 text-center text-sm text-destructive">
              Wenn du zurückgehst, flieht das Pokémon!
            </p>
          )}
        </div>
      </div>
      <footer
        className={cn(
          "flex w-full max-w-3xl shrink-0 gap-2 border-t p-4 pb-[max(env(safe-area-inset-bottom),1rem)]",
          dim && "border-white/30 [&_button]:border-white/40 [&_button]:bg-transparent [&_button]:text-white"
        )}
      >
        {game === "ECO" && (
          <Button size="lg" variant="outline" className="w-full" onClick={stop(onTap)}>
            Zurück
          </Button>
        )}
        {game === "RUNNING" && !leaving && (
          <>
            <Button size="lg" variant="outline" className="flex-1" onClick={stop(onLeave)}>
              Zurück
            </Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={stop(onTap)}>
              Zen
            </Button>
          </>
        )}
        {running && leaving && (
          <>
            <Button size="lg" className="flex-1" onClick={stop(onStay)}>
              Weiter fangen
            </Button>
            <Button size="lg" variant="destructive" className="flex-1" onClick={stop(onFlee)}>
              Fliehen lassen
            </Button>
          </>
        )}
        {prompt && (
          <Button size="lg" variant="destructive" className="flex-1" onClick={stop(onReset)}>
            Reset?
          </Button>
        )}
        {!running && (
          <Button size="lg" variant="outline" className="flex-1" onClick={stop(onClose)}>
            Zurück
          </Button>
        )}
      </footer>
    </div>
  )
}
