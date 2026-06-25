---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: 自動入力
description: Intlayerの自動入力機能を使用して、事前定義されたパターンに基づいてコンテンツを自動的に入力する方法を学びます。このドキュメントに従って、プロジェクトで自動入力機能を効率的に実装してください。
keywords:
  - 自動入力
  - コンテンツ自動化
  - 動的コンテンツ
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "グローバル設定の追加"
  - version: 6.0.0
    date: 2025-09-17
    changes: "`{{fileName}}` 変数の追加"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴の初期化"
author: aymericzip
---

# コンテンツ宣言ファイルの翻訳を自動入力

**CI でのコンテンツ宣言ファイルの自動入力**は、開発ワークフローを高速化する方法です。

## 動作の理解

`fill` コマンドには2つのモードがあります：

- **Complete**: 各ロケールのすべての欠落コンテンツを自動的に入力し、現在のファイルまたは指定された別のファイルを編集します。つまり、完全モードは既に翻訳されている既存コンテンツのスキップします。
- **Review**: 各ロケールのすべてのコンテンツを自動的に入力し、特定のファイルまたは指定された別のファイルを生成します。

`fill` コマンドはすべてのロケールコンテンツ宣言ファイルを処理します。つまり、CMSからのリモートコンテンツは処理しません。CMSは独自の翻訳管理を含んでいます。
`@intlayer/sync-json-plugin` などのプラグインを使用する場合、Intlayerはこれらのファイルをロケールコンテンツ宣言ファイルに変換します。つまり、これらのファイルは `fill` コマンドによって処理されます。

新しく生成されたファイルには、辞書メタデータとして `filled` 命令が含まれています。この命令は、Intlayerがファイルが自動入力されたかどうかを判定し、存在する場合はこのファイルを再度翻訳の対象からスキップするために使用されます。

Intlayerは自動入力に関して以下の命令を考慮します：

- `.content.{ts|js|json}` ファイルから → `fill` 命令
- 設定ファイル `.intlayer.config.ts` から → `dictionary.fill` 命令
- それ以外の場合はデフォルトで `true` に設定されます

ロケール固有のコンテンツ宣言ファイルの場合、`true` 命令は `./{{fileName}}.fill.content.json` に置き換えられます。これは、ロケール固有のコンテンツ宣言ファイルが追加のローカライズされたコンテンツを受け取ることができないためです。そのため、既存のファイルを上書きしないために新しいファイルを生成します。

## デフォルト動作

デフォルトでは、`fill`はグローバルに`true`に設定されています。これは、Intlayerがすべてのコンテンツファイルを自動的に入力し、ファイル自体を編集することを意味します。この動作は、いくつかの方法でカスタマイズできます。

### グローバル設定オプション

1. **`fill: true` (デフォルト)** - すべてのロケールを自動的に埋め、現在のファイルを編集します
2. **`fill: false`** - このコンテンツファイルの自動埋めを無効にします
3. **`fill: "./relative/path/to/file"`** - 現在のファイルを編集せずに指定されたファイルを作成/更新します。相対パスは現在のファイルの場所に基づいて解決されます
4. **`fill: "/absolute/path/to/file"`** - 現在のファイルを編集せずに指定されたファイルを作成/更新します。相対パスは基本ディレクトリの場所に基づいて解決されます（設定ファイル `.intlayer.config.ts` の `baseDir` フィールド）
5. **`fill: "C:\\absolute\path\to\file"`** - 現在のファイルを編集せずに指定されたファイルを作成/更新します。絶対パスはお使いのオペレーティングシステムに基づいて解決されます
6. **`fill: { [key in Locales]?: string }`** - 各ロケールについて指定されたファイルを作成/更新します

### v7 の動作変更

v7 では、`fill` コマンドの動作が更新されました：

- **`fill: true`** - 現在のファイルを全ロケールの埋め込みコンテンツで上書きします
- **`fill: "path/to/file"`** - 指定されたファイルを埋め込みますが、現在のファイルは変更しません
- **`fill: false`** - 自動埋め込みを完全に無効にします

