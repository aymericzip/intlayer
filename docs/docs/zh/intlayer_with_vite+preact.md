---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite 和 Preact i18n - 如何翻译您的 Preact 应用 – 指南 2026
description: 了解如何使您的 Vite 和 Preact 网站支持多语言。按照文档进行国际化（i18n）和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: 添加 init 命令
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 使用 Intlayer 翻译您的 Vite 和 Preact 网站 | 国际化 (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**：使用组件级的声明式字典。
- **动态本地化元数据、路由和内容**。
- **确保 TypeScript 支持**：通过自动生成的类型，改进自动补全和错误检测。
- **受益于高级功能**：例如动态语言环境检测和切换。

---

## 在 Vite 和 Preact 应用程序中设置 Intlayer 的分步指南

请参阅 GitHub 上的 [应用程序模板](https://github.com/aymericzip/intlayer-vite-preact-template)。

### 第 1 步：安装依赖项

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  提供配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、编译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 的核心包。

- **preact-intlayer**

  将 Intlayer 与 Preact 应用程序集成的包。它为 Preact 国际化提供上下文提供者和钩子。

- **vite-intlayer**

  包含用于将 Intlayer 与 [Vite 打包器](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户首选语言环境、管理 cookie 和处理 URL 重定向的中间件。

### 第 2 步：配置项目

创建一个配置文件来配置应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // 默认：除默认语言环境外，为所有语言环境添加前缀
    storage: ["cookie", "header"], // 默认：在 cookie 中存储语言环境并从 header 中检测
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
      // 您的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // 默认：除默认语言环境外，为所有语言环境添加前缀
    storage: ["cookie", "header"], // 默认：在 cookie 中存储语言环境并从 header 中检测
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
      // 您的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // 默认：除默认语言环境外，为所有语言环境添加前缀
    storage: ["cookie", "header"], // 默认：在 cookie 中存储语言环境并从 header 中检测
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化 URL、路由模式、存储选项、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 3 步：在 Vite 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保构建内容声明文件并在开发模式下监视它们。它在 Vite 应用程序中定义了 Intlayer 环境变量。此外，它还提供别名以优化性能。

### 第 4 步：声明内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
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
// import { h } from 'preact'; // 如果直接在 .mjs 中使用 JSX，则需要此行

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
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
// const { h } = require('preact'); // 如果直接在 .cjs 中使用 JSX，则需要此行

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite et Preact pour en savoir plus",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
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
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
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
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> 只要您的内容声明包含在 `contentDir` 目录（默认情况下为 `./src`）中，就可以在应用程序的任何位置定义它们。并且需匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）。

> 有关更多详细信息，请参考 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

> 如果您的内容文件包含 TSX 代码，您可能需要导入 `import { h } from "preact";` 或确保正确设置 Preact 的 JSX pragma。

### 第 5 步：在代码中使用 Intlayer

在整个应用程序中访问您的内容字典：

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // 假设您有 preact.svg
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
      {/* Markdown 内容 */}
      <div>{content.myMarkdownContent}</div>

      {/* HTML 内容 */}
      <div>{content.myHtmlContent}</div>

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

> 如果您想在字符串属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用该函数的值，例如：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 注意：在 Preact 中，`className` 通常写作 `class`。

> 要了解有关 `useIntlayer` 钩子的更多信息，请参考 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)（`preact-intlayer` 的 API 类似）。

### （可选）第 6 步：更改内容语言

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
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
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> 要了解有关 `useLocale` 钩子的更多信息，请参考 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)（`preact-intlayer` 的 API 类似）。

### （可选）步骤 7：为您的应用程序添加本地化路由

此步骤的目的是为每种语言设置唯一的路由。这对于 SEO 和 SEO 友好的 URL 非常有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 默认情况下，默认语言环境的路由不带前缀。如果您想为默认语言环境添加前缀，可以在配置中将 `routing.mode` 选项设置为 `"prefix-all"`。有关更多信息，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

要为您的应用程序添加本地化路由，您可以创建一个 `LocaleRouter` 组件，该组件包裹您的应用程序路由并处理基于语言环境的路由。以下是使用 [preact-iso](https://github.com/preactjs/preact-iso) 的示例：

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * 设置特定语言环境路由的路由组件。
 * 它使用 preact-iso 管理导航并渲染本地化组件。
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";

/**
 * 设置特定语言环境路由的路由组件。
 * 它使用 preact-iso 管理导航并渲染本地化组件。
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
const { localeMap } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, Router, Route } = require("preact-iso");

/**
 * 设置特定语言环境路由的路由组件。
 * 它使用 preact-iso 管理导航并渲染本地化组件。
 */
const LocaleRouter = ({ children }) =>
  h(
    LocationProvider,
    {},
    h(
      Router,
      {},
      localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) =>
          h(Route, {
            key: locale,
            path: `${urlPrefix}/:rest*`,
            component: () => h(IntlayerProvider, { locale }, children),
          })
        )
    )
  );

