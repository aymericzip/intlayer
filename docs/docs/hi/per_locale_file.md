---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Intlayer में `प्रति-स्थान` सामग्री घोषणा की घोषणा
description: Intlayer में प्रति-स्थान सामग्री कैसे घोषित करें यह जानें। विभिन्न प्रारूपों और उपयोग मामलों को समझने के लिए दस्तावेज़ का पालन करें।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - प्रति-स्थान
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
---

# Intlayer में `प्रति-स्थान` सामग्री घोषणा की घोषणा

Intlayer बहुभाषी सामग्री घोषित करने के दो तरीके समर्थित करता है:

- सभी अनुवादों के साथ एकल फ़ाइल
- प्रत्येक स्थान के लिए एक फ़ाइल (प्रति-स्थान प्रारूप)

यह लचीलापन सक्षम करता है:

- अन्य i18n टूल्स से आसान माइग्रेशन
- स्वचालित अनुवाद वर्कफ़्लो के लिए समर्थन
- अनुवादों का स्पष्ट संगठन, अलग-अलग, स्थान-विशिष्ट फ़ाइलों में

## एकल फ़ाइल में कई अनुवाद

यह प्रारूप आदर्श है:

- कोड में त्वरित पुनरावृत्ति के लिए।
- CMS के साथ सहज एकीकरण के लिए।

यह अधिकांश उपयोग मामलों के लिए अनुशंसित दृष्टिकोण है। यह अनुवादों को केंद्रीकृत करता है, जिससे पुनरावृत्ति करना और CMS के साथ एकीकृत करना आसान हो जाता है।

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// यह एक शब्दकोश है जो विभिन्न भाषाओं में सामग्री का प्रतिनिधित्व करता है
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// यह एक शब्दकोश है जो विभिन्न भाषाओं में सामग्री का प्रतिनिधित्व करता है
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> अनुशंसित: यह प्रारूप तब सबसे अच्छा होता है जब आप Intlayer के विज़ुअल एडिटर का उपयोग कर रहे हों या सीधे कोड में अनुवादों का प्रबंधन कर रहे हों।

## प्रति-स्थान प्रारूप

यह प्रारूप तब उपयोगी होता है जब:

- आप अनुवादों को स्वतंत्र रूप से संस्करणित या ओवरराइड करना चाहते हैं।
- आप मशीन या मानव अनुवाद कार्यप्रवाहों को एकीकृत कर रहे हैं।

आप अनुवादों को व्यक्तिगत स्थान फ़ाइलों में भी विभाजित कर सकते हैं, स्थान फ़ील्ड निर्दिष्ट करके:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // महत्वपूर्ण
  content: { multilingualContent: "मेरे घटक का शीर्षक" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // महत्वपूर्ण
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // महत्वपूर्ण
  content: { multilingualContent: "मेरे घटक का शीर्षक" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // महत्वपूर्ण
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // महत्वपूर्ण
  content: {
    multilingualContent: "मेरे घटक का शीर्षक",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // महत्वपूर्ण
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // महत्वपूर्ण
  "content": {
    "multilingualContent": "मेरे घटक का शीर्षक",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // महत्वपूर्ण
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> महत्वपूर्ण: सुनिश्चित करें कि locale फ़ील्ड परिभाषित है। यह Intlayer को बताता है कि फ़ाइल किस भाषा का प्रतिनिधित्व करती है।

> नोट: दोनों मामलों में, सामग्री घोषणा फ़ाइल को नामकरण पैटर्न `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` का पालन करना चाहिए ताकि Intlayer द्वारा पहचाना जा सके। `.[locale]` प्रत्यय वैकल्पिक है और केवल नामकरण सम्मेलन के रूप में उपयोग किया जाता है।

## प्रारूपों का मिश्रण

आप एक ही सामग्री कुंजी के लिए दोनों घोषणा दृष्टिकोणों को संयोजित कर सकते हैं। उदाहरण के लिए:

- अपनी मूल सामग्री को स्थैतिक रूप से एक फ़ाइल में घोषित करें जैसे कि index.content.ts।
- विशिष्ट अनुवादों को अलग-अलग फ़ाइलों में जोड़ें या ओवरराइड करें जैसे कि index.fr.content.ts या index.content.json।

यह सेटअप विशेष रूप से उपयोगी है जब:

- आप कोड में प्रारंभिक सामग्री संरचना को परिभाषित करना चाहते हैं।
- आप बाद में CMS या स्वचालित उपकरणों का उपयोग करके अनुवादों को समृद्ध या पूरा करने की योजना बनाते हैं।

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### उदाहरण

यहाँ एक बहुभाषी सामग्री घोषणा फ़ाइल है:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "मेरे घटक का शीर्षक",
    projectName: "मेरा प्रोजेक्ट",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer स्वचालित रूप से बहुभाषी और प्रति-स्थान फ़ाइलों को मर्ज करता है।

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // डिफ़ॉल्ट लोकल ENGLISH है, इसलिए यह ENGLISH सामग्री लौटाएगा

console.log(JSON.stringify(intlayer, null, 2));
// परिणाम:
// {
//  "multilingualContent": "मेरे घटक का शीर्षक",
//  "projectName": "मेरा प्रोजेक्ट"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// परिणाम:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "मेरा प्रोजेक्ट"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// परिणाम:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "मेरा प्रोजेक्ट"
// }
```

### स्वचालित अनुवाद निर्माण

### स्वचालित अनुवाद निर्माण

अपने पसंदीदा सेवाओं के आधार पर गायब अनुवादों को स्वचालित रूप से भरने के लिए [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) का उपयोग करें।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
