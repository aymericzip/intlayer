---
createdAt: 2024-08-11
updatedAt: 2026-05-31
title: "Express i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Express ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - आंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Express
  - JavaScript
  - बैकएंड
slugs:
  - doc
  - environment
  - express
applicationTemplate: https://github.com/aymericzip/intlayer-express-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ें"
  - version: 5.5.10
    date: 2025-06-29
    changes: "इतिहास प्रारंभ"
author: aymericzip
---

# Intlayer के साथ अपना Express backend अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

`express-intlayer` Express अनुप्रयोगों के लिए एक शक्तिशाली अंतरराष्ट्रीयकरण (i18n) मिडलवेयर है, जिसे क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएँ प्रदान करके आपके बैकएंड सेवाओं को वैश्विक रूप से सुलभ बनाने के लिए डिज़ाइन किया गया है।

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियाँ प्रदर्शित करना**: जब कोई त्रुटि होती है, तो उपयोगकर्ता की मूल भाषा में संदेश प्रदर्शित करना समझ को बेहतर बनाता है और निराशा को कम करता है। यह विशेष रूप से गतिशील त्रुटि संदेशों के लिए उपयोगी है जो फ्रंट-एंड घटकों जैसे टोस्ट्स या मोडल्स में दिखाए जा सकते हैं।

- **बहुभाषी सामग्री प्राप्त करना**: डेटाबेस से सामग्री खींचने वाले अनुप्रयोगों के लिए, अंतरराष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में सेवा दे सकते हैं। यह ई-कॉमर्स साइटों या सामग्री प्रबंधन प्रणालियों जैसे प्लेटफार्मों के लिए महत्वपूर्ण है जिन्हें उत्पाद विवरण, लेख और अन्य सामग्री उपयोगकर्ता की पसंदीदा भाषा में प्रदर्शित करने की आवश्यकता होती है।
- **बहुभाषी ईमेल भेजना**: चाहे वह लेन-देन ईमेल हों, विपणन अभियान हों, या सूचनाएँ हों, प्राप्तकर्ता की भाषा में ईमेल भेजने से जुड़ाव और प्रभावशीलता में काफी वृद्धि हो सकती है।

- **बहुभाषी ईमेल भेजना**: चाहे वह लेनदेन संबंधी ईमेल हो, मार्केटिंग अभियान हो, या सूचनाएं हों, प्राप्तकर्ता की भाषा में ईमेल भेजने से engagement और effectiveness में काफी वृद्धि हो सकती है।

- **बहुभाषी पुश सूचनाएँ**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएँ भेजने से बातचीत और प्रतिधारण में वृद्धि हो सकती है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और कार्रवाई योग्य महसूस करा सकता है।

- **अन्य संचार**: बैकएंड से किसी भी प्रकार के संचार, जैसे एसएमएस संदेश, सिस्टम अलर्ट, या उपयोगकर्ता इंटरफ़ेस अपडेट, उपयोगकर्ता की भाषा में होने से स्पष्टता सुनिश्चित होती है और समग्र उपयोगकर्ता अनुभव को बढ़ावा मिलता है।
  अपने बैकएंड का अंतरराष्ट्रीयकरण करके, आपकी एप्लिकेशन न केवल सांस्कृतिक मतभेदों का सम्मान करती है बल्कि वैश्विक बाजार की आवश्यकताओं के साथ बेहतर तालमेल भी बिठाती है, जिससे यह आपकी सेवाओं को विश्व स्तर पर बढ़ाने में एक प्रमुख कदम बन जाती है।

बैकएंड को अंतर्राष्ट्रीयकृत करके, आपका एप्लिकेशन न केवल सांस्कृतिक अंतरों का सम्मान करता है बल्कि वैश्विक बाजार की जरूरतों के साथ भी बेहतर तरीके से संरेखित होता है, जिससे यह विश्वव्यापी आपकी सेवाओं को स्केल करने के लिए एक महत्वपूर्ण कदम बन जाता है।

## प्रारंभ करना

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-express-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-express-template) on GitHub.

### स्थापना

`express-intlayer` का उपयोग शुरू करने के लिए, npm का उपयोग करके पैकेज स्थापित करें:

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

> `--interactive` ध्वज (flag) वैकल्पिक है। यदि आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके एनवायरनमेंट को डिटेक्ट करेगी और आवश्यक पैकेज इंस्टॉल करेगी। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### सेटअप

अपने प्रोजेक्ट रूट में `intlayer.config.ts` बनाकर अंतरराष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### अपनी सामग्री घोषित करें

