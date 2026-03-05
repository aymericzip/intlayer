import { detectExportedComponentName } from '@intlayer/chokidar/cli';
import { camelCaseToKebabCase } from '@intlayer/config/utils';

/**
 * Extracts a dictionary key from a file path.
 *
 * Example: "src/components/MyComponent/index.tsx" -> "comp-my-component"
 */
export const extractDictionaryKeyFromPath = (
  filePath: string,
  prefix = 'comp-'
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
  fileText: string
): string => {
  const componentName = detectExportedComponentName(fileText);

  if (componentName) {
    return camelCaseToKebabCase(componentName);
  }

  return extractDictionaryKeyFromPath(filePath, '');
};
