---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: next-i18nextを使ったNext.jsアプリケーションの国際化方法
description: next-i18nextでi18nを設定する方法：多言語対応のNext.jsアプリ向けのベストプラクティスとSEOのヒント、国際化、コンテンツの整理、技術的なセットアップをカバー。
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: 初版
---

# 2025年版 next-i18nextを使ったNext.jsアプリケーションの国際化方法

## 目次

<TOC/>

## next-i18nextとは？

**next-i18next**は、Next.jsアプリケーション向けの人気のある国際化（i18n）ソリューションです。元々の`next-i18next`パッケージはPages Router向けに設計されていましたが、本ガイドでは、最新の**App Router**で`i18next`と`react-i18next`を直接使用してi18nextを実装する方法を紹介します。

このアプローチにより、以下が可能になります：

- **名前空間を使った翻訳の整理**（例：`common.json`、`about.json`）によるコンテンツ管理の向上。
- **必要な名前空間のみをページごとに読み込むことで翻訳を効率的にロード**し、バンドルサイズを削減。
- **サーバーコンポーネントとクライアントコンポーネントの両方をサポート**し、適切なSSRとハイドレーションを実現。
- **TypeScriptサポートの確保**により、型安全なロケール設定と翻訳キーを実現。
- **適切なメタデータ、サイトマップ、robots.txtの国際化によりSEOを最適化**。

> 代替として、[next-intlガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_using_with_next-intl.md)や、直接[Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)を参照することもできます。

> 比較は[ next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md)をご覧ください。

## 実装前に守るべきプラクティス

実装に入る前に、以下のプラクティスを守ってください：

- **HTMLの`lang`と`dir`属性を設定する**
  レイアウト内で、`getLocaleDirection(locale)` を使用して `dir` を計算し、適切なアクセシビリティとSEOのために `<html lang={locale} dir={dir}>` を設定します。
- **名前空間ごとにメッセージを分割する**
  ロードする必要のあるものだけを読み込むために、ロケールと名前空間ごとにJSONファイルを整理します（例：`common.json`、`about.json`）。
- **クライアントのペイロードを最小化する**
  ページでは、必要な名前空間のみを `NextIntlClientProvider` に送信します（例：`pick(messages, ['common', 'about'])`）。
- **静的ページを優先する**
  パフォーマンスとSEOの向上のために、できるだけ静的ページを使用します。
- **サーバーコンポーネントでの国際化**
  ページや `client` とマークされていないすべてのコンポーネントのようなサーバーコンポーネントは静的であり、ビルド時にプリレンダリングできます。そのため、翻訳関数をプロップとして渡す必要があります。
- **TypeScriptの型を設定する**
  アプリケーション全体で型の安全性を確保するために、ロケール用のTypeScript型を設定します。
- **リダイレクト用のプロキシ**
  プロキシを使用してロケールの検出とルーティングを処理し、ユーザーを適切なロケール接頭辞付きURLにリダイレクトします。
- **メタデータ、サイトマップ、robots.txtの国際化**
  Next.jsが提供する`generateMetadata`関数を使用して、メタデータ、サイトマップ、robots.txtを国際化し、すべてのロケールで検索エンジンによるより良い検出を確保します。
- **リンクのローカライズ**
  `Link`コンポーネントを使ってリンクをローカライズし、ユーザーを適切なロケール接頭辞付きURLにリダイレクトします。これはすべてのロケールでページの検出を確実にするために重要です。
- **テストと翻訳の自動化**
  テストと翻訳の自動化は、多言語アプリケーションのメンテナンスにかかる時間を削減するのに役立ちます。

> 国際化とSEOに関して知っておくべきすべてをまとめたドキュメントはこちらをご覧ください: [next-intlによる国際化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md)。

---

