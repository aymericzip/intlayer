import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

export const transpileTsCode = async (
  entryPath: string,
  resultFolderName: string,
  entryFileName: string,
  outputFileName: string
) => {
  const entryFilePath = resolve(
    entryPath,
    resultFolderName,
    entryFileName // .replace('.ts', '.bundle.js')
  );
  const resultFilePath = resolve(entryPath, resultFolderName, outputFileName);

  const isEntryFilePathExist = existsSync(entryFilePath);

  if (!isEntryFilePathExist) {
    console.error('Entry file not found.');
    return;
  }

  const entry = require(entryFilePath);
  const result = entry.default ?? entry;

  // Create the main.js file with the dynamic imports
  await writeFile(resultFilePath, result, 'utf8')
    .then(() => {
      console.info(`${entryFileName} has been created successfully.`);
    })
    .catch((err) => {
      console.error(`Error creating ${entryFileName}:`, err);
    });
};
