import { readFile } from 'node:fs/promises';
import { isAbsolute, join } from 'node:path';
import {
  findFieldDeclaration,
  type ResolvedDictionaryTarget,
  resolveDictionaryTarget,
  type UsageTarget,
} from '@intlayer/lsp/utils';
import type { Dictionary } from '@intlayer/types';
import { type DefinitionLink, Range, Uri } from 'vscode';
import { dedupeDefinitionLinks } from './dedupeDefinitionLinks';
import {
  getCachedConfig,
  getCachedDictionary,
  getCachedUnmergedDictionaries,
} from './intlayerCache';
import {
  createRemoteDictionaryUri,
  renderRemoteDictionaryDocument,
} from './remoteDictionaryDocument';
import { createOffsetToPosition } from './textPosition';

/** Separator of the `localIds` entries of merged dictionaries. */
const LOCAL_ID_SEPARATOR = '::local::';

/**
 * Source files of a dictionary read from its merged build, whose `localIds`
 * encode them as `key::local::filePath`. Used before the first dev build,
 * which is what writes the unmerged dictionaries.
 *
 * @returns Paths relative to the project root.
 */
export const getMergedDictionarySourcePaths = async (
  projectDir: string,
  dictionaryKey: string
): Promise<string[]> => {
  const { system } = await getCachedConfig(projectDir);
  const mergedDictionary = await getCachedDictionary(
    join(system.dictionariesDir, `${dictionaryKey}.json`)
  );
  const entries = [mergedDictionary ?? []].flat() as {
    localIds?: string[];
    filePath?: string;
  }[];

  return entries.flatMap(
    (entry) =>
      entry.localIds
        ?.map((localId) => localId.split(LOCAL_ID_SEPARATOR)[1])
        .filter((filePath): filePath is string => Boolean(filePath)) ??
      (entry.filePath ? [entry.filePath] : [])
  );
};

/**
 * Match a usage against the project's built (unmerged) dictionaries, with the
 * compat adapters' fallbacks — whole-file `index` catalog, flat dotted keys.
 *
 * @param projectDir - Project root holding the intlayer configuration.
 * @param target - Dictionary key + field path read from the source.
 */
export const resolveProjectTarget = async (
  projectDir: string,
  target: UsageTarget
): Promise<ResolvedDictionaryTarget<Dictionary> | null> => {
  const configuration = await getCachedConfig(projectDir);

  return resolveDictionaryTarget(target, (dictionaryKey) =>
    getCachedUnmergedDictionaries(configuration, dictionaryKey)
  );
};

/**
 * Definition links to where a dictionary field is declared in each of the
 * given source files. A file where the field cannot be located links to its
 * first line; unreadable files are skipped.
 *
 * @param sourcePaths - Declaring files, absolute or relative to `projectDir`.
 * @param fieldPath - Field to locate; empty to locate the dictionary itself.
 * @param originSelectionRange - Span underlined in the origin document.
 */
export const createDeclarationLinks = async (
  projectDir: string,
  dictionaryKey: string,
  fieldPath: string[],
  sourcePaths: string[],
  originSelectionRange?: Range
): Promise<DefinitionLink[]> => {
  const absoluteSourcePaths = [
    ...new Set(
      sourcePaths.map((sourcePath) =>
        isAbsolute(sourcePath) ? sourcePath : join(projectDir, sourcePath)
      )
    ),
  ];

  const links = await Promise.all(
    absoluteSourcePaths.map(
      async (sourcePath): Promise<DefinitionLink | null> => {
        const text = await readFile(sourcePath, 'utf8').catch(() => null);

        if (text === null) return null;

        const span = findFieldDeclaration(
          text,
          sourcePath,
          dictionaryKey,
          fieldPath
        );
        const offsetToPosition = createOffsetToPosition(text);
        const start = offsetToPosition(span?.start ?? 0);
        const end = offsetToPosition(span?.end ?? 0);
        const targetRange = new Range(
          start.line,
          start.character,
          end.line,
          end.character
        );

        return {
          originSelectionRange,
          targetUri: Uri.file(sourcePath),
          targetRange,
          targetSelectionRange: targetRange,
        };
      }
    )
  );

  return dedupeDefinitionLinks(
    links.filter((link): link is DefinitionLink => link !== null)
  );
};

