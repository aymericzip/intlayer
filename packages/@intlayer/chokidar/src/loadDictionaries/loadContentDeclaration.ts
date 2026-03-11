import { writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { loadExternalFile } from '@intlayer/config/file';
import { cacheDisk, getProjectRequire } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { processContentDeclaration } from '../buildIntlayerDictionary/processContentDeclaration';
import { filterInvalidDictionaries } from '../filterInvalidDictionaries';
import { parallelize } from '../utils/parallelize';
import { getIntlayerBundle } from './getIntlayerBundle';
import type { DictionariesStatus } from './loadDictionaries';
import { logTypeScriptErrors } from './logTypeScriptErrors';

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

export const ensureIntlayerBundle = async (
  configuration: IntlayerConfig
): Promise<string> => {
  const { system } = configuration;

  const { set, isValid } = cacheDisk(configuration, ['intlayer-bundle'], {
    ttlMs: 1000 * 60 * 60 * 24 * 5, // 5 days
  });

  const filePath = join(system.cacheDir, 'intlayer-bundle.cjs');
  const hasIntlayerBundle = await isValid();

  if (!hasIntlayerBundle) {
    const intlayerBundle = await getIntlayerBundle(configuration);
    await writeFile(filePath, intlayerBundle);
    await set('ok');
  }

  return filePath;
};

export const loadContentDeclaration = async (
  path: string,
  configuration: IntlayerConfig,
  bundleFilePath?: string
): Promise<Dictionary | undefined> => {
  const { build } = configuration;

  const resolvedBundleFilePath =
    bundleFilePath ?? (await ensureIntlayerBundle(configuration));

  try {
    const dictionary = await loadExternalFile(path, {
      projectRequire: build.require ?? getProjectRequire(),
      buildOptions: {
        banner: {
          js: [
            `globalThis.INTLAYER_FILE_PATH = '${path}';`,
            `globalThis.INTLAYER_BASE_DIR = '${configuration.system.baseDir}';`,
          ].join('\n'),
        },
      },
      aliases: {
        intlayer: resolvedBundleFilePath,
      },
    });

    return dictionary;
  } catch (error) {
    console.error(`Error loading content declaration at ${path}:`, error);
    return undefined;
  }
};

export const loadContentDeclarations = async (
  contentDeclarationFilePath: string[],
  configuration: IntlayerConfig,
  onStatusUpdate?: (status: DictionariesStatus[]) => void
): Promise<Dictionary[]> => {
  const { build, system } = configuration;

  // Check for TypeScript warnings before we build
  if (build.checkTypes) {
    logTypeScriptErrors(contentDeclarationFilePath, configuration).catch(
      (e) => {
        console.error('Error during TypeScript validation:', e);
      }
    );
  }

  const bundleFilePath = await ensureIntlayerBundle(configuration);

  try {
    const dictionariesPromises = contentDeclarationFilePath.map(
      async (path) => {
        const relativePath = relative(configuration.system.baseDir, path);

        const dictionary = await loadContentDeclaration(
          path,
          configuration,
          bundleFilePath
        );

        return { relativePath, dictionary };
      }
    );

    const dictionariesArray = await Promise.all(dictionariesPromises);
    const dictionariesRecord = dictionariesArray.reduce(
      (acc, { relativePath, dictionary }) => {
        if (dictionary) {
          acc[relativePath] = dictionary;
        }
        return acc;
      },
      {} as Record<string, Dictionary>
    );

    const contentDeclarations: Dictionary[] = formatLocalDictionaries(
      dictionariesRecord,
      configuration
    ).filter((dictionary) => dictionary.location !== 'remote');

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
          contentDeclaration as Dictionary,
          configuration
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
  } catch {
    console.error('Error loading content declarations');
  }

  return [];
};
