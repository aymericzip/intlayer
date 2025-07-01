---
docName: package__react-intlayer__useLocale
url: https://intlayer.org/doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale हुक दस्तावेज़ | react-intlayer
description: react-intlayer पैकेज के लिए useLocale हुक का उपयोग कैसे करें देखें
keywords:
  - useLocale
  - शब्दकोश
  - कुंजी
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - जावास्क्रिप्ट
  - रिएक्ट
---

# रिएक्ट इंटीग्रेशन: `useLocale` हुक दस्तावेज़

यह अनुभाग `react-intlayer` लाइब्रेरी के `useLocale` हुक के बारे में व्यापक जानकारी प्रदान करता है, जो रिएक्ट एप्लिकेशन में लोकल प्रबंधन के लिए डिज़ाइन किया गया है।

## रिएक्ट में `useLocale` को इम्पोर्ट करना

अपने रिएक्ट एप्लिकेशन में `useLocale` हुक को एकीकृत करने के लिए, इसे उसके संबंधित पैकेज से इम्पोर्ट करें:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // लोकल प्रबंधन के लिए रिएक्ट कॉम्पोनेंट्स में उपयोग किया जाता है
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // लोकल प्रबंधन के लिए रिएक्ट कॉम्पोनेंट्स में उपयोग किया जाता है
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // लोकल प्रबंधन के लिए रिएक्ट कॉम्पोनेंट्स में उपयोग किया जाता है
```

## अवलोकन

`useLocale` हुक रिएक्ट कॉम्पोनेंट्स के भीतर लोकल सेटिंग्स तक पहुँचने और उन्हें नियंत्रित करने का एक आसान तरीका प्रदान करता है। यह वर्तमान लोकल, डिफ़ॉल्ट लोकल, सभी उपलब्ध लोकल, और लोकल सेटिंग्स को अपडेट करने के लिए फ़ंक्शन तक पहुँच प्रदान करता है।

## उपयोग

यहाँ बताया गया है कि आप `useLocale` हुक को रिएक्ट कॉम्पोनेंट के भीतर कैसे उपयोग कर सकते हैं:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>वर्तमान लोकल: {locale}</h1>
      <p>डिफ़ॉल्ट लोकल: {defaultLocale}</p>
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react.intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>वर्तमान लोकल: {locale}</h1>
      <p>डिफ़ॉल्ट लोकल: {defaultLocale}</p>
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>वर्तमान लोकल: {locale}</h1>
      <p>डिफ़ॉल्ट लोकल: {defaultLocale}</p>
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

export default LocaleSwitcher;
```

## पैरामीटर और रिटर्न मान

जब आप `useLocale` हुक को कॉल करते हैं, तो यह एक ऑब्जेक्ट लौटाता है जिसमें निम्नलिखित गुण होते हैं:

- **`locale`**: वर्तमान लोकल जो React संदर्भ में सेट किया गया है।
- **`defaultLocale`**: कॉन्फ़िगरेशन में परिभाषित प्राथमिक लोकल।
- **`availableLocales`**: कॉन्फ़िगरेशन में परिभाषित सभी उपलब्ध लोकल की सूची।
- **`setLocale`**: एप्लिकेशन के संदर्भ में वर्तमान लोकल को अपडेट करने के लिए एक फ़ंक्शन।

## उदाहरण

यह उदाहरण एक ऐसा कॉम्पोनेंट दिखाता है जो `useLocale` हुक का उपयोग करता है ताकि एक लोकल स्विचर रेंडर किया जा सके, जिससे उपयोगकर्ता एप्लिकेशन की लोकल को गतिशील रूप से बदल सकें:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## निष्कर्ष

`react-intlayer` से `useLocale` हुक आपके React एप्लिकेशन में लोकेल प्रबंधन के लिए एक आवश्यक उपकरण है, जो आपकी एप्लिकेशन को विभिन्न अंतरराष्ट्रीय दर्शकों के अनुसार प्रभावी ढंग से अनुकूलित करने के लिए आवश्यक कार्यक्षमता प्रदान करता है।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
