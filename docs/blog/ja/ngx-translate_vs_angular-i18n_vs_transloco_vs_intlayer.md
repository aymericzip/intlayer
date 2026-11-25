---
createdAt: 2026-11-24
updatedAt: 2026-11-25
priority: 8
title: "ngx-translate・Angular i18n・Transloco・Intlayer の比較（2026）"
description: "Angular の i18n ライブラリを比較。ngx-translate、@angular/localize、Transloco、Intlayer の言語切り替え、型安全性、遅延読み込み、複数形、SSR の違いを解説します。"
keywords:
  - ngx-translate
  - Transloco
  - Angular i18n
  - "@angular/localize"
  - Angular 国際化
  - ngx-translate と Transloco の比較
  - Intlayer
  - i18n ライブラリ比較
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate・Angular i18n・Transloco・Intlayer の比較

Angular は主要フレームワークで唯一、独自の i18n を標準搭載しています。その方式はコミュニティのライブラリとは逆です。`@angular/localize` はビルド時に翻訳し、言語ごとにアプリを生成します。`ngx-translate` と Transloco は JSON から実行時に翻訳します。Intlayer はビルド時にコンテンツをコンパイルしつつ、実行時に言語を切り替える単一のアプリを維持します。

ここでは実際の選択を左右する、言語の切り替え方、コンテンツの配置、コンパイラによる検出、ブラウザでの読み込みを比較します。

## 目次

<TOC/>

## 概要

- **`@angular/localize`**（Angular i18n）：実行時のコストがなく、ICU を標準サポート。ただしロケールごとにビルドとデプロイが必要で、言語切り替え時にアプリを再読み込みします。
- **`ngx-translate`**：最も歴史が長く、シンプルな実行時方式。ロケールごとの JSON を HTTP で取得します。キーに型はなく、複数形にはプラグインが必要です。
- **Transloco**：大規模アプリ向けの実行時方式。スコープで機能単位に翻訳を読み込み、ICU、ロケール別の書式、キー抽出をプラグインで補います。
- **Intlayer**：コンポーネントの隣にコンテンツを宣言し、ビルド時に型を生成。コンポーネントとロケール単位に分割し、実行時に言語を切り替えます。カスタム esbuild builder が必要です。

> 各ライブラリの背景は [JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)を参照してください。

- [JavaScript i18n の歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)

## ビルド時か実行時か：方式を分ける選択

**`@angular/localize`** は翻訳をコンパイル済みテンプレートに埋め込みます。`ng build --localize` は `dist/app/en`、`dist/app/fr` などを出力し、それぞれに一言語だけを含めます。実行時に取得も解釈もしないため、読み込み後は最速です。一方、N 個のビルドのテストとフォルダのデプロイ、`/fr/` を対応するフォルダへ送るサーバーや CDN の設定、言語変更時のページ全体の再読み込みが必要です。`ng serve` も一度に一ロケールしか扱えません。

**`ngx-translate` と Transloco** は単一ビルドです。ロケール変更時にサービスが `fr.json` を取得し、各 pipe やディレクティブを再描画します。切り替えは即時ですが、初回描画は HTTP リクエストを待ち、キーは単なる文字列です。SSR ではサーバーでも動く loader が必要です。絶対 URL またはファイルシステム loader を使い、`TransferState` で二重取得を防ぎます。

**Intlayer** も単一ビルドですが、JSON をそのまま取得せず、コンテンツをバンドルにコンパイルします。`useIntlayer()` は Signal を返すため、ロケール変更時にそれを読むコンポーネントが再読み込みなしで更新されます。

実行時ライブラリで見落としやすいのが `LOCALE_ID` です。`DatePipe`、`CurrencyPipe`、`DecimalPipe` が参照する値は起動時に固定されます。`ngx-translate` で言語を変えても日付や価格の書式は変わりません。Transloco は `@jsverse/transloco-locale`、Intlayer は現在のロケールに追従する `useDate`、`useNumber`、`useCurrency` で対応します。`@angular/localize` ではビルドごとに `LOCALE_ID` があるため問題になりません。`Intl` については[日付・時刻・数値の書式ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/date_time_number_formatting_locales.md)を参照してください。

