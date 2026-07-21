import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Canonical list of configuration sections exposed as named exports by
 * `@intlayer/config/built`.
 *
 * At build time, bundler integrations (Vite, webpack, …) alias
 * `@intlayer/config/built` to the generated `.intlayer/config/configuration.mjs`
 * file (see {@link getAlias} and `generateConfigurationContent`). For that alias
 * to be transparent, the generated file MUST expose exactly the same named
 * exports as `built.ts`; otherwise a consumer importing one of them (e.g.
 * `import { analytics } from '@intlayer/config/built'`) triggers a
 * `MISSING_EXPORT` bundler error.
 *
 * Deriving both `built.ts` and the generator from this single array guarantees
 * they can never drift: adding a section here is the only change required to
 * expose it in every build target.
 */
export const BUILT_CONFIG_KEYS = [
  'internationalization',
  'dictionary',
  'routing',
  'content',
  'system',
  'editor',
  'analytics',
  'log',
  'ai',
  'build',
  'compiler',
  'schemas',
  'plugins',
] as const satisfies readonly (keyof IntlayerConfig)[];

/**
 * Union of the configuration section names exposed by `@intlayer/config/built`.
 */
export type BuiltConfigKey = (typeof BUILT_CONFIG_KEYS)[number];
