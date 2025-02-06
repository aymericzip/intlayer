<div align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/intlayer">
    <img alt="npm" src="https://img.shields.io/npm/v/intlayer.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="downloads" src="https://badgen.net/npm/dm/intlayer?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="types included" src="https://badgen.net/npm/types/intlayer?labelColor=49516F&color=8994BC" 
  />
</div>

# Intlayer: A closer way to translate your application

Intlayer offers a more flexible and modern approach to **internationalization** (i18n). Its seamless integration with **Next.js**, **React**, **Vite** and **Express**, customizable configuration, and support for various content declaration formats, such as **TypeScript** make it a powerful choice for internationalization.

![Watch the video](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

### Key Benefits of Intlayer:

- **Effortless Dictionary**  
  Organize and maintain your multilingual content efficiently by declaring content dictionaries directly alongside your components. This not only reduces complexity but also improves maintainability.  
  [Learn more about content declaration](https://intlayer.org/doc/concept/content)

- **Seamless Integration with Next.js, React, and Express**  
  Intlayer is designed to work flawlessly with Next.js and React, supporting features like server-side rendering, dynamic routing, and client-side rendering. This makes it the perfect choice for developers building modern web applications.  
  [Explore Next.js integration](https://intlayer.org/doc/environment/nextjs)  
  [Explore React integration](https://intlayer.org/doc/environment/create-react-app)
  [Explore Express integration](https://intlayer.org/doc/environment/express)

- **Simplified Content Management for Non-Developers**  
  With the command `npm intlayer push`, you can externalize content management, making it accessible to non-developer teams. Intlayer includes a free Content Management System (CMS), enabling your team to manage translations effortlessly.  
  [Learn about Intlayer CLI](https://intlayer.org/doc/concept/cli)

- **AI-Powered Translation**  
  Transform your website into 231 languages with just one click using Intlayer's advanced AI-powered translation tools. This feature simplifies the translation process and ensures global reach.  
  [Learn about Intlayer CLI](https://intlayer.org/doc/concept/cli)  
  [Learn about Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md)

- **Optimized for Server Components**  
  Intlayer seamlessly supports React Server Components, enabling efficient internationalization in modern server-rendered applications. This ensures faster load times and improved SEO performance while maintaining a consistent multilingual experience across your app.  
  [Learn more about Server Components](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)

- **Enhanced Developer Experience with TypeScript**  
  With full TypeScript support, Intlayer enables type-safe content definitions, improving code quality and boosting developer productivity.

- **Powerful Customization Options**  
  Tailor Intlayer to meet your project’s unique needs. Adjust settings for internationalization, middleware, and content handling with ease.  
  [Discover how to configure Intlayer](https://intlayer.org/doc/concept/configuration)

Start your journey with Intlayer today and experience a smoother, more powerful approach to internationalization.  
[Get Started with Intlayer](https://intlayer.org/doc/concept/content)

---

## Table of Contents

Explore our comprehensive documentation to get started with Intlayer and learn how to integrate it into your projects.

### Get Started

- [Introduction](https://intlayer.org/doc)

### Concept

- [How Intlayer Works](https://intlayer.org/doc/concept/how-works-intlayer)
- [Configuration](https://intlayer.org/doc/concept/configuration)
- [Interest of Intlayer](https://intlayer.org/doc/concept/interest)
- [Intlayer CLI](https://intlayer.org/doc/concept/cli)
- [Intlayer Editor](https://intlayer.org/doc/concept/editor)
- [Intlayer CMS](https://intlayer.org/doc/concept/cms)
- **Dictionary**
  - [Declare Your Content](https://intlayer.org/doc/concept/content)
  - [Translation](https://intlayer.org/doc/concept/content/translation)
  - [Enumeration](https://intlayer.org/doc/concept/content/enumeration)
  - [Function Fetching](https://intlayer.org/doc/concept/content/function-fetching)

### Environment

- [Intlayer with Next.js 15](https://intlayer.org/doc/environment/nextjs)
  - [Intlayer with Next.js 14 (App Router)](https://intlayer.org/doc/environment/nextjs/14)
  - [Intlayer with Next.js Page Router](https://intlayer.org/doc/environment/nextjs/next-with-Page-Router)
- [Intlayer with React CRA](https://intlayer.org/doc/environment/create-react-app)
- [Intlayer with Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+react.md)
- [Intlayer with Express](https://intlayer.org/doc/environment/express)

### Packages

#### intlayer

- [Package](https://intlayer.org/doc/packages/intlayer)
  - [getConfiguration](https://intlayer.org/doc/packages/intlayer/getConfiguration)
  - [getHTMLTextDir](https://intlayer.org/doc/packages/intlayer/getHTMLTextDir)
  - [getLocaleLang](https://intlayer.org/doc/packages/intlayer/getLocaleLang)
  - [getLocaleName](https://intlayer.org/doc/packages/intlayer/getLocaleName)
  - [getLocalizedUrl](https://intlayer.org/doc/packages/intlayer/getLocalizedUrl)
  - [getMultilingualUrls](https://intlayer.org/doc/packages/intlayer/getMultilingualUrls)
  - [getPathWithoutLocale](https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale)
  - [getTranslationContent](https://intlayer.org/doc/packages/intlayer/getTranslationContent)
  - [getEnumerationContent](https://intlayer.org/doc/packages/intlayer/getEnumerationContent)

#### express-intlayer

- [Package](https://intlayer.org/doc/packages/express-intlayer)
  - [t](https://intlayer.org/doc/packages/express-intlayer/t)

#### react-intlayer

- [Package](https://intlayer.org/doc/packages/react-intlayer)
  - [t](https://intlayer.org/doc/packages/react-intlayer/t)
  - [useIntlayer](https://intlayer.org/doc/packages/react-intlayer/useIntlayer)
  - [useDictionary](https://intlayer.org/doc/packages/react-intlayer/useDictionary)
  - [useLocale](https://intlayer.org/doc/packages/react-intlayer/useLocale)

#### next-intlayer

- [Package](https://intlayer.org/doc/packages/next-intlayer)
  - [t](https://intlayer.org/doc/packages/next-intlayer/t)
  - [useIntlayer](https://intlayer.org/doc/packages/next-intlayer/useIntlayer)
  - [useDictionary](https://intlayer.org/doc/packages/next-intlayer/useDictionary)
  - [useLocale](https://intlayer.org/doc/packages/next-intlayer/useLocale)

#### vite-intlayer

- [Package](https://intlayer.org/doc/packages/vite-intlayer)

#### react-scripts-intlayer

- [Package](https://intlayer.org/doc/packages/react-scripts-intlayer)

### Blog

- [What is i18n](https://github.com/aymericzip/intlayer/blob/main/blog/en/what_is_internationalization.md)
- [i18n and SEO](https://intlayer.org//blog/SEO-and-i18n)
- [Intlayer and i18next](https://intlayer.org//blog/intlayer-with-next-i18next)
- [Intlayer and react-intl](https://intlayer.org//blog/intlayer-with-react-i18next)
- [Intlayer and next-intl](https://intlayer.org//blog/intlayer-with-next-intl)
- [Intlayer and react-intl](https://intlayer.org//blog/intlayer-with-react-intl)

---

## Live tutorial on YouTube

[![How to Internationalize your application using Intlayer](https://i.ytimg.com/vi/W2G7KxuSD4c/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)
