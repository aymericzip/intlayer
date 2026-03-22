---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - 2026 में Fastify ऐप का अनुवाद कैसे करें
description: जानें कि अपने Fastify बैकएंड को बहुभाषी कैसे बनाया जाए। इसे अंतर्राष्ट्रीयकरण (i18n) और अनुवाद करने के लिए दस्तावेज़ों का पालन करें।
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Intlayer
  - Fastify
  - JavaScript
  - बैकएंड
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "init कमांड जोड़ा गया"
  - version: 7.6.0
    date: 2025-12-31
    changes: "इतिहास शुरू किया गया"
---

# Intlayer का उपयोग करके अपने Fastify बैकएंड वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

`fastify-intlayer` Fastify अनुप्रयोगों के लिए एक शक्तिशाली अंतर्राष्ट्रीयकरण (i18n) प्लगइन है, जिसे क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएं प्रदान करके आपकी बैकएंड सेवाओं को विश्व स्तर पर सुलभ बनाने के लिए डिज़ाइन किया गया है।

> GitHub पर पैकेज कार्यान्वयन देखें: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियां प्रदर्शित करना**: जब कोई त्रुटि होती है, तो उपयोगकर्ता की मातृभाषा में संदेश प्रदर्शित करने से समझ में सुधार होता है और हताशा कम होती है। यह विशेष रूप से गतिशील त्रुटि संदेशों के लिए उपयोगी है जो टोस्ट या मोडल जैसे फ्रंट-एंड घटकों में दिखाए जा सकते हैं।
- **बहुभाषी सामग्री प्राप्त करना**: डेटाबेस से सामग्री प्राप्त करने वाले अनुप्रयोगों के लिए, अंतर्राष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में परोस सकें। यह ई-कॉमर्स साइटों या सामग्री प्रबंधन प्रणालियों जैसे प्लेटफार्मों के लिए महत्वपूर्ण है जिन्हें उपयोगकर्ता द्वारा पसंदीदा भाषा में उत्पाद विवरण, लेख और अन्य सामग्री प्रदर्शित करने की आवश्यकता होती है।
- **बहुभाषी ईमेल भेजना**: चाहे वह ट्रांजेक्शनल ईमेल हों, मार्केटिंग अभियान हों या सूचनाएं, प्राप्तकर्ता की भाषा में ईमेल भेजना जुड़ाव और प्रभावशीलता को काफी बढ़ा सकता है।
- **बहुभाषी पुश सूचनाएं**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएं भेजना बातचीत और प्रतिधारण में सुधार कर सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और कार्रवाई योग्य महसूस करा सकता है।
- **अन्य संचार**: बैकएंड से संचार का कोई भी रूप, जैसे एसएमएस संदेश, सिस्टम अलर्ट या यूजर इंटरफेस अपडेट, उपयोगकर्ता की भाषा में होने से लाभान्वित होता है, स्पष्टता सुनिश्चित करता है और समग्र उपयोगकर्ता अनुभव को बढ़ाता है।

बैकएंड को अंतर्राष्ट्रीय बनाकर, आपका अनुप्रयोग न केवल सांस्कृतिक मतभेदों का सम्मान करता है बल्कि वैश्विक बाजार की जरूरतों के साथ बेहतर रूप से मेल खाता है, जिससे यह आपकी सेवाओं को दुनिया भर में विस्तारित करने के लिए एक महत्वपूर्ण कदम बन जाता् है।

## शुरुआत करना

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीय कैसे बनाएं"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-fastify-template) देखें।

### इंस्टालेशन

`fastify-intlayer` का उपयोग शुरू करने के लिए, npm का उपयोग करके पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### सेटअप

अपने प्रोजेक्ट रूट में `intlayer.config.ts` बनाकर अंतर्राष्ट्रीयकरण सेटिंग्स कॉन्फ़िगर करें:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएं आपके अनुप्रयोग में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) से मेल खाती हों।

> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### Fastify अनुप्रयोग सेटअप

`fastify-intlayer` का उपयोग करने के लिए अपना Fastify अनुप्रयोग सेटअप करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// अंतर्राष्ट्रीयकरण प्लगइन लोड करें
await fastify.register(intlayer);

// मार्ग
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// सर्वर शुरू करें
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// अंतर्राष्ट्रीयकरण प्लगइन लोड करें
await fastify.register(intlayer);

// मार्ग
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// सर्वर शुरू करें
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// async/await के लिए सर्वर स्टार्ट रैपर
const start = async () => {
  try {
    // अंतर्राष्ट्रीयकरण प्लगइन लोड करें
    await fastify.register(intlayer);

    // मार्ग
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### अनुकूलता

`fastify-intlayer` पूरी तरह से इनके साथ संगत है:

- React अनुप्रयोगों के लिए [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)
- Next.js अनुप्रयोगों के लिए [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)
- Vite अनुप्रयोगों के लिए [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md)

यह ब्राउज़र और एपीआई अनुरोधों सहित विभिन्न वातावरणों में किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ निर्बाध रूप से काम करता है। आप हेडर्स या कुकीज़ के माध्यम से लोकेल का पता लगाने के लिए मिडलवेयर को कस्टमाइज़ कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

डिफ़ॉल्ट रूप से, `fastify-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर की व्याख्या करेगा।

> कॉन्फ़िगरेशन और उन्नत विषयों पर अधिक जानकारी के लिए, हमारे [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) पर जाएँ।

### TypeScript कॉन्फ़िगर करें

`fastify-intlayer` अंतर्राष्ट्रीयकरण प्रक्रिया को बढ़ाने के लिए TypeScript की मजबूत क्षमताओं का लाभ उठाता है। TypeScript की स्थिर टाइपिंग यह सुनिश्चित करती है कि हर अनुवाद कुंजी का ध्यान रखा गया है, जिससे लापता अनुवादों का जोखिम कम हो जाता है और रखरखाव में सुधार होता है।

सुनिश्चित करें कि ऑटो-जेनरेटेड टाइप (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts पर) आपकी tsconfig.json फ़ाइल में शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जेनरेटेड टाइप शामिल करें
  ],
}
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास के अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code Extension** इंस्टॉल कर सकते हैं।

[VS Code Marketplace से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **Autocompletion**।
- लापता अनुवादों के लिए **Real-time error detection**।
- अनुवादित सामग्री का **Inline previews**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **Quick actions**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक विवरण के लिए, [Intlayer VS Code Extension दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की अनुशंसा की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में प्रतिबद्ध करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer

```
