import { relative } from 'node:path';
import { formatPath } from '@intlayer/chokidar';
import {
  colon,
  colorizeKey,
  colorizeNumber,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

type ListContentDeclarationOptions = {
  configOptions?: GetConfigurationOptions;
  json?: boolean;
  absolute?: boolean;
};

export const listContentDeclarationRows = (
  options?: ListContentDeclarationOptions
) => {
  const config = getConfiguration(options?.configOptions);

  const unmergedDictionariesRecord = getUnmergedDictionaries(config);

  const rows = Object.values(unmergedDictionariesRecord)
    .flat()
    .map((dictionary) => ({
      key: dictionary.key ?? '',
      path: options?.absolute
        ? (dictionary.filePath ?? 'Remote')
        : relative(config.content.baseDir, dictionary.filePath ?? 'Remote'),
    }));
  return rows;
};

export const listContentDeclaration = (
  options?: ListContentDeclarationOptions
) => {
  const rows = listContentDeclarationRows(options);

  if (options?.json) {
    console.log(JSON.stringify(rows));
    return;
  }

  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config, {
    config: {
      prefix: '',
    },
  });

  const lines = rows.map((row) =>
    [
      colon(` - ${colorizeKey(row.key)}`, {
        colSize: rows.map((row) => row.key.length),
        maxSize: 60,
      }),
      ' - ',
      formatPath(row.path),
    ].join('')
  );

  appLogger(`Content declaration files:`);

  lines.forEach((line) => {
    appLogger(line, {
      level: 'info',
    });
  });

  appLogger(`Total content declaration files: ${colorizeNumber(rows.length)}`);
};
