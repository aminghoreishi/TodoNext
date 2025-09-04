import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

function useToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return ["light", () => {}, false];
  }

  return [theme, setTheme , mounted];
}

export default useToggleTheme;
