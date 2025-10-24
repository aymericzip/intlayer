import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { colorizePath, x } from '@intlayer/config';
import {
  deepTransformNode,
  type FileContent,
  type FileContentConstructor,
  type InsertionContent,
  type InsertionContentConstructor,
  type MarkdownContent,
  type MarkdownContentConstructor,
  type Plugins,
} from '@intlayer/core';
import { type Dictionary, NodeType } from '@intlayer/types';

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
      const absoluteFilePath = join(process.cwd(), filePath);

      // Create the file directory if it doesn't exist
      const fileDirectory = dirname(absoluteFilePath);

      if (!existsSync(fileDirectory)) {
        mkdirSync(fileDirectory, { recursive: true });
      }

      // Write the file
      writeFileSync(absoluteFilePath, fileContent);
    } catch (error) {
      throw new Error(
        `${x} Error writing file to ${colorizePath(filePath)}: ${error}`
      );
    }

    const transformedFileContent: FileContentConstructor = {
      nodeType: NodeType.File,
      [NodeType.File]: node.file,
    };

    return transformedFileContent;
  },
};

/**
 * Markdown file plugin
 */

const markdownFilePlugin: Plugins = {
  id: 'markdown-file-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Markdown,
  transform: (node: MarkdownContent, props, deepTransformNode) => {
    const simplifiedMarkdownNode: MarkdownContentConstructor = {
      nodeType: NodeType.Markdown,
      [NodeType.Markdown]: deepTransformNode(node.markdown, props),
    };

    return simplifiedMarkdownNode;
  },
};

/**
 * Insertion file plugin
 */

const insertionFilePlugin: Plugins = {
  id: 'insertion-file-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Insertion,
  transform: (node: InsertionContent, props, deepTransformNode) => {
    const simplifiedInsertionNode: InsertionContentConstructor = {
      nodeType: NodeType.Insertion,
      [NodeType.Insertion]: deepTransformNode(node.insertion, props),
    };

    return simplifiedInsertionNode;
  },
};

export const processContentDeclarationContent = async (
  dictionary: Dictionary
) =>
  deepTransformNode(dictionary, {
    dictionaryKey: dictionary.key,
    keyPath: [],
    plugins: [writeFilePlugin, markdownFilePlugin, insertionFilePlugin],
  });
