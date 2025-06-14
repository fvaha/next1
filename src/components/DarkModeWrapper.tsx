"use client";
import React, { useState, useEffect, createContext, useContext } from "react";

// Context for dark mode state and toggle
const DarkModeContext = createContext<{
  dark: boolean;
  toggleDark: () => void;
}>({
  dark: true,
  toggleDark: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export default function DarkModeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(true);

  // Load theme on mount, set <html> class
  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("darkMode") : null;
    const isDark = saved
      ? JSON.parse(saved)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update theme when changed
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(dark));
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [dark]);

  const toggleDark = () => setDark((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}