अपने अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "hi": "हिंदी में लौटाई गई सामग्री का उदाहरण",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### Express एप्लिकेशन सेटअप

अपने Express एप्लिकेशन को `express-intlayer` का उपयोग करने के लिए सेटअप करें:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// अंतरराष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use(intlayer());

// रूट्स
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// सर्वर प्रारंभ करें
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### संगतता

`express-intlayer` पूरी तरह से संगत है:

- React अनुप्रयोगों के लिए [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)
- Next.js अनुप्रयोगों के लिए [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)
- Vite अनुप्रयोगों के लिए [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md)
  यह किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ विभिन्न वातावरणों में, जिसमें ब्राउज़र और API अनुरोध शामिल हैं, सहजता से काम करता है। आप मिडलवेयर को हेडर या कुकीज़ के माध्यम से लोकल का पता लगाने के लिए अनुकूलित कर सकते हैं:

यह किसी भी अंतरराष्ट्रीयकरण समाधान के साथ विभिन्न वातावरणों में, जिसमें ब्राउज़र और API अनुरोध शामिल हैं, सहजता से काम करता है। आप मिडलवेयर को हेडर या कुकी के माध्यम से लोकल का पता लगाने के लिए अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

डिफ़ॉल्ट रूप से, `express-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर की व्याख्या करेगा।

> कॉन्फ़िगरेशन और उन्नत विषयों पर अधिक जानकारी के लिए, हमारी [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### TypeScript कॉन्फ़िगर करें

`express-intlayer` अंतरराष्ट्रीयकरण प्रक्रिया को बेहतर बनाने के लिए TypeScript की मजबूत क्षमताओं का उपयोग करता है। TypeScript की स्थैतिक टाइपिंग सुनिश्चित करती है कि हर अनुवाद कुंजी का ध्यान रखा गया है, जिससे अनुवादों के गायब होने का जोखिम कम होता है और रखरखाव में सुधार होता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि स्वचालित रूप से उत्पन्न प्रकार (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts में) आपके tsconfig.json फ़ाइल में शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

### VS Code एक्सटेंशन

अपने Intlayer विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए देखें [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/hi/doc/vs-code-extension)।

### Git कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा किया जाए। इससे आप उन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Express अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **`i18next` / `i18next-http-middleware`**: JSON फ़ाइलों का उपयोग करने वाला सामान्य रनटाइम समाधान।
- **कस्टम शब्दकोश**: बिना प्रकार या स्वचालन उपकरण के।
- **`Intlayer`**: `express-intlayer` मिडलवेयर, पूर्ण TypeScript प्रकार, AI अनुवाद, CMS और फ़्रंटएंड के साथ साझा शब्दकोश।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे Express सर्वर बंडल आकार को कितना बढ़ाता है?">

पारंपरिक JSON कैटलॉग की तुलना में बहुत कम। Intlayer कंपाइलर बिल्ड समय पर शब्दकोशों को अनुकूलित करता है और प्रत्येक अनुरोध पर उन्हें फिर से पार्स नहीं करता है, जिससे मेमोरी उपयोग और कोल्ड स्टार्ट समय न्यूनतम रहता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

</Question>

<Question title="क्या मैं अपने हैंडलर को फिर से लिखे बिना i18next या अन्य बैकएंड लाइब्रेरी से माइग्रेट कर सकता हूँ?">

हाँ। आप धीरे-धीरे माइग्रेट कर सकते हैं या मौजूदा API को बनाए रखने के लिए संगतता एडेप्टर का उपयोग कर सकते हैं।

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

`app.use(intlayer())` मिडलवेयर क्रमिक रूप से URL उपसर्ग, कुकी, `Accept-Language` हेडर की जांच करता है, और डिफ़ॉल्ट भाषा पर वापस लौटता है। पहचानी गई लोकेल `req.locale` में संग्रहीत होती है।

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

<Question title="क्या मैं कस्टम भाषा डिटेक्टर का उपयोग कर सकता हूँ?">

हाँ। आप एक कस्टम मिडलवेयर लिख सकते हैं जो उपयोगकर्ता सत्र या डेटाबेस प्रोफ़ाइल से लोकेल निकालता है और इसे `req.locale` को सौंपता है।

</Question>

<Question title="Express रूट्स में स्थानीयकृत URL उपसर्गों का उपयोग कैसे करें?">

Intlayer रूटिंग विकल्पों के माध्यम से या अपने मार्गों में `/:locale/` सेगमेंट जोड़कर। `validatePrefix` मान्य भाषाओं को मान्य करता है।

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
