---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: React और Next.js में एक कंपोनेंट को बहुभाषी (i18n लाइब्रेरी) कैसे बनाएं
description: Intlayer के साथ एक बहुभाषी React या Next.js कंपोनेंट बनाने के लिए स्थानीयकृत सामग्री को घोषित और पुनः प्राप्त करना सीखें।
keywords:
  - i18n
  - component
  - react
  - multilingual
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Intlayer के साथ एक कंपोनेंट को बहुभाषी (i18n) कैसे बनाएं

यह गाइड दो सामान्य सेटअप में एक UI कंपोनेंट को बहुभाषी बनाने के लिए न्यूनतम कदम दिखाता है:

- React (Vite/SPA)
- Next.js (App Router)

आप पहले अपनी सामग्री घोषित करेंगे, फिर इसे अपने कंपोनेंट में पुनः प्राप्त करेंगे।

## 1) अपनी सामग्री घोषित करें (React और Next.js दोनों के लिए साझा)

अपने कंपोनेंट के पास एक सामग्री घोषणा फ़ाइल बनाएं। यह अनुवादों को उस स्थान के करीब रखता है जहाँ उनका उपयोग होता है और टाइप सुरक्षा सक्षम करता है।

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

यदि आप कॉन्फ़िगरेशन फ़ाइलों को प्राथमिकता देते हैं तो JSON भी समर्थित है।

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) अपनी सामग्री पुनः प्राप्त करें

### केस A — React ऐप (Vite/SPA)

डिफ़ॉल्ट तरीका: कुंजी द्वारा पुनः प्राप्त करने के लिए `useIntlayer` का उपयोग करें। यह कंपोनेंट्स को हल्का और टाइप किया हुआ रखता है।

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

सर्वर-साइड रेंडरिंग या बाहरी प्रदाता: `react-intlayer/server` का उपयोग करें और आवश्यक होने पर स्पष्ट `locale` पास करें।

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

वैकल्पिक: यदि आप कॉल साइट पर संरचना को एक साथ रखना पसंद करते हैं, तो `useDictionary` पूरी घोषित वस्तु पढ़ सकता है।

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### मामला बी — Next.js (ऐप राउटर)

डेटा सुरक्षा और प्रदर्शन के लिए सर्वर कंपोनेंट्स को प्राथमिकता दें। सर्वर फाइलों में `next-intlayer/server` से `useIntlayer` का उपयोग करें, और क्लाइंट कंपोनेंट्स में `next-intlayer` से `useIntlayer` का उपयोग करें।

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

टिप: पेज मेटाडेटा और SEO के लिए, आप `getIntlayer` का उपयोग करके कंटेंट भी प्राप्त कर सकते हैं और `getMultilingualUrls` के माध्यम से बहुभाषी URL जनरेट कर सकते हैं।

## क्यों Intlayer का कंपोनेंट दृष्टिकोण सबसे अच्छा है

- **समीपता**: कंटेंट घोषणाएँ कंपोनेंट्स के पास रहती हैं, जिससे विचलन कम होता है और डिज़ाइन सिस्टम्स में पुन: उपयोग बेहतर होता है।
- **टाइप सुरक्षा**: कुंजियाँ और संरचनाएँ मजबूत प्रकारित होती हैं; गायब अनुवाद बिल्ड-टाइम पर ही सामने आते हैं, रनटाइम पर नहीं।
- **सर्वर-प्रथम**: बेहतर सुरक्षा और प्रदर्शन के लिए सर्वर कंपोनेंट्स में मूल रूप से काम करता है; क्लाइंट हुक्स सहज बने रहते हैं।
- **ट्री-शेकिंग**: केवल वही कंटेंट जो कंपोनेंट द्वारा उपयोग किया जाता है, उसे बंडल किया जाता है, जिससे बड़े ऐप्स में पेलोड छोटे रहते हैं।
- **डीएक्स और टूलिंग**: बिल्ट-इन मिडलवेयर, SEO हेल्पर्स, और वैकल्पिक विजुअल एडिटर/एआई अनुवाद रोज़मर्रा के काम को सरल बनाते हैं।

Next.js-केंद्रित राउंडअप में तुलना और पैटर्न देखें: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## संबंधित गाइड और संदर्भ

- React सेटअप (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack स्टार्ट: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Next.js सेटअप: https://intlayer.org/doc/environment/nextjs
- क्यों Intlayer बनाम next-intl बनाम next-i18next: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

इन पृष्ठों में एंड-टू-एंड सेटअप, प्रोवाइडर्स, रूटिंग, और SEO हेल्पर्स शामिल हैं।
