---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "i18next、next-intl、react-intl、Lingui、vue-i18n などから Intlayer への移行"
description: "翻訳呼び出しを書き直さずに、既存のアプリを Intlayer に移行できます。compat adapter は i18next、react-i18next、next-intl、react-intl、Lingui、vue-i18n、svelte-i18n、ngx-translate の API をそのまま維持します。"
keywords:
  - migration
  - compat adapter
  - i18next
  - next-intl
  - react-intl
  - lingui
  - vue-i18n
  - ngx-translate
  - intlayer
  - i18n
slugs:
  - doc
  - migration
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# 現在の i18n ライブラリから Intlayer へ移行する

大規模なアプリの翻訳呼び出しをすべて書き直すのは、ほとんどの場合現実的ではありません。Intlayer は **compat adapter** を提供します。現在の i18n ライブラリと **同じ API** を公開しつつ、メッセージは Intlayer の辞書から提供する package です。

## 仕組み

1. **コードはそのまま。** `useTranslation`、`useTranslations`、`useIntl`、`useLingui`、`$_`、`| translate` の呼び出しは変更不要です。
2. **メッセージファイルもそのまま。** [sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)（または [sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)）が既存のファイルを読み込み、翻訳をそのファイルに書き戻します。
3. **バンドラープラグインを差し替える。** 各 adapter には、辞書をビルドし、元のライブラリの import を adapter へリダイレクトするプラグインが付属しています。import の変更は不要です。

型付きのキー、ページ単位の辞書読み込み、[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) による AI 翻訳、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) が使えるようになります。その後、コンポーネントごとにネイティブの `.content.ts` ファイルへ移行できます。

> これらのライブラリの成り立ちを知るには、[JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md) をお読みください。

## 利用可能な compat adapter

| ライブラリ                                               | フレームワーク | Adapter                   | 移行ガイド                                                                                                                            |
| -------------------------------------------------------- | -------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript     | `@intlayer/i18next`       | [i18next からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React          | `@intlayer/react-i18next` | [react-i18next からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js        | `@intlayer/next-i18next`  | [next-i18next からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js        | `@intlayer/next-intl`     | [next-intl からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React          | `@intlayer/react-intl`    | [react-intl からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React          | `@intlayer/lingui`        | [Lingui からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue            | `@intlayer/vue-i18n`      | [vue-i18n からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt           | `@intlayer/nuxtjs-i18n`   | [@nuxtjs/i18n からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte         | `@intlayer/svelte-i18n`   | [svelte-i18n からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular        | `@intlayer/ngx-translate` | [ngx-translate からの移行](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_ngx-translate_to_intlayer.md) |

## クイックスタート

どのライブラリでも最初のステップは同じです。`intlayer init` が現在の i18n ライブラリを検出し、対応する adapter をインストールします。

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

その後、上記の各ライブラリの移行ガイドに従ってください。

## ゼロから始める場合

まだ i18n ライブラリを使っていない場合は、adapter を使わずにネイティブ API から始めましょう。

- [Next.js で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)
- [Vite と React で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)
- [Vite と Vue で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md)
- [Vite と Svelte で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+svelte.md)
- [Angular で Intlayer を使う](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_21.md)
