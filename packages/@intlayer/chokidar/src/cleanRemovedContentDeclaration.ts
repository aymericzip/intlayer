import { readFile, rm } from 'node:fs/promises';
import { join, normalize, relative } from 'node:path';
import { colorizeKey, getAppLogger } from '@intlayer/config/client';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import { createDictionaryEntryPoint } from './createDictionaryEntryPoint';
import { createTypes } from './createType';
import { writeJsonIfChanged } from './writeJsonIfChanged';

export const cleanRemovedContentDeclaration = async (
  filePath: string,
  key: string,
  configuration: IntlayerConfig
): Promise<string[]> => {
  const appLogger = getAppLogger(configuration);

  const unmergedDictionaries = getUnmergedDictionaries(configuration);

  const relativeFilePath = relative(configuration.content.baseDir, filePath);
  const flatUnmergedDictionaries = Object.values(unmergedDictionaries).flat();

  const filteredUnmergedDictionaries = flatUnmergedDictionaries.filter(
    (dictionary) =>
      dictionary.filePath === relativeFilePath && dictionary.key !== key
  );

  const changedDictionariesLocalIds: string[] = [];
  const removedDictionariesLocalIds: string[] = [];
  const removedDictionariesKeys: string[] = [];

  filteredUnmergedDictionaries.forEach(async (dictionary) => {
    const unmergedFilePath = normalize(
      join(
        configuration.content.unmergedDictionariesDir,
        `${dictionary.key}.json`
      )
    );

    try {
      const jsonContent = await readFile(unmergedFilePath, 'utf8');
      const parsedContent = JSON.parse(jsonContent);

      if (parsedContent.length === 1) {
        appLogger(
          `Removing outdated dictionary ${colorizeKey(dictionary.key)}`,
          {
            isVerbose: true,
          }
        );

        await rm(unmergedFilePath);

        removedDictionariesLocalIds.push(dictionary.localId!);
      } else {
        const filteredContent = parsedContent.filter(
          (content: any) => content.filePath !== relativeFilePath
        );

        await writeJsonIfChanged(unmergedFilePath, filteredContent);

        changedDictionariesLocalIds.push(dictionary.localId!);
      }
    } catch {
      appLogger(
        `Error while processing unmerged dictionary file ${colorizeKey(dictionary.key)}`,
        {
          isVerbose: true,
        }
      );
    }
  });

  const dictionaries = getDictionaries(configuration);
  const flatDictionaries = Object.values(dictionaries);

  const filteredMergedDictionaries = flatDictionaries?.filter(
    (dictionary) =>
      dictionary.key !== key &&
      dictionary.localIds?.length === 1 &&
      (dictionary.localIds[0] as string).endsWith(
        `::local::${relativeFilePath}`
      )
  );

  filteredMergedDictionaries.forEach(async (dictionary) => {
    const mergedFilePath = normalize(
      join(configuration.content.dictionariesDir, `${dictionary.key}.json`)
    );

    try {
      const fileContent = await readFile(mergedFilePath, 'utf8');
      const parsedContent = JSON.parse(fileContent) as Dictionary;

      if (parsedContent.localIds?.length === 1) {
        appLogger(
          `Removing outdated dictionary ${colorizeKey(dictionary.key)}`,
          {
            isVerbose: true,
          }
        );

        rm(mergedFilePath);

        const typesFilePath = normalize(
          join(configuration.content.typesDir, `${dictionary.key}.ts`)
        );

        rm(typesFilePath);

        removedDictionariesKeys.push(dictionary.key);
      } else {
        const localIds = parsedContent.localIds?.filter(
          (localeId) => localeId !== relativeFilePath
        );

        const newContent = { ...parsedContent, localIds };

        await writeJsonIfChanged(mergedFilePath, newContent);
      }
    } catch (error) {
      appLogger(
        [
          `Error while processing merged dictionary file ${colorizeKey(dictionary.key)}`,
          error,
        ],
        {
          isVerbose: true,
        }
      );
    }
  });

  const dictionariesPaths = flatDictionaries
    .filter((dictionary) => !removedDictionariesKeys.includes(dictionary.key))
    .map((dictionary) =>
      join(configuration.content.dictionariesDir, `${dictionary.key}.json`)
    );

  await createTypes(dictionariesPaths, configuration);

  await createDictionaryEntryPoint(configuration);

  return changedDictionariesLocalIds;
};
