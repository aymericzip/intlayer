---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - 在 Vite 上翻译 Next.js 应用的完整指南"
description: "在 vinext（基于 Vite 的 Next.js API）中配置 Intlayer：通过 proxy.ts 进行语言路由、Server 与 Client Components、本地化元数据、站点地图以及部署到 Cloudflare Workers。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "初始历史"
author: aymericzip
---

# 使用 Intlayer 翻译你的 vinext 网站

[vinext](https://github.com/cloudflare/vinext) 在 Vite 之上重新实现了 Next.js API。你的 `app/` 目录、`next/*` 导入和 `proxy.ts` 都能继续使用，但构建由 Vite 完成，而不是 Turbopack 或 webpack。

Intlayer 通过两个包接入这一配置：`next-intlayer` 提供你的组件在 Next.js 上已经在使用的 hooks、providers 和 proxy；`vite-intlayer` 负责构建部分（字典编译、监听和 bundle 优化）。

> 在使用 Next.js 自带的工具链？请改为参考 [Next.js 16 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)。

- [Next.js 16 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)

## 目录

<TOC/>

## 为什么选择 Intlayer 而不是其他方案？

与 `next-intl` 或 `i18next` 等方案相比，Intlayer 内置了多项优化：

<AccordionGroup>
<Accordion header="为 Vite 上的 Next.js API 而生">

同一份 `next-intlayer` 代码可同时运行在 Next.js 和 vinext 上。Server Components 在服务端解析内容，Client Components 通过 provider 读取内容，语言路由由你的 `proxy.ts` 执行。在两种工具链之间迁移不会改动你的组件。

</Accordion>
<Accordion header="Bundle 体积">

不再把庞大的 JSON 文件加载到页面中，只加载必要的内容。Vite 插件会把每个 `useIntlayer` 调用替换为组件实际用到的条目，从而**将 bundle 和页面体积最多减少 50%**。

</Accordion>
<Accordion header="可维护性">

按组件划分内容可以**简化大型应用的维护**。你可以复制或删除某个功能文件夹，而无需检查整个内容代码库；同时 Intlayer **完全类型化**，确保内容准确。

</Accordion>
<Accordion header="AI Agent">

将内容与组件放在一起可以**减少 LLM 所需的上下文**。Intlayer 提供用于检测缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**。

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)
- [MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)

</Accordion>
<Accordion header="自动化">

