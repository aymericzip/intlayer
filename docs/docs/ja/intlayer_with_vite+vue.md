---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Vite + Vue i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Vite + Vueアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
applicationShowcase: https://intlayer-vite-vue-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=IE3XWkZ6a5U
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴の初期化"
---

# IntlayerでVite and Vueを翻訳する | 国際化（i18n）

GitHub の [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-vue-template) を参照してください。

## 代替手段ではなく Interlayer を使用する理由

「vue-i18n」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**Vue を完全にカバー**

Intlayer は、**コンポーネント レベルのコンテンツ スコープ**、**リアクティブな翻訳**、および国際化のスケーリング (i18n) に必要なすべての機能を提供することにより、Vue と完全に連携するように最適化されています。

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

## Vite と Vue アプリケーションに Intlayer をセットアップするステップバイステップガイド

<Tabs defaultTab="video">
  <Tab label="ビデオ" value="video">
  
<iframe title="The best i18n solution for Vite and Vue? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vue-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-vite-vue-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="デモ - intlayer-vite-vue-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub の [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-vue-template) を参照してください。

<Steps>

<Step number={1} title="依存パッケージのインストール">

npm を使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **vue-intlayer**
  IntlayerをVueアプリケーションに統合するパッケージです。Vueの国際化のためのコンテキストプロバイダーとコンポーザブルを提供します。

- **vite-intlayer**

Viteバンドラー（[Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)）とIntlayerを統合するためのViteプラグイン、およびユーザーの優先ロケールの検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールを追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Vite設定にIntlayerを統合する">

intlayerプラグインを設定に追加します。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードでそれらを監視します。また、Viteアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスも提供します。

</Step>

<Step number={4} title="コンテンツを宣言する">

翻訳を格納するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      en: "Check out ",
      ja: "チェックしてください ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      en: ", the official Vue + Vite starter",
      ja: ", 公式の Vue + Vite スターターです",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      ja: "Vue の IDE サポートについて詳しくは ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      ja: "Vue ドキュメント スケーリングアップガイド",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      ja: "詳細を知るには、Vite と Vue のロゴをクリックしてください",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "ja": "カウントは ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "ja": "<code>components/HelloWorld.vue</code> を編集して保存し、HMRをテストします",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe ",
        "ja": "チェックしてください "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite",
        "ja": "公式の Vue + Vite スターター"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el ",
        "ja": "Vue の IDE サポートについて詳しくは "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide",
        "ja": "Vue ドキュメント スケーリングアップガイド"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información",
        "ja": "詳細を知るには Vite と Vue のロゴをクリックしてください"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言のファイル拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={5} title="コード内でIntlayerを利用する">

Vueアプリケーション全体でIntlayerの国際化機能を利用するには、まずメインファイルでIntlayerのシングルトンインスタンスを登録する必要があります。このステップは非常に重要で、アプリケーション内のすべてのコンポーネントに国際化コンテキストを提供し、コンポーネントツリーのどこからでも翻訳にアクセスできるようにします。

```javascript fileName=main.js
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// 最上位でプロバイダーを注入
app.use(intlayer);

// アプリをマウント
app.mount("#app");
```

メインのVueコンポーネントを作成し、`useIntlayer`のコンポーザブルを使用することで、アプリケーション全体でコンテンツ辞書にアクセスできます。

