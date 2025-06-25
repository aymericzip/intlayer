---
docName: intlayer_cli
url: https://intlayer.org/doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: CLI
description: Intlayer CLIを使用して多言語Webサイトを管理する方法を発見してください。このオンラインドキュメントの手順に従って、数分でプロジェクトをセットアップします。
keywords:
  - CLI
  - コマンドラインインターフェイス
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer CLI

## パッケージのインストール

必要なパッケージをnpmを使用してインストールします:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> `intlayer`パッケージがすでにインストールされている場合、CLIは自動的にインストールされます。このステップをスキップできます。

## intlayer-cli パッケージ

`intlayer-cli`パッケージは、[intlayer宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)を辞書にトランスパイルすることを目的としています。

このパッケージは、`src/**/*.content.{ts|js|mjs|cjs|json}`のようなすべてのintlayerファイルをトランスパイルします。[Intlayer宣言ファイルの宣言方法はこちらをご覧ください](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

intlayer辞書を解釈するには、[react-intlayer](https://www.npmjs.com/package/react-intlayer)や[next-intlayer](https://www.npmjs.com/package/next-intlayer)のようなインタープリターを使用できます。

## 設定ファイルのサポート

Intlayerは複数の設定ファイル形式を受け入れます:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

利用可能なロケールやその他のパラメータの設定方法については、[こちらの設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

## Intlayerコマンドの実行

### 辞書のビルド

辞書をビルドするには、以下のコマンドを実行します:

```bash
npx intlayer dictionaries build
```

またはウォッチモードで実行:

```bash
npx intlayer dictionaries build --watch
```

このコマンドは、デフォルトで`./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`のような宣言コンテンツファイルを見つけ、`.intlayer`ディレクトリに辞書をビルドします。

### 辞書のプッシュ

```bash
npx intlayer dictionary push
```

[intlayerエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)がインストールされている場合、辞書をエディターにプッシュすることもできます。このコマンドにより、辞書を[エディター](https://intlayer.org/dashboard)で利用可能にします。この方法で、チームと辞書を共有し、アプリケーションのコードを編集せずにコンテンツを編集できます。

##### 引数:

- `-d`, `--dictionaries`: プッシュする辞書のID。指定しない場合、すべての辞書がプッシュされます。
  > 例: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 辞書をプッシュした後にロケールディレクトリを削除するかどうかの質問をスキップし、削除します。デフォルトでは、辞書がローカルで定義されている場合、リモート辞書の内容を上書きします。
  > 例: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: 辞書をプッシュした後にロケールディレクトリを削除するかどうかの質問をスキップし、保持します。デフォルトでは、辞書がローカルで定義されている場合、リモート辞書の内容を上書きします。
  > 例: `npx intlayer dictionary push -k`
- `--env`: 環境を指定します（例: `development`, `production`）。
- `--env-file`: 変数を読み込むためのカスタム環境ファイルを提供します。
- `--base-dir`: プロジェクトのベースディレクトリを指定します。
- `--verbose`: デバッグ用の詳細なログを有効にします。
- `--git-diff`: プッシュされていない変更がある辞書のみを実行します。
- `--git-diff-base`: git diffのベース参照を指定します。
- `--git-diff-current`: git diffの現在の参照を指定します。
- `--uncommitted`: コミットされていない変更を含めます。
- `--unpushed`: プッシュされていない変更を含めます。
- `--untracked`: 追跡されていないファイルを含めます。

### リモート辞書のプル

```bash
npx intlayer dictionary pull
```

[intlayerエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)がインストールされている場合、エディターから辞書をプルすることもできます。この方法で、アプリケーションのニーズに合わせて辞書の内容を上書きできます。

##### 引数:

- `-d, --dictionaries`: 取得する辞書のID。指定しない場合、すべての辞書が取得されます。
  > 例: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: 新しい辞書が保存されるディレクトリのパス。指定しない場合、新しい辞書はプロジェクトの`./intlayer-dictionaries`ディレクトリに保存されます。辞書の内容に`filePath`フィールドが指定されている場合、辞書はこの引数を考慮せず、指定された`filePath`ディレクトリに保存されます。
- `--env`: 環境を指定します（例: `development`, `production`）。
- `--env-file`: 変数を読み込むためのカスタム環境ファイルを提供します。
- `--base-dir`: プロジェクトのベースディレクトリを指定します。
- `--verbose`: デバッグ用の詳細なログを有効にします。

##### 例:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 辞書の監査

```bash
npx intlayer audit
```

このコマンドは、翻訳の欠落、構造の不整合、または型の不一致など、宣言コンテンツファイルの潜在的な問題を分析します。問題が見つかった場合、**intlayer audit**は辞書を一貫性と完全性を保つための更新を提案または適用します。

##### 引数:

- **`-f, --files [files...]`**  
  監査する特定の宣言コンテンツファイルのリスト。指定しない場合、すべての`*.content.{ts,js,mjs,cjs,tsx,jsx,json}`ファイルが監査されます。

- **`--exclude [excludedGlobs...]`**  
  監査から除外するグロブパターン（例: `--exclude "src/test/**"`）。

- **`--source-locale [sourceLocale]`**  
  翻訳元のソースロケール。指定しない場合、設定のデフォルトロケールが使用されます。

- **`--output-locales [outputLocales...]`**  
  翻訳先のターゲットロケール。指定しない場合、ソースロケールを除く設定のすべてのロケールが使用されます。

- **`--mode [mode]`**  
  翻訳モード: 'complete'、'review'、または'missing-only'。デフォルトは'missing-only'です。

- **`--git-diff`**  
  gitリポジトリでプッシュされていない変更がある辞書のみを実行します。

- **`--git-diff-base`**  
  git diffのベース参照を指定します。

- **`--git-diff-current`**  
  git diffの現在の参照を指定します。

- **`--uncommitted`**  
  コミットされていない変更を含めます。

- **`--unpushed`**  
  プッシュされていない変更を含めます。

- **`--untracked`**  
  追跡されていないファイルを含めます。

- **`--keys [keys...]`**  
  指定されたキーに基づいて辞書をフィルタリングします。

- **`--excluded-keys [excludedKeys...]`**  
  指定されたキーに基づいて辞書を除外します。

- **`--path-filter [pathFilters...]`**  
  ファイルパスのグロブパターンに基づいて辞書をフィルタリングします。

- **`--model [model]`**  
  翻訳に使用するAIモデル（例: `gpt-3.5-turbo`）。

- **`--provider [provider]`**  
  翻訳に使用するAIプロバイダー。

- **`--temperature [temperature]`**  
  AIモデルの温度設定。

- **`--api-key [apiKey]`**  
  AIサービスの独自のAPIキーを提供します。

- **`--custom-prompt [prompt]`**  
  翻訳指示のためのカスタムプロンプトを提供します。

- **`--application-context [applicationContext]`**  
  AI翻訳のための追加コンテキストを提供します。

- **`--env`**  
  環境を指定します（例: `development`, `production`）。

- **`--env-file [envFile]`**  
  変数を読み込むためのカスタム環境ファイルを提供します。

- **`--base-dir`**  
  プロジェクトのベースディレクトリを指定します。

- **`--verbose`**  
  デバッグ用の詳細なログを有効にします。

##### 例:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

このコマンドは、GPT-3.5 Turboモデルを使用して、`src/home/`ディレクトリ内のすべてのコンテンツ宣言ファイルの内容を英語からフランス語とスペイン語に翻訳します。

### 設定の管理

#### 設定の取得

`get configuration`コマンドは、Intlayerの現在の設定、特にロケール設定を取得します。これは設定を確認するのに役立ちます。

```bash
npx intlayer config get
```

##### 引数:

- **`--env`**: 環境を指定します（例: `development`, `production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを提供します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--verbose`**: デバッグ用の詳細なログを有効にします。

#### 設定のプッシュ

`push configuration`コマンドは、設定をIntlayer CMSとエディタにアップロードします。このステップは、Intlayer Visual Editorでリモート辞書を使用できるようにするために必要です。

```bash
npx intlayer config push
```

##### 引数:

- **`--env`**: 環境を指定します（例: `development`, `production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを提供します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--verbose`**: デバッグ用の詳細なログを有効にします。

設定をプッシュすることで、プロジェクトはIntlayer CMSと完全に統合され、チーム間でシームレスな辞書管理が可能になります。

## `package.json`でintlayerコマンドを使用する

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```

## intlayerコマンドのデバッグ

### 1. **最新バージョンを使用していることを確認**

実行:

```bash
npx intlayer --version                  # 現在のローカルintlayerバージョン
npx intlayer@latest --version          # 最新のintlayerバージョン
```

### 2. **コマンドが登録されているか確認**

以下のコマンドで確認できます:

```bash
npx intlayer --help      # 利用可能なコマンドと使用方法の情報を表示
```

### 3. **ターミナルを再起動**

新しいコマンドを認識するには、ターミナルの再起動が必要な場合があります。

### 4. **npxキャッシュをクリア（古いバージョンで問題が発生している場合）**

```bash
npx clear-npx-cache
```
