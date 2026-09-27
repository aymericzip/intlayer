---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: विज़ुअल एडिटर कमांड"
description: "CLI से Intlayer विज़ुअल एडिटर शुरू और कॉन्फ़िगर करें, ताकि चल रहे ऐप पर ही कंटेंट को संदर्भ में बदल सकें।"
keywords:
  - एडिटर
  - विज़ुअल एडिटर
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
author: aymericzip
---

# एडिटर कमांड्स

`editor` कमांड `intlayer-editor` कमांड्स को फिर से रैप करता है।

> `editor` कमांड का उपयोग करने के लिए, `intlayer-editor` पैकेज इंस्टॉल होना आवश्यक है। (देखें [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