## Next.jsアプリケーションでi18nextをセットアップするステップバイステップガイド

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayerを使ったアプリケーションの国際化方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> GitHubの[Application Template](https://github.com/aymericzip/next-i18next-template)をご覧ください。

これから作成するプロジェクト構成は以下の通りです：

```bash
.
├── i18n.config.ts
└── src # srcはオプションです
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / （ホームメッセージで全ページを汚染しないためのルートグループ）
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### ステップ 1: 依存関係のインストール

必要なパッケージをnpmを使ってインストールします：

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: 翻訳の読み込みと管理を行う国際化のコアフレームワークです。
- **react-i18next**: i18nextのReactバインディングで、クライアントコンポーネント向けに`useTranslation`のようなフックを提供します。
- **i18next-resources-to-backend**: 翻訳ファイルの動的読み込みを可能にするプラグインで、必要な名前空間だけをロードできます。

### ステップ 2: プロジェクトの設定

サポートするロケール、デフォルトロケール、およびURLのローカライズ用ヘルパー関数を定義する設定ファイルを作成します。このファイルはi18n設定の単一の真実の情報源として機能し、アプリケーション全体で型安全性を保証します。

ロケール設定を一元化することで不整合を防ぎ、将来的にロケールの追加や削除を容易にします。ヘルパー関数はSEOやルーティングのために一貫したURL生成を保証します。

```ts fileName="i18n.config.ts"
// 型安全のためにサポートするロケールをconst配列として定義
// 'as const'アサーションにより、TypeScriptはstring[]ではなくリテラル型を推論します
export const locales = ["en", "fr"] as const;

// locales配列からLocale型を抽出
// これによりユニオン型 "en" | "fr" が作成されます
export type Locale = (typeof locales)[number];

// ロケールが指定されていない場合に使用されるデフォルトのロケールを設定
export const defaultLocale: Locale = "en";

// 右から左へのテキスト方向処理が必要な言語
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// ロケールがRTL（右から左）テキスト方向を必要とするかどうかをチェック
// アラビア語、ヘブライ語、ペルシャ語、ウルドゥー語などに使用
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// 指定されたロケールとパスに基づいてローカライズされたパスを生成
// デフォルトロケールのパスにはプレフィックスがない（例: "/about" は "/en/about" ではない）
// その他のロケールにはプレフィックスが付く（例: "/fr/about"）
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// 絶対URLのベースURL（サイトマップ、メタデータなどで使用）
const ORIGIN = "https://example.com";

// ロケールプレフィックス付きの絶対URLを生成
// SEOメタデータ、サイトマップ、カノニカルURLで使用
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// ブラウザでロケールクッキーを設定するために使用
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1年
    "SameSite=Lax",
  ].join("; ");
}
```

### ステップ3: 翻訳ネームスペースの集中管理

アプリケーションが公開するすべてのnamespaceの単一の真実のソースを作成します。このリストを再利用することで、サーバー、クライアント、およびツールのコードが同期され、翻訳ヘルパーの強力な型付けが可能になります。

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### ステップ4: TypeScriptで翻訳キーを強く型付けする

`i18next`を拡張して、標準の言語ファイル（通常は英語）を指すようにします。これによりTypeScriptはnamespaceごとの有効なキーを推論し、`t()`の呼び出しがエンドツーエンドで検証されます。

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> ヒント: この宣言は `src/types` フォルダ内に保存してください（存在しない場合はフォルダを作成してください）。Next.js はすでに `tsconfig.json` に `src` を含めているため、この拡張は自動的に認識されます。もし認識されない場合は、`tsconfig.json` に以下を追加してください：

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

これにより、オートコンプリートやコンパイル時の型チェックが利用可能になります：

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// OK、型付け済み: t("counter.increment")
// エラー、コンパイルエラー: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### ステップ 5: サーバーサイドの i18n 初期化を設定する

サーバーコンポーネントのために翻訳を読み込むサーバーサイド初期化関数を作成します。この関数はサーバーサイドレンダリング用に別のi18nextインスタンスを作成し、レンダリング前に翻訳が読み込まれていることを保証します。

サーバーコンポーネントはクライアントコンポーネントとは異なるコンテキストで動作するため、独自のi18nextインスタンスが必要です。サーバーで翻訳を事前に読み込むことで、未翻訳のコンテンツが一瞬表示されるフラッシュを防ぎ、検索エンジンが翻訳済みのコンテンツを認識できるためSEOが向上します。

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// i18nextの動的リソース読み込みを設定
// この関数はロケールとネームスペースに基づいて翻訳JSONファイルを動的にインポートします
// 例: locale="fr", namespace="about" -> "@/locales/fr/about.json"をインポート
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * サーバーサイドレンダリング用にi18nextインスタンスを初期化する
 *
 * @returns サーバーサイドで使用可能な初期化済みi18nextインスタンス
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // 新しい i18next インスタンスを作成（クライアント側のインスタンスとは別）
  const i18n = createInstance();

  // React 統合とバックエンドローダーで初期化
  await i18n
    .use(initReactI18next) // React フックのサポートを有効化
    .use(backend) // 動的リソース読み込みを有効化
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // パフォーマンス向上のため指定された名前空間のみを読み込む
      defaultNS: "common", // 指定がない場合のデフォルト名前空間
      interpolation: { escapeValue: false }, // HTML エスケープしない（React が XSS 保護を処理）
      react: { useSuspense: false }, // SSR 互換のため Suspense を無効化
      returnNull: false, // キーが見つからない場合は null ではなく空文字を返す
      initImmediate: false, // リソースが読み込まれるまで初期化を遅延（高速なSSRのため）
    });
  return i18n;
}
```

