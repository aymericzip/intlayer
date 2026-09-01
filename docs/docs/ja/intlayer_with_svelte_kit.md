---
createdAt: 2025-11-20
updatedAt: 2026-08-30
title: "SvelteKit i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）SvelteKitアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 7.1.10
    date: 2025-11-20
    changes: "初期履歴"
author: aymericzip
---

# Intlayerを使ってSvelteKitのウェブサイトを翻訳する | 国際化（i18n）

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「svelte-i18n」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

<AccordionGroup>
<Accordion header="Full SvelteKit coverage">

Intlayer は、**多言語ルーティング**、**SSR サポート**、およびスケーリング国際化 (i18n) に必要なすべての機能を提供することにより、SvelteKit と完全に連携するように最適化されています。

</Accordion>

<Accordion header="Bundle size">

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

</Accordion>

<Accordion header="保守性">

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

</Accordion>

<Accordion header="AI Agent">

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** などのツール スイートも付属しています。および **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

</Accordion>

<Accordion header="自動化">

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

</Accordion>

<Accordion header="パフォーマンス">

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

</Accordion>

<Accordion header="none-dev でのスケーリング">

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

---

## SvelteKitアプリケーションでIntlayerをセットアップするステップバイステップガイド

[Application Template](https://github.com/aymericzip/intlayer-sveltekit-template) を GitHub で参照してください。

まずは新しいSvelteKitプロジェクトを作成しましょう。以下は最終的に作成する構成です：

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

<Steps>

<Step number={1} title="依存関係をインストール">

npm を使用して必要なパッケージをインストールしてください:

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

> `--interactive` フラグはオプションです。AI エージェントの場合は `intlayer-cli init` を使用してください。

> このコマンドはあなたの環境を検出し、必要なパッケージをインストールします。例えば：

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**: コアとなるi18nパッケージ。
- **svelte-intlayer**: Svelte/SvelteKit向けのコンテキストプロバイダーとストアを提供します。
- **vite-intlayer**: コンテンツ宣言をビルドプロセスに統合するViteプラグイン。

</Step>

<Step number={2} title="プロジェクトの設定">

プロジェクトのルートに設定ファイルを作成します:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="Intlayer を Vite 設定に統合する">

`vite.config.ts` を更新して、Intlayer プラグインを含めます。このプラグインは、コンテンツファイルのトランスパイルを処理します。

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // 順序が重要です。Intlayerはsvelteより前に配置する必要があります
});
```

</Step>

<Step number={4} title="コンテンツを宣言する">

`src` フォルダ内の任意の場所（例：`src/lib/content` またはコンポーネントの隣）にコンテンツ宣言ファイルを作成します。これらのファイルは、各ロケールに対して `t()` 関数を使用してアプリケーション用の翻訳可能なコンテンツを定義します。

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      ja: "SvelteKitへようこそ",
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="Intlayerをコンポーネントで利用する">

これで、任意の Svelte コンポーネントで `useIntlayer` 関数を使用できます。これはロケールが変更されると自動的に更新されるリアクティブストアを返します。この関数は現在のロケール (SSR とクライアント側のナビゲーション の両方) を自動的に尊重します。

> **注記:** `useIntlayer` は Svelte store を返すため、リアクティブ値にアクセスするには `$` プレフィックスを使用する必要があります (例: `$content.title`)。

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" は Step 4 で定義されたキーに対応しています
  const content = useIntlayer("hero-section");
</script>

<!-- シンプルなコンテンツとしてレンダリング  -->
<h1>{$content.title}</h1>
<!-- エディタを使用して編集可能なコンテンツをレンダリング -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- コンテンツを文字列としてレンダリング -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="ルーティングの設定" isOptional={true}>

以下の手順は、SvelteKit でロケールベースのルーティングをセットアップする方法を示しています。これにより、URL にロケールプレフィックス (例: `/en/about`, `/fr/about`) を含めることができ、SEO とユーザー体験が向上します。

```bash
.
└─── src
    ├── app.d.ts                  # ロケール型を定義
    ├── hooks.server.ts           # ロケールルーティングを管理
    ├── lib
    │   └── getLocale.ts          # ヘッダー、クッキーからロケールを確認
    ├── params
    │   └── locale.ts             # ロケールパラメータを定義
    └── routes
        ├── [[locale=locale]]     # ロケールを設定するためにルートグループでラップ
        │   ├── +layout.svelte    # ルートのローカルレイアウト
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # フォントとグローバルスタイルのルートレイアウト
```

</Step>

<Step number={7} title="サーバーサイドのロケール検出を処理する">

SvelteKit では、SSR 時に正しいコンテンツをレンダリングするため、サーバーはユーザーのロケールを認識する必要があります。`hooks.server.ts` を使用して、URL またはクッキーからロケールを検出します。

`src/hooks.server.ts`を作成または変更します:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // 現在のパスがすでにロケール（例：/fr、/en）で始まっているかチェック
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // URLにロケールが存在しない場合（例：ユーザーが「/」にアクセス）、リダイレクト
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // 一時的なリダイレクト
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

次に、リクエストイベントからユーザーのロケールを取得するヘルパーを作成します:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * リクエストイベントからユーザーのロケールを取得します。
 * この関数は `src/hooks.server.ts` の `handle` フック内で使用されます。
 *
 * まず Intlayer ストレージ（cookies またはカスタムヘッダー）からロケールを取得しようとします。
 * ロケールが見つからない場合は、ブラウザの "Accept-Language" ネゴシエーションにフォールバックします。
 *
 * @param event - SvelteKit からのリクエストイベント
 * @returns ユーザーのロケール
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Intlayer ストレージ（Cookies またはヘッダー）からロケールを取得してみます
  const storedLocale = getLocaleFromStorage({
    // SvelteKit cookies アクセス
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // SvelteKit headers アクセス
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // ブラウザの "Accept-Language" ネゴシエーションにフォールバック
  const negotiatorHeaders: Record<string, string> = {};

  // SvelteKit Headers オブジェクトをプレーンな Record<string, string> に変換
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // `Accept-Language` ヘッダーからロケールをチェック
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // マッチが見つからない場合はデフォルトロケールを返す
  return defaultLocale;
};
```

