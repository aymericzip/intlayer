# React Integration: `useLocale` Hook Documentation

यह अनुभाग `react-intlayer` पुस्तकालय के `useLocale` हुक के बारे में संपूर्ण विवरण प्रदान करता है, जिसे React अनुप्रयोगों में लोकल प्रबंधन संभालने के लिए डिज़ाइन किया गया है।

## Importing `useLocale` in React

अपने React अनुप्रयोग में `useLocale` हुक को एकीकृत करने के लिए, इसे इसके संबंधित पैकेज से आयात करें:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // React घटकों में लोकल प्रबंधन के लिए उपयोग किया जाता है
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // React घटकों में लोकल प्रबंधन के लिए उपयोग किया जाता है
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // React घटकों में लोकल प्रबंधन के लिए उपयोग किया जाता है
```

## Overview

`useLocale` हुक React घटकों के भीतर लोकल सेटिंग्स को एक्सेस और संशोधित करने का एक आसान तरीका प्रदान करता है। यह वर्तमान लोकल, डिफ़ॉल्ट लोकल, सभी उपलब्ध लोकल, और लोकल सेटिंग्स को अपडेट करने के लिए फ़ंक्शंस को एक्सेस प्रदान करता है।

## Usage

यहाँ बताया गया है कि आप कैसे `useLocale` हुक का उपयोग एक React घटक के भीतर कर सकते हैं:

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
import { useLocale } from "react-intlayer";

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

## Parameters and Return Values

जब आप `useLocale` हुक को कॉल करते हैं, तो यह निम्नलिखित प्रॉपर्टीज़ वाले एक ऑब्जेक्ट को लौटाता है:

- **`locale`**: वर्तमान लोकल जिसे React संदर्भ में सेट किया गया है।
- **`defaultLocale`**: कॉन्फ़िगरेशन में परिभाषित प्रमुख लोकल।
- **`availableLocales`**: सभी लोकल की एक सूची उपलब्ध जैसे कि कॉन्फ़िगरेशन में परिभाषित है।
- **`setLocale`**: एप्लिकेशन के संदर्भ के भीतर वर्तमान लोकल को अपडेट करने के लिए एक फ़ंक्शन।

## Example

यह उदाहरण एक घटक को दिखाता है जो `useLocale` हुक का उपयोग करके एक लोकल स्विचर को रेंडर करता है, जो उपयोगकर्ताओं को अनुप्रयोग की लोकल को गतिशील रूप से बदलने की अनुमति देता है:

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

## Conclusion

`react-intlayer` से `useLocale` हुक आपके React अनुप्रयोगों में लोकल प्रबंधन के लिए एक आवश्यक उपकरण है, जो विभिन्न अंतरराष्ट्रीय दर्शकों के लिए आपके अनुप्रयोग को अनुकूलित करने के लिए आवश्यक कार्यक्षमता प्रदान करता है।
