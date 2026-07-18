import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("foodexpress-theme") || "light");
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("foodexpress-theme", theme); }, [theme]);
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((value) => value === "dark" ? "light" : "dark") }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
