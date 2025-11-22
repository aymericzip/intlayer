import { basename, dirname, extname } from 'node:path';
import { detectExportedComponentName } from '../writeContentDeclaration/detectExportedComponentName';

export const extractDictionaryKey = (
  filePath: string,
  fileText: string
): string => {
  const componentName = detectExportedComponentName(fileText);
  if (componentName) {
    return componentName;
  }

  const ext = extname(filePath);
  let baseName = basename(filePath, ext);

  if (baseName === 'index') {
    baseName = basename(dirname(filePath));
  }

  return baseName;
};
