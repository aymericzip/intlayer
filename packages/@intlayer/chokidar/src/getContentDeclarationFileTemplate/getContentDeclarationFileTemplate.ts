import { kebabCaseToCamelCase } from '@intlayer/config/utils';
import type { Format } from '../utils/getFormatFromExtension';

export const getContentDeclarationFileTemplate = async (
  key: string,
  format: Format,
  fileParams: Record<string, any> = {},
  noMetadata?: boolean
) => {
  const camelCaseKey = kebabCaseToCamelCase(key);
  const name = camelCaseKey.charAt(0).toLowerCase() + camelCaseKey.slice(1);

  const fileParamsString = Object.entries(fileParams)
    .filter(([, value]) => value !== undefined)
    .map(([paramKey, value]) => {
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(paramKey)
        ? paramKey
        : JSON.stringify(paramKey);

      const formattedValue =
        typeof value === 'object' || typeof value === 'string'
          ? JSON.stringify(value)
          : value;

      return `\n  ${formattedKey}: ${formattedValue},`;
    })
    .join('');

  let content: string;

  if (noMetadata) {
    content = '{}';
  } else if (format === 'json' || format === 'jsonc' || format === 'json5') {
    content = [
      '{',
      '  "$schema": "https://intlayer.org/schema.json",',
      `  "key": "${key}",${fileParamsString}`,
      '  "content": {',
      '  }',
      '}',
    ].join('\n');
  } else {
    content = [
      '{',
      `  key: '${key}',${fileParamsString}`,
      '  content: {',
      '  },',
      '}',
    ].join('\n');
  }

  const jsdoc = `/** @type {import('intlayer').Dictionary${noMetadata ? "['content']" : ''}} **/`;
  const satisfiesType = noMetadata ? "Dictionary['content']" : 'Dictionary';

  switch (format) {
    case 'ts':
      return [
        "import { type Dictionary } from 'intlayer';",
        '',
        `const ${name}Content = ${content} satisfies ${satisfiesType};`,
        '',
        `export default ${name}Content;`,
        '',
      ].join('\n');

    case 'cjs':
      return [
        jsdoc,
        `const ${name}Content = ${content};`,
        '',
        `module.exports = ${name}Content;`,
        '',
      ].join('\n');

    case 'json':
    case 'jsonc':
    case 'json5':
      return [content, ''].join('\n');

    default: // esm
      return [
        jsdoc,
        `const ${name}Content = ${content};`,
        '',
        `export default ${name}Content;`,
        '',
      ].join('\n');
  }
};
