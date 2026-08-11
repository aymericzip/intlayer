/**
 * Grammar registrations, as default-exported by the `shiki/langs/*` modules.
 */
export type LanguageGrammar =
  typeof import('shiki/langs/typescript.mjs')['default'];

/**
 * Loads a single Shiki grammar (and its embedded dependencies).
 */
export type GrammarLoader = () => Promise<{ default: LanguageGrammar }>;

/**
 * Shiki grammar loaders, keyed by the canonical Shiki language id.
 *
 * Import specifiers are written as literals (never template strings) so that
 * bundlers can statically analyse them and emit one lazily fetched chunk per
 * grammar instead of bundling every language up front.
 */
const grammarLoaders = {
  'angular-html': () => import('shiki/langs/angular-html.mjs'),
  'angular-ts': () => import('shiki/langs/angular-ts.mjs'),
  astro: () => import('shiki/langs/astro.mjs'),
  bash: () => import('shiki/langs/bash.mjs'),
  c: () => import('shiki/langs/c.mjs'),
  cpp: () => import('shiki/langs/cpp.mjs'),
  csharp: () => import('shiki/langs/csharp.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  csv: () => import('shiki/langs/csv.mjs'),
  dart: () => import('shiki/langs/dart.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
  docker: () => import('shiki/langs/docker.mjs'),
  go: () => import('shiki/langs/go.mjs'),
  graphql: () => import('shiki/langs/graphql.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  http: () => import('shiki/langs/http.mjs'),
  ini: () => import('shiki/langs/ini.mjs'),
  java: () => import('shiki/langs/java.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  json5: () => import('shiki/langs/json5.mjs'),
  kotlin: () => import('shiki/langs/kotlin.mjs'),
  less: () => import('shiki/langs/less.mjs'),
  lua: () => import('shiki/langs/lua.mjs'),
  markdown: () => import('shiki/langs/markdown.mjs'),
  nginx: () => import('shiki/langs/nginx.mjs'),
  php: () => import('shiki/langs/php.mjs'),
  powershell: () => import('shiki/langs/powershell.mjs'),
  prisma: () => import('shiki/langs/prisma.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  ruby: () => import('shiki/langs/ruby.mjs'),
  rust: () => import('shiki/langs/rust.mjs'),
  scss: () => import('shiki/langs/scss.mjs'),
  sql: () => import('shiki/langs/sql.mjs'),
  svelte: () => import('shiki/langs/svelte.mjs'),
  swift: () => import('shiki/langs/swift.mjs'),
  toml: () => import('shiki/langs/toml.mjs'),
  tsx: () => import('shiki/langs/tsx.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  vue: () => import('shiki/langs/vue.mjs'),
  xml: () => import('shiki/langs/xml.mjs'),
  yaml: () => import('shiki/langs/yaml.mjs'),
} satisfies Record<string, GrammarLoader>;

/** Canonical Shiki language ids this package can highlight. */
export type ShikiLanguageId = keyof typeof grammarLoaders;

/** Every canonical language id that ships with a grammar loader. */
export const shikiLanguageIds = Object.keys(
  grammarLoaders
) as ShikiLanguageId[];

/**
 * Code fence names that are rendered by another grammar, mapped to the
 * canonical id that actually owns the grammar.
 */
const grammarAliases = {
  'c#': 'csharp',
  'c++': 'cpp',
  cjs: 'javascript',
  console: 'bash',
  cs: 'csharp',
  cts: 'typescript',
  dockerfile: 'docker',
  golang: 'go',
  gql: 'graphql',
  htm: 'html',
  js: 'javascript',
  jsonc: 'json5',
  jsx: 'tsx',
  kt: 'kotlin',
  md: 'markdown',
  mdx: 'markdown',
  mjs: 'javascript',
  mts: 'typescript',
  postcss: 'css',
  ps1: 'powershell',
  pwsh: 'powershell',
  py: 'python',
  rb: 'ruby',
  rs: 'rust',
  sh: 'bash',
  shell: 'bash',
  shellscript: 'bash',
  ts: 'typescript',
  yml: 'yaml',
  zsh: 'bash',
} satisfies Record<string, ShikiLanguageId>;

/** Code fence names accepted as aliases of a canonical language id. */
export type ShikiLanguageAlias = keyof typeof grammarAliases;

/**
 * Languages Shiki renders without any grammar. They are also used as the
 * fallback for languages this package does not ship a grammar for.
 */
export type PlainTextLanguage = 'plaintext' | 'text' | 'txt';

const PLAIN_TEXT_LANGUAGE = 'plaintext' satisfies PlainTextLanguage;

/** Every language name accepted by the code block components. */
export type CodeLanguage =
  | ShikiLanguageId
  | ShikiLanguageAlias
  | PlainTextLanguage;

/**
 * A language name resolved to what Shiki actually needs to highlight it.
 */
export type ResolvedCodeLanguage = {
  /** Canonical language id to pass to `codeToHtml` / `codeToHast`. */
  id: ShikiLanguageId | PlainTextLanguage;
  /** Grammar loader, or `null` when the language needs no grammar. */
  loadGrammar: GrammarLoader | null;
};

/**
 * Resolve a code fence language name to a canonical Shiki id and its grammar
 * loader.
 *
 * Unknown names resolve to plain text rather than to an arbitrary grammar, so
 * that `codeToHtml` never receives a language it has not loaded.
 *
 * @param language - Language name coming from a code fence or a `lang` prop.
 *
 * @example
 * resolveCodeLanguage('ts'); // { id: 'typescript', loadGrammar: fn }
 * resolveCodeLanguage('toml'); // { id: 'toml', loadGrammar: fn }
 * resolveCodeLanguage('brainfuck'); // { id: 'plaintext', loadGrammar: null }
 */
export const resolveCodeLanguage = (
  language: CodeLanguage | string | undefined | null
): ResolvedCodeLanguage => {
  const normalizedLanguage = (language ?? '').trim().toLowerCase();

  const canonicalId =
    grammarAliases[normalizedLanguage as ShikiLanguageAlias] ??
    (normalizedLanguage as ShikiLanguageId);

  const loadGrammar = grammarLoaders[canonicalId] as GrammarLoader | undefined;

  if (!loadGrammar) {
    return { id: PLAIN_TEXT_LANGUAGE, loadGrammar: null };
  }

  return { id: canonicalId, loadGrammar };
};
