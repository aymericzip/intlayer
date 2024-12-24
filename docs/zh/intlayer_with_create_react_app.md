# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## What is Intlayer?

**Intlayer** 是一个创新的开源国际化(i18n)库，旨在简化现代Web应用程序中的多语言支持。

使用Intlayer，您可以：

- **轻松管理翻译**，使用组件级的声明性字典。
- **动态本地化元数据**、路由和内容。
- **确保TypeScript支持**，自动生成类型，提高自动补全和错误检测能力。
- **受益于高级功能**，如动态语言检测和切换。

---

## Step-by-Step Guide to Set Up Intlayer in a React Application

### Step 1: Install Dependencies

使用npm安装必要的包：

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Step 2: Configuration of your project

创建一个配置文件以配置您应用程序的语言：

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

要查看所有可用参数，请参考[在这里的配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### Step 3: Integrate Intlayer in Your CRA Configuration

更改您的脚本以使用react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

注意：react-intlayer脚本是基于craco的。您也可以根据intlayer craco插件实现自己的设置。[在这里查看示例](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

### Step 4: Declare Your Content

创建并管理您的内容字典：

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

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
        en: "学习React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

[请查看如何声明您的Intlayer声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。

### Step 5: Utilize Intlayer in Your Code

在您的应用程序中访问您的内容字典：

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
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
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* 为了正确使用useIntlayer钩子，您应该在子组件中访问您的数据 */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerProvider>
  );
}

export default App;
```

> 注意：如果您想在`string`属性中使用您的内容，例如`alt`、`title`、`href`、`aria-label`等，您必须调用函数的值，如：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Step 6: Change the language of your content

要更改您内容的语言，您可以使用`useLocale`钩子提供的`setLocale`函数。该函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>更改语言为英语</button>
  );
};
```

### (Optional) Step 7: Add localized Routing to your application

此步骤的目的是为每种语言创建唯一路由。这对于SEO和搜索引擎友好的URL非常有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 默认情况下，默认语言环境的路由没有前缀。如果您想为默认语言环境添加前缀，可以在配置中将`middleware.prefixDefault`选项设置为`true`。有关更多信息，请参见[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

要将本地化路由添加到您的应用程序，您可以创建一个`LocaleRouter`组件，该组件包装您的应用程序的路由并处理基于语言的路由。以下是使用[React Router](https://reactrouter.com/home)的示例：

```tsx
// 导入必要的依赖项和函数
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 从'intlayer'导入的实用函数和类型
import { FC, PropsWithChildren } from "react"; // React类型用于功能组件和属性
import { IntlayerProvider } from "react-intlayer"; // 国际化上下文的提供者
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 用于管理导航的路由组件

// 从Intlayer解构配置
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 处理本地化的组件，并用适当的语言环境上下文包装子组件。
 * 它管理基于URL的语言环境检测和验证。
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 获取当前URL路径
  const { locale } = useParams<{ locale: Locales }>(); // 从URL提取语言环境参数

  // 确定当前语言环境，如果未提供则回退到默认
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构建基本路径
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 当前URL路径
  );

  /**
   * 如果middleware.prefixDefault为true，则默认语言环境应始终有前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言环境
    if (!locale || !locales.includes(locale)) {
      // 重定向到具有更新路径的默认语言环境
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 用新条目替换当前历史条目
        />
      );
    }

    // 用IntlayerProvider包装子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当middleware.prefixDefault为false时，默认语言环境没有前缀。
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

    // 用IntlayerProvider包装子组件并设置当前语言环境
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 设置语言环境特定路由的路由组件。
 * 它使用React Router管理导航并渲染本地化组件。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 路由模式以捕获语言环境（例如，/en/，/fr/）并匹配所有后续路径
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 用语言环境管理包装子组件
      />

      {
        // 如果禁用了默认语言环境的前缀，则直接在根路径渲染子组件
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 用语言环境管理包装子组件
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optional) Step 8: Change the URL when the locale changes

要在语言环境更改时更改URL，您可以使用`useLocale`钩子提供的`onLocaleChange`属性。与此同时，您可以使用`react-router-dom`中的`useLocation`和`useNavigate`钩子来更新URL路径。

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // 获取当前URL路径。例如：/fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 使用更新的语言环境构建URL
    // 示例：/es/about将语言环境设置为西班牙语
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // 更新URL路径
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>更改语言为英语</button>
  );
};
```

### Configure TypeScript

Intlayer使用模块增强功能来获取TypeScript的好处并使您的代码库更强大。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的TypeScript配置包括自动生成的类型。

```json5
// tsconfig.json

{
  // 您的自定义配置
  "include": [
    "src",
    "types", // <- 包含自动生成的类型
  ],
}
```

### Git Configuration

建议忽略Intlayer生成的文件。这可以避免将它们提交到您的Git存储库。

为此，您可以将以下说明添加到您的`.gitignore`文件：

```plaintext
# 忽略Intlayer生成的文件
.intlayer
```
