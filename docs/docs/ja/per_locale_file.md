---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Intlayerにおける「ロケール別」コンテンツ宣言
description: Intlayerでロケール別にコンテンツを宣言する方法を解説します。異なるフォーマットやユースケースを理解するためのドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - ロケール別
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
---

# Intlayerにおける「ロケール別」コンテンツ宣言

Intlayerは多言語コンテンツを宣言するために2つの方法をサポートしています：

- すべての翻訳を含む単一ファイル
- ロケールごとに1ファイル（ロケール別フォーマット）

この柔軟性により、

- 他のi18nツールからの容易な移行
- 自動翻訳ワークフローのサポート
- 翻訳をロケール別のファイルに明確に整理

## 複数翻訳を含む単一ファイル

このフォーマットは以下に最適です：

- コード内での迅速な反復作業
- CMSとのシームレスな統合

これはほとんどのユースケースで推奨されるアプローチです。翻訳を一元化することで、反復作業やCMSとの統合が容易になります。

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// helloWorldContentオブジェクトは多言語コンテンツを含む辞書型として定義されています
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// helloWorldContentオブジェクトは多言語コンテンツを含む辞書型として定義されています
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> 推奨: このフォーマットは、Intlayerのビジュアルエディターを使用する場合や、コード内で直接翻訳を管理する場合に最適です。

## ロケール別フォーマット

このフォーマットは以下の場合に便利です：

- 翻訳を独立してバージョン管理または上書きしたい場合。
- 機械翻訳や人力翻訳のワークフローを統合している場合。

また、localeフィールドを指定することで翻訳を個別のロケールファイルに分割することもできます：

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 重要
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: { multilingualContent: "私のコンポーネントのタイトル" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 重要
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: {
    multilingualContent: "私のコンポーネントのタイトル",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 重要
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // 重要
  "content": {
    "multilingualContent": "私のコンポーネントのタイトル",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // 重要
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> 重要: locale フィールドが定義されていることを確認してください。これは Intlayer にファイルがどの言語を表しているかを伝えます。

> 注意: どちらの場合も、コンテンツ宣言ファイルは Intlayer に認識されるために `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` という命名パターンに従う必要があります。`.[locale]` のサフィックスは任意で、命名規則としてのみ使用されます。

## フォーマットの混在

同じコンテンツキーに対して、両方の宣言方法を組み合わせることができます。例えば：

- index.content.ts のようなファイルでベースコンテンツを静的に宣言する。
- index.fr.content.ts や index.content.json のような別ファイルで特定の翻訳を追加または上書きする。

このセットアップは特に以下の場合に便利です：

- 初期のコンテンツ構造をコード内で定義したい場合。
- 後からCMSや自動化ツールを使って翻訳を充実させたり完成させたりする予定がある場合。

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### 例

多言語コンテンツ宣言ファイルの例：

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "私のコンポーネントのタイトル",
    projectName: "私のプロジェクト",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayerは多言語ファイルとロケール別ファイルを自動的にマージします。

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // デフォルトのロケールはENGLISHなので、ENGLISHのコンテンツが返されます

console.log(JSON.stringify(intlayer, null, 2));
// 結果:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// 結果:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// 結果:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### 自動翻訳生成

[intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md) を使用して、お好みのサービスに基づいて不足している翻訳を自動的に補完します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
