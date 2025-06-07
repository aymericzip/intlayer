# Intlayer MCP サーバー

**Intlayer MCP (Model Context Protocol) サーバー**は、[Intlayer](https://github.com/aymericzip/intlayer) エコシステム向けに設計されたAI駆動のIDEアシスタンスを提供します。**Cursor**、**GitHub Copilot workspace**、およびMCPプロトコルをサポートする任意のIDEなど、現代の開発者環境向けに設計されており、プロジェクトの設定に基づいたコンテキスト対応のリアルタイムサポートを提供します。

## Intlayer MCP サーバーを使用する理由

IDEでIntlayer MCP サーバーを有効にすることで、以下の利点を得られます：

- **スマートCLI統合**
  IDEインターフェースから直接Intlayer CLIコマンドをアクセスして実行できます。コマンドとオプションの完全なリストは、[Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)で確認できます。

- **コンテキスト対応のドキュメント**
  MCPサーバーは、プロジェクトで使用しているIntlayerのバージョンに対応するドキュメントを読み込み、公開します。これにより、コードの提案、コマンドオプション、説明が常に最新で関連性のあるものになります。

- **AI支援開発**
  プロジェクトに対応した提案やオートコンプリートを提供し、AIアシスタントがコードを説明したり、CLIの使用を推奨したり、現在のファイルに基づいてIntlayerの特定の機能の使用方法を提案したりします。

- **軽量で即時のセットアップ**
  サーバーメンテナンスや重いインストールは不要です。`.cursor/mcp.json` または同等のMCP設定を構成するだけで、すぐに使用できます。

---

## Cursor のセットアップ

プロジェクトのルートに、以下の `.cursor/mcp.json` 設定ファイルを追加します：

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

これにより、IDEは `npx` を使用してIntlayer MCPサーバーを起動し、最新の利用可能なバージョンを常に使用するようにします（固定しない限り）。

---

## 🛠 機能概要

| 機能                          | 説明                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------- |
| 🧠 CLIサポート                | `intlayer` コマンドを実行し、使用方法のヒントや引数をインラインで取得できます |
| 📘 バージョン対応ドキュメント | 現在のIntlayerバージョンに一致するドキュメントを自動検出して読み込みます      |
| 🛎 オートコンプリート         | コマンドや設定のインテリジェントな提案を入力中に提供します                    |
| 🧩 プラグイン対応             | MCP標準をサポートするIDEやツールと互換性があります                            |

---

## 📎 便利なリンク

- [Intlayer CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)
- [Intlayer GitHub リポジトリ](https://github.com/aymericzip/intlayer)

---
