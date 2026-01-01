---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: अपने Fastify बैकएंड का अनुवाद कैसे करें – i18n गाइड 2026
description: जानिए कि कैसे अपने Fastify बैकएंड को बहुभाषी बनाएं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद करने के लिए दस्तावेज़ का पालन करें।
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: init कमांड जोड़ें
  - version: 7.6.0
    date: 2025-12-31
    changes: इतिहास आरंभ करें
---

# Intlayer का उपयोग करके अपने Fastify बैकएंड वेबसाइट का अनुवाद करें | Internationalization (i18n)

`fastify-intlayer` एक शक्तिशाली internationalization (i18n) प्लगइन है जो Fastify एप्लिकेशनों के लिए बनाया गया है, और यह क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएँ प्रदान करके आपके backend सेवाओं को वैश्विक रूप से सुलभ बनाता है।

### व्यावहारिक उपयोग के मामले

- **बैकएंड त्रुटियों को उपयोगकर्ता की भाषा में दिखाना**: जब कोई त्रुटि होती है, संदेशों को उपयोगकर्ता की मातृभाषा में दिखाने से समझ बेहतर होती है और असंतोष कम होता है। यह विशेष रूप से उन dynamic error messages के लिए उपयोगी है जिन्हें front-end components जैसे toasts या modals में दिखाया जा सकता है।
- **बहुभाषी सामग्री प्राप्त करना**: उन एप्लिकेशनों के लिए जो डेटाबेस से सामग्री खींचती हैं, internationalization यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में परोस सकें। यह उन प्लेटफ़ॉर्म्स के लिए महत्वपूर्ण है जैसे e-commerce साइट्स या content management systems जिन्हें उत्पाद विवरण, लेख, और अन्य सामग्री उपयोगकर्ता की पसंदीदा भाषा में दिखाने की आवश्यकता होती है।
- **बहुभाषी ईमेल भेजना**: चाहे वह transactional emails हों, marketing campaigns हों, या notifications हों, प्राप्तकर्ता की भाषा में ईमेल भेजना engagement और प्रभावशीलता को महत्वपूर्ण रूप से बढ़ा सकता है।
- **बहुभाषी पुश सूचनाएँ**: मोबाइल एप्लिकेशनों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएँ भेजना इंटरैक्शन और रिटेंशन बढ़ा सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और कार्रवाई योग्य महसूस करा सकता है।
- **अन्य संचार**: बैकएंड से किसी भी प्रकार का संचार, जैसे SMS संदेश, सिस्टम अलर्ट, या यूजर इंटरफेस अपडेट, उपयोगकर्ता की भाषा में होने पर स्पष्टता सुनिश्चित करता है और समग्र उपयोगकर्ता अनुभव को बेहतर बनाता है।

बैकएंड को अंतरराष्ट्रीयकरण करने से आपका एप्लिकेशन न केवल सांस्कृतिक भिन्नताओं का सम्मान करता है बल्कि वैश्विक बाजार की जरूरतों के साथ बेहतर ढंग से संरेखित होता है, जिससे आपकी सेवाओं को विश्व स्तर पर स्केल करने में यह एक महत्वपूर्ण कदम बन जाता है।

## आरंभ करना

### इंस्टॉलेशन

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

अपने प्रोजेक्ट रूट में `intlayer.config.ts` फ़ाइल बनाकर अंतरराष्ट्रीयकरण सेटिंग्स कॉन्फ़िगर करें:

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

### अपना कंटेंट घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी कंटेंट घोषणाएँ बनाएं और प्रबंधित करें:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      hi: "अंग्रेज़ी में लौटाए गए कंटेंट का उदाहरण",
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

