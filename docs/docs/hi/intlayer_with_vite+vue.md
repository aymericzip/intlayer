---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: अपनी Vite और Vue वेबसाइट का अनुवाद करें (i18n)
description: जानें कि अपनी Vite और Vue वेबसाइट को बहुभाषी कैसे बनाएं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
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

# Intlayer और Vite और Vue के साथ अंतरराष्ट्रीयकरण (i18n) शुरू करना

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-vite-vue-template) देखें।

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कॉम्पोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **TypeScript समर्थन सुनिश्चित करें** ऑटो-जेनरेटेड प्रकारों के साथ, जो ऑटो-कम्प्लीशन और त्रुटि पहचान में सुधार करता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकल डिटेक्शन और स्विचिंग।

---

## Vite और Vue एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **vue-intlayer**
  वह पैकेज जो Intlayer को Vue एप्लिकेशन के साथ एकीकृत करता है। यह Vue अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और कॉम्पोज़ेबल्स प्रदान करता है।

- **vite-intlayer**
  Vite प्लगइन शामिल है जो Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी प्रदान करता है।

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
// कॉन्फ़िगरेशन ऑब्जेक्ट जो अंतरराष्ट्रीयकरण सेटिंग्स को परिभाषित करता है
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH, // डिफ़ॉल्ट भाषा
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// कॉन्फ़िगरेशन ऑब्जेक्ट जो अंतरराष्ट्रीयकरण सेटिंग्स को परिभाषित करता है
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH, // डिफ़ॉल्ट भाषा
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर पुनर्निर्देशन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में Intlayer लॉग को अक्षम करना, और भी बहुत कुछ सेट कर सकते हैं। उपलब्ध पैरामीटर की पूरी सूची के लिए, कृपया [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer()],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनका निरीक्षण करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

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
    checkOut: t({ en: "जांचें ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: ", आधिकारिक Vue + Vite स्टार्टर",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Vue के लिए IDE समर्थन के बारे में अधिक जानें ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue दस्तावेज़ स्केलिंग अप गाइड",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Vite और Vue लोगो पर क्लिक करके अधिक जानें",
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
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "जांचें ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: "आधिकारिक Vue + Vite स्टार्टर",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Vue के लिए IDE समर्थन के बारे में अधिक जानें ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue डॉक्स स्केलिंग अप गाइड",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Vite और Vue लोगो पर क्लिक करके अधिक जानें",
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
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "जांचें ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: "आधिकारिक Vue + Vite स्टार्टर",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Vue के लिए IDE समर्थन के बारे में अधिक जानें ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue डॉक्स स्केलिंग अप गाइड",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "अधिक जानने के लिए Vite और Vue लोगो पर क्लिक करें",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Vite और Vue लोगो पर क्लिक करें अधिक जानने के लिए",
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
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "hi": "गिनती है "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "hi": "परीक्षण के लिए <code>components/HelloWorld.vue</code> को संपादित करें और HMR को सहेजें"
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
        "hi": "देखें "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite",
        "hi": "आधिकारिक Vue + Vite स्टार्टर"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el ",
        "hi": "Vue के लिए IDE समर्थन के बारे में अधिक जानें "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide",
        "hi": "Vue डॉक्स स्केलिंग अप गाइड"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información",
        "hi": "अधिक जानने के लिए Vite और Vue लोगो पर क्लिक करें"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हो जाती हैं। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

अपने Vue एप्लिकेशन में Intlayer के अंतरराष्ट्रीयकरण फीचर्स का उपयोग करने के लिए, आपको सबसे पहले अपने मुख्य फ़ाइल में Intlayer सिंगलटन इंस्टेंस को रजिस्टर करना होगा। यह चरण महत्वपूर्ण है क्योंकि यह आपके एप्लिकेशन के सभी कंपोनेंट्स को अंतरराष्ट्रीयकरण संदर्भ प्रदान करता है, जिससे अनुवाद आपके कंपोनेंट ट्री में कहीं भी सुलभ हो जाते हैं।

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// शीर्ष स्तर पर प्रदाता को इंजेक्ट करें
installIntlayer(app);

// एप्लिकेशन को माउंट करें
app.mount("#app");
```

अपने एप्लिकेशन में कंटेंट डिक्शनरीज़ तक पहुंचने के लिए एक मुख्य Vue कंपोनेंट बनाएं और `useIntlayer` कॉम्पोज़ेबल्स का उपयोग करें:

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

#### Intlayer में कंटेंट तक पहुंचना

Intlayer आपकी सामग्री तक पहुंचने के लिए विभिन्न API प्रदान करता है:

- **कंपोनेंट-आधारित सिंटैक्स** (अनुशंसित):
  कंटेंट को Intlayer नोड के रूप में रेंडर करने के लिए `<myContent />` या `<Component :is="myContent" />` सिंटैक्स का उपयोग करें। यह [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) और [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के साथ सहजता से एकीकृत होता है।

- **स्ट्रिंग-आधारित सिंटैक्स**:
  कंटेंट को प्लेन टेक्स्ट के रूप में रेंडर करने के लिए `{{ myContent }}` का उपयोग करें, बिना विज़ुअल एडिटर सपोर्ट के।

- **रॉ HTML सिंटैक्स**:
  `<div v-html="myContent" />` का उपयोग बिना विज़ुअल एडिटर समर्थन के सामग्री को कच्चे HTML के रूप में रेंडर करने के लिए करें।

- **डिस्ट्रक्चरिंग सिंटैक्स**:
  `useIntlayer` कॉम्पोज़ेबल सामग्री के साथ एक प्रॉक्सी लौटाता है। इस प्रॉक्सी को डिस्ट्रक्चर करके सामग्री तक पहुंचा जा सकता है जबकि प्रतिक्रियाशीलता बनी रहती है।
  - `const content = useIntlayer("myContent");` का उपयोग करें और `{{ content.myContent }}` / `<content.myContent />`।
  - या `const { myContent } = useIntlayer("myContent");` का उपयोग करें और `{{ myContent}}` / `<myContent/>` से सामग्री को डिस्ट्रक्चर करें।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` कॉम्पोज़ेबल द्वारा प्रदान किया गया `setLocale` फ़ंक्शन उपयोग कर सकते हैं। यह फ़ंक्शन एप्लिकेशन की लोकल सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

भाषाओं के बीच स्विच करने के लिए एक कंपोनेंट बनाएं:

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

// लोकल जानकारी और setLocale फ़ंक्शन प्राप्त करें
const { locale, availableLocales, setLocale } = useLocale();

// चयनित लोकल को ref के साथ ट्रैक करें
const selectedLocale = ref(locale.value);

// चयन बदलने पर लोकल अपडेट करें
const changeLocale = () => setLocale(selectedLocale.value);

// selectedLocale को वैश्विक locale के साथ सिंक में रखें
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

फिर, इस कॉम्पोनेंट का उपयोग अपने App.vue में करें:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // संबंधित intlayer घोषणा फ़ाइल बनाएं
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

### (वैकल्पिक) चरण 7: अपने एप्लिकेशन में स्थानीयकृत राउटिंग जोड़ें

Vue एप्लिकेशन में स्थानीयकृत राउटिंग जोड़ना आमतौर पर Vue Router का उपयोग करके लोकल प्रीफिक्स के साथ किया जाता है। यह प्रत्येक भाषा के लिए अद्वितीय रूट बनाता है, जो SEO और SEO-अनुकूल URL के लिए उपयोगी है।

उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
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

फिर, एक राउटर कॉन्फ़िगरेशन बनाएं जो स्थानीय-आधारित रूटिंग को संभालता है:

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

// अंतरराष्ट्रीयकरण कॉन्फ़िगरेशन प्राप्त करें
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * स्थानीय-विशिष्ट पथ और मेटाडेटा के साथ रूट्स घोषित करें।
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

// स्थानीयता हैंडलिंग के लिए नेविगेशन गार्ड जोड़ें
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // रूट मेटा में परिभाषित स्थानीयता का पुन: उपयोग करें
    client.setLocale(metaLocale);
    next();
  } else {
    // फॉलबैक: मेटा में कोई स्थानीयता नहीं, संभवतः अनमिलित रूट
    // वैकल्पिक: 404 को संभालें या डिफ़ॉल्ट स्थानीयता पर पुनः निर्देशित करें
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> राउटर में रूट की पहचान करने के लिए नाम का उपयोग किया जाता है। यह सभी रूट्स में अद्वितीय होना चाहिए ताकि संघर्ष से बचा जा सके और उचित नेविगेशन और लिंकिंग सुनिश्चित हो सके।

फिर, अपने main.js फ़ाइल में राउटर को पंजीकृत करें:

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

फिर अपने `App.vue` फ़ाइल को अपडेट करें ताकि RouterView कॉम्पोनेंट को रेंडर किया जा सके। यह कॉम्पोनेंट वर्तमान रूट के लिए मेल खाने वाले कॉम्पोनेंट को प्रदर्शित करेगा।

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

साथ ही, आप अपने एप्लिकेशन में सर्वर-साइड रूटिंग जोड़ने के लिए `intlayerMiddlewarePlugin` का भी उपयोग कर सकते हैं। यह प्लगइन URL के आधार पर वर्तमान स्थानीयता को स्वचालित रूप से पहचान लेगा और उपयुक्त स्थानीयता कुकी सेट करेगा। यदि कोई स्थानीयता निर्दिष्ट नहीं है, तो प्लगइन उपयोगकर्ता के ब्राउज़र भाषा प्राथमिकताओं के आधार पर सबसे उपयुक्त स्थानीयता निर्धारित करेगा। यदि कोई स्थानीयता पता नहीं चलती है, तो यह डिफ़ॉल्ट स्थानीयता पर पुनर्निर्देशित करेगा।

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddlewarePlugin()],
});
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddlewarePlugin()],
});
```

### (वैकल्पिक) चरण 8: जब स्थानीयता बदलती है तो URL बदलें

जब उपयोगकर्ता भाषा बदलता है तो URL को स्वचालित रूप से अपडेट करने के लिए, आप `LocaleSwitcher` घटक को Vue Router का उपयोग करने के लिए संशोधित कर सकते हैं:

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

// लोकल जानकारी और setLocale फ़ंक्शन प्राप्त करें
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // वर्तमान रूट प्राप्त करें और एक स्थानीयकृत URL बनाएं
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // पेज को रीलोड किए बिना स्थानीयकृत रूट पर नेविगेट करें
    router.push(localizedPath);
  },
});

// चयनित लोकल को ref के साथ ट्रैक करें
const selectedLocale = ref(locale.value);

// चयन बदलने पर स्थानीयता अपडेट करें
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// selectedLocale को वैश्विक स्थानीयता के साथ सिंक में रखें
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

टिप: बेहतर SEO और पहुँच के लिए, स्थानीयकृत पृष्ठों से लिंक करने के लिए `<a href="/fr/home" hreflang="fr">` जैसे टैग का उपयोग करें, जैसा कि चरण 10 में दिखाया गया है। इससे खोज इंजन भाषा-विशिष्ट URL को सही ढंग से खोज और अनुक्रमित कर सकते हैं। SPA व्यवहार बनाए रखने के लिए, आप @click.prevent के साथ डिफ़ॉल्ट नेविगेशन को रोक सकते हैं, useLocale का उपयोग करके स्थानीयता बदल सकते हैं, और Vue Router का उपयोग करके प्रोग्रामेटिक रूप से नेविगेट कर सकते हैं।

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="अंग्रेज़ी में स्विच करें"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>अंग्रेज़ी</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="स्पेनिश में स्विच करें"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>स्पेनिश</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (वैकल्पिक) चरण 9: HTML भाषा और दिशा विशेषताओं को स्विच करें

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो वर्तमान लोकल के अनुसार `<html>` टैग के `lang` और `dir` विशेषताओं को अपडेट करना महत्वपूर्ण होता है। ऐसा करने से सुनिश्चित होता है कि:

- **पहुँच**: स्क्रीन रीडर और सहायक तकनीकें सही `lang` एट्रिब्यूट पर निर्भर करती हैं ताकि सामग्री को सही ढंग से उच्चारित और व्याख्यायित किया जा सके।
- **पाठ रेंडरिंग**: `dir` (दिशा) एट्रिब्यूट सुनिश्चित करता है कि पाठ सही क्रम में प्रदर्शित हो (जैसे, अंग्रेज़ी के लिए बाएं से दाएं, अरबी या हिब्रू के लिए दाएं से बाएं), जो पठनीयता के लिए आवश्यक है।
- **एसईओ**: सर्च इंजन `lang` एट्रिब्यूट का उपयोग आपके पृष्ठ की भाषा निर्धारित करने के लिए करते हैं, जिससे खोज परिणामों में सही स्थानीयकृत सामग्री प्रदर्शित हो सके।

जब स्थानीयता बदलती है, तो इन एट्रिब्यूट्स को गतिशील रूप से अपडेट करके, आप सभी समर्थित भाषाओं में उपयोगकर्ताओं के लिए एक सुसंगत और सुलभ अनुभव सुनिश्चित करते हैं।

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * एक कॉम्पोजेबल जो वर्तमान लोकल के आधार पर HTML <html> एलिमेंट के `lang` और `dir` एट्रिब्यूट्स को अपडेट करता है।
 *
 * @example
 * // अपने App.vue या किसी ग्लोबल कॉम्पोनेंट में
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // जब भी लोकल बदलता है, HTML एट्रिब्यूट्स को अपडेट करें
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // भाषा एट्रिब्यूट को अपडेट करें
      document.documentElement.lang = newLocale;

      // टेक्स्ट दिशा सेट करें (अधिकांश भाषाओं के लिए ltr, अरबी, हिब्रू आदि के लिए rtl)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

अपने `App.vue` या किसी वैश्विक कॉम्पोनेंट में इस कॉम्पोज़ेबल का उपयोग करें:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// वर्तमान लोकल के आधार पर HTML विशेषताओं को लागू करें
useI18nHTMLAttributes();
</script>

<template>
  <!-- आपका ऐप टेम्पलेट -->
</template>
```

