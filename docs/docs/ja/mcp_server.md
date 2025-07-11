---
createdAt: 2025-06-07
updatedAt: 2025-07-11
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
slugs:
  - doc
  - mcp-server
---

# Intlayer MCPサーバー

**Intlayer MCP（Model Context Protocol）サーバー**は、Intlayerエコシステムに特化したAI搭載のIDE支援を提供します。

## どこで使えますか？

- **Cursor**、**VS Code**などの最新の開発環境や、MCPプロトコルをサポートする任意のIDEで。
- **Claude Desktop**、**Gemini**、**ChatGPT**など、お気に入りのAIアシスタントで。

## なぜIntlayer MCPサーバーを使うのか？

Intlayer MCPサーバーをIDEで有効にすると、以下の機能が利用可能になります。

- **コンテキスト対応ドキュメント**
  MCPサーバーはIntlayerのドキュメントを読み込み、公開します。セットアップやマイグレーションの高速化に役立ちます。
  これにより、コードの提案、コマンドオプション、説明が常に最新かつ関連性の高いものになります。

- **スマートCLI統合**
  IDEのインターフェースから直接Intlayer CLIコマンドにアクセスして実行できます。MCPサーバーを使うことで、AIアシスタントに`intlayer dictionaries build`コマンドを実行させて辞書を更新したり、`intlayer dictionaries fill`コマンドで不足している翻訳を補完させたりできます。

  > コマンドとオプションの完全なリストは、[Intlayer CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)でご覧ください。

## ローカルサーバー（stdio）とリモートサーバー（SSE）

MCPサーバーは以下の2つの方法で使用できます：

- ローカルサーバー（stdio）
- リモートサーバー（SSE）

### ローカルサーバー（stdio）（推奨）

Intlayerは、あなたのマシンにローカルインストールできるNPMパッケージを提供しています。これは、VS CodeやCursorなどのお気に入りのIDE、またChatGPTやClaude Desktopなどのローカルアシスタントアプリケーションにもインストール可能です。

このサーバーはMCPサーバーを使用する推奨方法です。CLIツールを含むMCPサーバーのすべての機能が統合されています。

### リモートサーバー（SSE）

MCPサーバーはSSEトランスポート方式を使用してリモートでも利用可能です。このサーバーはIntlayerによってホストされており、https://mcp.intlayer.org で利用できます。このサーバーは認証不要で公開アクセス可能で、無料で使用できます。

リモートサーバーはCLIツールやAIの自動補完などを統合していないことに注意してください。リモートサーバーは、IntlayerエコシステムのAIアシスタントを支援するためのドキュメントとのやり取り専用です。

> サーバーのホスティングコストのため、リモートサーバーの可用性は保証できません。同時接続数を制限しています。最も信頼性の高い体験のために、ローカルサーバー（stdio）トランスポート方式の使用を推奨します。

---

## Cursorでのセットアップ

CursorでMCPサーバーを設定するには、[公式ドキュメント](https://docs.cursor.com/context/mcp)に従ってください。

プロジェクトのルートに、以下の `.cursor/mcp.json` 設定ファイルを追加します。

### ローカルサーバー（stdio）（推奨）

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### リモートサーバー（SSE）

Server-Sent Events（SSE）を使用してリモートのIntlayer MCPサーバーに接続するには、ホストされているサービスに接続するようにMCPクライアントを設定できます。

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

これは、IDEに対して`npx`を使用してIntlayer MCPサーバーを起動するよう指示し、特定のバージョンを固定しない限り常に最新の利用可能なバージョンを使用することを保証します。

---

## VS Codeでのセットアップ

[公式ドキュメント](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)に従って、VS CodeでMCPサーバーを設定してください。

VS CodeでIntlayer MCPサーバーを使用するには、ワークスペースまたはユーザー設定で設定する必要があります。

### ローカルサーバー（stdio）（推奨）

プロジェクトのルートに `.vscode/mcp.json` ファイルを作成します：

```json filename=".vscode/mcp.json"
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

### リモートサーバー（SSE）

Server-Sent Events（SSE）を使用してリモートの Intlayer MCP サーバーに接続する場合、MCP クライアントをホストされているサービスに接続するように設定できます。

```json filename=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## ChatGPT でのセットアップ

### リモートサーバー（SSE）

ChatGPT で MCP サーバーを設定するには、[公式ドキュメント](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server)に従ってください。

1 - [プロンプトダッシュボード](https://platform.openai.com/prompts)にアクセスします  
2 - 「+ Create」をクリックします  
3 - 「Tools (Create or +)」をクリックします  
4 - 「MCP Server」を選択します  
5 - 「Add new」をクリックします  
6 - 以下の項目を入力します：

- URL: https://mcp.intlayer.org
- Label: Intlayer MCP Server
- Name: intlayer-mcp-server
- Authentication: None

7 - 「Save」をクリックします

---

## Claude Desktopでのセットアップ

[公式ドキュメント](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server)に従って、Claude DesktopでMCPサーバーを設定してください。

設定ファイルのパス：

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### ローカルサーバー（stdio）（推奨）

```json filename="claude_desktop_config.json"
{
json filename="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## CLIを使ったMCPサーバーの利用

Intlayer MCPサーバーは、テスト、デバッグ、または他のツールとの統合のために、コマンドラインから直接実行することもできます。

```bash
# グローバルにインストール
npm install -g @intlayer/mcp

# またはnpxで直接使用（推奨）
npx @intlayer/mcp
```

---

## ドキュメント履歴

| バージョン | 日付       | 変更内容                              |
| ---------- | ---------- | ------------------------------------- |
| 5.5.12     | 2025-07-11 | ChatGPTのセットアップを追加           |
| 5.5.12     | 2025-07-10 | Claude Desktopのセットアップを追加    |
| 5.5.12     | 2025-07-10 | SSEトランスポートと遠隔サーバーを追加 |
| 5.5.10     | 2025-06-29 | 履歴の初期化                          |
