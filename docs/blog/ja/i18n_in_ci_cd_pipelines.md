---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "粗悪な翻訳をリリースしないためのCI/CD自動化戦略"
description: i18nを自動化する3つのフェーズ（Pre-push、Pull Request、ランタイム）。カバレッジによるビルドのゲート制御、安全な自動補完、コミットの無限ループ回避法。
keywords:
  - 翻訳自動化 ci
  - i18n ci cd
  - github actions 翻訳
  - husky pre-push
  - 継続的ローカライゼーション
  - 翻訳パイプライン
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# 粗悪な翻訳をリリースしないためのCI/CD自動化戦略

手動による翻訳作業は、頻繁なリリースサイクルに耐えられません。金曜日に誰かが文字列を追加し、次のスプリントまでエクスポートが後回しにされ、その間にさらに3言語の翻訳が遅れていきます。自動化すること自体は簡単です。しかし、機械翻訳の出力を無検証のままユーザーに公開することなく安全に自動化することこそが、真に考えるべきテーマです。

## 目次

<TOC/>

## 自動化のために大規模な移行をする必要はありません

以下で紹介するパイプライン構成はライブラリに依存せず、ツールも同様です。翻訳メッセージが i18next、next-intl、react-intl、vue-i18n、next-translate などのJSONカタログで管理されている場合、[Sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md) はそれらのファイルをその場で読み書きします。

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // または next-intl / react-intl 向けに "icu"
    }),
  ],
};

export default config;
```

アプリケーション側のインポートは既存のままで構いません。後述のCIジョブが既存のカタログを補完および検証するため、レビュー担当者が見る差分は `locales/fr/checkout.json` の変更だけであり、コードベース全体の移行作業ではありません。gettextワークフロー用の [Sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md) や、ランタイムAPIをそのまま維持するための [互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) も用意されています。

## ゲート（Gate）とフィル（Fill）を分離する

役割の異なる2つのタスクが混同されがちです。

**ゲート（Gate）** は、失敗を検知するチェックです。必須ロケールの翻訳が不足している場合にビルドを停止させます。ファイルへの書き込みは一切行いません。

**フィル（Fill）** は、データの更新です。不足している翻訳を生成してコミットします。ビルドを失敗させることはありません。

フィルだけを実行するとビルドは一切停止せず、レビューされていない機械翻訳が本番環境へそのまま流出してしまいます。ゲートだけを実行するとビルドが頻繁に失敗し、都度人間が手作業で対応しなければならなくなります。ほとんどのチームでは、異なるトリガーで両方を連携させることが最適解となります。つまり、Pull Request作成時にフィルを実行し、リリースブランチへのマージ時にゲートで検証します。

## 自動化を組み込むフェーズの比較

| フェーズ         | トリガー    | 適した用途                                 | コスト                                       |
| :--------------- | :---------- | :----------------------------------------- | :------------------------------------------- |
| Pre-push フック  | ローカルGit | 高速フィードバック、CI時間の消費なし       | 開発者のPCおよび個人APIキーで実行            |
| Pull request     | CIジョブ    | マージ前のレビュー、シークレットの一元管理 | CI実行時間およびPRごとのモデル呼び出しコスト |
| リリースブランチ | CIジョブ    | カバレッジに対する厳格なゲート             | 安価、AIモデルの呼び出しなし                 |
| ランタイム       | CMS         | ビルド不要でのコンテンツ更新               | ホスティング環境への依存                     |

## Pre-push: 最も速いフィードバックループ

Huskyを使えば、コードが手元のマシンを離れる前にフィルを実行できるため、新しい文字列を追加したコミットと同じプッシュに翻訳を含めることができます。

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` は未プッシュのコンテンツに処理を限定するため、毎回のプッシュで待たされるのを防ぎます。`--mode complete` は値が存在しない項目のみを補完し、既にレビュー済みの翻訳を上書きしないため安心です。

モノレポの場合はアプリケーションごとに対象を絞り込みます。

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

ただし、開発者全員にAPIキーが必要になり、プッシュする人にコストが偏るという明確なデメリットがあります。そのため、チーム規模が大きくなるとCIへ移行するのが一般的です。

## Pull request: レビューが行われる場所で自動補完する

同じ処理をGitHub Actionsで実行し、差分のみを対象にします。

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

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
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

重要なポイントが4つあります。

