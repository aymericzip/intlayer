# 开始使用 Intlayer 和 Next.js 的页面路由进行国际化 (i18n)

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。Intlayer 无缝集成了最新的 **Next.js** 框架，包括其传统的 **页面路由**。

使用 Intlayer，您可以：

- **轻松管理翻译**，在组件级别使用声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成的类型提高自动补全和错误检测。
- **受益于高级功能**，如动态语言检测和切换。

> Intlayer 兼容 Next.js 12、13、14 和 15。如果您使用的是 Next.js 应用路由，请参阅 [应用路由指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_14.md)。对于 Next.js 15，请遵循此 [指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

---

## 在使用页面路由的 Next.js 应用程序中设置 Intlayer 的分步指南

### 第 1 步：安装依赖项

使用您喜欢的包管理器安装必要的软件包：

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

  将 Intlayer 与 Next.js 集成的软件包。它提供了用于 Next.js 国际化的上下文提供者和钩子。此外，它还包括将 Intlayer 与 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 集成的 Next.js 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：配置您的项目

创建一个配置文件以定义您的应用程序支持的语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// 配置文件，用于定义支持的语言
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在此处添加其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
// 配置文件，用于定义支持的语言
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在此处添加其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
// 配置文件，用于定义支持的语言
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 在此处添加其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第 3 步：将 Intlayer 集成到 Next.js 配置中

修改您的 Next.js 配置以合并 Intlayer：

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 您现有的 Next.js 配置
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 与 Next.js 集成。它确保在开发模式下构建内容声明文件并监视它们。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它提供了优化性能的别名，并确保与服务器组件的兼容性。

### 第 4 步：配置用于语言检测的中间件

设置中间件以自动检测和处理用户的首选语言：

```typescript fileName="src/middleware.ts" codeFormat="typescript"
// 配置中间件以检测用户的首选语言
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
// 配置中间件以检测用户的首选语言
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
// 配置中间件以检测用户的首选语言
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> 调整 `matcher` 参数以匹配您的应用程序的路由。有关更多详细信息，请参阅 [Next.js 文档中的 matcher 配置](https://nextjs.org/docs/app/building-your-application/routing/middleware)。

### 第 5 步：定义动态语言路由

实现动态路由以根据用户的语言提供本地化内容。

1.  **创建特定语言的页面：**

    将您的主页面文件重命名为包含 `[locale]` 动态片段。

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **更新 `_app.tsx` 以处理本地化：**

    修改您的 `_app.tsx` 以包含 Intlayer 提供者。

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
    ```

3.  **设置 `getStaticPaths` 和 `getStaticProps`：**

    在您的 `[locale]/index.tsx` 中，定义路径和属性以处理不同的语言。

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* 在此处添加您的内容 */}</div>;

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

    const HomePage = () => <div>{/* 在此处添加您的内容 */}</div>;

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

    const HomePage = () => <div>{/* 在此处添加您的内容 */}</div>;

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

> `getStaticPaths` 和 `getStaticProps` 确保您的应用程序为 Next.js 页面路由中的所有语言预构建必要的页面。这种方法减少了运行时计算，并提高了用户体验。有关更多详细信息，请参阅 Next.js 文档中的 [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) 和 [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)。

### 第 6 步：声明您的内容

创建并管理您的内容声明以存储翻译。

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página。",
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
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page。",
        es: "Comience por editar esta página。",
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
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page。",
        "es": "Comience por editar esta página。"
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

有关声明内容的更多信息，请参阅 [内容声明指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

### 第 7 步：在代码中使用内容

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

// ... 其余代码，包括 getStaticPaths 和 getStaticProps

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

// ... 其余代码，包括 getStaticPaths 和 getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // 确保您有相应的内容声明

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
  const content = useIntlayer("component-example"); // 确保您有相应的内容声明

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
  const content = useIntlayer("component-example"); // 确保您有相应的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 在 `string` 属性中使用翻译时（例如 `alt`、`title`、`href`、`aria-label`），请按以下方式调用函数的值：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useIntlayer.md)。

### 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势并使您的代码库更强大。

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

为了保持您的存储库整洁并避免提交生成的文件，建议忽略由 Intlayer 创建的文件。

将以下行添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略由 Intlayer 生成的文件
.intlayer
```

## 其他资源

- **Intlayer 文档：** [GitHub 仓库](https://github.com/aymericzip/intlayer)
- **字典指南：** [字典](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)
- **配置文档：** [配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)

通过遵循本指南，您可以将 Intlayer 有效地集成到使用页面路由的 Next.js 应用程序中，从而为您的 Web 项目启用强大且可扩展的国际化支持。

### 深入了解

要进一步了解，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_CMS.md) 外部化您的内容。
