# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## What is Intlayer?

**Intlayer** 是一个创新的、开源的国际化 (i18n) 库，旨在简化现代网络应用中的多语言支持。Intlayer 无缝集成最新的 **Next.js 15** 框架，包括其强大的 **App Router**。它经过优化，可以与 **Server Components** 一起高效渲染，并完全兼容 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)。

使用 Intlayer，您可以：

- **轻松管理翻译**，使用声明式字典在组件级别进行管理。
- **动态本地化元数据**、路由和内容。
- **在客户端和服务器端组件中访问翻译**。
- **确保 TypeScript 支持**，具有自动生成的类型，提高了自动补全和错误检测能力。
- **受益于高级功能**，如动态区域检测和切换。

> 注意：Intlayer 兼容 Next.js 12、13、14 和 15。如果您使用 Next.js Page Router，可以参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_page_router.md)。对于 Next.js 12、13、14 与 App Router，请参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_14.md)。

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

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

### Step 2: Configure Your Project

创建配置文件以配置您应用程序的语言：

```typescript
// intlayer.config.ts

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

要查看所有可用参数，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### Step 3: Integrate Intlayer in Your Next.js Configuration

配置您的 Next.js 设置以使用 Intlayer：

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

设置中间件以检测用户的首选语言：

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

实现本地化内容的动态路由：

将 `src/app/page.ts` 改为 `src/app/[locale]/page.ts`

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

然后在 `[locale]` 目录中添加一个新布局：

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
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

### Step 6: Declare Your Content

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

### Step 7: Utilize Content in Your Code

在您的应用程序中访问内容字典：

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
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

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       *   IntlayerServerProvider 用于为服务器子组件提供语言环境
       *   如果在布局中设置则不工作
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider 用于为客户端子组件提供语言环境
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

> 注意：如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用该函数的值，例如：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

有关在 Client 或 Server 组件中使用 intlayer 的更详细用法，请参见 [nextJS 示例](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx)。

### (Optional) Step 8: Internationalization of your metadata

如果您想国际化您的元数据，例如页面标题，可以使用 NextJS 提供的 `generateMetadata` 函数。在该函数内使用 `getTranslationContent` 函数来翻译您的元数据。

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
   * 生成一个包含每种语言的所有 url 的对象。
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
   * 获取当前语言环境的本地化 URL
   *
   * 示例：
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * 返回：
   * '/fr/about' 对于法语语言环境
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

> 在官方 Next.js 文档中了解有关元数据优化的更多信息 [这里](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)。

### (Optional) Step 9: Internationalization of your sitemap

要国际化您的网站地图，您可以使用 Intlayer 提供的 `getMultilingualUrls` 函数。此函数允许您为网站地图生成多语言 URLs。

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

> 在官方 Next.js 文档中了解有关网站地图优化的更多信息 [这里](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)。

### (Optional) Step 10: Change the language of your content

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应更新内容。

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return <button onClick={() => setLocale(Locales.English)}>更改语言</button>;
};
```

### Configure TypeScript

Intlayer 使用模块扩展以利用 TypeScript 的优势并使您的代码库更强大。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的 TypeScript 配置包含自动生成的类型。

```json5
// tsconfig.json

{
  // 您自定义的配置
  include: [
    "src",
    "types", // <- 包括自动生成的类型
  ],
}
```

### Git Configuration

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```gitignore
# 忽略 Intlayer 生成的文件
.intlayer
```
