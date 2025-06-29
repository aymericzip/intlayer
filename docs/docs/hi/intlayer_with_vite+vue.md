---
docName: intlayer_with_vite_vue
url: https://intlayer.org/doc/environment/vite-and-vue
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Vite और Vue के वेबसाइट को अनुवाद करें (i18n)
description: जानें कि Vite और Vue का उपयोग करके अपनी वेबसाइट को बहुभाषी कैसे बनाएं। इसे अंतर्राष्ट्रीय (i18n) और अनुवादित करने के लिए प्रलेखन का पालन करें।
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Vite
  - Vue
  - JavaScript
---

# इंटलेयर और Vite और Vue के साथ अंतर्राष्ट्रीयकरण (i18n) शुरू करना

> यह पैकेज विकास में है। अधिक जानकारी के लिए [समस्या](https://github.com/aymericzip/intlayer/issues/113) देखें। Vue के लिए Intlayer में अपनी रुचि दिखाने के लिए समस्या को लाइक करें।

<!-- GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-vue-template) देखें। -->

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **आसानी से अनुवाद प्रबंधित करें** घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **मेटाडेटा, रूट्स और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार करें।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।

---

## Vite और Vue एप्लिकेशन में Intlayer सेट अप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरता स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md), ट्रांसपिलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **vue-intlayer**
  पैकेज जो Vue एप्लिकेशन के साथ Intlayer को एकीकृत करता है। यह Vue अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और कंपोज़ेबल्स प्रदान करता है।

- **vite-intlayer**
  [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ Intlayer को एकीकृत करने के लिए Vite प्लगइन शामिल करता है, साथ ही उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर भी शामिल करता है।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
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
      // आपकी अन्य भाषाएँ
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
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में Intlayer लॉग्स को अक्षम करना, और अधिक सेट कर सकते हैं। उपलब्ध पैरामीटरों की पूरी सूची के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

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

> `intlayerPlugin()` Vite प्लगइन का उपयोग Vite के साथ Intlayer को एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      hi: "गिनती है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      hi: "संपादित करें <code>components/HelloWorld.vue</code> और HMR का परीक्षण करने के लिए सहेजें",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      hi: "जाँच करें ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      hi: ", आधिकारिक Vue + Vite स्टार्टर",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      hi: "Vue के लिए IDE समर्थन के बारे में और जानें ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      hi: "Vue डॉक्स स्केलिंग अप गाइड",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      hi: "अधिक जानने के लिए Vite और Vue लोगो पर क्लिक करें",
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
      hi: "गिनती है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      hi: "संपादित करें <code>components/HelloWorld.vue</code> और HMR का परीक्षण करने के लिए सहेजें",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      hi: "जाँच करें ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      hi: "आधिकारिक Vue + Vite स्टार्टर",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      hi: "Vue के लिए IDE समर्थन के बारे में और जानें ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      hi: "Vue डॉक्स स्केलिंग अप गाइड",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      hi: "अधिक जानने के लिए Vite और Vue लोगो पर क्लिक करें",
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
      hi: "गणना है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      hi: "संपादित करें <code>components/HelloWorld.vue</code> और HMR का परीक्षण करने के लिए सहेजें",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      hi: "जांचें ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      hi: "आधिकारिक Vue + Vite स्टार्टर",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      hi: "Vue के लिए IDE समर्थन के बारे में और जानें ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      hi: "Vue Docs स्केलिंग अप गाइड",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      hi: "अधिक जानने के लिए Vite और Vue लोगो पर क्लिक करें",
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
        "hi": "गणना है ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "hi": "संपादित करें <code>components/HelloWorld.vue</code> और HMR का परीक्षण करने के लिए सहेजें",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "hi": "जांचें ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "hi": "आधिकारिक Vue + Vite स्टार्टर",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "hi": "Vue के लिए IDE समर्थन के बारे में और जानें ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "hi": "Vue Docs स्केलिंग अप गाइड",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "hi": "अधिक जानने के लिए Vite और Vue लोगो पर क्लिक करें",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं, जब तक वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हैं। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

```
- https://example.com
- https://example.com/hi/about
- https://example.com/fr/about
```

सबसे पहले, Vue Router इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

फिर, एक राउटर कॉन्फ़िगरेशन बनाएं जो लोकेल-आधारित रूटिंग को संभाल सके:

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

// अंतर्राष्ट्रीयकरण कॉन्फ़िगरेशन प्राप्त करें
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * लोकेल-विशिष्ट पथ और मेटाडेटा के साथ रूट्स घोषित करें।
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

// राउटर इंस्टेंस बनाएं
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// लोकेल हैंडलिंग के लिए नेविगेशन गार्ड जोड़ें
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // रूट मेटा में परिभाषित लोकेल का पुनः उपयोग करें
    client.setLocale(metaLocale);
    next();
  } else {
    // फॉलबैक: मेटा में कोई लोकेल नहीं, संभवतः असंगत रूट
    // वैकल्पिक: 404 को संभालें या डिफ़ॉल्ट लोकेल पर रीडायरेक्ट करें
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> नाम का उपयोग राउटर में रूट की पहचान करने के लिए किया जाता है। यह सभी रूट्स में अद्वितीय होना चाहिए ताकि संघर्ष से बचा जा सके और उचित नेविगेशन और लिंकिंग सुनिश्चित हो सके।

फिर, अपने मुख्य `main.js` फ़ाइल में राउटर को रजिस्टर करें:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// ऐप में राउटर जोड़ें
app.use(router);

// ऐप को माउंट करें
app.mount("#app");
```

फिर अपने `App.vue` फ़ाइल को अपडेट करें ताकि RouterView कंपोनेंट को रेंडर किया जा सके। यह कंपोनेंट वर्तमान रूट के लिए मेल खाने वाले कंपोनेंट को प्रदर्शित करेगा।

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

साथ ही, आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intLayerMiddlewarePlugin` का उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान लोकेल को स्वचालित रूप से पहचान लेगा और उपयुक्त लोकेल कुकी सेट करेगा। यदि कोई लोकेल निर्दिष्ट नहीं है, तो यह उपयोगकर्ता की ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त लोकेल निर्धारित करेगा। यदि कोई लोकेल नहीं पहचाना गया, तो यह डिफ़ॉल्ट लोकेल पर रीडायरेक्ट करेगा।

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

### (वैकल्पिक) चरण 8: लोकेल बदलने पर URL बदलें

जब उपयोगकर्ता भाषा बदलता है, तो URL को स्वचालित रूप से अपडेट करने के लिए, आप `LocaleSwitcher` कंपोनेंट को Vue Router का उपयोग करने के लिए संशोधित कर सकते हैं:

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

// Vue Router प्राप्त करें
const router = useRouter();

// लोकेल जानकारी और setLocale फ़ंक्शन प्राप्त करें
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // वर्तमान रूट प्राप्त करें और एक स्थानीयकृत URL बनाएं
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // पेज को रीलोड किए बिना स्थानीयकृत रूट पर नेविगेट करें
    router.push(localizedPath);
  },
});

