# 开始使用 Intlayer 和 Next.js 14 的国际化 (i18n)

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 веб 应用程序中的多语言支持。Intlayer 无缝集成最新的 **Next.js 14** 框架，包括其强大的 **App Router**。它经过优化以与 **Server Components** 一起高效渲染，并且与 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) （从 Next.js >= 15）完全兼容。

使用 Intlayer，您可以：

- **轻松管理翻译**，使用声明式字典在组件级别进行管理。
- **动态本地化元数据、路由和内容**。
- **在客户端和服务器端组件中访问翻译**。
- **确保 TypeScript 支持**，通过自动生成类型，改善自动补全和错误检测。
- **受益于高级功能**，如动态语言检测和切换。

> 注意：Intlayer 兼容 Next.js 12、13、14 和 15。如果您使用 Next.js 页面路由，可以参考这个 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_page_router.md)。有关 Next.js 15 的信息（无论是否使用 turbopack），请参考这个 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

---

## 在 Next.js 应用程序中设置 Intlayer 的逐步指南

### 第 1 步：安装依赖

使用 npm 安装必要的包：

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### 第 2 步：配置您的项目

创建一个配置文件来配置您应用程序的语言：

```typescript
// intlayer.config.ts

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

要查看所有可用参数，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第 3 步：在您的 Next.js 配置中集成 Intlayer

配置您的 Next.js 设置以使用 Intlayer：

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### 第 4 步：配置用于语言检测的中间件

设置中间件以检测用户的首选语言：

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### 第 5 步：定义动态语言路由

实现本地化内容的动态路由：

将 `src/app/page.ts` 更改为 `src/app/[locale]/page.ts`

然后，在您的应用程序布局中实现 `generateStaticParams` 函数。

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // 插入的行

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

然后在您的 `[locale]` 目录中添加一个新布局：

```tsx
// src/app/[locale]/layout.tsx

import { type Next14LayoutIntlayer } from "next-intlayer";
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

export default LocaleLayout;
```

### 第 6 步：声明您的内容

创建和管理您的内容字典：

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

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
} satisfies DeclarationContent;

export default pageContent;
```

[查看如何声明您的 Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。

### 第 7 步：在您的代码中使用内容

在您的应用程序中访问内容字典：

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
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
      {/**
       *   IntlayerServerProvider 用于将语言提供给服务器子组件
       *   如果在布局中设置则无效
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider 用于将语言提供给客户端子组件
       *   可以在任何父组件中设置，包括布局
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 创建相关内容声明

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 注意：如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用函数的值，如下所示：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

有关在客户端或服务器组件中使用 Intlayer 的更详细信息，请参见 [这里的 nextJS 示例](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx)。

### （可选）第 8 步：国际化您的元数据

如果您想要国际化您的元数据，例如页面标题，可以使用 NextJS 提供的 `generateMetadata` 函数。在函数内部使用 `getTranslationContent` 函数来翻译您的元数据。

````typescript
// src/app/[locale]/layout.tsx 或 src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const url = `/`;

  /**
   * 生成一个包含每个语言的所有 url 的对象。
   *
   * 示例：
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // 返回
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * 获取当前语言的本地化 URL
   *
   * 示例：
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * 返回：
   * '/fr/about' 对于法语语言
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: multilingualUrls,
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... 其余代码
````

> 了解有关元数据优化的更多信息 [在官方 Next.js 文档中](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)。

### （可选）第 9 步：国际化您的网站地图

要国际化您的网站地图，您可以使用 Intlayer 提供的 `getMultilingualUrls` 函数。此函数允许您为您的网站地图生成多语言 URL。

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> 了解有关网站地图优化的更多信息 [在官方 Next.js 文档中](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)。

### （可选）第 10 步：更改内容语言

要更改内容语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言并相应地更新内容。

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return <button onClick={() => setLocale(Locales.English)}>更改语言</button>;
};
```

### 配置 TypeScript

Intlayer 使用模块增强功能以获得 TypeScript 的好处，使您的代码库更强大。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的 TypeScript 配置包括自动生成的类型。

```json5
// tsconfig.json

{
  // 您的自定义配置
  include: [
    "src",
    "types", // <- 包括自动生成的类型
  ],
}
```

### Git 配置

建议忽略由 Intlayer 生成的文件。这使您能够避免将它们提交到 Git 仓库。

为此，您可以将以下指令添加到您的 `.gitignore` 文件中：

```gitignore
# 忽略由 Intlayer 生成的文件
.intlayer
```