- [日付・時刻・数値の書式ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/date_time_number_formatting_locales.md)

## 機能比較

|                            | `@angular/localize`                                         | `ngx-translate`                           | Transloco                                 | Intlayer                                                               |
| :------------------------- | :---------------------------------------------------------- | :---------------------------------------- | :---------------------------------------- | :--------------------------------------------------------------------- |
| **翻訳の適用**             | ビルド時に埋め込み                                          | 実行時                                    | 実行時                                    | ビルド時にコンパイル、実行時に解決                                     |
| **リリースごとのビルド数** | ロケールごとに一つ                                          | 一つ                                      | 一つ                                      | 一つ                                                                   |
| **ロケール切り替え**       | 別ビルドを再読み込み                                        | 即時                                      | 即時                                      | 即時                                                                   |
| **コンテンツの場所**       | 原文はテンプレート、翻訳は XLIFF/JSON                       | ロケールごとの JSON                       | ロケール別およびスコープ別の JSON         | コンポーネント隣の `.content.ts`/JSON、集中管理も可                    |
| **複数形 / ICU**           | ✅ テンプレートの標準 ICU                                   | ⚠️ `ngx-translate-messageformat-compiler` | ⚠️ `@jsverse/transloco-messageformat`     | ✅ CLDR 準拠の `plural()`、⚠️ ICU 文字列は部分対応                     |
| **キーの型**               | 対象外、原文自体がメッセージ                                | ❌ なし                                   | ❌ なし、Keys Manager で不足を CLI 検出   | ✅ 自動生成、誤ったキーは `ng build` エラー                            |
| **翻訳の不足**             | ビルド警告、`i18nMissingTranslation` でエラーにも設定可     | 実行時にキーを表示                        | 実行時の言語フォールバック、CLI 検査      | TypeScript で検出、CI の `intlayer test`                               |
| **遅延読み込み**           | 不要、各ビルドに一ロケール                                  | ロケール全体、分割は手動                  | ✅ スコープ単位（ルートやコンポーネント） | ✅ コンポーネント・ロケール単位                                        |
| **Signals**                | 対象外、静的テキスト                                        | Pipe と Observable                        | `translateSignal()`                       | `useIntlayer()` が Signal を返す                                       |
| **ビルド設定**             | `ng add @angular/localize` と `angular.json` のロケール設定 | 不要                                      | 不要                                      | `@angular-builders/custom-esbuild` と esbuild プラグイン               |
| **翻訳者の作業**           | ✅ TMS 向けの XLIFF                                         | JSON                                      | JSON                                      | `.content.ts`/JSON、同期プラグイン、ビジュアルエディタ、CLI の AI 補完 |

いくつか補足します。

**`@angular/localize` のメッセージ ID。** カスタム ID（`i18n="@@cartTitle"`）を付けないと、原文のハッシュが ID になります。英語の誤字を直すだけで、そのメッセージの全翻訳が対応を失い、翻訳者の再対応が必要になります。最初からカスタム ID を設定しましょう。

**`ngx-translate` の分割。** 標準 loader は `fr.json` 全体を取得するため、各ページに他の全ページの文字列も届きます。カスタム loader や複数の `TranslateService` で機能別に分割できますが、強制する仕組みはありません。[コンポーネント別と集中型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)で比較しています。

- [コンポーネント別と集中型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)

**Transloco のスコープ。** JSON ファイルのフォルダ（`i18n/cart/en.json`）で、ルートやコンポーネントが提供すると読み込まれます。実行時ライブラリでコンポーネント別コンテンツに最も近い形です。共有コンポーネントが他機能のスコープに依存しなければ、うまく機能します。

**Intlayer の builder。** Angular CLI は esbuild プラグインを公開しないため、`angular.json` に `@angular-builders/custom-esbuild` が必要です。変更は小さいものの、Angular の更新に合わせてサードパーティの builder も維持する必要があります。全設定は [Angular 導入ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_21.md)を参照してください。