```vue fileName="src/HelloWord.vue"
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
  officialStarter,
  learnMore,
  vueDocs,
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
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, <officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Intlayerでのコンテンツへのアクセス

Intlayerは、コンテンツにアクセスするためのさまざまなAPIを提供しています：

- **コンポーネントベースの構文**（推奨）：
  `<myContent />` または `<Component :is="myContent" />` の構文を使用して、Intlayerノードとしてコンテンツをレンダリングします。これは[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)や[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)とシームレスに統合されます。

- **文字列ベースの構文**：
  `{{ myContent }}` を使用して、ビジュアルエディターのサポートなしにプレーンテキストとしてコンテンツをレンダリングします。

- **生のHTML構文**：
  `<div v-html="myContent" />` を使用して、Visual Editor のサポートなしでコンテンツを生の HTML としてレンダリングします。

- **分割代入構文**:
  `useIntlayer` コンポーザブルはコンテンツを持つ Proxy を返します。この Proxy はリアクティビティを保ったままコンテンツにアクセスするために分割代入できます。
  - `const content = useIntlayer("myContent");` と `{{ content.myContent }}` / `<content.myContent />` を使用します。
  - または `const { myContent } = useIntlayer("myContent");` と `{{ myContent }}` / `<myContent/>` を使用してコンテンツを分割代入します。

> アプリケーションが既に存在する場合は、[Intlayer コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) と [抽出コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を組み合わせて、1 秒で何千ものコンポーネントを変換できます。

</Step>

<Step number={6} title="コンテンツの言語を変更する">

コンテンツの言語を変更するには、`useLocale` コンポーザブルが提供する `setLocale` 関数を使用します。この関数により、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

言語を切り替えるコンポーネントを作成します：

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getLocaleName } from "intlayer";
import { useLocale } from "vue-intlayer";

// ロケール情報と setLocale 関数を取得
const { locale, availableLocales, setLocale } = useLocale();

// ref で選択されたロケールを追跡
const selectedLocale = ref(locale.value);

// 選択が変更されたときにロケールを更新
const changeLocale = () => setLocale(selectedLocale.value);

// selectedLocaleをグローバルなlocaleと同期させる
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

次に、このコンポーネントをApp.vueで使用します:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // 関連するintlayer宣言ファイルを作成
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>
```

</Step>

<Step number={7} title="アプリケーションにローカライズされたルーティングを追加する">

Vueアプリケーションにローカライズされたルーティングを追加するには、通常、ロケールプレフィックス付きのVue Routerを使用します。これにより、各言語ごとにユニークなルートが作成され、SEOやSEOに適したURLに役立ちます。

例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

まず、Vue Routerをインストールします：

```bash packageManager="npm"
npm install vue-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add vue-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add vue-router
```

次に、ロケールベースのルーティングを処理するルーター設定を作成します：

```js fileName="src/router/index.ts"
import {
  localeFlatMap,
  type Locale,
} from 'intlayer';
import { createIntlayerClient } from "vue-intlayer";
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

/**
 * ロケール固有のパスとメタデータを持つルートを宣言します。
 */
const routes = localeFlatMap(({ urlPrefix, locale }) => [
  {
    path: `${urlPrefix}/`,
    name: `Root-${locale}`,
    component: RootView,
    meta: {
      locale,
    },
  },
  {
    path: `${urlPrefix}/home`,
    name: `Home-${locale}`,
    component: HomeView,
    meta: {
      locale,
    },
  },
]);

// ルーターインスタンスを作成
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ロケール処理のためのナビゲーションガードを追加
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locale;

  // ルートのメタに定義されたロケールを再利用
  client.setLocale(metaLocale);
  next();
});
```

> ルート名はルーター内でルートを識別するために使用されます。すべてのルートで一意である必要があり、競合を避け、適切なナビゲーションとリンクを保証します。

次に、main.jsファイルでルーターを登録します：

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// アプリにルーターを追加
app.use(router);

// アプリをマウント
app.mount("#app");
```

次に、`App.vue` ファイルを更新して `RouterView` コンポーネントをレンダリングします。このコンポーネントは現在のルートにマッチしたコンポーネントを表示します。

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

同時に、`intlayerProxy` を使用してアプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインはURLに基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザの言語設定に基づいて最適なロケールを判定します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    vue(),
    intlayer(),
  ],
});
```

</Step>

<Step number={8} title="ロケール変更時にURLを変更する">

ユーザーが言語を変更したときにURLを自動的に更新するには、`LocaleSwitcher` コンポーネントを Vue Router を使うように変更できます。

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Vue Router を取得
const router = useRouter();

