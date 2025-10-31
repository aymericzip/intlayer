---
createdAt: 2025-03-13
updatedAt: 2025-10-05
title: सिंक JSON प्लगइन
description: Intlayer शब्दकोशों को तृतीय-पक्ष i18n JSON फ़ाइलों (i18next, next-intl, react-intl, vue-i18n, और अन्य) के साथ सिंक्रनाइज़ करें। अपने मौजूदा i18n को बनाए रखें जबकि Intlayer का उपयोग करके अपने संदेशों का प्रबंधन, अनुवाद और परीक्षण करें।
keywords:
  - Intlayer
  - सिंक JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - अनुवाद
slugs:
  - doc
  - plugin
  - sync-json
history:
  - version: 6.1.6
    date: 2025-10-05
    changes: प्रारंभिक सिंक JSON प्लगइन दस्तावेज़ीकरण
---

## सिंक JSON (i18n ब्रिजेस)

अपने मौजूदा i18n स्टैक में एक ऐड-ऑन के रूप में Intlayer का उपयोग करें। यह प्लगइन आपके JSON संदेशों को Intlayer शब्दकोशों के साथ सिंक्रनाइज़ रखता है ताकि आप:

- i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n आदि को बनाए रख सकें।
- अपने ऐप को पुनः संरचित किए बिना Intlayer (CLI, CI, प्रदाता, CMS) के साथ अपने संदेशों का प्रबंधन और अनुवाद कर सकें।
- प्रत्येक इकोसिस्टम को लक्षित करते हुए ट्यूटोरियल और SEO सामग्री वितरित करें, साथ ही JSON प्रबंधन परत के रूप में Intlayer का सुझाव दें।

नोट्स और वर्तमान दायरा:

- CMS के लिए बाहरीकरण अनुवादों और क्लासिक टेक्स्ट के लिए काम करता है।
- अभी तक सम्मिलन, बहुवचन/ICU, या अन्य लाइब्रेरी के उन्नत रनटाइम फीचर्स के लिए समर्थन नहीं है।
- तीसरे पक्ष के i18n आउटपुट के लिए विज़ुअल एडिटर अभी समर्थित नहीं है।

### इस प्लगइन का उपयोग कब करें

- आप पहले से ही एक i18n लाइब्रेरी का उपयोग करते हैं और संदेशों को JSON फ़ाइलों में संग्रहीत करते हैं।
- आप AI-सहायता प्राप्त भराई, CI में परीक्षण, और कंटेंट ऑप्स चाहते हैं बिना अपने रेंडरिंग रनटाइम को बदले।

## स्थापना

```bash
pnpm add -D @intlayer/sync-json-plugin
# या
npm i -D @intlayer/sync-json-plugin
```

## त्वरित शुरुआत

