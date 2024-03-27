import { readdir } from 'fs/promises';
import { join } from 'path';
import { PATH_EXCLUSIONS } from '../settings';

const listDirFiles = async (
  absoluteDirPath: string,
  fileExtensions: string[]
): Promise<string[]> => {
  const fileList: string[] = [];

  try {
    const entries = await readdir(absoluteDirPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = join(absoluteDirPath, entry.name);
      if (entry.isDirectory()) {
        // If the entry is a directory, check if it should be excluded
        if (!PATH_EXCLUSIONS.includes(entry.name)) {
          // If not, recurse into it
          const result = await listDirFiles(entryPath, fileExtensions);

          // Add the files found in the directory to the list
          fileList.push(...result);
        }
      } else {
        const isMatchFileExtension = fileExtensions.some((fileExtension) =>
          entry.name.endsWith(fileExtension)
        );

        if (isMatchFileExtension) {
          const relativePath = join(absoluteDirPath, entry.name);

          fileList.push(relativePath);
        }
      }
    }
  } catch (err) {
    console.error('Error reading directory', err);
  }

  return fileList;
};

export const listFiles = async (dir: string, fileExtensions: string[]) => {
  console.log(
    'Listing files extended by:',
    fileExtensions,
    ' in directory:',
    dir
  );

  const result = await listDirFiles(dir, fileExtensions);

  console.log('Files found:', result);

  return result;
};
