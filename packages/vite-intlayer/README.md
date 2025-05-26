<div align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/vite-intlayer">
    <img alt="npm" src="https://img.shields.io/npm/v/vite-intlayer.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/vite-intlayer">
    <img alt="downloads" src="https://badgen.net/npm/dm/vite-intlayer?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/vite-intlayer">
    <img alt="types included" src="https://badgen.net/npm/types/vite-intlayer?labelColor=49516F&color=8994BC" 
  />
</div>

# vite-intlayer

A Vite plugin for seamless internationalization (i18n), providing locale detection, redirection, and environment-based configuration.

## Features

- **Automatic Dictionary Resolution**: Resolves dictionary paths and configurations
- **Hot Reload Support**: Watches for dictionary changes during development
- **Babel Transform Plugin**: Automatically transforms `useIntlayer` calls to `useDictionary` calls at build time
- **TypeScript Support**: Full TypeScript support with proper type definitions

## Why Internationalize Your Vite Application?

Internationalizing your Vite application is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

## Configuration

The `vite-intlayer` package works seamlessly with the [`react-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/index.md), and the [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/index.md). Have a look at the relevant documentation for more information.

## Installation

```bash
npm install vite-intlayer
# or
pnpm add vite-intlayer
# or
yarn add vite-intlayer
```

## Usage

### Basic Setup

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerPlugin()],
});
```

### Configuration Options

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerPlugin({
      enableBabelTransform: true, // Enable automatic useIntlayer transformation (default: true)
    }),
  ],
});
```

## Babel Plugin: Automatic useIntlayer Transformation

The plugin includes a Babel transformation that automatically converts `useIntlayer` calls to `useDictionary` calls at build time, providing better performance and tree-shaking.

### Transformation Example

**Input:**

```tsx
import { useIntlayer } from "react-intlayer";

function MyComponent() {
  const content = useIntlayer("home-content");
  const otherContent = useIntlayer("about-page", "en");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{otherContent.description}</p>
    </div>
  );
}
```

**Output:**

```tsx
import homeContentDictionary from "./.intlayer/dictionary/home-content.json";
import aboutPageDictionary from "./.intlayer/dictionary/about-page.json";
import { useDictionary } from "react-intlayer";

function MyComponent() {
  const content = useDictionary(homeContentDictionary);
  const otherContent = useDictionary(aboutPageDictionary, "en");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{otherContent.description}</p>
    </div>
  );
}
```

### Benefits of the Transformation

1. **Better Performance**: Direct dictionary access instead of key-based lookup
2. **Tree Shaking**: Unused dictionaries can be eliminated from the bundle
3. **Type Safety**: Better TypeScript inference with direct dictionary references
4. **Build-time Optimization**: Transformation happens at build time, not runtime
5. **Individual File Loading**: Only the dictionaries you use are imported, reducing bundle size
6. **Better Caching**: Individual dictionary files can be cached separately by the browser

### Using the Babel Plugin Separately

You can also use the Babel plugin independently:

```ts
// babel.config.js
import { babelPluginIntlayer } from "vite-intlayer";

export default {
  plugins: [
    babelPluginIntlayer,
    // other plugins...
  ],
};
```

### Disabling the Transformation

If you prefer to use `useIntlayer` without transformation:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    intlayerPlugin({
      enableBabelTransform: false,
    }),
  ],
});
```

## How It Works

1. **Dictionary Resolution**: The plugin resolves paths to generated dictionaries and configurations
2. **Alias Setup**: Sets up Vite aliases for dictionary entry points
3. **Watch Mode**: In development, watches for dictionary changes and triggers rebuilds
4. **Babel Transformation**: Transforms `useIntlayer` calls to `useDictionary` calls for better performance

## Related Packages

- [`@intlayer/dictionaries-entry`](../dictionaries-entry): Dictionary entry point package
- [`react-intlayer`](../react-intlayer): React integration for Intlayer
- [`@intlayer/config`](../config): Configuration management
- [`@intlayer/chokidar`](../chokidar): File watching and dictionary building

## License

Apache-2.0

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/docs)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/docs/chat)
