import { relative } from 'node:path';
import {
  ESMxCJSRequire,
  getConfiguration,
  type IntlayerConfig,
  loadExternalFile,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { processContentDeclaration } from '../buildIntlayerDictionary/processContentDeclaration';
import {
  filterInvalidDictionaries,
  isInvalidDictionary,
} from '../filterInvalidDictionaries';
import { parallelize } from '../utils/parallelize';
import type { DictionariesStatus } from './loadDictionaries';

export const formatLocalDictionaries = (
  dictionariesRecord: Record<string, Dictionary>,
  configuration?: IntlayerConfig
): Dictionary[] =>
  Object.entries(dictionariesRecord)
    .filter(([_relativePath, dict]) => isInvalidDictionary(dict, configuration))
    .map(([relativePath, dict]) => ({
      ...dict,
      localId: `${dict.key}::local::${relativePath}`,
      location: 'local' as const,
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
  const contentDeclarations: Dictionary[] = formatLocalDictionaries(
    dictionariesRecord,
    configuration
  );

  const listFoundDictionaries = contentDeclarations.map((declaration) => ({
    dictionaryKey: declaration.key,
    type: 'local' as const,
    status: 'found' as const,
  }));

  onStatusUpdate?.(listFoundDictionaries);

  const processedDictionaries = await parallelize(
    contentDeclarations,
    async (contentDeclaration): Promise<Dictionary | undefined> => {
      if (!contentDeclaration) {
        return undefined;
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
        return undefined;
      }

      onStatusUpdate?.([
        {
          dictionaryKey: processedContentDeclaration.key,
          type: 'local',
          status: 'built',
        },
      ]);

      return processedContentDeclaration;
    }
  );

  return filterInvalidDictionaries(processedDictionaries);
};
