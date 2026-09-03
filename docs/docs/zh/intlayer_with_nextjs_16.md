---
createdAt: 2024-12-06
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
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 7.0.6
    date: 2025-11-01
    changes: "在 `alternates` 对象中添加了对 `x-default` 的提及"
  - version: 7.0.0
    date: 2025-06-29
    changes: "初始化历史记录"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Next.js 16 网站 | 国际化 (i18n)

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="Next.js 最佳 i18n 解决方案？探索 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-next-16-template)。

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与 `next-intl` 或 `i18next` 等主流解决方案相比，Intlayer 是一个提供集成优化的解决方案，例如：

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

## 在 Next.js 应用程序中设置 Intlayer 的分步指南

<Steps>

<Step number={1} title="安装依赖项">

使用 npm 安装必要的包：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
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

  提供配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 等国际化工具的核心包。

- **next-intlayer**

  将 Intlayer 与 Next.js 集成的包。它为 Next.js 国际化提供上下文提供者和钩子。此外，它还包括用于将 Intlayer 与 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 集成的 Next.js 插件，以及用于检测用户首选语言环境、管理 cookie 和处理 URL 重定向的代理。

</Step>

<Step number={2} title="配置您的项目">

这是我们将创建的最终结构：

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # 用于 Intlayer 提供者的语言环境布局
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # 用于样式和全局提供者的根布局
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
├── package.json
└── tsconfig.json
```

> 如果您不需要语言环境路由，intlayer 可以用作简单的提供者/钩子。有关更多详细信息，请参见[此指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_no_locale_path.md)。

创建一个配置文件来配置您的应用程序语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> 通过此配置文件，您可以设置本地化 URL、代理重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在 Next.js 配置中集成 Intlayer">

配置您的 Next.js 设置以使用 Intlayer：

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* 此处为配置选项 */};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 与 Next.js 集成。它确保内容声明文件的构建并在开发模式下对其进行监控。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它还提供别名以优化性能并确保与服务器组件的兼容性。

> `withIntlayer()` 函数是一个 promise 函数。它允许在构建开始之前准备 intlayer 字典。如果您想将其与其他插件一起使用，可以 await 它。示例：
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 如果您想同步使用它，可以使用 `withIntlayerSync()` 函数。示例：
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer 会根据命令行标志 `--webpack`、`--turbo` 或 `--turbopack` 以及您当前的 **Next.js 版本** 自动检测您的项目是使用 **webpack** 还是 **Turbopack**。
>
> 自 `next>=16` 起，如果您使用 **Rspack**，则必须通过禁用 Turbopack 来显式强制 Intlayer 使用 webpack 配置：
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="定义动态语言环境路由">

从 `RootLayout` 中删除所有内容，并将其替换为以下代码：

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // 您仍然可以用其他提供者包装子组件，例如 `next-themes`、`react-query`、`framer-motion` 等。
  <>{children}</>
);

export default RootLayout;
```

> 保持 `RootLayout` 组件为空，允许在 `<html>` 标签上设置 [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) 和 [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 属性。

要实现动态路由，请通过在 `[locale]` 目录中添加新布局来提供语言环境路径：

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> 单个 `IntlayerProvider` 覆盖树的两个部分：它为服务器 hooks 读取的请求作用域服务器上下文提供种子，并挂载客户端提供者，以便客户端组件接收相同的locale。

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

 </Tab>
</Tabs>

> `[locale]` 路径段用于定义语言环境。示例：`/en-US/about` 将引用 `en-US`，而 `/fr/about` 将引用 `fr`。

> 在此阶段，您将遇到错误：`Error: Missing <html> and <body> tags in the root layout.`。这是预期的，因为 `/app/page.tsx` 文件不再使用，可以删除。取而代之的是，`[locale]` 路径段将激活 `/app/[locale]/page.tsx` 页面。因此，页面将可以通过浏览器中的 `/en`、`/fr`、`/es` 等路径访问。要将默认语言环境设置为根页面，请参考第 7 步中的 `proxy` 设置。

然后，在您的应用程序布局中实现 `generateStaticParams` 函数。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // 要插入的代码行

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... 其余代码*/
};

export default LocaleLayout;
```

> `generateStaticParams` 确保您的应用程序为所有语言环境预构建必要的页面，从而减少运行时计算并改善用户体验。有关更多详细信息，请参阅 [Next.js 关于 generateStaticParams 的文档](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)。

> Intlayer 与 `export const dynamic = 'force-static';` 配合使用，以确保为所有语言环境预构建页面。

</Step>

<Step number={5} title="声明您的内容">

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
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
    "pageLink": "src/app/page.tsx"
  }
}
```

