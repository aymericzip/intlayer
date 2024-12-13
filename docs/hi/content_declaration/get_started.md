# सामग्री की घोषणा के लिए प्रारंभ करना

## अपने प्रोजेक्ट के लिए Intlayer कॉन्फ़िगर करें

[NextJS के साथ intlayer का उपयोग कैसे करें देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)

[ReactJS के साथ intlayer का उपयोग कैसे करें देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)

[Vite और React के साथ intlayer का उपयोग कैसे करें देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md)

## पैकेज स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## अपनी सामग्री प्रबंधित करें

अपनी सामग्री शब्दकोशों को बनाएं और प्रबंधित करें:

### टाइपस्क्रिप्ट का उपयोग करना

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
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
    nestedContent: {
      id: "enumeration",
      numberOfCar: enu({
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars",
      }),
    },
  },
} satisfies DeclarationContent;

// सामग्री को डिफ़ॉल्ट के रूप में निर्यात किया जाना चाहिए
export default pageContent;
```

### ECMAScript मॉड्यूल का उपयोग करना

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      0: "No cars",
      1: "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

// सामग्री को डिफ़ॉल्ट के रूप में निर्यात किया जाना चाहिए
export default pageContent;
```

### CommonJS मॉड्यूल का उपयोग करना

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      0: "No cars",
      1: "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

// सामग्री को डिफ़ॉल्ट के रूप में निर्यात किया जाना चाहिए
module.exports = pageContent;
```

### JSON का उपयोग करना

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    },
  },
}
```

चेतावनी, JSON सामग्री घोषणा कार्य फ़ेचिंग को लागू करना असंभव बनाती है [function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/function_fetching.md)
