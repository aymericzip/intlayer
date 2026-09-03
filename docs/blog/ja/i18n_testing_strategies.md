---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "壊れやすいテストを作らずに翻訳をテストする方法"
description: i18n対応アプリにおいてテストする価値があるものとないもの。Providerベースのレンダリングテスト、疑似多言語化、RTLと複数形のカバレッジ、そしてスナップショットの罠。
keywords:
  - 翻訳テスト
  - i18n テスト
  - testing library i18n
  - 疑似ローカライゼーション
  - locale provider test
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# 壊れやすいテストを作らずに翻訳をテストする方法

多くのi18nテストスイートは、2つのパターンのいずれかで破綻します。1つは文言そのものをアサートしてしまうパターンで、文言を少し修正するたびに50個のテストが壊れ、チームは最終的にテストを削除してしまいます。もう1つはすべてをデフォルトロケールでのみ描画するパターンで、残りの17言語については何も検証できません。どちらも行き着く先は同じで、誰も信頼しないテストスイートになります。

## 目次

<TOC/>

## パターンはライブラリに依存しません

以下で紹介するパターンは、あらゆるi18nスタックで動作します。プロバイダーを `I18nextProvider`、`NextIntlClientProvider`、または `IntlProvider` に置き換えても、ライブラリの内部APIではなくレンダリングされた結果をアサートするため、テストコードは同一のままです。

カバレッジ検証ツールも同様に移行可能です。[Sync JSONプラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md) を既存カタログに向けたり、[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) を使って現在のインポートにエイリアスを張ることで、既存のJSONに対してそのままカバレッジ検証を実行できます。

## 実際に何をテストしているのかを整理する

翻訳品質はコードテストで検証するものではありません。ドイツ語が自然であるかどうかを判定できるアサーションは存在せず、それを試みるとテスト内にハードコードされた文字列が散乱するだけです。

機械的にテストする価値があるのは以下の項目です。

| テストする価値があるもの                        | テストする価値がないもの   |
| :---------------------------------------------- | :------------------------- |
| 必須ロケールすべてに値が存在する                | 言い回しが洗練されているか |
| 適切なロケールがコンポーネントに届いている      | 各ラベルの厳密なテキスト   |
| 各カテゴリの複数形が解決される                  | 翻訳者が正しく作業したか   |
| RTLロケールで文字方向やミラーリングが適用される | 全ロケールの全文字列       |
| フォーマットされた日付や数値がロケールに従う    | `Intl` 内部実装の正確性    |

カバレッジの担保はコンポーネントテストではなく、単一のデータ駆動型テストで行うべきです。これについては [翻訳漏れを検出する方法](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md) で詳しく解説しています。本記事ではそれ以外の部分を扱います。

## Provider下で描画し、ロールでアサートする

