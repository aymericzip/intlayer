---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: エージェントスキル
description: Intlayerエージェントスキルを使用して、AIエージェントのプロジェクト理解を向上させる方法を学びます。
keywords:
  - Intlayer
  - エージェントスキル
  - AIエージェント
  - 国際化
  - ドキュメンテーション
slugs:
  - doc
  - agent_skills
history:
  - version: 8.0.4
    date: 2026-02-09
    changes: 履歴の初期化
---

## `intlayer init skills` コマンド

`intlayer init skills` コマンドは、プロジェクトにエージェントスキルをセットアップする最も簡単な方法です。環境を検出し、好みのプラットフォームに必要な設定ファイルをインストールします。

```bash
npx intlayer init skills
```

このコマンドを実行すると、以下のことが行われます：

1.  使用しているフレームワーク（Next.js、React、Viteなど）を検出します。
2.  どのプラットフォーム（Cursor、VS Code、OpenCode、Claude Codeなど）のスキルをインストールするか尋ねます。
3.  必要な設定ファイル（`.cursor/mcp.json`、`.vscode/mcp.json`、または `.intlayer/skills/*.md` など）を生成します。

## サポートされているプラットフォーム

Intlayerは以下のプラットフォームとの統合をサポートしています：

### 1. Cursor

CursorはMCP（Model Context Protocol）サーバーをサポートしています。`intlayer init skills` を実行すると、CursorがIntlayer MCPサーバーと通信できるようにするための `.cursor/mcp.json` ファイルが作成されます。

### 2. VS Code

VS Codeユーザー、特にGitHub Copilotやその他のMCP互換拡張機能を使用しているユーザー向けに、このコマンドは `.vscode/mcp.json` 設定を作成します。

### 3. OpenCode

OpenCodeは、ソフトウェアエンジニアリングタスク向けに設計されたインタラクティブなCLIエージェントです。Intlayerは、OpenCodeが国際化タスクを支援するための特定のスキルを提供します。

### 4. Claude Code

Claude Codeは、生成された設定をデスクトップまたはCLI設定に追加することで、Intlayerスキルを使用するように構成できます。
