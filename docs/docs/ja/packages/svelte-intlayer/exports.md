---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: svelte-intlayer パッケージのドキュメント
description: Svelte向けのIntlayer統合。Svelteアプリケーション向けのセットアップ関数とストアを提供します。
keywords:
  - svelte-intlayer
  - svelte
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートのドキュメントを統合
---

# svelte-intlayer パッケージ

` svelte-intlayer` パッケージは、Intlayer を Svelte アプリケーションに統合するために必要なツールを提供します。多言語コンテンツを扱うためのセットアップ関数とストアが含まれます。

## インストール

```bash
npm install svelte-intlayer
```

## エクスポート

### セットアップ

インポート:

```tsx
import "svelte-intlayer";
```

| 関数            | 説明                                                              |
| --------------- | ----------------------------------------------------------------- |
| `setupIntlayer` | Svelte アプリケーションで Intlayer をセットアップするための関数。 |

### ストア

インポート:

```tsx
import "svelte-intlayer";
```

| ストア          | 説明                                             |
| --------------- | ------------------------------------------------ |
| `intlayerStore` | 現在の Intlayer の状態を保持する Svelte ストア。 |

### フック（コンテキスト）

インポート:

```tsx
import "svelte-intlayer";
```

| 関数                   | 説明                                                                                                                     | 関連ドキュメント                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | `useDictionary` をベースにしており、生成された宣言から辞書の最適化されたバージョンを注入します。                         | -                                                                                                                        |
| `useDictionary`        | 辞書のようなオブジェクト（key、content）を処理します。`t()` の翻訳、列挙などを処理します。                               | -                                                                                                                        |
| `useDictionaryAsync`   | `useDictionary` と同じですが、非同期の辞書を扱います。                                                                   | -                                                                                                                        |
| `useDictionaryDynamic` | `useDictionary` と同じですが、動的な辞書を扱います。                                                                     | -                                                                                                                        |
| `useLocale`            | 現在のロケールとそれを設定する関数を返します。                                                                           | -                                                                                                                        |
| `useRewriteURL`        | URLの書き換えを管理するクライアントサイド関数。ローカライズされた書き換えルールが存在する場合は自動的にURLを更新します。 | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | 現在のロケールのためのIntlオブジェクトを返します。                                                                       | -                                                                                                                        |

### マークダウン

インポート:

```tsx
import "svelte-intlayer";
```

| 関数                  | 説明                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| `setIntlayerMarkdown` | Svelteアプリケーション内でMarkdownコンテキストを設定するための関数。 |
