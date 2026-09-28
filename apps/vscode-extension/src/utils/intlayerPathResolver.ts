import { extname } from 'node:path';
import { findMessageUsageAtOffset } from '@intlayer/lsp/utils';
import type { Position, TextDocument } from 'vscode';
import { extractScriptContent } from './extractScript';

interface IntlayerOrigin {
  dictionaryKey: string;
  fieldPath: string[];
  moduleSource: string | null;
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

    const usage = findMessageUsageAtOffset(scriptContent, offset);

    if (usage) {
      // Dictionary-level call sites (cursor on `useIntlayer('key')` itself)
      // are handled by the LSP server — returning them here would duplicate
      // the hover/definition results.
      if (usage.kind === 'namespace') return null;

      return {
        dictionaryKey: usage.dictionaryKey,
        fieldPath: usage.fieldPath,
        moduleSource: usage.moduleSource ?? null,
      };
    }

    return regexResolveIntlayerPath(fileContent, offset);
  } catch (error) {
    console.error('Intlayer AST Resolve Error:', error);
    return null;
  }
};

/**
 * Regex fallback for Vue/Svelte/Astro/Angular templates where AST parsing may
 * fail or the cursor sits outside the extracted script region.
 */
function regexResolveIntlayerPath(
  fileContent: string,
  offset: number
): IntlayerOrigin | null {
  let dictionaryKey: string | null = null;
  let rootVarName: string | null = null;
  let destructuredKeys: string[] = [];

  const hookRegex =
    /(?:const|let|var)\s+(?:([a-zA-Z0-9_$]+)|\{\s*([^}]+)\s*\})\s*=\s*(?:await\s+)?(?:useIntlayer|getIntlayer|useTranslation|useTranslations|getTranslations|getFixedT|useI18n|useDictionary)\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

  const match = hookRegex.exec(fileContent);
  if (match !== null) {
    if (match[1]) rootVarName = match[1];
    else if (match[2])
      destructuredKeys = match[2].split(',').map((s) => s.split(':')[0].trim());
    dictionaryKey = match[3] ?? null;
  }

  if (!dictionaryKey) {
    const simpleMatch =
      /(?:useIntlayer|getIntlayer|useTranslation|useTranslations|getTranslations|getFixedT|useI18n|useDictionary)\s*\(\s*['"]([^'"]+)['"]\s*\)/.exec(
        fileContent
      );
    if (simpleMatch) dictionaryKey = simpleMatch[1] ?? null;
    else return null;
  }

  let start = offset;
  while (start > 0 && /[a-zA-Z0-9_.$]/.test(fileContent[start - 1]!)) start--;
  let end = offset;
  while (end < fileContent.length && /[a-zA-Z0-9_.]/.test(fileContent[end]!))
    end++;

  const chainStr = fileContent.slice(start, end);
  if (!chainStr) return null;

  const parts = chainStr.split('.');
  const firstPart = parts[0]!.replace(/^\$/, '');
  let fieldPath: string[] = [];

  if (
    rootVarName &&
    (firstPart === rootVarName || firstPart === `${rootVarName}Store`)
  ) {
    fieldPath = parts.slice(1);
  } else if (destructuredKeys.includes(firstPart)) {
    fieldPath = parts;
  } else if (
    parts.length > 1 &&
    (firstPart === 'content' || firstPart === 'dictionary')
  ) {
    fieldPath = parts.slice(1);
  } else if (parts.length > 0) {
    fieldPath = parts;
  } else {
    return null;
  }

  return { dictionaryKey, fieldPath, moduleSource: null };
}
