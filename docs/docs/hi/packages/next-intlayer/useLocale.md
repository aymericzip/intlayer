---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale हुक दस्तावेज़ | next-intlayer
description: next-intlayer पैकेज के लिए useLocale हुक का उपयोग कैसे करें देखें
keywords:
  - useLocale
  - शब्दकोश
  - कुंजी
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - जावास्क्रिप्ट
  - रिएक्ट
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# Next.js एकीकरण: `next-intlayer` के लिए `useLocale` हुक दस्तावेज़ीकरण

यह अनुभाग `next-intlayer` लाइब्रेरी के भीतर Next.js अनुप्रयोगों के लिए अनुकूलित `useLocale` हुक पर विस्तृत दस्तावेज़ प्रदान करता है। इसे स्थानीय परिवर्तन और रूटिंग को कुशलतापूर्वक संभालने के लिए डिज़ाइन किया गया है।

## Next.js में `useLocale` को इम्पोर्ट करना

अपने Next.js अनुप्रयोग में `useLocale` हुक का उपयोग करने के लिए, इसे नीचे दिखाए अनुसार इम्पोर्ट करें:

```javascript
import { useLocale } from "next-intlayer"; // Next.js में स्थानीय और रूटिंग प्रबंधन के लिए उपयोग किया जाता है
```

## उपयोग

यहाँ बताया गया है कि Next.js कॉम्पोनेंट के भीतर `useLocale` हुक को कैसे लागू करें:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>वर्तमान स्थानीय: {locale}</h1>
      <p>डिफ़ॉल्ट स्थानीय: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>वर्तमान स्थानीय: {locale}</h1>
      <p>डिफ़ॉल्ट स्थानीय: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>वर्तमान स्थानीय: {locale}</h1>
      <p>डिफ़ॉल्ट स्थानीय: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## पैरामीटर और रिटर्न मान

जब आप `useLocale` हुक को कॉल करते हैं, तो यह एक ऑब्जेक्ट लौटाता है जिसमें निम्नलिखित गुण होते हैं:

- **`locale`**: वर्तमान स्थानीय जो React संदर्भ में सेट किया गया है।
- **`defaultLocale`**: कॉन्फ़िगरेशन में परिभाषित प्राथमिक स्थानीय।
- **`availableLocales`**: कॉन्फ़िगरेशन में परिभाषित सभी उपलब्ध स्थानीययों की सूची।
- **`setLocale`**: एक फ़ंक्शन जो एप्लिकेशन की स्थानीय को बदलने और URL को तदनुसार अपडेट करने के लिए है। यह प्रीफ़िक्स नियमों का ध्यान रखता है, कि कॉन्फ़िगरेशन के आधार पर स्थानीय को पथ में जोड़ना है या नहीं। नेविगेशन फ़ंक्शंस जैसे `push` और `refresh` के लिए `next/navigation` से `useRouter` का उपयोग करता है।
- **`pathWithoutLocale`**: एक गणना की गई संपत्ति जो स्थानीय के बिना पथ लौटाती है। यह URL की तुलना करने के लिए उपयोगी है। उदाहरण के लिए, यदि वर्तमान स्थानीय `fr` है, और URL `fr/my_path` है, तो स्थानीय के बिना पथ `/my_path` होगा। वर्तमान पथ प्राप्त करने के लिए `next/navigation` से `usePathname` का उपयोग करता है।

## निष्कर्ष

`next-intlayer` से `useLocale` हुक Next.js एप्लिकेशन में स्थानीय प्रबंधन के लिए एक महत्वपूर्ण उपकरण है। यह आपके एप्लिकेशन को कई स्थानीयताओं के लिए अनुकूलित करने के लिए एक एकीकृत दृष्टिकोण प्रदान करता है, जो स्थानीय संग्रहण, स्थिति प्रबंधन, और URL संशोधनों को सहजता से संभालता है।
