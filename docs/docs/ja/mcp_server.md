---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: MCPサーバーのドキュメント
description: MCPサーバーの機能とセットアップを探索して、サーバー管理と運用を最適化します。
keywords:
  - MCPサーバー
  - サーバー管理
  - 最適化
  - Intlayer
  - ドキュメント
  - セットアップ
  - 機能
---

# Intlayer MCP サーバー

**Intlayer MCP (Model Context Protocol) サーバー**は、Intlayer エコシステム向けに設計されたAI支援のIDEアシスタンスを提供します。**Cursor**、**GitHub Copilot ワークスペース**、およびMCPプロトコルをサポートする任意のIDEなど、現代の開発者環境向けに設計されており、プロジェクトのセットアップに基づいたコンテキスト対応のリアルタイムサポートを提供します。

## Intlayer MCP サーバーを使用する理由

IDEでIntlayer MCP サーバーを有効にすることで、以下の利点を得られます：

- **スマートCLI統合**  
  IDEインターフェースから直接Intlayer CLIコマンドにアクセスして実行できます。コマンドとオプションの完全なリストは、[Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)で確認できます。

- **コンテキスト対応ドキュメント**  
  MCPサーバーは、プロジェクトで使用しているIntlayerのバージョンに対応するドキュメントをロードして公開します。これにより、コードの提案、コマンドオプション、および説明が常に最新で関連性のあるものになります。

- **AI支援開発**  
  プロジェクトに対応した提案やオートコンプリート機能を備えたAIアシスタントが、コードの説明、CLIの使用方法の推奨、または現在のファイルに基づいたIntlayerの特定機能の使用方法を提案します。

- **軽量で即時セットアップ**  
  サーバーメンテナンスや大規模なインストールは不要です。`.cursor/mcp.json`または同等のMCP設定を構成するだけで準備完了です。

---

## Cursor のセットアップ

プロジェクトのルートに以下の `.cursor/mcp.json` 設定ファイルを追加します：

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

これにより、`npx` を使用してIntlayer MCPサーバーを起動するようにIDEに指示します。これにより、特定のバージョンを固定しない限り、常に最新バージョンが使用されます。

---

## VS Code のセットアップ

VS CodeでIntlayer MCPサーバーを使用するには、ワークスペースまたはユーザー設定で構成する必要があります。

### ワークスペース設定

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

### VS CodeでのMCPサーバーの使用

1. **エージェントモードを有効化**：チャットビューを開き（Macでは⌃⌘I、Windows/LinuxではCtrl+Alt+I）、ドロップダウンから**エージェント**モードを選択します。

2. **ツールにアクセス**：**ツール**ボタンをクリックして、利用可能なIntlayerツールを表示します。必要に応じて特定のツールを選択/選択解除できます。

3. **直接ツール参照**：プロンプトに `#` を入力し、その後にツール名を入力することでツールを直接参照できます。

4. **ツールの確認**：デフォルトでは、VS Codeはツールを実行する前に確認を求めます。**続行**ボタンオプションを使用して、現在のセッション、ワークスペース、またはすべての将来の呼び出しに対してツールを自動的に確認することができます。

### サーバーの管理

- コマンドパレットから **MCP: List Servers** を実行して構成済みのサーバーを表示します。
- 必要に応じてIntlayer MCPサーバーを開始、停止、または再起動します。
- サーバーを選択して **Show Output** を選択することで、トラブルシューティングのためのサーバーログを表示します。

VS Code MCP統合に関する詳細情報は、[公式VS Code MCPドキュメント](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)をご覧ください。

---

## CLI経由でのMCPサーバーの使用

Intlayer MCPサーバーは、テスト、デバッグ、または他のツールとの統合のためにコマンドラインから直接実行することもできます。

### MCPサーバーのインストール

まず、MCPサーバーパッケージをグローバルにインストールするか、npxを介して使用します：

```bash
# グローバルインストール
npm install -g @intlayer/mcp

# またはnpxで直接使用（推奨）
npx @intlayer/mcp
```

### サーバーの起動

デバッグおよびテスト用にインスペクターを使用してMCPサーバーを起動します：

```bash
# 組み込みのスタートコマンドを使用
npm run start

# またはnpxで直接
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

これにより、以下を可能にするインスペクターインターフェースを備えたMCPサーバーが起動します：

- MCPプロトコル通信のテスト
- サーバーレスポンスのデバッグ
- ツールおよびリソースの実装の検証
- サーバーパフォーマンスの監視

### 開発用途

開発およびテスト目的で、さまざまなモードでサーバーを実行できます：

```bash
# 開発モードでビルドして開始
npm run dev

# カスタム設定で実行
node dist/cjs/index.cjs

# サーバー機能をテスト
npm test
```

サーバーは、Cursorや他のIDEだけでなく、MCP互換のクライアントが利用できるIntlayer固有のツールとリソースを公開します。

---

## 機能概要

| 機能                       | 説明                                                                           |
| -------------------------- | ------------------------------------------------------------------------------ |
| CLIサポート                | `intlayer` コマンドを実行し、使用ヒントや引数をインラインで取得                |
| バージョン管理ドキュメント | 現在使用しているIntlayerのバージョンに一致するドキュメントを自動検出してロード |
| オートコンプリート         | コマンドや設定の入力中にインテリジェントな提案を提供                           |
| プラグイン対応             | MCP標準をサポートするIDEやツールと互換性あり                                   |

---

## 便利なリンク

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)
- [Intlayer GitHub リポジトリ](https://github.com/aymericzip/intlayer)
