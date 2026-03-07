import { logger } from '@logger';
import { Octokit } from '@octokit/rest';

const MAX_PACKAGE_JSON_FILES = 20;

export interface GithubVerifyResult {
  /** Whether the repo contains at least one intlayer-related package */
  isValid: boolean;
  /** Version of the core `intlayer` package if found */
  intlayerVersion?: string;
  /** All detected intlayer-related packages and their versions */
  packageDetails: Record<string, string>;
}

/** Intlayer package names we care about */
const INTLAYER_PKG_PATTERN =
  /^(@intlayer\/[\w-]+|intlayer|react-intlayer|next-intlayer|vue-intlayer|svelte-intlayer|express-intlayer|intlayer-editor)$/;

/**
 * Parses a GitHub-like URL and returns { hostname, owner, repo }.
 * Supports:
 *   - https://github.com/owner/repo
 *   - https://github.example.com/owner/repo   (self-hosted GitHub Enterprise)
 *   - https://github.com/owner/repo.git
 *   - paths with trailing slashes
 */
export const parseGithubUrl = (
  url: string
): { hostname: string; owner: string; repo: string } | null => {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname
      .replace(/\.git\/?$/, '')
      .split('/')
      .filter(Boolean);
    if (parts.length < 2) return null;
    return {
      hostname: parsed.hostname,
      owner: parts[0],
      repo: parts[1],
    };
  } catch {
    return null;
  }
};

/**
 * Returns an Octokit client configured for the given hostname.
 * - github.com → standard GitHub API
 * - anything else → GitHub Enterprise Server at https://<hostname>/api/v3
 */
const getOctokitForHost = (hostname: string): Octokit => {
  const isGithubCom = hostname === 'github.com';
  return new Octokit({
    auth: process.env.GITHUB_TOKEN,
    ...(isGithubCom ? {} : { baseUrl: `https://${hostname}/api/v3` }),
  });
};

/**
 * Collects all intlayer-related package names + versions found in a parsed package.json.
 */
export const extractIntlayerPackages = (
  pkg: Record<string, unknown>
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const depField of [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ] as const) {
    const deps = pkg[depField];
    if (deps && typeof deps === 'object') {
      for (const [name, version] of Object.entries(
        deps as Record<string, string>
      )) {
        if (INTLAYER_PKG_PATTERN.test(name)) {
          // Prefer non-range version (strip leading ^ ~ >= etc.)
          result[name] =
            String(version).replace(/^[^0-9]*/, '') || String(version);
        }
      }
    }
  }
  return result;
};

/**
 * Verifies that a repository uses Intlayer by inspecting all package.json files
 * (root + nested, up to MAX_PACKAGE_JSON_FILES).
 *
 * Returns null if the URL cannot be parsed or the API call fails outright.
 */
export const verifyGithubRepo = async (
  githubUrl: string
): Promise<GithubVerifyResult | null> => {
  const parsed = parseGithubUrl(githubUrl);
  if (!parsed) {
    logger.warn(`[verifyGithubRepo] Could not parse URL: ${githubUrl}`);
    return null;
  }

  const { hostname, owner, repo } = parsed;
  const octokit = getOctokitForHost(hostname);

  try {
    // 1. Get default branch
    const repoInfo = await octokit.rest.repos.get({ owner, repo });
    const defaultBranch = repoInfo.data.default_branch;

    // 2. Get the full recursive tree
    const treeResponse = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: defaultBranch,
      recursive: '1',
    });

    if (treeResponse.data.truncated) {
      logger.warn(`[verifyGithubRepo] Tree is truncated for ${owner}/${repo}`);
    }

    // 3. Find all package.json paths (root + nested)
    const packageJsonPaths = treeResponse.data.tree
      .filter(
        (item) =>
          item.type === 'blob' &&
          (item.path === 'package.json' || item.path?.endsWith('/package.json'))
      )
      .map((item) => item.path!)
      .slice(0, MAX_PACKAGE_JSON_FILES);

    if (packageJsonPaths.length === 0) {
      return { isValid: false, packageDetails: {} };
    }

    // 4. Fetch and parse each package.json
    const allPackageDetails: Record<string, string> = {};

    await Promise.allSettled(
      packageJsonPaths.map(async (pkgPath) => {
        try {
          const response = await octokit.rest.repos.getContent({
            owner,
            repo,
            path: pkgPath,
          });

          if (!Array.isArray(response.data) && 'content' in response.data) {
            const content = Buffer.from(
              response.data.content,
              'base64'
            ).toString('utf-8');
            const pkg = JSON.parse(content) as Record<string, unknown>;
            const found = extractIntlayerPackages(pkg);
            Object.assign(allPackageDetails, found);
          }
        } catch (e) {
          logger.debug(
            `[verifyGithubRepo] Could not read ${pkgPath}: ${e instanceof Error ? e.message : String(e)}`
          );
        }
      })
    );

    const isValid = Object.keys(allPackageDetails).length > 0;
    const intlayerVersion = allPackageDetails.intlayer;

    return { isValid, intlayerVersion, packageDetails: allPackageDetails };
  } catch (e) {
    logger.error(
      `[verifyGithubRepo] Error for ${owner}/${repo}: ${e instanceof Error ? e.message : String(e)}`
    );
    return null;
  }
};
