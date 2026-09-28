import { dirname, extname, join } from 'node:path';
import { DEFAULT_LOCALE } from '@intlayer/config/defaultValues';
import {
  collectCallerBindings,
  collectMessageUsages,
} from '@intlayer/lsp/utils';
import {
  type DecorationOptions,
  type Disposable,
  Range,
  type TextEditor,
  window,
  workspace,
} from 'vscode';
import {
  extractScriptContent,
  findTemplateBlock,
} from '../utils/extractScript';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getCachedConfig, getCachedDictionary } from '../utils/intlayerCache';
import {
  collectNestedDictionaryKeys,
  getValueFromPath,
  resolveIntlayerNode,
} from '../utils/intlayerValueResolver';

// Configuration
const DEBOUNCE_DELAY = 500;
const TRUNCATE_LENGTH = 60;

// Built unmerged dictionaries — the source the previews below are read from.
const DICTIONARY_OUTPUT_GLOB = '**/.intlayer/unmerged_dictionary/*.json';

// Decoration Style: Appears at the end of the line (Translation Preview)
const translationDecorationType = window.createTextEditorDecorationType({
  after: {
    margin: '0 0 0 1ch',
    color: 'rgba(128, 128, 128, 0.3)',
    fontStyle: 'italic',
  },
  rangeBehavior: 1, // ClosedOpen
});

export const intlayerDecorationProvider = (): Disposable[] => {
  let activeEditor = window.activeTextEditor;
  let timeout: NodeJS.Timeout | undefined;

  const triggerUpdate = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (activeEditor) {
        updateDecorations(activeEditor);
      }
    }, DEBOUNCE_DELAY);
  };

  if (activeEditor) {
    triggerUpdate();
  }

  // The previews are read from the built dictionaries, not from the source
  // content files — without this the active editor keeps showing stale (or no)
  // previews until it is edited or reopened.
  const dictionaryWatcher = workspace.createFileSystemWatcher(
    DICTIONARY_OUTPUT_GLOB
  );

  return [
    window.onDidChangeActiveTextEditor((editor) => {
      activeEditor = editor;

      if (editor) {
        triggerUpdate();
      }
    }),
    workspace.onDidChangeTextDocument((event) => {
      if (activeEditor && event.document === activeEditor.document) {
        triggerUpdate();
      }
    }),
    dictionaryWatcher,
    dictionaryWatcher.onDidCreate(triggerUpdate),
    dictionaryWatcher.onDidChange(triggerUpdate),
    dictionaryWatcher.onDidDelete(triggerUpdate),
  ];
};

const allowedExtensions = [
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
];

