---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "next-i18next से Intlayer में माइग्रेट करें"
description: "compat adapter का उपयोग करके अपने Next.js एप्लिकेशन को next-i18next से Intlayer में माइग्रेट करना सीखें।"
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# next-i18next से Intlayer में माइग्रेट करें

एक संपूर्ण और विस्तृत चरण-दर-चरण ट्यूटोरियल के लिए, कृपया हमारी पूरी [next-i18next माइग्रेशन गाइड](../migration_from_next-i18next_to_intlayer.md) देखें।

Intlayer सभी Next.js Pages Router और App Router कार्यान्वयन को पारदर्शी रूप से संभालता है। एडेप्टर का उपयोग करके आप अपने `next-i18next` कार्यान्वयन को शून्य कोड पुनर्लेखन के साथ माइग्रेट कर सकते हैं।

## क्या करना है

शुरू करने के लिए, यह चलाएं:

```bash
npx intlayer init
```

यह आवश्यक Intlayer सेटअप फ़ाइल बनाता है। Intlayer को पर्दे के पीछे स्वैप करने के लिए, अपनी `next.config.ts` को अपडेट करें:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## यह हुड के अंतर्गत क्या करता है

`createNextI18nPlugin` Next.js के मूल व्यवहार को `next-intlayer` प्लगइन के साथ संयोजित करता है, `next-i18next`, `react-i18next`, और `i18next` के लिए सभी आवश्यक Webpack/Turbopack aliases को इंजेक्ट करता है।

हुड के अंतर्गत:

- **`serverSideTranslations` & `appWithTranslation`:** ये अब Intlayer के आंतरिक लोडर्स के लिए wrappers के रूप में कार्य करते हैं, बड़े static JSON इंजेक्शन को रोकते हुए।
- **Client hooks:** तुरंत `@intlayer/react-i18next` को डेलीगेट करते हैं सभी formatting, plurals, और nested namespace features को बनाए रखते हुए।
