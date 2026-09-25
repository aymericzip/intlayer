---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Intlayer Compat Adapters"
description: "अपने मौजूदा i18n समाधान को Intlayer में compat adapters का उपयोग करके बिना किसी घर्षण के माइग्रेट करें।"
keywords:
  - compat
  - migration
  - internationalization
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Intlayer Compat Adapters

एक बड़े एप्लिकेशन को नई internationalization लाइब्रेरी में माइग्रेट करना चुनौतीपूर्ण हो सकता है। इस transition को आसान बनाने के लिए, Intlayer ecosystem में सबसे लोकप्रिय i18n लाइब्रेरीज के लिए **compat adapters** प्रदान करता है।

ये adapter packages आपकी मौजूदा i18n लाइब्रेरीज के **बिल्कुल समान public API** को expose करते हैं, लेकिन runtime पर सभी translation कार्य को Intlayer को delegate करते हैं।

## यह कैसे काम करता है

जब आप एक compat adapter का उपयोग करते हैं, तो आपको अपने application के imports को फिर से लिखने या अपने translation hooks और components के उपयोग को बदलने की आवश्यकता नहीं होती है। इसके बजाय, Intlayer के bundler plugins स्वचालित रूप से आपके मौजूदा imports को Intlayer compat packages में alias करते हैं।

उदाहरण के लिए, एक developer `import { useTranslation } from 'react-i18next'` को `import { useTranslation } from '@intlayer/react-i18next'` से बदलता है (bundler plugin के माध्यम से स्वचालित रूप से किया जाता है), और app Intlayer dictionaries से serve किए जाने वाले translations के साथ काम करता रहता है। Keys को आपकी Intlayer dictionaries के विरुद्ध typed भी किया जाता है!

## उपलब्ध Compat Adapters

अपनी मौजूदा लाइब्रेरी को नीचे चुनें और देखें कि seamlessly माइग्रेट कैसे करें:

- [Vue I18n](./vue-i18n.md)
- [Transloco](./transloco.md)
- [React Intl](./react-intl.md)
- [Svelte I18n](./svelte-i18n.md)
- [React i18next](./react-i18next.md)
- [Polyglot.js](./polyglot.md)
- [NuxtJS I18n](./nuxtjs-i18n.md)
- [NGX Translate](./ngx-translate.md)
- [Next Translate](./next-translate.md)
- [Next Intl](./next-intl.md)
- [Next i18next](./next-i18next.md)
- [i18next](./i18next.md)
- [Lingui](./lingui.md)
- [I18n-js](./i18n-js.md)
