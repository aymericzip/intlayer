---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: ドキュメントのレビュー
description: 異なるロケール間での品質、一貫性、完全性を確認するためのドキュメントファイルのレビュー方法を学びます。
keywords:
  - レビュー
  - ドキュメント
  - ドキュメンテーション
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
author: aymericzip
---

# ドキュメントのレビュー

`doc review` コマンドは、異なるロケール間でのドキュメントファイルの品質、一貫性、完全性を分析します。

## 重要なポイント：

- AIモデルのコンテキストウィンドウの制限内に収まるように、大きなマークダウンファイルをチャンクに分割します。
- レビューするチャンクを最適化し、すでに翻訳され、変更されていない部分をスキップします。
- キューシステムを使用してファイル、チャンク、ロケールを並列処理し、速度を向上させます。

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

これは、すでに翻訳されたファイルをレビューし、翻訳が正しいかどうかを確認するために使用できます。

ほとんどのユースケースでは、

- このファイルの翻訳版が利用できない場合は、`doc translate` の使用を推奨します。
- このファイルの翻訳版がすでに存在する場合は、`doc review` の使用を推奨します。

> レビュー処理は、同じファイルを完全にレビューするために翻訳処理よりも多くのエントリトークンを消費することに注意してください。ただし、レビュー処理はレビューするチャンクを最適化し、変更されていない部分はスキップします。

## 引数:

**ファイルリストオプション:**

- **`--doc-pattern [docPattern...]`**: レビューするドキュメントファイルにマッチするグロブパターン。

  > 例: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: レビューから除外するグロブパターン。

  > 例: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: 指定した日時より前に変更されたファイルをスキップします。
  - 絶対日時として "2025-12-05"（文字列またはDate型）を指定可能
  - ミリ秒単位の相対時間として `1 * 60 * 60 * 1000`（1時間）を指定可能
  - このオプションは `fs.stat` メソッドを使ってファイルの更新日時をチェックします。そのため、Gitやその他のツールによるファイル変更の影響を受ける可能性があります。

  > 例: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: 指定した日時以内に変更されたファイルをスキップします。
  - 絶対日時として "2025-12-05"（文字列またはDate型）を指定可能
  - ミリ秒単位の相対時間として `1 * 60 * 60 * 1000`（1時間）を指定可能
  - このオプションは `fs.stat` メソッドを使ってファイルの更新日時をチェックします。そのため、Gitやその他のツールによるファイル変更の影響を受ける可能性があります。

  > 例: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: 既にファイルが存在する場合、そのファイルをスキップします。

  > 例: `npx intlayer doc review --skip-if-exists`

**レビューモードオプション:**

- **`--log`**: ログ出力のみモード。AIによる翻訳は行わず、代わりに別のエージェントが翻訳を生成できるように、ベースロケールとターゲットロケールで注意が必要なブロック（行番号と内容を含む）をログ出力します。

  > 例: `npx intlayer doc review --log`

**エントリー出力オプション:**

- **`--locales [locales...]`**: ドキュメントをレビューする対象のロケール。

  > 例: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: 比較元のソースロケール（ベースドキュメント）。

  > 例: `npx intlayer doc review --base-locale en`

**ファイル処理オプション:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: レビューのために同時に処理するファイル数。

  > 例: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**AIオプション:**

- **`--model [model]`**: レビューに使用するAIモデル（例: `gpt-3.5-turbo`）。
- **`--provider [provider]`**: レビューに使用するAIプロバイダー。
- **`--temperature [temperature]`**: AIモデルの温度設定。
- **`--api-key [apiKey]`**: AIサービス用のAPIキーを提供。
- **`--application-context [applicationContext]`**: AIレビューに追加のコンテキストを提供。
- **`--data-serialization [dataSerialization]`**: IntlayerのAI機能に使用するデータシリアライズ形式。オプション: `json` (標準的で信頼性が高い), `toon` (トークン消費が少ないが、一貫性が低い)。
- **`--custom-prompt [prompt]`**: レビューに使用する基本プロンプトをカスタマイズします。（注：ほとんどのユースケースでは、挙動をより良く制御できるため `--custom-instructions` オプションの使用が推奨されます。）

  > 例: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**環境変数オプション:**

- **`--env`**: 環境を指定します（例：`development`、`production`）。
- **`--env-file [envFile]`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--no-cache`**: キャッシュを無効にします。

  > 例: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**ログオプション:**

- **`--verbose`**: デバッグのために詳細なログを有効にします。（CLIではデフォルトでtrue）

  > 例: `npx intlayer doc review --verbose`

**カスタム指示オプション:**

- **`--custom-instructions [customInstructions]`**: プロンプトに追加するカスタム指示。フォーマットやURLの翻訳など特定のルールを適用するのに便利です。

  > 例: `npx intlayer doc review --custom-instructions "URLの翻訳を避け、マークダウン形式を維持する"`

  > 例: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Gitオプション:**

- **`--git-diff`**: 変更を含むファイル（デフォルトは `origin/main` から現在のブランチ `HEAD` への変更）のみで実行します。
- **`--git-diff-base`**: git diffのベース参照を指定します（デフォルトは `origin/main`）。
- **`--git-diff-current`**: git diffの現在の参照を指定します（デフォルトは `HEAD`）。
- **`--uncommitted`**: ココミットされていない変更を含めます。
- **`--unpushed`**: プッシュされていない変更を含めます。
- **`--untracked`**: トラッキングされていないファイルを含めます。

  > 例: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > 例: `npx intlayer doc review --uncommitted --unpushed --untracked`

> 出力ファイルのパスは、以下のパターンを置換することで決定されることに注意してください:
>
> - `/{{baseLocale}}/` を `/{{locale}}/` に置換（Unix）
> - `\{{baseLocale}}\` を `\{{locale}}\` に置換（Windows）
> - `_{{baseLocale}}.` を `_{{locale}}.` に置換
> - `{{baseLocale}}_` を `{{locale}}_` に置換
> - `.{{baseLocaleName}}.` を `.{{localeName}}.` に置換
>
> もしパターンが見つからない場合、出力ファイルはファイル拡張子の前に `.{{locale}}` を追加します。例えば `./my/file.md` はレビューされ、フランス語ロケールの場合 `./my/file.fr.md` に更新されます。
