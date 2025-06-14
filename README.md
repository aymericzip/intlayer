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

# Intlayer: A tailored way to translate your website

Intlayer offers a more flexible and modern approach to **internationalization** (i18n). Its seamless integration with **Next.js**, **React**, **Vite** and **Express**, customizable configuration, and support for various Content declaration formats, such as **TypeScript** make it a powerful choice for internationalization.

![Watch the video](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

### Key Benefits of Intlayer:

| Feature                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png)       | **JavaScript-Powered Content Management**<br><br>Harness the flexibility of JavaScript to define and manage your content efficiently. <br><br> - [Content declaration](https://intlayer.org/doc/concept/content)                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png) | **Per-Locale Content Declaration File**<br><br>Speed up your development by declaring your content once, before auto generation. <br><br> - [Per-Locale Content Declaration File](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)                      | **Type-Safe Environment**<br><br>Leverage TypeScript to ensure your content definitions and code are error-free, while also benefiting from IDE autocompletion.<br><br> - [TypeScript configuration](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png)                         | **Simplified Setup**<br><br>Get up and running quickly with minimal configuration. Adjust settings for internationalization, routing, AI, build, and content handling with ease. <br><br> - [Explore Next.js integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png)                   | **Simplified Content Retrieval**<br><br>No need to call your `t` function for each piece of content; retrieve all your content directly using a single hook. <br><br> - [React integration](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png)                    | **Consistent Server Component Implementation**<br><br>Perfectly suited for Next.js server components, use the same implementation for both client and server components, no need to pass your `t` function across each server component. <br><br> - [Server Components](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png)                           | **Organized Codebase**<br><br>Keep your codebase more organized: 1 component = 1 dictionary in the same folder. Translations close to their respective components, enhance maintainability and clarity. <br><br> - [How Intlayer works](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png)                         | **Enhanced Routing**<br><br>Full support of app routing, adapting seamlessly to complex application structures, for Next.js, React, Vite, Vue.js, etc. <br><br> - [Explore Next.js integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png)                            | **Markdown Support**<br><br>Import and interpret markdown files for multilingual content like privacy policies, documentation, etc. <br><br> - [Content files](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png)                       | **Free Visual Editor & CMS**<br><br>A free visual editor and CMS are available for content writers, removing the need for a localization platform. <br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png)                              | **Tree-shakable Content**<br><br>The content is tree-shakable, which lightens the final bundle. <br><br> - [App build optimization](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png)                    | **Static Rendering**<br><br>Intlayer doesn't block Static Rendering as other solutions do. <br><br> - [Next.js integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png)                      | **AI-Powered Translation**<br><br>Transform your website into 231 languages with just one click using Intlayer's advanced AI-powered translation tools using your own AI provider / API key. <br><br> - [CI/CD integration](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Auto fill](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png)                                 | **MCP Server Integration**<br><br>Provides an MCP (Model Context Protocol) server for IDE automation, enabling seamless content management and i18n workflows directly within your development environment. <br><br> - [MCP Server](https://github.com/aymericzip/intlayer/blob/main/docs/en/mcp_server.md)                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png)                    | **Interoperability**<br><br>Allow interoperability with react-i18next, next-i18next, next-intl, and react-intl. <br><br> - [Intlayer and react-intl](https://intlayer.org//blog/intlayer-with-react-intl) <br> - [Intlayer and next-intl](https://intlayer.org//blog/intlayer-with-next-intl) <br> - [Intlayer and next-i18next](https://intlayer.org//blog/intlayer-with-next-i18next)        |

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
- [AI provider](https://intlayer.org/doc/concept/ai)
- [Interest of Intlayer](https://intlayer.org/doc/concept/interest)
- [Intlayer CLI](https://intlayer.org/doc/concept/cli)
- [Intlayer Editor](https://intlayer.org/doc/concept/editor)
- [Intlayer CMS](https://intlayer.org/doc/concept/cms)
- [Dictionary](https://intlayer.org/doc/concept/content)
  - [Per-Locale Content Declaration File](https://intlayer.org/doc/concept/content/per-locale-file)
  - [Translation](https://intlayer.org/doc/concept/content/translation)
  - [Enumeration](https://intlayer.org/doc/concept/content/enumeration)
  - [Condition](https://intlayer.org/doc/concept/content/condition)
  - [Nesting](https://intlayer.org/doc/concept/content/nesting)
  - [Markdown](https://intlayer.org/doc/concept/content/markdown)
  - [Function Fetching](https://intlayer.org/doc/concept/content/function-fetching)
  - [Insertion](https://intlayer.org/doc/concept/content/insertion)
  - [File](https://intlayer.org/doc/concept/content/file)

### Environment

- [Intlayer with Next.js 15](https://intlayer.org/doc/environment/nextjs)
  - [Intlayer with Next.js 14 (App Router)](https://intlayer.org/doc/environment/nextjs/14)
  - [Intlayer with Next.js Page Router](https://intlayer.org/doc/environment/nextjs/next-with-Page-Router)
- [Intlayer with React CRA](https://intlayer.org/doc/environment/create-react-app)
- [Intlayer with Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+react.md)
- [Intlayer with React Native](https://intlayer.org/fr/doc/environment/react-native-and-expo)
- [Intlayer with Lynx and React](https://intlayer.org/fr/doc/environment/lynx-and-react)
- [Intlayer with Vite and Svelte](https://intlayer.org/doc/environment/vite-and-svelte)
- [Intlayer with Vite and Preact](https://intlayer.org/doc/environment/vite-and-preact)
- [Intlayer with Vite and Vue](https://intlayer.org/doc/environment/vite-and-vue)
- [Intlayer with Vite and Solid](https://intlayer.org/doc/environment/vite-and-solid)
- [Intlayer with Angular](https://intlayer.org/doc/environment/angular)
- [Intlayer with Express](https://intlayer.org/doc/environment/express)

### Blog

- [What is i18n](https://github.com/aymericzip/intlayer/blob/main/blog/en/what_is_internationalization.md)
- [i18n and SEO](https://intlayer.org//blog/SEO-and-i18n)
- [Intlayer and i18next](https://intlayer.org//blog/intlayer-with-next-i18next)
- [Intlayer and react-intl](https://intlayer.org//blog/intlayer-with-react-i18next)
- [Intlayer and next-intl](https://intlayer.org//blog/intlayer-with-next-intl)
- [Intlayer and react-intl](https://intlayer.org//blog/intlayer-with-react-intl)

---

## Live tutorial on YouTube

[![How to Internationalize your application using Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

### Contribution

For more detailed guidelines on contributing to this project, please refer to the [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) file. It contains essential information on our development process, commit message conventions, and release procedures. Your contributions are valuable to us, and we appreciate your efforts in making this project better!
