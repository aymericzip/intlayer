---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Svelte I18nからIntlayerへの移行"
description: "compat アダプターを使用して、Svelte アプリケーションを svelte-i18n から Intlayer に移行する方法を学びます。"
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Svelte I18n から Intlayer への移行

`svelte-i18n` から Intlayer への Svelte アプリケーションの移行は、compat adapter を使用することで、わずかな時間で完了します。

## やることリスト

プロジェクトで初期化コマンドを実行するだけです:

```bash
npx intlayer init
```

これにより `intlayer.config.ts` が生成されます。SvelteKit / Vite プラグインが Intlayer のエイリアスプラグインでラップされていることを確認して、`svelte-i18n` を `@intlayer/svelte-i18n` にシームレスにマップします。

## 内部動作

Svelte-i18n は頻繁に使用される store（`$_`、`$t`、`$format` など）と ICU MessageFormat に依存しています。

内部動作：

- **Stores:** Intlayer は `svelte-i18n` store をプロキシします。`$_` は現在のロケールの派生 store になり、Intlayer resolver を返します。
- **Keys:** フラットキー（例：`$_('home.title')`）が評価され、最初のパスセグメントが Intlayer dictionary を表します。
- **ICU Syntax:** 共有 ICU resolver（`intl-messageformat` と同等のパース）によって完全に処理されます。
- **Formatters:** `$date`、`$time`、`$number` の呼び出しは Intlayer のネイティブコアフォーマッターに安全にリダイレクトされます。
- **Babel/SWC Analysis:** Intlayer analyzer は コンパイル前に `.svelte` ソースファイル内の Svelte store 呼び出し（`$_`）を読み取り、関連する dictionary chunks を自動的にビルドします。
