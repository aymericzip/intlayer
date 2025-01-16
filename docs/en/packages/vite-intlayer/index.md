# vite-intlayer: NPM Package to internationalize (i18n) an Vite application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

**The `vite-intlayer` package** allows you to internationalize your Vite application. It includes the Vite plugin to set the configuration through environment variables into the [Vite bundler](https://vitejs.dev/guide/why.html#why-bundle-for-production). It also provides middleware to detect the user's preferred locale, and redirect the user to the appropriate URL as specified in the [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md).

## Why Internationalize Your Vite Application?

Internationalizing your Vite application is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

## Configuration

The `vite-intlayer` package works seamlessly with the [`react-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/index.md), and the [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/index.md). Have a look at the relevant documentation for more information.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Example of usage

See an example of how to include the plugins into your vite configuration.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> The `intlayerPlugin()` Vite plugin is used to integrate Intlayer with Vite. It ensures the building of content declaration files and monitors them in development mode. It defines Intlayer environment variables within the Vite application. Additionally, it provides aliases to optimize performance.

> The `intLayerMiddlewarePlugin()` add server-side routing to your application. This plugin will automatically detect the current locale based on the URL and set the appropriate locale cookie. If no locale is specified, the plugin will determine the most appropriate locale based on the user's browser language preferences. If no locale is detected, it will redirect to the default locale.

## Mastering the internationalization of your Vite application

Intlayer provides a lot of features to help you internationalize your Vite application.

**To learn more about these features, refer to the [React Internationalization (i18n) with Intlayer and Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+react.md) guide for Vite and React Application.**
