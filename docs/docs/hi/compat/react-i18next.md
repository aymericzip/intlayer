---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "react-i18next से Intlayer में माइग्रेट करें"
description: "Compat adapter का उपयोग करके अपने React एप्लिकेशन को react-i18next से Intlayer में माइग्रेट करना सीखें।"
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# react-i18next से Intlayer में माइग्रेट करें

एक संपूर्ण और विस्तृत चरण-दर-चरण ट्यूटोरियल के लिए, कृपया हमारी पूर्ण [react-i18next माइग्रेशन गाइड](../migration_from_react-i18next_to_intlayer.md) देखें।

Intlayer के compat adapter का उपयोग करके आप अपने स्रोत कोड आयातों में कोई बदलाव किए बिना `react-i18next` से माइग्रेट कर सकते हैं।

## क्या करना है

प्रोजेक्ट को शुरू करने के लिए, निम्नलिखित चलाएँ:

```bash
npx intlayer init
```

शुरुआत के दौरान, Intlayer `@intlayer/react-i18next` को इंस्टॉल करेगा और `intlayer.config.ts` बनाएगा। आपके bundler (जैसे Vite) में, Intlayer plugin लागू करें:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## यह हुड के अंदर क्या करता है

`reactI18nextVitePlugin` कोर `vite-intlayer` प्लगइन को रैप करता है और `react-i18next` और `i18next` के लिए resolve aliases को inject करता है, जिन्हें `@intlayer/react-i18next` और `@intlayer/i18next` में रीडायरेक्ट किया जाता है।

हुड के अंदर:

- **`useTranslation` & `withTranslation`:** Intlayer के native hooks का उपयोग करने के लिए फिर से लिखा गया है, जो आपके डिक्शनरी keys के लिए स्वचालित TypeScript completion देता है। यह namespaces को seamlessly support करता है (जैसे `t('namespace:key')`).
- **Plurals & Context:** i18next के suffix-based pluralization (`key_one`, `key_other`) को native `Intl.PluralRules` और context suffixes (`key_male`) का उपयोग करके हैंडल करता है।
- **`<Trans>` Component:** `components` prop, object और array forms, और numbered tags `<1>...</1>` को support करने के लिए फिर से implement किया गया है जो सीधे आपके React nodes को map करते हैं।
- **`i18n` instance:** Intlayer से keys को सीधे resolve करता है बिना बड़ी JSON files को fetch किए, जिससे significantly lower bundle sizes प्राप्त होते हैं।
