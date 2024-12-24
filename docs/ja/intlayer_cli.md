# Intlayer CLI

## パッケージのインストール

必要なパッケージをnpmを使用してインストールします。

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> 注意: `intlayer`パッケージがすでにインストールされている場合、cliは自動的にインストールされます。このステップはスキップできます。

## intlayer-cliパッケージ

`intlayer-cli`パッケージは、あなたの[intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)宣言を辞書にトランスパイルすることを目的としています。

このパッケージは、`src/**/*.content.{ts|js|mjs|cjs|json}`のような全てのintlayerファイルをトランスパイルします。[Intlayerの宣言ファイルの宣言方法を確認してください](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

intlayer辞書を解釈するには、[react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/README.md)や[次の-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/README.md)などのインタープリタを使用できます。

## 設定ファイルのサポート

Intlayerは複数の設定ファイル形式を受け入れます：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

利用可能なロケールやその他のパラメータの設定方法については、[こちらの設定ドキュメントを参照してください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)。

## intlayerコマンドの実行

### 辞書をビルド

辞書をビルドするには、次のコマンドを実行します：

```bash
npx intlayer build
```

または、ウォッチモードで

```bash
npx intlayer build --watch
```

このコマンドは、デフォルトで`./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`として宣言されたコンテンツファイルを見つけ、`.intlayer`ディレクトリ内に辞書をビルドします。

### 辞書をプッシュ

```bash
npx intlayer push
```

[イントレイヤーエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)がインストールされている場合、エディターに辞書をプッシュすることもできます。このコマンドを使用すると、辞書を[https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content)のエディターで利用できるようにします。この方法で、チームと辞書を共有し、アプリケーションのコードを編集せずにコンテンツを編集できます。

##### 引数：

- `-d`, `--dictionaries`: プルする辞書のID。指定されていない場合、すべての辞書がプッシュされます。
  > 例: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 辞書がプッシュされた後にロケールディレクトリを削除するかどうか尋ねる質問をスキップし、削除します。デフォルトでは、辞書がローカルに定義されている場合、遠隔辞書のコンテンツを上書きします。
  > 例: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: 辞書がプッシュされた後にロケールディレクトリを削除するかどうか尋ねる質問をスキップし、保持します。デフォルトでは、辞書がローカルに定義されている場合、遠隔辞書のコンテンツを上書きします。
  > 例: `npx intlayer push -k`

### 遠隔辞書をプル

```bash
npx intlayer pull
```

[イントレイヤーエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)がインストールされている場合、エディターから辞書をプルすることもできます。この方法で、アプリケーションの必要に応じて辞書の内容を上書きできます。

##### 引数：

- `-d, --dictionaries`: プルする辞書のID。指定されていない場合、すべての辞書がプルされます。
  > 例: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: 新しい辞書を保存するディレクトリのパス。指定されていない場合、プロジェクトの`./intlayer-dictionaries`ディレクトリに辞書が保存されます。辞書の内容に`filePath`フィールドが指定されている場合、辞書はこの引数を考慮せずに指定された`filePath`ディレクトリに保存されます。
  > 例: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## `package.json`でのintlayerコマンドの使用：

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
