---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: ドキュメントの翻訳
description: AI翻訳サービスを使用してドキュメントファイルを自動的に翻訳する方法を学びます。
keywords:
  - 翻訳
  - ドキュメント
  - ドキュメンテーション
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# ドキュメントの翻訳

`doc translate` コマンドは、AI翻訳サービスを使用して、ベースロケールからターゲットロケールへドキュメントファイルを自動的に翻訳します。

```bash
npx intlayer doc translate
```

## 引数:

**ファイルリストオプション:**

- **`--doc-pattern [docPattern...]`**: 翻訳するドキュメントファイルにマッチするグロブパターン。

  > 例: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: 翻訳から除外するグロブパターン。

  > 例: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: 指定した日時より前に変更されたファイルをスキップします。
  - 絶対日時として "2025-12-05"（文字列またはDate型）を指定可能
  - ミリ秒単位の相対時間として `1 * 60 * 60 * 1000`（1時間）を指定可能
  - このオプションは `fs.stat` メソッドを使ってファイルの更新日時をチェックします。そのため、Gitやその他のツールによるファイル変更の影響を受ける可能性があります。

  > 例: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: 指定した日時以内に変更されたファイルをスキップします。
  - 絶対日時として "2025-12-05"（文字列またはDate型）を指定可能
  - ミリ秒単位の相対時間として `1 * 60 * 60 * 1000`（1時間）を指定可能
  - このオプションは `fs.stat` メソッドを使ってファイルの更新日時をチェックします。そのため、Gitやその他のツールによるファイル変更の影響を受ける可能性があります。

  > 例: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: 既にファイルが存在する場合、そのファイルをスキップします。

  > 例: `npx intlayer doc translate --skip-if-exists`

**エントリー出力オプション:**

- **`--locales [locales...]`**: ドキュメントを翻訳する対象のロケール。

  > 例: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: 翻訳元のソースロケール。

  > 例: `npx intlayer doc translate --base-locale en`

**ファイル処理オプション:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: 翻訳のために同時に処理するファイル数。

  > 例: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**AIオプション:**

- **`--model [model]`**: 翻訳に使用するAIモデル（例: `gpt-3.5-turbo`）。
- **`--provider [provider]`**: 翻訳に使用するAIプロバイダー。
- **`--temperature [temperature]`**: AIモデルの温度設定。
- **`--api-key [apiKey]`**: AIサービス用のAPIキーを提供。
- **`--application-context [applicationContext]`**: AI翻訳に追加のコンテキストを提供。
- **`--custom-prompt [prompt]`**: 翻訳に使用する基本プロンプトをカスタマイズします。（注：ほとんどのユースケースでは、翻訳の挙動をより良く制御できるため、`--custom-instructions` オプションの使用が推奨されます。）

  > 例: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**環境変数オプション:**

- **`--env`**: 環境を指定します（例：`development`、`production`）。
- **`--env-file [envFile]`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--no-cache`**: キャッシュを無効にします。

  > 例: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**ログオプション:**

- **`--verbose`**: デバッグのために詳細なログを有効にします。（CLIではデフォルトでtrue）

  > 例: `npx intlayer doc translate --verbose`

**カスタム指示オプション:**

- **`--custom-instructions [customInstructions]`**: プロンプトに追加するカスタム指示。フォーマットやURLの翻訳など特定のルールを適用するのに便利です。
  - "2025-12-05" のような絶対時間（文字列またはDate型）を指定可能
  - ミリ秒単位の相対時間 `1 * 60 * 60 * 1000`（1時間）を指定可能
  - このオプションは `fs.stat` メソッドを使ってファイルの更新時間をチェックします。そのため、Gitやその他のファイルを変更するツールの影響を受ける可能性があります。

> 例: `npx intlayer doc translate --custom-instructions "URLの翻訳を避け、マークダウン形式を維持する"`

> 例: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Gitオプション:**

- **`--git-diff`**: ベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）への変更を含む辞書のみで実行します。
- **`--git-diff-base`**: git diffのベース参照を指定します（デフォルトは `origin/main`）。
- **`--git-diff-current`**: git diffの現在の参照を指定します（デフォルトは `HEAD`）。
- **`--uncommitted`**: コミットされていない変更を含めます。
- **`--unpushed`**: プッシュされていない変更を含めます。
- **`--untracked`**: トラッキングされていないファイルを含めます。

> 例: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

> 例: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> 出力ファイルのパスは、以下のパターンを置換することで決定されることに注意してください
>
> - `/{{baseLocale}}/` を `/{{locale}}/` に置換（Unix）
> - `\{{baseLocale}}\` を `\{{locale}}\` に置換（Windows）
> - `_{{baseLocale}}.` を `_{{locale}}.` に置換
> - `{{baseLocale}}_` を `{{locale}}_` に置換
> - `.{{baseLocaleName}}.` を `.{{localeName}}.` に置換
>
> もしパターンが見つからない場合、出力ファイルはファイル拡張子の前に `.{{locale}}` を追加します。例えば `./my/file.md` はフランス語ロケールの場合 `./my/file.fr.md` に翻訳されます。
