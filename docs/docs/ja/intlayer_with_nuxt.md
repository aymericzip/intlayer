---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Nuxt i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Nuxtアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.3.11
    date: 2025-12-07
    changes: "LocaleSwitcher、SEO、メタデータの更新"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴の初期化"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Intlayer を使って Nuxt と Vue のウェブサイトを翻訳する | 国際化（i18n）

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「@nuxtjs/i18n」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**Nuxt を完全にカバー**

Intlayer は、**多言語ルーティング**、**ロケール検出用のミドルウェア**、**サイトマップ**、および国際化のスケーリング (i18n) に必要なすべての機能を提供することにより、Nuxt と完全に連携するように最適化されています。

**バンドルサイズ**

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

**保守性**

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

**AI エージェント**

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** などのツール スイートも付属しています。および **[エージェント スキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

**オートメーション**

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

**パフォーマンス**

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

**非開発によるスケーリング**

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

---

## NuxtアプリケーションでIntlayerをセットアップするステップバイステップガイド

<Tabs defaultTab="video">
  <Tab label="ビデオ" value="video">
  
<iframe title="NuxtとVueアプリをIntlayerで翻訳する方法？Intlayerを発見しよう" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayerを使ってアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-nuxt-4-template)を参照してください。

<Steps>

<Step number={1} title="依存関係のインストール">

npmを使って必要なパッケージをインストールします:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
bun x intlayer init
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **vue-intlayer**
  IntlayerをVueアプリケーションに統合するパッケージです。Vueコンポーネント用のcomposablesを提供します。

- **nuxt-intlayer**
  NuxtアプリケーションとIntlayerを統合するNuxtモジュールです。自動セットアップ、ロケール検出のためのミドルウェア、クッキー管理、URLリダイレクトを提供します。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための設定ファイルを作成します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールをここに追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、Intlayerのコンソールログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Nuxt設定にIntlayerを統合する">

Nuxtの設定にintlayerモジュールを追加します:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... 既存のNuxt設定
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` モジュールは、Intlayer と Nuxt の統合を自動的に処理します。コンテンツ宣言のビルドを設定し、開発モードでファイルを監視し、ロケール検出のためのミドルウェアを提供し、ローカライズされたルーティングを管理します。

</Step>

<Step number={4} title="コンテンツを宣言する">

翻訳を格納するためのコンテンツ宣言を作成および管理します：

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={5} title="コード内でIntlayerを利用する">

`useIntlayer`コンポーザブルを使って、Nuxtアプリケーション全体でコンテンツ辞書にアクセスします:

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >、<nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>。
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Intlayerでのコンテンツアクセス

IntlayerはコンテンツにアクセスするためのさまざまなAPIを提供しています：

- **コンポーネントベースの構文**（推奨）：
  `<myContent />` または `<Component :is="myContent" />` の構文を使用して、コンテンツを Intlayer ノードとしてレンダリングします。これは [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) および [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) とシームレスに統合されます。

- **文字列ベースの構文**:  
  `{{ myContent }}` を使用して、Visual Editor のサポートなしにプレーンテキストとしてコンテンツをレンダリングします。

- **生の HTML 構文**:  
  `<div v-html="myContent" />` を使用して、Visual Editor のサポートなしに生の HTML としてコンテンツをレンダリングします。

- **分割代入構文**:  
  `useIntlayer` コンポーザブルはコンテンツを含む Proxy を返します。この Proxy はリアクティビティを保ちながらコンテンツにアクセスするために分割代入可能です。
  - `const content = useIntlayer("myContent");` を使用し、`{{ content.myContent }}` / `<content.myContent />` としてレンダリングします。
  - または、`const { myContent } = useIntlayer("myContent");` を使用してコンテンツを分割代入し、`{{ myContent }}` / `<myContent/>` としてレンダリングします。

</Step>

<Step number={6} title="コンテンツの言語を変更する">

コンテンツの言語を変更するには、`useLocale` コンポーザブルが提供する `setLocale` 関数を使用します。この関数により、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

`NuxtLink` を使用して言語を切り替えるコンポーネントを作成します。**ロケール切り替えにボタンではなくリンクを使うことは、SEOやページの発見性向上のベストプラクティスです**。これにより、検索エンジンがすべてのローカライズされたページをクロールしインデックス化できます。

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// NuxtはuseRouteを自動インポートします
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> `NuxtLink` を適切な `href` 属性（`getLocalizedUrl` 経由）と共に使用することで、検索エンジンがページのすべての言語バリアントを検出できるようになります。これは、検索エンジンクローラーが追跡しない可能性のあるJavaScriptのみのロケール切り替えよりも望ましい方法です。

次に、`app.vue` を設定してレイアウトを使用します：

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>

<Step number={7} title="アプリケーションにローカライズされたルーティングを追加する">

`nuxt-intlayer` モジュールを使用すると、Nuxtはローカライズされたルーティングを自動的に処理します。これは、ページのディレクトリ構造に基づいて各言語のルートを自動的に作成します。

例:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

ローカライズされたページを作成するには、単に `pages/` ディレクトリに Vue ファイルを作成します。以下に2つの例を示します。

**ホームページ (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**アバウトページ (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // プリミティブ文字列アクセスには .raw を使用
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // プリミティブな文字列アクセスには .raw を使用
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> 注意: `useHead` は Nuxt で自動インポートされます。コンテンツの値には `.value`（リアクティブ）または `.raw`（プリミティブ文字列）を用途に応じて使用できます。

`nuxt-intlayer` モジュールは自動的に以下を行います：

- ユーザーの優先ロケールを検出
- URL を介したロケール切り替えの処理
- 適切な `<html lang="">` 属性の設定
- ロケールクッキーの管理
- ユーザーを適切なローカライズされた URL にリダイレクト

</Step>

<Step number={8} title="ローカライズされたリンクコンポーネントの作成">

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタムの `Links` コンポーネントを作成できます。このコンポーネントは内部URLに自動的に現在の言語をプレフィックスとして付加し、これは**SEOおよびページの発見性**に不可欠です。

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// 最終的なパスを計算する
const finalPath = computed(() => {
  // 1. リンクが外部かどうかをチェック
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. 外部の場合はそのまま返す（NuxtLinkが<a>タグの生成を処理）
  if (isExternal) return props.href;

  // 3. 内部リンクの場合、URLをローカライズする
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

次に、このコンポーネントをアプリケーション全体で使用します:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">ホーム</Links>
    <Links href="/about">アバウト</Links>
  </div>
</template>
```

