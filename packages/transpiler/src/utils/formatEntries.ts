import { basename, dirname, relative } from 'path';

/**
 * Formats the entry path
 *
 * @param mainFilePath
 * @param filePath
 * @returns
 */
// import { entryName } from './entryPath';
export const getEntryPath = (mainFilePath: string, filePath: string) => {
  const mainDir = dirname(mainFilePath);
  const relativePath = relative(mainDir, filePath);
  return relativePath.replace('.ts', '');
};

// import { entryName } from './entryPath';
export const getEntryName = (
  filePath: string,
  fileExtensions: string[],
  index?: number
) => {
  const fileExtension = fileExtensions.find((ext) => filePath.endsWith(ext));
  const fileName = basename(filePath, fileExtension);
  const filePathSplit: string[] = filePath?.split('.');
  const fileType = filePathSplit[filePathSplit.length - 1];

  if (typeof index === 'undefined') {
    return `${fileName}_${fileType}`;
  }

  return `_${index}_${fileName}`;
};

// import { entryName } from './entryPath';
// const result = { entryKey : entryName };
export const getEntryKey = (mainFilePath: string, filePath: string) => {
  const mainDir = dirname(mainFilePath);
  return relative(mainDir, filePath);
};