在你的 CI/CD 流水线中使用你选择的 LLM 进行翻译，费用由你的 AI 提供商承担。Intlayer 还提供用于自动提取内容的**编译器**，以及可以**在后台翻译**的[网页平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。

- [网页平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

</Accordion>
<Accordion header="与非开发人员协作扩展">

Intlayer 提供**可自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)**和**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**，让你与译者和文案**实时**管理多语言内容。内容可以存储在本地和/或远程。

- [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- [完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## 在 vinext 应用中设置 Intlayer 的分步指南

<Steps>
<Step number={1} title="安装依赖">

从一个可运行的 vinext 项目开始。创建新项目请运行 `npm create vinext-app@latest`。迁移现有的 Next.js 应用请运行 `npx vinext init`。

然后安装 Intlayer：

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  提供国际化工具的核心包，涵盖配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

- **next-intlayer**

  提供适用于 Next.js API 的 providers、hooks 和 proxy。vinext 会将 `next/navigation`、`next/headers` 和 `next/server` 解析到自己的实现，因此 `next-intlayer` 无需修改即可使用。

- **vite-intlayer**

  Vite 插件，用于构建你的内容声明、在开发中监听它们，并在生产 bundle 中优化字典。它取代了 vinext 不会运行的 Next.js 插件 `withIntlayer()`。

</Step>
<Step number={2} title="配置你的项目">

选择应用是使用本地化的 URL 路径（例如 `/en/about`、`/fr/about`），还是在路径中不带语言段来提供内容（例如 `/about`，通过 cookie、请求头或查询参数检测语言）。

<Tabs group="routing-mode">
<Tab label="带语言路径" value="with-locale-path">

### 架构

所有本地化页面都嵌套在动态段 `[locale]` 下。由于每种语言都有各自的 URL，推荐用于 SEO 和静态渲染：

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
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### 配置

创建 `intlayer.config.ts` 文件来声明支持的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="不带语言路径" value="without-locale-path">

### 架构

路由不包含 `[locale]` 段。所有页面直接位于 `src/app/` 下，语言来自 cookie、请求头或查询参数。适合仪表盘和需要登录的应用：

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### 配置

将 `routing.mode` 设置为 `"search-params"`（例如 `/about?locale=fr`）或 `"no-prefix"`：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> 该文件还可以设置代理重定向、cookie 名称、内容声明的位置和扩展名、日志等。完整列表请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

- [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

</Step>
<Step number={3} title="在 Vite 配置中集成 Intlayer">

在 `vite.config.ts` 中，把 `intlayer()` 插件添加到 `vinext()` 旁边：

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> `intlayer()` 插件会在构建开始前构建你的字典，在开发中监听内容文件，并设置 `next-intlayer` 在 RSC、SSR 和客户端环境中使用的别名与优化。

> `intlayer()` 还为 Vite 开发服务器提供了语言路由中间件。在 vinext 上，`src/proxy.ts` 已经在开发环境和生产运行时中承担这项工作，因此 `ignore` 选项会关闭 Vite 的那一个，避免每个请求被路由两次。

> 不要在 `next.config.ts` 中使用 `withIntlayer()`。vinext 会读取 `next.config.ts` 中的 `redirects`、`rewrites` 和 `headers` 等选项，但不会运行 webpack 或 Turbopack 插件。

如果你部署到 Cloudflare Workers，请保留 `vinext init` 生成的 `cloudflare()` 插件：

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="定义动态语言路由">

<Tabs group="routing-mode">
<Tab label="带语言路径" value="with-locale-path">

清空 `RootLayout` 中的所有内容，并替换为以下代码：

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> 保持 `RootLayout` 为空，可以让语言布局在 `<html>` 标签上设置 [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) 和 [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) 属性。

在 `[locale]` 目录中添加一个布局：

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> 一个 `IntlayerProvider` 即可覆盖组件树的两部分：它向 Server Components 提供语言，并挂载客户端 provider，使 Client Components 获得相同的语言。

> `[locale]` 段保存语言：`/en-US/about` 解析为 `en-US`，`/fr/about` 解析为 `fr`。原来的 `src/app/page.tsx` 不再使用，可以删除。代理（第 7 步）会在根路径提供默认语言。

> `generateStaticParams` 会让 vinext 为每种语言预渲染所有页面。vinext 还会强制执行 `dynamicParams`，因此当你设置 `export const dynamicParams = false` 时，未知语言会返回 404。

</Tab>
<Tab label="不带语言路径" value="without-locale-path">

不存在 `[locale]` 目录。配置 `src/app/layout.tsx`，从请求中读取语言，并用 `IntlayerProvider` 包裹你的应用：

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

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

</Tab>
</Tabs>

</Step>
<Step number={5} title="声明你的内容">

创建内容声明来存储你的翻译：

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        zh: "开始编辑",
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

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "zh": "开始编辑",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> 内容声明可以放在 `contentDir` 目录（默认为 `./src`）下的任何位置，只要符合内容声明的扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）即可。

> 更多详情请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

- [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)

</Step>
<Step number={6} title="在代码中使用内容">

在任何组件中访问你的字典：

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

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
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` 是同构的：vinext 在其 RSC 环境中应用的 `react-server` 导出条件，会让 Server Components 使用服务端实现，而 Client Components 使用基于 context 的实现。同一个调用在两侧都能工作。

> 若要在 `alt`、`title`、`href` 或 `aria-label` 等 `string` 属性中使用内容，请读取其值：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 更多信息请参阅 [`useIntlayer` 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)。

- [`useIntlayer` 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)

> 如果你的应用已经存在，[Intlayer 编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)和 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)可以在一秒内转换数千个组件。

- [Intlayer 编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)
- [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)

</Step>
<Step number={7} title="配置用于语言检测的代理">

vinext 像 Next.js 16 一样运行 `proxy.ts`（以及 `middleware.ts`），无论开发还是生产，包括在 Cloudflare Workers 上。导出 Intlayer 代理：

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` 会检测用户偏好的语言，按照[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)重定向到对应的 URL，并将语言存储在 cookie 中。它还会把语言传递给 `getLocale()` 和服务端 hooks，因此即使使用不带语言路径的架构也请保留它。

- [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

> 若要串联多个代理（例如 `intlayerProxy` 与身份验证），请使用 `multipleProxies`：

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="元数据的国际化" isOptional={true}>

vinext 支持 Metadata API。使用 `generateMetadata` 配合 `getIntlayer` 来翻译页面元数据：

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      zh: "我的 vinext 应用",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      zh: "运行在 Vite 上的 Next.js 应用",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

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

// ... Rest of the code
````

> 从 `intlayer` 导入的 `getIntlayer` 函数返回原始值，可直接用于元数据对象。来自 `next-intlayer` 的版本则会为可视化编辑器包装这些值。

</Step>
<Step number={9} title="sitemap.xml 和 robots.txt 的国际化" isOptional={true}>

`sitemap.ts` 和 `robots.ts` 的工作方式与 Next.js 相同。使用 `getMultilingualUrls` 列出每个本地化 URL：

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="切换内容语言" isOptional={true}>

使用 `next/link` 导航到本地化页面。vinext 保留了客户端导航和预取，因此切换时无需完整刷新页面：

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> 文档参考：
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` 函数](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 函数](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 函数](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="创建本地化链接组件" isOptional={true}>

自定义 `Link` 组件会为内部 URL 添加当前语言前缀，因此法语用户点击 `/about` 会进入 `/fr/about`：

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="在 Server Actions 中获取当前语言" isOptional={true}>

在 Server Action 中调用 `next-intlayer/server` 的 `getLocale`：

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` 依次读取代理在请求头中设置的语言、语言 cookie、浏览器的 `Accept-Language` 请求头，最后回退到默认语言。

</Step>
<Step number={13} title="部署到 Cloudflare Workers" isOptional={true}>

Intlayer 在构建时将字典编译进 bundle，因此运行时不会读取文件系统，应用可以直接在 workerd 中运行。使用 vinext CLI 构建并部署：

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> 若要部署到其他平台（Vercel、Netlify、AWS、Node.js），请在 `vinext()` 旁添加 [Nitro](https://v3.nitro.build/) Vite 插件，或在 `next.config.ts` 中设置 `output: "standalone"`。Intlayer 的配置保持不变。

</Step>
<Step number={14} title="提取组件中的内容" isOptional={true}>

对于已有的代码库，Intlayer 提供[编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)和[提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)，用于把硬编码的字符串迁移到内容声明中。

- [编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)
- [提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)

在 `intlayer.config.ts` 中启用编译器：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

运行提取器来转换你的组件并提取内容：

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
 <Tab value='Vite compiler'>

`intlayer()` Vite 插件包含编译器。设置 `compiler.enabled` 之后，像往常一样运行开发服务器或构建：

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### 配置 TypeScript

Intlayer 使用模块增强（module augmentation）为你的内容键和值提供类型。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

在 TypeScript 配置中包含生成的类型：

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git 配置

忽略 Intlayer 生成的文件：

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code 扩展

安装官方的 **[Intlayer VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)**，获得键自动补全、缺失翻译错误提示、内联预览和快速操作。请参阅[扩展文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)。

- [扩展文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)

### 进一步了解

添加[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)，或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 将内容外部化。

- [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

## 常见问题

<FAQ>

<Question title="什么是 vinext？">

vinext 是由 Cloudflare 维护的开源 Vite 插件，它重新实现了 Next.js 的公开 API：App Router 和 Pages Router、React Server Components、Server Actions、`proxy.ts`、路由处理程序以及 `next/*` 模块。你的 Next.js 代码运行在 Vite 上，可以原生部署到 Cloudflare Workers，或通过 Nitro 部署到其他平台。

</Question>
<Question title="与 Next.js 的配置相比有什么变化？">

只有构建集成。在 Next.js 上，`withIntlayer()` 包裹 `next.config.ts`。在 vinext 上，则改为把 `vite-intlayer` 的 `intlayer()` 插件放进 `vite.config.ts`。providers、hooks、`proxy.ts`、元数据和站点地图代码保持不变，因此本页未涵盖的内容都可以参考 [Next.js 16 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)。

- [Next.js 16 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)

</Question>
<Question title="我需要 Next.js 的 i18n 配置或 SWC 插件吗？">

不需要。`next.config.ts` 的 `i18n` 字段在 vinext 上只涵盖 Pages Router 的语言前缀，而 Intlayer 通过 `proxy.ts` 自行完成路由。也不需要 `@intlayer/swc` 插件：Vite 插件已经替换了 `useIntlayer` 调用，使每个页面只包含它用到的字典。请参阅 [bundle 优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)。

- [Bundle 优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)

</Question>
<Question title="开发时需要 `intlayer watch` 吗？">

不需要。`intlayer()` Vite 插件会随 `vite dev` 启动内容监听器，修改内容时只会热更新读取该字典的组件。

</Question>
<Question title="我可以在不重写组件的情况下从 `next-intl` 或 `i18next` 迁移吗？">

可以。请参阅 [next-intl 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_next-intl_to_intlayer.md)或 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md)，也可以通过[兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)保留当前的 API，它们提供由 Intlayer 字典驱动的 `next-intl`、`react-i18next` 和 `react-intl` API。

- [next-intl 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_next-intl_to_intlayer.md)
- [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md)
- [兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)

</Question>
<Question title="我必须把语言放进 URL 吗，比如 /fr/about？">

不必。`routing.mode` 接受：

- `"prefix-no-default"`（默认）：默认语言为 `/about`，其他语言为 `/fr/about`。
- `"prefix-all"`：每种语言都有前缀，`/en/about` 和 `/fr/about`。
- `"no-prefix"`：路径中没有语言，通过 cookie 或请求头确定。
- `"search-params"`：`/about?locale=fr`。

请参阅[配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)以及第 2 步中不带语言路径的架构。

- [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

</Question>
<Question title="如何用 AI 自动翻译我的应用？">

运行 `npx intlayer fill`。CLI 会检测缺失的翻译，并使用你选择的 LLM（通过你自己的提供商和 API 密钥）补全。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md)和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

- [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md)
- [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)

</Question>
<Question title="如何在发布前发现缺失的翻译？">

在 CI 中运行 `npx intlayer test`。当已声明的语言缺少内容时，构建会失败。[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)会在你输入时显示相同的错误，[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)会标记硬编码的字符串。

- [VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- [ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)

</Question>
<Question title="Intlayer 是免费且开源的吗？">

是的。Intlayer 以 Apache 2.0 许可证开源，库、CLI、可视化编辑器和编译器均可免费使用，包括商业用途。托管的 CMS 是可选的付费服务，也可以[自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

- [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)

</Question>

</FAQ>
