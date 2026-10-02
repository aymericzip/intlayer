---
createdAt: 2026-09-28
updatedAt: 2026-10-02
priority: 4
title: "グローバルな provider なしで Intlayer を使えますか？"
description: "provider をマウントせずに Intlayer のコンテンツを読む方法、サーバーとブラウザでのロケールの解決方法、provider との性能の違い。"
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - ロケール
  - パフォーマンス
  - ハイドレーション
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# グローバルな provider なしで Intlayer を使えますか？

はい。`getIntlayer` と `getDictionary` は provider を必要としない通常の関数で、`useIntlayer` も provider の外で動作します。

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // ロケールを渡していない
```

## どのロケールが使われますか？

明示的に渡したロケールが常に優先されます。それ以外の場合、ロケールは次の順序で解決されます。

1. **現在のリクエストのロケール**。サーバー上で Intlayer のインテグレーションがリクエストを処理している場合です: `express-intlayer`、`fastify-intlayer`、`hono-intlayer`、`adonis-intlayer`、`elysia-intlayer`、`remix-intlayer`、`astro-intlayer` の middleware、または React Server Components の `IntlayerProvider`。
2. **ブラウザに保存されたロケール**（cookie、`localStorage`、`sessionStorage`）。ロケールスイッチャーが保存するロケールです。
3. 設定の **`defaultLocale`**。

各リクエストは自身の cookies と headers から解決され、リクエスト専用のスコープに保持されます。異なるロケールを持つ同時アクセスのユーザー同士がロケールを共有することはありません。

同じ解決は `getDictionary`、[ビルド最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)によって書き換えられた呼び出し、そして provider の外でレンダリングされる `useIntlayer` と `useDictionaryDynamic` にも適用されます。

- [ビルド最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)

[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)（`number`、`date`、`list`…）とそのフック（`useNumber`、`useDate`、`useList`…）も、`locale` が渡されない場合は同じ順序に従います。

- [フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)

### Next.js の Server Components

Next.js では、リクエストのロケールは `headers()` と `cookies()` を通じて非同期でしか読めません。`next-intlayer/server` の `getLocale()` と同じようにそれを待つ [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayerAsync.md) を使ってください。

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // リクエストのロケール

  return { title };
};
```

headers を読むとルートは動的レンダリングに切り替わります。`IntlayerProvider` がすでにロケールを提供している場合、headers は読まれず、ルートは静的なままです。

## パフォーマンス: provider あり・なし

コンテンツは同じです。違いはリアクティビティとレンダリングコストにあります。

|                      | provider あり                                              | provider なし                                                                                                                             |
| -------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ロケールの切り替え   | リロードなしでコンポーネントがその場で再レンダリングされる | 何も再レンダリングされない。新しいロケールは次の呼び出しで反映（ナビゲーション、リロード）                                                |
| 読み取りのコスト     | context の参照とロケールの購読                             | メモ化された関数呼び出し。同じ `key + locale` には同じオブジェクト                                                                        |
| 切り替えのコスト     | すべての consumer の再レンダリング                         | なし                                                                                                                                      |
| サーバーレンダリング | サーバーとブラウザが同じロケールをレンダリング             | リクエストのインテグレーションの外では、サーバーが `defaultLocale`、ブラウザが保存済みロケールをレンダリング: hydration mismatch の可能性 |
| Bundle               | provider のコード                                          | 保存済みロケールの読み取りに約 100 バイト（gzip）。次の切り替えまでキャッシュ                                                             |

その場でロケールを切り替える、またはサーバーでレンダリングするインタラクティブなアプリでは provider を使い続けてください。バックエンド、スクリプト、URL からロケールを得る静的ページ（明示的に渡してください）、コンテンツを一度だけ読むコードでは provider なしで構いません。

詳しくは [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayer.md) を参照してください。

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayer.md)