> `getLocaleFromStorage` はあなたの設定に応じて、ヘッダーまたはクッキーからロケールをチェックします。詳細は [Configuration](https://intlayer.org/doc/concept/configuration) を参照してください。

> `localeDetector` 関数は `Accept-Language` ヘッダーを処理し、最適なマッチを返します。

ロケールが設定されていない場合、404エラーを返したいです。これを簡単にするために、ロケールが有効かどうかをチェックする `match` 関数を作成できます：

```ts fileName="/src/params/locale.ts"
import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **Note:** `src/app.d.ts` にロケール定義が含まれていることを確認してください:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

`+layout.svelte` ファイルの場合、i18n に関連しない静的コンテンツのみを保持するために、すべてを削除できます:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

次に、`[[locale=locale]]` グループの下に新しいページとレイアウトを作成します:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// ジェネリック Load 型を使用
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// ルートからのロケールでIntlayerを初期化
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// レイアウトコンテンツ辞書を使用
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// ホームコンテンツ辞書を使用
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>

<Step number={8} title="国際化されたリンク" isOptional={true}>

SEO のため、ルートをロケール接頭辞を付けることが推奨されます (例: `/en/about`, `/fr/about`)。このコンポーネントは現在のロケールで自動的にリンクに接頭辞を付けます。

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // 現在のロケールでURLにプレフィックスを付けるヘルパー
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

SvelteKit の `goto` を使用する場合、同じロジックを `getLocalizedUrl` と共に使用してローカライズされた URL にナビゲートできます:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // ロケールに応じて /en/about または /fr/about にナビゲートします
```

</Step>

<Step number={1} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存のコードベースがある場合、数千のファイルを変換するのは時間がかかることがあります。

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // ストアにロケールを設定し、onLocaleChangeをトリガーします
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>

<Step number={10} title="バックエンドプロキシを追加する" isOptional={true}>

SvelteKitアプリケーションにバックエンドプロキシを追加するには、`vite-intlayer`プラグインが提供する`intlayerProxy`関数を使用できます。このプラグインは、URL、クッキー、およびブラウザーの言語設定に基づいて、ユーザーに最適なロケールを自動的に検出します。

> Intlayer v9以降、`intlayerProxy()`は`intlayer()`プラグインに直接バンドルされ、`routing.enableProxy`オプション（デフォルトで`true`）を通じてデフォルトで有効になります。以下に示すように個別に登録することはオプションになりました — これは後方互換性のためと、プラグインの順序を制御する必要があるセットアップのために保持されています。`routing.enableProxy: false`を設定してオプトアウトできます。[v9リリースノート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/releases/v9.md)を参照してください。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],
});
```

</Step>

<Step number={11} title="intlayer editor / CMS を設定する" isOptional={true}>

intlayer エディターをセットアップするには、[intlayer エディターのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)に従う必要があります。

intlayer CMSをセットアップするには、[intlayer CMSドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)に従う必要があります。

intlayer editor selector を視覚化するには、intlayer のコンテンツ内でコンポーネント構文を使用する必要があります。

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- シンプルなコンテンツとしてレンダリング  -->
  <h1>{$content.title}</h1>

  <!-- コンポーネントとしてレンダリング（エディタで必要） -->
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={12} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存の codebase がある場合、数千のファイルを変換するのに時間がかかる可能性があります。

このプロセスを容易にするために、Intlayerは、コンポーネントを変換しコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提案しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の構成
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除することができます。
     */
    saveComponents: false,

    /**
     * 辞書キーの接頭辞
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='抽出コマンド'>

コンポーネントを変換してコンテンツを抽出するためにエクストラクタを実行します

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babelコンパイラ'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // コンポーネントから辞書へコンテンツを抽出する
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # または npm run dev
```

