import { ESMxCJSRequire, loadExternalFile } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { processContentDeclaration } from '../transpiler/declaration_file_to_dictionary/intlayer_dictionary/processContentDeclaration';
import { DictionariesStatus } from './loadDictionaries';

export const loadContentDeclarations = async (
  contentDeclarationFilePath: string[],
  projectRequire = ESMxCJSRequire,
  onStatusUpdate?: (status: DictionariesStatus[]) => void
): Promise<Dictionary[]> => {
  const contentDeclarations = contentDeclarationFilePath.map((path) => ({
    ...loadExternalFile(path, undefined, projectRequire),
    filePath: path,
  }));
  const resultDictionariesPaths: Dictionary[] = [];

  const listFoundDictionaries = contentDeclarations.map((declaration, idx) => ({
    dictionaryKey:
      (declaration as unknown as Dictionary)?.key ??
      contentDeclarationFilePath[idx],
    type: 'local' as const,
    status: 'found' as const,
  }));

  onStatusUpdate?.(listFoundDictionaries);

  for await (const contentDeclaration of contentDeclarations) {
    if (!contentDeclaration) {
      continue;
    }

    onStatusUpdate?.([
      {
        dictionaryKey: contentDeclaration.key,
        type: 'local',
        status: 'building',
      },
    ]);

    const processedContentDeclaration = await processContentDeclaration(
      contentDeclaration as Dictionary
    );

    if (!processedContentDeclaration) {
      continue;
    }

    onStatusUpdate?.([
      {
        dictionaryKey: processedContentDeclaration.key,
        type: 'local',
        status: 'built',
      },
    ]);

    resultDictionariesPaths.push(processedContentDeclaration);
  }

  return resultDictionariesPaths;
};
