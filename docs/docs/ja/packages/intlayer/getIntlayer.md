---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayer Function Documentation | intlayer
description: intlayer パッケージの getIntlayer 関数を使用する方法を参照してください
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "初期ドキュメント"
author: aymericzip
---

# Documentation: `intlayer` の `getIntlayer` 関数

## Description

`getIntlayer` 関数は、キーによって1つの辞書を選択し、指定されたロケールで解釈されたコンテンツを返します。これは `useIntlayer` フックのフレームワーク非依存の対応物です：同じコンテンツ、同じセレクタですが、React コンテキストが利用できない場所ならどこでも使用可能です — Node スクリプト、サーバー関数、ルートローダー、メタデータビルダー、Express/Fastify ハンドラ、テスト。

Intlayer によって `.intlayer/` に生成された辞書を読み込むため、`key` 引数は型付けされており、独自のコンテンツ宣言から自動補完されます。返されるオブジェクトは各リーフまで完全に型付けされています。

**主な機能：**

- 型付けされた辞書キーと型付けされた返されたコンテンツ
- すべてのコンテンツノードを解釈（`t()`、`enu()`、`cond()`、`insert()`、`nest()`、`md()`、`html()`、`file()`、`gender()`）
- ロケールまたはセレクタオブジェクト（collections、variants）を受け入れる
- 結果は `key + locale + selector` ごとにメモ化される
- 開発時に辞書が見つからない場合、クラッシュする代わりに安全なプロキシにフォールバックする

---

## 関数シグネチャ

```typescript
getIntlayer(
  key: DictionaryKeys,                        // 必須
  localeOrSelector?: LocalesValues | DictionarySelector, // オプション
  plugins?: Plugins[]                         // オプション
): DeepTransformContent<...>
```

---

## パラメータ

- `key: DictionaryKeys`
  - **説明**: コンテンツファイルで宣言されている、読み取る辞書のキー。
  - **型**: `DictionaryKeys` — すべての宣言された辞書キーの共用体。
  - **必須**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **説明**: コンテンツを解釈するロケール、または[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)のセレクタオブジェクト。
    - `'fr'` — ロケール
    - `{ item: 2 }` — [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/collections.md)アイテム（すべてのアイテムを配列として取得するには`item`を省略）
    - `{ variant: 'black-friday' }` — 名前付き[variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/variants.md)（`default`の場合は省略）
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — 構造化variant
    - すべてのセレクタはロケールを持つことができます: `{ item: 2, locale: 'fr' }`
  - **型**: `LocalesValues | DictionarySelector`
  - **必須**: No (Optional) — デフォルトは設定された`defaultLocale`。

- `plugins: Plugins[]`
  - **説明**: ベースインタープリタプラグインを置き換えるカスタムノードトランスフォーマー。高度な使用のみ；デフォルトの動作を保つには省略してください。
  - **型**: `Plugins[]`
  - **必須**: No (Optional)

### 戻り値

- **Type**: 宣言から型付けされた、辞書の解釈されたコンテンツ。
- **Description**: 辞書の `content` フィールドをミラーリングしたプレーンオブジェクト。すべての Intlayer ノードが要求されたロケールの最終値に解決されます。

---

## 使用例

### 基本的な使用法

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      ja: "こんにちは",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### ロケールなし

ロケールを省略すると、コンテンツは[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で宣言された `defaultLocale` で解釈されます。

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // デフォルトロケールで解釈されます
```

### サーバーハンドラー内

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### セレクタ付き (コレクションとバリアント)

```typescript
import { getIntlayer } from "intlayer";

// 単一のコレクション項目
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// コレクションのすべての項目を順序付き配列として取得
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// 名前付きバリアント
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## 動作に関する注記

### キャッシング

結果は `key + locale + selector` をキーとするモジュールレベルのキャッシュにメモ化されます。`getIntlayer("app", "fr")` を繰り返し呼び出すと、辞書は一度だけ解釈され、その後は同じオブジェクトが返されます。

### 欠落している辞書

開発中に、生成された辞書がないキーをリクエストすると、警告が1回ログされ、安全なフォールバックプロキシが返されます。`content.title`を読み取ると、エラーをスローする代わりに文字列`"app.title"`が返されます。これにより、欠落している宣言が修正されている間、ページを使用可能な状態に保つことができます。Intlayerビルド（またはdevサーバー）を実行して、辞書を生成します。

### バンドルサイズ

`getIntlayer` は、**すべての**ロケールを保持するマージされた辞書を読み込みます。クライアントバンドルでは、[ビルドプラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)が呼び出しを書き換え、必要なコンテンツのみがシップされます。レンダリング外でコンテンツを読み込む場合（メタデータ、ローダー、サーバー関数）で、単一のロケールをオンデマンドで読み込みたい場合は、代わりに[`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayerAsync.md)を使用してください。

---

## 関連関数

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayerAsync.md): 単一のlocaleチャンクをロードするAsync版。
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getDictionary.md): キーで検索する代わりに、自分で渡すdictionaryオブジェクトを解釈する。
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md): React hookの同等版で、providerからlocaleを読み取る。

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
