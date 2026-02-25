---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite और React i18n - एक मौजूदा ऐप को बहुभाषी ऐप में बदलें (i18n गाइड 2026)
description: जानें कि Intlayer Compiler का उपयोग करके अपने मौजूदा Vite और React एप्लिकेशन को बहुभाषी कैसे बनाया जाए। अंतर्राष्ट्रीयकरण (i18n) और AI के साथ अनुवाद करने के लिए दस्तावेज़ों का पालन करें।
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Vite
  - React
  - कंपाइलर
  - AI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: प्रारंभिक रिलीज़
---

# किसी मौजूदा Vite और React एप्लिकेशन को बाद में बहुभाषी (i18n) कैसे बनाएं (i18n गाइड 2026)

<Tabs defaultTab="video">
  <Tab label="वीडियो" value="video">
  
<iframe title="Vite और React के लिए सबसे अच्छा i18n समाधान? Intlayer को जानें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="कोड" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीयकृत कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-vite-react-template) देखें।

## विषय सूची

<TOC/>

## किसी मौजूदा एप्लिकेशन को अंतर्राष्ट्रीयकृत करना कठिन क्यों है?

यदि आपने कभी किसी ऐसे ऐप में कई भाषाएं जोड़ने की कोशिश की है जिसे केवल एक के लिए बनाया गया था, तो आप दर्द जानते हैं। यह सिर्फ "कठिन" नहीं है—यह थकाऊ है। आपको हर एक फ़ाइल को खंगालना होगा, पाठ की हर स्ट्रिंग का शिकार करना होगा, और उन्हें अलग शब्दकोश फ़ाइलों में ले जाना होगा।

फिर जोखिम भरा हिस्सा आता है: आपके लेआउट या तर्क को तोड़े बिना उस पूरे पाठ को कोड हुक से बदलना। यह उस तरह का काम है जो हफ्तों तक नई सुविधा विकास को रोक देता है और अंतहीन रीफैक्टरिंग जैसा लगता है।

## Intlayer कंपाइलर क्या है?

**Intlayer कंपाइलर** को उस मैनुअल मेहनत को छोड़ने के लिए बनाया गया था। आपके द्वारा मैन्युअल रूप से स्ट्रिंग्स निकालने के बजाय, कंपाइलर इसे आपके लिए करता है। यह आपके कोड को स्कैन करता है, पाठ ढूंढता है, और पर्दे के पीछे शब्दकोश बनाने के लिए AI का उपयोग करता है।
फिर, यह आवश्यक i18n हुक डालने के लिए बिल्ड के दौरान आपके कोड को संशोधित करता है। मूल रूप से, आप अपना ऐप लिखना जारी रखते हैं जैसे कि यह एक ही भाषा का हो, और कंपाइलर स्वचालित रूप से बहुभाषी परिवर्तन को संभालता है।

> कंपाइलर दस्तावेज़: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md)

### सीमाएं

चूंकि कंपाइलर **कंपाइल समय** पर कोड विश्लेषण और परिवर्तन (हुक डालना और शब्दकोश बनाना) करता है, इसलिए यह आपके एप्लिकेशन की **बिल्ड प्रक्रिया को धीमा** कर सकता है।

विकास के दौरान इस प्रभाव को कम करने के लिए, आप कंपाइलर को [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) मोड में चलाने के लिए कॉन्फ़िगर कर सकते हैं या जरूरत न होने पर इसे अक्षम कर सकते हैं।

---

## Vite और React एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), ट्रांसपिलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**
  वह पैकेज जो React एप्लिकेशन के साथ Intlayer को एकीकृत करता है। यह React अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

- **vite-intlayer**
  इसमें Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करने के लिए Vite प्लगइन के साथ-साथ उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर शामिल है।

### चरण 2: अपना प्रोजेक्ट कॉन्फ़िगर करें

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HINDI],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // देव मोड पर प्रभाव को सीमित करने के लिए 'build-only' पर सेट किया जा सकता है
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // कोई प्रीफ़िक्स comp- नहीं
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "यह ऐप एक मैप ऐप है", // नोट: आप इस ऐप विवरण को कस्टमाइज़ कर सकते हैं
  },
};

export default config;
```

> **नोट**: सुनिश्चित करें कि आपके पर्यावरण चर में `OPEN_AI_API_KEY` सेट है।

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और बहुत कुछ। उपलब्ध मापदंडों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) देखें।

### चरण 3: अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Vite के साथ Intlayer को एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

> `intlayerCompiler()` Vite प्लगइन का उपयोग घटक से सामग्री निकालने और `.content` फ़ाइलें लिखने के लिए किया जाता है।

### चरण 4: अपना कोड कंपाइल करें

बस अपनी डिफ़ॉल्ट भाषा में हार्डकोडेड स्ट्रिंग्स के साथ अपने घटक लिखें। कंपाइलर बाकी काम संभाल लेता है।

उदाहरण कि आपका पेज कैसा दिख सकता है:

<Tabs>
 <Tab value="कोड">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite लोगो" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React लोगो" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          गिनती {count} है
        </button>
        <p>
          HMR का परीक्षण करने के लिए <code>src/App.tsx</code> संपादित करें और
          सहेजें
        </p>
      </div>
      <p className="read-the-docs">
        अधिक जानने के लिए Vite और React लोगो पर क्लिक करें
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="आउटपुट">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      hi: {
        viteLogo: "Vite लोगो",
        reactLogo: "React लोगो",
        title: "Vite + React",
        countButton: "गिनती है",
        editMessage: "संपादित करें",
        hmrMessage: "और HMR परीक्षण के लिए सहेजें",
        readTheDocs: "अधिक जानने के लिए Vite और React लोगो पर क्लिक करें",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** का उपयोग नेस्टेड घटकों को भाषा प्रदान करने के लिए किया जाता है।

### (वैकल्पिक) चरण 6: अपनी सामग्री की भाषा बदलें

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की भाषा सेट करने और तदनुसार सामग्री अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.Hindi)}>
      भाषा बदलकर हिंदी करें
    </button>
  );
};
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) देखें।

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की अनुशंसा की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** स्थापित कर सकते हैं।

[VS Code Marketplace से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटो-कम्प्लीशन**।
- गुम अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री का **इनलाइन पूर्वावलोकन**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक जानकारी के लिए, [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी बना सकते हैं।
