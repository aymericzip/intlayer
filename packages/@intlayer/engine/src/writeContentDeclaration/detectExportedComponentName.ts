/**
 * Names that do not tell components apart: route config exports (TanStack
 * Router `Route`) and file-convention names shared by every page or layout
 * (Next.js `Page`, `Layout`…). The file path names those dictionaries better.
 */
const NON_DESCRIPTIVE_NAMES = new Set([
  'Route',
  'Page',
  'Layout',
  'RootLayout',
  'Template',
  'Loading',
  'Error',
  'GlobalError',
  'NotFound',
  'Default',
  'Index',
]);

/**
 * Wrappers whose first argument is the actual component:
 * `memo(Card)`, `React.forwardRef(function Card() {})`, `observer(Card)`.
 */
const WRAPPER_PATTERN = String.raw`(?:[\w$]+\.)?(?:memo|forwardRef|observer|lazy)\s*\(\s*`;

/** `export default [async] function [*] Name` or `export default class Name`. */
const DEFAULT_DECLARATION_REGEX =
  /export\s+default\s+(?:async\s+)?(?:function\s*\*?|class)\s*([A-Za-z_$][\w$]*)/;

/** `export default memo(function Name` or `export default memo(Name)`. */
const DEFAULT_WRAPPED_REGEX = new RegExp(
  String.raw`export\s+default\s+${WRAPPER_PATTERN}(?:(?:async\s+)?function\s*\*?\s*)?([A-Za-z_$][\w$]*)`
);

/** `export default Name;`: a bare identifier, not an expression. */
const DEFAULT_IDENTIFIER_REGEX =
  /export\s+default\s+([A-Za-z_$][\w$]*)\s*(?:;|$)/m;

/** `module.exports = Name` and `exports.default = Name`. */
const COMMON_JS_DEFAULT_REGEX =
  /(?:module\.exports|exports\.default)\s*=\s*([A-Za-z_$][\w$]*)\s*(?:;|$)/m;

/** `export [async] function Name`, `export const Name`, `export class Name`. */
const NAMED_EXPORT_REGEX =
  /export\s+(?:(?:async\s+)?function\s*\*?|const|let|var|class)\s*([A-Za-z_$][\w$]*)/g;

/** Identifiers that a looser pattern could capture but never name a component. */
const RESERVED_WORDS = new Set([
  'async',
  'await',
  'class',
  'function',
  'new',
  'null',
  'this',
  'undefined',
]);

const isComponentName = (name: string | undefined): name is string =>
  Boolean(name) &&
  !RESERVED_WORDS.has(name!) &&
  !NON_DESCRIPTIVE_NAMES.has(name!);

/**
 * Detects the name of the component exported by a file, used to name its
 * dictionary. Handles:
 *   - `export default [async] function Name()` / `export default class Name`
 *   - `export default memo(function Name() {})` / `export default memo(Name)`
 *   - `export default Name;` / `module.exports = Name`
 *   - `export const Name = …` / `export function Name()` (capitalized only)
 *
 * Anonymous default exports and non-descriptive names (`Route`, `Page`,
 * `Layout`…) return `null`, so the caller falls back to the file path.
 */
export const detectExportedComponentName = (
  fileText: string
): string | null => {
  const defaultExportName = [
    DEFAULT_DECLARATION_REGEX,
    DEFAULT_WRAPPED_REGEX,
    DEFAULT_IDENTIFIER_REGEX,
    COMMON_JS_DEFAULT_REGEX,
  ]
    .map((regex) => fileText.match(regex)?.[1])
    .find(isComponentName);

  if (defaultExportName) return defaultExportName;

  for (const match of fileText.matchAll(NAMED_EXPORT_REGEX)) {
    const name = match[1];

    if (isComponentName(name) && /^[A-Z]/.test(name)) return name;
  }

  return null;
};
