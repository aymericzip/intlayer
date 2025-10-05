import { type Dictionary, NodeType } from '@intlayer/core';
import {
  Node,
  type ObjectLiteralExpression,
  Project,
  SyntaxKind,
  ts,
} from 'ts-morph';

const isTranslationNode = (
  value: unknown
): value is {
  nodeType?: NodeType;
  [NodeType.Translation]?: Record<string, unknown>;
} => {
  if (!value || typeof value !== 'object') return false;
  const v = value as any;
  const hasNodeTypeTranslation = v.nodeType === NodeType.Translation;
  const hasTranslationObject =
    v[NodeType.Translation] && typeof v[NodeType.Translation] === 'object';
  return Boolean(hasTranslationObject || hasNodeTypeTranslation);
};

const isEnumerationNode = (
  value: unknown
): value is {
  nodeType?: NodeType;
  [NodeType.Enumeration]?: Record<string, unknown>;
} => {
  if (!value || typeof value !== 'object') return false;
  const v = value as any;
  return (
    v.nodeType === NodeType.Enumeration ||
    (v[NodeType.Enumeration] && typeof v[NodeType.Enumeration] === 'object')
  );
};

const isConditionNode = (
  value: unknown
): value is {
  nodeType?: NodeType;
  [NodeType.Condition]?: Record<string, unknown>;
} => {
  if (!value || typeof value !== 'object') return false;
  const v = value as any;
  return (
    v.nodeType === NodeType.Condition ||
    (v[NodeType.Condition] && typeof v[NodeType.Condition] === 'object')
  );
};

const isGenderNode = (
  value: unknown
): value is {
  nodeType?: NodeType;
  [NodeType.Gender]?: Record<string, unknown>;
} => {
  if (!value || typeof value !== 'object') return false;
  const v = value as any;
  return (
    v.nodeType === NodeType.Gender ||
    (v[NodeType.Gender] && typeof v[NodeType.Gender] === 'object')
  );
};

const isInsertionNode = (
  value: unknown
): value is { nodeType?: NodeType; [NodeType.Insertion]?: unknown } => {
  if (!value || typeof value !== 'object') return false;
  const v = value as any;
  return v.nodeType === NodeType.Insertion || NodeType.Insertion in v;
};

const isMarkdownNode = (
  value: unknown
): value is { nodeType?: NodeType; [NodeType.Markdown]?: unknown } => {
  if (!value || typeof value !== 'object') return false;
  const v = value as any;
  return v.nodeType === NodeType.Markdown || NodeType.Markdown in v;
};

const isFileNode = (
  value: unknown
): value is { nodeType?: NodeType; [NodeType.File]?: string } => {
  if (!value || typeof value !== 'object') return false;
  const v = value as any;
  return v.nodeType === NodeType.File || typeof v[NodeType.File] === 'string';
};

const isNestedNode = (
  value: unknown
): value is {
  nodeType?: NodeType;
  [NodeType.Nested]?: { dictionaryKey?: string; path?: string };
} => {
  if (!value || typeof value !== 'object') return false;
  const v = value as any;
  return v.nodeType === NodeType.Nested || NodeType.Nested in v;
};

const buildTranslationInitializer = (
  translationMap: Record<string, unknown>
): string => {
  const entries = Object.entries(translationMap)
    // Keep stable order: identifiers first (a-z), then others, alphabetically
    .sort(([a], [b]) => a.localeCompare(b));

  const parts: string[] = [];
  for (const [lang, val] of entries) {
    const isValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(lang);
    const keyText = isValidIdentifier ? lang : JSON.stringify(lang);
    if (typeof val === 'string') {
      parts.push(`${keyText}: ${JSON.stringify(val)}`);
    } else {
      // Fallback to JSON for non-string values to avoid breaking
      parts.push(`${keyText}: ${JSON.stringify(val)}`);
    }
  }
  return `t({ ${parts.join(', ')} })`;
};

const stringifyKey = (key: string): string => {
  const isValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
  if (!isValidIdentifier) return JSON.stringify(key);
  if (key === 'true' || key === 'false') return JSON.stringify(key);
  return key;
};

const buildEnumerationInitializer = (map: Record<string, unknown>): string => {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(map)) {
    if (typeof v !== 'string') return ''; // unsupported
    parts.push(`${stringifyKey(k)}: ${JSON.stringify(v)}`);
  }
  return `enu({ ${parts.join(', ')} })`;
};

