---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t 関数ドキュメント | express-intlayer
description: express-intlayer パッケージの t 関数の使い方を見る
keywords:
  - t
  - 翻訳
  - Intlayer
  - 国際化
  - ドキュメント
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# ドキュメント: `express-intlayer` の `t` 関数

`express-intlayer` パッケージの `t` 関数は、Express アプリケーションでローカライズされたレスポンスを提供するためのコアユーティリティです。ユーザーの優先言語に基づいてコンテンツを動的に選択することで、国際化（i18n）を簡素化します。

---

## 概要

`t` 関数は、指定された言語セットの翻訳を定義および取得するために使用されます。クライアントのリクエスト設定（例：`Accept-Language` ヘッダー）に基づいて返すべき適切な言語を自動的に判断します。もし優先言語が利用できない場合は、設定で指定されたデフォルトのロケールに優雅にフォールバックします。

---

## 主な特徴

- **動的ローカリゼーション**: クライアントに最も適した翻訳を自動的に選択します。
- **デフォルトロケールへのフォールバック**: クライアントの優先言語が利用できない場合はデフォルトのロケールにフォールバックし、ユーザー体験の継続性を確保します。
- **軽量かつ高速**: 高パフォーマンスアプリケーション向けに設計されており、オーバーヘッドを最小限に抑えます。
- **厳格モードサポート**: 宣言されたロケールに厳密に従うことを強制し、信頼性の高い動作を実現します。

---

## 関数シグネチャ

```typescript
t(translations: Record<string, string>): string;
```

### パラメータ

- `translations`: キーがロケールコード（例：`en`、`fr`、`es-MX`）、値が対応する翻訳文字列のオブジェクト。

### 戻り値

- クライアントの優先言語でのコンテンツを表す文字列。

---

## 国際化リクエストハンドラーの読み込み

`express-intlayer` が提供する国際化機能が正しく動作するようにするためには、Express アプリケーションの最初に国際化ミドルウェアを必ず読み込む必要があります。これにより、`t` 関数が有効になり、ロケールの検出と翻訳の適切な処理が保証されます。

アプリケーション内のすべてのルートが国際化の恩恵を受けられるように、`app.use(intlayer())` ミドルウェアは **ルートの前に** 配置してください。

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 国際化リクエストハンドラーを読み込む
app.use(intlayer());

// ミドルウェア読み込み後にルートを定義する
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// 国際化リクエストハンドラーを読み込む
app.use(intlayer());

// ミドルウェア読み込み後にルートを定義する
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// 国際化リクエストハンドラーを読み込む
app.use(intlayer());

js;
// ミドルウェアの読み込み後にルートを定義します
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### なぜこれが必要か

- **ロケール検出**: `intlayer` ミドルウェアは、ヘッダー、クッキー、またはその他の設定された方法に基づいて、ユーザーの希望するロケールを検出するためにリクエストを処理します。
- **翻訳コンテキスト**: `t` 関数が正しく動作するために必要なコンテキストを設定し、翻訳が正しい言語で返されることを保証します。
- **エラー防止**: このミドルウェアがないと、`t` 関数を使用した際に必要なロケール情報が利用できず、実行時エラーが発生します。

---

## 使用例

### 基本例

さまざまな言語でローカライズされたコンテンツを提供します：

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**クライアントのリクエスト:**

- `Accept-Language: fr` のクライアントは `Bienvenue!` を受け取ります。
- `Accept-Language: es` を持つクライアントは `¡Bienvenido!` を受け取ります。
- `Accept-Language: de` を持つクライアントは `Welcome!`（デフォルトのロケール）を受け取ります。

### エラー処理

