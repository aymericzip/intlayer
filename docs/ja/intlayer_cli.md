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

> もし`intlayer`パッケージが既にインストールされている場合、cliは自動的にインストールされます。このステップはスキップできます。

## intlayer-cliパッケージ

`intlayer-cli`パッケージは、あなたの[インテレーション宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)を辞書に変換することを目的としています。

このパッケージは、`src/**/*.content.{ts|js|mjs|cjs|json}`などのすべてのintlayerファイルを変換します。[Intlayer宣言ファイルの宣言方法はこちらを参照してください](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

intlayer辞書を解釈するために、[react-intlayer](https://www.npmjs.com/package/react-intlayer)や[next-intlayer](https://www.npmjs.com/package/next-intlayer)などのインタプリタを使用できます。

## 設定ファイルのサポート

Intlayerは複数の設定ファイルフォーマットを受け入れます:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

利用可能なロケールや他のパラメータの設定方法については、[こちらの設定ドキュメントを参照してください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)。

## intlayerコマンドの実行

### 辞書のビルド

辞書をビルドするには、次のコマンドを実行できます:

```bash
npx intlayer build
```

またはウォッチモードで

```bash
npx intlayer build --watch
```

このコマンドは、デフォルトで`./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`として宣言コンテンツファイルを見つけ、`.intlayer`ディレクトリに辞書をビルドします。

### 辞書のプッシュ

```bash
npx intlayer dictionary push
```

もし[インテレーションエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)がインストールされている場合、辞書をエディタにプッシュすることもできます。このコマンドを使用することで、辞書を[編集者](https://intlayer.org/dashboard)に利用可能にし、チームと辞書を共有し、アプリケーションのコードを編集せずにコンテンツを編集できます。

##### 引数:

- `-d`, `--dictionaries`: プルする辞書のID。指定しない場合、すべての辞書がプッシュされます。
  > 例: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 辞書がプッシュされた後にロケールディレクトリを削除するかどうかの質問をスキップし、削除します。デフォルトでは、辞書がローカルに定義されている場合、遠隔辞書の内容が上書きされます。
  > 例: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: 辞書がプッシュされた後にロケールディレクトリを削除するかどうかの質問をスキップし、保持します。デフォルトでは、辞書がローカルに定義されている場合、遠隔辞書の内容が上書きされます。
  > 例: `npx intlayer dictionary push -k`

### 遠隔辞書をプル

```bash
npx intlayer dictionary pull
```

もし[インテレーションエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)がインストールされている場合、エディタから辞書をプルすることもできます。これにより、アプリケーションの需要に応じて辞書の内容を上書きできます。

##### 引数:

- `-d, --dictionaries`: プルする辞書のID。指定しない場合、すべての辞書がプルされます。
  > 例: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: 新しい辞書を保存するディレクトリのパス。指定しない場合、新しい辞書はプロジェクトの`./intlayer-dictionaries`ディレクトリに保存されます。辞書コンテンツ内に`filePath`フィールドが指定されている場合、辞書はこの引数を考慮せず、指定された`filePath`ディレクトリに保存されます。

##### 例:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 辞書の監査

```bash
npx intlayer audit
```

このコマンドは、見つかった欠落翻訳、構造的矛盾、または型の不一致などの潜在的な問題に対してコンテンツ宣言ファイルを分析します。問題が見つかった場合、**intlayer audit**は辞書を一貫性があり完全に保つための更新を提案または適用します。

##### 引数:

- **`-f, --files [files...]`**  
  監査する特定のコンテンツ宣言ファイルのリスト。指定しない場合、発見されたすべての`*.content.{ts,js,mjs,cjs,tsx,jsx,json}`ファイルが監査されます。

- **`--exclude [excludedGlobs...]`**  
  監査から除外するためのグロブパターン（例: `--exclude "src/test/**"`）。

- **`-m, --model [model]`**  
  監査に使用するChatGPTモデル（例: `gpt-3.5-turbo`）。

- **`-p, --custom-prompt [prompt]`**  
  監査指示のカスタムプロンプトを提供します。

- **`-l, --async-limit [asyncLimit]`**  
  同時に処理する最大ファイル数。

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  OAuth2認証を回避するために独自のOpenAI APIキーを提供します。

##### 例:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

このコマンドは、`tests/**`の下のファイルを無視し、発見されたコンテンツ宣言ファイルを監査するために`gpt-3.5-turbo`モデルを使用します。問題が見つかった場合（欠落翻訳など）、元のファイル構造を保持しながら、その場で修正されます。

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
