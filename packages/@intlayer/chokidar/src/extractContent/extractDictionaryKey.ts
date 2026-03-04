import { camelCaseToKebabCase } from '@intlayer/config/utils';
import { detectExportedComponentName } from '../writeContentDeclaration/detectExportedComponentName';
import { extractDictionaryKeyFromPath } from './extractor';

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