> `NuxtLink` をローカライズされたパスで使用することで、以下を保証できます：
>
> - 検索エンジンがすべての言語バージョンのページをクロールおよびインデックスできる
> - ユーザーがローカライズされたURLを直接共有できる
> - ブラウザの履歴がロケール接頭辞付きURLで正しく動作する

</Step>

<Step number={9} title="メタデータとSEOの処理">

Nuxtは `useHead` コンポーザブル（自動インポート）を通じて優れたSEO機能を提供します。Intlayerを使って、`.raw` または `.value` アクセサを用いてプリミティブな文字列値を取得し、ローカライズされたメタデータを扱うことができます：

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHeadはNuxtで自動インポートされます
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // プリミティブな文字列アクセスには .raw を使用
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // プリミティブな文字列アクセスには .raw を使用
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> あるいは、Vueのリアクティビティなしでコンテンツを取得するために `import { getIntlayer } from "intlayer"` 関数を使用することもできます。

> **コンテンツ値へのアクセス方法:**
>
> - プリミティブな文字列値（非リアクティブ）を取得するには `.raw` を使用
> - リアクティブな値を取得するには `.value` を使用
> - Visual Editorサポートのために `<content.key />` コンポーネント構文を使用

対応するコンテンツ宣言を作成します:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      ja: "私たちの会社とミッションについて詳しく知る",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      ja: "私たちについて",
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión",
        "ja": "当社と当社のミッションについて詳しく知る"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros",
        "ja": "私たちについて"
      }
    }
  }
}
```

</Step>

</Steps>

### （オプション）ステップ6b：ナビゲーション付きレイアウトの作成

Nuxtのレイアウトを使うと、ページの共通構造を定義できます。ロケールスイッチャーとナビゲーションを含むデフォルトレイアウトを作成しましょう：

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">ホーム</Links>
    <Links href="/about">アバウト</Links>
  </div>
</template>
```

`Links` コンポーネント（以下に示す）は、内部ナビゲーションリンクが自動的にローカライズされることを保証します。

### Gitの設定

Intlayerによって生成されたファイルは無視することを推奨します。これにより、Gitリポジトリへの不要なコミットを防ぐことができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加してください。

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新できる**クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進む

さらに進めるには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
