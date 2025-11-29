```tsx
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true,
    transformPattern: ["**/*.{ts,tsx}"],
    outputDir: "./compiler",
  },
};

export default config;
```
