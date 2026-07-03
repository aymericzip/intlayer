import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getAppLogger } from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';
import { buildDictionary } from './buildIntlayerDictionary/buildIntlayerDictionary';
import { cleanRemovedContentDeclaration } from './cleanRemovedContentDeclaration';
import { createDictionaryEntryPoint } from './createDictionaryEntryPoint/createDictionaryEntryPoint';
import { getBuiltDictionariesPath } from './createDictionaryEntryPoint/getBuiltDictionariesPath';
import { createTypes } from './createType';
import { createModuleAugmentation } from './createType/createModuleAugmentation';
import { loadLocalDictionaries } from './loadDictionaries/loadLocalDictionaries';
import { formatPath } from './utils/formatter';

export const handleContentDeclarationFileChange = async (
  filePath: string,
  config: IntlayerConfig
) => {
  const appLogger = getAppLogger(config);

  // Process the file with the functionToRun
  appLogger(`Change detected: ${formatPath(filePath)}`, {
    isVerbose: true,
  });

  const allDictionariesPaths: string[] = await getBuiltDictionariesPath(config);

  const localeDictionaries = await loadLocalDictionaries(filePath, config);

  const dictionariesOutput = await buildDictionary(localeDictionaries, config);
  const updatedDictionaries = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  );
  const updatedDictionariesPaths = updatedDictionaries.map(
    (dictionary) => dictionary.dictionaryPath
  );

  const { excludeKeys, hasRebuilt } = await cleanRemovedContentDeclaration(
    filePath,
    localeDictionaries.map((dictionary) => dictionary.key),
    config
  );

  const hasNewDictionaries = updatedDictionariesPaths.some(
    (updatedDictionaryPath) =>
      !allDictionariesPaths.includes(updatedDictionaryPath)
  );

  // Rebuild Types first — types must be ready before anything triggers a bundler rebuild.
  // esbuild (used by Angular, Vite, etc.) only watches files in its JS bundle graph; it does
  // NOT watch .intlayer/types/*.ts (TypeScript-only files). Generating types here, before
  // updating the entry point, guarantees that when the entry point write below fires esbuild's
  // file watcher the types are already up-to-date.
  const dictionariesToBuild = updatedDictionaries.map(
    (dictionary) => dictionary.dictionary
  );

  await createTypes(dictionariesToBuild, config);
  appLogger('TypeScript types built', {
    isVerbose: true,
  });

  // Always regenerate the module augmentation so that structural changes to existing
  // dictionaries (new content keys, type changes) are reflected in intlayer.d.ts.
  await createModuleAugmentation(config);
  appLogger('Module augmentation built', {
    isVerbose: true,
  });

  // Rebuild Entry Point
  // Only needed when the *list* of dictionaries changed (Add/Remove/Rename).
  if (hasRebuilt || hasNewDictionaries) {
    // If hasRebuilt is true, cleanRemovedContentDeclaration has already updated the entry point
    // to remove the old keys (and it likely included the new ones if they were already on disk).
    // If NOT hasRebuilt, we explicitly need to update the entry point to include the new dictionaries.
    if (!hasRebuilt) {
      await createDictionaryEntryPoint(config, { excludeKeys });
      appLogger('Dictionary list built', {
        isVerbose: true,
      });
    }
  }

  // Force-write the entry point files so esbuild detects a change and triggers a fresh rebuild
  // now that all types are ready. Without this, the only rebuild esbuild sees is the one
  // triggered by buildDictionary's JSON writes above — which races against type generation
  // and often runs before the new .intlayer/types/*.ts files are on disk.
  const { mainDir } = config.system;

  for (const extension of config.build.outputFormat) {
    const entryPointPath = join(mainDir, `dictionaries.${extension}`);

    if (existsSync(entryPointPath)) {
      const content = await readFile(entryPointPath, 'utf-8');
      await writeFile(entryPointPath, content);
    }
  }

  // Plugin transformation
  // Allow plugins to post-process the final build output (e.g., write back ICU JSON)
  for await (const plugin of config.plugins ?? []) {
    const { unmergedDictionaries, mergedDictionaries } = dictionariesOutput;

    await plugin.afterBuild?.({
      dictionaries: {
        unmergedDictionaries,
        mergedDictionaries,
      },
      configuration: config,
    });
  }
};
