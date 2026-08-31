---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "AdonisJS i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में AdonisJS ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Intlayer
  - AdonisJS
  - JavaScript
  - बैकएंड
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonis-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 8.0.0
    date: 2025-12-30
    changes: "इतिहास प्रारंभ करें"
author: aymericzip
---

# Intlayer का उपयोग करके अपनी AdonisJS बैकएंड वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

`adonis-intlayer` AdonisJS अनुप्रयोगों के लिए एक शक्तिशाली अंतर्राष्ट्रीयकरण (i18n) पैकेज है, जिसे क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएं प्रदान करके आपकी बैकएंड सेवाओं को विश्व स्तर पर सुलभ बनाने के लिए डिज़ाइन किया गया है।

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियां प्रदर्शित करना**: जब कोई त्रुटि होती है, तो संदेशों को उपयोगकर्ता की मूल भाषा में प्रदर्शित करने से समझ में सुधार होता है और हताशा कम होती है। यह गतिशील त्रुटि संदेशों के लिए विशेष रूप से उपयोगी है जो टोस्ट या मोडल जैसे फ्रंट-एंड घटकों में दिखाए जा सकते हैं।

- **बहुभाषी सामग्री प्राप्त करना**: डेटाबेस से सामग्री खींचने वाले अनुप्रयोगों के लिए, अंतर्राष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में परोस सकें। यह ई-कॉमर्स साइटों या सामग्री प्रबंधन प्रणालियों जैसे प्लेटफार्मों के लिए महत्वपूर्ण है जिन्हें उत्पाद विवरण, लेख और अन्य सामग्री उपयोगकर्ता द्वारा पसंद की जाने वाली भाषा में प्रदर्शित करने की आवश्यकता होती है।

- **बहुभाषी ईमेल भेजना**: चाहे वह ट्रांसेक्शनल ईमेल हो, मार्केटिंग अभियान हो, या सूचनाएं हों, प्राप्तकर्ता की भाषा में ईमेल भेजने से जुड़ाव और प्रभावशीलता में काफी वृद्धि हो सकती है।

- **बहुभाषी पुश सूचनाएं**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएं भेजने से बातचीत और प्रतिधारण बढ़ सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और कार्रवाई योग्य महसूस करा सकता है।

- **अन्य संचार**: बैकएंड से संचार का कोई भी रूप, जैसे एसएमएस संदेश, सिस्टम अलर्ट, या उपयोगकर्ता इंटरफ़ेस अपडेट, उपयोगकर्ता की भाषा में होने से लाभान्वित होता है, स्पष्टता सुनिश्चित करता है और समग्र उपयोगकर्ता अनुभव को बढ़ाता है।

बैकएंड का अंतर्राष्ट्रीयकरण करके, आपका एप्लिकेशन न केवल सांस्कृतिक अंतरों का सम्मान करता है बल्कि वैश्विक बाजार की जरूरतों के साथ बेहतर तालमेल बिठाता है, जिससे यह आपकी सेवाओं को दुनिया भर में स्केल करने का एक महत्वपूर्ण कदम बन जाता है।

## शुरू करना

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-adonis-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonis-template) on GitHub.

### स्थापना

`adonis-intlayer` का उपयोग शुरू करने के लिए, npm का उपयोग करके पैकेज स्थापित करें:

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
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### सेटअप

अपने प्रोजेक्ट रूट में `intlayer.config.ts` बनाकर अंतर्राष्ट्रीयकरण सेटिंग्स कॉन्फ़िगर करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      hi: "हिंदी में लौटाई गई सामग्री का उदाहरण",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "hi": "हिंदी में लौटाई गई सामग्री का उदाहरण",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएं आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं, बशर्ते वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src` या `./app`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) से मेल खाती हों।

> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### AdonisJS अनुप्रयोग सेटअप

`adonis-intlayer` का उपयोग करने के लिए अपना AdonisJS एप्लिकेशन सेटअप करें।

#### मिडलवेयर पंजीकृत करें

सबसे पहले, आपको अपने एप्लिकेशन में `intlayer` मिडलवेयर पंजीकृत करना होगा।

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### अपने मार्ग (routes) परिभाषित करें

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    hi: "हिंदी में लौटाई गई सामग्री का उदाहरण",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### कार्य (Functions)

`adonis-intlayer` आपके एप्लिकेशन में अंतर्राष्ट्रीयकरण को संभालने के लिए कई कार्यों को निर्यात करता है:

- `t(content, locale?)`: मूल अनुवाद कार्य।
- `getIntlayer(key, locale?)`: अपने शब्दकोशों से कुंजी द्वारा सामग्री प्राप्त करें।
- `getDictionary(dictionary, locale?)`: एक विशिष्ट शब्दकोश वस्तु से सामग्री प्राप्त करें।
- `getLocale()`: अनुरोध संदर्भ से वर्तमान लोकेल प्राप्त करें।

#### नियंत्रकों (Controllers) में उपयोग करें

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        hi: "कंट्रोलर से नमस्ते",
      })
    );
  }
}
```

