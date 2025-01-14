# 开始国际化 (i18n) 使用 Intlayer 和 Vite 和 React

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**，使用声明性字典在组件级别。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成类型，提高自动补全和错误检测。
- **受益于高级特性**，如动态语言检测和切换。

---

## 在 Vite 和 React 应用程序中设置 Intlayer 的逐步指南

### 第 1 步：安装依赖

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

- **intlayer**

  提供配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 的核心包。

- **react-intlayer**
  将 Intlayer 集成到 React 应用程序的包。它提供上下文提供者和用于 React 国际化的钩子。此外，它包括用于将 Intlayer 与 [Vite 打包器](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：配置您的项目

创建一个配置文件以配置应用程序的语言：

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

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第 3 步：在您的 Vite 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保构建内容声明文件并在开发模式下监视它们。它在 Vite 应用程序中定义 Intlayer 环境变量。此外，它提供别名以优化性能。

### 第 4 步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // 如果您在内容中使用 React 节点，请确保导入 React
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // 如果您在内容中使用 React 节点，请确保导入 React
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // 如果您在内容中使用 React 节点，请确保导入 React
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> 您的内容声明可以在应用程序中的任何地方定义，只要它们被包含在 `contentDir` 目录中（默认情况下，`./src`）。并匹配内容声明文件扩展名（默认情况下，`.content.{ts,tsx,js,jsx,mjs,cjs}`）。
> 有关更多详细信息，请参见 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。
> 如果您的内容文件包含 TSX 代码，您应该考虑在内容文件中导入 `import React from "react";`。

### 第 5 步：在您的代码中利用 Intlayer

在您的应用程序中访问内容字典：

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> 如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用该函数的值，像这样：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解更多关于 `useIntlayer` 钩子的内容，请参考 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayer.md)。

### （可选）第 6 步：更改内容语言

要更改内容的语言，可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> 要了解更多关于 `useLocale` 钩子的内容，请参考 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)。

### （可选）第 7 步：为应用程序添加本地化路由

此步骤的目的是为每种语言创建唯一的路由。这对于 SEO 和 SEO 友好的 URL 很有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 默认情况下，默认语言的路由没有前缀。如果您想为默认语言设置前缀，可以在配置中将 `middleware.prefixDefault` 选项设置为 `true`。有关更多信息，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

