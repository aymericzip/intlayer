# 开始使用 Intlayer 和 Vite 及 React 进行国际化 (i18n)

<iframe title="Vite + React: Build a Multilingual App from Scratch using Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

在 GitHub 上查看 [应用程序模板](https://github.com/aymericzip/intlayer-vite-react-template)。

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**，在组件级别使用声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成类型，提高自动补全和错误检测能力。
- **享受高级功能**，如动态语言检测和切换。

---

## 在 Vite 和 React 应用中设置 Intlayer 的分步指南

### 第一步：安装依赖

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 的国际化工具。

- **react-intlayer**
  将 Intlayer 集成到 React 应用程序的包。它为 React 国际化提供上下文提供者和钩子。

- **vite-intlayer**
  包括用于将 Intlayer 集成到 [Vite 打包工具](https://vite.dev/guide/why.html#why-bundle-for-production) 的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第二步：配置您的项目

创建一个配置文件来配置您的应用程序语言：

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

### 第三步：在 Vite 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite 插件用于将 Intlayer 集成到 Vite 中。它确保构建内容声明文件并在开发模式下监视它们。它在 Vite 应用程序中定义 Intlayer 环境变量。此外，它提供了别名以优化性能。

### 第四步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      zh: "Vite 标志",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      zh: "React 标志",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      zh: "计数是 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      zh: (
        <>
          编辑 <code>src/App.tsx</code> 并保存以测试 HMR
        </>
      ),
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
      zh: "点击 Vite 和 React 标志以了解更多信息",
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      zh: "Vite 标志",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      zh: "React 标志",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      zh: "计数是 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // 如果在内容中使用 React 节点，请记得导入 React
        zh: (
          <>
            编辑 <code>src/App.tsx</code> 并保存以测试 HMR
          </>
        ),
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
      zh: "点击 Vite 和 React 标志以了解更多信息",
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

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      zh: "Vite 标志",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      zh: "React 标志",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      zh: "计数是 ",
      en: "count is ",
      fr: "le compte est ",
---

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "zh": "Vite 徽标",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "zh": "React 徽标",
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "zh": "Vite + React",
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "zh": "计数是 ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "zh": "编辑 src/App.tsx 并保存以测试 HMR",
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "zh": "点击 Vite 和 React 徽标以了解更多",
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> 您的内容声明可以在应用程序中的任何地方定义，只要它们包含在 `contentDir` 目录中（默认情况下为 `./src`）。并且匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。
> 有关更多详细信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。
> 如果您的内容文件包含 TSX 代码，您应该考虑在内容文件中导入 `import React from "react";`。

### 第五步：在代码中使用 Intlayer

在整个应用程序中访问您的内容字典：

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

> 如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用函数的值，例如：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayer.md)。

### （可选）第六步：更改内容语言

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>切换语言为英语</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>切换语言为英语</button>
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

> 要了解更多关于 `useLocale` 钩子的内容，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)。

### （可选）步骤 7：为您的应用程序添加本地化路由

此步骤的目的是为每种语言创建唯一的路由。这对于 SEO 和 SEO 友好的 URL 非常有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 默认情况下，默认语言的路由不会添加前缀。如果您希望为默认语言添加前缀，可以在配置中将 `middleware.prefixDefault` 选项设置为 `true`。有关更多信息，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

