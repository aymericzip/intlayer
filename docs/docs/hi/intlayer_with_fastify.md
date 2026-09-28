---
createdAt: 2025-12-30
updatedAt: 2026-05-31
priority: 9
title: "Fastify i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "Fastify में Intlayer सेट करें: प्लगइन से हर रिक्वेस्ट पर लोकेल पहचानें, API रिस्पॉन्स और त्रुटि संदेशों का अनुवाद करें, पूरी तरह टाइप्ड।"
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.6.0
    date: 2025-12-31
    changes: "init कमांड जोड़ा गया"
  - version: 7.6.0
    date: 2025-12-31
    changes: "इतिहास शुरू किया गया"
author: aymericzip
---

# Intlayer का उपयोग करके अपने Fastify बैकएंड वेबसाइट का अनुवाद करें

`fastify-intlayer` Fastify अनुप्रयोगों के लिए एक शक्तिशाली अंतर्राष्ट्रीयकरण (i18n) प्लगइन है, जिसे क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएं प्रदान करके आपकी बैकएंड सेवाओं को विश्व स्तर पर सुलभ बनाने के लिए डिज़ाइन किया गया है।

> GitHub पर [पैकेज कार्यान्वयन देखें](https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer)।

## व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियां प्रदर्शित करना**: जब कोई त्रुटि होती है, तो उपयोगकर्ता की मातृभाषा में संदेश प्रदर्शित करने से समझ में सुधार होता है और हताशा कम होती है। यह विशेष रूप से गतिशील त्रुटि संदेशों के लिए उपयोगी है जो टोस्ट या मोडल जैसे फ्रंट-एंड घटकों में दिखाए जा सकते हैं।
- **बहुभाषी सामग्री प्राप्त करना**: डेटाबेस से सामग्री प्राप्त करने वाले अनुप्रयोगों के लिए, अंतर्राष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में परोस सकें। यह ई-कॉमर्स साइटों या सामग्री प्रबंधन प्रणालियों जैसे प्लेटफार्मों के लिए महत्वपूर्ण है जिन्हें उपयोगकर्ता द्वारा पसंदीदा भाषा में उत्पाद विवरण, लेख और अन्य सामग्री प्रदर्शित करने की आवश्यकता होती है।
- **बहुभाषी ईमेल भेजना**: चाहे वह ट्रांजेक्शनल ईमेल हों, मार्केटिंग अभियान हों या सूचनाएं, प्राप्तकर्ता की भाषा में ईमेल भेजना जुड़ाव और प्रभावशीलता को काफी बढ़ा सकता है।
- **बहुभाषी पुश सूचनाएं**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएं भेजना बातचीत और प्रतिधारण में सुधार कर सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और कार्रवाई योग्य महसूस करा सकता है।
- **अन्य संचार**: बैकएंड से संचार का कोई भी रूप, जैसे एसएमएस संदेश, सिस्टम अलर्ट या यूजर इंटरफेस अपडेट, उपयोगकर्ता की भाषा में होने से लाभान्वित होता है, स्पष्टता सुनिश्चित करता है और समग्र उपयोगकर्ता अनुभव को बढ़ाता है।

बैकएंड को अंतर्राष्ट्रीय बनाकर, आपका अनुप्रयोग न केवल सांस्कृतिक मतभेदों का सम्मान करता है बल्कि वैश्विक बाजार की जरूरतों के साथ बेहतर रूप से मेल खाता है, जिससे यह आपकी सेवाओं को दुनिया भर में विस्तारित करने के लिए एक महत्वपूर्ण कदम बन जाता् है।

## शुरुआत करना

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीय कैसे बनाएं"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-fastify-template) देखें।

### इंस्टालेशन

`fastify-intlayer` का उपयोग शुरू करने के लिए, npm का उपयोग करके पैकेज इंस्टॉल करें:

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

> `--interactive` ध्वज (flag) वैकल्पिक है। यदि आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके एनवायरनमेंट को डिटेक्ट करेगी और आवश्यक पैकेज इंस्टॉल करेगी। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### सेटअप

