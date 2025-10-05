---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: Nuxt と Vue のウェブサイトを翻訳する（i18n）
description: Nuxt と Vue のウェブサイトを多言語対応にする方法を紹介します。国際化（i18n）と翻訳のためのドキュメントに従ってください。
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
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-template
---

# Intlayer と Nuxt で国際化（i18n）を始める

GitHub の [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-nuxt-template) を参照してください。

## Intlayer とは？

**Intlayer** は、最新のウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayer を使うことで、以下が可能になります：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成された型により TypeScript サポートを確保し、オートコンプリートやエラー検出を向上**させます。
- **動的なロケール検出や切り替えなどの高度な機能**を活用できます。

---

## Nuxt アプリケーションで Intlayer をセットアップするステップバイステップガイド

### ステップ 1: 依存パッケージのインストール

npm を使って必要なパッケージをインストールします：

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

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージです。

- **vue-intlayer**
  IntlayerをVueアプリケーションに統合するパッケージです。Vueコンポーネント用のコンポーザブルを提供します。

- **nuxt-intlayer**
  NuxtアプリケーションにIntlayerを統合するNuxtモジュールです。自動セットアップ、ロケール検出のためのミドルウェア、クッキー管理、URLリダイレクションを提供します。

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
  content: {
    contentDir: ["."], // デフォルトではIntlayerは`./src`ディレクトリのコンテンツ宣言ファイルを監視します
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

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Nuxt設定にIntlayerを統合する

Nuxtの設定にintlayerモジュールを追加します：

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... 既存のNuxt設定
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` モジュールは、Intlayer と Nuxt の統合を自動的に処理します。コンテンツ宣言の構築を設定し、開発モードでファイルを監視し、ロケール検出のためのミドルウェアを提供し、ローカライズされたルーティングを管理します。

### ステップ 4: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します：

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    nuxtIntlayer: t({
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      en: "Click on the Nuxt logo to learn more",
      ja: "詳細を知るにはNuxtのロゴをクリックしてください",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
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
      en: "count is ",
      ja: "カウントは ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      ja: "<code>components/HelloWorld.vue</code> を編集して保存し、HMRをテストしてください",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ja: "チェックしてください ",
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
      ja: "Nuxt について詳しくは ",
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
      ja: "Nuxt ロゴをクリックして詳細を確認してください",
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
    count: t({ ja: "カウントは ", en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      ja: "<code>components/HelloWorld.vue</code> を編集して保存し、HMRをテストしてください",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ ja: "チェックしてください ", en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    nuxtIntlayer: t({
      ja: "Nuxt Intlayer ドキュメント",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
      es: "Nuxt Intlayerのドキュメント",
    }),
    learnMore: t({
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
      ja: "Nuxtについて詳しくは、",
    }),
    nuxtDocs: t({
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
      ja: "Nuxtドキュメント",
    }),
    readTheDocs: t({
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
      ja: "Nuxtのロゴをクリックして詳細を確認してください",
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
        "ja": "チェックしてください "
      }
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "ja": "Nuxt Intlayer ドキュメント"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "ja": "Nuxt について詳しくは "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "ja": "Nuxt ドキュメント"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ja": "Nuxt ロゴをクリックして詳細を確認してください"
        "es": "Haga clic en el logotipo de Nuxt para obtener más información"
      }
    }
  }
}
```

> あなたのコンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）内に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ5: コード内でIntlayerを利用する

`useIntlayer` コンポーザブルを使って、Nuxtアプリケーション全体でコンテンツ辞書にアクセスします:

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

#### Intlayerでのコンテンツへのアクセス

Intlayerは、コンテンツにアクセスするためのさまざまなAPIを提供しています。

- **コンポーネントベースの構文**（推奨）：
  `<myContent />` または `<Component :is="myContent" />` の構文を使用して、Intlayerノードとしてコンテンツをレンダリングします。これは[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)や[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)とシームレスに統合されます。

- **文字列ベースの構文**：
  `{{ myContent }}` を使用して、ビジュアルエディターのサポートなしにプレーンテキストとしてコンテンツをレンダリングします。

- **生のHTML構文**：
  `<div v-html="myContent" />` を使用して、ビジュアルエディターのサポートなしに生のHTMLとしてコンテンツをレンダリングします。

- **分割代入構文**：
  `useIntlayer` コンポーザブルは、コンテンツを含む Proxy を返します。この Proxy はリアクティビティを維持しながらコンテンツにアクセスするために分割代入（デストラクチャリング）できます。
- `const content = useIntlayer("myContent");` を使い、`{{ content.myContent }}` または `<content.myContent />` として使用します。
- または `const { myContent } = useIntlayer("myContent");` を使い、`{{ myContent }}` または `<myContent/>` として分割代入して使用します。

### （オプション）ステップ6: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` コンポーザブルが提供する `setLocale` 関数を使用します。この関数を使うことで、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

言語を切り替えるコンポーネントを作成します：

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

// ref で選択されたロケールを追跡
const selectedLocale = ref(locale.value);

// 選択が変更されたときにロケールを更新
const changeLocale = () => setLocale(selectedLocale.value);

// selectedLocale をグローバルロケールと同期させる
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

次に、このコンポーネントをページやレイアウトで使用します：

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // 関連するintlayer宣言ファイルを作成
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

### （オプション）ステップ7：アプリケーションにローカライズされたルーティングを追加する

Nuxtは、`nuxt-intlayer`モジュールを使用すると、自動的にローカライズされたルーティングを処理します。これにより、ページディレクトリ構造に基づいて各言語のルートが自動的に作成されます。

例：

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

ローカライズされたページを作成するには、単に`pages/`ディレクトリにVueファイルを作成します：

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

`nuxt-intlayer`モジュールは自動的に以下を行います：

- ユーザーの優先ロケールを検出する
- URLを介したロケール切り替えを処理する
- 適切な `<html lang="">` 属性を設定する
- ロケールクッキーを管理する
- ユーザーを適切なローカライズされたURLにリダイレクトする

### （オプション）ステップ8：ローカライズされたリンクコンポーネントの作成

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタムの `LocalizedLink` コンポーネントを作成できます。このコンポーネントは内部URLに自動的に現在の言語をプレフィックスとして付加します。

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

// リンクが外部リンクかどうかをチェック
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// 内部リンクの場合はローカライズされたhrefを作成
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

次に、このコンポーネントをアプリケーション全体で使用します：

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>
    <LocalizedLink to="/contact">
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

### （オプション）ステップ9：メタデータとSEOの処理

Nuxtは優れたSEO機能を提供します。Intlayerを使ってローカライズされたメタデータを管理できます：

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

対応するコンテンツ宣言を作成します：

```ts fileName="pages/about-meta.content.ts"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      ja: "私たちについて - 私の会社",
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
      zh: "关于我们 - 我的公司",
      ja: "私たちについて - 私の会社",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      ja: "私たちの会社と使命について詳しく知る",
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
      zh: "关于我们 - 我的公司",
      ja: "私たちについて - 私の会社",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
      ja: "私たちの会社と使命についてもっと知る",
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
        "zh": "关于我们 - 我的公司",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa",
        "ja": "私たちについて - 私の会社"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "zh": "了解更多关于我们公司和我们的使命",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### TypeScriptの設定

Intlayerはモジュール拡張を使用してTypeScriptの利点を活かし、コードベースをより強固にします。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Git 設定

Intlayer によって生成されたファイルは無視することを推奨します。これにより、Git リポジトリに誤ってコミットするのを防げます。

これを行うには、`.gitignore` ファイルに以下の指示を追加してください。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

### VS Code 拡張機能

Intlayer を使った開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**
- **翻訳が不足している場合のリアルタイムエラー検出**。
- **翻訳内容のインラインプレビュー**。
- **翻訳の作成や更新を簡単に行うクイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進むために

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

---

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
