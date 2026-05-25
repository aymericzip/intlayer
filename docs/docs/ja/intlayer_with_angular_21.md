---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - 2026年におけるAngular 21アプリ（Vite）の翻訳方法
description: Angular Webサイトを多言語対応にする方法をご紹介します。ドキュメントに従って国際化（i18n）し、翻訳してください。
keywords:
  - 国際化
  - ドキュメント
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
    changes: "Solid useIntlayer APIのプロパティへの直接アクセスへの変更"
  - version: 8.0.0
    date: 2026-01-26
    changes: "安定版リリース"
  - version: 8.0.0
    date: 2025-12-30
    changes: "initコマンドの追加"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初期履歴"
---

# Intlayerを使用してAngular 21（Vite）Webサイトを翻訳する | 国際化（i18n）

## 目次

<TOC/>

## Intlayerとは？

**Intlayer**は、現代のWebアプリケーションにおける多言語サポートを簡素化するために設計された、革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、次のことができます：

- コンポーネントレベルで宣言型辞書を使用して**翻訳を簡単に管理**。
- メタデータ、ルート、コンテンツを**動的にローカライズ**。
- 自動生成された型で**TypeScriptサポートを保証**し、オートコンプリートとエラー検出を改善。
- 動的なロケール検出や切り替えなどの**高度な機能を活用**。

---

## AngularアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-angular-21-template)を参照してください。

### ステップ1：依存関係のインストール

npmを使用して必要なパッケージをインストールします：

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

  構成管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **angular-intlayer**
  IntlayerをAngularアプリケーションに統合するパッケージ。Angularの国際化のためのコンテキストプロバイダとフックを提供します。

- **@angular-builders/custom-esbuild**
  Angular CLIのesbuild構成をカスタマイズするために必要です。

### ステップ2：プロジェクトの構成

アプリケーションの言語を構成するための構成ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // その他の言語
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、Cookie名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメーターの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3：Angular構成へのIntlayerの統合

IntlayerをAngular CLIと統合するには、カスタムビルダーを使用する必要があります。このガイドでは、Vite/esbuild（Angular 21プロジェクトのデフォルト）を使用していることを前提としています。

まず、カスタムesbuildビルダーを使用するように`angular.json`を変更します。`build`と`serve`の構成を更新します：

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

> `angular.json`内の`your-app-name`をプロジェクトの実際のプロジェクト名に置き換えることを忘れないでください。

次に、プロジェクトのルートに`esbuild.plugins.ts`ファイルを作成します：

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> `intlayerEsbuildPlugin`関数はesbuildにIntlayerを設定します。コンテンツ宣言ファイルを処理するプラグインを注入し、最適なパフォーマンスのためのエイリアスを設定します。

### ステップ4：コンテンツの宣言

翻訳を保存するためにコンテンツ宣言を作成および管理します：

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

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./src`）に含まれている限り、アプリケーション内のどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトでは`.content.{json,ts,tsx,js,jsx,mjs,cjs}`）と一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### ステップ5：コードでIntlayerを活用する

Angularアプリケーション全体でIntlayerの国際化機能を活用するには、アプリケーションの構成でIntlayerを提供する必要があります。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // ここにIntlayerプロバイダを追加します
  ],
};
```

次に、任意のコンポーネント内で`useIntlayer`機能を使用できます。

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

そして、テンプレートでは：

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayerのコンテンツは`Signal`として返されるため、シグナルを呼び出すことで値にアクセスします：`content().title`。

### （オプション）ステップ6：コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale`関数によって提供される`setLocale`関数を使用できます。これにより、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

言語を切り替えるためのコンポーネントを作成します：

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

次に、このコンポーネントを`app.component.ts`で使用します：

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

### TypeScriptの設定

Intlayerは、TypeScriptの利便性を高め、コードベースをより堅牢にするためにモジュール拡張を使用します。

![オートコンプリート](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript構成に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript構成
  "include": [
    // ... 既存のTypeScript構成
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、Gitリポジトリへのコミットを避けることができます。

これを行うには、`.gitignore`ファイルに次の指示を追加できます：

```bash
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerでの開発エクスペリエンスを向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は次を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成および更新するための**クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進む

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりできます。

---