module.exports = { LocaleRouter };
```

然后，您可以在应用程序中使用 `LocaleRouter` 组件：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... 您的 AppContent 组件

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... 您的 AppContent 组件

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... 您的 AppContent 组件

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

### （可选）步骤 8：在语言环境更改时更改 URL

要在语言环境更改时更改 URL，可以使用 `useLocale` 钩子提供的 `onLocaleChange` 属性。同时，您可以使用 `preact-iso` 中 `useLocation` 的 `route` 方法来更新 URL 路径。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // 使用更新后的语言环境构建 URL
      // 示例：/es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // 更新 URL 路径
      route(pathWithLocale, true); // true 表示替换 (replace)
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // 设置语言环境后的程序化导航将由 onLocaleChange 处理
            }}
            key={localeItem}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 该语言环境自身的语言名称 - 例如 Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境下的语言名称 - 例如当当前语言环境为 Locales.SPANISH 时显示 Francés */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语名称 - 例如 French */}
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
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
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
const { useLocation } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return h(
    "div",
    {},
    h("button", { popovertarget: "localePopover" }, getLocaleName(locale)),
    h(
      "div",
      { id: "localePopover", popover: "auto" },
      availableLocales.map((localeItem) =>
        h(
          "a",
          {
            href: getLocalizedUrl(url, localeItem),
            hreflang: localeItem,
            "aria-current": locale === localeItem ? "page" : undefined,
            onClick: (e) => {
              e.preventDefault();
              setLocale(localeItem);
            },
            key: localeItem,
          },
          h("span", {}, localeItem),
          h("span", {}, getLocaleName(localeItem, localeItem)),
          h(
            "span",
            { dir: getHTMLTextDir(localeItem), lang: localeItem },
            getLocaleName(localeItem, locale)
          ),
          h(
            "span",
            { dir: "ltr", lang: Locales.ENGLISH },
            getLocaleName(localeItem, Locales.ENGLISH)
          )
        )
      )
    )
  );
};

module.exports = LocaleSwitcher;
```

> 文档参考：
>
> > - [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)（`preact-intlayer` 的 API 类似）> - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)> - [`hreflang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)> - [`lang` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)> - [`dir` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` 属性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/zh-CN/docs/Web/API/Popover_API)

### （可选）第 9 步：切换 HTML 语言和方向属性

当您的应用程序支持多种语言时，更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前语言环境至关重要。这样做可以确保：

- **无障碍性**：屏幕阅读器和辅助技术依靠正确的 `lang` 属性来准确发音和解释内容。
- **文本渲染**：`dir`（方向）属性确保文本以正确的顺序呈现（例如，英语从左到右，阿拉伯语或希伯来语从右到左），这对于可读性至关重要。
- **SEO**：搜索引擎使用 `lang` 属性来确定页面的语言，有助于在搜索结果中提供正确的本地化内容。

通过在语言环境更改时动态更新这些属性，您可以确保所有支持语言的用户都能获得一致且无障碍的体验。

#### 实现钩子

