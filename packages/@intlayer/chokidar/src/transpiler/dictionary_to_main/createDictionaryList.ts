import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { basename, extname, relative, resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import fg from 'fast-glob';
import { getFileHash } from '../../utils';

const { content } = getConfiguration();
const { dictionariesDir, mainDir } = content;

/**
 * This function generates the content of the dictionary list file
 */
const generateDictionaryListContent = (
  dictionaries: string[],
  format: 'cjs' | 'esm' = 'esm'
): string => {
  let content = '';

  const dictionariesRef = dictionaries.map((dictionaryPath) => ({
    relativePath: relative(mainDir, dictionaryPath),
    id: basename(dictionaryPath, extname(dictionaryPath)), // Get the base name as the dictionary id
    hash: `_${getFileHash(dictionaryPath)}`, // Get the hash of the dictionary to avoid conflicts
  }));

  // Import all dictionaries
  dictionariesRef.forEach((dictionary) => {
    if (format === 'esm')
      content += `import ${dictionary.hash} from '${dictionary.relativePath}';\n`;
    if (format === 'cjs')
      content += `const ${dictionary.hash} = require('${dictionary.relativePath}');\n`;
  });

  content += '\n';

  // Format Dictionary Map
  const formattedDictionaryMap: string = dictionariesRef
    .map((dictionary) => `"${dictionary.id}": ${dictionary.hash}`)
    .join(',\n');

  if (format === 'esm')
    content += `export default {\n${formattedDictionaryMap}\n};\n`;
  if (format === 'cjs')
    content += `module.exports = {\n${formattedDictionaryMap}\n};\n`;

  return content;
};

/**
 * This function generates a list of dictionaries in the main directory
 */
export const createDictionaryList = () => {
  // Create main directory if it doesn't exist
  if (!existsSync(mainDir)) {
    mkdirSync(mainDir, { recursive: true });
  }

  const dictionaries: string[] = fg.sync(`${dictionariesDir}/**/*.json`);

  // Create the dictionary list file
  const cjsContent = generateDictionaryListContent(dictionaries, 'cjs');
  writeFileSync(resolve(mainDir, 'dictionaries.cjs'), cjsContent);

  const esmContent = generateDictionaryListContent(dictionaries, 'esm');
  writeFileSync(resolve(mainDir, 'dictionaries.mjs'), esmContent);
};
