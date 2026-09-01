---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Vite + React i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Vite + React ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
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
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "प्रारंभिक रिलीज़"
author: aymericzip
---

# किसी मौजूदा Vite और React एप्लिकेशन को बाद में बहुभाषी (i18n) कैसे बनाएं (i18n गाइड 2026)

<Tabs defaultTab="video">
  <Tab label="वीडियो" value="video">

<iframe title="Vite और React के लिए सबसे अच्छा i18n समाधान? Intlayer को जानें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीयकृत कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-vite-react-template) देखें।

## विषय सूची

<TOC/>

## किसी मौजूदा एप्लिकेशन को अंतर्राष्ट्रीयकृत करना कठिन क्यों है?

यदि आपने कभी किसी ऐसे ऐप में कई भाषाएं जोड़ने की कोशिश की है जिसे केवल एक के लिए बनाया गया था, तो आप दर्द जानते हैं। यह सिर्फ "कठिन" नहीं है, यह थकाऊ है। आपको हर एक फ़ाइल को खंगालना होगा, पाठ की हर स्ट्रिंग का शिकार करना होगा, और उन्हें अलग शब्दकोश फ़ाइलों में ले जाना होगा।

फिर जोखिम भरा हिस्सा आता है: आपके लेआउट या तर्क को तोड़े बिना उस पूरे पाठ को कोड हुक से बदलना। यह उस तरह का काम है जो हफ्तों तक नई सुविधा विकास को रोक देता है और अंतहीन रीफैक्टरिंग जैसा लगता है।

## Intlayer कंपाइलर क्या है?

**Intlayer कंपाइलर** को उस मैनुअल मेहनत को छोड़ने के लिए बनाया गया था। आपके द्वारा मैन्युअल रूप से स्ट्रिंग्स निकालने के बजाय, कंपाइलर इसे आपके लिए करता है। यह आपके कोड को स्कैन करता है, पाठ ढूंढता है, और पर्दे के पीछे शब्दकोश बनाने के लिए AI का उपयोग करता है।
फिर, यह आवश्यक i18n हुक डालने के लिए बिल्ड के दौरान आपके कोड को संशोधित करता है। मूल रूप से, आप अपना ऐप लिखना जारी रखते हैं जैसे कि यह एक ही भाषा का हो, और कंपाइलर स्वचालित रूप से बहुभाषी परिवर्तन को संभालता है।

> कंपाइलर दस्तावेज़: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md)

### सीमाएं

चूंकि कंपाइलर **कंपाइल समय** पर कोड विश्लेषण और परिवर्तन (हुक डालना और शब्दकोश बनाना) करता है, इसलिए यह आपके एप्लिकेशन की **बिल्ड प्रक्रिया को धीमा** कर सकता है।

विकास के दौरान इस प्रभाव को कम करने के लिए, आप कंपाइलर को [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) मोड में चलाने के लिए कॉन्फ़िगर कर सकते हैं या जरूरत न होने पर इसे अक्षम कर सकते हैं।

---

## Vite और React एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

<Steps>

<Step number={1} title="निर्भरताएँ स्थापित करें">

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), ट्रांसपिलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**
  वह पैकेज जो React एप्लिकेशन के साथ Intlayer को एकीकृत करता है। यह React अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है।

- **vite-intlayer**
  इसमें Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करने के लिए Vite प्लगइन के साथ-साथ उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर शामिल है।

</Step>

<Step number={2} title="अपना प्रोजेक्ट कॉन्फ़िगर करें">

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HINDI],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * इंगित करता है कि क्या कंपाइलर सक्षम होना चाहिए।
     */
    enabled: true,

    /**
     * अनुकूलित शब्दकोशों के लिए आउटपुट निर्देशिका।
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * उत्पन्न फ़ाइल में केवल सामग्री डालें, बिना कुंजी के।
     */
    noMetadata: false,

    /**
     * शब्दकोश कुंजी उपसर्ग
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * इंगित करता है कि क्या घटकों को रूपांतरित होने के बाद सहेजा जाना चाहिए।
     * इस तरह, कंपाइलer को ऐप को रूपांतरित करने के लिए केवल एक बार चलाया जा सकता है, और फिर इसे हटाया जा सकता है।
     */
    saveComponents: false,
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

</Step>

<Step number={3} title="अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Vite के साथ Intlayer को एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

