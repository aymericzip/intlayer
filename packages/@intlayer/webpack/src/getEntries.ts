import { listDictionaries } from '@intlayer/chokidar/listDictionaries';
import { getPathHash } from '@intlayer/chokidar/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { EntryObject } from 'webpack';

export const getEntries = async (
  configuration: IntlayerConfig
): Promise<EntryObject> => {
  const files = await listDictionaries(configuration);

  return files.reduce((obj, el) => {
    const hash = getPathHash(el);

    obj[`intlayer-content/${hash}`] = {
      import: el,
      dependOn: undefined,
    };

    return obj;
  }, {} as EntryObject);
};
