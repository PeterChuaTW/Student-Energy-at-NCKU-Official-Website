import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { readFile } from "node:fs/promises";

const HOST = "127.0.0.1";
const PORT = 4173;
const URL = `http://${HOST}:${PORT}`;
const SESSION = "smokehome";

function runCmd(command, { allowFailure = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn("cmd.exe", ["/d", "/s", "/c", command], {
      shell: false,
      stdio: "pipe",
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (d) => (stdout += d.toString()));
    child.stderr?.on("data", (d) => (stderr += d.toString()));

    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0 && !allowFailure) {
        const err = new Error(`Command failed: ${command} (exit ${code})`);
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
        return;
      }
      resolve({ code, stdout, stderr });
    });
  });
}

async function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await delay(400);
  }
  throw new Error(`Dev server did not become reachable at ${url} within ${timeoutMs}ms.`);
}

function extractCount(text, key) {
  const match = text.match(new RegExp(`${key}:\\s*(\\d+)`, "i"));
  return match ? Number(match[1]) : null;
}

function extractLogPath(text) {
  const match = text.match(/\[Console\]\(([^)]+)\)/i);
  return match ? match[1] : null;
}

async function parseConsoleCount(resultText, key) {
  const inlineCount = extractCount(resultText, key);
  if (inlineCount !== null) return inlineCount;

  const logPath = extractLogPath(resultText);
  if (!logPath) return null;

  try {
    const log = await readFile(logPath, "utf8");
    return extractCount(log, key);
  } catch {
    return null;
  }
}

async function main() {
  let dev;

  try {
    dev = spawn("cmd.exe", ["/d", "/s", "/c", `npm.cmd run dev -- --host ${HOST} --port ${PORT}`], {
      shell: false,
      stdio: "pipe",
      windowsHide: true,
    });

    await waitForServer(URL);

    await runCmd(`npx.cmd --yes --package @playwright/cli playwright-cli -s=${SESSION} open ${URL}`);
    await delay(2500);

    const errors = await runCmd(`npx.cmd --yes --package @playwright/cli playwright-cli -s=${SESSION} console error`);
    const warnings = await runCmd(`npx.cmd --yes --package @playwright/cli playwright-cli -s=${SESSION} console warning`);

    const errorText = `${errors.stdout}\n${errors.stderr}`;
    const warningText = `${warnings.stdout}\n${warnings.stderr}`;

    const errCount = await parseConsoleCount(errorText, "Errors");
    const warnCount = await parseConsoleCount(warningText, "Warnings");

    process.stdout.write(`Smoke URL: ${URL}\n`);
    process.stdout.write(`Console Errors: ${errCount ?? "unknown"}\n`);
    process.stdout.write(`Console Warnings: ${warnCount ?? "unknown"}\n`);

    if ((errCount ?? 1) > 0) {
      process.stderr.write("\n--- console error output ---\n");
      process.stderr.write(errorText);
      throw new Error("Home smoke test failed: console errors detected.");
    }

    process.stdout.write("PASS: homepage smoke test succeeded.\n");
  } finally {
    await runCmd(`npx.cmd --yes --package @playwright/cli playwright-cli -s=${SESSION} close`, {
      allowFailure: true,
    });

    if (dev?.pid) {
      await runCmd(`taskkill /PID ${dev.pid} /T /F`, { allowFailure: true });
    }
  }
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`);
  if (err.stdout) process.stderr.write(`\n--- stdout ---\n${err.stdout}\n`);
  if (err.stderr) process.stderr.write(`\n--- stderr ---\n${err.stderr}\n`);
  process.exit(1);
});