---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer パッケージのドキュメント
description: Intlayer を Vue アプリケーションに統合するための Vue 固有の統合で、Vue アプリ向けのプラグインと composables を提供します。
keywords:
  - vue-intlayer
  - vue
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートのドキュメントを統一
---

# vue-intlayer パッケージ

`vue-intlayer` パッケージは、Intlayer を Vue アプリケーションに統合するために必要なツールを提供します。Vue アプリ向けのプラグインと composables が含まれます。

## インストール

```bash
npm install vue-intlayer
```

## エクスポート

### プラグイン

| Function          | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `installIntlayer` | アプリケーションにIntlayerをインストールするためのVueプラグイン。 |

### コンポーザブル

| コンポーザブル  | 説明                                             |
| --------------- | ------------------------------------------------ |
| `useIntlayer`   | キーで辞書を選択し、コンテンツを返します。       |
| `useDictionary` | キーで辞書を選択し、コンテンツを返します。       |
| `useLocale`     | 現在のロケールと、それを設定する関数を返します。 |
| `useIntl`       | 現在のロケールのIntlオブジェクトを返します。     |

### 関数

| 関数            | 説明                             |
| --------------- | -------------------------------- |
| `getDictionary` | 辞書を取得します。               |
| `getIntlayer`   | 辞書からコンテンツを取得します。 |

### マークダウン

| 関数                      | 説明                                                                           |
| ------------------------- | ------------------------------------------------------------------------------ |
| `installIntlayerMarkdown` | アプリケーションに Intlayer Markdown をインストールするための Vue プラグイン。 |
