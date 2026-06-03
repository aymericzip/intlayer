---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Intlayer LSP サーバー
description: Intlayer Language Server が、サポートされているすべてのエディタで useIntlayer、getIntlayer、および関連する呼び出しに対して定義への移動（Go-to-Definition）やその他の IDE 機能を提供する方法について学びます。
keywords:
  - LSP
  - Language Server
  - 定義への移動
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
---

# Intlayer LSP サーバー

**Intlayer Language Server** は、Intlayer に対応したインテリジェンスで IDE を強化する [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) の実装です。現在、辞書キー呼び出しに対する **定義への移動（Go to Definition）** を提供しており、コンポーネント内の `useIntlayer("my-key")` からそれを宣言している `.content.ts` ファイルへ直接ジャンプすることができます。

---

## なぜ LSP を使用するのか？

Intlayer を使用する場合、コンポーネント内の `useIntlayer("homepage")` のような呼び出しと、`src/homepage.content.ts` でのその宣言との接続は暗黙的です。ツールがない場合、ファイルを手動で検索する必要があります。LSP はそのリンクを明示的にします。

**AI エージェントの認識**

AI コーディングエージェント（Cursor、Windsurf、GitHub Copilot、Claude Code、Codex）は、シンボルを解決し、ファイル間の関係を理解するためにランゲージサーバーに依存しています。Intlayer LSP が実行されていると、エージェントは `useIntlayer("key")` をその宣言までたどることができるため、利用可能なコンテンツキー、各辞書の形状、および読み取りまたは編集するファイルに関する正確なコンテキストを得ることができます。

**定義への移動**

サポートされているゲッター呼び出し内の任意の辞書キー文字列にカーソルを合わせ、`F12`（または `Cmd/Ctrl+クリック`）を押します。エディタはコンテンツ宣言ファイルを開き、カーソルを `key:` 行に配置します。

**マージされた辞書のサポート**

キーは複数のコンテンツファイルに分割されている場合があります（Intlayer はこれらをマージします）。サーバーはソースファイルごとに 1 つの `Location` を返すため、すべての宣言にナビゲートできます。

**どこでも動作**

すべての `*-intlayer` パッケージ（`next-intlayer`、`react-intlayer`、`vue-intlayer`、`svelte-intlayer`、`solid-intlayer`、`preact-intlayer`、`angular-intlayer`、`lit-intlayer`、`express-intlayer`、`hono-intlayer`、`fastify-intlayer`、`adonis-intlayer`、`intlayer`）をサポートしています。

### サポートされているゲッター呼び出し

サーバーは以下の関数呼び出しを検出し、最初の文字列リテラル引数を辞書キーとして抽出します。

| 関数          | 例                            |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

TypeScript のジェネリクスや追加の引数は無視され、キー文字列のみが重要となります。

> `useDictionary` と `getDictionary` は、最初の引数として文字列キーではなく、すでにインポートされた `Dictionary` オブジェクトを受け取るため、定義への移動の恩恵を受けず、サーバーによって追跡されません。

---

## インストール

LSP サーバーは `@intlayer/lsp` の一部として配布されています。

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

このパッケージは、エディタがサーバー実行ファイルとして使用する `intlayer-lsp` バイナリを提供します。

---

## Claude Code プラグインとしてのセットアップ

Intlayer LSP は、Intlayer GitHub リポジトリで直接ホストされている **Claude Code プラグイン**として利用可能です。これをインストールすると、Claude Code にすべての `useIntlayer` / `getIntlayer` 呼び出しに対するネイティブな定義への移動の認識が与えられます。

### 1. ランゲージサーバーバイナリのインストール

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

これにより、`intlayer-lsp` バイナリが PATH に追加され、プラグインの `lspServers` エントリがこれを呼び出します。

### 2. Intlayer マーケットプレイスの登録とプラグインのインストール

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code は、有効化されたプラグイン（`enabledPlugins`）に `"intlayer-lsp@intlayer": true` を追加し、サポートされているファイルタイプ（`.ts`、`.tsx`、`.js`、`.jsx`、`.vue`、`.svelte`）でランゲージサーバーを自動的に起動します。

### 3. LSP ツールの有効化（まだアクティブでない場合）

一部の Claude Code バージョンでは、LSP フィーチャフラグを設定する必要があります。インストール後に定義への移動が機能しない場合は、以下を `~/.claude/settings.json` に追加してください。

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Claude Code を再起動すると、Intlayer コードベースをナビゲートする際に `grep` にフォールバックする代わりに、`goToDefinition`、`findReferences`、およびその他の LSP 操作が使用されるようになります。

---

## VS Code でのセットアップ（拡張機能経由 — 推奨）

[Intlayer VS Code 拡張機能](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)がインストールされている場合、ランゲージサーバーは自動的に起動します。追加の構成は必要ありません。 LSPはv8.12.0からVSCode拡張機能に直接統合されています。

