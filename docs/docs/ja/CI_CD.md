---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: CI/CD 統合
description: Intlayer を CI/CD パイプラインに統合して、自動化されたコンテンツ管理とデプロイメントを実現する方法を学びます。
keywords:
  - CI/CD
  - 継続的インテグレーション
  - 継続的デプロイメント
  - 自動化
  - 国際化
  - ドキュメンテーション
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# CI/CD パイプラインでの翻訳の自動生成

Intlayer は、コンテンツ宣言ファイルの翻訳を自動生成することを可能にします。ワークフローに応じて、これを実現する複数の方法があります。

## CMS の利用

Intlayer を使用すると、ローカルでは単一のロケールのみを宣言し、すべての翻訳は CMS を通じてリモートで管理するワークフローを採用できます。これにより、コンテンツと翻訳がコードベースから完全に切り離され、コンテンツ編集者にとってより柔軟性が提供され、ホットコンテンツリロード（変更を適用するためにアプリケーションを再ビルドする必要なし）が可能になります。

### 設定例

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // オプションのロケールはリモートで管理されます
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // リモートコンテンツが優先されます

    applicationURL: process.env.APPLICATION_URL, // CMSで使用されるアプリケーションのURL

    clientId: process.env.INTLAYER_CLIENT_ID, // CMSの認証情報
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // 一貫した翻訳生成を支援します
  },
};

export default config;
```

CMSの詳細については、[公式ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を参照してください。

## Huskyの使用

[Husky](https://typicode.github.io/husky/)を使用して、ローカルのGitワークフローに翻訳生成を統合できます。

### 設定例

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // オプションのロケールはリモートで処理されます
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // ご自身のAPIキーを使用してください

    applicationContext: "This is a test application", // 一貫した翻訳生成を支援します
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # 辞書が最新であることを確認するため
npx intlayer fill --unpushed --mode fill    # 欠落しているコンテンツのみを埋め、既存のものは更新しません
```

> Intlayer CLIコマンドとその使用方法の詳細については、[CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)を参照してください。

> リポジトリ内に複数のアプリがあり、それぞれ別のintlayerインスタンスを使用している場合は、次のように`--base-dir`引数を使用できます。

```bash fileName=".husky/pre-push"
# アプリ1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# アプリ2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## GitHub Actionsの使用

Intlayerは辞書コンテンツの自動入力およびレビューを行うCLIコマンドを提供しています。これはGitHub Actionsを使用してCI/CDワークフローに統合することができます。

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer 自動入力
# このワークフローのトリガー条件
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # ステップ1: リポジトリから最新コードを取得
      - name: ⬇️ リポジトリをチェックアウト
        uses: actions/checkout@v4
        with:
          persist-credentials: true # PR作成のための認証情報を保持
          fetch-depth: 0 # 差分解析のために完全なGit履歴を取得

      # ステップ 2: Node.js環境のセットアップ
      - name: 🟢 Node.jsをセットアップ
        uses: actions/setup-node@v4
        with:
          node-version: 20 # 安定性のためNode.js 20 LTSを使用

      # ステップ 3: プロジェクト依存関係のインストール
      - name: 📦 依存関係をインストール
        run: npm install

      # ステップ 4: 翻訳管理のためにIntlayer CLIをグローバルインストール
      - name: 📦 Intlayerをインストール
        run: npm install -g intlayer-cli

      # ステップ 5: 翻訳ファイルを生成するためにIntlayerプロジェクトをビルド
      - name: ⚙️ Intlayerプロジェクトをビルド
        run: npx intlayer build

      # ステップ 6: AIを使って不足している翻訳を自動で埋める
      - name: 🤖 欠落している翻訳を自動入力
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # ステップ7: 変更があるか確認し、あればコミットする
      - name: � 変更を確認
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # ステップ8: 変更があればコミットしてプッシュする
      - name: 📤 変更をコミットしてプッシュ
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: auto-fill missing translations [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

環境変数を設定するには、GitHub → 設定 → Secrets and variables → Actions に移動し、シークレット（API_KEY）を追加してください。

> Huskyの場合と同様に、モノレポの場合は `--base-dir` 引数を使用して各アプリを順番に処理できます。

> デフォルトでは、`--git-diff` 引数はベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）への変更を含む辞書をフィルタリングします。

> Intlayer CLIコマンドとその使用方法の詳細については、[CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)を参照してください。
