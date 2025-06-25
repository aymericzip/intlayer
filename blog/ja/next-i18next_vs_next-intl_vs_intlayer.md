---
blogName: next-i18next_vs_next-intl_vs_intlayer
url: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/next-i18next_vs_next-intl_vs_intlayer.md
createdAt: 2024-08-11
updatedAt: 2025-01-02
title: next-i18next vs next-intl vs Intlayer
description: Next.jsアプリのためにnext-i18nextとnext-intlとIntlayerを比較する
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - 国際化
  - ドキュメンテーション
  - Next.js
  - JavaScript
  - React
---

# next-i18next VS next-intl VS Intlayer | Next.js 国際化 (i18n)

以下に、Next.js アプリケーションの国際化 (i18n) に関する **3 つの人気ライブラリ**: **next-intl**, **next-i18next**, および **Intlayer** の簡潔な比較を示します。

このドキュメントでは、主要な基準を強調しています：

1. **アーキテクチャ** (翻訳をコンポーネントに近づける)
2. **TypeScript サポート**
3. **欠損翻訳の管理**
4. **サーバーコンポーネントのサポート**
5. **Next.js のための強化されたルーティングとミドルウェア**
6. **セットアップの簡易性**

このガイドは、特に **Next.js 13+**、**App Router** および **Server Components** に対する強力な選択肢である理由を示す **Intlayer** の **詳細な解説** も提供します。

---

## 各ライブラリの概要

### 1. next-intl

**主な焦点**: ローカリゼーションへの軽量アプローチで素早く簡単なセットアップ。

- **アーキテクチャ**: 翻訳を単一のフォルダ (例: `locales/`) に共に配置することを推奨しますが、複数の戦略も許容します。「コンポーネントごとの翻訳」アーキテクチャを厳格に強制するわけではありません。
- **TypeScript サポート**: 基本的な TypeScript 統合。一部の型定義は存在しますが、翻訳ファイルから TypeScript 定義を自動生成することに重きを置いてはいません。
- **欠損翻訳**: 基本的なフォールバックメカニズム。デフォルトでは、キーまたはデフォルトのロケール文字列にフォールバックします。高度な欠損翻訳チェックのための堅牢なツールはありません。
- **サーバーコンポーネントのサポート**: 一般的には Next.js 13+ で機能しますが、パターンは深いサーバーサイドの使用にはあまり特化していません (例: 複雑な動的ルーティングを伴うサーバーコンポーネント)。
- **ルーティングとミドルウェア**: ミドルウェアのサポートは可能ですが限られています。通常はロケール検出のために Next.js `Middleware` に依存するか、ロケールパスを再書き込みするための手動設定が必要です。
- **セットアップの簡易性**: 非常に直感的です。最小限のボイラープレートが必要です。

**使用する場合**: よりシンプルなアプローチが求められる、またはローカリゼーションをより伝統的な方法 (ロケール JSON ファイルがある一つのフォルダのように) で管理することに慣れている場合。

---

### 2. next-i18next

**主な焦点**: `i18next` を内部で使用した実績のあるソリューションで、Next.js プロジェクトで広く採用されています。

- **アーキテクチャ**: 翻訳を `public/locales` フォルダに整理することが一般的です。特定のコンポーネントの近くに翻訳を保つようには設計されていませんが、手動で異なる構造を採用することができます。
- **TypeScript サポート**: かなりの TypeScript カバレッジがあるが、型付き翻訳と型付きフックのためのカスタム設定が必要です。
- **欠損翻訳**: i18next は補間/フォールバックを提供します。ただし、欠損翻訳の検出には通常追加の設定やサードパーティプラグインが必要です。
- **サーバーコンポーネントのサポート**: Next.js 13 に関する基本的な使用法は文書化されていますが、高度な使用法 (例: サーバーコンポーネントとの深い統合、動的ルート生成) は手間がかかる場合があります。
- **ルーティングとミドルウェア**: Next.js `Middleware` とロケールのサブパスの再書き換えに大きく依存しています。より複雑なセットアップでは、i18next の高度な構成を掘り下げる必要があるかもしれません。
- **セットアップの簡易性**: i18next に慣れた人には馴染みのあるアプローチです。ただし、高度な i18n 機能が必要な場合 (ネームスペース、複数のフォールバックロケールなど)、ボイラープレートが増加する可能性があります。

**使用する場合**: あなたがすでに `i18next` エコシステムにコミットしているか、既存の i18next ベースの翻訳を持っている場合。

---

