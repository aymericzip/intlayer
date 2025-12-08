---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: अपने Nuxt और Vue ऐप का अनुवाद कैसे करें – i18n गाइड 2025
description: जानें कि अपनी Nuxt और Vue वेबसाइट को बहुभाषी कैसे बनाएं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
youtubeVideo: https://www.youtube.com/watch?v=JDbgHkwjkd4
history:
  - version: 7.3.11
    date: 2025-12-07
    changes: LocaleSwitcher, SEO, मेटाडेटा अपडेट करें
  - version: 5.5.10
    date: 2025-06-29
    changes: इतिहास प्रारंभ करें
---

# Intlayer का उपयोग करके अपनी Nuxt और Vue वेबसाइट का अनुवाद करें | अंतरराष्ट्रीयकरण (i18n)

## सामग्री तालिका

<TOC/>

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कि कंपोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें।**
- **TypeScript समर्थन सुनिश्चित करें** ऑटो-जेनरेटेड प्रकारों के साथ, जिससे ऑटो-कम्प्लीशन और त्रुटि पहचान में सुधार होता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकल डिटेक्शन और स्विचिंग।

---

## Nuxt एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

<Tab defaultTab="video">
  <TabItem label="वीडियो" value="video">
  
<iframe title="अपने Nuxt और Vue ऐप को Intlayer का उपयोग करके कैसे अनुवादित करें? Intlayer की खोज करें" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/JDbgHkwjkd4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="कोड" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो कोडसैंडबॉक्स - Intlayer का उपयोग करके अपने एप्लिकेशन का अंतरराष्ट्रीयकरण कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-nuxt-4-template) देखें।

### चरण 1: Dependencies इंस्टॉल करें

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **vue-intlayer**
  वह पैकेज जो Intlayer को Vue एप्लिकेशन के साथ एकीकृत करता है। यह Vue कंपोनेंट्स के लिए कॉम्पोज़ेबल्स प्रदान करता है।

