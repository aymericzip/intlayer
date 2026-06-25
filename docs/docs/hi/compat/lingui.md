---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Lingui से Intlayer में माइग्रेट करें"
description: "Lingui से Intlayer में अपने एप्लिकेशन को माइग्रेट करना सीखें compat adapter का उपयोग करके।"
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Lingui से Intlayer में माइग्रेट करें

यदि आपका प्रोजेक्ट वर्तमान में Lingui के macro-based compilation पर निर्भर करता है, तो Intlayer में ट्रांजिशन करने से आप अपने शक्तिशाली macro workflows को बनाए रखते हुए उन्हें Intlayer की JSON compilation strategy के साथ नेटिवली बैक कर सकते हैं।

## क्या करना है

शुरुआत करने के लिए, अपने प्रोजेक्ट में Intlayer को इनिशियलाइज़ करें:

```bash
npx intlayer init
```

यह आपका `intlayer.config.ts` बनाता है। सुनिश्चित करें कि आप अपने बिल्ड स्टेप में `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` को Intlayer compiler से _पहले_ चलाने के लिए रखते हैं। फिर, bundler plugin alias का उपयोग करके `@lingui/core` और `@lingui/react` को `@intlayer/lingui` में रूट करें।

## यह हुड के नीचे क्या करता है

Lingui macros (जैसे `` t`Hello ${name}` `` और `<Trans>`) का उपयोग करता है जो runtime calls जैसे `i18n._(id, values)` में compile होते हैं।

हुड के नीचे:

- **Macros:** वे पहले की तरह ही compile होते हैं, जिससे आपके source syntax में कोई व्यवधान नहीं होता है।
- **Runtime translation:** aliased `i18n._()` Intlayer dictionaries का उपयोग करता है। explicitly named IDs और hashed IDs दोनों को पूरी तरह से Intlayer के `.po` sync plugins का उपयोग करके mapped किया जाता है ताकि keys को securely aggregate और prune किया जा सके।
- **ICU capabilities:** pluralization, selection, और ICU variants के लिए support Intlayer के unified ICU parser की वजह से robust रहता है, जिससे identical rendering outputs सुनिश्चित होते हैं।
