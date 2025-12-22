import { getAppLogger } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import { cleanRemovedContentDeclaration } from './cleanRemovedContentDeclaration';
import { handleContentDeclarationFileChange } from './handleContentDeclarationFileChange';
import { loadLocalDictionaries } from './loadDictionaries/loadLocalDictionaries';
import { formatPath } from './utils/formatter';

export const handleContentDeclarationFileMoved = async (
  oldFilePath: string,
  newFilePath: string,
  config: IntlayerConfig
) => {
  const appLogger = getAppLogger(config);

  appLogger(
    `File moved from ${formatPath(oldFilePath)} to ${formatPath(newFilePath)}`,
    {
      isVerbose: true,
    }
  );

  let keysToKeep: string[] = [];

  try {
    // Pre-load the new file to identify the keys inside it.
    // We need to pass these keys to the cleaner so it knows NOT to completely delete
    // the dictionary artifacts (types/json) if the key has simply moved to a new file.
    const newLocaleDictionaries = await loadLocalDictionaries(
      newFilePath,
      config
    );
    keysToKeep = newLocaleDictionaries.map((d) => d.key);
  } catch {
    appLogger(
      `Error parsing new file during move operation: ${formatPath(newFilePath)}`,
      {
        isVerbose: true,
      }
    );
    // Proceed with empty keysToKeep; this will result in the old dictionary being cleaned up
    // entirely, and the new one being re-created in the next step.
  }

  // Clean up the artifacts associated with the old file path.
  // By passing 'keysToKeep', we instruct the cleaner to remove the specific file association
  // (filePath reference) from the dictionaries, but preserve the dictionary Entry Point and Types
  // if the key is still present in the new file.
  await cleanRemovedContentDeclaration(oldFilePath, keysToKeep, config);

  // Process the new file.
  // This will add the new file association, rebuild the dictionary JSONs with the new path,
  // and ensure types and module augmentation are up to date.
  await handleContentDeclarationFileChange(newFilePath, config);
};