> `intlayerCompiler()` Vite प्लगइन का उपयोग घटक से सामग्री निकालने और `.content` फ़ाइलें लिखने के लिए किया जाता है।

> Intlayer v9 के बाद से, compiler सीधे `intlayer()` plugin में bundled है और एक बार `compiler.enabled` को `compiler.output` path के साथ set करने पर automatically activate हो जाता है। `intlayerCompiler()` को अलग से register करना जैसा कि नीचे दिखाया गया है अब optional है — यह स्वयं को deduplicate कर लेता है अगर यह भी जोड़ा जाता है। [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/releases/v9.md) देखें।

</Step>

<Step number={4} title="अपना कोड कंपाइल करें">

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

</Step>

<Step number={6} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

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

</Step>

<Step number={7} title="लापता अनुवाद भरें" isOptional={true}>

Intlayer अनुवादों को भरने में आपकी सहायता के लिए एक CLI टूल प्रदान करता है। आप अपने कोड से लापता अनुवादों का परीक्षण करने और उन्हें भरने के लिए `intlayer` कमांड का उपयोग कर सकते हैं।

```bash packageManager="npm"
npx intlayer test         # परीक्षण करें कि क्या कोई अनुवाद लापता है
```

```bash packageManager="yarn"
yarn intlayer test         # परीक्षण करें कि क्या कोई अनुवाद लापता है
```

```bash packageManager="pnpm"
pnpm intlayer test         # परीक्षण करें कि क्या कोई अनुवाद लापता है
```

```bash packageManager="bun"
bun x intlayer test         # परीक्षण करें कि क्या कोई अनुवाद लापता है
```

```bash packageManager="npm"
npx intlayer fill         # लापता अनुवाद भरें
```

```bash packageManager="yarn"
yarn intlayer fill         # लापता अनुवाद भरें
```

```bash packageManager="pnpm"
pnpm intlayer fill         # लापता अनुवाद भरें
```

```bash packageManager="bun"
bun x intlayer fill         # लापता अनुवाद भरें
```

> अधिक विवरण के लिए, [CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/ci.md) देखें।
> </Step>

</Steps>

### (वैकल्पिक) साइटमैप और robots.txt (बिल्ड-टाइम जनरेशन)

Intlayer `generateSitemap` और `getMultilingualUrls` उपलब्ध कराता है ताकि आप क्रॉलर-तैयार बहुभाषी `sitemap.xml` और `robots.txt` बनाकर `public/` में स्वचालित लिख सकें। आमतौर पर Vite से **पहले** छोटा Node स्क्रिप्ट चलाएँ (जैसे npm `predev` / `prebuild`)।

#### साइटमैप

Intlayer का साइटमैप जनरेटर आपकी लोकेल सेटिंग का सम्मान करता है और क्रॉलर के लिए मेटाडेटा जोड़ता है।

> जनरेट साइटमैप `xhtml:link` (hreflang) नेमस्पेस को सपोर्ट करता है। सपाट URL सूची के बजाय Intlayer हर पृष्ठ के सभी भाषा संस्करणों को दोतरफा जोड़ता है (जैसे `/about`, `/fr/about`, या `/about?lang=fr` - रूटिंग मोड पर निर्भर)।

#### Robots.txt

`getMultilingualUrls` का उपयोग करें ताकि `Disallow` नियम संवेदनशील पथों के सभी बहुभाषी रूपों को कवर करें।

#### 1. प्रोजेक्ट रूट में `generate-seo.mjs` जोड़ें

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

स्क्रिप्ट को `intlayer` इम्पोर्ट करने के लिए पैकेज इंस्टॉल होना चाहिए। प्रोडक्शन में `SITE_URL` सेट करें (जैसे CI में)।

> Node ESM के लिए `generate-seo.mjs` पसंद करें। `generate-seo.js` के लिए `package.json` में `"type": "module"` या अन्य ESM सेटअप करें।

#### 2. Vite से पहले स्क्रिप्ट चलाएँ

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

pnpm या yarn हो तो कमांड अनुकूलित करें। CI से भी कॉल कर सकते हैं।

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

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Vite और React अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **`react-i18next`**: रनटाइम JSON लोडिंग।
- **`react-intl`**: ICU प्रारूप।
- **`Intlayer`**: बिल्ड समय पर स्वचालित टेक्स्ट निष्कर्षण, HMR समर्थन, पूर्ण TypeScript प्रकार और AI अनुवाद।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे Vite बंडल आकार को कितना बढ़ाता है?">

