import type { Dictionary } from '@intlayer/types';
import { Uri } from 'vscode';
import { getCmsDictionaryUrl } from './cmsDictionaryUrl';

/** Scheme of the read-only documents previewing remote dictionaries. */
export const REMOTE_DICTIONARY_SCHEME = 'intlayer-remote';

/**
 * Virtual document of a remote dictionary, the Go-to-Definition target of
 * dictionaries declared on the CMS only.
 *
 * @param projectDir - Project root holding the intlayer configuration.
 * @param dictionaryKey - Key of the remote dictionary.
 */
export const createRemoteDictionaryUri = (
  projectDir: string,
  dictionaryKey: string
): Uri =>
  Uri.from({
    scheme: REMOTE_DICTIONARY_SCHEME,
    path: `/${dictionaryKey}.content.json`,
    query: projectDir,
  });

/** Project root and dictionary key encoded by `createRemoteDictionaryUri`. */
export const parseRemoteDictionaryUri = (
  uri: Uri
): { projectDir: string; dictionaryKey: string } => ({
  projectDir: uri.query,
  dictionaryKey: uri.path.replace(/^\//, '').replace(/\.content\.json$/, ''),
});

/**
 * JSON preview of a remote dictionary, shaped like the content declarations
 * the compiler writes so `findFieldDeclaration` locates its fields. Its
 * `cmsUrl` is auto-linked by the editor.
 *
 * @param dictionary - Remote dictionary, as pulled from the CMS.
 * @param cmsURL - `editor.cmsURL` of the configuration.
 */
export const renderRemoteDictionaryDocument = (
  dictionary: Pick<Dictionary, 'key' | 'content'> &
    Partial<Pick<Dictionary, 'title' | 'description'>>,
  cmsURL: string | undefined
): string =>
  `${JSON.stringify(
    {
      key: dictionary.key,
      location: 'remote',
      ...(cmsURL && {
        cmsUrl: getCmsDictionaryUrl(cmsURL, dictionary.key),
      }),
      ...(dictionary.title && { title: dictionary.title }),
      ...(dictionary.description && { description: dictionary.description }),
      content: dictionary.content,
    },
    null,
    2
  )}\n`;
