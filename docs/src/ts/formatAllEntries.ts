import { join } from 'path';
import fg from 'fast-glob';
import { writeFileContent } from './fs';

export const formatAllDocEntry = () => {
  const docList: string[] = fg.sync('**/*.md', {
    ignore: ['**/node_modules/**', '**/src/**', '*.md'],
  });

  const content = docList
    .map((key) => `"${key}": require("../../${key}")`)
    .join(',\n');

  const fileResult = `export const docs: Record<string, string> = {${content}};
    `;

  writeFileContent(join(__dirname, `./docEntries.ts`), fileResult);

  return fileResult;
};

formatAllDocEntry();