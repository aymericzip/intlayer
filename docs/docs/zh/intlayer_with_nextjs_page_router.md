---
createdAt: 2024-12-07
updatedAt: 2025-06-29
title: 如何翻译您的Next.js and Page Router应用 – i18n指南 2025
description: 了解如何使使用 Page Router 的 Next.js 网站支持多语言。按照文档进行国际化（i18n）和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Page Router
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - next-with-page-router
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 使用Intlayer翻译您的Next.js and Page Router | 国际化(i18n)

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代 Web 应用中的多语言支持。Intlayer 无缝集成了最新的 **Next.js** 框架，包括其传统的 **Page Router**。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **确保 TypeScript 支持**，通过自动生成类型，提高自动补全和错误检测能力。
- **享受高级功能**，如动态语言环境检测和切换。

> Intlayer 兼容 Next.js 12、13、14 和 15。如果您使用的是 Next.js App Router，请参考 [App Router 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_14.md)。对于 Next.js 15，请参阅此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)。

---

## 使用 Page Router 在 Next.js 应用中设置 Intlayer 的分步指南

### 第一步：安装依赖

使用您喜欢的包管理器安装必要的包：

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

核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)、转译和[命令行工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)的国际化工具。

- **next-intlayer**

  将 Intlayer 与 Next.js 集成的包。它提供了 Next.js 国际化的上下文提供者和钩子。此外，还包含用于将 Intlayer 集成到 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 的 Next.js 插件，以及用于检测用户首选语言环境、管理 Cookie 和处理 URL 重定向的中间件。

### 第2步：配置您的项目

创建一个配置文件以定义您的应用程序支持的语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在这里添加您的其他语言
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
      // 在这里添加其他语言环境
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
      // 在这里添加其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 3 步：将 Intlayer 集成到 Next.js 配置中

修改您的 Next.js 配置以集成 Intlayer：

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 您现有的 Next.js 配置
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 集成到 Next.js 中。它确保内容声明文件的构建，并在开发模式下监视这些文件。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它提供别名以优化性能，并确保与服务器组件的兼容性。

### 第四步：配置中间件以检测语言环境

设置中间件以自动检测并处理用户的首选语言环境：

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

