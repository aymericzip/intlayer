---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: 2026年においてnext-intlは時代遅れなのか？
description: next-intlはNext.js App Routerの定番となりました。しかし、ランタイムによるバンドルの肥大化や手動での名前空間管理という課題は残されています。
keywords:
  - next-intl
  - Intlayer
  - 国際化
  - i18n
  - Next.js
  - バンドルサイズ
  - ブログ
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
---

# 2026年においてnext-intlは時代遅れなのか？

VercelがApp Routerを導入し、Pages Routerの組み込みi18n機能を非推奨とした際、その受け皿として急速に支持を集めたのが`next-intl`でした。Jan Amann氏による丁寧なドキュメントと迅速なApp Router対応により、コミュニティの標準的な選択肢としての地位を確立しました。

ではなぜ今、その妥当性を問い直す必要があるのでしょうか？

**過去3年間でWebフロントエンドの設計思想は大きく進化しましたが、`next-intl`の基本アーキテクチャはそのままだからです。**

Next.jsがReact Server Components（RSC）、ストリーミング、コンパイラによる最適化へと移行する中で、`next-intl`は依然として国際化を実行時の責務として処理しています。巨大なJSONオブジェクトをクライアントプロバイダー経由で配布し、ブラウザ内でICUフォーマッターを実行し、バンドルサイズを抑えるために手動の名前空間分割に頼っています。

<TOC/>

## 主なポイント

**開発ペースの落ち着き:**

過去12か月間で`next-intl`のコミット数は約187回にとどまり、主にNext.jsのバージョン追従やマイナー修正が中心となっています。

**クライアント実行時の負荷:**

`NextIntlClientProvider`と`useTranslations()`を組み合わせると、テキストを表示する前に約12.8 KB（gzip圧縮後、Minifiedで51 KB）のコードが追加されます。これは`next-intlayer`（4.3 KB）の約3倍に相当します。

**約90%に及ぶ翻訳データの無駄な配信:**

一般的な構成では、**ページに渡される翻訳データの89.8%が他のルート用**のものです。`/contact`にアクセスしただけで、`/pricing`や管理画面の文言まで同時にダウンロードされます。

**手動による名前空間の管理負担:**

バンドルの肥大化を防ぐにはルートごとに手動で名前空間を切り出す必要があり、本番環境での文言欠落リスクが高まります。

**提携関係による方向性:**

Crowdinの公式パートナーであるため、CLIに完全無料で使えるローカルAI翻訳機能を自前で組み込む強い動機が存在しません。

## 保守状況と現代的ツールの比較

過去12か月間のコミット動向:

| リポジトリ            | スター数                                                                                                                                               | 総コミット数                                                                                                                                                        | 年間コミット数                                                                                                                                                     | 最終コミット                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

直近12か月の実績:

- `amannn/next-intl`: **187コミット**（フレームワーク追従と不具合修正）。
- `aymericzip/intlayer`: **4,343コミット**（コンパイラ機能の拡充、IDE拡張機能、MCPサーバー、翻訳エンジンの開発）。

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#amannn/next-intl&aymericzip/intlayer)

成熟したライブラリは安心感をもたらします。しかし現在のi18n環境は大きく変化しました。ビルド時に不要文言を自動削除し、CI環境でLLMが翻訳を行い、開発者はLanguage Server（LSP）やAIエージェントの支援を受けます。ランタイムに頼る設計では、こうした新しい恩恵を十分に享受できません。

## Next.js 16 App Routerでの性能測定

10ルート、10言語で構成された典型的なApp Routerアプリケーションでの計測結果:

