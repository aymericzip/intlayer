# 开始使用 Intlayer 和 Next.js 14 进行国际化 (i18n)

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。Intlayer 与最新的 **Next.js 14** 框架无缝集成，包括其强大的 **App Router**。它已优化以与 **Server Components** 一起高效渲染，并完全兼容 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)（从 Next.js >= 15 开始）。

使用 Intlayer，您可以：

- **轻松管理翻译**，通过组件级的声明性字典。
- **动态本地化元数据**、路由和内容。
- **在客户端和服务器端组件中访问翻译**。
- **确保 TypeScript 支持**，通过自动生成类型，改善自动完成和错误检测。
- **享受高级功能**，例如动态语言检测和切换。

> 注意：Intlayer 与 Next.js 12、13、14 和 15 兼容。如果您使用 Next.js 页面路由，您可以参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_page_router.md)。有关带有或不带 turbopack 的 Next.js 15，请参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

---

## 在 Next.js 应用程序中设置 Intlayer 的分步指南

### 步骤 1：安装依赖项

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

### 步骤 2：配置您的项目

创建一个配置文件以配置您应用程序的语言：

```typescript
// intlayer.config.ts

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

要查看所有可用参数，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 步骤 3：在您的 Next.js 配置中集成 Intlayer

配置您的 Next.js 设置以使用 Intlayer：

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### 步骤 4：配置用于语言检测的中间件

设置中间件以检测用户的首选语言：

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### 步骤 5：定义动态语言路由

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

### 步骤 6：声明您的内容

创建并管理您的内容字典：

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

### 步骤 7：在您的代码中利用内容

在整个应用程序中访问您的内容字典：

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
       *   如果在布局中设置则无法工作
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

> 注意：如果您希望在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用该函数的值，例如：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

有关如何更详细地使用 intlayer 在客户端或服务器组件中，请参阅 [Next.js 示例](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx)。

### （可选）步骤 8：国际化您的元数据

如果您想国际化您的元数据，例如页面的标题，您可以使用 Next.js 提供的 `generateMetadata` 函数。在函数内部使用 `getTranslationContent` 函数来翻译您的元数据。

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

  /**
   * 生成一个对象，包含所有语言的 url。
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
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 其余代码
````

> 详细了解元数据优化的内容，请参见 [官方 Next.js 文档](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)。

### （可选）步骤 9：国际化您的 sitemap.xml 和 robots.txt

要国际化您的 `sitemap.xml` 和 `robots.txt`，您可以使用 Intlayer 提供的 `getMultilingualUrls` 函数。此函数允许您为您的站点地图生成多语言 URL。

```tsx
// src/app/sitemap.ts

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

```tsx
// src/app/robots.ts
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

> 详细了解站点地图优化的内容，请参见 [官方 Next.js 文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)。有关 robots.txt 优化的详细信息，请参见 [官方 Next.js 文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)。

### （可选）步骤 10：更改内容的语言

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言并相应更新内容。

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return <button onClick={() => setLocale(Locales.English)}>更改语言</button>;
};
```

### 配置 TypeScript

Intlayer 使用模块扩展来获得 TypeScript 的优点并增强您的代码库。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的 TypeScript 配置包括自动生成的类型。

```json5
// tsconfig.json

{
  // 您的自定义配置
  include: [
    "src",
    "types", // <- 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下指令添加到您的 `.gitignore` 文件中：

```gitignore
# 忽略 Intlayer 生成的文件
.intlayer
```
