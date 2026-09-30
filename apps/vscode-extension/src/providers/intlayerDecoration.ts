import { dirname, extname } from 'node:path';
import { DEFAULT_LOCALE } from '@intlayer/config/defaultValues';
import {
  collectCallerBindings,
  collectMessageUsages,
  resolveDictionaryTarget,
} from '@intlayer/lsp/utils';
import type { Dictionary } from '@intlayer/types';
import {
  type DecorationOptions,
  DecorationRangeBehavior,
  type Disposable,
  Range,
  type TextEditor,
  window,
} from 'vscode';
import {
  onDidChangeConfiguration,
  onDidChangeDictionaries,
} from '../utils/cacheInvalidation';
import {
  ANGULAR_INLINE_TEMPLATE_PATTERN,
  extractScriptContent,
  findTemplateBlock,
} from '../utils/extractScript';
import { findProjectRoot } from '../utils/findProjectRoot';
import {
  getCachedConfig,
  getCachedUnmergedDictionaries,
} from '../utils/intlayerCache';
import {
  collectNestedDictionaryKeys,
  getValueFromPath,
  isReactElementLike,
  resolveIntlayerNode,
} from '../utils/intlayerValueResolver';
import {
  collectTemplateCallUsages,
  TEMPLATE_EXTENSIONS,
} from '../utils/templateUsages';
import { watchActiveEditor } from '../utils/watchActiveEditor';

// Configuration
const DEBOUNCE_DELAY = 500;
const TRUNCATE_LENGTH = 60;

// Decoration Style: Appears at the end of the line (Translation Preview)
const translationDecorationType = window.createTextEditorDecorationType({
  after: {
    margin: '0 0 0 1ch',
    color: 'rgba(128, 128, 128, 0.3)',
    fontStyle: 'italic',
  },
  rangeBehavior: DecorationRangeBehavior.ClosedOpen,
});

export const intlayerDecorationProvider = (): Disposable[] => {
  const { disposables, trigger } = watchActiveEditor(
    updateDecorations,
    DEBOUNCE_DELAY
  );

  // The previews are read from the built dictionaries, not from the source
  // content files — without this the active editor keeps showing stale (or no)
  // previews until it is edited or reopened.
  return [
    ...disposables,
    onDidChangeDictionaries(trigger),
    onDidChangeConfiguration(trigger),
  ];
};

const SUPPORTED_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.jsonc',
  '.json5',
  '.vue',
  '.svelte',
  '.astro',
  // Angular component templates (`{{ 'home.title' | translate }}`).
  '.html',
]);