> 调整 `matcher` 参数以匹配您的应用程序路由。更多详情，请参阅 [Next.js 关于配置 matcher 的文档](https://nextjs.org/docs/app/building-your-application/routing/middleware)。

### 第5步：定义动态本地化路由

实现动态路由，根据用户的语言环境提供本地化内容。

1.  **创建特定语言环境的页面：**

    重命名您的主页面文件，包含 `[locale]` 动态段。

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **更新 `_app.tsx` 以处理本地化：**

        修改您的 `_app.tsx`，添加 Intlayer 提供者。

        ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
        import type { FC } from "react";
        import type { AppProps } from "next/app";
        import { IntlayerClientProvider } from "next-intlayer";

        const App = FC<AppProps>({ Component, pageProps }) => {
          const { locale } = pageProps;

          return (
            <IntlayerClientProvider locale={locale}>
              <Component {...pageProps} />
            </IntlayerClientProvider>
          );
        }

        export default MyApp;
        ```

        ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
        import { IntlayerClientProvider } from "next-intlayer";

        const App = ({ Component, pageProps }) => (
          <IntlayerClientProvider locale={locale}>
            <Component {...pageProps} />
          </IntlayerClientProvider>
        );

        export default App;
        ```

        ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"

    const { IntlayerClientProvider } = require("next-intlayer");

const App = ({ Component, pageProps }) => (
<IntlayerClientProvider locale={locale}>
<Component {...pageProps} />
</IntlayerClientProvider>
);

module.exports = App;

````

3.  **设置 `getStaticPaths` 和 `getStaticProps`:**

在你的 `[locale]/index.tsx` 文件中，定义路径和属性以处理不同的语言环境。

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { type Locales, getConfiguration } from "intlayer";

const HomePage: FC = () => <div>{/* 你的内容写在这里 */}</div>;

export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* 你的内容写在这里 */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* 你的内容写在这里 */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths` 和 `getStaticProps` 确保您的应用程序在 Next.js 页面路由中预构建所有本地化所需的页面。此方法减少了运行时计算，从而提升用户体验。更多详情，请参阅 Next.js 文档中的 [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) 和 [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)。

### 第6步：声明您的内容

创建并管理您的内容声明以存储翻译。

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "欢迎访问我的网站",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "通过编辑此页面开始。",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
````

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "通过编辑此页面开始。",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 内容字典定义
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
      "nodeType": "translation",
      "translation": {
        "en": "通过编辑此页面开始。",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

有关声明内容的更多信息，请参阅[内容声明指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

### 第7步：在代码中使用内容

在整个应用程序中访问您的内容字典以显示翻译内容。

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* 其他组件 */}
    </div>
  );
};

// ... 其余代码，包括 getStaticPaths 和 getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* 其他组件 */}
    </div>
  );
};

// ... 代码的其余部分，包括 getStaticPaths 和 getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* 其他组件 */}
    </div>
  );
};

tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // 确保你有对应的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // 确保你有对应的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // 确保你有相应的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 当在 `string` 属性中使用翻译（例如 `alt`、`title`、`href`、`aria-label`）时，调用函数的值如下：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)。

### （可选）步骤 8：元数据的国际化

如果您想要国际化您的元数据，例如页面标题，可以使用 Next.js 页面路由器提供的 `getStaticProps` 函数。在该函数内部，您可以通过 `getIntlayer` 函数获取内容以翻译您的元数据。

```typescript fileName="src/pages/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { type Metadata } from "next";

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

```javascript fileName="src/pages/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
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
};

export default metadataContent;
```

```javascript fileName="src/pages/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
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
};

module.exports = metadataContent;
```

```json fileName="src/pages/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
          "zh": "Preact 标志"
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "zh": "由 create next app 生成"
      },
    },
  },
};
```

````tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({
  metadata,
  multilingualUrls,
  locale,
}) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* 为SEO生成hreflang标签 */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* 页面内容 */}
      <main>{/* 这里是您的页面内容 */}</main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params,
}) => {
  const locale = params?.locale as string;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 生成一个包含每个语言环境对应 URL 的对象。
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
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... 其余代码包括 getStaticPaths
````

````jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* 为SEO生成hreflang标签 */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* 页面内容 */}
      <main>{/* 你的页面内容在这里 */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 生成一个包含每个语言环境所有 URL 的对象。
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
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... 其余代码包括 getStaticPaths
````

````jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer");
const Head = require("next/head");

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* 为SEO生成hreflang标签 */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* 页面内容 */}
      <main>{/* 你的页面内容放这里 */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 生成一个包含每个语言环境对应 URL 的对象。
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
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... 包含 getStaticPaths 的其余代码
````

> 请注意，从 `next-intlayer` 导入的 `getIntlayer` 函数会将您的内容包装在一个 `IntlayerNode` 中，从而允许与可视化编辑器集成。相比之下，从 `intlayer` 导入的 `getIntlayer` 函数则直接返回您的内容，不带额外属性。

或者，您可以使用 `getTranslation` 函数来声明您的元数据。然而，推荐使用内容声明文件，以便自动化您的元数据翻译，并在某个阶段将内容外置。

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* 生成用于SEO的hreflang标签 */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={url}
          />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* 页面内容 */}
      <main>
        {/* 你的页面内容放这里 */}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params
}) => {
  const locale = params?.locale as string;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
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
  };

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... 包括 getStaticPaths 的其余代码
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* 为 SEO 生成 hreflang 标签 */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* 页面内容 */}
      <main>{/* 这里是您的页面内容 */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;
  const t = (content) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... 其余代码包括 getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer");
const Head = require("next/head");

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* 为SEO生成hreflang标签 */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* 页面内容 */}
      <main>{/* 你的页面内容放这里 */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;
  const t = (content) => getTranslation(content, locale);

  const metadata = {
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
  };

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... 包含 getStaticPaths 的其余代码
```

> 了解有关元数据优化的更多信息，请参阅[官方 Next.js 文档](https://nextjs.org/docs/pages/building-your-application/optimizing/metadata)。

### （可选）步骤 9：更改内容语言

在 Next.js 中更改内容语言，推荐的方式是使用 `Link` 组件将用户重定向到相应的本地化页面。`Link` 组件支持页面预加载，有助于避免完整页面刷新。

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();

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
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 该语言环境中的语言名称 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境中的语言 - 例如当前语言环境设置为 Locales.SPANISH 时显示 Francés */}
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

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import Link from "next/link";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();

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
            onClick={() => setLocale(localeItem)}
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
              {/* 语言在当前语言环境中 - 例如当前语言环境设置为 Locales.SPANISH 时显示 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 语言的英文名称 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();

  return (
    <select>
      {availableLocales.map((localeItem) => (
        <option value={localeItem} key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言以其自身的本地化形式显示 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 语言以当前本地化形式显示 - 例如当前本地化设置为 Locales.SPANISH 时显示 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 语言以英文显示 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </option>
      ))}
    </select>
  );
};
```

> 另一种方式是使用 `useLocale` 钩子提供的 `setLocale` 函数。该函数不会预取页面，并且会重新加载页面。

> 在这种情况下，如果不使用 `router.push` 进行重定向，只有您的服务器端代码会更改内容的语言环境。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... 其余代码

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return <button onClick={() => setLocale(Locales.FRENCH)}>切换到法语</button>;
```

> `useLocalePageRouter` API 与 `useLocale` 相同。要了解更多关于 `useLocale` 钩子的内容，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)。

> 文档参考：
>
> - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### （可选）步骤10：创建本地化链接组件

为了确保您的应用导航遵循当前的语言环境，您可以创建一个自定义的 `Link` 组件。该组件会自动在内部 URL 前添加当前语言的前缀。例如，当讲法语的用户点击“关于”页面的链接时，他们会被重定向到 `/fr/about`，而不是 `/about`。

这种行为有多个好处：

- **SEO 和用户体验**：本地化的 URL 有助于搜索引擎正确索引特定语言的页面，并为用户提供其偏好的语言内容。
- **一致性**：通过在整个应用中使用本地化链接，确保导航保持在当前语言环境内，避免意外的语言切换。
- **可维护性**：将本地化逻辑集中在单个组件中，简化了 URL 的管理，使代码库更易于维护和扩展，随着应用的增长更加高效。

下面是使用 TypeScript 实现的本地化 `Link` 组件示例：

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * 工具函数，用于检查给定的 URL 是否为外部链接。
 * 如果 URL 以 http:// 或 https:// 开头，则视为外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 自定义 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，使用 `getLocalizedUrl` 在 URL 前添加语言前缀（例如 /fr/about）。
 * 这确保导航保持在相同的语言环境上下文中。
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接且提供了有效的 href，则获取本地化的 URL。
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
 * 工具函数，用于检查给定的 URL 是否为外部链接。
 * 如果 URL 以 http:// 或 https:// 开头，则视为外部链接。
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * 自定义 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，使用 `getLocalizedUrl` 在 URL 前添加语言环境前缀（例如 /fr/about）。
 * 这确保导航保持在相同的语言环境上下文中。
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接且提供了有效的 href，则获取本地化的 URL。
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
 * 工具函数，用于检查给定的 URL 是否为外部链接。
 * 如果 URL 以 http:// 或 https:// 开头，则视为外部链接。
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接且提供了有效的 href，则获取本地化的 URL。
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

- **检测外部链接**：  
  辅助函数 `checkIsExternalLink` 用于判断 URL 是否为外部链接。外部链接保持不变，因为它们不需要本地化。

- **获取当前语言环境**：  
  `useLocale` 钩子提供当前的语言环境（例如，`fr` 表示法语）。

- **本地化 URL**：  
  对于内部链接（即非外部链接），使用 `getLocalizedUrl` 自动为 URL 添加当前语言环境的前缀。这意味着如果用户的语言环境是法语，传入的 `/about` 会被转换为 `/fr/about`。

- **返回链接**：  
  该组件返回一个带有本地化 URL 的 `<a>` 元素，确保导航与语言环境保持一致。

通过在整个应用中集成此 `Link` 组件，您可以保持一致且具备语言感知的用户体验，同时提升 SEO 和可用性。

### （可选）步骤 11：优化您的包大小

使用 `next-intlayer` 时，字典默认会包含在每个页面的打包文件中。为了优化打包体积，Intlayer 提供了一个可选的 SWC 插件，该插件通过宏智能替换 `useIntlayer` 调用。这确保字典只会包含在实际使用它们的页面的打包文件中。

要启用此优化，请安装 `@intlayer/swc` 包。安装后，`next-intlayer` 会自动检测并使用该插件：

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> 注意：此优化仅适用于 Next.js 13 及以上版本。

> 注意：该包默认未安装，因为 SWC 插件在 Next.js 中仍处于实验阶段，未来可能会有所变化。

### 配置 TypeScript

Intlayer 使用模块增强（module augmentation）来利用 TypeScript 的优势，使您的代码库更健壮。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

为了保持您的代码库整洁并避免提交生成的文件，建议忽略由 Intlayer 创建的文件。

将以下内容添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅[Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

## 其他资源

- **Intlayer 文档：** [GitHub 仓库](https://github.com/aymericzip/intlayer)
- **词典指南：** [词典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)
- **配置文档：** [配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

通过遵循本指南，您可以将 Intlayer 有效集成到使用页面路由的 Next.js 应用程序中，为您的 Web 项目提供强大且可扩展的国际化支持。

### 深入了解

要进一步扩展，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。
