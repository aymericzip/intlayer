import { extname } from 'node:path';
import { type Extension, getFormatFromExtension } from '@intlayer/engine/utils';
import { window } from 'vscode';
import {
  type ContentFileFormat,
  generateDictionaryContent,
} from '../createDictionaryContent';

export const createDictionaryFile = async () => {
  const filePath = window.activeTextEditor?.document.uri.fsPath;

  let format: ContentFileFormat;

  if (filePath) {
    const extension = extname(filePath) as Extension;
    const detected = getFormatFromExtension(extension);
    // The command is only exposed on source files, so `md` / `yaml` cannot be
    // detected here — fall back to `ts` rather than widening the scaffolder.
    format =
      detected === 'md' || detected === 'yaml'
        ? 'ts'
        : (detected as ContentFileFormat);
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
        ],
        { placeHolder: 'Select content file format' }
      )
      .then((choice) => choice?.value as ContentFileFormat);
  }

  await generateDictionaryContent(format);
};
