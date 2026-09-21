import type { AstroIntegration } from 'astro';

export type { IntlayerLocals } from './middleware';
export { getIntlayerLocals } from './requestStorage';
export { useDictionary } from './useDictionary';
export { useIntlayer } from './useIntlayer';
export type { UseLocaleProps, UseLocaleResult } from './useLocale';
export { useLocale } from './useLocale';

/**
 * Package self-reference to the Node-only half of the integration.
 *
 * Kept in a variable so the `import()` below is not statically analyzable:
 * Astro bundles this package into the server build (`ssr.noExternal`), and a
 * literal specifier would make the bundler follow it into `vite-intlayer`,
 * `@intlayer/engine` and the framework compilers — which have no business in
 * the server build, and do not even bundle (`velocityjs`, …). Left alone, the
 * import only runs from `astro.config`, in Node.
 */
const integrationSpecifier = 'astro-intlayer/integration';

const loadIntegration = (): Promise<typeof import('./integration')> =>
  import(/* @vite-ignore */ integrationSpecifier);

/**
 * Astro integration for Intlayer.
 *
 * It handles:
 * 1. Preparing Intlayer resources (dictionaries) at config setup.
 * 2. Injecting Vite plugins for aliases, locale-based routing (middleware), and build optimizations (prune).
 * 3. Configuring Vite aliases for dictionary access.
 * 4. Registering the `astro-intlayer/middleware`, which resolves the request
 *    locale into `Astro.locals.intlayer` for the `useLocale` / `useIntlayer` /
 *    `useDictionary` hooks of this package.
 * 5. Emitting the prerendered pages at their rewritten (localized) URLs.
 *
 * The implementation is loaded lazily: this entry is also the one pages import
 * their hooks from, and it must not drag the Node-only tooling into their
 * server bundle.
 *
 * @returns An Astro integration object.
 *
 * @example
 * ```ts
 * // astro.config.mjs
 * import { defineConfig } from 'astro/config';
 * import { intlayer } from 'astro-intlayer';
 *
 * export default defineConfig({
 *   integrations: [intlayer()],
 * });
 * ```
 */
export const intlayer = (): AstroIntegration =>
  ({
    name: 'astro-intlayer',
    hooks: {
      'astro:config:setup': async (options) => {
        const { configSetup } = await loadIntegration();

        await configSetup(options);
      },
      'astro:build:done': async (options) => {
        const { buildDone } = await loadIntegration();

        await buildDone(options);
      },
    },
  }) satisfies AstroIntegration;

/**
 * Alias of {@link intlayer}, kept so `astro add astro-intlayer` works.
 *
 * Astro's CLI codemod always writes a default import
 * (`import intlayer from 'astro-intlayer'`) without checking what the package
 * exports, so the integration has to be reachable that way too. The named
 * export stays the documented one.
 */
export default intlayer;
