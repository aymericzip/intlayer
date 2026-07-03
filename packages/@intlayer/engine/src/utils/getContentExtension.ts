import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Generates the .content file extension based on the desired format
 * and the project's fileExtensions configuration.
 *
 * Example:
 * format 'ts' -> '.content.ts'
 * format 'esm' -> '.content.js' (if matching .content.js is found in config)
 */
export const getContentExtension = (
  format: 'ts' | 'esm' | 'cjs' | 'json' | 'jsonc' | 'json5' | (string & {}),
  configuration: IntlayerConfig
): string => {
  let contentFileExtension = '.ts';
  switch (format) {
    case 'json':
      contentFileExtension = '.json';
      break;
    case 'cjs':
      contentFileExtension = '.cjs';
      break;
    case 'esm':
      contentFileExtension = '.js';
      break;
  }

  // Find the configured extension that matches the format's extension
  const pickedFileExtension = configuration.content.fileExtensions.find(
    (extension) => extension.endsWith(contentFileExtension)
  );

  return (
    pickedFileExtension ??
    configuration.content.fileExtensions[0] ??
    `.content${contentFileExtension}`
  );
};
