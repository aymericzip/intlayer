---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Vite + Preact i18n - अनुवाद का पूर्ण गाइड: Preact"
description: बंडल साइज़, SEO, परफॉर्मेंस & मेंटेनेबिलिटी के लिए सबसे अच्छा समाधान। 2026 में अपने Vite and Preact ऐप को बहुभाषी बनाएं, LLM ट्रांसलेशन, Agent Skills & MCP.
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
applicationShowcase: https://intlayer-vite-preact-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ें"
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
---

# Intlayer के साथ अपनी Vite और Preact वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-preact-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-vite-preact-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-vite-preact-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## विषय सूची

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`प्रीएक्ट-आई18एन` या `आई18नेक्स्ट` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

**पूर्ण प्रीएक्ट कवरेज**

इंटलेयर को **घटक-स्तरीय सामग्री स्कोपिंग**, **आलसी-लोड किए गए अनुवाद**, और स्केलिंग अंतर्राष्ट्रीयकरण (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके प्रीएक्ट के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

**बंडल का आकार**

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

**रखरखाव**

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

**एआई एजेंट**

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[एजेंट कौशल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

**स्वचालन**

अपने एआई प्रदाता की कीमत पर अपनी पसंद के एलएलएम का उपयोग करके अपने सीआई/सीडी पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। इंटलेयर सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

**प्रदर्शन**

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। इंटलेयर बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

**किसी भी देव के साथ स्केलिंग**

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण] प्रदान करता है सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

---

## Vite और Preact एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

GitHub पर [Application Template](https://github.com/aymericzip/intlayer-vite-preact-template) देखें।

<Steps>

<Step number={1} title="निर्भरताएँ इंस्टॉल करें">

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **preact-intlayer**

  वह पैकेज जो Intlayer को Preact एप्लिकेशन के साथ एकीकृत करता है। यह Preact अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक्स प्रदान करता है।

- **vite-intlayer**

  इसमें Vite प्लगइन शामिल है जो Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा लोकल का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

</Step>

<Step number={2} title="अपने प्रोजेक्ट का कॉन्फ़िगरेशन">

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // डिफ़ॉल्ट: डिफ़ॉल्ट लोकल को छोड़कर सभी लोकल को उपसर्ग दें
    storage: ["cookie", "header"], // डिफ़ॉल्ट: कुकी में लोकल स्टोर करें और हेडर से डिटेक्ट करें
  },
};

