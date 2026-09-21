import { AiProviders } from '@intlayer/types/config';
import { z } from 'zod/mini';
import englishLocale from 'zod/v4/locales/en.js';

export const internationalizationSchema = z.object({
  locales: z.array(z.string()).check(z.minLength(1)),
  requiredLocales: z.optional(z.array(z.string())),
  strictMode: z.optional(z.enum(['strict', 'inclusive', 'loose'])),
  defaultLocale: z.optional(z.string()),
});

/**
 * Cross-realm-safe `Date` check.
 *
 * Configuration files are executed inside a `node:vm` sandbox, so a `Date`
 * created there is an instance of the sandbox realm's `Date`, not the host
 * realm's. `instanceof Date` (used by `z.date()`) therefore returns `false`
 * for those values, which would reject a perfectly valid `Date`.
 */
const isDateLike = (value: unknown): value is Date =>
  value instanceof Date ||
  Object.prototype.toString.call(value) === '[object Date]';

/**
 * Cookie expiry: a number of days, an absolute `Date`, or an ISO date string
 * (the form a `Date` takes once the configuration is serialized).
 */
const cookieExpiresSchema = z.union([
  z.custom<Date>(isDateLike, { message: 'Expected a Date' }),
  z.number(),
  z.string().check(
    z.refine((value) => !Number.isNaN(Date.parse(value)), {
      message: 'Expected a valid date string',
    })
  ),
]);

export const cookiesAttributesSchema = z.object({
  type: z.literal('cookie'),
  name: z.optional(z.string()),
  domain: z.optional(z.string()),
  path: z.optional(z.string()),
  secure: z.optional(z.boolean()),
  httpOnly: z.optional(z.boolean()),
  sameSite: z.optional(z.enum(['strict', 'lax', 'none'])),
  expires: z.optional(cookieExpiresSchema),
  maxAge: z.optional(z.number()),
});

export const storageAttributesSchema = z.object({
  type: z.enum(['localStorage', 'sessionStorage', 'header']),
  name: z.optional(z.string()),
});

export const storageSchema = z.union([
  z.literal(false),
  z.enum(['cookie', 'localStorage', 'sessionStorage', 'header']),
  cookiesAttributesSchema,
  storageAttributesSchema,
  z.array(
    z.union([
      z.enum(['cookie', 'localStorage', 'sessionStorage', 'header']),
      cookiesAttributesSchema,
      storageAttributesSchema,
    ])
  ),
]);

export const rewriteRuleSchema = z.object({
  canonical: z.string(),
  localized: z.record(z.string(), z.string()),
});

export const rewriteRulesSchema = z.object({
  rules: z.array(rewriteRuleSchema),
});

export const rewriteObjectSchema = z.object({
  url: rewriteRulesSchema,
  nextjs: z.optional(rewriteRulesSchema),
  vite: z.optional(rewriteRulesSchema),
});

export const routingSchema = z.object({
  rewrite: z.optional(
    z.union([
      z.record(z.string(), z.record(z.string(), z.string())),
      rewriteObjectSchema,
    ])
  ),
  mode: z.optional(
    z.enum(['prefix-no-default', 'prefix-all', 'no-prefix', 'search-params'])
  ),
  enableProxy: z.optional(z.boolean()),
  storage: z.optional(storageSchema),
  basePath: z.optional(z.string()),
  domains: z.optional(z.record(z.string(), z.string())),
});

export const systemSchema = z.object({
  baseDir: z.optional(z.string()),
  moduleAugmentationDir: z.optional(z.string()),
  unmergedDictionariesDir: z.optional(z.string()),
  remoteDictionariesDir: z.optional(z.string()),
  dictionariesDir: z.optional(z.string()),
  dynamicDictionariesDir: z.optional(z.string()),
  fetchDictionariesDir: z.optional(z.string()),
  typesDir: z.optional(z.string()),
  mainDir: z.optional(z.string()),
  configDir: z.optional(z.string()),
  cacheDir: z.optional(z.string()),
  tempDir: z.optional(z.string()),
});

export const contentSchema = z.object({
  fileExtensions: z.optional(z.array(z.string())),
  contentDir: z.optional(z.array(z.string())),
  codeDir: z.optional(z.array(z.string())),
  excludedPath: z.optional(z.array(z.string())),
  watch: z.optional(z.boolean()),
  formatCommand: z.optional(z.string()),
});

