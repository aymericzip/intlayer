---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Intlayer LSP サーバー
description: Intlayer 言語サーバーが、定義へ移動・参照の検索・ホバープレビュー・キーの自動補完・診断を、IDE と AI エージェントにもたらす方法を紹介します。
keywords:
  - LSP
  - 言語サーバー
  - Go to Definition
  - 自動補完
  - 診断
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "参照の検索、ホバー、自動補完、診断を追加"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Intlayer LSP サーバー

**Intlayer 言語サーバー**は、IDE と AI エージェントに Intlayer を理解させる [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) の実装です。`useIntlayer("home")` のような呼び出しと、それを宣言する `.content.ts` ファイルを双方向に結び付けます。

---

## 機能

| 機能                   | ショートカット         | 説明                                                                                       |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| **定義へ移動**         | `F12` / `Cmd+クリック` | 辞書キーやフィールドの使用箇所から、コンテンツファイル内の宣言へジャンプします             |
| **すべての参照を検索** | `Shift+F12`            | コンテンツファイルから、そのキーまたはフィールドを使うすべての呼び出し箇所を一覧表示します |
| **ホバー**             | カーソルを重ねる       | ファイルを離れずに、辞書のフィールドやフィールドの翻訳値をプレビューします                 |
| **自動補完**           | `"` `'` `` ` `` `.`    | ゲッター内で宣言済みの辞書キーを、`.` の後や分割代入ではコンテンツフィールドを提案します   |
| **診断**               | 自動                   | どのコンテンツファイルにも宣言されていないキーを警告します                                 |

知っておくとよい挙動が 2 つあります。

- **マージされた辞書** — 複数のコンテンツファイルに分割されたキーは、ファイルごとに 1 件の結果を返すため、すべての宣言へ移動できます。
- **モノレポ対応** — サーバーは各ファイルに _最も近い_ `intlayer.config.*` を解決するため、1 つのワークスペース内の複数プロジェクトがそれぞれ独自の辞書を持てます。

### サポートされる呼び出し

キーは位置指定の文字列引数、またはオプションオブジェクト（`{ namespace }`、`{ id }`）から読み取られます。

| ライブラリ                  | 呼び出し                                                 |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

これはすべての `*-intlayer` パッケージ（`next-intlayer`、`react-intlayer`、`vue-intlayer`、`svelte-intlayer`、`solid-intlayer`、`preact-intlayer`、`angular-intlayer`、`lit-intlayer`、`express-intlayer`、`hono-intlayer`、`fastify-intlayer`、`intlayer`）と、既存の i18n 構文を維持できる compat アダプターパッケージで動作します。

> 辞書はビルド出力から読み込まれます。サーバーが解決できるよう、`npx intlayer build` を実行するか、開発サーバーを起動したままにしてください。

---

## インストール

サーバーは `@intlayer/lsp` 内の `intlayer-lsp` バイナリとして提供されます。

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

エディターが `PATH` 上の `intlayer-lsp` を必要とする場合は、代わりにグローバルインストール（`npm install -g @intlayer/lsp`）してください。Claude Code プラグインや、バイナリを直接呼び出す以下の設定がこれに該当します。

---

## セットアップ

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

[Intlayer VS Code 拡張機能](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)をインストールしてください。言語サーバーは v8.12.0 以降同梱されており、自動的に起動します — **設定は不要です**。

その他の機能については [VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) と [Windsurf](https://windsurf.com/) は VS Code のフォークで、同じ拡張機能エコシステムを使用します。[Intlayer VS Code 拡張機能](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)を一度インストールすれば、サーバーは自動的に有効になります — **設定は不要です**。

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer は、Intlayer リポジトリでホストされている **Claude Code プラグイン**を提供しています。これにより Claude Code は `grep` に頼らず、辞書キーの本物のシンボル解決を行えます。

バイナリを `PATH` に配置し、続いてマーケットプレイスを登録してプラグインをインストールします。

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` はプラグインの有効化も行います。**Claude Code を再起動してください** — 言語サーバーは起動時に読み込まれるため、それまではプラグインは機能しません。

その後 Claude Code は `.ts`、`.tsx`、`.js`、`.jsx`、`.vue`、`.astro`、`.svelte` ファイルでサーバーを起動し、コードを辿る際に `goToDefinition`、`findReferences`、`hover` を使用します。