### (वैकल्पिक) चरण 10: एक स्थानीयकृत लिंक कॉम्पोनेंट बनाना

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन की नेविगेशन वर्तमान लोकल का सम्मान करती है, आप एक कस्टम `Link` कॉम्पोनेंट बना सकते हैं। यह कॉम्पोनेंट स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ प्रीफिक्स करता है। उदाहरण के लिए, जब एक फ्रेंच-भाषी उपयोगकर्ता "About" पेज के लिंक पर क्लिक करता है, तो वे `/about` के बजाय `/fr/about` पर पुनः निर्देशित होते हैं।

यह व्यवहार कई कारणों से उपयोगी है:

- **SEO और उपयोगकर्ता अनुभव**: स्थानीयकृत URL खोज इंजन को भाषा-विशिष्ट पृष्ठों को सही ढंग से इंडेक्स करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **संगति**: अपने एप्लिकेशन में स्थानीयकृत लिंक का उपयोग करके, आप सुनिश्चित करते हैं कि नेविगेशन वर्तमान लोकल के भीतर ही रहता है, जिससे अप्रत्याशित भाषा परिवर्तन से बचा जा सके।
- **रखरखाव योग्यता**: स्थानीयकरण लॉजिक को एकल घटक में केंद्रीकृत करने से URL प्रबंधन सरल हो जाता है, जिससे आपका कोडबेस बनाए रखना और विस्तार करना आसान हो जाता है क्योंकि आपका एप्लिकेशन बढ़ता है।

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

