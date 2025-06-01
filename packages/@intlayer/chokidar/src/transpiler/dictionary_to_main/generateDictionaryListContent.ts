import { getConfiguration } from '@intlayer/config';
import { basename, extname, relative } from 'path';
import { getFileHash } from '../../utils';

/**
 * This function generates the content of the dictionary list file
 */
export const generateDictionaryListContent = (
  dictionaries: string[],
  format: 'cjs' | 'esm' = 'esm',
  configuration = getConfiguration()
): string => {
  const { mainDir } = configuration.content;

  let content = '';

  const dictionariesRef = dictionaries.map((dictionaryPath) => ({
    relativePath: relative(mainDir, dictionaryPath),
    id: basename(dictionaryPath, extname(dictionaryPath)), // Get the base name as the dictionary id
    hash: `_${getFileHash(dictionaryPath)}`, // Get the hash of the dictionary to avoid conflicts
  }));

  // Import all dictionaries
  dictionariesRef.forEach((dictionary) => {
    if (format === 'esm')
      content += `import ${dictionary.hash} from '${dictionary.relativePath}' with { type: 'json' };\n`;
    if (format === 'cjs')
      content += `const ${dictionary.hash} = require('${dictionary.relativePath}');\n`;
  });

  content += '\n';

  // Format Dictionary Map
  const formattedDictionaryMap: string = dictionariesRef
    .map((dictionary) => `  "${dictionary.id}": ${dictionary.hash}`)
    .join(',\n');

  if (format === 'esm')
    content += `export default {\n${formattedDictionaryMap}\n};\n`;
  if (format === 'cjs')
    content += `module.exports = {\n${formattedDictionaryMap}\n};\n`;

  return content;
};
