/**
 * Frameworks with no Intlayer bundler plugin to host the content watcher.
 *
 * Their dev server is a plain Node process, so the only way to rebuild
 * `.intlayer` on a content change is to run the watcher next to it.
 */
export const BACKEND_INTLAYER_PACKAGES = [
  'express-intlayer',
  'fastify-intlayer',
  'adonis-intlayer',
  'hono-intlayer',
  'elysia-intlayer',
];

export type ResolveDevScriptParams = {
  /** The project's current `dev` script, if it has one. */
  devScript?: string;
  /** Combined prod + dev dependencies of the project. */
  allDeps: Record<string, string>;
  /** Whether a `next.config.*` file was found in the project. */
  isNextJsProject: boolean;
};

/**
 * Resolves the `dev` script `intlayer init` should write, or `null` when the
 * project's script must be left alone.
 *
 * A Next.js app is always left alone: `withIntlayer` starts the content watcher
 * itself — through `IntlayerPlugin` on webpack and `startContentWatcher` on
 * Turbopack — so wrapping the dev server in `intlayer watch --with` would only
 * add a second watcher rebuilding the same dictionaries. This is checked on the
 * `next` dependency as well as on the config file, since `next.config.*` is
 * optional, and it takes precedence over the backend list, which a Next.js app
 * with a custom server (or a monorepo root) can match too.
 *
 * @example a backend project gets its dev server wrapped
 * ```ts
 * resolveDevScript({
 *   devScript: 'node ./src/index.ts',
 *   allDeps: { 'express-intlayer': '9.0.0' },
 *   isNextJsProject: false,
 * }); // → "intlayer watch --with 'node ./src/index.ts'"
 * ```
 *
 * @example a Next.js project keeps its own script
 * ```ts
 * resolveDevScript({
 *   devScript: 'next dev',
 *   allDeps: { next: '16.0.0' },
 *   isNextJsProject: true,
 * }); // → null
 * ```
 */
export const resolveDevScript = ({
  devScript,
  allDeps,
  isNextJsProject,
}: ResolveDevScriptParams): string | null => {
  if (!devScript) return null;

  const isNextJsApp = isNextJsProject || Boolean(allDeps.next);

  if (isNextJsApp) return null;

  const hasBackendIntlayerPackage = BACKEND_INTLAYER_PACKAGES.some(
    (packageName) => allDeps[packageName]
  );

  if (!hasBackendIntlayerPackage) return null;

  // Re-running init must not nest one wrapper inside another.
  if (devScript.includes('intlayer watch')) return null;

  return `intlayer watch --with '${devScript}'`;
};
