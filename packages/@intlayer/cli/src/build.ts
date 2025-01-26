import { buildAndWatchIntlayer } from '@intlayer/chokidar';

type BuildOptions = { watch?: boolean };

/**
 * Get locales dictionaries .content.{json|ts|tsx|js|jsx|mjs|cjs} and build the JSON dictionaries in the .intlayer directory.
 * Watch mode available to get the change in the .content.{json|ts|tsx|js|jsx|mjs|cjs}
 */
export const build = async (options?: BuildOptions) =>
  await buildAndWatchIntlayer({ persistent: options?.watch ?? false });
