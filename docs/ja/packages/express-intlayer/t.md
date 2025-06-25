---
docName: package__express-intlayer__t
url: /doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2024-12-02
title: t関数のドキュメント | express-intlayer
description: express-intlayerパッケージのt関数の使い方を見てみましょう
keywords:
  - t
  - 翻訳
  - Intlayer
  - 国際化
  - ドキュメンテーション
  - エクスプレス
  - JavaScript
  - リアクト
---

# ドキュメント: `express-intlayer` の `t` 関数

`express-intlayer` パッケージの `t` 関数は、Express アプリケーションでローカライズされたレスポンスを提供するための主要なユーティリティです。ユーザーの希望する言語に基づいてコンテンツを動的に選択することで、国際化 (i18n) を簡素化します。

---

## 概要

`t` 関数は、特定の言語セットに対する翻訳を定義および取得するために使用されます。クライアントのリクエスト設定（例えば、`Accept-Language` ヘッダー）に基づいて適切な言語を自動的に決定します。希望する言語が利用できない場合、設定で指定されたデフォルトのロケールにフォールバックします。

---

## 主な特徴

- **動的ローカリゼーション**: クライアントに最も適した翻訳を自動的に選択します。
- **デフォルトロケールへのフォールバック**: クライアントの希望する言語が利用できない場合、デフォルトロケールにフォールバックし、ユーザー体験の継続性を確保します。
- **軽量かつ高速**: 高性能アプリケーション向けに設計されており、オーバーヘッドを最小限に抑えます。
- **厳密モードのサポート**: 宣言されたロケールへの厳密な準拠を強制し、信頼性のある動作を保証します。

---

## 関数シグネチャ

```typescript
t(translations: Record<string, string>): string;
```

### パラメータ

- `translations`: キーがロケールコード（例: `en`, `fr`, `es-MX`）、値が対応する翻訳文字列であるオブジェクト。

### 戻り値

- クライアントの希望する言語でのコンテンツを表す文字列。

---

## 国際化リクエストハンドラーの読み込み

`express-intlayer` が提供する国際化機能が正しく動作するようにするには、Express アプリケーションの最初に国際化ミドルウェアを読み込む必要があります。これにより、`t` 関数が有効になり、ロケールの検出と翻訳が適切に処理されます。

アプリケーション内の **すべてのルートの前に** `app.use(intlayer())` ミドルウェアを配置してください。これにより、すべてのルートが国際化の恩恵を受けられるようになります。

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 国際化リクエストハンドラーを読み込む
app.use(intlayer());

// ミドルウェアを読み込んだ後にルートを定義する
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

// ミドルウェアを読み込んだ後にルートを定義する
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

// ミドルウェアを読み込んだ後にルートを定義する
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

### なぜ必要なのか

- **ロケール検出**: `intlayer` ミドルウェアは、ヘッダー、クッキー、またはその他の設定された方法に基づいてユーザーの希望するロケールを検出します。
- **翻訳コンテキスト**: `t` 関数が正しく動作するために必要なコンテキストを設定し、翻訳が正しい言語で返されるようにします。
- **エラー防止**: このミドルウェアがないと、`t` 関数を使用する際にランタイムエラーが発生します。これは必要なロケール情報が利用できないためです。

---

## 使用例

### 基本的な例

異なる言語でローカライズされたコンテンツを提供する:

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

**クライアントリクエスト:**

- `Accept-Language: fr` を持つクライアントは `Bienvenue!` を受け取ります。
- `Accept-Language: es` を持つクライアントは `¡Bienvenido!` を受け取ります。
- `Accept-Language: de` を持つクライアントは `Welcome!`（デフォルトロケール）を受け取ります。

### エラーの処理

複数の言語でエラーメッセージを提供する:

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
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### ロケールバリアントの使用

ロケール固有のバリアントの翻訳を指定する:

```typescript fileName="src/index.ts" codeFormat="typescript"
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

```javascript fileName="src/index.cjs" codeFormat="commonjs"
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

### フォールバックメカニズム

希望するロケールが利用できない場合、`t` 関数は設定で定義されたデフォルトロケールにフォールバックします:

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

例えば:

- `defaultLocale` が `Locales.CHINESE` に設定されており、クライアントが `Locales.DUTCH` をリクエストした場合、返される翻訳は `Locales.CHINESE` の値になります。
- `defaultLocale` が定義されていない場合、`t` 関数は `Locales.ENGLISH` の値にフォールバックします。

---

### 厳密モードの適用

`t` 関数が宣言されたロケールへの厳密な準拠を強制するように設定します:

| モード      | 動作                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| `strict`    | すべての宣言されたロケールに翻訳が提供されている必要があります。欠落しているロケールはエラーをスローします。 |
| `inclusive` | 宣言されたロケールに翻訳が必要です。欠落しているロケールは警告をトリガーしますが、許容されます。             |
| `loose`     | 宣言されていないロケールでも受け入れられます。                                                               |

設定例:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 既存の設定
  internationalization: {
    // ... 既存の国際化設定
    strictMode: "strict", // 厳密モードを適用
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
    strictMode: "strict", // 厳密モードを適用
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
    strictMode: "strict", // 厳密モードを適用
  },
};

module.exports = config;
```

---

### TypeScript との統合

`t` 関数は TypeScript と一緒に使用する場合、型安全です。型安全な翻訳オブジェクトを定義します:

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
```

---

### 一般的なエラーとトラブルシューティング

| 問題                 | 原因                                                   | 解決策                                                                     |
| -------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| `t` 関数が動作しない | ミドルウェアが読み込まれていない                       | `app.use(intlayer())` がルートの前に追加されていることを確認してください。 |
| 翻訳の欠落エラー     | 厳密モードが有効で、すべてのロケールが提供されていない | 必要なすべての翻訳を提供してください。                                     |

---

## 効果的な使用のためのヒント

1. **翻訳を集中管理する**: 翻訳の管理を改善するために、集中化されたモジュールや JSON ファイルを使用してください。
2. **翻訳を検証する**: すべての言語バリアントに対応する翻訳があることを確認し、不必要なフォールバックを防ぎます。
3. **フロントエンドの i18n と組み合わせる**: アプリ全体でシームレスなユーザー体験を提供するために、フロントエンドの国際化と同期します。
4. **パフォーマンスをベンチマークする**: 翻訳を追加する際にアプリの応答時間をテストし、影響を最小限に抑えます。

---

## 結論

`t` 関数は、バックエンドの国際化において強力なツールです。これを効果的に使用することで、グローバルなオーディエンスに対してより包括的でユーザーフレンドリーなアプリケーションを作成できます。高度な使用法や詳細な設定オプションについては、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md) を参照してください。
