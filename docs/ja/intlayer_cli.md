# Intlayer CLI

## パッケージのインストール

必要なパッケージをnpmを使用してインストールします:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
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
npx intlayer build
```

またはウォッチモードで実行:

```bash
npx intlayer build --watch
```

このコマンドは、デフォルトで`./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`のような宣言コンテンツファイルを見つけ、`.intlayer`ディレクトリに辞書をビルドします。

### 辞書のプッシュ

```bash
npx intlayer dictionary push
```

[intlayerエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)がインストールされている場合、辞書をエディターにプッシュすることもできます。このコマンドにより、辞書を[エディター](https://intlayer.org/dashboard)で利用可能にします。この方法で、チームと辞書を共有し、アプリケーションのコードを編集せずにコンテンツを編集できます。

##### 引数:

- `-d`, `--dictionaries`: プルする辞書のID。指定しない場合、すべての辞書がプッシュされます。
  > 例: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 辞書がプッシュされた後にロケールディレクトリを削除するかどうかを尋ねる質問をスキップし、それらを削除します。デフォルトでは、辞書がローカルで定義されている場合、リモート辞書の内容を上書きします。
  > 例: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: 辞書がプッシュされた後にロケールディレクトリを削除するかどうかを尋ねる質問をスキップし、それらを保持します。デフォルトでは、辞書がローカルで定義されている場合、リモート辞書の内容を上書きします。
  > 例: `npx intlayer dictionary push -k`

### リモート辞書のプル

```bash
npx intlayer dictionary pull
```

[intlayerエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)がインストールされている場合、エディターから辞書をプルすることもできます。この方法で、アプリケーションのニーズに合わせて辞書の内容を上書きできます。

##### 引数:

- `-d, --dictionaries`: プルする辞書のID。指定しない場合、すべての辞書がプルされます。
  > 例: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : 新しい辞書を保存するディレクトリのパス。指定しない場合、新しい辞書はプロジェクトの`./intlayer-dictionaries`ディレクトリに保存されます。辞書コンテンツに`filePath`フィールドが指定されている場合、この引数は無視され、指定された`filePath`ディレクトリに保存されます。

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

- **`-m, --model [model]`**  
  監査に使用するChatGPTモデル（例: `gpt-3.5-turbo`）。

- **`-p, --custom-prompt [prompt]`**  
  監査指示のカスタムプロンプトを提供します。

- **`-l, --async-limit [asyncLimit]`**  
  同時に処理するファイルの最大数。

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  OAuth2認証をバイパスするために独自のOpenAI APIキーを提供します。

##### 例:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

このコマンドは、`tests/**`以下のファイルを無視し、`gpt-3.5-turbo`モデルを使用して発見された宣言コンテンツファイルを監査します。翻訳の欠落などの問題が見つかった場合、それらは元のファイル構造を保持しながら修正されます。

### 設定の管理

#### 設定の取得

`get configuration`コマンドは、特にロケール設定に関する現在のIntlayer設定を取得します。セットアップを確認するのに便利です。

```bash
npx intlayer config get
```

##### 引数:

- **`--env`**: 環境を指定します（例: `development`, `production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを提供します。
- **`--verbose`**: デバッグのために詳細なログを有効にします。

#### 設定のプッシュ

`push configuration`コマンドは、設定をIntlayer CMSおよびエディターにアップロードします。このステップは、Intlayer Visual Editorでリモート辞書を使用するために必要です。

```bash
npx intlayer config push
```

##### 引数:

- **`--env`**: 環境を指定します（例: `development`, `production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを提供します。
- **`--verbose`**: デバッグのために詳細なログを有効にします。

設定をプッシュすることで、プロジェクトはIntlayer CMSと完全に統合され、チーム間での辞書管理がシームレスになります。

## `package.json`でintlayerコマンドを使用する

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
