#!/usr/bin/env node
/**
 * Static build for GitHub Pages at /conjugaespanhol/.
 * Does not replace `npm run build` (Vercel).
 */
import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
process.env.PAGES = "1";

const build = spawnSync(
  "node",
  ["scripts/with-app-env.mjs", "vite", "build"],
  { stdio: "inherit", env: process.env, cwd: root },
);
if (build.status) process.exit(build.status);

const candidates = [
  join(root, ".vercel/output/static"),
  join(root, "dist/client"),
  join(root, "dist"),
  join(root, ".output/public"),
];
const source = candidates.find((dir) => existsSync(dir));
if (!source) {
  console.error("[build-pages] no static output found");
  process.exit(1);
}

const site = join(root, "site");
mkdirSync(site, { recursive: true });
cpSync(source, site, { recursive: true });

function findHtml(dir, depth = 0) {
  if (depth > 4) return [];
  const names = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of names) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...findHtml(full, depth + 1));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const htmlFiles = findHtml(site);
const index = join(site, "index.html");
if (!existsSync(index)) {
  const shell =
    htmlFiles.find((file) => file.endsWith("_shell.html") || file.endsWith("/_shell/index.html")) ??
    htmlFiles[0];
  if (!shell) {
    console.error("[build-pages] no HTML shell to copy to index.html. files:", htmlFiles);
    process.exit(1);
  }
  cpSync(shell, index);
}

writeFileSync(join(site, ".nojekyll"), "");
writeFileSync(join(site, "404.html"), existsSync(index) ? "" : "");
if (existsSync(index)) cpSync(index, join(site, "404.html"));

console.log("[build-pages] wrote", site, "from", source);
