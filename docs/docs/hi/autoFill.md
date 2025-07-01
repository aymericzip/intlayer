---
docName: autoFill
url: https://intlayer.org/doc/concept/auto-fill
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: ऑटो फिल
description: Intlayer में ऑटो फिल फ़ंक्शन का उपयोग कैसे करें ताकि पूर्वनिर्धारित पैटर्न के आधार पर सामग्री स्वचालित रूप से भरी जा सके। अपने प्रोजेक्ट में ऑटो फिल फीचर्स को कुशलतापूर्वक लागू करने के लिए इस दस्तावेज़ का पालन करें।
keywords:
  - ऑटो फिल
  - सामग्री स्वचालन
  - गतिशील सामग्री
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# ऑटोफिल सामग्री घोषणा फ़ाइल अनुवाद

**ऑटोफिल सामग्री घोषणा फ़ाइलें** आपके विकास कार्यप्रवाह को तेज़ करने का एक तरीका हैं।
ऑटोफिल तंत्र सामग्री घोषणा फ़ाइलों के बीच एक _मास्टर-स्लेव_ संबंध के माध्यम से काम करता है। जब मुख्य (मास्टर) फ़ाइल अपडेट होती है, तो Intlayer स्वचालित रूप से उन परिवर्तनों को व्युत्पन्न (ऑटोफिल की गई) घोषणा फ़ाइलों पर लागू कर देगा।

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

// exampleContent एक शब्दकोश के रूप में परिभाषित है जो सामग्री को दर्शाता है
const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "यह सामग्री का एक उदाहरण है",
  },
} satisfies Dictionary;

export default exampleContent;
```

यहाँ एक [प्रति-भाषा सामग्री घोषणा फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) है जो `autoFill` निर्देश का उपयोग करती है।

फिर, जब आप निम्नलिखित कमांड चलाते हैं:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer स्वचालित रूप से व्युत्पन्न घोषणा फ़ाइल `src/components/example/example.content.json` में बनाएगा, मुख्य फ़ाइल में पहले से घोषित नहीं किए गए सभी स्थानीय भाषाओं को भरते हुए।

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

उसके बाद, दोनों घोषणा फ़ाइलों को एकल शब्दकोश में मर्ज किया जाएगा, जिसे मानक `useIntlayer("example")` हुक (react) / कॉम्पोज़ेबल (vue) का उपयोग करके एक्सेस किया जा सकता है।

## ऑटोफिल्ड फ़ाइल प्रारूप

स्वचालित रूप से भरे गए घोषणा फ़ाइलों के लिए अनुशंसित प्रारूप **JSON** है, जो स्वरूपण प्रतिबंधों से बचने में मदद करता है। हालांकि, Intlayer `.ts`, `.js`, `.mjs`, `.cjs`, और अन्य प्रारूपों का भी समर्थन करता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // आपका कंटेंट
  },
};
```

यह फ़ाइल इस स्थान पर उत्पन्न होगी:

```
src/components/example/example.filled.content.ts
```

> `.js`, `.ts`, और समान फ़ाइलों का निर्माण इस प्रकार काम करता है:
>
> - यदि फ़ाइल पहले से मौजूद है, तो Intlayer इसे AST (Abstract Syntax Tree) का उपयोग करके पार्स करेगा ताकि प्रत्येक फ़ील्ड का पता लगाया जा सके और कोई भी गायब अनुवाद जोड़ा जा सके।
> - यदि फ़ाइल मौजूद नहीं है, तो Intlayer इसे डिफ़ॉल्ट कंटेंट घोषणा फ़ाइल टेम्पलेट का उपयोग करके उत्पन्न करेगा।

## पूर्ण पथ (Absolute Paths)

`autoFill` फ़ील्ड पूर्ण पथों का भी समर्थन करता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // आपका कंटेंट
  },
};
```

यह फ़ाइल इस स्थान पर उत्पन्न होगी:

```
/messages/example.content.json
```

## प्रति-स्थान कंटेंट घोषणा फ़ाइलों का स्वचालित निर्माण

`autoFill` फ़ील्ड **प्रति-स्थान** कंटेंट घोषणा फ़ाइलों के निर्माण का भी समर्थन करता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // आपका कंटेंट
  },
};
```

यह दो अलग-अलग फ़ाइलें उत्पन्न करेगा:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## विशिष्ट स्थानीय ऑटोफिल फ़िल्टर करें

`autoFill` फ़ील्ड के लिए एक ऑब्जेक्ट का उपयोग करने से आप फ़िल्टर लागू कर सकते हैं और केवल विशिष्ट स्थानीय फ़ाइलें उत्पन्न कर सकते हैं।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // आपका कंटेंट
  },
};
```

यह केवल फ्रेंच अनुवाद फ़ाइल उत्पन्न करेगा।

## पथ चर (Path Variables)

आप उत्पन्न फ़ाइलों के लक्षित पथों को गतिशील रूप से हल करने के लिए `autoFill` पथ के अंदर चर का उपयोग कर सकते हैं।

**उपलब्ध चर:**

- `{{locale}}` – स्थानीय कोड (जैसे `fr`, `es`)
- `{{key}}` – शब्दकोश कुंजी (जैसे `example`)

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // आपका कंटेंट
  },
};
```

यह उत्पन्न करेगा:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: इतिहास प्रारंभ किया गया