const buildConditionInitializer = (map: Record<string, unknown>): string => {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(map)) {
    if (typeof v !== 'string') return '';
    parts.push(`${stringifyKey(k)}: ${JSON.stringify(v)}`);
  }
  return `cond({ ${parts.join(', ')} })`;
};

const buildGenderInitializer = (map: Record<string, unknown>): string => {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(map)) {
    if (typeof v !== 'string') return '';
    parts.push(`${stringifyKey(k)}: ${JSON.stringify(v)}`);
  }
  return `gender({ ${parts.join(', ')} })`;
};

const buildInsertionInitializer = (content: unknown): string | undefined => {
  if (typeof content === 'string') return `insert(${JSON.stringify(content)})`;
  if (isTranslationNode(content)) {
    const translations: Record<string, unknown> =
      (content as any).translation ?? (content as any)['translation'] ?? {};
    const allStrings = Object.values(translations).every(
      (v) => typeof v === 'string'
    );
    if (!allStrings) return undefined;
    return `insert(${buildTranslationInitializer(
      translations as Record<string, string>
    )})`;
  }
  return undefined;
};

const buildFileInitializer = (path: unknown): string | undefined => {
  if (typeof path === 'string') return `file(${JSON.stringify(path)})`;
  return undefined;
};

const buildMarkdownInitializer = (content: unknown): string | undefined => {
  if (typeof content === 'string') return `md(${JSON.stringify(content)})`;
  if (isFileNode(content)) {
    const p = (content as any)[NodeType.File] as string;
    const fileInit = buildFileInitializer(p);
    if (!fileInit) return undefined;
    return `md(${fileInit})`;
  }
  return undefined;
};

const buildNestedInitializer = (obj: unknown): string | undefined => {
  const data = (obj as any)?.[NodeType.Nested] as
    | { dictionaryKey?: string; path?: string }
    | undefined;
  if (!data || typeof data.dictionaryKey !== 'string') return undefined;
  if (data.path && typeof data.path === 'string') {
    return `nest(${JSON.stringify(data.dictionaryKey)}, ${JSON.stringify(data.path)})`;
  }
  return `nest(${JSON.stringify(data.dictionaryKey)})`;
};

