---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js 16 i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Next.js 16 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 8.0.0
    date: 2026-01-10
    changes: "初始发布"
author: aymericzip
---

# 使用 Intlayer 翻译你的 Next.js 16 网站（页面路径中不包含 [locale]） | 国际化 (i18n)

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="适用于 Next.js 的最佳 i18n 解决方案？探索 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 使用 Intlayer 国际化您的应用"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

查看 GitHub 上的 [应用模板](https://github.com/aymericzip/intlayer-next-no-lolale-path-template)。

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“next-intl”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

<AccordionGroup>
<Accordion header="Full Next.js coverage">

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

<Accordion header="AI Agent">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

</Accordion>

<Accordion header="自动化">

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

</Accordion>

<Accordion header="表现">

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

</Accordion>

<Accordion header="使用非开发环境进行扩展">

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

</Accordion>
</AccordionGroup>

---

## 在 Next.js 应用中逐步设置 Intlayer 的指南

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

> `--interactive` 标志是可选的。如果你是 AI agent，请使用 `intlayer-cli init`。

> 此命令将检测你的环境并安装所需的包。例如：

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

  核心包，提供国际化工具，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转换以及 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

- **next-intlayer**

  将 Intlayer 与 Next.js 集成的包。它为 Next.js 国际化提供上下文提供者和 hooks。此外，它还包括用于将 Intlayer 与 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 集成的 Next.js 插件，以及用于检测用户首选语言、管理 cookies 和处理 URL 重定向的代理。

</Step>

<Step number={2} title="配置你的项目">

以下是我们将创建的最终结构：

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> 如果你不想要语言路由，intlayer 可以作为一个简单的提供者 / hook 使用。详见[此指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_no_locale_path.md)。

创建一个配置文件来配置你的应用程序的语言：

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
  routing: {
    mode: "search-params", // 或 `no-prefix` - 用于中间件检测
  },
};

export default config;
```

> 通过此配置文件，你可以设置本地化 URL、代理重定向、cookie 名称、内容声明的位置和扩展名、禁用 Intlayer 的控制台日志等。如需完整的可用参数列表，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在 Next.js 配置中集成 Intlayer">

配置你的 Next.js 设置以使用 Intlayer：

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* 配置选项在这里 */};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 与 Next.js 集成。它确保构建内容声明文件，并在开发模式下监视它们。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它提供别名以优化性能并确保与服务器组件的兼容性。

> `withIntlayer()` 函数是一个 promise 函数。它允许在构建开始之前准备 intlayer 字典。如果你想将其与其他插件一起使用，你可以等待它。例如：
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 如果你想同步使用它，可以使用 `withIntlayerSync()` 函数。例如：
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer 根据命令行标志 `--webpack`、`--turbo` 或 `--turbopack`，以及你当前的 **Next.js 版本**，自动检测你的项目是否使用 **webpack** 或 **Turbopack**。
>
> 自 `next>=16` 起，如果你使用 **Rspack**，必须通过禁用 Turbopack 显式强制 Intlayer 使用 webpack 配置：
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="定义动态语言路由">

从 `RootLayout` 中删除所有内容，然后用以下代码替换：

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

> 单个 `IntlayerProvider` 覆盖树的两个部分：它为服务器钩子读取的请求作用域服务器上下文提供种子，并挂载客户端提供程序，以便客户端组件接收相同的区域设置。

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

 </Tab>
</Tabs>

</Step>

<Step number={5} title="声明你的内容">

创建和管理你的内容声明以存储翻译：

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      zh: "我的项目标题",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      zh: "发现我们为简化工作流程和提高生产力而设计的创新平台。",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      zh: ["创新", "生产力", "工作流程", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "zh": "我的项目标题",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "zh": "发现我们为简化工作流程和提高生产力而设计的创新平台。",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "zh": ["创新", "生产力", "工作流程", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        zh: "通过编辑开始",
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "zh": "通过编辑开始",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> 你的内容声明可以在应用程序的任何地方定义，只要它们包含在 `contentDir` 目录中（默认为 `./src`）且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 更多详情，请参考[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={6} title="在代码中使用内容">

在整个应用程序中访问你的内容字典：

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** 挂载一次，在根布局中。它为服务器和客户端组件提供语言区域，所以页面不再自动包装。
- 没有 `[locale]` 路径段的情况下，语言区域总是来自请求 — 由 Intlayer 代理设置的 `x-intlayer-locale` 请求头，然后是语言区域 cookie — 当提供者未运行时，服务器 hooks 会自行读取这些。

在整个应用程序中访问你的内容字典：

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** 用于向客户端组件提供语言设置。它可以放在任何父组件中，包括布局。但是，建议将其放在布局中，因为 Next.js 在页面中共享布局代码，这样更有效。通过在布局中使用 `IntlayerClientProvider`，你可以避免为每个页面重新初始化它，改进性能并在整个应用程序中维持一致的本地化上下文。
- **`IntlayerServerProvider`** 用于向服务器子组件提供语言设置。它不能在布局中设置。

  > 布局和页面不能共享一个通用的服务器上下文，因为服务器上下文系统基于每个请求的数据存储（通过 [React's cache](https://react.dev/reference/react/cache) 机制），导致每个"上下文"为应用程序的不同段重新创建。在共享布局中放置提供者会破坏这种隔离，防止服务器上下文值正确传播到你的服务器组件。

</Tab>
</Tabs>

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 创建相关的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` 是同构导入路径：`react-server` 导出条件为服务器组件提供环境区域设置实现，而客户端组件获得基于上下文的实现。同一调用在两端都有效。

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 创建相关的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> 如果你想在 `string` 属性（如 `alt`、`title`、`href`、`aria-label` 等）中使用你的内容，你可以使用函数的值，如：

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> 要了解更多关于 `useIntlayer` hook 的信息，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)。

