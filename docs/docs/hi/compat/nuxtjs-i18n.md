---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "NuxtJS I18n से Intlayer में माइग्रेट करें"
description: "सीखें कि अपने Nuxt.js एप्लिकेशन को @nuxtjs/i18n से Intlayer में compat adapter का उपयोग करके कैसे माइग्रेट करें।"
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# NuxtJS I18n से Intlayer में माइग्रेट करें

अपने Nuxt एप्लिकेशन को `@nuxtjs/i18n` से Intlayer में माइग्रेट करना Nuxt adapter मॉड्यूल का उपयोग करके एक सहज प्रक्रिया है।

## क्या करना है

प्रोजेक्ट को इनिशियलाइज़ करने के लिए, यह चलाएं:

```bash
npx intlayer init
```

यह `intlayer.config.ts` को सेट अप करेगा। फिर, अपनी `nuxt.config.ts` modules array में Intlayer Nuxt module (जैसे `@intlayer/nuxt-i18n`) जोड़ें। यह आपके application के लिए compat configuration को automatically apply करता है।

## यह हुड के अंदर क्या करता है

`@nuxtjs/i18n` `vue-i18n` को wrap करता है जबकि Nuxt-specific routing composables (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`) प्रदान करता है।

हुड के अंदर:

- **Translations:** सभी string translation कार्यों के लिए `@intlayer/vue-i18n` compat layer पर नेटिवली निर्भर करता है (`vue-i18n` formats, pipe plurals, और reactivity को पूरी तरह से support करता है)।
- **Routing:** Intlayer के localized URL helpers का उपयोग करके routing composables को mirror करता है।
- **Configuration:** आपके `intlayer.config.ts` से सीधे `availableLocales` और default settings को पढ़ता है ताकि Nuxt pages को स्वचालित रूप से coordinate किया जा सके।
