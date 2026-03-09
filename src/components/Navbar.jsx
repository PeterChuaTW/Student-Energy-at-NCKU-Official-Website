import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NAV_BG = "rgba(15, 23, 42, 0.9)";
const TEXT_COLOR = "#f8fafc";
const ACCENT_COLOR = "#22c55e";

function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: t("navbar.home") },
    { to: "/events", label: t("navbar.events") },
    { to: "/contact", label: t("navbar.contact") },
  ];

  const currentLanguage = i18n.language?.toLowerCase().startsWith("zh") ? "zh" : "en";

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLanguage === "en" ? "zh" : "en");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header style={styles.wrapper}>
      <style>{`
        .se-navbar-link {
          color: ${TEXT_COLOR};
          text-decoration: none;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          transition: color 0.25s ease, opacity 0.25s ease;
        }

        .se-navbar-link:hover {
          color: ${ACCENT_COLOR};
        }

        .se-navbar-link.active {
          color: ${ACCENT_COLOR};
          font-weight: 700;
        }

        .se-navbar-button {
          border: 1px solid ${ACCENT_COLOR};
          background: transparent;
          color: ${TEXT_COLOR};
          border-radius: 999px;
          padding: 0.4rem 0.75rem;
          font-size: 0.82rem;
          cursor: pointer;
          transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .se-navbar-button:hover {
          background: ${ACCENT_COLOR};
          color: #0f172a;
          transform: translateY(-1px);
        }

        .se-hamburger {
          display: none;
        }

        .se-mobile-panel {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateY(-6px);
          transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        }

        .se-mobile-panel.open {
          max-height: 320px;
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 900px) {
          .se-desktop-nav,
          .se-desktop-controls {
            display: none !important;
          }

          .se-hamburger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: 1px solid rgba(243, 244, 246, 0.25);
            background: rgba(243, 244, 246, 0.05);
            color: ${TEXT_COLOR};
            cursor: pointer;
            transition: background-color 0.25s ease, border-color 0.25s ease;
          }

          .se-hamburger:hover {
            border-color: ${ACCENT_COLOR};
            background: rgba(74, 222, 128, 0.1);
          }
        }

        @media (min-width: 901px) {
          .se-mobile-panel {
            display: none;
          }
        }
      `}</style>

      <nav style={styles.container}>
        <Link to="/" style={styles.brand}>
          <span style={styles.logoText}>{t("brand.logo")}</span>
          <span style={styles.subtitle}>{t("brand.subtitle")}</span>
        </Link>

        <div className="se-desktop-nav" style={styles.navLinks}>
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`se-navbar-link${location.pathname === item.to ? " active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="se-desktop-controls" style={styles.controls}>
          <button type="button" onClick={toggleLanguage} className="se-navbar-button">
            {currentLanguage === "en" ? "\u4E2D\u6587" : "EN"}
          </button>
        </div>

        <button
          type="button"
          aria-label={t("navbar.menu")}
          aria-expanded={isOpen}
          className="se-hamburger"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "X" : "="}
        </button>
      </nav>

      <div className={`se-mobile-panel${isOpen ? " open" : ""}`} style={styles.mobilePanel}>
        <div style={styles.mobileLinksWrap}>
          {links.map((item) => (
            <Link
              key={`mobile-${item.to}`}
              to={item.to}
              className={`se-navbar-link${location.pathname === item.to ? " active" : ""}`}
              style={styles.mobileLink}
            >
              {item.label}
            </Link>
          ))}
          <button type="button" onClick={toggleLanguage} className="se-navbar-button" style={styles.mobileLangBtn}>
            {currentLanguage === "en" ? "\u4E2D\u6587" : "EN"}
          </button>
        </div>
      </div>
    </header>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    background: NAV_BG,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(243, 244, 246, 0.15)",
  },
  container: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "0.8rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    color: TEXT_COLOR,
    lineHeight: 1,
  },
  logoText: {
    letterSpacing: "0.08em",
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  subtitle: {
    fontSize: "0.72rem",
    letterSpacing: "0.18em",
    opacity: 0.92,
    marginTop: "0.1rem",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  mobilePanel: {
    borderTop: "1px solid rgba(243, 244, 246, 0.15)",
    background: "rgba(15, 23, 42, 0.95)",
  },
  mobileLinksWrap: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "0.75rem 1rem 1rem",
    display: "grid",
    gap: "0.8rem",
  },
  mobileLink: {
    fontSize: "1rem",
  },
  mobileLangBtn: {
    justifySelf: "start",
    marginTop: "0.25rem",
  },
};

export default Navbar;

