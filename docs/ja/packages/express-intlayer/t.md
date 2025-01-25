# Documentation: `t` 関数 in `express-intlayer`

`express-intlayer` パッケージの `t` 関数は、Express アプリケーションでローカライズされたレスポンスを提供するためのコアユーティリティです。ユーザーの好ましい言語に基づいてコンテンツを動的に選択することで国際化 (i18n) を簡素化します。

---

## 概要

`t` 関数は、特定の言語セットの翻訳を定義し、取得するために使用されます。これは、クライアントのリクエスト設定（例：`Accept-Language` ヘッダー）に基づいて、返すべき適切な言語を自動的に判断します。好ましい言語が利用できない場合は、設定で指定されたデフォルトロケールに優雅にフォールバックします。

---

## 主な機能

- **動的ローカリゼーション**: クライアントに最も適切な翻訳を自動的に選択します。
- **デフォルトロケールへのフォールバック**: クライアントの好ましい言語が利用できない場合にデフォルトロケールにフォールバックし、ユーザー体験の継続性を確保します。
- **軽量で高速**: 高パフォーマンスアプリケーション向けに設計され、最小限のオーバーヘッドを確保します。
- **厳密モードサポート**: 信頼性の高い動作のために宣言されたロケールへの厳密な遵守を強制します。

---

## 関数シグネチャ

```typescript
t(translations: Record<string, string>): string;
```

### パラメーター

- `translations`: キーがロケールコード（例：`en`, `fr`, `es-MX`）で、値がそれに対応する翻訳済み文字列のオブジェクトです。

### 戻り値

- クライアントの好ましい言語で表現されたコンテンツを表す文字列を返します。

---

## 国際化リクエストハンドラの読み込み

`express-intlayer`によって提供される国際化機能が正しく動作するようにするために、Express アプリケーションの冒頭で国際化ミドルウェアを **必ず** 読み込む必要があります。これにより `t` 関数が有効になり、ロケール検出と翻訳の適切な処理が确保されます。

アプリケーションのすべてのルートが国際化の恩恵を受けるように、`app.use(intlayer())` ミドルウェアを **すべてのルートの前** に配置してください：

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 国際化リクエストハンドラを読み込む
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

// 国際化リクエストハンドラを読み込む
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

// 国際化リクエストハンドラを読み込む
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

### なぜこれが必要か

- **ロケール検出**: `intlayer` ミドルウェアは、ヘッダー、クッキー、または他の構成された方法に基づいてユーザーの好ましいロケールを検出するために受信リクエストを処理します。
- **翻訳コンテキスト**: `t` 関数が正しく動作するために必要なコンテキストを設定し、翻訳が正しい言語で返されるようにします。
- **エラー防止**: このミドルウェアがないと、`t` 関数を使用することはランタイムエラーを引き起こします。なぜなら必要なロケール情報が利用できないからです。

---

## 使用例

### 基本例

異なる言語でローカライズされたコンテンツを提供します：

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
- `Accept-Language: de` を持つクライアントは `Welcome!` を受け取ります（デフォルトロケール）。

### エラーの取り扱い

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
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### ロケールバリアントの使用

ロケール特有のバリアントの翻訳を指定します：

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

好ましいロケールが利用できない場合、`t` 関数は設定で定義されたデフォルトロケールにフォールバックします：

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

- `defaultLocale` が `Locales.CHINESE` で、クライアントが `Locales.DUTCH` を要求すると、返される翻訳はデフォルトで `Locales.CHINESE` の値になります。
- `defaultLocale` が定義されていない場合、`t` 関数はデフォルトで `Locales.ENGLISH` の値にフォールバックします。

---

### 厳密モードの強制

`t` 関数が宣言されたロケールに厳密に従うように構成します：

| モード          | 動作                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `strict`        | すべての宣言ロケールに翻訳を提供する必要があります。欠落したロケールはエラーを引き起こします。             |
| `required_only` | 宣言たロケールは翻訳を持っている必要があります。欠落したロケールは警告を引き起こしますが受け入れられます。 |
| `loose`         | 宣言されていないロケールも受け入れられます。                                                               |

構成例：

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 既存の構成
  internationalization: {
    // ... 既存の国際化の構成
    strictMode: "strict", // 厳密モードを強制する
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 既存の構成
  internationalization: {
    // ... 既存の国際化の構成
    strictMode: "strict", // 厳密モードを強制する
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 既存の構成
  internationalization: {
    // ... 既存の国際化の構成
    strictMode: "strict", // 厳密モードを強制する
  },
};

module.exports = config;
```

---

### TypeScript 統合

`t` 関数は TypeScript を使用するときに型安全です。型安全な翻訳オブジェクトを定義します：

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

| 問題                     | 原因                                         | 解決策                                                                     |
| ------------------------ | -------------------------------------------- | -------------------------------------------------------------------------- |
| `t` 関数が動作しない     | ミドルウェアが読み込まれていない             | `app.use(intlayer())` がルートの前に追加されていることを確認してください。 |
| 翻訳が欠落しているエラー | すべてのロケールがない状態で厳密モードが有効 | 必要なすべての翻訳を提供します。                                           |

---

## 効果的な使用のためのヒント

1. **翻訳を集中化する**: メンテナンスを改善するために翻訳管理用の集中モジュールや JSON ファイルを使用します。
2. **翻訳を検証する**: 不必要にフォールバックしないように、すべての言語バリアントに対応する翻訳があることを確認します。
3. **フロントエンドの i18n と統合する**: アプリ全体でシームレスなユーザー体験のためにフロントエンドの国際化と同期させます。
4. **パフォーマンスをベンチマークする**: 翻訳追加時のアプリの応答時間をテストして、最小限の影響を確保します。

---

## 結論

`t` 関数はバックエンド国際化の強力なツールです。これを効果的に使用することで、世界中の聴衆向けにより包括的でユーザーフレンドリーなアプリケーションを作成できます。高度な使用法や詳細な構成オプションについては、[documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md) を参照してください。
