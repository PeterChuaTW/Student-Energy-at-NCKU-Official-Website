import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SparklesCore } from "@/components/ui/sparkles";

const Spline = React.lazy(() => import("@splinetool/react-spline"));
const SPLINE_SCENE_URL = "https://prod.spline.design/placeholder/scene.splinecode";
const HAS_VALID_SCENE =
  !SPLINE_SCENE_URL.includes("/placeholder/") &&
  !SPLINE_SCENE_URL.includes("YOUR-SCENE-ID");

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
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function SplineHero() {
  const { t } = useTranslation();

  const title = t("home.hero_title", {
    defaultValue: t("home.heroTitle", {
      defaultValue: "Empowering the Next Generation of Energy Leaders",
    }),
  });

  const subtitle = t("home.hero_subtitle", {
    defaultValue: t("home.heroSubtitle", {
      defaultValue: "Taiwan's first Student Energy Global chapter at NCKU",
    }),
  });

  const splineFallback = (
    <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#14532d_0%,#0f172a_60%,#020617_100%)]" />
  );

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d1b2a] px-4 pt-28 pb-16 sm:px-6">
      <div className="absolute inset-0 z-0 hidden md:block" aria-hidden="true">
        {HAS_VALID_SCENE ? (
          <SplineErrorBoundary fallback={splineFallback}>
            <Suspense fallback={<div className="h-full w-full bg-[#0d1b2a]" />}>
              <Spline scene={SPLINE_SCENE_URL} className="h-full w-full" />
            </Suspense>
          </SplineErrorBoundary>
        ) : (
          splineFallback
        )}
      </div>

      <div className="absolute inset-0 z-10 opacity-60" aria-hidden="true">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.8}
          particleDensity={120}
          className="h-full w-full"
          particleColor="#4ade80"
          speed={1.8}
        />
      </div>

      <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent to-[#0d1b2a]" aria-hidden="true" />

      <div className="relative z-30 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <h1
          className="text-5xl leading-tight font-bold tracking-wide text-white md:text-7xl"
          style={{ fontFamily: '"Bebas Neue Pro", "Bebas Neue", sans-serif' }}
        >
          {title}
        </h1>

        <p
          className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl"
          style={{ fontFamily: '"Source Sans Pro", "Segoe UI", sans-serif' }}
        >
          {subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/join"
            className="rounded-xl bg-green-500 px-8 py-4 font-bold text-white transition hover:bg-green-400"
          >
            Join Us
          </Link>
          <Link
            to="/about"
            className="rounded-xl border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SplineHero;