अपने `intlayer.config.ts` में प्लगइन जोड़ें और इसे अपनी मौजूदा JSON संरचना की ओर इंगित करें।

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // अपने वर्तमान JSON फ़ाइलों को Intlayer शब्दकोशों के साथ सिंक में रखें
  plugins: [
    syncJSON({
      // प्रति-लोकल, प्रति-नेमस्पेस लेआउट (जैसे, next-intl, i18next नेमस्पेस के साथ)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

वैकल्पिक: प्रति-लोकल एकल फ़ाइल (i18next/react-intl सेटअप में सामान्य):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### यह कैसे काम करता है

- पढ़ें: प्लगइन आपके `source` बिल्डर से JSON फ़ाइलों को खोजता है और उन्हें Intlayer शब्दकोश के रूप में लोड करता है।
- लिखें: बिल्ड और भराई के बाद, यह स्थानीयकृत JSON को उसी पथों पर वापस लिखता है (फॉर्मेटिंग समस्याओं से बचने के लिए अंतिम नई लाइन के साथ)।
- ऑटो-फिल: प्लगइन प्रत्येक शब्दकोश के लिए एक `autoFill` पथ घोषित करता है। डिफ़ॉल्ट रूप से, `intlayer fill` चलाने पर आपकी JSON फ़ाइलों में केवल गायब अनुवाद अपडेट होते हैं।

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // आवश्यक
  location?: string, // वैकल्पिक लेबल, डिफ़ॉल्ट: "plugin"
  priority?: number, // संघर्ष समाधान के लिए वैकल्पिक प्राथमिकता, डिफ़ॉल्ट: 0
});
```

## कई JSON स्रोत और प्राथमिकता

आप विभिन्न JSON स्रोतों को सिंक्रनाइज़ करने के लिए कई `syncJSON` प्लगइन्स जोड़ सकते हैं। यह तब उपयोगी होता है जब आपके प्रोजेक्ट में कई i18n लाइब्रेरीज़ या विभिन्न JSON संरचनाएँ हों।

### प्राथमिकता प्रणाली

जब कई प्लगइन्स एक ही शब्दकोश कुंजी को लक्षित करते हैं, तो `priority` पैरामीटर यह निर्धारित करता है कि कौन सा प्लगइन प्राथमिकता प्राप्त करेगा:

- उच्च प्राथमिकता संख्या निम्न प्राथमिकता वाले पर जीतती है
- `.content` फ़ाइलों की डिफ़ॉल्ट प्राथमिकता `0` है
- प्लगइन्स की सामग्री फ़ाइलों की डिफ़ॉल्ट प्राथमिकता `-1` है
- समान प्राथमिकता वाले प्लगइन्स को कॉन्फ़िगरेशन में उनके प्रकट होने के क्रम में संसाधित किया जाता है

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // प्राथमिक JSON स्रोत (सबसे उच्च प्राथमिकता)
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // फॉलबैक JSON स्रोत (कम प्राथमिकता)
    syncJSON({
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // लेगेसी JSON स्रोत (सबसे कम प्राथमिकता)
    syncJSON({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### संघर्ष समाधान

जब एक ही अनुवाद कुंजी कई JSON स्रोतों में मौजूद होती है:

1. सबसे उच्च प्राथमिकता वाला प्लगइन अंतिम मान निर्धारित करता है
2. कम प्राथमिकता वाले स्रोत गायब कुंजी के लिए फॉलबैक के रूप में उपयोग किए जाते हैं
3. यह आपको लेगेसी अनुवाद बनाए रखने की अनुमति देता है जबकि आप धीरे-धीरे नए संरचनाओं में माइग्रेट कर रहे होते हैं

## एकीकरण

नीचे सामान्य मैपिंग दी गई हैं। अपने रनटाइम को बिना छुए रखें; केवल प्लगइन जोड़ें।

### i18next

सामान्य फ़ाइल लेआउट: `./public/locales/{locale}/{namespace}.json` या `./locales/{locale}/{namespace}.json`।

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

प्रति-लोकल JSON संदेश (अक्सर `./messages/{locale}.json`) या प्रति-नेमस्पेस।

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

देखें: `docs/hi/intlayer_with_next-intl.md`।

### react-intl

प्रति लोकल एकल JSON सामान्य है:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

प्रति-लोकल या प्रति-नेमस्पेस एकल फ़ाइल हो सकती है:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

सिंक किए गए JSON फ़ाइलों को अन्य `.content` फ़ाइलों के रूप में माना जाएगा। इसका मतलब है कि सभी intlayer कमांड सिंक किए गए JSON फ़ाइलों के लिए उपलब्ध होंगे। जिनमें शामिल हैं:

- `intlayer content test` यह जांचने के लिए कि क्या कोई अनुवाद गायब है
- `intlayer content list` सिंक किए गए JSON फ़ाइलों की सूची बनाने के लिए
- `intlayer content fill` गायब अनुवाद भरने के लिए
- `intlayer content push` सिंक किए गए JSON फ़ाइलों को पुश करने के लिए
- `intlayer content pull` सिंक किए गए JSON फ़ाइलों को पुल करने के लिए

अधिक जानकारी के लिए [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) देखें।

## सीमाएँ (वर्तमान)

- तृतीय-पक्ष लाइब्रेरीज़ को लक्षित करते समय कोई सम्मिलन या बहुवचन/ICU समर्थन नहीं।
- गैर-Intlayer रनटाइम के लिए विज़ुअल एडिटर अभी उपलब्ध नहीं है।
- केवल JSON सिंक्रनाइज़ेशन; गैर-JSON कैटलॉग प्रारूप समर्थित नहीं हैं।

## यह क्यों महत्वपूर्ण है

- हम स्थापित i18n समाधानों की सिफारिश कर सकते हैं और Intlayer को एक ऐड-ऑन के रूप में स्थिति दे सकते हैं।
- हम उनके SEO/कीवर्ड का उपयोग ट्यूटोरियल के साथ करते हैं जो अंत में JSON प्रबंधन के लिए Intlayer सुझाते हैं।
- यह लक्षित दर्शकों का विस्तार करता है, "नए प्रोजेक्ट्स" से लेकर "कोई भी टीम जो पहले से i18n का उपयोग कर रही है" तक।
