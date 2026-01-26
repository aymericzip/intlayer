---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer パッケージ ドキュメント
description: Next.js 向けの Intlayer 統合（App Router と Page Router 用のミドルウェアおよびプロバイダーを提供）。
keywords:
  - next-intlayer
  - nextjs
  - react
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートのドキュメントを統一
---

# next-intlayer パッケージ

`next-intlayer` パッケージは、Intlayer を Next.js アプリケーションに統合するために必要なツールを提供します。App Router と Page Router の両方をサポートし、ロケールベースのルーティング用のミドルウェアも含まれています。

## インストール

```bash
npm install next-intlayer
```

## エクスポート

### ミドルウェア

| 関数                 | 説明                                                                        |
| -------------------- | --------------------------------------------------------------------------- |
| `intlayerMiddleware` | ロケールに基づくルーティングとリダイレクトを処理する Next.js ミドルウェア。 |

### プロバイダー

| コンポーネント           | 説明                                                                   |
| ------------------------ | ---------------------------------------------------------------------- |
| `IntlayerClientProvider` | Next.js のクライアントサイドコンポーネント向けプロバイダー。           |
| `IntlayerServerProvider` | Next.js のサーバーサイドコンポーネント（App Router）向けプロバイダー。 |

### フック（クライアント側）

`react-intlayer` のほとんどのフックを再エクスポートします。

| フック          | 説明                                             |
| --------------- | ------------------------------------------------ |
| `useIntlayer`   | キーで辞書を選択し、そのコンテンツを返します。   |
| `useDictionary` | キーで辞書を選択し、そのコンテンツを返します。   |
| `useLocale`     | 現在のロケールと、それを設定する関数を返します。 |
| `useI18n`       | 現在の Intlayer コンテキストの値を返します。     |

### 関数 (サーバーサイド)

| 関数                   | 説明                                                  |
| ---------------------- | ----------------------------------------------------- |
| `t`                    | Next.js App Router向けのサーバーサイド版の翻訳関数。  |
| `generateStaticParams` | Next.jsの動的ルート向けに静的パラメータを生成します。 |

### 型

| 型                   | 説明                                              |
| -------------------- | ------------------------------------------------- |
| `NextPageIntlayer`   | IntlayerをサポートするNext.jsページ向けの型。     |
| `NextLayoutIntlayer` | IntlayerをサポートするNext.jsレイアウト向けの型。 |