// आंतरिक लिंक के लिए स्थानीयकृत href बनाएं
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Vue Router के साथ उपयोग के लिए, एक राउटर-विशिष्ट संस्करण बनाएं:

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

// router-link के लिए localized to-prop बनाएं
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // यदि 'to' एक ऑब्जेक्ट है, तो path प्रॉपर्टी को स्थानीयकृत करें
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

अपने एप्लिकेशन में इन कॉम्पोनेंट्स का उपयोग करें:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue राउटर  -->
    <RouterLink to="/">रूट</RouterLink>
    <RouterLink to="/home">होम</RouterLink>
    <!-- अन्य -->
    <Link href="/">रूट</Link>
    <Link href="/home">होम</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### (वैकल्पिक) चरण 11: मार्कडाउन रेंडर करें

Intlayer आपके Vue एप्लिकेशन में Markdown सामग्री को सीधे रेंडर करने का समर्थन करता है। डिफ़ॉल्ट रूप से, Markdown को सादा टेक्स्ट के रूप में माना जाता है। Markdown को समृद्ध HTML में बदलने के लिए, आप [markdown-it](https://github.com/markdown-it/markdown-it), एक Markdown पार्सर, को एकीकृत कर सकते हैं।

यह विशेष रूप से उपयोगी होता है जब आपके अनुवादों में सूची, लिंक, या जोर देने जैसे स्वरूपित सामग्री शामिल होती है।

डिफ़ॉल्ट रूप से Intlayer Markdown को स्ट्रिंग के रूप में रेंडर करता है। लेकिन Intlayer `installIntlayerMarkdown` फ़ंक्शन का उपयोग करके Markdown को HTML में रेंडर करने का तरीका भी प्रदान करता है।

> `intlayer` पैकेज का उपयोग करके Markdown सामग्री को कैसे घोषित करें, यह देखने के लिए [markdown doc](https://github.com/aymericzip/intlayer/tree/main/docs/en/dictionary/markdown.md) देखें।

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // HTML टैग की अनुमति दें
  linkify: true, // URL को स्वचालित रूप से लिंक करें
  typographer: true, // स्मार्ट कोट्स, डैश आदि सक्षम करें
});

// Intlayer को बताएं कि जब भी उसे मार्कडाउन को HTML में बदलना हो तो md.render() का उपयोग करे
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

एक बार पंजीकृत होने के बाद, आप सीधे मार्कडाउन सामग्री दिखाने के लिए कंपोनेंट-आधारित सिंटैक्स का उपयोग कर सकते हैं:

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

### टाइपस्क्रिप्ट कॉन्फ़िगर करें

Intlayer टाइपस्क्रिप्ट के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी टाइपस्क्रिप्ट कॉन्फ़िगरेशन में ऑटो-जनरेटेड टाइप्स शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा टाइपस्क्रिप्ट कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा टाइपस्क्रिप्ट कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जनरेटेड टाइप्स शामिल करें
  ],
}
```

### गिट कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की सलाह दी जाती है। इससे आप इन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकंप्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पता लगाना**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

अधिक जानकारी के लिए कि एक्सटेंशन का उपयोग कैसे करें, कृपया [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

---

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी कर सकते हैं।

---

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
