---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: 如何翻译您的Vite and Solid应用 – i18n指南 2026
description: 了解如何使您的 Vite 和 Solid 网站支持多语言。按照文档进行国际化（i18n）和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: 添加 init 命令
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 使用Intlayer翻译您的Vite and Solid | 国际化(i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Solid? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

> 该包正在开发中。更多信息请参见[issue](https://github.com/aymericzip/intlayer/issues/117)。通过点赞该 issue 来表达您对 Solid 版 Intlayer 的兴趣。

<!-- 请参见 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-solid-template)。 -->

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代 Web 应用中的多语言支持。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **通过自动生成类型确保 TypeScript 支持，提升自动补全和错误检测能力**。
- **受益于高级功能**，如动态语言环境检测和切换。

---

## 在 Vite 和 Solid 应用中设置 Intlayer 的分步指南

## Table of Contents

<TOC/>

### 第一步：安装依赖

使用 npm 安装所需的包：

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

- **intlayer**
  提供国际化工具的核心包，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)、转译以及[命令行工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

- **solid-intlayer**
  将 Intlayer 集成到 Solid 应用中的包。它提供了 Solid 国际化的上下文提供者和钩子。

- **vite-intlayer**
  包含用于将 Intlayer 集成到[Vite 打包器](https://vite.dev/guide/why.html#why-bundle-for-production)的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：项目配置

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
      // 你的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 通过此配置文件，你可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名，禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第3步：在你的 Vite 配置中集成 Intlayer

将 intlayer 插件添加到你的配置中。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> `intlayer()` 是用于将 Intlayer 集成到 Vite 中的插件。它确保内容声明文件的构建，并在开发模式下监视这些文件。它在 Vite 应用中定义了 Intlayer 的环境变量。此外，它还提供别名以优化性能。

### 第4步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {},
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// 定义应用内容字典
const appContent = {
  key: "app",
  content: {},
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 定义应用内容字典
const appContent = {
  key: "app",
  content: {},
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {}
}
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们被包含在 `contentDir` 目录中（默认是 `./src`）。并且文件扩展名需匹配内容声明文件扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参考[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

### 第5步：在代码中使用 Intlayer

在整个应用程序中访问您的内容字典：

```tsx {1,11} fileName="src/App.tsx" codeFormat="typescript"
import { createSignal, type Component } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "solid-intlayer";

const AppContent: Component = () => {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content().viteLogo.value} />
        </a>
        <a href="https://www.solidjs.com/" target="_blank">
          <img
            src={solidLogo}
            class="logo solid"
            alt={content().solidLogo.value}
          />
        </a>
      </div>
      <h1>{content().title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content().count({ count: count() })}
        </button>
        <p>{content().edit}</p>
      </div>
      <p class="read-the-docs">{content().readTheDocs}</p>
    </>
  );
};

const App: Component = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> [!NOTE]
> 在 Solid 中，`useIntlayer` 返回一个 **accessor** 函数（例如，`content()`）。您必须调用此函数才能访问响应式内容。

> 如果您想在 `string` 属性（如 `alt`、`title`、`href`、`aria-label` 等）中使用您的内容，必须调用函数的值，例如：
>
> ```jsx
> <img src={content().image.src.value} alt={content().image.value} />
> ```

### （可选）第6步：更改内容语言

要更改内容语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { Locales } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as Locales)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

### （可选）第7步：为应用添加本地化路由

此步骤的目的是为每种语言创建唯一的路由。这对 SEO 和 SEO 友好的 URL 很有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

要为您的应用程序添加本地化路由，您可以使用 `@solidjs/router`。

首先，安装必要的依赖项：

```bash packageManager="npm"
npm install @solidjs/router
```

然后，用 `Router` 包装您的应用程序，并使用 `localeMap` 定义您的路由：

```tsx fileName="src/index.tsx"  codeFormat="typescript"
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
```

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { type Component } from "solid-js";
import { Route } from "@solidjs/router";
import { localeMap } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import Home from "./pages/Home";
import About from "./pages/About";

const App: Component = () => (
  <IntlayerProvider>
    {localeMap(({ locale, urlPrefix }) => (
      <Route
        path={urlPrefix || "/"}
        component={(props: any) => (
          <IntlayerProvider locale={locale}>{props.children}</IntlayerProvider>
        )}
      >
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Route>
    ))}
  </IntlayerProvider>
);

export default App;
```

### （可选）第8步：当语言环境变化时更改 URL

要在语言环境更改时更改 URL，您可以使用 `useLocale` 钩子提供的 `onLocaleChange` 属性。您可以使用 `@solidjs/router` 的 `useNavigate` 和 `useLocation` 钩子来更新 URL 路径。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (loc) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, loc);
      navigate(pathWithLocale);
    },
  });

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as any)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

### （可选）第9步：切换 HTML 的语言和方向属性

更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前语言环境，以便于可访问性和 SEO。

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { createEffect, type Component } from "solid-js";
import { useLocale } from "solid-intlayer";
import { getHTMLTextDir } from "intlayer";

const AppContent: Component = () => {
  const { locale } = useLocale();

  createEffect(() => {
    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    // ... 您的应用程序内容
  );
};
```

### （可选）步骤 10：创建本地化链接组件

创建一个自定义 `Link` 组件，自动为内部 URL 添加当前语言的前缀。

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { type ParentComponent } from "solid-js";
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const Link: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => props.href.startsWith("http");
  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

### （可选）步骤 11：渲染 Markdown

Intlayer 支持使用其自己的内部解析器直接在您的 Solid 应用程序中渲染 Markdown 内容。默认情况下，Markdown 被视为纯文本。要将其渲染为富 HTML，请用 `MarkdownProvider` 包装您的应用程序。

```tsx fileName="src/index.tsx"
import { render } from "solid-js/web";
import { MarkdownProvider } from "solid-intlayer";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <MarkdownProvider>
      <App />
    </MarkdownProvider>
  ),
  root!
);
```

然后您可以在组件中使用它：

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-content");

  return (
    <div>
      {/* 通过 MarkdownProvider 渲染为 HTML */}
      {content().markdownContent}
    </div>
  );
};
```

### 配置 TypeScript

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到您的 Git 仓库中。

为此，您可以将以下指令添加到您的 `.gitignore` 文件中：

```plaintext
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- **已翻译内容的内联预览**。
- **快速操作**，轻松创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参阅[Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

要进一步使用，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。

---
