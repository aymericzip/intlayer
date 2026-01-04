<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer Logo" />
  </a>
</p>

<h1 align="center">
  <strong>Per-component i18n</strong>
</h1>
<h2 align="center">
  <strong>AI-powered translation. Visual Editor. Multilingual CMS.</strong>
</h2>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content" rel="">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs" rel="">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react" rel="">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm version" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub Stars" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="monthly downloads" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="license"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="last commit"/>
  </a>
  <a href="https://www.bountyhub.dev/en/bounty/view/a2f24259-80ae-4a19-82e7-288718fba449/adapt-markdown-parser-in-a-custom-packages" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/badge/Bounties-on%20BountyHub-yellow?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="Bounties on BountyHub"/>
  </a>
</p>

![Watch the video](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## What is Intlayer?

Most i18n libraries are either too complex, too rigid, or not built for modern frameworks.

Intlayer is a **modern i18n solution** for web and mobile apps.  
It’s framework-agnostic, **AI-powered**, and includes a free **CMS & visual editor**.

With **per-locale content files**, **TypeScript autocompletion**, **tree-shakable dictionaries**, and **CI/CD integration**, Intlayer makes internationalization **faster, cleaner, and smarter**.

## Keys benefits of Intlayer:

| Feature                                                                                                                                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **Cross-Frameworks Support**<br><br>Intlayer is compatible with all major frameworks and libraries, including Next.js, React, Vite, Vue.js, Nuxt, Preact, Express, and more.                                                                                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Feature" width="700">       | **JavaScript-Powered Content Management**<br><br>Harness the flexibility of JavaScript to define and manage your content efficiently. <br><br> - [Content declaration](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **Per-Locale Content Declaration File**<br><br>Speed up your development by declaring your content once, before auto generation.<br><br> - [Per-Locale Content Declaration File](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **Type-Safe Environment**<br><br>Leverage TypeScript to ensure your content definitions and code are error-free, while also benefiting from IDE autocompletion.<br><br> - [TypeScript configuration](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **Simplified Setup**<br><br>Get up and running quickly with minimal configuration. Adjust settings for internationalization, routing, AI, build, and content handling with ease. <br><br> - [Explore Next.js integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **Simplified Content Retrieval**<br><br>No need to call your `t` function for each piece of content. Retrieve all your content directly using a single hook.<br><br> - [React integration](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **Consistent Server Component Implementation**<br><br>Perfectly suited for Next.js server components, use the same implementation for both client and server components, no need to pass your `t` function across each server component. <br><br> - [Server Components](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **Organized Codebase**<br><br>Keep your codebase more organized: 1 component = 1 dictionary in the same folder. Translations close to their respective components, enhance maintainability and clarity. <br><br> - [How Intlayer works](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **Enhanced Routing**<br><br>Full support of app routing, adapting seamlessly to complex application structures, for Next.js, React, Vite, Vue.js, etc.<br><br> - [Explore Next.js integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Markdown Support**<br><br>Import and interpret, locale files and remote Markdown for multilingual content like privacy policies, documentation, etc. Interpret and make Markdown metadata accessible in your code.<br><br> - [Content files](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **Free Visual Editor & CMS**<br><br>A free visual editor and CMS are available for content writers, removing the need for a localization platform. Keep your content synchronized using Git, or externalize it totally or partially with the CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **Tree-shakable Content**<br><br>Tree-shakable content, reducing the size of the final bundle. Loads content per component, excluding any unused content from your bundle. Supports lazy loading to enhance app loading efficiency. <br><br> - [App build optimization](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **Static Rendering**<br><br>Doesn't block Static Rendering. <br><br> - [Next.js integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **AI-Powered Translation**<br><br>Transform your website into 231 languages with just one click using Intlayer's advanced AI-powered translation tools using your own AI provider / API key. <br><br> - [CI/CD integration](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Auto fill](https://intlayer.org/doc/concept/auto-fill)                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **MCP Server Integration**<br><br>Provides an MCP (Model Context Protocol) server for IDE automation, enabling seamless content management and i18n workflows directly within your development environment. <br><br> - [MCP Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **VSCode Extension**<br><br>Intlayer provides a VSCode extension to help you manage your content and translations, building your dictionaries, translating your content, and more. <br><br> - [VSCode Extension](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Interoperability**<br><br>Allow interoperability with react-i18next, next-i18next, next-intl, react-intl, vue-i18n. <br><br> - [Intlayer and react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer and next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer and next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer and vue-i18n](https://intlayer.org/blog/intlayer-with-vue-i18n) |

---

## 📦 Installation

Start your journey with Intlayer today and experience a smoother, more powerful approach to internationalization.

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Quick Start (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts
// app/home.content.ts
import { t, type Dictionary } from "intlayer";

const content = {
  key: "home",
  content: {
    title: t({
      en: "Home",
      fr: "Accueil",
      es: "Inicio",
    }),
  },
} satisfies Dictionary;

export default content;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const HomePage = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Get the full guide → </a>

## 🎥 Live tutorial on YouTube

[![How to Internationalize your application using Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Table of Contents

Explore our comprehensive documentation to get started with Intlayer and learn how to integrate it into your projects.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Get Started</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why" rel=''>Why Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc" rel=''>Introduction</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Concept</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer" rel=''>How Intlayer Works</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration" rel=''>Configuration</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli" rel=''>Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor" rel=''>Intlayer Editor</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms" rel=''>Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content" rel=''>Dictionary</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file" rel=''>Per-Locale Content Declaration File</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation" rel=''>Translation</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration" rel=''>Enumeration</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition" rel=''>Condition</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting" rel=''>Nesting</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown" rel=''>Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching" rel=''>Function Fetching</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion" rel=''>Insertion</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file" rel=''>File</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Environment</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs" rel=''>Intlayer with Next.js 16</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/15" rel=''>Next.js 15</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14" rel=''>Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router" rel=''>Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app" rel=''>React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7" rel=''>React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start" rel=''>Tanstack start</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo" rel=''>React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react" rel=''>Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte" rel=''>Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/sveltekit" rel=''>SvelteKit</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact" rel=''>Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue" rel=''>Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid" rel=''>Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular" rel=''>Angular</a></li>
  <li><a href="https://intlayer.org/doc/environment/express" rel=''>Express</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest" rel=''>NestJS</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md" rel=''>What is i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n" rel=''>i18n and SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next" rel=''>Intlayer and i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next" rel=''>Intlayer and react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl" rel=''>Intlayer and next-intl</a></li>
</ul>
</details>

## 🌐 Readme in other languages

<p align="center">
  <a href="https://github.com/aymericzip/intlayer/blob/main/readme.md">English</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md">简体中文</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md">Русский</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md">日本語</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md">Français</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md">한국어</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md">Español</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md">Deutsch</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md">العربية</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md">Italiano</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md">English (UK)</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md">Português</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md">हिन्दी</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md">Türkçe</a>
</p>

## 🤝 Community

Intlayer is built with and for the community and we’d love your input!

- Have a suggestion? [Open an issue](https://github.com/aymericzip/intlayer/issues)
- Found a bug or improvement? [Submit a PR](https://github.com/aymericzip/intlayer/pulls)
- Need help or want to connect? [Join our Discord](https://discord.gg/7uxamYVeCk)

You can also follow us on :

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Contribution

For more detailed guidelines on contributing to this project, please refer to the [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) file. It contains essential information on our development process, commit message conventions, and release procedures. Your contributions are valuable to us, and we appreciate your efforts in making this project better!

### Thank You for the Support

If you like Intlayer, give us a ⭐ on GitHub. It helps others discover the project! [See why GitHub Stars matter](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md#why-github-stars-matter-).

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