### 3. Intlayer

**主な焦点**: Next.js **App Router** (12, 13, 14, 15) のために特別に設計された、サーバーコンポーネントと **Turbopack** に内蔵サポートを提供する最新のオープンソース i18n ライブラリ。

#### 主な利点

1. **アーキテクチャ**

   - **翻訳をコンポーネントのすぐ隣に配置することを推奨**します。それぞれのページまたはコンポーネントは独自の `.content.ts` (または JSON) ファイルを持つことができ、大きな翻訳フォルダを探し回る必要はありません。
   - これにより、大規模なコードベースでコードがより **モジュール化され、保守性が向上**します。

2. **TypeScript サポート**

   - **自動生成型定義**: コンテンツを定義する瞬間に、Intlayer はオートコンプリートを支え、翻訳エラーをキャッチする型を生成します。
   - 欠 missing Keys やランタイムエラーを最小限に抑え、IDE での **オートコンプリート** を提供します。

3. **欠損翻訳の管理**

   - ビルド中、Intlayer は **欠損翻訳キーを検出**し、警告やエラーをスローすることができます。
   - これにより、言語全体で欠損テキストを誤って出荷することがないようにします。

4. **サーバーコンポーネントに最適化**

   - Next.js **App Router** と新しい **Server Components** のパラダイムと完全に互換性があります。
   - サーバーコンテキストを **孤立させるための特殊なプロバイダー** (`IntlayerServerProvider`, `IntlayerClientProvider`) を提供します (Next.js 13+ を扱う際に重要)。

