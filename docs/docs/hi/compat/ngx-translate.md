---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "NGX-Translate से Intlayer में माइग्रेट करें"
description: "compat adapter का उपयोग करके अपने Angular एप्लिकेशन को ngx-translate से Intlayer में माइग्रेट करना सीखें।"
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# NGX-Translate से Intlayer में माइग्रेट करें

आपके Angular एप्लिकेशन को `ngx-translate` से Intlayer में माइग्रेट करना compat adapter के साथ आसान है, जो आपको अपने सभी टेम्पलेट्स को फिर से लिखने की आवश्यकता को दरकिनार करने की अनुमति देता है।

## क्या करें

निम्नलिखित को चलाकर शुरुआत करें:

```bash
npx intlayer init
```

यह `intlayer.config.ts` को सेट अप करता है। अपने `TranslateModule.forRoot()` सेटअप को बदलें और import aliases को `@intlayer/ngx-translate` की ओर इंगित करने के लिए उपयुक्त रूप से सेट करें।

## यह हुड के अंदर क्या करता है

`ngx-translate` `TranslateService` (`instant`, `get`, `stream`) को `{{ 'KEY' | translate:params }}` pipe और `[translate]` directive के साथ उपयोग करता है।

हुड के अंदर:

- **Services:** `TranslateService` `getIntlayer` और एक locale observable को wrap करता है, बिल्कुल वही तरीके प्रदान करता है।
- **Pipes & Directives:** Intlayer dictionaries के विरुद्ध सीधे resolve करने के लिए पुनः लागू किए गए हैं।
- **Loaders:** `TranslateHttpLoader` सेटअप को warning stubs में परिवर्तित किया जाता है क्योंकि Intlayer अंतर्निहित रूप से आपके dictionaries को build time पर resolve और bundle करता है (या standard dynamic imports के माध्यम से), HTTP loaders की आवश्यकता को पूरी तरह से समाप्त करता है।
