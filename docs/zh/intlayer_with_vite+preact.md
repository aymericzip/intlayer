# 开始使用 Intlayer 和 Vite 及 Preact 进行国际化 (i18n)

> 此软件包正在开发中。有关更多信息，请参阅 [问题](https://github.com/aymericzip/intlayer/issues/118)。通过点赞该问题来表达您对 Intlayer for Preact 的兴趣。

请参阅 GitHub 上的 [应用模板](https://github.com/aymericzip/intlayer-vite-preact-template)。

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**，通过组件级别的声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成的类型，提高自动补全和错误检测。
- **享受高级功能**，如动态语言检测和切换。

---

## 在 Vite 和 Preact 应用中设置 Intlayer 的分步指南

### 第一步：安装依赖项

使用 npm 安装必要的软件包：

```bash packageManager="npm"
npm install intlayer preact-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer vite-intlayer
```

- **intlayer**

  提供配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 的核心包。

- **preact-intlayer**
  将 Intlayer 集成到 Preact 应用中的包。它为 Preact 国际化提供上下文提供者和钩子。

- **vite-intlayer**
  包括将 Intlayer 集成到 [Vite 打包工具](https://vite.dev/guide/why.html#why-bundle-for-production) 的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第二步：配置您的项目

创建一个配置文件来配置您的应用语言：

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
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite 插件用于将 Intlayer 集成到 Vite 中。它确保构建内容声明文件并在开发模式下监视它们。它在 Vite 应用中定义 Intlayer 环境变量。此外，它提供了别名以优化性能。

### 第四步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      zh: "Vite 标志",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      zh: "Preact 标志",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      zh: "计数是 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      zh: "编辑 src/app.tsx 并保存以测试 HMR",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      zh: "点击 Vite 和 Preact 标志以了解更多",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
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
    preactLogo: t({
      zh: "Preact 标志",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      zh: "计数是 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      zh: "编辑 src/app.jsx 并保存以测试 HMR",
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      zh: "点击 Vite 和 Preact 标志以了解更多",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // 如果您直接在 .cjs 中使用 JSX，则需要此项

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
    preactLogo: t({
      zh: "Preact 标志",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      zh: "计数是 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      zh: "编辑 src/app.tsx 并保存以测试 HMR",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      zh: "点击 Vite 和 Preact 标志以了解更多",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "zh": "Vite 标志",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "zh": "Preact 标志",
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "zh": "Vite + Preact",
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
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
        "zh": "编辑 src/app.tsx 并保存以测试 HMR",
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "zh": "点击 Vite 和 Preact 的标志以了解更多信息",
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认情况下为 `./src`）。并匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

> 如果您的内容文件包含 TSX 代码，您可能需要导入 `import { h } from "preact";` 或确保您的 JSX pragma 为 Preact 正确设置。

### 第五步：在代码中使用 Intlayer

在整个应用程序中访问您的内容字典：

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // 假设您有一个 preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // 假设您的 CSS 文件名为 app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> 如果您希望在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用函数的值，例如：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 注意：在 Preact 中，`className` 通常写作 `class`。

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayer.md)（`preact-intlayer` 的 API 类似）。

### （可选）第六步：更改内容的语言

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      切换语言为英语

import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      切换语言到英语
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>切换语言到英语</button>
  );
};

module.exports = LocaleSwitcher;
```

> 要了解更多关于 `useLocale` 钩子的内容，请参考 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)（`preact-intlayer` 的 API 类似）。

### （可选）步骤 7：为您的应用程序添加本地化路由

此步骤的目的是为每种语言创建唯一的路由。这对于 SEO 和 SEO 友好的 URL 非常有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 默认情况下，默认语言的路由不会添加前缀。如果您希望为默认语言添加前缀，可以在配置中将 `middleware.prefixDefault` 选项设置为 `true`。有关更多信息，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

要为您的应用程序添加本地化路由，您可以创建一个 `LocaleRouter` 组件，该组件包装您的应用程序路由并处理基于语言的路由。以下是使用 [preact-iso](https://github.com/preactjs/preact-iso) 的示例：

首先，安装 `preact-iso`：

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * 一个处理本地化的组件，并使用适当的语言环境上下文包装子组件。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // 确定当前语言环境，如果未提供则回退到默认值
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构建基础路径
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
          replace // 用新条目替换当前历史记录条目
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
          (loc) => loc.toString() !== defaultLocale.toString() // 排除默认语言环境
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

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * 一个设置语言环境特定路由的路由组件。
 * 它使用 preact-iso 管理导航并渲染本地化组件。
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// 导入必要的依赖项和函数
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // JSX 所需

// 从 Intlayer 中解构配置
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * 一个处理本地化的组件，并使用适当的语言环境上下文包装子组件。
 * 它管理基于 URL 的语言环境检测和验证。
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // 确定当前语言环境，如果未提供则回退到默认值
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言环境前缀以构建基础路径
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
          replace // 用新条目替换当前历史记录条目
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
          (loc) => loc.toString() !== defaultLocale.toString() // 排除默认语言环境
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
 * 当 middleware.prefixDefault 为 false 时，默认语言不会被添加前缀。
 * 确保当前语言是有效的且不是默认语言。
 */
if (
  currentLocale.toString() !== defaultLocale.toString() &&
  !locales
    .filter(
      (loc) => loc.toString() !== defaultLocale.toString() // 排除默认语言
    )
    .includes(currentLocale) // 检查当前语言是否在有效语言列表中
) {
  // 重定向到没有语言前缀的路径
  return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
}

// 使用 IntlayerProvider 包裹子组件并设置当前语言
return (
  <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
);
}
};

const RouterContent = ({ children }) => {
const { path } = useLocation();

if (!path) {
  return null;
}

const pathLocale = path.split("/")[1];

const isLocaleRoute = locales
  .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
  .some((locale) => locale.toString() === pathLocale);

if (isLocaleRoute) {
  return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
}

return (
  <AppLocalized
    locale={!middleware.prefixDefault ? defaultLocale : undefined}
  >
    {children}
  </AppLocalized>
);
};

/**
 * 一个设置语言特定路由的路由组件。
 * 它使用 preact-iso 来管理导航并渲染本地化组件。
 */
export const LocaleRouter = ({ children }) => (
<LocationProvider>
  <RouterContent>{children}</RouterContent>
</LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// 导入必要的依赖和函数
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // 用于 JSX 的必要导入

// 从 Intlayer 中解构配置
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * 一个处理本地化的组件，并使用适当的语言上下文包裹子组件。
 * 它管理基于 URL 的语言检测和验证。
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // 确定当前语言，如果未提供则回退到默认语言
  const currentLocale = locale ?? defaultLocale;

  // 从路径中移除语言前缀以构建基础路径
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 当前 URL 路径
  );

  /**
   * 如果 middleware.prefixDefault 为 true，默认语言应始终添加前缀。
   */
  if (middleware.prefixDefault) {
    // 验证语言
    if (!locale || !locales.includes(locale)) {
      // 重定向到带有更新路径的默认语言
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 用新路径替换当前历史记录条目
        />
      );
    }

    // 使用 IntlayerProvider 包裹子组件并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * 当 middleware.prefixDefault 为 false 时，默认语言不会被添加前缀。
     * 确保当前语言是有效的且不是默认语言。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // 排除默认语言
        )
        .includes(currentLocale) // 检查当前语言是否在有效语言列表中
    ) {
      // 重定向到没有语言前缀的路径
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 使用 IntlayerProvider 包裹子组件并设置当前语言
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * 一个设置语言特定路由的路由组件。
 * 它使用 preact-iso 来管理导航并渲染本地化组件。
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

然后，您可以在应用程序中使用 `LocaleRouter` 组件：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... 您的 AppContent 组件（在步骤 5 中定义）

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... 您的 AppContent 组件（在步骤 5 中定义）

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... 您的 AppContent 组件（在步骤 5 中定义）

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

同时，您还可以使用 `intLayerMiddlewarePlugin` 为您的应用程序添加服务器端路由。此插件将根据 URL 自动检测当前语言并设置适当的语言 Cookie。如果未指定语言，插件将根据用户的浏览器语言偏好确定最合适的语言。如果未检测到语言，它将重定向到默认语言。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### （可选）步骤 8：当语言更改时更改 URL

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
// 导入必要的模块
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso 提供完整的 URL
      // 构建带有更新语言环境的 URL
      // 示例: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // 更新 URL 路径
      route(pathWithLocale, true); // true 表示替换
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // 设置语言环境后，程序化导航将由 onLocaleChange 处理
            }}
            key={localeItem}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言的本地化名称 - 例如 Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境下的语言 - 例如 Francés，当当前语言环境设置为 Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
// 导入必要的模块
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // 用于 JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
// 导入必要的模块
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // 用于 JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> 文档参考：
>
> - [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)（`preact-intlayer` 的 API 类似）
> - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hreflang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh)
> - [`lang` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> - [Popover API](https://developer.mozilla.org/zh-CN/docs/Web/API/Popover_API)

以下是更新的 **步骤 9**，包含详细说明和优化的代码示例：

---

### （可选）步骤 9：切换 HTML 的语言和方向属性

当您的应用程序支持多种语言时，动态更新 `<html>` 标签的 `lang` 和 `dir` 属性非常重要。这样可以确保：

- **可访问性**：屏幕阅读器和辅助技术依赖正确的 `lang` 属性来准确发音和解释内容。
- **文本渲染**：`dir`（方向）属性确保文本以正确的顺序呈现（例如，英语为从左到右，阿拉伯语或希伯来语为从右到左），这对可读性至关重要。
- **SEO**：搜索引擎使用 `lang` 属性来确定页面的语言，从而在搜索结果中提供正确的本地化内容。

通过在语言环境更改时动态更新这些属性，可以为用户提供一致且可访问的多语言体验。

#### 实现钩子

创建一个自定义钩子来管理 HTML 属性。该钩子监听语言环境的变化并相应地更新属性：

import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/\*\*

- 根据当前语言环境更新 HTML <html> 元素的 `lang` 和 `dir` 属性。
- - `lang`: 通知浏览器和搜索引擎页面的语言。
- - `dir`: 确保正确的阅读顺序（例如，英语为 'ltr'，阿拉伯语为 'rtl'）。
-
- 此动态更新对于正确的文本渲染、可访问性和 SEO 至关重要。
  \*/
  export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

useEffect(() => {
// 将语言属性更新为当前语言环境。
document.documentElement.lang = locale;

    // 根据当前语言环境设置文本方向。
    document.documentElement.dir = getHTMLTextDir(locale);

}, [locale]);
};

````

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 根据当前语言环境更新 HTML <html> 元素的 `lang` 和 `dir` 属性。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
````

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * 根据当前语言环境更新 HTML <html> 元素的 `lang` 和 `dir` 属性。
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### 在应用程序中使用此 Hook

将该 Hook 集成到主组件中，以便在语言环境更改时更新 HTML 属性：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // 如果 AppContent 需要，useIntlayer 已经被导入
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// 第五步中的 AppContent 定义

const AppWithHooks: FunctionalComponent = () => {
  // 应用 Hook，根据语言环境更新 <html> 标签的 lang 和 dir 属性。
  useI18nHTMLAttributes();

  // 假设 AppContent 是第五步中的主要内容显示组件
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// 第五步中的 AppContent 定义

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// 第五步中的 AppContent 定义

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

通过应用这些更改，您的应用程序将：

- 确保 **语言** (`lang`) 属性正确反映当前语言环境，这对于 SEO 和浏览器行为非常重要。
- 根据语言环境调整 **文本方向** (`dir`)，提高不同阅读顺序语言的可读性和可用性。
- 提供更 **可访问** 的体验，因为辅助技术依赖这些属性以最佳方式运行。

### （可选）步骤 10：创建本地化链接组件

为了确保您的应用程序导航符合当前语言环境，您可以创建一个自定义 `Link` 组件。该组件会自动为内部 URL 添加当前语言前缀。

此行为的好处包括：

- **SEO 和用户体验**：本地化 URL 帮助搜索引擎正确索引特定语言页面，并为用户提供其首选语言的内容。
- **一致性**：通过在整个应用程序中使用本地化链接，确保导航保持在当前语言环境内，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在单个组件中，简化了 URL 的管理。

对于使用 `preact-iso` 的 Preact，通常使用标准的 `<a>` 标签进行导航，而 `preact-iso` 处理路由。如果需要在点击时进行编程导航（例如，在导航前执行操作），可以使用 `useLocation` 中的 `route` 函数。以下是创建一个本地化 URL 的自定义锚点组件的方法：

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // 假设 useLocation 和 route 可以通过 preact-intlayer 从 preact-iso 重新导出，或者直接导入
// 如果未重新导出，请直接导入：import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // 用于 HTMLAttributes
import { forwardRef } from "preact/compat"; // 用于转发 refs

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // 可选：替换历史状态
}

/**
 * 检查给定 URL 是否为外部链接的工具函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 自定义 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言前缀（例如，/fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 * 它使用标准的 <a> 标签，但可以使用 preact-iso 的 `route` 触发客户端导航。
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // 来自 preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // 确保 href 已定义
        event.button === 0 && // 左键点击
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // 标准修饰符检查
        !props.target // 不针对新标签/窗口
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // 仅在 URL 不同时导航
          route(hrefI18n, replace); // 使用 preact-iso 的 route
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";

import { forwardRef } from "preact/compat";
import { h } from "preact"; // 用于 JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // 从 preact-iso 导入
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // 用于 JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### 如何工作

- **检测外部链接**:  
  辅助函数 `checkIsExternalLink` 用于判断一个 URL 是否为外部链接。外部链接保持不变。
- **获取当前语言环境**:  
  `useLocale` 钩子提供当前的语言环境。
- **本地化 URL**:  
  对于内部链接，`getLocalizedUrl` 会为 URL 添加当前语言环境的前缀。
- **客户端导航**:  
  `handleClick` 函数检查是否是内部链接以及是否需要阻止标准导航。如果是，它会使用 `preact-iso` 的 `route` 函数（通过 `useLocation` 或直接导入获取）执行客户端导航。这提供了类似 SPA 的行为而无需完全刷新页面。
- **返回链接**:  
  组件返回一个带有本地化 URL 和自定义点击处理程序的 `<a>` 元素。

### 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更强大。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // 推荐用于 Preact 10+
    // ...
  },
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

> 确保您的 `tsconfig.json` 已为 Preact 设置，尤其是 `jsx` 和 `jsxImportSource` 或 `jsxFactory`/`jsxFragmentFactory`（如果未使用 `preset-vite` 的默认值，则适用于旧版 Preact）。

### Git 配置

建议忽略由 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库中。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```plaintext
# 忽略由 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- **自动补全** 翻译键。
- **实时错误检测** 缺失的翻译。
- **内联预览** 翻译内容。
- **快速操作** 轻松创建和更新翻译。

有关如何使用此扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 更进一步

要更进一步，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_CMS.md) 来外部化您的内容。
