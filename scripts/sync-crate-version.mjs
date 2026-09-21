#!/usr/bin/env node

/**
 * Copies the `@intlayer/swc` package.json version into the crate manifest
 * (`Cargo.toml` + `Cargo.lock`) so the crates.io release of
 * `intlayer-swc-plugin` tracks the npm release.
 *
 * The version bump tooling only touches package.json files, so this runs in
 * the `publish.yaml` workflow right before `cargo publish`. It can also be run
 * locally after a bump to keep the committed manifest in sync.
 *
 * Usage: bun scripts/sync-crate-version.mjs [--check]
 * `--check` exits with 1 instead of writing when the manifest is out of date.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const { values: options } = parseArgs({
  options: { check: { type: 'boolean', default: false } },
});

const crateDirectory = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'packages',
  '@intlayer',
  'swc'
);
const crateName = 'intlayer-swc-plugin';

const { version } = JSON.parse(
  readFileSync(join(crateDirectory, 'package.json'), 'utf8')
);

/**
 * Rewrites the `version = "…"` line of the crate's own section in a cargo
 * file, leaving dependency versions untouched.
 * @param {string} fileName `Cargo.toml` or `Cargo.lock`
 * @param {RegExp} sectionPattern matches the section header up to its version line
 * @returns {boolean} whether the file was out of date
 */
const syncFile = (fileName, sectionPattern) => {
  const filePath = join(crateDirectory, fileName);
  const content = readFileSync(filePath, 'utf8');

  if (!sectionPattern.test(content)) {
    throw new Error(`Could not find the ${crateName} version in ${fileName}`);
  }

  const updated = content.replace(sectionPattern, `$1${version}`);

  if (updated === content) {
    return false;
  }

  if (!options.check) {
    writeFileSync(filePath, updated);
  }

  return true;
};

const outdatedFiles = [
  syncFile('Cargo.toml', /^(\[package\]\nname = "[^"]+"\nversion = ")([^"]+)/m),
  syncFile(
    'Cargo.lock',
    new RegExp(
      `^(\\[\\[package\\]\\]\\nname = "${crateName}"\\nversion = ")([^"]+)`,
      'm'
    )
  ),
].filter(Boolean).length;

if (outdatedFiles === 0) {
  console.log(`✅ ${crateName} is already at ${version}`);
} else if (options.check) {
  console.error(
    `❌ ${crateName} manifest is out of date, run: bun scripts/sync-crate-version.mjs`
  );
  process.exit(1);
} else {
  console.log(`🦀 ${crateName} → ${version}`);
}
