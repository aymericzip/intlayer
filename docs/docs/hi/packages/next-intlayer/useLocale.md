---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale हुक दस्तावेज़ | next-intlayer
description: next-intlayer पैकेज के लिए useLocale हुक का उपयोग करने का तरीका देखें
keywords:
  - useLocale
  - शब्दकोश
  - कुंजी
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Next.js
  - JavaScript
  - React
---

# Next.js एकीकरण: `useLocale` हुक दस्तावेज़ीकरण `next-intlayer` के लिए

यह अनुभाग `next-intlayer` लाइब्रेरी के भीतर Next.js अनुप्रयोगों के लिए `useLocale` हुक पर विस्तृत दस्तावेज़ीकरण प्रदान करता है। इसे स्थानीय परिवर्तन और रूटिंग को कुशलतापूर्वक संभालने के लिए डिज़ाइन किया गया है।

## Next.js में `useLocale` आयात करना

अपने Next.js अनुप्रयोग में `useLocale` हुक का उपयोग करने के लिए, इसे नीचे दिखाए गए अनुसार आयात करें:

```javascript
import { useLocale } from "next-intlayer"; // Next.js में स्थानीय और रूटिंग प्रबंधन के लिए उपयोग किया जाता है
```

## उपयोग

यहां बताया गया है कि Next.js घटक के भीतर `useLocale` हुक को कैसे लागू करें:

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

जब आप `useLocale` हुक को कॉल करते हैं, तो यह निम्नलिखित गुणों वाला एक ऑब्जेक्ट लौटाता है:

- **`locale`**: वर्तमान स्थानीय जो React संदर्भ में सेट किया गया है।
- **`defaultLocale`**: कॉन्फ़िगरेशन में परिभाषित प्राथमिक स्थानीय।
- **`availableLocales`**: सभी उपलब्ध स्थानीय की सूची जो कॉन्फ़िगरेशन में परिभाषित है।
- **`setLocale`**: अनुप्रयोग के स्थानीय को बदलने और URL को अपडेट करने के लिए एक फ़ंक्शन। यह कॉन्फ़िगरेशन के आधार पर पथ में स्थानीय जोड़ने या न जोड़ने के लिए उपसर्ग नियमों का ध्यान रखता है। नेविगेशन फ़ंक्शंस जैसे `push` और `refresh` के लिए `next/navigation` से `useRouter` का उपयोग करता है।
- **`pathWithoutLocale`**: एक गणना की गई संपत्ति जो स्थानीय के बिना पथ लौटाती है। यह URL की तुलना के लिए उपयोगी है। उदाहरण के लिए, यदि वर्तमान स्थानीय `fr` है, और URL `fr/my_path` है, तो स्थानीय के बिना पथ `/my_path` है। वर्तमान पथ प्राप्त करने के लिए `next/navigation` से `usePathname` का उपयोग करता है।

## निष्कर्ष

`next-intlayer` का `useLocale` हुक Next.js अनुप्रयोगों में स्थानीय प्रबंधन के लिए एक महत्वपूर्ण उपकरण है। यह आपके अनुप्रयोग को कई स्थानीय के लिए अनुकूलित करने के लिए एकीकृत दृष्टिकोण प्रदान करता है, स्थानीय भंडारण, स्थिति प्रबंधन, और URL संशोधनों को सहजता से संभालता है।
