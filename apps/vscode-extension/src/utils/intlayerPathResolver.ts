import { extname } from 'node:path';
import { findMessageUsageAtOffset } from '@intlayer/lsp/utils';
import type { Position, TextDocument } from 'vscode';
import { extractScriptContent } from './extractScript';
import {
  findTemplateCallUsageAtOffset,
  TEMPLATE_EXTENSIONS,
} from './templateUsages';

interface IntlayerOrigin {
  dictionaryKey: string;
  fieldPath: string[];
  moduleSource: string | null;
  /** Caller library, e.g. `'vue-i18n'` — drives the catalog fallbacks. */
  library?: string;
}

/**
 * Given a cursor position inside a VSCode document, resolves which intlayer
 * dictionary key and field path the hovered expression refers to.
 *
 * Delegates to `@intlayer/lsp`'s registry-driven usage analyzer, which covers
 * the base getters (`useIntlayer`, `getIntlayer`) and every compat-library
 * form: `t('path')` calls from `useTranslation` / `useTranslations` /
 * `getTranslations` / `getFixedT` / `useI18n` / `createTranslator`,
 * react-intl's `formatMessage({ id })` and `<FormattedMessage id>`, lingui's
 * `i18n._()`, ``t`…` `` and `<Trans id>`, and react-i18next's `<Trans i18nKey>`.
 *
 * Falls back to a regex scan for template regions (Vue/Svelte/Angular) where
 * the AST does not reach.
 */
export const resolveIntlayerPath = async (
  document: TextDocument,
  position: Position
): Promise<IntlayerOrigin | null> => {
  try {
    const fileContent = document.getText();
    const extension = extname(document.uri.fsPath).toLowerCase();
    const scriptContent = extractScriptContent(fileContent, extension);
    const offset = document.offsetAt(position);

    const usage =
      findMessageUsageAtOffset(scriptContent, offset) ??
      (TEMPLATE_EXTENSIONS.has(extension)
        ? findTemplateCallUsageAtOffset(fileContent, scriptContent, offset)
        : null);

    if (usage) {
      // Dictionary-level call sites (cursor on `useIntlayer('key')` itself)
      // are handled by the LSP server — returning them here would duplicate
      // the hover/definition results.
      if (usage.kind === 'namespace') return null;

      return {
        dictionaryKey: usage.dictionaryKey,
        fieldPath: usage.fieldPath,
        moduleSource: usage.moduleSource ?? null,
        library: usage.library,
      };
    }

    return regexResolveIntlayerPath(fileContent, offset);
  } catch (error) {
    console.error('Intlayer AST Resolve Error:', error);
    return null;
  }
};

/** Getters taking the dictionary key as first argument. */
const GETTER_NAMES =
  'useIntlayer|getIntlayer|useTranslation|useTranslations|getTranslations|getFixedT|useI18n|useDictionary';

/** `const content = useIntlayer('key')` / `const { a, b } = …('key')`. */
const GETTER_ASSIGNMENT_PATTERN = new RegExp(
  `(?:const|let|var)\\s+(?:([a-zA-Z0-9_$]+)|\\{\\s*([^}]+)\\s*\\})\\s*=\\s*(?:await\\s+)?(?:${GETTER_NAMES})\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)`
);

/** Any getter call: `useIntlayer('key')`. */
const GETTER_CALL_PATTERN = new RegExp(
  `(?:${GETTER_NAMES})\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)`
);

/** The dotted member chain (`content.a.b`) spanning `offset`. */
const getMemberChainAt = (fileContent: string, offset: number): string => {
  let start = offset;

  while (start > 0 && /[a-zA-Z0-9_.$]/.test(fileContent[start - 1]!)) start--;

  let end = offset;

  while (end < fileContent.length && /[a-zA-Z0-9_.]/.test(fileContent[end]!)) {
    end++;
  }

  return fileContent.slice(start, end);
};

/**
 * Regex fallback for Vue/Svelte/Astro/Angular templates where AST parsing may
 * fail or the cursor sits outside the extracted script region. Uses the first
 * getter of the file and reads the member chain under the cursor.
 */
const regexResolveIntlayerPath = (
  fileContent: string,
  offset: number
): IntlayerOrigin | null => {
  const assignmentMatch = GETTER_ASSIGNMENT_PATTERN.exec(fileContent);
  const contentVariableName = assignmentMatch?.[1];
  const destructuredNames =
    assignmentMatch?.[2]
      ?.split(',')
      .map((property) => property.split(':')[0]!.trim()) ?? [];
  const dictionaryKey =
    assignmentMatch?.[3] ?? GETTER_CALL_PATTERN.exec(fileContent)?.[1];

  if (!dictionaryKey) return null;

  const memberChain = getMemberChainAt(fileContent, offset);

  if (!memberChain) return null;

  const segments = memberChain.split('.');
  // Svelte stores are read as `$content`
  const rootName = segments[0]!.replace(/^\$/, '');

  const isContentVariable =
    contentVariableName !== undefined &&
    (rootName === contentVariableName ||
      rootName === `${contentVariableName}Store`);
  const isConventionalContentName =
    segments.length > 1 &&
    (rootName === 'content' || rootName === 'dictionary');

  // Destructured names and bare chains already start at a field
  const fieldPath =
    (isContentVariable || isConventionalContentName) &&
    !destructuredNames.includes(rootName)
      ? segments.slice(1)
      : segments;

  return { dictionaryKey, fieldPath, moduleSource: null };
};
