import { readFile, writeFile } from 'node:fs/promises';
import MagicString from 'magic-string';
import * as svelteCompiler from 'svelte/compiler'; // Works for Svelte 3/4/5
import { type Node, Project, type SourceFile } from 'ts-morph';

type TsReplacement = {
  node: Node;
  key: string;
  type: 'jsx-text' | 'jsx-attribute' | 'string-literal';
};

type Tools = {
  generateKey: (text: string, existingKeys: Set<string>) => string;
  shouldExtract: (text: string) => boolean;
  extractTsContent: (
    sourceFile: SourceFile,
    existingKeys: Set<string>
  ) => {
    extractedContent: Record<string, string>;
    replacements: TsReplacement[];
  };
};

const ATTRIBUTES_TO_EXTRACT = [
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'label',
];

export const processSvelteFile = async (
  filePath: string,
  componentKey: string,
  packageName: string,
  tools: Tools,
  save: boolean = true
) => {
  const { generateKey, shouldExtract, extractTsContent } = tools;
  const code = await readFile(filePath, 'utf-8');

  const ast = svelteCompiler.parse(code);
  const magic = new MagicString(code);

  const extractedContent: Record<string, string> = {};
  const existingKeys = new Set<string>();

  const walkSvelte = (node: any) => {
    if (node.type === 'Text') {
      const text = node.data;
      if (shouldExtract(text)) {
        const key = generateKey(text, existingKeys);
        existingKeys.add(key);
        extractedContent[key] = text.replace(/\s+/g, ' ').trim();
        magic.overwrite(node.start, node.end, `{$content.${key}}`);
      }
    } else if (
      node.type === 'Attribute' &&
      ATTRIBUTES_TO_EXTRACT.includes(node.name)
    ) {
      if (
        node.value &&
        node.value.length === 1 &&
        node.value[0].type === 'Text'
      ) {
        const text = node.value[0].data;
        if (shouldExtract(text)) {
          const key = generateKey(text, existingKeys);
          existingKeys.add(key);
          extractedContent[key] = text.trim();
          magic.overwrite(
            node.start,
            node.end,
            `${node.name}={$content.${key}}`
          );
        }
      }
    }

    if (node.children) node.children.forEach(walkSvelte);
    else if (node.fragment?.children)
      node.fragment.children.forEach(walkSvelte);
    if (node.attributes) node.attributes.forEach(walkSvelte);
  };

  walkSvelte(ast.html);

  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
  const match = scriptRegex.exec(code);
  let scriptExtractedKeys = 0;

  if (match) {
    const scriptContent = match[1];
    // Offset: index + length of opening tag. match[0] is whole tag, match[1] is content.
    // match.index is start of <script...
    const openTagLength = match[0].indexOf(scriptContent);
    const scriptOffset = match.index + openTagLength;

    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const sourceFile = project.createSourceFile('temp.ts', scriptContent);

    const { extractedContent: scriptExtracted, replacements } =
      extractTsContent(sourceFile, existingKeys);
    Object.assign(extractedContent, scriptExtracted);
    scriptExtractedKeys = Object.keys(scriptExtracted).length;

    for (const { node, key } of replacements) {
      const start = scriptOffset + node.getStart();
      const end = scriptOffset + node.getEnd();
      magic.overwrite(start, end, `get(content).${key}`);
    }
  }

  if (Object.keys(extractedContent).length === 0) return null;

  // Inject Script
  const importStmt = `import { useIntlayer } from '${packageName}';`;
  const getImportStmt = `import { get } from 'svelte/store';`;
  const callStmt = `const content = useIntlayer('${componentKey}');`;

  if (match) {
    const scriptContentStart = match.index + match[0].indexOf('>') + 1;
    magic.appendLeft(
      scriptContentStart,
      `\n  ${importStmt}\n  ${scriptExtractedKeys > 0 ? getImportStmt : ''}\n  ${callStmt}\n`
    );
  } else {
    magic.prepend(`<script>\n  ${importStmt}\n  ${callStmt}\n</script>\n`);
  }

  if (save) {
    await writeFile(filePath, magic.toString());
  }
  return extractedContent;
};
