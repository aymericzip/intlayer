---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang、多言語SEOガイド"
description: "hreflangとは何か、検索エンジンが実施するルール、x-defaultがほぼ常に間違っている理由、そしてNext.jsおよびTanStack Startで正しいタグを生成する方法。"
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang：多言語SEOガイド

アプリを翻訳しました。`/en`、`/fr`、`/es`をリリースしました。しかし、フランス語ユーザーはまだ英語ページにたどり着いています。

翻訳は簡単な半分です。難しい半分は、検索エンジンにこれらのページが**別の言語の同じページ**であることを伝えることであり、3つのドキュメントが互いに競合していないことです。これが `hreflang` が行うことであり、ほとんどの多言語サイトが静かに交通を失うところです。

---

## hreflang が実際に何であるか

ページ上の注釈で、次のように言っています：_この URL には、これらの言語用に同等のバージョンがあります。_

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

これはあなたに2つのことをもたらします：正しいユーザーに正しいバージョンが表示されることと、あなたのロケールが重複として互いに食い合うのではなく、1つのクラスターに統合されることです。

それが何でないかについて明確にすることは価値があります。これは**リダイレクトではありません** — これはヒントであり、Googleはそれをオーバーライドするかもしれません。これは**ランキングブースト ではありません** — これはあなたがランクするかどうかではなく、**どのバージョンがランクするか**を変更します。そしてBingはそれを完全に無視し、代わりに`content-language`とジオターゲティングに依存しています。

---

## どこで宣言するか

3つの配置、すべて有効です。1つを選んでそこに留まってください — 2つの場所で宣言された同じクラスターは、セットがどのように分散するかを示します。

**HTML `<head>`** は通常の選択です。1つの注意事項があります：ハイドレーション後に注入されたタグは信頼できません。フレームワークがクライアント側でのみそれらを追加する場合、クローラーはそれらを見ることができないかもしれません。

**XML sitemap** はスケールに優れています。10 個のロケール × 5,000 ページは、ブラウザに何も得られない 50,000 個の `<link>` 要素が送信されることになりますが、sitemap では、ページに対してゼロバイトのコストで済みます。

**HTTP `Link` header** は PDF などの非 HTML ファイルの唯一のオプションです。

---

## ルール

### 自己参照と相互性

`/fr/about` のセットには `hreflang="fr"` が含まれ、`/fr/about` を指す必要があります。そして `/about` が `/fr/about` を指す場合、`/fr/about` は逆にポイントしなければなりません。Google は一方向の参照を「no return tag」と呼び、それを削除します。

実際には、**クラスター内のすべてのページが同じリンク セットを送信します**。これらを 1 つの共有ロケール リストから生成することは便利なだけではなく、3 つ以上のロケールを持つ場合に正しい状態を保つための唯一の方法です。

### 絶対 URL、常に

