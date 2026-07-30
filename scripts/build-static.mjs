import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const localNextCommand = join(
  process.cwd(),
  "node_modules",
  ".bin",
  process.platform === "win32" ? "next.cmd" : "next"
);

const nextCommand = existsSync(localNextCommand)
  ? localNextCommand
  : process.platform === "win32"
    ? "next.cmd"
    : "next";

const result = spawnSync(nextCommand, ["build"], {
  env: {
    ...process.env,
    STATIC_EXPORT: "true",
  },
  shell: process.platform === "win32",
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
