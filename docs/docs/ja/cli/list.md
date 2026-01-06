---
createdAt: 2024-08-11
updatedAt: 2026-01-06
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
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: listコマンドに絶対パス出力オプションを追加
  - version: 7.5.11
    date: 2026-01-06
    changes: listコマンドにJSON出力オプションを追加
---

# コンテンツ宣言ファイルの一覧表示

```bash
npx intlayer content list
```

## エイリアス:

- `npx intlayer list`

このコマンドは、プロジェクト内のすべてのコンテンツ宣言ファイルを表示し、それらの辞書キーとファイルパスを示します。すべてのコンテンツファイルの概要を把握し、Intlayerによって正しく検出されているかを確認するのに役立ちます。

## 引数:

- **`--json`**: 結果をフォーマットされたテキストではなくJSONとして出力します。スクリプト作成やプログラムからのアクセスに便利です。

  > 例: `npx intlayer content list --json`

## 例:

### コンテンツ宣言ファイルの一覧表示:

```bash
npx intlayer content list
```

### JSONとして出力:

```bash
npx intlayer content list --json
```

### 絶対パスとして出力:

```bash
npx intlayer content list --absolute
```

## 出力例:

### フォーマットされた出力:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

合計コンテンツ宣言ファイル数: 3
```

### JSON出力:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

このコマンドは以下を出力します:

- すべてのコンテンツ宣言ファイルのキーと相対ファイルパスを含む整形されたリスト
- 発見されたコンテンツ宣言ファイルの合計数

この出力により、すべてのコンテンツファイルが正しく設定され、Intlayerシステムによって検出可能であることを確認できます。