### ステップ6: クライアントサイドのi18nプロバイダーを作成する

i18nextコンテキストでアプリケーションをラップするクライアントコンポーネントプロバイダーを作成します。このプロバイダーはサーバーから事前に読み込まれた翻訳を受け取り、未翻訳コンテンツのフラッシュ（FOUC）を防ぎ、重複フェッチを回避します。

クライアントコンポーネントはブラウザで動作する独自のi18nextインスタンスが必要です。サーバーから事前に読み込まれたリソースを受け入れることで、シームレスなハイドレーションを保証し、コンテンツのフラッシュを防ぎます。このプロバイダーはロケールの変更や名前空間の動的読み込みも管理します。

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// クライアントサイドの動的リソース読み込みを設定
// サーバーサイドと同じパターンだが、このインスタンスはブラウザで動作する
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // サーバーから事前に読み込まれたリソース（FOUC - 未翻訳コンテンツのフラッシュを防止）
  // フォーマット: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * クライアントサイドのi18nプロバイダーで、アプリをi18nextコンテキストでラップします
 * サーバーから事前に読み込まれたリソースを受け取り、翻訳の再取得を防ぎます
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // useStateの遅延初期化を使ってi18nインスタンスを一度だけ作成
  // これにより、レンダーごとに作成されるのを防ぎます
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // リソースが提供されている場合（サーバーから）、クライアント側での再取得を避けるためにそれを使用します
        // これによりFOUC（Flash of Unstyled Content）を防ぎ、初期読み込みのパフォーマンスが向上します
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // undefinedの値が返されるのを防ぎます
      });

    return i18nInstance;
  });

  // localeプロパティが変更されたときに言語を更新します
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // クライアント側で必要なすべてのnamespaceが読み込まれていることを確認します
  // 配列を正しく比較するためにjoin("|")を依存関係として使用しています
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Reactコンテキストを通じてすべての子コンポーネントにi18nインスタンスを提供
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### ステップ7: 動的ロケールルートの定義

アプリフォルダ内に `[locale]` ディレクトリを作成して、ロケールの動的ルーティングを設定します。これにより、Next.jsは各ロケールをURLのセグメントとして扱うことができるようになります（例：`/en/about`、`/fr/about`）。

