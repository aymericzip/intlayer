import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { listFiles } from './listFiles';
import { getEntryKey, getEntryName, getEntryPath } from './utils/formatEntries';

export const createMainFile = async (
  entryPath: string,
  entryFileName: string,
  resultFolderName: string,
  fileExtensions: string[]
) => {
  const fileEntries = await listFiles(entryPath, fileExtensions);
  const mainFilePath = resolve(entryPath, resultFolderName, entryFileName);

  const mainImportContent = fileEntries
    .map((filePath, index) => {
      const isJSON = filePath.endsWith('.json');

      const entryName = getEntryName(filePath, fileExtensions, index);
      const entryPath = getEntryPath(mainFilePath, filePath);

      if (isJSON) {
        return `import * as ${entryName} from '${entryPath}';`;
      }

      return `import ${entryName} from '${entryPath}';`;
    })
    .join('\n');

  const mainBodyContent = `const result = {
      ${fileEntries
        .map((filePath, index) => {
          const entryKey = getEntryKey(mainFilePath, filePath);
          const entryName = getEntryName(filePath, fileExtensions, index);

          return `'${entryKey}': ${entryName}`;
        })
        .join(',\n')}\n};
        const getResult = () => JSON.stringify(result);\n export default getResult;`;

  const mainFileContent = `${mainImportContent} \n\n ${mainBodyContent}`;

  // Create the dist folder if it doesn't exist
  await mkdir(resolve(entryPath, resultFolderName), { recursive: true });

  // Create the main.js file with the dynamic imports
  await writeFile(mainFilePath, mainFileContent, 'utf8')
    .then(() => {
      console.info(`${entryFileName} has been created successfully.`);
    })
    .catch((err) => {
      console.error(`Error creating ${entryFileName}:`, err);
    });
};