> 您的内容声明可以定义在应用程序的任何位置，只要它们包含在 `contentDir` 目录（默认情况下为 `./src`）中。并且匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 有关更多详细信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={6} title="在代码中利用内容">

在整个应用程序中访问你的内容字典：

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** 在 locale layout 中挂载一次。它向服务器和客户端组件提供 locale，因此页面不再需要自己包装。
- 服务器 hooks 按以下顺序解析 locale：调用站点传递的 locale，然后是由提供者种子化的服务器上下文，然后是请求携带的 locale（由 Intlayer 代理设置的 `x-intlayer-locale` header，然后是 locale cookie）。最后一步是保持内容在客户端导航中正确的原因，在客户端导航中只重新渲染页面段，而 layout——以及它的 provider——不会重新运行。

在整个应用程序中访问您的内容字典：

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

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

- **`IntlayerClientProvider`** 用于向客户端组件提供语言环境。它可以放置在任何父组件中，包括布局。然而，建议将其放置在布局中，因为 Next.js 会在页面之间共享布局代码，从而使其效率更高。通过在布局中使用 `IntlayerClientProvider`，您可以避免为每个页面重新初始化它，从而提高性能并在整个应用程序中保持一致的本地化上下文。
- **`IntlayerServerProvider`** 用于向服务器端子组件提供语言环境。它不能在布局中设置。

  > 布局和页面不能共享通用的服务器上下文，因为服务器上下文系统基于每个请求的数据存储（通过 [React 的缓存](https://react.dev/reference/react/cache) 机制），导致每个“上下文”会为应用程序的不同部分重新创建。将提供者放在共享布局中会打破这种隔离，阻止服务器上下文值正确传播到您的服务器组件。

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

> `next-intlayer` 是同构的导入路径：`react-server` 导出条件为服务器组件提供了环境语言环境实现，而客户端组件获得了基于上下文的实现。相同的调用在两端都有效。

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

> 如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用该函数的值，如下所示：

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)。