// चयनित लोकेल को ref के साथ ट्रैक करें
const selectedLocale = ref(locale.value);

// चयन बदलने पर लोकेल अपडेट करें
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// चयनित लोकेल को वैश्विक लोकेल के साथ सिंक में रखें
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

टिप: बेहतर SEO और एक्सेसिबिलिटी के लिए, `<a href="/fr/home" hreflang="fr">` जैसे टैग का उपयोग करें ताकि स्थानीयकृत पेजों से लिंक किया जा सके, जैसा कि चरण 10 में दिखाया गया है। यह सर्च इंजन को भाषा-विशिष्ट URL को सही ढंग से खोजने और इंडेक्स करने की अनुमति देता है। SPA व्यवहार को बनाए रखने के लिए, आप @click.prevent के साथ डिफ़ॉल्ट नेविगेशन को रोक सकते हैं, useLocale का उपयोग करके लोकेल बदल सकते हैं, और Vue Router का उपयोग करके प्रोग्रामेटिक रूप से नेविगेट कर सकते हैं।

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Switch to English"
      target="_self"
      aria-current="page"
      href="/hi/doc/get-started"
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

### (वैकल्पिक) चरण 9: HTML भाषा और दिशा विशेषताओं को स्विच करें

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो `<html>` टैग की `lang` और `dir` विशेषताओं को वर्तमान लोकेल के अनुसार अपडेट करना महत्वपूर्ण है। ऐसा करने से यह सुनिश्चित होता है:

