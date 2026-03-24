---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Analog i18n - 如何翻译Analog 应用 2026
description: 了解如何让您的 Analog 应用支持多语言。遵循文档进行国际化 (i18n) 和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Analog
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - analog
applicationTemplate: https://github.com/aymericzip/intlayer-analog-template
history:
  - version: 8.0.4
    date: 2026-01-26
    changes: "初始化历史记录"
---

# 使用 Intlayer 翻译您的 Analog (Angular) 应用 | 国际化 (i18n)

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的、开源的国际化 (i18n) 库，旨在简化现代 Web 应用中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**：在组件级使用声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**：通过自动生成的类型提高自动补全和错误检测能力。
- **受益于高级功能**：如动态语言检测和切换。

---

## 在 Analog 应用中设置 Intlayer 的分步指南

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer/tree/main/examples/vite-analog-app?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 实现应用国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

查看 GitHub 上的 [应用模板](https://github.com/aymericzip/intlayer-analog-template)。

### 第 1 步：安装依赖项

使用 npm 安装必要的软件包：

```bash packageManager="npm"
npm install intlayer angular-intlayer vite-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
bunx intlayer init
```

- **intlayer**

  核心软件包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、编译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **angular-intlayer**
  将 Intlayer 与 Angular 应用集成的软件包。它为 Angular 国际化提供上下文提供者和 Hook。

- **vite-intlayer**
  将 Intlayer 与 Vite 集成的软件包。它提供一个插件来处理内容声明文件，并为优化性能设置别名。

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
      // 您的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 3 步：在 Vite 配置中集成 Intlayer

要将 Intlayer 与 Analog 集成，您需要使用 `vite-intlayer` 插件。

修改您的 `vite.config.ts` 文件：

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer(), // 添加 Intlayer 插件
  ],
}));
```

> `intlayer()` 插件为 Vite 配置了 Intlayer。它处理内容声明文件并为优化性能设置别名。

### 第 4 步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
      zh: "你好",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
      zh: "恭喜！您的应用正在运行。 🎉",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> 您的内容声明可以定义在应用中的任何位置，只要它们包含在 `contentDir` 目录（默认为 `./src`）中，并且符合内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）。

> 有关更多详细信息，请参考[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 第 5 步：在代码中使用 Intlayer

要在整个 Analog 应用中使用 Intlayer 的国际化功能，您需要在应用配置中提供 Intlayer。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // 在此处添加 Intlayer 提供者
  ],
};
```

然后，您可以在任何组件中使用 `useIntlayer` 函数。

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

Intlayer 内容以 `Signal` 形式返回，因此您通过调用 Signal 来访问值：`content().title`。

### （可选）第 6 步：更改内容语言

要更改内容的语言，您可以使用 `useLocale` 函数提供的 `setLocale` 函数。这允许您设置应用的语言环境并相应地更新内容。

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

然后，在您的页面中使用此组件：

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "../locale-switcher.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [LocaleSwitcherComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

### 配置 TypeScript

Intlayer 使用模块扩充 (module augmentation) 来利用 TypeScript 的优势并使您的代码库更强大。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```bash
#  忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您的 Intlayer 开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参考 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。
