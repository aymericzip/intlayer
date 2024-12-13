# 开始使用 Intlayer、Vite 和 React 进行国际化 (i18n)

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**，使用声明式词典在组件级别进行管理。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成的类型，提高自动完成和错误检测。
- **享受高级特性**，如动态区域侦测和切换。

---

## 在 Vite 和 React 应用程序中设置 Intlayer 的逐步指南

### 第 1 步：安装依赖

使用 npm 安装必要的包：

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### 第 2 步：项目配置

创建配置文件来配置您的应用程序语言：

```typescript
// intlayer.config.ts

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

要查看所有可用参数，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第 3 步：在您的 Vite 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中。

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### 第 4 步：声明您的内容

创建并管理您的内容字典：

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

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
      // 如果您在内容中使用 React 节点，请务必导入 React
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

> 注意：如果您的内容文件包括 TSX 代码，请考虑在您的内容文件中导入 `import React from "react";`。

[查看如何声明您的 Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。

### 第 5 步：在您的代码中使用 Intlayer

在整个应用程序中访问您的内容字典：

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
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
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> 注意：如果您想在 `string` 属性中使用内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用函数的值，如：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### （可选）第 6 步：更改内容的语言

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。该函数允许您设置应用程序的区域并相应更新内容。

```tsx
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

### （可选）第 7 步：为您的应用程序添加本地化路由

此步骤的目的是为每种语言创建唯一的路由。这对于 SEO 和 SEO 友好的 URL 很有用。
示例：

```tsx
// /dashboard
// /es/dashboard
// /fr/dashboard
```

> 默认情况下，默认语言的路由没有前缀。如果您想要前缀默认语言，可以在配置中将 `middleware.prefixDefault` 选项设置为 `true`。有关更多信息，请参见 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

要在您的应用程序中添加本地化路由，您可以创建一个 `LocaleRouter` 组件，它包装您的应用程序路由并处理基于语言的路由。以下是使用 [React Router](https://reactrouter.com/home) 的示例：

```tsx
// 导入必要的依赖和功能
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 从 'intlayer' 导入实用程序函数和类型
import { FC, PropsWithChildren } from "react"; // React 组件和属性的类型
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供程序
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 用于管理导航的路由组件

// 从 Intlayer 解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 处理本地化并将子项包装在适当的语言上下文中的组件。
 * 处理基于 URL 的语言检测和验证。
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 获取当前 URL 路径
  const { locale } = useParams<{ locale: Locales }>(); // 从 URL 中提取语言参数

  // 确定当前语言，如果没有提供则回退到默认语言
  const currentLocale = locale ?? defaultLocale;

  // 从路径中去除语言前缀以构造基本路径
  const pathWithoutLocale = getPathWithoutLocale(
    path // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，默认语言应该始终有前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言
    if (!locale || !locales.includes(locale)) {
      // 重定向到默认语言并更新路径
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 用新条目替换当前历史条目
        />
      );
    }

    // 使用 IntlayerProvider 包装子项并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言没有前缀。
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 使用 IntlayerProvider 包装子项并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 设置特定于语言的路由的路由组件。
 * 使用 React Router 管理导航并渲染本地化组件。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 路由模式捕获语言 (例如， /en/， /fr/) 并匹配所有后续路径
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 使用语言管理包装子项
      />

      {
        // 如果禁用默认语言的前缀，则直接在根路径渲染子项
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 使用语言管理包装子项
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

同时，您还可以使用 intLayerMiddlewarePlugin 为您的应用程序添加服务器端路由。此插件将自动根据 URL 检测当前语言并设置适当的语言 cookie。如果没有指定语言，该插件将根据用户的浏览器语言偏好确定最合适的语言。如果未检测到任何语言，将重定向到默认语言。

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### （可选）第 8 步：更改语言时更改 URL

要在语言更改时更改 URL，您可以使用 `useLocale` 钩子提供的 `onLocaleChange` 属性。与此同时，您可以使用 `react-router-dom` 的 `useLocation` 和 `useNavigate` 钩子来更新 URL 路径。

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // 获取当前 URL 路径。例如： /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 构造带有更新语言的 URL
    // 示例： /es/about 将语言设置为西班牙文
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // 更新 URL 路径
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

### 配置 TypeScript

Intlayer 使用模块扩展来获得 TypeScript 的好处，并增强您的代码库。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的 TypeScript 配置包括生成的类型。

```json5
// tsconfig.json

{
  // 你的自定义配置
  include: [
    "src",
    "types", // <- 包括自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这允许您避免将它们提交到 Git 仓库。

为此，您可以在 `.gitignore` 文件中添加以下指令：

```gitignore
# 忽略 Intlayer 生成的文件
.intlayer
```