创建一个自定义钩子来管理 HTML 属性。该钩子监听语言环境更改并相应地更新属性：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 根据当前语言环境更新 HTML <html> 元素的 `lang` 和 `dir` 属性。
 * - `lang`: 通知浏览器和搜索引擎页面的语言。
 * - `dir`: 确保正确的阅读顺序（例如，英语为 'ltr'，阿拉伯语为 'rtl'）。
 *
 * 这种动态更新对于正确的文本渲染、无障碍访问和 SEO 至关重要。
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
```

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

#### 在应用程序中使用钩子

将钩子集成到您的主组件中，以便在语言环境更改时更新 HTML 属性：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // 如果 AppContent 需要，useIntlayer 已导入
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// 第 5 步中的 AppContent 定义

const AppWithHooks: FunctionalComponent = () => {
  // 应用钩子以根据语言环境更新 <html> 标签的 lang 和 dir 属性。
  useI18nHTMLAttributes();

  // 假设 AppContent 是您在第 5 步中的主要内容显示组件
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
// 第 5 步中的 AppContent 定义

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
// 第 5 步中的 AppContent 定义

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

### （可选）第 10 步：创建本地化链接组件

为了确保您的应用程序导航尊重当前语言环境，您可以创建一个自定义 `Link` 组件。此组件会自动为内部 URL 添加当前语言前缀。

这种行为在以下几个方面非常有用：

- **SEO 和用户体验**：本地化 URL 帮助搜索引擎正确索引特定语言的页面，并为用户提供其首选语言的内容。
- **一致性**：通过在整个应用程序中使用本地化链接，您可以确保导航保持在当前语言环境内，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在单个组件中可以简化 URL 的管理。

以下是 Preact 中本地化 `Link` 组件的实现：

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * 检查给定 URL 是否为外部链接的实用函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义 Link 组件，根据当前语言环境自适应 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言环境前缀（例如 /fr/about）。
 * 这确保了导航保持在同一语言环境上下文中。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // 如果链接是内部的且提供了有效的 href，则获取本地化 URL。
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

```jsx fileName="src/components/Link.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";

/**
 * 检查给定 URL 是否为外部链接的实用函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义 Link 组件，根据当前语言环境自适应 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言环境前缀（例如 /fr/about）。
 * 这确保了导航保持在同一语言环境上下文中。
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 如果链接是内部的且提供了有效的 href，则获取本地化 URL。
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

```jsx fileName="src/components/Link.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { forwardRef } = require("preact/compat");

/**
 * 检查给定 URL 是否为外部链接的实用函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义 Link 组件，根据当前语言环境自适应 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 添加语言环境前缀（例如 /fr/about）。
 * 这确保了导航保持在同一语言环境上下文中。
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 如果链接是内部的且提供了有效的 href，则获取本地化 URL。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return h(
    "a",
    {
      href: hrefI18n,
      ref: ref,
      ...props,
    },
    children
  );
});

Link.displayName = "Link";

module.exports = { Link, checkIsExternalLink };
```

#### 工作原理

- **检测外部链接**：  
  辅助函数 `checkIsExternalLink` 确定 URL 是否为外部。外部链接保持不变，因为它们不需要本地化。
- **检索当前语言环境**：  
  `useLocale` 钩子提供当前的语言环境（例如，法语为 `fr`）。
- **本地化 URL**：  
  对于内部链接（即非外部链接），使用 `getLocalizedUrl` 自动为 URL 添加当前语言环境的前缀。这意味着如果您的用户处于法语环境，将 `/about` 作为 `href` 传递将使其转换为 `/fr/about`。
- **返回链接**：  
  该组件返回一个带有本地化 URL 的 `<a>` 元素，确保导航与语言环境保持一致。

### （可选）第 11 步：渲染 Markdown 和 HTML

Intlayer 支持在 Preact 中渲染 Markdown 和 HTML 内容。

您可以通过使用 `.use()` 方法自定义 Markdown 和 HTML 内容的渲染。此方法允许您覆盖特定标签的默认渲染。

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* 基本渲染 */}
    {myMarkdownContent}

    {/* Markdown 的自定义渲染 */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* HTML 的基本渲染 */}
    {myHtmlContent}

    {/* HTML 的自定义渲染 */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更健壮。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

> 确保您的 `tsconfig.json` 已为 Preact 设置，特别是 `jsx` 和 `jsxImportSource`；如果不使用 `preset-vite` 的默认值，对于较旧的 Preact 版本，还需要设置 `jsxFactory`/`jsxFragmentFactory`。

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到您的 Git 仓库。

为此，您可以在 `.gitignore` 文件中添加以下指令：

```plaintext
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- **自动补全** 翻译键。
- **实时错误检测** 缺失的翻译。
- **内联预览** 翻译内容。
- **快速操作** 轻松创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参考 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

要进一步了解，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 将内容外部化。

---
