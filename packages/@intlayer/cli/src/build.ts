import { watch } from '@intlayer/chokidar';

type BuildOptions = { watch?: boolean };

export const build = (options: BuildOptions) => {
  watch({ persistent: options.watch ?? false });
};
