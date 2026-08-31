---
createdAt: 2025-04-18
updatedAt: 2026-08-30
title: "Vite + Solid i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Vite + Solid 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
author: aymericzip
---

# 使用Intlayer翻译您的Vite and Solid | 国际化(i18n)

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="The best i18n solution for Vite and Solid? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 实现应用国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-vite-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Vite + Solid 模板"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目录

<TOC/>

## 为什么选择 Intlayer 而不是其他方案？

与 `@solid-primitives/i18n` 或 `i18next` 等主要解决方案相比，Intlayer 是一个集成了优化功能的解决方案，例如：

<AccordionGroup>

<Accordion header="完整的 Solid 支持">

Intlayer 针对 Solid 进行了优化，提供 **组件级内容作用域**、**响应式翻译** 以及国际化 (i18n) 扩展所需的所有功能。

</Accordion>

<Accordion header="Bundle 大小">

不再将庞大的 JSON 文件加载到页面中，只加载必要的内容。Intlayer 帮助 **将 bundle 和页面大小减少高达 50%**。

</Accordion>

<Accordion header="可维护性">

对应用程序的内容进行作用域划分 **便于维护** 大型应用程序。您可以复制或删除单个功能文件夹，而无需费力审查整个内容代码库。此外，Intlayer **完全类型化**，确保内容的准确性。

</Accordion>

<Accordion header="AI Agent">

将内容共置 **减少了** 大型语言模型 (LLMs) **所需的上下文**。Intlayer 还提供一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI agents 的开发者体验 (DX) 更加顺畅。

</Accordion>

<Accordion header="自动化">

在 CI/CD 管道中使用自动化翻译，选择您的 LLM，按照 AI 提供商的成本计费。Intlayer 还提供 **编译器** 来自动提取内容，以及一个 [web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 来帮助 **后台翻译**。

</Accordion>

<Accordion header="性能">

将庞大的 JSON 文件连接到组件可能导致性能和反应性问题。Intlayer 在构建时优化了内容加载。

</Accordion>

<Accordion header="与非开发人员协作扩展">

Intlayer 不仅仅是一个 i18n 解决方案，它还提供 **自托管 [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)** 和 **[完整 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)** 来帮助您 **实时** 管理多语言内容，使与翻译人员、文案撰写人和其他团队成员的协作无缝进行。内容可以本地存储和/或远程存储。

</Accordion>
</AccordionGroup>

---

## Vite 和 Solid 应用程序中 Intlayer 的分步设置指南

## 目录

<TOC/>

<Steps>

<Step number={1} title="安装依赖">

使用 npm 安装必要的包：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 标志是可选的。如果您是 AI agent，请使用 `intlayer-cli init`。

> 此命令将检测您的环境并安装必要的包。例如：

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  核心包，为配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)提供国际化工具。

- **solid-intlayer**
  将 Intlayer 与 Solid 应用程序集成的包。它为 Solid 国际化提供上下文提供者和 hooks。

- **vite-intlayer**
  包括用于将 Intlayer 与 [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户首选语言、管理 cookie 和处理 URL 重定向的中间件。

</Step>

<Step number={2} title="配置您的项目">

创建一个配置文件来配置您的应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在您的 Vite 配置中集成 Intlayer">

将 intlayer 插件添加到您的配置中。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid(), intlayer()],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保内容声明文件的构建，并在开发模式下监视它们。它在 Vite 应用程序中定义 Intlayer 环境变量。此外，它提供别名以优化性能。

</Step>

<Step number={4} title="声明您的内容">

