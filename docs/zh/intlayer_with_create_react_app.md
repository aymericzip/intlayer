# 开始使用 Intlayer 和 React Create App 进行国际化 (i18n)

[应用模板](https://github.com/aymericzip/intlayer-react-cra-template) 参考。

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**，通过组件级别的声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成的类型，提高自动补全和错误检测。
- **享受高级功能**，如动态语言检测和切换。

## 在 React 应用中设置 Intlayer 的分步指南

### 第一步：安装依赖

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

  提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 的核心包。

- **react-intlayer**

  将 Intlayer 集成到 React 应用中的包。它为 React 国际化提供上下文提供者和钩子。

- **react-scripts-intlayer**

  包括 `react-scripts-intlayer` 命令和插件，用于将 Intlayer 集成到基于 Create React App 的应用中。这些插件基于 [craco](https://craco.js.org/)，并包括对 [Webpack](https://webpack.js.org/) 打包器的额外配置。

### 第二步：配置您的项目

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

### 第三步：在 CRA 配置中集成 Intlayer

更改您的脚本以使用 react-intlayer：

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer` 脚本基于 [CRACO](https://craco.js.org/)。您也可以基于 Intlayer craco 插件实现自己的设置。[查看示例](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

### 第四步：声明您的内容

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
      zh: (
        <>
          编辑 <code>src/App.tsx</code> 并保存以重新加载
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        zh: "学习 React",
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
      zh: "通过编辑开始",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        zh: "学习 React",
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
      zh: "通过编辑开始",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        zh: "学习 React",
      }),
    },
  },
};

module.exports = appContent;
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认情况下为 `./src`）。并匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

> 如果您的内容文件包含 TSX 代码，您应该考虑在内容文件中导入 `import React from "react";`。

### 第五步：在代码中使用 Intlayer

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

> 注意：如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用函数的值，例如：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayer.md)。

### （可选）第六步：更改内容的语言

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>切换语言到英语</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>切换语言到英语</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>切换语言到英语</button>
  );
};
```

> 要了解有关 `useLocale` 钩子的更多信息，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)。

### （可选）第七步：为您的应用添加本地化路由

此步骤的目的是为每种语言创建唯一的路由。这对于 SEO 和 SEO 友好的 URL 非常有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 默认情况下，默认语言环境的路由不会添加前缀。如果您希望为默认语言环境添加前缀，可以在配置中将 `middleware.prefixDefault` 选项设置为 `true`。有关更多信息，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

要为您的应用添加本地化路由，您可以创建一个 `LocaleRouter` 组件，该组件包装您的应用路由并处理基于语言环境的路由。以下是使用 [React Router](https://reactrouter.com/home) 的示例：

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 导入必要的依赖项和函数
import { configuration, getPathWithoutLocale } from "intlayer"; // 来自 'intlayer' 的实用函数和类型
import type { FC, PropsWithChildren } from "react"; // React 的函数组件和 props 类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供者
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 用于管理导航的路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化的组件，并使用适当的语言环境上下文包装子组件。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // 获取当前 URL 路径

  // 确定当前语言环境，如果未提供则回退到默认语言环境
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构造基本路径
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言环境应始终添加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言环境
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言环境并更新路径
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
     * 当 middleware.prefixDefault 为 false 时，默认语言环境不会添加前缀。
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
 * 一个设置语言环境特定路由的路由组件。
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
            // 路由模式以捕获语言环境（例如 /en/、/fr/）并匹配所有后续路径
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 使用语言环境管理包装子组件
          />
        ))}

      {
        // 如果禁用了默认语言环境的前缀，则直接在根路径渲染子组件
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
// 来自 'intlayer' 的实用函数和类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供者
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 用于管理导航的路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化的组件，并使用适当的语言环境上下文包装子组件。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 获取当前 URL 路径

  // 确定当前语言环境，如果未提供则回退到默认语言环境
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构造基本路径
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言环境应始终添加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言环境
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言环境并更新路径
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
     * 当 middleware.prefixDefault 为 false 时，默认语言环境不会添加前缀。
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
 * 一个设置语言环境特定路由的路由组件。
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
            // 路由模式以捕获语言环境（例如 /en/、/fr/）并匹配所有后续路径
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 使用语言环境管理包装子组件
          />
        ))}

      {
        // 如果禁用了默认语言环境的前缀，则直接在根路径渲染子组件
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

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 导入必要的依赖项和函数
const { configuration, getPathWithoutLocale } = require("intlayer"); // 来自 'intlayer' 的实用函数和类型
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 国际化上下文的提供者
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // 用于管理导航的路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化的组件，并使用适当的语言环境上下文包装子组件。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 获取当前 URL 路径

  // 确定当前语言环境，如果未提供则回退到默认语言环境
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构造基本路径
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言环境应始终添加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言环境
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言环境并更新路径
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
     * 当 middleware.prefixDefault 为 false 时，默认语言环境不会添加前缀。
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
 * 一个设置语言环境特定路由的路由组件。
 * 它使用 React Router 管理导航并渲染本地化组件。
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // 路由模式以捕获语言环境（例如 /en/、/fr/）并匹配所有后续路径
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 使用语言环境管理包装子组件
          />
        ))}

      {
        // 如果禁用了默认语言环境的前缀，则直接在根路径渲染子组件
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

然后，您可以在应用中使用 `LocaleRouter` 组件：

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... 您的 AppContent 组件

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... 您的 AppContent 组件

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... 您的 AppContent 组件

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

### （可选）第八步：在语言环境更改时更改 URL

要在语言环境更改时更改 URL，您可以使用 `useLocale` 钩子提供的 `onLocaleChange` 属性。同时，您可以使用 `react-router-dom` 的 `useLocation` 和 `useNavigate` 钩子来更新 URL 路径。

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
  const { pathname, search } = useLocation(); // 获取当前 URL 路径。例如：/fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 使用更新的语言环境构造 URL
      // 示例：/es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // 更新 URL 路径
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言名称（自身语言环境） - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境下的语言名称 - 例如 Francés（当前语言环境为 Locales.SPANISH） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英文中的语言名称 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // 获取当前 URL 路径。例如：/fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 使用更新的语言环境构造 URL
      // 示例：/es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // 更新 URL 路径
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言名称（自身语言环境） - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境下的语言名称 - 例如 Francés（当前语言环境为 Locales.SPANISH） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英文中的语言名称 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // 获取当前 URL 路径。例如：/fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 使用更新的语言环境构造 URL
      // 示例：/es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // 更新 URL 路径
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言名称（自身语言环境） - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境下的语言名称 - 例如 Francés（当前语言环境为 Locales.SPANISH） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英文中的语言名称 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> 文档参考：
>
> - [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh)
> - [`lang` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### （可选）第九步：切换 HTML 的语言和方向属性

当您的应用支持多种语言时，动态更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前语言环境非常重要。这样可以确保：

- **可访问性**：屏幕阅读器和辅助技术依赖正确的 `lang` 属性来准确发音和解释内容。
- **文本渲染**：`dir`（方向）属性确保文本以正确的顺序呈现（例如，英语为从左到右，阿拉伯语或希伯来语为从右到左），这对可读性至关重要。
- **SEO**：搜索引擎使用 `lang` 属性来确定页面的语言，从而帮助在搜索结果中提供正确的本地化内容。

通过在语言环境更改时动态更新这些属性，您可以为所有支持的语言用户提供一致且可访问的体验。

#### 实现钩子

创建一个自定义钩子来管理 HTML 属性。该钩子监听语言环境更改并相应地更新属性：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 根据当前语言环境更新 HTML <html> 元素的 `lang` 和 `dir` 属性。
 * - `lang`：通知浏览器和搜索引擎页面的语言。
 * - `dir`：确保正确的阅读顺序（例如，英语为 'ltr'，阿拉伯语为 'rtl'）。
 *
 * 此动态更新对于正确的文本渲染、可访问性和 SEO 至关重要。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 将语言属性更新为当前语言环境。
    document.documentElement.lang = locale;

    // 根据当前语言环境设置文本方向。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 根据当前语言环境更新 HTML <html> 元素的 `lang` 和 `dir` 属性。
 * - `lang`：通知浏览器和搜索引擎页面的语言。
 * - `dir`：确保正确的阅读顺序（例如，英语为 'ltr'，阿拉伯语为 'rtl'）。
 *
 * 此动态更新对于正确的文本渲染、可访问性和 SEO 至关重要。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 将语言属性更新为当前语言环境。
    document.documentElement.lang = locale;

    // 根据当前语言环境设置文本方向。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * 根据当前语言环境更新 HTML <html> 元素的 `lang` 和 `dir` 属性。
 * - `lang`：通知浏览器和搜索引擎页面的语言。
 * - `dir`：确保正确的阅读顺序（例如，英语为 'ltr'，阿拉伯语为 'rtl'）。
 *
 * 此动态更新对于正确的文本渲染、可访问性和 SEO 至关重要。
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 将语言属性更新为当前语言环境。
    document.documentElement.lang = locale;

    // 根据当前语言环境设置文本方向。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### 在您的应用中使用钩子

将钩子集成到您的主组件中，以便在语言环境更改时更新 HTML 属性：

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // 应用钩子以根据语言环境更新 <html> 标签的 lang 和 dir 属性。
  useI18nHTMLAttributes();

  // ... 组件的其他部分
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // 应用钩子以根据语言环境更新 <html> 标签的 lang 和 dir 属性。
  useI18nHTMLAttributes();

  // ... 组件的其他部分
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // 应用钩子以根据语言环境更新 <html> 标签的 lang 和 dir 属性。
  useI18nHTMLAttributes();

  // ... 组件的其他部分
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

通过应用这些更改，您的应用将：

- 确保 **语言** (`lang`) 属性正确反映当前语言环境，这对 SEO 和浏览器行为很重要。
- 根据语言环境调整 **文本方向** (`dir`)，提高可读性和可用性。
- 提供更 **可访问** 的体验，因为辅助技术依赖这些属性以最佳方式运行。

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

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以在 `.gitignore` 文件中添加以下指令：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### 深入了解

要进一步了解，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_CMS.md) 外部化您的内容。
