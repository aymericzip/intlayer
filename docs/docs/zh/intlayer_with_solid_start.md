---
createdAt: 2025-08-06
updatedAt: 2026-08-30
title: "Solid Start i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) SolidStart 应用的指南。包含服务端渲染的语言路由、hreflang、sitemap 和 AI 辅助翻译。"
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "初始历史"
author: aymericzip
---

# 使用 Intlayer 翻译你的 SolidStart 网站 | 国际化 (i18n)

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="Vite 和 Solid 的最佳 i18n 解决方案？探索 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 实现应用程序国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>

<Tab label="演示" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Solid Start Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目录

<TOC/>

本指南涵盖了一个**服务端渲染**的 SolidStart 应用程序：语言检测在请求时发生，页面在服务端以正确的语言渲染，并且搜索引擎所需的 `<html lang>`、`hreflang` 和 sitemap 信号都是在服务端生成的。

## 为什么选择 Intlayer 而不是其他替代方案？

与 `@solid-primitives/i18n` 或 `i18next` 等主流解决方案相比，Intlayer 是一个带有集成优化的解决方案，例如：

<AccordionGroup>
<Accordion header="全面支持 Solid">

Intlayer 经过优化，可与 Solid 完美配合，提供**组件级内容划分**、**响应式翻译**以及扩展国际化 (i18n) 所需的所有功能。

</Accordion>

<Accordion header="打包体积">

无需将庞大的 JSON 文件加载到页面中，只需加载必要的内容。Intlayer 有助于**将打包文件和页面体积减少高达 50%**。

</Accordion>

<Accordion header="可维护性">

对应用程序的内容进行局部作用域划分**有助于大型应用程序的维护**。你可以复制或删除单个功能文件夹，而无需心理负担去审查整个内容代码库。此外，Intlayer 是**完全类型化**的，以确保内容的准确性。

</Accordion>

<Accordion header="AI 代理">

将内容协同定位**减少了大语言模型 (LLM) 所需的上下文**。Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发人员体验 (DX) 更加顺畅。

</Accordion>

<Accordion header="自动化">

在 CI/CD 流水线中使用你选择的 LLM 按照 AI 提供商的成本自动进行翻译。Intlayer 还提供了一个**编译器**来自动提取内容，以及一个 [Web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) 来帮助**在后台进行翻译**。

</Accordion>

<Accordion header="性能">

将庞大的 JSON 文件连接到组件可能会导致性能和响应性问题。Intlayer 在构建时优化了内容加载。

</Accordion>

<Accordion header="与非开发人员协同扩展">

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** 和一个 **[完整 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**，帮助你**实时**管理多语言内容，使与翻译人员、文案人员和其他团队成员的协作更加无缝。内容可以存储在本地和/或远程。

</Accordion>
</AccordionGroup>

---

## 在 SolidStart 应用程序中设置 Intlayer 的分步指南

<Steps>

<Step number={1} title="安装依赖项">

使用 npm 安装必要的软件包：

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

> 此命令将检测你的环境并安装所需的软件包。例如：

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) 的国际化工具。

- **solid-intlayer**

  将 Intlayer 与 Solid 应用程序集成的软件包。它为 Solid 国际化提供上下文提供程序 (context providers) 和钩子 (hooks)。

- **vite-intlayer**

  包含用于将 Intlayer 与 [Vite 打包器](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及检测用户偏好语言、管理 cookie 和处理 URL 重定向的语言路由句柄。

> 这里 `vite-intlayer` 是一个服务端关注点，不仅是构建时的关注点：它提供了 SolidStart 的 Nitro 服务器运行的请求句柄。将其保留在 `dependencies` 中是安全的默认设置 —— 仅当你要部署包含 Nitro 内联句柄的构建后的 `.output` 目录时，才可以将其移动到 `devDependencies`。

</Step>

<Step number={2} title="配置你的项目">

创建一个配置文件来配置应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 你的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

使用 `prefix-no-default`，默认语言从无前缀的 URL 提供：

```plaintext
/            /about          → 英语  (默认语言)
/fr          /fr/about       → 法语
/es          /es/about       → 西班牙语
```

> 通过此配置文件，你可以设置本地化 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)。

