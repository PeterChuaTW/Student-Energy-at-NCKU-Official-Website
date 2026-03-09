import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { key: "home", to: "/" },
  { key: "about", to: "/about" },
  { key: "events", to: "/events" },
  { key: "join", to: "/join" },
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = i18n.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
  const languageLabel = currentLanguage === "en" ? "中文" : "EN";

  const links = useMemo(
    () => navItems.map((item) => ({ ...item, label: t(`navbar.${item.key}`) })),
    [t]
  );

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLanguage === "en" ? "zh" : "en");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[rgba(13,27,42,0.85)] text-[#f3f4f6] backdrop-blur-md">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group inline-flex items-end gap-2">
          <span
            className="text-3xl font-bold uppercase leading-none tracking-[0.08em]"
            style={{ fontFamily: '"Bebas Neue Pro", "Bebas Neue", sans-serif' }}
          >
            STUDENT ENERGY
          </span>
          <span className="pb-1 text-xs uppercase tracking-[0.2em] text-slate-200/90">AT NCKU</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative pb-1 text-sm tracking-wide transition-colors duration-200 ${
                  isActive ? "text-[#4ade80]" : "text-[#f3f4f6] hover:text-[#4ade80]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-[#4ade80] transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}

          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-[#4ade80] px-3 py-1 text-xs font-semibold uppercase tracking-wider transition hover:bg-[#4ade80] hover:text-slate-900"
          >
            {languageLabel}
          </button>
        </div>

        <button
          type="button"
          aria-label={t("navbar.menu")}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-[#f3f4f6] transition hover:border-[#4ade80] hover:text-[#4ade80] md:hidden"
        >
          <span className="text-xl leading-none">{isOpen ? "X" : "="}</span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[rgba(13,27,42,0.92)] md:hidden"
          >
            <div className="mx-auto grid w-full max-w-6xl gap-2 px-4 py-4 sm:px-6">
              {links.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <Link
                    key={`mobile-${item.to}`}
                    to={item.to}
                    className={`rounded-md px-2 py-2 text-sm transition ${
                      isActive ? "text-[#4ade80] underline decoration-[#4ade80] underline-offset-4" : "hover:text-[#4ade80]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={toggleLanguage}
                className="mt-1 w-fit rounded-full border border-[#4ade80] px-3 py-1 text-xs font-semibold uppercase tracking-wider transition hover:bg-[#4ade80] hover:text-slate-900"
              >
                {languageLabel}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
