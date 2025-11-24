---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 辞書の補完
description: AIを使って辞書を補完、監査、翻訳する方法を学びます。
keywords:
  - 補完
  - 監査
  - 翻訳
  - 辞書
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# 辞書の補完 / 監査 / 翻訳

```bash
npx intlayer fill
```

このコマンドは、翻訳の欠落、構造の不整合、型の不一致などの潜在的な問題を検出するために、コンテンツ宣言ファイルを解析します。問題が見つかった場合、**intlayer fill** は辞書を一貫性があり完全な状態に保つために、更新を提案または適用します。

## エイリアス:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## 引数:

**ファイルリストオプション:**

- **`-f, --file [files...]`**: 監査する特定のコンテンツ宣言ファイルのリスト。指定しない場合は、設定ファイルのセットアップに基づいて検出されたすべての `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` ファイルが監査されます。

  > 例: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: キーに基づいて辞書をフィルタリングします。指定しない場合は、すべての辞書が監査されます。

  > 例: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: キーに基づいて辞書をフィルタリングします（--keys のエイリアス）。

  > 例: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: キーに基づいて辞書を除外します。指定しない場合は、すべての辞書が監査されます。

  > 例: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: キーに基づいて辞書を除外します（--excluded-keys のエイリアス）。

  > 例: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: ファイルパスのグロブパターンに基づいて辞書をフィルタリングします。

  > 例: `npx intlayer dictionary fill --path-filter "src/home/**"`

**エントリ出力オプション:**

- **`--source-locale [sourceLocale]`**: 翻訳元のソースロケール。指定しない場合は、設定ファイルのデフォルトロケールが使用されます。

- **`--output-locales [outputLocales...]`**: 翻訳対象のロケール。指定しない場合は、設定ファイルのすべてのロケールがソースロケールを除いて使用されます。

- **`--mode [mode]`**: 翻訳モード：`complete`、`review`。デフォルトは `complete`。`complete` はすべての不足している内容を埋め、`review` は不足している内容を埋めるとともに既存のキーをレビューします。

**Gitオプション:**

- **`--git-diff`**: ベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）までの変更を含む辞書のみで実行します。
- **`--git-diff-base`**: git diff のベース参照を指定します（デフォルトは `origin/main`）。
- **`--git-diff-current`**: git diff の現在の参照を指定します（デフォルトは `HEAD`）。
- **`--uncommitted`**: コミットされていない変更を含めます。
- **`--unpushed`**: プッシュされていない変更を含めます。
- **`--untracked`**: トラッキングされていないファイルを含めます。

  > 例: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > 例: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**AIオプション:**

- **`--model [model]`**: 翻訳に使用するAIモデル（例: `gpt-3.5-turbo`）。
- **`--provider [provider]`**: 翻訳に使用するAIプロバイダー。
- **`--temperature [temperature]`**: AIモデルの温度設定。
- **`--api-key [apiKey]`**: AIサービス用の独自APIキーを提供。
- **`--custom-prompt [prompt]`**: 翻訳指示用のカスタムプロンプトを提供。
- **`--application-context [applicationContext]`**: AI翻訳に追加のコンテキストを提供。

  > 例: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**環境変数オプション:**

- **`--env`**: 環境を指定します（例: `development`、`production`）。
- **`--env-file [envFile]`**: 変数を読み込むためのカスタム環境ファイルを指定します。

  > 例: `npx intlayer fill --env-file .env.production.local`

  > 例: `npx intlayer fill --env production`

**設定オプション:**

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。

  > 例: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: キャッシュを無効にします。

  > 例: `npx intlayer build --no-cache`

**準備オプション:**

- **`--build`**: プッシュ前に辞書をビルドしてコンテンツを最新に保ちます。`true` はビルドを強制し、`false` はビルドをスキップし、`undefined` はビルドのキャッシュを使用します。

- **`--skip-metadata`**: 辞書の不足しているメタデータ（説明、タイトル、タグ）の補完をスキップします。

**ログオプション:**

- **`--verbose`**: デバッグ用の詳細なログ出力を有効にします。（CLIではデフォルトでtrue）

## 例:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

このコマンドは、`src/home/` ディレクトリ内のすべてのコンテンツ宣言ファイルに対して、GPT-3.5 Turboモデルを使用して英語からフランス語およびスペイン語にコンテンツを翻訳します。
