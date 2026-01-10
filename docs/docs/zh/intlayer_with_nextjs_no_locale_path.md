---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: 如何翻译你的 Next.js 16 应用（页面路径中不包含 [locale]） – i18n 指南 2026
description: 了解如何在页面路径中不包含 [locale] 的情况下，让你的 Next.js 16 网站支持多语言。按照文档进行国际化 (i18n) 并进行翻译。
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
  - version: 1.0.0
    date: 2026-01-10
    changes: 初始发布
---

# 使用 Intlayer 翻译你的 Next.js 16 网站（页面路径中不包含 [locale]） | 国际化 (i18n)

<Tab defaultTab="video">
  <TabItem label="视频" value="video">
  
<iframe title="适用于 Next.js 的最佳 i18n 解决方案？探索 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="代码" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 使用 Intlayer 国际化您的应用"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

查看 GitHub 上的 [应用模板](https://github.com/aymericzip/intlayer-next-no-lolale-path-template)。

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代 Web 应用的多语言支持。Intlayer 与最新的 **Next.js 16** 框架无缝集成，包括其强大的 **App Router**。它针对 **Server Components** 进行了优化以实现高效渲染，并且与 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) 完全兼容。

使用 Intlayer，您可以：

- **通过组件级的声明式字典，轻松管理翻译。**
- **动态本地化元数据**、路由和内容。
- **在客户端和服务器端组件中都能访问翻译。**
- **通过自动生成的类型确保 TypeScript 支持**，提升自动补全和错误检测。
- **利用高级功能**，如动态语言检测和切换。

> Intlayer 与 Next.js 12、13、14 和 16 兼容。如果您使用 Next.js Page Router，可参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)。对于使用 App Router 的 Next.js 12、13、14，请参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_14.md)。

---

## 在 Next.js 应用中设置 Intlayer 的逐步指南

### 第一步：安装依赖

使用 npm 安装所需的包：

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译以及[CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 的国际化工具。

- **next-intlayer**

将 Intlayer 与 Next.js 集成的包。它为 Next.js 的国际化提供了 context providers（上下文提供者）和 hooks（钩子）。此外，它还包含用于将 Intlayer 集成到 Webpack 或 Turbopack 的 Next.js 插件，以及用于检测用户首选 locale、管理 cookies 和处理 URL 重定向的 proxy。

### 步骤 2：配置您的项目

下面是我们将创建的最终结构：

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

> 如果你不想使用区域路由，intlayer 可以作为一个简单的 provider / hook 来使用。更多细节参见 [本指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_no_locale_path.md)。

创建一个配置文件来配置应用的语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
    mode: "search-params", // 或 `no-prefix` - 对中间件检测有用
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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
    mode: "search-params", // 或 `no-prefix` - 对中间件检测有用
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 你的其他 locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // 或 `no-prefix` - 对中间件检测有用
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化 URL、代理重定向、cookie 名称、内容声明的位置和扩展名、在控制台禁用 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 3 步：在 Next.js 配置中集成 Intlayer

配置您的 Next.js 设置以使用 Intlayer：

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 在此处填写配置选项 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 在此处添加配置选项 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 在此处添加配置选项 */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 集成到 Next.js 中。它负责构建内容声明文件，并在开发模式下监视这些文件。它会在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 的环境变量。此外，它还提供别名以优化性能，并确保与 server components 的兼容性。

> `withIntlayer()` 函数是一个返回 Promise 的函数。它允许在构建开始前准备 intlayer 字典。如果你想与其他插件一起使用它，可以对其使用 await。示例：
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 如果你想以同步方式使用它，可以使用 `withIntlayerSync()` 函数。示例：
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer 会根据命令行标志 `--webpack`、`--turbo` 或 `--turbopack` 以及你当前的 **Next.js** 版本自动检测项目是使用 **webpack** 还是 **Turbopack**。
>
> 自 `next>=16` 起，如果你使用 **Rspack**，必须通过禁用 Turbopack 明确强制 Intlayer 使用 webpack 配置：
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### 第4步：定义动态 locale 路由

从 `RootLayout` 中删除所有内容，并用下面的代码替换：

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
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
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
import { headers, cookies } from "next/headers";
export { generateStaticParams } from "next/intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  // 在 Next.js 15+ 中等待 headers 和 cookies
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 首先检查 intlayer cookie（默认: 'INTLAYER_LOCALE'）
    getCookie: (name) => cookieList.get(name)?.value,

    // 然后检查 intlayer header（默认: 'x-intlayer-locale'）
    // 最后检查 accept-language 请求头（'accept-language'）
    getHeader: (name) => headerList.get(name),
  });

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { headers, cookies } = require("next/headers");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  // 在 Next.js 15+ 中等待 headers 和 cookies
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 首先检查 intlayer cookie（默认: 'INTLAYER_LOCALE'）
    getCookie: (name) => cookieList.get(name)?.value,

    // 然后检查 intlayer header（默认: 'x-intlayer-locale'）
    // 最后检查 accept-language header（'accept-language'）
    getHeader: (name) => headerList.get(name),
  });

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### 步骤 5：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat="typescript"
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
      zh: "了解我们创新的平台，旨在简化您的工作流程并提高生产力。",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      zh: "探索我们的创新平台，旨在简化您的工作流程并提升生产力。",
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

