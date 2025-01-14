# 开始使用 Intlayer 和 React Create App 进行国际化 (i18n)

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代网页应用程序中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**，使用组件级的声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，生成自动类型，提高自动补全和错误检测功能。
- **受益于先进功能**，如动态区域检测和切换。

---

## 在 React 应用程序中逐步设置 Intlayer 的指南

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

  将 Intlayer 集成到 React 应用程序中的包。它提供用于 React 国际化的上下文提供程序和钩子。此外，它还包含将 Intlayer 集成到基于 Create React App 的应用程序的插件。

### 第 2 步：项目配置

创建配置文件以配置应用程序的语言：

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用 Intlayer 日志等。有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第 3 步：在您的 CRA 配置中集成 Intlayer

更改您的脚本以使用 react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-intlayer` 脚本基于 [craco](https://craco.js.org/)。您还可以根据 intlayer craco 插件实现自己的设置。[请看这里的示例](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

### 第 4 步：声明您的内容

创建和管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          编辑 <code>src/App.tsx</code> 并保存以重新加载
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
        en: "学习 React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "通过编辑开始",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "学习 React",
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

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "通过编辑开始",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "学习 React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认为 `./src`）。并匹配内容声明文件扩展名（默认为 `.content.{ts,tsx,js,jsx,mjs,cjs}`）。
> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。
> 如果您的内容文件包含 TSX 代码，您应该考虑在内容文件中导入 `import React from "react";`。

### 第 5 步：在代码中使用 Intlayer

在应用程序中访问您的内容字典：

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

> 注意：如果您想在 `string` 属性，例如 `alt`、`title`、`href`、`aria-label` 等中使用内容，您必须调用函数的值，如：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解更多有关 `useIntlayer` 钩子的内容，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayer.md)。

### （可选）第 6 步：更改内容的语言

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>更改语言为英语</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>更改语言为英语</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>更改语言为英语</button>
  );
};
```

> 要了解更多有关 `useLocale` 钩子的内容，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)。

### （可选）第 7 步：为您的应用程序添加本地化路由

此步骤的目的是为每种语言创建唯一的路由。这对于 SEO 和友好的 URL 很重要。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 默认情况下，路由不会为默认语言环境添加前缀。如果您想要为默认语言环境添加前缀，可以在配置中将 `middleware.prefixDefault` 选项设置为 `true`。有关更多信息，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

