---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: CI/CD में बिल्ड त्रुटि
description: जानें कि CI/CD वातावरण में होने वाली बिल्ड त्रुटियों को कैसे ठीक करें।
keywords:
  - build
  - error
  - ci
  - cd
  - pipeline
  - intlayer
  - dictionaries
  - next.js
  - prebuild
  - automation
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# CI/CD में बिल्ड पर त्रुटि

यदि आपको Next.js में इस प्रकार की त्रुटि मिलती है:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

यहाँ कुछ समाधान दिए गए हैं:

## 1. डिक्शनरी गायब हैं

सुनिश्चित करें कि डिक्शनरी बिल्ड के चरण में बनाई गई हैं।

यह सामान्य है कि बिल्ड स्थानीय रूप से काम करता है लेकिन CI/CD पर नहीं। इसका कारण यह है कि स्थानीय रूप से, `.intlayer` निर्देशिका मौजूद होती है, लेकिन CI/CD पर यह बिल्ड से बाहर रखी जाती है।

आप इसे अपने प्रोजेक्ट के `package.json` में एक प्रीबिल्ड स्क्रिप्ट जोड़कर ठीक कर सकते हैं।

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // बिल्ड से पहले चलेगा
    "build": "next build",
  },
}
```

> ध्यान दें कि यदि आप `withIntlayer` फ़ंक्शन का उपयोग करते हैं, या अपने फ्रेमवर्क के लिए समकक्ष बंडलर प्लगइन, तो प्रीबिल्ड स्क्रिप्ट बिल्ड से पहले चलेगा।

## 2. बिल्ड / रन टाइम पर पर्यावरण चर गायब हैं

कंटेनर या ऑटो-डिप्लॉयड प्लेटफ़ॉर्म में, यह अनुशंसित है कि `.env` फ़ाइल को बिल्ड से बाहर रखा जाए।

```text fileName=".gitignore or .dockerignore"
# पर्यावरण चर
.env
**/.env
.env.*
**/.env.*
```

यदि आपके पर्यावरण चर बिल्ड समय पर उपलब्ध नहीं हैं, तो एक त्रुटि उत्पन्न होगी।

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

यह संभवतः Intlayer से संबंधित नहीं है। इसलिए अपने CI/CD प्लेटफ़ॉर्म पर बिल्ड समय पर अपने पर्यावरण चर की जांच करें।
