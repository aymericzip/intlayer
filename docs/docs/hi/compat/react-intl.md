---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "React Intl से Intlayer में माइग्रेट करें"
description: "सीखें कि कैसे compat adapter का उपयोग करके अपने React एप्लिकेशन को react-intl से Intlayer में माइग्रेट करें।"
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# React Intl से Intlayer में माइग्रेट करें

यदि आपकी React एप्लिकेशन `react-intl` (FormatJS) का उपयोग करती है, तो Intlayer में संक्रमण करना आसान है। हमारी compat layer निर्बाध रूप से ICU MessageFormat और सभी मौजूदा `Formatted*` घटकों को संभालता है।

## क्या करें

अपने प्रोजेक्ट में इनिशियलाइजेशन कमांड चलाकर शुरू करें:

```bash
npx intlayer init
```

फिर, अपने कॉन्फ़िगरेशन में Intlayer Vite या Next.js प्लगइन सेट अप करें। यह प्लगइन `react-intl` imports को `@intlayer/react-intl` में रीडायरेक्ट करने के लिए बिल्ड-टाइम aliases इंजेक्ट करता है।

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## यह हुड के नीचे क्या करता है

bundler plugin `react-intl` को `@intlayer/react-intl` में alias करता है। बड़ी JSON फाइलों को मैन्युअल रूप से पार्स करने और अपने ऐप को `IntlProvider` में लपेटने के बजाय, Intlayer plugin स्टैटिकली keys को निकालता है और runtime पर Intlayer dictionaries का उपयोग करता है।

हुड के नीचे:

- **ICU MessageFormat:** Intlayer `resolveMessage(..., 'icu')` resolver का उपयोग करता है जो ICU pluralization, selection, date/number formatting, और rich text tags को नेटिवली पूरी तरह support करता है।
- **Method & JSX callers:** `intl.formatMessage({ id: 'a.b' })` और `<FormattedMessage id="a.b">` को Intlayer compiler plugins (`@intlayer/babel` / `@intlayer/swc`) द्वारा identify किया जाता है, flat dotted keys को convert करके ताकि पहला segment सही तरीके से Intlayer dictionary key को resolve करे।
- **Formatters:** `<FormattedNumber>`, `<FormattedDate>`, आदि `Intl` का उपयोग करके native `core/formatters` में bridge करते हैं।
