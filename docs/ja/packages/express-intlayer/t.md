# ドキュメント: `t` 関数 in `express-intlayer`

`express-intlayer` パッケージの `t` 関数は、Express アプリケーションでローカライズされたレスポンスを提供するためのコアユーティリティです。ユーザーの優先言語に基づいて動的にコンテンツを選択することで、国際化 (i18n) を簡素化します。

---

## 概要

`t` 関数は、特定の言語セットに対する翻訳を定義および取得するために使用されます。クライアントのリクエスト設定（例: `Accept-Language` ヘッダー）に基づいて適切な言語を自動的に判断します。優先言語が利用できない場合、設定されたデフォルトロケールにフォールバックします。

---

## 主な特徴

- **動的ローカリゼーション**: クライアントに最も適した翻訳を自動的に選択します。
- **デフォルトロケールへのフォールバック**: クライアントの優先言語が利用できない場合、デフォルトロケールにフォールバックしてユーザー体験を維持します。
- **軽量で高速**: 高パフォーマンスアプリケーション向けに設計され、オーバーヘッドを最小限に抑えます。
- **ストリクトモードサポート**: 宣言されたロケールへの厳密な準拠を強制し、信頼性のある動作を保証します。

---

## 関数シグネチャ

```typescript
t(translations: Record<string, string>): string;
```

### パラメータ

- `translations`: キーがロケールコード（例: `en`, `fr`, `es-MX`）、値が対応する翻訳文字列であるオブジェクト。

### 戻り値

- クライアントの優先言語でのコンテンツを表す文字列。

---

## 国際化リクエストハンドラーの読み込み

`express-intlayer` が提供する国際化機能が正しく動作するようにするには、Express アプリケーションの最初に国際化ミドルウェアを読み込む必要があります。これにより、`t` 関数が有効になり、ロケール検出と翻訳が適切に処理されます。

アプリケーション内の **すべてのルートの前** に `app.use(intlayer())` ミドルウェアを配置してください。これにより、すべてのルートが国際化の恩恵を受けます。

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

- **ロケール検出**: `intlayer` ミドルウェアは、ヘッダー、クッキー、またはその他の設定された方法に基づいてユーザーの優先ロケールを検出します。
- **翻訳コンテキスト**: `t` 関数が正しく動作するために必要なコンテキストを設定し、正しい言語で翻訳を返します。
- **エラー防止**: このミドルウェアがないと、必要なロケール情報が利用できないため、`t` 関数を使用するとランタイムエラーが発生します。

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

優先ロケールが利用できない場合、`t` 関数は設定で定義されたデフォルトロケールにフォールバックします:

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

- `defaultLocale` が `Locales.CHINESE` で、クライアントが `Locales.DUTCH` をリクエストした場合、返される翻訳は `Locales.CHINESE` の値になります。
- `defaultLocale` が定義されていない場合、`t` 関数は `Locales.ENGLISH` の値にフォールバックします。

---

## 結論

`t` 関数はバックエンド国際化のための強力なツールです。これを効果的に使用することで、グローバルなオーディエンスに向けた、より包括的でユーザーフレンドリーなアプリケーションを作成できます。詳細な使用法や設定オプションについては、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md) を参照してください。
