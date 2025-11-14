import { readAsset } from 'utils:asset';
import { kebabCaseToCamelCase } from '@intlayer/config';
import type { Format } from '../utils/getFormatFromExtension';

export const getContentDeclarationFileTemplate = async (
  key: string,
  format: Format,
  fileParams: Record<string, any> = {}
) => {
  let fileTemplate: string;

  switch (format) {
    case 'ts':
      fileTemplate = './tsTemplate.txt';
      break;
    case 'cjs':
      fileTemplate = './cjsTemplate.txt';
      break;
    case 'json':
      fileTemplate = './jsonTemplate.txt';
      break;
    default:
      fileTemplate = './esmTemplate.txt';
      break;
  }

  const fileContent = readAsset(fileTemplate);
  const camelCaseKey = kebabCaseToCamelCase(key);
  const nonCapitalizedCamelCaseKey =
    camelCaseKey.charAt(0).toLowerCase() + camelCaseKey.slice(1);

  const fileParamsString = Object.entries(fileParams)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return `\n  '${key}': ${JSON.stringify(value)},`;
      }

      if (typeof value === 'boolean' || typeof value === 'number') {
        return `\n  '${key}': ${value},`;
      }

      if (typeof value === 'string') {
        return `\n  '${key}': '${value}',`;
      }

      return `\n  '${key}': ${value},`;
    })
    .join('');

  return fileContent
    .replace('{{key}}', key)
    .replaceAll('{{name}}', nonCapitalizedCamelCaseKey)
    .replace('{{fileParams}}', fileParamsString);
};
