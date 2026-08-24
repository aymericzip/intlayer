---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionary 関数ドキュメント | intlayer
description: intlayer パッケージの getDictionary 関数の使用方法を参照してください
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "初期ドキュメント"
author: aymericzip
---

# ドキュメント: `intlayer` の `getDictionary` 関数

## Description

`getDictionary` 関数は、**自分で渡す辞書オブジェクト**を解釈し、指定されたロケールの解決されたコンテンツを返します。コンテンツを1回のパスで走査し、必要に応じて各インタープリタープラグインを適用し、`t()` 翻訳、列挙、条件、挿入、ネスト、markdown、HTML、ファイルノードを解決します。

生成されたレジストリでキーによって辞書を検索する [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayer.md) とは異なり、`getDictionary` は辞書自体を受け取ります。これにより、実行時に構築されたコンテンツ、API または CMS から取得されたコンテンツ、またはテストでインラインで宣言されたコンテンツの適切なツールになります。

**主な機能:**

- 辞書構造 (`{ key, content }`) に従う任意のオブジェクトで動作
- セレクターと共に修飾辞書グループ (コレクション、バリアント) も受け入れ
- 完全に型付け: 返されたオブジェクトは渡した `content` を反映
- カスタムインタープリタープラグインを受け入れ

---

## 関数署名

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // 必須
  localeOrSelector?: LocalesValues | DictionarySelector, // オプション
  plugins?: Plugins[]                                // オプション
): DeepTransformContent<...>
```

---

## パラメータ

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **説明**: 解釈する辞書（または qualified dictionary group）。
  - **型**: `Dictionary | QualifiedDictionaryGroup`
  - **必須**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **説明**: コンテンツを解釈するロケール、またはセレクターオブジェクト（`{ item }`、`{ variant }`、オプションで `locale`）。[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)を参照してください。
  - **型**: `LocalesValues | DictionarySelector`
  - **必須**: No (Optional) — 設定された `defaultLocale` にデフォルト設定されます。

- `plugins: Plugins[]`
  - **説明**: 認識されたノードがどのように解釈されるかを定義するノード変換器の配列。省略された場合は、デフォルトのインタープリタープラグインセットが使用されます。
  - **型**: `Plugins[]`
  - **必須**: No (Optional)

### Returns

- **Type**: 辞書の解釈されたコンテンツ。
- **Description**: 渡した `content` に対して、リクエストされたロケール用に全ての Intlayer ノードが解決されたもの。`item` セレクタのないコレクショングループの場合、解釈されたエントリの順序付き配列が返されます。セレクタが何もターゲットしない場合は `null` が返されます。

---

## 使用例

### 基本的な使い方

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        ja: "こんにちは",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "ja"
);

console.log(content.greeting); // "こんにちは"
```

### 実行時に取得したコンテンツの解釈

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### セレクタを使用する

```typescript
import { getDictionary } from "intlayer";

// 修飾されたdictionary groupは単一のentryに解決されます…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …または`item`が指定されない場合は順序付きarrayに解決されます
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## 関連する関数

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getIntlayer.md): 同じ解釈ですが、生成されたレジストリ内でキーで辞書を検索します。
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getDictionaryAsync.md): ロケール別ローダーマップの対応物。
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useDictionary.md): React フックの同等物で、プロバイダーからロケールを読み取ります。

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