</Step>

<Step number={3} title="在 Vite 配置中集成 Intlayer">

将 Intlayer 插件添加到你的配置中：

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> `intlayer()` Vite 插件构建你的内容声明文件，在开发模式下监视它们，并在应用程序内部定义 Intlayer 环境变量。它还提供可优化性能的别名。

### 语言路由随插件一起提供

SolidStart 运行在 [Nitro](https://nitro.build) 上，并且 `intlayer()` 将其语言路由句柄直接注册到 Nitro 的服务器管道中（通过 `routing.enableProxy` 选项，默认为 `true`）。无需配置其他内容：在构建好的服务器上，每个请求在到达路由器之前都会经过检查，并且

- 语言从 URL 前缀读取，其次是 `INTLAYER_LOCALE` cookie，然后是 `Accept-Language` 请求头；
- 当解析出的语言不是默认语言时，无前缀的 URL 会重定向到对应的本地化页面（`/` → `/fr`）；
- 冗余前缀的 URL 会重定向回其规范形式（`/en/about` → `/about`）；
- 语言 cookie 会在响应中写回。

</Step>

<Step number={4} title="声明你的内容">

创建并管理你的内容声明以存储翻译：

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **SolidStart 特别注意点**：`src/routes` 下的每个 `.ts` / `.tsx` 文件都会成为一个路由，而 `.content.ts` 文件具有默认导出，因此它会被误识别为一个页面。请将**页面**的内容声明保留在 routes 目录之外（`src/contents/` 效果很好）。**组件**的内容可以保持协同定位，因为文件系统路由器不会扫描 `src/components`。

> 只要你的内容声明包含在 `contentDir` 目录（默认为 `./src`）中，并匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`），就可以在应用程序的任何位置定义它们。
>
> 有关更多详细信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)。

</Step>

<Step number={5} title="添加本地化路由">

本步骤的目标是赋予每种语言自己的 URL，这也是搜索引擎进行索引的内容。

将你的页面移动到**可选动态段**下。在 SolidStart 的文件系统路由器中，`[[locale]]` 编译为 `:locale?` 路径模式：

```plaintext
src/routes/
  [[locale]].tsx          ← 验证动态段的 layout
  [[locale]]/
    index.tsx             → /        以及 /fr        以及 /es
    about.tsx             → /about   以及 /fr/about  以及 /es/about
  [...404].tsx            → 捕获其他任何内容的 catch-all
```

布局文件的唯一工作是将该动态段约束为已配置的语言：

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` 将 `:locale?` 扩展为两种模式 —— 一种带有段，一种不带段 —— 并按特异性递减进行匹配。`matchFilters` 是区分正常设置与令人困惑的设置的关键所在：

| URL         | 没有 `matchFilters`                     | 带有 `matchFilters`           |
| ----------- | --------------------------------------- | ----------------------------- |
| `/fr/about` | 法语关于页面                            | 法语关于页面                  |
| `/about`    | 关于页面 (静态段胜出)                   | 关于页面                      |
| `/unknown`  | **主页**，静默处理，且 `locale=unknown` | 不匹配 → 回退到 catch-all 404 |

> 如果你使用 `'prefix-all'` 路由模式，请首选 `[locale]`（必需），如果是 `'no-prefix'` 或 `'search-params'`，则完全放弃该段。

</Step>

<Step number={6} title="为你的应用程序提供语言 locale">

URL 是语言 locale 的唯一真理来源：中间件已经将请求重定向到其本地化路径，因此在根布局中读取路径可使服务端渲染与客户端水化（hydration）保持一致，并使每次客户端导航都自动更新语言 locale。

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // 服务端在 entry-server.tsx 中渲染 <html>；
  // 语言之间的客户端导航必须自行更新这些属性。
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` 会对其 `locale` prop 作出响应，因此在 JSX 中传递访问器调用 `locale()` 就足够了 —— Solid 会将其编译为一个 getter，当 URL 改变时整个树都会以新语言重新渲染。

</Step>

<Step number={7} title="在服务端设置 HTML 的 lang 和 dir 属性">

`<html>` 元素由 `entry-server.tsx` 在 `Router` 之外渲染。改为从请求 URL 读取语言 locale：

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

网络爬虫现在可以在首个字节接收到正确的语言：

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="在页面中使用 Intlayer">

在整个应用程序中访问你的内容字典：

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> 在 Solid 中，`useIntlayer` 返回响应式内容（例如 `content`）。你可以直接访问其属性。

> 如果你想在 `string` 属性中使用内容，例如 `alt`、`title`、`href`、`aria-label` 等，可以使用该函数的值，如下所示：
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)。

内容节点不仅限于纯文本翻译。例如复数形式的计数器：

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` 通过针对当前语言的 `Intl.PluralRules` 选择类别，因此拥有两种以上复数形式的语言无需任何额外代码即可工作。

</Step>

<Step number={9} title="创建本地化链接组件">

创建自定义 `Link` 组件，它会自动向内部 URL 添加当前语言的前缀：

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

现在只需编写一次 `href="/about"`，即可根据活动语言生成 `/about`、`/fr/about` 或 `/es/about` —— 页面中的任何位置都无需手动添加前缀。

</Step>

<Step number={10} title="创建语言切换器组件">

将切换器渲染为**真实的 `<a>` 锚点**而非 `<select>`：当前页面的每种语言都会变为可爬取的链接，并且可以在新标签页中打开，这是仅依靠 JavaScript 的控件无法提供的。

`getPathWithoutLocale` 会从当前路径中剥离语言段，而 `getLocalizedUrl` 会为目标语言重新构建它，因此这些链接会遵循你的路由模式，无需硬编码任何内容。导航是改变渲染语言的原因 —— `[[locale]]` 路由从 URL 中推导语言 —— 而 `setLocale` 会将选择保存在 `INTLAYER_LOCALE` cookie 中，以便以后访问无语言前缀的 URL 时能解析为相同的语言。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // 当前显示页面的规范（无语言段）路径
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // 仅精确定位，使默认语言链接不会在每个页面上都被标记为 active
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // 确保浏览器的“后退”按钮返回到上一页
              replace
            >
              {/* 各自语言下的语言名称 - 例如 Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> 在 Solid 中，来自 `useLocale` 的 `locale` 是一个 **signal 访问器**。使用带有括号的 `locale()` 响应式地读取其当前值。
>
> `getLocaleName(localeItem)` 会以各自的语言渲染每种语言名称 —— `English / Français / Español`。传递第二个参数可以将其翻译为当前显示语言：例如 `getLocaleName(localeItem, locale())` 在英语中为 `English / French / Spanish`，在法语中为 `anglais / français / espagnol`。
>
> `<A>` 已经在匹配当前 URL 的链接上设置了 `aria-current="page"`，因此无需额外添加处理。`replace` 由路由器从渲染的属性中读取：它会替换历史记录条目而不是推入新条目，因此浏览器的“后退”按钮会返回切换前访问的页面，而不是返回前一种语言的同一页面。
>
> 每个链接上的 `dir` 和 `hreflang` 属性可使从右到左的语言名称保持正确的方向，并告知辅助技术和网络爬虫每个链接指向哪种语言。
>
> 要了解有关 `useLocale` 钩子的更多信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)。

</Step>

<Step number={11} title="生成规范 canonical 和 hreflang 链接" isOptional={true}>

`hreflang` 注释告知搜索引擎 `/about`、`/fr/about` 和 `/es/about` 是不同语言下的同一个页面。`getMultilingualUrls` 根据你的路由模式从规范（无语言段）路径中导出它们，因此无需硬编码任何内容：

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** 正在渲染的页面的绝对 URL。 */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

在可获取请求 URL 的文档 head 中渲染它：

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … 在 <head> 内部，在其他 meta 标签旁边：
<AlternateLinks url={url} />;
```

随后 `GET /fr/about` 将响应：

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **关于 `@solidjs/meta` 的注意事项**：在撰写本文时，`@solidjs/meta` 中的 `<Title>` 和 `<Meta>` 在客户端水化后应用，但**不会**发散到 SolidStart v2 的服务端渲染 `<head>` 中。在 upstream 修复此问题之前，请直接在 `entry-server.tsx` 中渲染爬虫无需 JavaScript 即可看到的标签 —— `canonical`、`hreflang` 以及需要的 `title` / `description`，如上所示。

</Step>

<Step number={12} title="处理未找到 (404) 页面" isOptional={true}>

处于 `src/routes` 根目录的通配符路由（splat route）可以捕获语言段未匹配到的所有路径 —— 包括被 `matchFilters` 拒绝的无效语言前缀。由于语言仍通过根布局来自 URL，因此 404 页面将以访问者的语言显示：

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| 请求              | 预期响应                            |
| ----------------- | ----------------------------------- |
| `/xx`             | `404` — `xx` 不是已配置的语言       |
| `/nonexistent`    | 默认语言下的 `404`                  |
| `/fr/nonexistent` | 法语下的 `404` (`Page introuvable`) |

</Step>

<Step number={13} title="生成多语言 sitemap 站点地图" isOptional={true}>

Intlayer 的 sitemap 生成器将每个路径扩展为每个语言对应一个条目，并在它们之间连接 `xhtml:link` 备用链接，因此路由只需列出规范的、无语言前缀的路径。

> 与仅生成平铺 URL 的基础生成器不同，Intlayer 在每个页面的每个本地化变体之间建立双向链接，这有助于搜索引擎关联本地化 URL 并将正确的页面提供给正确的受众。

SolidStart 将导出 HTTP 方法的文件转换为 API 路由，并从路径中剥离 `.ts` 扩展名 —— 因此 `src/routes/sitemap.xml.ts` 在 `/sitemap.xml` 处提供服务：

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> API 路由不支持可选参数，因此请将此文件保留在 `src/routes` 的根目录下，置于 `[[locale]]` 段之外。sitemap 已经包含了每种语言。

你可以使用 `getMultilingualUrls` 以相同方式构建 `robots.txt`，以便 `Disallow` 条目涵盖敏感路径的每个本地化拼写：

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="在服务端函数中检索语言 locale" isOptional={true}>

你可能希望在服务端函数或 API 路由内部访问当前语言 locale。

在像这样基于前缀的设置中，**URL 具有权威性**：`getLocaleFromPath` 从请求 URL 中读取前缀。`getLocale` 是不带语言前缀的请求的回退机制 —— 它会检查 `INTLAYER_LOCALE` cookie，然后检查 `x-intlayer-locale` 请求头，接着协商 `Accept-Language`。

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // 从请求中获取 cookie (默认为 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // 从请求中获取 header (默认为 'x-intlayer-locale')，
      // 回退到 Accept-Language 协商
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // 使用 getIntlayer() 在组件外部检索部分内容
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> 此处不要仅依赖 `getLocale`：仅当访问者主动切换语言时才会写入语言 cookie，因此首次访问 `/fr/...` 将会被解析为默认语言。

</Step>

<Step number={15} title="提取组件的内容" isOptional={true}>

如果你有一个现有的代码库，转换数千个文件可能会非常耗时。

为了简化此过程，Intlayer 提议使用 [编译器 (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [提取器 (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) 来转换组件并提取内容。

要进行设置，你可以在 `intlayer.config.ts` 文件中添加一个 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置
  compiler: {
    /**
     * 指示是否启用编译器。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示在转换组件后是否应保存组件。
     *
     * - 如果为 `true`，编译器将在磁盘中重写组件文件。因此转换将是永久性的，编译器在下一次进程中将跳过该转换。通过这种方式，编译器可以转换应用，然后将其移除。
     *
     * - 如果为 `false`，编译器将仅在构建输出的代码中注入 `useIntlayer()` 函数调用，并保持基础代码库完好。转换将仅在内存中完成。
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

> 之后，将生成的页面内容文件移出 `src/routes`，原因如步骤 5 所述。

 </Tab>
 <Tab value='Babel 编译器'>

> 从 v9 开始，`intlayerCompiler` 已包含在 `intlayer` 插件中。因此你无需手动添加它。

更新你的 `vite.config.ts` 以包含 `intlayerCompiler` 插件：

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
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
bun run build # 或 bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="配置 TypeScript">

Intlayer 使用模块增强 (module augmentation) 来获得 TypeScript 的优势并增强你的代码库。

确保你的 TypeScript 配置包含自动生成的类型：

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... 你现有的配置
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

字典键和内容路径现在会在编译时进行检查：

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## 验证你的设置

构建并启动服务器，然后检查这些请求是否按预期运行：

```bash
npm run build
node .output/server/index.mjs
```

| 请求                                     | 预期响应                         |
| ---------------------------------------- | -------------------------------- |
| `GET /`                                  | `200` — 英语                     |
| `GET /` 带有 `Accept-Language: fr`       | `302` → `/fr`                    |
| `GET /` 带有 cookie `INTLAYER_LOCALE=es` | `302` → `/es`                    |
| `GET /fr`                                | `200` — 法语, `<html lang="fr">` |
| `GET /fr/about`                          | `200` — 法语关于页面             |
| `GET /en/about`                          | `302` → `/about` (规范重定向)    |
| `GET /xx`                                | `404`                            |
| `GET /fr/nonexistent`                    | `404` 法语                       |
| `GET /sitemap.xml`                       | `200` — 多语言 XML sitemap       |

在 `vite dev` 下渲染页面的行行为相同。除非你自己将句柄注册为中间件，否则三个重定向行仅适用于构建后的服务器 —— 参见步骤 3。

> 请在 Node (`vite dev`) 上运行开发服务器，而不是在 Bun (`bun --bun vite dev`) 上：SolidStart 的 SSR 目前在 Bun 运行时下会失败并显示 `Expected a Response object, but received 'NodeResponse'`。这与 Intlayer 无关 —— 它在纯模板上也会复现 —— 并且只影响开发服务器，不影响 `vite build`。

---

## Git 配置

建议忽略由 Intlayer 生成的文件。这可以让你避免将它们提交到 Git 仓库。

为此，你可以将以下指令添加到你的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

---

## VS Code 插件

为了提升你使用 Intlayer 的开发体验，你可以安装官方的 **Intlayer VS Code 插件**。

[从 VS Code 插件市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此插件提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**行内预览**。
- 轻松创建和更新翻译的**快速操作**。

---

## 深入了解

要进一步了解，你可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外包你的内容。

---

## 文档参考

- [Intlayer 文档](https://intlayer.org)
- [SolidStart 文档](https://start.solidjs.com)
- [useIntlayer 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useIntlayer.md)
- [useLocale 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useLocale.md)
- [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)
- [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

## 常见问题

<FAQ>

<Question title="国际化 Solid Start 应用有哪些不同的解决方案？">

- **`@solid-primitives/i18n`**：社区的原语方案，需要开发者自行组装、加载和进行类型标注的扁平字典。
- **带有 Solid 包装层的 `i18next`**：成熟的目录生态，但在 Solid Start 中没有针对支持语言环境的路由或服务端渲染提供开箱即用的支持。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），并在构建时进行编译，提供本地化路由、服务端语言环境解析、canonical 与 hreflang 链接、多语言站点地图、AI 辅助翻译、可视化编辑器和 CMS。

在 Solid Start 上，差异主要体现在服务端能力上，本指南将其作为专门的步骤进行了讲解，而无需开发者从零摸索。请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md) 和 [Solid i18n 性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/solid.md)。

</Question>

<Question title="i18n 会给我的 Solid Start bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。服务端渲染的标记在服务端直接解析内容，构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃，并且 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/solid.md)。

</Question>

<Question title="我可以从 @solid-primitives/i18n 或 i18next 迁移而无需重写组件吗？">

基本可以。请按照 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 迁移内容。您也可以逐步迁移：[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将现有的 JSON 目录作为单一真实来源（source of truth），并生成 Intlayer 字典，使两个层在逐个组件迁移时保持同步。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的组件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。本指南的第 15 步详细介绍了此过程。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可在构建时执行相同操作：它在每次更改时扫描您的 JSX、TSX、Vue 和 Svelte 源代码，生成字典并通过热模块替换 (HMR) 保持同步，因此完全无需手动维护键名。

开启编译器前有两个限制值得了解：它通过静态分析工作，因此仅在运行时存在的字符串（如 API 错误代码或 CMS 字段）无法被捕获；此外它需要区分用户文本和应用程序逻辑（如 `className="active"` 或状态代码），在大型代码库中需要少量注解。而 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 则通过让您参与审查避免了这两个问题。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="Intlayer 是否支持 Solid Start 服务端渲染 (SSR)？">

是的。第 6 步在服务端为应用提供语言环境，第 7 步在服务端设置 `lang` 和 `dir` 属性，因此首次 HTML 响应就已经包含正确的语言，这正是爬虫与社交预览机器人读取的内容。

</Question>

<Question title="更改语言环境是否会重新渲染整个应用？">

不会。内容由 Solid signals 驱动，因此切换语言仅会更新读取已更改值的 DOM 节点，而无需重新运行外层的组件代码。

</Question>

<Question title="如何添加规范链接 (canonical) 和 hreflang 链接？">

第 11 步对此进行了介绍。`getMultilingualUrls` 会为每个声明的语言环境构建备用链接（包括 `x-default`），第 13 步将相同的数据提供给多语言站点地图，使页面的每个语言版本都能相互链接。

</Question>

<Question title="如何在本地化路由上处理 404 页面？">

第 12 步对此进行了介绍。`validatePrefix` 可以指示 URL 中的语言环境段是否为已声明的语言环境，从而让 `/xx/about` 返回真正的 404，而不是被当作路径处理并被搜索引擎索引为重复页面。

</Question>

<Question title="我必须在 URL 中包含语言环境吗？">

不需要。`routing.mode` 支持 `"prefix-no-default"`（默认）、`"prefix-all"`、`"no-prefix"` 和 `"search-params"`，而 `routing.domains` 可将每个语言环境映射到独立域名。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="如何在服务端函数 (server function) 中获取语言环境？">

第 14 步对此进行了介绍。为请求解析出的语言环境可在服务端函数内部直接获取，因此在服务端获取的数据可以直接在同一步骤中进行本地化，无需在客户端二次翻译。

</Question>

<Question title="如何使用 AI 自动翻译应用？">

运行 `npx intlayer fill`。它会使用您选择的 LLM、您自己的提供商和 API 密钥填充缺失的翻译，并且 `--git-diff` 参数可将处理范围限制在当前分支修改的内容。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 是否支持复数、性别和富文本？">

支持：包括 [复数形式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)、[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件渲染、插值用的 [插入内容 (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)、用于长文本的 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)，以及用于数字、日期和货币的 [格式化工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)。

</Question>

<Question title="翻译人员如何无需接触代码即可编辑内容？">

可以通过自托管的 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)（任何人都可以直接在运行中的应用上就地修改文案），或通过 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 进行无需重新部署的内容外部化更新。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的，基于 Apache 2.0 许可证开源，包含商业用途。托管版 CMS 是可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