> インストールやその他の機能については、[VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

## VS Code での手動セットアップ

Intlayer 拡張機能を使用していない場合は、[**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) などの汎用 LSP クライアント拡張機能を使用するか、独自の小さな拡張機能を作成して、ランゲージサーバーを手動で接続できます。推奨されるアプローチは、Intlayer 拡張機能を使用することです。

参考までに、サーバーは stdio 経由で `intlayer-lsp` バイナリを起動します。

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Intlayer 拡張機能は、これらの設定を読み取ってサーバーを起動します。拡張機能のみに依存する場合、手動での設定は不要です。

---

## Cursor でのセットアップ

[Cursor](https://www.cursor.com/) は、AI 機能を組み込んだ VS Code のフォークです。同じ拡張機能エコシステムを使用するため、**Intlayer VS Code 拡張機能**は追加の構成なしで動作します。一度インストールすれば、Cursor が自動的に検出します。

手動構成を好む場合、Cursor はワークスペースのルートから `.vscode/settings.json` も読み取るため、上記の VS Code のスニペットが直接適用されます。

---

## Windsurf でのセットアップ

[Windsurf](https://windsurf.com/) (by Codeium) も、VS Code ベースのエディタです。VS Code Marketplace から Intlayer 拡張機能をインストールすると、VS Code や Cursor と同様に、ランゲージサーバーが自動的にアクティブ化されます。

手動構成の場合は、プロジェクトルートに `.vscode/settings.json` を作成します。

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Zed でのセットアップ

[Zed](https://zed.dev/) は、言語設定を通じてネイティブな LSP サポートを提供しています。Zed ユーザー設定（`~/.config/zed/settings.json`）にエントリを追加します。

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

`"..."` プレースホルダーは、Intlayer のサーバーと並行してデフォルトのランゲージサーバーを維持するよう Zed に指示します。

---

## AI エージェント CLI (Claude Code、Codex など) でのセットアップ

**Claude Code** は、優れた LSP プラグインサポートを備えています。上記の [Claude Code プラグインとしてのセットアップ](#claude-code-プラグインとしてのセットアップ)に従って、ターミナルセッションで直接完全な定義への移動体験を取得してください。

**OpenAI Codex** やその他のターミナルベースのツールは、まだ LSP クライアントとして動作しません。永続的なランゲージサーバーセッションを維持するのではなく、ファイルを直接読み書きします。これらのツールにとって、LSP が実行されていることの価値は間接的に得られます。コンパニオンエディタ（VS Code、Cursor、Windsurf など）でサーバーがアクティブである場合、エディタが提供するコンテキスト（Cursor Composer、Windsurf Cascade、GitHub Copilot Chat など）を介して照会できる AI エージェントに、エディタのライブインデックスが利用可能になります。

エディタを開かずにターミナルのみで作業している場合は、ランゲージサーバーをバックグラウンドで起動して、後で同じワークスペースに接続するエディタに備えることができます。

```bash
# サーバーをバックグラウンドで起動したままにする
npx @intlayer/lsp &
```

---

## Neovim での手動セットアップ

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) を使用して、カスタムサーバー構成を登録します。

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- グローバルインストールを避けるために npx でサーバーを起動
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

Neovim を再起動した後、Intlayer キーの上で `gd` を押すと、定義への移動が呼び出されます。

---

## その他のエディタでの手動セットアップ

Language Server Protocol をサポートする任意のエディタで `@intlayer/lsp` を使用できます。サーバー仕様は以下の通りです。

- **トランスポート** – Node.js IPC / stdio (標準)
- **実行ファイル** – `npx @intlayer/lsp` (またはローカルにインストールされた `intlayer-lsp` バイナリ)
- **機能** – `definitionProvider: true`、`textDocumentSync: Incremental`

正確な構成フォーマット（例: [coc.nvim](https://github.com/neoclide/coc.nvim) の `languageserver.json`、または [Helix](https://helix-editor.com) の LSP クライアント設定）については、エディタの LSP ドキュメントを参照してください。

### 例: coc.nvim

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

### 例: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## 仕組み

サーバーが起動すると、`getConfiguration()` を使用してワークスペースルートから Intlayer 構成を解決します。これにより、コンパイルされた辞書を見つけるために必要な `build` および `system` パスがサーバーに提供されます。

各 **定義への移動** リクエスト時:

1. サーバーは開いているドキュメントの全文を読み取ります。
2. 正規表現を使用して、ゲッター呼び出し（`useIntlayer`、`getIntlayer` など）をスキャンします。
3. カーソル位置がそれらの呼び出しのいずれかの内部にあるかどうかを確認します。
4. 内部にある場合、辞書キー（正規表現のキャプチャグループ 3）を抽出し、`getUnmergedDictionaries()` を呼び出して、そのキーを宣言しているすべてのコンテンツファイルを特定します。
5. 一致する各ファイルを読み取り、カーソルを正確に配置するために `key: "<key>"` を含む正確な行を見つけます。
6. `Location` オブジェクトの配列（ソースファイルごとに 1 つ）を返します。

構成は遅延解決され、セッションごとにキャッシュされます。新しいワークスペースフォルダーを開いたときなどの各 `initialize` リクエスト時にリセットされます。

---

## トラブルシューティング

| 症状                                   | 考えられる原因               | 対策                                                                                      |
| -------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------- |
| 定義への移動が機能しない               | サーバーが起動していない     | `@intlayer/lsp` がインストールされ、エディタがそれを起動しているか確認する                |
| 誤ったワークスペースルートが検出される | 複数のワークスペースフォルダ | `intlayer.config.ts` が含まれるフォルダが最初のワークスペースフォルダであることを確認する |
| キーの定義が見つからない               | 構成が解決されていない       | `intlayer.config.ts`（または `.js`）がワークスペースルートに存在することを確認する        |
| 起動時にサーバーがクラッシュする       | Node.js バージョンが古すぎる | Node.js ≥ 14.18 が必要です                                                                |
