# इंटलेयर और Nuxt के साथ अंतर्राष्ट्रीयकरण (i18n) शुरू करना

[एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-nuxt-template) को GitHub पर देखें।

## इंटलेयर क्या है?

**इंटलेयर** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

इंटलेयर के साथ, आप कर सकते हैं:

- **अनुवादों को आसानी से प्रबंधित करें** घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **मेटाडेटा, रूट्स और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **टाइपस्क्रिप्ट समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ, ऑटोकंप्लीशन और त्रुटि पहचान में सुधार करते हुए।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।

---

## Nuxt एप्लिकेशन में इंटलेयर सेटअप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer
```

- **intlayer**

  यह मुख्य पैकेज है जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md), ट्रांसपिलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **vue-intlayer**
  यह पैकेज Vue एप्लिकेशन के साथ इंटलेयर को एकीकृत करता है। यह Vue घटकों के लिए कॉम्पोज़ेबल्स प्रदान करता है।

- **nuxt-intlayer**
  यह Nuxt मॉड्यूल है जो Nuxt अनुप्रयोगों के साथ इंटलेयर को एकीकृत करता है। यह स्वचालित सेटअप, लोकेल पहचान के लिए मिडलवेयर, कुकी प्रबंधन, और URL रीडायरेक्शन प्रदान करता है।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएँ:

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URLs, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में इंटलेयर लॉग्स को अक्षम करना, और अधिक सेट कर सकते हैं। उपलब्ध सभी पैरामीटरों की पूरी सूची के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### चरण 3: अपने Nuxt कॉन्फ़िगरेशन में इंटलेयर को एकीकृत करें

अपने Nuxt कॉन्फ़िगरेशन में इंटलेयर मॉड्यूल जोड़ें:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... आपका मौजूदा Nuxt कॉन्फ़िगरेशन
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` मॉड्यूल स्वचालित रूप से Nuxt के साथ इंटलेयर के एकीकरण को संभालता है। यह सामग्री घोषणा निर्माण सेट करता है, विकास मोड में फ़ाइलों की निगरानी करता है, लोकेल पहचान के लिए मिडलवेयर प्रदान करता है, और स्थानीयकृत रूटिंग का प्रबंधन करता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएँ और प्रबंधित करें:

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
      hi: "<code>components/HelloWorld.vue</code> संपादित करें और HMR का परीक्षण करने के लिए सहेजें",
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
    nuxtIntlayer: t({
      hi: "Nuxt Intlayer दस्तावेज़ीकरण",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      hi: "Nuxt के बारे में और जानें ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      hi: "Nuxt दस्तावेज़ीकरण",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      hi: "अधिक जानने के लिए Nuxt लोगो पर क्लिक करें",
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
      hi: "गिनती है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      hi: "<code>components/HelloWorld.vue</code> संपादित करें और HMR का परीक्षण करने के लिए सहेजें",
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
    nuxtIntlayer: t({
      hi: "Nuxt Intlayer दस्तावेज़ीकरण",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      hi: "Nuxt के बारे में और जानें ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      hi: "Nuxt दस्तावेज़ीकरण",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      hi: "अधिक जानने के लिए Nuxt लोगो पर क्लिक करें",
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
      hi: "गिनती है ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      hi: "<code>components/HelloWorld.vue</code> संपादित करें और HMR का परीक्षण करने के लिए सहेजें",
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
    nuxtIntlayer: t({
      hi: "Nuxt Intlayer दस्तावेज़ीकरण",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      hi: "Nuxt के बारे में और जानें ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      hi: "Nuxt दस्तावेज़ीकरण",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      hi: "अधिक जानने के लिए Nuxt लोगो पर क्लिक करें",
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
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "hi": "Nuxt Intlayer प्रलेखन",
        "en": "Nuxt Intlayer documentation",
        "fr": "Documentation de Nuxt Intlayer",
        "es": "Documentación de Nuxt Intlayer"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "hi": "Nuxt के बारे में और जानें ",
        "en": "Learn more about Nuxt in the ",
        "fr": "En savoir plus sur Nuxt dans la ",
        "es": "Aprenda más sobre Nuxt en la "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "hi": "Nuxt प्रलेखन",
        "en": "Nuxt Documentation",
        "fr": "Documentation Nuxt",
        "es": "Documentación de Nuxt"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "hi": "अधिक जानने के लिए Nuxt लोगो पर क्लिक करें",
        "en": "Click on the Nuxt logo to learn more",
        "fr": "Cliquez sur le logo Nuxt pour en savoir plus",
        "es": "Haga clic en el logotipo de Nuxt para obtener más información"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं, जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हैं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) देखें।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

अपने Nuxt एप्लिकेशन में `useIntlayer` कॉम्पोज़ेबल का उपयोग करके अपनी सामग्री डिक्शनरीज़ तक पहुंचें:

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

#### Intlayer में सामग्री तक पहुंचना

Intlayer आपकी सामग्री तक पहुंचने के लिए दो API प्रदान करता है:

- **कंपोनेंट-आधारित सिंटैक्स** (अनुशंसित):
  सामग्री को Intlayer नोड के रूप में प्रस्तुत करने के लिए `<myContent />` सिंटैक्स का उपयोग करें। यह [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) और [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) के साथ सहजता से एकीकृत होता है।

- **स्ट्रिंग-आधारित सिंटैक्स**:
  सामग्री को सादे पाठ के रूप में प्रस्तुत करने के लिए `{{ myContent }}` का उपयोग करें, बिना किसी इंटरैक्टिविटी के।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` कॉम्पोज़ेबल द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन एप्लिकेशन की लोकेल सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

भाषाओं के बीच स्विच करने के लिए एक कंपोनेंट बनाएं:

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

// लोकेल जानकारी और setLocale फ़ंक्शन प्राप्त करें
const { locale, availableLocales, setLocale } = useLocale();

// चयनित लोकेल को ट्रैक करने के लिए एक ref
const selectedLocale = ref(locale.value);

// चयन बदलने पर लोकेल अपडेट करें
const changeLocale = () => setLocale(selectedLocale.value);

// चयनित लोकेल को वैश्विक लोकेल के साथ सिंक में रखें
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

फिर, इस कंपोनेंट का उपयोग अपने पेज या लेआउट में करें:

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // संबंधित intlayer घोषणा फ़ाइल बनाएं
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

### (वैकल्पिक) चरण 7: अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें

Nuxt स्वचालित रूप से `nuxt-intlayer` मॉड्यूल का उपयोग करते समय स्थानीयकृत रूटिंग को संभालता है। यह आपके पेज निर्देशिका संरचना के आधार पर प्रत्येक भाषा के लिए स्वचालित रूप से रूट बनाता है।

उदाहरण:

```plaintext
pages/
├── index.vue          → /, /hi, /es
├── about.vue          → /about, /hi/about, /es/about
└── contact/
    └── index.vue      → /contact, /hi/contact, /es/contact
```

स्थानीयकृत पेज बनाने के लिए, बस अपने Vue फाइलों को `pages/` निर्देशिका में बनाएं:

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

`nuxt-intlayer` मॉड्यूल स्वचालित रूप से निम्नलिखित करेगा:

- उपयोगकर्ता की पसंदीदा लोकेल का पता लगाएं
- URL के माध्यम से लोकेल स्विचिंग को संभालें
- उचित `<html lang="">` विशेषता सेट करें
- लोकेल कुकीज़ प्रबंधित करें
- उपयोगकर्ताओं को उपयुक्त स्थानीयकृत URL पर रीडायरेक्ट करें

### (वैकल्पिक) चरण 8: एक स्थानीयकृत लिंक कंपोनेंट बनाना

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन का नेविगेशन वर्तमान लोकेल का सम्मान करता है, आप एक कस्टम `LocalizedLink` कंपोनेंट बना सकते हैं। यह कंपोनेंट स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ प्रीफिक्स करता है।

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

// जांचें कि लिंक बाहरी है या नहीं
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// आंतरिक लिंक के लिए एक स्थानीयकृत href बनाएं
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

फिर इस कंपोनेंट का उपयोग अपने एप्लिकेशन में करें:

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>

    <LocalizedLink to="/hi/contact">
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

### (वैकल्पिक) चरण 9: मेटाडेटा और SEO को संभालें

Nuxt उत्कृष्ट SEO क्षमताएँ प्रदान करता है। आप Intlayer का उपयोग करके स्थानीयकृत मेटाडेटा को संभाल सकते हैं:

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

संबंधित सामग्री घोषणा बनाएँ:

```typescript fileName="pages/about-meta.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      hi: "हमारे बारे में - मेरी कंपनी",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      hi: "हमारी कंपनी और हमारे मिशन के बारे में अधिक जानें",
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
      hi: "हमारे बारे में - मेरी कंपनी",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      hi: "हमारी कंपनी और हमारे मिशन के बारे में अधिक जानें",
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
      hi: "हमारे बारे में - मेरी कंपनी",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      hi: "हमारी कंपनी और हमारे मिशन के बारे में अधिक जानें",
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
        "hi": "हमारे बारे में - मेरी कंपनी",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "hi": "हमारी कंपनी और हमारे मिशन के बारे में अधिक जानें",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### टाइपस्क्रिप्ट कॉन्फ़िगर करें

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

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएँ**।

एक्सटेंशन का उपयोग करने के तरीके पर अधिक जानकारी के लिए, [Intlayer VS कोड एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

---

### आगे बढ़ें

## आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी बना सकते हैं।
