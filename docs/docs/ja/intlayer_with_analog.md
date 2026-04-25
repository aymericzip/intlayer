---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Analog i18n - Analogアプリの翻訳方法 2026
description: Analogアプリを多言語化する方法をご紹介します。ドキュメントに従って、国際化（i18n）と翻訳を実装してください。
keywords:
  - 国際化
  - ドキュメント
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
    changes: "履歴の初期化"
---

# Intlayerを使用したAnalog (Angular) アプリの翻訳 | 国際化 (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-analog-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## 目次

<TOC/>

## Intlayerとは？

**Intlayer**は、現代的なWebアプリケーションにおける多言語サポートを簡素化するために設計された、革新的でオープンソースな国際化（i18n）ライブラリです。

With Intlayer, you can:

- **翻訳の簡単な管理**: コンポーネントレベルで宣言的な辞書を使用します。
- **メタデータ、ルート、コンテンツの動的なローカライズ**。
- **TypeScriptサポートの確保**: 自動生成された型により、オートコンプリートとエラー検出が向上します。
- **高度な機能の活用**: 動的なロケール検出や切り替えなど。

---

## AnalogアプリケーションへのIntlayerセットアップ手順

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-analog-template)を確認する。

### ステップ1: 依存関係のインストール

npmを使用して必要なパッケージをインストールします：

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
bun x intlayer init
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **angular-intlayer**
  IntlayerをAngularアプリケーションと統合するパッケージ。Angularの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  IntlayerをViteと統合するパッケージ。コンテンツ宣言ファイルを処理するプラグインを提供し、最適なパフォーマンスのためのエイリアスを設定します。

### ステップ2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子の設定、コンソールでのIntlayerログの無効化などが可能です。利用可能なパラメータの全リストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)を参照してください。

### ステップ3: Vite設定へのIntlayerの統合

AnalogとIntlayerを統合するには、`vite-intlayer`プラグインを使用する必要があります。

`vite.config.ts`ファイルを修正します：

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer(), // Intlayerプラグインを追加
  ],
}));
```

> `intlayer()`プラグインは、Intlayerを使用してViteを設定します。コンテンツ宣言ファイルを処理し、最適なパフォーマンスのためのエイリアスを設定します。

### ステップ4: コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成・管理します：

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
      ja: "こんにちは",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
      ja: "おめでとうございます！アプリが起動しました。 🎉",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトは`./src`）に含まれている限り、アプリケーション内のどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは`.content.{json,ts,tsx,js,jsx,mjs,cjs}`）と一致させる必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)を参照してください。

### ステップ5: コード内でのIntlayerの利用

Analogアプリケーション全体でIntlayerの国際化機能を利用するには、アプリケーション設定でIntlayerを提供する必要があります。

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // ここにIntlayerプロバイダーを追加
  ],
};
```

その後、任意のコンポーネント内で`useIntlayer`関数を使用できます。

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

Intlayerのコンテンツは`Signal`として返されるため、シグナルを呼び出すことで値にアクセスします：`content().title`。

### (オプション) ステップ6: コンテンツの言語を変更する

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

次に、このコンポーネントをページで使用します：

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

### TypeScriptの設定

Intlayerは、TypeScriptの利点を活かしてコードベースを強力にするためにモジュール拡張を使用します。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルは無視することをお勧めします。これにより、Gitリポジトリへのコミットを避けることができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加してください：

```bash
#  Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code Extension**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 翻訳漏れの**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code Extensionのドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。