// ロケール情報と setLocale 関数を取得
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // 現在のルートを取得し、ローカライズされたURLを作成
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // ページをリロードせずにローカライズされたルートへ遷移
    router.push(localizedPath);
  },
});

// 選択されたロケールを ref で追跡
const selectedLocale = ref(locale.value);

// 選択が変更されたときにロケールを更新する
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// selectedLocaleをグローバルなロケールと同期させる
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

ヒント: SEOとアクセシビリティを向上させるために、ステップ10で示したように、ローカライズされたページへのリンクには `<a href="/fr/home" hreflang="fr">` のようなタグを使用してください。これにより、検索エンジンは言語別のURLを正しく検出しインデックス化できます。SPAの動作を維持するためには、@click.preventでデフォルトのナビゲーションを防止し、useLocaleでロケールを変更し、Vue Routerを使ってプログラム的にナビゲートすることが可能です。

```html
<ol>
  <li>
    <a
      hreflang="x-default"
      aria-label="英語に切り替え"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>英語</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="スペイン語に切り替え"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>スペイン語</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

</Step>

<Step number={9} title="HTMLの言語属性と方向属性を切り替える">

アプリケーションが複数の言語をサポートしている場合、`<html>`タグの`lang`属性と`dir`属性を現在のロケールに合わせて更新することが非常に重要です。これにより以下が保証されます：

- **アクセシビリティ**: スクリーンリーダーや支援技術は、正しい `lang` 属性に依存してコンテンツを正確に発音し解釈します。
- **テキストレンダリング**: `dir`（方向）属性は、テキストが適切な順序（例：英語は左から右、アラビア語やヘブライ語は右から左）で表示されることを保証し、読みやすさに不可欠です。
- **SEO**: 検索エンジンは `lang` 属性を使用してページの言語を判別し、適切なローカライズされたコンテンツを検索結果に表示します。

ロケールが変更された際にこれらの属性を動的に更新することで、すべての対応言語において一貫性がありアクセシブルなユーザー体験を保証します。

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいてHTMLの<html>要素の`lang`および`dir`属性を更新するComposable。
 *
 * @example
 * // App.vueまたはグローバルコンポーネント内で
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // ロケールが変更されるたびにHTML属性を更新する
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // 言語属性を更新する
      document.documentElement.lang = newLocale;

      // テキストの方向を設定する（ほとんどの言語はltr、アラビア語やヘブライ語などはrtl）
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

このコンポーザブルは、`App.vue` またはグローバルコンポーネントで使用します。

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// 現在のロケールに基づいてHTML属性を適用する
useI18nHTMLAttributes();
</script>

<template>
  <!-- アプリのテンプレート -->
</template>
```

</Step>

<Step number={10} title="ローカライズされたリンクコンポーネントの作成">

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタムの `Link` コンポーネントを作成できます。このコンポーネントは内部のURLに自動的に現在の言語をプレフィックスとして付加します。例えば、フランス語を話すユーザーが「About」ページへのリンクをクリックすると、`/about` ではなく `/fr/about` にリダイレクトされます。

この動作は以下の理由で有用です：

- **SEOとユーザーエクスペリエンス**：ローカライズされたURLは、検索エンジンが言語別のページを正しくインデックスし、ユーザーに好みの言語でコンテンツを提供するのに役立ちます。
- **一貫性**：アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まり、予期しない言語の切り替えを防ぎます。
- **保守性**: ローカリゼーションのロジックを単一のコンポーネントに集約することで、URLの管理が簡素化され、アプリケーションの成長に伴いコードベースの保守や拡張が容易になります。

```vue fileName="src/components/Link.vue"
<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// リンクが外部リンクかどうかをチェック
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// 内部リンク用のローカライズされたhrefを作成
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Vue Routerで使用する場合は、ルーター専用のバージョンを作成します：

```vue fileName="src/components/RouterLink.vue"
<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// router-link用のローカライズされたtoプロパティを作成
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // 'to'がオブジェクトの場合は、pathプロパティをローカライズします
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

