import { join } from 'node:path';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import {
  ensureDirectory,
  exists,
  readFileFromRoot,
  writeFileToRoot,
} from '../../utils/fileSystem';
import type { FrameworkAdapter, FrameworkSetupContext } from '../types';
import { detectNextAppDir, findAppFile, isVersionAtLeast } from './detect';
import { restructureAppIntoLocale } from './restructure';
import {
  LOCALE_LAYOUT_TEMPLATE_JS,
  LOCALE_LAYOUT_TEMPLATE_TS,
  LOCALE_PAGE_TEMPLATE_JS,
  LOCALE_PAGE_TEMPLATE_TS,
  MIDDLEWARE_TEMPLATE,
  PROXY_TEMPLATE,
  ROOT_LAYOUT_TEMPLATE_JS,
  ROOT_LAYOUT_TEMPLATE_TS,
} from './templates';
import {
  type TransformResult,
  wrapLayoutWithProvider,
  wrapPageWithProvider,
} from './transforms';

/**
 * Creates the locale-detection proxy (Next >= 16) or middleware (Next < 16),
 * but only when neither already exists, so a user's custom file is never
 * touched. Placed next to the app directory's parent (`src/` when present).
 */
const ensureProxyOrMiddleware = async (
  rootDir: string,
  srcDir: string,
  isNext16: boolean
): Promise<void> => {
  const baseDir = srcDir || '.';
  const proxyCandidates = [
    'proxy.ts',
    'proxy.js',
    'middleware.ts',
    'middleware.js',
  ];

  for (const candidate of proxyCandidates) {
    if (await exists(rootDir, join(baseDir, candidate))) {
      logger(
        `${v} ${colorizePath(join(baseDir, candidate))} already exists, leaving it untouched`
      );
      return;
    }
  }

  const fileName = isNext16 ? 'proxy.ts' : 'middleware.ts';
  const content = isNext16 ? PROXY_TEMPLATE : MIDDLEWARE_TEMPLATE;
  const targetPath = join(baseDir, fileName);

  if (srcDir) await ensureDirectory(rootDir, srcDir);
  await writeFileToRoot(rootDir, targetPath, content);
  logger(`${v} Created ${colorizePath(targetPath)} for locale detection`);
};

/** Logs the outcome of a layout/page provider-wrap transform. */
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
    case 'skipped-client':
      logger(
        `${x} ${colorizePath(filePath)} is a client component — add the Intlayer provider manually.`,
        { level: 'warn' }
      );
      break;
    case 'skipped':
      logger(
        `${x} Could not safely add the Intlayer provider to ${colorizePath(filePath)} — please wire it manually.`,
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
 * Next.js App Router adapter. Scaffolds the locale proxy/middleware, restructures
 * the app into a `[locale]` segment, and wraps the layout/page with the Intlayer
 * providers — all idempotently and without overwriting recognizable user code.
 */
export const nextAppRouterAdapter: FrameworkAdapter = {
  name: 'Next.js App Router',

  detect: async ({ rootDir, allDeps }) => {
    if (!allDeps.next) return false;
    return (await detectNextAppDir(rootDir)) !== null;
  },

  setup: async ({ rootDir, allDeps, useTypeScript }: FrameworkSetupContext) => {
    const appDirInfo = await detectNextAppDir(rootDir);
    if (!appDirInfo) return;

    const { appDir, srcDir } = appDirInfo;
    const isNext16 = isVersionAtLeast(allDeps.next, 16);
    const scriptExtension = useTypeScript ? 'tsx' : 'jsx';

    logger(
      colorize('Setting up Next.js App Router integration...', ANSIColors.CYAN)
    );

    // 1. Locale detection proxy / middleware (create only when absent).
    await ensureProxyOrMiddleware(rootDir, srcDir, isNext16);

    // 2. Move routable files under a `[locale]` segment (idempotent).
    const restructureResult = await restructureAppIntoLocale(rootDir, appDir);
    if (restructureResult.status === 'moved') {
      logger(
        `${v} Restructured app routes under ${colorizePath(join(appDir, '[locale]'))}: ${restructureResult.movedEntries
          .map((entry) => colorize(entry, ANSIColors.MAGENTA))
          .join(', ')}`
      );
    } else if (restructureResult.status === 'already-structured') {
      logger(
        `${v} ${colorizePath(join(appDir, restructureResult.localeSegment))} already exists, skipping restructure`
      );
    }

    // When the app already uses a different locale-prefix scheme (e.g. an
    // `[...locale]` / `[[...locale]]` catch-all), respect the user's routing:
    // don't scaffold a second, conflicting `[locale]` segment.
    if (
      restructureResult.status === 'already-structured' &&
      restructureResult.localeSegment !== '[locale]'
    ) {
      logger(
        `${v} Detected existing locale routing (${colorize(restructureResult.localeSegment, ANSIColors.MAGENTA)}), skipping locale layout/page scaffold`
      );
      return;
    }

    const localeDir = join(appDir, '[locale]');
    await ensureDirectory(rootDir, localeDir);

    // 3. Minimal pass-through root layout (the `[locale]` layout owns `<html>`).
    await createIfMissing(
      rootDir,
      join(appDir, `layout.${scriptExtension}`),
      useTypeScript ? ROOT_LAYOUT_TEMPLATE_TS : ROOT_LAYOUT_TEMPLATE_JS,
      'root layout'
    );

    // 4. Locale layout — transform an existing one, else scaffold from template.
    const existingLayout = await findAppFile(rootDir, localeDir, 'layout');
    if (existingLayout) {
      await transformExistingFile(
        rootDir,
        existingLayout,
        wrapLayoutWithProvider
      );
    } else {
      await createIfMissing(
        rootDir,
        join(localeDir, `layout.${scriptExtension}`),
        useTypeScript ? LOCALE_LAYOUT_TEMPLATE_TS : LOCALE_LAYOUT_TEMPLATE_JS,
        'locale layout'
      );
    }

    // 5. Locale page — transform an existing one, else scaffold from template.
    const existingPage = await findAppFile(rootDir, localeDir, 'page');
    if (existingPage) {
      await transformExistingFile(rootDir, existingPage, wrapPageWithProvider);
    } else {
      await createIfMissing(
        rootDir,
        join(localeDir, `page.${scriptExtension}`),
        useTypeScript ? LOCALE_PAGE_TEMPLATE_TS : LOCALE_PAGE_TEMPLATE_JS,
        'locale page'
      );
    }
  },
};
