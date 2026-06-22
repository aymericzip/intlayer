import { join } from 'node:path';
import { exists } from '../../utils/fileSystem';

/** Location of the TanStack Router file-based routes directory. */
export type TanStackRoutesInfo = {
  /** Routes directory relative to the root, e.g. `src/routes` or `routes`. */
  routesDir: string;
  /** `src` when the project uses a `src/` directory, otherwise `''`. */
  srcDir: string;
};

/**
 * Detects the TanStack Router routes directory, preferring `src/routes` over
 * `routes`. Returns `null` when neither exists.
 */
export const detectTanStackRoutesDir = async (
  rootDir: string
): Promise<TanStackRoutesInfo | null> => {
  if (await exists(rootDir, join('src', 'routes'))) {
    return { routesDir: join('src', 'routes'), srcDir: 'src' };
  }
  if (await exists(rootDir, 'routes')) {
    return { routesDir: 'routes', srcDir: '' };
  }
  return null;
};

/**
 * Returns true when the project depends on TanStack Start (`@tanstack/react-start`)
 * or, failing that, on `@tanstack/react-router` (file-based routing).
 */
export const hasTanStackStartDeps = (
  allDeps: Record<string, string>
): boolean =>
  Boolean(
    allDeps['@tanstack/react-start'] || allDeps['@tanstack/react-router']
  );