创建和管理您的内容声明来存储翻译：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      zh: "Vite logo",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    solidLogo: t({
      zh: "Solid logo",
      en: "Solid logo",
      fr: "Logo Solid",
      es: "Logo Solid",
    }),
    title: "Vite + Solid",
    count: t({
      zh: "计数为 {{count}}",
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),
    edit: t({
      zh: "编辑 src/App.tsx 并保存以测试 HMR",
      en: "Edit src/App.tsx and save to test HMR",
      fr: "Éditez src/App.tsx et enregistrez pour tester HMR",
      es: "Edita src/App.tsx y guarda para probar HMR",
    }),
    readTheDocs: t({
      zh: "点击 Vite 和 Solid logo 以了解更多",
      en: "Click on the Vite and Solid logos to learn more",
      fr: "Cliquez sur les logos Vite et Solid pour en savoir plus",
      es: "Haga clic en los logotipos de Vite and Solid para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "zh": "Vite logo",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "solidLogo": {
      "nodeType": "translation",
      "translation": {
        "zh": "Solid logo",
        "en": "Solid logo",
        "fr": "Logo Solid",
        "es": "Logo Solid"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "zh": "Vite + Solid",
        "en": "Vite + Solid",
        "fr": "Vite + Solid",
        "es": "Vite + Solid"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "zh": "计数为 {{count}}",
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
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
        "zh": "点击 Vite 和 Solid logo 以了解更多",
        "en": "Click on the Vite and Solid logos to learn more",
        "fr": "Cliquez sur les logos Vite et Solid pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite and Solid para obtener más información"
      }
    }
  }
}
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认为 `./src`）。并且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。
>
> 有关更多详细信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={5} title="在您的代码中使用 Intlayer">

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
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://www.solidjs.com/" target="_blank">
          <img
            src={solidLogo}
            class="logo solid"
            alt={content.solidLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count({ count: count() })}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> 在 Solid 中，`useIntlayer` 返回反应式内容（例如 `content`）。您可以直接访问其属性。

> 如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您可以使用函数的值，如：
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

</Step>

<Step number={6} title="更改内容的语言" isOptional={true}>

要更改内容的语言，您可以使用 `useLocale` hook 提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

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

</Step>

<Step number={7} title="为您的应用程序添加本地化路由" isOptional={true}>

此步骤的目的是为每种语言创建独特的路由。这对 SEO 和 SEO 友好的 URL 很有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

要为您的应用程序添加本地化路由，您可以使用 `@solidjs/router`。

首先，安装必要的依赖：

```bash packageManager="npm"
npm install @solidjs/router
```

然后，使用 `Router` 包装您的应用程序，并使用 `localeMap` 定义您的路由：

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

</Step>

<Step number={8} title="当语言环境更改时更改 URL" isOptional={true}>

要在语言环境更改时更改 URL，您可以使用 `useLocale` hook 提供的 `onLocaleChange` 属性。您可以使用 `@solidjs/router` 中的 `useNavigate` 和 `useLocation` hooks 来更新 URL 路径。

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

</Step>

<Step number={9} title="切换 HTML 语言和方向属性" isOptional={true}>

更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前的语言环境，以提高可访问性和 SEO。

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

</Step>

<Step number={10} title="创建本地化链接组件" isOptional={true}>

创建一个自定义 `Link` 组件，该组件自动为内部 URL 添加当前语言的前缀。

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

同时，您也可以使用 `intlayerProxy` 为您的应用程序添加服务器端路由。此插件将根据 URL 自动检测当前语言环境并设置相应的语言环境 cookie。如果未指定语言环境，该插件将根据用户的浏览器语言偏好确定最合适的语言环境。如果未检测到语言环境，它将重定向到默认语言环境。

> 注意：要在生产中使用 `intlayerProxy`，您需要将 `vite-intlayer` 包从 `devDependencies` 切换到 `dependencies`。

