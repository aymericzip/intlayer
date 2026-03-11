import { detectExportedComponentName } from '@intlayer/chokidar/cli';
import { DefaultValues } from '@intlayer/config/node';
import { camelCaseToKebabCase } from '@intlayer/config/utils';

/**
 * Extracts a dictionary key from a file path.
 *
 * Example: "src/components/MyComponent/index.tsx" -> "comp-my-component"
 */
export const extractDictionaryKeyFromPath = (
  filePath: string,
  prefix = DefaultValues.Compiler.COMPILER_DICTIONARY_KEY_PREFIX
): string => {
  const pathParts = filePath.split(/[\\/]/);
  const fileNameWithExt = pathParts.pop() || '';
  const lastDotIndex = fileNameWithExt.lastIndexOf('.');
  let baseName =
    lastDotIndex !== -1
      ? fileNameWithExt.slice(0, lastDotIndex)
      : fileNameWithExt;

  if (baseName.toLowerCase() === 'index') {
    baseName = pathParts.pop() || baseName;
  }

  return `${prefix}${baseName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()}`;
};

export const extractDictionaryKey = (
  filePath: string,
  fileText: string,
  prefix = DefaultValues.Compiler.COMPILER_DICTIONARY_KEY_PREFIX
): string => {
  const componentName = detectExportedComponentName(fileText);

  if (componentName) {
    return `${prefix}${camelCaseToKebabCase(componentName)}`;
  }

  return extractDictionaryKeyFromPath(filePath, prefix);
};