export default config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, रूटिंग मोड, स्टोरेज विकल्प, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, कृपया [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें।

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

> `intlayer()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उन्हें मॉनिटर करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

</Step>

<Step number={4} title="अपनी सामग्री घोषित करें">

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" codeFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // यदि आप सीधे .mjs में JSX का उपयोग करते हैं तो आवश्यक है

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // यदि आप सीधे .cjs में JSX का उपयोग करते हैं तो आवश्यक है

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite et Preact pour en savoir plus",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" codeFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

> यदि आपकी सामग्री फ़ाइल में TSX कोड शामिल है, तो आपको `import { h } from "preact";` आयात करने की आवश्यकता हो सकती है या सुनिश्चित करें कि आपका JSX प्रैग्मा Preact के लिए सही ढंग से सेट है।

</Step>

<Step number={5} title="अपने कोड में Intlayer का उपयोग करें">

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुँचें:

```tsx {6,10} fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // मान लेते हैं कि आपके पास preact.svg है
import viteLogo from "/vite.svg";
import "./app.css"; // मान लेते हैं कि आपकी CSS फ़ाइल का नाम app.css है
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      {/* Markdown सामग्री */}
      <div>{content.myMarkdownContent}</div>

      {/* HTML सामग्री */}
      <div>{content.myHtmlContent}</div>

      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> यदि आप अपने कंटेंट का उपयोग किसी `string` एट्रिब्यूट में करना चाहते हैं, जैसे कि `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> नोट: Preact में, `className` आमतौर पर `class` के रूप में लिखा जाता है।

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md) देखें (API `preact-intlayer` के लिए समान है)।

> यदि आपका ऐप पहले से मौजूद है, तो आप हजारों घटकों को एक सेकंड में बदलने के लिए [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) को [एक्सट्रैक्ट कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) के साथ उपयोग कर सकते हैं।

</Step>

<Step number={6} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किया गया `setLocale` फ़ंक्शन उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की लोकल सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

export default LocaleSwitcher;
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें (API `preact-intlayer` के लिए समान है)।

</Step>

<Step number={7} title="अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ें" isOptional={true}>

इस चरण का उद्देश्य प्रत्येक भाषा के लिए अद्वितीय रूट बनाना है। यह SEO और SEO-अनुकूल URL के लिए उपयोगी है।
उदाहरण:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> डिफ़ॉल्ट रूप से, डिफ़ॉल्ट लोकल के लिए रूट्स को कोई उपसर्ग नहीं दिया जाता है। यदि आप डिफ़ॉल्ट लोकल के लिए उपसर्ग जोड़ना चाहते हैं, तो आप अपनी कॉन्फ़िगरेशन में `routing.mode` विकल्प को `"prefix-all"` पर सेट कर सकते हैं। अधिक जानकारी के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

अपने एप्लिकेशन में स्थानीयकृत रूटिंग जोड़ने के लिए, आप एक `LocaleRouter` कॉम्पोनेंट बना सकते हैं जो आपके एप्लिकेशन के रूट्स को लपेटता है और लोकल-आधारित रूटिंग को संभालता है। यहाँ [preact-iso](https://github.com/preactjs/preact-iso) का उपयोग करते हुए एक उदाहरण दिया गया है:

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * एक राउटर कॉम्पोनेंट जो लोकल-विशिष्ट रूट्स सेटअप करता है।
 * यह नेविगेशन प्रबंधित करने और स्थानीयकृत कॉम्पोनेंट्स को रेंडर करने के लिए preact-iso का उपयोग करता है।
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

फिर, आप अपने एप्लिकेशन में `LocaleRouter` कॉम्पोनेंट का उपयोग कर सकते हैं:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... आपका AppContent कॉम्पोनेंट

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

</Step>

<Step number={8} title="लोकल बदलने पर URL बदलें" isOptional={true}>

लोकल बदलने पर URL बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `onLocaleChange` प्रॉप का उपयोग कर सकते हैं। साथ ही, आप URL पथ अपडेट करने के लिए `preact-iso` के `useLocation` से `route` विधि का उपयोग कर सकते हैं।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // अपडेटेड लोकल के साथ URL का निर्माण करें
      // उदाहरण: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // URL पथ अपडेट करें
      route(pathWithLocale, true); // रिप्लेस के लिए true
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // लोकल सेट करने के बाद प्रोग्रामेटिक नेविगेशन onLocaleChange द्वारा संभाला जाएगा
            }}
            key={localeItem}
          >
            <span>
              {/* लोकल - उदा. FR */}
              {localeItem}
            </span>
            <span>
              {/* स्वयं के लोकल में भाषा - उदा. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदा. Francés यदि वर्तमान लोकल Locales.SPANISH सेट है */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदा. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

> दस्तावेज़ संदर्भ:
>
> > - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) (API `preact-intlayer` के लिए समान है)> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)> - [`hreflang` एट्रिब्यूट](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=hi)> - [`lang` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)> - [`dir` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` एट्रिब्यूट](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

</Step>

<Step number={9} title="HTML भाषा और दिशा विशेषताएँ स्विच करें" isOptional={true}>

जब आपका एप्लिकेशन कई भाषाओं का समर्थन करता है, तो `<html>` टैग के `lang` और `dir` विशेषताओं को वर्तमान लोकल से मिलान करने के लिए अपडेट करना महत्वपूर्ण है। ऐसा करने से सुनिश्चित होता है:

- **सुलभता**: स्क्रीन रीडर और सहायक तकनीकें सामग्री को सही ढंग से उच्चारित और व्याख्या करने के लिए सही `lang` विशेषता पर निर्भर करती हैं।
- **टेक्स्ट रेंडरिंग**: `dir` (दिशा) विशेषता सुनिश्चित करती है कि टेक्स्ट सही क्रम में रेंडर हो (उदा. अंग्रेज़ी के लिए बाएं-से-दाएं, अरबी या हिब्रू के लिए दाएं-से-बाएं), जो पठनीयता के लिए आवश्यक है।
- **SEO**: सर्च इंजन आपके पेज की भाषा निर्धारित करने के लिए `lang` विशेषता का उपयोग करते हैं, जिससे सर्च परिणामों में सही स्थानीयकृत सामग्री परोसने में मदद मिलती है।

लोकल बदलने पर इन विशेषताओं को गतिशील रूप से अपडेट करके, आप सभी समर्थित भाषाओं में उपयोगकर्ताओं के लिए एक सुसंगत और सुलभ अनुभव की गारंटी देते हैं।

#### हुक को लागू करना

HTML विशेषताओं को प्रबंधित करने के लिए एक कस्टम हुक बनाएं। यह हुक लोकल परिवर्तनों को सुनता है और तदनुसार विशेषताओं को अपडेट करता है:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * वर्तमान लोकल के आधार पर HTML <html> तत्व के `lang` और `dir` विशेषताओं को अपडेट करता है।
 * - `lang`: ब्राउज़र और सर्च इंजन को पेज की भाषा के बारे में सूचित करता है।
 * - `dir`: सही पढ़ने का क्रम सुनिश्चित करता है (उदा. अंग्रेज़ी के लिए 'ltr', अरबी के लिए 'rtl')।
 *
 * यह गतिशील अपडेट उचित टेक्स्ट रेंडरिंग, सुलभता और SEO के लिए आवश्यक है।
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // भाषा विशेषता को वर्तमान लोकल में अपडेट करें।
    document.documentElement.lang = locale;

    // वर्तमान लोकल के आधार पर टेक्स्ट की दिशा सेट करें।
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### अपने एप्लिकेशन में हुक का उपयोग करना

हुक को अपने मुख्य कॉम्पोनेंट में एकीकृत करें ताकि जब भी लोकल बदले, HTML विशेषताएँ अपडेट हो जाएं:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer पहले से आयातित है यदि AppContent को इसकी आवश्यकता है
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// चरण 5 से AppContent परिभाषा

const AppWithHooks: FunctionalComponent = () => {
  // लोकल के आधार पर <html> टैग के lang और dir विशेषताओं को अपडेट करने के लिए हुक लागू करें।
  useI18nHTMLAttributes();

  // मान लेते हैं कि AppContent चरण 5 से आपका मुख्य सामग्री प्रदर्शन कॉम्पोनेंट है
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

</Step>

<Step number={10} title="एक स्थानीयकृत लिंक कॉम्पोनेंट बनाना" isOptional={true}>

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन का नेविगेशन वर्तमान लोकल का सम्मान करता है, आप एक कस्टम `Link` कॉम्पोनेंट बना सकते हैं। यह कॉम्पोनेंट स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ उपसर्ग (prefix) करता है।

यह व्यवहार कई कारणों से उपयोगी है:

- **SEO और उपयोगकर्ता अनुभव**: स्थानीयकृत URL खोज इंजन को भाषा-विशिष्ट पृष्ठों को सही ढंग से अनुक्रमित करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **संगति**: पूरे एप्लिकेशन में स्थानीयकृत लिंक का उपयोग करके, आप गारंटी देते हैं कि नेविगेशन वर्तमान लोकल के भीतर बना रहे, जिससे अप्रत्याशित भाषा परिवर्तन रुक जाते हैं।
- **रखरखाव**: एक ही कॉम्पोनेंट में स्थानीयकरण तर्क को केंद्रित करने से URL का प्रबंधन सरल हो जाता है।

Preact में एक स्थानीयकृत `Link` कॉम्पोनेंट का कार्यान्वयन नीचे दिया गया है:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * यह जांचने के लिए उपयोगिता फ़ंक्शन कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम लिंक कॉम्पोनेंट जो वर्तमान लोकल के आधार पर href विशेषता को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह URL को लोकल (उदा. /fr/about) के साथ उपसर्ग करने के लिए `getLocalizedUrl` का उपयोग करता है।
 * यह सुनिश्चित करता है कि नेविगेशन उसी लोकल संदर्भ के भीतर बना रहे।
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

#### यह कैसे काम करता है

- **बाहरी लिंक का पता लगाना**:  
  सहायक फ़ंक्शन `checkIsExternalLink` यह निर्धारित करता है कि URL बाहरी है या नहीं। बाहरी लिंक अपरिवर्तित छोड़ दिए जाते हैं क्योंकि उन्हें स्थानीयकरण की आवश्यकता नहीं होती है।
- **वर्तमान लोकल प्राप्त करना**:  
  `useLocale` हुक वर्तमान लोकल (उदा. फ़्रेंच के लिए `fr`) प्रदान करता है।
- **URL को स्थानीयकृत करना**:  
  आंतरिक लिंक (यानी, गैर-बाहरी) के लिए, URL को वर्तमान लोकल के साथ स्वचालित रूप से उपसर्ग करने के लिए `getLocalizedUrl` का उपयोग किया जाता है। इसका मतलब है कि यदि आपका उपयोगकर्ता फ़्रेंच में है, तो `/about` को `href` के रूप में पास करने से यह `/fr/about` में बदल जाएगा।
- **लिंक लौटना**:  
  कॉम्पोनेंट स्थानीयकृत URL के साथ एक `<a>` तत्व लौटाता है, जिससे सुनिश्चित होता है कि नेविगेशन लोकल के साथ सुसंगत है।

</Step>

<Step number={11} title="Markdown और HTML रेंडर करें" isOptional={true}>

Intlayer Preact में Markdown और HTML सामग्री रेंडर करने का समर्थन करता है।

आप `.use()` विधि का उपयोग करके Markdown और HTML सामग्री के रेंडरिंग को कस्टमाइज़ कर सकते हैं। यह विधि आपको विशिष्ट टैग के डिफ़ॉल्ट रेंडरिंग को ओवरराइड करने की अनुमति देती है।

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* बुनियादी रेंडरिंग */}
    {myMarkdownContent}

    {/* Markdown के लिए कस्टम रेंडरिंग */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* HTML के लिए बुनियादी रेंडरिंग */}
    {myHtmlContent}

    {/* HTML के लिए कस्टम रेंडरिंग */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### टाइपस्क्रिप्ट कॉन्फ़िगर करें

Intlayer टाइपस्क्रिप्ट के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपकी टाइपस्क्रिप्ट कॉन्फ़िगरेशन में ऑटो-जेनरेटेड प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपकी मौजूदा टाइपस्क्रिप्ट कॉन्फ़िगरेशन
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Preact 10+ के लिए अनुशंसित
    // ...
  },
  "include": [
    // ... आपकी मौजूदा टाइपस्क्रिप्ट कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जेनरेटेड प्रकारों को शामिल करें
  ],
}
```

> सुनिश्चित करें कि आपका `tsconfig.json` Preact के लिए सेट है, विशेष रूप से `jsx` और `jsxImportSource` या पुराने Preact संस्करणों के लिए `jsxFactory`/`jsxFragmentFactory` यदि आप `preset-vite` के डिफ़ॉल्ट का उपयोग नहीं कर रहे हैं।

### Git कॉन्फ़िगरेशन

यह अनुशंसा की जाती है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा किया जाए। यह आपको उन्हें अपने Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```bash
#  Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकंप्लीट**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक जानकारी के लिए, [Intlayer VS कोड एक्सटेंशन प्रलेखन](https://intlayer.org/doc/vs-code-extension) देखें।