const updateDecorations = async (editor: TextEditor) => {
  const document = editor.document;

  const extension = extname(document.uri.fsPath).toLowerCase();

  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    return;
  }

  const projectDir = findProjectRoot(dirname(document.uri.fsPath));

  if (!projectDir) {
    return;
  }

  const config = await getCachedConfig(projectDir);
  const defaultLocale =
    config.internationalization?.defaultLocale || DEFAULT_LOCALE;

  const fileContent = document.getText();
  const scriptContent = extractScriptContent(fileContent, extension);

  // Registry-driven analysis from @intlayer/lsp: covers useIntlayer member
  // chains AND every compat form — t('path') calls, formatMessage({ id }),
  // <FormattedMessage id>, <Trans i18nKey|id>, lingui t`…` / i18n._(),
  // ngx-translate pipes — plus the calls written in Vue / Svelte templates.
  const usages = [
    ...collectMessageUsages(scriptContent),
    ...(TEMPLATE_EXTENSIONS.has(extension)
      ? collectTemplateCallUsages(fileContent, scriptContent)
      : []),
  ];
  const bindings = collectCallerBindings(scriptContent);

  const translationDecorations: DecorationOptions[] = [];
  const duplicateDecorations: DecorationOptions[] = [];
  const processedLines = new Set<number>();

  // Dictionaries loaded during this pass, for synchronous `nest()` resolution
  const loadedDictionaries = new Map<string, Dictionary[]>();

  const getDictionaries = async (
    dictionaryKey: string
  ): Promise<Dictionary[]> => {
    let dictionaries = loadedDictionaries.get(dictionaryKey);

    if (!dictionaries) {
      dictionaries =
        (await getCachedUnmergedDictionaries(config, dictionaryKey)) ?? [];
      loadedDictionaries.set(dictionaryKey, dictionaries);
    }

    return dictionaries;
  };

  /**
   * The content previews are read from. Per-locale catalogs build one
   * dictionary per locale file: the default locale's wins, then a
   * multilingual one (no `locale`), then any.
   */
  const pickPreviewContent = (dictionaries: Dictionary[]): any | null => {
    const withContent = dictionaries.filter((dictionary) => dictionary.content);

    return (
      (
        withContent.find((dictionary) => dictionary.locale === defaultLocale) ??
        withContent.find((dictionary) => !dictionary.locale) ??
        withContent[0]
      )?.content ?? null
    );
  };

  const getDictionaryContent = async (
    dictionaryKey: string
  ): Promise<any | null> =>
    pickPreviewContent(await getDictionaries(dictionaryKey));

  /** Content of an already loaded dictionary — for `nest()` resolution. */
  const getLoadedDictionaryContent = (dictionaryKey: string): any | null =>
    pickPreviewContent(loadedDictionaries.get(dictionaryKey) ?? []);

  /** Load the dictionaries a `nest()` chain points at, so previews resolve. */
  const preloadNestedDictionaries = async (
    node: any,
    depth = 0
  ): Promise<void> => {
    if (depth > 2) return;

    for (const nestedKey of collectNestedDictionaryKeys(node)) {
      if (loadedDictionaries.has(nestedKey)) continue;

      await getDictionaries(nestedKey);

      const nestedContent = getLoadedDictionaryContent(nestedKey);

      if (nestedContent) {
        await preloadNestedDictionaries(nestedContent, depth + 1);
      }
    }
  };

  /** The preview text for a field, or null when there is nothing to show. */
  const resolveDisplayText = async (
    dictionaryContent: any,
    fieldPath: string[]
  ): Promise<string | null> => {
    const rawNode = getValueFromPath(
      dictionaryContent,
      fieldPath,
      defaultLocale,
      false
    );

    if (rawNode === null || rawNode === undefined) return null;

    await preloadNestedDictionaries(rawNode);

    return parseContentValue(
      resolveIntlayerNode(rawNode, defaultLocale, getLoadedDictionaryContent)
    );
  };

  const addTranslationDecoration = (endOffset: number, displayText: string) => {
    const position = document.positionAt(endOffset);
    const lineIndex = position.line;

    if (processedLines.has(lineIndex)) {
      return;
    }

    const line = document.lineAt(lineIndex);
    const range = new Range(line.range.end, line.range.end);

    translationDecorations.push({
      range,
      hoverMessage: displayText,
      renderOptions: {
        after: {
          contentText: `    ${displayText}`,
          color: 'rgba(128, 128, 128, 0.3)',
        },
      },
    });
    processedLines.add(lineIndex);
  };

  for (const usage of usages) {
    // Dictionary-level call site → show the multi-declaration label
    if (usage.kind === 'namespace') {
      const dictionaries = getDeclarations(
        await getDictionaries(usage.dictionaryKey)
      );

      if (dictionaries.length > 1) {
        const localCount = dictionaries.filter(
          (dictionary) =>
            dictionary.filePath ||
            dictionary.location === 'local' ||
            dictionary.location === 'hybrid' ||
            dictionary.location === undefined
        ).length;
        const remoteCount = dictionaries.filter(
          (dictionary) => dictionary.location === 'remote'
        ).length;
        const label = `(${dictionaries.length} declarations - ${localCount} local${
          remoteCount > 0 ? ` / ${remoteCount} remote` : ''
        })`;

        // Anchored at the end of the line, not at the end of the call node —
        // otherwise the label lands inside the expression, e.g. before the
        // `as any` of `const plans = useIntlayer('pricing') as any;`.
        const lineIndex = document.positionAt(usage.end).line;

        if (processedLines.has(lineIndex)) {
          continue;
        }

        const lineEnd = document.lineAt(lineIndex).range.end;

        duplicateDecorations.push({
          range: new Range(lineEnd, lineEnd),
          renderOptions: {
            after: {
              contentText: label,
            },
          },
        });
        processedLines.add(lineIndex);
      }
      continue;
    }

    // Declarations (destructure keys) are not decorated — only usages.
    if (usage.kind === 'destructure') continue;

    // A bare content variable reads the whole dictionary: nothing to preview.
    if (usage.kind === 'member' && usage.fieldPath.length === 0) continue;

    // Compat catalogs: `t('shared.footer.github')` may live in the whole-file
    // `index` dictionary under a flat `'shared.footer.github'` key.
    const resolved = await resolveDictionaryTarget(usage, getDictionaries);

    if (!resolved?.isFieldResolved) continue;

    const dictionaryContent = pickPreviewContent(resolved.dictionaries);

    if (!dictionaryContent) continue;

    const displayText = await resolveDisplayText(
      dictionaryContent,
      resolved.fieldPath
    );

    if (!displayText) continue;

    addTranslationDecoration(usage.end, displayText);
  }

  // ---------------------------------------------------------------------
  // Template regions (Angular inline templates, Vue <template>) — the AST
  // does not reach them, so content variables are traced with regexes.
  // Translation calls there are already in `usages`.
  // ---------------------------------------------------------------------

  const contentBindings = bindings.filter(
    (binding) => binding.bindingKind === 'content'
  );

  const decorateTemplate = async (
    templateStart: number,
    templateContent: string
  ) => {
    for (const binding of contentBindings) {
      const dictionaryContent = await getDictionaryContent(
        binding.dictionaryKey
      );

      if (!dictionaryContent) continue;

      const targets = [
        { name: binding.variableName, pathPrefix: [] as string[] },
      ];

      // Detect `as` aliases (e.g. content.title as myTitle)
      const aliasPattern = new RegExp(
        `\\b${binding.variableName}(?:\\(\\))?((?:\\.[a-zA-Z0-9_]+)*)\\s+as\\s+([a-zA-Z0-9_]+)`,
        'g'
      );

      for (const aliasMatch of templateContent.matchAll(aliasPattern)) {
        const extraPath = aliasMatch[1]
          ? aliasMatch[1].split('.').filter(Boolean)
          : [];
        targets.push({ name: aliasMatch[2], pathPrefix: extraPath });
      }

      for (const { name: targetName, pathPrefix } of targets) {
        const usageRegex = new RegExp(
          `\\b${targetName}(?:\\(\\))?((?:\\.[a-zA-Z0-9_]+)*)\\b`,
          'g'
        );

        for (const usageMatch of templateContent.matchAll(usageRegex)) {
          const keys = usageMatch[1]
            ? usageMatch[1].split('.').filter(Boolean)
            : [];
          const contentPath = [...binding.basePath, ...pathPrefix, ...keys];

          const displayText = await resolveDisplayText(
            dictionaryContent,
            contentPath
          );

          if (!displayText) continue;

          addTranslationDecoration(
            templateStart + usageMatch.index! + usageMatch[0].length,
            displayText
          );
        }
      }
    }
  };

  // Angular inline templates
  if (extension === '.ts' && fileContent.includes('@Component')) {
    for (const templateMatch of fileContent.matchAll(
      ANGULAR_INLINE_TEMPLATE_PATTERN
    )) {
      const templateStart =
        templateMatch.index! + templateMatch[0].indexOf(templateMatch[2]);
      await decorateTemplate(templateStart, templateMatch[2]);
    }
  }

  // Vue <template> block (stripped from the parsed script, searched here)
  if (extension === '.vue') {
    const templateBlock = findTemplateBlock(fileContent);

    if (templateBlock) {
      await decorateTemplate(templateBlock.start, templateBlock.content);
    }
  }

  editor.setDecorations(translationDecorationType, [
    ...translationDecorations,
    ...duplicateDecorations,
  ]);
};

