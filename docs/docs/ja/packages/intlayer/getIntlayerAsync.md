---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayerAsync Function Documentation | intlayer
description: getIntlayer パッケージの getIntlayerAsync 関数の使用方法を確認する
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# ドキュメント: `intlayer` の `getIntlayerAsync` 関数

## 説明

`getIntlayerAsync` 関数は辞書をキーで選択し、与えられたロケールに対してそのコンテンツを解決します。**そのロケールのみを読み込みます**。

これは [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayer.md) の非同期対応であり、ルート `head` / メタデータビルダー、ローダー、サーバー関数など、レンダリング外で辞書が読み込まれる場所を対象としています。

`getIntlayer` がすべてのロケールを保持するマージされた辞書を取得する場合、[ビルドプラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)（`@intlayer/babel`、`@intlayer/swc`）はこの呼び出しを `getDictionaryAsync(loaderMap, key, locale)` に書き換え、`.intlayer/dynamic_dictionaries/` のロケール別チャンクを指すようにします。したがって、バンドルには実際にリクエストされたロケールのみが含まれます。

これらのプラグインがない場合（最適化されていないビルド）、呼び出しは同期辞書レジストリを通じて解決されます。ロケール別に分割されていない同じコンテンツです。

**主な機能：**

- `getIntlayer` と同じ型付きキー、セレクター、および返されたコンテンツ
- 最適化されたビルドで要求されたロケールチャンクのみを読み込む
- 同じチャンクへの並行呼び出しは単一の読み込みを共有
- `async` メタデータビルダー、ローダー、サーバー関数での使用が安全

---

## 関数シグネチャ

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // 必須
  localeOrSelector?: LocalesValues | DictionarySelector, // オプション
  plugins?: Plugins[]                         // オプション
): Promise<DeepTransformContent<...>>
```

---

## パラメータ

- `key: DictionaryKeys`
  - **説明**: コンテンツファイルで宣言されたとおりの辞書キー。
  - **型**: `DictionaryKeys` — すべての宣言された辞書キーの Union。
  - **必須**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **説明**: コンテンツを解釈するロケール、または[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)のセレクタオブジェクト。
    - `'fr'` — ロケール
    - `{ item: 2 }` — [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/collections.md)アイテム（すべてのアイテムを配列として取得するには`item`を省略）
    - `{ variant: 'black-friday' }` — 名前付き[variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/variants.md)（`default`を使用するには省略）
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — 構造化された variant
    - 任意のセレクタがロケールを持つ可能性: `{ item: 2, locale: 'fr' }`
  - **型**: `LocalesValues | DictionarySelector`
  - **必須**: No (オプション) — 設定された `defaultLocale` がデフォルト。

- `plugins: Plugins[]`
  - **説明**: 基本インタープリタプラグインを置き換えるカスタムノード トランスフォーマー。高度な使用のみ。
  - **型**: `Plugins[]`
  - **必須**: No (オプション)

### Returns

- **Type**: `Promise<Content>` — 辞書の解釈されたコンテンツに解決する promise。型は宣言から取得されます。

---

## 使用例

### 基本的な使用法

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

### TanStack Start route の `head` 内で

locale チャンクはオンデマンドで読み込まれるため、`head` は `async` になります:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayerAsync } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale } = params;

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

### Next.js の `generateMetadata` で

```tsx fileName="src/app/[locale]/page.tsx"
import { getIntlayerAsync } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description } = await getIntlayerAsync(
    "page-metadata",
    locale
  );

  return { title, description };
};
```

### サーバー関数内

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getCookie, getIntlayerAsync, getLocale } from "intlayer";

export const getLocalizedContent = createServerFn().handler(async () => {
  const locale = await getLocale({
    getCookie: (name) => getCookie(name, getRequestHeader("cookie")),
    getHeader: (name) => getRequestHeader(name),
  });

  const content = await getIntlayerAsync("app", locale);

  return { locale, content };
});
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Returns            | コンテンツ                                                                                                      | コンテンツのPromise                               |
| Dictionary loaded  | マージされたディクショナリ（すべてのロケール）                                                                  | リクエストされたロケールのチャンクのみ            |
| Best suited for    | レンダリング、同期コードパス                                                                                    | メタデータ、ローダー、サーバー関数                |
| Requires a plugin? | No                                                                                                              | No — per-locale splitはビルドプラグインが必要です |

両方とも同じ引数を受け入れ、同じコンテンツを返します。一方から他方に切り替えることで変わるのは、**いつ**と**どの程度**のロードが行われるかだけです。

---

## 関連する関数

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayer.md): マージされた辞書を読む同期的な同等物。
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getDictionaryAsync.md): ビルドプラグインがこの呼び出しを書き換える低レベルの関数。
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocale.md): 受信リクエストのロケールを検出します。

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
