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
    changes: グローバル設定の追加
  - version: 6.0.0
    date: 2025-09-17
    changes: `{{fileName}}` 変数の追加
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

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

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
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