要为您的应用程序添加本地化路由，您可以创建一个 `LocaleRouter` 组件，该组件包装您的应用程序路由并处理基于语言的路由。以下是使用 [React Router](https://reactrouter.com/home) 的示例：

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 导入必要的依赖项和函数
// 来自 'intlayer' 的实用函数和类型
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // 来自 'intlayer' 的实用函数和类型
import type { FC, PropsWithChildren } from "react"; // React 的函数组件和属性类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供者
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 用于管理导航的路由组件

// 从 Intlayer 中解构配置
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化并使用适当的语言上下文包装子组件的组件。
 * 它管理基于 URL 的语言检测和验证。
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // 获取当前的 URL 路径

  // 确定当前语言，如果未提供则回退到默认语言
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言前缀以构造基础路径
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 当前的 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言应始终添加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言并更新路径
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 用新路径替换当前历史记录条目
        />
      );
    }

    // 使用 IntlayerProvider 包装子组件并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言不会添加前缀。
     * 确保当前语言有效且不是默认语言。
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
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 使用 IntlayerProvider 包装子组件并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 一个设置语言特定路由的路由组件。
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
            // 路由模式，用于捕获语言（例如 /en/, /fr/）并匹配所有后续路径
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 使用语言管理包装子组件
          />
        ))}

      {
        // 如果禁用了默认语言的前缀，则直接在根路径渲染子组件
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 使用语言管理包装子组件
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
import { configuration, getPathWithoutLocale } from "intlayer"; // 来自 'intlayer' 的实用函数和类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供者
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 用于管理导航的路由组件

// 从 Intlayer 中解构配置
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 一个处理本地化并使用适当的语言上下文包装子组件的组件。
 * 它管理基于 URL 的语言检测和验证。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 获取当前的 URL 路径

  // 确定当前语言，如果未提供则回退到默认语言
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言前缀以构造基础路径
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 当前的 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，则默认语言应始终添加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言并更新路径
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 用新路径替换当前历史记录条目
        />
      );
    }

    // 使用 IntlayerProvider 包装子组件并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言不会添加前缀。
     * 确保当前语言有效且不是默认语言。
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
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 使用 IntlayerProvider 包装子组件并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 一个设置特定语言环境路由的路由组件。
 * 它使用 React Router 来管理导航并渲染本地化组件。
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
            // 路由模式，用于捕获语言环境（例如 /en/, /fr/）并匹配所有后续路径
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 使用语言环境管理包装子组件
          />
        ))}

      {
        // 如果默认语言环境的前缀被禁用，则直接在根路径渲染子组件
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
// 导入必要的依赖和函数
const { configuration, getPathWithoutLocale } = require("intlayer"); // 从 'intlayer' 获取的工具函数和类型
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
 * 一个处理本地化的组件，用适当的语言环境上下文包装子组件。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 获取当前的 URL 路径

  // 确定当前语言环境，如果未提供则回退到默认值
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构建基础路径
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 当前的 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，默认语言环境应始终带有前缀。
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
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 使用 IntlayerProvider 包装子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 一个设置特定语言环境路由的路由组件。
 * 它使用 React Router 来管理导航并渲染本地化组件。
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
            // 路由模式，用于捕获语言环境（例如 /en/, /fr/）并匹配所有后续路径
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 使用语言环境管理包装子组件
          />
        ))}

      {
        // 如果默认语言环境的前缀被禁用，则直接在根路径渲染子组件
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

然后，您可以在应用程序中使用 `LocaleRouter` 组件：

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

同时，您还可以使用 `intLayerMiddlewarePlugin` 为您的应用程序添加服务器端路由。此插件将根据 URL 自动检测当前语言环境并设置适当的语言环境 Cookie。如果未指定语言环境，插件将根据用户的浏览器语言偏好确定最合适的语言环境。如果未检测到语言环境，它将重定向到默认语言环境。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### （可选）步骤 8：当语言环境更改时更改 URL

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
  const { pathname, search } = useLocation(); // 获取当前的 URL 路径。例如：/fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 构建带有更新语言环境的 URL
      // 示例: /es/about?foo=bar
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
              {/* 语言在其自身的语言环境中 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境中的语言 - 例如当前语言环境设置为 Locales.SPANISH 时显示 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英文中的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
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
  const { pathname, search } = useLocation(); // 获取当前 URL 路径。例如: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 构建带有更新语言环境的 URL
      // 示例: /es/about?foo=bar
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
              {/* 语言在其自身的语言环境中 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境中的语言 - 例如当前语言环境设置为 Locales.SPANISH 时显示 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英文中的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
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
  const { pathname, search } = useLocation(); // 获取当前 URL 路径。例如: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 构建带有更新语言环境的 URL
      // 示例: /es/about?foo=bar
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
              {/* 语言在其自身的语言环境中 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境中的语言 - 例如当前语言环境设置为 Locales.SPANISH 时显示 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英文中的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> 文档参考:
>
> - [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

### （可选）步骤 9：切换 HTML 的语言和方向属性

当您的应用程序支持多种语言时，动态更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前语言环境非常重要。这确保了：

- **可访问性**：屏幕阅读器和辅助技术依赖正确的 `lang` 属性来准确发音和解释内容。
- **文本渲染**：`dir`（方向）属性确保文本以正确的顺序呈现（例如，英文为从左到右，阿拉伯语或希伯来语为从右到左），这对于可读性至关重要。
- **SEO**：搜索引擎使用 `lang` 属性来确定页面的语言，有助于在搜索结果中提供正确的本地化内容。

通过在语言环境更改时动态更新这些属性，您可以为所有支持的语言用户提供一致且可访问的体验。

#### 实现钩子

创建一个自定义钩子来管理 HTML 属性。该钩子监听语言环境的变化并相应地更新属性：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**

 * - `lang`：通知浏览器和搜索引擎页面的语言。
 * - `dir`：确保正确的阅读顺序（例如，英语为 'ltr'，阿拉伯语为 'rtl'）。
 *
 * 这种动态更新对于正确的文本渲染、可访问性和 SEO 至关重要。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 更新语言属性为当前的语言环境。
    document.documentElement.lang = locale;

    // 根据当前的语言环境设置文本方向。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 更新 HTML <html> 元素的 `lang` 和 `dir` 属性以匹配当前的语言环境。
 * - `lang`：通知浏览器和搜索引擎页面的语言。
 * - `dir`：确保正确的阅读顺序（例如，英语为 'ltr'，阿拉伯语为 'rtl'）。
 *
 * 这种动态更新对于正确的文本渲染、可访问性和 SEO 至关重要。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 更新语言属性为当前的语言环境。
    document.documentElement.lang = locale;

    // 根据当前的语言环境设置文本方向。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * 更新 HTML <html> 元素的 `lang` 和 `dir` 属性以匹配当前的语言环境。
 * - `lang`：通知浏览器和搜索引擎页面的语言。
 * - `dir`：确保正确的阅读顺序（例如，英语为 'ltr'，阿拉伯语为 'rtl'）。
 *
 * 这种动态更新对于正确的文本渲染、可访问性和 SEO 至关重要。
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 更新语言属性为当前的语言环境。
    document.documentElement.lang = locale;

    // 根据当前的语言环境设置文本方向。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### 在您的应用中使用 Hook

将该 Hook 集成到您的主组件中，以便在语言环境更改时更新 HTML 属性：

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // 应用 Hook，根据语言环境更新 <html> 标签的 lang 和 dir 属性。
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
  // 应用 Hook，根据语言环境更新 <html> 标签的 lang 和 dir 属性。
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
  // 应用 Hook，根据语言环境更新 <html> 标签的 lang 和 dir 属性。
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

- 确保 **语言** (`lang`) 属性正确反映当前的语言环境，这对于 SEO 和浏览器行为非常重要。
- 根据语言环境调整 **文本方向** (`dir`)，提高不同阅读顺序语言的可读性和可用性。
- 提供更 **可访问** 的体验，因为辅助技术依赖于这些属性以最佳方式运行。

### （可选）步骤 10：创建一个本地化的 Link 组件

为了确保您的应用导航符合当前的语言环境，您可以创建一个自定义的 `Link` 组件。该组件会自动为内部 URL 添加当前语言的前缀。例如，当法语用户点击指向“关于”页面的链接时，他们会被重定向到 `/fr/about` 而不是 `/about`。

这种行为的好处包括：

- **SEO 和用户体验**：本地化的 URL 帮助搜索引擎正确索引语言特定的页面，并为用户提供其偏好语言的内容。
- **一致性**：通过在整个应用中使用本地化链接，确保导航保持在当前语言环境中，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在一个组件中，简化了 URL 的管理，使代码库更易于维护和扩展。

以下是一个使用 TypeScript 实现的本地化 `Link` 组件：

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * 检查给定的 URL 是否为外部链接的工具函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义的 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言前缀（例如，/fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // 如果链接是内部链接且提供了有效的 href，则获取本地化的 URL。
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * 检查给定的 URL 是否为外部链接的工具函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义的 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言前缀（例如，/fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {

const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 如果链接是内部链接并且提供了有效的 href，则获取本地化的 URL。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * 检查给定 URL 是否为外部链接的工具函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被认为是外部链接。
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义的 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言环境前缀（例如 /fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 如果链接是内部链接并且提供了有效的 href，则获取本地化的 URL。
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### 工作原理

- **检测外部链接**：  
  辅助函数 `checkIsExternalLink` 用于判断 URL 是否为外部链接。外部链接保持不变，因为它们不需要本地化。

- **获取当前语言环境**：  
  `useLocale` 钩子提供当前的语言环境（例如，法语为 `fr`）。

- **本地化 URL**：  
  对于内部链接（即非外部链接），`getLocalizedUrl` 会自动为 URL 添加当前语言环境的前缀。这意味着如果用户使用法语，传递 `/about` 作为 `href` 会被转换为 `/fr/about`。

- **返回链接**：  
  组件返回一个带有本地化 URL 的 `<a>` 元素，确保导航与语言环境一致。

通过在应用程序中集成此 `Link` 组件，可以维护一致且语言感知的用户体验，同时还可以提升 SEO 和可用性。

### 配置 TypeScript

Intlayer 使用模块增强功能来利用 TypeScript，使您的代码库更强大。

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

建议忽略由 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库中。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```plaintext
# 忽略由 Intlayer 生成的文件
.intlayer
```

### 深入了解

要进一步了解，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_CMS.md) 外部化您的内容。
