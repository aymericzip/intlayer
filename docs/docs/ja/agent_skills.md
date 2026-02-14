---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: エージェントスキル
description: Intlayerエージェントスキルを使用して、メタデータ、サイトマップ、サーバーアクションの包括的なセットアップガイドを含む、AIエージェントのプロジェクト理解を向上させる方法を学びます。
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
  - version: 8.1.0
    date: 2026-02-09
    changes: 履歴の初期化
---

## `intlayer init skills` コマンド

`intlayer init skills` コマンドは、プロジェクトにエージェントスキルをセットアップする最も簡単な方法です。環境を検出し、好みのプラットフォームに必要な設定ファイルをインストールします。

```bash
npx intlayer init skills
```

または Vercel Skill SDK を使用する場合

```bash
npx skills add aymericzip/intlayer-skills
```

このコマンドを実行すると、以下のことが行われます：

1.  使用しているフレームワーク（Next.js、React、Viteなど）を検出します。
2.  どのプラットフォーム（Cursor、Windsurf、VS Code、OpenCode、Claude Code、GitHub Copilot Workspaceなど）のスキルをインストールするか尋ねます。
3.  必要な設定ファイル（例：`.cursor/skills/intlayer_next_js/SKILL.md`、`.windsurf/skills/intlayer_next_js/SKILL.md`、`.opencode/skills/intlayer_next_js/SKILL.md`、`.vscode/mcp.json`など）を生成します。

## サポートされているプラットフォーム

Intlayerは、AIエージェントが特定のプロジェクトでIntlayerを操作する方法を理解するのに役立つ、フレームワーク固有のドキュメント（セットアップ、使用法、メタデータ、サイトマップ、サーバーアクションなど）を提供します。これらのスキルは、エージェントを国際化の複雑なプロセスを通じてガイドし、正しいパターンとベストプラクティスに従うように設計されています。

Intlayerは以下のプラットフォームとの統合をサポートしています：

### 1. Cursor

CursorはMCP（Model Context Protocol）サーバーとカスタムスキルをサポートしています。`intlayer init skills` を実行すると、以下のことが行われます：

- Intlayer MCPサーバーと通信するための `.cursor/mcp.json` ファイルを作成します。
- `.cursor/skills` ディレクトリにフレームワーク固有のスキルをインストールします。

### 2. Windsurf

WindsurfはAI駆動のIDEです。`intlayer init skills` を実行すると、`.windsurf/skills` ディレクトリにフレームワーク固有のスキルがインストールされます。

### 3. VS Code

VS Codeユーザー、特にGitHub Copilotやその他のMCP互換拡張機能を使用しているユーザー向けに、このコマンドは：

- `.vscode/mcp.json` 設定を作成します。
- プロジェクトのルートにある `skills/` ディレクトリにフレームワーク固有のスキルをインストールします。

### 4. OpenCode

OpenCodeは、ソフトウェアエンジニアリングタスク向けに設計されたインタラクティブなCLIエージェントです。Intlayerは、OpenCodeが国際化タスクを支援するための特定のスキルを提供します。これらは `.opencode/skills` ディレクトリにインストールされます。

### 5. Claude Code

Claude Codeは、Intlayerスキルを使用するように構成できます。このコマンドは、`.claude/skills` ディレクトリにフレームワーク固有のスキルをインストールします。

### 6. GitHub Copilot Workspace

GitHub Copilot Workspaceでは、カスタムスキルを定義できます。このコマンドは、`.github/skills` ディレクトリにフレームワーク固有のスキルをインストールします。
