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
  - package
  - react-intlayer
  - useDictionary
---

# React एकीकरण: `useDictionary` हुक दस्तावेज़ीकरण

यह अनुभाग React अनुप्रयोगों के भीतर `useDictionary` हुक का उपयोग करने के लिए विस्तृत मार्गदर्शन प्रदान करता है, जो बिना विज़ुअल एडिटर के स्थानीयकृत सामग्री को कुशलतापूर्वक संभालने में सक्षम बनाता है।

## React में `useDictionary` को इम्पोर्ट करना

`useDictionary` हुक को संदर्भ के आधार पर React अनुप्रयोगों में इस प्रकार इम्पोर्ट किया जा सकता है:

- **क्लाइंट कंपोनेंट:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // क्लाइंट-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // क्लाइंट-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // क्लाइंट-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

- **सर्वर कंपोनेंट:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // सर्वर-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // सर्वर-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // सर्वर-साइड React कंपोनेंट्स में उपयोग किया जाता है
  ```

## पैरामीटर

यह हुक दो पैरामीटर स्वीकार करता है:

1. **`dictionary`**: एक घोषित शब्दकोश ऑब्जेक्ट जिसमें विशिष्ट कुंजियों के लिए स्थानीयकृत सामग्री होती है।
2. **`locale`** (वैकल्पिक): इच्छित स्थानीय भाषा। यदि निर्दिष्ट नहीं किया गया है, तो वर्तमान संदर्भ की स्थानीय भाषा डिफ़ॉल्ट होती है।

## शब्दकोश

सभी शब्दकोश ऑब्जेक्ट्स को संरचित सामग्री फ़ाइलों में घोषित किया जाना चाहिए ताकि टाइप सुरक्षा सुनिश्चित हो सके और रनटाइम त्रुटियों को रोका जा सके। आप [सेटअप निर्देश यहाँ पा सकते हैं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)। यहाँ सामग्री घोषणा का एक उदाहरण है:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// यह एक शब्दकोश प्रकार का ऑब्जेक्ट है जो एक क्लाइंट कंपोनेंट उदाहरण की सामग्री को परिभाषित करता है
const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// यह एक शब्दकोश प्रकार का ऑब्जेक्ट है जो एक क्लाइंट कंपोनेंट उदाहरण की सामग्री को परिभाषित करता है
const componentContent = {
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

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "यह एक क्लाइंट कंपोनेंट उदाहरण की सामग्री है",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## React में उदाहरण उपयोग

नीचे एक उदाहरण दिया गया है कि कैसे `useDictionary` हुक को एक React कंपोनेंट में उपयोग किया जाए:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
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

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
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

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
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

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## गुणों पर नोट्स

विज़ुअल एडिटर्स का उपयोग करने वाले इंटीग्रेशन के विपरीत, यहाँ `buttonTitle.value` जैसे गुण लागू नहीं होते हैं। इसके बजाय, सीधे अपने कंटेंट में घोषित स्थानीयकृत स्ट्रिंग्स तक पहुँचें।

```jsx
<button title={content.title}>{content.content}</button>
```

## अतिरिक्त सुझाव

- **टाइप सुरक्षा**: अपने शब्दकोशों को परिभाषित करने के लिए हमेशा `Dictionary` का उपयोग करें ताकि टाइप सुरक्षा सुनिश्चित हो सके।
- **स्थानीयकरण अपडेट्स**: जब कंटेंट अपडेट करें, तो सुनिश्चित करें कि सभी लोकल्स संगत हों ताकि अनुवाद गायब न हों।

यह दस्तावेज़ `useDictionary` हुक के इंटीग्रेशन पर केंद्रित है, जो स्थानीयकृत कंटेंट को प्रबंधित करने के लिए एक सुव्यवस्थित दृष्टिकोण प्रदान करता है, बिना विज़ुअल एडिटर की कार्यक्षमताओं पर निर्भर हुए।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: इतिहास प्रारंभ किया गया
