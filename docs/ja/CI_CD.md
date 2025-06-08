# CI/CD パイプラインでの翻訳の自動生成

Intlayer は、コンテンツ宣言ファイルの翻訳を自動生成する機能を提供します。ワークフローに応じて、これを実現する方法は複数あります。

## CMS を使用する

Intlayer を使用すると、ローカルで単一のロケールのみを宣言し、すべての翻訳を CMS を通じてリモートで管理するワークフローを採用できます。これにより、コンテンツと翻訳がコードベースから完全に分離され、コンテンツ編集者に柔軟性を提供し、ホットコンテンツリロード（変更を適用するためにアプリケーションを再構築する必要がない）を可能にします。

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

    applicationURL: process.env.APPLICATION_URL, // CMS で使用されるアプリケーション URL

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS の認証情報
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "これはテストアプリケーションです", // 一貫した翻訳生成を保証するためのコンテキスト
  },
};

export default config;
```

CMS についての詳細は、[公式ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md)を参照してください。

## Husky を使用する

[Husky](https://typicode.github.io/husky/) を使用して、ローカル Git ワークフローに翻訳生成を統合できます。

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
    apiKey: process.env.OPENAI_API_KEY, // 独自の API キーを使用

    applicationContext: "これはテストアプリケーションです", // 一貫した翻訳生成を保証するためのコンテキスト
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # 辞書が最新であることを確認
npx intlayer fill --unpushed --mode fill    # 欠落しているコンテンツのみを埋める（既存のものは更新しない）
```

> Intlayer CLI コマンドとその使用方法についての詳細は、[CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を参照してください。

> リポジトリ内に複数のアプリがあり、それぞれが別々の Intlayer インスタンスを使用している場合、以下のように `--base-dir` 引数を使用できます：

```bash fileName=".husky/pre-push"
# アプリ 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# アプリ 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## GitHub Actions を使用する

Intlayer は、辞書コンテンツを自動補完およびレビューする CLI コマンドを提供します。これを GitHub Actions を使用した CI/CD ワークフローに統合できます。

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
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

      - name: 🟢 Node.js をセットアップ
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 依存関係をインストール
        run: npm ci

      - name: ⚙️ Intlayer プロジェクトをビルド
        run: npx intlayer build

      - name: 🤖 欠落している翻訳を自動補完
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 翻訳 PR を作成または更新
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Husky の場合と同様に、モノレポの場合は `--base-dir` 引数を使用して各アプリを順次処理できます。

> デフォルトでは、`--git-diff` 引数は、ベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）までの変更を含む辞書をフィルタリングします。

> Intlayer CLI コマンドとその使用方法についての詳細は、[CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を参照してください。
