import { extname } from 'node:path';
import { type Extension, getFormatFromExtension } from '@intlayer/engine/utils';
import { window } from 'vscode';
import {
  type ContentFileFormat,
  generateDictionaryContent,
} from '../createDictionaryContent';

export const createDictionaryFile = async () => {
  const filePath = window.activeTextEditor?.document.uri.fsPath;

  let format: ContentFileFormat | undefined;

  if (filePath) {
    const extension = extname(filePath) as Extension;
    format = getFormatFromExtension(extension) as ContentFileFormat;
  } else {
    format = await window
      .showQuickPick(
        [
          { label: 'TypeScript (.ts)', value: 'ts' },
          { label: 'ESM (.js)', value: 'esm' },
          { label: 'CommonJS (.js)', value: 'cjs' },
          { label: 'JSON (.json)', value: 'json' },
          { label: 'JSONC (.jsonc)', value: 'jsonc' },
          { label: 'JSON5 (.json5)', value: 'json5' },
          { label: 'Markdown (.md)', value: 'md' },
          { label: 'YAML (.yaml)', value: 'yaml' },
        ],
        { placeHolder: 'Select content file format' }
      )
      .then((choice) => choice?.value as ContentFileFormat | undefined);
  }

  if (!format) {
    return;
  }

  await generateDictionaryContent(format);
};
