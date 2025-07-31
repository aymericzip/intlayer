---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 不明なコマンド
description: 不明なコマンドエラーの修正方法を学ぶ。
keywords:
  - 不明
  - コマンド
  - エラー
  - intlayer
  - fill
  - build
  - verbose
  - ターミナル
  - 再起動
  - ローカル
slugs:
  - doc
  - faq
  - unknown-command
---

# エラー: 不明なコマンド fill / build / その他

`npx intlayer fill --verbose` を実行して以下のように表示される場合：

```
error: unknown command 'fill'
```

しかし `fill` コマンドが _存在するはず_ だと確信している場合、以下の手順で解決してください：

## 1. **最新バージョンを使用していることを確認する**

以下を実行します：

```bash
npx intlayer --version                  # 現在のローカルの intlayer バージョン
npx intlayer@latest --version           # 現在の最新 intlayer バージョン
```

これにより `npx` は最新バージョンを取得します。次に再度試してください：

```bash
npx intlayer@latest build --verbose
```

## 2. **コマンドが登録されているか確認する**

以下で確認できます：

```bash
npx intlayer --help                     # コマンドに関する情報を提供
```

コマンド一覧に該当のコマンドが表示されるか確認してください。

リポジトリに移動し、コマンドがエクスポートされてCLIのエントリーポイントに登録されていることを確認してください。Intlayerは `commander` フレームワークを使用しています。

CLIに関するコード：
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **ターミナルを再起動する**

新しいコマンドを認識させるために、ターミナルの再起動が必要な場合があります。

## 5. **`intlayer` を開発している場合は再ビルドしてリンクする**

ローカルで `intlayer` を開発している場合：

```bash
# intlayer ディレクトリ内で
npm install
npm run build
npm link
```

別のターミナルで：

```bash
intlayer fill --verbose
```

これは、あなたが作業しているローカルバージョンを使用します。

## 6. **npx キャッシュをクリアする（古いバージョンに固まっている場合）**

```bash
npx clear-npx-cache
```

または、キャッシュされた intlayer パッケージを手動で削除します：

```bash
rm -rf ~/.npm/_npx
```

pnpm、yarn、bun、または他のパッケージマネージャーを使用している場合は、それに相当する方法を確認してください。
