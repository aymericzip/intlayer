---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Next.jsにおけるi18nの静的レンダリングと動的レンダリングの比較
description: Next.jsでのi18nを用いた静的レンダリングと動的レンダリングの使い方を学びます。
keywords:
  - 静的
  - 動的
  - レンダリング
  - i18n
  - next.js
  - next-intl
  - intlayer
  - フレームワーク
  - ミドルウェア
  - 設定
slugs:
  - doc
  - faq
  - static-rendering
---

# Next.jsにおけるi18nの静的レンダリングと動的レンダリングの比較

## **next-intl**に関する問題

- **何が起こるのか？**
  i18nルーティングされたアプリ（`/en/…`、`/fr/…`）のサーバーコンポーネント内で`useTranslations`、`getTranslations`、または任意のnext-intlヘルパーを使用すると、Next.jsはそのルート全体を**動的**としてマークします。([Next Intl][1])

- **なぜか？**
  next-intlは、リクエスト専用ヘッダー（`x-next-intl-locale`）から`headers()`を介して現在のロケールを取得します。`headers()`は**動的API**であるため、それに触れるコンポーネントは静的最適化を失います。([Next Intl][1], [Next.js][2])

- **公式の回避策（ボイラープレート）**

  1. サポートされているすべてのロケールで`generateStaticParams`をエクスポートします。
  2. `useTranslations`を呼び出す**前に**、**すべての**レイアウト/ページで`setRequestLocale(locale)`を呼び出します。([Next Intl][1])
     これによりヘッダー依存がなくなりますが、追加のコード管理が必要になり、本番環境で不安定なAPIとなります。

## **intlayer**が問題を回避する方法

**設計上の選択**

1. **ルートパラメータのみ** – ロケールはNext.jsがすでに各ページに渡している`[locale]`のURLセグメントから取得されます。
2. **コンパイル時バンドル** – 翻訳は通常のESモジュールとしてインポートされるため、ツリーシェイクされビルド時に埋め込まれます。
3. **動的APIなし** – `useT()`は`headers()`や`cookies()`からではなく、Reactコンテキストから読み取ります。
4. **追加設定不要** – ページが`app/[locale]/`配下にあると、Next.jsはロケールごとに1つのHTMLファイルを自動的にプリレンダリングします。
