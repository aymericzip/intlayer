---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionaryAsync 関数ドキュメント | intlayer
description: intlayer パッケージの getDictionaryAsync 関数の使用方法を確認してください
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "初期ドキュメント"
author: aymericzip
---

# Documentation: `getDictionaryAsync` Function in `intlayer`

## Description

`getDictionaryAsync` 関数は、辞書の**単一ロケールチャンク**を読み込み、その解釈されたコンテンツを返します。

これは `.intlayer/dynamic_dictionaries/` で生成されるロケール単位のローダーマップに対する [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getDictionary.md) の対応物です。すべてのロケールを保持する辞書を受け取る代わりに、ローダーマップを受け取り、要求されたロケールが必要とするチャンクだけを待ちます。

> アプリケーションコードでは通常、この関数ではなく [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayerAsync.md) を呼び出します。[ビルドプラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md) は、すべての `getIntlayerAsync('key', locale)` 呼び出しを `getDictionaryAsync(loaderMap, 'key', locale)` の呼び出しに書き換えます。`getDictionaryAsync` はカスタムローダーと独自のローダーマップを構築するツールのためにエクスポートされています。

**主な機能:**

- 要求されたロケールチャンクのみを読み込みます
- プレーン (`locale → loader`) と修飾済み (`locale → qualifierId → loader`) ローダーマップをサポートしています
- 同じチャンクの同時読み込みを重複排除し、解決されたコンテンツをキャッシュします
- 失敗した読み込みはキャッシュから削除されるため、後の呼び出しがチャンクを再試行します

---

## 関数シグネチャ

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // 必須
  key: string,                                           // 必須
  localeOrSelector?: LocalesValues | DictionarySelector, // オプション
  plugins?: Plugins[]                                    // オプション
): Promise<DeepTransformContent<...>>
```

---

## パラメータ

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **説明**: ロケールごとのloader map。プレーンmapはロケールをloaderに関連付けます。qualified mapは（collectionsとvariantsで使用）ロケールをqualifier idに関連付け、その後loaderに関連付けます。qualified mapの場合、selectorが対象とするchunk（複数可）のみが読み込まれます。
  - **型**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **必須**: はい

- `key: string`
  - **説明**: dictionary key。chunk cacheの名前空間化に使用されます。
  - **型**: `string`
  - **必須**: はい

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **説明**: コンテンツを解釈するロケール、またはselectorオブジェクト（`{ item }`、`{ variant }`、オプションで`locale`）。[dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)を参照してください。
  - **型**: `LocalesValues | DictionarySelector`
  - **必須**: いいえ（オプション）— 設定された`defaultLocale`がデフォルトです。

- `plugins: Plugins[]`
  - **説明**: Nodetransformers。デフォルトではbase interpreter setです。
  - **型**: `Plugins[]`
  - **必須**: いいえ（オプション）

### Returns

- **Type**: `Promise<Content>` — 読み込まれたチャンクの解釈されたコンテンツに解決されるプロミス。
- **Description**: マップが要求されたロケール、またはそのフォールバックのいずれに対してもチャンクを出さない場合、`null` に解決されます。これは、欠落した適格な座標がどのように解決されるかを反映しています。

---

## 使用例

### 生成されたローダーマップを使用する

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### カスタムローダーマップを使用する

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### 修飾されたマップ上のセレクターを使用

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## 動作に関する注釈

### キャッシングと重複排除

キャッシュは各 `key + locale + selector` トリプルの **promise** を保存するため、同じチャンクに対する同時呼び出しは単一の load を待機します。拒否された load はキャッシュから削除されるため、失敗したチャンクは同じ失敗を永遠に再生するのではなく、次の呼び出しで再試行されます。

### ロケールフォールバック

プレーンローダーマップは、同期モードと同じフォールバックチェーンに従って処理されます。リクエストされたロケールが最初に処理され、次にそのフォールバック、そしてどのフォールバックもチャンクを出力しなかった場合は `null` が処理されます。

---

## 関連する関数

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayerAsync.md): アプリケーションが呼び出す関数。ビルドプラグインはこれを `getDictionaryAsync` に書き換えます。
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getDictionary.md): 完全な辞書を取得する同期的な対応関数。
- [Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md): コレクションとバリアント、およびそれらが生成するローダーマップ。

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