export const editorSchema = z.object({
  applicationURL: z.optional(z.union([z.url(), z.literal('')])),
  editorURL: z.optional(z.union([z.url(), z.literal('')])),
  cmsURL: z.optional(z.union([z.url(), z.literal('')])),
  backendURL: z.optional(z.union([z.url(), z.literal('')])),
  port: z.optional(z.int().check(z.positive(), z.maximum(65535))),
  enabled: z.optional(z.boolean()),
  clientId: z.optional(z.string()),
  clientSecret: z.optional(z.string()),
  dictionaryPriorityStrategy: z.optional(
    z.enum(['local_first', 'distant_first'])
  ),
  liveSync: z.optional(z.boolean()),
  liveSyncPort: z.optional(z.int().check(z.positive(), z.maximum(65535))),
  liveSyncURL: z.optional(z.union([z.url(), z.literal('')])),
});

export const analyticsSchema = z.object({
  enabled: z.optional(z.boolean()),
  flushInterval: z.optional(z.int().check(z.positive())),
  sampleRate: z.optional(z.number().check(z.minimum(0), z.maximum(1))),
});

export const logSchema = z.object({
  mode: z.optional(z.enum(['default', 'verbose', 'disabled'])),
  prefix: z.optional(z.string()),
  error: z.optional(z.function()),
  log: z.optional(z.function()),
  info: z.optional(z.function()),
  warn: z.optional(z.function()),
});

export const aiSchema = z.object({
  provider: z.optional(z.enum(AiProviders)),
  apiKey: z.optional(z.string()),
  model: z.optional(z.string()),
  temperature: z.optional(z.number().check(z.minimum(0), z.maximum(2))),
  applicationContext: z.optional(z.string()),
  baseURL: z.optional(z.url()),
  dataSerialization: z.optional(z.enum(['json', 'toon'])),
});

export const buildSchema = z.object({
  mode: z.optional(z.enum(['auto', 'manual'])),
  optimize: z.optional(z.boolean()),
  importMode: z.optional(z.enum(['static', 'dynamic', 'fetch'])),
  traversePattern: z.optional(z.array(z.string())),
  outputFormat: z.optional(z.array(z.enum(['cjs', 'esm']))),
  cache: z.optional(z.boolean()),
  require: z.optional(z.unknown()),
  checkTypes: z.optional(z.boolean()),
});

export const compilerSchema = z.object({
  enabled: z.optional(z.union([z.boolean(), z.literal('build-only')])),
  dictionaryKeyPrefix: z.optional(z.string()),
  transformPattern: z.optional(z.union([z.string(), z.array(z.string())])),
  excludePattern: z.optional(z.union([z.string(), z.array(z.string())])),
  output: z.optional(z.unknown()),
  noMetadata: z.optional(z.boolean()),
  saveComponents: z.optional(z.boolean()),
});

export const dictionarySchema = z.object({
  fill: z.optional(z.unknown()),
  contentAutoTransformation: z.optional(
    z.union([
      z.boolean(),
      z.object({
        markdown: z.optional(z.boolean()),
        html: z.optional(z.boolean()),
        insertion: z.optional(z.boolean()),
      }),
    ])
  ),
  location: z.optional(z.string()),
  locale: z.optional(z.string()),
  title: z.optional(z.string()),
});

export const intlayerConfigSchema = z.object({
  internationalization: z.optional(internationalizationSchema),
  routing: z.optional(routingSchema),
  content: z.optional(contentSchema),
  system: z.optional(systemSchema),
  editor: z.optional(editorSchema),
  analytics: z.optional(analyticsSchema),
  log: z.optional(logSchema),
  ai: z.optional(aiSchema),
  build: z.optional(buildSchema),
  compiler: z.optional(compilerSchema),
  dictionary: z.optional(dictionarySchema),
  plugins: z.optional(z.array(z.unknown())),
  schemas: z.optional(z.record(z.string(), z.unknown())),
  metadata: z.optional(
    z.object({
      name: z.optional(z.string()),
      version: z.optional(z.string()),
      doc: z.optional(z.string()),
    })
  ),
});

/**
 * Parse context restoring English issue messages: `zod/mini` ships no default
 * locale, so without it every issue reads "Invalid input".
 * Imported directly: `z.locales` is a barrel that bundles every locale.
 */
export const intlayerConfigSchemaParseContext: z.core.ParseContext<z.core.$ZodIssue> =
  {
    error: englishLocale().localeError,
  };
