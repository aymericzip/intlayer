---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 自動入力
description: Intlayerの自動入力機能を使用して、事前定義されたパターンに基づいてコンテンツを自動的に入力する方法を学びます。このドキュメントに従って、プロジェクトで効率的に自動入力機能を実装しましょう。
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
---

# 自動入力コンテンツ宣言ファイルの翻訳

**自動入力コンテンツ宣言ファイル**は、開発ワークフローを高速化する方法です。
自動入力メカニズムは、コンテンツ宣言ファイル間の _マスター・スレーブ_ 関係を通じて機能します。メイン（マスター）ファイルが更新されると、Intlayerはその変更を派生（自動入力された）宣言ファイルに自動的に適用します。

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

// 例のコンテンツ宣言
const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json", // 自動入力ファイルのパス
  content: {
    contentExample: "This is an example of content", // コンテンツの例
  },
} satisfies Dictionary;

export default exampleContent;
```

こちらは `autoFill` 指示を使用した[ロケールごとのコンテンツ宣言ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)です。

次に、以下のコマンドを実行すると：

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer は、メインファイルにまだ宣言されていないすべてのロケールを自動的に埋めて、派生宣言ファイルを `src/components/example/example.content.json` に生成します。

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

その後、両方の宣言ファイルは単一の辞書にマージされ、標準の `useIntlayer("example")` フック（react）/ コンポーザブル（vue）を使ってアクセス可能になります。

## 自動入力ファイルのフォーマット

推奨される自動入力宣言ファイルのフォーマットは **JSON** であり、これによりフォーマットの制約を回避できます。ただし、Intlayer は `.ts`、`.js`、`.mjs`、`.cjs`、およびその他のフォーマットもサポートしています。

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

> `.js`、`.ts`、および類似ファイルの生成は以下のように動作します：
>
> - ファイルが既に存在する場合、Intlayer は AST（抽象構文木）を使って解析し、各フィールドを特定して不足している翻訳を挿入します。
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

これにより、以下の場所にファイルが生成されます：

```
/messages/example.content.json
```

## ロケールごとのコンテンツ宣言ファイルの自動生成

`autoFill` フィールドは、**ロケールごとの**コンテンツ宣言ファイルの生成もサポートしています。

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

## 特定のロケールの自動入力をフィルターする

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

`autoFill` パス内で変数を使用して、生成されるファイルのターゲットパスを動的に解決できます。

**利用可能な変数：**

- `{{locale}}` – ロケールコード（例：`fr`、`es`）
- `{{key}}` – 辞書キー（例：`example`）

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // あなたのコンテンツ
  },
};
```

これにより以下が生成されます：

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