---

</Step>

<Step number={1} title="अपने घटकों की सामग्री निकालें" isOptional={true}>

यदि आपके पास मौजूदा कोडबेस है, तो हजारों फ़ाइलों को बदलना समय लेने वाला हो सकता है।

इस प्रक्रिया को आसान बनाने के लिए, Intlayer आपके घटकों को बदलने और सामग्री निकालने के लिए एक [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) / [एक्सट्रैक्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) का प्रस्ताव करता है।

इसे सेट करने के लिए, आप अपनी `intlayer.config.ts` फ़ाइल में एक `compiler` अनुभाग जोड़ सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... आपका शेष कॉन्फ़िगरेशन
  compiler: {
    /**
     * इंगित करता है कि क्या कंपाइलर सक्षम होना चाहिए।
     */
    enabled: true,

    /**
     * आउटपुट फ़ाइलों का पथ परिभाषित करता है
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * इंगित करता है कि क्या घटकों को बदलने के बाद सहेजा जाना चाहिए। उस तरह से, कंपाइलर को ऐप बदलने के लिए केवल एक बार चलाया जा सकता है, और फिर इसे हटाया जा सकता है।
     */
    saveComponents: false,

    /**
     * शब्दकोश कुंजी उपसर्ग
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='निकालें कमांड'>

अपने घटकों को बदलने और सामग्री निकालने के लिए एक्सट्रैक्टर चलाएँ

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='बैबेल कंपाइलर'>

intlayerCompiler प्लगइन शामिल करने के लिए अपनी `vite.config.ts` अपडेट करें:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // कंपाइलर प्लगइन जोड़ता है
  ],
});
```

```bash packageManager="npm"
npm run build # या npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

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

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से व्यवस्थित कर सकते हैं।

---

</Step>

</Steps>