- **nuxt-intlayer**
  Nuxt मॉड्यूल जो Intlayer को Nuxt एप्लिकेशन के साथ एकीकृत करता है। यह स्वचालित सेटअप, लोकल डिटेक्शन के लिए मिडलवेयर, कुकी प्रबंधन, और URL पुनर्निर्देशन प्रदान करता है।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फाइल बनाएं:

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URLs, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी कंटेंट घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग्स को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, कृपया [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने Nuxt कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने Nuxt कॉन्फ़िगरेशन में intlayer मॉड्यूल जोड़ें:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... आपका मौजूदा Nuxt कॉन्फ़िगरेशन
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` मॉड्यूल स्वचालित रूप से Intlayer को Nuxt के साथ एकीकृत करता है। यह कंटेंट घोषणा निर्माण सेट करता है, विकास मोड में फ़ाइलों की निगरानी करता है, स्थानीय पहचान के लिए मिडलवेयर प्रदान करता है, और स्थानीयकृत रूटिंग का प्रबंधन करता है।

### चरण 4: अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी कंटेंट घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat="typescript"
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

> आपकी कंटेंट घोषणाएँ आपकी एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और कंटेंट घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### चरण 5: अपने कोड में Intlayer का उपयोग करें

अपने Nuxt एप्लिकेशन में `useIntlayer` composable का उपयोग करके अपनी कंटेंट डिक्शनरीज़ तक पहुँचें:

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

#### Intlayer में कंटेंट तक पहुँच

Intlayer आपकी कंटेंट तक पहुँचने के लिए विभिन्न APIs प्रदान करता है:

- **कंपोनेंट-आधारित सिंटैक्स** (सिफारिश की गई):
  `<myContent />`, या `<Component :is="myContent" />` सिंटैक्स का उपयोग करके कंटेंट को Intlayer Node के रूप में रेंडर करें। यह [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) और [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के साथ सहजता से एकीकृत होता है।

- **स्ट्रिंग-आधारित सिंटैक्स**:
  कंटेंट को प्लेन टेक्स्ट के रूप में रेंडर करने के लिए `{{ myContent }}` का उपयोग करें, बिना Visual Editor सपोर्ट के।

- **रॉ HTML सिंटैक्स**:
  कंटेंट को रॉ HTML के रूप में रेंडर करने के लिए `<div v-html="myContent" />` का उपयोग करें, बिना Visual Editor सपोर्ट के।

- **डिस्ट्रक्चरिंग सिंटैक्स**:
  `useIntlayer` कॉम्पोज़ेबल कंटेंट के साथ एक Proxy लौटाता है। इस Proxy को डिस्ट्रक्चर करके कंटेंट तक पहुंचा जा सकता है जबकि रिएक्टिविटी बनी रहती है।
  - `const content = useIntlayer("myContent");` का उपयोग करें और `{{ content.myContent }}` / `<content.myContent />`।
  - या `const { myContent } = useIntlayer("myContent");` का उपयोग करें और `{{ myContent}}` / `<myContent/>` से कंटेंट को डीस्ट्रक्चर करें।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` कॉम्पोज़ेबल द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की लोकल सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

`NuxtLink` का उपयोग करके भाषाओं के बीच स्विच करने के लिए एक कॉम्पोनेंट बनाएं। **लोकल स्विचिंग के लिए बटन के बजाय लिंक का उपयोग करना SEO और पेज की खोज योग्यता के लिए एक सर्वोत्तम अभ्यास है**, क्योंकि यह खोज इंजन को आपकी सभी स्थानीयकृत पृष्ठों के संस्करणों को क्रॉल और इंडेक्स करने की अनुमति देता है:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt स्वचालित रूप से useRoute को इम्पोर्ट करता है
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

> `NuxtLink` का उपयोग उचित `href` गुणों के साथ (जो `getLocalizedUrl` के माध्यम से होता है) यह सुनिश्चित करता है कि सर्च इंजन आपकी पृष्ठों के सभी भाषा संस्करणों को खोज सकें। यह केवल JavaScript-आधारित locale स्विचिंग की तुलना में बेहतर है, जिसे सर्च इंजन क्रॉलर शायद फॉलो न करें।

फिर, अपने `app.vue` को लेआउट्स का उपयोग करने के लिए सेट करें:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### (वैकल्पिक) चरण 6b: नेविगेशन के साथ एक लेआउट बनाएं

Nuxt लेआउट्स आपको अपने पृष्ठों के लिए एक सामान्य संरचना परिभाषित करने की अनुमति देते हैं। एक डिफ़ॉल्ट लेआउट बनाएं जिसमें locale स्विचर और नेविगेशन शामिल हो:

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

    <Links href="/">Home</Links>
    <Links href="/about">About</Links>
  </div>
</template>
```

`Links` कंपोनेंट (नीचे दिखाया गया) यह सुनिश्चित करता है कि आंतरिक नेविगेशन लिंक स्वचालित रूप से स्थानीयकृत हों।

### (वैकल्पिक) चरण 7: अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें

जब आप `nuxt-intlayer` मॉड्यूल का उपयोग करते हैं, तो Nuxt स्वचालित रूप से स्थानीयकृत रूटिंग को संभालता है। यह आपकी pages डायरेक्टरी संरचना के आधार पर प्रत्येक भाषा के लिए स्वचालित रूप से रूट बनाता है।

उदाहरण:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

स्थानीयकृत पेज बनाने के लिए, बस `pages/` डायरेक्टरी में अपने Vue फाइलें बनाएं। यहाँ दो उदाहरण पेज दिए गए हैं:

**होम पेज (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.value,
  meta: [
    {
      name: "description",
      content: content.metaDescription.value,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**अबाउट पेज (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // प्रिमिटिव स्ट्रिंग एक्सेस के लिए .raw का उपयोग करें
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // प्रिमिटिव स्ट्रिंग एक्सेस के लिए .raw का उपयोग करें
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> नोट: `useHead` Nuxt में ऑटो-इम्पोर्ट होता है। आप अपनी जरूरत के अनुसार कंटेंट वैल्यूज़ को `.value` (reactive) या `.raw` (primitive string) के माध्यम से एक्सेस कर सकते हैं।

`nuxt-intlayer` मॉड्यूल स्वचालित रूप से:

- उपयोगकर्ता की पसंदीदा लोकल का पता लगाता है
- URL के माध्यम से लोकल स्विचिंग को संभालता है
- उपयुक्त `<html lang="">` एट्रिब्यूट सेट करता है
- लोकल कुकीज़ का प्रबंधन करता है
- उपयोगकर्ताओं को उपयुक्त स्थानीयकृत URL पर रीडायरेक्ट करता है

### (वैकल्पिक) चरण 8: एक स्थानीयकृत लिंक कंपोनेंट बनाना

अपने एप्लिकेशन की नेविगेशन को वर्तमान locale का सम्मान करने के लिए, आप एक कस्टम `Links` कंपोनेंट बना सकते हैं। यह कंपोनेंट स्वचालित रूप से आंतरिक URLs के साथ वर्तमान भाषा का प्रीफिक्स जोड़ता है, जो **SEO और पेज की खोज योग्यता** के लिए आवश्यक है।

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

// अंतिम पथ की गणना करें
const finalPath = computed(() => {
  // 1. जांचें कि लिंक बाहरी है या नहीं
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. यदि बाहरी है, तो जैसा है वैसा लौटाएं (NuxtLink <a> टैग जनरेशन को संभालता है)
  if (isExternal) return props.href;

  // 3. यदि आंतरिक है, तो URL को स्थानीयकृत करें
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

फिर इस कंपोनेंट का उपयोग अपने एप्लिकेशन में पूरे स्थान पर करें:

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

    <Links href="/">होम</Links>
    <Links href="/about">अबाउट</Links>
  </div>
</template>
```

> `NuxtLink` का उपयोग स्थानीयकृत पथों के साथ करने से, आप सुनिश्चित करते हैं कि:
>
> - सर्च इंजन आपकी पृष्ठों के सभी भाषा संस्करणों को क्रॉल और इंडेक्स कर सकते हैं
> - उपयोगकर्ता सीधे स्थानीयकृत URLs साझा कर सकते हैं
> - ब्राउज़र इतिहास स्थानीयकृत-पूर्वसर्ग वाले URLs के साथ सही ढंग से काम करता है

### (वैकल्पिक) चरण 9: मेटाडेटा और SEO को संभालना

Nuxt `useHead` कॉम्पोज़ेबल (स्वतः-आयातित) के माध्यम से उत्कृष्ट SEO क्षमताएँ प्रदान करता है। आप Intlayer का उपयोग स्थानीयकृत मेटाडेटा को संभालने के लिए कर सकते हैं, `.raw` या `.value` एक्सेसर का उपयोग करके प्रिमिटिव स्ट्रिंग मान प्राप्त करने के लिए:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead Nuxt में स्वतः-आयातित है
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // प्रिमिटिव स्ट्रिंग एक्सेस के लिए .raw का उपयोग करें
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // प्रिमिटिव स्ट्रिंग एक्सेस के लिए .raw का उपयोग करें
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> वैकल्पिक रूप से, आप Vue reactivity के बिना कंटेंट प्राप्त करने के लिए `import { getIntlayer } from "intlayer"` फ़ंक्शन का उपयोग कर सकते हैं।

> **कंटेंट मानों तक पहुँच:**
>
> - प्रिमिटिव स्ट्रिंग मान प्राप्त करने के लिए `.raw` का उपयोग करें (गैर-रिएक्टिव)
> - रिएक्टिव मान प्राप्त करने के लिए `.value` का उपयोग करें
> - विज़ुअल एडिटर समर्थन के लिए `<content.key />` कंपोनेंट सिंटैक्स का उपयोग करें

संबंधित कंटेंट घोषणा बनाएँ:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
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
      hi: "हमारी कंपनी और हमारे मिशन के बारे में अधिक जानें",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      hi: "हमारे बारे में",
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      hi: "हमारे बारे में - मेरी कंपनी",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      hi: "हमारी कंपनी और हमारे मिशन के बारे में अधिक जानें",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      hi: "हमारे बारे में",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
};

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      hi: "हमारे बारे में - मेरी कंपनी",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      hi: "हमारी कंपनी और हमारे मिशन के बारे में अधिक जानें",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      hi: "हमारे बारे में",
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
};

module.exports = aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "hi": "हमारे बारे में - मेरी कंपनी",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "hi": "हमारी कंपनी और हमारे मिशन के बारे में अधिक जानें",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "hi": "हमारे बारे में",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए module augmentation का उपयोग करता है।

![ऑटोकंप्लीशन](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जनरेटेड टाइप्स शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जनरेटेड टाइप्स शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा किया जाए। इससे आप इन्हें अपनी Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा करें
.intlayer
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** स्थापित कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए अधिक विवरण के लिए देखें [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

---

### आगे बढ़ें

आगे बढ़ने के लिए, आप [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपने कंटेंट को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।
