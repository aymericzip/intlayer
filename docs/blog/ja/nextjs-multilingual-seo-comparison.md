---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: Next.jsにおけるSEOとi18n
description: next-intl、next-i18next、Intlayerを使ってNext.jsアプリで多言語SEOを設定する方法を学びましょう。
keywords:
  - Intlayer
  - SEO
  - 国際化
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - seo
  - i18n
  - nextjs
---

# Next.jsにおけるSEOとi18n：翻訳だけでは不十分

開発者が国際化（i18n）を考えるとき、最初の反応はしばしば「コンテンツを翻訳すること」です。しかし、多くの人は国際化の主な目的が、あなたのウェブサイトを世界により見えるようにすることだということを忘れがちです。
多言語対応のNext.jsアプリが、検索エンジンに対して異なる言語バージョンのクロールや理解の方法を伝えなければ、あなたの多くの努力は見過ごされてしまうかもしれません。

このブログでは、**なぜi18nがSEOの強力な武器となるのか**、そして`next-intl`、`next-i18next`、`Intlayer`を使ってNext.jsで正しく実装する方法を探っていきます。

---

## なぜSEOとi18nが重要なのか

言語を追加することは単なるUXの向上だけではありません。それは**オーガニックな可視性**を高める強力な手段でもあります。理由は以下の通りです：

1. **より良い発見性:** 検索エンジンはローカライズされたバージョンをインデックスし、ユーザーが母国語で検索した際にそれらをランク付けします。
2. **重複コンテンツの回避:** 適切なカノニカルタグと代替タグが、クローラーにどのページがどのロケールに属するかを伝えます。
3. **より良いUX:** 訪問者はすぐにサイトの適切なバージョンにアクセスできます。
4. **競争優位性:** 多言語SEOを適切に実装しているサイトは少ないため、あなたのサイトは際立つことができます。

---

## Next.jsにおける多言語SEOのベストプラクティス

すべての多言語アプリが実装すべきチェックリストはこちらです：

- **`<head>`内に`hreflang`メタタグを設定する**  
  Googleが各言語のバージョンを理解するのに役立ちます。

- **翻訳されたすべてのページを`sitemap.xml`にリストアップする**  
  `xhtml`スキーマを使用して、クローラーが代替ページを簡単に見つけられるようにします。

- **`robots.txt`でプライベート/ローカライズされたルートを除外する**  
  例：`/dashboard`、`/fr/dashboard`、`/es/dashboard`などがインデックスされないようにします。

- **ローカライズされたリンクを使用する**  
  例：デフォルトの`/about`ではなく、`<a href="/fr/about">À propos</a>`のようにリンクします。

これらは簡単なステップですが、スキップすると可視性を失う可能性があります。

---

## 実装例

開発者はしばしばロケール間でページを適切に参照することを忘れがちなので、さまざまなライブラリでどのように機能するかを見てみましょう。

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... ページの残りのコード
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly", // 毎月の更新頻度
      priority: 0.7, // 優先度
      alternates: { languages: aboutLanguages }, // 言語別の代替URL
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`), // デフォルトロケール以外のパスを追加
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"), // /dashboard へのアクセス禁止
    ...withAllLocales("/admin"), // /admin へのアクセス禁止
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** デフォルトロケールでない場合はロケールをパスの前に付ける */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** 絶対URLヘルパー */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // 正しいJSONファイルを動的にインポートする
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 各ロケールのすべてのURLを含むオブジェクトを生成します。
   *
   * 例:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 戻り値
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... ページの残りのコード
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// すべての多言語URLを取得する関数
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// robots.txtの設定を生成
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // すべてのユーザーエージェントに適用
    allow: ["/"], // ルートパスは許可
    disallow: getAllMultilingualUrls(["/dashboard"]), // /dashboard以下の多言語URLはクロール禁止
  },
  host: "https://example.com", // ホスト名
  sitemap: `https://example.com/sitemap.xml`, // サイトマップのURL
});

export default robots;
```

> Intlayerは、サイトマップ用の多言語URLを生成するための`getMultilingualUrls`関数を提供しています。

  </TabItem>
</Tabs>

---

## 結論

Next.jsでi18nを正しく実装することは、単にテキストを翻訳するだけでなく、検索エンジンやユーザーがどのバージョンのコンテンツを提供すべきかを正確に認識できるようにすることです。
hreflang、サイトマップ、robotsルールの設定が、翻訳を真のSEO価値に変える鍵となります。

next-intlやnext-i18nextは、この連携を実現するための堅実な方法を提供しますが、通常はロケール間で一貫性を保つために多くの手動設定が必要です。

ここでIntlayerが真価を発揮します：

getMultilingualUrlsのような組み込みヘルパーが付属しており、hreflang、サイトマップ、robotsの統合をほぼ手間なく実現します。

メタデータはJSONファイルやカスタムユーティリティに散在するのではなく、一元管理されます。

Next.jsのために最初から設計されているため、設定のデバッグに費やす時間を減らし、リリースに集中できます。

単に翻訳するだけでなく、多言語SEOをスムーズに拡大することを目指すなら、Intlayerは最もクリーンで将来性のあるセットアップを提供します。
