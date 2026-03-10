"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const THEMES = [
  { id: "warm", name: "Warm", color: "bg-stone-400" },
  { id: "cool", name: "Cool", color: "bg-slate-400" },
  { id: "sage", name: "Sage", color: "bg-emerald-400" },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("warm");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "warm";
    setTheme(savedTheme);
    if (savedTheme !== "warm") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "warm") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:bg-[rgb(var(--secondary))] transition-colors shadow-sm"
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl shadow-lg z-50 p-2">
            <div className="text-xs font-semibold text-[rgb(var(--muted-foreground))] px-3 py-2">
              Theme
            </div>
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  theme === t.id
                    ? "bg-[rgb(var(--secondary))] text-[rgb(var(--foreground))]"
                    : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--secondary))]"
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${t.color}`} />
                <span className="text-sm font-medium">{t.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
