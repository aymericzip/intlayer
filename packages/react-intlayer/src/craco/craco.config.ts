import type { CracoConfig } from '@craco/types';
import * as intlayerPlugin from './intlayerCracoPlugin';

// Usage Example
module.exports = {
  plugins: [
    {
      plugin: intlayerPlugin,
    },
  ],
} satisfies CracoConfig;
