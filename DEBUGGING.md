# Debugging Guide

This document captures recurring white-screen failure modes and the guardrails we use to prevent them.

## Why white-screen happened before

Even when root causes differed, the same pattern repeated:
- a non-core visual dependency failed at runtime (e.g. Spline scene URL 403)
- the failure was not isolated (no proper guard/fallback/error boundary in that render path)
- React tree crashed and entire page appeared blank
- `npm run build` still passed because this is a runtime failure, not a compile-time failure

## Golden rule

Any optional visual feature (3D, particles, remote assets) must fail gracefully and never take down the page.

## Mandatory protections for runtime-heavy sections

Apply all of these for Spline-like integrations:
1. URL guard
- Do not load known placeholder/invalid scene URLs.
- Render a safe static background fallback instead.

2. Error boundary
- Wrap the risky component in an ErrorBoundary.
- On error, switch to fallback UI and keep page interactive.

3. Suspense fallback
- Lazy load heavy components and provide immediate fallback.

4. Mobile degradation
- Hide expensive layers on mobile if they are decorative only.
- Keep core content (text/CTA/navigation) always visible.

## Runtime smoke test (required)

After changes to Home/Hero/Navbar/runtime visual layers:
1. Start dev server (`npm run dev`).
2. Open homepage in browser.
3. Verify page is visible (not blank).
4. Check browser console:
- Errors: 0 (except explicitly accepted third-party noise)
- Warnings: reviewed and understood
5. Verify navigation and CTA links still work.
6. Verify language toggle still works.

## Triage playbook for white-screen

If white-screen appears again, check in order:
1. Dev server reachable and correct port.
2. Browser console first error (usually the true root).
3. `src/components/SplineHero.jsx`:
- scene URL valid?
- guard condition present?
- ErrorBoundary still wrapping risky render path?
4. Recent refactor overwrote safeguards?
5. Confirm with screenshot + console log capture.

## Quick acceptance criteria for hero changes

A hero update is acceptable only if:
- `npm run build` passes
- homepage renders in dev without blank screen
- fallback renders when remote 3D scene is unavailable
- no uncaught runtime exception from hero path

## Suggested automation

For every homepage PR, run a browser-level smoke check (Playwright/manual):
- open homepage
- capture console errors
- fail review if uncaught runtime error exists

## Codex Environment Notes

When running in Codex (Windows + sandbox), use this npm command policy:

1. Prefer project-local installs over global installs
- Use local dependencies in `package.json` first.
- Avoid `npm -g` as a default approach.

2. Prefer `npm.cmd` and `npx.cmd` in Codex
- Run `npm.cmd ...` / `npx.cmd ...` to avoid shell shim/path issues.
- Do not assume `npm`/`npx` will resolve correctly in sandboxed shells.

3. Distinguish sandbox limits from real system failures
- If you see `EACCES`, `EPERM`, or spawn failures, verify whether elevated execution fixes it.
- If elevated run works, treat it as a sandbox restriction, not project breakage.

4. If global install is unavoidable
- Prefer user-scope prefix (for example `%APPDATA%\\npm`).
- Avoid writing under `C:\\Program Files\\...` unless admin-level change is truly required.

5. Do not change PATH/prefix too early
- Confirm root cause first (sandbox vs npm shim vs system npm issue).
- Environment-variable changes are last resort after diagnosis.

One-line reminder:
- Local first, use `npm.cmd`, verify sandbox before changing global environment.

## Smoke Test Pitfalls (Codex/Windows)

These are known failure patterns from `npm run smoke:home` and how we avoid them:

1. `EPERM` / `EINVAL` during process spawn
- In Codex sandbox, child-process spawning can be restricted.
- On Windows, direct spawn of `.cmd` can be fragile in some environments.
- Current script uses `cmd.exe /c ...` and should be run with elevated execution in Codex when needed.

2. False negatives from Playwright console command output
- `playwright-cli console error` may return a log file path, not inline counts.
- Current script parses the referenced `.playwright-cli/*.log` file to read `Errors: N` and `Warnings: N` reliably.

3. Timeout after checks already finished
- The test may appear "stuck" if dev server child processes are not fully terminated.
- Current script force-cleans the process tree with `taskkill /PID ... /T /F` in teardown.

4. Port and reachability drift
- Dynamic dev ports can break automation assumptions.
- Current script fixes host/port to `127.0.0.1:4173` for stable smoke checks.

Operational note:
- In Codex, if `smoke:home` fails with spawn/permission errors, rerun with elevated execution before changing project code.

## File Edit Fallback (apply_patch -> PowerShell)

Use this only when `apply_patch` fails or returns no actionable diagnostics.

### Goal

Preserve correctness while avoiding accidental overwrite.

### Required sequence

1. Read target file first (`Get-Content -Raw`).
2. Make minimal intended change (string replace or explicit new content).
3. Write file (`Set-Content`) only after step 1 is confirmed.
4. Re-read file (`Get-Content -Raw`) and verify the intended change is present.
5. Run `git status --short` to confirm only expected files changed.

### Command templates

1. New file creation:
- `@'...content...'@ | Set-Content <path>`

2. Existing file update (read-modify-write):
- `$content = Get-Content -Raw <path>`
- `$content = $content -replace 'old','new'`
- `Set-Content <path> $content`

3. Verification:
- `Get-Content -Raw <path>`
- `git status --short`

### Safety checks

- Never blind-write to an existing file without reading it first.
- If a structural section is modified (for example a Markdown heading), verify surrounding lines, not just the replaced token.
- If output looks malformed after write, fix immediately and re-verify before moving on.
- Treat this fallback as operational, not stylistic: once `apply_patch` is healthy again, return to `apply_patch` as default.
