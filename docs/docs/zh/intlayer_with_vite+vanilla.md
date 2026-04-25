---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - 如何在 2026 年翻译 Vanilla JS 应用
description: 了解如何使您的 Vite 和 Vanilla JS 网站多语言化。按照文档进行国际化 (i18n) 和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# 使用 Intlayer 翻译您的 Vite 和 Vanilla JS 网站 | 国际化 (i18n)

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新且开源的国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**：在组件级别使用声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**：通过自动生成的类型，改进自动补全和错误检测。
- **受益于高级功能**：如动态语言检测和切换。

---

## 在 Vite 和 Vanilla JS 应用程序中设置 Intlayer 的分步指南

### 第 1 步：安装依赖项

使用 npm 安装必要的软件包：

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**
  核心库，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 的国际化工具。

- **vanilla-intlayer**
  将 Intlayer 与纯 JavaScript / TypeScript 应用程序集成的库。它提供了一个发布/订阅单例 (`IntlayerClient`) 和基于回调的辅助工具 (`useIntlayer`, `useLocale` 等)，因此您的应用程序的任何部分都可以对语言更改做出反应，而不依赖于 UI 框架。

- **vite-intlayer**
  包含用于将 Intlayer 与 [Vite 打包器](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：配置项目

创建一个配置文件来配置应用程序的语言：

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

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、在控制台中禁用 Intlayer 日志等。有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 3 步：在 Vite 配置中集成 Intlayer

在您的配置中添加 intlayer 插件。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保内容声明文件的构建并在开发模式下监控它们。它在 Vite 应用程序中定义 Intlayer 环境变量。此外，它还提供别名以优化性能。

### 第 4 步：在入口点引导 Intlayer

在渲染任何内容**之前**调用 `installIntlayer()`，以便全局语言单例准备就绪。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// 必须在渲染任何 i18n 内容之前调用。
installIntlayer();

// 导入并运行您的应用模块。
import "./app.js";
```

如果您还使用 `md()` 内容声明 (Markdown)，请同时安装 Markdown 渲染器：

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

### 第 5 步：声明您的内容

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
      es: "点击 Vite 标志了解更多信息",
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
        "es": "点击 Vite 标志了解更多信息"
      }
    }
  }
}
```

> 只要您的内容声明包含在 `contentDir` 目录（默认为 `./src`）中，就可以在应用程序的任何位置定义它们。并且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）。
>
> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 第 6 步：在 JavaScript 中使用 Intlayer

`vanilla-intlayer` 镜像了 `react-intlayer` 的表面 API：`useIntlayer(key, locale?)` 直接返回翻译后的内容。在结果上链式调用 `.onChange()` 以订阅语言更改 — 这相当于 React 的显式重新渲染。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// 获取当前语言的初始内容。
// 链式调用 .onChange()，以便在语言发生变化时得到通知。
const content = useIntlayer("app").onChange((newContent) => {
  // 仅重新渲染或补丁受影响的 DOM 节点
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// 初始渲染
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> 通过将叶值包装在 `String()` 中将其作为字符串访问，这将调用节点的 `toString()` 方法并返回翻译后的文本。
>
> 当您需要原生 HTML 属性（例如 `alt`, `aria-label`）的值时，请直接使用 `.value`：
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

### (可选) 第 7 步：更改内容的语言

要更改内容的语言，请使用 `useLocale` 公开的 `setLocale` 函数。

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
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

  select.addEventListener("change", () => setLocale(select.value as any));

  // 当语言从其他地方更改时，保持下拉菜单同步
  return subscribe((newLocale) => render(newLocale));
}
```

### (可选) 第 8 步：渲染 Markdown 和 HTML 内容

Intlayer 支持 `md()` 和 `html()` 内容声明。在纯 JS 中，编译后的输出通过 `innerHTML` 作为原始 HTML 插入。

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

编译并注入 HTML：

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` 在 `IntlayerNode` 上调用 `toString()`，该方法返回原始 Markdown 字符串。将其传递给 `compileMarkdown` 以获取 HTML 字符串，然后通过 `innerHTML` 设置它。

> [!WARNING]
> 仅对受信任的内容使用 `innerHTML`。如果 Markdown 来自用户输入，请先对其进行消毒（例如使用 DOMPurify）。您可以动态安装消毒渲染器：
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

### (可选) 第 9 步：在应用程序中添加本地化路由

要为每种语言创建唯一的路由（对 SEO 很有用），您可以在 Vite 配置中使用 `intlayerProxy` 进行服务端语言检测。

首先，在您的 Vite 配置中添加 `intlayerProxy`：

> 请注意，要在生产环境中使用 `intlayerProxy`，您需要将 `vite-intlayer` 从 `devDependencies` 移动到 `dependencies`。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // 应该放在第一位
    intlayer(),
  ],
});
```

### (可选) 第 10 步：语言更改时更改 URL

要在语言更改时更新浏览器 URL，请在安装 Intlayer 后调用 `useRewriteURL()`：

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// 立即重写 URL，并在随后的每次语言更改时重写。
// 返回一个用于清理的取消订阅函数。
const stopRewriteURL = useRewriteURL();
```

### (可选) 第 11 步：切换 HTML 语言和方向属性

更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前语言，以提高可访问性和 SEO。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (可选) 第 12 步：按语言延迟加载字典

对于大型应用程序，您可能希望将每种语言的字典拆分到其自己的块中。结合 Vite 的动态 `import()` 使用 `useDictionaryDynamic`：

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> 每种语言的包仅在该语言激活时才获取，并且结果会被缓存 — 随后切换到同一语言是即时的。

### (可选) 第 13 步：提取组件内容

如果您已经拥有代码库，转换数千个文件可能会非常耗时。

为了简化此过程，Intlayer 建议使用 [编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 来转换您的组件并提取内容。

要进行设置，您可以在 `intlayer.config.ts` 文件中添加 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 配置的其余部分
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
     * 指示组件在被转换后是否应保存。
     * 这样，编译器只需运行一次来转换应用程序，然后就可以移除它。
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
 <Tab value='Extract 命令'>

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
 <Tab value='Babel 编译器'>

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

建议忽略由 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以在 `.gitignore` 文件中添加以下指令：

```bash
# 忽略由 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了改善您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

要深入了解，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外置您的内容。
