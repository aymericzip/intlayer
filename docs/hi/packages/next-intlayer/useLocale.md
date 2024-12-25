# Next.js Integration: `useLocale` Hook Documentation for `next-intlayer`

इस अनुभाग में `next-intlayer` पुस्तकालय के भीतर Next.js अनुप्रयोगों के लिए `useLocale` हुक के बारे में विस्तृत दस्तावेज़ प्रदान किया गया है। यह स्थानीय परिवर्तनों और रूटिंग को सुरक्षित रूप से संभालने के लिए डिज़ाइन किया गया है।

## Next.js में `useLocale` का आयात करना

अपने Next.js अनुप्रयोग में `useLocale` हुक का उपयोग करने के लिए, इसे नीचे दिखाए अनुसार आयात करें:

```javascript
import { useLocale } from "next-intlayer"; // Next.js में स्थानीय और रूटिंग प्रबंधन के लिए उपयोग किया जाता है
```

## उपयोग

यहां दिखाया गया है कि आप एक Next.js घटक के भीतर `useLocale` हुक को कैसे लागू कर सकते हैं:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>वर्तमान स्थानीयता: {locale}</h1>
      <p>डिफ़ॉल्ट स्थानीयता: {defaultLocale}</p>
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
      <h1>वर्तमान स्थानीयता: {locale}</h1>
      <p>डिफ़ॉल्ट स्थानीयता: {defaultLocale}</p>
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
      <h1>वर्तमान स्थानीयता: {locale}</h1>
      <p>डिफ़ॉल्ट स्थानीयता: {defaultLocale}</p>
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

## पैरामीटर और लौटाए गए मान

जब आप `useLocale` हुक को कॉल करते हैं, तो यह निम्नलिखित गुणों के साथ एक объект लौटाता है:

- **`locale`**: React संदर्भ में सेट की गई वर्तमान स्थानीयता।
- **`defaultLocale`**: कॉन्फ़िगरेशन में परिभाषित प्राथमिक स्थानीयता।
- **`availableLocales`**: कॉन्फ़िगरेशन में परिभाषित सभी उपलब्ध स्थानीयताओं की सूची।
- **`setLocale`**: अनुप्रयोग की स्थानीयता बदलने और संबंधित URL को अपडेट करने के लिए एक फ़ंक्शन। यह कॉन्फ़िगरेशन के आधार पर पथ में स्थानीयता जोड़ने के नियमों का ध्यान रखता है। `next/navigation` से `useRouter` का उपयोग करके पुश और रिफ्रेश जैसी नेविगेशन फ़ंक्शंस का उपयोग करता है।
- **`pathWithoutLocale`**: एक व्युत्पन्न संपत्ति जो बिना स्थानीयता के पथ लौटाती है। यह URLs की तुलना के लिए उपयोगी है। उदाहरण के लिए, यदि वर्तमान स्थानीयता `fr` है, और URL `fr/my_path` है, तो बिना स्थानीयता वाला पथ `/my_path` है। वर्तमान पथ प्राप्त करने के लिए `next/navigation` से `usePathname` का उपयोग करता है।

## निष्कर्ष

`next-intlayer` से `useLocale` हुक Next.js अनुप्रयोगों में स्थानीयताओं के प्रबंधन के लिए एक महत्वपूर्ण उपकरण है। यह स्थानीयता भंडारण, स्थिति प्रबंधन, और URL संशोधन को सहजता से संभालने के लिए आपके अनुप्रयोग को कई स्थानीयताओं के अनुकूलित करने के लिए एक समेकित दृष्टिकोण प्रदान करता है।
