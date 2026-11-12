import { Button } from "@/components/ui/button"
import { label } from "@/components/pokedex-grid"
import { type SoulState } from "@/lib/storage"
import { cn } from "@/lib/utils"

type Props = {
  game: SoulState
  dim: boolean
  rewardId: number | null
  viewId: number | null
  seconds: number
  onTap: () => void
  onReset: () => void
}

const fmt = (s: number) =>
  `${String(Math.floor(Math.max(s, 0) / 60)).padStart(2, "0")}:${String(Math.max(s, 0) % 60).padStart(2, "0")}`

export function SessionOverlay({
  game,
  dim,
  rewardId,
  viewId,
  seconds,
  onTap,
  onReset,
}: Props) {
  const failed = game === "FAILED"
  const success = game === "SUCCESS" || game === "VIEW"
  const prompt = game === "RESET_PROMPT"
  const id = game === "VIEW" ? viewId : rewardId
  const showMon = (failed || success) && id
  const src = showMon
    ? failed
      ? `${import.meta.env.BASE_URL}showdown/back/${id}.gif`
      : `${import.meta.env.BASE_URL}showdown/${id}.gif`
    : `${import.meta.env.BASE_URL}poke-ball.png`
  const tone = failed
    ? "text-destructive"
    : success
      ? "text-success"
      : "text-foreground"

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onTap}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onTap()}
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 backdrop-blur-sm",
        // OLED eco mode: pure black regardless of theme
        dim ? "bg-black backdrop-blur-none" : "bg-background/85"
      )}
    >
      <div
        className={cn(
          "flex size-40 items-center justify-center rounded-4xl border-4 bg-card transition-all duration-400",
          failed ? "border-destructive" : success ? "border-success" : "border-primary",
          dim && "scale-45 border-transparent bg-transparent"
        )}
      >
        <img
          src={src}
          alt=""
          className={cn(
            "size-4/5 object-contain",
            !showMon && "size-1/2",
            game === "RUNNING" && "animate-wiggle",
            dim && "brightness-0 invert"
          )}
        />
      </div>
      <div className={cn("flex flex-col items-center gap-2", dim && "opacity-0")}>
        <p className={cn("min-h-6 text-lg font-medium", tone)}>
          {showMon ? label(id!) : ""}
        </p>
        {!prompt && game !== "VIEW" && (
          <p className={cn("text-4xl font-semibold tabular-nums", tone)}>
            {fmt(seconds)}
          </p>
        )}
        {prompt && (
          <Button
            size="lg"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              onReset()
            }}
          >
            Reset?
          </Button>
        )}
      </div>
    </div>
  )
}
