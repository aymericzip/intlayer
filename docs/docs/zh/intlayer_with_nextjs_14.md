---
createdAt: 2024-12-06
updatedAt: 2026-08-30
title: "Next.js 14 i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Next.js 14 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Next.js 14
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 14
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
applicationShowcase: https://intlayer-next-14-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Next.js 14 和 App Router 网站 | 国际化 (i18n)

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与 `next-intl` 或 `i18next` 等主要解决方案相比，Intlayer 是一个具有集成优化的解决方案，例如：

与“next-intl”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

<AccordionGroup>
<Accordion header="完整的 Next.js 覆盖">

Intlayer 经过优化，可以与 **服务器组件** 配合使用，以实现高效渲染，并且与 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) 完全兼容。它不会阻止静态渲染，并提供中间件以及扩展国际化 (i18n) 所需的所有功能。

> Intlayer 兼容 Next.js 12、13、14、15 和 16。如果您使用 Next.js Pages Router，可以参考此[指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md)。
> 区域设置路由对于 SEO、Bundle 大小和性能很有用。如果不需要，可以参考这个[指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md)。
> 对于带有 App Router 的 Next.js 12、13、14 和 15，请参阅此[指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md)。

</Accordion>

<Accordion header="捆绑尺寸">

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

</Accordion>

<Accordion header="可维护性">

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

</Accordion>

<Accordion header="人工智能代理">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

</Accordion>

<Accordion header="自动化">

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

</Accordion>

<Accordion header="表现">

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

</Accordion>

<Accordion header="无需开发即可扩展">

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

</Accordion>
</AccordionGroup>

---

## 在 Next.js 应用中逐步设置 Intlayer 的指南

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

查看 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-next-14-template)。

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

> `--interactive` 标志是可选的。如果您是 AI 代理，请使用 `intlayer-cli init`。

> 该命令将检测您的环境并安装所需的软件包。例如：

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和[CLI命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **next-intlayer**

集成 Intlayer 与 Next.js 的包。它为 Next.js 国际化提供上下文提供者和钩子。此外，它还包括用于将 Intlayer 集成到 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 的 Next.js 插件，以及用于检测用户首选语言环境、管理 Cookie 和处理 URL 重定向的中间件。

</Step>

<Step number={2} title="配置您的项目">

Here is the final structure that we will make:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── middleware.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

创建一个配置文件来配置您应用的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

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
};

export default config;
```

> 通过此配置文件，你可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名，禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在你的 Next.js 配置中集成 Intlayer">

配置你的 Next.js 设置以使用 Intlayer：

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 集成到 Next.js 中。它确保内容声明文件的构建，并在开发模式下监视这些文件。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它提供别名以优化性能，并确保与服务器组件的兼容性。

> `withIntlayer()` 函数是一个 promise 函数。如果你想与其他插件一起使用它，可以 await 它。示例：
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

</Step>

<Step number={4} title="配置中间件以检测语言环境">

设置中间件以检测用户的首选语言环境：

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerMiddleware` 用于检测用户的首选语言环境，并根据[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)将用户重定向到相应的 URL。此外，它还支持将用户的首选语言环境保存在 cookie 中。

> 自 Intlayer v9 以来，此中间件遵守 `routing.enableProxy` 选项（默认为 `true`）。在配置中设置 `routing.enableProxy: false` 以将其转换为透传，而无需删除此文件。参见 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

> 请根据您的应用路由调整 `matcher` 参数。更多详情请参阅 [Next.js 关于配置 matcher 的文档](https://nextjs.org/docs/app/building-your-application/routing/middleware)。

> 如果你需要将多个中间件链接在一起（例如，`intlayerMiddleware` 与认证或自定义中间件），Intlayer 现在提供了一个称为 `multipleMiddlewares` 的辅助函数。

```ts
import {
  multipleMiddlewares,
  intlayerMiddleware,
} from "next-intlayer/middleware";
import { customMiddleware } from "@utils/customMiddleware";

export const middleware = multipleMiddlewares([
  intlayerMiddleware,
  customMiddleware,
]);
```

</Step>

<Step number={5} title="定义动态语言环境路由">

删除 `RootLayout` 中的所有内容，并替换为以下代码：

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

> 保持 `RootLayout` 组件为空，允许将 [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) 和 [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 属性设置到 `<html>` 标签上。

要实现动态路由，通过在你的 `[locale]` 目录中添加一个新的布局来提供 locale 的路径：

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type Next14LayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <IntlayerProvider locale={locale}>
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  </IntlayerProvider>
);

export default LocaleLayout;
```

> 单个 `IntlayerProvider` 覆盖树的两个部分：它为服务器 hooks 读取的请求范围内的服务器上下文提供种子，并挂载客户端提供者，以便客户端组件接收相同的区域设置。

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type Next14LayoutIntlayer, IntlayerProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>
      <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
    </body>
  </html>
);

export default LocaleLayout;
```

</Tab>
</Tabs>

> `[locale]` 路径段用于定义语言环境。例如：`/en-US/about` 将对应 `en-US`，而 `/fr/about` 对应 `fr`。

> 在此阶段，您可能会遇到错误：`Error: Missing <html> and <body> tags in the root layout.`。这是预期的，因为 `/app/page.tsx` 文件不再使用，可以删除。取而代之的是，`[locale]` 路径段将激活 `/app/[locale]/page.tsx` 页面。因此，页面将通过浏览器中的路径如 `/en`、`/fr`、`/es` 访问。若要将默认语言环境设置为根页面，请参考第4步中的 `middleware` 配置。

接下来，在您的应用布局中实现 `generateStaticParams` 函数。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // 插入的代码行

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... 其余代码*/
};

