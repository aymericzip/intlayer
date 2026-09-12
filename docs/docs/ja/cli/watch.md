---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
author: aymericzip
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

- **`--ci`**: モノレポ内のすべての Intlayer プロジェクトでコマンドを実行します（プロジェクトディレクトリ内から実行した場合はそのプロジェクトのみ）。プロジェクトごとの資格情報は、プロジェクトパスを `{ "clientId", "clientSecret" }` に対応付ける JSON オブジェクト `INTLAYER_PROJECT_CREDENTIALS` から挿入できます。

> 例: `npx intlayer watch --ci`
