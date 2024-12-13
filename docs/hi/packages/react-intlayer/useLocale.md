# React Integration: `useLocale` Hook Documentation

इस अनुभाग में `react-intlayer` लाइब्रेरी के `useLocale` हुक के बारे में व्यापक जानकारी प्रदान की गई है, जो React अनुप्रयोगों में स्थानीयता प्रबंधन के लिए डिज़ाइन किया गया है।

## Importing `useLocale` in React

अपने React अनुप्रयोग में `useLocale` हुक को एकीकृत करने के लिए, इसे इसके संबंधित पैकेज से आयात करें:

```javascript
import { useLocale } from "react-intlayer"; // स्थानीयता प्रबंधन के लिए React घटकों में प्रयोग किया जाता है
```

## Overview

`useLocale` हुक React घटकों के भीतर स्थानीयता सेटिंग्स को एक्सेस और संशोधित करने का एक सरल तरीका प्रदान करता है। यह वर्तमान स्थानीयता, डिफ़ॉल्ट स्थानीयता, सभी उपलब्ध स्थानीयताओं और स्थानीयता सेटिंग्स को अपडेट करने के लिए कार्यों तक पहुंच प्रदान करता है।

## Usage

यहां बताया गया है कि आप एक React घटक के भीतर `useLocale` हुक का उपयोग कैसे कर सकते हैं:

```jsx
import React from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

## Parameters and Return Values

जब आप `useLocale` हुक को कॉलबैक करते हैं, तो यह निम्नलिखित प्रॉपर्टीज वाला एक ऑब्जेक्ट लौटाता है:

- **`locale`**: React संदर्भ में सेट की गई वर्तमान स्थानीयता।
- **`defaultLocale`**: कॉन्फ़िगरेशन में निर्धारित प्राथमिक स्थानीयता।
- **`availableLocales`**: कॉन्फ़िगरेशन में निर्धारित सभी उपलब्ध स्थानीयताओं की एक सूची।
- **`setLocale`**: अनुप्रयोग के संदर्भ में वर्तमान स्थानीयता को अपडेट करने के लिए एक कार्य।

## Example

यह उदाहरण एक घटक को दिखाता है जो `useLocale` हुक का उपयोग करता है ताकि उपयोगकर्ताओं को अनुप्रयोग की स्थानीयता को गतिशील रूप से बदलने की अनुमति देने के लिए एक स्थानीयता स्विचर प्रस्तुत किया जा सके:

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
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
}

export default LocaleSelector;
```

## Conclusion

`react-intlayer` से `useLocale` हुक आपकी React अनुप्रयोगों में स्थानीयताओं को प्रबंधित करने के लिए एक आवश्यक उपकरण है, जो आपके अनुप्रयोग को विभिन्न अंतरराष्ट्रीय दर्शकों के लिए प्रभावी रूप से ढालने के लिए आवश्यक कार्यक्षमता प्रदान करता है।
