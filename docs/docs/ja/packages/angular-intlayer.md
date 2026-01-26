---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer パッケージのドキュメント
description: Angular アプリケーション向けに、プロバイダーとサービスを提供する Intlayer の Angular 専用統合。
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートに対するドキュメントを統合
---

# angular-intlayer パッケージ

`angular-intlayer` パッケージは、Intlayer を Angular アプリケーションに統合するために必要なツールを提供します。多言語コンテンツを扱うためのプロバイダーとサービスが含まれます。

## インストール

```bash
npm install angular-intlayer
```

## エクスポート

### セットアップ

| 関数              | 説明                                              |
| ----------------- | ------------------------------------------------- |
| `provideIntlayer` | AngularアプリケーションにIntlayerを提供する関数。 |

### サービス

| サービス          | 説明                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| `IntlayerService` | キーによって辞書を選択し、その内容を返すサービス。                     |
| `LocaleService`   | 現在のロケールを返し、ロケールを設定するための関数を提供するサービス。 |

### コンポーネント

| コンポーネント              | 説明                                                              |
| --------------------------- | ----------------------------------------------------------------- |
| `IntlayerMarkdownComponent` | マークダウンコンテンツをレンダリングする Angular コンポーネント。 |
