<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/logo.png" width="60%" alt="Intlayer Logo" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer : an Open-source, flexible i18n toolkit with AI-powered translation & CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank">
    <img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm version" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub Stars" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank">
    <img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="monthly downloads" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="license"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main">
    <img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="last commit"/>
  </a>
</p>

![Watch the video](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

##  What is Intlayer?

Most i18n libraries are either too complex, too rigid, or not built for modern frameworks.  

Intlayer is a **modern i18n solution** for web and mobile apps.  
It’s framework-agnostic, **AI-powered**, and includes a free **CMS & visual editor**.  

With **per-locale content files**, **TypeScript autocompletion**, **tree-shakable dictionaries**, and **CI/CD integration**, Intlayer makes internationalization **faster, cleaner, and smarter**.

## ✨ Key Features

| Feature | TL;DR | Docs |
| ------- | ------ | ---- |
| **Cross-Framework Support** | Works with Next.js, React, Vite, Vue, Nuxt, Svelte, Angular, Express & more. | [See integrations](https://intlayer.org/doc/environment/nextjs) |
| **Type-Safe Dictionaries** | Autocomplete & type safety with TypeScript. | [Config](https://intlayer.org/doc/environment/vite-and-react#configure-typescript) |
| **Organized Content** | 1 component = 1 dictionary, stored locally. | [How it works](https://intlayer.org/doc/concept/how-works-intlayer) |
| **CMS + Visual Editor** | Free, Git-synced CMS for content writers. | [CMS](https://intlayer.org/doc/concept/cms) |
| **AI Translations** | Translate into 231 languages in one click, with your own AI provider. | [AI Setup](https://intlayer.org/doc/concept/ai) |
| **Markdown Support** | Import and localize `.md` content with metadata. | [Markdown](https://intlayer.org/doc/concept/content/markdown) |
| **CI/CD Ready** | Auto-translate in pipelines via CLI. | [CI/CD](https://intlayer.org/doc/concept/ci-cd) |
| **MCP Server** | IDE automation via Model Context Protocol. | [MCP Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md) |
| **VSCode Extension** | Manage translations directly inside VSCode. | [Extension](https://intlayer.org/doc/vs-code-extension) |
| **Interoperable** | Works alongside i18next, next-intl, react-intl, etc. | [Guides](https://intlayer.org/blog/intlayer-with-next-i18next) |

You can check more details on this features below ↓

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>
 
## 📦 Installation
```bash
npm install intlayer
```

⚡ Quick Start (Next.js)
```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from 'intlayer';

const config: IntlayerConfig = {
internationalization: {
locales: [Locales.ENGLISH,
          Locales.FRENCH,
          Locales.SPANISH],
strictMode: 'strict',
},
};

export default config;
```
```ts
// app/page.tsx
import { useIntlayer } from "intlayer";

export default function Page() {
  const { title } = useIntlayer("home");
return <h1>{title}</h1>;
}
```

 <a href="https://intlayer.org/fr/doc/environment/nextjs"> Get the full guide → </a>

## 🎥 Live tutorial on YouTube

[![How to Internationalize your application using Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## 🌐 Readme in other languages

[English](https://github.com/aymericzip/intlayer/blob/main/readme.md) • 
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) • 
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) • 
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) • 
[Français](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) • 
[한국어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) • 
[Español](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) • 
[Deutsch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) • 
[العربية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) • 
[Italiano](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) • 
[English (UK)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) • 
[Português](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) • 
[हिन्दी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)

## 🤝 Community

Intlayer is built with and for the community and we’d love your input!

- Have a suggestion? [Open an issue](https://github.com/aymericzip/intlayer/issues)  
- Found a bug or improvement? [Submit a PR](https://github.com/aymericzip/intlayer/pulls)  
- Need help or want to connect? [Join our Discord](https://discord.gg/528mBV4N)

You can also follow us on :

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
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

## ⭐ Star History

If you like Intlayer, give us a ⭐ on GitHub. It helps others discover the project!

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)


## Table of Contents

Explore our comprehensive documentation to get started with Intlayer and learn how to integrate it into your projects.
<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Get Started</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Why Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Introduction</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Concept</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">How Intlayer Works</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Configuration</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">AI provider</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Intlayer Editor</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Dictionary</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">Per-Locale Content Declaration File</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Translation</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Enumeration</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Condition</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Nesting</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Function Fetching</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Insertion</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">File</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Environment</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Intlayer with Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md">Vite + React</a></li>
  <li><a href="https://intlayer.org/fr/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/fr/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">Angular</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">Express</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md">What is i18n</a></li>
  <li><a href="https://intlayer.org//blog/SEO-and-i18n">i18n and SEO</a></li>
  <li><a href="https://intlayer.org//blog/intlayer-with-next-i18next">Intlayer and i18next</a></li>
  <li><a href="https://intlayer.org//blog/intlayer-with-react-i18next">Intlayer and react-intl</a></li>
  <li><a href="https://intlayer.org//blog/intlayer-with-next-intl">Intlayer and next-intl</a></li>
</ul>
</details>



### More details on the keys benefits of Intlayer:

| Feature                                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Cross-Frameworks Support**<br><br>Intlayer is compatible with all major frameworks and libraries, including Next.js, React, Vite, Vue.js, Nuxt, Preact, Express, and more.                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true)       | **JavaScript-Powered Content Management**<br><br>Harness the flexibility of JavaScript to define and manage your content efficiently. <br><br> - [Content declaration](https://intlayer.org/doc/concept/content)                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Per-Locale Content Declaration File**<br><br>Speed up your development by declaring your content once, before auto generation.<br><br> - [Per-Locale Content Declaration File](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Type-Safe Environment**<br><br>Leverage TypeScript to ensure your content definitions and code are error-free, while also benefiting from IDE autocompletion.<br><br> - [TypeScript configuration](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Simplified Setup**<br><br>Get up and running quickly with minimal configuration. Adjust settings for internationalization, routing, AI, build, and content handling with ease. <br><br> - [Explore Next.js integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Simplified Content Retrieval**<br><br>No need to call your `t` function for each piece of content. Retrieve all your content directly using a single hook.<br><br> - [React integration](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Consistent Server Component Implementation**<br><br>Perfectly suited for Next.js server components, use the same implementation for both client and server components, no need to pass your `t` function across each server component. <br><br> - [Server Components](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Organized Codebase**<br><br>Keep your codebase more organized: 1 component = 1 dictionary in the same folder. Translations close to their respective components, enhance maintainability and clarity. <br><br> - [How Intlayer works](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Enhanced Routing**<br><br>Full support of app routing, adapting seamlessly to complex application structures, for Next.js, React, Vite, Vue.js, etc.<br><br> - [Explore Next.js integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown Support**<br><br>Import and interpret, locale files and remote Markdown for multilingual content like privacy policies, documentation, etc. Interpret and make Markdown metadata accessible in your code.<br><br> - [Content files](https://intlayer.org/doc/concept/content/file)                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Free Visual Editor & CMS**<br><br>A free visual editor and CMS are available for content writers, removing the need for a localization platform. Keep your content synchronized using Git, or externalize it totally or partially with the CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable Content**<br><br>Tree-shakable content, reducing the size of the final bundle. Loads content per component, excluding any unused content from your bundle. Supports lazy loading to enhance app loading efficiency. <br><br> - [App build optimization](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Static Rendering**<br><br>Doesn't block Static Rendering. <br><br> - [Next.js integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI-Powered Translation**<br><br>Transform your website into 231 languages with just one click using Intlayer's advanced AI-powered translation tools using your own AI provider / API key. <br><br> - [CI/CD integration](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Auto fill](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP Server Integration**<br><br>Provides an MCP (Model Context Protocol) server for IDE automation, enabling seamless content management and i18n workflows directly within your development environment. <br><br> - [MCP Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode Extension**<br><br>Intlayer provides a VSCode extension to help you manage your content and translations, builting your dictionaries, translating your content, and more. <br><br> - [VSCode Extension](https://intlayer.org/doc/vs-code-extension)                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperability**<br><br>Allow interoperability with react-i18next, next-i18next, next-intl, and react-intl. <br><br> - [Intlayer and react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer and next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer and next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)           |

Start your journey with Intlayer today and experience a smoother, more powerful approach to internationalization.  

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

---- 
### Contribution

For more detailed guidelines on contributing to this project, please refer to the [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) file. It contains essential information on our development process, commit message conventions, and release procedures. Your contributions are valuable to us, and we appreciate your efforts in making this project better!
