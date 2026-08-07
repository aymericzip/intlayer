---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Vite + React i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Vite + React 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - React
  - 编译器
  - AI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "首次发布"
author: aymericzip
---

# 如何将现有的 Vite 和 React 应用程序转换为多语言 (i18n) 应用（2026年 i18n 指南）

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="Vite 和 React 的最佳 i18n 解决方案？探索 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

查看 GitHub 上的 [应用程序模板](https://github.com/aymericzip/intlayer-vite-react-template)。

## 目录

<TOC/>

## 为什么国际化现有应用程序很困难？

如果您曾经尝试为仅针对一种语言构建的应用添加多种语言，您就会明白那种痛苦。这不仅仅是“困难”，而是繁琐。您必须梳理每一个文件，搜寻每一个文本字符串，并将它们移动到单独的字典文件中。

然后是风险部分：用代码钩子替换所有这些文本，而不破坏您的布局或逻辑。这种工作会使新功能的开发停滞数周，感觉像是无休止的重构。

## 什么是 Intlayer 编译器？

**Intlayer 编译器** 旨在跳过那些手动的琐事。编译器为您完成字符串提取，而不是由您手动提取。它扫描您的代码，找到文本，并使用 AI 在幕后生成字典。
然后，它在构建期间修改您的代码以注入必要的 i18n 钩子。基本上，您继续像编写单语言应用一样编写应用，编译器会自动处理多语言转换。

> 编译器文档：[https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)

### 局限性

由于编译器在 **编译时** 执行代码分析 and 转换（插入钩子并生成字典），它可能会 **减慢应用程序的构建过程**。

为了减轻开发期间的影响，您可以将编译器配置为以 [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 模式运行，或在不需要时将其禁用。

---

## 在 Vite 和 React 应用中设置 Intlayer 的分步指南

<Steps>

<Step number={1} title="安装依赖">

使用 npm 安装必要的包：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 标志是可选的。如果你是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测你的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  核心包，提供国际化工具用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

- **react-intlayer**
  将 Intlayer 与 React 应用集成的包。它为 React 国际化提供上下文提供程序和 hooks。

- **vite-intlayer**
  包含用于将 Intlayer 与 [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户首选语言环境、管理 cookie 和处理 URL 重定向的中间件。

</Step>

<Step number={2} title="配置你的项目">

创建配置文件以配置应用程序的语言：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * 指示编译器是否应启用。
     */
    enabled: true,

    /**
     * 优化字典的输出目录。
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * 仅在生成的文件中插入内容，不包含键。
     */
    noMetadata: false,

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "", // 移除基础前缀

    /**
     * 指示转换后的组件是否应保存。
     *
     * - 如果为 `true`，编译器将在磁盘上重写组件文件。因此转换将是永久的，编译器将在下一个过程中跳过转换。这样，编译器可以转换应用，然后可以将其移除。
     *
     * - 如果为 `false`，编译器将仅在构建输出中注入 `useIntlayer()` 函数调用，保持基础代码库完整。转换仅在内存中进行。
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This app is an map app", // 注意：你可以自定义此应用描述
  },
};

export default config;
```

> **注意**：确保你的 `OPEN_AI_API_KEY` 已在环境变量中设置。

> 通过此配置文件，你可以设置本地化 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用 Intlayer 控制台日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在你的 Vite 配置中集成 Intlayer">

将 intlayer 插件添加到你的配置中。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保构建内容声明文件并在开发模式下监视它们。它在 Vite 应用中定义 Intlayer 环境变量。此外，它提供别名以优化性能。

> `intlayerCompiler()` Vite 插件用于从组件提取内容并写入 `.content` 文件。

> 从 Intlayer v9 开始，编译器直接捆绑到 `intlayer()` 插件中，一旦设置了 `compiler.enabled` 和 `compiler.output` 路径，就会自动激活。如下所示单独注册 `intlayerCompiler()` 现在是可选的——如果也添加了它，它会自动去重。请参阅 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

</Step>

<Step number={4} title="编译你的代码">

仅需使用默认语言中的硬编码字符串编写组件。编译器会处理其余部分。

你的页面可能看起来的示例：

<Tabs>
 <Tab value="Code">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Output">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      fr: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "compte est",
        editMessage: "Modifier",
        hmrMessage: "et enregistrer pour tester HMR",
        readTheDocs: "Cliquez sur les logos Vite et React pour en savoir plus",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** 用于向嵌套组件提供语言环境。

</Step>

<Step number={6} title="更改内容的语言" isOptional={true}>

要更改内容的语言，你可以使用 `useLocale` hook 提供的 `setLocale` 函数。此函数允许你设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> 要了解更多关于 `useLocale` hook 的信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

</Step>

<Step number={7} title="填充缺失的翻译" isOptional={true}>

Intlayer 提供了一个 CLI 工具来帮助你填充缺失的翻译。你可以使用 `intlayer` 命令来测试和填充代码中缺失的翻译。

```bash packageManager="npm"
npx intlayer test         # 测试是否有缺失的翻译
```

```bash packageManager="yarn"
yarn intlayer test         # 测试是否有缺失的翻译
```

```bash packageManager="pnpm"
pnpm intlayer test         # 测试是否有缺失的翻译
```

```bash packageManager="bun"
bun x intlayer test         # 测试是否有缺失的翻译
```

```bash packageManager="npm"
npx intlayer fill         # 填充缺失的翻译
```

```bash packageManager="yarn"
yarn intlayer fill         # 填充缺失的翻译
```

```bash packageManager="pnpm"
pnpm intlayer fill         # 填充缺失的翻译
```

```bash packageManager="bun"
bun x intlayer fill         # 填充缺失的翻译
```

> 有关更多详细信息，请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/ci.md)
> </Step>

</Steps>

### （可选）站点地图与 robots.txt（构建时生成）

Intlayer 提供 `generateSitemap` 与 `getMultilingualUrls`，可将面向爬虫的多语言 `sitemap.xml` 和 `robots.txt` 格式化并自动写入 `public/`。实践中在 Vite **之前**运行小型 Node 脚本（例如 npm 的 `predev` / `prebuild`）即可在构建或开发时生成这些文件。

#### 站点地图

Intlayer 的站点地图生成会尊重你的语言配置，并包含爬虫所需的元数据。

> 生成的站点地图支持 `xhtml:link`（hreflang）。与只列出扁平 URL 不同，Intlayer 会在各语言版本之间建立双向关联（例如 `/about`、`/fr/about` 或 `/about?lang=fr`，取决于路由模式）。

#### Robots.txt

使用 `getMultilingualUrls`，使 `Disallow` 覆盖敏感路径的每一种本地化写法。

#### 1. 在项目根目录添加 `generate-seo.mjs`

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

需已安装 `intlayer` 以便脚本导入。生产环境请设置环境变量 `SITE_URL`（例如在 CI 中）。

> 建议在 Node 中使用 `generate-seo.mjs`（ESM）。若使用 `generate-seo.js`，请在 `package.json` 中设置 `"type": "module"` 或以其他方式启用 ESM。

#### 2. 在运行 Vite 之前执行脚本

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

若使用 pnpm 或 yarn，请相应调整命令；也可在 CI 或其他步骤中调用该脚本。

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的 **自动补全**。
- 缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

### 深入了解

要进一步深入，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外置您的内容。