- **एक्सेसिबिलिटी**: स्क्रीन रीडर और सहायक तकनीकें सही `lang` विशेषता पर निर्भर करती हैं ताकि सामग्री को सही ढंग से उच्चारित और व्याख्या किया जा सके।
- **पाठ रेंडरिंग**: `dir` (दिशा) विशेषता यह सुनिश्चित करती है कि पाठ सही क्रम में रेंडर किया गया है (जैसे, अंग्रेजी के लिए बाएं-से-दाएं, अरबी या हिब्रू के लिए दाएं-से-बाएं), जो पठनीयता के लिए आवश्यक है।
- **SEO**: सर्च इंजन आपके पेज की भाषा निर्धारित करने के लिए `lang` विशेषता का उपयोग करते हैं, जिससे खोज परिणामों में सही स्थानीयकृत सामग्री प्रदान करने में मदद मिलती है।

इन विशेषताओं को लोकेल बदलने पर गतिशील रूप से अपडेट करके, आप सभी समर्थित भाषाओं में उपयोगकर्ताओं के लिए एक सुसंगत और सुलभ अनुभव सुनिश्चित करते हैं।

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * यह एक कंपोज़ेबल है जो HTML <html> तत्व के `lang` और `dir` गुणों को
 * वर्तमान लोकेल के आधार पर अपडेट करता है।
 *
 * @example
 * // अपने App.vue या एक वैश्विक घटक में
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // जब भी लोकेल बदलता है, HTML गुणों को अपडेट करें
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // भाषा गुण को अपडेट करें
      document.documentElement.lang = newLocale;

      // टेक्स्ट दिशा सेट करें (ltr अधिकांश भाषाओं के लिए, rtl अरबी, हिब्रू आदि के लिए)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

अपने `App.vue` या एक वैश्विक घटक में इस कंपोज़ेबल का उपयोग करें:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// वर्तमान लोकेल के आधार पर HTML गुण लागू करें
useI18nHTMLAttributes();
</script>

<template>
  <!-- आपका ऐप टेम्पलेट -->
</template>
```

### (वैकल्पिक) चरण 10: एक स्थानीयकृत लिंक घटक बनाना

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन का नेविगेशन वर्तमान लोकेल का सम्मान करता है, आप एक कस्टम `Link` घटक बना सकते हैं। यह घटक स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ प्रीफिक्स करता है। उदाहरण के लिए, जब एक फ्रेंच-भाषी उपयोगकर्ता "About" पृष्ठ के लिंक पर क्लिक करता है, तो उन्हें `/fr/about` पर रीडायरेक्ट किया जाता है, न कि `/about` पर।

यह व्यवहार कई कारणों से उपयोगी है:

- **SEO और उपयोगकर्ता अनुभव**: स्थानीयकृत URL खोज इंजन को भाषा-विशिष्ट पृष्ठों को सही ढंग से इंडेक्स करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **संगति**: अपने एप्लिकेशन में एक स्थानीयकृत लिंक का उपयोग करके, आप यह सुनिश्चित करते हैं कि नेविगेशन वर्तमान लोकेल के भीतर रहता है, अप्रत्याशित भाषा स्विच को रोकता है।
- **रखरखाव**: URL प्रबंधन को सरल बनाने के लिए स्थानीयकरण लॉजिक को एक ही घटक में केंद्रीकृत करना, आपके कोडबेस को बनाए रखना और विस्तार करना आसान बनाता है।

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

// जांचें कि लिंक बाहरी है या नहीं
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// आंतरिक लिंक के लिए एक स्थानीयकृत href बनाएं
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Vue राउटर के साथ उपयोग के लिए, एक राउटर-विशिष्ट संस्करण बनाएं:

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

// राउटर-लिंक के लिए स्थानीयकृत to-प्रॉप बनाएं
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // यदि 'to' एक ऑब्जेक्ट है, तो पथ प्रॉपर्टी को स्थानीयकृत करें
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

अपने एप्लिकेशन में इन घटकों का उपयोग करें:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue राउटर -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- अन्य -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### टाइपस्क्रिप्ट कॉन्फ़िगरेशन

Intlayer टाइपस्क्रिप्ट के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल वृद्धि का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी टाइपस्क्रिप्ट कॉन्फ़िगरेशन में स्वचालित रूप से उत्पन्न प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा टाइपस्क्रिप्ट कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा टाइपस्क्रिप्ट कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

### गिट कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करना अनुशंसित है। यह आपको उन्हें अपने गिट रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्न निर्देश जोड़ सकते हैं:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटो-कम्प्लीशन**।
- गायब अनुवादों के लिए **रियल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इस पर अधिक विवरण के लिए [Intlayer VS कोड एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

---

### आगे बढ़ें

## आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी रूप से प्रबंधित कर सकते हैं।
