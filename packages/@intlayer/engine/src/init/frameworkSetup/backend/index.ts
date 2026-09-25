import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import {
  exists,
  readFileFromRoot,
  writeFileToRoot,
} from '../../utils/fileSystem';
import type { FrameworkAdapter } from '../types';
import {
  type BackendTransformResult,
  registerElysiaPlugin,
  registerExpressMiddleware,
  registerFastifyPlugin,
  registerHonoMiddleware,
  registerNestJsMiddleware,
} from './transforms';

/** Script extensions probed for a server entry file. */
const ENTRY_EXTENSIONS = ['ts', 'mts', 'js', 'mjs', 'cjs'] as const;

/** Conventional server entry file names, most likely first. */
const DEFAULT_ENTRY_BASE_NAMES = [
  'src/index',
  'src/server',
  'src/app',
  'src/main',
  'index',
  'server',
  'app',
  'main',
] as const;

/**
 * Lists the candidate server entry files: the `package.json` `main` field when
 * it points at source (not a build output), then the conventional names.
 */
const getEntryCandidates = async (
  rootDir: string,
  entryBaseNames: readonly string[]
): Promise<string[]> => {
  const candidates: string[] = [];

  try {
    const { main } = JSON.parse(
      await readFileFromRoot(rootDir, 'package.json')
    );
    const isSourceEntry =
      typeof main === 'string' && !/^(\.\/)?(dist|build|out)\//.test(main);
    if (isSourceEntry) candidates.push(main.replace(/^\.\//, ''));
  } catch {
    // No readable package.json — rely on the conventional names.
  }

  for (const baseName of entryBaseNames) {
    for (const extension of ENTRY_EXTENSIONS) {
      candidates.push(`${baseName}.${extension}`);
    }
  }

  return [...new Set(candidates)];
};

/** A server framework whose Intlayer middleware can be registered by init. */
type BackendIntegration = {
  /** Human-readable framework name, used in logs. */
  name: string;
  /** Returns true when the project uses this framework. */
  detect: (allDeps: Record<string, string>) => boolean;
  /** Entry file base names to probe, in order. */
  entryBaseNames: readonly string[];
  /** Registers the middleware in an entry file's source. */
  transform: (code: string) => BackendTransformResult;
  /** How the registration reads, shown in logs and manual-setup guidance. */
  registrationHint: string;
  /** Guide for a manual setup. */
  documentationUrl: string;
};

/**
 * Registers the middleware in the first candidate entry file the transform
 * recognizes. Files the transform cannot confidently edit are left untouched;
 * when none matches, guidance is logged instead.
 */
const registerBackendMiddleware = async (
  rootDir: string,
  integration: BackendIntegration
): Promise<void> => {
  logger(
    colorize(`Setting up ${integration.name} integration...`, ANSIColors.CYAN)
  );

  const candidates = await getEntryCandidates(
    rootDir,
    integration.entryBaseNames
  );

  for (const candidate of candidates) {
    if (!(await exists(rootDir, candidate))) continue;

    const code = await readFileFromRoot(rootDir, candidate);

    let result: BackendTransformResult;
    try {
      result = integration.transform(code);
    } catch {
      // Unparsable file — try the next candidate.
      continue;
    }

    if (result.status === 'already') {
      logger(
        `${v} ${colorizePath(candidate)} already registers the Intlayer middleware`
      );
      return;
    }

    if (result.status === 'registered') {
      await writeFileToRoot(rootDir, candidate, result.code);
      logger(
        `${v} Registered ${colorize(integration.registrationHint, ANSIColors.MAGENTA)} in ${colorizePath(candidate)}`
      );
      return;
    }
  }

  logger(
    `${x} Could not find where your ${integration.name} app is created — add ${colorize(integration.registrationHint, ANSIColors.MAGENTA)} manually: ${colorizePath(integration.documentationUrl)}`,
    { level: 'warn' }
  );
};

/** Wraps a backend integration into a framework adapter. */
const createBackendAdapter = (
  integration: BackendIntegration
): FrameworkAdapter => ({
  name: integration.name,
  detect: ({ allDeps }) => integration.detect(allDeps),
  setup: ({ rootDir }) => registerBackendMiddleware(rootDir, integration),
});

/**
 * NestJS on the Express platform. Checked before Express: a Nest app is
 * created by `NestFactory`, not `express()`. Nest on Fastify is left to the
 * guide (its adapter is registered through the Fastify instance).
 */
export const nestJsAdapter = createBackendAdapter({
  name: 'NestJS',
  detect: (allDeps) =>
    Boolean(allDeps['@nestjs/core']) && !allDeps['@nestjs/platform-fastify'],
  entryBaseNames: ['src/main', 'main'],
  transform: registerNestJsMiddleware,
  registrationHint: 'app.use(intlayer())',
  documentationUrl: 'https://intlayer.org/doc/environment/nest.md',
});

export const expressAdapter = createBackendAdapter({
  name: 'Express',
  detect: (allDeps) => Boolean(allDeps.express),
  entryBaseNames: DEFAULT_ENTRY_BASE_NAMES,
  transform: registerExpressMiddleware,
  registrationHint: 'app.use(intlayer())',
  documentationUrl: 'https://intlayer.org/doc/environment/express.md',
});

export const fastifyAdapter = createBackendAdapter({
  name: 'Fastify',
  detect: (allDeps) => Boolean(allDeps.fastify),
  entryBaseNames: DEFAULT_ENTRY_BASE_NAMES,
  transform: registerFastifyPlugin,
  registrationHint: 'fastify.register(intlayer)',
  documentationUrl: 'https://intlayer.org/doc/environment/fastify.md',
});

export const honoAdapter = createBackendAdapter({
  name: 'Hono',
  detect: (allDeps) => Boolean(allDeps.hono),
  entryBaseNames: DEFAULT_ENTRY_BASE_NAMES,
  transform: registerHonoMiddleware,
  registrationHint: 'app.use("*", intlayer())',
  documentationUrl: 'https://intlayer.org/doc/environment/hono.md',
});

export const elysiaAdapter = createBackendAdapter({
  name: 'Elysia',
  detect: (allDeps) => Boolean(allDeps.elysia),
  entryBaseNames: DEFAULT_ENTRY_BASE_NAMES,
  transform: registerElysiaPlugin,
  registrationHint: 'new Elysia().use(intlayer())',
  documentationUrl: 'https://intlayer.org/doc/environment/elysia.md',
});

/** Backend adapters, in detection order. */
export const backendAdapters: FrameworkAdapter[] = [
  nestJsAdapter,
  expressAdapter,
  fastifyAdapter,
  honoAdapter,
  elysiaAdapter,
];
