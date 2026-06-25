---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary हुक - React Intlayer दस्तावेज़ीकरण
description: React अनुप्रयोगों में Intlayer के साथ useDictionary हुक का उपयोग करने के लिए पूर्ण मार्गदर्शिका, जो बिना विज़ुअल एडिटर के स्थानीयकृत सामग्री को कुशलतापूर्वक संभालने में मदद करता है।
keywords:
  - useDictionary
  - React
  - हुक
  - intlayer
  - स्थानीयकरण
  - i18n
  - शब्दकोश
  - अनुवाद
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "इतिहास प्रारंभ किया गया"
author: aymericzip
---

## React में उदाहरण उपयोग

नीचे एक उदाहरण दिया गया है कि कैसे `useDictionary` हुक को एक React कंपोनेंट में उपयोग किया जाए:

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## सर्वर एकीकरण

यदि आप `IntlayerProvider` के बाहर `useDictionary` हुक का उपयोग कर रहे हैं, तो कंपोनेंट को रेंडर करते समय लोकल को स्पष्ट रूप से एक पैरामीटर के रूप में प्रदान करना आवश्यक है:

```tsx fileName="./ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## अतिरिक्त सुझाव

- **टाइप सुरक्षा**: अपने शब्दकोशों को परिभाषित करने के लिए हमेशा `Dictionary` का उपयोग करें ताकि टाइप सुरक्षा सुनिश्चित हो सके।
- **स्थानीयकरण अपडेट्स**: जब कंटेंट अपडेट करें, तो सुनिश्चित करें कि सभी लोकल्स संगत हों ताकि अनुवाद गायब न हों।

यह दस्तावेज़ `useDictionary` हुक के इंटीग्रेशन पर केंद्रित है, जो स्थानीयकृत कंटेंट को प्रबंधित करने के लिए एक सुव्यवस्थित दृष्टिकोण प्रदान करता है, बिना विज़ुअल एडिटर की कार्यक्षमताओं पर निर्भर हुए।
