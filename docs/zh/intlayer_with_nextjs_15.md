# 开始使用 Intlayer 和 Next.js 15 App Router 进行国际化 (i18n)

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。Intlayer 无缝集成了最新的 **Next.js 15** 框架，包括其强大的 **App Router**。它针对 **Server Components** 进行了高效渲染优化，并完全兼容 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)。

使用 Intlayer，您可以：

- **轻松管理翻译**，在组件级别使用声明式字典。
- **动态本地化元数据**、路由和内容。
- **在客户端和服务端组件中访问翻译**。
- **确保 TypeScript 支持**，通过自动生成的类型提高自动补全和错误检测能力。
- **享受高级功能**，如动态语言检测和切换。

> Intlayer 兼容 Next.js 12、13、14 和 15。如果您使用的是 Next.js Page Router，可以参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_page_router.md)。对于使用 App Router 的 Next.js 12、13、14，请参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_14.md)。

---

## 在 Next.js 应用中设置 Intlayer 的分步指南

### 第 1 步：安装依赖项

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 的国际化工具的核心包。

- **next-intlayer**

  将 Intlayer 与 Next.js 集成的包。它为 Next.js 国际化提供上下文提供者和钩子。此外，它还包括用于将 Intlayer 与 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 集成的 Next.js 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：配置您的项目

创建一个配置文件来配置您的应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// 配置文件示例
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
// 配置文件示例
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
// 配置文件示例
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第 3 步：在 Next.js 配置中集成 Intlayer

配置您的 Next.js 设置以使用 Intlayer：

```typescript filename="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 配置选项 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 配置选项 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 配置选项 */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 与 Next.js 集成。它确保构建内容声明文件并在开发模式下监视它们。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它提供了优化性能的别名，并确保与服务端组件的兼容性。

### 第 4 步：定义动态语言路由

从 `RootLayout` 中删除所有内容，并将其替换为以下代码：

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> 保持 `RootLayout` 组件为空，允许设置 `<html>` 标签的 [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) 和 [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 属性。

要实现动态路由，请通过在 `[locale]` 目录中添加新布局来提供语言路径：

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> `[locale]` 路径段用于定义语言。例如：`/en-US/about` 将指向 `en-US`，而 `/fr/about` 将指向 `fr`。

然后，在您的应用程序布局中实现 `generateStaticParams` 函数。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // 插入的行

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... 其余代码*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // 插入的行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 其余代码*/
};

// ... 其余代码
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // 插入的行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 其余代码*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` 确保您的应用程序为所有语言预构建必要的页面，从而减少运行时计算并改善用户体验。有关更多详细信息，请参阅 [Next.js 文档关于 generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)。