कंपाइलर केवल उन्हीं स्ट्रिंग्स को शामिल करता है जिनका घटक वास्तव में उपयोग करता है, जिससे कोड का आकार न्यूनतम रहता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना react-i18next या react-intl से माइग्रेट कर सकता हूँ?">

हाँ, संगतता एडेप्टर के माध्यम से या सीधे मौजूदा कोड पर कंपाइलर को सक्षम करके।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

दो सीमाएं जानने योग्य हैं। कंपाइलर स्थिर विश्लेषण द्वारा काम करता है, इसलिए जो स्ट्रिंग्स केवल रनटाइम पर मौजूद होती हैं, जैसे कि API त्रुटि कोड या CMS फ़ील्ड, वे पहुंच से बाहर रहती हैं और फिर भी एक घोषित शब्दकोश की आवश्यकता होती है। और इसे `className="active"` या स्थिति कोड जैसे एप्लिकेशन लॉजिक से उपयोगकर्ता के सामने आने वाले टेक्स्ट को अलग करना होगा, जिसके लिए एक बड़े कोडबेस में कुछ एनोटेशन की आवश्यकता होती है।

पूर्ण स्वचालन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) JSX, TSX, Vue और Svelte कोड पर निर्माण समय के दौरान भी यही करता है, प्रत्येक परिवर्तन पर शब्दकोश उत्पन्न करता है जिससे कुंजियों को मैन्युअल रूप से बनाए रखने की आवश्यकता समाप्त हो जाती है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="क्या मुझे कंपाइलर का उपयोग करना चाहिए या सामग्री को स्वयं घोषित करना चाहिए?">

त्वरित विकास के लिए, कंपाइलर आदर्श है। जटिल बहुवचन नियमों या कस्टम लॉजिक के लिए, स्पष्ट सामग्री फ़ाइलें बेहतर नियंत्रण प्रदान करती हैं।

</Question>

<Question title="उन स्ट्रिंग्स का क्या होता है जिन्हें कंपाइलर नहीं देख सकता?">

रनटाइम पर उत्पन्न गतिशील स्ट्रिंग्स को `t()` या मानक `.content` फ़ाइल का उपयोग करके नियंत्रित किया जा सकता है।

</Question>

<Question title="कंपाइलर कैसे तय करता है कि उपयोगकर्ता टेक्स्ट क्या है?">

कंपाइलर JSX टेक्स्ट नोड्स और `aria-label` या `placeholder` जैसी सामान्य विशेषताओं को लक्षित करता है, CSS क्लास और सिस्टम पहचानकर्ताओं को फ़िल्टर करता है।

</Question>

<Question title="लापता अनुवादों को कैसे भरें?">

चरण 7 इसे कवर करता है। `npx intlayer fill` कमांड निकाले गए टेक्स्ट को आपकी पसंद के LLM को भेजता है, और `--git-diff` वर्तमान शाखा तक परिवर्तनों को सीमित करता है।

</Question>

<Question title="रनटाइम पर भाषा कैसे बदलें?">

चरण 6 इसे कवर करता है। `useLocale` हुक सक्रिय लोकेल, भाषाओं की सूची और सेटर प्रदान करता है; घटक पृष्ठ को पुनः लोड किए बिना नई भाषा में पुनः रेंडर होते हैं।

</Question>

<Question title="क्या Intlayer बहुवचन, लिंग और समृद्ध पाठ (rich text) का समर्थन करता है?">

हाँ: [बहुवचन (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/plurial.md), [लिंग-आधारित सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md), शर्तें, [सम्मिलन (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md), और संख्याओं, तिथियों और मुद्राओं के लिए [प्रारूपक (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md)।

</Question>

<Question title="अनुवादक कोड को छुए बिना सामग्री को कैसे संपादित कर सकते हैं?">

[विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) के माध्यम से, जो किसी को भी सीधे चलते हुए ऐप में टेक्स्ट संपादित करने देता है, या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के माध्यम से, जो सामग्री को अलग करता है ताकि कोड को फिर से तैनात किए बिना उसे अपडेट किया जा सके।

</Question>

<Question title="क्या Intlayer मुफ्त और ओपन सोर्स है?">

हाँ, Apache 2.0 लाइसेंस के तहत, व्यावसायिक उपयोग सहित। होस्टेड CMS एक वैकल्पिक सशुल्क सेवा है जिसे [स्वयं होस्ट (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

</Question>

</FAQ>
