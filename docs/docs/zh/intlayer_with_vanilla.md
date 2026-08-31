---
createdAt: 2026-03-31
updatedAt: 2026-08-30
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
author: aymericzip
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

<Accordion header="完整的 Vanilla JS 覆盖">

Intlayer 经过优化，可与 Vanilla JavaScript 完美配合，提供**与框架无关的内容管理**、**TypeScript 支持**以及扩展国际化 (i18n) 所需的所有功能。

</Accordion>

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

</Accordion>

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

<Accordion header="AI Agent">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

</Accordion>

**自动化**

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

## Vanilla JS 应用中设置 Intlayer 的分步指南

<Steps>

<Step number={1} title="安装依赖">

使用 npm 安装必要的软件包：

```bash packageManager="npm"
# 生成 intlayer 和 vanilla-intlayer 的独立捆绑包
# 此文件将被导入到您的 HTML 文件中
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 使用配置文件初始化 intlayer
npx intlayer init --no-gitignore

# 构建字典
npx intlayer build
```

```bash packageManager="pnpm"
# 生成 intlayer 和 vanilla-intlayer 的独立捆绑包
# 此文件将被导入到您的 HTML 文件中
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 使用配置文件初始化 intlayer
pnpm intlayer init --no-gitignore

# 构建字典
pnpm intlayer build
```

```bash packageManager="yarn"
# 生成 intlayer 和 vanilla-intlayer 的独立捆绑包
# 此文件将被导入到您的 HTML 文件中
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 初始化 intlayer 配置文件、TypeScript（如果已设置）、环境变量
yarn intlayer init --no-gitignore

# 构建字典
yarn intlayer build
```

```bash packageManager="bun"
# 生成 intlayer 和 vanilla-intlayer 的独立捆绑包
# 此文件将被导入到您的 HTML 文件中
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 使用配置文件初始化 intlayer
bun x intlayer init --no-gitignore

# 构建字典
bun x intlayer build
```

- **intlayer**
  核心软件包，为配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)提供国际化工具。

- **vanilla-intlayer**
  将 Intlayer 与纯 JavaScript / TypeScript 应用程序集成的软件包。它提供了一个 pub/sub 单例（`IntlayerClient`）和基于回调的辅助函数（`useIntlayer`、`useLocale` 等），使应用的任何部分都可以响应语言区域变化，而无需依赖 UI 框架。

> `intlayer standalone` CLI 的捆绑导出通过树摇动未使用的软件包、语言区域和特定于您的配置的非必要逻辑（如重定向或前缀）来生成优化的构建。

</Step>

<Step number={2} title="配置您的项目">

创建一个配置文件来配置应用的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言区域
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在您的 HTML 中导入捆绑包">

生成 `intlayer.js` 捆绑包后，可以将其导入到 HTML 文件中：

```html fileName="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <!-- 导入捆绑包 -->
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

该捆绑包在 `window` 上将 `Intlayer` 和 `VanillaIntlayer` 暴露为全局对象。

</Step>

<Step number={4} title="在您的入口点引导 Intlayer">

在您的 `src/main.js` 中，在渲染任何内容**之前**调用 `installIntlayer()`，以便全局语言区域单例已准备就绪。

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// 必须在渲染任何 i18n 内容之前调用。
installIntlayer();
```

如果您还想使用 markdown 渲染器，请调用 `installIntlayerMarkdown()`：

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="声明您的内容">

