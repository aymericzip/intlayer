---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "Vanilla JS i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Vanilla JS 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 8.4.10
    date: 2026-03-31
    changes: "初始化历史记录"
---

# 使用 Intlayer 翻译您的 Vanilla JS 网站 | 国际化 (i18n)

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“i18next”或“i18n.js”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完整的 Vanilla JS 覆盖**

Intlayer 经过优化，可与 Vanilla JavaScript 完美配合，提供**与框架无关的内容管理**、**TypeScript 支持**以及扩展国际化 (i18n) 所需的所有功能。

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent技能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

**自动化**

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

**表现**

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

**无需开发即可扩展**

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

---

## 在 Vanilla JS 应用中设置 Intlayer 的步骤指南

### 第一步：安装依赖

使用 npm 安装必要的包：

```bash packageManager="npm"
# 生成 intlayer 和 vanilla-intlayer 的独立 bundle
# 此文件将导入到您的 HTML 文件中
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 使用配置文件初始化 intlayer
npx intlayer init --no-gitignore

# 构建字典
npx intlayer build
```

```bash packageManager="pnpm"
# 生成 intlayer 和 vanilla-intlayer 的独立 bundle
# 此文件将导入到您的 HTML 文件中
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 使用配置文件初始化 intlayer
pnpm intlayer init --no-gitignore

# 构建字典
pnpm intlayer build
```

```bash packageManager="yarn"
# 生成 intlayer 和 vanilla-intlayer 的独立 bundle
# 此文件将导入到您的 HTML 文件中
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 初始化 intlayer 配置文件、TypeScript（如果已设置）、环境变量
yarn intlayer init --no-gitignore

# 构建字典
yarn intlayer build
```

```bash packageManager="bun"
# 生成 intlayer 和 vanilla-intlayer 的独立 bundle
# 此文件将导入到您的 HTML 文件中
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 使用配置文件初始化 intlayer
bun x intlayer init --no-gitignore

# 构建字典
bun x intlayer build
```

- **intlayer**
  核心包，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **vanilla-intlayer**
  将 Intlayer 与纯 JavaScript / TypeScript 应用集成的包。它提供了一个发布/订阅单例 (`IntlayerClient`) 和基于回调的辅助函数 (`useIntlayer`、`useLocale` 等)，使您应用的任何部分都能在不依赖 UI 框架的情况下响应语言更改。

> `intlayer standalone` CLI 的打包导出通过对您的配置中未使用的包、语言区域和非必要逻辑（如重定向或前缀）进行摇树优化（tree-shaking）来生成优化的构建版本。

### 第二步：项目配置

创建一个配置文件以配置您应用的语言：

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

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第三步：在 HTML 中导入 bundle

生成 `intlayer.js` bundle 后，您可以将其导入到 HTML 文件中：

```html fileName="index.html"
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />

    <!-- 导入 bundle -->
    <script src="./intlayer.js" defer></script>
    <!-- 导入您的主脚本 -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

该 bundle 会将 `Intlayer` 和 `VanillaIntlayer` 暴露为 `window` 上的全局对象。

### 第四步：在入口点引导 Intlayer

在 `src/main.js` 中，**在**渲染任何内容之前调用 `installIntlayer()`，以便全局语言单例准备就绪。

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// 必须在渲染任何 i18n 内容之前调用。
installIntlayer();
```

如果您还想使用 Markdown 渲染器，请调用 `installIntlayerMarkdown()`：

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### 第五步：声明您的内容

创建并管理您的内容声明以存储翻译：

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
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
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> 只要您的内容声明包含在 `contentDir` 目录（默认为 `./src`）中，并且符合内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`），您可以在应用的任何位置定义它们。
>
> 有关更多详细信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 第六步：在 JavaScript 中使用 Intlayer

`window.VanillaIntlayer` 对象提供了 API 辅助函数：`useIntlayer(key, locale?)` 返回给定键的翻译内容。

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// 获取当前语言的初始内容。
// 链式调用 .onChange() 以在语言更改时获得通知。
const content = useIntlayer("app").onChange((newContent) => {
  // 仅重新渲染或修补受影响的 DOM 节点
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// 初始渲染
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> 通过将叶子节点值包裹在 `String()` 中，将其作为字符串访问，这将调用节点的 `toString()` 方法并返回翻译后的文本。
>
> 当您需要原生 HTML 属性（如 `alt`、`aria-label`）的值时，请直接使用 `.value`：
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### （可选）第七步：更改内容语言

要更改内容的语言，请使用 `useLocale` 暴露的 `setLocale` 函数。

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "语言");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // 当从其他地方更改语言时，保持下拉菜单同步
  return subscribe((newLocale) => render(newLocale));
}
```

### （可选）第八步：切换 HTML 语言和方向属性

根据当前语言更新 `<html>` 标签的 `lang` 和 `dir` 属性，以满足辅助功能和 SEO 的要求。

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### （可选）第九步：按需加载（Lazy-load）语言字典

如果您想按需加载字典，可以使用 `useDictionaryDynamic`。如果您不想在初始的 `intlayer.js` 文件中打包所有翻译，这非常有用。

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> 注意：`useDictionaryDynamic` 要求字典作为单独的 ESM 文件可用。如果您的 Web 服务器负责提供这些字典，通常会使用这种方法。

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

### VS Code 扩展

为了提升使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

若要深入了解，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外置您的内容。
