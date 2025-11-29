```tsx
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerCompiler()],
});
```