複数の言語でエラーメッセージを提供します：

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.", // 予期しないエラーが発生しました。
      fr: "Une erreur inattendue s'est produite.", // 予期しないエラーが発生しました。
      es: "Ocurrió un error inesperado.", // 予期しないエラーが発生しました。
    })
  );
});
```

---

### ロケールバリアントの使用

ロケール固有のバリアントに対する翻訳を指定します:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!", // こんにちは！
      "en-GB": "Hello, mate!", // やあ、友よ！
      fr: "Bonjour!", // こんにちは！
      "es-MX": "¡Hola, amigo!", // やあ、友よ！
      "es-ES": "¡Hola!", // こんにちは！
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!", // こんにちは！
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## 高度なトピック

### フォールバック機構

優先するロケールが利用できない場合、`t` 関数は設定で定義されたデフォルトロケールにフォールバックします:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

例えば：

- `defaultLocale` が `Locales.CHINESE` に設定されていて、クライアントが `Locales.DUTCH` をリクエストした場合、返される翻訳は `Locales.CHINESE` の値がデフォルトになります。
- `defaultLocale` が定義されていない場合、`t` 関数は `Locales.ENGLISH` の値にフォールバックします。

---

### 厳格モードの適用

`t` 関数を設定して、宣言されたロケールに厳密に従うように強制します：

| モード      | 動作                                                                                                             |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `strict`    | 宣言されたすべてのロケールに翻訳が提供されている必要があります。欠落しているロケールがあるとエラーが発生します。 |
| `inclusive` | 宣言されたロケールには翻訳が必要です。翻訳が欠落しているロケールは警告が発生しますが許容されます。               |
| `loose`     | 宣言されていなくても、存在するロケールはすべて受け入れられます。                                                 |

設定例:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 既存の設定
  internationalization: {
    // ... 既存の国際化設定
    strictMode: "strict", // 厳格モードを適用
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 既存の設定
  internationalization: {
    // ... 既存の国際化設定
    strictMode: "strict", // 厳格モードを強制
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 既存の設定
  internationalization: {
    // ... 既存の国際化設定
    strictMode: "strict", // 厳格モードを強制
  },
};

module.exports = config;
```

---

### TypeScript 統合

`t` 関数は TypeScript と一緒に使うと型安全です。型安全な翻訳オブジェクトを定義します:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### よくあるエラーとトラブルシューティング

| 問題                     | 原因                                         | 解決策                                                                      |
| ------------------------ | -------------------------------------------- | --------------------------------------------------------------------------- |
| `t` 関数が動作しない     | ミドルウェアが読み込まれていない             | ルートの前に `app.use(intlayer())` が追加されていることを確認してください。 |
| 翻訳が見つからないエラー | すべてのロケールがない状態で厳格モードが有効 | 必要なすべての翻訳を提供してください。                                      |

---

## 効果的な使用のためのヒント

1. **翻訳の集中管理**: 翻訳の保守性を向上させるために、翻訳を管理する集中モジュールやJSONファイルを使用してください。
2. **翻訳の検証**: 不要なフォールバックを防ぐために、すべての言語バリアントに対応する翻訳があることを確認してください。
3. **フロントエンドのi18nと連携**: アプリ全体でシームレスなユーザー体験を実現するために、フロントエンドの国際化と同期させてください。
4. **パフォーマンスのベンチマーク**: 翻訳を追加した際のアプリの応答時間をテストし、影響が最小限であることを確認してください。

---

## 結論

1. **翻訳の集中管理**: 翻訳を管理するために集中管理モジュールやJSONファイルを使用し、保守性を向上させましょう。
2. **翻訳の検証**: すべての言語バリアントに対応する翻訳があることを確認し、不必要なフォールバックを防ぎましょう。
3. **フロントエンドのi18nと連携**: アプリ全体でシームレスなユーザー体験を提供するために、フロントエンドの国際化と同期させましょう。
4. **パフォーマンスのベンチマーク**: 翻訳を追加した際のアプリの応答時間をテストし、影響を最小限に抑えましょう。

---

## 結論

`t`関数はバックエンド国際化のための強力なツールです。効果的に使用することで、グローバルなユーザーにとってより包括的で使いやすいアプリケーションを作成できます。高度な使用法や詳細な設定オプションについては、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。
