---
createdAt: 2025-09-09
updatedAt: 2026-05-31
title: "NestJS i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में NestJS ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़
  - Intlayer
  - NestJS
  - जावास्क्रिप्ट
  - बैकएंड
slugs:
  - doc
  - environment
  - nest
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ें"
  - version: 5.8.0
    date: 2025-09-09
    changes: "प्रारंभिक दस्तावेज़"
---

# Intlayer का उपयोग करके अपनी Nest बैकएंड वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

`express-intlayer` Express applications के लिए एक शक्तिशाली अंतर्राष्ट्रीयकरण (i18n) middleware है, जो आपकी बैकएंड सेवाओं को विश्व स्तर पर सुलभ बनाने के लिए डिज़ाइन किया गया है, जो क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएं प्रदान करता है। चूंकि NestJS Express के शीर्ष पर बनाया गया है, आप `express-intlayer` को अपने NestJS applications में निर्बाध रूप से एकीकृत कर सकते हैं ताकि बहुभाषी सामग्री को प्रभावी ढंग से संभाल सकें।

व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियां प्रदर्शित करना**: जब कोई त्रुटि होती है, तो संदेशों को उपयोगकर्ता की मूल भाषा में प्रदर्शित करना समझ में सुधार करता है और निराशा को कम करता है। यह विशेष रूप से गतिशील त्रुटि संदेशों के लिए उपयोगी है जो front-end components जैसे toasts या modals में दिखाए जा सकते हैं।

- **बहुभाषी सामग्री प्राप्त करना**: डेटाबेस से सामग्री खींचने वाले applications के लिए, अंतर्राष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में प्रदान कर सकते हैं। यह e-commerce साइटों या content management systems जैसे प्लेटफॉर्म के लिए महत्वपूर्ण है जिन्हें product descriptions, articles और अन्य सामग्री को उपयोगकर्ता द्वारा पसंदीदा भाषा में प्रदर्शित करने की आवश्यकता है।

- **बहुभाषी ईमेल भेजना**: चाहे वह transactional emails, marketing campaigns, या notifications हों, प्राप्तकर्ता की भाषा में ईमेल भेजना engagement और प्रभावशीलता को काफी हद तक बढ़ा सकता है।

- **बहुभाषी Push Notifications**: मोबाइल applications के लिए, उपयोगकर्ता की पसंदीदा भाषा में push notifications भेजना इंटरैक्शन और retention को बढ़ा सकता है। यह व्यक्तिगत स्पर्श notifications को अधिक प्रासंगिक और कार्यान्वयन योग्य बना सकता है।

- **अन्य संचार**: बैकएंड से किसी भी प्रकार का संचार, जैसे SMS messages, system alerts, या user interface updates, उपयोगकर्ता की भाषा में होने से लाभान्वित होता है, जिससे स्पष्टता सुनिश्चित होती है और समग्र user experience में वृद्धि होती है।

बैकएंड का अंतर्राष्ट्रीयकरण करके, आपका application न केवल सांस्कृतिक अंतरों का सम्मान करता है बल्कि global market की जरूरतों के साथ बेहतर तरीके से संरेखित होता है, जो विश्व व्यापी आपकी सेवाओं को scale करने में एक महत्वपूर्ण कदम है।

## शुरुआत कैसे करें

### नया NestJS प्रोजेक्ट बनाएं

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### स्थापना

`express-intlayer` का उपयोग शुरू करने के लिए, npm का उपयोग करके पैकेज इंस्टॉल करें:

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

### tsconfig.json कॉन्फ़िगर करें

TypeScript के साथ Intlayer का उपयोग करने के लिए, सुनिश्चित करें कि आपका `tsconfig.json` ES मॉड्यूल्स का समर्थन करने के लिए सेटअप किया गया है। आप यह `module` और `moduleResolution` विकल्पों को `nodenext` पर सेट करके कर सकते हैं।

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... अन्य विकल्प
  },
}
```

### सेटअप

अपने प्रोजेक्ट रूट में `intlayer.config.ts` बनाकर अंतरराष्ट्रीयकरण सेटिंग्स कॉन्फ़िगर करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      hi: "नमस्ते दुनिया!",
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> आपकी सामग्री घोषणाएँ आपकी एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](/doc/concept/content) देखें।

### एक्सप्रेस मिडलवेयर सेटअप

`express-intlayer` मिडलवेयर को अपने NestJS एप्लिकेशन में अंतरराष्ट्रीयकरण को संभालने के लिए एकीकृत करें:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // सभी रूट्स पर लागू करें
  }
}
```

### अपनी सेवाओं या कंट्रोलर्स में अनुवादों का उपयोग करें

