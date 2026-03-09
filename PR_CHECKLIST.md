# PR Checklist

Use this checklist for any change touching Home, Hero, Navbar, Spline, or visual runtime integrations.

## Runtime safety
- [ ] Optional visual features cannot crash the page.
- [ ] Risky components are wrapped with ErrorBoundary.
- [ ] Guard exists for placeholder/invalid remote URLs.
- [ ] Safe fallback UI is visible when remote resource fails.

## Verification
- [ ] `npm run build` passes.
- [ ] `npm run dev` starts successfully.
- [ ] Homepage loads without white-screen.
- [ ] Browser console has no uncaught runtime errors.

## UX regression
- [ ] Navbar renders and links work.
- [ ] Language toggle works (`EN / ??`).
- [ ] CTA buttons work (`/join`, `/about`).
- [ ] Mobile still shows core content even if heavy effects are disabled.

## Evidence in PR
- [ ] Add a short note of runtime test result.
- [ ] Include console status (Errors/Warnings count).
- [ ] Include one screenshot of homepage state.