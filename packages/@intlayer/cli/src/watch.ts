import { watch as watchDictionaries } from '@intlayer/chokidar';

export const watch = () => {
  watchDictionaries({ persistent: true });
};
