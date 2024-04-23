#!/usr/bin/env node

import { watch } from '@intlayer/chokidar';
import { setAPI } from '@intlayer/cli';

// Log the compiler options
setAPI({
  version: '1.0.0',
  transpile: () => watch({ persistent: false }),
  watch: () => watch({ persistent: true }),
});