> 自从 Intlayer v9 以来，`intlayerProxy()` 直接捆绑到 `intlayer()` 插件中，并通过 `routing.enableProxy` 选项（默认为 `true`）默认启用。如下所示单独注册它现在是可选的——保留它是为了向后兼容性以及需要控制插件顺序的设置。设置 `routing.enableProxy: false` 以退出。请参阅 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solid(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={11} title="提取您的组件的内容" isOptional={true}>

如果您有现有的 codebase，转换数千个文件可能很耗时。

为了简化此过程，Intlayer 提供了一个 [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 来转换您的组件并提取内容。

要设置它，您可以在 `intlayer.config.ts` 文件中添加 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 您的其他配置
  compiler: {
    /**
     * 指示是否应启用编译器。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示转换后是否应保存组件。
     *
     * - 如果为 `true`，编译器将重写磁盘中的组件文件。因此转换将是永久的，编译器将跳过下一个过程的转换。这样，编译器可以转换应用程序，然后可以将其删除。
     *
     * - 如果为 `false`，编译器将仅在构建输出中注入 `useIntlayer()` 函数调用，并保持基础 codebase 完整。转换仅在内存中进行。
     */
    saveComponents: false,

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

运行提取器来转换您的组件并提取内容

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel compiler'>

> 自从 v9 以来，`intlayerCompiler` 已包含在 `intlayer` 插件中。因此您无需手动添加它。

更新您的 `vite.config.ts` 以包含 `intlayerCompiler` 插件：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 添加编译器插件
  ],
});
```

```bash packageManager="npm"
npm run build # 或 npm run dev
```

```bash packageManager="pnpm"
pnpm run build # 或 pnpm run dev
```

```bash packageManager="yarn"
yarn build # 或 yarn dev
```

```bash packageManager="bun"
bun run build # 或 bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### 第3步：在你的 Vite 配置中集成 Intlayer

> `intlayer()` 是用于将 Intlayer 集成到 Vite 中的插件。它确保内容声明文件的构建，并在开发模式下监视这些文件。它在 Vite 应用中定义了 Intlayer 的环境变量。此外，它还提供别名以优化性能。

#### 网站地图

Intlayer 的网站地图生成器尊重您的语言环境设置，并包含爬虫程序的常见元数据。

> 生成的网站地图支持 `xhtml:link` 命名空间（hreflang XML 扩展）。与仅发出平面 URL 的基本生成器不同，Intlayer 在每个页面的每个本地化变体之间建立双向链接（例如 `/about`、`/fr/about` 或 `/about?lang=fr`，具体取决于您的路由模式），这有助于搜索引擎关联本地化 URL。

#### Robots.txt

使用 `getMultilingualUrls` 以便 `Disallow` 条目覆盖敏感路径的每个本地化拼写。

#### 1. 在项目根目录添加 `generate-seo.mjs`

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

// 生成网站地图
const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

// 获取所有多语言 URL
const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

// 生成 robots.txt
const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

必须安装 `intlayer` 以便脚本可以导入它。为生产环境设置环境变量中的 `SITE_URL`（例如在 CI 中）。

> 优先使用 Node ESM 的 `generate-seo.mjs`。如果改用 `generate-seo.js`，请确保在 `package.json` 中设置 `"type": "module"`，或使用 ESM 启用的方式运行 Node。

#### 2. 在 Vite 之前运行脚本

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

如果你使用 pnpm 或 yarn，请相应调整。你也可以从 CI 或其他步骤中调用相同的脚本，如果这适合你的工作流程。

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

