---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: अपने Nest बैकएंड का अनुवाद करें (i18n)
description: जानें कि अपने vite बैकएंड को बहुभाषी कैसे बनाएं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
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
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
---

# Intlayer और NestJS के साथ अंतरराष्ट्रीयकरण (i18n) शुरू करना

`express-intlayer` Express एप्लिकेशन के लिए एक शक्तिशाली अंतरराष्ट्रीयकरण (i18n) मिडलवेयर है, जिसे इस प्रकार डिज़ाइन किया गया है कि यह क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएं प्रदान करके आपके बैकएंड सेवाओं को वैश्विक रूप से सुलभ बनाता है। चूंकि NestJS, Express के ऊपर बनाया गया है, आप `express-intlayer` को अपने NestJS एप्लिकेशन में सहजता से एकीकृत कर सकते हैं ताकि बहुभाषी सामग्री को प्रभावी ढंग से संभाला जा सके।

## अपने बैकएंड का अंतरराष्ट्रीयकरण क्यों करें?

अपने बैकएंड का अंतरराष्ट्रीयकरण करना एक वैश्विक दर्शकों को प्रभावी ढंग से सेवा देने के लिए आवश्यक है। यह आपके एप्लिकेशन को प्रत्येक उपयोगकर्ता की पसंदीदा भाषा में सामग्री और संदेश प्रदान करने की अनुमति देता है। यह क्षमता उपयोगकर्ता अनुभव को बढ़ाती है और आपके एप्लिकेशन की पहुंच को व्यापक बनाती है, जिससे यह विभिन्न भाषाई पृष्ठभूमि वाले लोगों के लिए अधिक सुलभ और प्रासंगिक बन जाता है।

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियाँ दिखाना**: जब कोई त्रुटि होती है, तो संदेशों को उपयोगकर्ता की मातृभाषा में दिखाना समझ को बेहतर बनाता है और निराशा को कम करता है। यह विशेष रूप से उन गतिशील त्रुटि संदेशों के लिए उपयोगी है जो फ्रंट-एंड घटकों जैसे टोस्ट या मोडल में दिखाए जा सकते हैं।

- **बहुभाषी सामग्री प्राप्त करना**: उन एप्लिकेशन के लिए जो डेटाबेस से सामग्री खींचते हैं, अंतरराष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में प्रदान कर सकें। यह उन प्लेटफार्मों के लिए महत्वपूर्ण है जैसे ई-कॉमर्स साइटें या सामग्री प्रबंधन प्रणाली, जिन्हें उपयोगकर्ता की पसंदीदा भाषा में उत्पाद विवरण, लेख और अन्य सामग्री दिखानी होती है।

- **बहुभाषी ईमेल भेजना**: चाहे वह लेनदेन संबंधी ईमेल हों, विपणन अभियान हों, या सूचनाएं हों, प्राप्तकर्ता की भाषा में ईमेल भेजने से जुड़ाव और प्रभावशीलता में काफी वृद्धि हो सकती है।

- **बहुभाषी पुश सूचनाएं**: मोबाइल एप्लिकेशन के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएं भेजने से इंटरैक्शन और प्रतिधारण बढ़ सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और क्रियाशील महसूस कराता है।

- **अन्य संचार**: बैकएंड से किसी भी प्रकार का संचार, जैसे एसएमएस संदेश, सिस्टम अलर्ट, या उपयोगकर्ता इंटरफ़ेस अपडेट, उपयोगकर्ता की भाषा में होने से स्पष्टता सुनिश्चित होती है और समग्र उपयोगकर्ता अनुभव में सुधार होता है।

बैकएंड को अंतरराष्ट्रीय बनाने से, आपका एप्लिकेशन न केवल सांस्कृतिक भिन्नताओं का सम्मान करता है बल्कि वैश्विक बाजार की आवश्यकताओं के साथ बेहतर तालमेल भी स्थापित करता है, जिससे यह आपकी सेवाओं को विश्व स्तर पर विस्तार देने में एक महत्वपूर्ण कदम बन जाता है।

## शुरुआत कैसे करें

### नया NestJS प्रोजेक्ट बनाएं

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### स्थापना

`express-intlayer` का उपयोग शुरू करने के लिए, npm का उपयोग करके पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
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

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

> आपकी सामग्री घोषणाएँ आपकी एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

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

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

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

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन            |
| ------- | ---------- | ------------------- |
| 5.8.0   | 2025-09-09 | प्रारंभिक दस्तावेज़ |
