import type { BundleIntlayerOptions } from '@intlayer/config/bundle';

/**
 * Computes the tree-shaking defines derived from the project's built
 * dictionaries (unused node types, dictionary selector usage) so the generated
 * bundle drops the corresponding runtime logic, mirroring what the bundler
 * plugins (vite / webpack / esbuild) inject at application build time.
 *
 * Returns an empty object when no dictionary has been built yet: shaking based
 * on an empty dictionary set would mark every node type as unused and strip
 * logic that the runtime content may require.
 */
const getDictionaryTreeShakingDefines = async (
  options: BundleIntlayerOptions
): Promise<Record<string, string>> => {
  // Dynamic imports for performance reason
  const { formatDictionarySelectorEnvVar, formatNodeTypeToEnvVar } =
    await import('@intlayer/config/envVars');
  const { getConfiguration } = await import('@intlayer/config/node');
  const { getHasDictionarySelector, getUnusedNodeTypesAsync } = await import(
    '@intlayer/config/utils'
  );
  const { getDictionaries } = await import('@intlayer/dictionaries-entry');

  const configuration = getConfiguration(options.configOptions);
  const dictionaries = getDictionaries(configuration);

  if (Object.keys(dictionaries).length === 0) return {};

  const wrapKey = (key: string) => `process.env.${key}`;
  const wrapValue = (value: string) => `"${value}"`;

  const unusedNodeTypes = await getUnusedNodeTypesAsync(dictionaries);

  return {
    // Tree shaking based on unused node types
    ...formatNodeTypeToEnvVar(unusedNodeTypes, wrapKey, wrapValue),
    // Tree shaking the dictionary selector logic (collections / variants)
    ...formatDictionarySelectorEnvVar(
      getHasDictionarySelector(dictionaries),
      wrapKey,
      wrapValue
    ),
  };
};

export const bundle = async (options: BundleIntlayerOptions): Promise<void> => {
  try {
    // Dynamic import for performance reason
    const { bundleIntlayer } = await import('@intlayer/config/bundle');

    const dictionaryDefines = await getDictionaryTreeShakingDefines(options);

    await bundleIntlayer({
      ...options,
      define: {
        ...dictionaryDefines,
        // Caller-supplied defines take precedence
        ...options.define,
      },
    });
  } catch (error) {
    console.error('Failed to create bundle:', error);
    process.exit(1);
  }
};
