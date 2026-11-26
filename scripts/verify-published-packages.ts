#!/usr/bin/env bun

import { appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
/** Checks release metadata and downloadable tarballs without modifying npm. */
import { readWorkspacePackage } from './npm-release-utils.ts';
import {
  getPublishedPackages,
  isPublished,
  mapConcurrent,
  readReleaseManifest,
  validateReleaseVersions,
} from './npm-release-utils.ts';

const { values: options } = parseArgs({
  options: { directory: { type: 'string' } },
});
const packages = options.directory
  ? readReleaseManifest(resolve(options.directory)).packages
  : getPublishedPackages();
const { version } = readWorkspacePackage();
validateReleaseVersions(packages, version);
const statuses = await mapConcurrent(packages, isPublished);
const missingPackages = packages.filter((_, index) => !statuses[index]);

if (missingPackages.length === 0) {
  console.log(`✅ All ${packages.length} packages and tarballs are available`);
} else {
  const missingList = missingPackages
    .map(({ name, version }) => `- ${name}@${version}`)
    .join('\n');
  console.error(`❌ Packages or tarballs missing from npm:\n${missingList}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `### ❌ Packages or tarballs missing from npm\n\n${missingList}\n`
    );
  }
  process.exitCode = 1;
}