<I18nBenchmark framework="nextjs" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> 実ブラウザ環境で本番用gzip圧縮を適用して計測。詳細は[Next.jsベンチマークレポート](https://intlayer.org/ja/doc/benchmark/nextjs)に掲載しています。

### ライブラリ本体のオーバーヘッド

翻訳ファイル読み込み前の初期フットプリント:

| ライブラリ             | Gzip圧縮後 | Minified    |
| ---------------------- | ---------- | ----------- |
| `next-intl@4.9.1`      | 12.8 KB    | 51.0 KB     |
| `next-intlayer@8.7.12` | **4.3 KB** | **13.3 KB** |

### ページサイズと不要データの混入率

| 構成                | 平均ページJS (gz) | 他言語混入率 | 他ページ混入率 | 平均コンポーネント (gz) |
| ------------------- | ----------------- | ------------ | -------------- | ----------------------- |
| ベース（i18nなし）  | 150.8 KB          | 0.0%         | 0.0%           | 0.7 KB                  |
| `next-intl`（静的） | 163.5 KB          | 4.2%         | **89.8%**      | 20.5 KB                 |
| `next-intl`（動的） | 163.4 KB          | 9.7%         | **89.9%**      | 20.5 KB                 |
| `next-intlayer`     | **152.1 KB**      | **0.0%**     | **0.0%**       | **7.2 KB**              |

### ページ間データ漏洩の構造

標準的な`next-intl`構成では、ルートレイアウトですべてのメッセージを一括取得します。

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

トップレベルで`messages`をクライアントプロバイダーに渡すため、ブラウザはどのページでもアプリ全体の文言一式を受け取ることになります。`/login`を開いたユーザーが、FAQやヘルプ、ダッシュボード専用の文言まで同時にダウンロードしてしまうのです。

JSONファイルを名前空間ごとに分けることで緩和できますが、どのルートにどの名前空間が必要かを人間が管理し続けるのは骨が折れる作業です。

Intlayerはこの問題を静的解析で解決します。[Intlayerコンパイラ](https://intlayer.org/ja/doc/compiler)が該当ルートで使用されている文言だけを過不足なく抽出するため、ページ間のデータ漏洩率は**0.0%**となります。

## next-intlがTree-shakingを阻害する要因

ライブラリのAPIが、実行時に文字列キーを動的評価する構造になっているためです。

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

TurbopackやWebpackは、`UserProfile`内でどのキーが実際に呼ばれるかを推測できません。実行時エラーを防ぐため、**バンドラーは名前空間全体をクライアントコードに含めざるを得ません**。一方、Intlayerのようにオブジェクトのプロパティを分割代入する形式であれば、コンパイラが参照関係を把握し、未使用の文言を安全に削除できます。詳細は[バンドル最適化](https://intlayer.org/ja/doc/concept/bundle-optimization)をご覧ください。

## 開発体験（DX）の違い

### 独立したJSONとコンポーネント共配置

`next-intl`では文言がコードから離れた`messages/`配下のJSONに保管されます。Intlayerではコンテンツの宣言をコンポーネントと同じディレクトリに配置できます。

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/ja.json"
{
  "authModal": {
    "title": "アカウントにサインイン",
    "submitButton": "続ける"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      ja: "アカウントにサインイン",
    }),
    submitButton: t({
      en: "Continue",
      ja: "続ける",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

`AuthModal.tsx`の名称変更や削除を行うと、対応するコンテンツ定義も自然に追従します。

### 単なる補完と厳格な型安全性の差異

`next-intl`で`IntlMessages`を宣言すればエディタの補完が有効になります。

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

しかし型チェックの基準はデフォルト言語に限られます。`ja.json`からキーが抜け落ちていてもTypeScriptは警告を出さず、CIビルドも通過してしまい、本番で文言が欠落します。

Intlayerはすべての言語のコンテンツ定義から直接型を生成します。[`strictMode`](https://intlayer.org/ja/doc/concept/configuration)を有効にすれば、いずれかの言語で翻訳が欠落している場合にビルドエラーとなり、事前にミスを防げます。

### 開発環境とAIエコシステム

| 機能                              | `next-intl` | Intlayer                                                                |
| --------------------------------- | ----------- | ----------------------------------------------------------------------- |
| **VS Code拡張機能**               | ❌ なし     | ✅ [公式拡張機能](https://intlayer.org/ja/doc/vs-code-extension)        |
| **Language Server (LSP)**         | ❌ なし     | ✅ [専用LSP](https://intlayer.org/ja/doc/lsp)                           |
| **AIエージェント用MCPサーバー**   | ❌ なし     | ✅ [組み込みMCPサーバー](https://intlayer.org/ja/doc/mcp-server)        |
| **エージェントスキル**            | ❌ なし     | ✅ [利用可能なスキル群](https://intlayer.org/ja/doc/agent_skills)       |
| **インコンテキストビジュアルCMS** | ❌ なし     | ✅ [無料かつオープンソース](https://intlayer.org/ja/doc/concept/editor) |

LSPやMCPサーバーが備わっていることで、AIアシスタントがプロジェクトの多言語構造を正しく把握し、正確な補完や更新を行えます。

## Crowdinとのパートナーシップ

`next-intl`はCrowdinと公式パートナーシップを結んでいます。スポンサーシップはOSSの継続に有益ですが、プロジェクトの方向性にも影響を与えます。外部TMSとの連携を前提とする設計のため、ローカル環境で無料利用できるAI翻訳ワークフローをCLI自体に持たせる優先順位は低くなります。

Intlayerはオープンなアプローチを基本に据えています。

**ローカルAI翻訳機能（`intlayer fill`）:**

自身のOpenAI、Anthropic、Mistral、GeminiのAPIキーを使って、不足しているキーを自動検出して補完できます。

**セルフホスト可能なビジュアルCMS:**

[Intlayer CMS](https://intlayer.org/ja/doc/concept/cms)を導入すれば、非エンジニアのメンバーがWeb上で文言を直接編集し、変更をGitへ反映できます。

**オープンなライセンス:**

すべてのツール群がApache 2.0ライセンスのもとで公開されています。

## 今もnext-intlが適しているケース

<AccordionGroup>
<Accordion header="高度なICU MessageFormat構文が不可欠な場合">

ネストされた複雑な複数形分岐や序数フォーマットを多用するシステムでは、実績のある`next-intl`のICU実装が強みを発揮します。

</Accordion>
<Accordion header="Crowdinを核とした既存の翻訳パイプライン">

すでに組織全体でCrowdinを活用した翻訳業務が確立されている場合、親和性高く運用できます。

</Accordion>
<Accordion header="安定稼働中の既存プロダクト">

現行のシステムが問題なく稼働し、バンドルサイズが大きなボトルネックになっていないのであれば、直ちに移行する必要はありません。

</Accordion>
</AccordionGroup>

## 既存のnext-intl環境を向上させるには？

Intlayerは、`next-intl`の主要な関数やフック（`useTranslations`、`getTranslations`、ルーティングヘルパーなど）のシグネチャをそのまま再現するドロップイン互換パッケージを提供しています。コンポーネントを全面的に書き直すことなく、コンパイラ主導の最適化の恩恵を受けることができます。

導入はコマンド1行で完了します:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

この対話型CLIは以下の作業を自動で行います:

1. `@intlayer/next-intl`互換パッケージをインストール。
2. バンドラーのエイリアスを設定し、既存のインポート（`next-intl`、`next-intl/server`）をシームレスにIntlayerへルーティング。これにより古いライブラリを`package.json`から安全に削除できます。
3. エディタ内でのLanguage Server（LSP）診断、ビルド時のルート間リーク排除（完全なTree-shaking）、ローカルAI翻訳ワークフローを大規模なリファクタリングなしで即座に有効化します。

詳しい手順については、以下のガイドをご覧ください:

- **互換レイヤーの提供:** [`next-intl`互換レイヤー](https://intlayer.org/ja/doc/compatibility/next-intl)を使うことで、コード内の`useTranslations`記述を保ったまま最適化ビルドを導入できます。
- **移行ガイド:** 既存のJSONファイルを型付きコンテンツに移行するための[next-intl移行ガイド](https://intlayer.org/ja/doc/migration/next-intl)を用意しています。
- **段階的な併用:** ランタイムに`next-intl`を残したまま、[Intlayerとnext-intlを併用](https://intlayer.org/ja/blog/intlayer-with-next-intl)して型の恩恵やローカルAI翻訳のみを取り入れることも可能です。

自社サイトのバンドルサイズと翻訳漏れは無料の[i18n SEOスキャナー](https://intlayer.org/i18n-seo-scanner)で診断できます。

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## おすすめの関連記事

- [Next.js i18nベンチマーク: パフォーマンス詳細分析](https://intlayer.org/ja/doc/benchmark/nextjs)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ja/blog/next-i18next-vs-next-intl-vs-intlayer)
- [2026年においてi18nextは時代遅れなのか？](https://intlayer.org/ja/blog/is-i18next-outdated)
- [コンパイラによる国際化と宣言的アプローチの利点](https://intlayer.org/ja/blog/compiler-vs-declarative-i18n)
