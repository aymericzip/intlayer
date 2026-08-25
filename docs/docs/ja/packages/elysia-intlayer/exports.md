---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: elysia-intlayer パッケージドキュメント
description: Intlayer 用の Elysia プラグイン。翻訳関数とロケール検出を提供します。
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "すべてのエクスポートのドキュメントを統合"
author: aymericzip
---

# elysia-intlayer パッケージ

`elysia-intlayer` パッケージは Elysia アプリケーション向けのプラグインを提供し、国際化を扱います。ユーザーのロケールを検出し、ルートコンテキストに `intlayer` オブジェクトを注入します。

## インストール

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` は peer dependency です（`>=1.0.0`）。Elysia は **Bun** ランタイムを対象としています。

## エクスポート

### プラグイン

インポート:

```ts
import { intlayer } from "elysia-intlayer";
```

| 関数       | 説明                                                                                                                                                                                                                                                                                                                                               | 関連ドキュメント                                                                                               |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Intlayer を Elysia アプリケーションに統合する Elysia プラグイン。ストレージ（クッキー、ヘッダー）からのロケール検出、その後 `Accept-Language` からの検出を処理し、`locale`、`t`、`getIntlayer`、`getDictionary` を公開する `intlayer` オブジェクトをルートコンテキストに注入し、`AsyncLocalStorage` のリクエストコンテキストをセットアップします。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/elysia-intlayer/intlayer.md) |

### 関数

インポート:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| 関数            | 説明                                                                                                                                                                                                                                                                 | 関連ドキュメント                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Elysia で現在のロケールのコンテンツを取得するグローバル翻訳関数。`intlayer` プラグインがセットアップしたリクエストコンテキストに `AsyncLocalStorage` を通じてアクセスし、その外側ではデフォルトロケールにフォールバックします。`intlayer.t` からもアクセスできます。 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md) |
| `getIntlayer`   | 生成された宣言からキーで辞書を取得し、現在のロケールのコンテンツを返します。`getDictionary` の最適化版です。`AsyncLocalStorage` を使用してリクエストコンテキストにアクセスします。`intlayer.getIntlayer` からもアクセスできます。                                    | -                                                                                                      |
| `getDictionary` | 辞書オブジェクトを処理し、現在のロケールのコンテンツを返します。`t()` 翻訳、列挙、markdown、HTML などを処理します。`AsyncLocalStorage` を使用してリクエストコンテキストにアクセスします。`intlayer.getDictionary` からもアクセスできます。                           | -                                                                                                      |

### 型

インポート:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| 型                  | 説明                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | すべてのルートコンテキストに注入される `intlayer` オブジェクトの形: `locale`、`locale_storage`、`locale_detected`、`defaultLocale`、`t`、`getIntlayer`、`getDictionary`。 |
| `TranslateFunction` | ロケールマップを現在のリクエストロケールに対応するコンテンツへ変換する翻訳関数のシグネチャ。                                                                              |

## 使用方法

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // 国際化プラグインを読み込む
  .use(intlayer())
  // ルートコンテキストからロケールとヘルパーを読み取る
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      ja: "こんにちは",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // または、現在のリクエストに紐づくスタンドアロンヘルパーを使う
  .get("/t_example", () =>
    t({
      ja: "英語で返されたコンテンツの例",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> プラグインは **グローバル** な `derive` を通じてコンテキストを登録し、Elysia はそれを `Partial<{ intlayer: IntlayerContext }>` として型付けします。`.use(intlayer())` の後に登録されたルートでは実行時に値が必ず存在するため、`strict` モードの TypeScript を満たすには非 null アサーション（`intlayer!.locale`）またはオプショナルチェーンを使用してください。

## 関連ドキュメント

- [Elysia i18n - アプリを翻訳するための完全ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_elysia.md)
- [設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
