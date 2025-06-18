# IntlayerとViteとVueを使用した国際化（i18n）の開始方法

> このパッケージは開発中です。詳細については[問題](https://github.com/aymericzip/intlayer/issues/113)をご覧ください。Vue用Intlayerに興味がある場合は、問題に「いいね」をしてください。

<!-- GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vue-template)をご覧ください。 -->

## Intlayerとは？

**Intlayer**は、モダンなWebアプリケーションでの多言語サポートを簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使用して翻訳を簡単に管理**。
- **メタデータ、ルート、コンテンツを動的にローカライズ**。
- **自動生成された型でTypeScriptサポートを確保**し、オートコンプリートとエラー検出を改善。
- **動的なロケール検出と切り替え**などの高度な機能を活用。

---

## ViteとVueアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

### ステップ1: 依存関係のインストール

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を提供するコアパッケージ。

- **vue-intlayer**
  IntlayerをVueアプリケーションに統合するパッケージ。Vueの国際化のためのコンテキストプロバイダーとコンポーザブルを提供します。

- **vite-intlayer**
  [Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)とIntlayerを統合するためのViteプラグインを含み、ユーザーの優先ロケールを検出し、クッキーを管理し、URLリダイレクトを処理するミドルウェアを提供します。

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
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### ステップ3: Vite設定にIntlayerを統合

設定にintlayerプラグインを追加します。

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

> `intlayerPlugin()` Viteプラグインは、IntlayerをViteと統合するために使用されます。コンテンツ宣言ファイルのビルドを確保し、開発モードでそれらを監視します。また、Viteアプリケーション内でIntlayer環境変数を定義し、パフォーマンスを最適化するためのエイリアスを提供します。