```tsx fileName="src/app/metadata.content.mjs" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
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
      zh: "探索我们创新的平台，旨在简化您的工作流程并提高生产力。",
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
};

export default metadataContent;
```

```javascript fileName="src/app/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
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
      zh: "了解我们的创新平台，旨在简化您的工作流程并提升生产力。",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      zh: ["创新", "生产力", "工作流", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

module.exports = metadataContent;
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
        "zh": "探索我们创新的平台，旨在简化您的工作流程并提升生产力。",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "zh": "探索我们的创新平台，旨在简化您的工作流程并提升您的生产力。",
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

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default pageContent;
```

```javascript fileName="src/app/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = pageContent;
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

> 你的内容声明可以在应用的任何位置定义，只要它们被包含到 `contentDir` 目录（默认 `./src`）中。并且与内容声明文件扩展名匹配（默认 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 有关详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 步骤 6：在代码中使用内容

在应用程序中随处访问你的内容字典：

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
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
  // 在 Next.js 15+ 中等待 headers 和 cookies
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 首先检查 intlayer cookie（默认: 'INTLAYER_LOCALE'）
    getCookie: (name) => cookieList.get(name)?.value,

    // 然后检查 intlayer header（默认：'x-intlayer-locale'）
    // 最后检查 accept-language header（'accept-language'）
    getHeader: (name) => headerList.get(name),
  });

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

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { headers, cookies } from "next/headers";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async () => {

  // 在 Next.js 15+ 中等待 headers 和 cookies
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 首先检查 intlayer cookie（默认：'INTLAYER_LOCALE'）
    getCookie: (name) => cookieList.get(name)?.value,

    // 然后检查 intlayer header（默认：'x-intlayer-locale'）
    // 最后检查 accept-language 头（'accept-language'）
    getHeader: (name) => headerList.get(name),
  });

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

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // 在 Next.js 15+ 中等待 headers 和 cookies
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 首先检查 intlayer cookie（默认: 'INTLAYER_LOCALE'）
    getCookie: (name) => cookieList.get(name)?.value,

    // 然后检查 intlayer header（默认: 'x-intlayer-locale'）
    // 最后检查 accept-language header（'accept-language'）
    getHeader: (name) => headerList.get(name),
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** 用于将 locale 提供给客户端组件。它可以放在任何父组件中，包括 layout。然而，建议将其放在 layout 中，因为 Next.js 在页面之间会共享 layout 代码，这样更高效。将 `IntlayerClientProvider` 放在 layout 中可以避免为每个页面重新初始化，从而提高性能并在整个应用中保持一致的本地化上下文。
- **`IntlayerServerProvider`** 用于将 locale 提供给服务端子组件。它不能设置在 layout 中。

> Layout 和 page 不能共享同一个 server context，因为 server context 系统基于每次请求的数据存储（通过 [React's cache](https://react.dev/reference/react/cache) 机制），导致每个 "context" 会为应用的不同部分被重新创建。将 provider 放在共享 layout 中会破坏此隔离，阻止 server context 值正确传播到你的 server components。

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.mjx" codeFormat="esm"
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

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.csx" codeFormat="commonjs"
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

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

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

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 如果您想在 `string` 属性（例如 `alt`、`title`、`href`、`aria-label` 等）中使用内容，必须调用函数的值，例如：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 若要了解有关 `useIntlayer` hook 的更多信息，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)。

### （可选）步骤 7：配置 Proxy 以进行 locale 检测

设置 Proxy 以检测用户的首选 locale：

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy` 用于检测用户偏好的 locale，并根据 [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 将用户重定向到相应的 URL。除此之外，它还可以将用户偏好的 locale 保存在 cookie 中。

> 如果需要将多个代理串联在一起（例如将 `intlayerProxy` 与身份验证或自定义代理一起使用），Intlayer 现在提供了一个名为 `multipleProxies` 的辅助函数。

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### （可选）步骤 8：更改您内容的语言

要在 Next.js 中更改内容的语言，推荐的方法是使用 `Link` 组件将用户重定向到相应的本地化页面。`Link` 组件支持页面预取，这有助于避免整页重新加载。

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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
              {/* Locale（例如：FR） */}
              {localeItem}
            </span>
            <span>
              {/* 以该语言自身的 Locale 表示的语言名称（例如：Français） */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 以当前 Locale 表示的语言名称 — 例如：当当前 locale 设置为 Locales.SPANISH 时显示：Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 以英语显示的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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
              {/* Locale 缩写 - 例如：FR */}
              {localeItem}
            </span>
            <span>
              {/* 以该语言自身的 Locale 表示的语言 - 例如：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 以当前 Locale 表示的语言 - 例如（当当前 locale 为 Locales.SPANISH 时）：Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 以英文表示的语言 - 例如：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

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
              {/* 区域（Locale）- 例如：FR */}
              {localeItem}
            </span>
            <span>
              {/* 以该语言自身显示的语言名 - 例如：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 以当前区域显示的语言名 - 例如：在当前区域设为 Locales.SPANISH 时显示 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 以英语显示的语言名 - 例如：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> 另一种方法是使用 `useLocale` hook 提供的 `setLocale` 函数。此函数不会允许预获取页面。有关更多详细信息，请参阅 [`useLocale` hook 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)。

> 文档参考：
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

###（可选）步骤 9：在 Server Actions 中获取当前 locale

如果你需要在 Server Action 中使用活动 locale（例如，用于本地化电子邮件或运行与 locale 相关的逻辑），请从 `next-intlayer/server` 调用 `getLocale`：

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // 使用该 locale 执行一些操作
};
```

> `getLocale` 函数采用级联策略来确定用户的语言环境：
>
> 1. 首先，它会检查请求头中是否存在可能由代理设置的 locale 值
> 2. 如果在请求头中未找到 locale，则查找存储在 cookies 中的 locale
> 3. 如果未找到 cookie，它会尝试从用户的浏览器设置中检测首选语言
> 4. 最后，它会回退到应用程序配置的默认 locale
>
> 这可确保基于可用上下文选择最合适的 locale。

### （可选）步骤 10：优化你的 bundle 大小

在使用 `next-intlayer` 时，字典默认会被包含到每个页面的 bundle 中。为了优化 bundle 大小，Intlayer 提供了一个可选的 SWC 插件，它使用宏智能替换 `useIntlayer` 调用。这样只有实际使用这些字典的页面的 bundle 才会包含相应字典。

要启用此优化，请安装 `@intlayer/swc` 包。安装后，`next-intlayer` 会自动检测并使用该插件：

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> 注意：此优化仅适用于 Next.js 13 及更高版本。

> 注意：该包默认不安装，因为 SWC 插件在 Next.js 中仍然是实验性的。将来可能会发生变化。

> 注意：如果你将选项设置为 `importMode: 'dynamic'` 或 `importMode: 'live'`，它将依赖 Suspense，因此你必须在一个 `Suspense` 边界中包裹你的 `useIntlayer` 调用。这意味着你不能在页面 / 布局组件的顶层直接使用 `useIntlayer`。

### 在 Turbopack 上监视字典更改

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
