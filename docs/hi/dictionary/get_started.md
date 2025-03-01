# अपनी सामग्री की घोषणा शुरू करना

## फ़ाइल एक्सटेंशन

डिफ़ॉल्ट रूप से, Intlayer सामग्री घोषणाओं के लिए निम्नलिखित एक्सटेंशनों वाली सभी फ़ाइलों को देखता है:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

एप्लिकेशन डिफ़ॉल्ट रूप से `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` ग्लोब पैटर्न से मेल खाने वाली फ़ाइलों की खोज करेगा।

ये डिफ़ॉल्ट एक्सटेंशन अधिकांश एप्लिकेशन के लिए उपयुक्त हैं। हालांकि, यदि आपके पास विशिष्ट आवश्यकताएँ हैं, तो उन्हें प्रबंधित करने के निर्देशों के लिए [सामग्री एक्सटेंशन अनुकूलन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md#content-configuration) देखें।

कॉन्फ़िगरेशन विकल्पों की पूरी सूची के लिए, कॉन्फ़िगरेशन दस्तावेज़ देखें।

## अपनी सामग्री घोषित करें

अपनी डिक्शनरी बनाएं और प्रबंधित करें:

```tsx fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
    };
    multilingualContent: string;
    quantityContent: string;
    conditionalContent: string;
    nestedContent: string;
    markdownContent: string;
    externalContent: string;
  };
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "नमस्ते दुनिया",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      hi: "हिंदी सामग्री",
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
    nestedContent: nest(
      "navbar", // नेस्ट करने के लिए डिक्शनरी की कुंजी
      "login.button" // [वैकल्पिक] नेस्ट करने के लिए सामग्री का पथ
    ),
    externalContent: async () => await fetch("https://example.com"),
    markdownContent: md("# मार्कडाउन उदाहरण"),

    /*
     * केवल `react-intlayer` या `next-intlayer` का उपयोग करके उपलब्ध
     */
    jsxContent: <h1>मेरा शीर्षक</h1>,
  },
} satisfies Dictionary<Content>; // [वैकल्पिक] डिक्शनरी जेनेरिक है और आपकी डिक्शनरी के स्वरूपण को मजबूत करने की अनुमति देती है
```

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "नमस्ते दुनिया",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      hi: "हिंदी सामग्री",
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
    nestedContent: nest(
      "navbar", // नेस्ट करने के लिए डिक्शनरी की कुंजी
      "login.button" // [वैकल्पिक] नेस्ट करने के लिए सामग्री का पथ
    ),
    markdownContent: md("# मार्कडाउन उदाहरण"),
    externalContent: async () => await fetch("https://example.com"),

    // केवल `react-intlayer` या `next-intlayer` का उपयोग करके उपलब्ध
    jsxContent: <h1>मेरा शीर्षक</h1>,
  },
};
```

```javascript fileName="src/example.content.cjs" codeFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "नमस्ते दुनिया",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      hi: "हिंदी सामग्री",
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
    nestedContent: nest(
      "navbar", // नेस्ट करने के लिए डिक्शनरी की कुंजी
      "login.button" // [वैकल्पिक] नेस्ट करने के लिए सामग्री का पथ
    ),
    markdownContent: md("# मार्कडाउन उदाहरण"),
    externalContent: async () => await fetch("https://example.com"),

    // केवल `react-intlayer` या `next-intlayer` का उपयोग करके उपलब्ध
    jsxContent: <h1>मेरा शीर्षक</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  codeFormat="json"
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
        "hi": "हिंदी सामग्री",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "कोई कार नहीं",
        "1": "एक कार",
        "<-1": "माइनस एक से कम कार",
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
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# मार्कडाउन उदाहरण",
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

आप बिना किसी समस्या के एक फ़ंक्शन को दूसरे में इम्ब्रिकेट कर सकते हैं।

उदाहरण:

```javascript fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "जॉन डो";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','hi').hiMessage` `['नमस्ते', ' ', 'जॉन डो']` लौटाता है
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        hi: "नमस्ते",
      }),
      " ",
      getName(),
    ],
    // Composite content imbricating condition, enumeration, and multilingual content
    // `getIntlayer('page','hi').advancedContent(true)(10) 'कई वस्तुएं मिलीं' लौटाता है
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          hi: "कोई वस्तु नहीं मिली",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          hi: "एक वस्तु मिली",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          hi: "कई वस्तुएं मिलीं",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        hi: "कोई मान्य डेटा उपलब्ध नहीं है",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "जॉन डो";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','hi').hiMessage` `['नमस्ते', ' ', 'जॉन डो']` लौटाता है
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        hi: "नमस्ते",
      }),
      " ",
      getName(),
    ],
    // Composite content imbricating condition, enumeration, and multilingual content
    // `getIntlayer('page','hi').advancedContent(true)(10) 'कई वस्तुएं मिलीं' लौटाता है
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          hi: "कोई वस्तु नहीं मिली",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          hi: "एक वस्तु मिली",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          hi: "कई वस्तुएं मिलीं",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        hi: "कोई मान्य डेटा उपलब्ध नहीं है",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjs" codeFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "जॉन डो";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','hi').hiMessage` `['नमस्ते', ' ', 'जॉन डो']` लौटाता है
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        hi: "नमस्ते",
      }),
      " ",
      getName(),
    ],
    // Composite content imbricating condition, enumeration, and multilingual content
    // `getIntlayer('page','hi').advancedContent(true)(10) 'कई वस्तुएं मिलीं' लौटाता है
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          hi: "कोई वस्तु नहीं मिली",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          hi: "एक वस्तु मिली",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          hi: "कई वस्तुएं मिलीं",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        hi: "कोई मान्य डेटा उपलब्ध नहीं है",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  codeFormat="json"
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
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
            "hi": "नमस्ते",
          },
        },
        " ",
        "जॉन डो",
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
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "hi": "कोई वस्तु नहीं मिली",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "hi": "एक वस्तु मिली",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "hi": "कई वस्तुएं मिलीं",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
            "hi": "कोई मान्य डेटा उपलब्ध नहीं है",
          },
        },
      },
    },
  },
}
```
