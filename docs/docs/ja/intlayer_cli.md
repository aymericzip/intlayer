---
createdAt: 2024-08-11
updatedAt: 2025-07-11
title: CLI
description: Intlayer CLIを使用して多言語ウェブサイトを管理する方法をご紹介します。このオンラインドキュメントの手順に従って、数分でプロジェクトをセットアップしましょう。
keywords:
  - CLI
  - コマンドラインインターフェース
  - 国際化
  - ドキュメンテーション
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
---

# Intlayer CLI

## パッケージのインストール

npmを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> すでに`intlayer`パッケージがインストールされている場合、CLIは自動的にインストールされます。このステップはスキップできます。

## intlayer-cli パッケージ

`intlayer-cli` パッケージは、あなたの [intlayer 宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md) を辞書にトランスパイルすることを目的としています。

このパッケージは、`src/**/*.content.{ts|js|mjs|cjs|json}` のようなすべての intlayer ファイルをトランスパイルします。[Intlayer 宣言ファイルの宣言方法はこちらをご覧ください](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

intlayer 辞書を解釈するには、[react-intlayer](https://www.npmjs.com/package/react-intlayer) や [next-intlayer](https://www.npmjs.com/package/next-intlayer) のようなインタープリターを使用できます。

## 設定ファイルのサポート

Intlayer は複数の設定ファイル形式を受け入れます：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

利用可能なロケールやその他のパラメータの設定方法については、[こちらの設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## intlayer コマンドの実行

### 辞書のビルド

辞書をビルドするには、以下のコマンドを実行します：

```bash
npx intlayer build
```

またはウォッチモードで

```bash
npx intlayer build --watch
```

このコマンドは、デフォルトで `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` の宣言コンテンツファイルを検出し、`.intlayer` ディレクトリに辞書をビルドします。

##### エイリアス：

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### 辞書のプッシュ

```bash
bash
npx intlayer dictionary push
```

[intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) がインストールされている場合、辞書をエディターにプッシュすることもできます。このコマンドにより、辞書を[エディター](https://intlayer.org/dashboard)で利用可能にできます。これにより、チームと辞書を共有し、アプリケーションのコードを編集することなくコンテンツを編集できます。

##### エイリアス：

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### 引数：

**辞書オプション：**

- **`-d`, `--dictionaries`**: プッシュする辞書のID。指定しない場合はすべての辞書がプッシュされます。

  > 例: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**構成オプション:**

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、このコマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

  > 例: `npx intlayer dictionary push --env-file .env.production.local`

**環境変数オプション:**

- **`--env`**: 環境を指定します（例: `development`、`production`）。intlayerの設定ファイルで環境変数を使用している場合に便利です。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。intlayerの設定ファイルで環境変数を使用している場合に便利です。

  > 例: `npx intlayer dictionary push --env-file .env.production.local`
  > 例: `npx intlayer dictionary push --env production`

**出力オプション:**

- **`-r`, `--delete-locale-dictionary`**: 辞書がプッシュされた後にロケールディレクトリを削除するか尋ねる質問をスキップし、ディレクトリを削除します。デフォルトでは、辞書がローカルに定義されている場合、遠隔の辞書内容を上書きします。

  > 例: `npx intlayer dictionary push -r`
  > 例: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: 辞書がプッシュされた後にロケールディレクトリを削除するか尋ねる質問をスキップし、ディレクトリを保持します。デフォルトでは、辞書がローカルに定義されている場合、遠隔の辞書内容を上書きします。

  > 例: `npx intlayer dictionary push -k`
  > 例: `npx intlayer dictionary push --keep-locale-dictionary`

**ログオプション:**

- **`--verbose`**: デバッグのために詳細なログを有効にします。

**Gitオプション:**

- **`--git-diff`**: ベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）への変更を含む辞書のみを対象に実行します。
- **`--git-diff-base`**: git diff のベース参照を指定します（デフォルトは `origin/main`）。
- **`--git-diff-current`**: git diff の現在の参照を指定します（デフォルトは `HEAD`）。
- **`--uncommitted`**: コミットされていない変更を含めます。
- **`--unpushed`**: プッシュされていない変更を含めます。
- **`--untracked`**: トラッキングされていないファイルを含めます。

  > 例: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > 例: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### 遠隔辞書のプル

```bash
npx intlayer pull
```

[intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) がインストールされている場合、エディターから辞書をプルすることもできます。これにより、アプリケーションのニーズに合わせて辞書の内容を上書きできます。

##### エイリアス:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### 引数:

**辞書オプション:**

- **`-d, --dictionaries`**: プルする辞書のID。指定しない場合はすべての辞書がプルされます。
  > 例: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**設定オプション:**

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、コマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

  > 例: `npx intlayer dictionary push --env-file .env.production.local`

**環境変数オプション:**

- **`--env`**: 環境を指定します（例：`development`、`production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、コマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

  > 例: `npx intlayer dictionary push --env-file .env.production.local`
  > 例: `npx intlayer dictionary push --env production`

**出力オプション:**

- **`--new-dictionaries-path`** : 新しい辞書が保存されるディレクトリのパス。指定しない場合、新しい辞書はプロジェクトの `./intlayer-dictionaries` ディレクトリに保存されます。辞書コンテンツ内に `filePath` フィールドが指定されている場合、この引数は無視され、指定された `filePath` ディレクトリに保存されます。

**ログオプション:**

- **`--verbose`**: デバッグ用の詳細なログ出力を有効にします。

##### 例:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 辞書の補完 / 監査 / 翻訳

```bash
npx intlayer fill
```

このコマンドは、翻訳の欠落、構造の不整合、型の不一致などの潜在的な問題について、コンテンツ宣言ファイルを解析します。問題が見つかった場合、**intlayer fill** は辞書を一貫性があり完全な状態に保つための更新を提案または適用します。

##### エイリアス:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### 引数:

**ファイルリストオプション:**

- **`-f, --file [files...]`**: 監査する特定のコンテンツ宣言ファイルのリスト。指定しない場合は、設定ファイルに基づいて検出されたすべての `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` ファイルが監査されます。

  > 例: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: キーに基づいて辞書をフィルタリングします。指定しない場合は、すべての辞書が監査されます。

  > 例: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: キーに基づいて辞書を除外します。指定しない場合は、すべての辞書が監査されます。

  > 例: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: ファイルパスのグロブパターンに基づいて辞書をフィルタリングします。

  > 例: `npx intlayer dictionary fill --path-filter "src/home/**"`

**エントリ出力オプション:**

- **`--source-locale [sourceLocale]`**: 翻訳元のソースロケール。指定しない場合は、設定ファイルのデフォルトロケールが使用されます。

- **`--output-locales [outputLocales...]`**: 翻訳対象のロケール。指定しない場合は、設定にあるすべてのロケールが使用され、ソースロケールは除外されます。

- **`--mode [mode]`**: 翻訳モード：'complete'（完全）、'review'（レビュー）、または 'missing-only'（不足分のみ）。デフォルトは 'missing-only' です。

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

- **`--env`**: 環境を指定します（例: `development`, `production`）。
- **`--env-file [envFile]`**: 変数を読み込むためのカスタム環境ファイルを指定します。

  > 例: `npx intlayer fill --env-file .env.production.local`
  > 例: `npx intlayer fill --env production`

**設定オプション:**

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。

  > 例: `npx intlayer fill --base-dir ./src`

**ログオプション:**

- **`--verbose`**: デバッグ用の詳細ログを有効にします。

##### 例:

```bash
bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

このコマンドは、`src/home/` ディレクトリ内のすべてのコンテンツ宣言ファイルに対して、GPT-3.5 Turboモデルを使用して英語からフランス語およびスペイン語への翻訳を行います。

### 設定の管理

#### 設定の取得

`configuration get` コマンドは、Intlayerの現在の設定、特にロケール設定を取得します。セットアップの確認に便利です。

```bash
npx intlayer configuration get
```

##### エイリアス:

- `npx intlayer config get`
- `npx intlayer conf get`

##### 引数:

- **`--env`**: 環境を指定します（例：`development`、`production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--verbose`**: デバッグ用に詳細なログ出力を有効にします。

#### 設定のプッシュ

`configuration push` コマンドは、設定を Intlayer CMS とエディターにアップロードします。このステップは、Intlayer ビジュアルエディターでリモート辞書を使用可能にするために必要です。

```bash
npx intlayer configuration push
```

##### エイリアス:

- `npx intlayer config push`
- `npx intlayer conf push`

##### 引数:

- **`--env`**: 環境を指定します（例：`development`、`production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--verbose`**: デバッグ用に詳細なログ出力を有効にします。

設定をプッシュすることで、プロジェクトはIntlayer CMSと完全に統合され、チーム間での辞書管理がシームレスに行えるようになります。

### ドキュメント管理

`doc` コマンドは、複数のロケールにわたるドキュメントファイルの管理と翻訳のためのツールを提供します。

#### ドキュメントの翻訳

`doc translate` コマンドは、AI翻訳サービスを使用して、ベースロケールからターゲットロケールへドキュメントファイルを自動的に翻訳します。

```bash
npx intlayer doc translate
```

##### 引数:

**ファイルリストオプション:**

- **`--doc-pattern [docPattern...]`**: 翻訳対象のドキュメントファイルにマッチするグロブパターン。

  > 例: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: 翻訳から除外するためのグロブパターン。

  > 例: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: 指定した日時より前に変更されたファイルをスキップします。

  - "2025-12-05" のような絶対日時（文字列またはDateオブジェクト）を指定可能
  - `1 * 60 * 60 * 1000`（1時間）のような相対時間（ミリ秒）も指定可能
  - このオプションは `fs.stat` メソッドを使用してファイルの更新日時をチェックします。そのため、Gitやその他のツールによるファイルの変更に影響を受ける可能性があります。

  > 例: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: 指定した日時以降に変更されたファイルをスキップします。

  - 絶対時間として "2025-12-05"（文字列またはDateオブジェクト）を指定可能
  - ミリ秒単位の相対時間として `1 * 60 * 60 * 1000`（1時間）を指定可能
  - このオプションは `fs.stat` メソッドを使ってファイルの更新時間をチェックします。そのため、Gitやその他のファイルを変更するツールの影響を受ける可能性があります。

  > 例: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**出力オプション:**

- **`--locales [locales...]`**: ドキュメントを翻訳する対象のロケール。

  > 例: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: 翻訳元のソースロケール。

  > 例: `npx intlayer doc translate --base-locale en`

**ファイル処理オプション:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: 同時に翻訳処理するファイル数。

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

  > 例: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**ログオプション:**

- **`--verbose`**: デバッグのために詳細なログを有効にします。

  > 例: `npx intlayer doc translate --verbose`

**カスタム指示オプション:**

- **`--custom-instructions [customInstructions]`**: プロンプトに追加されるカスタム指示。フォーマットやURLの翻訳など、特定のルールを適用するのに便利です。

  - 絶対時間として "2025-12-05"（文字列またはDate型）を指定可能
  - ミリ秒単位の相対時間として `1 * 60 * 60 * 1000`（1時間）を指定可能
  - このオプションは `fs.stat` メソッドを使ってファイルの更新時間をチェックします。そのため、Gitやその他のツールによるファイルの変更に影響を受ける可能性があります。

  > 例: `npx intlayer doc translate --custom-instructions "Avoid translating urls, and keep the markdown format"`
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

> 出力ファイルのパスは以下のパターンを置換することで決定されることに注意してください
>
> - `/{{baseLocale}}/` を `/{{locale}}/` に置き換えます（Unix）
> - `\{{baseLocale}}\` を `\{{locale}}\` に置き換えます（Windows）
> - `_{{baseLocale}}.` を `_{{locale}}.` に置き換えます
> - `{{baseLocale}}_` を `{{locale}}_` に置き換えます
> - `.{{baseLocaleName}}.` を `.{{localeName}}.` に置き換えます
>
> パターンが見つからない場合、出力ファイルの拡張子に `.{{locale}}` が追加されます。例えば `./my/file.md` はフランス語ロケールの場合 `./my/file.fr.md` に翻訳されます。

#### ドキュメントのレビュー

`doc review` コマンドは、異なるロケール間でドキュメントファイルの品質、一貫性、完全性を分析します。

```bash
npx intlayer doc review
```

このコマンドは、すでに翻訳されたファイルをレビューしたり、翻訳が正しいかどうかを確認するために使用できます。

ほとんどのユースケースでは、

- このファイルの翻訳版がまだ存在しない場合は、`doc translate` の使用を推奨します。
- このファイルの翻訳版が既に存在する場合は、`doc review` の使用を推奨します。

> レビュープロセスは、同じファイルを完全にレビューする際に翻訳プロセスよりも多くのエントリトークンを消費します。ただし、レビュープロセスはレビューするチャンクを最適化し、変更されていない部分はスキップします。

##### 引数:

`doc review` コマンドは `doc translate` と同じ引数を受け付け、特定のドキュメントファイルをレビューし品質チェックを適用することができます。

Gitオプションのいずれかを有効にした場合、コマンドは変更されたファイルの部分のみをレビューします。スクリプトはファイルをチャンクに分割して各チャンクをレビューします。チャンクに変更がない場合、スクリプトはそれをスキップしてレビュー処理を高速化し、AIプロバイダーのAPIコストを抑制します。

## `package.json`でintlayerコマンドを使用する

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## CLI SDK

CLI SDKは、Intlayer CLIを自分のコード内で使用できるようにするライブラリです。

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

使用例:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## intlayerコマンドのデバッグ

### 1. **最新バージョンを使用していることを確認する**

以下を実行してください:

```bash
npx intlayer --version                  # 現在のローカルのintlayerバージョン
npx intlayer@latest --version           # 現在の最新intlayerバージョン
```

### 2. **コマンドが登録されているか確認する**

以下のコマンドで確認できます：

```bash
npx intlayer --help                     # 利用可能なコマンド一覧と使用方法を表示
npx intlayer dictionary build --help    # コマンドの利用可能なオプション一覧を表示
```

### 3. **ターミナルを再起動する**

新しいコマンドを認識させるために、ターミナルの再起動が必要な場合があります。

### 4. **npxキャッシュをクリアする（古いバージョンに固まっている場合）**

```bash
npx clear-npx-cache
```

## ドキュメント履歴

| バージョン | 日付       | 変更内容                                  |
| ---------- | ---------- | ----------------------------------------- |
| 5.5.11     | 2025-07-11 | CLIコマンドパラメータのドキュメントを更新 |
| 5.5.10     | 2025-06-29 | 履歴を初期化                              |