const updateDecorations = async (editor: TextEditor) => {
  const document = editor.document;

  const extension = extname(document.uri.fsPath).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return;
  }

  const filePath = document.uri.fsPath;
  const fileDir = dirname(filePath);
  const projectDir = findProjectRoot(fileDir);

  if (!projectDir) {
    return;
  }

  const config = await getCachedConfig(projectDir);
  const defaultLocale =
    config.internationalization?.defaultLocale || DEFAULT_LOCALE;

  const scriptContent = extractScriptContent(document.getText(), extension);

  // Registry-driven analysis from @intlayer/lsp: covers useIntlayer member
  // chains AND every compat form — t('path') calls, formatMessage({ id }),
  // <FormattedMessage id>, <Trans i18nKey|id>, lingui t`…` / i18n._().
  const usages = collectMessageUsages(scriptContent);
  const bindings = collectCallerBindings(scriptContent);

  const translationDecorations: DecorationOptions[] = [];
  const duplicateDecorations: DecorationOptions[] = [];
  const processedLines = new Set<number>();

  const localDictionaryCache = new Map<string, any[]>();

  const getDictionaries = async (dictionaryKey: string): Promise<any[]> => {
    let dictionaries = localDictionaryCache.get(dictionaryKey);

    if (!dictionaries) {
      const dictionaryJsonPath = join(
        config.system.unmergedDictionariesDir,
        `${dictionaryKey}.json`
      );
      dictionaries = (await getCachedDictionary(dictionaryJsonPath)) || [];
      localDictionaryCache.set(dictionaryKey, dictionaries!);
    }

    return dictionaries!;
  };

  const getDictionaryContent = async (
    dictionaryKey: string
  ): Promise<any | null> => {
    const dictionaries = await getDictionaries(dictionaryKey);
    const localDictionary = dictionaries.find(
      (dictionary) => dictionary.content
    );

    return localDictionary?.content ?? null;
  };

  /** Content of an already loaded dictionary — for `nest()` resolution. */
  const getLoadedDictionaryContent = (dictionaryKey: string): any | null =>
    localDictionaryCache
      .get(dictionaryKey)
      ?.find((dictionary) => dictionary.content)?.content ?? null;

  /** Load the dictionaries a `nest()` chain points at, so previews resolve. */
  const preloadNestedDictionaries = async (
    node: any,
    depth = 0
  ): Promise<void> => {
    if (depth > 2) return;

    for (const nestedKey of collectNestedDictionaryKeys(node)) {
      if (localDictionaryCache.has(nestedKey)) continue;

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
      const dictionaries = await getDictionaries(usage.dictionaryKey);

      if (dictionaries.length > 1) {
        let localCount = 0;
        let remoteCount = 0;

        dictionaries.forEach((dictionary) => {
          if (
            dictionary.filePath ||
            dictionary.location === 'local' ||
            dictionary.location === 'hybrid' ||
            dictionary.location === undefined
          ) {
            localCount++;
          }

          if (dictionary.location === 'remote') {
            remoteCount++;
          }
        });

        let label = `(${dictionaries.length} declarations - ${localCount} local`;

        if (remoteCount > 0) {
          label += ` / ${remoteCount} remote`;
        }
        label += `)`;

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

    if (usage.fieldPath.length === 0) continue;

    const dictionaryContent = await getDictionaryContent(usage.dictionaryKey);

    if (!dictionaryContent) continue;

    const displayText = await resolveDisplayText(
      dictionaryContent,
      usage.fieldPath
    );

    if (!displayText) continue;

    addTranslationDecoration(usage.end, displayText);
  }

  // ---------------------------------------------------------------------
  // Template regions (Angular inline templates, Vue <template>) — the AST
  // does not reach them, so bound variables are traced with regexes.
  // ---------------------------------------------------------------------

  const contentBindings = bindings.filter(
    (binding) => binding.bindingKind === 'content'
  );
  const translatorBindings = bindings.filter(
    (binding) => binding.bindingKind === 'translator'
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

    // Translation calls in templates: {{ t('path.to.field') }} (vue-i18n)
    for (const binding of translatorBindings) {
      const dictionaryContent = await getDictionaryContent(
        binding.dictionaryKey
      );

      if (!dictionaryContent) continue;

      const callRegex = new RegExp(
        `\\b${binding.variableName}\\(\\s*['"\`]([^'"\`]+)['"\`]`,
        'g'
      );

      for (const callMatch of templateContent.matchAll(callRegex)) {
        const contentPath = [...binding.basePath, ...callMatch[1]!.split('.')];

        const displayText = await resolveDisplayText(
          dictionaryContent,
          contentPath
        );

        if (!displayText) continue;

        addTranslationDecoration(
          templateStart + callMatch.index! + callMatch[0].length,
          displayText
        );
      }
    }
  };

  // Angular inline templates
  if (extension === '.ts' && document.getText().includes('@Component')) {
    const text = document.getText();
    const templateRegex = /template\s*:\s*(["'`])([\s\S]*?)\1/g;

    for (const templateMatch of text.matchAll(templateRegex)) {
      const templateStart =
        templateMatch.index! + templateMatch[0].indexOf(templateMatch[2]);
      await decorateTemplate(templateStart, templateMatch[2]);
    }
  }

  // Vue <template> block (stripped from the parsed script, searched here)
  if (extension === '.vue') {
    const templateBlock = findTemplateBlock(document.getText());

    if (templateBlock) {
      await decorateTemplate(templateBlock.start, templateBlock.content);
    }
  }

  editor.setDecorations(translationDecorationType, [
    ...translationDecorations,
    ...duplicateDecorations,
  ]);
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
    if (isValidElementLike(value)) {
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
      isValidElementLike(entry) ? extractTextFromReactNode(entry) : entry
    );
  } catch {
    // Cyclic or non-serialisable value — nothing meaningful to preview.
    return '';
  }
};

const isValidElementLike = (obj: any): boolean =>
  obj &&
  typeof obj === 'object' &&
  'props' in obj &&
  (!('key' in obj) || obj.key === null || typeof obj.key === 'string');

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