5. **強化されたルーティングとミドルウェア**

   - 自動ロケール検出 (クッキーやブラウザヘッダーを介して) と高度なルート生成のための専用 [**`intlayerMiddleware`**](#) を含みます。
   - 最小限の設定でローカライズされたパス (例: `/en-US/about` と `/fr/about`) を動的に処理します。
   - 代替言語リンクを生成するためのヘルパー メソッド `getMultilingualUrls` を提供します (SEO に最適)。

6. **簡素化されたセットアップ**
   - ロケール、デフォルトロケール、および統合の好みを定義するための単一の構成ファイル (`intlayer.config.ts`)。
   - すべての環境変数とコンテンツの監視を **注入** するラッパープラグイン `withIntlayer(nextConfig)`。
   - **大規模なフォールバック構成は不要**, システムは最小限の摩擦で「自動的に機能する」ように構築されています。

> **結論**: Intlayer は、**React コンポーネントに近くに翻訳を保つことから**、**堅牢な TS サポート**、**容易なサーバーサイド** 使用まで、最良のプラクティスを推進したい現代的な解決策です。そして **ボイラープレートを大幅に削減**します。

---

## 機能比較

| **機能**                             | **next-intl**                         | **next-i18next**                                 | **Intlayer**                                |
| ------------------------------------ | ------------------------------------- | ------------------------------------------------ | ------------------------------------------- |
| **コンポーネント近くに翻訳を保つ**   | 部分的 – 通常は一つのロケールフォルダ | デフォルトではない – 多くの場合 `public/locales` | **はい – 推奨され、簡単**                   |
| **TypeScript 自動生成**              | 基本的な TS 定義                      | 基本的な TS サポート                             | **はい – 高度なアウトオブボックス**         |
| **欠損翻訳の検出**                   | 主にフォールバック文字列              | 主にフォールバック文字列                         | **はい – ビルド時チェック**                 |
| **サーバーコンポーネントのサポート** | 機能するが専門的ではない              | サポートされているが冗長になりがち               | **特殊なプロバイダーと完全なサポート**      |
| **ルーティングとミドルウェア**       | 手動で Next ミドルウェアと統合        | 再書き換え構成を介して提供                       | **専用の i18n ミドルウェア + 高度なフック** |
| **セットアップの複雑性**             | シンプル、最小限の構成                | 従来型で、進んだ使用には冗長な場合がある         | **一つの構成ファイル & プラグイン**         |

---

## Intlayer の利点

**Server Components** を持つ **Next.js App Router** (バージョン 13、14、15) に移行中または上に構築しているチームに対し、Intlayer は以下を提供します：

1. **合理化されたアーキテクチャ**

   - 各ルートまたはコンポーネントが自分の翻訳を保持します。これにより明確性と保守性が促進されます。

2. **強力な TypeScript 統合**

   - コンパイラーレベルの安全性を得て、「タイプミス」や欠損翻訳キーを回避できます。

3. **リアルな欠損翻訳アラート**

   - キーや言語翻訳を忘れた場合、ビルド時に警告を受け取ります（未完成の UI を出荷するのではなく）。

4. **内蔵の高度なルーティング**

   - 自動ロケール検出、動的ルート生成、および簡単なローカライズされた URL 管理が含まれています。
   - 標準の `intlayerMiddleware` は深いカスタム再書き込みを必要としません。

5. **ワンストップセットアップ**

   - 最小限のボイラープレート: 単に `intlayer.config.ts` を定義し、`next.config` を `withIntlayer` でラップし、公式ミドルウェアを追加します。
   - **Server** および **Client** コンポーネントへの明確かつ直感的な使用が可能です。

6. **SEO フレンドリー**
   - 組み込まれたヘルパー (`getMultilingualUrls`, `hrefLang` 属性など) により、SEO 対応のページやサイトマップを簡単に生成できます。

---

## 例: Intlayer を使った実装

以下は、Next.js 15 プロジェクトで Intlayer を活用する方法を示す _非常に_ 短縮されたスニペットです。詳細な内容とコードの例については、[Intlayer の完全なガイドを確認してください](#)。

<details>
<summary>ステップバイステップの例</summary>

1. **インストールと構成**

   ```bash
   npm install intlayer next-intlayer
   ```

   ```ts
   // intlayer.config.ts
   import { Locales, type IntlayerConfig } from "intlayer";

   const config: IntlayerConfig = {
     internationalization: {
       locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
       defaultLocale: Locales.ENGLISH,
     },
   };
   export default config;
   ```

2. **プラグインの使用**

   ```ts
   // next.config.mjs
   import { withIntlayer } from "next-intlayer/server";

   /** @type {import('next').NextConfig} */
   const nextConfig = {};

   export default withIntlayer(nextConfig);
   ```

3. **ミドルウェアの追加**

   ```ts
   // src/middleware.ts
   export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

   export const config = {
     matcher:
       "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
   };
   ```

4. **ローカライズされたレイアウトの作成**

   ```tsx
   // src/app/[locale]/layout.tsx
   import { getHTMLTextDir } from "intlayer";
   import { NextLayoutIntlayer } from "next-intlayer";

   const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
     const { locale } = params;
     return (
       <html lang={locale} dir={getHTMLTextDir(locale)}>
         <body>{children}</body>
       </html>
     );
   };

   export { generateStaticParams } from "next-intlayer";
   export default LocaleLayout;
   ```

5. **コンテンツの宣言と使用**

   ```tsx
   // src/app/[locale]/page.content.ts
   import { t } from "intlayer";

   export default {
     key: "page",
     content: {
       getStarted: {
         main: t({
           en: "Get started by editing",
           fr: "Commencez par éditer",
           es: "Comience por editar",
         }),
         pageLink: "src/app/page.tsx",
       },
     },
   };
   ```

   ```tsx
   // src/app/[locale]/page.tsx
   import { IntlayerServerProvider } from "next-intlayer/server";
   import { IntlayerClientProvider, useIntlayer } from "next-intlayer";

   const PageContent = () => {
     const { content } = useIntlayer("page");
     return (
       <>
         <p>{content.getStarted.main}</p>
         <code>{content.getStarted.pageLink}</code>
       </>
     );
   };

   export default function Page({ params }) {
     return (
       <IntlayerServerProvider locale={params.locale}>
         <IntlayerClientProvider locale={params.locale}>
           <PageContent />
         </IntlayerClientProvider>
       </IntlayerServerProvider>
     );
   }
   ```

   </details>

---

## 結論

**next-intl**, **next-i18next**, **Intlayer** の各ソリューションは、マルチリンガルな Next.js プロジェクトに対して効果的であることが証明されています。しかし、**Intlayer** はさらに前に進み：

- **コンポーネントレベルの翻訳アーキテクチャを強力に推奨**
- **Next.js 13+ と Server Components にシームレスに統合**
- **強力な TypeScript** 自動生成による安全なコード
- **欠損翻訳をビルド時に処理**
- **高度なルーティングとミドルウェアによる**単純化された、単一の構成アプローチを提供

**Next.js App Router** に特化した現代的な i18n 機能を求めていて、手動でのフォールバックロジックやルートの書き換え、複雑なビルドステップなしに **完全に型指定された** 経験を探しているなら、**Intlayer** は魅力的な選択肢です。セットアップ時間を短縮するだけでなく、チームのために翻訳のより維持可能でスケーラブルなアプローチを保証します。