अपने प्रोजेक्ट रूट में `intlayer.config.ts` बनाकर अंतर्राष्ट्रीयकरण सेटिंग्स कॉन्फ़िगर करें:

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

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

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
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएं आपके अनुप्रयोग में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) से मेल खाती हों।

> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

- [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md)

### Fastify अनुप्रयोग सेटअप

`fastify-intlayer` का उपयोग करने के लिए अपना Fastify अनुप्रयोग सेटअप करें:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### अनुकूलता

`fastify-intlayer` पूरी तरह से इनके साथ संगत है:

- React अनुप्रयोगों के लिए [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)
- Next.js अनुप्रयोगों के लिए [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)
- Vite अनुप्रयोगों के लिए [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md)

यह ब्राउज़र और एपीआई अनुरोधों सहित विभिन्न वातावरणों में किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ निर्बाध रूप से काम करता है। आप हेडर्स या कुकीज़ के माध्यम से लोकेल का पता लगाने के लिए मिडलवेयर को कस्टमाइज़ कर सकते हैं:

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

डिफ़ॉल्ट रूप से, `fastify-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर की व्याख्या करेगा।

> कॉन्फ़िगरेशन और उन्नत विषयों पर अधिक जानकारी के लिए, हमारे [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) पर जाएँ।

- [Intlayer कॉन्फ़िगरेशन (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

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

- [VS Code Marketplace से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **Autocompletion**।
- लापता अनुवादों के लिए **Real-time error detection**।
- अनुवादित सामग्री का **Inline previews**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **Quick actions**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक विवरण के लिए, [Intlayer VS Code Extension दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md) देखें।

- [Intlayer VS Code Extension दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की अनुशंसा की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में प्रतिबद्ध करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer

```

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Fastify अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **`i18next` के लिए Fastify प्लगइन्स**: JSON नेमस्पेस पर आधारित रनटाइम लाइब्रेरी।
- **`Intlayer`**: Fastify जीवनचक्र के लिए अनुकूलित `fastify-intlayer` प्लगइन, पूर्ण TypeScript प्रकार, AI अनुवाद और फ़्रंटएंड के साथ एकीकृत शब्दकोश।

बैकएंड का अंतर्राष्ट्रीयकरण करने का मुख्य कारण यह है कि उपयोगकर्ता द्वारा पढ़े जाने वाले टेक्स्ट का एक बड़ा हिस्सा कभी भी फ्रंटएंड से होकर नहीं गुजरता: API त्रुटि संदेश, लेन-देन संबंधी ईमेल, पुश सूचनाएं, SMS और PDF निर्यात। इन्हें प्रति सत्र के बजाय प्रति अनुरोध हल की गई प्राप्तकर्ता की भाषा की आवश्यकता होती है।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

- [Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md)

</Question>
<Question title="i18n मेरे Fastify सर्वर बंडल आकार को कितना बढ़ाता है?">

बहुत कम। शब्दकोश पहले से (ahead of time) संकलित होते हैं और केवल वही लोकेल शामिल किए जाते हैं जिन्हें आप घोषित करते हैं, इसलिए बूट पर कोई कैटलॉग लोडिंग नहीं होती और अनुरोध पथ पर कोई फ़ाइल रीड नहीं होता। यह सर्वरलेस और एज डिप्लॉयमेंट पर सबसे अधिक मायने रखता है, जहाँ बंडल का आकार कोल्ड स्टार्ट समय तय करता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

- [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)

</Question>
<Question title="क्या मैं अपने हैंडलर को फिर से लिखे बिना `i18next` से माइग्रेट कर सकता हूँ?">