</Step>

<Step number={7} title="配置代理以进行语言检测" isOptional={true}>

设置代理以检测用户的首选语言：

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` 用于检测用户的首选语言并根据[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)中指定的内容将其重定向到适当的 URL。此外，它能够将用户的首选语言保存在 cookie 中。

> 自 Intlayer v9 起，此中间件遵守 `routing.enableProxy` 选项（默认为 `true`）。在你的配置中设置 `routing.enableProxy: false` 以将其转为通过模式，而不移除此文件。详见 [v9 发行说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

> 如果你需要将多个代理链接在一起（例如，`intlayerProxy` 与认证或自定义代理），Intlayer 现在提供一个称为 `multipleProxies` 的辅助函数。

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="改变内容的语言" isOptional={true}>

要在 Next.js 中改变内容的语言，推荐的方式是使用 `Link` 组件将用户重定向到适当的本地化页面。`Link` 组件支持页面预获取，这有助于避免完整的页面重新加载。

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 语言代码 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 该语言用其自身语言表示 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 该语言用当前语言表示 - 例如当前语言设置为 Locales.SPANISH 时为 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> 另一种方式是使用 `useLocale` hook 提供的 `setLocale` 函数。此函数不允许预获取页面。详见 [`useLocale` hook 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)以了解更多详情。

> 文档参考：
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="在 Server Actions 中获取当前语言" isOptional={true}>

如果你需要在 Server Action 中使用活动语言（例如，本地化电子邮件或运行与语言相关的逻辑），请从 `next-intlayer/server` 调用 `getLocale`：

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // 使用语言做一些操作
};
```

> `getLocale` 函数遵循级联策略来确定用户的语言：
>
> 1. 首先，它检查请求标头中的语言值，该值可能已由代理设置
> 2. 如果在标头中找不到语言，它会查找存储在 cookies 中的语言
> 3. 如果找不到 cookie，它会尝试检测用户浏览器设置中的首选语言
> 4. 作为最后的手段，它会回退到应用程序配置的默认语言
>
> 这确保根据可用的上下文选择最合适的语言。

</Step>

<Step number={10} title="优化你的 bundle 大小" isOptional={true}>

在使用 `next-intlayer` 时，默认情况下字典被包含在每个页面的 bundle 中。要优化 bundle 大小，Intlayer 提供了一个可选的 SWC 插件，它可以智能地替换使用宏的 `useIntlayer` 调用。这确保字典仅被包含在实际使用它们的页面的 bundle 中。

要启用此优化，请安装 `@intlayer/swc` 包。安装后，`next-intlayer` 将自动检测并使用该插件：

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

> 注意：此包默认未安装，因为 SWC 插件在 Next.js 中仍是实验性的。它可能会在未来发生变化。

> 注意：如果你将选项设置为 `importMode: 'dynamic'` 或 `importMode: 'fetch'`（在 `dictionary` 配置中），它将依赖于 Suspense，因此你需要将你的 `useIntlayer` 调用包装在 `Suspense` 边界中。这意味着你将不能在你的 Page / Layout 组件的顶层直接使用 `useIntlayer`。

