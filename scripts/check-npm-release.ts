import { appendFileSync } from 'node:fs';
import {
  getDistTagFromVersion,
  getPublishedPackages,
  isPromoted,
  isPublished,
  mapConcurrent,
  readWorkspacePackage,
  validateReleaseVersions,
} from './npm-release-utils.ts';

const { version } = readWorkspacePackage();
const packages = getPublishedPackages(process.env.RELEASE_TURBO_PATH);
validateReleaseVersions(packages, version);
const tag = getDistTagFromVersion(version);
const ready = await mapConcurrent(
  packages,
  async (workspace) =>
    (await isPromoted(workspace, tag)) && (await isPublished(workspace))
);
const pending = packages.filter((_, index) => !ready[index]);
console.log(
  pending.length
    ? `Release ${version} still needs verification or promotion: ${pending.map(({ name }) => name).join(', ')}`
    : `Skipping npm release: all ${packages.length} packages are available at ${tag}=${version}.`
);
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `needed=${pending.length > 0}\n`);
}
