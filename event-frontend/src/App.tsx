
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "@/components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
    </ThemeProvider>
  );
}

export default App;
