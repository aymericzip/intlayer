# Intlayer बहुभाषी सामग्री घोषित करने के दो तरीके प्रदान करता है:

- सभी अनुवादों के साथ एकल फ़ाइल
- प्रति-स्थानीय फ़ाइल (प्रति-स्थानीय प्रारूप)

यह लचीलापन सक्षम करता है:

- अन्य i18n उपकरणों से आसान माइग्रेशन
- स्वचालित अनुवाद वर्कफ़्लो के लिए समर्थन
- अनुवादों को अलग-अलग, स्थानीय-विशिष्ट फ़ाइलों में स्पष्ट रूप से व्यवस्थित करना

## कई अनुवादों के साथ एकल फ़ाइल

यह प्रारूप आदर्श है:

- कोड में त्वरित पुनरावृत्ति के लिए।
- CMS के साथ सहज एकीकरण के लिए।

यह अधिकांश उपयोग मामलों के लिए अनुशंसित दृष्टिकोण है। यह अनुवादों को केंद्रीकृत करता है, जिससे CMS के साथ पुनरावृत्ति और एकीकरण करना आसान हो जाता है।

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      hi: "मेरे घटक का शीर्षक",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      hi: "मेरे घटक का शीर्षक",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      hi: "मेरे घटक का शीर्षक",
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
        "hi": "मेरे घटक का शीर्षक",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> अनुशंसित: यह प्रारूप Intlayer के दृश्य संपादक का उपयोग करते समय या सीधे कोड में अनुवाद प्रबंधित करते समय सबसे अच्छा है।

## प्रति-स्थानीय प्रारूप

यह प्रारूप उपयोगी है जब:

- आप अनुवादों को स्वतंत्र रूप से संस्करणित या अधिलेखित करना चाहते हैं।
- आप मशीन या मानव अनुवाद वर्कफ़्लो को एकीकृत कर रहे हैं।

आप स्थानीय फ़ील्ड निर्दिष्ट करके अनुवादों को व्यक्तिगत स्थानीय फ़ाइलों में भी विभाजित कर सकते हैं:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // महत्वपूर्ण
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // महत्वपूर्ण
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // महत्वपूर्ण
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // जरूरी
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
    multilingualContent: "Title of my component",
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
    "multilingualContent": "Title of my component",
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

> महत्वपूर्ण: सुनिश्चित करें कि स्थानीय फ़ील्ड परिभाषित है। यह Intlayer को बताता है कि फ़ाइल किस भाषा का प्रतिनिधित्व करती है।

> नोट: दोनों मामलों में, सामग्री घोषणा फ़ाइल को Intlayer द्वारा पहचाने जाने के लिए `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` नामकरण पैटर्न का पालन करना चाहिए। `.[locale]` प्रत्यय वैकल्पिक है और केवल एक नामकरण सम्मेलन के रूप में उपयोग किया जाता है।

## प्रारूपों का मिश्रण

आप एक ही सामग्री कुंजी के लिए दोनों दृष्टिकोणों को मिला सकते हैं। उदाहरण के लिए:

डिफ़ॉल्ट या आधार सामग्री को स्थिर रूप से घोषित करें (जैसे, `index.content.ts`)

स्थानीय-विशिष्ट सामग्री को `index.content.json`, `index.fr.content.ts`, आदि में जोड़ें या अधिलेखित करें।

यह विशेष रूप से उपयोगी है जब:

- आप अपनी आधार सामग्री कोडबेस में स्थिर रूप से घोषित करना चाहते हैं और CMS में अनुवादों के साथ स्वचालित रूप से भरना चाहते हैं।

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
    multilingualContent: "Title of my component",
    projectName: "My project",
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
        "hi": "मेरे घटक का शीर्षक",
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer स्वचालित रूप से बहुभाषी और प्रति-स्थानीय फ़ाइलों को मर्ज करता है।

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // डिफ़ॉल्ट स्थानीय ENGLISH है, इसलिए यह ENGLISH सामग्री लौटाएगा

console.log(JSON.stringify(intlayer, null, 2));
// परिणाम:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// परिणाम:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// परिणाम:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### स्वचालित अनुवाद पीढ़ी

अपनी पसंदीदा सेवाओं के आधार पर गायब अनुवादों को स्वचालित रूप से भरने के लिए [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) का उपयोग करें।
