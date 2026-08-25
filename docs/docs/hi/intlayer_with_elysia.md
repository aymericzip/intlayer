---
createdAt: 2026-08-23
updatedAt: 2026-08-24
title: "Elysia i18n - अपने ऐप्लिकेशन को अनुवाद करने के लिए संपूर्ण गाइड"
description: "अब i18next नहीं। बहुभाषी (i18n) Elysia ऐप्लिकेशन बनाने के लिए 2026 की गाइड। AI agents के साथ अनुवाद करें और bundle size, SEO और प्रदर्शन को अनुकूलित करें।"
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "गाइड को Elysia टेम्पलेट के अनुरूप बनाया गया (context टाइपिंग, Bun सेटअप, स्क्रिप्ट्स)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Intlayer का उपयोग करके अपनी Elysia backend वेबसाइट का अनुवाद करें | Internationalization (i18n)

`elysia-intlayer` Elysia अनुप्रयोगों के लिए एक शक्तिशाली अंतर्राष्ट्रीयकरण (i18n) प्लगइन है, जो आपकी backend services को विश्व स्तर पर सुलभ बनाने के लिए डिज़ाइन किया गया है, जो क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत responses प्रदान करके।

> GitHub पर package कार्यान्वयन देखें: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियां प्रदर्शित करना**: जब कोई त्रुटि होती है, तो उपयोगकर्ता की मूल भाषा में संदेश प्रदर्शित करने से समझ में सुधार होता है और निराशा कम होती है। यह विशेष रूप से गतिशील त्रुटि संदेशों के लिए उपयोगी है जो टोस्ट या मोडल जैसे फ्रंट-एंड घटकों में दिखाए जा सकते हैं।
- **बहुभाषी सामग्री प्राप्त करना**: डेटाबेस से सामग्री खींचने वाले अनुप्रयोगों के लिए, अंतर्राष्ट्रीयकरण सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में प्रदान कर सकें। यह e-commerce साइट्स या सामग्री प्रबंधन प्रणालियों जैसे प्लेटफॉर्म के लिए महत्वपूर्ण है जिन्हें उपयोगकर्ता द्वारा पसंद की गई भाषा में उत्पाद विवरण, लेख और अन्य सामग्री प्रदर्शित करने की आवश्यकता है।
- **बहुभाषी ईमेल भेजना**: चाहे वह लेनदेन संबंधी ईमेल हो, विपणन अभियान हो, या सूचनाएं हों, प्राप्तकर्ता की भाषा में ईमेल भेजने से सहभागिता और प्रभावशीलता में महत्वपूर्ण वृद्धि हो सकती है।
- **बहुभाषी पुश नोटिफिकेशन**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश नोटिफिकेशन भेजने से इंटरैक्शन और प्रतिधारण बढ़ सकते हैं। यह व्यक्तिगत स्पर्श नोटिफिकेशन को अधिक प्रासंगिक और कार्यान्वयन योग्य महसूस कराता है।
- **अन्य संचार**: बैकएंड से किसी भी प्रकार का संचार, जैसे SMS संदेश, सिस्टम अलर्ट, या उपयोगकर्ता इंटरफेस अपडेट, उपयोगकर्ता की भाषा में होने से लाभान्वित होता है, स्पष्टता सुनिश्चित करता है और समग्र उपयोगकर्ता अनुभव को बढ़ाता है।

बैकएंड को अंतर्राष्ट्रीयकृत करके, आपका अनुप्रयोग न केवल सांस्कृतिक अंतरों का सम्मान करता है बल्कि वैश्विक बाजार की आवश्यकताओं के साथ भी बेहतर ढंग से संरेखित होता है, जो दुनिया भर में आपकी सेवाओं को बढ़ाने का एक महत्वपूर्ण कदम है।

## शुरुआत करें

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

