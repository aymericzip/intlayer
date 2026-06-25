---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Next Translate से Intlayer में माइग्रेट करें"
description: "जानें कि compat adapter का उपयोग करके अपने Next.js एप्लिकेशन को next-translate से Intlayer में कैसे माइग्रेट करें।"
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Next Translate से Intlayer में माइग्रेट करें

`next-translate` से Intlayer में माइग्रेट करना एक लगभग drop-in replacement है जो आपके मौजूदा syntax और tags को बरकरार रखता है।

## क्या करें

अपने प्रोजेक्ट में Intlayer को initialize करें:

```bash
npx intlayer init
```

CLI आपके configuration को scaffold करेगा। फिर आप अपने `next.config.ts` में Intlayer plugin को apply कर सकते हैं, जो build-time subpath aliases को `next-translate/useTranslation` से `@intlayer/next-translate` में map करता है।

## यह हुड के अंदर क्या करता है

`next-translate` hooks जैसे `useTranslation('ns')`, `t('ns:key.path')`, और `<Trans>` component प्रदान करता है।

हुड के अंदर:

- **Interpolation & Plurals:** यह `react-i18next` adapter behavior पर निकटता से निर्भर करता है। `{{var}}` placeholders और pluralization को `key_0`, `key_one`, और `key_other` जैसे suffixes से mapped किया जाता है।
- **`<Trans>` component:** HTML-ish tag parsing के लिए सीधे समर्थित है साथ ही एक array-based `components` prop के साथ।
- **Namespaces:** Subpath aliasing सुनिश्चित करता है कि आपका `useTranslation` बिना मैनुअल संशोधन के सही internal dictionary namespaces को reference करता है।
