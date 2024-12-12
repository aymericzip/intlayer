# Intlayer Documentation

Intlayer दस्तावेज़ में आपका स्वागत है। यह मार्गदर्शिका Intlayer, इसकी मुख्य विशेषताओं और आपके विकास अनुभव को बढ़ाने के लिए इन दस्तावेज़ों का प्रभावी ढंग से उपयोग करने के तरीके का अवलोकन प्रदान करती है।

## परिचय

### Intlayer क्या है?

**Intlayer** एक अंतरराष्ट्रीयकरण पुस्तकालय है जो विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह आपके कोड में हर जगह आपकी सामग्री की घोषणा करने की अनुमति देता है। यह बहुभाषी सामग्री की घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है ताकि इसे आपके कोड में आसानी से एकीकृत किया जा सके। TypeScript का उपयोग करते हुए, **Intlayer** आपके विकास को मजबूत और अधिक कुशल बनाता है।

Intlayer एक वैकल्पिक दृश्य संपादक भी प्रदान करता है जो आपको अपनी सामग्री को आसानी से संपादित और प्रबंधित करने की अनुमति देता है। यह संपादक विशेष रूप से उन डेवलपर्स के लिए उपयोगी है जो सामग्री प्रबंधन के लिए एक दृश्य इंटरफ़ेस को प्राथमिकता देते हैं, या उन टीमों के लिए जो कोड के बारे में चिंता किए बिना सामग्री उत्पन्न कर रही हैं।

## उपयोग का उदाहरण

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### मुख्य विशेषताएँ

Intlayer आधुनिक वेब विकास की जरूरतों को पूरा करने के लिए कई विशेषताएँ प्रदान करता है। नीचे प्रमुख विशेषताएँ दी गई हैं, प्रत्येक के लिए विस्तृत दस्तावेज़ों के लिंक के साथ:

- **अंतरराष्ट्रीयकरण समर्थन**: आपके आवेदन की वैश्विक पहुंच को बढ़ाने के लिए अंतर्निहित अंतरराष्ट्रीयकरण समर्थन के साथ।
- **दृश्य संपादक**: Intlayer के लिए डिज़ाइन किए गए संपादक प्लगइन के साथ अपने विकास कार्यप्रवाह में सुधार करें। [दृश्य संपादक गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) देखें।
- **कॉन्फ़िगरेशन लचीलापन**: [कॉन्फ़िगरेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) में विस्तृत कॉन्फ़िगरेशन विकल्पों के साथ अपने सेटअप को अनुकूलित करें।
- **उन्नत CLI उपकरण**: Intlayer के कमांड लाइन इंटरफ़ेस का उपयोग करके अपने प्रोजेक्ट्स को कुशलतापूर्वक प्रबंधित करें। [CLI उपकरण दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) में क्षमताओं का अन्वेषण करें।
- **i18n के साथ संगतता**: Intlayer अन्य अंतरराष्ट्रीयकरण पुस्तकालयों के साथ निर्बाध रूप से काम करता है। अधिक जानकारी के लिए [i18n गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_i18next.md) देखें।

### समर्थित प्लेटफार्म

Intlayer Next.js और React अनुप्रयोगों के साथ निर्बाध रूप से कार्य करने के लिए डिज़ाइन किया गया है। यह Vite और Create React App का भी समर्थन करता है।

- **Next.js एकीकरण**: सर्वर-साइड रेंडरिंग और स्थैतिक साइट जनरेशन के लिए Intlayer के भीतर Next.js की शक्ति का उपयोग करें। हमारे [Next.js एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) में विवरण उपलब्ध हैं।
- **Vite और React एकीकरण**: सर्वर-साइड रेंडरिंग और स्थैतिक साइट जनरेशन के लिए Intlayer के भीतर Vite का लाभ उठाएँ। हमारे [Vite और React एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) में विवरण उपलब्ध हैं।
- **Create React App एकीकरण**: सर्वर-साइड रेंडरिंग और स्थैतिक साइट जनरेशन के लिए Intlayer के भीतर Create React App की शक्ति का उपयोग करें। हमारे [Create React App एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) में विवरण उपलब्ध हैं।

### इस दस्तावेज़ का उपयोग कैसे करें

इस दस्तावेज़ से सर्वाधिक लाभ प्राप्त करने के लिए:

1. **प्रासंगिक अनुभागों पर जाएं**: ऊपर दिए गए लिंक का उपयोग करके सीधे उन अनुभागों पर जाएँ जो आपकी आवश्यकताओं को पूरा करते हैं।
2. **इंटरैक्टिव उदाहरण**: जहाँ उपलब्ध हो, सुविधाओं के काम करने के तरीके को सीधे देखने के लिए इंटरैक्टिव उदाहरणों का उपयोग करें।
3. **फीडबैक और योगदान**: आपकी प्रतिक्रिया मूल्यवान है। यदि आपके पास सुझाव या सुधार हैं, तो कृपया दस्तावेज़ में योगदान करने पर विचार करें।
