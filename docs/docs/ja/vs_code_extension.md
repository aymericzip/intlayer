---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: 公式 VS Code 拡張機能
description: VS Code で Intlayer 拡張機能を使用して開発ワークフローを強化する方法を学びます。ローカライズされたコンテンツ間を素早くナビゲートし、辞書を効率的に管理できます。
keywords:
  - VS Code 拡張機能
  - Intlayer
  - ローカリゼーション
  - 開発ツール
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# 公式 VS Code 拡張機能

## 概要

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) は、プロジェクト内のローカライズされたコンテンツを扱う際の開発者体験を向上させるために設計された、**Intlayer** の公式 Visual Studio Code 拡張機能です。

![Intlayer VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

拡張機能リンク: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## 機能

### インスタントナビゲーション

**定義へ移動サポート** – `useIntlayer` キー上で `⌘ + クリック`（Mac）または `Ctrl + クリック`（Windows/Linux）を使用して、対応するコンテンツファイルを即座に開きます。  
**シームレスな統合** – **react-intlayer** および **next-intlayer** プロジェクトとスムーズに連携します。  
**多言語サポート** – 複数の言語にわたるローカライズされたコンテンツをサポートします。  
**VS Code 統合** – VS Code のナビゲーションおよびコマンドパレットとスムーズに統合されます。

### 辞書管理コマンド

VS Code から直接コンテンツ辞書を管理します：

- **辞書のビルド** – プロジェクト構造に基づいてコンテンツファイルを生成します。
- **辞書のプッシュ** – 最新の辞書コンテンツをリポジトリにアップロードします。
- **辞書のプル** – リポジトリから最新の辞書コンテンツをローカル環境に同期します。
- **辞書の埋め込み** – プロジェクトのコンテンツで辞書を埋めます。
- **辞書のテスト** – 欠落または不完全な翻訳を特定します。

### コンテンツ宣言ジェネレーター

異なるフォーマットで構造化された辞書ファイルを簡単に生成します：

現在コンポーネントを作業している場合、そのコンポーネント用の `.content.{ts,tsx,js,jsx,mjs,cjs,json}` ファイルを生成します。

コンポーネントの例：

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

TypeScript形式で生成されたファイル：

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

利用可能なフォーマット：

- **TypeScript (`.ts`)**
- **ESモジュール (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Intlayerタブ（アクティビティバー）

VS CodeのアクティビティバーにあるIntlayerアイコンをクリックしてIntlayerタブを開きます。タブには2つのビューがあります：

- **検索**：辞書とその内容を素早くフィルタリングできるライブ検索バー。入力すると結果が即座に更新されます。
- **辞書**：環境やプロジェクト、辞書キー、エントリを含むファイルのツリービュー。以下の操作が可能です：
  - ファイルをクリックしてエディタで開く。
  - ツールバーを使って以下のアクションを実行：ビルド、プル、プッシュ、フィル、リフレッシュ、テスト、辞書ファイルの作成。
  - コンテキストメニューでアイテム固有のアクションを実行：
    - 辞書上で：プルまたはプッシュ
    - ファイル上で：辞書のフィル
  - エディタを切り替えると、そのファイルが辞書に属している場合はツリーが該当ファイルを表示します。

## インストール

**Intlayer**はVS Codeマーケットプレイスから直接インストールできます。

1. **VS Code**を開きます。
2. **拡張機能マーケットプレイス**に移動します。
3. **「Intlayer」**を検索します。
4. **インストール**をクリックします。

## 使い方

### クイックナビゲーション

1. **react-intlayer**を使用しているプロジェクトを開きます。
2. `useIntlayer()`の呼び出しを見つけます。例えば：

   ```tsx
   const content = useIntlayer("app");
   ```

3. キー（例: `"app"`）を**Commandクリック**（macOSの場合は`⌘+クリック`）、または**Ctrlクリック**（Windows/Linuxの場合）します。
4. VS Codeが自動的に対応する辞書ファイル（例: `src/app.content.ts`）を開きます。

### コンテンツ辞書の管理

### Intlayerタブ（アクティビティバー）

サイドタブを使って辞書を閲覧・管理します：

- アクティビティバーのIntlayerアイコンを開きます。
- **検索** では、辞書とエントリをリアルタイムでフィルタリングするために入力します。
- **辞書** では、環境、辞書、ファイルを閲覧できます。ツールバーを使って、ビルド、プル、プッシュ、フィル、リフレッシュ、テスト、辞書ファイルの作成を行います。右クリックでコンテキストアクション（辞書のプル/プッシュ、ファイルのフィル）を利用できます。現在のエディタファイルは該当する場合、自動的にツリーで表示されます。

#### 辞書のビルド

すべての辞書コンテンツファイルを生成するには：

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Build Dictionaries** を検索してコマンドを実行します。

#### 辞書のプッシュ

最新の辞書コンテンツをアップロードするには：

1. **コマンドパレット** を開きます。
2. **Push Dictionaries** を検索します。
3. プッシュする辞書を選択して確認します。

#### 辞書のプル

- 最新の辞書コンテンツを同期します：

1. **コマンドパレット**を開きます。
2. **Pull Dictionaries** を検索します。
3. プルする辞書を選択します。

#### 辞書の内容を埋める

プロジェクトの内容で辞書を埋めます：

1. **コマンドパレット**を開きます。
2. **Fill Dictionaries** を検索します。
3. コマンドを実行して辞書を埋めます。

#### 辞書のテスト

辞書を検証し、翻訳漏れを見つけます：

1. **コマンドパレット**を開きます。
2. **Test Dictionaries** を検索します。
3. 報告された問題を確認し、必要に応じて修正します。

## ドキュメント履歴

| バージョン | 日付       | 変更内容     |
| ---------- | ---------- | ------------ |
| 5.5.10     | 2025-06-29 | 履歴の初期化 |