### ステップ4: コンテンツを宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      ja: "カウントは ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ja: "<code>components/HelloWorld.vue</code>を編集して保存し、HMRをテストしてください",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ja: "チェックアウト ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      ja: "公式のVue + Viteスターター",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      ja: "VueのIDEサポートについて詳しく知るには、",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      ja: "Vue Docsスケーリングアップガイド",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      ja: "ViteとVueのロゴをクリックして詳細を確認してください",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
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
    count: t({
      ja: "カウントは ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ja: "<code>components/HelloWorld.vue</code>を編集して保存し、HMRをテストしてください",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ja: "チェックアウト ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      ja: "公式のVue + Viteスターター",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      ja: "VueのIDEサポートについて詳しく知るには、",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      ja: "Vue Docsスケーリングアップガイド",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      ja: "ViteとVueのロゴをクリックして詳細を確認してください",
      en: "Click on the Vite and Vue logos to learn more",
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
    count: t({
      ja: "カウントは ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ja: "<code>components/HelloWorld.vue</code> を編集して保存し、HMRをテストしてください",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ja: "チェックアウト ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      ja: "公式のVue + Viteスターター",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      ja: "VueのIDEサポートについてさらに学ぶには、",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      ja: "Vueドキュメントスケーリングアップガイド",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      ja: "ViteとVueのロゴをクリックして詳細を学ぶ",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
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
        "ja": "<code>components/HelloWorld.vue</code> を編集して保存し、HMRをテストしてください",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "ja": "チェックアウト ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "ja": "公式のVue + Viteスターター",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "ja": "VueのIDEサポートについてさらに学ぶには、",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "ja": "Vueドキュメントスケーリングアップガイド",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ja": "ViteとVueのロゴをクリックして詳細を学ぶ",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> あなたのコンテンツ宣言は、アプリケーション内のどこにでも定義できますが、`contentDir` ディレクトリ（デフォルトでは `./src`）に含まれている必要があります。そして、コンテンツ宣言ファイルの拡張子（デフォルトでは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md) を参照してください。

### ステップ5: Intlayerをコードで利用する

Vueアプリケーション全体でIntlayerの国際化機能を利用するには、まずメインファイルでIntlayerのシングルトンインスタンスを登録する必要があります。このステップは、アプリケーション内のすべてのコンポーネントに翻訳を利用可能にする国際化コンテキストを提供するために重要です。

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// トップレベルでプロバイダーを注入
installIntlayer(app);

// アプリをマウント
app.mount("#app");
```

アプリケーション全体でコンテンツ辞書にアクセスするには、メインVueコンポーネントを作成し、`useIntlayer` コンポーザブルを使用します:

```vue fileName="src/HelloWord.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const content = useIntlayer("helloworld");
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">
      {{ content.count }}{{ count }}
    </button>
    <p v-html="content.edit.value"></p>
  </div>

  <p>
    {{ content.checkOut }}
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, {{ content.officialStarter }}
  </p>
  <p>
    {{ content.learnMore }}
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >{{ content.vueDocs }}</a
    >.
  </p>
  <p class="read-the-docs">{{ content.readTheDocs }}</p>
</template>
```

#### Intlayerでのコンテンツへのアクセス

Intlayerは、コンテンツにアクセスするためのさまざまなAPIを提供しています。

- **コンポーネントベースの構文**（推奨）： `<myContent />`または`<Component :is="myContent" />`構文を使用して、コンテンツをIntlayerノードとしてレンダリングします。これは[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)および[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md)とシームレスに統合されます。

- **文字列ベースの構文**: `{{ myContent }}`を使用して、ビジュアルエディタをサポートせずにコンテンツをプレーンテキストとしてレンダリングします。
- **生のHTML構文**: `<div v-html="myContent" />`を使用して、ビジュアルエディタをサポートせずにコンテンツを生のHTMLとしてレンダリングします。
- **分割代入構文**:
  `useIntlayer`コンポーザブルは、コンテンツとともにプロキシを返します。このプロキシは、リアクティビティを維持しながらコンテンツにアクセスするために分割代入できます。
- `const content = useIntlayer("myContent");`と`{{ content.myContent }}` / `<content.myContent />`を使用します。 - または、`const { myContent } = useIntlayer("myContent");`と`{{ myContent }}` / `<myContent />`を使用してコンテンツを分割代入します。 ### (任意) ステップ6:
  コンテンツの言語を変更する
  コンテンツの言語を変更するには、`useLocale`コンポーザブルが提供する`setLocale`関数を使用できます。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。
  言語を切り替えるコンポーネントを作成します:

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

// ロケール情報とsetLocale関数を取得
const { locale, availableLocales, setLocale } = useLocale();

// 選択されたロケールをrefで追跡
const selectedLocale = ref(locale.value);

// 選択が変更されたときにロケールを更新
const changeLocale = () => setLocale(selectedLocale.value);

// グローバルロケールとselectedLocaleを同期
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

Vueアプリケーションでローカライズされたルーティングを追加するには、通常、Vue Routerを使用してロケールプレフィックスを追加します。これにより、各言語に固有のルートが作成され、SEOやSEOフレンドリーなURLに役立ちます。

例:

```plaintext
- https://example.com/about
- https://example.com/ja/about
- https://example.com/fr/about
```

まず、Vue Routerをインストールします:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

次に、ロケールベースのルーティングを処理するためのルーター構成を作成します:

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
    // ルートメタで定義されたロケールを再利用
    client.setLocale(metaLocale);
    next();
  } else {
    // フォールバック: メタにロケールがない場合、未一致のルートの可能性
    // オプション: 404を処理するか、デフォルトロケールにリダイレクト
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> 名前はルーター内でルートを識別するために使用されます。すべてのルートで一意である必要があり、競合を回避し、適切なナビゲーションとリンクを保証します。

次に、`main.js`ファイルでルーターを登録します:

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

次に、`App.vue`ファイルを更新してRouterViewコンポーネントをレンダリングします。このコンポーネントは、現在のルートに一致するコンポーネントを表示します。

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

並行して、`intLayerMiddlewarePlugin`を使用してアプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URLに基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、ユーザーのブラウザ言語の優先設定に基づいて最も適切なロケールを決定します。ロケールが検出されない場合、デフォルトロケールにリダイレクトします。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (オプション) ステップ8: ロケール変更時にURLを変更する

ユーザーが言語を変更したときにURLを自動的に更新するには、`LocaleSwitcher`コンポーネントをVue Routerを使用するように変更します:

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

// Vue Routerを取得
const router = useRouter();

// ロケール情報とsetLocale関数を取得
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // 現在のルートを取得し、ローカライズされたURLを作成
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // ページをリロードせずにローカライズされたルートに移動
    router.push(localizedPath);
  },
});

// 選択されたロケールをrefで追跡
const selectedLocale = ref(locale.value);

// 選択が変更されたときにロケールを更新
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// selectedLocaleをグローバルロケールと同期
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

ヒント: SEOとアクセシビリティを向上させるために、`<a href="/fr/home" hreflang="fr">`のようなタグを使用してローカライズされたページにリンクします。これにより、検索エンジンが言語固有のURLを適切に発見してインデックス化できます。SPAの動作を維持するには、`@click.prevent`でデフォルトのナビゲーションを防ぎ、`useLocale`を使用してロケールを変更し、Vue Routerを使用してプログラム的にナビゲートします。

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Switch to English"
      target="_self"
      aria-current="page"
      href="/ja/doc/get-started"
    >
      <div>
        <div><span dir="ltr" lang="en">English</span><span>English</span></div>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Switch to Spanish"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span><span>Spanish</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (オプション) ステップ9: HTMLの言語と方向属性を切り替える

アプリケーションが複数の言語をサポートしている場合、現在のロケールに合わせて`<html>`タグの`lang`および`dir`属性を更新することが重要です。これにより以下が保証されます:

- **アクセシビリティ**: スクリーンリーダーや支援技術は、正しい`lang`属性に依存してコンテンツを正確に発音および解釈します。
- **テキストレンダリング**: `dir`(方向)属性は、テキストが適切な順序でレンダリングされることを保証します(例: 英語は左から右、アラビア語やヘブライ語は右から左)。
- **SEO**: 検索エンジンは`lang`属性を使用してページの言語を判断し、検索結果で適切なローカライズされたコンテンツを提供します。

これらの属性をロケール変更時に動的に更新することで、すべてのサポート言語で一貫性があり、アクセシブルな体験をユーザーに提供できます。

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいてHTML <html> 要素の `lang` および `dir` 属性を更新するコンポーザブル。
 *
 * @example
 * // App.vue またはグローバルコンポーネントで使用
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // ロケールが変更されるたびにHTML属性を更新
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // 言語属性を更新
      document.documentElement.lang = newLocale;

      // テキスト方向を設定 (ほとんどの言語はltr、アラビア語やヘブライ語などはrtl)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

このコンポーザブルを `App.vue` またはグローバルコンポーネントで使用します:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// 現在のロケールに基づいてHTML属性を適用
useI18nHTMLAttributes();
</script>

<template>
  <!-- アプリのテンプレート -->
</template>
```

### (オプション) ステップ10: ローカライズされたリンクコンポーネントの作成

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタム `Link` コンポーネントを作成できます。このコンポーネントは内部URLに現在の言語を自動的にプレフィックスします。たとえば、フランス語を話すユーザーが「About」ページへのリンクをクリックすると、`/about` ではなく `/fr/about` にリダイレクトされます。

この動作は以下の理由で便利です:

- **SEOとユーザー体験**: ローカライズされたURLは検索エンジンが言語固有のページを正しくインデックスし、ユーザーに好みの言語でコンテンツを提供します。
- **一貫性**: アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まり、予期しない言語切り替えを防ぎます。
- **保守性**: ローカライズロジックを単一のコンポーネントに集中させることで、URLの管理が簡単になり、アプリケーションの成長に伴うコードベースの保守が容易になります。

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

// リンクが外部リンクかどうかを確認
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// 内部リンク用にローカライズされたhrefを作成
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Vue Routerで使用する場合、ルーター専用のバージョンを作成します:

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

// router-link用にローカライズされたtoプロパティを作成
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // 'to' がオブジェクトの場合、pathプロパティをローカライズ
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
    <!-- Vue Router -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- その他 -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### TypeScriptの設定

Intlayerはモジュール拡張を使用してTypeScriptの利点を活用し、コードベースを強化します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript設定に自動生成された型を含めることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、これらのファイルをGitリポジトリにコミットするのを避けることができます。

これを行うには、以下の指示を `.gitignore` ファイルに追加します:

```plaintext
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code拡張機能** をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します:

- 翻訳キーの**オートコンプリート**。
- 翻訳漏れの**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳の作成と更新を簡単に行うための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code拡張機能ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進む

## さらに進めるには、[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
