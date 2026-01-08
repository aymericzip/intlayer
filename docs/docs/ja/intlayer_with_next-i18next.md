---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: next-i18next を使った Next.js 15 の翻訳方法 – 2025 年版 i18n ガイド
description: next-i18next/next-i18next を使って Next.js 15 の App Router アプリを国際化し、Intlayer で強化する実践的で本番対応のガイド。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Intlayer を使った next-i18next による Next.js 15 の翻訳 | 国際化 (i18n)

### このガイドの対象者

- **ジュニア**: 正確な手順に従い、コードブロックをコピーしてください。動作する多言語アプリが手に入ります。
- **ミッドレベル**: チェックリストやベストプラクティスの注意点を活用して、よくある落とし穴を回避しましょう。
- **シニア**: 高レベルの構造、SEO、オートメーションのセクションをざっと確認してください。合理的なデフォルト設定や拡張ポイントが見つかります。

### 作成するもの

- ローカライズされたルートを持つ App Router プロジェクト（例：`/`, `/fr/...`）
- ロケール、デフォルトロケール、RTL対応を含む i18n 設定
- サーバーサイドの i18n 初期化とクライアントプロバイダー
- 名前空間付きの翻訳をオンデマンドで読み込み
- `hreflang`、ローカライズされた `sitemap`、`robots` を使った SEO
- ロケールルーティング用のミドルウェア
- 翻訳ワークフローを自動化する Intlayer 統合（テスト、AI 補完、JSON 同期）

> 注意: next-i18next は i18next の上に構築されています。このガイドでは、App Router で next-i18next と互換性のある i18next のプリミティブを使用しつつ、アーキテクチャをシンプルかつ本番環境向けに保っています。  
> より広範な比較については、[next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-i18next_vs_intlayer.md) を参照してください。

---

## 1) プロジェクト構成

next-i18next の依存関係をインストールします:

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="bun"
bun add next-i18next i18next react-i18next i18next-resources-to-backend
```

明確な構造から始めましょう。メッセージはロケールとネームスペースごとに分割して保持します。

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

チェックリスト（中級/上級）:

- ロケールごとにネームスペースあたり1つのJSONを保持する
- メッセージを過度に集中管理しない。小さなページや機能単位のネームスペースを使う
- すべてのロケールを一度にインポートしない。必要なものだけをロードする

---

## 2) 依存関係のインストール

```bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

next-i18next の API や設定の相互運用を使用する予定がある場合は、以下も追加してください：

```bash
pnpm add next-i18next
```

---

## 3) コア i18n 設定

ロケール、デフォルトロケール、RTL、およびローカライズされたパス/URL のヘルパーを定義します。

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

シニアノート: `next-i18next.config.js` を使用する場合は、`i18n.config.ts` と整合性を保ち、ズレが生じないようにしてください。

---

## 4) サーバーサイドのi18n初期化

必要なロケール/ネームスペースのJSONのみをインポートする動的バックエンドで、サーバー上でi18nextを初期化します。

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// src/locales/<locale>/<namespace>.json からJSONリソースを読み込み
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

中間メモ: ペイロードを制限するために、ページごとのnamespaceリストは短く保ってください。グローバルな「キャッチオール」バンドルは避けてください。

---

## 5) Reactコンポーネント用クライアントプロバイダー

サーバー設定を反映し、要求されたnamespaceのみをロードするプロバイダーでクライアントコンポーネントをラップします。

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: バンドル }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

ジュニア向けのヒント: クライアントにすべてのメッセージを渡す必要はありません。ページの名前空間だけから始めましょう。

---

## 6) ローカライズされたレイアウトとルート

言語と方向を設定し、ロケールごとにルートを事前生成して静的レンダリングを促進します。

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) サーバー＋クライアント使用例ページ

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// ページの静的レンダリングを強制
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

翻訳（各名前空間ごとに `src/locales/...` に1つのJSON）:

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

クライアントコンポーネント（必要な名前空間のみを読み込み）:

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> ページやプロバイダーには必要な名前空間（例：`about`）のみを含めるようにしてください。
> Reactのバージョンが19未満の場合は、`Intl.NumberFormat`のような重いフォーマッターをメモ化してください。

