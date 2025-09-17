import {
  ANSIColors,
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

  const keyColWidth = rows.reduce((max, r) => Math.max(max, r.key.length), 0);

  const lines = rows
    .map((r) => {
      const keyPadded = r.key.padEnd(keyColWidth, ' ');
      return ` - ${keyPadded} - ${ANSIColors.GREY}${r.path}${ANSIColors.RESET}`;
    })
    .join('\n');

  appLogger(`Content declaration files:\n${lines}`);

  appLogger(`Total content declaration files: ${rows.length}`);
};
