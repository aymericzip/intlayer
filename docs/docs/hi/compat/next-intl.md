---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: next-intl के लिए संगतता एडैप्टर"
description: "अपना next-intl कोड बनाए रखें और उसे Intlayer से चलाएँ: @intlayer/next-intl इंस्टॉल करें, imports के लिए alias सेट करें, और देखें कि एडैप्टर अंदर क्या बदलता है।"
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/next-intl: next-intl के लिए संगतता एडैप्टर

एक संपूर्ण और विस्तृत चरण-दर-चरण ट्यूटोरियल के लिए, कृपया हमारी पूरी [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md) देखें।

- [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md)

`next-intl` से Intlayer में माइग्रेशन करने से आप अपने एप्लिकेशन रूटिंग और सिंटैक्स को पूरी तरह से बिना किसी परेशानी के बनाए रख सकते हैं।

## क्या करना है

अपने रिपोजिटरी में निम्नलिखित कमांड निष्पादित करें:

```bash
npx intlayer init --interactive
```

यह एक `intlayer.config.ts` बनाएगा। अपने `next.config.ts` में, प्लगइन रैपर का उपयोग करें ताकि `next-intl` aliases को `@intlayer/next-intl` की ओर निर्बाध रूप से इंजेक्ट किया जा सके।

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## यह हुड के नीचे क्या करता है

बंडलर रैपर अनुवादों को प्रतिस्थापित करता है, लेकिन **`next-intl/navigation` फीचर्स को बरकरार रखता है** (उदाहरण के लिए `Link`, `redirect`, `usePathname`)।

हुड के नीचे:

- **ICU runtime:** Plurals (`=0`, `one`, `other`), select/selectordinal, `#` arguments, और formatted args (`{ts, date, long}`) साझा `resolveMessage(..., 'icu')` resolver का उपयोग करके सही तरीके से चलते हैं।
- **`useTranslations()` & `getTranslations()`:** bare scope कॉल्स पहले key सेगमेंट को सही dictionary identifier के रूप में निकालते हैं। Nested namespaces gracefully dictionary paths और prefixes में विभाजित होते हैं।
- **Rich formatting:** `t.rich()` और `t.markup()` दोनों पूरी तरह से natively लागू किए गए हैं, HTML-जैसे नोड्स को rendered React chunks में परिवर्तित करते हैं।
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange`, और कॉन्फ़िगरेशन से named formats core native `Intl` formatters को bridge करते हैं।

> ये लाइब्रेरी कहाँ से आईं, यह समझने के लिए JavaScript i18n का इतिहास पढ़ें।

- [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md)
