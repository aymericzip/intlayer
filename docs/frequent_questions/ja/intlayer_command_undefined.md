---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Intlayer コマンドが未定義
description: intlayer コマンド未定義エラーの修正方法を学びます。
keywords:
  - intlayer
  - コマンド
  - 未定義
  - エラー
  - vscode
  - 拡張機能
  - プラグイン
  - フレームワーク
  - next.js
  - vite
slugs:
  - doc
  - faq
  - intlayer-command-undefined
---

# Intlayer コマンドが未定義

## 概要

Intlayer CLI は、辞書の構築や翻訳のプッシュなど、intlayer コンテンツを便利に管理する方法を提供します。しかし、プロジェクトの動作に必須ではありません。Next.js 向けの `withIntlayer()` や Vite 向けの `intlayer()` のようなバンドラープラグインを使用している場合、Intlayer はアプリのビルド時や開発サーバーの起動時に自動的に辞書を構築します。開発モードでは、変更を監視し、コンテンツ宣言ファイルを自動的に再構築します。

intlayer コマンドには以下の方法でアクセスできます：

- `intlayer` CLI コマンドを直接使用する
- [VSCode 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md) を使用する
- `@intlayer/cli` SDK を使用する

## 問題

`intlayer` コマンドを使用しようとすると、次のエラーが発生することがあります：

```bash
'intlayer' は、内部コマンドまたは外部コマンド、操作可能なプログラムまたはバッチ ファイルとして認識されていません。
```

## 解決策

以下の順番で解決策を試してください：

1. **コマンドがインストールされているか確認する**

```bash
npx intlayer -h
```

期待される出力：

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            バージョン番号を出力
    -h, --help               コマンドのヘルプを表示

Commands:
    dictionary|dictionaries  辞書操作
    configuration|config     設定操作
    help [command]           コマンドのヘルプを表示
```

2. **intlayer-cli パッケージをグローバルにインストールする**

```bash
npm install intlayer-cli -g -g
```

> すでに `intlayer` パッケージをインストールしている場合は、これを行う必要はありません

3. **パッケージをグローバルにインストールする**

```bash
npm install intlayer -g
```

4. **ターミナルを再起動する**  
   新しいコマンドを認識させるために、ターミナルの再起動が必要な場合があります。

5. **クリーンアップして再インストールする**  
   上記の解決策がうまくいかない場合は：

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **インストールファイルを確認する**  
   問題が解決しない場合は、以下のファイルが存在するか確認してください：
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` （`bin` フィールドが `./dist/cjs/cli.cjs` を参照している必要があります）

7. **PATH 環境変数を確認する**  
   npm のグローバル bin ディレクトリが PATH に含まれていることを確認してください：

```bash
# Unix系システム（macOS/Linux）の場合
echo $PATH
# /usr/local/bin や ~/.npm-global/bin のようなパスが含まれている必要があります

# Windowsの場合
echo %PATH%
# npmのグローバルbinディレクトリが含まれている必要があります
```

8. **npxをフルパスで使用する**
   コマンドがまだ見つからない場合は、npxをフルパスで試してください：

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **競合するインストールの確認**

```bash
# グローバルにインストールされているパッケージを一覧表示
npm list -g --depth=0

# 競合するグローバルインストールを削除
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# その後再インストール
npm install -g intlayer
```

10. **Node.jsとnpmのバージョン確認**
    互換性のあるバージョンを使用していることを確認してください：

```bash
node --version
npm --version
```

    古いバージョンを使用している場合は、Node.jsとnpmのアップデートを検討してください。

11. **権限の問題を確認する**  
    権限エラーが発生している場合は、以下を試してください：

```bash
# Unix系システムの場合
sudo npm install -g intlayer

# または npm のデフォルトディレクトリを変更する
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# ~/.profile または ~/.bashrc に以下を追加：
export PATH=~/.npm-global/bin:$PATH
```
