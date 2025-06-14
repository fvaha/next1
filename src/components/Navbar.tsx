"use client";
import React, { useState, useRef, useEffect } from "react";
import { TbSun, TbMoon, TbMenu2 } from "react-icons/tb";
import { useDarkMode } from "./DarkModeWrapper";
import { useLang } from "./LanguageContext";

/* ---------- helper: true after first client render ---------- */
function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

const Navbar: React.FC = () => {
  const mounted = useMounted();
  const { dark, toggleDark } = useDarkMode();
  const { lang, setLang, t, languages } = useLang();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangDesktop, setShowLangDesktop] = useState(false);
  const [showLangMobile, setShowLangMobile] = useState(false);

  /* close desktop lang dropdown on outside click */
  const desktopLangRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (
        desktopLangRef.current &&
        !desktopLangRef.current.contains(e.target as Node)
      ) {
        setShowLangDesktop(false);
      }
    };
    if (showLangDesktop) window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, [showLangDesktop]);

  /* close mobile lang dropdown on outside click */
  const mobileLangRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (
        mobileLangRef.current &&
        !mobileLangRef.current.contains(e.target as Node)
      ) {
        setShowLangMobile(false);
      }
    };
    if (showLangMobile) window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, [showLangMobile]);

  /* lock scroll when drawer open */
  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen, mounted]);

  return (
    <nav className="sticky top-0 z-50 border-b border-gold bg-white shadow transition-colors duration-300 dark:bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Brand */}
        <span className="select-none text-xl font-bold tracking-tight text-gold">
          TerraCrypt
        </span>

        {/* ======================= Desktop nav ====================== */}
        <div className="hidden items-center space-x-4 md:flex">
          <div className="flex space-x-6">
            <a href="#features" className="font-medium hover:text-gold">
              {t.nav.features}
            </a>
            <a href="#faq" className="font-medium hover:text-gold">
              {t.nav.faq}
            </a>
            <a href="#contact" className="font-medium hover:text-gold">
              {t.nav.contact}
            </a>
          </div>

          {/* dark-mode toggle */}
          <button
            aria-label="Toggle dark mode"
            onClick={toggleDark}
            className="ml-3 rounded bg-neutral-200 p-2 text-neutral-800 transition
                       hover:bg-gold hover:text-neutral-900
                       dark:bg-neutral-800 dark:text-white
                       dark:hover:bg-gold dark:hover:text-neutral-900"
          >
            {mounted &&
              (dark ? (
                <TbSun className="h-5 w-5" />
              ) : (
                <TbMoon className="h-5 w-5" />
              ))}
          </button>

          {/* desktop language dropdown */}
          <div className="relative z-40" ref={desktopLangRef}>
            <button
              onClick={() => setShowLangDesktop((v) => !v)}
              className="ml-2 rounded border border-gold bg-neutral-100 px-3 py-2
                         text-sm font-medium transition hover:text-gold dark:bg-neutral-800"
            >
              {languages.find((l) => l.code === lang)?.label || lang}
            </button>

            {showLangDesktop && (
              <div className="absolute right-0 mt-2 w-32 animate-fadeIn rounded border border-gold bg-white shadow dark:bg-neutral-900">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setShowLangDesktop(false);
                    }}
                    className={`block w-full px-4 py-2 text-left transition-colors
                               hover:bg-gold/20 dark:hover:bg-gold/40
                               ${lang === l.code ? "font-bold text-gold" : ""}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ======================= Mobile top-bar =================== */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* dark-mode */}
          <button
            aria-label="Toggle dark mode"
            onClick={toggleDark}
            className="rounded bg-neutral-200 p-2 text-neutral-800 transition
                       hover:bg-gold hover:text-neutral-900
                       dark:bg-neutral-800 dark:text-white
                       dark:hover:bg-gold dark:hover:text-neutral-900"
          >
            {mounted &&
              (dark ? (
                <TbSun className="h-5 w-5" />
              ) : (
                <TbMoon className="h-5 w-5" />
              ))}
          </button>

          {/* tiny language code + dropdown */}
          <div className="relative" ref={mobileLangRef}>
            <button
              aria-label="Change language"
              onClick={() => setShowLangMobile((v) => !v)}
              className="rounded border border-gold px-2 py-1 text-xs font-semibold
                         text-gold transition hover:bg-gold hover:text-black"
            >
              {lang}
            </button>

            {showLangMobile && (
              <div className="absolute right-0 mt-2 w-28 animate-fadeIn rounded border border-gold bg-white shadow dark:bg-neutral-900">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setShowLangMobile(false);
                    }}
                    className={`block w-full px-3 py-1.5 text-left text-sm transition-colors
                               hover:bg-gold/20 dark:hover:bg-gold/40
                               ${lang === l.code ? "font-bold text-gold" : ""}`}
                  >
                    {l.code}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="rounded p-2 text-neutral-800 transition hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-800"
          >
            <TbMenu2 className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* ======================= Mobile drawer ===================== */}
      {isMobileMenuOpen && (
        <div className="animate-fadeIn border-t border-gold bg-white py-2 px-4 shadow-lg dark:bg-black md:hidden">
          <div className="flex flex-col space-y-3">
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium hover:text-gold"
            >
              {t.nav.features}
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium hover:text-gold"
            >
              {t.nav.faq}
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium hover:text-gold"
            >
              {t.nav.contact}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
