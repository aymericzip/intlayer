---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t 関数ドキュメント | hono-intlayer
description: hono-intlayer パッケージでの t 関数の使用方法を確認する
keywords:
  - t
  - 翻訳
  - Intlayer
  - 国際化
  - ドキュメント
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# ドキュメント: `hono-intlayer` における `t` 関数

`hono-intlayer` パッケージの `t` 関数は、Hono アプリケーションでローカライズされたレスポンスを提供するためのコア ユーティリティです。ユーザーの優先言語に基づいてコンテンツを動的に選択することで、国際化 (i18n) を簡素化します。

---

## 概要

`t` 関数は、特定の言語セットに対する翻訳を定義し、取得するために使用されます。`Accept-Language` ヘッダーなどのクライアントのリクエスト設定に基づいて、返すべき適切な言語を自動的に決定します。優先言語が利用できない場合は、設定で指定されたデフォルトのロケールに適切にフォールバックします。

---

## 主な機能

- **動的なローカリゼーション**: クライアントにとって最も適切な翻訳を自動的に選択します。
- **デフォルト ロケールへのフォールバック**: クライアントの優先言語が利用できない場合、デフォルトのロケールにフォールバックし、ユーザー エクスペリエンスの継続性を確保します。
- **軽量で高速**: 高パフォーマンスなアプリケーション向けに設計されており、オーバーヘッドを最小限に抑えます。
- **厳格モードのサポート**: 信頼性の高い動作のために、宣言されたロケールの厳守を強制します。

---

## 関数のシグネチャ

```typescript
t(translations: Record<string, string>): string;
```

### パラメータ

- `translations`: キーがロケール コード (例: `en`、`fr`、`ja`) で、値が対応する翻訳文字列であるオブジェクト。

### 戻り値

- クライアントの優先言語でのコンテンツを表す文字列。

---

## 国際化リクエスト ハンドラのロード

`hono-intlayer` が提供する国際化機能が正しく動作するようにするには、Hono アプリケーションの最初に国際化ミドルウェアをロードする**必要があります**。これにより `t` 関数が有効になり、ロケール検出と翻訳が適切に処理されます。

アプリケーションの**すべてのルートの前に** `app.use("*", intlayer())` ミドルウェアを配置し、すべてのルートが国際化の恩恵を受けられるようにしてください。

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// 国際化リクエスト ハンドラをロード
app.use("*", intlayer());

// ミドルウェアのロード後にルートを定義
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ja: "こんにちは、世界！",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// 国際化リクエスト ハンドラをロード
app.use("*", intlayer());

// ミドルウェアのロード後にルートを定義
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ja: "こんにちは、世界！",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// 国際化リクエスト ハンドラをロード
app.use("*", intlayer());

// ミドルウェアのロード後にルートを定義
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ja: "こんにちは、世界！",
    })
  );
});
```

### これが必要な理由

- **ロケール検出**: `intlayer` ミドルウェアは、ヘッダー、クッキー、またはその他の構成された方法に基づいてユーザーの優先ロケールを検出するために、着信リクエストを処理します。
- **翻訳コンテキスト**: `t` 関数が正しく動作するために必要なコンテキストを設定し、翻訳が正しい言語で返されるようにします。
- **エラー防止**: このミドルウェアがないと、必要なロケール情報が利用できないため、`t` 関数を使用するとランタイム エラーが発生します。

---

## 使用例

### 基本的な例

異なる言語でローカライズされたコンテンツを提供します。

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      ja: "ようこそ！",
    })
  );
});
```

**クライアント リクエスト:**

- `Accept-Language: fr` のクライアントは `Bienvenue!` を受け取ります。
- `Accept-Language: ja` のクライアントは `ようこそ！` を受け取ります。
- `Accept-Language: de` のクライアントは `Welcome!` (デフォルト ロケール) を受け取ります。

### エラー処理

複数の言語でエラー メッセージを提供します。

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      ja: "予期しないエラーが発生しました。",
    }),
    500
  );
});
```

---

### ロケール バリアントの使用

ロケール固有のバリアントに対する翻訳を指定します。

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      ja: "こんにちは！",
    })
  );
});
```

---

## 高度なトピック

### フォールバック メカニズム

優先ロケールが利用できない場合、`t` 関数は設定で定義されたデフォルト ロケールにフォールバックします。

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.JAPANESE],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### 厳格モードの強制

宣言されたロケールの厳守を強制するように `t` 関数を構成します。

| モード      | 動作                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------- |
| `strict`    | 宣言されたすべてのロケールに翻訳を提供する必要があります。不足している場合はエラーをスローします。 |
| `inclusive` | 宣言されたロケールには翻訳が必要です。不足している場合は警告を発しますが、受け入れられます。       |
| `loose`     | 宣言されていなくても、既存のロケールはすべて受け入れられます。                                     |

---

### TypeScript の統合

TypeScript と一緒に使用すると、`t` 関数は型安全になります。型安全な翻訳オブジェクトを定義します。

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  ja: "おはようございます！",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### よくあるエラーとトラブルシューティング

| 問題                 | 原因                                   | 解決策                                                                           |
| -------------------- | -------------------------------------- | -------------------------------------------------------------------------------- |
| `t` 関数が動作しない | ミドルウェアがロードされていない       | ルートの前に `app.use("*", intlayer())` が追加されていることを確認してください。 |
| 翻訳不足エラー       | すべてのロケールなしで厳格モードが有効 | 必要なすべての翻訳を提供してください。                                           |

---

## 結論

`t` 関数は、バックエンドの国際化のための強力なツールです。これを効果的に使用することで、グローバルな視聴者にとってより包括的でユーザーフレンドリーなアプリケーションを作成できます。高度な使用法と詳細な構成オプションについては、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)を参照してください。