export default LocaleLayout;
```

> `generateStaticParams` 确保您的应用程序为所有语言预构建必要的页面，从而减少运行时计算并提升用户体验。更多详情，请参阅 [Next.js 关于 generateStaticParams 的文档](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)。

</Step>

<Step number={6} title="声明您的内容">

创建并管理您的内容声明以存储翻译：

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

````json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
> 您的内容声明可以在应用程序中的任何位置定义，只要它们被包含在 `contentDir` 目录中（默认是 `./src`），并且符合内容声明文件的扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={7} title="在代码中使用内容">

在整个应用程序中访问您的内容字典：

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
          <ClientComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

      <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <ClientComponentExample />
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`** 用于向客户端组件提供 locale。它可以放置在任何父组件中，包括布局组件中。然而，推荐将其放在布局中，因为 Next.js 会在页面间共享布局代码，这样更高效。通过在布局中使用 `IntlayerClientProvider`，可以避免每个页面都重新初始化它，从而提升性能并在整个应用中保持一致的本地化上下文。
- **`IntlayerServerProvider`** 用于向服务器端子组件提供 locale。它不能设置在布局中。

````

> 布局和页面不能共享公共的服务器上下文，因为服务器上下文系统基于每次请求的数据存储（通过 [React 的缓存](https://react.dev/reference/react/cache) 机制），这导致应用程序的不同部分会重新创建各自的“上下文”。如果将提供者放置在共享布局中，会破坏这种隔离，阻止服务器上下文值正确传递到你的服务器组件。

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 如果您想在字符串属性中使用内容，例如 `alt`、`title`、`href`、`aria-label` 等，必须调用函数的值，如：

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> 若要了解有关 `useIntlayer` 钩子的更多信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)。

</Step>

<Step number={8} title="元数据的国际化">

如果您想对元数据进行国际化，例如页面标题，可以使用 Next.js 提供的 `generateMetadata` 函数。在该函数内部，您可以通过 `getIntlayer` 函数获取内容，从而翻译您的元数据。

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
          "zh": "Preact 标志"
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "zh": "由 create next app 生成"
      },
    },
  },
};
```

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = ({ params: { locale } }) => {
  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 生成一个包含每个语言环境对应 URL 的对象。
   *
   * 示例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返回
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

module.exports = { generateMetadata };

// ... 代码的其余部分
````

> 注意，从 `next-intlayer` 导入的 `getIntlayer` 函数会返回包装在 `IntlayerNode` 中的内容，允许与可视化编辑器集成。相比之下，从 `intlayer` 导入的 `getIntlayer` 函数直接返回内容，不带额外属性。

> 了解有关元数据优化的更多信息，请参阅 [Next.js 官方文档](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)。

</Step>

<Step number={9} title="国际化您的 sitemap.xml 和 robots.txt">

要实现 `sitemap.xml` 和 `robots.txt` 的国际化，您可以使用 Intlayer 提供的 `getMultilingualUrls` 函数。该函数允许您为站点地图生成多语言 URL。

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

// 获取所有多语言 URL 的函数
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// 定义 robots 配置，指定爬虫规则
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // 适用于所有用户代理
    allow: ["/"], // 允许访问根路径
    disallow: getAllMultilingualUrls(["/login", "/register"]), // 禁止访问登录和注册页面的所有多语言版本
  },
  host: "https://example.com", // 网站主机地址
  sitemap: `https://example.com/sitemap.xml`, // 网站地图地址
});

