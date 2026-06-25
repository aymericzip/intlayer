import { join } from 'node:path';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import {
  ensureDirectory,
  exists,
  readFileFromRoot,
  writeFileToRoot,
} from '../../utils/fileSystem';
import { findAppFile } from '../nextAppRouter/detect';
import type { FrameworkAdapter, FrameworkSetupContext } from '../types';
import { detectTanStackRoutesDir, hasTanStackStartDeps } from './detect';
import { LOCALE_SEGMENT, restructureRoutesIntoLocale } from './restructure';
import {
  LOCALE_ROUTE_TEMPLATE,
  ROOT_TEMPLATE_JS,
  ROOT_TEMPLATE_TS,
} from './templates';
import { type TransformResult, wrapRootWithProvider } from './transforms';

/** Logs the outcome of the root-document provider-wrap transform. */
const logTransformOutcome = (
  filePath: string,
  result: TransformResult
): void => {
  switch (result.status) {
    case 'wrapped':
      logger(`${v} Added Intlayer provider to ${colorizePath(filePath)}`);
      break;
    case 'already':
      logger(
        `${v} ${colorizePath(filePath)} already wraps the Intlayer provider`
      );
      break;
    case 'skipped':
      logger(
        `${x} Could not safely add the Intlayer provider to ${colorizePath(filePath)} — please wrap the document's {children} with <IntlayerProvider locale={locale}> manually.`,
        { level: 'warn' }
      );
      break;
  }
};

/** Transforms an existing file in place, writing it back only when changed. */
const transformExistingFile = async (
  rootDir: string,
  filePath: string,
  transform: (code: string) => TransformResult
): Promise<void> => {
  const code = await readFileFromRoot(rootDir, filePath);
  const result = transform(code);
  if (result.status === 'wrapped') {
    await writeFileToRoot(rootDir, filePath, result.code);
  }
  logTransformOutcome(filePath, result);
};

/** Creates a file from a template only when it does not already exist. */
const createIfMissing = async (
  rootDir: string,
  filePath: string,
  content: string,
  description: string
): Promise<boolean> => {
  if (await exists(rootDir, filePath)) return false;
  await writeFileToRoot(rootDir, filePath, content);
  logger(`${v} Created ${description} ${colorizePath(filePath)}`);
  return true;
};

/**
 * TanStack Start adapter. Restructures the file-based routes under a `{-$locale}`
 * segment, scaffolds the locale segment route, and wraps the root document with
 * the Intlayer provider — all idempotently and without overwriting user code it
 * cannot confidently transform.
 */
export const tanStackStartAdapter: FrameworkAdapter = {
  name: 'TanStack Start',

  detect: async ({ rootDir, allDeps }) => {
    if (!hasTanStackStartDeps(allDeps)) return false;
    return (await detectTanStackRoutesDir(rootDir)) !== null;
  },

  setup: async ({ rootDir, useTypeScript }: FrameworkSetupContext) => {
    const routesInfo = await detectTanStackRoutesDir(rootDir);
    if (!routesInfo) return;

    const { routesDir } = routesInfo;
    const scriptExtension = useTypeScript ? 'tsx' : 'jsx';

    logger(
      colorize('Setting up TanStack Start integration...', ANSIColors.CYAN)
    );

    // 1. Move routable route entries under a `{-$locale}` segment (idempotent).
    const restructureResult = await restructureRoutesIntoLocale(
      rootDir,
      routesDir
    );
    if (restructureResult.status === 'moved') {
      logger(
        `${v} Restructured routes under ${colorizePath(join(routesDir, LOCALE_SEGMENT))}: ${restructureResult.movedEntries
          .map((entry) => colorize(entry, ANSIColors.MAGENTA))
          .join(', ')}`
      );
    } else if (restructureResult.status === 'already-structured') {
      logger(
        `${v} ${colorizePath(join(routesDir, restructureResult.localeSegment))} already exists, skipping restructure`
      );
    }

    // When the routes already use a different locale-prefix scheme (e.g. the
    // prefix-all `$locale` segment), respect the user's routing: don't scaffold
    // the optional-prefix `{-$locale}/route.tsx`, which would create a second,
    // conflicting locale segment.
    const usesDefaultLocaleSegment =
      restructureResult.status !== 'already-structured' ||
      restructureResult.localeSegment === LOCALE_SEGMENT;

    if (usesDefaultLocaleSegment) {
      const localeDir = join(routesDir, LOCALE_SEGMENT);
      await ensureDirectory(rootDir, localeDir);

      // 2. Locale segment route (`{-$locale}/route.tsx`) — create when absent.
      await createIfMissing(
        rootDir,
        join(localeDir, `route.${scriptExtension}`),
        LOCALE_ROUTE_TEMPLATE,
        'locale route'
      );
    }

    // 3. Root document — transform an existing `__root`, else scaffold one.
    const existingRoot = await findAppFile(rootDir, routesDir, '__root');
    if (existingRoot) {
      await transformExistingFile(rootDir, existingRoot, wrapRootWithProvider);
    } else {
      await createIfMissing(
        rootDir,
        join(routesDir, `__root.${scriptExtension}`),
        useTypeScript ? ROOT_TEMPLATE_TS : ROOT_TEMPLATE_JS,
        'root document'
      );
    }
  },
};
