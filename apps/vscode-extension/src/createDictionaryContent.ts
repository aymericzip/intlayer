import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { basename, extname, relative } from 'node:path';
import { extractDictionaryInfo } from '@intlayer/babel';
import { getConfiguration } from '@intlayer/config/node';
import {
  detectFormatCommand,
  getContentDeclarationFileTemplate,
} from '@intlayer/engine/cli';
import {
  getExtensionFromFormat,
  getFormatFromExtension,
} from '@intlayer/engine/utils';
import {
  Position,
  Range,
  Selection,
  TextEditorRevealType,
  window,
  workspace,
} from 'vscode';
import { invalidateConfigurationCaches } from './utils/cacheInvalidation';
import { findProjectRoot } from './utils/findProjectRoot';
import { getConfigurationOptions } from './utils/getConfiguration';

/** Position right after the opening brace of the `content` object or after frontmatter. */
const getContentPosition = (fileContent: string): Position => {
  const lines = fileContent.split('\n');

  let frontmatterCount = 0;
  for (const [lineIndex, line] of lines.entries()) {
    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount === 2) {
        return new Position(lineIndex + 1, 0);
      }
    }

    // `content: {`, `"content": {` or `'content': {`
    const match = /["']?content["']?\s*:\s*\{/.exec(line);

    if (match) {
      return new Position(lineIndex, match.index + match[0].length);
    }
  }

  return new Position(0, 0);
};

/** Formats the extension can scaffold a content file for. */
export type ContentFileFormat =
  | 'ts'
  | 'esm'
  | 'cjs'
  | 'json'
  | 'jsonc'
  | 'json5'
  | 'md'
  | 'yaml';

export const generateDictionaryContent = async (format: ContentFileFormat) => {
  const editor = window.activeTextEditor;
  if (!editor) {
    await window.showErrorMessage('No active text editor');
    return;
  }

  const projectDir = findProjectRoot();

  if (!projectDir) {
    await window.showErrorMessage(`Could not find intlayer project root.`);
    return;
  }

  const configOptions = await getConfigurationOptions(projectDir);
  const configuration = getConfiguration(configOptions);

  const { output } = configuration.compiler;

  if (!output) {
    // The user is asked to edit the configuration before retrying
    invalidateConfigurationCaches();

    await window.showErrorMessage(
      `No output configuration found. Add a 'compiler.output' in your configuration, then retry.`
    );

    return;
  }

  // Grab the entire file text to parse for an exported component name
  const fileText = editor.document.getText();

  // Derive base name (without extension) from something like 'MyComponent.tsx' => 'MyComponent'
  //    or from 'index.jsx' => 'index'
  const { dictionaryKey, absolutePath: rawAbsolutePath } =
    await extractDictionaryInfo(
      editor.document.uri.fsPath,
      fileText,
      configuration,
      format
    );

  let absolutePath = rawAbsolutePath;
  const currentExtension = extname(rawAbsolutePath);
  const detectedFormat = getFormatFromExtension(currentExtension);

  if (detectedFormat !== format) {
    const targetExtension = getExtensionFromFormat(format);
    absolutePath =
      rawAbsolutePath.slice(0, -currentExtension.length) + targetExtension;
  }

  const relativePath = relative(configuration.system.baseDir, absolutePath);

  // Create the actual content using shared template logic
  const fileData = await getContentDeclarationFileTemplate(
    dictionaryKey,
    format
  );

  // Write the file if not existing already (or ask to overwrite)
  if (existsSync(absolutePath)) {
    const overwrite = await window.showWarningMessage(
      `${basename(absolutePath)} already exists. Overwrite?`,
      'Yes',
      'No'
    );
    if (overwrite !== 'Yes') {
      return;
    }
  }

  await writeFile(absolutePath, fileData, 'utf8');

  try {
    if (configOptions.require) {
      const formatCommand = detectFormatCommand(
        configuration,
        configOptions.require
      );

      if (formatCommand) {
        execSync(formatCommand.replace('{{file}}', absolutePath), {
          stdio: 'inherit',
          cwd: configuration.system.baseDir,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }

  await window.showInformationMessage(`Dictionary created: ${relativePath}`);

  // Open the newly created file in VS Code
  const document = await workspace.openTextDocument(absolutePath);
  const newEditor = await window.showTextDocument(document); // Capture the newEditor instance

  const position = getContentPosition(fileData);
  newEditor.selection = new Selection(position, position);
  newEditor.revealRange(
    new Range(position, position),
    TextEditorRevealType.InCenter
  );
};
