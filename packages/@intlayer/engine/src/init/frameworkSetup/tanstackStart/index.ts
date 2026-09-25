import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import {
  ensureDirectory,
  exists,
  readFileFromRoot,
  writeFileToRoot,
} from '../../utils/fileSystem';
import { usesLocalePathSegment } from '../localeRouting';
import { findAppFile } from '../nextAppRouter/detect';
import type { FrameworkAdapter, FrameworkSetupContext } from '../types';
import { detectTanStackRoutesDir, hasTanStackStartDeps } from './detect';
import {
  getLocaleSegment,
  isLocaleSegment,
  restructureRoutesIntoLocale,
} from './restructure';
import {
  buildLocaleRouteTemplate,
  buildRootTemplateJs,
  buildRootTemplateTs,
  UNPREFIXED_ROOT_TEMPLATE_JS,
  UNPREFIXED_ROOT_TEMPLATE_TS,
} from './templates';
import {
  type TransformResult,
  wrapRootWithProvider,
  wrapRootWithRequestLocaleProvider,
} from './transforms';

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
 * Wires routes whose URLs carry no locale segment (`no-prefix`,
 * `search-params`, or no proxy): routes stay in place and the root document
 * provides the locale resolved per request. Routes already nested under a
 * locale segment are left untouched, with guidance.
 */
const setupUnprefixedRoutes = async (
  rootDir: string,
  routesDir: string,
  useTypeScript: boolean
): Promise<void> => {
  const entries = await readdir(join(rootDir, routesDir));
  const existingLocaleSegment = entries.find(isLocaleSegment);
  if (existingLocaleSegment) {
    logger(
      `${x} Routes live under ${colorizePath(join(routesDir, existingLocaleSegment))} but the chosen routing has no locale in the URL — move them back to ${colorizePath(routesDir)} manually.`,
      { level: 'warn' }
    );
    return;
  }

  const existingRoot = await findAppFile(rootDir, routesDir, '__root');
  if (existingRoot) {
    await transformExistingFile(
      rootDir,
      existingRoot,
      wrapRootWithRequestLocaleProvider
    );
    return;
  }

  await createIfMissing(
    rootDir,
    join(routesDir, `__root.${useTypeScript ? 'tsx' : 'jsx'}`),
    useTypeScript ? UNPREFIXED_ROOT_TEMPLATE_TS : UNPREFIXED_ROOT_TEMPLATE_JS,
    'root document'
  );
};

/**
 * TanStack Start adapter. For prefix routing modes, restructures the file-based
 * routes under a `{-$locale}` / `$locale` segment and scaffolds the locale
 * segment route; for the others, keeps routes in place. Wraps the root document with
 * the Intlayer provider — all idempotently and without overwriting user code it
 * cannot confidently transform.
 */
export const tanStackStartAdapter: FrameworkAdapter = {
  name: 'TanStack Start',

  detect: async ({ rootDir, allDeps }) => {
    if (!hasTanStackStartDeps(allDeps)) return false;
    return (await detectTanStackRoutesDir(rootDir)) !== null;
  },

  setup: async ({
    rootDir,
    useTypeScript,
    routingMode,
    enableProxy,
  }: FrameworkSetupContext) => {
    const routesInfo = await detectTanStackRoutesDir(rootDir);
    if (!routesInfo) return;

    const { routesDir } = routesInfo;
    const scriptExtension = useTypeScript ? 'tsx' : 'jsx';

    // `prefix-all` needs the required `$locale` segment; every other mode uses
    // the optional `{-$locale}` segment so the default locale stays prefix-free.
    const targetLocaleSegment = getLocaleSegment(routingMode);

    logger(
      colorize('Setting up TanStack Start integration...', ANSIColors.CYAN)
    );

    if (!usesLocalePathSegment({ routingMode, enableProxy })) {
      await setupUnprefixedRoutes(rootDir, routesDir, useTypeScript);
      return;
    }

    // 1. Move routable route entries under the locale segment (idempotent).
    const restructureResult = await restructureRoutesIntoLocale(
      rootDir,
      routesDir,
      targetLocaleSegment
    );
    if (restructureResult.status === 'moved') {
      logger(
        `${v} Restructured routes under ${colorizePath(join(routesDir, targetLocaleSegment))}: ${restructureResult.movedEntries
          .map((entry) => colorize(entry, ANSIColors.MAGENTA))
          .join(', ')}`
      );
    } else if (restructureResult.status === 'already-structured') {
      logger(
        `${v} ${colorizePath(join(routesDir, restructureResult.localeSegment))} already exists, skipping restructure`
      );
    }

    // Scaffold the locale route for the segment actually in use: a pre-existing
    // segment (e.g. a prefix-all `$locale` the user already set up) wins over the
    // target, so we never create a second, conflicting locale segment.
    const activeLocaleSegment =
      restructureResult.status === 'already-structured'
        ? restructureResult.localeSegment
        : targetLocaleSegment;

    const localeDir = join(routesDir, activeLocaleSegment);
    await ensureDirectory(rootDir, localeDir);

    // 2. Locale segment route (`<segment>/route.tsx`) — create when absent.
    await createIfMissing(
      rootDir,
      join(localeDir, `route.${scriptExtension}`),
      buildLocaleRouteTemplate(activeLocaleSegment),
      'locale route'
    );

    // 3. Root document — transform an existing `__root`, else scaffold one.
    const existingRoot = await findAppFile(rootDir, routesDir, '__root');
    if (existingRoot) {
      await transformExistingFile(rootDir, existingRoot, (code) =>
        wrapRootWithProvider(code, activeLocaleSegment)
      );
    } else {
      await createIfMissing(
        rootDir,
        join(routesDir, `__root.${scriptExtension}`),
        useTypeScript
          ? buildRootTemplateTs(activeLocaleSegment)
          : buildRootTemplateJs(activeLocaleSegment),
        'root document'
      );
    }
  },
};
