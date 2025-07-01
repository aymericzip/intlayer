---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: MCPサーバー ドキュメント
description: MCPサーバーの機能とセットアップを探り、サーバー管理と運用を最適化します。
keywords:
  - MCPサーバー
  - サーバー管理
  - 最適化
  - Intlayer
  - ドキュメント
  - セットアップ
  - 機能
---

# Intlayer MCPサーバー

**Intlayer MCP（Model Context Protocol）サーバー**は、Intlayerエコシステムに特化したAI搭載のIDE支援を提供します。**Cursor**、**GitHub Copilotワークスペース**、およびMCPプロトコルをサポートする任意のIDEのような最新の開発環境向けに設計されており、プロジェクトの設定に基づいたコンテキストに即したリアルタイムのサポートを提供します。

## なぜIntlayer MCPサーバーを使うのか？

IDEでIntlayer MCPサーバーを有効にすることで、以下の機能が利用可能になります：

- **スマートCLI統合**  
  IDEのインターフェースから直接Intlayer CLIコマンドにアクセスし、実行できます。コマンドとオプションの全リストは[Intlayer CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)で確認できます。

- **コンテキスト対応ドキュメント**  
  MCPサーバーは、プロジェクトで使用しているIntlayerのバージョンに対応したドキュメントを読み込み、公開します。これにより、コードの提案、コマンドオプション、説明が常に最新かつ適切なものとなります。

- **AI支援開発**  
  プロジェクトに応じた提案や自動補完により、AIアシスタントはコードの説明、CLIの使用推奨、または現在のファイルに基づいたIntlayerの特定機能の使い方を提案できます。

- **軽量かつ即時セットアップ**  
  サーバーメンテナンスや重いインストールは不要です。`.cursor/mcp.json` または同等のMCP設定を構成するだけで準備完了です。

---

## Cursorのセットアップ

プロジェクトのルートに以下の `.cursor/mcp.json` 設定ファイルを追加してください：

```json
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

これは、IDEに対して `npx` を使用して Intlayer MCP サーバーを起動するよう指示しており、バージョンを固定しない限り常に最新の利用可能なバージョンを使用することを保証します。

---

## VS Code のセットアップ

VS Code で Intlayer MCP サーバーを使用するには、ワークスペースまたはユーザー設定で構成する必要があります。

### ワークスペースの構成

プロジェクトのルートに `.vscode/mcp.json` ファイルを作成します：

```json
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### VS Code で MCP サーバーを使用する

1. **エージェントモードを有効にする**：チャットビューを開きます（Macでは⌃⌘I、Windows/LinuxではCtrl+Alt+I）し、ドロップダウンから **Agent** モードを選択します。

2. **ツールへのアクセス**: **Tools** ボタンをクリックして利用可能な Intlayer ツールを表示します。必要に応じて特定のツールを選択または選択解除できます。

3. **ツールの直接参照**: プロンプト内で `#` に続けてツール名を入力することで、ツールを直接参照できます。

4. **ツールの確認**: デフォルトでは、VS Code はツールを実行する前に確認を求めます。**Continue** ボタンのオプションを使って、現在のセッション、ワークスペース、または今後すべての呼び出しに対して自動的にツールを確認することができます。

### サーバーの管理

- コマンドパレットから **MCP: List Servers** を実行して設定されているサーバーを表示
- 必要に応じて Intlayer MCP サーバーを起動、停止、または再起動
- サーバーを選択して **Show Output** を選ぶことでトラブルシューティング用のログを表示

VS Code MCP統合の詳細については、[公式のVS Code MCPドキュメント](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)をご覧ください。

---

## CLIを使ったMCPサーバーの利用

Intlayer MCPサーバーは、テスト、デバッグ、または他のツールとの統合のために、コマンドラインから直接実行することもできます。

### MCPサーバーのインストール

まず、MCPサーバーパッケージをグローバルにインストールするか、npxを使って利用します：

```bash
# グローバルにインストール
npm install -g @intlayer/mcp

# またはnpxで直接使用（推奨）
npx @intlayer/mcp
```

### サーバーの起動

デバッグやテストのためにインスペクター付きでMCPサーバーを起動するには：

```bash
# 組み込みのstartコマンドを使用
npm run start

# またはnpxで直接実行
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

これにより、インスペクターインターフェース付きのMCPサーバーが起動し、以下のことが可能になります：

- MCPプロトコル通信のテスト
- サーバー応答のデバッグ
- ツールおよびリソースの実装検証
- サーバーパフォーマンスの監視

### 開発用途

開発およびテスト目的で、サーバーをさまざまなモードで実行できます：

```bash
# 開発モードでビルドして起動
npm run dev

# カスタム設定で実行
node dist/cjs/index.cjs

# サーバー機能のテスト
npm test
```

このサーバーは、Cursorや他のIDEだけでなく、任意のMCP互換クライアントが利用可能なIntlayer固有のツールおよびリソースを公開します。

---

## 機能概要

| 機能                             | 説明                                                                          |
| -------------------------------- | ----------------------------------------------------------------------------- |
| CLIサポート                      | `intlayer` コマンドを実行し、使用方法のヒントや引数をインラインで取得できます |
| バージョン管理されたドキュメント | 現在のIntlayerのバージョンに一致するドキュメントを自動検出して読み込みます    |
| オートコンプリート               | 入力中にインテリジェントなコマンドおよび設定の提案を行います                  |
| プラグイン対応                   | MCP標準をサポートするIDEやツールと互換性があります                            |

---

## 便利なリンク

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)
- [Intlayer GitHub リポジトリ](https://github.com/aymericzip/intlayer)

---

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
