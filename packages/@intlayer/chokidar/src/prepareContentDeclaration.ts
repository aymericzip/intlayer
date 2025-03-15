import {
  deepTransformNode,
  type Plugins,
  type Dictionary,
  NodeType,
  type FileContent,
  type FileContentConstructer,
  type MarkdownContent,
  type InsertionContent,
  type MarkdownContentConstructer,
  type InsertionContentConstructer,
} from '@intlayer/core';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Write file plugin
 */

const writeFilePlugin: Plugins = {
  id: 'write-file-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.File,
  transform: (node: FileContent) => {
    const fileContent = node.content;
    const filePath = node.fixedPath;

    if (typeof fileContent !== 'string') {
      throw new Error('File content must be a string');
    }

    if (typeof filePath !== 'string') {
      throw new Error('File path must be a string');
    }

    // Write the file to the file system
    try {
      const abolsuteFilePath = join(process.cwd(), filePath);

      // Create the file directory if it doesn't exist
      const fileDirectory = join(process.cwd(), filePath);
      if (!fileDirectory.startsWith(process.cwd())) {
        throw new Error('File directory not found');
      }

      if (!existsSync(fileDirectory)) {
        mkdirSync(fileDirectory, { recursive: true });
      }

      // Write the file
      writeFileSync(abolsuteFilePath, fileContent);
    } catch (error) {
      throw new Error(`Error writing file to ${filePath}: ${error}`);
    }

    const transformedFileContent: FileContentConstructer = {
      nodeType: NodeType.File,
      [NodeType.File]: node.file,
    };

    return transformedFileContent;
  },
};

/**
 * Markdown file plugin
 */

const mardownFilePlugin: Plugins = {
  id: 'markdown-file-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Markdown,
  transform: (node: MarkdownContent, props, deepTransformNode) => {
    const simplifiedMarkdownNode: MarkdownContentConstructer = {
      nodeType: NodeType.Markdown,
      [NodeType.Markdown]: deepTransformNode(node.markdown, props),
    };

    return simplifiedMarkdownNode;
  },
};

/**
 * Injection file plugin
 */

const insertionFilePlugin: Plugins = {
  id: 'insertion-file-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Insertion,
  transform: (node: InsertionContent, props, deepTransformNode) => {
    const simplifiedInsertionNode: InsertionContentConstructer = {
      nodeType: NodeType.Insertion,
      [NodeType.Insertion]: deepTransformNode(node.insertion, props),
    };

    return simplifiedInsertionNode;
  },
};

export const prepareContentDeclaration = async (dictionary: Dictionary) =>
  deepTransformNode(dictionary, {
    dictionaryKey: dictionary.key,
    keyPath: [],
    plugins: [writeFilePlugin, mardownFilePlugin, insertionFilePlugin],
  });
