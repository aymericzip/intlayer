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

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    ja: "こんにちは",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

同じヘルパーはスタンドアロンのエクスポートとしても利用できるため、ルートコンテキストを分割代入せずに呼び出せます:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    ja: "こんにちは",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## 説明

プラグインは次のタスクを実行します:

1. **ロケール検出**: クライアントが明示的に設定したロケールをストレージ（クッキー、ヘッダー）から読み取り、その後 `Accept-Language` ヘッダーからネゴシエートされたロケールにフォールバックします。
2. **コンテキストへの注入**: Elysia のルートコンテキストに `intlayer` プロパティを追加します。含まれるもの:
   - `locale`: このリクエストで使用するロケール。`locale_storage` が `locale_detected` より優先されます。
   - `locale_storage`: クッキーまたはヘッダーを通じてクライアントが明示的に要求したロケール。
   - `locale_detected`: リクエストヘッダーからネゴシエートされたロケール。
   - `defaultLocale`: `intlayer.config.ts` でフォールバックとして設定されたロケール。
   - `t`: 翻訳関数。
   - `getIntlayer`: キーで辞書を取得する関数。
   - `getDictionary`: 辞書オブジェクトを処理する関数。
3. **コンテキスト管理**: 非同期コンテキストを管理するために `AsyncLocalStorage` を使用し、グローバルな Intlayer 関数（`t`、`getIntlayer`、`getDictionary`）がコンテキストオブジェクトを渡さずにリクエスト固有のロケールにアクセスできるようにします。

> Node ベースの Intlayer プラグインとは異なり、`elysia-intlayer` は `cls-hooked` ではなく `AsyncLocalStorage` に依存します。`cls-hooked` は Bun が実装していない `async_hooks.createHook` に依存しているためです。

リクエストコンテキストはレスポンスがマップされた時点で解放されるため、スタンドアロンのヘルパーが既に終了したリクエストに対して解決されることはありません。プラグインが処理するリクエストの外部で呼び出された場合は、設定されたデフォルトロケールにフォールバックします。

## 設定

プラグインは `intlayer.config.ts` ファイルを読み取ります。ロケール検出に使用するクッキーとヘッダーをカスタマイズできます:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
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
