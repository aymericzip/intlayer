import type { TextDocumentContentProvider } from 'vscode';
import {
  getCachedConfig,
  getCachedUnmergedDictionaries,
} from '../utils/intlayerCache';
import {
  parseRemoteDictionaryUri,
  renderRemoteDictionaryDocument,
} from '../utils/remoteDictionaryDocument';

/**
 * Read-only preview of a remote dictionary (`intlayer-remote:` documents),
 * opened by Go-to-Definition on fields declared on the CMS only.
 */
export const remoteDictionaryContentProvider: TextDocumentContentProvider = {
  provideTextDocumentContent: async (uri) => {
    const { projectDir, dictionaryKey } = parseRemoteDictionaryUri(uri);
    const configuration = await getCachedConfig(projectDir);
    const remoteDictionary = (
      await getCachedUnmergedDictionaries(configuration, dictionaryKey)
    )?.find((dictionary) => dictionary.location === 'remote');

    if (!remoteDictionary) {
      return `// Remote dictionary "${dictionaryKey}" is not built yet.\n`;
    }

    return renderRemoteDictionaryDocument(
      remoteDictionary,
      configuration.editor?.cmsURL
    );
  },
};
