---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: क्या 2026 में vue-i18n पुराना हो चुका है?
description: vue-i18n एक दशक से Vue और Nuxt का मानक रहा है। लेकिन हमारे बेंचमार्क में यह वेब पर सबसे भारी i18n रनटाइम साबित हुआ। इसके कारणों का विश्लेषण।
keywords:
  - vue-i18n
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - i18n
  - Vue
  - Nuxt
  - बंडल साइज
  - ब्लॉग
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# क्या 2026 में vue-i18n पुराना हो चुका है?

Vue कम्युनिटी में `vue-i18n` जितनी व्यापक स्वीकृति शायद ही किसी अन्य लाइब्रेरी को मिली हो। Vue 2 के दौर से Kazupon द्वारा संवर्धित, यह `@nuxtjs/i18n` का आधार है और बहुभाषी Vue एप्लिकेशन्स का स्वाभाविक विकल्प रहा है।

इसके बावजूद, 2026 के बेंचमार्क परीक्षणों ने एक अप्रत्याशित तथ्य उजागर किया: **परीक्षण किए गए सभी मुख्य फ्रंटएंड फ्रेमवर्क्स में `vue-i18n` सबसे भारी लोकलाइजेशन रनटाइम साबित हुआ।**

Vite + Vue पर आधारित केवल 31.5 KB के बुनियादी प्रोजेक्ट में `vue-i18n` जोड़ने पर, प्रति पेज औसत जावास्क्रिप्ट का भार बढ़कर **136.4 KB** हो गया, जो मूल आकार से चार गुना अधिक है।

गति और सरलता के लिए जाने जाने वाले फ्रेमवर्क में i18n टूल इतना भारी कैसे हो गया? और क्या इसका पारंपरिक रनटाइम मॉडल आज भी प्रासंगिक है?

<TOC/>

## मुख्य बिंदु

**परीक्षण में सबसे भारी रनटाइम:**

कोई भी ट्रांसलेशन जोड़ने से पहले ही इसका आकार **24.3 KB gzipped (83.2 KB minified)** दर्ज किया गया, जो `intlayer` के 2.7 KB रनटाइम से लगभग **9 गुना अधिक** है।

**पेज के आकार में 330% की वृद्धि:**

`vue-i18n` ने 31.5 KB के बेसिक पेज को 136.4 KB तक बढ़ा दिया। इसके विपरीत Intlayer केवल 59.3 KB पर रहा, जिससे **56% कम डेटा भार** मिला।

**ब्राउज़र में शामिल कंपाइलर:**

यदि बंडलर में विशेष एलियास (alias) न सेट किए जाएं, तो `vue-i18n` टेक्स्ट को रनटाइम पर प्रोसेस करने के लिए पूरा मैसेज कंपाइलर ब्राउज़र को भेज देता है।

**रखरखाव की गति:**

पिछले वर्ष के दौरान `vue-i18n` में लगभग 259 कमिट हुए, जो मुख्य रूप से बग्स और Vue के नए वर्जन्स के अनुकूलन तक सीमित रहे।

**आधुनिक टूल्स की कमी:**

ऑफिशियल लैंग्वेज सर्वर (LSP), एआई के लिए एमसीपी सर्वर या सीएलआई-आधारित ऑटोमेटेड ट्रांसलेशन फ्लो का अभाव है।

## मेंटेनेंस बनाम आधुनिक टूल्स

| रिपॉजिटरी             | स्टार्स                                                                                                                                                | कुल कमिट्स                                                                                                                                                          | कमिट्स / वर्ष                                                                                                                                                      | अंतिम कमिट                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

पिछले 12 महीनों के आंकड़े:

- `intlify/vue-i18n`: **259 कमिट्स** (Vue 3 और Nuxt का नियमित रखरखाव)।
- `aymericzip/intlayer`: **4,343 कमिट्स** (कंपाइलर ऑप्टिमाइजेशन, LSP टूल्स और एआई इंटीग्रेशन पर सक्रिय विकास)।

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

एक पुरानी लाइब्रेरी स्थिरता तो देती है, लेकिन आधुनिक फ्रंटएंड अब बिल्ड-टाइम AST ट्रांसफॉर्मेशन, डेड-कोड रिमूवल और एआई ऑटोमेशन पर आधारित है। केवल रनटाइम पर चलने वाली लाइब्रेरी इन आधुनिक तकनीकों को सहजता से नहीं अपना पाती।

