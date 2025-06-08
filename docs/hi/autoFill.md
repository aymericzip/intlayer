# स्वचालित भरण सामग्री घोषणा फ़ाइलें

**स्वचालित भरण सामग्री घोषणा फ़ाइलें** आपके विकास वर्कफ़्लो को तेज़ करने का एक तरीका हैं।

स्वचालित भरण तंत्र सामग्री घोषणा फ़ाइलों के बीच एक _मास्टर-स्लेव_ संबंध के माध्यम से काम करता है। जब मुख्य (मास्टर) फ़ाइल अपडेट होती है, तो Intlayer स्वचालित रूप से उन परिवर्तनों को व्युत्पन्न (स्वचालित रूप से भरी गई) घोषणा फ़ाइलों पर लागू करेगा।

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

यह `autoFill` निर्देश का उपयोग करने वाली [प्रति-भाषा सामग्री घोषणा फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/hi/per_locale_file.md) है।

फिर, जब आप निम्न कमांड चलाते हैं:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer स्वचालित रूप से `src/components/example/example.content.json` में व्युत्पन्न घोषणा फ़ाइल उत्पन्न करेगा, मुख्य फ़ाइल में अभी तक घोषित नहीं की गई सभी भाषाओं को भरते हुए।

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

बाद में, दोनों घोषणा फ़ाइलें एक शब्दकोश में विलय हो जाएंगी, जिसे मानक `useIntlayer("example")` हुक (react) / कंपोज़ेबल (vue) का उपयोग करके एक्सेस किया जा सकता है।

## स्वचालित भरण फ़ाइल प्रारूप

स्वचालित भरण घोषणा फ़ाइलों के लिए अनुशंसित प्रारूप **JSON** है, जो प्रारूप प्रतिबंधों से बचने में मदद करता है। हालांकि, Intlayer `.ts`, `.js`, `.mjs`, `.cjs` और अन्य प्रारूपों का भी समर्थन करता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // आपकी सामग्री
  },
};
```

यह फ़ाइल को यहां उत्पन्न करेगा:

```
src/components/example/example.filled.content.ts
```

> `.js`, `.ts` आदि फ़ाइलों का उत्पादन निम्नानुसार काम करता है:

> - यदि फ़ाइल पहले से मौजूद है, तो Intlayer AST (अमूर्त वाक्यविन्यास वृक्ष) का उपयोग करके प्रत्येक फ़ील्ड को खोजने और लुप्त अनुवादों को सम्मिलित करने के लिए इसका विश्लेषण करेगा।

> - यदि फ़ाइल मौजूद नहीं है, तो Intlayer सामग्री घोषणा फ़ाइलों के लिए डिफ़ॉल्ट टेम्पलेट का उपयोग करके इसे उत्पन्न करेगा।

## निरपेक्ष पथ

`autoFill` फ़ील्ड निरपेक्ष पथों का भी समर्थन करता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // आपकी सामग्री
  },
};
```

यह फ़ाइल को यहां उत्पन्न करेगा:

```
/messages/example.content.json
```

## प्रति-भाषा सामग्री घोषणा फ़ाइलों का स्वचालित उत्पादन

`autoFill` फ़ील्ड **प्रति-भाषा** सामग्री घोषणा फ़ाइलों के उत्पादन का भी समर्थन करता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // आपकी सामग्री
  },
};
```

यह दो अलग-अलग फ़ाइलें उत्पन्न करेगा:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## विशिष्ट भाषा स्वचालित भरण फ़िल्टरिंग

`autoFill` फ़ील्ड के लिए एक वस्तु का उपयोग आपको फ़िल्टर लागू करने और केवल विशिष्ट भाषा फ़ाइलें उत्पन्न करने की अनुमति देता है।

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // आपकी सामग्री
  },
};
```

यह केवल फ्रेंच अनुवाद फ़ाइल उत्पन्न करेगा।

## पथ चर

आप उत्पन्न फ़ाइलों के लक्ष्य पथों को गतिशील रूप से हल करने के लिए `autoFill` पथ के अंदर चर का उपयोग कर सकते हैं।

**उपलब्ध चर:**

- `{{locale}}` – भाषा कोड (उदाहरण: `fr`, `es`)
- `{{key}}` – शब्दकोश कुंजी (उदाहरण: `example`)

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // आपकी सामग्री
  },
};
```

यह उत्पन्न करेगा:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`
