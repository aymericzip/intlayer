---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CLI
description: Intlayer CLIを使用して多言語ウェブサイトを管理する方法を紹介します。このオンラインドキュメントの手順に従い、数分でプロジェクトをセットアップしましょう。
keywords:
  - CLI
  - コマンドラインインターフェース
  - 国際化
  - ドキュメント
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

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> `intlayer`パッケージがすでにインストールされている場合、CLIは自動的にインストールされます。このステップはスキップできます。

## intlayer-cliパッケージ

`intlayer-cli`パッケージは、あなたの[intlayer宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を辞書にトランスパイルすることを目的としています。

このパッケージは、`src/**/*.content.{ts|js|mjs|cjs|json}`のようなすべてのintlayerファイルをトランスパイルします。[Intlayer宣言ファイルの宣言方法はこちら](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)をご覧ください。

intlayer辞書を解釈するには、[react-intlayer](https://www.npmjs.com/package/react-intlayer)や[next-intlayer](https://www.npmjs.com/package/next-intlayer)のようなインタープリターを使用できます。

## 設定ファイルのサポート

Intlayerは複数の設定ファイル形式をサポートしています：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

利用可能なロケールやその他のパラメータの設定方法については、[こちらの設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## CLI SDK

CLI SDKは、Intlayer CLIを自身のコード内で使用できるライブラリです。

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
```

使用例：

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

## intlayerコマンドの実行

### 辞書のビルド

辞書をビルドするには、以下のコマンドを実行します：

```bash
npx intlayer build
```

またはウォッチモードで

```bash
npx intlayer build --watch
```

このコマンドはデフォルトで `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` の宣言コンテンツファイルを探し、`.intlayer` ディレクトリに辞書をビルドします。

##### エイリアス:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### 辞書のプッシュ

```bash
npx intlayer dictionary push
```

[intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) がインストールされている場合、辞書をエディターにプッシュすることもできます。このコマンドにより、辞書を[エディター](https://intlayer.org/dashboard)で利用可能にできます。これにより、チームと辞書を共有し、アプリケーションのコードを編集することなくコンテンツを編集できます。

##### エイリアス:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### 引数:

- `-d`, `--dictionaries`: プルする辞書のID。指定しない場合はすべての辞書がプッシュされます。
  > 例: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 辞書をプッシュした後にロケールディレクトリを削除するかどうか尋ねる質問をスキップし、それらを削除します。デフォルトでは、辞書がローカルで定義されている場合、遠隔の辞書内容を上書きします。
  > 例: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: 辞書をプッシュした後にロケールディレクトリを削除するかどうか尋ねる質問をスキップし、それらを保持します。デフォルトでは、辞書がローカルで定義されている場合、遠隔の辞書内容を上書きします。
  > 例: `npx intlayer dictionary push -k`
- `--env`: 環境を指定します（例：`development`、`production`）。
- `--env-file`: 変数を読み込むためのカスタム環境ファイルを指定します。
- `--base-dir`: プロジェクトのベースディレクトリを指定します。
- `--verbose`: デバッグのために詳細なログ出力を有効にします。
- `--git-diff`: ベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）への変更を含む辞書のみを対象に実行します。
- `--git-diff-base`: git diff のベース参照を指定します（デフォルトは `origin/main`）。
- `--git-diff-current`: git diff の現在の参照を指定します（デフォルトは `HEAD`）。
- `--uncommitted`: コミットされていない変更を含めます。
- `--unpushed`: プッシュされていない変更を含めます。
- `--untracked`: トラッキングされていないファイルを含めます。

### 遠隔辞書のプル

```bash
npx intlayer pull
```

[intlayerエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)がインストールされている場合、エディターから辞書をプルすることもできます。これにより、アプリケーションのニーズに合わせて辞書の内容を上書きすることが可能です。

##### エイリアス:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### 引数:

- `-d, --dictionaries`: プルする辞書のID。指定しない場合はすべての辞書がプルされます。
  > 例: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : 新しい辞書が保存されるディレクトリのパス。指定しない場合、新しい辞書はプロジェクトの `./intlayer-dictionaries` ディレクトリに保存されます。辞書の内容に `filePath` フィールドが指定されている場合、この引数は無視され、指定された `filePath` ディレクトリに保存されます。
- `--env`: 環境を指定します（例：`development`、`production`）。
- `--env-file`: 変数を読み込むためのカスタム環境ファイルを指定します。
- `--base-dir`: プロジェクトのベースディレクトリを指定します。
- `--verbose`: 詳細なログ出力を有効にしてデバッグを支援します。

##### 例:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 辞書の補完 / 監査 / 翻訳

```bash
bash
npx intlayer fill
```

このコマンドは、翻訳の欠落、構造の不整合、型の不一致などの潜在的な問題について、コンテンツ宣言ファイルを解析します。問題が見つかった場合、**intlayer fill** は辞書を一貫性があり完全な状態に保つために、更新の提案または適用を行います。

##### エイリアス:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### 引数:

- `-f, --file [files...]`
  監査する特定のコンテンツ宣言ファイルのリスト。指定しない場合は、発見されたすべての `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` ファイルが監査されます。

- `--exclude [excludedGlobs...]`
  監査から除外するグロブパターン（例: `--exclude "src/test/**"`）。

- `--source-locale [sourceLocale]`
  翻訳元のソースロケール。指定しない場合は、設定のデフォルトロケールが使用されます。

- `--output-locales [outputLocales...]`
  翻訳対象のロケール。指定しない場合は、設定のすべてのロケールがソースロケールを除いて使用されます。

- `--mode [mode]`
  翻訳モード：'complete'（完全）、'review'（レビュー）、または 'missing-only'（不足分のみ）。デフォルトは 'missing-only' です。

- `--git-diff`
  ベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）までの変更を含む辞書をフィルタリングします。

- `--git-diff-base`
  git diff のベース参照を指定します（デフォルトは `origin/main`）。

- `--git-diff-current`
  git diff の現在の参照を指定します（デフォルトは `HEAD`）。

- `--uncommitted`
  コミットされていない変更を含む辞書をフィルタリングします。

- `--unpushed`
- `--unpushed`
  プッシュされていない変更を含む辞書をフィルタリングします。

- `--untracked`
  トラッキングされていないファイルを含む辞書をフィルタリングします。

- `--keys [keys...]`
  指定されたキーに基づいて辞書をフィルタリングします。

- `--excluded-keys [excludedKeys...]`
  指定されたキーに基づいて辞書を除外します。

- `--path-filter [pathFilters...]`
  ファイルパスのグロブパターンに基づいて辞書をフィルタリングします。

- `--model [model]`
  翻訳に使用するAIモデル（例：`gpt-3.5-turbo`）を指定します。

- `--provider [provider]`
  翻訳に使用するAIプロバイダーを指定します。

- `--temperature [temperature]`
  AIモデルの温度設定を指定します。

- `--api-key [apiKey]`
  AIサービス用の独自のAPIキーを提供します。

- `--custom-prompt [prompt]`
  翻訳指示のためのカスタムプロンプトを提供します。

- `--application-context [applicationContext]`
  AI翻訳のための追加コンテキストを提供します。

- `--env`
  環境を指定します（例：`development`、`production`）。

- `--env-file [envFile]`
  変数を読み込むためのカスタム環境ファイルを指定します。

- `--base-dir`
  プロジェクトのベースディレクトリを指定します。

- `--verbose`
  詳細なログ出力を有効にしてデバッグを行います。

##### 例:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

このコマンドは、`src/home/`ディレクトリ内のすべてのコンテンツ宣言ファイルの内容を英語からフランス語とスペイン語に、GPT-3.5 Turboモデルを使用して翻訳します。

### 設定の管理

#### 設定の取得

`configuration get` コマンドは、Intlayer の現在の設定、特にロケール設定を取得します。これはセットアップの確認に役立ちます。

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
- **`--verbose`**: 詳細なログ出力を有効にしてデバッグを行います。

#### 設定のプッシュ

`configuration push` コマンドは、設定を Intlayer CMS とエディターにアップロードします。このステップは、Intlayer ビジュアルエディターで遠隔辞書を使用可能にするために必要です。

```bash
bash
npx intlayer configuration push
```

##### エイリアス:

- `npx intlayer config push`
- `npx intlayer conf push`

##### 引数:

- **`--env`**: 環境を指定します（例: `development`, `production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--verbose`**: 詳細なログ出力を有効にしてデバッグします。

設定をプッシュすることで、プロジェクトはIntlayer CMSと完全に統合され、チーム間での辞書管理がシームレスに行えるようになります。

### ドキュメント管理

`doc` コマンドは、複数のロケールにわたるドキュメントファイルの管理と翻訳のためのツールを提供します。

#### ドキュメントの翻訳

`doc translate` コマンドは、AI翻訳サービスを使用して、ベースロケールからターゲットロケールへドキュメントファイルを自動的に翻訳します。

```bash
npx intlayer doc translate
```

##### 引数:

- **`--doc-pattern [docPattern...]`**: 翻訳するドキュメントファイルをマッチさせるグロブパターン。
  > 例: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**: 翻訳から除外するグロブパターン。
  > 例: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: 同時に翻訳処理するファイル数。
  > 例: `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**: ドキュメントを翻訳する対象のロケール。
  > 例: `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**: 翻訳元のソースロケール。
  > 例: `npx intlayer doc translate --base-locale en`
- **`--model [model]`**: 翻訳に使用するAIモデル（例: `gpt-3.5-turbo`）。
- **`--provider [provider]`**: 翻訳に使用するAIプロバイダー。
- **`--temperature [temperature]`**: AIモデルの温度設定。
- **`--api-key [apiKey]`**: AIサービス用のAPIキーを提供。
- **`--custom-prompt [prompt]`**: 翻訳指示用のカスタムプロンプトを提供。
- **`--application-context [applicationContext]`**: AI翻訳に追加のコンテキストを提供。
- **`--env`**: 環境を指定します（例：`development`、`production`）。
- **`--env-file [envFile]`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--verbose`**: デバッグのために詳細なログ出力を有効にします。
- **`--custom-instructions [customInstructions]`**: プロンプトに追加するカスタム指示。フォーマットやURL翻訳など特定のルールを適用する際に便利です。

##### 例:

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> 出力ファイルのパスは以下のパターンを置換して決定されます
>
> - `/{{baseLocale}}/` を `/{{locale}}/` に置換（Unix）
> - `\{{baseLocale}}\` を `\{{locale}}\` に置き換えます（Windows）
> - `_{{baseLocale}}.` を `_{{locale}}.` に置き換えます
> - `{{baseLocale}}_` を `{{locale}}_` に置き換えます
> - `.{{baseLocaleName}}.` を `.{{localeName}}.` に置き換えます
>
> パターンが見つからない場合、出力ファイルの拡張子に `.{{locale}}` が追加されます。例えば、`./my/file.md` はフランス語ロケールの場合 `./my/file.fr.md` に翻訳されます。

#### ドキュメントのレビュー

`doc review` コマンドは、異なるロケール間でのドキュメントファイルの品質、一貫性、完全性を分析します。

```bash
npx intlayer doc review
```

##### 引数:

`doc review` コマンドは `doc translate` と同じ引数を受け付け、特定のドキュメントファイルをレビューし、品質チェックを適用できます。

##### 例:

```bash
npx intlayer doc review
 --doc-pattern "docs/ja/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

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

## intlayerコマンドのデバッグ

### 1. **最新バージョンを使用していることを確認する**

以下を実行してください：

```bash
npx intlayer --version                  # 現在のローカルのintlayerバージョン
npx intlayer@latest --version           # 最新のintlayerバージョン
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

- 5.5.10 - 2025-06-29: 履歴の初期化
