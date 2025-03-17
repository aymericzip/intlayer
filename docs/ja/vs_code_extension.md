# 公式VS Code拡張機能

## 概要

**Intlayer** は、**React、Next.js、JavaScript** プロジェクトでローカライズされたコンテンツを扱う際の開発者体験を向上させるために設計された、**Intlayer** の公式 Visual Studio Code 拡張機能です。

この拡張機能を使用すると、開発者はコンテンツ辞書に**迅速に移動**し、ローカライズファイルを管理し、強力な自動化コマンドでワークフローを効率化できます。

## 機能

### 即時ナビゲーション

**定義への移動サポート** – `useIntlayer` キーを `Cmd+Click` (Mac) または `Ctrl+Click` (Windows/Linux) でクリックすると、対応するコンテンツファイルを即座に開きます。  
**シームレスな統合** – **react-intlayer** および **next-intlayer** プロジェクトとスムーズに連携します。  
**多言語サポート** – 異なる言語でローカライズされたコンテンツをサポートします。  
**VS Code 統合** – VS Code のナビゲーションおよびコマンドパレットとスムーズに統合します。

### 辞書管理コマンド

VS Code から直接コンテンツ辞書を管理できます：

- **辞書の構築** (`extension.buildDictionaries`) – プロジェクト構造に基づいてコンテンツファイルを生成します。
- **辞書のプッシュ** (`extension.pushDictionaries`) – 最新の辞書コンテンツをリポジトリにアップロードします。
- **辞書のプル** (`extension.pullDictionaries`) – 最新の辞書コンテンツをリポジトリからローカル環境に同期します。

### コンテンツ宣言ジェネレーター

異なる形式で構造化された辞書ファイルを簡単に生成できます：

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES モジュール (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## インストール

**Intlayer** を VS Code Marketplace から直接インストールできます：

1. **VS Code** を開きます。
2. **拡張機能マーケットプレイス** に移動します。
3. **"Intlayer"** を検索します。
4. **インストール** をクリックします。

または、コマンドラインからインストールすることもできます：

```sh
code --install-extension intlayer
```

## 使用方法

### クイックナビゲーション

1. **react-intlayer** を使用するプロジェクトを開きます。
2. 次のような `useIntlayer()` の呼び出しを見つけます：

   ```tsx
   const content = useIntlayer("app");
   ```

3. キー（例: `"app"`）を **Command+クリック** (`⌘+Click` on macOS) または **Ctrl+クリック** (Windows/Linux) します。
4. VS Code が対応する辞書ファイル（例: `src/app.content.ts`）を自動的に開きます。

### コンテンツ辞書の管理

#### 辞書の構築

すべての辞書コンテンツファイルを生成するには：

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Build Dictionaries** を検索してコマンドを実行します。

#### 辞書のプッシュ

最新の辞書コンテンツをアップロードします：

1. **コマンドパレット** を開きます。
2. **Push Dictionaries** を検索します。
3. プッシュする辞書を選択して確認します。

#### 辞書のプル

最新の辞書コンテンツを同期します：

1. **コマンドパレット** を開きます。
2. **Pull Dictionaries** を検索します。
3. プルする辞書を選択します。

### 辞書ファイルパスのカスタマイズ

デフォルトでは、拡張機能は標準の **Intlayer** プロジェクト構造に従います。ただし、カスタムパスを設定することもできます：

1. **設定 (`Cmd + ,` on macOS / `Ctrl + ,` on Windows/Linux)`** を開きます。
2. `Intlayer` を検索します。
3. コンテンツファイルパスの設定を調整します。

## 開発と貢献

貢献したいですか？コミュニティからの貢献を歓迎します！

リポジトリ URL: https://github.com/aymericzip/intlayer-vs-code-extension

### 始め方

リポジトリをクローンして依存関係をインストールします：

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> `vsce` パッケージを使用して拡張機能をビルドおよび公開するために、`npm` パッケージマネージャーを使用してください。

### 開発モードで実行

1. **VS Code** でプロジェクトを開きます。
2. `F5` を押して新しい **Extension Development Host** ウィンドウを起動します。

### プルリクエストの送信

拡張機能を改善した場合は、[GitHub](https://github.com/aymericzip/intlayer-vs-code-extension) で PR を送信してください。

## フィードバックと問題

バグを見つけたり、機能リクエストがありますか？**GitHub リポジトリ**で問題を報告してください：

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## ライセンス

Intlayer は **MIT ライセンス** の下で公開されています。
