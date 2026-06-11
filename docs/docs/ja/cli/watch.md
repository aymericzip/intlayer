---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 辞書の監視
description: コンテンツ宣言ファイルの変更を監視し、自動的に辞書をビルドする方法を学びます。
keywords:
  - 監視
  - 辞書
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# 辞書の監視

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

このコマンドは、コンテンツ宣言ファイルの変更を監視し、`.intlayer` ディレクトリ内に辞書をビルドします。
このコマンドは `npx intlayer build --watch --skip-prepare` と同等です。

## エイリアス:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## 引数:

- **`--with`**: 監視と並行してコマンドを開始します。

> 例: `npx intlayer watch --with "next dev --turbopack"`
