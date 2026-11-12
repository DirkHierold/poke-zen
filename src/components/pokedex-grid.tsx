import { Card } from "@/components/ui/card"
import { isEligible } from "@/hooks/use-pokezen"
import { DEX_IDS, POKEMON_NAMES } from "@/lib/pokemon"
import { cn } from "@/lib/utils"

export const label = (id: number) => `#${id} ${POKEMON_NAMES[id] ?? "???"}`

export function PokedexGrid({
  caught,
  latest,
  onView,
}: {
  caught: number[]
  latest: number | null
  onView: (id: number) => void
}) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
      {DEX_IDS.map((id) => {
        const isCaught = caught.includes(id)
        const locked = !isCaught && !isEligible(id, caught)
        return (
          <button
            key={id}
            type="button"
            disabled={!isCaught}
            onClick={() => onView(id)}
            className="flex min-w-0 flex-col items-center gap-1 disabled:cursor-default"
          >
            <Card
              className={cn(
                "aspect-square w-full items-center justify-center p-0",
                id === latest && "border-success ring-2 ring-success/50"
              )}
            >
              <img
                src={isCaught ? `${import.meta.env.BASE_URL}showdown/${id}.gif` : `${import.meta.env.BASE_URL}poke-ball.png`}
                alt={isCaught ? label(id) : "Pokéball"}
                loading="lazy"
                className={cn(
                  "object-contain",
                  isCaught ? "size-4/5" : "size-1/2",
                  locked && "opacity-35 grayscale"
                )}
              />
            </Card>
            <span
              className={cn(
                "w-full truncate text-center text-[10px] text-muted-foreground",
                locked && "opacity-40"
              )}
            >
              {label(id)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
