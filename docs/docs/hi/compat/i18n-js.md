---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "i18n-js से Intlayer में माइग्रेट करें"
description: "compat adapter का उपयोग करके अपने application को i18n-js से Intlayer में माइग्रेट करने का तरीका जानें।"
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# i18n-js से Intlayer में माइग्रेट करें

`i18n-js` लाइब्रेरी से Intlayer में ट्रांज़िशन एक अत्यधिक अनुकूलित माइग्रेशन है जो बड़े अनुवाद कॉन्फ़िगरेशन को Intlayer की संरचित फ़ाइल resolution प्रणाली में स्थानांतरित करने के लिए डिज़ाइन किया गया है।

## क्या करना है

अपने repository में निम्नलिखित setup command को execute करें:

```bash
npx intlayer init
```

`intlayer.config.ts` तैयार होने के बाद, आप अपने bundler configuration में Intlayer's alias को जोड़ सकते हैं ताकि `i18n-js` के किसी भी imports को compat package `@intlayer/i18n-js` को target करें।

## यह पर्दे के पीछे क्या करता है

`i18n-js` `i18n.t('scope.key', {name})` जैसी expressions के माध्यम से namespaces तक पहुंचता है साथ ही locale fallbacks और विशिष्ट plural mappings के साथ।

पर्दे के पीछे:

- **Interpolation:** compat adapter आसानी से `%{name}` mappings को आपके लक्षित runtime dictionary value में parse करता है।
- **Pluralization:** `one/other` subkeys को replace करता है और उन्हें Intlayer के शक्तिशाली अंतर्निहित plural mechanisms (`Intl.PluralRules`) के विरुद्ध map करता है, जो manual mappings को abstract करता है।
- **Locales:** bootstrap पर monolithic language payloads को load करने के बजाय, dictionaries को वर्तमान context setup के आधार पर native Intlayer configuration के माध्यम से optimally serve किया जाता है।
