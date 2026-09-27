---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/nuxt-i18n：@nuxtjs/i18n 互換アダプター"
description: "@nuxtjs/i18n のコードはそのままで Intlayer から配信：@intlayer/nuxt-i18n をインストールし、インポートにエイリアスを設定して、アダプターが内部で何を変えるかを確認します。"
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/nuxt-i18n：@nuxtjs/i18n 互換アダプター

Nuxt アプリケーションを `@nuxtjs/i18n` から Intlayer に移行することは、Nuxt アダプターモジュールを使用したシームレスなプロセスです。

## やるべきこと

プロジェクトを初期化するには、以下を実行します:

```bash
npx intlayer init --interactive
```

これにより `intlayer.config.ts` がセットアップされます。その後、Intlayer Nuxt モジュール (例: `@intlayer/nuxt-i18n`) を `nuxt.config.ts` の modules 配列に追加します。これはアプリケーションの compat 設定を自動的に適用します。

## 内部的な動作

`@nuxtjs/i18n` は `vue-i18n` をラップしながら、Nuxt固有のルーティングコンポーザブル (`useLocalePath`、`useSwitchLocalePath`、`<NuxtLinkLocale>`) を提供します。

内部的には:

- **翻訳:** すべての文字列翻訳タスクのために `@intlayer/vue-i18n` compat レイヤーにネイティブに依存しています (`vue-i18n` フォーマット、pipe複数形、およびリアクティビティを完全にサポート)。
- **ルーティング:** IntlayerのローカライズされたURL ヘルパーを使用してルーティングコンポーザブルをミラーリングします。
- **設定:** `intlayer.config.ts` から直接 `availableLocales` とデフォルト設定を読み込み、Nuxtページを自動的に調整します。

> これらのライブラリがどのように生まれたのかを知るには、JavaScript i18n の歴史をご覧ください。

- [JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)