[Application Template](https://github.com/aymericzip/intlayer-elysia-template) को GitHub पर देखें।

### इंस्टॉलेशन

`elysia-intlayer` का उपयोग शुरू करने के लिए, npm का उपयोग करके पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` flag वैकल्पिक है। यदि आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके environment को डिटेक्ट करेगा और आवश्यक पैकेज इंस्टॉल करेगा। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> Elysia **Bun** रनटाइम को लक्षित करता है। `elysia-intlayer` `AsyncLocalStorage` पर निर्भर करता है (Node-आधारित Intlayer प्लगइन्स द्वारा उपयोग की जाने वाली `cls-hooked` लाइब्रेरी के बजाय), ठीक इसलिए क्योंकि Bun `async_hooks.createHook` को लागू नहीं करता।

### सेटअप

अपने प्रोजेक्ट रूट में `intlayer.config.ts` बनाकर अंतर्राष्ट्रीयकरण सेटिंग्स कॉन्फ़िगर करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * डिफ़ॉल्ट locale, जिसे fallback के रूप में उपयोग किया जाता है यदि अनुरोधित locale नहीं मिलता।
     */
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      hi: "अंग्रेजी में लौटाई गई सामग्री का उदाहरण",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "hi": "अंग्रेजी में लौटाई गई सामग्री का उदाहरण",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es": "Ejemplo de contenido devuelto en español"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएं आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं, बशर्ते कि वे `contentDir` निर्देशिका में शामिल हों (डिफ़ॉल्ट रूप से, `./src`)। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाएं (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### Elysia Application Setup

`elysia-intlayer` का उपयोग करने के लिए अपने Elysia application को सेटअप करें:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // अंतर्राष्ट्रीयकरण plugin को लोड करें
  .use(intlayer())
  // Routes
  .get("/", ({ intlayer }) => ({
    // इस request के लिए उपयोग किया जाने वाला Locale, `Accept-Language` negotiated या storage से पढ़ा गया
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      hi: "नमस्ते",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> प्लगइन अपना context एक **ग्लोबल** `derive` के माध्यम से रजिस्टर करता है, जिसे Elysia `Partial<{ intlayer: IntlayerContext }>` के रूप में टाइप करता है। `.use(intlayer())` के बाद रजिस्टर किए गए routes के लिए रनटाइम पर यह मान हमेशा मौजूद रहता है, इसलिए `strict` मोड में TypeScript को संतुष्ट करने के लिए non-null assertion (`intlayer!.locale`) — या optional chaining — का उपयोग करें।

Route context निम्नलिखित उपलब्ध कराता है:

| प्रॉपर्टी         | विवरण                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `locale`          | इस अनुरोध के लिए उपयोग की जाने वाली locale, जिसमें `locale_storage` को `locale_detected` पर वरीयता मिलती है। |
| `locale_storage`  | क्लाइंट द्वारा cookie या header के माध्यम से स्पष्ट रूप से मांगी गई locale।                                  |
| `locale_detected` | अनुरोध के headers से नेगोशिएट की गई locale।                                                                  |
| `defaultLocale`   | `intlayer.config.ts` में fallback के रूप में कॉन्फ़िगर की गई locale।                                         |
| `t`               | एक अनुवाद फ़ंक्शन।                                                                                           |
| `getIntlayer`     | कुंजी द्वारा dictionaries प्राप्त करने वाला फ़ंक्शन।                                                         |
| `getDictionary`   | dictionary ऑब्जेक्ट्स को प्रोसेस करने वाला फ़ंक्शन।                                                          |

वही helpers standalone exports के रूप में भी उपलब्ध हैं। ये `AsyncLocalStorage` के माध्यम से मौजूदा request को हल करते हैं, इसलिए आप इन्हें context को destructure किए बिना कॉल कर सकते हैं:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      hi: "अंग्रेजी में लौटाई गई सामग्री का उदाहरण",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> रिस्पॉन्स मैप होते ही रिक्वेस्ट संदर्भ मुक्त कर दिया जाता है, ताकि स्टैंडअलोन helpers कभी भी पहले से समाप्त हो चुके अनुरोध के विरुद्ध हल न हों। जब उन्हें प्लगइन द्वारा संभाले गए अनुरोध के बाहर कॉल किया जाता है, तो वे कॉन्फ़िगर की गई डिफ़ॉल्ट locale पर fallback करते हैं।

### अपना एप्लिकेशन चलाएँ

अपने `package.json` में Intlayer स्क्रिप्ट्स जोड़ें। `intlayer build` आपके content declarations को `.intlayer` डायरेक्टरी में कंपाइल करता है और TypeScript टाइप्स जनरेट करता है:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

फिर सर्वर शुरू करें:

```bash
bun run dev
```

`Accept-Language` के साथ locale negotiation का परीक्षण करें:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `bun run src/index.ts` से पहले `intlayer build` अनिवार्य नहीं है: प्लगइन Elysia ऐप के बूट होने पर भी dictionaries तैयार करता है। इसे पहले चलाने से जनरेट किए गए टाइप्स आपके एडिटर के लिए सिंक में रहते हैं और पहली request पर build की लागत नहीं आती।

### संगतता

`elysia-intlayer` पूरी तरह से संगत है:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md) React applications के लिए
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md) Next.js applications के लिए
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md) Vite applications के लिए

यह विभिन्न वातावरणों में किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ निर्बाध रूप से काम करता है, जिसमें browsers और API requests शामिल हैं।

डिफ़ॉल्ट रूप से, प्लगइन locale को इस क्रम में हल करता है:

1. `INTLAYER_LOCALE` कुकी।
2. `x-intlayer-locale` हेडर।
3. `Accept-Language` हेडर negotiation।

आप locale डिटेक्शन के लिए उपयोग किए जाने वाले कुकी और हेडर को कस्टमाइज़ कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य configuration options
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> अधिक जानकारी के लिए configuration और advanced topics पर, हमारी [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### TypeScript को कॉन्फ़िगर करें

`elysia-intlayer` अंतर्राष्ट्रीयकरण प्रक्रिया को बढ़ाने के लिए TypeScript की मजबूत क्षमताओं का लाभ उठाता है। TypeScript का static typing सुनिश्चित करता है कि हर translation key को ध्यान में रखा जाए, जिससे अनुवाद गायब होने का जोखिम कम होता है और maintainability में सुधार होता है।

सुनिश्चित करें कि autogenerated types (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts पर) आपकी tsconfig.json फ़ाइल में शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // Auto-generated types शामिल करें
  ],
}
```

### VS Code Extension

Intlayer के साथ अपने development experience को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code Extension** को install कर सकते हैं।

[VS Code Marketplace से Install करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह extension निम्नलिखित प्रदान करता है:

- **Autocompletion** translation keys के लिए।
- **Real-time error detection** missing translations के लिए।
- **Inline previews** translated content के लिए।
- **Quick actions** easily create और update translations के लिए।

Extension को कैसे use करें इस बारे में अधिक जानकारी के लिए, [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension) देखें।

### Git Configuration

यह अनुशंसा की जाती है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें। इससे आप उन्हें अपनी Git repository में commit करने से बच सकते हैं।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```
