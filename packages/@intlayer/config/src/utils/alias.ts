import { join, relative } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import { getExtension } from './getExtension';
import { normalizePath } from './normalizePath';

export type GetAliasOptions = {
  configuration: IntlayerConfig;
  format?: 'esm' | 'cjs';
  formatter?: (value: string) => string;
};

/**
 * Generated entry files of `.intlayer/main`, keyed by the
 * `@intlayer/dictionaries-entry` subpath that resolves to them.
 */
const DICTIONARIES_ENTRY_SUBPATH_FILES = {
  unmerged: 'unmerged_dictionaries',
  remote: 'remote_dictionaries',
  dynamic: 'dynamic_dictionaries',
  fetch: 'fetch_dictionaries',
} as const;

type DictionariesEntrySubpath = keyof typeof DICTIONARIES_ENTRY_SUBPATH_FILES;

type DictionariesEntrySubpathAlias = {
  [Subpath in DictionariesEntrySubpath as `@intlayer/dictionaries-entry/${Subpath}`]: string;
};

/**
 * Maps the aliasable Intlayer packages to the generated `.intlayer` files so
 * bundlers (webpack, Vite, Turbopack, esbuild, Metro, …) resolve them to the
 * app's own dictionaries and hot reload on any content change.
 *
 * Key order matters: webpack (enhanced-resolve) and Vite match string aliases
 * by prefix and stop at the first hit, so the bare `@intlayer/dictionaries-entry`
 * key MUST come after its subpaths, otherwise `@intlayer/dictionaries-entry/remote`
 * would be rewritten to `<dictionaries entry>/remote`.
 */
export const getAlias = ({
  configuration,
  format,
  formatter = (value: string) => value,
}: GetAliasOptions) => {
  const extension = getExtension(
    configuration,
    format ?? configuration.build.outputFormat[0] ?? 'esm'
  );

  const { baseDir, mainDir, configDir } = configuration.system;

  const toAliasPath = (absolutePath: string) =>
    formatter(normalizePath(relative(baseDir, absolutePath)));

  const subpathAlias = Object.fromEntries(
    Object.entries(DICTIONARIES_ENTRY_SUBPATH_FILES).map(
      ([subpath, fileName]) => [
        `@intlayer/dictionaries-entry/${subpath}`,
        toAliasPath(join(mainDir, `${fileName}.${extension}`)),
      ]
    )
  ) as DictionariesEntrySubpathAlias;

  return {
    ...subpathAlias,
    '@intlayer/dictionaries-entry': toAliasPath(
      join(mainDir, `dictionaries.${extension}`)
    ),
    '@intlayer/config/built': toAliasPath(
      join(configDir, `configuration.${extension}`)
    ),
  };
};
