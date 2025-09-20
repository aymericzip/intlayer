import { formatPath } from '@intlayer/chokidar';
import {
  colon,
  colorizeKey,
  colorizeNumber,
  getAppLogger,
  getConfiguration,
  type GetConfigurationOptions,
} from '@intlayer/config';
import unmergedDictionariesRecord from '@intlayer/unmerged-dictionaries-entry';
import { relative } from 'path';

type ListContentDeclarationOptions = {
  configOptions?: GetConfigurationOptions;
};

export const listContentDeclarationRows = (
  options?: ListContentDeclarationOptions
) => {
  const config = getConfiguration(options?.configOptions);

  const rows = Object.values(unmergedDictionariesRecord)
    .flat()
    .map((dictionary) => ({
      key: dictionary.key ?? '',
      path: relative(config.content.baseDir, dictionary.filePath ?? 'Remote'),
    }));
  return rows;
};

export const listContentDeclaration = (
  options?: ListContentDeclarationOptions
) => {
  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config, {
    config: {
      prefix: '',
    },
  });

  const rows = listContentDeclarationRows(options);

  const lines = rows.map((r) =>
    [
      colon(` - ${colorizeKey(r.key)}`, {
        colSize: rows.map((r) => r.key.length),
        maxSize: 60,
      }),
      ' - ',
      formatPath(r.path),
    ].join('')
  );

  appLogger(`Content declaration files:`);

  lines.forEach((l) => {
    appLogger(l, {
      level: 'info',
    });
  });

  appLogger(`Total content declaration files: ${colorizeNumber(rows.length)}`);
};