- [Angular 導入ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_21.md)

## コミットの状況

`@angular/localize` は `angular/angular` monorepo に含まれ、コミット数を比較できないため除外しています。

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## npm ダウンロード数

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

ダウンロード数は現在の選択より歴史を表します。Transloco 登場以前のアプリは今も `ngx-translate` をインストールし、AI アシスタントも学習コードでの多さから推奨し続けます。Transloco は 2024 年に `@ngneat/transloco` から `@jsverse/transloco` へ移行しましたが、旧スコープもダウンロードされています。

## 同じコンポーネントを各ライブラリで実装する

タイトルと複数形を持つカートの概要です。テンプレートはほぼ同じで、文字列の配置とコンパイラが把握する情報が変わります。

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

英語はテンプレートに残ります。翻訳者は抽出した XLIFF を編集し、ロケールごとに別ビルドを作ります。TypeScript の文字列には `$localize` タグを使います。

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">
  <Tabs group="locale">
  <Tab value="en" label="英語">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="フランス語">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

ICU の複数形には `ngx-translate-messageformat-compiler` が必要です。標準パーサーは `{{count}}` の置換だけを行います。`"cart.titel"` はコンパイルでき、実行時にキーがそのまま表示されます。

  </Tab>
  <Tab label="Transloco" value="transloco">
  <Tabs group="locale">
  <Tab value="en" label="英語">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="フランス語">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

