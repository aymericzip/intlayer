import { writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import {
  cacheDisk,
  getProjectRequire,
  loadExternalFile,
} from '@intlayer/config';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { processContentDeclaration } from '../buildIntlayerDictionary/processContentDeclaration';
import { filterInvalidDictionaries } from '../filterInvalidDictionaries';
import { parallelize } from '../utils/parallelize';
import { getIntlayerBundle } from './getIntlayerBundle';
import type { DictionariesStatus } from './loadDictionaries';

export const formatLocalDictionaries = (
  dictionariesRecord: Record<string, Dictionary>,
  configuration: IntlayerConfig
): Dictionary[] =>
  Object.entries(dictionariesRecord).map(([relativePath, dict]) => ({
    ...dict,
    location: dict.location ?? configuration.dictionary?.location ?? 'local',
    localId: `${dict.key}::local::${relativePath}`,
    filePath: relativePath,
  }));

export const loadContentDeclarations = async (
  contentDeclarationFilePath: string[],
  configuration: IntlayerConfig,
  onStatusUpdate?: (status: DictionariesStatus[]) => void
): Promise<Dictionary[]> => {
  const { build, system } = configuration;

  const { set, isValid } = cacheDisk(configuration, ['intlayer-bundle'], {
    ttlMs: 1000 * 60 * 60 * 24 * 5, // 5 days
  });

  const filePath = join(system.cacheDir, 'intlayer-bundle.cjs');
  const hasIntlayerBundle = await isValid();

  // If cache is invalid, write the intlayer bundle to the cache
  if (!hasIntlayerBundle) {
    const intlayerBundle = await getIntlayerBundle(configuration);
    await writeFile(filePath, intlayerBundle);
    await set('ok');
  }

  try {
    const dictionariesPromises = contentDeclarationFilePath.map(
      async (path) => {
        const relativePath = relative(configuration.content.baseDir, path);

        const dictionary = await loadExternalFile(path, {
          projectRequire: build.require ?? getProjectRequire(),
          buildOptions: {
            banner: {
              js: [
                `globalThis.INTLAYER_FILE_PATH = '${path}';`,
                `globalThis.INTLAYER_BASE_DIR = '${configuration.content.baseDir}';`,
              ].join('\n'),
            },
          },
          aliases: {
            intlayer: filePath,
          },
        });

        return { relativePath, dictionary };
      }
    );

    const dictionariesArray = await Promise.all(dictionariesPromises);
    const dictionariesRecord = dictionariesArray.reduce(
      (acc, { relativePath, dictionary }) => {
        acc[relativePath] = dictionary;
        return acc;
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

    return filterInvalidDictionaries(processedDictionaries, configuration, {
      checkSchema: false,
    });
  } finally {
    // await rm(tempFilePath, { recursive: true });
  }
};
