# 开始使用 Intlayer 和 React Create App 进行国际化 (i18n)

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**，通过组件级别的声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成类型，提高自动补全和错误检测能力。
- **享受高级功能**，如动态语言检测和切换。

## 在 React 应用中设置 Intlayer 的分步指南

### 第 1 步：安装依赖项

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  提供国际化工具的核心包，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md)。

- **react-intlayer**

  将 Intlayer 集成到 React 应用程序的包。它为 React 国际化提供上下文提供者和钩子。

- **react-scripts-intlayer**

  包含 `react-scripts-intlayer` 命令和插件，用于将 Intlayer 集成到基于 Create React App 的应用程序中。这些插件基于 [craco](https://craco.js.org/)，并包括对 [Webpack](https://webpack.js.org/) 打包器的额外配置。

### 第 2 步：配置您的项目

创建一个配置文件来配置您的应用程序语言：

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

### 第 3 步：在您的 CRA 配置中集成 Intlayer

更改您的脚本以使用 react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer` 脚本基于 [CRACO](https://craco.js.org/)。您也可以基于 intlayer craco 插件实现您自己的设置。[参见此处示例](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

### 第 4 步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认情况下为 `./src`）。并匹配内容声明文件扩展名（默认情况下为 `.content.{ts,tsx,js,jsx,mjs,cjs}`）。
> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。
> 如果您的内容文件包含 TSX 代码，您应该考虑在内容文件中导入 `import React from "react";`。

### 第 5 步：在您的代码中使用 Intlayer

在整个应用程序中访问您的内容字典：

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> 注意：如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用函数的值，如：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayer.md)。

### （可选）第 6 步：更改您的内容语言

要更改您的内容语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>将语言更改为英语</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>将语言更改为英语</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>将语言更改为英语</button>
  );
};
```

> 要了解有关 `useLocale` 钩子的更多信息，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)。

### （可选）第 7 步：为您的应用程序添加本地化路由

此步骤的目的是为每种语言创建唯一的路由。这对 SEO 和 SEO 友好的 URL 非常有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 默认情况下，默认语言环境的路由不会添加前缀。如果您想为默认语言环境添加前缀，可以在配置中将 `middleware.prefixDefault` 选项设置为 `true`。有关更多信息，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

要为您的应用程序添加本地化路由，您可以创建一个 `LocaleRouter` 组件，该组件包装您的应用程序路由并处理基于语言环境的路由。以下是使用 [React Router](https://reactrouter.com/home) 的示例：

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 导入必要的依赖项和函数
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 来自 'intlayer' 的实用函数和类型
import { FC, PropsWithChildren } from "react"; // React 的函数组件和属性类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供者
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 用于管理导航的路由器组件

// 从 Intlayer 中解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化的组件，将子组件包装在适当的语言环境上下文中。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // 获取当前 URL 路径

  // 确定当前语言环境，如果未提供则回退到默认值
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构造基础路径
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言环境应始终添加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言环境
    if (!locale || !locales.includes(locale)) {
      // 重定向到带有更新路径的默认语言环境
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 用新路径替换当前历史记录条目
        />
      );
    }

    // 使用 IntlayerProvider 包装子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言环境不添加前缀。
     * 确保当前语言环境有效且不是默认语言环境。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 排除默认语言环境
        )
        .includes(currentLocale) // 检查当前语言环境是否在有效语言环境列表中
    ) {
      // 重定向到没有语言环境前缀的路径
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 使用 IntlayerProvider 包装子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 一个设置语言环境特定路由的路由器组件。
 * 它使用 React Router 管理导航并渲染本地化组件。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // 路由模式捕获语言环境（例如 /en/、/fr/）并匹配所有后续路径
            path={`/${locale}/*`}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 使用语言环境管理包装子组件
          />
        ))}

      {
        // 如果禁用默认语言环境的前缀，则直接在根路径渲染子组件
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 使用语言环境管理包装子组件
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 导入必要的依赖项和函数
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 来自 'intlayer' 的实用函数和类型
import { FC, PropsWithChildren } from "react"; // React 的函数组件和属性类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供者
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 用于管理导航的路由器组件

// 从 Intlayer 中解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化的组件，将子组件包装在适当的语言环境上下文中。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 获取当前 URL 路径

  // 确定当前语言环境，如果未提供则回退到默认值
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构造基础路径
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言环境应始终添加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言环境
    if (!locale || !locales.includes(locale)) {
      // 重定向到带有更新路径的默认语言环境
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 用新路径替换当前历史记录条目
        />
      );
    }

    // 使用 IntlayerProvider 包装子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言环境不添加前缀。
     * 确保当前语言环境有效且不是默认语言环境。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 排除默认语言环境
        )
        .includes(currentLocale) // 检查当前语言环境是否在有效语言环境列表中
    ) {
      // 重定向到没有语言环境前缀的路径
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 使用 IntlayerProvider 包装子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 一个设置语言环境特定路由的路由器组件。
 * 它使用 React Router 管理导航并渲染本地化组件。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // 路由模式捕获语言环境（例如 /en/、/fr/）并匹配所有后续路径
            path={`/${locale}/*`}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 使用语言环境管理包装子组件
          />
        ))}

      {
        // 如果禁用默认语言环境的前缀，则直接在根路径渲染子组件
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 使用语言环境管理包装子组件
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```
