---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: nuxt-intlayer पैकेज दस्तावेज़ीकरण
description: Intlayer के लिए Nuxt एकीकरण, Nuxt एप्लिकेशन के लिए एक मॉड्यूल प्रदान करता है।
keywords:
  - nuxt-intlayer
  - nuxt
  - अंतरराष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी निर्यातों के लिए एकीकृत दस्तावेज़ीकरण
---

# nuxt-intlayer पैकेज

यह `nuxt-intlayer` पैकेज आपके Nuxt प्रोजेक्ट में Intlayer को एकीकृत करने के लिए एक Nuxt मॉड्यूल प्रदान करता है।

## इंस्टॉलेशन

```bash
npm install nuxt-intlayer
```

## निर्यात

### मॉड्यूल

यह `nuxt-intlayer` पैकेज आपके Nuxt प्रोजेक्ट में Intlayer को एकीकृत करने के लिए एक Nuxt मॉड्यूल प्रदान करता है।

इंपोर्ट:

```tsx
import "nuxt-intlayer";
```

या इसे `nuxt.config.ts` में जोड़ना:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| निर्यात   | प्रकार       | विवरण                                                                 |
| --------- | ------------ | --------------------------------------------------------------------- |
| `default` | `NuxtModule` | डिफ़ॉल्ट निर्यात वह Nuxt मॉड्यूल है जो Intlayer को कॉन्फ़िगर करता है। |
