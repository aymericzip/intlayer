import { dirname, extname, join } from 'node:path';
import {
  type DecorationOptions,
  type Disposable,
  Range,
  type TextEditor,
  window,
  workspace,
} from 'vscode';
import { extractScriptContent } from '../utils/extractScript';
import { findProjectRoot } from '../utils/findProjectRoot';
import {
  findUsagesOfDictionary,
  type UsageLocation,
} from '../utils/findUsages';
import { getCachedConfig, getCachedDictionary } from '../utils/intlayerCache';
import {
  findAllOfType,
  getPropertyKeyName,
  nodeEnd,
  nodeStart,
  type OxcNode,
  parseFile,
} from '../utils/oxcParser';

const DEBOUNCE_DELAY = 1000;

// --- Caching Strategy ---
const usageCache = new Map<
  string,
  { timestamp: number; data: UsageLocation[] }
>();
const CACHE_TTL = 5 * 1000; // 5 sec

// 1. Strikethrough for the KEY itself
const strikeDecorationType = window.createTextEditorDecorationType({
  textDecoration: 'line-through',
  opacity: '0.6',
});

// 2. Text Label: Unused
const unusedTextDecorationType = window.createTextEditorDecorationType({
  after: {
    contentText: ' (unused)',
    color: 'rgba(128, 128, 128, 0.3)',
    fontStyle: 'italic',
    margin: '0 0 0 1ch',
  },
});

export const intlayerUnusedDecorationProvider = (): Disposable[] => {
  let activeEditor = window.activeTextEditor;
  let timeout: NodeJS.Timeout | undefined;

  const triggerUpdate = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (activeEditor) {
        updateUnusedDecorations(activeEditor);
      }
    }, DEBOUNCE_DELAY);
  };

  if (activeEditor) {
    triggerUpdate();
  }

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
  ];
};

const getKeysFromObject = (
  obj: OxcNode,
  prefix = ''
): { key: string; node: OxcNode }[] => {
  const keys: { key: string; node: OxcNode }[] = [];
  for (const prop of (obj['properties'] as OxcNode[]) ?? []) {
    if (prop['type'] !== 'Property' && prop['type'] !== 'ObjectProperty')
      continue;

    const nameNode = prop['key'] as OxcNode;
    const name = getPropertyKeyName(nameNode);
    const fullKey = prefix ? `${prefix}.${name}` : name;

    const initializer = prop['value'] as OxcNode | undefined;

    if (initializer?.['type'] === 'CallExpression') {
      const callee = initializer['callee'] as OxcNode | undefined;
      if (callee?.['type'] === 'Identifier' && callee['name'] === 't') {
        keys.push({ key: fullKey, node: nameNode });
        continue;
      }
    }

    if (initializer?.['type'] === 'ObjectExpression') {
      keys.push({ key: fullKey, node: nameNode });
      keys.push(...getKeysFromObject(initializer, fullKey));
    } else {
      keys.push({ key: fullKey, node: nameNode });
    }
  }
  return keys;
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
];