動的ルートを使用することで、Next.jsはビルド時にすべてのロケールの静的ページを生成でき、パフォーマンスとSEOが向上します。レイアウトコンポーネントはロケールに基づいてHTMLの `lang` と `dir` 属性を設定し、アクセシビリティと検索エンジンの理解に重要な役割を果たします。

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// 動的パラメータを無効化 - すべてのロケールはビルド時に既知である必要があります
// これにより、すべてのロケールルートで静的生成が保証されます
export const dynamicParams = false;

/**
 * すべてのロケールに対してビルド時に静的パラメータを生成
 * Next.jsはここで返された各ロケールのページを事前レンダリングします
 * 例: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * ロケール固有のHTML属性を処理するルートレイアウトコンポーネント
 * lang属性とテキスト方向（ltr/rtl）をロケールに基づいて設定します
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // URLパラメータからロケールを検証
  // 無効なロケールが提供された場合はデフォルトロケールにフォールバック
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // ロケールに基づいてテキストの方向を決定
  // アラビア語のようなRTL言語は適切なテキスト表示のためにdir="rtl"が必要
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### ステップ8: 翻訳ファイルを作成する

各ロケールと名前空間ごとにJSONファイルを作成します。この構造により、翻訳を論理的に整理し、各ページで必要なものだけを読み込むことができます。

名前空間（例：`common.json`、`about.json`）ごとに翻訳を整理することで、コード分割が可能になり、バンドルサイズを削減できます。これにより、各ページに必要な翻訳のみを読み込むため、パフォーマンスが向上します。

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/fr/home.json"
{
  "title": "Accueil",
  "description": "Description de la page d'accueil",
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!",
  "aboutPage": "Page À propos",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "description": "Cliquez sur le bouton pour augmenter le compteur"
  }
}
```

### ステップ9: ページで翻訳を利用する

i18nextをサーバー上で初期化し、翻訳をサーバーコンポーネントとクライアントコンポーネントの両方に渡すページコンポーネントを作成します。これにより、レンダリング前に翻訳が読み込まれ、コンテンツのフラッシュを防止できます。

サーバーサイドの初期化は、ページがレンダリングされる前に翻訳を読み込み、SEOの向上とFOUC（Flash of Unstyled Content）の防止に役立ちます。事前に読み込んだリソースをクライアントプロバイダーに渡すことで、重複したフェッチを避け、スムーズなハイドレーションを実現します。

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * i18nの初期化を処理するサーバーコンポーネントページ
 * サーバーで翻訳を事前に読み込み、クライアントコンポーネントに渡す
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // このページで必要な翻訳のネームスペースを定義
  // 型安全とオートコンプリートのために中央管理されたリストを再利用
  const pageNamespaces = allNamespaces;

  // 必要なネームスペースでサーバー上でi18nextを初期化
  // これにより翻訳JSONファイルがサーバー側で読み込まれる
  const i18n = await initI18next(locale, pageNamespaces);

  /// "about" 名前空間の固定翻訳関数を取得
  // getFixedT は名前空間を固定するため、t("about:title") ではなく t("title") として使える
  const tAbout = i18n.getFixedT(locale, "about");

  // i18n インスタンスから翻訳バンドルを抽出
  // このデータは I18nProvider に渡され、クライアント側の i18n をハイドレートする
  // FOUC（未翻訳コンテンツのちらつき）を防ぎ、重複フェッチを回避
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### ステップ10: クライアントコンポーネントでの翻訳の使用

クライアントコンポーネントでは、`useTranslation` フックを使用して翻訳にアクセスできます。このフックは翻訳関数とi18nインスタンスへのアクセスを提供し、コンテンツの翻訳やロケール情報の取得を可能にします。

クライアントコンポーネントは翻訳にアクセスするためにReactフックを必要とします。`useTranslation` フックはi18nextとシームレスに統合され、ロケールが変更された際にリアクティブな更新を提供します。

> ページやプロバイダーには必要な名前空間のみを含めるようにしてください（例：`about`）。  
> Reactのバージョンが19未満の場合は、`Intl.NumberFormat`のような重いフォーマッターをメモ化してください。

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * 翻訳のためのReactフックを使用したクライアントコンポーネントの例
 * useState、useEffect、useTranslationなどのフックを使用可能
 */
