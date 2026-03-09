import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home", to: "/", fallback: "Home" },
  { key: "about", to: "/about", fallback: "About" },
  { key: "events", to: "/events", fallback: "Events" },
  { key: "join", to: "/join", fallback: "Join Us" },
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = i18n.resolvedLanguage?.toLowerCase().startsWith("zh") ? "zh" : "en";

  const links = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        label: t(`navbar.${item.key}`, item.fallback),
      })),
    [t]
  );

  const toggleLanguage = () => {
    const nextLanguage = currentLanguage === "en" ? "zh" : "en";
    i18n.changeLanguage(nextLanguage);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[rgba(13,27,42,0.85)] text-[#f3f4f6] backdrop-blur-md">
      <nav className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="inline-flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-[0.12em] text-[#f3f4f6] uppercase sm:text-xl">STUDENT ENERGY</span>
          <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.26em] text-[#f3f4f6]/80 uppercase">
            AT NCKU
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1 bg-transparent">
              {links.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <NavigationMenuItem key={item.to}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        "!bg-transparent px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:!bg-transparent focus:!bg-transparent",
                        isActive ? "text-[#4ade80]" : "text-[#f3f4f6] hover:text-[#4ade80]"
                      )}
                    >
                      <Link to={item.to}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            type="button"
            variant="ghost"
            onClick={toggleLanguage}
            className="rounded-full border border-white/20 px-3 text-xs font-semibold tracking-wider text-[#f3f4f6] hover:border-[#4ade80] hover:bg-transparent hover:text-[#4ade80]"
          >
            <span className={currentLanguage === "en" ? "text-[#4ade80]" : "text-[#f3f4f6]"}>EN</span>
            <span className="mx-1 text-[#f3f4f6]/55">/</span>
            <span className={currentLanguage === "zh" ? "text-[#4ade80]" : "text-[#f3f4f6]"}>{"\u4e2d\u6587"}</span>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t("navbar.menu", "Menu")}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-[#f3f4f6] hover:bg-transparent hover:text-[#4ade80] md:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ height: 0, opacity: 0, y: -12 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[rgba(13,27,42,0.95)] md:hidden"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6">
              {links.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <Button
                    key={`mobile-${item.to}`}
                    asChild
                    variant="ghost"
                    className={cn(
                      "justify-start rounded-md px-2 text-sm font-medium text-[#f3f4f6] hover:bg-transparent hover:text-[#4ade80]",
                      isActive && "text-[#4ade80]"
                    )}
                  >
                    <Link to={item.to}>{item.label}</Link>
                  </Button>
                );
              })}

              <Button
                type="button"
                variant="ghost"
                onClick={toggleLanguage}
                className="mt-1 w-fit rounded-full border border-white/20 px-3 text-xs font-semibold tracking-wider text-[#f3f4f6] hover:border-[#4ade80] hover:bg-transparent hover:text-[#4ade80]"
              >
                <span className={currentLanguage === "en" ? "text-[#4ade80]" : "text-[#f3f4f6]"}>EN</span>
                <span className="mx-1 text-[#f3f4f6]/55">/</span>
                <span className={currentLanguage === "zh" ? "text-[#4ade80]" : "text-[#f3f4f6]"}>{"\u4e2d\u6587"}</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;