अब आप अपनी सेवाओं या कंट्रोलर्स में अनुवादों तक पहुँचने के लिए `getIntlayer` फ़ंक्शन का उपयोग कर सकते हैं:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // अनुवाद प्राप्त करें
  }
}
```

### संगतता

`express-intlayer` पूरी तरह से संगत है:

- React एप्लिकेशन के लिए [`react-intlayer`](/doc/packages/react-intlayer)
- Next.js एप्लिकेशन के लिए [`next-intlayer`](/doc/packages/next-intlayer)
- Vite एप्लिकेशन के लिए [`vite-intlayer`](/doc/packages/vite-intlayer)

यह विभिन्न वातावरणों में किसी भी अंतरराष्ट्रीयकरण समाधान के साथ सहजता से काम करता है, जिसमें ब्राउज़र और API अनुरोध शामिल हैं। आप मिडलवेयर को हेडर या कुकीज़ के माध्यम से लोकल का पता लगाने के लिए अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन विकल्प
  middleware: {
    headerName: "my-locale-header", // हेडर नाम
    cookieName: "my-locale-cookie", // कुकी नाम
  },
};

export default config;
```

डिफ़ॉल्ट रूप से, `express-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर की व्याख्या करेगा।

> कॉन्फ़िगरेशन और उन्नत विषयों पर अधिक जानकारी के लिए, हमारी [दस्तावेज़ीकरण](/doc/concept/configuration) देखें।

### TypeScript कॉन्फ़िगर करें

`express-intlayer` अंतर्राष्ट्रीयकरण प्रक्रिया को बेहतर बनाने के लिए TypeScript की मजबूत क्षमताओं का उपयोग करता है। TypeScript की स्थैतिक टाइपिंग यह सुनिश्चित करती है कि हर अनुवाद कुंजी का ध्यान रखा जाए, जिससे अनुवादों के छूटने का जोखिम कम होता है और रखरखाव में सुधार होता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि स्वचालित रूप से उत्पन्न प्रकार (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts में) आपके tsconfig.json फ़ाइल में शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  include: [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पता लगाना**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए अधिक विवरण के लिए देखें [Intlayer VS कोड एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

### गिट कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा किया जाए। इससे आप उन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसे करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="NestJS अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **`nestjs-i18n`**: JSON और YAML का उपयोग करने वाला लोकप्रिय NestJS मॉड्यूल।
- **`Intlayer`**: Dependency Injection और इंटरसेप्टर्स के साथ पूर्ण संगतता, बिल्ड समय पर प्रकार जांच, AI अनुवाद और फ़्रंटएंड के साथ साझा शब्दकोश।

बैकएंड का अंतर्राष्ट्रीयकरण करने का मुख्य कारण यह है कि उपयोगकर्ता द्वारा पढ़े जाने वाले टेक्स्ट का एक बड़ा हिस्सा कभी भी फ्रंटएंड से होकर नहीं गुजरता: API त्रुटि संदेश, लेन-देन संबंधी ईमेल, पुश सूचनाएं, SMS और PDF निर्यात। इन्हें प्रति सत्र के बजाय प्रति अनुरोध हल की गई प्राप्तकर्ता की भाषा की आवश्यकता होती है।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे NestJS सर्वर बंडल आकार को कितना बढ़ाता है?">

पारंपरिक JSON कैटलॉग की तुलना में बहुत कम। Intlayer कंपाइलर बिल्ड समय पर शब्दकोशों को अनुकूलित करता है और प्रत्येक अनुरोध पर उन्हें फिर से पार्स नहीं करता है, जिससे मेमोरी उपयोग और कोल्ड स्टार्ट समय न्यूनतम रहता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

</Question>

<Question title="क्या मैं अपने हैंडलर और सेवाओं को फिर से लिखे बिना nestjs-i18n से माइग्रेट कर सकता हूँ?">

काफी हद तक हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) Intlayer शब्दकोश उत्पन्न करते हुए मौजूदा फ़ाइलों को बनाए रखता है।

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

NestJS इंटरसेप्टर या मिडलवेयर हेडर और कुकीज़ की जांच करता है, लोकेल को अनुरोध संदर्भ से जोड़ता है।

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

<Question title="NestJS में Dependency Injection (DI) के साथ Intlayer कैसे काम करता है?">

Intlayer सेवाओं और इंटरसेप्टर्स को NestJS IoC कंटेनर में इंजेक्ट किया जा सकता है, जिससे कंट्रोलर और प्रोवाइडर में लोकेल तक आसान पहुंच मिलती है।

</Question>

<Question title="क्या मैं NestJS DTO सत्यापन संदेशों को स्थानीयकृत कर सकता हूँ?">

हाँ। कस्टम `class-validator` डेकोरेटर या अपवाद फ़िल्टर में, आप `t()` या `getIntlayer()` को कॉल कर सकते हैं।

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