中核となるパターンは、コンポーネントをロケールプロバイダーでラップしてマウントし、テキストではなくロール（role）やテストIDでクエリすることです。

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("renders the summary heading in French", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

`getByRole("heading")` によるクエリは文言の変更に耐えられますが、`getByText("Récapitulatif")` は文言変更で壊れます。文字列自体がテスト対象である稀なケースを除き、リテラル文字列によるクエリは避けましょう。

`aria-label` のような属性にはレンダリングノードではなく未加工の文字列が必要です。Reactの場合、`useIntlayer` のエントリは `.value` フィールドを提供しています。

## ロケールをまたいでテストをパラメータ化する

言語ごとにテストを個別に書くよりも、1つのテストロジックをすべてのロケールに対して回すほうが価値があります。

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("キー名へフォールバックせずに描画される", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // キー名が表示されている場合はルックアップに失敗している
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("正しいテキスト方向が設定されている", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

1つ目のアサーションは手軽で効果的です。キーの取得に失敗してライブラリがキー名をそのまま描画すると、DOM内に `cart.summary.title` のような文字列が現れます。これにより、個別の文字列を検証することなく多くのバグを検知できます。

## 疑似ローカライゼーションでカタログの盲点を突く

すべての文字列を変換するテスト用ロケールを追加します（例: `Checkout` を `[!!! Çĥéçķöũţ !!!]` に変換）。そしてそのロケールでページを描画します。

英語のまま残っている部分はソースコードに直書きされています。ツール側から見ればその文字列は存在しないため、カタログベースの監査では検出できません。また、前後のブラケットはテキストを約30%長くするため、ドイツ語を導入する前にレイアウト崩れを発見できる利点もあります。

これは視覚的な破綻を見つける作業なので、ユニットテストではなくビジュアルリグレッションテストやE2Eテストとして実施するのが適しています。

## 複数形テストは言語ごとではなくカテゴリごとに実施する

複数形のバグは見落とされがちです。英語には2つの形式しかなく、多くの開発者はそれらしか検証しないためです。しかしポーランド語には4つ、アラビア語には6つの形式が存在します。

```ts fileName="plural.test.ts"
// アラビア語は zero, one, two, few, many, other を網羅します。
describe.each([0, 1, 2, 3, 11, 100])("count %i", (count) => {
  it("アラビア語で空文字にならない文字列を生成する", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

すべての言語で単に1と2をテストするのではなく、最も複雑な言語のCLDRカテゴリを網羅する数値を選びます。`Intl.PluralRules` を使えば数値がどのカテゴリに分類されるかが分かるため、推測に頼らずサンプルを決定できます。詳細は [ICUメッセージフォーマットの記事](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/icu_message_format.md) を参照してください。

## スナップショットテストの罠

スナップショットとi18nの相性は最悪です。ローカライズされたコンポーネントのスナップショットにはすべての文字列が含まれます。そのため、翻訳者がポルトガル語のタイポを修正しただけでテストが失敗し、レビュー担当者には判断できないdiffが生まれます。何度か繰り返すうちに、開発者はdiffを読まずに `-u` を実行するようになり、スナップショットは形骸化します。

スナップショットを利用する場合は単一のロケールでのみ取得し、内容ではなく構造チェックとして扱いましょう。ロケール固有の検証はすべて明示的なアサーションで行うべきです。

## 表示だけでなくロケール解決ロジックをテストする

本番環境で最も頻発するi18nバグは、文字列の欠落ではありません。間違ったロケールが選択されることです。URLが `/fr/` であるにもかかわらず、クライアントが `navigator.language` を読み取って不整合が起きるケースです。

コンポーネントから切り離し、解決順序を純粋関数としてテストします。

```ts fileName="locale-resolution.test.ts"
it("保存された設定よりもURLを優先する", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("URLにプレフィックスがない場合はヘッダーにフォールバックする", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

これは多くのプロジェクトで見過ごされている最も価値の高いi18nテストであり、DOMも不要です。

## テストの配置基準

- **Unit**: ロケールネゴシエーション、フォーマッター、複数形カテゴリ。DOM不要で高速。
- **Component**: ロケールごとにProvider経由で描画し、ロールと未解決キーの有無を検証。
- **Coverage**: 必須ロケールに未翻訳がないことを確認するデータ駆動テスト。
- **Visual / E2E**: 疑似ローカライゼーションとRTLページの描画テスト（表示崩れを検出）。

最初の3つはコミットごとにCIで実行します。最後の項目は夜間ビルドで定期実行するのが効率的です。

## よくある失敗

- **すべての箇所でリテラルテキストをアサートする。** 数ヶ月以内にテストスイートが破棄される原因になります。
- **ローカライズされたコンポーネントをスナップショット化する。** 翻訳更新でビルドが止まり、レビューが形骸化します。
- **デフォルトロケールしかテストしない。** 欠落するはずのない言語だけを検証しても意味がありません。
- **複数形を1と2だけでテストする。** 英語に存在しないカテゴリを見落とします。
- **i18nライブラリをモックで消してしまう。** 単にモックが文字列を返すことしかテストできません。
- **ロケール解決ロジックをテストしない。** 本番環境で最も起きやすく、最も簡単に防げる問題です。

## さらに学ぶ

- [コンテンツのテスト: CLI監査、プログラムAPI、UIアサーション](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md)
- [ESLintプラグイン: ハードコードされた文字列と未使用コンテンツの検出](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)
- [フォーマッターとロケールユーティリティ（`getHTMLTextDir` を含む）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)
- [主要フレームワーク間のベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)
- [react-i18next互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-i18next.md)
- [翻訳漏れを検出する方法](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md)
- [ICUメッセージフォーマット: 複数形、select、スケルトン](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/icu_message_format.md)
