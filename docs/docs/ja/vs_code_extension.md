---
createdAt: 2025-03-17
updatedAt: 2025-06-29
title: 公式VS Code拡張機能
description: VS CodeでIntlayer拡張機能を使用して開発ワークフローを強化する方法を学びます。ローカライズされたコンテンツ間を素早く移動し、辞書を効率的に管理できます。
keywords:
  - VS Code拡張機能
  - Intlayer
  - ローカリゼーション
  - 開発ツール
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# 公式VS Code拡張機能

## 概要

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) は、プロジェクト内のローカライズされたコンテンツを扱う際の開発者体験を向上させるために設計された、**Intlayer** の公式Visual Studio Code拡張機能です。

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

拡張機能リンク: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## 機能

### インスタントナビゲーション

**定義へ移動サポート** – `useIntlayer` キー上で `Cmd+Click`（Mac）または `Ctrl+Click`（Windows/Linux）を使用して、対応するコンテンツファイルを即座に開きます。  
**シームレスな統合** – **react-intlayer** および **next-intlayer** プロジェクトとスムーズに連携します。  
**多言語サポート** – 複数の言語に対応したローカライズコンテンツをサポートします。  
**VS Code 統合** – VS Code のナビゲーションやコマンドパレットとスムーズに統合されます。

### 辞書管理コマンド

VS Code から直接コンテンツ辞書を管理できます：

- **辞書のビルド** (`extension.buildDictionaries`) – プロジェクト構造に基づいてコンテンツファイルを生成します。
- **辞書のプッシュ** (`extension.pushDictionaries`) – 最新の辞書コンテンツをリポジトリにアップロードします。
- **辞書のプル** (`extension.pullDictionaries`) – リポジトリから最新の辞書コンテンツをローカル環境に同期します。

### コンテンツ宣言ジェネレーター

さまざまな形式で構造化された辞書ファイルを簡単に生成できます：

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ESモジュール (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## インストール

**Intlayer** は VS Code Marketplace から直接インストールできます：

1. **VS Code** を開きます。
2. **拡張機能マーケットプレイス** に移動します。
3. **"Intlayer"** を検索します。
4. **インストール** をクリックします。

または、コマンドラインからインストールすることも可能です：

```sh
code --install-extension intlayer
```

## 使い方

### クイックナビゲーション

1. **react-intlayer** を使用しているプロジェクトを開きます。
2. `useIntlayer()` の呼び出しを見つけます。例えば：

   ```tsx
   const content = useIntlayer("app");
   ```

3. キー（例: `"app"`）を **Commandクリック**（macOSの場合は `⌘+クリック`）、または **Ctrlクリック**（Windows/Linuxの場合）します。
4. VS Code が自動的に対応する辞書ファイル（例: `src/app.content.ts`）を開きます。

### コンテンツ辞書の管理

#### 辞書のビルド

すべての辞書コンテンツファイルを生成するには、以下を実行します：

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Build Dictionaries** を検索してコマンドを実行します。

#### 辞書のプッシュ

最新の辞書コンテンツをアップロードするには：

1. **コマンドパレット**を開きます。
2. **Push Dictionaries** を検索します。
3. プッシュする辞書を選択して確定します。

#### 辞書のプル

最新の辞書コンテンツを同期するには：

1. **コマンドパレット**を開きます。
2. **Pull Dictionaries** を検索します。
3. プルする辞書を選択します。

## 開発と貢献

貢献したいですか？コミュニティからの貢献を歓迎します！

リポジトリURL: https://github.com/aymericzip/intlayer-vs-code-extension

### はじめに

リポジトリをクローンし、依存関係をインストールします：

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> 拡張機能のビルドと公開に使用する `vsce` パッケージとの互換性のために、`npm` パッケージマネージャーを使用してください。

### 開発モードで実行する

1. プロジェクトを **VS Code** で開きます。
2. `F5` キーを押して新しい **Extension Development Host** ウィンドウを起動します。

### プルリクエストを提出する

拡張機能を改善した場合は、[GitHub](https://github.com/aymericzip/intlayer-vs-code-extension) でプルリクエストを提出してください。

## フィードバックと問題報告

バグを見つけた場合や機能リクエストがある場合は、当社の**GitHubリポジトリ**でIssueを開いてください：

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## ライセンス

Intlayerは**MITライセンス**の下でリリースされています。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
