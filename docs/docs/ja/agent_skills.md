---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: エージェントスキル (Agent Skills)
description: Intlayer Agent Skills を利用して、AI エージェントによるプロジェクトの理解を向上させる方法を学びます。メタデータ、サイトマップ、サーバーアクションの包括的なセットアップガイドも含まれています。
keywords:
  - Intlayer
  - エージェントスキル
  - AI エージェント
  - 国際化
  - ドキュメント
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: "Init history"
---

# エージェントスキル (Agent Skills)

## セットアップ

### CLI を使用する

`intlayer init skills` コマンドは、プロジェクトにエージェントスキルをセットアップする最も簡単な方法です。環境を検出し、好みのプラットフォームに必要な設定ファイルをインストールします。

```bash
npx intlayer init skills
```

### Vercel Skill SDK を使用する

```bash
npx skills add aymericzip/intlayer-skills
```

### VS Code 拡張機能を使用する

1. コマンドパレットを開きます (Ctrl+Shift+P または Cmd+Shift+P)。
2. `Intlayer: Setup AI Agent Skills` と入力します。
3. 使用しているプラットフォームを選択します (例: `VS Code`、`Cursor`、`Windsurf`、`OpenCode`、`Claude Code`、`GitHub Copilot Workspace` など)。
4. インストールしたいスキルを選択します (例: `Next.js`、`React`、`Vite`、`Compiler`、`Configuration`)。
5. Enter キーを押します。

## スキル一覧

**intlayer-config**

- エージェントがプロジェクト固有の i18n 設定を理解できるようにし、ロケール、ルーティングパターン、フォールバック戦略を正確に構成できるようにします。

**intlayer-cli**

- エージェントが翻訳ライフサイクルを自律的に管理できるようにします。これには、不足している翻訳の監査、辞書の構築、コマンドラインを介したコンテンツの同期が含まれます。

**intlayer-angular**

- Angular のベストプラクティスに従って、リアクティブな i18n パターンとシグナルを正しく実装するためのフレームワーク固有の専門知識をエージェントに提供します。

**intlayer-astro**

- Astro エコシステム固有のサーバーサイド翻訳やローカライズされたルーティングパターンを処理するための知識をエージェントに提供します。

**intlayer-content**

- 複数形化、条件分岐、マークダウンなどの高度なコンテンツノードを活用して、リッチで動的なローカライズ辞書を構築する方法をエージェントに教えます。

**intlayer-next-js**

- Next.js のサーバーコンポーネントおよびクライアントコンポーネント全体で i18n を実装するための知識をエージェントに提供し、SEO の最適化とシームレスなローカライズルーティングを実現します。

**intlayer-react**

- React ベースのあらゆる環境において、宣言的な i18n コンポーネントやフックを効率的に実装するための専門知識をエージェントに提供します。

**intlayer-preact**

- Preact の i18n 実装能力を最適化し、シグナルや効率的なリアクティブパターンを使用して、軽量でローカライズされたコンポーネントを作成できるようにします。

**intlayer-solid**

- SolidJS のきめ細かなリアクティビティを活用して、高性能なローカライズコンテンツ管理をエージェントができるようにします。

**intlayer-svelte**

- Svelte ステアとイディオマティックな構文を使用して、Svelte および SvelteKit アプリ全体でリアクティブかつ型安全なローカライズコンテンツを扱う方法をエージェントに教えます。

**intlayer-cms**

- リモートコンテンツの統合と管理を可能にし、Intlayer CMS を介したライブ同期やリモート翻訳ワークフローをエージェントが処理できるようにします。

**intlayer-usage**

- プロジェクト構造とコンテンツ宣言に対するエージェントのアプローチを標準化し、i18n プロジェクトで最も効率的なワークフローに従うようにします。

**intlayer-vue**

- Composables や Nuxt サポートを含む Vue 固有のパターンをエージェントに提供し、現代的でローカライズされた Web アプリケーションを構築できるようにします。

**intlayer-compiler**

- 自動コンテンツ抽出を可能にすることでエージェントのワークフローを簡素化し、手動で辞書ファイルを作成することなく、コード内に翻訳可能な文字列を直接記述できるようにします。
