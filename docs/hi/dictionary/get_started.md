# सामग्री के लिए शुरुआत

## फ़ाइल एक्सटेंशन

डिफ़ॉल्ट रूप से, Intlayer सामग्री घोषणाओं के लिए निम्नलिखित एक्सटेंशन वाली सभी फ़ाइलों पर नज़र रखता है:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

ऐप्लिकेशन डिफ़ॉल्ट रूप से `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` ग्लो पैटर्न से मेल खाने वाली फ़ाइलों की खोज करेगा।

ये डिफ़ॉल्ट एक्सटेंशन अधिकांश ऐप्लिकेशन के लिए उपयुक्त हैं। हालाँकि, यदि आपके पास विशिष्ट आवश्यकताएँ हैं, तो उन्हें प्रबंधित करने के लिए निर्देशों के लिए [सामग्री एक्सटेंशन कस्टमाइजेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md#content-configuration) पर जाएँ।

कॉन्फ़िगरेशन विकल्पों की पूरी सूची के लिए, कॉन्फ़िगरेशन दस्तावेज़ पर जाएँ।

## अपनी सामग्री को घोषित करें

अपनी सामग्री शब्दकोश बनाएं और प्रबंधित करें:

```typescript fileName="src/app/[locale]/page.content.ts" codeFormat="typescript"
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
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "एक से कम कार",
      "-1": "एक कार कम",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "बहुत सी कारें",
    }),
  },
} satisfies Dictionary<Content>;
```

```javascript fileName="src/app/[locale]/page.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "एक से कम कार",
      "-1": "एक कार कम",
      0: "कोई कार नहीं",
      1: "एक कार",
      ">5": "कुछ कारें",
      ">19": "बहुत सी कारें",
    }),
  },
};
```

```javascript fileName="src/app/[locale]/page.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
module.exports = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "एक से कम कार",
      "-1": "एक कार कम",
      0: "कोई कार नहीं",
      1: "एक कार",
      ">5": "कुछ कारें",
      ">19": "बहुत सी कारें",
    }),
  },
};
```

```json5 fileName="src/app/[locale]/page.content.json"  codeFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "एक से कम कार",
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