const readExistingTranslationMap = (
  contentObject: ObjectLiteralExpression,
  propName: string
): Record<string, string> | undefined => {
  const prop = contentObject.getProperty(propName);

  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;
  const init = prop.getInitializer();
  if (!init) return undefined;
  if (!Node.isCallExpression(init)) return undefined;
  const exp = init.getExpression();
  if (!Node.isIdentifier(exp) || exp.getText() !== 't') return undefined;
  const arg = init.getArguments()[0];
  if (!arg || !Node.isObjectLiteralExpression(arg)) return undefined;

  const map: Record<string, string> = {};
  for (const p of arg.getProperties()) {
    if (!Node.isPropertyAssignment(p)) continue;
    const nameNode = p.getNameNode();
    const rawName = nameNode.getText();
    const name = rawName.replace(/^['"]|['"]$/g, '');
    const valueInit = p.getInitializer();
    if (valueInit && Node.isStringLiteral(valueInit)) {
      map[name] = valueInit.getLiteralValue();
    }
  }
  return map;
};

const readExistingMapFromCall = (
  contentObject: ObjectLiteralExpression,
  propName: string,
  callee: 'enu' | 'cond' | 'gender'
): Record<string, string> | undefined => {
  const prop = contentObject.getProperty(propName);
  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;
  const init = prop.getInitializer();
  if (!init || !Node.isCallExpression(init)) return undefined;
  const exp = init.getExpression();
  if (!Node.isIdentifier(exp) || exp.getText() !== callee) return undefined;
  const arg = init.getArguments()[0];
  if (!arg || !Node.isObjectLiteralExpression(arg)) return undefined;
  const map: Record<string, string> = {};
  for (const p of arg.getProperties()) {
    if (!Node.isPropertyAssignment(p)) continue;
    const nameNode = p.getNameNode();
    const rawName = nameNode.getText();
    const name = rawName.replace(/^['"]|['"]$/g, '');
    const valueInit = p.getInitializer();
    if (valueInit && Node.isStringLiteral(valueInit)) {
      map[name] = valueInit.getLiteralValue();
    }
  }
  return map;
};

const areStringMapsEqual = (
  a: Record<string, unknown>,
  b: Record<string, string> | undefined
): boolean => {
  if (!b) return false;
  const aEntries = Object.entries(a).filter(
    ([, v]) => typeof v === 'string'
  ) as [string, string][];
  if (aEntries.length !== Object.keys(a).length) return false;
  if (aEntries.length !== Object.keys(b).length) return false;
  for (const [k, v] of aEntries) {
    if (!(k in b)) return false;
    if (b[k] !== v) return false;
  }
  return true;
};

type ExistingInsert =
  | { kind: 'string'; value: string }
  | { kind: 'translation'; map: Record<string, string> };

const readExistingInsertion = (
  contentObject: ObjectLiteralExpression,
  propName: string
): ExistingInsert | undefined => {
  const prop = contentObject.getProperty(propName);
  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;
  const init = prop.getInitializer();
  if (!init || !Node.isCallExpression(init)) return undefined;
  const exp = init.getExpression();
  if (!Node.isIdentifier(exp) || exp.getText() !== 'insert') return undefined;
  const arg = init.getArguments()[0];
  if (!arg) return undefined;
  if (Node.isStringLiteral(arg)) {
    return { kind: 'string', value: arg.getLiteralValue() };
  }
  if (Node.isCallExpression(arg)) {
    const aexp = arg.getExpression();
    if (Node.isIdentifier(aexp) && aexp.getText() === 't') {
      const tArg = arg.getArguments()[0];
      if (tArg && Node.isObjectLiteralExpression(tArg)) {
        const map: Record<string, string> = {};
        for (const p of tArg.getProperties()) {
          if (!Node.isPropertyAssignment(p)) continue;
          const nameNode = p.getNameNode();
          const rawName = nameNode.getText();
          const name = rawName.replace(/^['"]|['"]$/g, '');
          const valueInit = p.getInitializer();
          if (valueInit && Node.isStringLiteral(valueInit)) {
            map[name] = valueInit.getLiteralValue();
          }
        }
        return { kind: 'translation', map };
      }
    }
  }
  return undefined;
};

type ExistingMarkdown =
  | { kind: 'string'; value: string }
  | { kind: 'file'; path: string };

const readExistingMarkdown = (
  contentObject: ObjectLiteralExpression,
  propName: string
): ExistingMarkdown | undefined => {
  const prop = contentObject.getProperty(propName);
  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;
  const init = prop.getInitializer();
  if (!init || !Node.isCallExpression(init)) return undefined;
  const exp = init.getExpression();
  if (!Node.isIdentifier(exp) || exp.getText() !== 'md') return undefined;
  const arg = init.getArguments()[0];
  if (!arg) return undefined;
  if (Node.isStringLiteral(arg)) {
    return { kind: 'string', value: arg.getLiteralValue() };
  }
  if (Node.isCallExpression(arg)) {
    const aexp = arg.getExpression();
    if (Node.isIdentifier(aexp) && aexp.getText() === 'file') {
      const fArg = arg.getArguments()[0];
      if (fArg && Node.isStringLiteral(fArg)) {
        return { kind: 'file', path: fArg.getLiteralValue() };
      }
    }
  }
  return undefined;
};

const readExistingFilePath = (
  contentObject: ObjectLiteralExpression,
  propName: string
): string | undefined => {
  const prop = contentObject.getProperty(propName);
  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;
  const init = prop.getInitializer();
  if (!init || !Node.isCallExpression(init)) return undefined;
  const exp = init.getExpression();
  if (!Node.isIdentifier(exp) || exp.getText() !== 'file') return undefined;
  const arg = init.getArguments()[0];
  if (arg && Node.isStringLiteral(arg)) return arg.getLiteralValue();
  return undefined;
};

const readExistingNest = (
  contentObject: ObjectLiteralExpression,
  propName: string
): { dictionaryKey: string; path?: string } | undefined => {
  const prop = contentObject.getProperty(propName);
  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;
  let init = prop.getInitializer();
  if (!init) return undefined;
  // Unwrap type assertions and parentheses
  // Keep drilling until we reach a CallExpression or cannot unwrap further
  let safetyCounter = 0;
  while (safetyCounter++ < 5) {
    if (Node.isCallExpression(init)) break;
    // AsExpression, TypeAssertion, ParenthesizedExpression expose getExpression
    const anyInit = init as unknown as { getExpression?: () => unknown };
    const nextExpr = anyInit.getExpression?.();
    if (nextExpr && typeof nextExpr === 'object' && nextExpr !== init) {
      init = nextExpr as any;
      continue;
    }
    break;
  }
  if (!Node.isCallExpression(init)) return undefined;
  const exp = init.getExpression();
  if (!Node.isIdentifier(exp) || exp.getText() !== 'nest') return undefined;
  const [arg1, arg2] = init.getArguments();
  if (!arg1 || !Node.isStringLiteral(arg1)) return undefined;
  const dictionaryKey = arg1.getLiteralValue();
  let path: string | undefined;
  if (arg2 && Node.isStringLiteral(arg2)) path = arg2.getLiteralValue();
  return { dictionaryKey, path };
};

// Safely unwrap common wrapper nodes (satisfies/as/parenthesized) to reach the underlying ObjectLiteralExpression
const unwrapToObjectLiteral = (
  node: unknown
): ObjectLiteralExpression | undefined => {
  if (!node || typeof node !== 'object') return undefined;
  let current = node as any;
  let safetyCounter = 0;
  while (safetyCounter++ < 8) {
    if (Node.isObjectLiteralExpression(current)) return current;
    const next = current?.getExpression?.();
    if (next && typeof next === 'object' && next !== current) {
      current = next;
      continue;
    }
    break;
  }
  return undefined;
};

const readExistingArraySerialized = (
  contentObject: ObjectLiteralExpression,
  propName: string
): string[] | undefined => {
  const prop = contentObject.getProperty(propName);
  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;
  const init = prop.getInitializer();
  if (!init || !Node.isArrayLiteralExpression(init)) return undefined;

  const serialized: string[] = [];
  for (const el of init.getElements()) {
    if (Node.isStringLiteral(el)) {
      serialized.push(JSON.stringify(el.getLiteralValue()));
      continue;
    }
    if (Node.isNumericLiteral(el)) {
      serialized.push(el.getText());
      continue;
    }
    if (
      el.getKind() === SyntaxKind.TrueKeyword ||
      el.getKind() === SyntaxKind.FalseKeyword
    ) {
      serialized.push(el.getText());
      continue;
    }
    if (Node.isNullLiteral(el)) {
      serialized.push('null');
      continue;
    }
    if (Node.isCallExpression(el)) {
      const exp = el.getExpression();
      if (Node.isIdentifier(exp) && exp.getText() === 't') {
        const arg = el.getArguments()[0];
        if (arg && Node.isObjectLiteralExpression(arg)) {
          const map: Record<string, string> = {};
          for (const p of arg.getProperties()) {
            if (!Node.isPropertyAssignment(p)) return undefined;
            const nameNode = p.getNameNode();
            const rawName = nameNode.getText();
            const name = rawName.replace(/^['"]|['"]$/g, '');
            const valueInit = p.getInitializer();
            if (valueInit && Node.isStringLiteral(valueInit)) {
              map[name] = valueInit.getLiteralValue();
            } else {
              return undefined;
            }
          }
          serialized.push(buildTranslationInitializer(map));
          continue;
        }
      }
    }
    return undefined;
  }
  return serialized;
};

const serializeValue = (value: unknown): string | undefined => {
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value);
  if (value === null) return 'null';
  if (isTranslationNode(value)) {
    const translations: Record<string, unknown> =
      (value as any).translation ?? (value as any)['translation'] ?? {};
    const allStrings = Object.values(translations).every(
      (v) => typeof v === 'string'
    );
    if (!allStrings) return undefined;
    return buildTranslationInitializer(translations as Record<string, string>);
  }
  if (isEnumerationNode(value)) {
    const map = (value as any)[NodeType.Enumeration] as Record<string, unknown>;
    const init = buildEnumerationInitializer(map);
    return init || undefined;
  }
  if (isConditionNode(value)) {
    const map = (value as any)[NodeType.Condition] as Record<string, unknown>;
    const init = buildConditionInitializer(map);
    return init || undefined;
  }
  if (isGenderNode(value)) {
    const map = (value as any)[NodeType.Gender] as Record<string, unknown>;
    const init = buildGenderInitializer(map);
    return init || undefined;
  }
  if (isInsertionNode(value)) {
    const content = (value as any)[NodeType.Insertion];
    return buildInsertionInitializer(content);
  }
  if (isMarkdownNode(value)) {
    const content = (value as any)[NodeType.Markdown];
    return buildMarkdownInitializer(content);
  }
  if (isFileNode(value)) {
    const path = (value as any)[NodeType.File];
    return buildFileInitializer(path);
  }
  if (isNestedNode(value)) {
    return buildNestedInitializer(value);
  }
  return undefined;
};

/**
 * Updates a JavaScript/TypeScript file based on the provided JSON instructions.
 * It targets a specific dictionary object within the file (identified by its 'key' property)
 * and updates its 'content' entries. Currently, it focuses on modifying arguments
 * of 't' (translation) function calls.
 */
export const transformJSFile = async (
  fileContent: string,
  dictionary: Dictionary
): Promise<string> => {
  try {
    // If no content provided, nothing to transform
    if (!dictionary || typeof dictionary !== 'object' || !dictionary.content) {
      return fileContent;
    }

    const project = new Project({
      useInMemoryFileSystem: true,
      skipAddingFilesFromTsConfig: true,
      skipFileDependencyResolution: true,
      compilerOptions: {
        allowJs: true,
        jsx: ts.JsxEmit.Preserve,
      },
    });

    const sourceFile = project.createSourceFile('file.tsx', fileContent, {
      overwrite: true,
    });

    // Locate the root dictionary object that is exported as default
    let rootObject: ObjectLiteralExpression | undefined;

    const exportAssignment = sourceFile.getExportAssignment((_) => true);
    if (exportAssignment) {
      const expr = exportAssignment.getExpression();
      if (Node.isIdentifier(expr)) {
        // Prefer symbol resolution, but fall back to direct lookup by name
        const declFromSymbol = expr.getSymbol()?.getDeclarations()?.[0];
        const declByName =
          declFromSymbol ?? sourceFile.getVariableDeclaration(expr.getText());
        if (declByName && Node.isVariableDeclaration(declByName)) {
          const initAny = declByName.getInitializer();
          const obj = unwrapToObjectLiteral(initAny);
          if (obj) rootObject = obj;
        }
      } else if (Node.isObjectLiteralExpression(expr)) {
        rootObject = expr;
      }
    }

    // Fallback: find a variable of type Dictionary (or named content) initialized with an object
    if (!rootObject) {
      const varDecl = sourceFile.getVariableDeclaration((v) => {
        try {
          const typeText = v.getType().getText();
          return (
            typeText.includes('Dictionary') ||
            v.getName() === 'content' ||
            v.getName().toLowerCase().includes('dictionary')
          );
        } catch {
          return v.getName() === 'content';
        }
      });
      if (varDecl) {
        const obj = unwrapToObjectLiteral(varDecl.getInitializer());
        if (obj) rootObject = obj;
      }
    }

    // Fallback: handle CommonJS patterns like `module.exports = { ... }` or `exports.default = { ... }`
    if (!rootObject) {
      for (const stmt of sourceFile.getStatements()) {
        if (!Node.isExpressionStatement(stmt)) continue;
        const expr = stmt.getExpression();
        if (!Node.isBinaryExpression(expr)) continue;
        const operator = expr.getOperatorToken();
        if (operator.getText() !== '=') continue;
        const left = expr.getLeft();
        if (!Node.isPropertyAccessExpression(left)) continue;
        const leftExpr = left.getExpression();
        const leftName = left.getName();
        // module.exports = {...} or exports.default = {...}
        const isModuleExports =
          Node.isIdentifier(leftExpr) &&
          leftExpr.getText() === 'module' &&
          leftName === 'exports';
        const isExportsDefault =
          Node.isIdentifier(leftExpr) &&
          leftExpr.getText() === 'exports' &&
          leftName === 'default';
        if (!isModuleExports && !isExportsDefault) continue;

        const right = expr.getRight();
        if (Node.isObjectLiteralExpression(right)) {
          rootObject = right;
          break;
        }
        if (Node.isIdentifier(right)) {
          const decl = right.getSymbol()?.getDeclarations()?.[0];
          if (decl && Node.isVariableDeclaration(decl)) {
            const obj = unwrapToObjectLiteral(decl.getInitializer());
            if (obj) {
              rootObject = obj;
              break;
            }
          }
        }
      }
    }

    if (!rootObject) {
      return fileContent;
    }

    // Find the `content` property inside the root dictionary object
    const contentProp = rootObject.getProperty('content');
    let contentObject: ObjectLiteralExpression | undefined;
    if (contentProp && Node.isPropertyAssignment(contentProp)) {
      contentObject = contentProp.getInitializerIfKind(
        SyntaxKind.ObjectLiteralExpression
      );
    }

    if (!contentObject || !dictionary.content) {
      return fileContent;
    }

    // Build a set of existing property names in the content object
    const existingKeys = new Set<string>();
    for (const prop of contentObject.getProperties()) {
      if (Node.isPropertyAssignment(prop)) {
        const name = prop.getName();
        if (name) existingKeys.add(name.replace(/^['"]|['"]$/g, ''));
      }
    }

    let changed = false;
    const dictContent: Record<string, unknown> =
      (dictionary.content as unknown as Record<string, unknown>) || {};

    const areTranslationsEqual = (
      desired: Record<string, unknown>,
      existing: Record<string, string> | undefined
    ): boolean => {
      if (!existing) return false;
      for (const [lang, val] of Object.entries(desired)) {
        if (typeof val !== 'string') return false;
        if (!(lang in existing)) return false;
        if (existing[lang] !== val) return false;
      }
      return true;
    };

    for (const [key, value] of Object.entries(dictContent)) {
      // Handle array values (support primitives and translation nodes)
      if (Array.isArray(value)) {
        const serializedElements: string[] = [];
        let unsupported = false;
        for (const el of value as unknown[]) {
          const s = serializeValue(el);
          if (s === undefined) {
            unsupported = true;
            break;
          }
          serializedElements.push(s);
        }
        if (unsupported) {
          continue;
        }

        const initializerText = `[ ${serializedElements.join(', ')} ]`;

        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;
          continue;
        }

        const prop = contentObject.getProperty(key);
        if (prop && Node.isPropertyAssignment(prop)) {
          const existingSerialized = readExistingArraySerialized(
            contentObject,
            key
          );
          const arraysEqual =
            existingSerialized !== undefined &&
            existingSerialized.length === serializedElements.length &&
            existingSerialized.every((v, i) => v === serializedElements[i]);
          if (!arraysEqual) {
            prop.setInitializer(initializerText);
            changed = true;
          }
        }
        continue;
      }
      // Handle primitive values: string, number, boolean, null
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null
      ) {
        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer:
              typeof value === 'string' ? JSON.stringify(value) : String(value),
          });
          changed = true;
          continue;
        }

        const prop = contentObject.getProperty(key);
        if (prop && Node.isPropertyAssignment(prop)) {
          const init = prop.getInitializer();
          const currentText = init?.getText();
          const desiredText =
            typeof value === 'string' ? JSON.stringify(value) : String(value);
          if (currentText !== desiredText) {
            prop.setInitializer(desiredText);
            changed = true;
          }
        }
        continue;
      }

      // Handle translation nodes: { nodeType: 'translation', translation: { ... } }
      if (isTranslationNode(value)) {
        const translations: Record<string, unknown> =
          (value as any).translation ?? (value as any)['translation'] ?? {};

        // Only handle translation nodes where all values are plain strings
        const allStrings = Object.values(translations).every(
          (v) => typeof v === 'string'
        );
        if (!allStrings) {
          continue;
        }

        const initializerText = buildTranslationInitializer(
          translations as Record<string, string>
        );

        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;
          continue;
        }

        const existingMap = readExistingTranslationMap(contentObject, key);
        if (!areTranslationsEqual(translations, existingMap)) {
          const prop = contentObject.getProperty(key);
          if (prop && Node.isPropertyAssignment(prop)) {
            prop.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle enumeration nodes
      else if (isEnumerationNode(value)) {
        const map = (value as any)[NodeType.Enumeration] as Record<
          string,
          unknown
        >;
        if (!Object.values(map).every((v) => typeof v === 'string')) continue;
        const initializerText = buildEnumerationInitializer(map);
        if (!initializerText) continue;
        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;
          continue;
        }
        const existingMap = readExistingMapFromCall(contentObject, key, 'enu');
        if (!areStringMapsEqual(map, existingMap)) {
          const prop = contentObject.getProperty(key);
          if (prop && Node.isPropertyAssignment(prop)) {
            prop.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle condition nodes
      else if (isConditionNode(value)) {
        const map = (value as any)[NodeType.Condition] as Record<
          string,
          unknown
        >;
        if (!Object.values(map).every((v) => typeof v === 'string')) continue;
        const initializerText = buildConditionInitializer(map);
        if (!initializerText) continue;
        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;
          continue;
        }
        const existingMap = readExistingMapFromCall(contentObject, key, 'cond');
        if (!areStringMapsEqual(map, existingMap)) {
          const prop = contentObject.getProperty(key);
          if (prop && Node.isPropertyAssignment(prop)) {
            prop.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle gender nodes
      else if (isGenderNode(value)) {
        const map = (value as any)[NodeType.Gender] as Record<string, unknown>;
        if (!Object.values(map).every((v) => typeof v === 'string')) continue;
        const initializerText = buildGenderInitializer(map);
        if (!initializerText) continue;
        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;
          continue;
        }
        const existingMap = readExistingMapFromCall(
          contentObject,
          key,
          'gender'
        );
        if (!areStringMapsEqual(map, existingMap)) {
          const prop = contentObject.getProperty(key);
          if (prop && Node.isPropertyAssignment(prop)) {
            prop.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle insertion nodes
      else if (isInsertionNode(value)) {
        const desired = (value as any)[NodeType.Insertion];
        const initializerText = buildInsertionInitializer(desired);
        if (!initializerText) continue;
        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;
          continue;
        }
        const existing = readExistingInsertion(contentObject, key);
        const isSame =
          (typeof desired === 'string' &&
            existing?.kind === 'string' &&
            existing.value === desired) ||
          (isTranslationNode(desired) &&
            existing?.kind === 'translation' &&
            areStringMapsEqual(
              (desired as any)[NodeType.Translation] ?? {},
              existing.map
            ));
        if (!isSame) {
          const prop = contentObject.getProperty(key);
          if (prop && Node.isPropertyAssignment(prop)) {
            prop.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle markdown nodes
      else if (isMarkdownNode(value)) {
        const desired = (value as any)[NodeType.Markdown];
        const initializerText = buildMarkdownInitializer(desired);
        if (!initializerText) continue;
        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;
          continue;
        }
        const existing = readExistingMarkdown(contentObject, key);
        const isSame =
          (typeof desired === 'string' &&
            existing?.kind === 'string' &&
            existing.value === desired) ||
          (isFileNode(desired) &&
            existing?.kind === 'file' &&
            existing.path === (desired as any)[NodeType.File]);
        if (!isSame) {
          const prop = contentObject.getProperty(key);
          if (prop && Node.isPropertyAssignment(prop)) {
            prop.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle file nodes
      else if (isFileNode(value)) {
        const desired = (value as any)[NodeType.File];
        const initializerText = buildFileInitializer(desired);
        if (!initializerText) continue;
        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;
          continue;
        }
        const existing = readExistingFilePath(contentObject, key);
        if (existing !== desired) {
          const prop = contentObject.getProperty(key);
          if (prop && Node.isPropertyAssignment(prop)) {
            prop.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle nested nodes
      else if (isNestedNode(value)) {
        const initializerText = buildNestedInitializer(value);
        if (!initializerText) continue;
        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;
          continue;
        }
        const existing = readExistingNest(contentObject, key);
        const desired = (value as any)[NodeType.Nested] as
          | { dictionaryKey?: string; path?: string }
          | undefined;
        const isSame =
          !!desired &&
          existing?.dictionaryKey === desired.dictionaryKey &&
          existing?.path === desired.path;
        if (!isSame) {
          const prop = contentObject.getProperty(key);
          if (prop && Node.isPropertyAssignment(prop)) {
            prop.setInitializer(initializerText);
            changed = true;
          }
        }
      }
    }

    if (!changed) return fileContent;

    return sourceFile.getFullText();
  } catch {
    // Fail-safe: return original content on any unexpected parsing issue
    return fileContent;
  }
};
