import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ui/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center"
    >
      {/* Sun */}
      <Sun
        className={`absolute w-10 h-10 transition-all duration-500 ${
          theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
        }`}
      />
      {/* Moon */}
      <Moon
        className={`absolute w-5 h-5 transition-all duration-500 ${
          theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
