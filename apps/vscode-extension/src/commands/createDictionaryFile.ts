import { window } from 'vscode';
import { generateDictionaryContent } from '../createDictionaryContent';

export const createDictionaryFile = async () => {
  const choice = await window.showQuickPick(
    [
      { label: 'TypeScript (.ts)', value: 'ts' },
      { label: 'ESM (.js)', value: 'esm' },
      { label: 'CommonJS (.js)', value: 'cjs' },
      { label: 'JSON (.json)', value: 'json' },
    ],
    { placeHolder: 'Select content file format' }
  );

  if (!choice) {
    return;
  }

  await generateDictionaryContent(
    choice.value as 'ts' | 'esm' | 'cjs' | 'json'
  );
};
