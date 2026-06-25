---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "NGX-Translateからのへの移行"
description: "compat adapterを使用してあなたのAngularアプリケーションをngx-translateからIntlayerに移行する方法を学びます。"
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# NGX-Translate から Intlayer への移行

`ngx-translate` から Intlayer への Angular アプリケーションの移行は、compat adapter を使用することで簡単です。すべてのテンプレートを書き直す必要がありません。

## やることリスト

以下のコマンドを実行します:

```bash
npx intlayer init
```

これにより `intlayer.config.ts` がセットアップされます。`TranslateModule.forRoot()` のセットアップとインポートエイリアスを置き換えて、`@intlayer/ngx-translate` を適切にポイントするようにしてください。

## 内部的な動作

`ngx-translate` は `TranslateService` (`instant`、`get`、`stream`) を `{{ 'KEY' | translate:params }}` パイプと `[translate]` ディレクティブと共に使用します。

内部的には:

- **Services:** `TranslateService` は `getIntlayer` とロケール observable をラップし、完全に同じメソッドを提供します。
- **Pipes & Directives:** Intlayer ディクショナリに対して直接解決するように再実装されています。
- **Loaders:** `TranslateHttpLoader` のセットアップは warning stubs に変換されます。Intlayer は本質的にビルド時（またはスタンダード dynamic imports を通じて）ディクショナリを解決およびバンドルするため、HTTP loaders の必要性を完全に排除します。
