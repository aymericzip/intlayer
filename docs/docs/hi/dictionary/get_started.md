---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: शब्दकोश | शुरू करें
description: अपने बहुभाषी वेबसाइट में शब्दकोशों को घोषित करने और उपयोग करने का तरीका जानें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके कुछ ही मिनटों में अपने प्रोजेक्ट को सेटअप करें।
keywords:
  - शुरू करें
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
---

# अपनी सामग्री की घोषणा शुरू करना

<iframe title="i18n, Markdown, JSON… इसे प्रबंधित करने के लिए एकल समाधान | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## फ़ाइल एक्सटेंशन्स

डिफ़ॉल्ट रूप से, Intlayer सामग्री घोषणाओं के लिए निम्नलिखित एक्सटेंशन्स वाली सभी फ़ाइलों पर नज़र रखता है:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

एप्लिकेशन डिफ़ॉल्ट रूप से `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` ग्लोब पैटर्न से मेल खाने वाली फ़ाइलों की खोज करेगा।

ये डिफ़ॉल्ट एक्सटेंशन्स अधिकांश अनुप्रयोगों के लिए उपयुक्त हैं। हालांकि, यदि आपकी विशिष्ट आवश्यकताएँ हैं, तो उन्हें प्रबंधित करने के निर्देशों के लिए [content extension customization guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#content-configuration) देखें।

कॉन्फ़िगरेशन विकल्पों की पूरी सूची के लिए, कॉन्फ़िगरेशन दस्तावेज़ देखें।

## अपनी सामग्री घोषित करें

अपने शब्दकोश बनाएँ और प्रबंधित करें:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "हैलो वर्ल्ड",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // पर्यावरण चर का उपयोग करता है
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "माइनस एक से कम कार",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
    conditionalContent: cond({
      true: "सत्यापन सक्षम है",
      false: "सत्यापन अक्षम है",
    }),
    insertionContent: insert("नमस्ते {{name}}!"),
    nestedContent: nest(
      "navbar", // नेस्ट करने के लिए शब्दकोश की कुंजी
      "login.button" // [वैकल्पिक] नेस्ट करने के लिए सामग्री का पथ
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# मार्कडाउन उदाहरण"),

    /*
     * केवल `react-intlayer` या `next-intlayer` का उपयोग करते समय उपलब्ध
     */
    jsxContent: <h1>मेरा शीर्षक</h1>,
  },
} satisfies Dictionary<Content>; // [वैकल्पिक] Dictionary सामान्य है और यह आपको अपने शब्दकोश के स्वरूपण को मजबूत करने की अनुमति देता है
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "नमस्ते दुनिया",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // जावास्क्रिप्ट पर्यावरण चर
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "माइनस एक से कम कार",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
    conditionalContent: cond({
      true: "सत्यापन सक्षम है",
      false: "सत्यापन अक्षम है",
    }),
    insertionContent: insert("नमस्ते {{name}}!"),
    nestedContent: nest(
      "navbar", // नेस्ट करने के लिए शब्दकोश की कुंजी
      "login.button" // [वैकल्पिक] नेस्ट करने के लिए सामग्री का पथ
    ),
    markdownContent: md("# मार्कडाउन उदाहरण"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // केवल `react-intlayer` या `next-intlayer` का उपयोग करते समय उपलब्ध
    jsxContent: <h1>मेरा शीर्षक</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "नमस्ते दुनिया",
        numberContent: 123,
        booleanContent: true, // बूलियन मान
        javaScriptContent: `${process.env.NODE_ENV}`, // जावास्क्रिप्ट एनवायरनमेंट वैरिएबल
      },
      imbricatedArray: [1, 2, 3], // नेस्टेड एरे
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "माइनस एक से कम कार",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
    conditionalContent: cond({
      true: "मान्यता सक्षम है",
      false: "मान्यता अक्षम है",
    }),
    insertionContent: insert("नमस्ते {{name}}!"),
    nestedContent: nest(
      "navbar", // नेस्ट करने के लिए शब्दकोश की कुंजी
      "login.button" // [वैकल्पिक] नेस्ट करने के लिए सामग्री का पथ
    ),
    markdownContent: md("# मार्कडाउन उदाहरण"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // केवल `react-intlayer` या `next-intlayer` का उपयोग करते समय उपलब्ध
    jsxContent: <h1>मेरा शीर्षक</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "नमस्ते दुनिया",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "कोई कार नहीं",
        "1": "एक कार",
        "<-1": "माइनस एक कार से कम",
        "-1": "माइनस एक कार",
        ">5": "कुछ कारें",
        ">19": "कई कारें",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "सत्यापन सक्षम है",
        "false": "सत्यापन अक्षम है",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "नमस्ते {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# मार्कडाउन उदाहरण",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["मेरा शीर्षक"],
      },
    },
  },
}
```

## फ़ंक्शन इम्ब्रिकेशन

आप बिना किसी समस्या के एक फ़ंक्शन को दूसरे फ़ंक्शन के अंदर इम्ब्रिकेट कर सकते हैं।

उदाहरण:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` लौटाता है `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // संयोजित सामग्री जिसमें condition, enumeration, और बहुभाषी सामग्री शामिल है
    // `getIntlayer('page','en').advancedContent(true)(10)` लौटाता है 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "एक आइटम मिला",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "कई आइटम मिले",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "कोई मान्य डेटा उपलब्ध नहीं है",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` लौटाता है `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // संयोजित सामग्री जिसमें शर्त, गणना, और बहुभाषी सामग्री शामिल है
    // `getIntlayer('page','en').advancedContent(true)(10)` लौटाता है 'कई आइटम मिले'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "कोई आइटम नहीं मिला",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "एक आइटम मिला",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "कई आइटम मिले",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "कोई मान्य डेटा उपलब्ध नहीं है",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` लौटाता है `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // संयोजित सामग्री जिसमें स्थिति, गणना, और बहुभाषी सामग्री शामिल है
    // `getIntlayer('page','en').advancedContent(true)(10)` लौटाता है 'कई आइटम मिले'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "कोई आइटम नहीं मिला",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "एक आइटम मिला",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "कई आइटम मिले",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "कोई मान्य डेटा उपलब्ध नहीं है",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "नमस्ते",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "कोई आइटम नहीं मिला",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "एक आइटम मिला",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "कई आइटम मिले",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "कोई मान्य डेटा उपलब्ध नहीं है",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

## अतिरिक्त संसाधन

Intlayer में अधिक विवरण के लिए, निम्नलिखित संसाधनों को देखें:

- [प्रति-स्थान सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/per_locale_file.md)
- [अनुवाद सामग्री प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md)
- [सूचीकरण सामग्री प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/enumeration.md)
- [शर्त सामग्री प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/condition.md)
- [सम्मिलन सामग्री प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md)
- [फ़ाइल सामग्री प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/file.md)
- [नेस्टिंग सामग्री प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/nesting.md)
- [मार्कडाउन सामग्री प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md)
- [फ़ंक्शन फ़ेचिंग सामग्री प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/function_fetching.md)

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