### संगतता

`adonis-intlayer` पूरी तरह से इनके साथ संगत है:

- React अनुप्रयोगों के लिए [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)
- Next.js अनुप्रयोगों के लिए [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)
- Vite अनुप्रयोगों के लिए [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md)

यह ब्राउज़र और एपीआई अनुरोधों सहित विभिन्न वातावरणों में किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ सहजता से काम करता है। आप हेडर या कुकीज़ के माध्यम से लोकेल का पता लगाने के लिए मिडलवेयर को अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

डिफ़ॉल्ट रूप से, `adonis-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर की व्याख्या करेगा।

> कॉन्फ़िगरेशन और उन्नत विषयों पर अधिक जानकारी के लिए, हमारे [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) पर जाएँ।

### TypeScript कॉन्फ़िगर करें

`adonis-intlayer` अंतर्राष्ट्रीयकरण प्रक्रिया को बढ़ाने के लिए TypeScript की मजबूत क्षमताओं का लाभ उठाता है। TypeScript की स्थिर टाइपिंग यह सुनिश्चित करती है कि प्रत्येक अनुवाद कुंजी का हिसाब रखा जाए, जिससे अनुवाद गायब होने का जोखिम कम हो जाता है और रखरखाव में सुधार होता है।

![ऑटो-पूर्णता](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![अनुवाद त्रुटि](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि स्वतः उत्पन्न प्रकार (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts पर) आपकी tsconfig.json फ़ाइल में शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वतः उत्पन्न प्रकार शामिल करें
  ],
}
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** स्थापित कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटो-पूर्णता**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री का **इनलाइन पूर्वावलोकन**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **त्वरित कार्रवाई**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक विवरण के लिए, [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/hi/doc/vs-code-extension) देखें।

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की अनुशंसा की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="AdonisJS अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **`@adonisjs/i18n`**: AdonisJS का आधिकारिक पैकेज।
- **`Intlayer`**: बैकएंड और आधुनिक फ़्रंटएंड दोनों के लिए एकीकरण, पूर्ण TypeScript प्रकार, AI अनुवाद और CMS।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे AdonisJS सर्वर बंडल आकार को कितना बढ़ाता है?">

पारंपरिक JSON कैटलॉग की तुलना में बहुत कम। Intlayer कंपाइलर बिल्ड समय पर शब्दकोशों को अनुकूलित करता है और प्रत्येक अनुरोध पर उन्हें फिर से पार्स नहीं करता है, जिससे मेमोरी उपयोग और कोल्ड स्टार्ट समय न्यूनतम रहता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

</Question>

<Question title="क्या मैं अपने हैंडलर को फिर से लिखे बिना @adonisjs/i18n से माइग्रेट कर सकता हूँ?">

काफी हद तक हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) मौजूदा अनुवाद फ़ाइलों को बनाए रखता है।

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

AdonisJS HTTP मिडलवेयर `HttpContext` के माध्यम से कुकीज़ और हेडर की जांच करता है, `ctx.locale` में लोकेल संग्रहीत करता है।

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

<Question title="क्या Intlayer Edge टेम्पलेट्स (EdgeJS) के साथ काम करता है?">

हाँ। Intlayer हेल्पर्स को Edge ग्लोबल वेरिएबल्स में बाइंड करके, आप सीधे `.edge` फ़ाइलों में स्थानीयकृत टेक्स्ट प्रस्तुत कर सकते हैं।

</Question>

<Question title="VineJS सत्यापन संदेशों को स्थानीयकृत कैसे करें?">

VineJS नियमों में, आप उपयोगकर्ता की भाषा से मेल खाने वाले त्रुटि संदेश उत्पन्न करने के लिए `t()` या `getIntlayer()` को कॉल कर सकते हैं।

</Question>

<Question title="AdonisJS रूट्स में लोकेल सेगमेंट का प्रबंधन कैसे करें?">

`prefix('/:locale')` के साथ रूट समूह परिभाषित करके और लोकेल सत्यापन मिडलवेयर लागू करके।

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