const ClientComponent = () => {
  // useTranslationフックは翻訳関数とi18nインスタンスへのアクセスを提供
  // "about"名前空間の翻訳のみを読み込むように指定
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // ロケール対応の数値フォーマッターを作成
  // i18n.languageは現在のロケールを提供（例: "en", "fr"）
  // Intl.NumberFormatはロケールの慣習に従って数値をフォーマット
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* ロケール固有のフォーマットで数値を表示 */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
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

### ステップ11: サーバーコンポーネントでの翻訳の使用

サーバーコンポーネントはReactのフックを使用できないため、親コンポーネントからprops経由で翻訳を受け取ります。この方法により、サーバーコンポーネントは同期的に保たれ、クライアントコンポーネント内にネストすることが可能になります。

クライアント境界内にネストされる可能性のあるサーバーコンポーネントは同期的である必要があります。翻訳済みの文字列とロケール情報をpropsとして渡すことで、非同期操作を避け、適切なレンダリングを保証します。

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // 親のサーバーコンポーネントから渡される翻訳関数
  // サーバーコンポーネントはフックを使えないため、翻訳はprops経由で受け取る
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * サーバーコンポーネントの例 - 翻訳はpropsとして受け取る
 * クライアントコンポーネント（非同期サーバーコンポーネント）の中にネスト可能
 * Reactフックは使用できないため、すべてのデータはpropsまたは非同期操作から取得する必要がある
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // ロケールを使ってサーバー側で数値をフォーマット
  // SSR中にサーバーで実行され、初期ページロードを改善
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* propsで渡された翻訳関数を使用 */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### （オプション）ステップ12：コンテンツの言語を変更する

Next.jsでコンテンツの言語を変更する推奨方法は、ロケール接頭辞付きのURLとNext.jsのリンクを使用することです。以下の例では、現在のロケールをルートから読み取り、パス名からそれを取り除き、利用可能な各ロケールごとにリンクをレンダリングします。

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="言語セレクター">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

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
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### （オプション）ステップ13：ローカライズされたLinkコンポーネントの作成

アプリ全体でローカライズされたURLを再利用することで、ナビゲーションの一貫性を保ち、SEOにも効果的です。`next/link`をラップし、内部ルートにはアクティブなロケールをプレフィックスとして付け、外部URLはそのままにする小さなヘルパーを作成しましょう。

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> ヒント: `LocalizedLink` はドロップイン置換なので、インポートを差し替えてコンポーネントにロケール固有のURL処理を任せる形で段階的に移行できます。

### （オプション）ステップ14: サーバーアクション内でアクティブなロケールにアクセスする

サーバーアクションでは、メール送信やログ記録、サードパーティ連携のために現在のロケールが必要になることが多いです。プロキシで設定されたロケールクッキーと、フォールバックとしての `Accept-Language` ヘッダーを組み合わせて使用します。

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// 現在のロケールを使用するサーバーアクションの例
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // ロケールに基づいた副作用（メール、CRMなど）にロケールを使用
  console.log(`ロケール ${locale} でサーバーからの処理`);
}
```

> このヘルパーは Next.js のクッキーとヘッダーに依存しているため、Route Handlers、Server Actions、その他のサーバー専用コンテキストで動作します。

### （オプション）ステップ15：メタデータの国際化

コンテンツの翻訳は重要ですが、国際化の主な目的はあなたのウェブサイトを世界により見えるようにすることです。I18n は適切な SEO を通じてウェブサイトの可視性を向上させるための強力な手段です。

適切に国際化されたメタデータは、検索エンジンがページで利用可能な言語を理解するのに役立ちます。これには、hreflang メタタグの設定、タイトルや説明の翻訳、各ロケールに対して正しいカノニカル URL の設定が含まれます。

多言語 SEO に関するベストプラクティスのリストは以下の通りです：

- `<head>`タグ内にhreflangメタタグを設定して、検索エンジンがページで利用可能な言語を理解できるようにします
- `http://www.w3.org/1999/xhtml` XMLスキーマを使用して、sitemap.xmlにすべてのページ翻訳をリストします
- プレフィックス付きページをrobots.txtから除外するのを忘れないでください（例：`/dashboard`、`/fr/dashboard`、`/es/dashboard`）
- カスタムLinkコンポーネントを使用して、最もローカライズされたページにリダイレクトします（例：フランス語では`<a href="/fr/about">À propos</a>`）

