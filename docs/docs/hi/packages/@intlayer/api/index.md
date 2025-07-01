---
docName: packages__intlayer__api
url: https://intlayer.org/doc/packages/intlayer/api
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/@intlayer/api/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - Intlayer API एकीकरण के लिए SDK
description: NPM पैकेज जो Intlayer API के साथ इंटरैक्ट करने के लिए सॉफ्टवेयर डेवलपमेंट किट (SDK) प्रदान करता है, जिसमें कंटेंट ऑडिटिंग, संगठन, प्रोजेक्ट्स, और उपयोगकर्ता प्रबंधन शामिल हैं।
keywords:
  - intlayer
  - API
  - SDK
  - एकीकरण
  - कंटेंट ऑडिट
  - संगठन
  - प्रोजेक्ट्स
  - JavaScript
---

# @intlayer/api: Intlayer API के साथ इंटरैक्ट करने के लिए NPM पैकेज

**Intlayer** पैकेजों का एक समूह है जो विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React, और Express.js जैसे फ्रेमवर्क्स के साथ संगत है।

**`@intlayer/api`** पैकेज Intlayer API के साथ इंटरैक्ट करने के लिए एक SDK (सॉफ्टवेयर डेवलपमेंट किट) है। यह कंटेंट घोषणा का ऑडिट करने, संगठनों, प्रोजेक्ट्स, और उपयोगकर्ताओं के साथ इंटरैक्ट करने आदि के लिए फ़ंक्शंस का एक सेट प्रदान करता है।

## उपयोग

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
