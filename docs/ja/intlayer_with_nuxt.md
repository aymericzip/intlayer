# IntlayerとNuxtを使用した国際化（i18n）の開始

[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-nuxt-template)をGitHubで確認してください。

## Intlayerとは？

**Intlayer**は、モダンなWebアプリケーションで多言語サポートを簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使用して翻訳を簡単に管理**。
- **メタデータ、ルート、コンテンツを動的にローカライズ**。
- **自動生成された型でTypeScriptサポートを確保**し、オートコンプリートやエラー検出を向上。
- **動的なロケール検出と切り替え**などの高度な機能を活用。

---

## NuxtアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

### ステップ1: 依存関係のインストール

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージ。

- **vue-intlayer**
  IntlayerをVueアプリケーションと統合するためのパッケージ。Vueコンポーネント用のコンポーザブルを提供します。

- **nuxt-intlayer**
  IntlayerをNuxtアプリケーションと統合するNuxtモジュール。自動セットアップ、ロケール検出のためのミドルウェア、クッキー管理、URLリダイレクションを提供します。

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
  content: {
    contentDir: ["."],
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
  content: {
    contentDir: ["."],
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
  content: {
    contentDir: ["."],
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### ステップ3: Nuxt設定へのIntlayerの統合

IntlayerモジュールをNuxt設定に追加します：

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... 既存のNuxt設定
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer`モジュールは、IntlayerとNuxtの統合を自動的に処理します。コンテンツ宣言のビルドを設定し、開発モードでファイルを監視し、ロケール検出のためのミドルウェアを提供し、ローカライズされたルーティングを管理します。

### ステップ4: コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
    nuxtIntlayer: t({
      ja: "Nuxt Intlayer ドキュメント",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ja: "Nuxtについてさらに学ぶには ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ja: "Nuxt ドキュメント",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      ja: "Nuxtのロゴをクリックして詳細を確認",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.mjs" contentDeclarationFormat="esm"
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
    nuxtIntlayer: t({
      ja: "Nuxt Intlayer ドキュメント",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ja: "Nuxtについてさらに学ぶには ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ja: "Nuxt ドキュメント",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      ja: "Nuxtのロゴをクリックして詳細を確認",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

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
    nuxtIntlayer: t({
      ja: "Nuxt Intlayer ドキュメント",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ja: "Nuxtについてさらに学ぶには ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ja: "Nuxt ドキュメント",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      ja: "Nuxtのロゴをクリックして詳細を確認",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="components/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "ja": "カウントは "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
        "ja": "<code>components/HelloWorld.vue</code> を編集して保存し、HMRをテストしてください"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe ",
        "ja": "チェックアウト "
      }
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "en": "Nuxt Intlayer documentation",
        "fr": "Documentation de Nuxt Intlayer",
        "es": "Documentación de Nuxt Intlayer",
        "ja": "Nuxt Intlayer ドキュメント"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about Nuxt in the ",
        "fr": "En savoir plus sur Nuxt dans la ",
        "es": "Aprenda más sobre Nuxt en la ",
        "ja": "Nuxt についてさらに学ぶには "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Nuxt Documentation",
        "fr": "Documentation Nuxt",
        "es": "Documentación de Nuxt",
        "ja": "Nuxt ドキュメント"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Nuxt logo to learn more",
        "fr": "Cliquez sur le logo Nuxt pour en savoir plus",
        "es": "Haga clic en el logotipo de Nuxt para obtener más información",
        "ja": "Nuxt のロゴをクリックして詳細を確認してください"
      }
    }
  }
}
```

> コンテンツ宣言は、アプリケーション内の任意の場所に定義できますが、`contentDir` ディレクトリ（デフォルトでは `./src`）に含まれている必要があります。また、コンテンツ宣言ファイルの拡張子（デフォルトでは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）と一致する必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ 5: コード内で Intlayer を利用する

`useIntlayer` コンポーザブルを使用して、Nuxt アプリケーション全体でコンテンツ辞書にアクセスします:

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
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Intlayer でのコンテンツアクセス

Intlayer は、コンテンツにアクセスするための 2 つの API を提供します:

- **コンポーネントベースの構文**（推奨）:
  `<myContent />` または `<Component :is="myContent" />` 構文を使用して、コンテンツを Intlayer ノードとしてレンダリングします。これは、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md) および [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md) とシームレスに統合されます。

- **文字列ベースの構文**:
  `{{ myContent }}` を使用して、ビジュアルエディターのサポートなしにプレーンテキストとしてコンテンツをレンダリングします。

- **生のHTML構文**:
  `<div v-html="myContent" />` を使用して、ビジュアルエディターのサポートなしに生のHTMLとしてコンテンツをレンダリングします。

- **デストラクチャリング構文**:
  `useIntlayer` コンポーザブルは、コンテンツを含むプロキシを返します。このプロキシは、リアクティビティを維持しながらコンテンツにアクセスするためにデストラクチャリングできます。
  - `const content = useIntlayer("myContent");` と `{{ content.myContent }}` / `<content.myContent />` を使用します。
  - または、`const { myContent } = useIntlayer("myContent");` と `{{ myContent }}` / `<myContent />` を使用してコンテンツをデストラクチャリングします。

### （オプション）ステップ 6: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` コンポーザブルによって提供される `setLocale` 関数を使用します。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

言語を切り替えるコンポーネントを作成します:

```vue fileName="components/LocaleSwitcher.vue"
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

// 選択されたロケールを ref で追跡
const selectedLocale = ref(locale.value);

// 選択が変更されたときにロケールを更新
const changeLocale = () => setLocale(selectedLocale.value);

// グローバルロケールと selectedLocale を同期
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
</template>

<style scoped>
.locale-switcher {
  margin: 1rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
</style>
```

次に、このコンポーネントをページまたはレイアウトで使用します:

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // 関連する intlayer 宣言ファイルを作成
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
```

### （オプション）ステップ 7: アプリケーションにローカライズされたルーティングを追加する

`nuxt-intlayer` モジュールを使用すると、Nuxt はローカライズされたルーティングを自動的に処理します。これにより、ページディレクトリ構造に基づいて各言語のルートが自動的に作成されます。

例:

```plaintext
pages/
├── index.vue          → /, /fr, /es, /ja
├── about.vue          → /about, /fr/about, /es/about, /ja/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact, /ja/contact
```

ローカライズされたページを作成するには、`pages/` ディレクトリに Vue ファイルを作成するだけです:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about");
</script>

<template>
  <div>
    <h1>{{ content.title }}</h1>
    <p>{{ content.description }}</p>
  </div>
</template>
```

`nuxt-intlayer` モジュールは自動的に以下を行います:

- ユーザーの優先ロケールを検出
- URL を介したロケール切り替えを処理
- 適切な `<html lang="">` 属性を設定
- ロケールクッキーを管理
- ユーザーを適切なローカライズされた URL にリダイレクト

### （オプション）ステップ 8: ローカライズされたリンクコンポーネントを作成する

アプリケーションのナビゲーションが現在のロケールを尊重するようにするには、カスタム `LocalizedLink` コンポーネントを作成できます。このコンポーネントは、内部 URL に現在の言語を自動的にプレフィックスします。

```vue fileName="components/LocalizedLink.vue"
<template>
  <NuxtLink :to="localizedHref" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// リンクが外部リンクかどうかを確認
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// 内部リンクのローカライズされた href を作成
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

次に、このコンポーネントをアプリケーション全体で使用します:

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>

    <LocalizedLink to="/ja/contact">
      {{ content.contactLink }}
    </LocalizedLink>
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocalizedLink from "~/components/LocalizedLink.vue";

const content = useIntlayer("home");
</script>
```

### (オプション) ステップ9: メタデータとSEOの処理

Nuxtは優れたSEO機能を提供します。Intlayerを使用してローカライズされたメタデータを処理できます:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";
import { getIntlayer } from "intlayer";
import { useLocale } from "vue-intlayer";

const { locale } = useLocale();
const content = getIntlayer("about-meta", locale.value);

useSeoMeta({
  title: content.title,
  description: content.description,
});
</script>

<template>
  <div>
    <h1>{{ content.pageTitle }}</h1>
    <p>{{ content.pageContent }}</p>
  </div>
</template>
```

対応するコンテンツ宣言を作成します:

```typescript fileName="pages/about-meta.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      ja: "私たちについて - 私たちの会社",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      ja: "私たちの会社と使命についてもっと知る",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
} satisfies Dictionary<Parameters<typeof useSeoMeta>[0]>;

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      ja: "私たちについて - 私たちの会社",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      ja: "私たちの会社と使命についてもっと知る",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.js" contentDeclarationFormat="cjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      ja: "私たちについて - 私たちの会社",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      ja: "私たちの会社と使命についてもっと知る",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

module.exports = aboutMetaContent;
```

```json fileName="pages/about-meta.content.json" contentDeclarationFormat="json"
{
  "key": "about-meta",
  "content": {
    "title": {
      "nodeType": "translation",
      "translations": {
        "ja": "私たちについて - 私たちの会社",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "ja": "私たちの会社と使命についてもっと知る",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### TypeScriptの設定

Intlayerはモジュール拡張を使用して、TypeScriptの利点を活用し、コードベースを強化します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScriptの設定に自動生成された型を含めることを確認してください。

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

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットするのを避けることができます。

これを行うには、以下の指示を`.gitignore`ファイルに追加します:

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します:

- 翻訳キーの**オートコンプリート**。
- 翻訳の欠落に対する**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成および更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進む

## さらに進むために、[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化できます。
