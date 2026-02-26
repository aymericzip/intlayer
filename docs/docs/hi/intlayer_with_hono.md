---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - Hono ऐप का अनुवाद कैसे करें 2026 में
description: जानें कि अपने Hono बैकएंड को बहुभाषी कैसे बनाया जाए। इसे अंतर्राष्ट्रीयकृत (i18n) करने और अनुवाद करने के लिए दस्तावेज़ीकरण का पालन करें।
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Hono
  - JavaScript
  - बैकएंड
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init कमांड जोड़ें
  - version: 5.5.10
    date: 2025-06-29
    changes: इतिहास प्रारंभ करें
---

# Intlayer का उपयोग करके अपनी Hono बैकएंड वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

`hono-intlayer` Hono अनुप्रयोगों के लिए एक शक्तिशाली अंतर्राष्ट्रीयकरण (i18n) मिडलवेयर है, जिसे क्लाइंट की प्राथमिकताओं के आधार पर स्थानीयकृत प्रतिक्रियाएं प्रदान करके आपकी बैकएंड सेवाओं को वैश्विक रूप से सुलभ बनाने के लिए डिज़ाइन किया गया है।

### व्यावहारिक उपयोग के मामले

- **उपयोगकर्ता की भाषा में बैकएंड त्रुटियां प्रदर्शित करना**: जब कोई त्रुटि होती है, तो संदेशों को उपयोगकर्ता की मूल भाषा में प्रदर्शित करने से समझ में सुधार होता है और निराशा कम होती है। यह विशेष रूप से गतिशील त्रुटि संदेशों के लिए उपयोगी है जो टोस्ट या मोडल जैसे फ्रंट-एंड घटकों में दिखाए जा सकते हैं।

- **बहुभाषी सामग्री प्राप्त करना**: डेटाबेस से सामग्री खींचने वाले अनुप्रयोगों के लिए, अंतर्राष्ट्रीयकरण यह सुनिश्चित करता है कि आप इस सामग्री को कई भाषाओं में परोस सकते हैं। यह ई-कॉमर्स साइटों या सामग्री प्रबंधन प्रणालियों जैसे प्लेटफार्मों के लिए महत्वपूर्ण है जिन्हें उत्पाद विवरण, लेख और अन्य सामग्री उपयोगकर्ता द्वारा पसंद की जाने वाली भाषा में प्रदर्शित करने की आवश्यकता होती है।

- **बहुभाषी ईमेल भेजना**: चाहे वह ट्रांजेक्शनल ईमेल हों, मार्केटिंग अभियान हों या सूचनाएं, प्राप्तकर्ता की भाषा में ईमेल भेजने से जुड़ाव और प्रभावशीलता में काफी वृद्धि हो सकती है।

- **बहुभाषी पुश सूचनाएं**: मोबाइल अनुप्रयोगों के लिए, उपयोगकर्ता की पसंदीदा भाषा में पुश सूचनाएं भेजने से बातचीत और प्रतिधारण बढ़ सकता है। यह व्यक्तिगत स्पर्श सूचनाओं को अधिक प्रासंगिक और कार्रवाई योग्य महसूस करा सकता है।

- **अन्य संचार**: बैकएंड से संचार का कोई भी रूप, जैसे एसएमएस संदेश, सिस्टम अलर्ट, या उपयोगकर्ता इंटरफ़ेस अपडेट, उपयोगकर्ता की भाषा में होने से लाभान्वित होता है, स्पष्टता सुनिश्चित करता है और समग्र उपयोगकर्ता अनुभव को बढ़ाता है।

बैकएंड को अंतर्राष्ट्रीयकृत करके, आपका एप्लिकेशन न केवल सांस्कृतिक मतभेदों का सम्मान करता है बल्कि वैश्विक बाजार की जरूरतों के साथ बेहतर तालमेल बिठाता है, जिससे यह आपकी सेवाओं को दुनिया भर में स्केल करने में एक महत्वपूर्ण कदम बन जाता है।

## शुरुआत करना

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-hono-template) on GitHub.

### स्थापना

`hono-intlayer` का उपयोग शुरू करने के लिए, npm का उपयोग करके पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
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
      Locales.HINDI,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      hi: "हिंदी में लौटाई गई सामग्री का उदाहरण",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> आपकी सामग्री घोषणाएं आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) से मेल खाती हों।

> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### Hono एप्लिकेशन सेटअप

`hono-intlayer` का उपयोग करने के लिए अपना Hono एप्लिकेशन सेट करें:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// अंतर्राष्ट्रीयकरण अनुरोध हैंडलर लोड करें
app.use("*", intlayer());

// रूट
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      hi: "हिंदी में लौटाई गई सामग्री का उदाहरण",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### संगतता

`hono-intlayer` इनके साथ पूरी तरह से संगत है:

- React अनुप्रयोगों के लिए [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/index.md)
- Next.js अनुप्रयोगों के लिए [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md)
- Vite अनुप्रयोगों के लिए [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md)

यह ब्राउज़र और एपीआई अनुरोधों सहित विभिन्न वातावरणों में किसी भी अंतर्राष्ट्रीयकरण समाधान के साथ निर्बाध रूप से काम करता है। आप हेडर या कुकीज़ के माध्यम से लोकेल का पता लगाने के लिए मिडलवेयर को कस्टमाइज़ कर सकते हैं:

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

डिफ़ॉल्ट रूप से, `hono-intlayer` क्लाइंट की पसंदीदा भाषा निर्धारित करने के लिए `Accept-Language` हेडर की व्याख्या करेगा।

> कॉन्फ़िगरेशन और उन्नत विषयों के बारे में अधिक जानकारी के लिए, हमारे [दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) पर जाएँ।

### TypeScript कॉन्फ़िगर करें

`hono-intlayer` अंतर्राष्ट्रीयकरण प्रक्रिया को बढ़ाने के लिए TypeScript की मजबूत क्षमताओं का लाभ उठाता है। TypeScript की स्टैटिक टाइपिंग यह सुनिश्चित करती है कि हर अनुवाद कुंजी का हिसाब रखा जाए, जिससे अनुवाद छूटने का जोखिम कम हो जाता है और रखरखाव में सुधार होता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि ऑटोजेनरेटेड प्रकार (डिफ़ॉल्ट रूप से ./types/intlayer.d.ts पर) आपकी tsconfig.json फ़ाइल में शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटोजेनरेटेड प्रकार शामिल करें
  ],
}
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code Extension** स्थापित कर सकते हैं।

[VS Code Marketplace से स्थापित करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटो-कम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री का **इनलाइन पूर्वावलोकन**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **त्वरित कार्रवाई**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक विवरण के लिए, [Intlayer VS Code Extension दस्तावेज़ीकरण](https://intlayer.org/doc/vs-code-extension) देखें।

### Git कॉन्फ़िगरेशन

Intlayer द्वारा जेनरेट की गई फ़ाइलों को अनदेखा करने की अनुशंसा की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जेनरेट की गई फ़ाइलों को अनदेखा करें
.intlayer
```
