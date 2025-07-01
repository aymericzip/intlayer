---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: 翻译你的Angular网站 (i18n)
description: 了解如何使您的Angular网站实现多语言支持。按照文档进行国际化（i18n）和翻译。
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
---

# 使用 Intlayer 在 Angular 中开始国际化 (i18n)

> 本包仍在开发中。更多信息请参见[issue](https://github.com/aymericzip/intlayer/issues/116)。通过点赞该 issue 来表达您对 Angular 版 Intlayer 的兴趣

<!-- 请参阅 GitHub 上的 [应用模板](https://github.com/aymericzip/intlayer-angular-template)。 -->

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代 Web 应用程序的多语言支持。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **通过自动生成的类型确保 TypeScript 支持**，提升自动补全和错误检测能力。
- **享受高级功能**，如动态语言环境检测和切换。

---

## 在 Angular 应用中设置 Intlayer 的分步指南

### 第一步：安装依赖

使用 npm 安装所需的包：

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
```

- **intlayer**

  核心包，提供国际化工具，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)、转译和[CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

- **angular-intlayer**

  将 Intlayer 集成到 Angular 应用中的包，提供 Angular 国际化的上下文提供者和钩子。

- **@intlayer/webpack**
  集成 Intlayer 与 Webpack 的包。它被 Angular CLI 用于构建内容声明文件并在开发模式下监视这些文件。

### 第 2 步：配置您的项目

创建一个配置文件来配置您应用程序的语言：

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

集成 Intlayer 与 Webpack 的包。它被 Angular CLI 用于构建内容声明文件并在开发模式下监控它们。

### 第 2 步：配置您的项目

创建一个配置文件来配置您应用程序的语言：

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

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用 Intlayer 控制台日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 3 步：在您的 Angular 配置中集成 Intlayer

要将 Intlayer 集成到 Angular CLI 中，您有两个选项，取决于您的构建工具：`esbuild` 或 `webpack`。

#### 选项 1：使用 esbuild（推荐）

首先，修改您的 `angular.json` 以使用自定义的 esbuild 构建器。更新 `build` 配置：

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["./esbuild/intlayer-plugin.ts"]
          }
        }
      }
    }
  }
}
```

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名，禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 3 步：在您的 Angular 配置中集成 Intlayer

要将 Intlayer 集成到 Angular CLI 中，您有两种选择，具体取决于您的构建工具：`esbuild` 或 `webpack`。

#### 选项 1：使用 esbuild（推荐）

首先，修改您的 `angular.json`，以使用自定义的 esbuild 构建器。更新 `build` 配置：

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["./esbuild/intlayer-plugin.ts"]
          }
        }
      }
    }
  }
}
```

> 请确保将 `your-app-name` 替换为 `angular.json` 中您项目的实际名称。

接下来，在项目根目录下创建一个 `esbuild/intlayer-plugin.ts` 文件：

```typescript fileName="esbuild/intlayer-plugin.ts"
import { prepareIntlayer, watch } from "@intlayer/chokidar";
import { getConfiguration, logger } from "@intlayer/config";
import type { Plugin } from "esbuild";

