---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Transloco से Intlayer में माइग्रेट करें"
description: "सीखें कि compat adapter का उपयोग करके अपने Angular एप्लिकेशन को Transloco से Intlayer में कैसे माइग्रेट करें।"
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Transloco से Intlayer में माइग्रेट करें

यदि आपकी Angular एप्लिकेशन वर्तमान में `@jsverse/transloco` का उपयोग करती है, तो आप हमारे compat adapter का उपयोग करके Intlayer में माइग्रेट कर सकते हैं। यह संक्रमण आपको अपने मौजूदा template syntax को बनाए रखते हुए Intlayer की शक्तिशाली dictionary संरचना का उपयोग करने की अनुमति देता है।

## क्या करें

अपने प्रोजेक्ट में बस initialization command चलाएं:

```bash
npx intlayer init
```

यह आवश्यक `intlayer.config.ts` configuration generate करेगा। फिर आप अपने Transloco imports को `@intlayer/transloco` modules के साथ replace कर सकते हैं या build aliases पर निर्भर रह सकते हैं।

## यह हुड के नीचे क्या करता है

Transloco scopes और एक `TranslocoService` (`translate`, `selectTranslate`) का उपयोग करता है, साथ ही structural directives (`*transloco="let t"`) और pipes (`| transloco`)।

हुड के नीचे:

- **Scopes:** Intlayer dictionary keys के लिए स्वाभाविक रूप से मैप करते हैं, bundle optimization के लिए एक बेहतरीन pruning story प्रदान करते हैं।
- **Service & Directives:** Intlayer का Angular adapter seamlessly providers को बदलता है, जिससे आपके मौजूदा template pipes और directives Intlayer dictionaries के विरुद्ध strings को resolve कर सकते हैं।
- **Build time parsing:** TypeScript analyzer `instant/get` calls को पहचानता है, और fallback pruning सुनिश्चित करता है कि सही है यहां तक कि जब template usage statically trackable न हो।
