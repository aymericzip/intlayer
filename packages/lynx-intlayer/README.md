<div align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/lynx-intlayer" target="blank"><img
    align="center"
    alt="npm"
    src="https://img.shields.io/npm/v/lynx-intlayer.svg?labelColor=49516F&color=8994BC&style=for-the-badge"
    height="30" /></a>
  <a href="https://npmjs.org/package/lynx-intlayer" target="blank"><img
      align="center"
      src="https://img.shields.io/npm/dm/lynx-intlayer?labelColor=49516F&color=8994BC&style=for-the-badge"
      alt="monthly downloads"
      height="30"
    /></a>
  <a href="https://npmjs.org/package/lynx-intlayer" target="blank"><img
      align="center"
      src="https://img.shields.io/npm/types/lynx-intlayer?label=types%20included&labelColor=49516F&color=8994BC&style=for-the-badge"
      alt="types included"
      height="30"
    /></a>
</div>

<div>
    <br/>
    <p align="center">
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer_org/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

# lynx-intlayer: Internationalize (i18n) an Lynx application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

**The `lynx-intlayer` package** allows you to internationalize your Vite application. It includes the Metro plugin to set the configuration through environment variables into the [Lynx bundler](https://lynxjs.org/index.html).

## Why Internationalize Your Lynx Application?

Internationalizing your Lynx application is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

## Configuration

The `lynx-intlayer` package works seamlessly with the [`react-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md), and the [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md). Have a look at the relevant documentation for more information.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## Example of usage

See an example of how to include the plugins into your vite configuration.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... other plugins
    pluginIntlayerLynx(),
  ],
});
```

## Mastering the internationalization of your Vite application

Intlayer provides a lot of features to help you internationalize your Vite application.

**To learn more about these features, refer to the [React Internationalization (i18n) with Intlayer and Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_lynx+react.md) guide for Lynx Application.**

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/docchat)
