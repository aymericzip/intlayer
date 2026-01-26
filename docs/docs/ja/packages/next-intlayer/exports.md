---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer パッケージ ドキュメント
description: App Router と Page Router 向けのミドルウェアおよびプロバイダーを提供する、Intlayer の Next.js 専用統合パッケージ。
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートに関するドキュメントを統一
---

# next-intlayer パッケージ

`next-intlayer` パッケージは、Intlayer を Next.js アプリケーションに統合するための必要なツールを提供します。App Router と Page Router の両方をサポートし、ロケールベースのルーティング用ミドルウェアも含まれます。

## インストール

```bash
npm install next-intlayer
```

## エクスポート

### ミドルウェア

インポート:

```tsx
import "next-intlayer/middleware";
```

| 関数                 | 説明                                                                                                                                                               | 関連ドキュメント                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js のミドルウェアで、ロケールに基づくルーティングとリダイレクトを処理します。ヘッダーやクッキーからロケールを検出し、適切なロケールパスへリダイレクトします。 | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/intlayerMiddleware.md) |

### 設定ヘルパー

インポート:

```tsx
import "next-intlayer/server";
```

| 関数               | 説明                                                                                                                                                              | 関連ドキュメント |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `withIntlayer`     | Intlayer の辞書をビルド前に準備することを保証しながら、Next.js の設定をラップする非同期ヘルパー。コンテンツファイルを準備し、webpack/SWC プラグインを設定します。 | -                |
| `withIntlayerSync` | 非同期が使用できない/望ましくない設定に最適な、Next.js の設定をラップする同期ヘルパー。サーバー起動時に辞書を準備しません。                                       | -                |

### プロバイダー

インポート:

```tsx
import "next-intlayer";
```

または

```tsx
import "next-intlayer/server";
```

| コンポーネント           | 説明                                                                                                                     | 関連ドキュメント |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `IntlayerClientProvider` | Next.js App Router のクライアント側コンポーネント用プロバイダー。`react-intlayer` の `IntlayerProvider` をラップします。 | -                |
| `IntlayerServerProvider` | Next.js（App Router）のサーバー側コンポーネント用プロバイダー。サーバー上でロケールコンテキストを提供します。            | -                |
| `IntlayerServer`         | App Router における Intlayer コンテンツのサーバー側ラッパー。サーバーコンポーネントでの適切なロケール処理を保証します。  | -                |

### フック（クライアント側）

インポート:

```tsx
import "next-intlayer";
```

`react-intlayer` からほとんどのフックを再エクスポートします。

| フック                 | 説明                                                                                                                                        | 関連ドキュメント                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | キーで辞書を選択してその内容を返すクライアントサイドのフック。ロケールが指定されていない場合はコンテキストからlocaleを使用します。          | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | 辞書オブジェクトを変換し、現在のlocale向けの内容を返すフック。`t()`翻訳、列挙（enumerations）などを処理します。                             | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | 非同期辞書を扱うフック。Promiseベースの辞書マップを受け取り、現在のロケール向けに解決します。                                               | -                                                                                                                       |
| `useDictionaryDynamic` | キーで読み込まれる動的辞書を扱うフック。読み込み状態のために内部で React Suspense を使用します。                                            | -                                                                                                                       |
| `useLocale`            | 現在のロケールを取得し、それを設定する関数を返すクライアントサイドフック。Next.js App Router 向けにナビゲーション対応で拡張されています。   | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | URL のリライトを管理するクライアントサイドフック。より見栄えの良いローカライズされたリライトルールが存在する場合に自動で URL を更新します。 | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Next.js の Page Router 用のロケール管理フック。ロケール変更時のリダイレクトやページ再読み込みを処理します。                                 | -                                                                                                                       |
| `useI18n`              | キーでネストされたコンテンツにアクセスするための翻訳関数 `t()` を提供するフック。i18next/next-intl のパターンに似ています。                 | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | ロケールにバインドされた `Intl` オブジェクトを提供するフック。現在のロケールを自動的に注入し、最適化されたキャッシュを使用します。          | -                                                                                                                       |
| `useLoadDynamic`       | React Suspense を使用して動的な辞書を読み込むフック。キーと Promise を受け取り、結果をキャッシュします。                                    | -                                                                                                                       |

### 関数（サーバーサイド）

インポート:

```tsx
import "next-intlayer/server";
```

| 関数                   | 説明                                                                                                                                            | 関連ドキュメント                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                    | Next.js App Router向けのサーバーサイド版の翻訳関数。サーバーロケールに対する多言語コンテンツの翻訳を返します。                                  | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md) |
| `getLocale`            | Next.jsのヘッダーとクッキーから現在のロケールを抽出するヘルパー関数。Server Components、Server Actions、Route Handlers向けに設計されています。  | -                                                                                                      |
| `generateStaticParams` | 設定されたロケールに基づいて Next.js の動的ルートのための静的パラメータを生成します。プリレンダリング用のロケールオブジェクトの配列を返します。 | -                                                                                                      |
| `locale`               | サーバーコンテキスト（App Router）でロケールを取得または設定する関数。サーバーコンポーネントでのロケール管理を提供します。                      | -                                                                                                      |

### 型

Import:

```tsx
import "next-intlayer";
```

| 型                     | 説明                                                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Intlayerサポート付きNext.jsのページ向けの型。localeパラメータを含むジェネリック型。                                    |
| `Next14PageIntlayer`   | Intlayerサポート付きNext.js 14のページ向けの型。                                                                       |
| `Next15PageIntlayer`   | Intlayerサポート付きNext.js 15のページ向けの型。                                                                       |
| `NextLayoutIntlayer`   | Intlayerサポート付きNext.jsのレイアウト向けの型。localeパラメータを含むジェネリック型。                                |
| `Next14LayoutIntlayer` | Intlayer をサポートする Next.js 14 のレイアウト用の型。                                                                |
| `Next15LayoutIntlayer` | Intlayer をサポートする Next.js 15 のレイアウト用の型。                                                                |
| `LocalParams`          | ロケールを含む Next.js のルートパラメータ用の型。`locale` プロパティを持つオブジェクト。                               |
| `LocalPromiseParams`   | ロケールを含む Next.js のルートパラメータ用の型（非同期版）。`locale` プロパティを持つオブジェクトに解決する Promise。 |