</Step>

</Steps>

### 第一步：安装依赖

当使用 Turbopack 作为通过 `next dev` 命令运行的开发服务器时，字典更改默认不会被自动检测。

这个限制是因为 Turbopack 无法并行运行 webpack 插件来监视内容文件的更改。为了解决这个问题，你需要使用 `intlayer watch` 命令同时运行开发服务器和 Intlayer 构建监视器。

```json5 fileName="package.json"
{
  // ... 你现有的 package.json 配置
  "scripts": {
    // ... 你现有的 scripts 配置
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> 如果你使用的是 next-intlayer@<=6.x.x，你需要保留 `--turbopack` 标志以使 Next.js 16 应用程序能与 Turbopack 正常工作。我们建议使用 next-intlayer@>=7.x.x 来避免此限制。

### 配置 TypeScript

Intlayer 使用模块扩展（module augmentation）来利用 TypeScript 的优势并增强你的 codebase 的类型安全性。

![自动完成](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保你的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 你现有的 TypeScript 配置
  "include": [
    // ... 你现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议将 Intlayer 生成的文件忽略（ignore）。这样可以避免将这些文件提交到你的 Git 仓库。

为此，你可以将以下内容添加到你的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code Extension

为了提升在 Intlayer 的开发体验，你可以安装官方的 **Intlayer VS Code Extension**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- **Autocompletion**：翻译键自动补全。
- **Real-time error detection**：实时检测缺失的翻译。
- **内联预览** 翻译后的内容。
- **快速操作** 以便轻松创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

### 更进一步

要深入了解，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 将内容外部化。

## 常见问题

<FAQ>

<Question title="国际化 Next.js 应用有哪些不同的解决方案？">

`next.config.js` 中的 `i18n` 字段不适用于 App Router，因此国际化层始终需要选择第三方库：

- **`next-intl`**、**`next-i18next` / `i18next`** 和 **`react-intl`**：按命名空间加载 JSON 或 ICU 目录。
- **`Lingui`**：基于提取驱动，在构建时编译 ICU 消息。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），并按组件进行编译，完全类型安全，并内置 AI 翻译、可视化编辑器和 CMS。

本指南涵盖在路径中不包含语言环境的配置。请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md) 和 [Next.js i18n 性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/nextjs.md)。

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

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的组件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。

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

<Question title="为什么在 URL 中不包含语言环境？">

因为语言环境并不总是页面标识的一部分。对于需要登录的控制面板 (Dashboard)、内部工具或个人后台，完全没有理由在每个 URL 中暴露 `/fr/`：语言是一种用户偏好，而不是一个不同的文档。去除前缀还可以让您的路由、链接和分析统计统一在一组路径上。

</Question>

<Question title="URL 中不包含语言环境对 SEO 有什么影响？">

影响是确实存在的，因此需要谨慎权衡。如果每种语言没有单独的 URL，搜索引擎就无法为每个语言版本建立单独的索引，`hreflang` 也无处可指，爬虫只能看到默认检测所提供的语言。这对于登录后的内部内容完全没有问题（反正不会被索引），但对于公开的营销站点或文档则不太合适。如果每种语言的自然搜索流量对您很重要，建议改用 [Next.js 16 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md) 中的带前缀方案。

</Question>

<Question title="no-prefix 模式与 search-params 模式有什么区别？">

`"no-prefix"` 将语言环境完全从 URL 中剔除，通过 Cookie、Header 或域名来解析，因此所有语言共享同一个地址。`"search-params"` 则将其作为查询参数（例如 `/dashboard?locale=fr`），这既为每种语言提供了独立、可分享和可添加书签的 URL，又无需修改路由树。如果您需要针对不同语言生成可分享的链接，推荐使用 `"search-params"`。

</Question>

<Question title="这种情况下如何检测语言环境？">

通过 `routing.storage` 中列出的来源进行检测，默认情况下先检测 Cookie，再检测 `Accept-Language` 请求头，最后回退到默认语言环境。第 7 步添加了应用该逻辑的代理。用户显式选择的语言会被持久化，以便下次访问时生效。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="我可以将每种语言分别映射到其独立的域名吗？">

可以，如果您出于视觉简洁考虑去除了路径前缀，但依然希望保留良好的 SEO，这正是理想的方案。`routing.domains` 将语言环境映射到主机名，由域名来标识语言，路径中不需要添加任何前缀，每种语言都能拥有可被索引且能供 `hreflang` 指向的独立 URL。

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
