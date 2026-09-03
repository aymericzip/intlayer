---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "ユーザーに見つかる前に翻訳漏れを検出する方法"
description: 翻訳漏れは静かに発生します。フォールバックがエラーを隠してしまう理由、実際に機能する4つの検出レイヤー、そして未翻訳キーでビルドを失敗させる方法を解説します。
keywords:
  - 翻訳漏れを検出
  - 翻訳キーの不足
  - i18n 監査
  - 未翻訳テキスト
  - 翻訳カバレッジ
  - i18n lint
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# ユーザーに見つかる前に翻訳漏れを検出する方法

翻訳漏れによってアプリケーションがエラーを投げることはほとんどありません。設定にもよりますが、日本人ユーザーに突然英語が表示されたり、本番環境の画面に `checkout.summary.total` とそのまま出力されたりします。どちらも問題なくデプロイされ、コードレビューをすり抜け、開発者ではなくユーザーからの指摘によって初めて発覚します。

## 目次

<TOC/>

## ライブラリの種類を問わず適用できます

本記事の内容は特定のスタックに限定されません。後述する検出レイヤーは、i18next、react-i18next、next-intl、react-intl、vue-i18n、next-translate、Lingui など、どの環境でも同様に機能します。これらはすべて同じ方法でキーを解決し、同じ理由で不具合を生じるためです。

ツールも同様に移植可能です。翻訳メッセージがJSONカタログとして管理されている場合、[Sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md) を使用することで、コンテンツの場所やインポートパスを変更することなくIntlayerの監査、自動補完、テストコマンドを実行できます。

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

ランタイムAPIもそのまま維持したい場合は、[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) を使ってバンドラーレベルで `useTranslation` や `$t` などのエイリアスを設定できます。以下のコマンド群は設計思想の一例として捉えてください。

## なぜ翻訳漏れは目に見えないのか

あらゆるi18nライブラリは、同一のルックアップチェーンを採用しています。まずアクティブなロケールを検索し、なければデフォルトロケールにフォールバックし、それでも解決できなければキー名そのものを文字列として返します。この最後のステップこそが問題の本質です。キーの欠落を異常として処理する仕組みがパイプラインにないため、エラーも出ず、本番の警告ログも残らず、テストも通過してしまいます。

フォールバック機能は問題を解決するどころか悪化させます。英語で静かに描画された画面は、英語を話す開発者や自動化テストの目には正常に見えてしまうからです。不具合は、その言語を読めないユーザーにしか見えません。

したがって、「実行時に翻訳漏れをどう扱うか」ではなく、「翻訳漏れがある状態でのマージをどう防ぐか」を考える必要があります。

## 翻訳漏れを捕捉する4つのレイヤー

それぞれのレイヤーで捕捉できる領域が異なります。複数を組み合わせて運用するのが理想的です。

| レイヤー           | 検知できるもの                             | 見落とすもの                         |
| :----------------- | :----------------------------------------- | :----------------------------------- |
| 型定義             | そもそも存在しないキー                     | キーは存在するが `ja` の翻訳値が空   |
| リント (Lint)      | 翻訳対象として抽出されていない直書き文字列 | カタログから不足しているキー         |
| 監査 (Audit)       | 宣言されたキーに対する全言語のカバレッジ   | そもそも国際化対応されていない文言   |
| レンダリングテスト | キーは解決されるが表示崩れを起こすケース   | テストで網羅されていないすべての画面 |

多くのチームで盲点となっているのは3行目です。キーの定義自体は正しくても、18言語すべてに翻訳値が存在するかどうかを検証する仕組みが欠落しています。

## レイヤー1: キーを文字列ではなく型にする

`t("checkout.summry.total")` のようなタイポは、文字列のままだと正常にコンパイルされてしまいます。キーが単なる文字列である場合、リネームは本番障害のリスクを孕み、削除のたびに孤立したキーが蓄積されます。

キーを型付けすることで、タイポをビルドエラーとして検知できます。`react-i18next` では宣言のマージ（Declaration Merging）、`next-intl` ではメッセージ構造からの推論、LinguiではソーステキストからのID生成、Intlayerでは宣言ファイルからの型自動生成によって実現されます。

ただし、このレイヤーは必要条件であっても十分条件ではありません。型はデフォルトカタログの構造を保証するだけであり、韓国語にそのキーの値が存在するかどうかは関知しないためです。

## レイヤー2: キーになっていない直書き文字列をリントする

見つからない翻訳の多くは、最初から外部ファイル化されていないテキストです。コンポーネント内にハードコードされた文言は、カタログ監査ツールからは認識できません。ツールにとって、その文字列は存在しないのと同じだからです。

