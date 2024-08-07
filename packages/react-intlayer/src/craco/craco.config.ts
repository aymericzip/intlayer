import type { CracoConfig, CracoPlugin } from '@craco/types';
import * as intlayerPlugin from './intlayerCracoPlugin';

// Usage Example
module.exports = {
  plugins: [
    {
      plugin: intlayerPlugin as CracoPlugin,
    },
  ],
} satisfies CracoConfig;