定義へ移動が依然として動作しない場合、お使いの Claude Code のバージョンでは LSP ツールがフラグで制御されている可能性があります。

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed はネイティブに LSP をサポートしています。ユーザー設定にサーバーを追加してください。

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
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

`"..."` のプレースホルダーにより、Zed の既定の言語サーバーが Intlayer のものと併存します。

  </Tab>
  <Tab label="Neovim" value="neovim">

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) を使って、カスタムのサーバー設定を登録します。

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- グローバルインストールが不要になるよう npx でサーバーを起動する
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

Neovim を再起動すると、辞書キー上で `gd` が定義へ移動、`gr` が参照の検索を実行します。

  </Tab>
  <Tab label="coc.nvim" value="coc">

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

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="その他のエディター" value="other">

LSP に対応したエディターであれば `@intlayer/lsp` を実行できます。次を指定してください。

- **実行ファイル** — `npx @intlayer/lsp`、または `intlayer-lsp` バイナリ
- **トランスポート** — stdio（標準）
- **機能** — `definitionProvider`、`referencesProvider`、`hoverProvider`、`completionProvider`（トリガー文字 `"` `'` `` ` `` `.`）、プッシュ診断、`textDocumentSync: Incremental`
- **ルートパターン** — `intlayer.config.ts`、`intlayer.config.js`、`package.json`

正確な設定形式は、お使いのエディターの LSP ドキュメントを参照してください。

  </Tab>
</Tabs>

---

## ターミナル AI エージェントについて

**Claude Code** は本物の LSP クライアントとして動作します — 上のタブを参照してください。

**OpenAI Codex** をはじめとするほとんどのターミナルツールは LSP クライアントではなく、ファイルを直接読み書きします。サーバーを単独で起動しても役に立ちません。価値が生まれるのは、エージェントがインデックスを照会できる併用エディター（Cursor Composer、Windsurf Cascade、Copilot Chat）でサーバーが有効になっている場合です。

---

## 仕組み

サーバーはファイルごとに最も近い `intlayer.config.*` を探し、そのプロジェクトの設定を読み込んでコンパイル済み辞書を見つけます。設定・辞書・ソースファイル一覧は短い TTL でキャッシュされ、監視中のコンテンツファイルが変更されるたびに無効化されます。

リクエスト時、サーバーは（[oxc](https://oxc.rs/) を用いて）ドキュメントを解析し、カーソル位置を調べます。

1. **キー文字列の上**（`useIntlayer("home")`）→ そのキーを宣言しているすべてのコンテンツファイルを、`key:` の行に位置づけて返します。
2. **フィールド使用箇所の上**（`content.title`、分割代入したプロパティ、`t('path.to.field')`、`<Trans>` など）→ 変数を辞書までさかのぼって解決し、コンテンツファイル内の該当フィールドを返します。
3. **コンテンツファイルから** → 逆引きを実行し、そのキーやフィールドの呼び出し箇所をプロジェクトのソースから探索します。

---

## トラブルシューティング

| 症状                                          | 考えられる原因                     | 対処                                                                              |
| --------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| まったく何も起こらない                        | サーバーが動作していない           | `@intlayer/lsp` がインストールされ、エディターが起動しているか確認してください    |
| エディターでは動くが Claude Code では動かない | セッション中にプラグインを導入した | Claude Code を再起動してください — 言語サーバーは起動時に読み込まれます           |
| キーの定義が見つからない                      | 辞書がビルドされていない           | `npx intlayer build` を実行するか、開発サーバーを起動してください                 |
| すべてのキーが未宣言として報告される          | 設定が解決されていない             | プロジェクトルートに `intlayer.config.ts`（または `.js`）があるか確認してください |
| モノレポで誤ったプロジェクトが使われる        | パッケージごとの設定がない         | 独自のコンテンツを宣言する各パッケージに `intlayer.config.*` を追加してください   |
| 起動時にサーバーがクラッシュする              | Node.js のバージョンが古すぎる     | Node.js 14.18 以上が必要です                                                      |

VS Code では、サーバーは **表示 → 出力 →「Intlayer LSP」** にログを出力します。どの設定が解決され、辞書がいくつ見つかったかを確認するのに役立ちます。