const intlayerPlugin: Plugin = {
  name: "intlayer-esbuild-plugin",
  setup(build) {
    const configuration = getConfiguration();
    let isWatching = false;

    build.onStart(async () => {
      logger("Intlayer esbuild 插件已启动", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("启用监听模式。启动监视器...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Intlayer esbuild 插件错误：${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayerPlugin;
```

> 该 esbuild 的 `intlayerPlugin` 确保在构建开始前准备好 Intlayer，并在开发模式下监听变更。

#### 选项 2：使用 Webpack

首先，修改你的 `angular.json` 以使用自定义的 Webpack 构建器。更新 `build` 和 `serve` 配置：

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server"
        }
      }
    }
  }
}
```

> 请确保将 `your-app-name` 替换为你项目中 `angular.json` 文件的实际项目名称。

接下来，在项目根目录创建一个 `webpack.config.js` 文件：

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> `IntlayerWebpackPlugin` 用于将 Intlayer 集成到 Webpack 中。它确保构建内容声明文件，并在开发模式下监视这些文件。它在应用程序中定义了 Intlayer 环境变量。此外，它还提供别名以优化性能。

### 第4步：声明您的内容

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
    }),
    congratulations: t({
      zh: "恭喜！您的应用正在运行。",
      en: "Congratulations! Your app is running. ",
      fr: "Félicitations! Votre application est en cours d'exécution. ",
      es: "¡Felicidades! Tu aplicación está en ejecución. ",
    }),
    exploreDocs: t({
      zh: "浏览文档",
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      zh: "通过教程学习",
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI 文档",
    angularLanguageService: t({
      zh: "Angular 语言服务",
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular 开发工具",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> 您的内容声明可以定义在应用程序中的任何位置，只要它们被包含在 `contentDir` 目录中（默认是 `./src`）。并且文件扩展名需匹配内容声明文件扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

### 第5步：在代码中使用 Intlayer

要在整个 Angular 应用中使用 Intlayer 的国际化功能，需要在组件中使用 `useIntlayer` 函数。该函数来自 `angular-intlayer`，可让您以响应式信号的形式访问翻译内容。
`IntlayerProvider` 已在应用程序根部注册，因此您无需将其添加到模块的 providers 中。

在组件类中访问您的内容字典：

```typescript fileName="src/app/hello-world.component.ts"
import { Component, signal } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-hello-world",
  standalone: true,
  template: `
    <h1>{{ content().title }}</h1>

    <div class="card">
      <button type="button" (click)="increment()">
        {{ content().count }} {{ count() }}
      </button>
      <p [innerHTML]="content().edit"></p>
    </div>

    <p class="read-the-docs">{{ content().readTheDocs }}</p>
  `,
})
export class HelloWorldComponent {
  content = useIntlayer("helloworld");
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
```

Intlayer 内容作为 `Signal` 返回，因此您可以在模板中通过调用信号来访问值：`content().title`。

### （可选）步骤 6：更改内容语言

要更改内容的语言，您可以使用 `useLocale` 函数提供的 `setLocale` 函数。这允许您设置应用程序的区域设置并相应地更新内容。

创建一个用于切换语言的组件：

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { getLocaleName } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeInfo = useLocale();
  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  // 向模板暴露 getLocaleName 函数
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

然后，在你的 `app.component.ts` 中使用此组件：

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { HelloWorldComponent } from "./hello-world.component";
import { LocaleSwitcherComponent } from "./components/locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HelloWorldComponent, LocaleSwitcherComponent],
  template: `
    <div>
      <app-locale-switcher />
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Angular logo"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
```

### （可选）步骤 7：为您的应用添加本地化路由

在 Angular 应用中添加本地化路由涉及使用带有区域前缀的 Angular Router。这为每种语言创建唯一的路由，对 SEO 非常有用。

示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

首先，确保您已安装 `@angular/router`。

然后，在 `app.routes.ts` 中创建处理基于区域路由的路由配置。

```typescript fileName="src/app/app.routes.ts"
import { Routes } from "@angular/router";
import { configuration, localeFlatMap } from "intlayer";
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root/root.component";

const { defaultLocale } = configuration.internationalization;

export const routes: Routes = [
  localeFlatMap((localizedData) => [
    {
      path: `${localizedData.urlPrefix}`,
      component: RootComponent,
      data: { locale: localizedData.locale },
    },
    {
      path: `${localizedData.urlPrefix}/home`,
      component: HomeComponent,
      data: { locale: localizedData.locale },
    },
  ]),
  { path: "**", redirectTo: `/${defaultLocale}/home` },
];
```

然后，你需要在 `app.config.ts` 中提供路由器。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### （可选）步骤 8：当语言环境改变时更改 URL

为了在用户更改语言时自动更新 URL，您可以修改 `LocaleSwitcher` 组件以使用 Angular 的 Router：

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  private router = inject(Router);

  localeInfo = useLocale({
    onLocaleChange: (newLocale) => {
      const currentPath = this.router.url;
      const localizedPath = getLocalizedUrl(currentPath, newLocale);
      this.router.navigateByUrl(localizedPath);
    },
  });

  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

### （可选）步骤 9：切换 HTML 的语言和方向属性

当您的应用支持多语言时，更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前语言环境非常重要。

您可以创建一个服务来自动处理此操作。

然后，在您的主 `AppComponent` 中注入并初始化此服务：

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... 其他导入
import { I18nHtmlAttributesService } from "./services/i18n-html-attributes.service";

@Component({
  // ...
})
export class AppComponent {
  constructor() {
    inject(I18nHtmlAttributesService).init();
  }
}
```

### （可选）步骤 10：创建本地化链接指令

为了确保您的应用程序导航符合当前语言环境，您可以创建一个自定义指令。该指令会自动为内部 URL 添加当前语言前缀。

```typescript fileName="src/app/directives/localized-link.directive.ts"
import { Directive, Input, HostBinding, inject } from "@angular/core";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";

@Directive({
  selector: "a[appLocalizedLink]",
  standalone: true,
})
export class LocalizedLinkDirective {
  @Input("href") originalHref: string = "";

  private localeInfo = useLocale();

  @HostBinding("href")
  get localizedHref(): string {
    const locale = this.localeInfo.locale();
    const isExternalLink = /^https?:\/\//.test(this.originalHref);
    if (isExternalLink || !this.originalHref) {
      return this.originalHref;
    }

    return getLocalizedUrl(this.originalHref, locale);
  }
}
```

要使用它，只需在锚点标签中添加 `appLocalizedLink` 指令，并确保在组件中导入该指令。

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>首页</a> `,
})
export class AppComponent {}
```

### （可选）步骤 11：渲染 Markdown

Intlayer 支持渲染 Markdown 内容。要将 Markdown 转换为丰富的 HTML，您可以集成 [markdown-it](https://github.com/markdown-it/markdown-it)。

首先，安装 `markdown-it`：

```bash
npm install markdown-it
# 以及它的类型定义
npm install -D @types/markdown-it
```

接下来，在您的 `app.config.ts` 中配置 `INTLAYER_MARKDOWN_TOKEN`。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    createIntlayerMarkdownProvider((markdown) => md.render(markdown)),
  ],
};
```

默认情况下，Intlayer 会返回渲染后的 HTML 字符串。如果你使用 `[innerHTML]` 绑定它，请注意安全隐患（XSS）。务必确保你的内容来自可信来源。

对于更复杂的场景，你可以创建一个管道来安全地渲染 HTML。

### 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势，使你的代码库更健壮。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保你的 TypeScript 配置包含自动生成的类型。

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

建议忽略 Intlayer 生成的文件，这样可以避免将它们提交到您的 Git 仓库。

为此，您可以在 `.gitignore` 文件中添加以下内容：

```plaintext
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
该扩展提供：

- **翻译键的自动补全**。
- **缺失翻译的实时错误检测**。
- **翻译内容的内联预览**。
- **快速操作**，轻松创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参阅[Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

要进一步使用，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。

---

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
