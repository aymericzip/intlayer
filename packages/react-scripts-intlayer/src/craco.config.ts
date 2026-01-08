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

// Necessary Exporting as CJS for CRACO to work
export default cracoConfig;