開発者はしばしばロケール間でページを適切に参照することを忘れがちです。これを修正しましょう：

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * 各ロケールバージョンのページのSEOメタデータを生成する
 * この関数はビルド時に各ロケールごとに実行されます
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // このロケールの翻訳ファイルを動的にインポート
  // メタデータのタイトルと説明の翻訳を取得するために使用
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // すべてのロケールのhreflangマッピングを作成
  // 検索エンジンが言語の代替を理解するのに役立つ
  // フォーマット: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // このロケールバージョンの正規URL
      canonical: absoluteUrl(locale, "/about"),
      // SEOのための言語代替（hreflangタグ）
      // "x-default"はデフォルトのロケールバージョンを指定
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

### （オプション）ステップ16：サイトマップの多言語対応

すべてのロケールバージョンのページを含むサイトマップを生成します。これにより、検索エンジンがすべての言語バージョンのコンテンツを検出し、インデックス化しやすくなります。

適切に多言語対応されたサイトマップは、検索エンジンがすべての言語バージョンのページを見つけてインデックス化できるようにし、国際的な検索結果での可視性を向上させます。

```ts fileName="src/app/sitemap.ts"
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

// すべてのロケールバリアントを含むサイトマップを生成し、SEOを向上させます
// alternatesフィールドは検索エンジンに言語バージョンを知らせます
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

### （オプション）ステップ17: robots.txtの多言語対応

保護されたルートのすべてのロケールバージョンを適切に処理するrobots.txtファイルを作成します。これにより、検索エンジンが管理者ページやダッシュボードページをどの言語でもインデックスしないようにします。

すべてのロケールに対してrobots.txtを適切に設定することで、検索エンジンが機密ページをどの言語でもインデックスするのを防ぎます。これはセキュリティとプライバシーのために非常に重要です。

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// すべてのロケールのパスを生成（例: /admin, /fr/admin, /es/admin）
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### （オプション）ステップ18：ロケールルーティングのためのミドルウェア設定

ユーザーの好みのロケールを自動的に検出し、適切なロケール接頭辞付きURLにリダイレクトするプロキシを作成します。これにより、ユーザーは自分の好みの言語でコンテンツを閲覧でき、ユーザー体験が向上します。

ミドルウェアは、ユーザーがサイトを訪れた際に自動的に好みの言語にリダイレクトし、さらに将来の訪問のためにその言語設定をクッキーに保存します。

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// 拡張子を持つファイルにマッチする正規表現（例：.js、.css、.png）
// ロケールルーティングから静的アセットを除外するために使用
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Accept-Language ヘッダーからロケールを抽出
 * "fr-CA"、"en-US" などの形式に対応
 * ブラウザの言語がサポートされていない場合はデフォルトロケールにフォールバック
 */
const pickLocale = (accept: string | null) => {
  // 最初の言語優先度を取得（例："fr-CA,en-US;q=0.9" から "fr-CA"）
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // ベース言語コードを抽出（例："fr-CA" から "fr"）
  const base = raw.toLowerCase().split("-")[0];
  // このロケールをサポートしているか確認、そうでなければデフォルトを使用
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Next.js のロケール検出およびルーティング用プロキシ
 * ページがレンダリングされる前のすべてのリクエストで実行される
 * 必要に応じてロケール接頭辞付きURLへ自動リダイレクトを行う
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Next.jsの内部処理、APIルート、静的ファイルはプロキシをスキップ
  // これらはロケール接頭辞を付けない
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // URLにすでにロケール接頭辞があるか確認
  // 例: "/fr/about" や "/en" は true を返す
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // ロケールのプレフィックスがない場合、ロケールを検出してリダイレクト
  if (!hasLocale) {
    // まずクッキーからロケールを取得しようとする（ユーザーの設定）
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // クッキーのロケールが有効ならそれを使い、そうでなければブラウザのヘッダーから検出
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // パス名を変更するためにURLをクローン
    const url = request.nextUrl.clone();
    // パス名にロケールのプレフィックスを追加
    // ルートパスの場合は二重スラッシュを避けるため特別に処理
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // リダイレクトレスポンスを作成し、ロケールクッキーを設定する
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // 以下を除くすべてのパスにマッチ:
    // - APIルート (/api/*)
    // - Next.jsの内部処理 (/_next/*)
    // - 静的ファイル (/static/*)
    // - 拡張子のあるファイル (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### （オプション）ステップ19: Intlayerを使った翻訳の自動化

Intlayerは、アプリケーションのローカリゼーションプロセスを支援するために設計された**無料**かつ**オープンソース**のライブラリです。i18nextが翻訳の読み込みと管理を担当する一方で、Intlayerは翻訳ワークフローの自動化を支援します。

翻訳を手動で管理することは時間がかかり、ミスが発生しやすい作業です。Intlayerは翻訳のテスト、生成、管理を自動化し、時間を節約するとともに、アプリケーション全体での一貫性を確保します。

Intlayerが可能にすること：

- **コードベース内の好きな場所でコンテンツを宣言する**
  Intlayerは、`.content.{ts|js|json}`ファイルを使用して、コードベース内の好きな場所でコンテンツを宣言することを可能にします。これにより、コンテンツの整理が向上し、コードベースの可読性と保守性が高まります。

- **翻訳の欠落をテストする**
  Intlayerは、CI/CDパイプラインやユニットテストに統合可能なテスト機能を提供します。詳細は[翻訳のテスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md)をご覧ください。

- **翻訳の自動化**  
  Intlayerは翻訳を自動化するためのCLIとVSCode拡張機能を提供します。これらはCI/CDパイプラインに統合可能です。詳細は[翻訳の自動化について](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)をご覧ください。  
  ご自身の**APIキーやお好みのAIプロバイダーを使用**できます。また、コンテキストに応じた翻訳も提供しています。詳細は[コンテンツの自動補完](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)をご覧ください。

- **外部コンテンツの接続**
- **翻訳の自動化**  
  Intlayerは翻訳を自動化するためのCLIとVSCode拡張機能を提供しています。これらはCI/CDパイプラインに統合可能です。詳細は[翻訳の自動化について](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)をご覧ください。  
  ご自身の**APIキーやお好みのAIプロバイダー**を使用することもできます。また、コンテキストに応じた翻訳も提供しています。詳しくは[コンテンツの自動補完](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)をご覧ください。

- **外部コンテンツの接続**  
  Intlayerはコンテンツを外部のコンテンツ管理システム（CMS）に接続することを可能にします。最適化された方法で取得し、JSONリソースに挿入します。詳細は[外部コンテンツの取得](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)をご覧ください。

- **ビジュアルエディター**  
  Intlayerは無料のビジュアルエディターを提供しており、視覚的にコンテンツを編集できます。詳細は[翻訳のビジュアル編集](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご覧ください。

その他にも多数の機能があります。Intlayerが提供するすべての機能については、[Intlayerの利点に関するドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)をご参照ください。
