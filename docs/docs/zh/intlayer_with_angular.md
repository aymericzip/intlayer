---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Angular i18n - 如何翻译Angular 应用 2026
description: 探索如何让你的 Angular 网站支持多语言。遵循文档进行国际化 (i18n) 和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
---

# 使用 Intlayer 翻译你的 Angular 网站 | 国际化 (i18n)

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的、开源的国际化 (i18n) 库，旨在简化现代 Web 应用中的多语言支持。

使用 Intlayer，你可以：

- **轻松管理翻译**：在组件级使用声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**：通过自动生成的类型提高自动补全和错误检测能力。
- **受益于高级功能**：如动态语言检测和切换。

---

## 在 Angular 应用中设置 Intlayer 的分步指南

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-angular-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 国际化你的应用"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

在 GitHub 上查看 [应用模板](https://github.com/aymericzip/intlayer-angular-template)。

### 第 1 步：安装依赖项

使用 npm 安装必要的软件包：

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-webpack --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-webpack --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-webpack --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-webpack --dev
bunx intlayer init
```

- **intlayer**

  核心软件包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)，转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)的国际化工具。

- **angular-intlayer**
  将 Intlayer 与 Angular 应用集成的软件包。它为 Angular 国际化提供上下文提供者和 Hook。

- **@angular-builders/custom-webpack**
  自定义 Angular CLI 的 Webpack 配置所需的。

### 第 2 步：项目配置

创建一个配置文件来配置应用的语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
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
      // 你的其他语言
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

> 通过此配置文件，你可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)。

### 第 3 步：在 Angular 配置中集成 Intlayer

要将 Intlayer 与 Angular CLI 集成，你需要使用自定义构建器。本指南假设你使用的是 Webpack（许多 Angular 项目的默认设置）。

首先，修改你的 `angular.json` 以使用自定义 Webpack 构建器。更新 `build` 和 `serve` 配置：

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser", // replace "@angular-devkit/build-angular:application",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts",
              "mergeStrategies": { "module.rules": "prepend" },
            },
            "main": "src/main.ts", // replace "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
        },
      },
    },
  },
}
```

> 请确保将 `your-app-name` 替换为 `angular.json` 中项目的实际名称。

接下来，在项目根目录下创建一个 `webpack.config.ts` 文件：

```typescript fileName="webpack.config.ts"
import { mergeConfig } from "angular-intlayer/webpack";

export default mergeConfig({});
```

> `mergeConfig` 函数使用 Intlayer 配置 Webpack。它会注入 `IntlayerPlugin`（用于处理内容声明文件）并设置别名以优化性能。

### 第 4 步：声明你的内容

创建并管理你的内容声明以存储翻译：

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> 只要你的内容声明包含在 `contentDir` 目录中（默认为 `./src`），就可以在应用中的任何位置定义它们。并且匹配内容声明文件的扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）。

> 有关更多详情，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)。

### 第 5 步：在代码中使用 Intlayer

要在整个 Angular 应用中使用 Intlayer 的国际化功能，你需要在应用配置中提供 Intlayer。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // 在此处添加 Intlayer 提供者
  ],
};
```

然后，你可以在任何组件中使用 `useIntlayer` 函数。

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

在你的模板中：

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayer 内容作为 `Signal` 返回，因此你通过调用该信号来访问值：`content().title`。

### (可选) 第 6 步：更改内容的语言

要更改内容的语言，你可以使用 `useLocale` 函数提供的 `setLocale` 函数。这允许你设置应用的语言区域并相应地更新内容。

创建一个用于切换语言的组件：

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
  styles: [
    `
      .locale-switcher {
        margin: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: fit-content;
      }
    `,
  ],
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

然后，在你的 `app.component.ts` 中使用此组件：

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

### 配置 TypeScript

Intlayer 使用模块扩充来发挥 TypeScript 的优势并使你的代码库更强大。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保你的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 你现有的 TypeScript 配置
  "include": [
    // ... 你现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到你的 Git 仓库。

为此，你可以在 `.gitignore` 文件中添加以下指令：

```bash
#  忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升你在 Intlayer 中的开发体验，你可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 用于轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详情，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

要进一步深入，你可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) 外置你的内容。

---
