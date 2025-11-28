---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: next-intl を使った Next.js アプリケーションの国際化方法
description: next-intl を使った i18n の設定方法：多言語対応の Next.js アプリ向けのベストプラクティスと SEO のヒント、国際化、コンテンツの整理、技術的セットアップを網羅。
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: 初版
---

# 2025年版 next-intl を使った Next.js アプリケーションの国際化方法

## 目次

<TOC/>

## next-intl とは？

**next-intl** は、Next.js の App Router 向けに特別に設計された人気の国際化（i18n）ライブラリです。優れた TypeScript サポートと組み込みの最適化機能を備え、多言語対応の Next.js アプリケーションをシームレスに構築する方法を提供します。

> ご希望であれば、[next-i18next ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_next-i18next.md)や、直接 [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_next-intl.md) を参照することもできます。

> 比較については、[next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md) をご覧ください。

## 守るべきプラクティス

実装に入る前に、以下のプラクティスを守ることをお勧めします：

- **HTMLの`lang`と`dir`属性を設定する**  
  レイアウト内で`getLocaleDirection(locale)`を使って`dir`を計算し、適切なアクセシビリティとSEOのために`<html lang={locale} dir={dir}>`を設定します。
- **メッセージをネームスペースごとに分割する**  
  ロケールとネームスペースごとにJSONファイルを整理し（例：`common.json`、`about.json`）、必要なものだけを読み込みます。
- **クライアントのペイロードを最小化する**  
  ページ上では、必要なネームスペースのみを`NextIntlClientProvider`に送信します（例：`pick(messages, ['common', 'about'])`）。
- **静的ページを優先する**  
  パフォーマンスとSEO向上のために、可能な限り静的ページを使用します。
- **サーバーコンポーネントでのi18n**  
  サーバーコンポーネントは、ページや`client`としてマークされていないすべてのコンポーネントのように静的であり、ビルド時にプリレンダリングできます。したがって、翻訳関数をプロップとして渡す必要があります。
- **TypeScriptの型設定**  
  アプリケーション全体で型安全を確保するために、ロケールの型を設定します。
- **リダイレクト用プロキシ**  
  ロケール検出とルーティングを処理し、ユーザーを適切なロケール接頭辞付きURLにリダイレクトするためにプロキシを使用します。
- **メタデータ、サイトマップ、robots.txtの国際化**  
  Next.jsが提供する`generateMetadata`関数を使用して、メタデータ、サイトマップ、robots.txtを国際化し、すべてのロケールで検索エンジンによるより良い検出を確保します。
- **リンクのローカライズ**  
  `Link`コンポーネントを使用してリンクをローカライズし、ユーザーを適切なロケール接頭辞付きURLにリダイレクトします。すべてのロケールでページの発見性を確保することが重要です。
- **テストと翻訳の自動化**
  テストと翻訳の自動化は、多言語アプリケーションのメンテナンスにかかる時間を削減します。

> 国際化とSEOに関して知っておくべきすべてをまとめたドキュメントをご覧ください: [next-intlによる国際化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md)。

---

