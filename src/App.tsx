import { Header } from "@/components/header"
import { PokedexGrid } from "@/components/pokedex-grid"
import { SessionOverlay } from "@/components/session-overlay"
import { Button } from "@/components/ui/button"
import { usePokeZen } from "@/hooks/use-pokezen"
import { useThemeColorMeta } from "@/hooks/use-theme-color-meta"

export function App() {
  useThemeColorMeta()
  const zen = usePokeZen()
  const overlay = zen.game !== "IDLE"

  return (
    <div className="h-dvh w-full overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col pt-[max(env(safe-area-inset-top),0.75rem)]">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-2">
          <PokedexGrid caught={zen.caught} latest={zen.latest} onView={zen.view} />
        </main>
        <footer className="shrink-0 border-t p-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
          <Button size="lg" className="w-full" onClick={zen.start}>
            Ausbrüten
          </Button>
        </footer>
      </div>
      {overlay && (
        <SessionOverlay
          game={zen.game}
          dim={zen.dim}
          rewardId={zen.rewardId}
          viewId={zen.viewId}
          seconds={zen.seconds}
          onTap={zen.tap}
          onReset={zen.reset}
        />
      )}
    </div>
  )
}

export default App
