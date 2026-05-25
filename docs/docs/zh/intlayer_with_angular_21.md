---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - 2026年如何翻译一个Angular 21应用程序（Vite）
description: 了解如何使您的Angular网站支持多语言。按照文档进行国际化（i18n）和翻译。
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
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新Solid useIntlayer API的用法以直接访问属性"
  - version: 8.0.0
    date: 2026-01-26
    changes: "发布稳定版"
  - version: 8.0.0
    date: 2025-12-30
    changes: "增加init命令"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始版本"
---

# 使用Intlayer翻译您的Angular 21（Vite）网站 | 国际化 (i18n)

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代Web应用程序中的多语言支持。

借助Intlayer，您可以：

- **轻松管理翻译**：使用组件级别的声明式字典。
- **动态本地化**：元数据、路由和内容。
- **确保TypeScript支持**：使用自动生成的类型，改善自动补全和错误检测。
- **受益于高级功能**：如动态区域设置检测和切换。

---

## 在Angular应用程序中设置Intlayer的分步指南

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用Intlayer进行应用程序国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

在GitHub上查看 [应用程序模板](https://github.com/aymericzip/intlayer-angular-21-template)。

### 步骤 1：安装依赖项

使用npm安装必要的包：

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
bun x intlayer init
```

- **intlayer**

  核心包，提供了配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和[CLI命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)等国际化工具。

- **angular-intlayer**
  将Intlayer与Angular应用程序集成的包。它为Angular的国际化提供了上下文提供者（Providers）和Hooks。

- **@angular-builders/custom-esbuild**
  需要它来自定义Angular CLI的esbuild配置。

### 步骤 2：配置您的项目

创建一个配置文件以配置您应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您支持的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 通过此配置文件，您可以设置本地化的URL、中间件重定向、Cookie名称、内容声明的位置和扩展名、禁用控制台中的Intlayer日志等。获取所有可用参数的完整列表，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 步骤 3：在Angular配置中集成Intlayer

要将Intlayer与Angular CLI集成，您需要使用自定义构建器。本指南假设您使用的是 Vite/esbuild（Angular 21项目的默认设置）。

首先，修改您的 `angular.json`，使用自定义的esbuild构建器。更新 `build` 和 `serve` 配置：

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application", // replace "@angular/build:application"
          "options": {
            "define": {
              "process.env": "{}",
            },
            "plugins": ["./esbuild.plugins.ts"],
            "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-esbuild:dev-server", // replace "@angular/build:dev-server"
          "options": {
            "prebundle": {
              "exclude": [
                "intlayer",
                "angular-intlayer",
                "@intlayer/config/built",
                "@intlayer/core"
              ]
          },
        },
      },
    },
  },
}
```

> 请确保将 `angular.json` 中的 `your-app-name` 替换为您项目的实际名称。

接下来，在项目的根目录中创建一个 `esbuild.plugins.ts` 文件：

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> `intlayerEsbuildPlugin` 函数负责使用Intlayer配置esbuild。它注入插件来处理内容声明文件，并针对最佳性能进行了设置。

### 步骤 4：声明您的内容

创建并管理您的内容声明文件以存储翻译：

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> 您的内容声明可以定义在应用程序的任何位置，只需将其包含在 `contentDir` 目录（默认为 `./src`）中，并且符合内容声明的文件后缀名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）。

> 详细信息请参考 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 步骤 5：在代码中使用Intlayer

要在整个Angular应用程序中利用Intlayer的国际化功能，您需要在应用程序配置中提供Intlayer。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // 在此添加Intlayer提供者
  ],
};
```

然后，您可以在任何组件中使用 `useIntlayer` 功能。

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

在您的模板中：

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayer 内容将作为 `Signal` 返回，因此您可以通过调用信号来访问值：`content().title`。

### （可选）步骤 6：更改内容的语言

要更改内容的语言，您可以使用 `useLocale` 函数提供的 `setLocale` 函数。这允许您设置应用程序的区域设置，并相应更新内容。

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
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

然后，在 `app.component.ts` 中使用此组件：

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

### 配置TypeScript

Intlayer使用模块扩充（Module Augmentation）来获得TypeScript的好处，并使您的代码库更健壮。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

请确保您的TypeScript配置包含了自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的TypeScript配置
  "include": [
    // ... 您现有的TypeScript配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git配置

建议忽略由Intlayer生成的文件。这可以避免将它们提交到您的Git仓库。

为此，您可以将以下说明添加到您的 `.gitignore` 文件中：

```bash
# 忽略由Intlayer生成的文件
.intlayer
```

### VS Code 扩展

为了提升您在Intlayer中的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从VS Code应用市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 已翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展示例文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

想要深入了解，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)外部化您的内容。

---