创建和管理您的内容声明以存储翻译：

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      zh: "Vite Logo",
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        zh: "计数为 {{count}}",
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      zh: "单击 Vite 徽标以了解更多信息",
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
        "zh": "Vite Logo",
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
          "zh": "计数为 {{count}}",
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "zh": "单击 Vite 徽标以了解更多信息",
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> 您的内容声明可以在应用的任何位置定义，只要它们包含在 `contentDir` 目录中（默认为 `./src`），并与内容声明文件扩展名匹配（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。
>
> 有关更多详细信息，请参考[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={6} title="在您的 JavaScript 中使用 Intlayer">

`window.VanillaIntlayer` 对象提供 API 辅助函数：`useIntlayer(key, locale?)` 返回给定键的已翻译内容。

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// 获取当前语言区域的初始内容。
// 链接 .onChange() 以在语言区域更改时获得通知。
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

> 通过将叶值包装在 `String()` 中来以字符串形式访问它们，该函数调用节点的 `toString()` 方法并返回翻译的文本。
>
> 当您需要用于原生 HTML 属性（例如 `alt`、`aria-label`）的值时，直接使用 `.value`：
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="更改您的内容的语言" isOptional={true}>

要更改您的内容的语言，请使用由 `useLocale` 暴露的 `setLocale` 函数。

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

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

  // 保持下拉列表与从其他位置更改的语言区域同步
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="切换 HTML 语言和方向属性" isOptional={true}>

更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前语言区域，以实现无障碍访问和 SEO。

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

</Step>

<Step number={9} title="按语言区域懒加载字典" isOptional={true}>

如果您想按语言区域懒加载字典，可以使用 `useDictionaryDynamic`。这在您不想将所有翻译捆绑在初始 `intlayer.js` 文件中时很有用。

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

> 注意：`useDictionaryDynamic` 要求字典作为单独的 ESM 文件可用。如果您有一个 Web 服务器提供字典，通常会使用此方法。
> </Step>

</Steps>

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

## 常见问题

<FAQ>

<Question title="我可以在没有打包器或框架的情况下使用 Intlayer 吗？">

可以。这正是本指南所涵盖的内容。您可以按照第 3 步的演示直接在 HTML 中引入 `vanilla-intlayer` 包，在入口文件中对其进行初始化，然后使用 `useIntlayer` 读取内容。不需要 Vite、webpack 或任何构建流程。

</Question>

<Question title="i18n 会给我的页面增加多少体积？">

远少于运行时目录方案，因为页面永远不会下载它不渲染的语言。内容由预先编译的字典直接解析，按语言环境进行的懒加载会使其他语言保留在初始载荷之外，直到访客主动切换语言。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)、[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="我可以从 i18next 迁移而无需重写脚本吗？">

基本可以。请按照 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 迁移内容。您也可以逐步迁移：[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将现有的 JSON 目录作为单一真实来源（source of truth），并生成 Intlayer 字典，使两个层在逐个脚本迁移时保持同步。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的源码文件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。请参阅 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可以在构建时对 JSX、TSX、Vue 和 Svelte 源码执行相同操作，在每次更改时自动生成字典，完全无需手动维护键名。它通过静态分析工作，因此仅在运行时存在的字符串无法被捕获，并且需要少量注解以区分用户文本和应用程序逻辑。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="国际化纯 JavaScript 站点有哪些不同的解决方案？">

- **手写字典对象**：通常是通过 `fetch` 加载的每个语言一个 JSON 文件。没有依赖，但没有类型定义，没有复数规则，也没有任何工具能告诉你是否遗漏了翻译。
- **来自 CDN 的 `i18next`**：成熟且与框架无关，拥有插件生态，但会增加运行时体积及其自带的目录加载流程。
- **`Intlayer`**：声明式内容，带有复数和性别规则、语言环境检测、RTL 支持以及按语言环境懒加载，再加上可通过 AI 填充缺失翻译的 CLI 和面向非技术人员的可视化编辑器。

请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md)。

</Question>

<Question title="如何读取翻译并放入 DOM 中？">

使用您的字典键调用 `useIntlayer`，并将值自行写入节点中，如第 6 步所示。因为没有框架，没有东西会自行重新渲染：您需要在语言环境更改时更新节点，第 7 步对此进行了介绍。

</Question>

<Question title="如何检测访客的语言？">

从 `routing.storage` 中列出的来源检测，通常优先读取 Cookie，然后是 `Accept-Language` 请求头，最后回退到您的默认语言环境。访客明确选择的语言会被持久化，以便在下次访问时保持。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="如何支持阿拉伯语或希伯来语等从右到左 (RTL) 的语言？">

第 8 步对此进行了介绍。`getHTMLTextDir` 会为语言环境返回 `ltr`、`rtl` 或 `auto`，因此您可以在 `html` 元素上根据当前活动语言环境设置 `lang` 和 `dir`，并让 CSS 逻辑属性处理其余排版。

</Question>

<Question title="访客会下载每种语言吗？">

如果您不想让他们下载，就不会。第 9 步介绍了按语言环境懒加载字典，因此页面仅加载一种语言，仅在访客切换时才去获取另一种语言。请参阅 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)。

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