```bash
#  忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

---

### 深入了解

要进一步使用，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。

## 常见问题

<FAQ>

<Question title="国际化 Vite + Solid 应用有哪些不同的解决方案？">

Vite 本身对 i18n 没有特定偏好，因此选择主要来自 Solid 生态：

- **`@solid-primitives/i18n`**：社区的原语方案，一种由您自己组装和加载的扁平字典。
- **带有 Solid 封装的 `i18next`**：成熟的目录体系，但自身没有响应式机制。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），并在构建时由 Vite 插件进行编译，完全类型安全，并配有 AI 翻译、可视化编辑器和 CMS。

对 Vite 而言，最大优势在于翻译在编译时解析并执行 tree-shaking，而不是在运行时以 JSON 形式获取，因此页面仅输出其渲染所需的条目。请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="i18n 会给我的 Solid bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃，并且 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/solid.md)。

</Question>

<Question title="我可以从 @solid-primitives/i18n 或 i18next 迁移而无需重写组件吗？">

基本可以。请按照 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 迁移内容。您也可以逐步迁移：[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将现有的 JSON 目录作为单一真实来源（source of truth），并生成 Intlayer 字典，使两个层在逐个组件迁移时保持同步。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的组件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。本指南的第 11 步详细介绍了此过程。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可在构建时执行相同操作：它在每次更改时扫描您的 JSX、TSX、Vue 和 Svelte 源代码，生成字典并通过热模块替换 (HMR) 保持同步，因此完全无需手动维护键名。

开启编译器前有两个限制值得了解：它通过静态分析工作，因此仅在运行时存在的字符串（如 API 错误代码或 CMS 字段）无法被捕获；此外它需要区分用户文本和应用程序逻辑（如 `className="active"` 或状态代码），在大型代码库中需要少量注解。而 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 则通过让您参与审查避免了这两个问题。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="如何在 Solid 组件中使用翻译内容？">

在组件中调用 `useIntlayer` 并直接访问属性值。内容由 Solid Signal 提供支持，因此更改语言环境仅会更新读取该内容的 DOM 节点，而不会造成组件重新渲染。第 5 步展示了具体用法。

</Question>

<Question title="Intlayer 是否支持 Vite 开发服务器和热重载？">

是的。`intlayer()` Vite 插件会监听您的 `.content.ts` 文件，并在保存时重新构建受影响的字典，因此修改会立即生效，无需重启开发服务器。类型定义也会同步重新生成，保持自动补全随时最新。

</Question>

<Question title="如何设置支持语言环境的路由？">

第 7 步和第 8 步介绍了本地化路由以及在语言环境变更时重写 URL，第 10 步添加了本地化的链接组件。`routing.mode` 决定 URL 方案：`"prefix-no-default"`（默认，`/about` 与 `/fr/about`）、`"prefix-all"`、`"no-prefix"`（从 Cookie、Header 或域名解析）或 `"search-params"`（`/about?locale=fr`）。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="如何支持阿拉伯语或希伯来语等从右到左 (RTL) 的语言？">

第 9 步对此进行了介绍。`getHTMLTextDir` 会为特定语言环境返回 `ltr`、`rtl` 或 `auto`，因此您可以根据当前活动的语言环境在根元素上绑定 `lang` 和 `dir`，让 CSS 逻辑属性处理布局反转。

</Question>

<Question title="如何在客户端渲染的 Vite 应用中处理 SEO 元数据？">

根据当前活动的语言环境在 `html` 元素上设置 `lang` 和 `dir` 属性，并使用 `getMultilingualUrls` 为每个声明的语言环境输出 `hreflang` 备用链接（包括 `x-default`）。对于需要可靠抓取的页面，建议采用预渲染或服务端渲染方案。

</Question>

<Question title="如何使用 AI 自动翻译应用？">

运行 `npx intlayer fill`。它会使用您选择的 LLM、您自己的提供商和 API 密钥填充缺失的翻译，并且 `--git-diff` 参数可将处理范围限制在当前分支修改的内容。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 是否支持复数、性别和富文本？">

支持：包括 [复数形式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)、[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件渲染、插值用的 [插入内容 (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)、用于长文本的 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)，以及用于数字、日期和货币的 [格式化工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)。

</Question>

<Question title="翻译人员如何无需接触代码即可编辑内容？">

可以通过自托管的 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)（任何人都可以直接在运行中的应用上就地修改文案），或通过 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 进行无需重新部署的内容外部化更新。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的，基于 Apache 2.0 许可证开源，包含商业用途。托管版 CMS 是可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
