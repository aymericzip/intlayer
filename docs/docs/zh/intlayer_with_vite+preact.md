---
createdAt: 2025-04-18
updatedAt: 2026-08-30
title: "Vite + Preact i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Vite + Preact 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
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
applicationShowcase: https://intlayer-vite-preact-template.vercel.app
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

# 使用 Intlayer 翻译您的 Vite 和 Preact 网站 | 国际化 (i18n)

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-preact-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 实现应用国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-vite-preact-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-vite-preact-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与`preact-i18n`或`i18next`等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完整的 Preact 覆盖**

<Accordion header="Full Preact coverage">

Intlayer 经过优化，可与 Preact 完美配合，提供**组件级内容范围**、**延迟加载翻译**以及​​扩展国际化 (i18n) 所需的所有功能。

</Accordion>

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

</Accordion>

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

<Accordion header="AI Agent">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

**自动化**

<Accordion header="自动化">

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

</Accordion>

**表现**

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

**无需开发即可扩展**

<Accordion header="使用 none-dev 进行扩展">

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

</Accordion>
</AccordionGroup>

---

## 在 Vite 和 Preact 应用中设置 Intlayer 的分步指南

查看 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-vite-preact-template)。

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

> `--interactive` 标志是可选的。如果您是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测您的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  核心包，为配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)提供国际化工具。

- **preact-intlayer**
  将 Intlayer 与 Preact 应用集成的包。它为 Preact 国际化提供上下文提供程序和钩子。

- **vite-intlayer**
  包含用于将 Intlayer 与 [Vite 打包器](https://vite.dev/guide/why.html#why-bundle-for-production)集成的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

</Step>

<Step number={2} title="配置您的项目">

创建一个配置文件来配置应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
    mode: "prefix-no-default", // 默认：为除默认语言外的所有语言添加前缀
    storage: ["cookie", "header"], // 默认：将语言存储在 Cookie 中并从标头检测
  },
};

export default config;
```

> 通过此配置文件，您可以设置本地化 URL、路由模式、存储选项、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在您的 Vite 配置中集成 Intlayer">

将 intlayer 插件添加到您的配置中。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保内容声明文件的构建，并在开发模式下监视它们。它在 Vite 应用中定义 Intlayer 环境变量。此外，它还提供别名以优化性能。

</Step>

<Step number={4} title="声明您的内容">

创建和管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      zh: "Vite 徽标",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      zh: "Preact 徽标",
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

    edit: t<ComponentChildren>({
      zh: (
        <>
          编辑 <code>src/app.tsx</code> 并保存以测试 HMR
        </>
      ),
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
      zh: "点击 Vite 和 Preact 徽标了解更多",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
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
        "zh": "Vite 徽标",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "zh": "Preact 徽标",
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
        "zh": "点击 Vite 和 Preact 徽标了解更多",
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认为 `./src`），并且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 有关更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

> 如果您的内容文件包含 TSX 代码，您可能需要导入 `import { h } from "preact";` 或确保您的 JSX pragma 为 Preact 正确设置。

</Step>

<Step number={5} title="在您的代码中使用 Intlayer">

在整个应用程序中访问您的内容字典：

```tsx {6,10} fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

> 如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您可以使用函数的值，如：

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> 注意：在 Preact 中，`className` 通常写成 `class`。

> 要了解更多关于 `useIntlayer` 钩子的信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)（对于 `preact-intlayer` 的 API 类似）。

> 如果您的应用程序已经存在，您可以使用 [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 以及[提取命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)在一秒内转换数千个组件。

</Step>

<Step number={6} title="更改您的内容语言" isOptional={true}>

要更改您的内容语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>更改语言为英文</button>
  );
};