`cart` スコープはコンポーネントの初回描画時に取得します。ICU の複数形には `@jsverse/transloco-messageformat` が必要です。キーに型はなく、不足や未使用のキーを `transloco-keys-manager` が報告します。

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ ja: "カート", en: "Your cart", fr: "Votre panier" }),
    items: t({
      ja: plural({ other: "{{count}} 点の商品" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

全ロケールがコンポーネント隣の一つのファイルにあります。ビルド時に型を生成するため、`content().titel` は `ng build` に失敗し、`t()` のロケール不足はエディタで検出されます。

  </Tab>
</Tabs>

## アプリに合う選択

<AccordionGroup>
<Accordion header="公開サイト、操作は少なく SEO を優先">

`@angular/localize`。ロケールごとにビルドと URL があり、事前レンダリング済みページは翻訳済みで届き、i18n ランタイムも不要です。コンテンツ中心で言語変更が少なければ、ロケール別ビルドの負担は小さくなります。正しい `hreflang` も設定してください。[hreflang ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)を参照できます。

- [hreflang ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="アプリ内で言語を切り替えるダッシュボードや SaaS">

実行時方式が適します。別ビルドの再読み込みではメモリ上の状態が失われ、言語メニューでアプリが再読み込みされると不自然です。二、三ロケールの小規模アプリなら `ngx-translate` で十分です。機能が十数個を超えるなら、スコープを持つ Transloco が堅実です。

</Accordion>
<Accordion header="TMS や翻訳会社から翻訳を受け取る">

`@angular/localize` の XLIFF は各 TMS で扱え、テンプレートの原文も翻訳者の文脈になります。`ngx-translate` と Transloco の JSON も広く対応されています。両者とも ICU の複数形にはプラグインが必要なので、実行時ライブラリを選ぶ前に翻訳先の対応を確認してください。

</Accordion>
<Accordion header="遅延ルートの多い大規模アプリ、バンドルサイズに制約">

Transloco のスコープか Intlayer。どちらも全機能の文字列を全ルートに送るのを防ぎます。違いは強制力です。Transloco のスコープは規約ですが、Intlayer の辞書は `useIntlayer()` がインポートする場所にだけ含まれます。[バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)と[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)を参照してください。

- [バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)
- [動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="型安全性が必須">

標準でキーに型を付けるのは Intlayer だけです。`ngx-translate` と Transloco はキーの誤字もコンパイルでき、本番でキーがそのまま表示されます。Transloco Keys Manager は CI で検出できますが、コンパイルエラーとは異なります。[翻訳の不足の検出](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md)で方式を比較しています。

- [翻訳の不足の検出](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md)

</Accordion>
<Accordion header="AI で翻訳を生成する">

コンポーネント隣のコンテンツと不足ロケールを補う CLI の組み合わせが最短です。Intlayer の [`fill` コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)は自分の API キーで動き、変更分だけを再翻訳します。XLIFF や JSON カタログでは、同じ処理を自分でスクリプト化する必要があります。

- [`fill` コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)

</Accordion>
</AccordionGroup>

## 各方式の弱点

- **`@angular/localize`**：ロケールごとにビルドとデプロイが必要で、言語変更時に再読み込みします。原文変更でハッシュ ID の翻訳が対応を失い、ビルド後に CMS から翻訳を取得するには起動処理の工夫が必要です。
- **`ngx-translate`**：キーに型がなく、複数形と ICU はプラグイン依存。各ページでロケール全体を取得し、非 pure pipe が変更検知ごとに再評価されます。日付や数値の `LOCALE_ID` にも対応しません。
- **Transloco**：キーに型がなく、ICU はプラグイン依存。スコープは規約であり保証ではありません。`@angular/localize` の標準機能を得るにも複数のプラグインが必要です。
- **Intlayer**：`angular.json` にサードパーティの builder が必要で、Angular コミュニティは他の三つより小さく、ICU は部分対応です。コンテンツを分散する設計なので、翻訳者向けに一ファイルへ書き出すには [JSON 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)か CLI が必要です。

- [JSON 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)

## ngx-translate からの移行

[`@intlayer/ngx-translate` 互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/ngx-translate.md)では、Intlayer がコンテンツを提供しながら `TranslateService`、`translate` pipe、`[translate]` ディレクティブを維持でき、テンプレートを一つずつ移行できます。[移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_ngx-translate_to_intlayer.md)に手順があります。Transloco や `@angular/localize` からは [JSON 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)で、既存の JSON カタログを移行中も正本にできます。

- [`@intlayer/ngx-translate` 互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/ngx-translate.md)
- [移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_ngx-translate_to_intlayer.md)
- [JSON 同期プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)

## よくある質問

<FAQ>
<Question title="ngx-translate は今もメンテナンスされていますか？">

はい。数年間の低調な活動の後、2024 年に新しいメンテナーが加わり、`provideTranslateService` などの standalone API を公開しています。実行時 JSON、文字列キー、プラグインによる複数形という設計は同じです。

</Question>
<Question title="新しい Angular アプリには ngx-translate と Transloco のどちらがよいですか？">

小規模でなければ Transloco です。`ngx-translate` の機能に加え、スコープ、Signal ヘルパー、SSR ガイド、キー管理ツールがあります。API が近く、後からの移行は機械的な作業が中心ですが、成長するアプリなら最初から選べます。

</Question>
<Question title="@angular/localize は再読み込みなしで言語を変えられますか？">

本来の設計ではできません。翻訳はビルド時に埋め込まれるため、別言語には別ビルドが必要です。起動前の `loadTranslations()` で実行時に翻訳を読み込めますが、切り替えにはアプリの再起動が必要です。

</Question>
<Question title="Angular の SEO にはどれが最適ですか？">

ライブラリよりルーティングが重要です。ロケール別 URL、`hreflang`、`<html lang>`、翻訳済みのサーバーレンダリング HTML を用意します。`@angular/localize` はロケールごとに別ビルドなので実現しやすく、実行時ライブラリには SSR とローカライズされたルートが必要です。[国際化と SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md)を参照してください。

- [国際化と SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md)

</Question>
<Question title="Intlayer は Analog に対応していますか？">

はい。Vite 経由で利用できます。[Analog ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_analog.md)を参照してください。

- [Analog ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_analog.md)

</Question>
</FAQ>

## 関連資料

- [Angular 22 に Intlayer を導入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_21.md)
- [Angular 19 に Intlayer を導入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_19.md)
- [i18n ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)
- [コンパイラ型と宣言型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)
- [ICU メッセージ形式](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/icu_message_format.md)
- [互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)

他のフレームワークの比較：

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_solid_i18n_library.md)
