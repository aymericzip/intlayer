# Next.js Integration: `useLocale` Hook Documentation for `next-intlayer`

इस सेक्शन में `next-intlayer` पुस्तकालय के भीतर Next.js अनुप्रयोगों के लिए `useLocale` हुक पर विस्तृत प्रलेखन प्रस्तुत किया गया है। इसे स्थानीयकरण परिवर्तनों और रूटिंग को कुशलतापूर्वक प्रबंधित करने के लिए डिज़ाइन किया गया है।

## Next.js में `useLocale` आयात करना

अपने Next.js अनुप्रयोग में `useLocale` हुक का उपयोग करने के लिए, इसे नीचे दिखाए अनुसार आयात करें:

```javascript
import { useLocale } from "next-intlayer"; // Next.js में स्थानीयकरण और रूटिंग प्रबंधित करने के लिए इस्तेमाल किया गया
```

## उपयोग

यहां Next.js घटक के भीतर `useLocale` हुक को लागू करने का तरीका दिया गया है:

```jsx
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>वर्तमान स्थानीयकरण: {locale}</h1>
      <p>डिफॉल्ट स्थानीयकरण: {defaultLocale}</p>
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

जब आप `useLocale` हुक को कॉल करते हैं, तो यह निम्नलिखित गुणों के साथ एक ऑब्जेक्ट लौटाता है:

- **`locale`**: React संदर्भ में सेट किया गया वर्तमान स्थानीयकरण।
- **`defaultLocale`**: कॉन्फ़िगरेशन में परिभाषित प्राथमिक स्थानीयकरण।
- **`availableLocales`**: कॉन्फ़िगरेशन में परिभाषित सभी उपलब्ध स्थानीयकरणों की सूची।
- **`setLocale`**: अनुप्रयोग के स्थानीयकरण को बदलने और URL को उसके अनुसार अपडेट करने के लिए एक फ़ंक्शन। यह कॉन्फ़िगरेशन के आधार पर पथ में स्थानीयकरण जोड़ने या न जोड़ने के नियमों का ध्यान रखता है। `push` और `refresh` जैसे नेविगेशन फ़ंक्शंस के लिए `next/navigation` से `useRouter` का उपयोग करता है।
- **`pathWithoutLocale`**: एक गणितीय संपत्ति जो स्थानीयकरण के बिना पथ लौटाती है। यह URL की तुलना के लिए उपयोगी है। उदाहरण के लिए, यदि वर्तमान स्थानीयकरण `fr` है, और URL `fr/my_path` है, तो स्थानीयकरण के बिना पथ `/my_path` है। वर्तमान पथ प्राप्त करने के लिए `next/navigation` से `usePathname` का उपयोग करता है।

## निष्कर्ष

`next-intlayer` से `useLocale` हुक Next.js अनुप्रयोगों में स्थानीयकरण प्रबंधित करने के लिए एक महत्वपूर्ण उपकरण है। यह स्थानीयकरण भंडारण, स्थिति प्रबंधन और URL संशोधनों को निर्बाध रूप से संभालने के लिए आपके अनुप्रयोग को कई स्थानीयकरणों के लिए अनुकूलित करने के लिए एक एकीकृत दृष्टिकोण प्रदान करता है।
