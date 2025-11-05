---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: next-intl を使った Next.js 15 の翻訳方法 – 2025 年版 i18n ガイド
description: Next.js 15 の App Router ウェブサイトを多言語対応にする方法を解説します。国際化（i18n）と翻訳のためのドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Intlayer を使った next-intl による Next.js 15 の翻訳 | 国際化 (i18n)

このガイドでは、Next.js 15（App Router）アプリにおける next-intl のベストプラクティスを解説し、堅牢な翻訳管理と自動化のために Intlayer を重ねて使う方法を紹介します。

[next-i18next vs next-intl vs Intlayer の比較はこちら](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md) をご覧ください。

- 初級者向け：ステップバイステップのセクションに従って、多言語対応アプリを作成しましょう。
- 中級者向け：ペイロードの最適化とサーバー/クライアントの分離に注意してください。
- 上級者向け：静的生成、ミドルウェア、SEO統合、自動化フックに注目してください。

本ガイドで扱う内容：

- セットアップとファイル構成
- メッセージの読み込み最適化
- クライアントおよびサーバーコンポーネントの使用
- メタデータ、サイトマップ、robots.txt によるSEO対策
- ロケールルーティングのためのミドルウェア
- Intlayer の追加（CLIと自動化）

## next-intl を使ったアプリケーションのセットアップ

next-intl の依存関係をインストールします：

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### セットアップとコンテンツの読み込み

ルートで必要な名前空間のみを読み込み、ロケールを早期に検証します。可能な限りサーバーコンポーネントは同期的に保ち、クライアントには必要なメッセージだけを渡します。

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // レイアウトやページで必要な名前空間のみを読み込みます
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // このサーバーレンダリング（RSC）用にアクティブなリクエストのロケールを設定
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // メッセージはサーバー側で読み込まれます。クライアントには必要なものだけを渡します。
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // 完全にサーバー側での翻訳/フォーマット処理
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### クライアントコンポーネントでの使用例

カウンターをレンダリングするクライアントコンポーネントの例を見てみましょう。

**翻訳（形は再利用可能；お好みで next-intl のメッセージに読み込んでください）**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "カウンター",
    "increment": "インクリメント"
  }
}
```

**クライアントコンポーネント**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // ネストされたオブジェクトに直接スコープを設定
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> ページのクライアントメッセージに "about" メッセージを追加するのを忘れないでください
> （クライアントが実際に必要とする名前空間のみを含めてください）。

### サーバーコンポーネントでの使用方法

このUIコンポーネントはサーバーコンポーネントであり、クライアントコンポーネントの下でレンダリングできます（ページ → クライアント → サーバー）。事前に計算された文字列を渡して同期的に保ちます。

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

注意：

- `formattedCount` はサーバー側で計算してください（例：`const initialFormattedCount = format.number(0)`）。
- サーバーコンポーネントに関数やシリアライズ不可能なオブジェクトを渡すことは避けてください。

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
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
    locales.map((locale) => [locale, localizedPath(locale, url)])
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
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
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
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### ロケールルーティングのためのミドルウェア

ロケール検出とルーティングを処理するミドルウェアを追加します：

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // API、Nextの内部処理、静的アセットをスキップ
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### ベストプラクティス

- **htmlの`lang`と`dir`を設定する**：`src/app/[locale]/layout.tsx`で`getLocaleDirection(locale)`を使って`dir`を計算し、`<html lang={locale} dir={dir}>`を設定します。
- **メッセージを名前空間ごとに分割する**：ロケールと名前空間ごとにJSONを整理します（例：`common.json`、`about.json`）。
- **クライアントのペイロードを最小化する**: ページでは、必要な名前空間のみを `NextIntlClientProvider` に送信します（例: `pick(messages, ['common', 'about'])`）。
- **静的ページを優先する**: `export const dynamic = 'force-static'` をエクスポートし、すべての `locales` に対して静的パラメータを生成します。
- **同期的なサーバーコンポーネント**: 非同期呼び出しやシリアライズ不可能な関数の代わりに、事前に計算された文字列（翻訳済みラベル、フォーマット済み数値）を渡します。

## next-intl の上に Intlayer を実装する

intlayer の依存関係をインストールします:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

intlayer の設定ファイルを作成します:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // 各ネームスペースのフォルダ構造をIntlayerと同期させる
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`package.json`のスクリプトを追加：

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

注意事項：

- `intlayer fill`: 設定されたロケールに基づいて、AIプロバイダーを使用して不足している翻訳を補完します。
- `intlayer test`: 不足している翻訳や無効な翻訳をチェックします（CIでの使用を推奨）。

引数やプロバイダーの設定方法については、[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md) を参照してください。
