---
createdAt: 2025-11-20
updatedAt: 2025-11-20
title: SvelteKitアプリを翻訳する方法 – i18nガイド 2025
description: SvelteKitのウェブサイトを多言語対応にする方法を紹介します。Server-Side Rendering（SSR）を使って国際化（i18n）および翻訳を行うためのドキュメントに従ってください。
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
history:
  - version: 7.1.10
    date: 2025-11-20
    changes: 初期履歴
---

# Intlayerを使ってSvelteKitのウェブサイトを翻訳する | 国際化（i18n）

## 目次

<TOC/>

## Intlayerとは何ですか？

**Intlayer**は、モダンなウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。**SvelteKit**のサーバーサイドレンダリング（SSR）機能とシームレスに連携します。

Intlayerを使うことで、以下が可能になります：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成される型情報でTypeScriptのサポートを保証**します。
- **SvelteKitのSSRを活用してSEOに優しい国際化を実現**します。

---

## SvelteKitアプリケーションでIntlayerをセットアップするステップバイステップガイド

まずは新しいSvelteKitプロジェクトを作成しましょう。以下は最終的に作成する構成です：

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

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

### ステップ 1: 依存関係のインストール

npm を使用して必要なパッケージをインストールします:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: コアのi18nパッケージです。
- **svelte-intlayer**: Svelte/SvelteKit用のコンテキストプロバイダーとストアを提供します。
- **vite-intlayer**: コンテンツ宣言をビルドプロセスに統合するためのViteプラグインです。

### ステップ 2: プロジェクトの設定

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

### ステップ 3: Vite設定にIntlayerを統合する

`vite.config.ts`を更新してIntlayerプラグインを含めます。このプラグインはコンテンツファイルのトランスパイルを処理します。

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // 順序が重要です。IntlayerはSvelteKitの前に配置してください
});
```

### ステップ4: コンテンツの宣言

`src`フォルダ内の任意の場所（例: `src/lib/content` やコンポーネントと同じ場所）にコンテンツ宣言ファイルを作成します。これらのファイルは、各ロケールごとに `t()` 関数を使用してアプリケーションの翻訳可能なコンテンツを定義します。

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### ステップ5: コンポーネントでIntlayerを利用する

今や、任意のSvelteコンポーネント内で`useIntlayer`関数を使用できます。この関数はリアクティブなストアを返し、ロケールが変更されると自動的に更新されます。関数は現在のロケールを自動的に尊重します（SSRおよびクライアントサイドのナビゲーションの両方で）。

> **注意:** `useIntlayer`はSvelteのストアを返すため、そのリアクティブな値にアクセスするには`---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: SvelteKitアプリを翻訳する方法 – i18nガイド 2025
> description: SvelteKitのウェブサイトを多言語対応にする方法を紹介します。Server-Side Rendering（SSR）を使って国際化（i18n）および翻訳を行うためのドキュメントに従ってください。
> keywords:

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
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: 初期履歴

---

# Intlayerを使ってSvelteKitのウェブサイトを翻訳する | 国際化（i18n）

## 目次

<TOC/>

## Intlayerとは何ですか？

**Intlayer**は、モダンなウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。**SvelteKit**のサーバーサイドレンダリング（SSR）機能とシームレスに連携します。

Intlayerを使うことで、以下が可能になります：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成される型情報でTypeScriptのサポートを保証**します。
- **SvelteKitのSSRを活用してSEOに優しい国際化を実現**します。

---

## SvelteKitアプリケーションでIntlayerをセットアップするステップバイステップガイド

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

### ステップ 1: 依存関係のインストール

npm を使用して必要なパッケージをインストールします:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: コアのi18nパッケージです。
- **svelte-intlayer**: Svelte/SvelteKit用のコンテキストプロバイダーとストアを提供します。
- **vite-intlayer**: コンテンツ宣言をビルドプロセスに統合するためのViteプラグインです。

### ステップ 2: プロジェクトの設定

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

### ステップ 3: Vite設定にIntlayerを統合する

`vite.config.ts`を更新してIntlayerプラグインを含めます。このプラグインはコンテンツファイルのトランスパイルを処理します。

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // 順序が重要です。IntlayerはSvelteKitの前に配置してください
});
```

### ステップ4: コンテンツの宣言

`src`フォルダ内の任意の場所（例: `src/lib/content` やコンポーネントと同じ場所）にコンテンツ宣言ファイルを作成します。これらのファイルは、各ロケールごとに `t()` 関数を使用してアプリケーションの翻訳可能なコンテンツを定義します。

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### ステップ5: コンポーネントでIntlayerを利用する

プレフィックスを使用する必要があります（例：`$content.title`）。

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section"はステップ4で定義したキーに対応します
  const content = useIntlayer("hero-section");
</script>

<!-- コンテンツを単純にレンダリング -->
<h1>{$content.title}</h1>
<!-- エディターを使って編集可能なコンテンツとしてレンダリング -->
<h1><svelte:component this={$content.title} /></h1>
<!-- コンテンツを文字列としてレンダリングする場合 -->
<div aria-label={$content.title.value}></div>
```

### （オプション）ステップ6: ルーティングの設定

以下の手順では、SvelteKitでロケールベースのルーティングを設定する方法を示します。これにより、URLにロケールのプレフィックス（例：`/en/about`、`/fr/about`）を含めることができ、SEOやユーザー体験が向上します。

