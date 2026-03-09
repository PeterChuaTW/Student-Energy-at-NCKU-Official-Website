import React from "react";
import Spline from "@splinetool/react-spline";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SPLINE_SCENE_URL = "https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode";
const HAS_VALID_SCENE = !SPLINE_SCENE_URL.includes("YOUR-SCENE-ID");

class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return <div style={styles.splineFallback} />;
    }

    return this.props.children;
  }
}

function Home() {
  const { t } = useTranslation();

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        {HAS_VALID_SCENE ? (
          <SplineErrorBoundary>
            <div style={styles.splineWrap}>
              <Spline scene={SPLINE_SCENE_URL} />
            </div>
          </SplineErrorBoundary>
        ) : (
          <div style={styles.splineFallback} />
        )}

        <div style={styles.overlay} />

        <div style={styles.heroContent}>
          <h1 style={styles.title}>{t("home.heroTitle")}</h1>
          <p style={styles.subtitle}>{t("home.heroSubtitle")}</p>
          <Link to="/contact" style={styles.ctaButton}>
            {t("home.contactButton")}
          </Link>
        </div>
      </section>

      <section style={styles.aboutSection}>
        <h2 style={styles.aboutTitle}>{t("about.title")}</h2>
        <p style={styles.aboutDescription}>{t("about.description")}</p>
      </section>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    color: "#0f172a",
  },
  hero: {
    position: "relative",
    minHeight: "calc(100vh - 72px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "7rem 1.25rem 3rem",
    overflow: "hidden",
    color: "#f8fafc",
  },
  splineWrap: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  },
  splineFallback: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    background: "radial-gradient(circle at 20% 20%, #14532d 0%, #0f172a 60%, #020617 100%)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    background: "linear-gradient(120deg, rgba(2, 6, 23, 0.82), rgba(15, 23, 42, 0.5))",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "920px",
    textAlign: "left",
    width: "100%",
    display: "grid",
    gap: "1.1rem",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2rem, 5vw, 4rem)",
    lineHeight: 1.1,
    letterSpacing: "0.01em",
  },
  subtitle: {
    margin: 0,
    maxWidth: "640px",
    fontSize: "clamp(1rem, 2vw, 1.35rem)",
    lineHeight: 1.6,
    opacity: 0.95,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    marginTop: "0.4rem",
    padding: "0.8rem 1.3rem",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: 700,
    background: "#22c55e",
    color: "#052e16",
  },
  aboutSection: {
    margin: "0 auto",
    maxWidth: "980px",
    padding: "4rem 1.25rem 4.5rem",
  },
  aboutTitle: {
    marginTop: 0,
    marginBottom: "1rem",
    fontSize: "clamp(1.6rem, 4vw, 2.1rem)",
    color: "#0f172a",
  },
  aboutDescription: {
    margin: 0,
    color: "#334155",
    lineHeight: 1.8,
    fontSize: "1.05rem",
    maxWidth: "760px",
  },
};

export default Home;
