---
docName: ci_cd
url: https://intlayer.org/doc/concept/ci-cd
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md
createdAt: 2025-05-20
updatedAt: 2025-06-29
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
---

# CI/CD パイプラインでの翻訳の自動生成

Intlayer は、コンテンツ宣言ファイルの翻訳を自動的に生成することを可能にします。ワークフローに応じて、これを実現する複数の方法があります。

## CMS の利用

Intlayer を使用すると、ローカルでは単一のロケールのみを宣言し、すべての翻訳を CMS を通じてリモートで管理するワークフローを採用できます。これにより、コンテンツと翻訳がコードベースから完全に切り離され、コンテンツ編集者にとってより柔軟性が高まり、ホットコンテンツリロード（変更を適用するためにアプリケーションを再ビルドする必要なし）が可能になります。

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

## Huskyの使用方法

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

    applicationContext: "これはテストアプリケーションです", // 一貫した翻訳生成を確保するのに役立ちます
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # 辞書が最新であることを確認するため
npx intlayer fill --unpushed --mode fill    # 欠落しているコンテンツのみを埋め、既存のものは更新しません
```

> IntlayerのCLIコマンドとその使用方法の詳細については、[CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)を参照してください。

> リポジトリ内に複数のアプリがあり、それぞれ別のintlayerインスタンスを使用している場合は、次のように`--base-dir`引数を使用できます。

```bash fileName=".husky/pre-push"
# アプリ1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# アプリ2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## GitHub Actionsの使用方法

Intlayerは、辞書の内容を自動入力およびレビューするためのCLIコマンドを提供しています。これはGitHub Actionsを使用してCI/CDワークフローに統合することができます。

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer 自動入力
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ リポジトリをチェックアウト
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Node.js のセットアップ
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 依存関係のインストール
        run: npm ci

      - name: ⚙️ Intlayer プロジェクトのビルド
        run: npx intlayer build

      - name: 🤖 欠落している翻訳の自動補完
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 翻訳プルリクエストの作成または更新
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Huskyの場合と同様に、モノレポの場合は `--base-dir` 引数を使用して各アプリを順次処理することができます。

> デフォルトでは、`--git-diff` 引数はベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）への変更を含む辞書をフィルタリングします。

> Intlayer CLI コマンドとその使用方法の詳細については、[CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)を参照してください。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
