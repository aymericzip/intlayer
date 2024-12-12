# Documentation: `t` Function in `express-intlayer`

`express-intlayer` パッケージの `t` 関数は、Express アプリケーションでローカライズされた応答を提供するための主要なユーティリティです。これにより、ユーザーの希望する言語に基づいてコンテンツを動的に選択することで、国際化 (i18n) が簡素化されます。

---

## 概要

`t` 関数は、特定の言語セットの翻訳を定義し取得するために使用されます。これは、クライアントのリクエスト設定（`Accept-Language` ヘッダーなど）に基づいて返すべき適切な言語を自動的に決定します。希望する言語が利用できない場合、設定で指定されたデフォルトのロケールに優雅にフォールバックします。

---

## 主な特徴

- **動的ローカリゼーション**: クライアントに最も適切な翻訳を自動的に選択します。
- **デフォルトロケールへのフォールバック**: クライアントの希望する言語が利用できない場合、デフォルトのロケールにフォールバックし、ユーザーエクスペリエンスの継続性を確保します。
- **軽量で高速**: 高パフォーマンスのアプリケーション向けに設計されており、オーバーヘッドが最小限です。
- **厳格モードサポート**: 宣言されたロケールへの厳格な準拠を強制し、信頼できる動作を保証します。

---

## 関数シグネチャ

```typescript
t(translations: Record<string, string>): string;
```

### パラメータ

- `translations`: キーがロケールコード（例: `en`, `fr`, `es-MX`）で、値が対応する翻訳された文字列のオブジェクト。

### 戻り値

- クライアントの希望する言語で表現されたコンテンツを表す文字列。

---

## 国際化リクエストハンドラのロード

`express-intlayer` によって提供される国際化機能が正しく動作するように、Express アプリケーションの最初に国際化ミドルウェアをロードする必要があります。これにより、`t` 関数が有効になり、ロケール検出と翻訳の適切な処理が保証されます。

### 必要なミドルウェアの設定

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 国際化リクエストハンドラをロード
app.use(intlayer());
```

### アプリケーション内での配置

全てのルートが国際化の恩恵を受けられるように、`app.use(intlayer())` ミドルウェアをアプリケーションのルートの **前に** 配置します：

```typescript
app.use(intlayer());

// ミドルウェアをロードした後にルートを定義
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

### 必要な理由

- **ロケール検出**: `intlayer` ミドルウェアは、ヘッダー、クッキー、または他の設定された方法に基づいて、ユーザーの希望するロケールを検出するために受信リクエストを処理します。
- **翻訳コンテキスト**: `t` 関数が正しく動作するために必要なコンテキストを設定し、翻訳が正しい言語で返されるようにします。
- **エラー防止**: このミドルウェアがない場合、`t` 関数を使用すると必要なロケール情報が利用できないため、ランタイムエラーが発生します。

---

## 使用例

### 基本例

異なる言語でローカライズされたコンテンツを提供します：

```typescript
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

- `Accept-Language: fr` のクライアントは `Bienvenue!` を受け取ります。
- `Accept-Language: es` のクライアントは `¡Bienvenido!` を受け取ります。
- `Accept-Language: de` のクライアントは `Welcome!` を受け取ります（デフォルトロケール）。

### エラーハンドリング

複数の言語でエラーメッセージを提供します：

```typescript
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

```typescript
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

優先ロケールが利用できない場合、`t` 関数は設定で定義されたデフォルトロケールにフォールバックします：

```typescript
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};
```

例：

- `defaultLocale` が `Locales.CHINESE` で、クライアントが `Locales.DUTCH` を要求した場合、返される翻訳は `Locales.CHINESE` の値にフォールバックします。
- `defaultLocale` が定義されていない場合、`t` 関数は `Locales.ENGLISH` の値にフォールバックします。

---

### 厳格モードの実施

`t` 関数を設定して、宣言されたロケールへの厳格な遵守を強制します：

| モード          | 振る舞い                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------- |
| `strict`        | 宣言された全てのロケールに翻訳を提供する必要があります。欠けているロケールはエラーをスローします。 |
| `required_only` | 宣言されたロケールに翻訳が必要です。欠けているロケールは警告をトリガーしますが受け入れられます。   |
| `loose`         | 宣言されていなくても存在する任意のロケールが受け入れられます。                                     |

設定例：

```typescript
const config = {
  internationalization: {
    strictMode: "strict", // 厳格モードを強制
  },
};
```

---

### TypeScript 統合

`t` 関数は、TypeScript と一緒に使用する場合に型安全です。型安全な翻訳オブジェクトを定義します：

```typescript
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

---

### 一般的なエラーとトラブルシューティング

| 問題                     | 原因                                       | 解決策                                                 |
| ------------------------ | ------------------------------------------ | ------------------------------------------------------ |
| `t` 関数が動作しない     | ミドルウェアがロードされていない           | `app.use(intlayer())` をルートの前に追加してください。 |
| 翻訳が見つからないエラー | 全てのロケールが無い状態で厳格モードが有効 | 必要な翻訳を全て提供してください。                     |

---

## 効果的な使用のためのヒント

1. **翻訳の中央集約**: メンテナビリティを向上させるために、翻訳管理のために中央モジュールまたは JSON ファイルを使用します。
2. **翻訳の検証**: 各言語バリアントに対応する翻訳があることを確認して、不必要にフォールバックしないようにします。
3. **フロントエンドの i18n と組み合わせる**: アプリ全体のシームレスなユーザーエクスペリエンスのためにフロントエンド国際化と同期します。
4. **パフォーマンスのベンチマーク**: 翻訳を追加する際にアプリの応答時間をテストして、最小限の影響を確保します。

---

## 結論

`t` 関数はバックエンド国際化の強力なツールです。これを効果的に使用することで、グローバルなオーディエンスに対してより包括的でユーザーフレンドリーなアプリケーションを作成できます。高度な使用法や詳細な設定オプションについては、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md) を参照してください。