हाँ, और इसके दो रास्ते हैं। आप [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) के साथ सामग्री को धीरे-धीरे माइग्रेट कर सकते हैं। या आप अपना मौजूदा API पूरी तरह रख सकते हैं: [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) बिल्कुल `i18next` जैसा ही API प्रदान करते हैं, लेकिन Intlayer शब्दकोशों द्वारा परोसा जाता है, इसलिए केवल imports बदलते हैं और हैंडलर कोड नहीं बदलता।

- [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md)
- [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md)

</Question>
<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

- [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md)
- [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md)
- [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md)

</Question>
<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

- [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md)

उसी प्रोजेक्ट के फ्रंटएंड पक्ष पर, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) इससे भी आगे जाता है और बिल्ड समय पर आपके JSX, TSX, Vue या Svelte स्रोत से शब्दकोश उत्पन्न करता है, ताकि ऐप के दोनों हिस्से बिना किसी हाथ से बनाए गए key के एक ही content layer साझा करें।

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md)

</Question>
<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: किसी `useIntlayer` key से उसे घोषित करने वाली content फ़ाइल पर जाएं, किसी component से content निकालें, और कमांड पैलेट या एक समर्पित Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में वही समझ, जिसमें go to definition, find all references, अनुवादित मान का hover पूर्वावलोकन, keys और fields की ऑटो-कम्प्लीशन, और कोई key कहीं घोषित न होने पर चेतावनी शामिल है। यह `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल्स को भी हल करता है, जो माइग्रेशन के दौरान मदद करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT को Intlayer दस्तावेज़ और CLI उपलब्ध कराता है, ताकि असिस्टेंट अनुमान लगाने के बजाय वर्तमान दस्तावेज़ों से उत्तर दे और `intlayer fill` जैसी कमांड स्वयं चला सके।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: `intlayer-config`, `intlayer-cli` और `intlayer-content` जैसी केंद्रित skills, साथ ही हर फ़्रेमवर्क के लिए एक, जो एजेंट को आपका रूटिंग सेटअप और content node प्रकार सिखाती हैं।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है, साथ ही स्थिर dictionary keys और अप्रयुक्त content के लिए अतिरिक्त नियम भी हैं।

</Question>
<Question title="Intlayer को कैसे पता चलता है कि किस भाषा में उत्तर देना है?">

डिफ़ॉल्ट रूप से `fastify-intlayer` आने वाले अनुरोध का `Accept-Language` हेडर पढ़ता है और सबसे निकटतम घोषित लोकेल चुनता है, और आवश्यकता होने पर आपके डिफ़ॉल्ट लोकेल पर लौट आता है। आप `routing.storage` के साथ स्रोत बदल सकते हैं, उदाहरण के लिए एक कस्टम हेडर या आपके फ्रंटएंड द्वारा सेट की गई कुकी, ताकि API उस भाषा में उत्तर दे जिसे उपयोगकर्ता ने वास्तव में चुना है, न कि वह जो उनका ब्राउज़र बताता है। [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

- [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

</Question>
<Question title="क्या लोकेल प्रति अनुरोध अलग-थलग (isolated) रहता है?">

हाँ। प्लगइन सक्रिय लोकेल को अनुरोध तक सीमित रखता है, इसलिए अलग-अलग भाषाओं में आने वाले दो समवर्ती अनुरोध कभी एक-दूसरे का लोकेल नहीं पढ़ते। यही कारण है कि हर फ़ंक्शन में लोकेल आर्ग्युमेंट पास किए बिना किसी सर्विस से `t()` और `getIntlayer()` को कॉल करना सुरक्षित है।

</Question>
<Question title="मैं प्राप्तकर्ता की भाषा में ट्रांजेक्शनल ईमेल कैसे भेजूँ?">

ईमेल की सामग्री को किसी भी अन्य सामग्री की तरह एक content फ़ाइल में घोषित करें, फिर अनुरोध लोकेल के बजाय प्राप्तकर्ता के संग्रहीत लोकेल के लिए `getIntlayer` से उसे प्राप्त करें। यह jobs और queues के लिए महत्वपूर्ण है, जहाँ भाषा उपयोगकर्ता रिकॉर्ड से संबंधित होती है और हेडर पढ़ने के लिए कोई आने वाला अनुरोध नहीं होता।

</Question>
<Question title="मैं API त्रुटि संदेशों को स्थानीयकृत कैसे करूँ?">

जहाँ त्रुटि बनाई जाती है, उसी स्थान पर संदेश को `t()` में लपेटें। सक्रिय अनुरोध लोकेल उसे हल करता है, इसलिए क्लाइंट को ऐसा संदेश मिलता है जिसे वह सीधे प्रदर्शित कर सकता है, और आपके फ्रंटएंड को त्रुटि कोड के समानांतर कैटलॉग की आवश्यकता नहीं होती।

</Question>
<Question title="क्या यह Fastify प्लगइन लाइफ़साइकल और एनकैप्सुलेशन के साथ काम करता है?">

हाँ। `fastify-intlayer` एक मानक Fastify प्लगइन के रूप में पंजीकृत होता है, इसलिए यह सामान्य एनकैप्सुलेशन नियमों का पालन करता है। इसे रूट स्तर पर, या उस स्कोप के अंदर जिसे इसकी आवश्यकता है, उन रूट्स से पहले पंजीकृत करें जो सामग्री पढ़ते हैं।

</Question>
<Question title="मैं बैकएंड सामग्री का AI के साथ स्वचालित रूप से अनुवाद कैसे करूँ?">

`npx intlayer fill` चलाएं, जो आपके अपने प्रदाता और API कुंजी का उपयोग करके आपकी पसंद के LLM से लापता अनुवाद भरता है। केवल ब्रांच पर बदली गई सामग्री का अनुवाद करने के लिए `--git-diff` जोड़ें। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

- [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md)
- [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md)

</Question>
<Question title="क्या Intlayer सर्वर पर बहुवचन, लिंग और इंटरपोलेटेड मानों का समर्थन करता है?">

हाँ: [बहुवचन (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/plurial.md), [लिंग-आधारित सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md), शर्तें, इंटरपोलेटेड मानों के लिए [सम्मिलन (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md), ईमेल बॉडी के लिए [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md), और संख्याओं, तिथियों और मुद्राओं के लिए [प्रारूपक (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md)।

- [बहुवचन (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/plurial.md)
- [लिंग-आधारित सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md)
- [सम्मिलन (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md)
- [प्रारूपक (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md)

</Question>
<Question title="क्या मुझे सर्वर पर TypeScript ऑटो-कम्प्लीशन मिलता है?">

हाँ। Intlayer आपके शब्दकोशों के types को `./types/intlayer.d.ts` में उत्पन्न करता है, इसलिए कोई मौजूद न होने वाली key रनटाइम पर खाली स्ट्रिंग के बजाय कंपाइल त्रुटि बन जाती है। जब किसी घोषित लोकेल में सामग्री गायब हो तो बिल्ड विफल करने के लिए CI में `npx intlayer test` चलाएं।

</Question>
<Question title="क्या फ्रंटएंड और बैकएंड एक ही सामग्री साझा कर सकते हैं?">

हाँ, और यही सामान्य सेटअप है। `fastify-intlayer` उसी घोषित सामग्री पर `react-intlayer`, `next-intlayer` और `vite-intlayer` के साथ काम करता है, इसलिए API प्रतिक्रिया और किसी पेज दोनों में उपयोग किया जाने वाला लेबल केवल एक बार घोषित होता है। [Intlayer कैसे काम करता है](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/how_works_intlayer.md) देखें।

- [Intlayer कैसे काम करता है](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/how_works_intlayer.md)

</Question>
<Question title="क्या Intlayer मुफ्त और ओपन सोर्स है?">

हाँ, Apache 2.0 लाइसेंस के तहत, व्यावसायिक उपयोग सहित। होस्टेड [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) एक वैकल्पिक सशुल्क सेवा है जिसे [स्वयं होस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)
- [स्वयं होस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md)

</Question>

</FAQ>
