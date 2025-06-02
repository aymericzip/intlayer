# 开始使用 Intlayer 和 Next.js 14 的 App Router 进行国际化 (i18n)

Смотрите [шаблон приложения](https://github.com/aymericzip/intlayer-next-14-template) на GitHub.

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用中的多语言支持。Intlayer 无缝集成了最新的 **Next.js 14** 框架，包括其强大的 **App Router**。它针对 **服务器组件** 的高效渲染进行了优化，并完全兼容 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)（适用于 Next.js >= 15）。

使用 Intlayer，您可以：

- **轻松管理翻译**，在组件级别使用声明式字典。
- **动态本地化元数据**、路由和内容。
- **在客户端和服务端组件中访问翻译**。
- **确保 TypeScript 支持**，通过自动生成的类型提高自动补全和错误检测能力。
- **享受高级功能**，如动态语言检测和切换。

> Intlayer 兼容 Next.js 12、13、14 和 15。如果您使用的是 Next.js Page Router，可以参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_page_router.md)。对于 Next.js 15（无论是否使用 turbopack），请参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

---

## 在 Next.js 应用中设置 Intlayer 的分步指南

### 第一步：安装依赖

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

  提供国际化工具的核心包，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md)。

- **next-intlayer**

  将 Intlayer 与 Next.js 集成的包。它为 Next.js 国际化提供上下文提供器和钩子。此外，它还包括一个 Next.js 插件，用于将 Intlayer 集成到 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 中，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第二步：配置您的项目

创建一个配置文件来配置您的应用语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// 配置文件示例
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
      // 您的其他语言
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
      // 您的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第三步：在 Next.js 配置中集成 Intlayer

配置您的 Next.js 设置以使用 Intlayer：

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 集成到 Next.js 中。它确保构建内容声明文件并在开发模式下监视它们。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它提供了别名以优化性能并确保与服务器组件的兼容性。

### 第四步：配置语言检测中间件

设置中间件以检测用户的首选语言：

```typescript fileName="src/middleware.ts" codeFormat="typescript"
// 中间件配置示例
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
// 中间件配置示例
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
// 中间件配置示例
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> `intlayerMiddleware` 用于检测用户的首选语言，并将其重定向到配置中指定的适当 URL（[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)）。此外，它支持将用户的首选语言保存到 Cookie 中。

> 根据您的应用路由调整 `matcher` 参数。有关更多详细信息，请参考 [Next.js 文档中的 matcher 配置](https://nextjs.org/docs/app/building-your-application/routing/middleware)。

### 第五步：定义动态语言路由

清空 `RootLayout` 的内容，并替换为以下代码：

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
// 根布局示例
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
// 根布局示例
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
// 根布局示例
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> 保持 `RootLayout` 组件为空，可以为 `<html>` 标签设置 [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) 和 [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 属性。

要实现动态路由，请通过在 `[locale]` 目录中添加一个新布局来提供语言路径：

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
// 动态语言布局示例
import type { Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);
---

import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

module.exports = LocaleLayout;
```

> `[locale]` 路径段用于定义语言环境。例如：`/en-US/about` 将引用 `en-US`，而 `/fr/about` 将引用 `fr`。

然后，在您的应用程序布局中实现 `generateStaticParams` 函数。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // 插入的行

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... 其余代码*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // 插入的行

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... 其余代码*/
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // 插入的行

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... 其余代码*/
};

module.exports = LocaleLayout;
```

> `generateStaticParams` 确保您的应用程序为所有语言环境预构建必要的页面，从而减少运行时计算并改善用户体验。有关更多详细信息，请参阅 [Next.js 关于 generateStaticParams 的文档](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)。

### 第六步：声明您的内容

创建和管理您的内容声明以存储翻译：

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
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

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
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

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
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
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "zh": "src/app/page.tsx",
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认情况下为 `./src`）。并匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。  
> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

### 第七步：在代码中使用内容

在整个应用程序中访问您的内容字典：

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <IntlayerClientProvider locale={locale}>
          <ServerComponentExample />
          <ClientComponentExample />
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`** 用于为客户端组件提供语言环境。它可以放置在任何父组件中，包括布局。然而，建议将其放置在布局中，因为 Next.js 在页面之间共享布局代码，这使其更高效。通过在布局中使用 `IntlayerClientProvider`，您可以避免为每个页面重新初始化它，从而提高性能并在整个应用程序中保持一致的本地化上下文。
- **`IntlayerServerProvider`** 用于为服务器子组件提供语言环境。它不能在布局中设置。

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
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

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
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

> 如果您想在 `string` 属性中使用内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用函数的值，例如：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解更多关于 `useIntlayer` 钩子的内容，请参考 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useIntlayer.md)。

### （可选）步骤 8：元数据的国际化

如果您想要国际化您的元数据，例如页面的标题，可以使用 Next.js 提供的 `generateMetadata` 函数。在函数内部使用 `getTranslation` 函数来翻译您的元数据。

