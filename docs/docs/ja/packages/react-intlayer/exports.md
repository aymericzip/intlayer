---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-intlayer パッケージのドキュメント
description: React アプリケーション向けのフックとプロバイダーを提供する、Intlayer の React 専用実装。
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: 全エクスポートのドキュメントを統一
---

# react-intlayer パッケージ

`react-intlayer` パッケージは、Intlayer を React アプリケーションに統合するために必要なツールを提供します。多言語コンテンツを扱うためのコンテキストプロバイダー、フック、およびコンポーネントを含みます。

## インストール

```bash
npm install react-intlayer
```

## エクスポート

### プロバイダー

インポート:

```tsx
import "react-intlayer";
```

| コンポーネント            | 説明                                                                                                                           | 関連ドキュメント                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | アプリケーションをラップし Intlayer コンテキストを提供するメインプロバイダー。デフォルトでエディターサポートを含みます。       | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | エディター機能を含まない、コンテンツに特化したプロバイダーコンポーネント。ビジュアルエディターが不要な場合に使用してください。 | -                                                                                                                             |
| `HTMLProvider`            | HTML関連の国際化設定のプロバイダー。HTMLタグのコンポーネントをオーバーライドできます。                                         | -                                                                                                                             |

### フック

インポート:

```tsx
import "react-intlayer";
```

| フック | 説明 | 関連ドキュメント |
| `useIntlayer` | クライアントサイドのフックで、キーで辞書を選択してその内容を返します。指定がなければコンテキストのロケールを使用します。 | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md) |
| `useDictionary` | 辞書オブジェクトを変換し、現在のロケール向けのコンテンツを返すフック。`t()` の翻訳、列挙型（enums）などを処理します。 | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync` | 非同期の辞書を扱うフック。Promise ベースの辞書マップを受け取り、現在のロケール向けに解決します。 | - |
| `useDictionaryDynamic` | キーでロードされる動的な辞書を扱うフック。内部で React Suspense を使用してロード状態を処理します。 | - |
| `useLocale` | クライアントサイドのフック。現在のロケール、デフォルトロケール、利用可能なロケール、およびロケールを更新する関数を取得します。 | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md) |
| `useLocaleBase` | コンテキストから現在のロケールと関連するすべてのフィールド（locale、defaultLocale、availableLocales、setLocale）を取得するフック。 | - |
| `useRewriteURL` | URL書き換えを管理するクライアントサイドのフック。現在のパス名とロケールに対する書き換えルールが存在する場合、URLを更新します。 | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useRewriteURL.md) |
| `useI18n` | フック。キーでネストされたコンテンツにアクセスするための翻訳関数 `t()` を提供します。i18next/next-intl のパターンを模倣しています。 | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useI18n.md) |
| `useIntl` | フック。ロケールに結びついた `Intl` オブジェクトを提供します。現在のロケールを自動で注入し、最適化されたキャッシュを使用します。 | - |
| `useLocaleStorage` | ローカルストレージまたはクッキーで locale の永続化を提供するフック。getter と setter 関数を返します。 | - |
| `useLocaleCookie` | 非推奨。代わりに `useLocaleStorage` を使用してください。クッキーで locale の永続化を管理するフック。 | - |
| `useLoadDynamic` | React Suspenseを使用して動的辞書を読み込むためのフック。キーとPromiseを受け取り、結果をキャッシュします。 | - |
| `useIntlayerContext` | 現在の Intlayer クライアントのコンテキスト値（locale、setLocale など）を提供するフック。 | - |
| `useHTMLContext` | HTMLProvider コンテキストから HTML コンポーネントのオーバーライドにアクセスするフック。 | - |

### 関数

インポート:

```tsx
import "react-intlayer";
```

| 関数                 | 説明                                                                                                                                           | 関連ドキュメント                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `t`                  | クライアントサイドの翻訳関数。与えられた多言語コンテンツの翻訳を返します。ロケールが指定されていない場合はコンテキストのロケールを使用します。 | [翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md) |
| `getDictionary`      | 辞書オブジェクトを処理し、指定したロケールのコンテンツを返します。`t()` 翻訳、列挙型、markdown、HTML などを処理します。                        | -                                                                                               |
| `getIntlayer`        | 生成された宣言からキーで辞書を取得し、指定したロケールのコンテンツを返します。`getDictionary` の最適化バージョン。                             | -                                                                                               |
| `setLocaleInStorage` | ストレージ（local storage または cookie、設定に基づく）にロケールを設定します。                                                                | -                                                                                               |
| `setLocaleCookie`    | 非推奨。代わりに `setLocaleInStorage` を使用してください。cookie にロケールを設定します。                                                      | -                                                                                               |
| `localeInStorage`    | ストレージ（ローカルストレージまたはクッキー）からロケールを取得します。                                                                       | -                                                                                               |
| `localeCookie`       | 非推奨。代わりに `localeInStorage` を使用してください。クッキーからロケールを取得します。                                                      | -                                                                                               |

### コンポーネント

インポート:

```tsx
import "react-intlayer";
```

or

```tsx
import "react-intlayer/markdown";
```

| コンポーネント     | 説明                                                                                                                             | 関連ドキュメント                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Markdownレンダリングコンテキストのプロバイダー。Markdown要素のカスタムコンポーネント上書きを可能にします。                       | -                                                                                                                             |
| `MarkdownRenderer` | カスタムコンポーネントを使用してMarkdownコンテンツをレンダリングします。標準のMarkdown機能とIntlayer固有の構文をサポートします。 | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/MarkdownRenderer.md) |

### 型

インポート:

```tsx
import "react-intlayer";
```

| 型             | 説明                                                                                |
| -------------- | ----------------------------------------------------------------------------------- |
| `IntlayerNode` | Intlayer コンテンツツリー内のノードを表す型。型安全なコンテンツ操作に使用されます。 |

### サーバーサイド (react-intlayer/server)

インポート:

```tsx
import "react-intlayer/server";
```

| エクスポート             | 型          | 説明                                            |
| ------------------------ | ----------- | ----------------------------------------------- |
| `IntlayerServerProvider` | `Component` | サーバーサイドレンダリング用のProvider。        |
| `IntlayerServer`         | `Component` | Intlayer コンテンツのサーバーサイド用ラッパー。 |
| `t`                      | `Function`  | 翻訳関数のサーバーサイド版。                    |
| `useLocale`              | `Hook`      | サーバー側で locale にアクセスするための Hook。 |
| `useIntlayer`            | `Hook`      | `useIntlayer` のサーバー側バージョン。          |
| `useDictionary`          | `Hook`      | `useDictionary` のサーバー側バージョン。        |
| `useI18n`                | `Hook`      | `useI18n` のサーバー側バージョン。              |
| `locale`                 | `Function`  | サーバー上でロケールを取得または設定する関数。  |
