---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Angular i18n - Angularアプリを翻訳する方法 – 2026年ガイド
description: Angularウェブサイトを多言語化する方法をご紹介します。ドキュメントに従って、国際化 (i18n) と翻訳を行ってください。
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
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: initコマンドを追加
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# Angular i18n - Intlayerを使用してAngularウェブサイトを翻訳する | 国際化 (i18n)

> このパッケージは開発中です。詳細については [issue](https://github.com/aymericzip/intlayer/issues/116) をご覧ください。issueに「いいね」をして、Angular用Intlayerへの関心を示してください。

## 目次

<TOC/>

## Intlayerとは？

**Intlayer** は、最新のウェブアプリケーションでの多言語サポートを簡素化するために設計された、革新的でオープンソースの国際化 (i18n) ライブラリです。

Intlayerを使用すると、以下のことが可能です：

- **翻訳を簡単に管理**: コンポーネントレベルの宣言型辞書を使用します。
- **メタデータ、ルート、コンテンツを動的にローカライズ**。
- **TypeScriptサポートを確保**: 自動生成された型により、オートコンプリートとエラー検出が向上します。
- **高度な機能の活用**: 動的なロケール検出や切り替えなど。

---

## AngularアプリケーションにIntlayerをセットアップするためのステップバイステップガイド

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-angular-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubで [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-angular-template) を確認する。

### ステップ 1: 依存関係のインストール

npmを使用して必要なパッケージをインストールします：

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

  構成管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)、トランスパイル、および [CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) のための国際化ツールを提供するコアパッケージです。

- **angular-intlayer**
  IntlayerをAngularアプリケーションと統合するパッケージです。Angularの国際化のためのコンテキストプロバイダーとフックを提供します。

- **@angular-builders/custom-webpack**
  Angular CLIのWebpack構成をカスタマイズするために必要です。

### ステップ 2: プロジェクトの構成

アプリケーションの言語を構成するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // その他のロケール
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
      // その他のロケール
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
      // その他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> この構成ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[構成ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) を参照してください。

### ステップ 3: Angular構成へのIntlayerの統合

IntlayerをAngular CLIと統合するには、カスタムビルダーを使用する必要があります。このガイドでは、Webpack（多くのAngularプロジェクトのデフォルト）を使用していることを前提としています。

まず、カスタムWebpackビルダーを使用するように `angular.json` を変更します。`build` および `serve` の構成を更新します：

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts"
            }
          }
        }
      }
    }
  }
}
```

> `angular.json` 内の `your-app-name` を実際のプロジェクト名に置き換えてください。

次に、プロジェクトのルートに `webpack.config.ts` ファイルを作成します：

```typescript fileName="webpack.config.ts"
import { mergeConfig } from "angular-intlayer/webpack";

export default mergeConfig({});
```

> `mergeConfig` 関数は、Intlayerを使用してWebpackを構成します。`IntlayerWebpackPlugin`（コンテンツ宣言ファイルを処理するため）を注入し、最適なパフォーマンスのためのエイリアスを設定します。

### ステップ 4: コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します：

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
      es: "¡Felicidades! Tu application está en ejecución. 🎉",
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
      es: "Servicio di Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれ、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）に一致していれば、アプリケーション内のどこでも定義できます。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) を参照してください。

### ステップ 5: コード内でのIntlayerの利用

Angularアプリケーション全体でIntlayerの国際化機能を利用するには、アプリケーションの構成でIntlayerを提供する必要があります。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // ここにIntlayerプロバイダーを追加
  ],
};
```

その後、任意のコンポーネント内で `useIntlayer` 関数を使用できます。

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

テンプレート内では以下のようになります：

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayerのコンテンツは `Signal` として返されるため、シグナルを呼び出すことで値にアクセスします：`content().title`。

### (オプション) ステップ 6: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` 関数によって提供される `setLocale` 関数を使用できます。これにより、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

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

次に、このコンポーネントを `app.component.ts` で使用します：

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

### TypeScriptの構成

Intlayerはモジュール拡張（Module Augmentation）を使用して、TypeScriptの利点を活用し、コードベースをより強力にします。

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

### Git構成

Intlayerによって生成されたファイルは無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加します：

```plaintext
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 翻訳漏れの **リアルタイムエラー検出**。
- 翻訳済みコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新するための **クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension) を参照してください。

---

### さらに詳しく

さらに詳しく知るには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) を使用してコンテンツを外部化することができます。

---