要将本地化路由添加到应用程序，您可以创建一个 `LocaleRouter` 组件，该组件包装应用程序的路由并处理基于语言的路由。以下是使用 [React Router](https://reactrouter.com/home) 的示例：

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat="typescript"
// 导入所需的依赖项和函数
import { Locales, getConfiguration } from "intlayer"; // 从'intlayer'导入的工具函数和类型
import type { FC, PropsWithChildren } from "react"; // 反应类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供者
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化的组件，并为孩子提供适当的本地化上下文。
 * 它管理基于 URL 的语言检测和验证。
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 获取当前 URL 路径
  const { locale } = useParams<{ locale: Locales }>(); // 从 URL 中提取区域参数

  // 确定当前语言，如果未提供则回退到默认语言
  const currentLocale = locale ?? defaultLocale;

  // 从路径中删除区域前缀以构建基本路径
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言应始终加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言并更新路径
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 用新路径替换当前历史记录条目
        />
      );
    }

    // 将孩子用 IntlayerProvider 包装并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言没有前缀。
     * 确保当前语言有效，并且不是默认语言。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 排除默认语言
        )
        .includes(currentLocale) // 检查当前语言是否在有效语言列表中
    ) {
      // 重定向到没有区域前缀的路径
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 将孩子用 IntlayerProvider 包装并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 设置语言特定路由的路由组件。
 * 它使用 React Router 管理导航和渲染本地化组件。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 路由模式以捕获语言（例如 /en/，/fr/）并匹配随后的所有路径
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包装孩子
      />

      {
        // 如果禁用了默认语言的前缀，则直接在根路径下呈现孩子
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包装孩子
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 导入所需的依赖项和函数
import { Locales, getConfiguration } from "intlayer"; // 从'intlayer'导入的工具函数和类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供者
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化的组件，并为孩子提供适当的本地化上下文。
 * 它管理基于 URL 的语言检测和验证。
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 获取当前 URL 路径
  const { locale } = useParams(); // 从 URL 中提取语言参数

  // 确定当前语言，如果未提供则回退到默认语言
  const currentLocale = locale ?? defaultLocale;

  // 从路径中删除区域前缀以构建基本路径
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言应始终加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言并更新路径
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 用新路径替换当前历史记录条目
        />
      );
    }

    // 将孩子用 IntlayerProvider 包装并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言没有前缀。
     * 确保当前语言有效，并且不是默认语言。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 排除默认语言
        )
        .includes(currentLocale) // 检查当前语言是否在有效语言列表中
    ) {
      // 重定向到没有语言前缀的路径
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 将孩子用 IntlayerProvider 包装并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 设置语言特定路由的路由组件。
 * 它使用 React Router 管理导航和渲染本地化组件。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 路由模式以捕获语言（例如 /en/，/fr/）并匹配随后的所有路径
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包装孩子
      />

      {
        // 如果禁用了默认语言的前缀，则直接在根路径下呈现孩子
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包装孩子
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 导入所需的依赖项和函数
const { Locales, getConfiguration, getPathWithoutLocale } = require("intlayer"); // 从'intlayer'导入的工具函数和类型
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 国际化上下文的提供者
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // 路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化的组件，并为孩子提供适当的本地化上下文。
 * 它管理基于 URL 的语言检测和验证。
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 获取当前 URL 路径
  const { locale } = useParams(); // 从 URL 中提取语言参数

  // 确定当前语言，如果未提供则回退到默认语言
  const currentLocale = locale ?? defaultLocale;

  // 从路径中删除语言前缀以构建基本路径
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言应始终加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言并更新路径
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 用新路径替换当前历史记录条目
        />
      );
    }

    // 将孩子用 IntlayerProvider 包装并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言没有前缀。
     * 确保当前语言有效，并且不是默认语言。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 排除默认语言
        )
        .includes(currentLocale) // 检查当前语言是否在有效语言列表中
    ) {
      // 重定向到没有语言前缀的路径
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 将孩子用 IntlayerProvider 包装并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 设置语言特定路由的路由组件。
 * 它使用 React Router 管理导航和渲染本地化组件。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 路由模式以捕获语言（例如 /en/，/fr/）并匹配随后的所有路径
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包装孩子
      />

      {
        // 如果禁用了默认语言的前缀，则直接在根路径下呈现孩子
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包装孩子
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

您还可以使用 `intLayerMiddlewarePlugin` 为您的应用程序添加服务器端路由。此插件将根据 URL 自动检测当前语言并设置适当的语言 Cookie。如果未指定语言，该插件将根据用户的浏览器语言偏好确定最合适的语言。如果未检测到语言，它将重定向到默认语言。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const {
  intlayerPlugin,
  intLayerMiddlewarePlugin,
} = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### （可选）第 8 步：当语言更改时更改 URL

要在语言更改时更改 URL，您可以使用 `useLocale` 钩子提供的 `onLocaleChange` 属性。同时，您可以使用 `react-router-dom` 的 `useLocation` 和 `useNavigate` 钩子来更新 URL 路径。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const location = useLocation(); // 获取当前 URL 路径。例如：/fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 使用更新的语言构建 URL
    // 示例：/es/about，语言设置为西班牙语
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // 更新 URL 路径
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 以其本地语言显示的语言 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 以当前语言显示的语言 - 例如 Francés，当前语言设置为 Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 以英文显示的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 以其本地语言显示的语言 - 例如 FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const location = useLocation(); // 获取当前 URL 路径。例如：/fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 使用更新的语言构建 URL
    // 示例：/es/about，语言设置为西班牙语
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // 更新 URL 路径
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 以其本地语言显示的语言 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 以当前语言显示的语言 - 例如 Francés，当前语言设置为 Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 以英文显示的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 以其本地语言显示的语言 - 例如 FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const location = useLocation(); // 获取当前 URL 路径。例如：/fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 使用更新的语言构建 URL
    // 示例：/es/about，语言设置为西班牙语
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // 更新 URL 路径
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 以其本地语言显示的语言 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 以当前语言显示的语言 - 例如 Francés，当前语言设置为 Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 以英文显示的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 以其本地语言显示的语言 - 例如 FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> 文档参考：
>
> - [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### 配置 TypeScript

Intlayer 使用模块扩展来获得 TypeScript 的好处，并增强您的代码库。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // 您的自定义配置
  "include": [
    "src",
    "types", // <- 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库中。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```plaintext
# 忽略 Intlayer 生成的文件
.intlayer
```
