---
createdAt: 2026-04-24
updatedAt: 2026-05-31
title: "Astro + Preact i18n - 完整翻译指南：Astro + Preact 应用"
description: "告别 i18next。2026 年构建多语言 (i18n) Astro + Preact 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Astro
  - Preact
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - preact
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Astro + Preact 的初始文档"
---

# 使用 Intlayer 翻译您的 Astro + Preact 网站 | 国际化 (i18n)

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

## 在 Astro + Preact 中配置 Intlayer 的分步指南

在 GitHub 上查看[应用程序模板](https://github.com/aymericzip/intlayer-astro-template)。

### 第一步：安装依赖

使用您喜欢的包管理器安装所需的软件包：

```bash packageManager="npm"
npm install intlayer astro-intlayer preact preact-intlayer @astrojs/preact

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

bun x intlayer init
```

- **intlayer**
  核心软件包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、编译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **astro-intlayer**
  包含将 Intlayer 与 [Vite 构建器](https://vite.dev/guide/why.html#why-bundle-for-production)集成的 Astro 集成插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

- **preact**
  核心 Preact 软件包 - React 的快速且轻量级的替代方案。

- **preact-intlayer**
  将 Intlayer 与 Preact 应用程序集成的软件包。它提供了 `IntlayerProvider`，以及用于 Preact 国际化的 `useIntlayer` 和 `useLocale` 钩子。

- **@astrojs/preact**
  官方 Astro 集成，允许使用 Preact 组件岛 (islands)。

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

将 intlayer 插件和 Preact 集成添加到您的 Astro 配置中。

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), preact()],
});
```

> `intlayer()` 集成插件用于将 Intlayer 与 Astro 集成。它确保内容声明文件的构建并在开发模式下进行监视。它在 Astro 应用程序中定义 Intlayer 环境变量，并提供别名以优化性能。

> `preact()` 集成允许通过 `client:only="preact"` 使用 Preact 组件岛。

### 第四步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx"
import { h } from "preact";
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

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

> 只要您的内容声明包含在 `contentDir`（默认为 `./src`）中，且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`），就可以在应用程序的任何位置定义。

> 有关更多信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

> 如果您的内容文件包含 TSX 代码，您可能需要导入 `import { h } from "preact";` 或确保您的 JSX pragma 已正确配置为 Preact。

### 第五步：在 Astro 中使用内容

您可以使用 `intlayer` 导出的核心辅助函数直接在 `.astro` 文件中消费词典。您还应在每个页面添加 SEO 元数据（如 hreflang 和规范链接），并为客户端交互内容引入 Preact 岛。

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import { PreactIsland } from "../../components/preact/PreactIsland";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- 规范链接：通知搜索引擎此页面的主版本 -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang：通知 Google 所有本地化版本 -->
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

    <!-- x-default：语言不匹配用户时的回退选项 -->
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
    <!-- Preact 岛渲染所有交互式内容，包括语言切换器 -->
    <PreactIsland locale={locale} client:only="preact" />
  </body>
</html>
```

> **关于路由设置的说明：**
> 您使用的目录结构取决于 `intlayer.config.ts` 中的 `middleware.routing` 设置：
>
> - **`prefix-no-default`（默认）**：在根目录下保留默认语言（无前缀），并为其他语言添加前缀。使用 `[...locale]` 来捕获所有情况。
> - **`prefix-all`**：所有 URL 都有语言前缀。如果您不需要单独处理根目录，可以使用标准的 `[locale]`。
> - **`search-param` 或 `no-prefix`**：不需要语言文件夹名。语言通过查询参数或 Cookie 处理。

### 第六步：创建 Preact 岛组件

创建一个包装 Preact 应用程序并接收服务端检测到的语言的岛组件：

```tsx fileName="src/components/preact/PreactIsland.tsx"
/** @jsxImportSource preact */
import { IntlayerProvider, useIntlayer } from "preact-intlayer";
import { type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";
import { LocaleSwitcher } from "./LocaleSwitcher";

const App: FunctionalComponent = () => {
  const { title } = useIntlayer("app");

  return (
    <div>
      <h1>{title}</h1>
      <LocaleSwitcher />
    </div>
  );
};

export const PreactIsland: FunctionalComponent<{ locale: LocalesValues }> = ({
  locale,
}) => (
  <IntlayerProvider locale={locale}>
    <App />
  </IntlayerProvider>
);
```

> `locale` 属性从 Astro 页面（服务端检测）传递到 `IntlayerProvider`，使其成为树中所有 Preact 钩子的初始语言。

> 注意：在 Preact 中，HTML 属性使用 `class` 而不是 `className`。

### 第七步：添加语言切换器

创建一个 Preact 组件 `LocaleSwitcher`，该组件读取可用语言，并在用户选择新语言时导航到本地化 URL：

```tsx fileName="src/components/preact/LocaleSwitcher.tsx"
/** @jsxImportSource preact */
import { useLocale } from "preact-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";

export const LocaleSwitcher: FunctionalComponent = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // 更改语言时导航到本地化 URL
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div class="locale-switcher">
      <span class="switcher-label">切换语言：</span>
      <div class="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            class={`locale-btn ${localeItem === locale ? "active" : ""}`}
            disabled={localeItem === locale}
          >
            <span class="ls-own-name">{getLocaleName(localeItem)}</span>
            <span class="ls-current-name">
              {getLocaleName(localeItem, locale)}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> **关于持久性的说明：**
> 使用 `onLocaleChange` 通过 `window.location.href` 重定向，确保访问了新的语言 URL，允许 Intlayer 中间件设置语言 Cookie 并记住用户在未来访问时的首选语言。

> `LocaleSwitcher` 必须在 `IntlayerProvider` 内部渲染--在您的岛组件中使用它（如第六步所示）。

### 第八步：站点地图和 Robots.txt

Intlayer 提供了实用工具来动态创建您的本地化站点地图和 robots.txt 文件。

#### 站点地图

Intlayer 附带一个内置的站点地图生成器，可帮助您轻松为应用程序创建站点地图。它能够处理本地化路由，并为搜索引擎添加必要的元数据。

> Intlayer 生成的站点地图支持 `xhtml:link` 命名空间（Hreflang XML 扩展）。与仅列出原始 URL 的默认站点地图生成器不同，Intlayer 会自动在页面的所有语言版本（例如 `/about`、`/about?lang=fr` 和 `/about?lang=es`）之间创建所需的双向链接。这确保了搜索引擎能够正确索引并向合适的受众提供正确的语言版本。

创建 `src/pages/sitemap.xml.ts` 以生成包含所有本地化路由的站点地图。

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

创建 `src/pages/robots.txt.ts` 以控制搜索引擎抓取。

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### TypeScript 配置

Intlayer 使用模块扩展来利用 TypeScript，使您的代码库更加健壮。确保您的 TypeScript 配置已包含自动生成的类型并针对 Preact 进行了配置：

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    jsx: "react-jsx",
    jsxImportSource: "preact", // 推荐用于 Preact 10+
  },
  include: [
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

> 如果您想在 `字符串` 属性（如 `alt`、`title`、`href`、`aria-label` 等）中使用内容，可以使用函数的值，例如：

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

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
