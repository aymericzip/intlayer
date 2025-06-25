<div align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/nuxt-intlayer" target="blank"><img
    align="center"
    alt="npm"
    src="https://img.shields.io/npm/v/nuxt-intlayer.svg?labelColor=49516F&color=8994BC&style=for-the-badge"
    height="30" /></a>
  <a href="https://npmjs.org/package/nuxt-intlayer" target="blank"><img
      align="center"
      src="https://img.shields.io/npm/dm/nuxt-intlayer?labelColor=49516F&color=8994BC&style=for-the-badge"
      alt="monthly downloads"
      height="30"
    /></a>
  <a href="https://npmjs.org/package/nuxt-intlayer" target="blank"><img
      align="center"
      src="https://img.shields.io/npm/types/nuxt-intlayer?label=types%20included&labelColor=49516F&color=8994BC&style=for-the-badge"
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

> This package is in development.

# nuxt-intlayer: Internationalize (i18n) an Nuxt application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like Vue, Svelte, and Express.js.

**The `nuxt-intlayer` package** allows you to internationalize your Nuxt application. It provides context providers and hooks for Nuxt internationalization.

## Why Internationalize Your Nuxt Application?

Internationalizing your Vue application is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

## Why to integrate Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```bash packageManager="yarn"
yarn add nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add nuxt-intlayer
```

## What does `nuxt-intlayer` do as a Nuxt module?

`nuxt-intlayer` is a Nuxt module that seamlessly integrates internationalization (i18n) into your Nuxt application. As a module, it:

- Automatically sets up i18n support for your app with minimal configuration.
- Provides composables and helpers for translation, locale switching, and dictionary management.
- Loads and manages translation dictionaries efficiently.
- Integrates with Nuxt SSR and routing for locale-aware navigation and static generation.
- Keeps your translations type-safe and close to your components.

### Quickstart: Add to your Nuxt config

Add `nuxt-intlayer` to your `modules` in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

Once added, you can use composables like `useIntlayer()` or helpers provided by the module in your components and pages to translate content and manage locales.

## Example of usage

to fill

## Mastering the internationalization of your Vue application

Intlayer provides a lot of features to help you internationalize your Vue application.

**To learn more about these features, refer to the [Vue Internationalization (i18n) with Intlayer and Vite and Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md) guide for Vite and Vue Application, or the [Vue Internationalization (i18n) with Intlayer and Vue (CRA)](https://intlayer.org/doc/environment/create-react-app) guide for Vue Create App.**

## Functions provided by `nuxt-intlayer` package

The `nuxt-intlayer` package also provides some functions to help you to internationalize your application.

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/docchat)
