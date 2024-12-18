# सामग्री की घोषणा की शुरुआत करें

## फ़ाइलों के एक्सटेंशन

डिफ़ॉल्ट रूप से, Intlayer सभी फ़ाइलों को निम्नलिखित एक्सटेंशनों के लिए सामग्री घोषणाओं के लिए देखता है:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

ऐप्लिकेशन डिफ़ॉल्ट रूप से `./src/**/*.content.{ts,tsx,js,mjs,cjs}` ग्लोब पैटर्न से मेल खाने वाली फ़ाइलों को खोजेगा।

ये डिफ़ॉल्ट एक्सटेंशन अधिकांश ऐप्स के लिए उपयुक्त हैं। हालाँकि, यदि आपके पास विशिष्ट आवश्यकताएँ हैं, तो उन्हें प्रबंधित करने के लिए सामग्री एक्सटेंशन अनुकूलन गाइड देखें।

कॉन्फ़िगरेशन विकल्पों की पूरी सूची के लिए, कॉन्फ़िगरेशन दस्तावेज़ देखें।

## अपनी सामग्री की घोषणा करें

अपनी सामग्री शब्दकोश बनाएँ और प्रबंधित करें:

### टाइपस्क्रिप्ट का उपयोग करना

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

interface Content {
  getStarted: {
    main: string;
    pageLink: string;
  };
  numberOfCar: string;
}

export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "संपादित करके आरंभ करें",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "एक कार से कम",
      "-1": "एक कार कम",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "बहुत सी कारें",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### ECMAScript मॉड्यूल्स का उपयोग करना

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "संपादित करके आरंभ करें",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "एक कार से कम",
      "-1": "एक कार कम",
      0: "कोई कार नहीं",
      1: "एक कार",
      ">5": "कुछ कारें",
      ">19": "बहुत सी कारें",
    }),
  },
};
```

### कॉमनजेएस मॉड्यूल्स का उपयोग करना

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
module.exports = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "संपादित करके आरंभ करें",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "एक कार से कम",
      "-1": "एक कार कम",
      0: "कोई कार नहीं",
      1: "एक कार",
      ">5": "कुछ कारें",
      ">19": "बहुत सी कारें",
    }),
  },
};
```

### JSON का उपयोग करना

```json5
// src/app/[locale]/page.content.json

{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "संपादित करके आरंभ करें",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "एक कार से कम",
        "-1": "एक कार कम",
        "0": "कोई कार नहीं",
        "1": "एक कार",
        ">5": "कुछ कारें",
        ">19": "बहुत सी कारें",
      },
    },
  },
}
```

चेतावनी, JSON सामग्री की घोषणा कार्य फ़ेचिंग को लागू करना असंभव बनाती है [function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/function_fetching.md)