IntlayerのESLintプラグインは、`no-raw-text` によって直書きテキストを検出し、さらに `no-unused-content` によって宣言されているがどこからも使われていない不要なコンテンツを検出します。

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` は、カタログが無駄に肥大化するのを防ぎます。使われていないデッドキーは動作エラーにはなりませんが、外部翻訳サービスへの発注費用を無駄に跳ね上げる原因となります。ルールの詳細は [ESLintプラグインドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md) を参照してください。

## レイヤー3: ロケールカバレッジの監査

これこそが最も本質的な問いに答えるレイヤーです。IntlayerはこれをCLIコマンドとして提供しています。

```bash packageManager="npm"
npx intlayer content test
```

設定されたロケールと宣言された辞書を読み込み、どのファイルのどのキーにどの言語が不足しているかを詳細に出力します。

CIに組み込む前に知っておくべき注意点として、**このCLIはレポートを出力しますが終了コード0を返します。** そのため、そのままパイプラインに入れると、ビルドが通ったままログの中に警告が埋もれてしまいます。ビルドを停止させたい場合は、後述のプログラムAPIを使用してください。

## レイヤー4: テストスイート内でアサーションを行う

`listMissingTranslations()` は同じ監査結果をデータ構造として返すため、CIのゲートとして最適です。

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("必須ロケールに翻訳漏れがないこと", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

戻り値には以下の3つの重要なフィールドが含まれます。

- `missingTranslations`: キーごとに、どの言語がどのファイルで不足しているか。テスト失敗時に出力すべき情報です。
- `missingLocales`: 全キーを通じて不足している言語のユニオン。
- `missingRequiredLocales`: 設定内の `requiredLocales` に限定された不足言語（未設定の場合は全言語が対象）。

## `requiredLocales` が実用的な運用を可能にする

18言語を提供しているからといって、全言語が100%揃うまでデプロイを止めるべきではありません。多くのチームでは、リリースをブロックする必須言語と、順次補完していく言語を段階的に分けて管理しています。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

`requiredLocales` を指定しない場合、宣言された全言語が必須扱いとなり、翻訳が遅れている言語が1つあるだけでビルドが止まり続けます。その結果、チェック自体が無効化されてしまうケースが後を絶ちません。

## すでに本番に紛れ込んだ漏れを見つけ出す手法

ここまでの方法は新たな翻訳漏れの混入を防ぐためのものです。すでにリリース済みのアプリに対しては、以下の2つの手法が効果的です。

**疑似ローカライゼーション。** 全文字列を `[!!! Ĉĥéçķöũţ !!!]` のように変換するテスト用ロケールでアプリを動かします。英語のまま残っている部分は確実にコードに直書きされています。画面そのものを検証するため、カタログ監査ツールでは不可能な検出をわずか10分で完了できます。

**自社サイトのクローリング。** 言語別URLを使用している場合、ロケールごとのページを取得し、HTML内にデフォルト言語の文言が含まれていないか検索します。`/ja/` のページに "Add to cart" が含まれている場合、それは翻訳漏れか、意図しないフォールバックが発生している証拠です。

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## 不足した翻訳を補完する

不足箇所が判明したら、`intlayer fill` で空のエントリを自動入力できます。また、`autoFill` オプションを使用すれば、コンテンツを宣言した時点で言語別ファイルを自動生成できます。詳細は [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md) を参照してください。

ここで重要なのは、機械による自動補完は「目に見える不足」を「目に見えない不足」に変える手段にすぎないという点です。キーが埋まるためテストはパスしますが、その文言はまだ誰もレビューしていません。開発をブロックしないための足場として活用し、重要な文言は必ず人間の手で確認してください。

## よくある失敗

- **フォールバックを安全対策だと錯覚する。** エラーを隠す緊急回避策にすぎません。英語で静かに表示されるのはバグです。
- **CLIレポートだけでCIを止めようとする。** `intlayer content test` は正常終了するため、テストコード内でアサーションを行ってください。
- **全言語を必須にしてしまう。** リリースが止まり、最初の障害で監査ごと撤廃される原因になります。
- **カタログだけを見て画面を見ない。** 直書きされたテキストはカタログ監査には絶対に現れません。
- **デフォルト言語しかテストしない。** 欠落するはずのない言語を検証しても意味がありません。
- **機械翻訳だけで作業を完了させてしまう。** 監査はパスしても、品質が保証されていないテキストが残ります。

## さらに学ぶ

- [コンテンツのテスト: CLI監査、プログラムAPI、UIアサーション](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md)
- [ESLintプラグインルール (`no-raw-text`、`no-unused-content`)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)
- [autoFill: ロケール別宣言ファイルの自動生成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)
- [設定リファレンス: `locales`、`requiredLocales`、`defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [主要フレームワーク間のベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)
- [i18next互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/i18next.md)
- [国際化（i18n）がカバーする領域の本質](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/what_is_internationalization.md)
- [コンポーネント指向 vs 集中管理型i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)
