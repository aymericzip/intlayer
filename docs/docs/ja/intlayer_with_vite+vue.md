---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Vite と Vue のウェブサイトを翻訳する（i18n）
description: Vite と Vue のウェブサイトを多言語対応にする方法を紹介します。国際化（i18n）と翻訳のためのドキュメントに従ってください。
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
---

# Intlayer と Vite と Vue で国際化（i18n）を始める

GitHub の [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-vue-template) を参照してください。

## Intlayer とは？

**Intlayer** は、最新のウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayer を使うと、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成された型により TypeScript サポートを確保し、オートコンプリートやエラー検出を向上**させます。
- **動的なロケール検出や切り替えなどの高度な機能**を利用できます。

---

## Vite と Vue アプリケーションに Intlayer をセットアップするステップバイステップガイド

### ステップ 1: 依存パッケージのインストール

npm を使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージです。

- **vue-intlayer**
  IntlayerをVueアプリケーションに統合するパッケージです。Vueの国際化のためのコンテキストプロバイダーとコンポーザブルを提供します。

- **vite-intlayer**

Viteバンドラー（[Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)）とIntlayerを統合するためのViteプラグイン、およびユーザーの優先ロケールの検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

### ステップ2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// 設定オブジェクト
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールをここに追加
    ],
    defaultLocale: Locales.ENGLISH, // デフォルトのロケール
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// 設定オブジェクト
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールをここに追加
    ],
    defaultLocale: Locales.ENGLISH, // デフォルトのロケール
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Vite設定にIntlayerを統合する

intlayerプラグインを設定に追加します。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Viteプラグインは、IntlayerをViteと統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードでそれらを監視します。また、Viteアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスも提供します。

### ステップ4: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es ", ja: "カウントは " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      ja: "<code>components/HelloWorld.vue</code> を編集して保存し、HMR をテストしてください",
    }),
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      ja: "ViteとVueのロゴをクリックして詳細を学んでください",
    }),
  },
};
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "helloworld",
  content: {
    count: t({ ja: "カウントは ", en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      ja: "<code>components/HelloWorld.vue</code> を編集して保存し、HMRをテストしてください",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ ja: "チェックしてください ", en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      ja: "公式の Vue + Vite スターター",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      ja: "Vue の IDE サポートについて詳しくは ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      ja: "Vue ドキュメント スケーリングアップガイド",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      ja: "Vite と Vue のロゴをクリックして詳細を確認してください",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

module.exports = appContent;
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

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言のファイル拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ5: コード内でIntlayerを利用する

Vueアプリケーション全体でIntlayerの国際化機能を利用するには、まずメインファイルでIntlayerのシングルトンインスタンスを登録する必要があります。このステップは非常に重要で、アプリケーション内のすべてのコンポーネントに国際化コンテキストを提供し、コンポーネントツリーのどこからでも翻訳にアクセスできるようにします。

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// 最上位でプロバイダーを注入
installIntlayer(app);

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

### （オプション）ステップ6: コンテンツの言語を変更する

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

### （オプション）ステップ7: アプリケーションにローカライズされたルーティングを追加する

Vueアプリケーションにローカライズされたルーティングを追加するには、通常、ロケールプレフィックス付きのVue Routerを使用します。これにより、各言語ごとにユニークなルートが作成され、SEOやSEOに適したURLに役立ちます。

例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

まず、Vue Routerをインストールします：

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

次に、ロケールベースのルーティングを処理するルーター設定を作成します：

```js fileName="src/router/index.ts"
import {
  configuration,
  getPathWithoutLocale,
  localeFlatMap,
  type Locales,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

// 国際化設定を取得
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * ロケール固有のパスとメタデータを持つルートを宣言します。
 */
const routes = localeFlatMap((localizedData) => [
  {
    path: `${localizedData.urlPrefix}/`,
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/home`,
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
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

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // ルートのメタに定義されたロケールを再利用
    client.setLocale(metaLocale);
    next();
  } else {
    // フォールバック: メタにロケールがない場合、おそらく一致しないルート
    // オプション: 404を処理するか、デフォルトのロケールにリダイレクトする
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
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

同時に、`intlayerMiddlewarePlugin` を使用してアプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインはURLに基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザの言語設定に基づいて最適なロケールを判定します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intlayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intlayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

### （オプション）ステップ8: ロケール変更時にURLを変更する

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
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
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

### （オプション）ステップ9：HTMLの言語属性と方向属性を切り替える

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

### （オプション）ステップ10：ローカライズされたリンクコンポーネントの作成

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

### （オプション）ステップ11：Markdownのレンダリング

Intlayerは、Vueアプリケーション内でMarkdownコンテンツを直接レンダリングすることをサポートしています。デフォルトでは、Markdownはプレーンテキストとして扱われます。MarkdownをリッチなHTMLに変換するには、Markdownパーサーである[markdown-it](https://github.com/markdown-it/markdown-it)を統合できます。

これは、翻訳にリスト、リンク、強調などのフォーマットされたコンテンツが含まれる場合に特に便利です。

デフォルトではIntlayerはMarkdownを文字列としてレンダリングしますが、`installIntlayerMarkdown`関数を使ってMarkdownをHTMLにレンダリングする方法も提供しています。

> `intlayer`パッケージを使ってMarkdownコンテンツを宣言する方法については、[markdownドキュメント](https://github.com/aymericzip/intlayer/tree/main/docs/ja/dictionary/markdown.md)を参照してください。

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

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

### TypeScriptの設定

Intlayerはモジュール拡張を利用して、TypeScriptの利点を活かし、コードベースをより強固にします。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

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

```plaintext
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

拡張機能の使用方法の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進むために

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

---

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
