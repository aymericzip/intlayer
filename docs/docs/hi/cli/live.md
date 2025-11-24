---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: लाइव सिंक कमांड्स
description: रनटाइम पर CMS कंटेंट परिवर्तनों को प्रतिबिंबित करने के लिए लाइव सिंक का उपयोग कैसे करें, जानें।
keywords:
  - लाइव सिंक
  - CMS
  - रनटाइम
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# लाइव सिंक कमांड्स

लाइव सिंक आपकी ऐप को रनटाइम पर CMS कंटेंट परिवर्तनों को प्रतिबिंबित करने देता है। पुनर्निर्माण या पुनः तैनाती की आवश्यकता नहीं है। जब सक्षम किया जाता है, तो अपडेट्स लाइव सिंक सर्वर को स्ट्रीम किए जाते हैं जो आपके एप्लिकेशन द्वारा पढ़े जाने वाले शब्दकोशों को ताज़ा करता है। अधिक जानकारी के लिए देखें [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)।

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## तर्क:

**कॉन्फ़िगरेशन विकल्प:**

- **`--base-dir`**: परियोजना के लिए बेस डायरेक्टरी निर्दिष्ट करें। intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए, कमांड बेस डायरेक्टरी में `intlayer.config.{ts,js,json,cjs,mjs}` फ़ाइल खोजेगा।

- **`--no-cache`**: कैश को अक्षम करें।

  > उदाहरण: `npx intlayer dictionary push --env-file .env.production.local`

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें। (CLI का उपयोग करते समय डिफ़ॉल्ट रूप से true)