要为您的应用程序添加本地化路由，您可以创建一个 `LocaleRouter` 组件，以包装应用程序的路由并处理基于语言环境的路由。以下是使用 [React Router](https://reactrouter.com/home) 的示例：

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 导入必要的依赖和函数
import { Locales, getConfiguration, removeLocaleFromUrl } from "intlayer"; // 从 'intlayer' 导入工具函数和类型
import type { FC, PropsWithChildren } from "react"; // React 的函数组件和属性的类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供程序
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 管理导航的路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 处理本地化并使用适当的语言环境上下文包装子组件的组件。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 获取当前 URL 路径
  const { locale } = useParams<{ locale: Locales }>(); // 从 URL 中提取语言环境参数

  // 确定当前语言环境，如果未提供则回退到默认语言环境
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构造基础路径
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言环境应始终前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言环境
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言环境并更新路径
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 用新条目替换当前历史记录条目
        />
      );
    }

    // 使用 IntlayerProvider 包裹子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言环境不带前缀。
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 使用 IntlayerProvider 包裹子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 设置语言环境特定路由的路由组件。
 * 它使用 React Router 管理导航并渲染本地化组件。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 路由模式以捕获语言环境（例如，/en/，/fr/）并匹配所有后续路径
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包裹子组件
      />

      {
        // 如果禁用默认语言环境的前缀，则在根路径直接渲染子组件
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包裹子组件
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 导入必要的依赖和函数
import { Locales, getConfiguration, removeLocaleFromUrl } from "intlayer"; // 从 'intlayer' 导入工具函数和类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供程序
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 管理导航的路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 处理本地化并使用适当的语言环境上下文包装子组件的组件。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 获取当前 URL 路径
  const { locale } = useParams(); // 从 URL 中提取语言环境参数

  // 确定当前语言环境，如果未提供则回退到默认语言环境
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构造基础路径
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言环境应始终前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言环境
    if (!locale || !locales.includes(locale)) {
      // 将重定向到默认语言环境并更新路径
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 用新条目替换当前历史记录条目
        />
      );
    }

    // 使用 IntlayerProvider 包裹子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言环境不带前缀。
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 使用 IntlayerProvider 包裹子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 设置语言环境特定路由的路由组件。
 * 它使用 React Router 管理导航并渲染本地化组件。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 路由模式以捕获语言环境（例如，/en/，/fr/）并匹配所有后续路径
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包裹子组件
      />

      {
        // 如果禁用默认语言环境的前缀，则在根路径直接渲染子组件
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包裹子组件
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 导入必要的依赖和函数
const {
  getConfiguration,
  getPathWithoutLocale,
  removeLocaleFromUrl,
} = require("intlayer"); // 从 'intlayer' 导入工具函数和类型
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 国际化上下文的提供程序
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // 管理导航的路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 处理本地化并使用适当的语言环境上下文包装子组件的组件。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 获取当前 URL 路径
  const { locale } = useParams(); // 从 URL 中提取语言环境参数

  // 确定当前语言环境，如果未提供则回退到默认语言环境
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构造基础路径
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言环境应始终前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言环境
    if (!locale || !locales.includes(locale)) {
      // 将重定向到默认语言环境并更新路径
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 用新条目替换当前历史记录条目
        />
      );
    }

    // 使用 IntlayerProvider 包裹子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言环境不带前缀。
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 使用 IntlayerProvider 包裹子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 设置语言环境特定路由的路由组件。
 * 它使用 React Router 管理导航并渲染本地化组件。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 路由模式以捕获语言环境（例如，/en/，/fr/）并匹配所有后续路径
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包裹子组件
      />

      {
        // 如果禁用默认语言环境的前缀，则在根路径直接渲染子组件
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 用语言管理包裹子组件
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### （可选）第 8 步：在语言环境更改时更改 URL

要在语言环境更改时更改 URL，您可以使用 `useLocale` 钩子提供的 `onLocaleChange` 属性。同时，您可以使用来自 `react-router-dom` 的 `useLocation` 和 `useNavigate` 钩子来更新 URL 路径。

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
    // 构造更新语言环境的 URL
    // 示例：/es/about 将语言环境设置为西班牙语
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
              {/* 以其自己的语言环境显示语言 - 例如法语 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 以当前语言环境显示的语言 - 例如以 Locales.SPANISH 设置当前语言环境的法语 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言 - 例如法语 */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 以其自己的语言环境显示语言 - 例如 FR */}
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
    // 构造更新语言环境的 URL
    // 示例：/es/about 将语言环境设置为西班牙语
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
              {/* 以其自己的语言环境显示语言 - 例如法语 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 以当前语言环境显示的语言 - 例如以 Locales.SPANISH 设置当前语言环境的法语 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言 - 例如法语 */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 以其自己的语言环境显示语言 - 例如 FR */}
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
    // 构造更新语言环境的 URL
    // 示例：/es/about 将语言环境设置为西班牙语
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
              {/* 以其自己的语言环境显示语言 - 例如法语 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 以当前语言环境显示的语言 - 例如以 Locales.SPANISH 设置当前语言环境的法语 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言 - 例如法语 */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 以其自己的语言环境显示语言 - 例如 FR */}
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

Intlayer 使用模块扩展来获得 TypeScript 的好处，使您的代码库更加强大。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的 TypeScript 配置包括自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    "types", // 包括自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这使您可以避免将其提交到 Git 存储库。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```
