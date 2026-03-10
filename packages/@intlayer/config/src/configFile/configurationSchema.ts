import { AiProviders } from '@intlayer/types/config';
import { z } from 'zod';

export const internationalizationSchema = z.object({
  locales: z.array(z.string()).min(1),
  requiredLocales: z.array(z.string()).optional(),
  strictMode: z.enum(['strict', 'inclusive', 'loose']).optional(),
  defaultLocale: z.string().optional(),
});

export const cookiesAttributesSchema = z.object({
  type: z.literal('cookie'),
  name: z.string().optional(),
  domain: z.string().optional(),
  path: z.string().optional(),
  secure: z.boolean().optional(),
  httpOnly: z.boolean().optional(),
  sameSite: z.enum(['strict', 'lax', 'none']).optional(),
  expires: z.union([z.date(), z.number()]).optional(),
});

export const storageAttributesSchema = z.object({
  type: z.enum(['localStorage', 'sessionStorage', 'header']),
  name: z.string().optional(),
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
  nextjs: rewriteRulesSchema.optional(),
  vite: rewriteRulesSchema.optional(),
});

export const routingSchema = z.object({
  rewrite: z
    .union([
      z.record(z.string(), z.record(z.string(), z.string())),
      rewriteObjectSchema,
    ])
    .optional(),
  mode: z
    .enum(['prefix-no-default', 'prefix-all', 'no-prefix', 'search-params'])
    .optional(),
  storage: storageSchema.optional(),
  basePath: z.string().optional(),
});

export const contentSchema = z.object({
  fileExtensions: z.array(z.string()).optional(),
  baseDir: z.string().optional(),
  contentDir: z.array(z.string()).optional(),
  codeDir: z.array(z.string()).optional(),
  excludedPath: z.array(z.string()).optional(),
  watch: z.boolean().optional(),
  formatCommand: z.string().optional(),
  watchedFilesPattern: z.array(z.string()).optional(),
  watchedFilesPatternWithPath: z.array(z.string()).optional(),
});

export const systemSchema = z.object({
  moduleAugmentationDir: z.string().optional(),
  unmergedDictionariesDir: z.string().optional(),
  remoteDictionariesDir: z.string().optional(),
  dictionariesDir: z.string().optional(),
  dynamicDictionariesDir: z.string().optional(),
  fetchDictionariesDir: z.string().optional(),
  typesDir: z.string().optional(),
  mainDir: z.string().optional(),
  configDir: z.string().optional(),
  cacheDir: z.string().optional(),
  tempDir: z.string().optional(),
  outputFilesPatternWithPath: z.string().optional(),
});

export const editorSchema = z.object({
  applicationURL: z.union([z.url(), z.literal('')]).optional(),
  editorURL: z.union([z.url(), z.literal('')]).optional(),
  cmsURL: z.union([z.url(), z.literal('')]).optional(),
  backendURL: z.union([z.url(), z.literal('')]).optional(),
  port: z.number().int().positive().max(65535).optional(),
  enabled: z.boolean().optional(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  dictionaryPriorityStrategy: z
    .enum(['local_first', 'distant_first'])
    .optional(),
  liveSync: z.boolean().optional(),
  liveSyncPort: z.number().int().positive().max(65535).optional(),
  liveSyncURL: z.union([z.url(), z.literal('')]).optional(),
});

export const logSchema = z.object({
  mode: z.enum(['default', 'verbose', 'disabled']).optional(),
  prefix: z.string().optional(),
  error: z.function().optional(),
  log: z.function().optional(),
  info: z.function().optional(),
  warn: z.function().optional(),
});

export const aiSchema = z.object({
  provider: z.enum(AiProviders).optional(),
  apiKey: z.string().optional(),
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  applicationContext: z.string().optional(),
  baseURL: z.url().optional(),
  dataSerialization: z.enum(['json', 'toon']).optional(),
});

export const buildSchema = z.object({
  mode: z.enum(['auto', 'manual']).optional(),
  optimize: z.boolean().optional(),
  importMode: z.enum(['static', 'dynamic', 'fetch']).optional(),
  traversePattern: z.array(z.string()).optional(),
  outputFormat: z.array(z.enum(['cjs', 'esm'])).optional(),
  cache: z.boolean().optional(),
  require: z.unknown().optional(),
  checkTypes: z.boolean().optional(),
});

export const compilerSchema = z.object({
  enabled: z.union([z.boolean(), z.literal('build-only')]).optional(),
  dictionaryKeyPrefix: z.string().optional(),
  transformPattern: z.union([z.string(), z.array(z.string())]).optional(),
  excludePattern: z.union([z.string(), z.array(z.string())]).optional(),
  outputDir: z.string().optional(),
  output: z.unknown().optional(),
  noMetadata: z.boolean().optional(),
  saveComponents: z.boolean().optional(),
});

export const dictionarySchema = z.object({
  fill: z.unknown().optional(),
  contentAutoTransformation: z
    .union([
      z.boolean(),
      z.object({
        markdown: z.boolean().optional(),
        html: z.boolean().optional(),
        insertion: z.boolean().optional(),
      }),
    ])
    .optional(),
  location: z.string().optional(),
  locale: z.string().optional(),
  title: z.string().optional(),
});

export const intlayerConfigSchema = z.object({
  internationalization: internationalizationSchema.optional(),
  routing: routingSchema.optional(),
  content: contentSchema.optional(),
  system: systemSchema.optional(),
  editor: editorSchema.optional(),
  log: logSchema.optional(),
  ai: aiSchema.optional(),
  build: buildSchema.optional(),
  compiler: compilerSchema.optional(),
  dictionary: dictionarySchema.optional(),
  plugins: z.array(z.unknown()).optional(),
  schemas: z.record(z.string(), z.unknown()).optional(),
  metadata: z
    .object({
      name: z.string().optional(),
      version: z.string().optional(),
      doc: z.string().optional(),
    })
    .optional(),
});