```html
<!-- サイレントに無視される -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- 正しい -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

その理由は暗記するのではなく理解する価値があります。`hreflang` はクロスドキュメント参照です：検索エンジンは URL でキー付けされたクラスターを構築し、そのクラスター内のすべてのページで共有されます。相対パスは、それが存在するドキュメントに対してのみ意味を持つため、それを表現することができません。また、ホストを越えることもできません—別のロケール（例えば `example.fr` や `fr.example.com` にあるロケール）があるとき、alternate はしばしばそれを行います。sitemap または HTTP ヘッダーでは、解決すべき基本ドキュメントがそもそも存在しません。

これはコードに直接的な影響を持ちます。`getLocalizedUrl("/about", "fr")` は `/fr/about` を返します — 相対入力は相対出力です。`hreflang` については、絶対URLを指定する必要があります：

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ ドロップされる
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

唯一の例外は、レンダリング前に相対値を解決するフレームワークです：Next.js は `metadataBase` に対して相対的な `alternates` を展開します。問題ありません — ただしこのルールは **出力されるHTML** に適用されるため、DevTools インスペクタではなく `curl` で確認してください。

### 言語コード

言語の場合は ISO 639-1、オプションのリージョンの場合は ISO 3166-1 Alpha 2：`fr`、`fr-CA`、`pt-BR`。

2つの罠がほぼ全員を捕らえます。地域だけでは無効です — `hreflang="ca"`はカタロニア語であり、カナダではありません。`en-CA`または`fr-CA`が必要です。そして`en-UK`は存在しません。イギリスの国コードは`GB`なので、`en-GB`です。

地域を追加するのは、本当にその地域に異なるコンテンツを提供する場合だけです — 異なる価格、異なる法的通知。同一のコンテンツに対する`fr`と`fr-FR`はノイズです。

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

最も頻繁に忘れられ、そして悪く理解されるコンセプトの1つが`x-default`です — 30%未満のアプリケーションしか正しく実装していません。

`x-default` は、あなたのセットに何も当てはまらないユーザーのためのフォールバックです。英語、フランス語、スペイン語を提供するサイトにアクセスするオランダ語話者は、どのエントリにも当てはまりません。`x-default` がない場合、Google があなたの代わりに選択します。

人々が誤解しているのは、その意味です。`x-default` は **「英語版ではなく」** **「デフォルトロケールでもなく」**、通常はそこを指していても関係ありません。これは _このセットがカバーしないユーザーのためのページ_ を意味します。そのため、`/en` ではなく、言語セレクタまたは地理的リダイレクトランディングページを指すことは正当です。そのようなページがない場合は、あなたの主要言語が妥当な答えです。

2つのことを区別する必要があります: `x-default` はセット内の追加エントリであり、自己参照エントリの置き換えではなく、他のすべてのエントリと同様に、クラスター内のすべてのページに同じ形式で表示される必要があります。

---

## canonical トラップ

ローカライズされた各ページは、**それ自体の canonical** である必要があります:

```html
<!-- https://example.com/fr/about 上 -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

すべてのロケールの canonical を英語版に指定する代わり:

```html
<!-- https://example.com/fr/about 上 — ページを無効にする -->
<link rel="canonical" href="https://example.com/about" />
```

フランス語ページが重複であり、インデックスされるべきではないことを示し、一方で`hreflang`はそれがフランス語ユーザーに提供するページであることを示します。シグナルが矛盾し、canonicalが優先され、フランス語ページがインデックスから外れます。

**Canonicalはロケールごとに自己参照的です。`hreflang`はクラスタを説明します。**

---

## URLの構造を選択する

`hreflang`はURLに注釈を付けるため、構造が最初に来ます。

| 構造                 | 例                | トレードオフ                                                          |
| -------------------- | ----------------- | --------------------------------------------------------------------- |
| **サブディレクトリ** | `example.com/fr/` | 1つのドメイン、共有権限 — より弱い地域シグナル                        |
| **サブドメイン**     | `fr.example.com`  | ロケールの追加または削除が容易 — 別のサイトとして読まれる可能性がある |
| **ccTLDs**           | `example.fr`      | 最も強い国シグナル — ドメインごとに構築された権威                     |

サブディレクトリはほとんどのプロジェクトの正しいデフォルトです。ccTLDsに手を伸ばすのは、本当に個別の国ビジネスとして運営している場合のみにしてください。

避けるべき構造の1つ：`Accept-Language`またはIPに基づいて、**同じURL**で異なる言語を提供すること。クローラーは1つのバージョンを見て、1つのバージョンをインデックスしますため、他のすべてが見えなくなります。

> Intlayerは`routing.mode`と`routing.domains`を通じて3つすべてをカバーしています。[カスタムドメイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/custom_domains.md)と[構成リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

---

## 実装

これらのタグを手作業で書くことは、2番目のlocaleとの接触に耐えられません。代わりに、localeリストから導出してください。

<Steps>

<Step number={1} title="すべてのページでクラスターを出力">

すべての場所で同じセット、localeごとにcanonical、絶対URL、`x-default`を含めます。

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata APIは`alternates.languages`を公開し、`getMultilingualUrls`は設定されたlocaleから全体のレコードを構築します:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) returns:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  // getMultilingualUrls(`${SITE_URL}/about`) は以下を返します:
  // {
  //   en: 'https://example.com/about',
  //   fr: 'https://example.com/fr/about',
  //   es: 'https://example.com/es/about',
  // }
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