/**
 * One entry per declaration: the per-locale dictionaries a single source
 * builds (`./locales/{{locale}}.json`, per-locale content files) count once,
 * so they are not reported as competing declarations.
 */
const getDeclarations = (dictionaries: Dictionary[]): Dictionary[] => {
  const seen = new Set<string>();

  return dictionaries.filter((dictionary) => {
    const declarationId = dictionary.locale
      ? `${dictionary.location}|${dictionary.fill ?? ''}`
      : (dictionary.localId ??
        dictionary.filePath ??
        JSON.stringify(dictionary));

    if (seen.has(declarationId)) return false;

    seen.add(declarationId);
    return true;
  });
};

// Content Parsing Helpers

/**
 * Turn a resolved value into the inline preview text. Leaves are shown as-is
 * (insertion placeholders such as `{{name}}` included); arrays, branch maps
 * (enu / plural / cond / gender) and objects are shown as JSON, so the
 * preview mirrors what the content file declares.
 */
const parseContentValue = (value: any): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  let text = '';

  if (typeof value === 'string') {
    text = value;
  } else if (typeof value === 'number' || typeof value === 'boolean') {
    text = String(value);
  } else if (typeof value === 'object') {
    if (isReactElementLike(value)) {
      text = extractTextFromReactNode(value);
    } else {
      text = stringifyStructure(value);
    }
  }

  if (!text) {
    return null;
  }

  text = text.replace(/\s+/g, ' ').trim();

  if (text.length > TRUNCATE_LENGTH) {
    return `${text.substring(0, TRUNCATE_LENGTH)}...`;
  }
  return text;
};

/**
 * JSON for arrays and objects, with React elements flattened to their text so
 * they do not serialise as `{}`.
 */
const stringifyStructure = (value: any): string => {
  try {
    return JSON.stringify(value, (_key, entry) =>
      isReactElementLike(entry) ? extractTextFromReactNode(entry) : entry
    );
  } catch {
    // Cyclic or non-serialisable value — nothing meaningful to preview.
    return '';
  }
};

const extractTextFromReactNode = (node: any): string => {
  if (!node) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join('');
  }

  if (typeof node === 'object' && node.props && node.props.children) {
    return extractTextFromReactNode(node.props.children);
  }

  return '';
};
