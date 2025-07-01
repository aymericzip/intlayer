---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - अंतर्राष्ट्रीयकरण के लिए कमांड लाइन टूल
description: Intlayer के लिए कमांड लाइन इंटरफ़ेस पैकेज जो अनुवाद प्रबंधन, शब्दकोश निर्माण, और अंतर्राष्ट्रीयकरण वर्कफ़्लो को स्वचालित करने के उपकरण प्रदान करता है।
keywords:
  - intlayer
  - CLI
  - कमांड लाइन
  - अंतर्राष्ट्रीयकरण
  - i18n
  - उपकरण
  - NPM
  - स्वचालन
slugs:
  - doc
  - package
  - intlayer-cli
---

# intlayer-cli: Intlayer CLI का उपयोग करने के लिए NPM पैकेज

**Intlayer** पैकेजों का एक समूह है जो विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`intlayer-cli`** पैकेज एक NPM पैकेज है जो `@intlayer/cli` पैकेज का उपयोग करता है और इसे `intlayer` कमांड लाइन इंटरफेस के लिए उपलब्ध कराता है।

> ध्यान दें कि यदि [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/hi/packages/intlayer/index.md) पैकेज इंस्टॉल है तो इस पैकेज की आवश्यकता नहीं है। `intlayer` पैकेज की तुलना में, `intlayer-cli` पैकेज एक हल्का पैकेज है जिसमें केवल CLI टूल शामिल है, और इसमें `@intlayer/core` निर्भरताएँ नहीं हैं।

## स्थापना

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## उपयोग

यहाँ `intlayer-cli` पैकेज का उपयोग करने का एक उदाहरण है:

```bash
npx intlayer dictionaries build
```

## CLI कमांड्स

Intlayer एक CLI टूल प्रदान करता है जो:

- आपकी सामग्री घोषणाओं का ऑडिट करता है और गायब अनुवादों को पूरा करता है
- आपकी सामग्री घोषणाओं से शब्दकोश बनाता है
- आपके CMS से दूरस्थ शब्दकोशों को आपके स्थानीय प्रोजेक्ट में पुश और पुल करता है

अधिक जानकारी के लिए [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) देखें।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
