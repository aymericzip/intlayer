<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer 标志" />
  </a>
</p>

<h1 align="center">
  <strong>每个组件的国际化 (i18n)</strong>
</h1>
<h2 align="center">
  <strong>AI 驱动的翻译。可视化编辑器。多语言 CMS。</strong>
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
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm 版本" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub 星标" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="月下载量" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="许可证"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="最新提交"/>
  </a>
</p>

![观看视频](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/开始使用-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## 什么是 Intlayer？

大多数国际化 (i18n) 库要么过于复杂，要么过于死板，或者不是为现代框架构建的。

Intlayer 是面向 Web 和移动应用程序的**现代国际化解决方案**。  
它与框架无关，由 **AI 驱动**，并包含免费的 **CMS 和可视化编辑器**。

通过**按语言区分的内容文件**、**TypeScript 自动补全**、**可摇树的词典**以及 **CI/CD 集成**，Intlayer 让国际化变得更**快速、简洁和智能**。

## Intlayer 的主要优势：

| 功能                                                                                                                                                | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **多框架支持**<br><br>Intlayer 兼容所有主流框架和库，包括 Next.js、React、Vite、Vue.js、Nuxt、Preact、Express 等。                                                                                                                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Feature" width="700">       | **基于 JavaScript 的内容管理**<br><br>利用 JavaScript 的灵活性高效地定义和管理您的内容。<br><br> - [内容声明](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **按语言区分的内容声明文件**<br><br>通过在自动生成之前声明一次内容，加快您的开发速度。<br><br> - [按语言区分的内容声明文件](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">                            | **编译器**<br><br>Intlayer 编译器自动从组件中提取内容并创建词典文件。<br><br> - [编译器](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **类型安全环境**<br><br>利用 TypeScript 确保您的内容定义和代码无错误，同时享受 IDE 自动补全的便利。<br><br> - [TypeScript 配置](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **简化设置**<br><br>通过最少的配置快速启动。轻松调整国际化、路由、AI、构建和内容管理的设置。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **简化内容获取**<br><br>无需为每一条内容调用 `t` 函数。使用单一钩子即可直接获取所有内容。<br><br> - [React 集成](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **一致的服务器组件实现**<br><br>完美适用于 Next.js 服务器组件，客户端和服务器组件使用相同的实现，无需在每个服务器组件之间传递您的 `t` 函数。<br><br> - [服务器组件](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **有序的代码库**<br><br>保持代码库更有条理：1 个组件 = 同一文件夹中的 1 个词典。翻译内容靠近各自的组件，提高可维护性和清晰度。<br><br> - [Intlayer 如何工作](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **增强的路由功能**<br><br>全面支持应用路由，能够无缝适应复杂的应用结构，适用于 Next.js、React、Vite、Vue.js 等框架。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Markdown 支持**<br><br>导入并解析本地文件和远程 Markdown，用于多语言内容，如隐私政策、文档等。解析并使 Markdown 元数据在代码中可访问。<br><br> - [内容文件](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **免费可视化编辑器和 CMS**<br><br>为内容创作者提供免费的可视化编辑器和 CMS，免去了使用本地化平台的需求。通过 Git 保持内容同步，或使用 CMS 完全或部分外部化内容。<br><br> - [Intlayer 编辑器](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **可摇树内容**<br><br>可摇树内容，减少最终包的大小。按组件加载内容，排除包中未使用的内容。支持延迟加载以提高应用程序加载效率。<br><br> - [应用构建优化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **静态渲染**<br><br>不阻塞静态渲染。<br><br> - [Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **AI 驱动的翻译**<br><br>使用 Intlayer 先进的 AI 驱动翻译工具，结合您自己的 AI 提供商 / API 密钥，只需一键即可将您的网站转换为 231 种语言。<br><br> - [CI/CD 集成](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自动填充](https://intlayer.org/doc/concept/auto-fill)                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **MCP 服务器集成**<br><br>提供一个 MCP (模型上下文协议) 服务器，用于 IDE 自动化，使内容管理和 i18n 工作流程能够直接在您的开发环境中无缝进行。<br><br> - [MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **VSCode 扩展**<br><br>Intlayer 提供了一个 VSCode 扩展，帮助您管理内容和翻译、构建词典、翻译内容等。<br><br> - [VSCode 扩展](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **互操作性**<br><br>允许与 react-i18next、next-i18next、next-intl、react-intl、vue-i18n 进行互操作。<br><br> - [Intlayer 与 react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer 与 next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer 与 next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer 与 vue-i18n](https://intlayer.org/blog/intlayer-with-vue-i18n) |

---

## 📦 安装

今天就开始使用 Intlayer，体验更顺畅、更强大的国际化方式。

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/开始使用-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ 快速入门 (Next.js)

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

<a href="https://intlayer.org/doc/environment/nextjs"> 获取完整指南 → </a>

## 🎥 YouTube 直播教程

[![如何使用 Intlayer 实现应用国际化](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/开始使用-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## 目录

探索我们全面的文档，开始使用 Intlayer 并学习如何将其集成到您的项目中。

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 开始使用</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why" rel=''>为什么选择 Intlayer？</a></li>
  <li><a href="https://intlayer.org/doc" rel=''>介绍</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ 概念</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer" rel=''>Intlayer 如何工作</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration" rel=''>配置</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli" rel=''>Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/compiler" rel=''>编译器</a></li>

  <li><a href="https://intlayer.org/doc/concept/editor" rel=''>Intlayer 编辑器</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms" rel=''>Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content" rel=''>词典</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file" rel=''>按语言区分的内容声明文件</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation" rel=''>翻译</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration" rel=''>枚举</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition" rel=''>条件</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting" rel=''>嵌套</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown" rel=''>Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching" rel=''>函数获取</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion" rel=''>插入</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file" rel=''>文件</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 环境</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs" rel=''>Intlayer 与 Next.js 16</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/15" rel=''>Next.js 15</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14" rel=''>Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router" rel=''>Next.js Page Router</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/compiler" rel=''>Next.js 与编译器</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app" rel=''>React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React 与编译器</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/compiler" rel=''>React-router-v7</a></li>
  <li><a href="https://intlayer.org/doc/environment/tanstack-start" rel=''>Tanstack start</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/tanstack-start/solid" rel=''>Solid</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/astro" rel=''>Astro</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/astro/react" rel=''>React</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/vue" rel=''>Vue</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/svelte" rel=''>Svelte</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/solid" rel=''>Solid</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/vanilla" rel=''>Vanilla JS</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/lit" rel=''>Lit</a></li>
    </ul>
  </li>

  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo" rel=''>React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte" rel=''>Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/sveltekit" rel=''>SvelteKit</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact" rel=''>Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue" rel=''>Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid" rel=''>Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular" rel=''>Angular</a></li>
  <li>
     <a href="https://intlayer.org/doc/environment/express" rel=''>后端</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/express" rel=''>Express</a></li>
      <li><a href="https://intlayer.org/doc/environment/nest" rel=''>NestJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/fastify" rel=''>Fastify</a></li>
      <li><a href="https://intlayer.org/doc/environment/adonisjs" rel=''>AdonisJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/hono" rel=''>Hono</a></li>
    </ul>
  </li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 博客</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/what_is_internationalization.md" rel=''>什么是 i18n？</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n" rel=''>i18n 与 SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next" rel=''>Intlayer 与 i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next" rel=''>Intlayer 与 react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl" rel=''>Intlayer 与 next-intl</a></li>
</ul>
</details>

## 🌐 其他语言的 Readme

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

## 🤝 社区

Intlayer 是由社区为社区构建的，我们非常期待您的反馈！

- 有建议？[提交一个 issue](https://github.com/aymericzip/intlayer/issues)
- 发现了错误或改进点？[提交一个 PR](https://github.com/aymericzip/intlayer/pulls)
- 需要帮助或想要建立联系？[加入我们的 Discord](https://discord.gg/7uxamYVeCk)

您也可以在以下平台关注我们：

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

### 参与贡献

有关参与本项目贡献的更详细指南，请参阅 [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) 文件。其中包含了有关我们的开发流程、提交消息规范以及发布程序的关键信息。您的参与对我们非常重要，我们感谢您为改进本项目所做的努力！

通过 [GitHub](https://github.com/aymericzip/intlayer)、[GitLab](https://gitlab.com/ay.pineau/intlayer) 或 [Bitbucket](https://bitbucket.org/intlayer/intlayer/) 参与贡献。

### 感谢您的支持

如果您喜欢 Intlayer，请在 GitHub 上给我们一个 ⭐。这有助于其他人发现这个项目！ [了解为什么 GitHub 星标很重要](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md#why-github-stars-matter-)。

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
