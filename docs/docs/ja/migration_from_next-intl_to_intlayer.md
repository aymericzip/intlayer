---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "next-intlからIntlayerへの移行 | 国際化 (i18n)"
description: "Next.jsアプリケーションをnext-intlからIntlayerに移行する方法を学びます — 既存のコードを壊すことなく、ステップバイステップで解説します。シームレスな移行のために@intlayer/next-intl互換性アダプターを使用してください。"
keywords:
  - next-intl
  - intlayer
  - 移行
  - 国際化
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
---

# next-intlからIntlayerへの移行

## なぜnext-intlからIntlayerに移行するのか？

<AccordionGroup>

<Accordion header="バンドルサイズ">

巨大なJSONファイルをページに読み込む代わりに、必要なコンテンツのみをロードします。Intlayerは、**バンドルとページのサイズを最大50%削減**するのに役立ちます。

</Accordion>

<Accordion header="メンテナンス性">

アプリケーションのコンテンツをスコープ化することで、大規模なアプリケーションの**メンテナンスが容易**になります。機能フォルダ全体を複製または削除しても、すべてのコンテンツコードベースを確認するという精神的負担がありません。さらに、Intlayerはコンテンツの正確性を確保するために**完全に型付け**されています。

また、Intlayerはi18nエコシステムの中で**最も活発に開発されている**ソリューションでもあります。問題は迅速に修正され、新しいフレームワークアダプタが定期的に登場し、コアAPIは実際の運用フィードバックに基づいて継続的に改良されています。

</Accordion>

<Accordion header="AIエージェント">

