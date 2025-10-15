---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: 公式 VS Code 拡張機能
description: VS Code で Intlayer 拡張機能を使用して開発ワークフローを強化する方法を学びます。ローカライズされたコンテンツ間を素早く移動し、辞書を効率的に管理できます。
keywords:
  - VS Code 拡張機能
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
history:
  - version: 6.1.5
    date: 2025-09-30
    changes: デモGIFを追加
  - version: 6.1.0
    date: 2025-09-24
    changes: 環境選択セクションを追加
  - version: 6.0.0
    date: 2025-09-22
    changes: Intlayerタブ / Fill & Testコマンド追加
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴を初期化
---

# 公式 VS Code 拡張機能

## 概要

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) は、プロジェクト内のローカライズされたコンテンツを扱う際の開発者体験を向上させるために設計された、**Intlayer** の公式 Visual Studio Code 拡張機能です。

![Intlayer VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

拡張機能リンク: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## 機能

![辞書を埋める](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **インスタントナビゲーション** – `useIntlayer` キーをクリックすると、正しいコンテンツファイルに素早くジャンプします。
- **辞書の埋め込み** – プロジェクトのコンテンツで辞書を埋めます。

![コマンド一覧](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Intlayerコマンドへの簡単アクセス** – コンテンツ辞書のビルド、プッシュ、プル、埋め込み、テストを簡単に行えます。

![コンテンツファイル作成](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **コンテンツ宣言ジェネレーター** – さまざまな形式（`.ts`、`.esm`、`.cjs`、`.json`）で辞書コンテンツファイルを作成します。

![辞書のテスト](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **辞書のテスト** – 翻訳漏れがないか辞書をテストします。

![辞書の再構築](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **辞書を最新の状態に保つ** – プロジェクトの最新コンテンツで辞書を常に最新の状態に保ちます。

![Intlayer タブ（アクティビティバー）](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Intlayer タブ（アクティビティバー）** – 専用のサイドタブからツールバーやコンテキストアクション（ビルド、プル、プッシュ、フィル、リフレッシュ、テスト、ファイル作成）を使って辞書を閲覧・検索できます。

## 使い方

### クイックナビゲーション

1. **react-intlayer** を使用しているプロジェクトを開きます。
2. 次のような `useIntlayer()` の呼び出しを見つけます。

   ```tsx
   const content = useIntlayer("app");
   ```

3. キー（例: `"app"`）を **Command-click**（macOSでは `⌘+Click`）、または **Ctrl+Click**（Windows/Linuxの場合）します。
4. VS Code は対応する辞書ファイル（例: `src/app.content.ts`）を自動的に開きます。

### Intlayer タブ（アクティビティバー）

サイドタブを使って辞書を閲覧・管理します：

- アクティビティバーの Intlayer アイコンを開きます。
- **検索** でリアルタイムに辞書やエントリをフィルタリングします。
- **辞書** では環境、辞書、ファイルを閲覧します。ツールバーからはビルド、プル、プッシュ、フィル、リフレッシュ、テスト、辞書ファイルの作成が可能です。右クリックでコンテキストアクション（辞書のプル/プッシュ、ファイルのフィル）を利用できます。現在のエディタファイルは該当する場合、ツリー内で自動的に表示されます。

### コマンドへのアクセス

コマンドは **コマンドパレット** からアクセスできます。

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **辞書をビルド**
- **辞書をプッシュ**
- **辞書をプル**
- **辞書を埋める**
- **辞書をテスト**
- **辞書ファイルを作成**

### 環境変数の読み込み

Intlayer は、AI APIキーや Intlayer クライアントIDおよびシークレットを環境変数に保存することを推奨します。

拡張機能は、ワークスペースから環境変数を読み込み、適切なコンテキストで Intlayer コマンドを実行できます。

- **読み込み順（優先度順）**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **非破壊的**: 既存の `process.env` の値は上書きされません。
- **スコープ**: ファイルは設定されたベースディレクトリ（デフォルトはワークスペースのルート）から解決されます。

#### アクティブ環境の選択

- **コマンドパレット**: パレットを開き、`Intlayer: Select Environment` を実行して環境（例：`development`、`staging`、`production`）を選択します。拡張機能は上記の優先リストで最初に見つかったファイルを読み込み、「Loaded env from .env.<env>.local」のような通知を表示します。
- **設定**: `設定 → 拡張機能 → Intlayer` に移動し、以下を設定します：
  - **Environment**: `.env.<env>*` ファイルを解決するために使用される環境名。
  - （オプション）**Env File**: 明示的な `.env` ファイルへのパス。指定された場合、推測されたリストより優先されます。

#### モノレポおよびカスタムディレクトリ

ワークスペースのルート外に `.env` ファイルがある場合は、`設定 → 拡張機能 → Intlayer` で **ベースディレクトリ** を設定してください。ローダーはそのディレクトリを基準に `.env` ファイルを探します。