別のファイルに書き込むためのパスオプションを使用する場合、埋め込みメカニズムはコンテンツ宣言ファイル間の _マスター・スレーブ_ 関係を通じて機能します。メインファイル（マスター）が情報源として機能し、更新されると、Intlayer はパスで指定されたスレーブの宣言ファイルに変更を自動的に適用します。

# 自動入力コンテンツ宣言ファイルの翻訳

**自動入力コンテンツ宣言ファイル**は、開発ワークフローを高速化する方法です。

自動入力メカニズムは、コンテンツ宣言ファイル間の _マスター・スレーブ_ 関係を通じて機能します。メイン（マスター）ファイルが更新されると、Intlayerはその変更を派生（自動入力された）宣言ファイルに自動的に適用します。

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "これはコンテンツの例です", // コンテンツの例
  },
} satisfies Dictionary;

export default exampleContent;
```

こちらは `autoFill` 指示を使用した[ロケール別コンテンツ宣言ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)です。

次に、以下のコマンドを実行すると：

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer は、メインファイルにまだ宣言されていないすべてのロケールを埋めて、派生した宣言ファイルを `src/components/example/example.content.json` に自動生成します。

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

その後、両方の宣言ファイルは単一の辞書にマージされ、標準の `useIntlayer("example")` フック（React）/ コンポーザブル（Vue）を使ってアクセス可能になります。

## グローバル設定

`intlayer.config.ts` ファイルでグローバル自動入力設定を構成できます。

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // すべての辞書に対して欠落している翻訳を自動生成します
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // "./{{fileName}}.content.json" を使用しているようなすべての辞書に対して欠落している翻訳を自動生成します
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

コンテンツファイルの `fill` フィールドを使用して、辞書ごとに細かく調整することもできます。Intlayer は最初に辞書ごとの設定を検討し、その後グローバル設定にフォールバックします。

## 自動補完されたファイル形式

自動補完された宣言ファイルに推奨される形式は **JSON** であり、これによりフォーマットの制約を回避できます。ただし、Intlayer は `.ts`、`.js`、`.mjs`、`.cjs` などの他の形式もサポートしています。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // あなたのコンテンツ
  },
};
```

これにより、以下のファイルが生成されます：

```
src/components/example/example.filled.content.ts
```

> `.js`、`.ts`、および類似のファイルの生成は以下のように動作します：
>
> - ファイルがすでに存在する場合、Intlayer は AST（抽象構文木）を使用して各フィールドを特定し、欠落している翻訳を挿入します。
> - ファイルが存在しない場合、Intlayerはデフォルトのコンテンツ宣言ファイルテンプレートを使用して生成します。

## 絶対パス

`autoFill` フィールドは絶対パスもサポートしています。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // あなたのコンテンツ
  },
};
```

これにより、以下のファイルが生成されます：

```
/messages/example.content.json
```

## ロケール別コンテンツ宣言ファイルの自動生成

`autoFill` フィールドは、**ロケール別**のコンテンツ宣言ファイルの生成もサポートしています。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // あなたのコンテンツ
  },
};
```

これにより、2つの別々のファイルが生成されます：

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> この場合、オブジェクトにすべてのロケールが含まれていない場合、Intlayerは残りのロケールの生成をスキップします。

## 特定のロケールの自動入力をフィルタリングする

`autoFill` フィールドにオブジェクトを使用すると、フィルターを適用して特定のロケールファイルのみを生成できます。

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // あなたのコンテンツ
  },
};
```

これにより、フランス語の翻訳ファイルのみが生成されます。

## パス変数

`autoFill` パス内で変数を使用して、生成されるファイルのターゲットパスを動的に解決することができます。

**使用可能な変数:**

- `{{locale}}` – ロケールコード（例: `fr`, `es`）
- `{{fileName}}` – ファイル名（例: `index`）
- `{{key}}` – 辞書キー（例: `example`）

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // あなたのコンテンツ
  },
};
```

これにより、以下のファイルが生成されます:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // あなたのコンテンツ
  },
};
```

これにより、以下のファイルが生成されます:

- `./index.content.json`
- `./index.content.json`