これらのコンポーネントをアプリケーションで使用します:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vueルーター -->
    <RouterLink to="/">ルート</RouterLink>
    <RouterLink to="/home">ホーム</RouterLink>
    <!-- その他 -->
    <Link href="/">ルート</Link>
    <Link href="/home">ホーム</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

</Step>

<Step number={11} title="Markdownのレンダリング">

Intlayerは、Vueアプリケーション内でMarkdownコンテンツを直接レンダリングすることをサポートしています。デフォルトでは、Markdownはプレーンテキストとして扱われます。MarkdownをリッチなHTMLに変換するには、Markdownパーサーである[markdown-it](https://github.com/markdown-it/markdown-it)を統合できます。

これは、翻訳にリスト、リンク、強調などのフォーマットされたコンテンツが含まれる場合に特に便利です。

デフォルトではIntlayerはMarkdownを文字列としてレンダリングしますが、`installIntlayerMarkdown`関数を使ってMarkdownをHTMLにレンダリングする方法も提供しています。

> `intlayer`パッケージを使ってMarkdownコンテンツを宣言する方法については、[markdownドキュメント](https://github.com/aymericzip/intlayer/tree/main/docs/ja/dictionary/markdown.md)を参照してください。

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

app.use(intlayer);

const md = new MarkdownIt({
  html: true, // HTMLタグを許可
  linkify: true, // URLを自動リンク化
  typographer: true, // スマートクォートやダッシュなどを有効化
});

// IntlayerにmarkdownをHTMLに変換する際にmd.render()を使うよう指示
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

登録が完了すると、コンポーネントベースの構文を使ってMarkdownコンテンツを直接表示できます：

```vue
<template>
  <div>
    <myMarkdownContent />
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myMarkdownContent } = useIntlayer("my-component");
</script>
```

</Step>

<Step number={1} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存のコードベースがある場合、数千のファイルを変換するのは時間がかかることがあります。

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

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // コンパイラプラグインを追加します
  ],
});
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

### TypeScriptの設定

Intlayerはモジュール拡張を利用して、TypeScriptの利点を活かし、コードベースをより強固にします。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型定義が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型定義を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルは無視することを推奨します。これにより、それらのファイルをGitリポジトリにコミットするのを避けることができます。

これを行うには、以下の指示を`.gitignore`ファイルに追加してください。

```bash
#  Intlayerによって生成されたファイルを無視する
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

拡張機能の使用方法の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### （任意）サイトマップと robots.txt（ビルド時生成）

Intlayer は `generateSitemap` と `getMultilingualUrls` により、クローラ向けに整形した多言語の `sitemap.xml` と `robots.txt` を `public/` に自動で書き出せます。通常は Vite より**前**に小さな Node スクリプトを走らせます（例: npm の `predev` / `prebuild`）。

#### サイトマップ

Intlayer のサイトマップ生成はロケール設定を踏まえ、クローラ向けのメタデータを含めます。

> 生成されるサイトマップは `xhtml:link`（hreflang）をサポートします。単純な URL 列挙ではなく、各ページの言語版同士を双方向で結びます（例: `/about`、`/fr/about`、`/about?lang=fr` などルーティングに依存）。

#### Robots.txt

`getMultilingualUrls` で `Disallow` を、機微パスの**すべての言語 URL**に効かせます。

#### 1. プロジェクトルートに `generate-seo.mjs` を置く

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

`intlayer` がインストールされている必要があります。本番では環境変数 `SITE_URL` を設定してください（CI など）。

> Node の ESM では `generate-seo.mjs` を推奨します。`generate-seo.js` にする場合は `package.json` の `"type": "module"` などで ESM を有効にしてください。

#### 2. Vite より前にスクリプトを実行する

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

pnpm や yarn を使う場合はコマンドを読み替えてください。CI から呼び出しても構いません。

### さらに進むために

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

---
