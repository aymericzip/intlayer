---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: 動的ディクショナリ
description: 柔軟でランタイム駆動のi18nコンテンツを構築するための、Intlayerの3つの動的ディクショナリ機能 — コレクション、バリアント、動的レコード — の概要。
keywords:
  - 動的ディクショナリ
  - コレクション
  - バリアント
  - 動的レコード
  - Intlayer
  - 国際化
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "動的ディクショナリ機能のリリース"
author: aymericzip
---

# 動的ディクショナリ

Intlayerは、キーごとに単一の静的ディクショナリを定義するだけでなく、それを超えたコンテンツを表現するための3つのメカニズムをサポートしています。それぞれ、コンテンツファイル内の**最上位メタデータフィールド**を介して宣言され、ラッパー関数は不要です。

| 機能                                                                                                                  | メタデータフィールド | `useIntlayer` でのセレクター |
| --------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------- |
| [コレクション](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/collections.md)     | `item: N`            | `{ item: N }`                |
| [バリアント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/variants.md)          | `variant: "name"`    | `{ variant: "name" }`        |
| [動的レコード](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }`    | `{ id, … }`                  |

3つのメカニズムすべてがロケール引数と連携し、`importMode` を介した選択的 / 遅延読み込みをサポートしています。

## 使い分け

- **コレクション** — 別ファイルで管理されるアイテムの順序付きリスト（FAQ項目、ブログ記事、商品など）。
- **バリアント** — A/Bテスト、季節限定のバナー、または機能フラグ（feature flags）用の、名前付きコンテンツ代替案。
- **動的レコード** — 不透明なIDを使用してランタイムに取得されるコンテンツ（CMSレコード、ユーザー固有のコピーなど）。

## セレクターの競合解決

1つのディクショナリに複数のセレクターが存在する場合、解決の優先順位は次のようになります：

```
variant → meta → item
```
