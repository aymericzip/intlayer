---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Intlayerコマンドのデバッグ
description: Intlayer CLIの問題をデバッグおよびトラブルシューティングする方法を学びます。
keywords:
  - デバッグ
  - トラブルシューティング
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Intlayerコマンドのデバッグ

## 1. **最新バージョンを使用していることを確認する**

以下を実行してください：

```bash packageManager="npm"
npx intlayer --version                  # 現在のローカルIntlayerバージョン
npx intlayer@latest --version           # 現在の最新Intlayerバージョン
```

```bash packageManager="yarn"
yarn intlayer --version                  # 現在のローカルIntlayerバージョン
yarn intlayer@latest --version           # 現在の最新Intlayerバージョン
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # 現在のローカルIntlayerバージョン
pnpm intlayer@latest --version           # 現在の最新Intlayerバージョン
```

```bash packageManager="bun"
bun x intlayer --version                  # 現在のローカルIntlayerバージョン
bun x intlayer@latest --version           # 現在の最新Intlayerバージョン
```

## 2. **コマンドが登録されているか確認する**

以下で確認できます：

```bash packageManager="npm"
npx intlayer --help                     # 利用可能なコマンド一覧と使用情報を表示
npx intlayer dictionary build --help    # コマンドの利用可能なオプション一覧を表示
```

```bash packageManager="yarn"
yarn intlayer --help                     # 利用可能なコマンド一覧と使用情報を表示
yarn intlayer dictionary build --help    # コマンドの利用可能なオプション一覧を表示
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # 利用可能なコマンド一覧と使用情報を表示
pnpm intlayer dictionary build --help    # コマンドの利用可能なオプション一覧を表示
```

```bash packageManager="bun"
bun x intlayer --help                     # 利用可能なコマンド一覧と使用情報を表示
bun x intlayer dictionary build --help    # コマンドの利用可能なオプション一覧を表示
```

## 3. **ターミナルを再起動する**

新しいコマンドを認識させるために、ターミナルの再起動が必要な場合があります。

## 4. **npxキャッシュをクリアする（古いバージョンに固まっている場合）**

```bash
npx clear-npx-cache
```
