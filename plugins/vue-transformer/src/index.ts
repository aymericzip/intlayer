import { readFile, writeFile } from 'node:fs/promises';
import { parse as parseVue } from '@vue/compiler-sfc';
import MagicString from 'magic-string';
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

// Kept local as it's specific to Vue attributes, though shared list is 'title', 'placeholder' etc.
// If we want to strictly mutualize, we can pass it too.
const ATTRIBUTES_TO_EXTRACT = [
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'label',
];

export const processVueFile = async (
  filePath: string,
  componentKey: string,
  packageName: string,
  tools: Tools
) => {
  const { generateKey, shouldExtract, extractTsContent } = tools;
  const code = await readFile(filePath, 'utf-8');
  const sfc = parseVue(code);
  const magic = new MagicString(code);

  const extractedContent: Record<string, string> = {};
  const existingKeys = new Set<string>();

  // 3a. Template Extraction
  if (sfc.descriptor.template) {
    const walkVueAst = (node: any) => {
      if (node.type === 2) {
        // NodeTypes.TEXT
        const text = node.content;
        if (shouldExtract(text)) {
          const key = generateKey(text, existingKeys);
          existingKeys.add(key);
          extractedContent[key] = text.replace(/\s+/g, ' ').trim();
          magic.overwrite(
            node.loc.start.offset,
            node.loc.end.offset,
            `{{ content.${key} }}`
          );
        }
      } else if (node.type === 1) {
        // NodeTypes.ELEMENT
        node.props.forEach((prop: any) => {
          if (
            prop.type === 6 && // NodeTypes.ATTRIBUTE
            ATTRIBUTES_TO_EXTRACT.includes(prop.name) &&
            prop.value
          ) {
            const text = prop.value.content;
            if (shouldExtract(text)) {
              const key = generateKey(text, existingKeys);
              existingKeys.add(key);
              extractedContent[key] = text.trim();
              magic.overwrite(
                prop.loc.start.offset,
                prop.loc.end.offset,
                `:${prop.name}="content.${key}"`
              );
            }
          }
        });
      }

      if (node.children) {
        node.children.forEach(walkVueAst);
      }
    };
    walkVueAst(sfc.descriptor.template.ast);
  }

  // 3b. Script Extraction
  const scriptBlock = sfc.descriptor.scriptSetup || sfc.descriptor.script;
  if (scriptBlock) {
    const scriptContent = scriptBlock.content;
    const scriptOffset = scriptBlock.loc.start.offset;
    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const sourceFile = project.createSourceFile('temp.ts', scriptContent);

    const { extractedContent: scriptExtracted, replacements } =
      extractTsContent(sourceFile, existingKeys);
    Object.assign(extractedContent, scriptExtracted);

    for (const { node, key } of replacements) {
      // Calculate absolute pos
      const start = scriptOffset + node.getStart();
      const end = scriptOffset + node.getEnd();
      magic.overwrite(start, end, `content.${key}`);
    }
  }

  if (Object.keys(extractedContent).length === 0) return null;

  // Inject Script
  const importStmt = `import { useIntlayer } from '${packageName}';`;
  const contentDecl = `const content = useIntlayer('${componentKey}');`;

  if (sfc.descriptor.scriptSetup) {
    magic.appendLeft(
      sfc.descriptor.scriptSetup.loc.start.offset,
      `\n${importStmt}\n${contentDecl}\n`
    );
  } else if (sfc.descriptor.script) {
    magic.appendLeft(
      sfc.descriptor.script.loc.start.offset,
      `\n${importStmt}\n${contentDecl}\n`
    );
  } else {
    magic.prepend(`<script setup>\n${importStmt}\n${contentDecl}\n</script>\n`);
  }

  await writeFile(filePath, magic.toString());
  return extractedContent;
};
