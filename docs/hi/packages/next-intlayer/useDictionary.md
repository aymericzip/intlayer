# React इंटीग्रेशन: `useDictionary` हुक दस्तावेज़ीकरण

यह अनुभाग React एप्लिकेशन में `useDictionary` हुक का उपयोग करने के लिए विस्तृत मार्गदर्शन प्रदान करता है, जो बिना विज़ुअल एडिटर के स्थानीयकृत सामग्री को कुशलतापूर्वक संभालने में सक्षम बनाता है।

## React में `useDictionary` इम्पोर्ट करना

React एप्लिकेशन में `useDictionary` हुक को संदर्भ के आधार पर इम्पोर्ट करके एकीकृत किया जा सकता है:

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

## पैरामीटर्स

हुक दो पैरामीटर्स स्वीकार करता है:

1. **`dictionary`**: एक घोषित डिक्शनरी ऑब्जेक्ट जिसमें विशिष्ट कुंजियों के लिए स्थानीयकृत सामग्री होती है।
2. **`locale`** (वैकल्पिक): इच्छित लोकेल। यदि निर्दिष्ट नहीं किया गया है, तो यह वर्तमान संदर्भ के लोकेल पर डिफ़ॉल्ट होता है।

## डिक्शनरी

सभी डिक्शनरी ऑब्जेक्ट्स को संरचित सामग्री फ़ाइलों में घोषित किया जाना चाहिए ताकि टाइप सेफ्टी सुनिश्चित हो और रनटाइम त्रुटियों को रोका जा सके। सेटअप निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) पाए जा सकते हैं। सामग्री घोषणा का एक उदाहरण यहाँ दिया गया है:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      hi: "क्लाइंट कंपोनेंट का उदाहरण",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      hi: "यह क्लाइंट कंपोनेंट उदाहरण की सामग्री है",
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
      hi: "क्लाइंट कंपोनेंट का उदाहरण",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      hi: "यह क्लाइंट कंपोनेंट उदाहरण की सामग्री है",
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
      hi: "क्लाइंट कंपोनेंट का उदाहरण",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      hi: "यह क्लाइंट कंपोनेंट उदाहरण की सामग्री है",
    }),
  },
};

module.exports = exampleContent;
```

## React क्लाइंट कंपोनेंट में उपयोग का उदाहरण

नीचे `useDictionary` हुक का उपयोग करने का एक उदाहरण दिया गया है:

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

## React सर्वर कंपोनेंट में उपयोग का उदाहरण

यदि आप `IntlayerServerProvider` के बाहर `useDictionary` हुक का उपयोग कर रहे हैं, तो कंपोनेंट को रेंडर करते समय लोकेल को स्पष्ट रूप से पैरामीटर के रूप में प्रदान करना होगा:

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

## विशेषताओं पर नोट्स

विज़ुअल एडिटर का उपयोग करने वाले इंटीग्रेशन के विपरीत, `buttonTitle.value` जैसे विशेषताएँ यहाँ लागू नहीं होती हैं। इसके बजाय, अपनी सामग्री में घोषित स्थानीयकृत स्ट्रिंग्स को सीधे एक्सेस करें।

```jsx
<button title={content.title}>{content.content}</button>
```

## अतिरिक्त सुझाव

- **टाइप सेफ्टी**: अपनी डिक्शनरी को परिभाषित करने के लिए हमेशा `Dictionary` का उपयोग करें ताकि टाइप सेफ्टी सुनिश्चित हो सके।
- **स्थानीयकरण अपडेट्स**: सामग्री को अपडेट करते समय, सुनिश्चित करें कि सभी लोकेल्स सुसंगत हैं ताकि अनुवाद छूट न जाए।

यह दस्तावेज़ीकरण `useDictionary` हुक के इंटीग्रेशन पर केंद्रित है, जो विज़ुअल एडिटर कार्यक्षमताओं पर निर्भर किए बिना स्थानीयकृत सामग्री को प्रबंधित करने के लिए एक सुव्यवस्थित दृष्टिकोण प्रदान करता है।