> 如果您的应用程序已经存在，您可以结合使用 [Intlayer 编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 和 [提取命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 在一秒钟内转换成干个组件。

</Step>

<Step number={7} title="配置代理进行语言环境检测" isOptional={true}>

设置代理以检测用户首选的语言环境：

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` 用于检测用户的首选语言环境，并将他们重定向到 [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 中指定的相应 URL。此外，它还允许将用户的首选语言环境保存在 cookie 中。

> 从 Intlayer v9 开始，这个中间件遵守 `routing.enableProxy` 选项（默认为 `true`）。在你的配置中设置 `routing.enableProxy: false` 以将其转换为直通模式，而不需要删除此文件。查看 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

> 如果您需要将多个代理链接在一起（例如，带有身份验证的 `intlayerProxy` 或自定义代理），Intlayer 现在提供了一个名为 `multipleProxies` 的助手。

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="元数据的国际化" isOptional={true}>

在您想要国际化元数据（例如页面标题）的情况下，您可以使用 Next.js 提供的 `generateMetadata` 函数。在其中，您可以从 `getIntlayer` 函数中检索内容来翻译您的元数据。

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
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
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
   * 生成一个包含每个语言环境的所有 url 的对象。
   *
   * 示例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返回
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

// ... 其余代码
````

> 请注意，从 `next-intlayer` 导入的 `getIntlayer` 函数会返回包装在 `IntlayerNode` 中的内容，从而允许与可视化编辑器集成。相比之下，从 `intlayer` 导入的 `getIntlayer` 函数则直接返回内容，不带附加属性。

> 在 [Next.js 官方文档](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) 上了解更多关于元数据优化的信息。

</Step>

<Step number={9} title="sitemap.xml 和 robots.txt 的国际化" isOptional={true}>

要对您的 `sitemap.xml` 和 `robots.txt` 进行国际化，您可以使用 Intlayer 提供的 `getMultilingualUrls` 函数。此函数允许您为站点地图生成多语言 URL。

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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
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

> 在 [Next.js 官方文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) 上了解更多关于站点地图优化的信息。在 [Next.js 官方文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) 上了解更多关于 robots.txt 优化的信息。

</Step>

<Step number={10} title="更改内容的语言" isOptional={true}>

要在 Next.js 中更改内容的语言，推荐的方法是使用 `Link` 组件将用户重定向到相应的本地化页面。`Link` 组件支持页面预取，这有助于避免全页面重新加载。

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
            replace // 将确保浏览器的“返回”按钮将重定向到上一个页面
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言在其自身语言环境中的名称 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 语言在当前语言环境中的名称 - 例如当当前语言环境设置为 Locales.SPANISH 时显示为 Francés */}
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

> 另一种方法是使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数不允许页面预取。有关更多详细信息，请参见 [`useLocale` 钩子文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)。

> 您还可以在 `onLocaleChange` 选项中设置一个函数，以在语言环境更改时触发自定义函数。

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... 其余代码

const { setLocale } = useLocale();

return <button onClick={() => setLocale(Locales.FRENCH)}>更改为法语</button>;
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
> - [`aria-current` 属性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="创建本地化链接组件" isOptional={true}>

为了确保您的应用程序导航尊重当前语言环境，您可以创建一个自定义的 `Link` 组件。此组件会自动为内部 URL 添加当前语言的前缀。例如，当讲法语的用户点击“关于”页面的链接时，他们会被重定向到 `/fr/about` 而不是 `/about`。

这种行为很有用，原因如下：

- **SEO 和用户体验**：本地化 URL 帮助搜索引擎正确索引特定语言的页面，并为用户提供其首选语言的内容。
- **一致性**：通过在整个应用程序中使用本地化链接，您可以确保导航保持在当前语言环境内，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在单个组件中简化了 URL 的管理，随着应用程序的增长，使您的代码库更易于维护和扩展。

以下是用 TypeScript 实现的本地化 `Link` 组件：

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * 检查给定 URL 是否为外部链接的实用函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义的 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 在 URL 前添加语言环境前缀（例如 /fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接且提供了有效的 href，则获取本地化 URL。
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### 工作原理

- **检测外部链接**：  
  助手函数 `checkIsExternalLink` 确定 URL 是否为外部链接。外部链接保持不变，因为它们不需要本地化。

- **检索当前语言环境**：  
  `useLocale` 钩子提供当前语言环境（例如，法语为 `fr`）。

- **本地化 URL**：  
  对于内部链接（即非外部链接），使用 `getLocalizedUrl` 自动为 URL 添加当前语言环境前缀。这意味着如果您的用户使用的是法语，传递 `/about` 作为 `href` 将其转换为 `/fr/about`。

- **返回链接**：  
  该组件返回带有本地化 URL 的 `<a>` 元素，确保导航与语言环境一致。

通过在整个应用程序中集成此 `Link` 组件，您可以维持连贯且具有语言意识的用户体验，同时还能从改进的 SEO 和可用性中获益。

</Step>

<Step number={12} title="在 Server Actions 中获取当前语言环境" isOptional={true}>

如果您在 Server Action 中需要活动语言环境（例如，为了本地化电子邮件或运行语言环境感知逻辑），请从 `next-intlayer/server` 调用 `getLocale`：

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // 对语言环境执行某些操作
};
```

> `getLocale` 函数遵循级联策略来确定用户的语言环境：
>
> 1. 首先，它检查请求头中是否包含代理可能设置的语言环境值。
> 2. 如果请求头中未找到语言环境，它会查找存储在 cookie 中的语言环境。
> 3. 如果未找到 cookie，它会尝试从浏览器设置中检测用户的首选语言。
> 4. 作为最后手段，它会回退到应用程序配置的默认语言环境。
>
> 这确保了根据可用上下文选择最合适的语言环境。

</Step>

<Step number={13} title="优化您的Bundle 大小" isOptional={true}>

使用 `next-intlayer` 时，默认情况下每个页面的包中都会包含字典。为了优化Bundle 大小，Intlayer 提供了一个可选的 SWC 插件，该插件可以使用宏智能地替换 `useIntlayer` 调用。这确保了字典仅包含在实际使用它们的页面的包中。

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

> 注意：此包默认不安装，因为 SWC 插件在 Next.js 上仍处于实验阶段。未来可能会有所改变。

> 注意：如果您将选项设置为 `importMode: 'dynamic'` 或 `importMode: 'fetch'`（在 `dictionary` 配置中），它将依赖于 Suspense，因此您必须将 `useIntlayer` 调用包装在 `Suspense` 边界中。这意味着，您将无法直接在页面/布局组件的顶层使用 `useIntlayer`。

</Step>

<Step number={14} title="提取组件内容" isOptional={true}>

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // 将组件内容提取到字典中
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
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

### 在 Turbopack 上监视字典更改

当使用 Turbopack 作为您的开发服务器并运行 `next dev` 命令时，默认情况下不会自动检测字典更改。

出现这种限制是因为 Turbopack 无法并行运行 webpack 插件以监视内容文件中的更改。要解决此问题，您需要使用 `intlayer watch` 命令同时运行开发服务器和 Intlayer 构建监视器。

```json5 fileName="package.json"
{
  // ... 您的现有 package.json 配置
  "scripts": {
    // ... 您的现有 scripts 配置
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> 如果您使用的是 next-intlayer@<=6.x.x，则需要保留 `--turbopack` 标志以使 Next.js 16 应用程序在 Turbopack 下正常工作。我们建议使用 next-intlayer@>=7.x.x 以避免此限制。

### 配置 TypeScript

Intlayer 使用模块扩充来利用 TypeScript 的优势，并使您的代码库更强大。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您的现有 TypeScript 配置
  "include": [
    // ... 您的现有 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下指令添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了改善您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 已翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

### 深入了解

要深入了解，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外化您的内容。

## 常见问题

<FAQ>

<Question title="国际化 Next.js 16 应用有哪些不同的解决方案？">

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

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的组件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。本指南的第 14 步详细介绍了此过程。

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

<Question title="Intlayer 是否支持 Next.js App Router 和 React Server Components？">

是的。`next-intlayer` 专为 App Router 构建：内容直接在 Server Components 内部的服务端解析，因此服务端渲染的文本不会向客户端发送任何字典。Client Components 则通过 Provider 使用相同的 `useIntlayer` Hook。Intlayer 不会阻碍静态渲染，并且与 Turbopack 完全兼容。

</Question>

<Question title="Intlayer 支持哪些 Next.js 版本？">

Intlayer 支持 Next.js 12、13、14、15 和 16。本指南涵盖 Next.js 16。对于较旧的设置，请参阅 [Next.js 15 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)、[Next.js 14 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_14.md) 或 [Pages Router 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)。

</Question>

<Question title="我必须在 URL 中加入语言环境（例如 /fr/about）吗？">

不需要。URL 方案是配置选项而非限制。`routing.mode` 支持：

- `"prefix-no-default"`（默认值）：默认语言环境为 `/about`，其他语言环境为 `/fr/about`。
- `"prefix-all"`：所有语言环境均带前缀，如 `/en/about` 与 `/fr/about`。
- `"no-prefix"`：路径中无语言环境，从 Cookie、Header 或域名解析。
- `"search-params"`：`/about?locale=fr`。

您还可以通过 `routing.domains` 将每个语言环境映射到其独立的域名。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 和 [无语言路径指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_no_locale_path.md)。

</Question>

<Question title="如何添加 hreflang 标签和本地化 SEO 元数据？">

结合使用 Next.js 的 `generateMetadata` 函数与 Intlayer 的 `getMultilingualUrls`。它为每个声明的语言环境构建 `alternates.languages` 映射（包括 `x-default` 项），确保搜索引擎提供正确的语言版本。同一个辅助函数也可以本地化 `sitemap.ts` 和 `robots.ts`。本指南的第 8 步和第 9 步展示了完整代码。

</Question>

<Question title="如何使用 AI 自动翻译 Next.js 应用？">

运行 `npx intlayer fill`。CLI 会检测内容文件中缺失的翻译，并使用您选择的 LLM、您自己的提供商和 API 密钥进行填充，因此直接向提供商付费，无需经过任何第三方。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 是否支持复数、性别、条件和富文本？">

支持。内容声明支持 [复数形式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)、[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件渲染、插值用的 [插入内容 (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)，以及用于法律页面或博客正文等富文本的 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)。数字、日期和货币由 [格式化工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md) 处理。

</Question>

<Question title="翻译人员与非开发人员如何编辑内容？">

有两个选项，均为可选。[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 在您自己的基础设施上运行，允许任何人点击站点的文本直接就地编辑。[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 将内容外部化，因此无需重新部署即可更新，并通过 [live sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/live.md) 在运行时反映更改。

</Question>

<Question title="如何在发布前捕获缺失的翻译？">

在 CI 中运行 `npx intlayer test`。当声明的语言环境缺少内容时，它会使构建失败，确保未翻译的字符串永远不会进入生产环境。[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md) 会在您键入时显示相同的错误，[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md) 及其 `no-raw-text` 规则会捕获硬编码字符串。请参阅 [测试您的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的。Intlayer 基于 Apache 2.0 许可证开源，整个库、CLI、可视化编辑器和编译器均可免费使用，包括商业用途。托管版 CMS 是可选的付费服务，同时也完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