```bash
.
└─── src
    ├── app.d.ts                  # ロケールタイプを定義
    ├── hooks.server.ts           # ロケールルーティングを管理
    ├── lib
    │   └── getLocale.ts          # ヘッダーやクッキーからロケールをチェック
    ├── params
    │   └── locale.ts             # ロケールパラメータを定義
    └── routes
        ├── [[locale=locale]]     # ルートグループでロケールを設定するためにラップ
        │   ├── +layout.svelte    # ルートのローカルレイアウト
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # フォントとグローバルスタイルのためのルートレイアウト
```

### ステップ7: サーバーサイドのロケール検出を処理する（Hooks）

SvelteKitでは、SSR中に正しいコンテンツをレンダリングするためにサーバーがユーザーのロケールを知る必要があります。`hooks.server.ts`を使ってURLやクッキーからロケールを検出します。

`src/hooks.server.ts`を作成または修正してください：

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // 現在のパスがすでにロケールで始まっているかを確認（例: /fr, /en）
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // URLにロケールが含まれていない場合（例: ユーザーが "/" にアクセスした場合）、リダイレクトする
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

次に、リクエストイベントからユーザーのロケールを取得するヘルパーを作成します：

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
 * この関数は `src/hooks.server.ts` の `handle` フックで使用されます。
 *
 * まず、Intlayerのストレージ（クッキーまたはカスタムヘッダー）からロケールを取得しようとします。
 * ロケールが見つからない場合は、ブラウザの "Accept-Language" ネゴシエーションにフォールバックします。
 *
 * @param event - SvelteKitからのリクエストイベント
 * @returns ユーザーのロケール
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Intlayerのストレージ（クッキーまたはヘッダー）からロケールを取得しようとする
  const storedLocale = getLocaleFromStorage({
    // SvelteKitのクッキーアクセス
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // SvelteKitのヘッダーアクセス
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // ブラウザの "Accept-Language" ネゴシエーションにフォールバック
  const negotiatorHeaders: Record<string, string> = {};

  // SvelteKitのHeadersオブジェクトをプレーンなRecord<string, string>に変換
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // `Accept-Language` ヘッダーからロケールをチェック
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // 一致するものがなければデフォルトのロケールを返す
  return defaultLocale;
};
```

> `getLocaleFromStorage` は、設定に応じてヘッダーまたはクッキーからロケールをチェックします。詳細は [Configuration](https://intlayer.org/doc/configuration) を参照してください。

> `localeDetector` 関数は `Accept-Language` ヘッダーを処理し、最適なマッチを返します。

ロケールが設定されていない場合は、404エラーを返したいです。これを簡単にするために、ロケールが有効かどうかをチェックする `match` 関数を作成できます。

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **注意:** `src/app.d.ts` にロケール定義が含まれていることを確認してください：
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

`+layout.svelte` ファイルでは、i18n に関連しない静的コンテンツのみを保持するために、すべての内容を削除できます。

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

次に、`[[locale=locale]]` グループの下に新しいページとレイアウトを作成します。

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// ジェネリックな Load タイプを使用
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// ルートからのロケールでIntlayerを初期化
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// レイアウトのコンテンツ辞書を使用
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
	import { useIntlayer } from 'svelte-intlayer';

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

### （オプション）ステップ8：国際化されたリンク

SEOのために、ルートにロケールをプレフィックスとして付けることを推奨します（例：`/en/about`、`/fr/about`）。このコンポーネントは、現在のロケールを自動的にリンクにプレフィックスします。

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // 現在のロケールでURLにプレフィックスを付けるヘルパー
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

SvelteKitの`goto`を使用する場合も、同じロジックを`getLocalizedUrl`で使ってローカライズされたURLにナビゲートできます：

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // ロケールに応じて /en/about または /fr/about に遷移します
```

### （オプション）ステップ9: 言語切り替えコンポーネント

ユーザーが言語を切り替えられるように、URLを更新します。

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
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
          setLocale(localeEl); // ストア内のロケールを設定し、onLocaleChangeをトリガーします
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

### （オプション）ステップ10：バックエンドプロキシの追加

SvelteKitアプリケーションにバックエンドプロキシを追加するには、`vite-intlayer`プラグインが提供する`intlayerProxy`関数を使用できます。このプラグインは、URL、クッキー、およびブラウザの言語設定に基づいてユーザーに最適なロケールを自動的に検出します。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### （オプション）ステップ11：intlayerエディター / CMSのセットアップ

intlayerエディターをセットアップするには、[intlayerエディターのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)に従う必要があります。

intlayer CMSをセットアップするには、[intlayer CMSのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)に従う必要があります。

intlayerエディターのセレクターを可視化するためには、intlayerコンテンツ内でコンポーネント構文を使用する必要があります。

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- コンテンツをシンプルな内容としてレンダリング -->
  <h1>{$content.title}</h1>

  <!-- コンポーネントとしてコンテンツをレンダリング（エディターに必要） -->
  <svelte:component this={$content.component} />
</div>
```

### Git設定

Intlayerによって生成されるファイルは無視することを推奨します。

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```

---

### さらに進む

- **ビジュアルエディター**: UIから直接翻訳を編集するために、[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を統合します。
- **CMS**: コンテンツ管理を外部化するために、[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用します。
