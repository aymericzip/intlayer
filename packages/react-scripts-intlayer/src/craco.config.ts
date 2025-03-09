import type { CracoConfig } from '@craco/types';
import { intlayerCracoPlugin } from './intlayerCracoPlugin';

// Usage Example
const cracoConfig = {
  plugins: [
    {
      plugin: intlayerCracoPlugin,
    },
  ],
} satisfies CracoConfig;

export default cracoConfig;
