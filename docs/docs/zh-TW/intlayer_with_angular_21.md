---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Angular 21 i18n - 翻譯您的應用程式的完整指南"
description: "告別 i18next。2026 年建構多語言 (i18n) Angular 21 應用程式的完整指南。使用 AI 代理翻譯並優化套件大小、SEO 和效能。"
keywords:
  - 國際化
  - 文件
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
    changes: "更新Solid useIntlayer API的用法以直接存取屬性"
  - version: 8.0.0
    date: 2026-01-26
    changes: "發布穩定版"
  - version: 8.0.0
    date: 2025-12-30
    changes: "增加init命令"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始版本"
author: aymericzip
---

# 使用Intlayer翻譯您的Angular 21（Vite）網站 | 國際化 (i18n)

## 目錄

<TOC/>

## 什麼是 Intlayer？

**Intlayer** 是一個創新的開源國際化（i18n）庫，旨在簡化現代Web應用程式中的多語言支援。

藉助Intlayer，您可以：

- **輕鬆管理翻譯**：使用組件層級的宣告式字典。
- **動態在地化**：元資料、路由和內容。
- **確保TypeScript支援**：使用自動生成的型別，改善自動補全和錯誤檢測。
- **受益於進階功能**：如動態區域設定檢測和切換。

---

## 在Angular應用程式中設定Intlayer的逐步指南

<Tabs defaultTab="code">
  <Tab label="程式碼" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用Intlayer進行應用程式國際化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="展示" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

在GitHub上查看 [應用程式模板](https://github.com/aymericzip/intlayer-angular-21-template)。

<Steps>

<Step number={1} title="安裝依賴項">

使用npm安裝必要的套件：

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> 此命令將偵測您的環境並安裝所需的套件。例如：

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
```

- **intlayer**

  核心套件，提供了配置管理、翻譯、[內容宣告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/content_file.md)、轉譯和[CLI命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/cli/index.md)等國際化工具。

- **angular-intlayer**
  將Intlayer與Angular應用程式整合的套件。它為Angular的國際化提供了上下文提供者（Providers）和Hooks。

- **@angular-builders/custom-esbuild**
  需要它來自定義Angular CLI的esbuild配置。

</Step>

<Step number={2} title="配置您的專案">

創建一個配置文件以配置您應用程式的語言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您支援的其他語言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 透過此配置文件，您可以設定在地化的URL、中間件重定向、Cookie名稱、內容宣告的位置和副檔名、禁用控制台中的Intlayer日誌等。獲取所有可用參數的完整列表，請參考[配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/configuration.md)。

</Step>

<Step number={3} title="在Angular配置中整合Intlayer">

要將Intlayer與Angular CLI整合，您需要使用自定義構建器。本指南假設您使用的是 Vite/esbuild（Angular 21專案的預設設定）。

首先，修改您的 `angular.json`，使用自定義的esbuild構建器。更新 `build` 和 `serve` 配置：

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

> 請確保將 `angular.json` 中的 `your-app-name` 替換為您專案的實際名稱。

接下來，在專案的根目錄中創建一個 `esbuild.plugins.ts` 文件：

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> `intlayerEsbuildPlugin` 函數負責使用Intlayer配置esbuild。它注入插件來處理內容宣告文件，並針對最佳性能進行了設置。

> **NX 用戶**：NX 的 Angular 建構器透過 Node 的原生 ESM 解析載入外掛程式檔案，且不會即時編譯 TypeScript 外掛程式檔案。請改用 `.mjs` 檔案，並相應地更新 `angular.json` 中的 `plugins` 參照：
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> 然後在 `angular.json` 中指向 `"./esbuild.plugins.mjs"`，而不是 `"./esbuild.plugins.ts"`。

</Step>

<Step number={4} title="宣告您的內容">

創建並管理您的內容宣告文件以存儲翻譯：

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

> 您的內容宣告可以定義在應用程式的任何位置，只需將其包含在 `contentDir` 目錄（預設為 `./src`）中，並且符合內容宣告的文件副檔名（預設為 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 詳細資訊請參考 [內容宣告文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/content_file.md)。

</Step>

<Step number={5} title="在程式碼中使用Intlayer">

要在整個Angular應用程式中利用Intlayer的國際化功能，您需要在應用程式配置中提供Intlayer。

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

然後，您可以在任何組件中使用 `useIntlayer` 功能。

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

Intlayer 內容將作為 `Signal` 返回，因此您可以透過呼叫信號來訪問值：`content().title`。

</Step>

<Step number={6} title="更改內容的語言">

要更改內容的語言，您可以使用 `useLocale` 函數提供的 `setLocale` 函數。這允許您設定應用程式的區域設定，並相應更新內容。

創建一個用於切換語言的組件：

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

然後，在 `app.component.ts` 中使用此組件：

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

</Step>

</Steps>

### 配置TypeScript

Intlayer使用模組擴充（Module Augmentation）來獲得TypeScript的好處，並使您的程式碼庫更健壯。

![自動補全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻譯錯誤](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

請確保您的TypeScript配置包含了自動生成的類型。

```json5 fileName="tsconfig.json"
{
  // ... 您現有的TypeScript配置
  "include": [
    // ... 您現有的TypeScript配置
    ".intlayer/**/*.ts", // 包含自動生成的類型
  ],
}
```

### Git配置

建議忽略由Intlayer生成的文件。這可以避免將它們提交到您的Git存儲庫。

為此，您可以將以下說明添加到您的 `.gitignore` 文件中：

```bash
# 忽略由Intlayer生成的文件
.intlayer
```

### VS Code 擴展

為了提升您在Intlayer中的開發體驗，您可以安裝官方的 **Intlayer VS Code 擴展**。

[從VS Code應用市場安裝](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

該擴展提供：

- 翻譯鍵的**自動補全**。
- 缺失翻譯的**即時錯誤檢測**。
- 已翻譯內容的**內聯預覽**。
- 輕鬆創建和更新翻譯的**快速操作**。

有關如何使用該擴展的更多詳細資訊，請參閱 [Intlayer VS Code 擴展範例文件](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

想要深入了解，您可以實現[視覺化編輯器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_visual_editor.md)或使用[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_CMS.md)外部化您的內容。

---
