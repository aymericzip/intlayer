---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayer का उपयोग करके अपने react-i18next JSON अनुवादों को स्वचालित कैसे करें
description: React एप्लिकेशन में बेहतर अंतरराष्ट्रीयकरण के लिए Intlayer और react-i18next के साथ अपने JSON अनुवादों को स्वचालित करें।
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - i18n
  - ब्लॉग
  - React
  - JavaScript
  - TypeScript
  - सामग्री प्रबंधन
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON प्लगइन में बदलाव
---

# Intlayer का उपयोग करके अपने react-i18next JSON अनुवादों को स्वचालित कैसे करें

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण लाइब्रेरी है जिसे पारंपरिक i18n समाधानों की कमियों को दूर करने के लिए डिज़ाइन किया गया है। यह React एप्लिकेशन में सामग्री प्रबंधन के लिए एक आधुनिक दृष्टिकोण प्रदान करता है।

react-i18next के साथ एक ठोस तुलना के लिए हमारे [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/react-i18next_vs_react-intl_vs_intlayer.md) ब्लॉग पोस्ट देखें।

## Intlayer को react-i18next के साथ क्यों मिलाएं?

जबकि Intlayer एक उत्कृष्ट स्टैंडअलोन i18n समाधान प्रदान करता है (हमारे [React इंटीग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md) देखें), आप इसे कई कारणों से react-i18next के साथ मिलाना चाह सकते हैं:

1. **मौजूदा कोडबेस**: आपके पास एक स्थापित react-i18next इम्प्लीमेंटेशन है और आप धीरे-धीरे Intlayer के बेहतर डेवलपर अनुभव की ओर माइग्रेट करना चाहते हैं।
2. **पुराने आवश्यकताएँ**: आपके प्रोजेक्ट को मौजूदा react-i18next प्लगइन्स या वर्कफ़्लोज़ के साथ संगतता की आवश्यकता है।
3. **टीम की परिचितता**: आपकी टीम react-i18next के साथ सहज है लेकिन बेहतर सामग्री प्रबंधन चाहती है।

**इसके लिए, Intlayer को react-i18next के लिए एक एडाप्टर के रूप में लागू किया जा सकता है जो CLI या CI/CD पाइपलाइनों में आपके JSON अनुवादों को स्वचालित करने, आपके अनुवादों का परीक्षण करने, और भी बहुत कुछ करने में मदद करता है।**

यह गाइड आपको दिखाता है कि कैसे Intlayer की श्रेष्ठ सामग्री घोषणा प्रणाली का लाभ उठाते हुए react-i18next के साथ संगतता बनाए रखी जाए।

## सामग्री सूची

<TOC/>

## react-i18next के साथ Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरता स्थापित करें

आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**पैकेज विवरण:**

- **intlayer**: अंतरराष्ट्रीयकरण प्रबंधन, सामग्री घोषणा, और निर्माण के लिए मुख्य लाइब्रेरी
- **@intlayer/sync-json-plugin**: Intlayer सामग्री घोषणाओं को react-i18next संगत JSON प्रारूप में निर्यात करने के लिए प्लगइन

### चरण 2: JSON को रैप करने के लिए Intlayer प्लगइन लागू करें

अपने समर्थित लोकल्स को परिभाषित करने के लिए एक Intlayer कॉन्फ़िगरेशन फ़ाइल बनाएं:

**यदि आप react-i18next के लिए JSON शब्दकोश भी निर्यात करना चाहते हैं**, तो `syncJSON` प्लगइन जोड़ें:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` प्लगइन स्वचालित रूप से JSON को रैप करेगा। यह JSON फाइलों को पढ़ेगा और लिखेगा बिना सामग्री संरचना को बदले।

यदि आप उस JSON को intlayer सामग्री घोषणा फ़ाइलों (`.content` फ़ाइलें) के साथ सह-अस्तित्व में रखना चाहते हैं, तो Intlayer इस प्रकार आगे बढ़ेगा:

    1. JSON और सामग्री घोषणा फ़ाइलों दोनों को लोड करें और उन्हें intlayer शब्दकोश में परिवर्तित करें।
    2. यदि JSON और सामग्री घोषणा फ़ाइलों के बीच कोई संघर्ष होता है, तो Intlayer उन सभी शब्दकोशों को मर्ज करने की प्रक्रिया करेगा। यह प्लगइन्स की प्राथमिकता और सामग्री घोषणा फ़ाइल की प्राथमिकता पर निर्भर करता है (सभी कॉन्फ़िगर करने योग्य हैं)।

यदि CLI का उपयोग करके JSON का अनुवाद किया जाता है, या CMS का उपयोग किया जाता है, तो Intlayer नई अनुवादों के साथ JSON फ़ाइल को अपडेट करेगा।

`syncJSON` प्लगइन के बारे में अधिक विवरण देखने के लिए, कृपया [syncJSON प्लगइन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) देखें।

## Git कॉन्फ़िगरेशन

स्वचालित रूप से उत्पन्न Intlayer फ़ाइलों को अनदेखा करना अनुशंसित है:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

ये फ़ाइलें आपके बिल्ड प्रक्रिया के दौरान पुनः उत्पन्न की जा सकती हैं और इन्हें संस्करण नियंत्रण में कमिट करने की आवश्यकता नहीं है।

### VS कोड एक्सटेंशन

बेहतर डेवलपर अनुभव के लिए, आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल करें:

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