export default robots;
```

> 了解有关站点地图优化的更多信息，请参阅[官方 Next.js 文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)。了解有关 robots.txt 优化的更多信息，请参阅[官方 Next.js 文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)。

</Step>

<Step number={10} title="更改内容语言">

要在 Next.js 中更改内容的语言，推荐的方式是使用 `Link` 组件将用户重定向到相应的本地化页面。`Link` 组件支持页面预加载，这有助于避免完整的页面重新加载。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 语言区域 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 该语言区域的语言名称 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境中的语言名称 - 例如当前语言环境设置为 Locales.SPANISH 时显示 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言名称 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> 另一种方式是使用 `useLocale` 钩子提供的 `setLocale` 函数。该函数不支持页面预取，并且会重新加载页面。

> 在这种情况下，不使用 `router.push` 进行重定向，只有您的服务器端代码会更改内容的语言环境。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... 其余代码

const { setLocale } = useLocale();

return <button onClick={() => setLocale(Locales.FRENCH)}>切换到法语</button>;
```

> 文档参考：
>
> - [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="创建本地化链接组件">

为了确保您的应用导航遵循当前的语言环境，您可以创建一个自定义的 `Link` 组件。该组件会自动在内部 URL 前添加当前语言的前缀。例如，当讲法语的用户点击“关于”页面的链接时，他们会被重定向到 `/fr/about`，而不是 `/about`。

这种行为有几个好处：

- **SEO 和用户体验**：本地化的 URL 有助于搜索引擎正确索引特定语言的页面，并为用户提供其偏好的语言内容。
- **一致性**：通过在整个应用中使用本地化链接，您可以确保导航保持在当前语言环境内，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在单个组件中简化了 URL 的管理，使您的代码库更易于维护和扩展，随着应用的增长。

以下是在 TypeScript 中实现的本地化 `Link` 组件示例：

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * 工具函数，用于检查给定的 URL 是否为外部链接。
 * 如果 URL 以 http:// 或 https:// 开头，则视为外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 自定义的 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，使用 `getLocalizedUrl` 在 URL 前添加语言前缀（例如 /fr/about）。
 * 这确保导航保持在相同的语言环境上下文中。
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接且提供了有效的 href，则获取本地化的 URL。
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

#### 工作原理

- **检测外部链接**：  
  辅助函数 `checkIsExternalLink` 用于判断一个 URL 是否为外部链接。外部链接保持不变，因为它们不需要本地化。

- **获取当前语言环境**：  
  `useLocale` 钩子提供当前的语言环境（例如，法语为 `fr`）。

- **本地化 URL**：  
  对于内部链接（即非外部链接），`getLocalizedUrl` 用于自动在 URL 前添加当前语言环境的前缀。这意味着如果用户的语言环境是法语，传入的 `/about` 作为 `href` 会被转换为 `/fr/about`。

- **返回链接**：  
  该组件返回带有本地化 URL 的 `<a>` 元素，确保导航与语言环境保持一致。

通过在整个应用中集成此 `Link` 组件，您可以保持一致且具备语言感知的用户体验，同时还能提升 SEO 和可用性。

</Step>

<Step number={12} title="优化您的Bundle 大小">

使用 `next-intlayer` 时，字典默认会包含在每个页面的打包文件中。为了优化打包体积，Intlayer 提供了一个可选的 SWC 插件，该插件通过宏智能替换 `useIntlayer` 调用。这确保了字典只会包含在实际使用它们的页面的打包文件中。

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // 使用 locale 做一些事情
};
```

> `getLocale` 函数遵循级联策略来确定用户的语言环境：
>
> 1. 首先，它检查请求头中是否存在由中间件设置的语言环境值
> 2. 如果在请求头中找不到语言环境，它会查找存储在 cookie 中的语言环境
> 3. 如果找不到 cookie，它会尝试从浏览器设置中检测用户的首选语言
> 4. 作为最后的手段，它会回退到应用配置的默认语言环境
>
> 这确保了基于可用的上下文选择最合适的语言环境。

</Step>

<Step number={13} title="优化你的 bundle 大小" isOptional={true}>

当使用 `next-intlayer` 时，字典默认会被包含在每个页面的 bundle 中。为了优化 bundle 大小，Intlayer 提供了一个可选的 SWC 插件，可以智能地使用宏替换 `useIntlayer` 调用。这确保字典只会被包含在实际使用它们的页面的 bundle 中。

要启用此优化，请安装 `@intlayer/swc` 包。安装后，`next-intlayer` 会自动检测并使用该插件：

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> 注意：此优化仅适用于 Next.js 13 及以上版本。

> 注意：此包默认不安装，因为 SWC 插件在 Next.js 上仍处于实验阶段。未来可能会改变。

> 注意：该包默认不安装，因为 SWC 插件在 Next.js 中仍处于实验阶段，未来可能会有所变化。

</Step>

</Steps>

### 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更健壮。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 你现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到你的 Git 仓库中。

为此，你可以在 `.gitignore` 文件中添加以下内容：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升你使用 Intlayer 的开发体验，你可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的 **自动补全**。
- **实时错误检测**，用于缺失的翻译。
- **内联预览**，显示翻译内容。
- **快速操作**，轻松创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

### 深入了解

要进一步使用，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)来外部化您的内容。

## 常见问题

<FAQ>

<Question title="国际化 Next.js 14 应用有哪些不同的解决方案？">

`next.config.js` 中的 `i18n` 字段不适用于 App Router，因此国际化层始终需要选择第三方库：

- **`next-intl`**、**`next-i18next` / `i18next`** 和 **`react-intl`**：历史悠久的方案，基于按命名空间加载的 JSON 或 ICU 消息目录。
- **`Lingui`**：基于提取驱动，在构建时编译 ICU 消息。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），在构建时编译为针对每个组件的字典，完全类型安全，并内置 AI 翻译、可视化编辑器和 CMS。

实际差异在于最终发送到浏览器的内容。基于命名空间的库会将整个 JSON 目录发送到页面，而 Intlayer 仅发送所渲染组件实际使用的内容，从而将 bundle 和页面体积减少高达 50%。请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md) 和 [Next.js i18n 性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/nextjs.md)。

</Question>

<Question title="i18n 会给我的 Next.js bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。Server Components 在服务端直接解析其内容，构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃，并且 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/nextjs.md)。

</Question>

<Question title="我可以从 next-intl、next-i18next 或 i18next 迁移而无需重写组件吗？">

可以，有两条迁移路径。您可以使用 [next-intl 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_next-intl_to_intlayer.md) 或 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 逐步迁移内容。或者，您可以完全保留当前的 API：[兼容性适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 公开与 `next-intl`、`react-i18next` 和 `react-intl` 完全相同的 API，但底层由 Intlayer 字典驱动，因此只需更改导入语句，组件代码完全无需修改。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的源文件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。请参阅 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可在构建时针对 JSX、TSX、Vue 和 Svelte 源码执行相同操作：它在每次修改时生成字典，因此完全无需手动维护键名。它通过静态分析工作，因此仅在运行时存在的字符串无法被捕获，并且需要少量注解以区分用户文本和应用逻辑。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="Intlayer 支持哪些 Next.js 版本？">

Next.js 12、13、14、15 和 16。本指南涵盖 Next.js 14。对于 Next.js 16，请参阅 [Next.js 16 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)。对于 Next.js 15，请参阅 [Next.js 15 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)。对于 Pages Router，请参阅 [Pages Router 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)。

</Question>

<Question title="Intlayer 是否适用于 React Server Components？">

是的。在 Next.js 14 中，App Router 的 `params` 仍是同步的，因此直接从路由段读取语言环境并传递给 Provider。内容直接在 Server Components 内部的服务端解析，因此服务端渲染的文本不会向客户端发送任何字典，而 Client Components 则通过 Provider 读取相同的字典。

</Question>

<Question title="我必须在 URL 中加入语言环境（例如 /fr/about）吗？">

不需要。`routing.mode` 支持 `"prefix-no-default"`（默认值：默认语言环境为 `/about`，其他语言环境为 `/fr/about`）、`"prefix-all"`、`"no-prefix"`（从 Cookie、Header 或域名解析）以及 `"search-params"`（`/about?locale=fr`）。`routing.domains` 可将每个语言环境映射到其独立的域名。详情请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 和 [无语言路径指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_no_locale_path.md)。

</Question>

<Question title="如何添加 hreflang 标签和本地化 SEO 元数据？">

第 8 步介绍了 `generateMetadata`，第 9 步介绍了 `sitemap.xml` 和 `robots.txt`。`getMultilingualUrls` 为每个声明的语言环境构建 `alternates.languages` 映射（包括 `x-default` 项），确保搜索引擎提供正确的语言版本。

</Question>

<Question title="我需要中间件 (Middleware) 吗？">

中间件负责检测访问者的语言环境并重定向到匹配的语言前缀，因此除非您自行处理语言路由，否则需要使用它。第 4 步展示了配置，包含排除 API 路由、静态资源和 `_next` 的 matcher 设置。

</Question>

<Question title="如何构建本地化的 Link 组件？">

第 11 步展示了具体实现。该组件封装了 Next.js 的 `Link`，并通过 `getLocalizedUrl` 处理 href，因此写为 `/about` 的内部链接会自动为法语访问者变为 `/fr/about`，无需在每次调用时重复传入语言环境。

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
