---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: Intlayer は Paraglide より軽い？
description: Paraglide はコードがリポジトリ内に直接生成されるため、i18n ベンチマークではほぼノーコストのように見えます。その容量が実際にはどこに移動しているのか、ノードごとのロケール読み取りがなぜコストになるのか、そして Intlayer の動的読み込みが全言語ではなく必要なロケールのみを配信する仕組みを解説します。
keywords:
  - Paraglide
  - Intlayer
  - 国際化
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Intlayer は Paraglide より軽い？

結論から言うと、軽いです。

`Paraglide` は極めて軽量な i18n ソリューションとして知られており、一見すると [ベンチマーク](https://intlayer.org/ja/doc/benchmark/tanstack) でもそれが裏付けられているように見えます。ライブラリサイズはほぼゼロです。しかし、ライブラリサイズがゼロであることは、配信されるバイト数がゼロであることを意味しません。その指標がカウントしていない別の場所にバイトが隠れているに過ぎません。

<TOC/>

## 主なポイント

**ライブラリサイズは消えたのではなく、隠されているだけ：**

Paraglide はランタイムとメッセージ関数をご自身のコードベース内に生成します。そのコードはブラウザに送信されますが、ライブラリではなく「あなた自身のコード」としてカウントされます。

**Provider なしは無料の勝利ではない：**

`m.my_key()` の呼び出しごとにロケールを個別に解決し、レンダリングされるノードごとに Cookie やストレージを読み取ります。コンテキストから一度だけ読み取る方式ではありません。

**動的読み込み（Dynamic Loading）に対応していない：**

Paraglide はメッセージのすべての言語をクライアントバンドルにインポートします。Intlayer で `importMode: 'dynamic'` または `'fetch'` を使用すると、現在表示されているロケールのみが読み込まれます。

**Tree Shaking は保証されない：**

いくつかのベンチマーク環境では、Paraglide がアピールする Tree Shaking が機能しませんでした。ご自身のバンドルで検証することをおすすめします。

## Paraglide の容量はどこへ消えたのか？

ベンチマークレポートの「ライブラリサイズ」指標は、コンテンツを追加する前の空のコンポーネントにおける各 i18n ライブラリの Provider とフックのサイズを測定しています。

| ライブラリ (TanStack Start)   | ライブラリサイズ (gz) | ライブラリサイズ (min) |
| ----------------------------- | --------------------- | ---------------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB                | 4.5 KB                 |
| `react-intlayer@9.5.1`        | 5.0 KB                | 15.2 KB                |

この数値だけを切り取れば Paraglide の勝ちに見えます。しかし Paraglide はコンパイラです。`messages/*.json` ファイルを読み込み、リポジトリ内に `paraglide/` フォルダを生成します。その中には `runtime.js`（ロケール検出、Cookie やストレージ戦略、URL ローカライズ）と、メッセージごとの JavaScript 関数が出力されます。

```bash
src/paraglide/
├── runtime.js      # ロケール検出、各種戦略、URL ヘルパー
├── server.js
├── messages.js     # 全メッセージの再エクスポート
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

このコードは `src/` フォルダ内に配置され相対パスでインポートされるため、バンドラーはこれを `node_modules` のパッケージではなく、アプリケーション自身のコードとして分類します。そのため、ライブラリサイズの列にはほとんど何も表示されませんが、ページバンドル内には全く同じロジックが配信されています。

コードを生成すること自体は悪いアイデアではありません。生成されたランタイムには、設定で必要とされたロジック（プレフィックス戦略、Cookie vs ローカルストレージなど）のみが含まれます。Intlayer は異なるアプローチで同じ成果を実現しています。ビルド時に環境変数を注入することで、バンドラーが設定で使用されていない分岐を自動的に削除します。どちらのアプローチも、`i18next` や `next-intl` と比べて 3〜10 倍軽量です。

したがって、公平な比較の基準はライブラリサイズではありません。**ページごとに実際に送信される JavaScript の総量**です。

## 実測されたページ容量

TanStack Start アプリケーション、10 ページ構成、`en` および `fr` ルートで計測（gzip 圧縮）：

| 構成                               | ページ JS 平均 (gz) | ベース比    | ロケール漏洩率 | 他ページ漏洩率 |
| ---------------------------------- | ------------------- | ----------- | -------------- | -------------- |
| ベース (i18n なし)                 | 111.0 KB            | -           | 0.0%           | 0.0%           |
| `paraglide` (すべての戦略)         | 125.1 KB            | +14.1 KB    | 49.7%          | 0.0%           |
| `intlayer` (`importMode: static`)  | 125.8 KB            | +14.8 KB    | 50.0%          | 0.0%           |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**        | **+7.6 KB** | **0.0%**       | **0.0%**       |

Next.js 16 App Router、同一アプリケーション：

| 構成               | ページ JS 平均 (gz) | ベース比    |
| ------------------ | ------------------- | ----------- |
| ベース (i18n なし) | 141.0 KB            | -           |
| `paraglide-next`   | 155.3 KB            | +14.3 KB    |
| `next-intlayer`    | **141.3 KB**        | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> 詳細なデータは [TanStack Start ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/tanstack) および [Next.js ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/nextjs) を参照してください。すべてのバンドルは [ベンチマークリポジトリ](https://github.com/intlayer-org/benchmark-i18n) で確認できます。

2 つの重要な事実が浮き彫りになります：

- `static` モードにおいて、Intlayer は Paraglide とほぼ同じサイズのコンテンツを配信します（125.8 KB vs 125.1 KB）。これは当然です。どちらもページが使用するメッセージの全言語を含んでいるからです。
- Paraglide は動的モードを持たないため、どのような戦略を選択しても 125.1 KB のままです。上記の表の各行は静的読み込みに相当します。

## Provider なし：一見良さそうで実はそうではない設計

Paraglide には Provider がありません。メッセージをインポートして呼び出すだけです：

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

コンテキストも、ラッパーも、フックもありません。シンプルに見えます。しかし、ロケール情報はどこかから取得する必要があります。生成される各メッセージ関数は、大まかに以下のようになっています（簡略化版）：

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // 呼び出しごとに毎回解決される

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...言語ごとの分岐
};
```

そして `getLocale()` は設定された戦略（Cookie、ローカルストレージ、URL、ベースロケール）を走査して現在のロケールを探します。つまり、描画する各テキストノード（`<>{m.my_key()}</>`）が、ブラウザの `document.cookie` の読み取りを含む独自のロケール解決を実行します。200 個の翻訳文字列があるページでは、1 回のレンダリングで 200 回ロケールが解決され、再レンダリングのたびにそれが繰り返されます。

Provider を利用するライブラリは、ロケールを **1 回だけ** 読み取り、コンテキスト（またはシグナル、ストア）に保存します。各ノードはすでにメモリ上にある値を参照するだけです。Provider のコストはわずか数百バイトです。それを省くことはレンダリングごとの CPU 負荷につながり、ベンチマークにも明確に現れています。TanStack Start において Paraglide のページ読み込み時間と言語切り替え速度は、Intlayer より一貫して劣っています（ページ読み込みで 22.1 ms vs 14.6 ms、E2E リアクティビティで 4.3 ms vs 3.2 ms）。

## 開発体験（Developer Experience）

Paraglide の信頼できる情報源（Source of Truth）は JSON ですが、JSON を直接インポートすることはありません。生成された `.js` をインポートします：

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/ja.json"
{
  "hero_title": "すべての言語でアプリを公開しましょう"
}
```

```tsx fileName="Hero.tsx"
// コンパイラが JSON から再生成した後にのみ存在します
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      ja: "すべての言語でアプリを公開しましょう",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

このサイクルにはデメリットが伴います：

- JSON ファイルを変更するたびに、インポートが解決されたり型が更新されたりする前に再生成を実行する必要があります。
- 生成された `paraglide/` フォルダを Git にコミットするか（テキストを変更する PR ごとに生成ファイルでコンフリクトが発生）、除外するか（型チェック、テスト、CI ジョブの前に毎回生成ステップが必要になる）の二者択一になります。
- すべての文字列が関数呼び出しになります。単なる静的値で十分な場所を含め、至る所で定数が `m.key()` に置き換わります。

## Tree Shaking：バンドルを確認してください

Paraglide の最大のセールスポイントは、各メッセージが独立したエクスポートであるため、使用されていないメッセージが Tree Shaking によって削除されることです。Svelte + Vite のベンチマークでは、宣伝どおりに動作します。

しかし、他の環境ではそうではありませんでした。[Next.js](https://intlayer.org/ja/doc/benchmark/nextjs) の計測では、Paraglide のページはベースアプリより 14 KB 増加したのに対し、`next-intlayer` の増加は 0.3 KB にとどまりました。TanStack Start の初期計測でも、他のページのメッセージがルートバンドルに混入していることが確認されました。

Tree Shaking の成否は、バンドラー（Turbopack、Rolldown、Rollup）、メッセージのインポート方法（`import { m }` vs `import * as m`）、および副作用（Side Effects）の解析精度に左右されます。サイズを理由に Paraglide を採用する場合は、バンドルアナライザーを開いて、ご自身のアプリで正しく動作しているか確認してください。

## 動的読み込み（Dynamic Loading）の欠如

これが構造的な限界です。Paraglide には 1 言語ずつ読み込む手段がありません。各メッセージ関数が各言語の実装を静的にインポートするため、すべての言語がクライアントバンドルに含まれてしまいます。

2 言語の場合、翻訳データの半分が無駄になり、上記の測定で判明した約 50% のロケール漏洩に一致します。10 言語では 90% が無駄になり、30 言語では 97% に達します。

動的読み込みに変更しても解決にはなりません。メッセージごとに関数が分かれているため、それぞれを遅延読み込みすると数千回ものネットワークリクエストが発生してしまうからです。

Intlayer では、グローバルまたは辞書単位で柔軟に設定を選択できます：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | クライアントに配信される内容               | vs Paraglide                        |
| ------------ | ------------------------------------------ | ----------------------------------- |
| `static`     | ページで使用される辞書の全言語             | 理論上は同等の容量                  |
| `dynamic`    | 現在のロケールのみ、辞書ごとに遅延読み込み | N 言語の場合、**N 分の 1 に軽量化** |
| `fetch`      | 現在のロケールのみ、Live Sync API から取得 | N 言語の場合、**N 分の 1 に軽量化** |

[ビルド変換](https://intlayer.org/ja/doc/concept/bundle-optimization) と `importMode: 'static'` を組み合わせることで、Intlayer は理論上 Paraglide とまったく同じ容量を配信します。`'dynamic'` または `'fetch'` を使用すれば、現在のロケールに必要なものだけを読み込むため、N 言語対応のアプリでは翻訳ペイロードが Paraglide と比較して N 分の 1 に削減されます。

## Paraglide が適しているユースケース

<AccordionGroup>
<Accordion header="言語数が少ない Svelte + Vite 環境">

スタックが Svelte + Vite であり、サポートする言語が 2〜3 言語程度であれば、Tree Shaking は仕様どおりに機能し、言語によるオーバーヘッドも小さく抑えられます。

</Accordion>
<Accordion header="既存の inlang ワークフロー">

チームがすでに inlang エコシステム（Fink、Sherlock、メッセージフォーマットプラグイン）を活用している場合、Paraglide はネイティブに連携できます。

</Accordion>
</AccordionGroup>

## ご自身のアプリで検証してみてください

無料の [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) を使って、本番アプリケーションの転送量とロケール漏洩をチェックできます：

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Intlayer の導入手順：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

## 関連リファレンス

- [TanStack Start i18n ベンチマーク](https://intlayer.org/ja/doc/benchmark/tanstack)
- [Next.js i18n ベンチマーク](https://intlayer.org/ja/doc/benchmark/nextjs)
- [バンドル最適化と `importMode`](https://intlayer.org/ja/doc/concept/bundle-optimization)
- [React 向け i18n ライブラリの選び方](https://intlayer.org/ja/blog/how-to-pick-react-i18n-library)
- [コンパイラ駆動型国際化のメリットとデメリット](https://intlayer.org/ja/blog/compiler-vs-declarative-i18n)