## Next.jsアプリケーションでnext-intlをセットアップするステップバイステップガイド

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayer を使ってアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> GitHub の [Application Template](https://github.com/aymericzip/next-intl-template) を参照してください。

これから作成するプロジェクト構造は以下の通りです：

```bash
.
├── global.ts
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
└── src # src はオプションです
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / （ホームリソースで全ページを汚染しないためのルートグループ）
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### ステップ1: 依存関係のインストール

npmを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Next.js App Router向けのコア国際化ライブラリで、翻訳管理のためのフック、サーバー関数、クライアントプロバイダーを提供します。

### ステップ2: プロジェクトの設定

サポートするロケールを定義し、next-intlのリクエスト設定を行う設定ファイルを作成します。このファイルはi18n設定の単一の信頼できる情報源として機能し、アプリケーション全体で型安全性を保証します。

ロケール設定を一元化することで不整合を防ぎ、将来的にロケールの追加や削除を容易にします。`getRequestConfig`関数はすべてのリクエストで実行され、各ページに必要な翻訳のみを読み込むため、コード分割が可能になりバンドルサイズを削減します。

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// 型安全にサポートするロケールを定義
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// ロケールごとにメッセージを動的に読み込み、コード分割を可能にする
// Promise.all はパフォーマンス向上のため名前空間を並列で読み込む
async function loadMessages(locale: Locale) {
  // レイアウトやページで必要な名前空間のみを読み込む
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... 将来的に追加するJSONファイルはここに追加してください
  ]);

  return { common, home, about } as const;
}

// ローカライズされたURLを生成するヘルパー関数（例: /about と /fr/about）
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfigは各リクエストで実行され、サーバーコンポーネントにメッセージを提供します
// ここでnext-intlがNext.jsのサーバーサイドレンダリングにフックします
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1年
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // /en/... のルートを /... に変更
  // オプション: ローカライズされたパス名
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // クッキーからの "/" -> "/en" リダイレクトを防止
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### ステップ3: 動的ロケールルートの定義

ロケールごとの動的ルーティングを設定するために、アプリフォルダ内に `[locale]` ディレクトリを作成します。これにより、Next.js はロケールベースのルーティングを処理でき、各ロケールが URL セグメント（例：`/en/about`、`/fr/about`）になります。

動的ルートを使用することで、Next.js はビルド時にすべてのロケールの静的ページを生成でき、パフォーマンスとSEOが向上します。レイアウトコンポーネントは、ロケールに基づいて HTML の `lang` と `dir` 属性を設定し、アクセシビリティや検索エンジンの理解に重要です。

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// ビルド時にすべてのロケールの静的ページを事前生成（SSG）
// これによりパフォーマンスとSEOが向上します
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Next.jsのApp Routerでは、paramsはPromise（await可能）
  // これにより、動的ルートセグメントを非同期に解決できる
  const { locale } = await params;

  // 重要: setRequestLocaleはnext-intlにこのリクエストで使用するロケールを伝える
  // これがないと、getTranslations()はサーバーコンポーネントでどのロケールを使うか分からない
  setRequestLocale(locale);

  // 適切なHTMLレンダリングのためにテキストの方向（LTR/RTL）を取得
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // メッセージはサーバー側でロードされます。クライアントには必要なものだけを渡します。
  // これにより、ブラウザに送信されるJavaScriptバンドルが最小化されます
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // 完全にサーバー側での翻訳/フォーマット処理
  // これらはサーバー上で実行され、コンポーネントにpropsとして渡すことができます
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProviderはクライアントコンポーネントで翻訳を利用可能にします
    // クライアントコンポーネントが実際に使用する名前空間のみを渡します
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### ステップ4: 翻訳ファイルを作成する

各ロケールと名前空間ごとにJSONファイルを作成します。この構造により、翻訳を論理的に整理し、各ページに必要なものだけを読み込むことができます。

名前空間ごとに翻訳を整理することで（例：`common.json`、`about.json`）、コード分割が可能になり、バンドルサイズを削減できます。これにより、各ページに必要な翻訳のみを読み込むため、パフォーマンスが向上します。

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### ステップ5: ページで翻訳を利用する

サーバーで翻訳を読み込み、それをサーバーコンポーネントとクライアントコンポーネントの両方に渡すページコンポーネントを作成します。これにより、レンダリング前に翻訳が読み込まれ、コンテンツのフラッシュを防止します。

サーバーサイドでの翻訳読み込みはSEOを向上させ、FOUC（未翻訳コンテンツのフラッシュ）を防ぎます。`pick`を使用して必要な名前空間のみをクライアントプロバイダーに送ることで、ブラウザに送信されるJavaScriptバンドルを最小化します。

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // メッセージはサーバー側で読み込まれます。クライアントには必要なものだけを渡します。
  // これにより、ブラウザに送信されるJavaScriptバンドルが最小化されます
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // 完全にサーバー側での翻訳/フォーマット処理
  // これらはサーバー上で実行され、コンポーネントにpropsとして渡すことができます
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider はクライアントコンポーネントで翻訳を利用可能にします
    // クライアントコンポーネントが実際に使用する名前空間のみを渡してください
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### ステップ6: クライアントコンポーネントでの翻訳の使用

クライアントコンポーネントは、`useTranslations` と `useFormatter` フックを使用して翻訳およびフォーマット関数にアクセスできます。これらのフックは `NextIntlClientProvider` コンテキストから読み取ります。

クライアントコンポーネントは翻訳にアクセスするために React フックを必要とします。`useTranslations` と `useFormatter` フックは next-intl とシームレスに統合されており、ロケールが変更された際にリアクティブに更新されます。

> ページのクライアントメッセージに必要な名前空間を追加することを忘れないでください（クライアントコンポーネントが実際に必要とする名前空間のみを含めてください）。

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // ネストされたオブジェクトに直接スコープを設定
  // useTranslations/useFormatter は NextIntlClientProvider コンテキストから読み取るフックです
  // コンポーネントが NextIntlClientProvider でラップされている場合にのみ動作します
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

### ステップ7: サーバーコンポーネントでの翻訳の使用

サーバーコンポーネントは React フックを使用できないため、親コンポーネントから props 経由で翻訳とフォーマッターを受け取ります。この方法により、サーバーコンポーネントは同期的に保たれ、クライアントコンポーネント内にネストすることが可能になります。

クライアント境界内にネストされる可能性のあるサーバーコンポーネントは同期的である必要があります。翻訳済みの文字列やフォーマット済みの値をpropsとして渡すことで、非同期処理を回避し、適切なレンダリングを保証します。親のページコンポーネントで翻訳とフォーマットを事前に計算してください。

```tsx fileName="src/components/ServerComponent.tsx"
// クライアントコンポーネント内にネストされたサーバーコンポーネントは同期的でなければなりません
// Reactはサーバー/クライアント境界を越えた非同期関数をシリアライズできません
// 解決策：親で翻訳/フォーマットを事前計算し、propsとして渡す
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

> ページやレイアウト内で、`next-intl/server` から `getTranslations` と `getFormatter` を使用して翻訳とフォーマットを事前計算し、それらを props としてサーバーコンポーネントに渡してください。

---

### （オプション）ステップ8: コンテンツの言語を変更する

next-intl を使ってコンテンツの言語を変更するには、同じパス名を指しながらロケールを切り替えるロケール対応リンクをレンダリングします。プロバイダーが URL を自動的に書き換えるため、現在のルートをターゲットにするだけで済みます。

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // パス名からロケールのプレフィックスを削除してベースパスを取得する
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="言語セレクター">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // デフォルトロケールかどうかに基づいてhrefを構築
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### （オプション）ステップ9：ローカライズされたLinkコンポーネントを使用する

`next-intl`は、アクティブなロケールを自動的に適用するローカライズされたリンクコンポーネントを含むサブパッケージ`next-intl/navigation`を提供しています。これはすでに`@/i18n`ファイルで抽出してあるので、以下のように使用できます。

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### （オプション）ステップ10：Server Actions内でアクティブなロケールにアクセスする

Server Actionsは`next-intl/server`を使用して現在のロケールを読み取ることができます。これはローカライズされたメールを送信したり、送信されたデータと共に言語設定を保存したりするのに便利です。

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // ロケールを使用してテンプレートや分析ラベルなどを選択します。
  console.log(`ロケール ${locale} からの問い合わせフォームを受信しました`);
}
```

> `getLocale` は `next-intl` プロキシによって設定されたロケールを読み取るため、サーバーのどこでも動作します：ルートハンドラー、サーバーアクション、およびエッジ関数。

### （オプション）ステップ11：メタデータの国際化

コンテンツの翻訳は重要ですが、国際化の主な目的はあなたのウェブサイトを世界により見えるようにすることです。I18nは適切なSEOを通じてウェブサイトの可視性を向上させるための強力な手段です。

適切に国際化されたメタデータは、検索エンジンがあなたのページで利用可能な言語を理解するのに役立ちます。これには、hreflangメタタグの設定、タイトルや説明の翻訳、そして各ロケールに対して正しいカノニカルURLが設定されていることの確認が含まれます。

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadataは各ロケールごとに実行され、SEOに適したメタデータを生成します
tsx fileName="src/app/[locale]/about/layout.tsx"
// これは検索エンジンが代替言語バージョンを理解するのに役立ちます
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

### （オプション）ステップ12：サイトマップの国際化

すべてのロケールバージョンのページを含むサイトマップを生成します。これにより、検索エンジンがすべての言語バージョンのコンテンツを検出し、インデックス化するのに役立ちます。

適切に国際化されたサイトマップは、検索エンジンがすべての言語バージョンのページを見つけてインデックス化できるようにします。これにより、国際的な検索結果での可視性が向上します。

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * すべてのロケールとそのローカライズされたパスのマップを取得する
 *
 * 出力例:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// すべてのロケールバリアントを含むサイトマップを生成し、SEOを向上させる
// alternatesフィールドは検索エンジンに言語バージョンを伝える
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### （オプション）ステップ13: robots.txtの多言語対応

保護されたルートのすべてのロケールバージョンを適切に処理するrobots.txtファイルを作成します。これにより、検索エンジンが管理者ページやダッシュボードページをどの言語でもインデックスしないようにできます。

すべてのロケールに対してrobots.txtを適切に設定することで、ルートがロケールごとに異なる場合でも、検索エンジンが機密ページをインデックスするのを防ぎます。

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// すべてのロケールのパスを生成（例: /admin, /fr/admin, /es/admin）
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

### （オプション）ステップ14：ロケールルーティングのためのプロキシ設定

ユーザーの優先ロケールを自動的に検出し、適切なロケールプレフィックス付きURLへリダイレクトするプロキシを作成します。next-intlはこれを自動で処理する便利なプロキシ関数を提供しています。

プロキシは、ユーザーがサイトを訪れた際に自動的に好みの言語にリダイレクトされることを保証します。また、ユーザーの言語設定を保存し、次回以降の訪問時にユーザーエクスペリエンスを向上させます。

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// ミドルウェアはルートの前に実行され、ロケール検出とルーティングを処理します
// localeDetection: true は Accept-Language ヘッダーを使用してロケールを自動検出します
export default proxy;

export const config = {
  // API、Nextの内部処理、静的アセットをスキップ
  // 正規表現: api、_nextで始まるもの、またはドットを含むファイルを除くすべてのルートにマッチ
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (オプション) ステップ15: ロケール用のTypeScript型を設定する

TypeScriptを設定すると、キーのオートコンプリートと型安全性が得られます。

そのために、プロジェクトのルートに global.ts ファイルを作成し、以下のコードを追加できます。

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... 将来的に追加されるJSONファイルもここに追加してください
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

このコードはモジュール拡張（Module Augmentation）を使用して、locales と messages を next-intl の AppConfig 型に追加します。

### （オプション）ステップ15: Intlayerを使って翻訳を自動化する

Intlayerは、アプリケーションのローカリゼーションプロセスを支援するために設計された**無料**かつ**オープンソース**のライブラリです。next-intlが翻訳の読み込みと管理を担当する一方で、Intlayerは翻訳ワークフローの自動化を支援します。

翻訳を手動で管理することは時間がかかり、エラーが発生しやすい作業です。Intlayerは翻訳のテスト、生成、管理を自動化し、時間を節約するとともに、アプリケーション全体での一貫性を確保します。

Intlayerは以下のことを可能にします：

- **コードベース内の好きな場所でコンテンツを宣言する**
  Intlayerは`.content.{ts|js|json}`ファイルを使用して、コードベース内の好きな場所でコンテンツを宣言することを可能にします。これにより、コンテンツの整理が向上し、コードベースの可読性と保守性が高まります。

- **不足している翻訳のテスト**
  Intlayerは、CI/CDパイプラインやユニットテストに統合できるテスト機能を提供します。詳細は[翻訳のテスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md)をご覧ください。

- **翻訳の自動化**
  Intlayerは、翻訳を自動化するためのCLIとVSCode拡張機能を提供します。これらはCI/CDパイプラインに統合可能です。詳細は[翻訳の自動化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)をご覧ください。
  ご自身の**APIキーとお好みのAIプロバイダー**を使用できます。また、コンテキストに応じた翻訳も提供します。詳細は[コンテンツの自動補完](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)をご覧ください。

- **外部コンテンツの接続**
  Intlayerは、外部のコンテンツ管理システム（CMS）にコンテンツを接続することを可能にします。最適化された方法でコンテンツを取得し、JSONリソースに挿入します。詳細は[外部コンテンツの取得について](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)をご覧ください。

- **ビジュアルエディター**  
  Intlayerは、ビジュアルエディターを使用してコンテンツを編集できる無料のビジュアルエディターを提供しています。詳細は[翻訳のビジュアル編集について](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご覧ください。

その他にも多数の機能があります。Intlayerが提供するすべての機能を知るには、[Intlayerの利点に関するドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)をご参照ください。
