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

> GitHub पर [package कार्यान्वयन देखें](https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer)।

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
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
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

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Elysia अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **बुनियादी शब्दकोश**: बिना प्रकार या टूलिंग के।
- **`Intlayer`**: विशेष रूप से Bun और Elysia के लिए अनुकूलित, बिल्ड समय संकलन, सख्त TypeScript प्रकार और उच्च प्रदर्शन।

बैकएंड का अंतर्राष्ट्रीयकरण करने का मुख्य कारण यह है कि उपयोगकर्ता द्वारा पढ़े जाने वाले टेक्स्ट का एक बड़ा हिस्सा कभी भी फ्रंटएंड से होकर नहीं गुजरता: API त्रुटि संदेश, लेन-देन संबंधी ईमेल, पुश सूचनाएं, SMS और PDF निर्यात। इन्हें प्रति सत्र के बजाय प्रति अनुरोध हल की गई प्राप्तकर्ता की भाषा की आवश्यकता होती है।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे Elysia सर्वर बंडल आकार को कितना बढ़ाता है?">

पारंपरिक JSON कैटलॉग की तुलना में बहुत कम। Intlayer कंपाइलर बिल्ड समय पर शब्दकोशों को अनुकूलित करता है और प्रत्येक अनुरोध पर उन्हें फिर से पार्स नहीं करता है, जिससे मेमोरी उपयोग और कोल्ड स्टार्ट समय न्यूनतम रहता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

</Question>

<Question title="क्या मैं अपने हैंडलर को फिर से लिखे बिना अन्य i18n लाइब्रेरी से माइग्रेट कर सकता हूँ?">

हाँ, माइग्रेशन गाइड और JSON सिंक्रनाइज़ेशन प्लगइन का पालन करके।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

पूर्ण स्वचालन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) बिल्ड समय पर यही काम करता है और प्रत्येक परिवर्तन पर शब्दकोश उत्पन्न करता है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: एक कुंजी से सामग्री फ़ाइल तक जाएं, स्ट्रिंग्स निकालें, और कमांड पैलेट से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next` कॉल को भी संभालता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="आने वाले अनुरोधों पर क्लाइंट भाषा का पता कैसे लगाया जाता है?">

Elysia प्लगइन `onRequest` या `derive` चरण में हेडर और कुकीज़ पढ़ता है, `context.locale` में लोकेल इंजेक्ट करता है।

</Question>

<Question title="क्या वही सामग्री घोषणा मेरी API प्रतिक्रियाओं और वेब फ़्रंटएंड दोनों की सेवा कर सकती है?">

हाँ, मोनोरेपो या साझा पैकेजों में यह एक प्रमुख लाभ है। घोषित शब्दकोश को बैकएंड (ईमेल, त्रुटियां, API प्रतिक्रियाएं) और फ़्रंटएंड (React, Vue, Svelte आदि) में आयात किया जा सकता है, जिससे सभी टेक्स्ट के लिए सत्य का एक ही स्रोत बना रहता है।

</Question>

<Question title="क्या Intlayer अनुरोध हैंडलिंग को धीमा करता है?">

नहीं। भाषा का पता लगाना बेहद हल्के मिडलवेयर (कुकी, क्वेरी, या Accept-Language पढ़कर) में किया जाता है। शब्दकोश बिल्ड समय पर संकलित होते हैं और मेमोरी में रहते हैं, इसलिए अनुरोध आने पर कोई डिस्क रीडिंग या स्ट्रिंग पार्सिंग नहीं होती है।

</Question>

<Question title="त्रुटि प्रतिक्रियाओं, ईमेल और पुश सूचनाओं को स्थानीयकृत कैसे करें?">

अनुरोध लोकेल के आधार पर `getIntlayer` या `t()` फ़ंक्शन को कॉल करके। यदि उपयोगकर्ता की भाषा डेटाबेस में संग्रहीत है, तो फ़ंक्शन को अनुरोध के बाहर पृष्ठभूमि नौकरियों के लिए स्पष्ट रूप से लक्षित लोकेल के साथ कॉल किया जा सकता है।

</Question>

<Question title="क्या Intlayer Bun रनटाइम के साथ पूरी तरह से संगत है?">

हाँ। Intlayer Bun पर मूल रूप से चलता है, तेज़ मॉड्यूल लोडिंग और सीधे TypeScript निष्पादन का लाभ उठाता है।

</Question>

<Question title="क्या मैं Elysia TypeBox स्कीमा में स्थानीयकृत त्रुटि संदेशों का उपयोग कर सकता हूँ?">

हाँ। `onError` हुक पर, आप स्कीमा सत्यापन त्रुटियों को पकड़ सकते हैं और Intlayer के माध्यम से स्थानीयकृत प्रतिक्रिया लौटा सकते हैं।

</Question>

<Question title="URL में लोकेल-आधारित रूटिंग का प्रबंधन कैसे करें?">

मार्गों में `/:locale/` पथ पैरामीटर का उपयोग करके और अज्ञात भाषाओं के लिए 404 लौटाकर।

</Question>

<Question title="मैं ऐप को AI के साथ स्वचालित रूप से कैसे अनुवाद करूँ?">

`npx intlayer fill` चलाएं। यह कमांड आपके चुने हुए LLM का उपयोग करके आपके अपने प्रदाता और API कुंजी के साथ लापता अनुवादों को भरता है, और `--git-diff` बदली गई फ़ाइलों तक संचालन को सीमित करता है। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

</Question>

<Question title="क्या Intlayer बहुवचन, लिंग और समृद्ध पाठ (rich text) का समर्थन करता है?">

हाँ: [बहुवचन (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/plurial.md), [लिंग-आधारित सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md), शर्तें, [सम्मिलन (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md), और [प्रारूपक (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md)।

</Question>

<Question title="गैर-तकनीकी टीम के सदस्य कोड को छुए बिना ईमेल टेम्पलेट और त्रुटि संदेशों को कैसे संपादित कर सकते हैं?">

दो विकल्प उपलब्ध हैं: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md), जो सामग्री को कोडबेस से अलग करता है और वेब के माध्यम से संपादन की अनुमति देता है, या [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md), जो परिवर्तनों को सीधे स्थानीय कोड फ़ाइलों में सहेजता है।

</Question>

<Question title="क्या Intlayer मुफ्त और ओपन सोर्स है?">

हाँ, Apache 2.0 लाइसेंस के तहत, व्यावसायिक उपयोग सहित। होस्टेड CMS एक वैकल्पिक सशुल्क सेवा है जिसे [स्वयं होस्ट (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

</Question>

</FAQ>