const updateUnusedDecorations = async (editor: TextEditor) => {
  const document = editor.document;

  const extension = extname(document.uri.fsPath).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return;
  }

  const text = document.getText();

  if (!text.includes('key:') || !text.includes('content:')) {
    return;
  }

  const projectDir = findProjectRoot(dirname(document.uri.fsPath));

  if (!projectDir) {
    return;
  }

  const scriptContent = extractScriptContent(text, extension);

  const keyMatch = /key\s*:\s*(["'])(.*?)\1/.exec(text);

  if (!keyMatch) {
    return;
  }
  const dictionaryKey = keyMatch[2];
  const keyIndex = text.indexOf(keyMatch[0]);

  let isDuplicated = false;
  let duplicateDecoration: DecorationOptions | null = null;

  try {
    const config = await getCachedConfig(projectDir);

    if (config.compiler?.enabled && !config.compiler?.saveComponents) {
      editor.setDecorations(strikeDecorationType, []);
      editor.setDecorations(unusedTextDecorationType, []);
      return;
    }

    const filePath = document.uri.fsPath;
    if (
      !config.content.fileExtensions.some((extension) =>
        filePath.endsWith(extension)
      )
    ) {
      // It's not a content file
      return;
    }

    const dictionaryJsonPath = join(
      config.system.unmergedDictionariesDir,
      `${dictionaryKey}.json`
    );
    const existingDictionaries = await getCachedDictionary(dictionaryJsonPath);

    if (existingDictionaries && existingDictionaries.length > 0) {
      const currentAbsPath = document.uri.fsPath;
      let localDuplicates = 0;
      let remoteDuplicates = 0;

      for (const dict of existingDictionaries) {
        if (dict.location === 'remote') {
          remoteDuplicates++;
        }

        if (dict.filePath) {
          const dictAbsPath = join(projectDir, dict.filePath);

          if (dictAbsPath !== currentAbsPath) {
            localDuplicates++;
          }
        }
      }

      const totalOther = localDuplicates + remoteDuplicates;

      if (totalOther > 0) {
        isDuplicated = true;
        let label = `(used by ${totalOther} more`;

        if (localDuplicates > 0) {
          label += ` - ${localDuplicates} local`;
        }

        if (remoteDuplicates > 0) {
          label += ` - ${remoteDuplicates} remote`;
        }
        label += ')';

        if (keyIndex !== -1) {
          const line = document.lineAt(document.positionAt(keyIndex).line);
          duplicateDecoration = {
            range: new Range(line.range.end, line.range.end),
            renderOptions: {
              after: { contentText: label },
            },
          };
        }
      }
    }
  } catch (error) {
    console.error('Error checking for duplicates:', error);
  }

  const cacheKey = `${projectDir}:${dictionaryKey}`;
  const now = Date.now();
  let usages: UsageLocation[] | undefined;

  const cached = usageCache.get(cacheKey);

  if (cached && now - cached.timestamp < CACHE_TTL) {
    usages = cached.data;
  } else {
    try {
      usages = await findUsagesOfDictionary(projectDir, dictionaryKey);
      usageCache.set(cacheKey, { timestamp: now, data: usages });
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const isDictionaryUsed = usages && usages.length > 0;
  const usedKeys = new Set<string>();

  if (isDictionaryUsed && usages) {
    for (const usage of usages) {
      usage.keysUsed.forEach((keyItem) => {
        usedKeys.add(keyItem);
      });
    }
  }

  const strikeDecorations: DecorationOptions[] = [];
  const unusedTextDecorations: DecorationOptions[] = [];
  const duplicateDecorations: DecorationOptions[] = [];

  if (duplicateDecoration) {
    duplicateDecorations.push(duplicateDecoration);
  }

  const addUnused = (range: Range, hover: string) => {
    strikeDecorations.push({ range, hoverMessage: hover });
    const line = document.lineAt(range.start.line);
    unusedTextDecorations.push({
      range: new Range(line.range.end, line.range.end),
    });
  };

  if (!isDictionaryUsed && !isDuplicated) {
    if (keyIndex !== -1) {
      const startPos = document.positionAt(keyIndex);
      const endPos = document.positionAt(keyIndex + keyMatch[0].length);
      addUnused(
        new Range(startPos, endPos),
        'This dictionary is never used in the project'
      );
    }
  }

  const program = parseFile(scriptContent);
  if (!program) {
    editor.setDecorations(strikeDecorationType, strikeDecorations);
    editor.setDecorations(unusedTextDecorationType, unusedTextDecorations);
    editor.setDecorations(unusedTextDecorationType, duplicateDecorations);
    return;
  }

  const dictionaryObj = findAllOfType(program, 'ObjectExpression').find(
    (obj) => {
      const propNames = (obj['properties'] as OxcNode[])
        .filter(
          (p) => p['type'] === 'Property' || p['type'] === 'ObjectProperty'
        )
        .map((p) => getPropertyKeyName(p['key'] as OxcNode));
      return propNames.includes('key') && propNames.includes('content');
    }
  );

  if (dictionaryObj) {
    const contentProp = (dictionaryObj['properties'] as OxcNode[]).find(
      (p) =>
        (p['type'] === 'Property' || p['type'] === 'ObjectProperty') &&
        getPropertyKeyName(p['key'] as OxcNode) === 'content'
    );

    if (contentProp) {
      const contentValue = contentProp['value'] as OxcNode | undefined;

      if (contentValue?.['type'] === 'ObjectExpression') {
        const allKeys = getKeysFromObject(contentValue);

        for (const { key: rawKey, node } of allKeys) {
          if (!isDictionaryUsed) continue;

          if (!usedKeys.has(rawKey) && !usedKeys.has('__ALL__')) {
            const startPos = document.positionAt(nodeStart(node));
            const endPos = document.positionAt(nodeEnd(node));

            addUnused(
              new Range(startPos, endPos),
              `Property '${rawKey}' is unused`
            );
          }
        }
      }
    }
  }

  editor.setDecorations(strikeDecorationType, strikeDecorations);
  editor.setDecorations(unusedTextDecorationType, unusedTextDecorations);
  editor.setDecorations(unusedTextDecorationType, duplicateDecorations);
};
