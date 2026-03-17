import { getOptions } from '@utils/tsdown-config';
import { defineConfig } from 'tsdown';

export default defineConfig(
  // Disable unbundle so that internal runtime helpers (e.g. __decorate from
  // the oxc decorator transform) are inlined into each output file instead of
  // being emitted as a separate `_virtual/` module whose path contains `@`
  // characters that confuse Vite's dev-server URL handling.
  getOptions({ all: { unbundle: false } })
);