コンテンツのコロケーション（同一場所配置）により、大規模言語モデル（LLM）に必要な**コンテキストが減少**します。Intlayerには、不足している翻訳をテストするための**CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**、および**[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**などのツールスイートが備わっており、AIエージェントにとってよりスムーズな開発者体験（DX）を提供します。

</Accordion>

<Accordion header="自動化">

AIプロバイダーのコストで、お好みのLLMを使用してCI/CDパイプライン内で翻訳を自動化できます。Intlayerは、コンテンツ抽出を自動化するための**コンパイラ**や、**バックグラウンドでの翻訳**を支援する[ウェブプラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)も提供しています。

</Accordion>

<Accordion header="パフォーマンス">

コンポーネントに巨大なJSONファイルを接続すると、パフォーマンスやリアクティビティの問題が発生する可能性があります。Intlayerはビルド時にコンテンツのロードを最適化します。

</Accordion>

<Accordion header="非開発者とのスケーラビリティ">

単なるi18nソリューションにとどまらず、Intlayerはセルフホストの**[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)**と**[フルCMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)**を提供し、多言語コンテンツを**リアルタイム**で管理できるようにします。これにより、翻訳者やコピーライター、その他のチームメンバーとのシームレスなコラボレーションが可能になります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>

</AccordionGroup>

---

## 移行戦略

既存のアプリケーションに推奨されるアプローチは**互換性アダプター**です：`@intlayer/next-intl`をインストールします。これは`next-intl`と**全く同じAPI**を公開しますが、裏側ですべての翻訳作業をIntlayerに委譲します。

既存の`useTranslations`、`getTranslations`、`NextIntlClientProvider`などはそのまま保持されます — **変更するのはインポートパスのみです**。呼び出しシグネチャ、プロパティの形、コンポーネント構造のリファクタリングは不要です。

将来的には、オプションとして個々のファイルをよりリッチなIntlayerの`.content.ts`形式に移行し、ビジュアルエディタ、CMS、コンポーネントレベルのコンテンツスコープを利用できるようにすることができます — ただし、このステップは完全にオプションであり、徐々に行うことができます。

---

## 目次

<TOC/>

---

## クイック移行

以下の手順は、コードを変更せずに既存の`next-intl`アプリをIntlayer上で実行するために必要な最小限のステップです。

<Steps>

<Step number={1} title="依存関係のインストール">

Intlayerのコアパッケージと互換性アダプター`@intlayer/next-intl`をインストールします：

```bash packageManager="npm"
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
bun x intlayer init
```

> `next-intl`はインストールしたままにしておいてください — **URLルーティング** (`createNavigation`、`createMiddleware`、`Link`、`redirect`、`usePathname`、`useRouter`) のために引き続き必要です。互換性アダプターはルーティングレイヤーを置き換え**ません**。

</Step>

<Step number={2} title="Intlayerの設定">

`intlayer init`コマンドにより、初期の`intlayer.config.ts`ファイルが作成されます。既存のロケールに合わせて設定を更新し、`syncJSON`プラグインがメッセージファイルを指すようにします：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 既存のすべてのロケールをここに追加します
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // 'icu'はnext-intlのICUプレースホルダー構文 {name}, {count, plural, ...} に一致させます
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`**はロケールをそのJSONファイルのパスにマッピングします。**`location`**はIntlayerウォッチャーに変更を監視するフォルダを指示します。`format: 'icu'`オプションは、`{name}`や`{count, plural, one {# item} other {# items}}`のようなICUプレースホルダーが正しく解析されることを保証します。

> 利用可能なすべての設定オプションについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="IntlayerプラグインをNext.jsに追加する">

既存のNext.js設定を`@intlayer/next-intl/plugin`の`createNextIntlPlugin`でラップします。このラッパーは`withIntlayer`を合成**しつつ**、`next-intl` → `@intlayer/next-intl`のエイリアスを登録します：

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* 既存の設定オプション */
};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()`は`withIntlayer`をラップし、**Webpack**または**Turbopack**を自動検出して、コンテンツ監視や辞書のコンパイルをフックアップし、最も重要なこととして**モジュールエイリアスを注入**します。これにより、既存の`import … from 'next-intl'`への呼び出しがビルド時に透過的に`@intlayer/next-intl`にリダイレクトされます。`next-intl/routing`のエントリは実際のパッケージを指し続けます。ソースファイルの変更は不要です。
>
> 通常の`next-intlayer/server`の`withIntlayer`を使用したい場合は、辞書はコンパイルされますがエイリアスは追加され**ません** — その場合、インポートを手動で`@intlayer/next-intl`に変更する必要があります（ステップ4を参照）。

> **`getRequestConfig`や`loadMessages`は不要になります。** `next-intl`では、リクエストごとに`getRequestConfig`を介してJSONメッセージバンドルを読み込む`src/i18n.ts`ファイルを作成する必要がありました。Intlayerはすべての辞書を**ビルド時**にコンパイルするため、実行時のロードステップはありません。このファイルは完全に削除できます（引き続き`createNavigation`を使用する場合は、ルーティングの部分だけを残してください）。

</Step>

</Steps>

これでクイック移行は完了です。アプリはすべての`next-intl`のインポートとAPIを保持したまま、Intlayer上で動作するようになります。

> **型付けされた翻訳キー — 自動的に。** Intlayerが辞書をコンパイルすると、`useTranslations`と`getTranslations`は実際のコンテンツに対して型付けされます。キーはIDEでオートコンプリートされ、無効なパスはビルド時にTypeScriptエラーを引き起こします — 追加の設定は必要ありません。
>
> ```tsx
> // クライアントコンポーネント — 'about' は登録済みの辞書のキーです
> const t = useTranslations("about");
> t("counter.label"); // ✓ オートコンプリート
> t("does.not.exist"); // ✗ TypeScript エラー
>
> // サーバーコンポーネント
> const t = await getTranslations("about");
> t("counter.label"); // ✓ 型付け済み
> ```

---

## 完全移行

以下のステップはオプションであり、段階的に行うことができます。これにより、ビジュアルエディタ、CMS、型付けされたコンテンツファイル、AIを利用した翻訳自動化など、Intlayerの全機能が解放されます。

<Steps>

<Step number={4} title="インポートの明示的な変更（オプション）" isOptional={true}>

`createNextIntlPlugin()`ラッパーは既にバンドラレベルでの`next-intl` → `@intlayer/next-intl`のエイリアス化を処理しています。ソースファイル内で依存関係を明示的にしたい場合（および代わりに通常の`withIntlayer`プラグインを使用する場合）、手動でインポート名を変更できます：

| 変更前                                               | 変更後                                                         |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> 実際の`next-intl`からのルーティングのインポートは常に保持してください — 互換性アダプターはURLルーティングレイヤーを置き換え**ません**：
>
> ```ts
> // ✅ これらは常に本物の 'next-intl' から維持する
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> または、`@intlayer/next-intl/routing`から`defineRouting`を使用することで、`intlayer.config.ts`のロケール設定を自動的にマージすることができます。

</Step>

<Step number={5} title="AIを利用した翻訳自動化の有効化" isOptional={true}>

Intlayerが設定されたら、CLIを使用して、お好みのLLMを使用し不足している翻訳を自動入力することができます：

```bash packageManager="npm"
# 不足している翻訳をテスト（CIに追加）
npx intlayer test

# 不足している翻訳をAIで埋める
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

`.env`ファイルに`OPENAI_API_KEY`（またはお好みのプロバイダーのキー）を追加し、`intlayer.config.ts`を拡張します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // デフォルト
    // model: "gpt-4o-mini",   // デフォルト
  },
};

export default config;
```

> 利用可能なすべてのオプションについては、[Intlayer CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)を確認してください。

</Step>

</Steps>

---

## 移行後に削除できるもの

`@intlayer/next-intl`が導入されると、以下の`next-intl`のボイラープレートコードは削除できます：

| ファイル / パターン                                      | 不要になる理由                                                                                                                                                                             |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/i18n.ts`内の`getRequestConfig`のエクスポート        | Intlayerはビルド時に辞書をコンパイルします。リクエストごとのメッセージロードはありません。ファイルは`createNavigation`ルーティングヘルパーをエクスポートしている場合のみ保持してください。 |
| レイアウトでの`loadMessages()` / `getMessages()`呼び出し | `@intlayer/next-intl`の`NextIntlClientProvider`はコンパイルされた出力を読み取ります。`messages`プロップは不要です。                                                                        |
| レイアウトでの`locales/{locale}/*.json`のインポート      | JSONバンドルは、`syncJSON`プラグインを使用している場合にのみ必要です。`.content.ts`ファイルに移行したら、JSONフォルダを削除できます。                                                      |

さらに進める準備ができたら、Intlayerはコードベース内の**どこにある`.content.ts`および`.content.json`ファイルでも自動的に検出します**（デフォルトでは`./src`内）。`about.content.ts`ファイルを`about/page.tsx`のすぐ隣に配置するだけで、追加の設定なしでビルド時にIntlayerがそれを取得します — インポート、登録、中央のインデックスファイルは不要です。これにより、ページやコンポーネントとの翻訳のコロケーションが完全にシームレスになります。

---

## TypeScriptの設定

Intlayerはモジュール拡張を使用して、翻訳キーに対する完全なTypeScriptのIntelliSense（自動補完）を提供します。`tsconfig.json`に自動生成された型が含まれていることを確認してください：

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

---

## Git設定

Intlayerによって生成されたディレクトリを`.gitignore`に追加します：

```plaintext fileName=".gitignore"
# Intlayer生成ファイルを無視
.intlayer
```

---

## さらに詳しく

- **ビジュアルエディタ** — ブラウザ上で翻訳を視覚的に管理：[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
- **CMS** — コンテンツを外部化してリモートで管理：[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)
- **VS Code拡張機能** — 翻訳の自動補完とエラー検出をリアルタイムで取得：[Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)
- **CLIリファレンス** — コマンドの完全なリスト：[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
- **Next.jsとIntlayer** — Next.jsの完全なセットアップガイド：[intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)