### 第 5 步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        zh: "通过编辑开始",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        zh: "通过编辑开始",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        zh: "通过编辑开始",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
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
        "es": "Comience por editar",
        "zh": "通过编辑开始"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx",
        "zh": "src/app/page.tsx"
      }
    }
  }
}
```

> 您的内容声明可以定义在应用程序的任何位置，只要它们包含在 `contentDir` 目录中（默认情况下为 `./src`）。并匹配内容声明文件扩展名（默认情况下为 `.content.{ts,tsx,js,jsx,mjs,cjs}`）。
> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

### 第 6 步：在代码中使用内容

在应用程序中访问您的内容字典：

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const { title, content } = useIntlayer("page");

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

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** 用于为客户端组件提供语言环境。它可以放置在任何父组件中，包括布局中。然而，建议将其放置在布局中，因为 Next.js 在页面之间共享布局代码，使其更高效。通过在布局中使用 `IntlayerClientProvider`，您可以避免为每个页面重新初始化它，从而提高性能并在整个应用程序中保持一致的本地化上下文。
- **`IntlayerServerProvider`** 用于为服务端子组件提供语言环境。它不能在布局中设置。

  > 布局和页面不能共享公共的服务端上下文，因为服务端上下文系统基于每个请求的数据存储（通过 [React 的缓存](https://react.dev/reference/react/cache) 机制），导致应用程序的不同段会重新创建每个“上下文”。将提供者放置在共享布局中会破坏这种隔离，阻止服务端上下文值正确传播到您的服务端组件。

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title} </h2>
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
      <h2>{content.title} </h2>
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
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用函数的值，例如：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useIntlayer.md)。

### (可选) 第 7 步：配置中间件以检测语言环境

设置中间件以检测用户的首选语言：

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> `intlayerMiddleware` 用于检测用户的首选语言并将其重定向到配置中指定的适当 URL。此外，它还支持将用户的首选语言保存在 Cookie 中。

### (可选) 第 8 步：国际化您的元数据

如果您希望国际化您的元数据，例如页面标题，可以使用 Next.js 提供的 `generateMetadata` 函数。在函数内部使用 `getTranslation` 函数来翻译您的元数据。

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  /**
   * 生成包含每种语言的所有 URL 的对象。
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

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
      zh: "我的标题",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      zh: "我的描述",
    }),
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 其余代码
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  /**
   * 生成包含每种语言的所有 URL 的对象。
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

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
      zh: "我的标题",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      zh: "我的描述",
    }),
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 其余代码
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  /**
   * 生成包含每种语言的所有 URL 的对象。
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

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
      zh: "我的标题",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      zh: "我的描述",
    }),
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

module.exports = { generateMetadata };

// ... 其余代码
````

> 了解有关元数据优化的更多信息 [官方 Next.js 文档](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)。

### (可选) 第 9 步：国际化您的 sitemap.xml 和 robots.txt

要国际化您的 `sitemap.xml` 和 `robots.txt`，您可以使用 Intlayer 提供的 `getMultilingualUrls` 函数。此函数允许您为您的站点地图生成多语言 URL。

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
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

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
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

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> 了解有关站点地图优化的更多信息 [官方 Next.js 文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)。了解有关 robots.txt 优化的更多信息 [官方 Next.js 文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)。

### (可选) 第 10 步：更改内容的语言

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 语言代码 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言名称（自身语言） - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境的语言名称 - 例如 Francés（当前语言环境为 Locales.SPANISH） */}
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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
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
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 语言代码 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言名称（自身语言） - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境的语言名称 - 例如 Francés（当前语言环境为 Locales.SPANISH） */}
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
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
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 语言代码 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言名称（自身语言） - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境的语言名称 - 例如 Francés（当前语言环境为 Locales.SPANISH） */}
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

> 文档参考：
>
> - [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh)
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (可选) 第 11 步：创建本地化链接组件

为了确保您的应用程序导航遵循当前语言环境，您可以创建一个自定义 `Link` 组件。此组件会自动为内部 URL 添加当前语言的前缀。例如，当法语用户点击 "About" 页面链接时，他们会被重定向到 `/fr/about` 而不是 `/about`。

此行为的好处包括：

- **SEO 和用户体验**：本地化 URL 帮助搜索引擎正确索引语言特定的页面，并为用户提供其首选语言的内容。
- **一致性**：通过在整个应用程序中使用本地化链接，您可以确保导航保持在当前语言环境中，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在一个组件中，可以简化 URL 的管理，使您的代码库更易于维护和扩展。

以下是一个本地化 `Link` 组件的实现：

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * 检查给定 URL 是否为外部链接的工具函数。
 * 如果 URL 以 http:// 或 https:// 开头，则认为是外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 自定义 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言前缀（例如 /fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接并且提供了有效的 href，则获取本地化 URL。
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * 检查给定 URL 是否为外部链接的工具函数。
 * 如果 URL 以 http:// 或 https:// 开头，则认为是外部链接。
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 自定义 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言前缀（例如 /fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接并且提供了有效的 href，则获取本地化 URL。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * 检查给定 URL 是否为外部链接的工具函数。
 * 如果 URL 以 http:// 或 https:// 开头，则认为是外部链接。
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 自定义 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言前缀（例如 /fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接并且提供了有效的 href，则获取本地化 URL。
  const hrefI18n =
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
  帮助函数 `checkIsExternalLink` 确定 URL 是否为外部链接。外部链接保持不变，因为它们不需要本地化。

- **检索当前语言环境**：  
  `useLocale` 钩子提供当前语言环境（例如，法语为 `fr`）。

- **本地化 URL**：  
  对于内部链接（即非外部链接），使用 `getLocalizedUrl` 自动为 URL 添加当前语言前缀。这意味着如果用户使用法语，传递 `/about` 作为 `href` 将转换为 `/fr/about`。

- **返回链接**：  
  组件返回一个带有本地化 URL 的 `<a>` 元素，确保导航与语言环境一致。

通过在整个应用程序中集成此 `Link` 组件，您可以维护一致且语言感知的用户体验，同时受益于改进的 SEO 和可用性。

### 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更强大。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包括自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库中。

为此，您可以在 `.gitignore` 文件中添加以下指令：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### 深入了解

要进一步了解，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_CMS.md) 外部化您的内容。
