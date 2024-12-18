import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

export const getFileContent = (filePath: string): string => {
  // Read the file content using Node.js fs module.
  const fileContent = readFileSync(filePath, 'utf-8');
  return fileContent;
};

export const getAbsolutePath = (filePath: string): string =>
  join(__dirname, filePath);

export const writeFileContent = (filePath: string, content: string) => {
  // Create the directory if it doesn't exist
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });

  writeFileSync(filePath, content);
};
