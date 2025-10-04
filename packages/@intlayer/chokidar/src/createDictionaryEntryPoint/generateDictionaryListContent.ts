import { basename, extname, relative } from 'node:path';
import { getConfiguration, normalizePath } from '@intlayer/config';
import { getFileHash } from '../utils/getFileHash';

/**
 * This function generates the content of the dictionary list file
 */
export const generateDictionaryListContent = (
  dictionaries: string[],
  functionName: string,
  format: 'cjs' | 'esm' = 'esm',
  configuration = getConfiguration()
): string => {
  const { mainDir } = configuration.content;

  let content = '';

  const dictionariesRef = dictionaries.map((dictionaryPath) => ({
    relativePath: normalizePath(relative(mainDir, dictionaryPath)),
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

  content += `const dictionaries = {\n${formattedDictionaryMap}\n};\n`;
  content += `const ${functionName} = () => dictionaries;\n`;

  if (format === 'esm') {
    content += `\n`;
    content += `export { ${functionName} };\n`;
    content += `export default dictionaries;\n`;
  }

  if (format === 'cjs') {
    content += `\n`;
    content += `module.exports.${functionName} = ${functionName};\n`;
    content += `module.exports = dictionaries;\n`;
  }

  return content;
};