/* इस ऑब्जेक्ट का प्रकार import('intlayer').Dictionary है */
/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      hi: "लौटाई गई सामग्री का उदाहरण (अंग्रेज़ी)",
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
/* इस ऑब्जेक्ट का प्रकार import('intlayer').Dictionary है */
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      hi: "लौटाई गई सामग्री का उदाहरण (अंग्रेज़ी)",
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
        "hi": "अंग्रेज़ी में लौटाए गए कंटेंट का उदाहरण",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> आपकी कंटेंट घोषणाएँ आपकी एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं बशर्ते वे `contentDir` निर्देशिका में शामिल हों (डिफ़ॉल्ट रूप से, `./src`)। और यह कंटेंट घोषणा फ़ाइल एक्सटेंशन से मेल खानी चाहिए (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक जानकारी के लिए, [कंटेंट घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### Fastify एप्लिकेशन सेटअप

अपने Fastify एप्लिकेशन को `fastify-intlayer` इस्तेमाल करने के लिए सेटअप करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// अंतरराष्ट्रीयकरण प्लगइन लोड करें
await fastify.register(intlayer);

// रूट्स
fastify.get("/t_example", async (_req, reply) => {
  return t({
    hi: "लौटाई गई सामग्री का उदाहरण (अंग्रेज़ी)",
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

// internationalization प्लगइन लोड करें
await fastify.register(intlayer);

// रूट्स
fastify.get("/t_example", async (_req, reply) => {
  return t({
    hi: "अंग्रेज़ी में लौटाए गए कंटेंट का उदाहरण",
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

// सर्वर आरंभ करें
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
    // अंतरराष्ट्रीयकरण प्लगइन लोड करें
    await fastify.register(intlayer);

    // रूट्स
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        hi: "वापस की गई सामग्री का उदाहरण (अंग्रेज़ी में)",
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

### संगतता

`fastify-intlayer` पूरी तरह से संगत है:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)>) React अनुप्रयोगों के लिए
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)>) Next.js अनुप्रयोगों के लिए

/// [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)>) React एप्लिकेशन के लिए

- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)>) Next.js एप्लिकेशन के लिए
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md)>) Vite अनुप्रयोगों के लिए

यह किसी भी internationalization समाधान के साथ विभिन्न वातावरणों में—ब्राउज़र और API अनुरोधों सहित—सहज रूप से काम करता है। आप middleware को हेडर या कुकीज़ के माध्यम से locale का पता लगाने के लिए अनुकूलित कर सकते हैं:

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

डिफ़ॉल्ट रूप से, `fastify-intlayer` क्लाइंट की प्राथमिक भाषा निर्धारित करने के लिए `Accept-Language` हेडर की व्याख्या करेगा।

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

> कॉन्फ़िगरेशन और उन्नत विषयों पर अधिक जानकारी के लिए, हमारी [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### TypeScript को कॉन्फ़िगर करें

`fastify-intlayer` अंतरराष्ट्रीयकरण प्रक्रिया को बेहतर बनाने के लिए TypeScript की मजबूत क्षमताओं का उपयोग करता है। TypeScript की static typing यह सुनिश्चित करती है कि हर अनुवाद कुंजी शामिल हो, जिससे गायब अनुवादों का जोखिम कम होता है और मेंटेनबिलिटी सुधरती है।

सुनिश्चित करें कि ऑटो-जेनरेट किए गए टाइप्स (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts पर) आपकी tsconfig.json फ़ाइल में शामिल किए गए हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपका मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपका मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जनरेटेड टाइप्स को शामिल करें
  ],
}
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code Extension** को इंस्टॉल कर सकते हैं।

[VS Code Marketplace से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **Autocompletion**।
- ग़ायब अनुवादों के लिए **Real-time error detection**।
- अनुवादित सामग्री के **Inline previews**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **Quick actions**।

एक्सटेंशन का उपयोग कैसे करें, इसके बारे में अधिक जानकारी के लिए देखें: [Intlayer VS Code Extension प्रलेखन](https://intlayer.org/doc/vs-code-extension).

### Git कॉन्फ़िगरेशन

सिफारिश की जाती है कि Intlayer द्वारा जनरेट की गई फाइलों को ignore किया जाए। इससे आप उन्हें अपने Git रिपॉज़िटरी में commit करने से बच सकते हैं।

### VS Code एक्सटेंशन

Intlayer के साथ अपने डेवलपमेंट अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code Extension** इंस्टॉल कर सकते हैं।

[VS Code Marketplace से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- **Autocompletion**: अनुवाद कुंजियों के लिए स्वत: सुझाव।
- **Real-time error detection**: गायब अनुवादों के लिए वास्तविक समय में त्रुटि पहचान।
- **Inline previews**: अनुवादित सामग्री का इनलाइन पूर्वावलोकन।
- **Quick actions**: अनुवाद को आसानी से बनाने और अपडेट करने के लिए त्वरित क्रियाएं।

एक्सटेंशन का उपयोग कैसे करें इस पर अधिक जानकारी के लिए, देखें [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

### Git कॉन्फ़िगरेशन

सुझाव दिया जाता है कि Intlayer द्वारा उत्पन्न फ़ाइलों को ignore किया जाए। इससे आप उन्हें अपने Git रिपॉज़िटरी में commit करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्न निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```
