---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Svelte I18n से Intlayer में माइग्रेट करें"
description: "compat adapter का उपयोग करके अपने Svelte एप्लिकेशन को svelte-i18n से Intlayer में माइग्रेट करना सीखें।"
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Svelte I18n से Intlayer में माइग्रेट करें

अपने Svelte एप्लिकेशन को `svelte-i18n` से Intlayer में माइग्रेट करना compat adapter का उपयोग करके बस एक पल में संभव है।

## क्या करें

अपने प्रोजेक्ट में बस निम्नलिखित initialization कमांड चलाएं:

```bash
npx intlayer init
```

यह `intlayer.config.ts` generate करता है। सुनिश्चित करें कि आपके SvelteKit / Vite plugins को Intlayer के alias plugin से wrap किया गया है ताकि `svelte-i18n` को `@intlayer/svelte-i18n` में seamlessly map किया जा सके।

## यह हुड के तहत क्या करता है

Svelte-i18n भारी उपयोग किए जाने वाले stores (`$_`, `$t`, `$format`, आदि) और ICU MessageFormat पर निर्भर करता है।

हुड के तहत:

- **Stores:** Intlayer, `svelte-i18n` stores को proxy करता है। `$_` वर्तमान locale का एक derived store बन जाता है जो एक Intlayer resolver लौटाता है।
- **Keys:** आपकी flat keys (जैसे `$_('home.title')`) का मूल्यांकन इस तरह किया जाता है कि पहला path segment Intlayer dictionary का प्रतिनिधित्व करता है।
- **ICU Syntax:** पूरी तरह shared ICU resolver (`intl-messageformat` समतुल्य parsing) द्वारा संभाला जाता है।
- **Formatters:** `$date`, `$time`, `$number` कॉल Intlayer के native core formatters को सुरक्षित रूप से रीडायरेक्ट करते हैं।
- **Babel/SWC Analysis:** Intlayer analyzer आपकी `.svelte` source files में Svelte store callers (`$_`) को compilation से पहले पढ़ता है ताकि स्वचालित रूप से प्रासंगिक dictionary chunks बनाए जा सकें।
