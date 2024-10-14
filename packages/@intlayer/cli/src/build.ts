import { watch } from '@intlayer/chokidar';

export const build = () => {
  watch({ persistent: false });
};
