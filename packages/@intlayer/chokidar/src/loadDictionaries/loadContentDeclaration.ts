import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { loadExternalFile } from '@intlayer/config/file';
import {
  cacheDisk,
  getPackageJsonPath,
  getProjectRequire,
} from '@intlayer/config/utils';
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

type LoadContentDeclarationOptions = {
  logError?: boolean;
};

// Initialize a module-level cache
let cachedExternalDeps: string[] | null = null;

// Helper to fetch and cache the dependencies
const getExternalDeps = async (baseDir: string): Promise<string[]> => {
  if (cachedExternalDeps) {
    return cachedExternalDeps; // Return instantly on subsequent calls
  }

  try {
    const packageJsonPath = getPackageJsonPath(baseDir);

    const packageJSON = await readFile(
      packageJsonPath.packageJsonPath,
      'utf-8'
    );
    const parsedPackages = JSON.parse(packageJSON);
    const allDependencies = Object.keys({
      ...parsedPackages.dependencies,
      ...parsedPackages.devDependencies,
    });

    // Specify the ESM packages to bundle
    const esmPackagesToBundle = ['your-esm-package-name'];

    const externalDeps = allDependencies.filter(
      (dep) => !esmPackagesToBundle.includes(dep)
    );

    externalDeps.push('esbuild');

    // Save to cache
    cachedExternalDeps = externalDeps;
  } catch (error) {
    console.warn(
      'Could not read package.json for externalizing dependencies, fallback to empty array',
      error
    );
    cachedExternalDeps = ['esbuild'];
  }

  return cachedExternalDeps;
};

export const loadContentDeclaration = async (
  path: string,
  configuration: IntlayerConfig,
  bundleFilePath?: string,
  options?: LoadContentDeclarationOptions
): Promise<Dictionary | undefined> => {
  const { build, system } = configuration;

  // Call the cached helper
  const externalDeps = await getExternalDeps(system.baseDir);

  const resolvedBundleFilePath =
    bundleFilePath ?? (await ensureIntlayerBundle(configuration));

  try {
    const dictionary = await loadExternalFile(path, {
      logError: options?.logError,
      projectRequire: build.require ?? getProjectRequire(),
      buildOptions: {
        packages: undefined, // It fixes the import of ESM packages in the content declaration
        external: externalDeps,
        banner: {
          js: [
            `var __filename = ${JSON.stringify(path)};`,
            `var __dirname = ${JSON.stringify(dirname(path))};`,
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
  onStatusUpdate?: (status: DictionariesStatus[]) => void,
  options?: LoadContentDeclarationOptions
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
        const relativePath = relative(system.baseDir, path);

        const dictionary = await loadContentDeclaration(
          path,
          configuration,
          bundleFilePath,
          options
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