## Vite + Vue परफॉर्मेंस टेस्ट

Vite और Vue 3 के साथ 10 पेजों और 10 भाषाओं वाले एप्लिकेशन पर मापा गया:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> वास्तविक ब्राउज़रों में प्रोडक्शन gzip कंप्रेशन के साथ परीक्षण किया गया। पूर्ण विवरण [Vue बेंचमार्क दस्तावेज़](https://intlayer.org/hi/doc/benchmark/vue) में देखें।

### शुरुआती लाइब्रेरी ओवरहेड

ट्रांसलेशन फाइल्स लोड होने से पहले का भार:

| लाइब्रेरी         | Gzipped    | Minified   |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB    |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB** |

`vue-i18n` का रनटाइम इंजन ही **24.3 KB (gzip)** स्थान घेरता है, जो लगभग Vue के कोर आकार के बराबर है। जबकि Intlayer केवल **2.7 KB** जोड़ता है।

### पेज का आकार और डेटा लीकेज

| कॉन्फ़िगरेशन    | औसत पेज JS (gz) | भाषा लीकेज | अन्य पेज लीकेज | औसत कंपोनेंट (gz) |
| --------------- | --------------- | ---------- | -------------- | ----------------- |
| बेस (बिना i18n) | 31.5 KB         | 0.0%       | 90.0%          | 0.9 KB            |
| `vue-i18n`      | **136.4 KB**    | 50.2%      | 90.0%          | 196.0 KB          |
| Intlayer        | **59.3 KB**     | 51.1%      | **0.0%**       | **6.5 KB**        |

### प्रमुख निष्कर्ष

**भारी आनुपातिक वृद्धि:**

चूंकि Vue का बेस फ्रेमवर्क बहुत हल्का है (~31 KB), `vue-i18n` जोड़ने से पेज का वजन चार गुना से भी अधिक बढ़ जाता है।

**अन्य पेजों का डेटा लीकेज:**

डिफ़ॉल्ट रूप से किसी रूट पर भेजे जाने वाले **90% ट्रांसलेशंस** अन्य पेजों से संबंधित होते हैं। Intlayer इस अनावश्यक डेटा को पूरी तरह हटाकर **0.0%** कर देता है।

**कंपोनेंट्स का असामान्य आकार:**

डिक्शनरीज़ की बार-बार कॉपी होने से `vue-i18n` में लोकली-स्कोप्ड कंपोनेंट्स औसतन 196 KB तक पहुंच गए, जबकि Intlayer में यह सिर्फ **6.5 KB** रहा।

## vue-i18n भारी क्यों है?

### ब्राउज़र में भेजा जाने वाला AST कंपाइलर

`vue-i18n` में अपना मैसेज फॉर्मेट कंपाइलर शामिल होता है। प्लूरल रूल्स और वैरिएबल इंटरपोलेशन रनटाइम के दौरान सीधे ब्राउज़र में AST में बदले जाते हैं।

इससे बचने के लिए बंडलर में `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` के लिए एलियास सेट करना और `@intlify/unplugin-vue-i18n` से प्री-कंपाइल करना अनिवार्य होता है, जिसे कई प्रोजेक्ट्स छोड़ देते हैं।

### अखंड (Monolithic) फीचर स्ट्रक्चर

`vue-i18n` में डेट और नंबर फॉर्मेटर्स, लिंक्ड मैसेजेस, पुराने Options API सपोर्ट ब्रिज (`$t`, `v-t`) और रिएक्टिव प्रॉक्सी सब कुछ शामिल हैं। यदि आपको `<script setup>` में सिर्फ सामान्य टेक्स्ट दिखाना हो, तो भी पूरा इंजन लोड होता है।

### डायनामिक कीज़ ट्री-शेकिंग को रोकती हैं

चूंकि `"home.hero.title"` का हल रनटाइम पर होता है, कंपाइलर यह नहीं जान सकते कि कौन से टेक्स्ट इस्तेमाल हो रहे हैं। अप्रयुक्त ट्रांसलेशन भी कोड में बने रहते हैं।

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

[Intlayer कंपाइलर](https://intlayer.org/hi/doc/compiler) सटीक उपयोग का विश्लेषण करता है और क्लाइंट फाइल्स बनाने से पहले अप्रयुक्त डेटा को हटा देता है। अधिक जानकारी के लिए [बंडल ऑप्टिमाइजेशन](https://intlayer.org/hi/doc/concept/bundle-optimization) देखें।

## डेवलपर अनुभव (DX) की तुलना

### अलग फोल्डर्स बनाम को-लोकेशन

`vue-i18n` में अनुवाद दूर स्थित `locales/` डायरेक्टरी में रखे जाते हैं। Intlayer कंटेंट फाइलों को सीधे कंपोनेंट्स के साथ रखने की सुविधा देता है:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/hi.json"
{
  "hero": {
    "title": "हर भाषा में उत्पाद लॉन्च करें"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      hi: "हर भाषा में उत्पाद लॉन्च करें",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

`Hero.vue` को हटाने या रीनेम करने पर संबंधित कंटेंट फाइल भी स्वतः सिंक हो जाती है।

### कोड सजेशन्स बनाम सख्त पूर्णता की गारंटी

`DefineLocaleMessage` बेस स्कीमा के आधार पर ऑटो-कंप्लीशन देता है। लेकिन यह सभी भाषाओं की पूर्णता सुनिश्चित नहीं करता। `hi.json` से की गायब होने पर भी टाइपस्क्रिप्ट बिल्ड नहीं रोकेगा।

Intlayer में डिक्शनरीज़ की सख्त जांच होती है। [`strictMode`](https://intlayer.org/hi/doc/concept/configuration) चालू करने पर किसी भी भाषा में अनुवाद छूटने पर तुरंत बिल्ड एरर आ जाता है।

### एडिटर और एआई टूल्स

| फीचर                      | `vue-i18n`            | Intlayer                                                              |
| ------------------------- | --------------------- | --------------------------------------------------------------------- |
| **VS Code एक्सटेंशन**     | कम्युनिटी (i18n Ally) | ✅ [ऑफिशियल एक्सटेंशन](https://intlayer.org/hi/doc/vs-code-extension) |
| **Language Server (LSP)** | ❌ नहीं है            | ✅ [समर्पित LSP](https://intlayer.org/hi/doc/lsp)                     |
| **AI के लिए MCP सर्वर**   | ❌ नहीं है            | ✅ [इनबिल्ट MCP सर्वर](https://intlayer.org/hi/doc/mcp-server)        |
| **एजेंट स्किल्स**         | ❌ नहीं है            | ✅ [स्वायत्त स्किल्स](https://intlayer.org/hi/doc/agent_skills)       |
| **विजुअल सीएमएस**         | ❌ नहीं है            | ✅ [मुफ्त और ओपन सोर्स](https://intlayer.org/hi/doc/concept/editor)   |

## ट्रांसलेशन वर्कफ़्लो

`vue-i18n` में इनबिल्ट ट्रांसलेशन कमांड्स नहीं हैं। आमतौर पर फाइल्स को Crowdin या Phrase जैसे बाहरी प्लेटफॉर्म्स पर एक्सपोर्ट किया जाता है।

Intlayer ये सभी सुविधाएं सीधे प्रदान करता है:

**लोकल एआई ऑटो-फिल (`intlayer fill`):**

अपनी OpenAI, Anthropic, Mistral या Gemini API कीज के साथ छूटे हुए टेक्स्ट्स को स्वतः पूरा करें।

**सेल्फ-होस्टेड विजुअल सीएमएस:**

[Intlayer CMS](https://intlayer.org/hi/doc/concept/cms) के जरिए गैर-तकनीकी सदस्य सीधे वेब यूआई में टेक्स्ट एडिट करके सीधे गिट में कमिट कर सकते हैं।

**ओपन सोर्स लाइसेंस:**

सभी टूल्स Apache 2.0 लाइसेंस के तहत पूरी तरह स्वतंत्र रूप से उपलब्ध हैं।

## vue-i18n किन परिस्थितियों में आज भी सही है?

<AccordionGroup>
<Accordion header="चल रहे बड़े Nuxt 2/3 प्रोजेक्ट्स">

यदि आपका रूटिंग आर्किटेक्चर `@nuxtjs/i18n` से गहराई से जुड़ा है, तो पूरे सिस्टम को बदलना हमेशा व्यावहारिक नहीं होता।

</Accordion>
<Accordion header="विशिष्ट ICU आवश्यकताएं">

यदि आप जटिल नेस्टेड मैसेजेस या विशेष डेटा फॉर्मेटिंग का बड़े पैमाने पर इस्तेमाल कर रहे हैं।

</Accordion>
<Accordion header="छोटे व्यक्तिगत प्रोजेक्ट्स">

यदि बंडल साइज आपके उपयोग में कोई महत्वपूर्ण बाधा नहीं बनता।

</Accordion>
</AccordionGroup>

## अपने मौजूदा vue-i18n सेटअप को कैसे बेहतर बनाएं?

Intlayer ड्रॉप-इन कम्पैटिबिलिटी पैकेज प्रदान करता है जो `vue-i18n` और `@nuxtjs/i18n` के सटीक फंक्शन सिग्नेचर (`useI18n`, `$t`, `<i18n-t>`) को पूरी तरह बनाए रखता है। कंपाइलर-चालित हल्की संरचना का लाभ उठाने के लिए आपको अपने टेम्पलेट्स या कंपोज़ेबल को फिर से लिखने की आवश्यकता नहीं है।

सेटअप केवल एक कमांड से पूरा हो जाता है:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

यह इंटरैक्टिव सीएलआई स्वतः निम्नलिखित कार्य करता है:

1. `@intlayer/vue-i18n` या `@intlayer/nuxt-i18n` कम्पैटिबिलिटी पैकेज इंस्टॉल करता है।
2. Vite या Nuxt बंडलर एलियास को कॉन्फ़िगर करता है ताकि आपके मौजूदा इंपोर्ट्स और टेम्पलेट टैग सीधे Intlayer पर मैप हो जाएं, जिससे `vue-i18n` को `package.json` से सुरक्षित रूप से हटाया जा सके।
3. एडिटर में तुरंत लैंग्वेज सर्वर (LSP) डायग्नोस्टिक्स सक्षम करता है, क्लाइंट बंडल से 24 KB के रनटाइम AST पार्सर को हटाता है, और बिना किसी बड़े रिफैक्टरिंग के लोकल एआई ट्रांसलेशन फ्लो को सक्रिय करता है।

विस्तृत जानकारी के लिए हमारे विशेष गाइड्स देखें:

- **सीधी अनुकूलता:** [`vue-i18n` कम्पैटिबिलिटी लेयर](https://intlayer.org/hi/doc/compatibility/vue-i18n) या [`@nuxtjs/i18n`](https://intlayer.org/hi/doc/compatibility/nuxtjs-i18n) का उपयोग करके अपने मौजूदा टेम्पलेट्स को बनाए रखें।
- **स्टेप-बाय-स्टेप माइग्रेशन:** JSON फाइल्स को स्ट्रक्चर्ड डिक्शनरीज में बदलने के लिए हमारे गाइड्स देखें: [vue-i18n से](https://intlayer.org/hi/doc/migration/vue-i18n) या [@nuxtjs/i18n से](https://intlayer.org/hi/doc/migration/nuxtjs-i18n)।
- **हाइब्रिड तरीका:** रनटाइम के रूप में `vue-i18n` को बनाए रखते हुए, [Intlayer को vue-i18n के साथ इस्तेमाल करें](https://intlayer.org/hi/blog/intlayer-with-vue-i18n) ताकि आपको सख्त टाइप सुरक्षा और लोकल एआई ट्रांसलेशन मिल सके।

मुफ्त [i18n SEO स्कैनर](https://intlayer.org/i18n-seo-scanner) से अपनी साइट के बंडल साइज और कंटेंट लीकेज की जांच करें:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## संबंधित लेख

- [Vue & Vite i18n बेंचमार्क: विस्तृत विश्लेषण](https://intlayer.org/hi/doc/benchmark/vue)
- [vue-i18n बनाम Intlayer तुलनात्मक समीक्षा](https://intlayer.org/hi/blog/vue-i18n-vs-intlayer)
- [क्या 2026 में next-intl पुराना हो चुका है?](https://intlayer.org/hi/blog/is-next-intl-outdated)
- [कंपाइलर-आधारित बनाम डिक्लेरेटिव अंतर्राष्ट्रीयकरण](https://intlayer.org/hi/blog/compiler-vs-declarative-i18n)
