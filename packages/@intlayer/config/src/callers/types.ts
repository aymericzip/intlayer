/**
 * Shared caller-descriptor model.
 *
 * A "caller" is any function or JSX component through which application code
 * reads intlayer content: the base getters (`useIntlayer`, `getIntlayer`) and
 * every compat-adapter entry point (`useTranslation`, `useTranslations`,
 * `formatMessage`, lingui's `t`/`_`, …).
 *
 * This registry is the single source of truth consumed by:
 * - `@intlayer/babel` — field-usage analysis (purge/minify) and the optimize
 *   pass that rewrites caller invocations to `useDictionary(...)` /
 *   `useDictionaryDynamic(...)` with pre-imported dictionaries.
 * - `@intlayer/swc` — the same optimize pass for Next.js builds; descriptors
 *   are serialised to the plugin's wire format via `toSwcExtraCallers`.
 * - `@intlayer/lsp` and the VS Code extension — AST/regex matchers powering
 *   go-to-definition, references and completion.
 * - Each compat package's bundler plugin — injects its library's descriptors
 *   into the pipelines above, so no compat-specific name is hard-coded in the
 *   core packages.
 */

/**
 * Where a value (namespace/dictionary key, or key prefix) is read from a call
 * expression.
 */
export type CallerValueSource =
  /** Positional argument holding a string literal, e.g. `useTranslations('ns')`. */
  | { from: 'argument'; index: number }
  /** Property of an options-object argument, e.g. `useI18n({ namespace: 'ns' })`. */
  | { from: 'option'; argumentIndex: number; property: string }
  /**
   * Compile-time constant — every call site reads the same dictionary.
   * Used by single-catalog libraries such as lingui (`messages`).
   */
  | { from: 'fixed'; value: string }
  /**
   * The first dot-segment of the message id passed to the call itself.
   * Used by react-intl where `formatMessage({ id: 'home.title' })` encodes
   * both the dictionary key (`home`) and the field path (`title`).
   */
  | { from: 'path-first-segment' };

/**
 * How translated content is obtained from the caller's result.
 *
 * - `'content'`        — returns the dictionary content object; fields are
 *                        read through member access or destructuring
 *                        (`useIntlayer`, `getIntlayer`).
 * - `'return-value'`   — returns the translation function directly:
 *                        `const t = useTranslations('ns'); t('key')`.
 * - `'destructured-t'` — returns an object holding `t`:
 *                        `const { t } = useTranslation('ns'); t('key')`.
 * - `'self'`           — the caller IS the translation call; the message id is
 *                        one of its own arguments (`formatMessage`, `i18n._`).
 * - `'all'`            — field-level analysis is impossible; the whole
 *                        dictionary is marked as used (Angular templates,
 *                        lingui hashed ids).
 */
export type CallerResultShape =
  | 'content'
  | 'return-value'
  | 'destructured-t'
  | 'self'
  | 'all';

/**
 * Full description of a single caller.
 */
export type CallerDescriptor = {
  /** Function or JSX component name, e.g. `'useTranslation'`, `'FormattedMessage'`. */
  callerName: string;
  /** Library identifier grouping related callers, e.g. `'react-i18next'`. */
  library: string;
  /**
   * Module specifiers the caller may be imported from. Includes both the
   * original library names and the `@intlayer/*` adapter equivalents, because
   * bundler aliasing keeps user imports on the original names.
   */
  importSources: string[];
  /**
   * When `true`, the caller only participates in matching when the analysed
   * file imports from one of `importSources`. Used for generic names such as
   * lingui's `t` / `_` that would otherwise produce false positives.
   */
  requiresImport?: boolean;
  /**
   * When `true`, the caller is also matched as a method on any object
   * (`i18n.getFixedT(...)`, `intl.formatMessage(...)`) in addition to the
   * bare-identifier form.
   */
  matchAsMethod?: boolean;
  /** When `true`, also match the tagged-template form, e.g. lingui's ``t`…` ``. */
  matchAsTaggedTemplate?: boolean;
  /**
   * When set, the caller is also matched as a JSX element whose attribute of
   * this name holds the message id, e.g. `<FormattedMessage id="home.title" />`
   * or `<Trans i18nKey="richText" />`.
   */
  jsxIdAttribute?: string;
  /**
   * Optional JSX attribute carrying the namespace (dictionary key), e.g.
   * react-i18next's `<Trans ns="home" i18nKey="title" />`.
   */
  jsxNamespaceAttribute?: string;
  /**
   * Where the dictionary key is read from, tried in declaration order.
   * The first source that yields a static string wins.
   */
  namespaceSources: CallerValueSource[];
  /**
   * Optional key prefix prepended to every message path resolved through the
   * returned translation function, e.g. `getFixedT(lng, ns, keyPrefix)` or
   * `useTranslation(ns, { keyPrefix })`.
   */
  keyPrefixSources?: CallerValueSource[];
  /**
   * When `true`, a dotted namespace is split at the first `.`: the first
   * segment is the dictionary key and the rest becomes a key prefix.
   * next-intl semantics: `useTranslations('about.counter')` reads the
   * `about` dictionary with every `t()` path prefixed by `counter`.
   */
  nestedNamespace?: boolean;
  /**
   * When `true`, the caller may be invoked without any namespace
   * (`useTranslations()` root scope) — the dictionary key is then the first
   * dot-segment of each message id passed to the returned `t()`.
   */
  allowRootScope?: boolean;
  /** How translated content is obtained from the caller's result. */
  translationFunction: CallerResultShape;
  /**
   * When `true`, the message id is a *flat* dictionary field that itself may
   * contain dots (lingui catalogs). When unset, dotted ids map onto nested
   * dictionary objects and are split into a field path.
   */
  flatKey?: boolean;
  /**
   * Name of the dictionary-accepting replacement used by the optimize pass in
   * static import mode, e.g. `'useDictionary'`. The replacement must be
   * exported from every module in `importSources` (the compat package exports
   * it; original-library specifiers are bundler-aliased to the compat package).
   *
   * Only callers with both replacements set — and matched as plain imported
   * functions (not `matchAsMethod` / JSX) — are rewritten at build time.
   */
  staticReplacement?: string;
  /**
   * Name of the dictionary-accepting replacement used by the optimize pass in
   * dynamic/fetch import mode, e.g. `'useDictionaryDynamic'`.
   */
  dynamicReplacement?: string;
};
