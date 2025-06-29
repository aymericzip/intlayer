---
docName: package__react-intlayer__useLocale
url: https://intlayer.org/doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale हुक दस्तावेज़ | react-intlayer
description: react-intlayer पैकेज के लिए useLocale हुक का उपयोग कैसे करें, देखें
keywords:
  - useLocale
  - शब्दकोश
  - कुंजी
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज
  - Next.js
  - JavaScript
  - React
---

# React एकीकरण: `useLocale` हुक दस्तावेज़

यह अनुभाग React अनुप्रयोगों में स्थानीय प्रबंधन के लिए डिज़ाइन की गई `react-intlayer` लाइब्रेरी से `useLocale` हुक पर व्यापक विवरण प्रदान करता है।

## React में `useLocale` आयात करना

अपने React अनुप्रयोग में `useLocale` हुक को एकीकृत करने के लिए, इसे इसके संबंधित पैकेज से आयात करें:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // React घटकों में स्थानीय प्रबंधन के लिए उपयोग किया जाता है
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // React घटकों में स्थानीय प्रबंधन के लिए उपयोग किया जाता है
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // React घटकों में स्थानीय प्रबंधन के लिए उपयोग किया जाता है
```

## अवलोकन

`useLocale` हुक React घटकों के भीतर स्थानीय सेटिंग्स तक पहुंचने और उन्हें प्रबंधित करने का एक आसान तरीका प्रदान करता है। यह वर्तमान स्थानीय, डिफ़ॉल्ट स्थानीय, सभी उपलब्ध स्थानीय और स्थानीय सेटिंग्स को अपडेट करने के लिए कार्यों तक पहुंच प्रदान करता है।

## उपयोग

यहां बताया गया है कि आप React घटक के भीतर `useLocale` हुक का उपयोग कैसे कर सकते हैं:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

export default LocaleSwitcher;
```

## पैरामीटर और रिटर्न मान

जब आप `useLocale` हुक को कॉल करते हैं, तो यह एक ऑब्जेक्ट लौटाता है जिसमें निम्नलिखित गुण शामिल होते हैं:

- **`locale`**: React संदर्भ में सेट वर्तमान स्थानीय।
- **`defaultLocale`**: कॉन्फ़िगरेशन में परिभाषित प्राथमिक स्थानीय।
- **`availableLocales`**: सभी उपलब्ध स्थानीय की सूची जो कॉन्फ़िगरेशन में परिभाषित हैं।
- **`setLocale`**: अनुप्रयोग के संदर्भ के भीतर वर्तमान स्थानीय को अपडेट करने के लिए एक फ़ंक्शन।

## उदाहरण

यह उदाहरण एक घटक दिखाता है जो `useLocale` हुक का उपयोग करता है ताकि एक स्थानीय स्विचर प्रस्तुत किया जा सके, जिससे उपयोगकर्ता अनुप्रयोग की स्थानीय को गतिशील रूप से बदल सकें:

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

`react-intlayer` से `useLocale` हुक आपके React अनुप्रयोगों में स्थानीय प्रबंधन के लिए एक आवश्यक उपकरण है, जो विभिन्न अंतर्राष्ट्रीय दर्शकों के लिए आपके अनुप्रयोग को प्रभावी ढंग से अनुकूलित करने के लिए आवश्यक कार्यक्षमता प्रदान करता है।
