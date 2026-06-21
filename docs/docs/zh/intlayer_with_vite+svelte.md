---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Vite + Svelte i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Vite + Svelte 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
applicationShowcase: https://intlayer-vite-svelte-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 5.5.11
    date: 2025-11-19
    changes: "更新文档"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史记录"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Vite 和 Svelte 网站 | 国际化 (i18n)

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“svelte-i18n”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完全 Svelte 覆盖**

Intlayer 经过优化，可与 Svelte 完美配合，提供**组件级内容范围**、**反应式翻译**以及​​扩展国际化 (i18n) 所需的所有功能。

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

## 在 Vite 和 Svelte 应用中设置 Intlayer 的分步指南

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 实现应用国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-vite-svelte-template)。

### 第一步：安装依赖

使用 npm 安装必要的包：

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> `--interactive` 标志是可选的。如果您是 AI 代理，请使用 `intlayer-cli init`。

> 该命令将检测您的环境并安装所需的软件包。例如：

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**

  核心包，提供国际化工具，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译以及[CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

- **svelte-intlayer**
  将 Intlayer 与 Svelte 应用程序集成的包。它提供了用于 Svelte 国际化的上下文提供者和钩子。

- **vite-intlayer**
  包含用于将 Intlayer 集成到 [Vite 打包工具](https://vite.dev/guide/why.html#why-bundle-for-production) 的 Vite 插件，以及用于检测用户首选语言环境、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：配置您的项目

创建一个配置文件来配置您的应用程序语言：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名，禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第三步：在您的 Vite 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 集成到 Vite 中。它确保内容声明文件的构建，并在开发模式下监控这些文件。它在 Vite 应用中定义了 Intlayer 的环境变量。此外，它还提供别名以优化性能。

### 第四步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> 您的内容声明可以定义在应用程序中的任何位置，只要它们被包含在 `contentDir` 目录中（默认是 `./src`），并且文件扩展名符合内容声明文件扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 第5步：在代码中使用 Intlayer

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- 以简单内容渲染内容 -->
<h1>{$content.title}</h1>
<!-- 使用编辑器渲染可编辑内容 -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- 以字符串形式渲染内容 -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

> 如果您的应用程序已经存在，您可以结合使用 [Intlayer 编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 和 [提取命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 在一秒钟内转换成干个组件。

<Steps>

<Step number={6} title="更改内容语言">

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from "svelte-intlayer";

// 获取语言信息和 setLocale 函数
const { locale, availableLocales, setLocale } = useLocale();

// 处理语言切换
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>

<Step number={7} title="渲染Markdown">

Intlayer支持在您的Svelte应用中直接渲染Markdown内容。默认情况下，Markdown被视为纯文本。要将Markdown转换为丰富的HTML，您可以集成`@humanspeak/svelte-markdown`或其他markdown解析器。

> 要了解如何使用`intlayer`包声明markdown内容，请参阅[markdown文档](https://github.com/aymericzip/intlayer/tree/main/docs/zh/dictionary/markdown.md)。

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // 将 markdown 内容渲染为字符串
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> 你也可以通过 `content.markdownContent.metadata.xxx` 属性访问你的 markdown front-matter 数据。

</Step>

<Step number={8} title="设置 intlayer 编辑器 / CMS">

要设置 intlayer 编辑器，你必须遵循 [intlayer 编辑器文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

要设置 intlayer CMS，你必须遵循 [intlayer CMS 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。

</Step>

<Step number={7} title="为你的应用程序添加本地化路由">

为了在你的 Svelte 应用程序中处理本地化路由，你可以使用 `svelte-spa-router`，并结合 Intlayer 的 `localeFlatMap` 来为每个语言环境生成路由。

首先，安装 `svelte-spa-router`：

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
```

```bash packageManager="bun"
bun add svelte-spa-router
```

然后，创建一个 `Router.svelte` 文件来定义你的路由：

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

更新你的 `main.ts`，将挂载的组件从 `App` 改为 `Router`：

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

最后，更新你的 `App.svelte` 以接收 `locale` 属性并使用 `useIntlayer`：

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from "svelte-intlayer";
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... 你的应用其余部分 ... -->
</main>
```

#### 配置服务器端路由（可选）

同时，您还可以使用 `intlayerProxy` 为您的应用程序添加服务器端路由。该插件会根据 URL 自动检测当前的语言环境，并设置相应的语言环境 cookie。如果未指定语言环境，插件将根据用户浏览器的语言偏好确定最合适的语言环境。如果未检测到任何语言环境，它将重定向到默认语言环境。

> 注意，要在生产环境中使用 `intlayerProxy`，您需要将 `vite-intlayer` 包从 `devDependencies` 切换到 `dependencies`。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerProxy(), // should be placed first
 svelte(), intlayer()],
});
```

</Step>

<Step number={8} title="当语言环境改变时更改 URL">

为了允许用户切换语言并相应地更新 URL，您可以创建一个 `LocaleSwitcher` 组件。该组件将使用 `intlayer` 中的 `getLocalizedUrl` 和 `svelte-spa-router` 中的 `push`。

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// 获取语言环境信息
const { locale, availableLocales } = useLocale();

// 处理语言环境变化
const changeLocale = (event: Event) => {
  plugins: [intlayerProxy(), // should be placed first
 svelte(), intlayer()],
});
```

</Step>

<Step number={8} title="当语言环境变化时更改 URL">

为了允许用户切换语言并相应地更新 URL，您可以创建一个 `LocaleSwitcher` 组件。该组件将使用来自 `intlayer` 的 `getLocalizedUrl` 和来自 `svelte-spa-router` 的 `push`。

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// 获取语言环境信息
const { locale, availableLocales } = useLocale();

// 处理语言环境变化
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>

<Step number={1} title="提取组件内容" isOptional={true}>

如果您有现有的代码库，转换数千个文件可能会非常耗时。

为了简化此过程，Intlayer 提出了 [编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 来转换您的组件并提取内容。

要进行设置，您可以在 `intlayer.config.ts` 文件中添加 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```bash packageManager="npm"
npm run build # 或 npm run dev
```

```bash packageManager="pnpm"
pnpm run build # 或 pnpm run dev
```

```bash packageManager="yarn"
yarn build # 或 yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到您的 Git 仓库中。

为此，您可以在 `.gitignore` 文件中添加以下指令：

```bash
#  忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的 **自动补全**。
- 缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

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

### 深入了解

要进一步提升，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。