- **`fetch-depth: 0`**: `--git-diff` を機能させるために必須です。Shallow cloneでは差分比較の基準が存在しないため、何も補完されなくなります。
- **コミットメッセージの `[skip ci]`**: ワークフローの無限ループを防ぎます。これがないとコミットが新たなジョブを起動し、そのジョブがまたコミットするという悪循環に陥り、CI枠を瞬時に消費してしまいます。
- **`concurrency` と `cancel-in-progress`**: 複数のプッシュが同時に同じファイルを書き換える競合を防ぎます。
- **`--git-diff`**: PRで変更された部分だけをフィル対象にします。これを省くと、実行のたびに全カタログを再翻訳してしまいます。

生成された翻訳はPRブランチへのコミットとして反映されるため、レビュー担当者は差分として確認できます。マージ後ではなくPR上で行う理由はここにあります。

## リリースブランチ: ゲートによる安全担保

ゲート処理はモデル呼び出しが不要で、高速に完了するべきです。

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

CLIのテキストレポートに頼るのではなく、アサーションを含むテストでカバーします。

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("必須ロケールに翻訳漏れがないこと", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` はレポートを出力しますが終了コード0を返すため、情報提供にとどまりビルドを停止させません。ローカルではCLIを使い、CIではテストによるアサーションを活用してください。詳細は [翻訳漏れを検出する方法](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md) を参照してください。

## `requiredLocales` で実用的なゲートを維持する

全18言語の完全性を一律に求めるゲートを作ると、翻訳が遅れている1言語のために全リリースが滞り、最終的にチェック自体が無効化されてしまいます。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

サポートする言語を `locales` に宣言し、リリースをブロックすべき言語のみを `requiredLocales` に指定します。それ以外の言語は非同期に翻訳を進めることができ、デプロイの妨げになりません。

## 翻訳をリポジトリから完全に分離する手法

もう1つのアプローチは、ソースコード上では1言語のみを宣言し、残りをLive Sync対応のCMSでリモート管理することです。コンテンツの変更にアプリの再ビルドが不要になるため、テキスト編集サイクルとリリースサイクルを完全に切り離せます。

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

これは非エンジニアが文言を管理するチームに適しています。編集の自由度が高まる一方で、Gitリポジトリの状態だけでは画面表示を完全に再現できなくなるというトレードオフがあります。詳細は [CMSドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) をご覧ください。

なお、`clientSecret` はサーバーサイドの認証情報です。CIのシークレット設定やサーバーの環境変数で管理し、クライアント向けバンドルに含めないでください。

## 自動化が抱える本質的な限界

ここまでに紹介した方法は、あくまで「翻訳の存在（カバレッジ）」を担保するものであり、「品質」を保証するものではありません。自動補完によってキーに値が入るため監査は通過しますが、その文言はまだ誰も読んでいません。

社内向けツールや変更履歴、ベータ版の言語であれば問題ないかもしれませんが、料金表、利用規約、決済エラーメッセージなど、ユーザーの意思決定に直結する重要箇所の機械翻訳をそのまま公開するのは危険です。重要な文言は人間のレビューを通し、`--mode complete` を使用して確認済みテキストが上書きされないようにしてください。

また、出力の整合性を保つためにAIへコンテキストを与えましょう。

```ts
ai: {
  applicationContext: "B2B請求管理アプリ。丁寧な表現を使用。製品名は翻訳しないこと。",
}
```

## よくある失敗

- **自動コミットに `[skip ci]` を付け忘れる。** ワークフローが無限ループに陥ります。
- **`--git-diff` 使用時に Shallow clone を行う。** 比較基準がなく、何も処理されずに終わります。
- **実行のたびに全カタログを再翻訳する。** コスト削減のために `--git-diff` や `--unpushed` を指定してください。
- **CLIレポートをゲートとして使う。** 正常終了（コード0）するためビルドが止まりません。
- **全言語を必須（required）にしてしまう。** リリースが止まり、最初の障害でチェックが撤廃されます。
- **ゲートのないフィルジョブを組む。** エラーが発生せず、未確認のAI生成テキストが本番へ流出します。
- **モデルのAPIキーをリポジトリに含めてしまう。** `clientSecret` 同様、必ずCIシークレットで保護してください。

## さらに学ぶ

- [CI/CD: Husky、GitHub Actions、CMSによる翻訳の自動生成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)
- [コンテンツのテストとカバレッジによるビルドのゲート制御](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md)
- [autoFill: ロケールごとの宣言ファイルの自動生成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)
- [設定リファレンス: `locales`、`requiredLocales`、`editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [主要フレームワーク間のベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)
- [i18next互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/i18next.md)
- [翻訳漏れを検出する方法](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md)
- [壊れにくい翻訳テスト戦略](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_testing_strategies.md)