```bash packageManager="pnpm"
pnpm run build # または pnpm run dev
```

```bash packageManager="yarn"
yarn build # または yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Git Configuration

Intlayerによって生成されたファイルを無視することをお勧めします。

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

---

### さらに進む

- **ビジュアルエディター**: UIから直接翻訳を編集するために、[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を統合します。
- **CMS**: コンテンツ管理を外部化するために、[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用します。

## よくある質問

<FAQ>

<Question title="SvelteKit アプリを国際化するために利用できるさまざまなソリューションは何ですか？">

- **`svelte-i18n`** と **`typesafe-i18n`**: ストアベースのメッセージカタログで、load 関数に手動で配線します。
- **`Paraglide`**: コンパイルされたメッセージと強力な型付けの仕組みを備え、メッセージレイヤーのみに焦点を当てています。
- **`Intlayer`**: 最も高度なソリューションです。コードベースのどこにでもコンテンツを宣言でき（[各コンポーネントの隣またはセントラライズ](https://intlayer.org/blog/per-component-vs-centralized-i18n)）、ビルド時にコンパイルされます。ロケール対応ルーティング、サーバーサイドロケール検出、AI 翻訳、ビジュアルエディタ、CMS を備えています。

SvelteKit ではサーバーサイドの部分に違いが現れます。hooks でのロケール検出、ローカライズされたリンク、エディタ統合がライブラリに付属しており、プロジェクトごとに組み立てる必要がありません。[Intlayer を選ぶ理由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)と [Svelte i18n ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/svelte.md)を参照してください。

</Question>

<Question title="i18n は SvelteKit のバンドルサイズにどの程度の影響を与えますか？">

ネームスペースベースのセットアップよりもはるかに少なくなります。ページはレンダリングしないカタログをダウンロードしないためです。サーバーレンダリングされたマークアップはサーバー上でコンテンツを解決し、ビルド時コンパイラは `useIntlayer` 呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーと未使用の言語は削除され、[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)は残りをロケールごとに分割します。通常の代替案と比較すると、Intlayer はバンドルとページサイズを最大 50% 削減します。[バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)と[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/svelte.md)を参照してください。

</Question>

<Question title="`svelte-i18n` または `typesafe-i18n` からコンポーネントを書き直さずに移行できますか？">

ほぼ可能です。[Svelte I18n 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/svelte-i18n.md)に従ってコンテンツを移動してください。段階的に移行することもできます。[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は既存の JSON カタログを信頼できるソースとして保ち、それらから Intlayer 辞書を生成するため、両方のレイヤーが同期を保ちながらコンポーネントを 1 つずつ移動できます。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか？">

はい。[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は `/messages/{locale}/{namespace}.json` ファイルを信頼できるソースとして保ち、双方向で Intlayer 辞書を生成します。[sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)は gettext カタログに対して同じことを行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)では 1 つのファイルにロケールをグループ化する代わりに言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayer はコンポーネントを読み込み、ユーザーに見える文字列を抽出し、各コンポーネントの隣に `.content` ファイルを書き込むため、文字列をカタログに 1 つずつコピーする代わりに diff をレビューできます。このガイドのステップ 12 でそれについて説明しています。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)はビルド時に同じことを行います。変更のたびに JSX、TSX、Vue、Svelte ソースをスキャンし、辞書を生成し、hot module replacement を通じて同期を保つため、手動で保守するキーはまったくありません。

コンパイラをオンにする前に知っておく価値のある 2 つの制限があります。静的分析によって機能するため、API エラーコードや CMS フィールドなど、実行時にのみ存在する文字列は到達不可能です。また、`className="active"` やステータスコードなどのアプリケーションロジックからユーザーに見える文字列を区別する必要があり、大規模なコードベースではいくつかのアノテーションが必要です。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)はあなたをループに保つことでその両方を回避します。

</Question>

<Question title="利用可能なエディタと AI エージェントツールは何ですか？">

5 つのピース、すべてオプションです：

- **[VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプし、コンポーネントからコンテンツを抽出し、コマンドパレットまたは専用の Intlayer タブからビルド、fill、test、push、pull を実行します。
- **[LSP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSP を話す任意のエディタで同じ認識を提供し、定義へのジャンプ、すべての参照を検索、翻訳値のホバープレビュー、キーとフィールドのオートコンプリート、キーがどこにも宣言されていない場合の警告があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` 呼び出しを解決し、移行中に役立ちます。
- **[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: Intlayer ドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開し、アシスタントが推測する代わりに現在のドキュメントから回答でき、`intlayer fill` などのコマンドを自分で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content` などの焦点を絞ったスキル、およびフレームワークごとに 1 つ、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツのさらなるルールがあります。

</Question>

<Question title="Intlayer は SvelteKit のサーバーサイドレンダリングとプリレンダリングで機能しますか？">

はい。ステップ 7 は `hooks.server.ts` でのサーバーサイドロケール検出をカバーしているため、最初の HTML レスポンスはすでに正しい言語を含んでおり、これは検索エンジンとソーシャルクローラーが読むものです。プリレンダリングされたルートはビルド時にコンテンツを解決します。

</Question>

<Question title="ローカライズされたルートと国際化されたリンクをセットアップするにはどうすればよいですか？">

ステップ 6 と 8 でカバーしています。ルートツリー上のロケールセグメントと、リンク用の `getLocalizedUrl` はナビゲーションをアクティブな言語内に保ち、`routing.mode` はデフォルトロケールがまったくプレフィックスされるかどうかを決定します。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Question>

<Question title="Svelte で言語スイッチャーを構築するにはどうすればよいですか？">

ステップ 9 がコンポーネントを示しています。`useLocale` はアクティブなロケール、宣言されたロケール、cookie に選択を永続化するセッターを公開し、`getLocalizedUrl` は現在のパスを書き直すため、読者は言語を切り替えた後も同じページに留まります。

</Question>

<Question title="SvelteKit アプリを AI で自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill` を実行します。これは選択した LLM を使用して独自のプロバイダーと API キーで不足している翻訳を入力し、`--git-diff` は実行をブランチで変更されたコンテンツに制限します。[fill コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

</Question>

<Question title="Intlayer は複数形、性別、リッチテキストをサポートしていますか？">

はい：[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別ベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、および数値、日付、通貨の[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)。

</Question>

<Question title="翻訳者がコードに触れずにコンテンツを編集するにはどうすればよいですか？">

[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を通じて、独自のインフラストラクチャで実行され、誰でも実行中のアプリ上でテキストをその場で編集できます。または、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を通じて、コンテンツを外部化してデプロイなしで変更できます。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下で、商用利用を含みます。ホストされた CMS はオプションの有料サービスで、[自己ホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することもできます。

</Question>

</FAQ>
