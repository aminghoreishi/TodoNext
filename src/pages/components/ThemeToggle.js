// components/ThemeToggle.js
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
    type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      Toggle {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
