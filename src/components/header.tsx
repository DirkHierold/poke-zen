import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const options = [
    { value: "light", icon: Sun, label: "Hell" },
    { value: "dark", icon: Moon, label: "Dunkel" },
  ] as const
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={0}
      value={theme}
      onValueChange={(value) => value && setTheme(value as typeof theme)}
      aria-label="Theme"
    >
      {options.map(({ value, icon: Icon, label }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          className="size-11"
        >
          <Icon className="size-5" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export function Header() {
  return (
    <header className="flex shrink-0 items-center justify-between gap-3 px-4 pb-2">
      <div className="flex items-center gap-2">
        <img src={`${import.meta.env.BASE_URL}pokezen-icon.png`} alt="" className="size-8 rounded-md" />
        <h1 className="text-xl font-semibold">PokeZen</h1>
      </div>
      <ThemeToggle />
    </header>
  )
}