export default LocaleSwitcher;
```

> 要了解更多关于 `useLocale` 钩子的信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)（对于 `preact-intlayer` 的 API 类似）。

</Step>

<Step number={7} title="向您的应用程序添加本地化路由" isOptional={true}>

此步骤的目的是为每种语言创建唯一的路由。这对 SEO 和 SEO 友好的 URL 很有用。
示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 默认情况下，默认语言的路由不带前缀。如果您想为默认语言添加前缀，可以在配置中将 `routing.mode` 选项设置为 `"prefix-all"`。有关更多信息，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

要向您的应用程序添加本地化路由，您可以创建一个 `LocaleRouter` 组件来包装您的应用程序的路由并处理基于语言的路由。这是一个使用 [preact-iso](https://github.com/preactjs/preact-iso) 的示例：

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * 设置特定于语言的路由的路由器组件。
 * 它使用 preact-iso 来管理导航和呈现本地化的组件。
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

然后，您可以在您的应用程序中使用 `LocaleRouter` 组件：

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

同时，您也可以使用 `intlayerProxy` 向您的应用程序添加服务器端路由。此插件将根据 URL 自动检测当前的语言环境并设置适当的语言 Cookie。如果未指定语言环境，该插件将根据用户的浏览器语言偏好确定最合适的语言环境。如果未检测到任何语言环境，它将重定向到默认语言环境。

> 注意，要在生产中使用 `intlayerProxy`，您需要将 `vite-intlayer` 包从 `devDependencies` 切换到 `dependencies`。

> 自 Intlayer v9 起，`intlayerProxy()` 直接捆绑到 `intlayer()` 插件中，并通过 `routing.enableProxy` 选项默认启用（默认为 `true`）。如下所示单独注册它现在是可选的——为了向后兼容和需要控制插件顺序的设置而保留。设置 `routing.enableProxy: false` 以选择退出。查看 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={8} title="当语言环境更改时更改 URL" isOptional={true}>

要在语言环境更改时更改 URL，您可以使用 `useLocale` 钩子提供的 `onLocaleChange` 属性。同时，您可以使用 `preact-iso` 中 `useLocation` 的 `route` 方法来更新 URL 路径。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
      // 使用更新的语言环境构造 URL
      // 示例：/es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // 更新 URL 路径
      route(pathWithLocale, true); // true 用于替换
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
              // 设置语言环境后的编程导航将由 onLocaleChange 处理
            }}
            key={localeItem}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 其自身语言环境中的语言 - 例如 Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境中的语言 - 例如 Francés（当前语言环境设置为 Locales.SPANISH 时） */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

> 文档参考：
>
> > - [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)（对于 `preact-intlayer` 的 API 类似）
> > - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)
> > - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)
> > - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)
> > - [`hreflang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> > - [`lang` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)
> > - [`dir` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/dir)
> > - [`aria-current` 属性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> > - [Popover API](https://developer.mozilla.org/zh-CN/docs/Web/API/Popover_API)

以下是更新的**步骤 9**，包含添加的解释和精制的代码示例：

---

</Step>

<Step number={9} title="切换 HTML 语言和方向属性" isOptional={true}>

当您的应用程序支持多种语言时，关键是要更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前的语言环境。这样做可以确保：

- **可访问性**：屏幕阅读器和辅助技术依赖正确的 `lang` 属性来准确地发音和解释内容。
- **文本渲染**：`dir`（方向）属性确保文本以适当的顺序呈现（例如，英文为从左到右，阿拉伯语或希伯来语为从右到左），这对可读性至关重要。
- **SEO**：搜索引擎使用 `lang` 属性来确定您页面的语言，帮助在搜索结果中提供正确的本地化内容。

通过在语言环境更改时动态更新这些属性，您可以为所有支持的语言的用户保证一致和可访问的体验。

#### 实现钩子

创建一个自定义钩子来管理 HTML 属性。该钩子监听语言环境更改并相应地更新属性：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
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

#### 在应用程序中使用钩子

将钩子集成到您的主组件中，以便在语言环境更改时更新 HTML 属性：

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

通过应用这些更改，您的应用将:

- 确保 **language** (`lang`) 属性正确反映当前locale，这对SEO和浏览器行为很重要。
- 根据locale调整 **text direction** (`dir`)，增强可读性和可用性，特别是对于阅读顺序不同的语言。
- 提供更 **accessible** 的体验，因为辅助技术依赖这些属性才能实现最佳功能。

</Step>

<Step number={10} title="创建本地化链接组件" isOptional={true}>

为了确保您的应用程序的导航尊重当前的语言环境，您可以创建一个自定义 `Link` 组件。该组件自动为内部 URL 添加当前语言的前缀。

这种行为有几个有用的原因:

- **SEO 和用户体验**：本地化的 URL 帮助搜索引擎正确索引特定语言的页面，并为用户提供他们首选语言的内容。
- **一致性**：通过在整个应用程序中使用本地化链接，你可以保证导航保持在当前的语言环境中，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在一个单独的组件中，简化了 URL 的管理。

Below is the implementation of a localized `Link` component in Preact:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * 用于检查给定 URL 是否为外部链接的实用函数。
 * 如果 URL 以 http:// 或 https:// 开头，则认为是外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 为 URL 前缀添加语言环境（例如 /fr/about）。
 * 这确保导航保持在同一语言环境上下文中。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // 如果链接是内部链接并提供了有效的 href，则获取本地化的 URL。
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

#### 工作原理

- **检测外部链接**:  
  辅助函数 `checkIsExternalLink` 用于判断 URL 是否为外部链接。外部链接保持不变，因为它们不需要本地化。
- **获取当前语言环境**:  
  `useLocale` hook 提供当前的语言环境（例如，`fr` 代表法语）。
- **本地化 URL**:  
  对于内部链接（即非外部链接），使用 `getLocalizedUrl` 自动为 URL 添加当前语言环境前缀。这意味着如果用户处于法语环境，传递 `/about` 作为 `href` 将被转换为 `/fr/about`。
- **返回链接**:  
  该组件返回一个 `<a>` 元素，其 URL 已本地化，确保导航与语言环境一致。

</Step>

<Step number={11} title="渲染 Markdown 和 HTML" isOptional={true}>

Intlayer 支持在 Preact 中渲染 Markdown 和 HTML 内容。

您可以使用 `.use()` 方法自定义 Markdown 和 HTML 内容的渲染方式。该方法允许您覆盖特定标签的默认渲染。

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* 基础渲染 */}
    {myMarkdownContent}

    {/* Markdown 自定义渲染 */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* HTML 基础渲染 */}
    {myHtmlContent}

    {/* HTML 自定义渲染 */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

</Step>

<Step number={12} title="提取组件内容" isOptional={true}>

如果您有现有的 codebase，转换数千个文件可能很耗时。

为了简化此过程，Intlayer 提供了一个 [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 来转换您的组件并提取内容。

要设置它，您可以在 `intlayer.config.ts` 文件中添加一个 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其余配置
  compiler: {
    /**
     * 指示编译器是否应启用。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示转换后是否应保存组件。
     *
     * - 如果为 `true`，编译器将重写磁盘上的组件文件。所以转换将是永久的，编译器将在下一个过程中跳过转换。这样，编译器可以转换应用程序，然后可以被删除。
     *
     * - 如果为 `false`，编译器仅在构建输出中注入 `useIntlayer()` 函数调用，并保持基础 codebase 完整。转换仅在内存中完成。
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

> 从 v9 起，`intlayerCompiler` 已包含在 `intlayer` 插件中。所以您不需要手动添加它。

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

### （可选）第 10 步：创建本地化链接组件

- **SEO 和用户体验**：本地化 URL 帮助搜索引擎正确索引特定语言的页面，并为用户提供其首选语言的内容。
- **一致性**：通过在整个应用程序中使用本地化链接，您可以确保导航保持在当前语言环境内，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在单个组件中可以简化 URL 的管理。

#### Sitemap

Intlayer 的 sitemap 生成器遵守你的本地化设置，并包括用于爬虫的常见元数据。

> 生成的 sitemap 支持 `xhtml:link` 命名空间（hreflang XML 扩展）。与只生成平面 URL 的基本生成器不同，Intlayer 在每个页面的所有本地化变体之间连接双向链接（例如 `/about`、`/fr/about` 或 `/about?lang=fr`，具体取决于你的路由模式），这有助于搜索引擎关联本地化 URL。

#### Robots.txt

使用 `getMultilingualUrls` 以便 `Disallow` 条目涵盖敏感路径的每个本地化拼写。

#### 1. 在项目根目录添加 `generate-seo.mjs`

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 站点 URL，默认为本地开发环境
const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

// 定义需要生成的路径列表
const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

// 生成 sitemap.xml
const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

// 获取所有多语言 URL
const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

// 定义禁止访问的路径
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

必须安装 `intlayer` 以便脚本能够导入它。在生产环境中设置环境变量 `SITE_URL`（例如在 CI 中）。

> 对于 Node ESM，建议使用 `generate-seo.mjs`。如果改用 `generate-seo.js`，请确保在 `package.json` 中设置 `"type": "module"`，或以 ESM 模式运行 Node。

#### 工作原理

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

- **检测外部链接**：  
  辅助函数 `checkIsExternalLink` 确定 URL 是否为外部。外部链接保持不变，因为它们不需要本地化。
- **检索当前语言环境**：  
  `useLocale` 钩子提供当前的语言环境（例如，法语为 `fr`）。
- **本地化 URL**：  
  对于内部链接（即非外部链接），使用 `getLocalizedUrl` 自动为 URL 添加当前语言环境的前缀。这意味着如果您的用户处于法语环境，将 `/about` 作为 `href` 传递将使其转换为 `/fr/about`。
- **返回链接**：  
  该组件返回一个带有本地化 URL 的 `<a>` 元素，确保导航与语言环境保持一致。

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

```bash
#  忽略 Intlayer 生成的文件
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

## 常见问题

<FAQ>

<Question title="国际化 Vite + Preact 应用有哪些不同的解决方案？">

Vite 本身对 i18n 没有特定偏好，因此选择主要来自 Preact 生态：

- **`preact-i18n`**：专为 Preact 设计的轻量级库，采用 JSON 字典。
- 通过 `preact/compat` 使用 **`react-i18next`**：功能成熟，但会将 React 兼容层引入您的 bundle 中。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），并在构建时由 Vite 插件进行编译，完全类型安全，并配有 AI 翻译、可视化编辑器和 CMS。

对 Vite 而言，最大优势在于翻译在编译时解析并执行 tree-shaking，而不是在运行时以 JSON 形式获取，因此页面仅输出其渲染所需的条目。请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="i18n 会给我的 Preact bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃，并且 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="我可以从 preact-i18n 或 react-i18next 迁移而无需重写组件吗？">

可以，有两条迁移路径。您可以使用 [react-i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_react-i18next_to_intlayer.md) 逐步迁移内容。或者，您可以完全保留当前的 API：[兼容性适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 公开与 `react-i18next` 和 `react-intl` 完全相同的 API，但底层由 Intlayer 字典驱动，因此只需更改导入语句，组件代码完全无需修改。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的组件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。本指南的第 12 步详细介绍了此过程。

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

<Question title="如何在 Preact 组件中使用翻译内容？">

在组件中调用 `useIntlayer`，用法与在 React 中完全一致。`preact-intlayer` 是原生的 Preact 绑定，因此无需借助 `preact/compat`。第 5 步展示了具体用法，第 11 步介绍了 Markdown 和 HTML 内容的渲染。

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

运行 `npx intlayer fill`。它会使用您选择的 LLM、您自己的提供商和 API密钥填充缺失的翻译，并且 `--git-diff` 参数可将处理范围限制在当前分支修改的内容。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

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
