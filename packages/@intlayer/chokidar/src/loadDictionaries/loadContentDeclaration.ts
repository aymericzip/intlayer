import {
  ESMxCJSRequire,
  getConfiguration,
  IntlayerConfig,
  loadExternalFile,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { relative } from 'path';
import { processContentDeclaration } from '../transpiler/declaration_file_to_dictionary/intlayer_dictionary/processContentDeclaration';
import { DictionariesStatus } from './loadDictionaries';

export const formatLocalDictionaries = (
  dictionariesRecord: Record<string, Dictionary>
): Dictionary[] =>
  Object.entries(dictionariesRecord).map(([relativePath, dict]) => ({
    ...dict,
    localId: `${dict.key}::local::${relativePath}`,
    location: 'locale' as const,
    filePath: relativePath,
  }));

export const loadContentDeclarations = async (
  contentDeclarationFilePath: string[],
  configuration: IntlayerConfig = getConfiguration(),
  projectRequire = ESMxCJSRequire,
  onStatusUpdate?: (status: DictionariesStatus[]) => void
): Promise<Dictionary[]> => {
  const dictionariesRecord = contentDeclarationFilePath.reduce(
    (acc, path) => {
      const relativePath = relative(configuration.content.baseDir, path);
      return {
        ...acc,
        [relativePath]: loadExternalFile(path, undefined, projectRequire),
      };
    },
    {} as Record<string, Dictionary>
  );
  const contentDeclarations: Dictionary[] =
    formatLocalDictionaries(dictionariesRecord);

  const resultDictionariesPaths: Dictionary[] = [];

  const listFoundDictionaries = contentDeclarations.map((declaration) => ({
    dictionaryKey: declaration.key,
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
