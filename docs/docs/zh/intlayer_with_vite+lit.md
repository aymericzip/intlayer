---
createdAt: 2026-03-23
updatedAt: 2026-06-23
title: "Vite + Lit i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Vite + Lit 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - Lit
  - Web Components
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 8.4.10
    date: 2026-03-23
    changes: "初始历史"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Vite 和 Lit 网站 | 国际化 (i18n)

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“lit-localize”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**全照明覆盖**

Intlayer 经过优化，可与 Lit 完美配合，提供 **Web 组件级内容范围**、**TypeScript 支持**以及扩展国际化 (i18n) 所需的所有功能。

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

**自动化**

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

**表现**

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

**无需开发即可扩展**

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

---

## 在 Vite 和 Lit 应用中设置 Intlayer 的分步指南

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

> `--interactive` 标志是可选的。如果你是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测你的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  核心包，为配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)提供国际化工具。

- **lit-intlayer**
  将 Intlayer 与 Lit 应用集成的包。它提供了基于 `ReactiveController` 的钩子（`useIntlayer`、`useLocale` 等），使得 LitElement 在区域设置变化时自动重新渲染。

- **vite-intlayer**
  包含用于将 Intlayer 与 [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户首选区域设置、管理 cookie 和处理 URL 重定向的中间件。

</Step>

<Step number={2} title="配置你的项目">

创建一个配置文件来配置应用的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 你的其他区域设置
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 通过此配置文件，你可以设置本地化 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、在控制台禁用 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在 Vite 配置中集成 Intlayer">

将 intlayer 插件添加到你的配置中。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保构建内容声明文件，并在开发模式下监视它们。它在 Vite 应用中定义 Intlayer 环境变量。此外，它提供别名以优化性能。

</Step>

<Step number={4} title="在入口点引导 Intlayer">

在注册任何自定义元素**之前**调用 `installIntlayer()`，以便在第一个元素连接时全局区域设置单例已就绪。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// 必须在任何 LitElement 连接到 DOM 之前调用。
installIntlayer();

// 导入并注册你的自定义元素。
import "./my-element.js";
```

如果你还使用 `md()` 内容声明（Markdown），也要安装 markdown 渲染器：

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

</Step>

<Step number={5} title="声明你的内容">

创建并管理你的内容声明以存储翻译：

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      zh: "Vite 标志",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      zh: "Lit 标志",
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      zh: "计数为 {{count}}",
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      zh: "点击 Vite 和 Lit 标志了解更多",
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
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
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "zh": "Vite 标志",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "zh": "Lit 标志",
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
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
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "zh": "点击 Vite 和 Lit 标志了解更多",
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> 你的内容声明可以定义在应用的任何地方，只要它们包含在 `contentDir` 目录中（默认为 `./src`）。并匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。
>
> 有关更多详细信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={6} title="在 LitElement 中使用 Intlayer">

在 `LitElement` 中使用 `useIntlayer`。它返回一个 `ReactiveController` 代理，该代理在活动区域设置更改时自动触发重新渲染 - 无需额外设置。

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer 将自己注册为 ReactiveController。
  // 当区域设置更改时，元素会自动重新渲染。
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> 当你需要在原生 HTML 属性中使用翻译字符串（例如 `alt`、`aria-label`、`title`）时，你可以通过多种方式使用翻译字符串：
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="更改内容的语言" isOptional={true}>

要更改内容的语言，请使用 `useLocale` 控制器公开的 `setLocale` 方法。

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={8} title="渲染 Markdown 和 HTML 内容" isOptional={true}>

Intlayer 支持 `md()` 和 `html()` 内容声明。在 Lit 中，编译输出通过 `unsafeHTML` 指令作为原始 HTML 注入。

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        zh: "编辑 `src/my-element.ts` 并保存以测试 **HMR**",
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

在你的元素中渲染编译后的 HTML：

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` 在 `IntlayerNode` 上调用 `toString()`，它返回原始 Markdown 字符串。将其传递给 `compileMarkdown` 以获取 HTML 字符串，然后使用 Lit 的 `unsafeHTML` 指令进行渲染。

</Step>

<Step number={9} title="为应用添加本地化路由" isOptional={true}>

要为每种语言创建唯一的路由（对 SEO 有用），你可以使用客户端路由器以及 Intlayer 的 `localeMap` / `localeFlatMap` 帮助程序，以及用于服务器端区域设置检测的 `intlayerProxy` Vite 插件。

首先，在 Vite 配置中添加 `intlayerProxy`：

> 请注意，要在生产环境中使用 `intlayerProxy`，你需要将 `vite-intlayer` 从 `devDependencies` 移到 `dependencies`。

> 从 Intlayer v9 开始，`intlayerProxy()` 直接捆绑到 `intlayer()` 插件中，并通过 `routing.enableProxy` 选项默认启用（默认为 `true`）。如下所示单独注册它现在是可选的 — 为了向后兼容性和需要控制插件顺序的设置而保留。设置 `routing.enableProxy: false` 以选择退出。请参阅 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={10} title="区域设置变化时更改 URL" isOptional={true}>

要在区域设置更改时更新浏览器 URL，请使用 `useRewriteURL` 以及区域设置切换器：

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // 当区域设置更改时自动重写当前 URL。
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={11} title="切换 HTML 语言和方向属性" isOptional={true}>

更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前区域设置，以便进行可访问性和 SEO。

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- 你的内容 -->`;
  }
}
```

</Step>

<Step number={12} title="提取组件的内容" isOptional={true}>

如果你有现有的 codebase，转换数千个文件可能很耗时。

为了简化此过程，Intlayer 提供了[编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)来转换你的组件并提取内容。

要设置它，你可以在 `intlayer.config.ts` 文件中添加一个 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
     * 指示组件在转换后是否应保存。
     *
     * - 如果 `true`，编译器将在磁盘中重写组件文件。所以转换将是永久的，编译器将跳过下一个过程的转换。这样，编译器可以转换应用，然后可以将其删除。
     *
     * - 如果 `false`，编译器将仅在构建输出中将 `useIntlayer()` 函数调用注入到代码中，并保持基础 codebase 完整。转换将仅在内存中进行。
     */
    saveComponents: false,

    /**
     * 字典关键前缀
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

</Step>

</Steps>

### （可选）站点地图与 robots.txt（构建时生成）

Intlayer 提供 `generateSitemap` 与 `getMultilingualUrls`，可将面向爬虫的多语言 `sitemap.xml` 和 `robots.txt` 格式化并自动写入 `public/`。实践中在 Vite **之前**运行小型 Node 脚本（例如 npm 的 `predev` / `prebuild`）即可在构建或开发时生成这些文件。

#### 站点地图

Intlayer 的站点地图生成会尊重你的语言配置，并包含爬虫所需的元数据。

> 生成的站点地图支持 `xhtml:link`（hreflang）。与只列出扁平 URL 不同，Intlayer 会在各语言版本之间建立双向关联（例如 `/about`、`/fr/about` 或 `/about?lang=fr`，取决于路由模式）。

#### Robots.txt

使用 `getMultilingualUrls`，使 `Disallow` 覆盖敏感路径的每一种本地化写法。

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

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

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

需已安装 `intlayer` 以便脚本导入。生产环境请设置环境变量 `SITE_URL`（例如在 CI 中）。

> 建议在 Node 中使用 `generate-seo.mjs`（ESM）。若使用 `generate-seo.js`，请在 `package.json` 中设置 `"type": "module"` 或以其他方式启用 ESM。

#### 2. 在运行 Vite 之前执行脚本

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

若使用 pnpm 或 yarn，请相应调整命令；也可在 CI 或其他步骤中调用该脚本。

### 配置 TypeScript

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> Lit 的装饰器支持需要 `experimentalDecorators` 和 `useDefineForClassFields: false`。

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以在 `.gitignore` 文件中添加以下说明：

```bash
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了改善您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 以方便地创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

要进一步深入，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外化您的内容。