クライアント境界内に埋め込まれた同期サーバーコンポーネント:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: メタデータ、Hreflang、サイトマップ、ロボット

コンテンツの翻訳はリーチを拡大する手段です。多言語SEOを徹底的に設定しましょう。

ベストプラクティス:

- ルートに `lang` と `dir` を設定する
- 各ロケールに対して `alternates.languages` を追加する（+ `x-default`）
- 翻訳されたURLを `sitemap.xml` にリストし、`hreflang` を使用する
- ローカライズされたプライベートエリア（例：`/fr/admin`）を `robots.txt` で除外する

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // src/localesから正しいJSONバンドルをインポート
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
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
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly", // 更新頻度は月次
      priority: 0.7, // 優先度
      alternates: { languages }, // 代替言語のURL
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
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) ロケールルーティングのためのミドルウェア

ロケールを検出し、ロケールがない場合はローカライズされたルートにリダイレクトします。

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // 拡張子のあるファイルを除外

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // これらで始まるパスと拡張子を持つファイルを除くすべてのパスにマッチ
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) パフォーマンスと開発者体験（DX）のベストプラクティス

- **htmlの`lang`と`dir`を設定する**: `src/app/[locale]/layout.tsx`で実施済み。
- **メッセージをネームスペースごとに分割する**: バンドルを小さく保つ（`common.json`、`about.json`など）。
- **クライアントのペイロードを最小化する**: ページでは必要なネームスペースのみをプロバイダーに渡す。
- **静的ページを優先する**: ロケールごとに`export const dynamic = 'force-static'`と`generateStaticParams`を使用する。
- **サーバーコンポーネントを同期させる**: レンダリング時の非同期呼び出しの代わりに事前計算された文字列やフォーマットを渡す。
- **重い処理をメモ化する**: 特に古いReactバージョンのクライアントコードで重要。
- **キャッシュとヘッダー**: 可能な場合は動的レンダリングよりも静的または`revalidate`を優先する。

---

## 11) テストとCI

- `t`を使用するコンポーネントに対してユニットテストを追加し、キーが存在することを確認する。
- 各ネームスペースがロケール間で同じキーを持っていることを検証します。
- デプロイ前にCIで不足しているキーを検出します。

Intlayerはこれらの多くを自動化します（次のセクションを参照）。

---

## 12) Intlayerを導入する（自動化）

IntlayerはJSON翻訳の同期を保ち、不足しているキーのテストを行い、必要に応じてAIで補完するのに役立ちます。

intlayerの依存関係をインストールします：

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

パッケージスクリプトを追加します:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

一般的なフロー:

- CIで `pnpm i18n:test` を実行し、キーが不足している場合にビルドを失敗させる
- ローカルで `pnpm i18n:fill` を実行し、新しく追加されたキーに対してAI翻訳を提案する

> CLI引数を指定することも可能です。詳細は[Intlayer CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)をご覧ください。

---

## 13) トラブルシューティング

- **キーが見つからない**: ページやプロバイダーが正しいnamespaceをリストしていること、そしてJSONファイルが`src/locales/<locale>/<namespace>.json`に存在することを確認してください。
- **言語が間違っている／英語が一瞬表示される**: `middleware.ts`のロケール検出とプロバイダーの`lng`を再確認してください。
- **RTLレイアウトの問題**: `dir`が`isRtl(locale)`から正しく取得されているか、またCSSが`[dir="rtl"]`に対応しているかを確認してください。
- **SEOのalternateが不足している**: `alternates.languages`にすべてのロケールと`x-default`が含まれていることを確認してください。
- **バンドルサイズが大きすぎる**: namespaceをさらに分割し、クライアント側で`locales`ツリー全体をインポートしないようにしてください。

---

## 14) 次にやること

- 機能が拡張されるにつれて、より多くのロケールとネームスペースを追加する
- エラーページ、メール、およびAPI駆動のコンテンツをローカライズする
- 翻訳更新のために自動でPRをオープンするIntlayerのワークフローを拡張する

スターターをお探しの場合は、テンプレートをお試しください: `https://github.com/aymericzip/intlayer-next-i18next-template`。