````typescript fileName="src/app/[locale]/layout.tsx 或 src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  /**
   * 生成一个包含每种语言的所有 URL 的对象。
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
      zh: "我的标题",
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      zh: "我的描述",
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 其余代码
````

````javascript fileName="src/app/[locale]/layout.msx 或 src/app/[locale]/page.msx" codeFormat="javascript"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  /**
   * 生成一个包含每种语言的所有 URL 的对象。
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
    title: t({
      zh: "我的标题",
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      zh: "我的描述",
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 其余代码
````

````javascript fileName="src/app/[locale]/layout.cjs 或 src/app/[locale]/page.cjs" codeFormat="javascript"
const { getTranslation, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  /**
   * 生成一个包含每种语言的所有 URL 的对象。
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
    title: t({
      zh: "我的标题",
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      zh: "我的描述",
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 其余代码
````

> 了解更多关于元数据优化的内容，请参考 [Next.js 官方文档](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)。

### （可选）步骤 9：国际化您的 sitemap.xml 和 robots.txt

要国际化您的 `sitemap.xml` 和 `robots.txt`，可以使用 Intlayer 提供的 `getMultilingualUrls` 函数。此函数允许您为您的站点地图生成多语言 URL。

```tsx fileName="src/app/sitemap.ts"   codeFormat="typescript"
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

import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
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

````

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
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

module.exports = sitemap;
````

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

> 了解更多关于站点地图优化的信息，请访问 [Next.js 官方文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)。了解更多关于 robots.txt 优化的信息，请访问 [Next.js 官方文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)。

### （可选）步骤 10：更改内容的语言

要更改内容的语言，可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

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
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言在其自身的语言环境中 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境中的语言 - 例如 Francés，当当前语言环境设置为 Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

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
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言在其自身的语言环境中 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境中的语言 - 例如 Francés，当当前语言环境设置为 Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

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
            onClick={() =>
              setLocaleCookie(localeItem)
            }
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言在其自身的语言环境中 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境中的语言 - 例如 Francés，当当前语言环境设置为 Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英文中的语言 - 例如法语 */}
              {获取LocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> 文档参考:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### （可选）步骤11：创建一个本地化的链接组件

为了确保您的应用程序导航符合当前语言环境，您可以创建一个自定义的 `Link` 组件。该组件会自动为内部URL添加当前语言前缀。例如，当一个讲法语的用户点击“关于”页面的链接时，他们会被重定向到 `/fr/about` 而不是 `/about`。

这种行为有以下几个好处：

- **SEO和用户体验**: 本地化的URL帮助搜索引擎正确索引语言特定的页面，并为用户提供他们偏好的语言内容。
- **一致性**: 通过在整个应用程序中使用本地化链接，您可以保证导航保持在当前语言环境中，防止意外的语言切换。
- **可维护性**: 将本地化逻辑集中在一个组件中简化了URL的管理，使您的代码库更易于维护和扩展。

以下是一个用TypeScript实现的本地化 `Link` 组件：

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * 检查给定URL是否为外部链接的工具函数。
 * 如果URL以http://或https://开头，则被认为是外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义的Link组件，根据当前语言环境调整href属性。
 * 对于内部链接，它使用`getLocalizedUrl`为URL添加语言前缀（例如，/fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接并且提供了有效的href，则获取本地化URL。
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

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * 检查给定URL是否为外部链接的工具函数。
 * 如果URL以http://或https://开头，则被认为是外部链接。
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * 一个自定义的Link组件，根据当前语言环境调整href属性。
 * 对于内部链接，它使用`getLocalizedUrl`为URL添加语言前缀（例如，/fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接并且提供了有效的href，则获取本地化URL。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * 检查给定URL是否为外部链接的工具函数。
 * 如果URL以http://或https://开头，则被认为是外部链接。
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接并且提供了有效的href，则获取本地化URL。
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### 工作原理

- **检测外部链接**:  
  辅助函数 `checkIsExternalLink` 用于判断URL是否为外部链接。外部链接保持不变，因为它们不需要本地化。

- **获取当前语言环境**:  
  `useLocale` hook 提供当前语言环境（例如，法语为 `fr`）。

- **本地化URL**:  
  对于内部链接（即非外部链接），使用 `getLocalizedUrl` 自动为URL添加当前语言前缀。这意味着如果用户使用法语，传递 `/about` 作为 `href` 会被转换为 `/fr/about`。

- **返回链接**:  
  组件返回一个带有本地化URL的 `<a>` 元素，确保导航与语言环境一致。

通过在整个应用程序中集成此 `Link` 组件，您可以维护一致的语言感知用户体验，同时受益于改进的SEO和可用性。

### （可选）步骤 12：优化您的包大小

使用 `next-intlayer` 时，字典默认包含在每个页面的包中。为了优化包大小，Intlayer 提供了一个可选的 SWC 插件，该插件通过宏智能地替换 `useIntlayer` 调用。这确保字典仅包含在实际使用它们的页面包中。

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
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略由 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库中。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略由 Intlayer 生成的文件
.intlayer
```

### 更进一步
