# Getting Started internationalizing (i18n) with Intlayer and Next.js 14 with App Router

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代 Web 应用程序中的多语言支持。Intlayer 无缝集成了最新的 **Next.js 14** 框架，包括其强大的 **App Router**。它针对 **Server Components** 进行了优化，以实现高效渲染，并完全兼容 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)（从 Next.js >= 15 开始）。

使用 Intlayer，您可以：

- **轻松管理翻译**，在组件级别使用声明式字典。
- **动态本地化元数据**、路由和内容。
- **在客户端和服务端组件中访问翻译**。
- **确保 TypeScript 支持**，通过自动生成的类型提高自动补全和错误检测能力。
- **享受高级功能**，如动态语言检测和切换。

> Intlayer 兼容 Next.js 12、13、14 和 15。如果您使用的是 Next.js Page Router，可以参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_page_router.md)。对于带或不带 turbopack 的 Next.js 15，请参考此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

---

## 在 Next.js 应用中设置 Intlayer 的分步指南

### 第 1 步：安装依赖

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

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第 3 步：在您的 Next.js 配置中集成 Intlayer

配置您的 Next.js 设置以使用 Intlayer：

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 与 Next.js 集成。它确保构建内容声明文件并在开发模式下监视它们。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它提供了优化性能的别名，并确保与服务端组件的兼容性。

### 第 4 步：配置用于语言检测的中间件

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

> 调整 `matcher` 参数以匹配您的应用程序的路由。有关更多详细信息，请参阅 [Next.js 文档关于配置 matcher 的部分](https://nextjs.org/docs/app/building-your-application/routing/middleware)。

### 第 5 步：定义动态语言路由

从 `RootLayout` 中删除所有内容，并将其替换为以下代码：

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> 保持 `RootLayout` 组件为空允许设置 [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) 和 [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 属性到 `<html>` 标签。

要实现动态路由，请通过在 `[locale]` 目录中添加新布局来提供语言路径：

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
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

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
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

> `[locale]` 路径段用于定义语言。例如：`/en-US/about` 将引用 `en-US`，而 `/fr/about` 将引用 `fr`。

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

> `generateStaticParams` 确保您的应用程序为所有语言预构建必要的页面，从而减少运行时计算并改善用户体验。有关更多详细信息，请参阅 [Next.js 文档关于 generateStaticParams 的部分](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)。

### 第 6 步：声明您的内容

创建并管理您的内容声明以存储翻译：
