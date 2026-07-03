import { join } from 'node:path';
import { exists } from '../../utils/fileSystem';

/** Script extensions probed when locating an App Router convention file. */
const SCRIPT_EXTENSIONS = ['tsx', 'jsx', 'ts', 'js'] as const;

/** Location of the Next.js App Router directory within the project. */
export type NextAppDirInfo = {
  /** App Router directory relative to the root, e.g. `src/app` or `app`. */
  appDir: string;
  /** `src` when the project uses a `src/` directory, otherwise `''`. */
  srcDir: string;
};

/**
 * Detects the Next.js App Router directory, preferring `src/app` over `app`.
 * Returns `null` when neither exists (e.g. a Pages Router project).
 */
export const detectNextAppDir = async (
  rootDir: string
): Promise<NextAppDirInfo | null> => {
  if (await exists(rootDir, join('src', 'app'))) {
    return { appDir: join('src', 'app'), srcDir: 'src' };
  }
  if (await exists(rootDir, 'app')) {
    return { appDir: 'app', srcDir: '' };
  }
  return null;
};

/**
 * Finds an existing App Router convention file (e.g. `layout`, `page`) within
 * `dir`, trying each known script extension. Returns the matching relative path
 * or `null`.
 */
export const findAppFile = async (
  rootDir: string,
  dir: string,
  baseName: string
): Promise<string | null> => {
  for (const extension of SCRIPT_EXTENSIONS) {
    const candidate = join(dir, `${baseName}.${extension}`);
    if (await exists(rootDir, candidate)) {
      return candidate;
    }
  }
  return null;
};

/**
 * Returns true when the dependency `version` range targets a major >= `major`.
 * Tolerant of leading range characters, e.g. `^16.0.0`, `~16`, `16.1.0`.
 */
export const isVersionAtLeast = (
  version: string | undefined,
  major: number
): boolean => {
  if (!version || typeof version !== 'string') return false;
  const match = version.match(/(\d+)/);
  if (!match?.[1]) return false;
  return parseInt(match[1], 10) >= major;
};
