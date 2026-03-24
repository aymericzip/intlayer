---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: Vite + Lit i18n - 2026年にLitアプリを翻訳する方法
description: ViteとLitのウェブサイトを多言語化する方法をご紹介します。ドキュメントに従って国際化（i18n）と翻訳を行ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - Lit
  - Web Components
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Intlayerを使用してViteとLitのウェブサイトを翻訳する | 国際化 (i18n)

## 目次

<TOC/>

## Intlayerとは？

**Intlayer**は、現代的なウェブアプリケーションにおける多言語サポートを簡素化するために設計された、革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、以下のことが可能になります：

- コンポーネントレベルの宣言型辞書を使用して**翻訳を簡単に管理**。
- メタデータ、ルート、コンテンツを**動的にローカライズ**。
- 自動生成された型による**TypeScriptサポートの確保**。これにより、自動補完やエラー検出が向上します。
- 動的な言語検出や切り替えなど、**高度な機能の活用**。

---

## ViteとLitアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

### ステップ 1: 依存関係のインストール

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **lit-intlayer**
  IntlayerをLitアプリケーションと統合するパッケージです。`ReactiveController`ベースのフック（`useIntlayer`、`useLocale`など）を提供し、言語が変更されたときにLitElementが自動的に再レンダリングされるようにします。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先言語の検出、クッキーの管理、URLリダイレクトの処理のためのミドルウェアが含まれています。

### ステップ 2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ 3: Vite設定にIntlayerを統合する

Vite設定にintlayerプラグインを追加します。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。コンテンツ宣言ファイルのビルドを確実にし、開発モードでそれらを監視します。Viteアプリケーション内でIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

### ステップ 4: エントリポイントでIntlayerをブートストラップする

最初の要素が接続されるときにグローバルロケールシングルトンが準備できているように、カスタム要素が登録される**前に** `installIntlayer()` を呼び出します。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// 任意のLitElementがDOMに接続される前に呼び出す必要があります。
installIntlayer();

// カスタム要素をインポートして登録します。
import "./my-element.js";
```

`md()` コンテンツ宣言（Markdown）も使用する場合は、Markdownレンダラーもインストールしてください：

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

### ステップ 5: コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれ、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）と一致する限り、アプリケーション内のどこにでも定義できます。
>
> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### ステップ 6: LitElementでIntlayerを活用する

`LitElement` 内で `useIntlayer` を使用します。これは、アクティブなロケールが変更されるたびに自動的に再レンダリングをトリガーする `ReactiveController` プロキシを返します。追加の設定は不要です。

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayerはReactiveControllerとして自身を登録します。
  // 要素は言語が変更されると自動的に再レンダリングされます。
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> [!NOTE]
> ネイティブHTML属性（例：`alt`、`aria-label`、`title`）で翻訳された文字列が必要な場合は、リーフノードで `.value` を呼び出します：
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> ```

### (任意) ステップ 7: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` コントローラーによって公開されている `setLocale` メソッドを使用します。

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (任意) ステップ 8: MarkdownとHTMLコンテンツのレンダリング

Intlayerは `md()` および `html()` コンテンツ宣言をサポートしています。Litでは、コンパイルされた出力は `unsafeHTML` ディレクティブを介して生HTMLとして挿入されます。

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

コンパイルされたHTMLを要素内でレンダリングします：

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { compileMarkdown, useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` は、生のMarkdown文字列を返す `IntlayerNode` の `toString()` を呼び出します。それを `compileMarkdown` に渡してHTML文字列を取得し、Litの `unsafeHTML` ディレクティブでレンダリングします。

### (任意) ステップ 9: アプリケーションにローカライズされたルーティングを追加する

言語ごとに固有のルートを作成するには（SEOに有用）、クライアントサイドのルーターをIntlayerの `localeMap` / `localeFlatMap` ヘルパー、およびサーバーサイドの言語検出用の `intlayerProxy` Viteプラグインと共に使用できます。

まず、Vite設定に `intlayerProxy` を追加します：

> プロダクション環境で `intlayerProxy` を使用するには、`vite-intlayer` を `devDependencies` から `dependencies` に移動する必要があることに注意してください。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
  ],
});
```

### (任意) ステップ 10: 言語が変更されたときにURLを変更する

言語が変更されたときにブラウザのURLを更新するには、ロケールスイッチャーと共に `useRewriteURL` を使用します：

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // 言語が変更されたときに現在のURLを自動的に書き換えます。
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (任意) ステップ 11: HTMLの言語と方向属性を切り替える

アクセシビリティとSEOのために、現在の言語に合わせて `<html>` タグの `lang` および `dir` 属性を更新します。

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- コンテンツ -->`;
  }
}
```

### (任意) ステップ 12: コンポーネントのコンテンツを抽出する

既存のコードベースがある場合、数千ものファイルを変換するのは時間がかかる場合があります。

このプロセスを容易にするために、Intlayerはコンポーネントを変換してコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [抽出器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提案しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * コンポーネントを変換した後に保存するかどうかを指定します。
     * これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除することができます。
     */
    saveComponents: false,

    /**
     * 辞書キーのプレフィックス
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='抽出コマンド'>

抽出器を実行してコンポーネントを変換し、コンテンツを抽出します

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
bunx intlayer extract
```

 </Tab>
 <Tab value='Babelコンパイラ'>

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // コンパイラプラグインを追加
  ],
});
```

```bash packageManager="npm"
npm run build # または npm run dev
```

```bash packageManager="pnpm"
pnpm run build # または pnpm run dev
```

```bash packageManager="yarn"
yarn build # または yarn dev
```

```bash packageManager="bun"
bun run build # または bun run dev
```

 </Tab>
</Tabs>

### TypeScriptの設定

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` と `useDefineForClassFields: false` は、Litのデコレーターサポートに必要です。

### Gitの設定

Intlayerによって生成されたファイルは無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加します：

```bash
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**自動補完**。
- 翻訳漏れの**リアルタイムなエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成および更新できる**クイックアクション**。

詳細な使用方法については、[Intlayer VS Code Extensionドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに詳しく

さらに詳しく知りたい場合は、[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりすることができます。
