---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: intlayer Elysia プラグインドキュメント | elysia-intlayer
description: elysia-intlayer パッケージの intlayer プラグインの使い方を確認します
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "ドキュメントの初期化"
author: aymericzip
---

# intlayer Elysia プラグインドキュメント

Elysia 用の `intlayer` プラグインは、ユーザーのロケールを検出し、ルートコンテキストに `intlayer` オブジェクトを注入します。また、リクエストコンテキスト内でグローバルな翻訳関数を使用できるようにします。

## 使用方法

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    ja: "こんにちは",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> プラグインは **グローバル** な `derive` を通じてコンテキストを登録し、Elysia はそれを `Partial<{ intlayer: IntlayerContext }>` として型付けします。`.use(intlayer())` の後に登録されたルートでは実行時に値が必ず存在するため、`strict` モードの TypeScript を満たすには非 null アサーション（`intlayer!.t`）またはオプショナルチェーンを使用してください。

同じヘルパーはスタンドアロンのエクスポートとしても利用できるため、ルートコンテキストを分割代入せずに呼び出せます:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    ja: "こんにちは",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## 説明

プラグインは次のタスクを実行します:

1. **ロケール検出**: クライアントが明示的に設定したロケールをストレージ（クッキー、ヘッダー）から読み取り、その後 `Accept-Language` ヘッダーからネゴシエートされたロケールにフォールバックします。
2. **コンテキストへの注入**: Elysia のルートコンテキストに `intlayer` プロパティを追加します（下記の「ルートコンテキスト」表を参照）。
3. **コンテキスト管理**: 非同期コンテキストを管理するために `AsyncLocalStorage` を使用し、グローバルな Intlayer 関数（`t`、`getIntlayer`、`getDictionary`）がコンテキストオブジェクトを渡さずにリクエスト固有のロケールにアクセスできるようにします。
4. **辞書の準備**: プラグインの生成時に `prepareIntlayer` を呼び出すため、アプリの起動時に辞書がビルドされます。

### ルートコンテキスト

| プロパティ        | 型                     | 説明                                                                                       |
| ----------------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| `locale`          | `Locale`               | このリクエストで使用するロケール。`locale_storage` が `locale_detected` より優先されます。 |
| `locale_storage`  | `Locale` (任意)        | クッキーまたはヘッダーを通じてクライアントが明示的に要求したロケール。                     |
| `locale_detected` | `Locale`               | リクエストヘッダーからネゴシエートされたロケール。                                         |
| `defaultLocale`   | `Locale`               | `intlayer.config.ts` でフォールバックとして設定されたロケール。                            |
| `t`               | `TranslateFunction`    | 翻訳関数。                                                                                 |
| `getIntlayer`     | `typeof getIntlayer`   | キーで辞書を取得する関数。                                                                 |
| `getDictionary`   | `typeof getDictionary` | 辞書オブジェクトを処理する関数。                                                           |

> Node ベースの Intlayer プラグインとは異なり、`elysia-intlayer` は `cls-hooked` ではなく `AsyncLocalStorage` に依存します。`cls-hooked` は Bun が実装していない `async_hooks.createHook` に依存しているためです。

リクエストコンテキストはレスポンスがマップされた時点で解放されるため、スタンドアロンのヘルパーが既に終了したリクエストに対して解決されることはありません。プラグインが処理するリクエストの外部で呼び出された場合は、設定されたデフォルトロケールにフォールバックします。

## ロケールの解決順序

デフォルトでは、プラグインは次の順序でロケールを解決します:

1. `INTLAYER_LOCALE` クッキー。
2. `x-intlayer-locale` ヘッダー。
3. `Accept-Language` ヘッダーのネゴシエーション。
4. 設定された `defaultLocale`。

```bash
# `Accept-Language` からネゴシエーション
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# クッキーは `Accept-Language` より優先されます
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# ヘッダーは `Accept-Language` より優先されます
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## 設定

プラグインは `intlayer.config.ts` ファイルを読み取ります。ロケール検出に使用するクッキーとヘッダーをカスタマイズできます:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> 設定に関する詳細は、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

## 関連ドキュメント

- [elysia-intlayer パッケージドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/elysia-intlayer/exports.md)
- [Elysia i18n - アプリを翻訳するための完全ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_elysia.md)
