---
createdAt: 2024-03-07
updatedAt: 2026-05-31
title: "Astro i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Astro 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 6.2.0
    date: 2025-10-03
    changes: "更新 Astro 注入、配置和用法"
---

# 使用 Intlayer 翻译您的 Astro 网站 | 国际化 (i18n)

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“astro-i18n”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完整的 Astro 报道**

Intlayer 经过优化，可与 Astro 完美配合，提供**多语言路由**、**站点地图**以及扩展国际化 (i18n) 所需的所有功能。

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent技能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

**自动化**

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

**表现**

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

**无需开发即可扩展**

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

---

## 在 Astro 中配置 Intlayer 的分步指南

在 GitHub 上查看[应用程序模板](https://github.com/aymericzip/intlayer-astro-template)。

### 第一步：安装依赖

使用您喜欢的包管理器安装所需的软件包：

```bash packageManager="npm"
npm install intlayer astro-intlayer
# 可选：如果添加 React 岛支持
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# 可选：如果添加 React 岛支持
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# 可选：如果添加 React 岛支持
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  核心软件包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、编译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **astro-intlayer**
  包含将 Intlayer 与 [Vite 构建器](https://vite.dev/guide/why.html#why-bundle-for-production)集成的 Astro 集成插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第二步：配置您的项目

创建一个配置文件来定义您的应用程序语言：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 通过此配置文件，您可以配置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、在控制台中禁用 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第三步：在 Astro 配置中集成 Intlayer

将 intlayer 插件添加到您的 Astro 配置中。

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> `intlayer()` 集成插件用于将 Intlayer 与 Astro 集成。它确保内容声明文件的构建并在开发模式下进行监视。它在 Astro 应用程序中定义 Intlayer 环境变量，并提供别名以优化性能。

### 第四步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      zh: "你好，世界",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> 只要您的内容声明包含在 `contentDir`（默认为 `./src`）中，且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`），就可以在应用程序的任何位置定义。

> 有关更多信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 第五步：在 Astro 中使用内容

您可以使用 `intlayer` 导出的核心辅助函数直接在 `.astro` 文件中消费词典。

```astro fileName="src/pages/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
  type LocalesValues,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Get the current locale from the URL (e.g. /es/about -> 'es')
const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;

// Get the content for the 'app' dictionary
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Fallback for users in unmatched languages -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

### 第六步：本地化路由

创建动态路由段以提供本地化页面（例如 `src/pages/[locale]/index.astro`）：

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Astro 集成添加了一个 Vite 中间件，有助于在开发期间进行语言感知路由和环境定义。您还可以使用自己的逻辑或 `intlayer` 的 `getLocalizedUrl` 等工具创建语言之间的链接。

### 第七步：继续使用您喜欢的框架

继续使用您喜欢的框架构建您的应用程序。

- Intlayer + React: [Intlayer with React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer with Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer with Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer with Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer with Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+preact.md)

### TypeScript 配置

Intlayer 使用模块扩展来利用 TypeScript，使您的代码库更加健壮。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下说明添加到 `.gitignore` 文件中：

```bash
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了改善使用 Intlayer 的开发体验，您可以安装**官方 Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关使用该扩展的更多信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 第十五步：提取组件中的内容（可选）

如果您有现有的代码库，转换数千个文件可能会非常耗时。

为了简化此过程，Intlayer 提供了 [编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 来转换您的组件并提取内容。

要进行设置，您可以在 `intlayer.config.ts` 文件中添加 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 您的其他配置
  compiler: {
    /**
     * 指示是否应启用编译器。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示在转换后是否应保存组件。这样，编译器只需运行一次即可转换应用程序，然后即可将其删除。
     */
    saveComponents: false,

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='提取命令'>

运行提取器以转换组件并提取内容

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel 编译器'>

更新您的 `vite.config.ts` 以包含 `intlayerCompiler` 插件：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 添加编译器插件
  ],
});
```

 </Tab>
</Tabs>

---

### 深入了解

如果您想了解更多，还可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 将您的内容外部化。