フルセットアップ: [Next.js 16 i18n ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

ルートの `head` 関数がリンクを構築します。`localeMap` は設定されたロケールを反復処理するため、設定にロケールを追加すると、それが一度にすべての場所に追加されます:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` はサーバーで実行されるため、タグは初期 HTML に含まれます。完全なセットアップ: [TanStack Start i18n ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)。

</Tab>

</Tabs>

</Step>

<Step number={2} title="または、すべてをサイトマップに移動します">

大規模な場合は、ページから注釈を完全に削除してください。`generateSitemap` は設定からロケールとルーティング モードを読み取り、エントリごとに `xhtml:link` 代替を生成します:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

知っておく価値のある2つのオプション:

- `xhtmlLinks` (デフォルト `true`) — alternates は locale URLs が実際に異なる場所でのみ出力されます。`no-prefix` モードではすべての locale が1つのURLを共有するため、`routing.domains` が locales に独自のホスト名を与えない限りスキップされます。
- `entryPerLocale` (デフォルト `false`) — デフォルトでは1つの `<url>` エントリがすべての代替言語を含みます。どちらの形式も有効ですが、`<loc>` としてリストされたURLのみが Search Console で _送信済み_ としてカウントされます。代替言語のみのロケールは発見可能なままですが、サイトマップに属さないままになります。これをオンにすると、すべてのローカライズされたURLが独自のエントリを取得し、代替言語セット全体が繰り返されます。これはエントリ数をロケール数で乗算するため、50,000 URL / 50 MB の制限に注意し、それを超えた場合はサイトマップインデックスに分割してください。

</Step>

<Step number={3} title="クローラーが受け取るものを確認する">

`hreflang` は無音で失敗するため、それを想定するのではなく確認してください。

ソースを読んでください。インスペクターではなく — `curl https://example.com/fr/about | grep hreflang` はクローラーが取得する内容を表示します。DevTools は JavaScript 実行後の DOM を表示します。その後、各代替言語版をたどって、同じセットで戻ってくることを確認し、リダイレクトされていないことを確認してください。Search Console の International Targeting レポートは、サイト全体の残りの部分を把握します。

多言語固有のクロールの場合、[Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) はローカライズされたページ全体の欠落タグ、壊れた代替言語版、および canonical の競合をチェックします。

</Step>

</Steps>

---

## チェックリスト

- [ ] 各ロケールには、異なるクロール可能な URL があります
- [ ] すべてのページが自身を参照し、すべての参照が相互的です
- [ ] 同じセットがクラスター内のすべてのページに含まれます
- [ ] すべての `href` 値は出力された HTML で絶対パスである
- [ ] コードは ISO 639-1 + ISO 3166-1 Alpha 2 である (`en-UK` ではなく `en-GB`)
- [ ] `x-default` が存在し、マッチしないユーザーがアクセスすべき場所を指している
- [ ] Canonical は locale ごとに自己参照している
- [ ] タグはサーバーレンダリングされており、ハイドレーション後に注入されていない
- [ ] 正確に 1 つの場所で宣言されている
- [ ] Alternate がリダイレクトしていない

---

## まとめ

`hreflang` はシンプルで容赦がありません。1 つの戻りタグが欠けていたり、1 つの相対 URL があったり、1 つのクロスロケール canonical があったりすると、クラスタ全体が破棄され、エラーは表示されません。これらはすべて、タグを手動で記述することから生じます。

単一のロケール リストからセットを派生させ、サーバー側でレンダリングし、canonical を自己参照的に保ち、`x-default` に相応の配慮を与えます。それを一度行えば、正確性は維持する必要がなくなります。

### さらに詳しく

- [SEO と国際化](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md) — より広い多言語 SEO の全体像
- [SEO と Next.js での i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Next.js 16 i18n ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)
- [TanStack Start i18n ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)
- [ロケールごとのカスタムドメイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/custom_domains.md)
- [設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
