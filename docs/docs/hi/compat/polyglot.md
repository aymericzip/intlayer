---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Polyglot.js से Intlayer में माइग्रेट करें"
description: "Compat adapter का उपयोग करके Polyglot.js से Intlayer में माइग्रेट करने का तरीका जानें।"
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Polyglot.js से Intlayer में माइग्रेट करें

यदि आप Airbnb के Polyglot.js का उपयोग कर रहे हैं, तो compat layer का उपयोग करके Intlayer में माइग्रेशन बेहद सीधा है।

## क्या करना है

अपने प्रोजेक्ट में बस इनिशियलाइजेशन कमांड चलाएं:

```bash
npx intlayer init
```

यह `intlayer.config.ts` जनरेट करता है। फिर आप bundler plugin alias का उपयोग करके Polyglot imports को `@intlayer/polyglot` पर पारदर्शी रूप से रीडायरेक्ट कर सकते हैं।

## यह हुड के तहत क्या करता है

Polyglot.js syntax आमतौर पर `polyglot.t('key', {name})` पर निर्भर करता है जिसमें `%{name}` इंटरपोलेशन और `smart_count` plurals `"singular |||| plural"` से अलग होते हैं।

हुड के तहत:

- **Interpolation:** compat layer नेटिवली `%{var}` placeholders को हैंडल करता है।
- **Plurals:** स्ट्रिंग को `||||` पर विभाजित किया जाता है और सक्रिय locale के अनुसार native `Intl.PluralRules` के विरुद्ध मूल्यांकन किया जाता है, जो Polyglot के स्वयं के bucket order को प्रति locale के साथ प्रतिबिंबित करता है।
- **Dictionaries:** आप `new Polyglot()` को विशाल JSON कॉन्फ़िगरेशन प्रदान करने की आवश्यकता को दरकिनार करते हैं – Intlayer dictionaries को dynamically हैंडल करता है और उन्हें स्वचालित रूप से prune करता है।
