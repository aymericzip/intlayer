---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useDictionary हुक दस्तावेज़ | next-intlayer
description: next-intlayer पैकेज के लिए useDictionary हुक का उपयोग कैसे करें देखें
keywords:
  - useDictionary
  - शब्दकोश
  - कुंजी
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - जावास्क्रिप्ट
  - रिएक्ट
slugs:
  - doc
  - packages
  - next-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# रिएक्ट एकीकरण: `useDictionary` हुक दस्तावेज़

यह अनुभाग React अनुप्रयोगों में `useDictionary` हुक का उपयोग करने के लिए विस्तृत मार्गदर्शन प्रदान करता है, जो बिना विज़ुअल एडिटर के स्थानीयकृत सामग्री को कुशलतापूर्वक संभालने में सक्षम बनाता है।

## React में `useDictionary` को इम्पोर्ट करना

`useDictionary` हुक को React अनुप्रयोगों में संदर्भ के आधार पर इम्पोर्ट करके एकीकृत किया जा सकता है:

- **क्लाइंट कंपोनेंट:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // क्लाइंट-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // क्लाइंट-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // क्लाइंट-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

- **सर्वर कंपोनेंट:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // सर्वर-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // सर्वर-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // सर्वर-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

## पैरामीटर

यह हुक दो पैरामीटर स्वीकार करता है:

1. **`dictionary`**: एक घोषित शब्दकोश ऑब्जेक्ट जिसमें विशिष्ट कुंजियों के लिए स्थानीयकृत सामग्री होती है।
2. **`locale`** (वैकल्पिक): इच्छित लोकल। यदि निर्दिष्ट नहीं किया गया है, तो वर्तमान संदर्भ के लोकल का उपयोग किया जाता है।

## शब्दकोश

सभी शब्दकोश ऑब्जेक्ट्स को संरचित सामग्री फ़ाइलों में घोषित किया जाना चाहिए ताकि टाइप सुरक्षा सुनिश्चित हो सके और रनटाइम त्रुटियों को रोका जा सके। आप [सेटअप निर्देश यहाँ पा सकते हैं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)। यहाँ सामग्री घोषणा का एक उदाहरण है:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## React क्लाइंट कंपोनेंट में उदाहरण उपयोग

नीचे एक उदाहरण दिया गया है कि `useDictionary` हुक को React कंपोनेंट में कैसे उपयोग किया जाए:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## React सर्वर कंपोनेंट में उदाहरण उपयोग

यदि आप `IntlayerServerProvider` के बाहर `useDictionary` हुक का उपयोग कर रहे हैं, तो कंपोनेंट को रेंडर करते समय स्थानीय भाषा को स्पष्ट रूप से पैरामीटर के रूप में प्रदान करना आवश्यक है:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## गुणों पर नोट्स

विज़ुअल एडिटर्स का उपयोग करने वाले इंटीग्रेशन के विपरीत, `buttonTitle.value` जैसे गुण यहाँ लागू नहीं होते। इसके बजाय, सीधे अपने कंटेंट में घोषित स्थानीयकृत स्ट्रिंग्स तक पहुँचें।

```jsx
<button title={content.title}>{content.content}</button>
```

## अतिरिक्त सुझाव

- **टाइप सुरक्षा**: टाइप सुरक्षा सुनिश्चित करने के लिए हमेशा अपने शब्दकोशों को परिभाषित करने के लिए `Dictionary` का उपयोग करें।
- **स्थानीयकरण अपडेट्स**: जब कंटेंट अपडेट करें, तो सभी लोकल्स को सुसंगत बनाए रखें ताकि अनुवाद गायब न हों।

यह दस्तावेज़ `useDictionary` हुक के एकीकरण पर केंद्रित है, जो स्थानीयकृत कंटेंट को प्रबंधित करने के लिए एक सरल तरीका प्रदान करता है बिना विज़ुअल एडिटर की कार्यक्षमताओं पर निर्भर हुए।
