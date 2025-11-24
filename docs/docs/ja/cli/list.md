---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: コンテンツ宣言ファイルの一覧表示
description: プロジェクト内のすべてのコンテンツ宣言ファイルを一覧表示する方法を学びます。
keywords:
  - 一覧表示
  - コンテンツ宣言
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
---

# コンテンツ宣言ファイルの一覧表示

```bash
npx intlayer content list
```

## エイリアス:

- `npx intlayer list`

このコマンドは、プロジェクト内のすべてのコンテンツ宣言ファイルを表示し、それらの辞書キーとファイルパスを示します。すべてのコンテンツファイルの概要を把握し、Intlayerによって正しく検出されているかを確認するのに役立ちます。

## 例:

```bash
npx intlayer content list
```

## 出力例:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

合計コンテンツ宣言ファイル数: 3
```

このコマンドは以下を出力します:

- すべてのコンテンツ宣言ファイルのキーと相対ファイルパスを含む整形されたリスト
- 発見されたコンテンツ宣言ファイルの合計数

この出力により、すべてのコンテンツファイルが正しく設定され、Intlayerシステムによって検出可能であることを確認できます。
