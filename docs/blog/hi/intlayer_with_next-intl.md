---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayer का उपयोग करके अपने next-intl JSON अनुवादों को स्वचालित कैसे करें
description: Next.js अनुप्रयोगों में बेहतर अंतरराष्ट्रीयकरण के लिए Intlayer और next-intl के साथ अपने JSON अनुवादों को स्वचालित करें।
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON प्लगइन में बदलाव
---

# Intlayer का उपयोग करके अपने next-intl JSON अनुवादों को स्वचालित कैसे करें

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण लाइब्रेरी है जिसे पारंपरिक i18n समाधानों की कमियों को दूर करने के लिए डिज़ाइन किया गया है। यह Next.js अनुप्रयोगों में सामग्री प्रबंधन के लिए एक आधुनिक दृष्टिकोण प्रदान करता है।

हमारे [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md) ब्लॉग पोस्ट में next-intl के साथ एक ठोस तुलना देखें।

## Intlayer को next-intl के साथ क्यों मिलाएं?

जबकि Intlayer एक उत्कृष्ट स्वतंत्र i18n समाधान प्रदान करता है (हमारे [Next.js एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md) देखें), आप इसे कई कारणों से next-intl के साथ मिलाना चाह सकते हैं:

1. **मौजूदा कोडबेस**: आपके पास एक स्थापित next-intl कार्यान्वयन है और आप धीरे-धीरे Intlayer के बेहतर डेवलपर अनुभव की ओर माइग्रेट करना चाहते हैं।
2. **पुराने आवश्यकताएं**: आपके प्रोजेक्ट को मौजूदा next-intl प्लगइन्स या वर्कफ़्लोज़ के साथ संगतता की आवश्यकता है।
3. **टीम की परिचितता**: आपकी टीम next-intl के साथ सहज है लेकिन बेहतर सामग्री प्रबंधन चाहती है।

**इसके लिए, Intlayer को next-intl के लिए एक एडाप्टर के रूप में लागू किया जा सकता है ताकि CLI या CI/CD पाइपलाइनों में आपके JSON अनुवादों को स्वचालित करने, आपके अनुवादों का परीक्षण करने और अधिक में मदद मिल सके।**

यह गाइड आपको दिखाता है कि कैसे Intlayer की श्रेष्ठ सामग्री घोषणा प्रणाली का लाभ उठाते हुए next-intl के साथ संगतता बनाए रखी जाए।

## सामग्री सूची

<TOC/>

## next-intl के साथ Intlayer सेटअप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरताएँ स्थापित करें

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

- **intlayer**: अंतरराष्ट्रीयकरण प्रबंधन, सामग्री घोषणा, और निर्माण के लिए मुख्य पुस्तकालय
- **@intlayer/sync-json-plugin**: Intlayer सामग्री घोषणाओं को next-intl संगत JSON प्रारूप में निर्यात करने के लिए प्लगइन

### चरण 2: JSON को लपेटने के लिए Intlayer प्लगइन लागू करें

अपने समर्थित लोकल्स को परिभाषित करने के लिए एक Intlayer कॉन्फ़िगरेशन फ़ाइल बनाएं:

**यदि आप next-intl के लिए JSON शब्दकोश भी निर्यात करना चाहते हैं**, तो `syncJSON` प्लगइन जोड़ें:

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

`syncJSON` प्लगइन स्वचालित रूप से JSON को लपेटेगा। यह JSON फ़ाइलों को पढ़ेगा और लिखेगा बिना सामग्री संरचना को बदले।

यदि आप उस JSON को intlayer सामग्री घोषणा फ़ाइलों (`.content` फ़ाइलें) के साथ सह-अस्तित्व में रखना चाहते हैं, तो Intlayer इस प्रकार आगे बढ़ेगा:

    1. JSON और सामग्री घोषणा दोनों फ़ाइलों को लोड करेगा और उन्हें intlayer शब्दकोश में परिवर्तित करेगा।
    2. यदि JSON और सामग्री घोषणा फ़ाइलों के बीच कोई संघर्ष होता है, तो Intlayer उन सभी शब्दकोशों को मर्ज करने की प्रक्रिया करेगा। यह प्लगइन्स की प्राथमिकता और सामग्री घोषणा फ़ाइल की प्राथमिकता पर निर्भर करता है (सभी कॉन्फ़िगर करने योग्य हैं)।

यदि JSON का अनुवाद करने के लिए CLI का उपयोग करके या CMS का उपयोग करके परिवर्तन किए जाते हैं, तो Intlayer नई अनुवादों के साथ JSON फ़ाइल को अपडेट करेगा।

## Git कॉन्फ़िगरेशन

स्वचालित रूप से उत्पन्न Intlayer फ़ाइलों को अनदेखा करने की सलाह दी जाती है:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

ये फ़ाइलें आपके बिल्ड प्रक्रिया के दौरान पुनः उत्पन्न की जा सकती हैं और इन्हें संस्करण नियंत्रण में कमिट करने की आवश्यकता नहीं है।

### VS कोड एक्सटेंशन

बेहतर डेवलपर अनुभव के लिए, आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल करें:

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
