import { promises as fs } from 'node:fs';
import { extname } from 'node:path';
import {
  getPropertyKeyName,
  nodeStart,
  type OxcNode,
  offsetToLineCol,
  parseFile,
} from './oxcParser';

const findVariableDeclarator = (
  program: OxcNode,
  name: string
): OxcNode | null => {
  for (const stmt of (program['body'] as OxcNode[]) ?? []) {
    if (stmt['type'] !== 'VariableDeclaration') continue;
    for (const decl of (stmt['declarations'] as OxcNode[]) ?? []) {
      const id = decl['id'] as OxcNode | undefined;
      if (id?.['type'] === 'Identifier' && id['name'] === name) return decl;
    }
  }
  return null;
};

const getPropertyKey = (prop: OxcNode): string =>
  getPropertyKeyName(prop['key'] as OxcNode);

const unwrapExpression = (
  node: OxcNode | undefined | null
): OxcNode | undefined | null => {
  const t = node?.['type'] as string | undefined;
  if (t === 'TSSatisfiesExpression' || t === 'TSAsExpression')
    return node!['expression'] as OxcNode;
  return node;
};

export const findFieldLocation = async (
  filePath: string,
  keyPath: string[]
): Promise<{ line: number; character: number } | null> => {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const ext = extname(filePath);

    if (['.json', '.json5', '.jsonc'].includes(ext)) {
      return findLocationInJson(fileContent, keyPath);
    }

    const program = parseFile(fileContent);
    if (!program) return null;

    const body = program['body'] as OxcNode[] | undefined;
    if (!body) return null;

    let rootObject: OxcNode | undefined | null;

    const exportDefault = body.find(
      (n) => n['type'] === 'ExportDefaultDeclaration'
    );

    if (exportDefault) {
      const decl = unwrapExpression(exportDefault['declaration'] as OxcNode);

      if (decl?.['type'] === 'ObjectExpression') {
        rootObject = decl;
      } else if (
        decl?.['type'] === 'Identifier' &&
        typeof decl['name'] === 'string'
      ) {
        const varDecl = findVariableDeclarator(program, decl['name'] as string);
        if (varDecl) {
          const init = unwrapExpression(varDecl['init'] as OxcNode | undefined);
          if (init?.['type'] === 'ObjectExpression') rootObject = init;
        }
      }
    }

    if (!rootObject) return null;

    let currentNode: OxcNode | undefined | null = rootObject;
    let lastFoundNode: OxcNode | undefined | null = null;

    for (const key of keyPath) {
      if (currentNode?.['type'] !== 'ObjectExpression') {
        if (currentNode?.['type'] === 'CallExpression') {
          const args = currentNode['arguments'] as OxcNode[] | undefined;
          if (args?.length && args[0]['type'] === 'ObjectExpression') {
            currentNode = args[0];
          } else {
            break;
          }
        } else {
          break;
        }
      }

      if (currentNode?.['type'] === 'ObjectExpression') {
        const properties = currentNode['properties'] as OxcNode[] | undefined;
        const prop = properties?.find(
          (p) =>
            (p['type'] === 'Property' || p['type'] === 'ObjectProperty') &&
            getPropertyKey(p) === key
        );

        if (!prop) break;

        lastFoundNode = prop;
        currentNode = prop['value'] as OxcNode | undefined | null;
      }
    }

    if (
      lastFoundNode &&
      (lastFoundNode['type'] === 'Property' ||
        lastFoundNode['type'] === 'ObjectProperty')
    ) {
      const keyNode = lastFoundNode['key'] as OxcNode | undefined;
      if (keyNode) {
        return offsetToLineCol(fileContent, nodeStart(keyNode));
      }
    }

    return null;
  } catch (error) {
    console.error('Error finding field location:', error);
    return null;
  }
};

const findLocationInJson = (
  content: string,
  keyPath: string[]
): { line: number; character: number } | null => {
  let currentIndex = 0;
  let resultLine = 0;
  let resultChar = 0;

  for (const key of keyPath) {
    const regex = new RegExp(`(["'])${key}\\1\\s*:`, 'g');
    regex.lastIndex = currentIndex;
    const match = regex.exec(content);

    if (!match) return null;

    currentIndex = match.index + match[0].length;

    const contentUpToMatch = content.substring(0, match.index);
    const lines = contentUpToMatch.split('\n');
    resultLine = lines.length - 1;
    resultChar = lines[lines.length - 1].length;
  }
  return { line: resultLine, character: resultChar };
};