/**
 * Definition links to the read-only previews of the remote dictionaries
 * (declared on the CMS only) among a resolved target, on the field itself.
 *
 * @param projectDir - Project root holding the intlayer configuration.
 * @param resolved - Usage target matched against the built dictionaries.
 * @param originSelectionRange - Span underlined in the origin document.
 */
const createRemoteDeclarationLinks = async (
  projectDir: string,
  resolved: ResolvedDictionaryTarget<Dictionary>,
  originSelectionRange?: Range
): Promise<DefinitionLink[]> => {
  const remoteDictionary = resolved.dictionaries.find(
    (dictionary) => dictionary.location === 'remote'
  );

  if (!remoteDictionary) return [];

  const { editor } = await getCachedConfig(projectDir);
  const text = renderRemoteDictionaryDocument(remoteDictionary, editor?.cmsURL);
  const span = findFieldDeclaration(
    text,
    `${resolved.dictionaryKey}.content.json`,
    resolved.dictionaryKey,
    resolved.fieldPath
  );
  const offsetToPosition = createOffsetToPosition(text);
  const start = offsetToPosition(span?.start ?? 0);
  const end = offsetToPosition(span?.end ?? 0);
  const targetRange = new Range(
    start.line,
    start.character,
    end.line,
    end.character
  );

  return [
    {
      originSelectionRange,
      targetUri: createRemoteDictionaryUri(projectDir, resolved.dictionaryKey),
      targetRange,
      targetSelectionRange: targetRange,
    },
  ];
};

/**
 * Definition links to the remote dictionaries matching a usage target only.
 * The LSP server answers for local files but cannot see remote dictionaries.
 *
 * @param projectDir - Project root holding the intlayer configuration.
 * @param target - Dictionary key + field path read from the source.
 * @param originSelectionRange - Span underlined in the origin document.
 */
export const getRemoteDeclarationLinks = async (
  projectDir: string,
  target: UsageTarget,
  originSelectionRange?: Range
): Promise<DefinitionLink[]> => {
  const resolved = await resolveProjectTarget(projectDir, target);

  return resolved
    ? createRemoteDeclarationLinks(projectDir, resolved, originSelectionRange)
    : [];
};

/**
 * Definition links to every source file declaring a usage target (content
 * file, or one JSON catalog per locale), the default locale first, then the
 * preview of its remote dictionary, if any.
 *
 * @param projectDir - Project root holding the intlayer configuration.
 * @param target - Dictionary key + field path read from the source.
 * @param originSelectionRange - Span underlined in the origin document.
 */
export const getDeclarationLinks = async (
  projectDir: string,
  target: UsageTarget,
  originSelectionRange?: Range
): Promise<DefinitionLink[]> => {
  const resolved = await resolveProjectTarget(projectDir, target);

  if (!resolved) return [];

  const { internationalization } = await getCachedConfig(projectDir);
  const defaultLocale = internationalization?.defaultLocale;
  const isDefaultLocale = (dictionary: Dictionary) =>
    Number(dictionary.locale === defaultLocale);

  const sourcePaths = [...resolved.dictionaries]
    .sort((first, second) => isDefaultLocale(second) - isDefaultLocale(first))
    .map((dictionary) => dictionary.filePath)
    .filter((filePath): filePath is string => Boolean(filePath));

  const [localLinks, remoteLinks] = await Promise.all([
    createDeclarationLinks(
      projectDir,
      resolved.dictionaryKey,
      resolved.fieldPath,
      sourcePaths,
      originSelectionRange
    ),
    createRemoteDeclarationLinks(projectDir, resolved, originSelectionRange),
  ]);

  return [...localLinks, ...remoteLinks];
};
