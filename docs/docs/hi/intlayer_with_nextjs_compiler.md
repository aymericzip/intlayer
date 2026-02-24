---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - मौजूदा Next.js ऐप को बहुभाषी ऐप में बदलें (i18n गाइड 2026)
description: जानें कि Intlayer Compiler का उपयोग करके अपने मौजूदा Next.js एप्लिकेशन को बहुभाषी कैसे बनाया जाए। AI का उपयोग करके अपने ऐप का अंतर्राष्ट्रीयकरण (i18n) और अनुवाद करने के लिए दस्तावेज़ का पालन करें।
keywords:
  - अंतर्राष्ट्रीयकरण
  - अनुवाद
  - दस्तावेज़
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - कंपाइलर
  - AI
slugs:
  - doc
  - configuration
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: प्रारंभिक विमोचन
---

# मौजूदा Next.js एप्लिकेशन को बहुभाषी (i18n) कैसे बनाएं (i18n गाइड 2026)

<Tabs defaultTab="video">
  <Tab label="वीडियो" value="video">
  
<iframe title="Best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="कोड" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox डेमो - Intlayer के साथ अपने ऐप को कैसे अंतर्राष्ट्रीयकृत करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) देखें।

## विषय सूची

<TOC/>

## मौजूदा एप्लिकेशन का अंतर्राष्ट्रीयकरण (i18n) कठिन क्यों है?

यदि आपने कभी किसी ऐसे एप्लिकेशन में कई भाषाएँ जोड़ने का प्रयास किया है जो केवल एक के लिए बनाया गया था, तो आप इससे होने वाली परेशानी को जानते हैं। यह सिर्फ "कठिन" नहीं है - यह थकाऊ है। आपको हर फ़ाइल से गुजरना होगा, हर टेक्स्ट स्ट्रिंग को ढूंढना होगा, और उन्हें अलग-अलग शब्दकोश (dictionary) फ़ाइलों में ले जाना होगा।

फिर सबसे जोखिम भरा हिस्सा आता है: लेआउट (layout) या लॉजिक (logic) को तोड़े बिना उस सभी टेक्स्ट को कोड हुक (code hooks) से बदलना। यह उस तरह का काम है जो हफ्तों तक नई सुविधाओं (features) के विकास को रोक देता है और एक न खत्म होने वाले रीफैक्टोरिंग (refactoring) जैसा लगता है।

## Intlayer Compiler क्या है?

**Intlayer Compiler** को उस मैन्युअल काम (manual manual work) को छोड़ने के लिए बनाया गया था। स्ट्रिंग्स को मैन्युअल रूप से निकालने के लिए मजबूर करने के बजाय, यह कंपाइलर आपके लिए ऐसा करता है। यह आपके कोड को स्कैन करता है, टेक्स्ट ढूंढता है, और पृष्ठभूमि (background) में शब्दकोश उत्पन्न करने के लिए AI का उपयोग करता है।
फिर, यह आवश्यक i18n हुक (hooks) को इंजेक्ट करने के लिए बिल्ड चरण (build step) के दौरान आपके सोर्स कोड (source code) को संशोधित करता है। मूल रूप से, आप अपना ऐप लिखते रहें जैसे कि वह एक भाषा में हो, और कंपाइलर बहुभाषी रूपांतरण (multilingual transformation) को स्वचालित (automatically) रूप से संभालता है।

> कंपाइलर दस्तावेज़: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md

### सीमाएँ (Limitations)

चूंकि कंपाइलर **कंपाइल समय (compile time)** पर कोड विश्लेषण (analysis) और परिवर्तन (transformation) (हुक सम्मिलित करना और शब्दकोश बनाना) करता है, इसलिए यह आपके एप्लिकेशन की **बिल्ड प्रक्रिया को धीमा** कर सकता है।

विकास (development) के दौरान इस प्रभाव को सीमित करने के लिए, आप कंपाइलर को [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) मोड में चलाने के लिए सेट कर सकते हैं या आवश्यकता न होने पर इसे अक्षम (disable) कर सकते हैं।

---

## Next.js एप्लिकेशन में Intlayer सेट करने के लिए चरण-दर-चरण मार्गदर्शिका (Step-by-step guide)

### चरण 1: निर्भरताएँ स्थापित करें (Install Dependencies)

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपिलेशन (transpilation), और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**

  पैकेज जो Intlayer को Next.js के साथ एकीकृत (integrate) करता है। यह नेक्स्ट.जेएस अंतर्राष्ट्रीयकरण के लिए कॉन्टेक्स्ट प्रोवाइडर (context providers) और हुक (hooks) प्रदान करता है। इसके अतिरिक्त, इसमें Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन शामिल है, साथ ही उपयोगकर्ता की पसंदीदा लोकेल (locale) का पता लगाने, कुकीज़ को प्रबंधित करने और URL पुनर्निर्देशन (redirecting) को संभालने के लिए एक प्रॉक्सी (proxy) भी शामिल है।

### चरण 2: अपना प्रोजेक्ट कॉन्फ़िगर करें (Configure your project)

अपने एप्लिकेशन की भाषाओं (locales) को परिभाषित करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएँ:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // dev मोड में प्रभाव को सीमित करने के लिए 'build-only' पर सेट किया जा सकता है
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // कोई comp- उपसर्ग नहीं
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "यह एप्लिकेशन एक नक्शा (map) एप्लिकेशन है",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // dev मोड में प्रभाव को सीमित करने के लिए 'build-only' पर सेट किया जा सकता है
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // कोई comp- उपसर्ग नहीं
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "यह एप्लिकेशन एक नक्शा (map) एप्लिकेशन है",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // dev मोड में प्रभाव को सीमित करने के लिए 'build-only' पर सेट किया जा सकता है
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // कोई comp- उपसर्ग नहीं
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "यह एप्लिकेशन एक नक्शा (map) एप्लिकेशन है",
  },
};

module.exports = config;
```

> **ध्यान दें**: सुनिश्चित करें कि आपने अपने पर्यावरण चर (environment variables) में `OPEN_AI_API_KEY` सेट किया हुआ है।

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत (localized) URL, प्रॉक्सी रीडायरेक्ट, कुकी नाम, अपनी सामग्री (content) घोषणाओं (declarations) का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग अक्षम (disable) कर सकते हैं, और बहुत कुछ कर सकते हैं। उपलब्ध मापदंडों की विस्तृत सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने Next.js कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

Intlayer का उपयोग करने के लिए अपने Next.js सेटअप को कॉन्फ़िगर करें:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* आपके कॉन्फ़िगरेशन विकल्प यहाँ */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* आपके कॉन्फ़िगरेशन विकल्प यहाँ */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* आपके कॉन्फ़िगरेशन विकल्प यहाँ */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह सुनिश्चित करता है कि सामग्री (content) घोषणा (declaration) फ़ाइलें बनाई गई हैं और विकास (dev) मोड में उनकी निगरानी (watch) की जाती है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरण के भीतर Intlayer पर्यावरण चर परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम (alias) प्रदान करता है और सर्वर कंपोनेंट्स के साथ संगतता (compatibility) सुनिश्चित करता है।

### Babel कॉन्फ़िगर करें

Intlayer कंपाइलर को आपकी सामग्री निकालने और अनुकूलित करने के लिए Babel की आवश्यकता होती है। Intlayer प्लगइन्स शामिल करने के लिए अपना `babel.config.js` (या `babel.config.json`) अपडेट करें:

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### चरण 4: डायनेमिक (Dynamic) लोकेल (Locale) रूटिंग परिभाषित करें

`RootLayout` से सब कुछ साफ़ करें और नीचे दिए गए कोड से बदलें:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### चरण 5: अपनी सामग्री घोषित करें (Swachit roop se / Automatically)

कंपाइलर के सक्षम होने के साथ, आपको अब सामग्री शब्दकोशों (जैसे `.content.ts` फ़ाइलें) को मैन्युअल रूप से घोषित करने की **आवश्यकता नहीं** है।

इसके बजाय, आप सीधे अपने कोड में स्ट्रिंग्स (strings) के रूप में अपनी सामग्री लिख सकते हैं। Intlayer आपके स्रोत कोड (source code) का विश्लेषण करेगा, आपके कॉन्फ़िगर किए गए AI प्रदाता का उपयोग करके अनुवाद उत्पन्न (generate) करेगा, और संकलन समय (compile time) पर स्थानीयकृत सामग्री के साथ स्ट्रिंग्स को बदल देगा।

### चरण 6: अपने कोड में सामग्री का उपयोग करें

बस अपने डिफ़ॉल्ट लोकेल में स्थिर स्ट्रिंग्स (strings) के साथ अपने कंपोनेंट्स लिखें। कंपाइलर बाकी काम संभाल लेगा।

आपका पेज कैसा दिख सकता है इसका एक उदाहरण:

<Tabs>
  <Tab value="Code" label="कोड">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>संपादन करके शुरू करें</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output" label="आउटपुट">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      hi: {
        getStartedByEditing: "संपादन करके शुरू करें",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** का उपयोग क्लाइंट साइड (client-side) घटकों के लिए लोकेल (locale) प्रदान करने के लिए किया जाता है।
- **`IntlayerServerProvider`** का उपयोग सर्वर (server) चाइल्ड नोड्स के लिए लोकेल (locale) प्रदान करने के लिए किया जाता है।

### (वैकल्पिक) चरण 7: छूटे हुए अनुवाद भरें

Intlayer छूटे हुए अनुवादों को भरने में आपकी मदद के लिए एक CLI टूल प्रदान करता है। आप अपने कोड से छूटे हुए अनुवादों का परीक्षण करने और उन्हें भरने के लिए `intlayer` कमांड का उपयोग कर सकते हैं।

```bash
npx intlayer test         # परीक्षण करें कि क्या कोई अनुवाद छूटा हुआ है
```

```bash
npx intlayer fill         # छूटे हुए अनुवाद भरें
```

### (वैकल्पिक) चरण 8: लोकेल का पता लगाने के लिए प्रॉक्सी (Proxy) कॉन्फ़िगर करें

अपने उपयोगकर्ताओं की पसंदीदा लोकेल का पता लगाने के लिए प्रॉक्सी सेट करें:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy` का उपयोग आपके उपयोगकर्ताओं के पसंदीदा लोकेल का पता लगाने और उन्हें [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में निर्दिष्ट (specified) अनुसार उपयुक्त URL पर निर्देशित (redirect) करने के लिए किया जाता है। यह उपयोगकर्ता के पसंदीदा लोकेल को कुकी (cookie) में सहेजने की अनुमति भी देता है।

### (वैकल्पिक) चरण 9: सामग्री की भाषा बदलें

Next.js के भीतर सामग्री की भाषा बदलने का सबसे अनुशंसित तरीका उपयोगकर्ता को उपयुक्त भाषा के लिए एक रूट (route) पर निर्देशित करने के लिए `Link` घटक (component) का उपयोग करना है। यह Next.js पूर्व-प्राप्त (prefetching) क्षमताओं का लाभ उठाएगा और पूर्ण पृष्ठ के पुनः लोड (hard refresh) को रोकेगा।

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* लोकेल - उदा: HI */}
              {localeItem}
            </span>
            <span>
              {/* अपनी ही भाषा में लोकेल - उदा: हिन्दी */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकेल की भाषा में - उदा: Hindi (यदि वर्तमान लोकेल अंग्रेजी है) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में लोकेल - उदा: Hindi */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* लोकेल - उदा: HI */}
              {localeItem}
            </span>
            <span>
              {/* अपनी ही भाषा में लोकेल - उदा: हिन्दी */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकेल की भाषा में - उदा: Hindi (यदि वर्तमान लोकेल अंग्रेजी है) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में लोकेल - उदा: Hindi */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* लोकेल - उदा: HI */}
              {localeItem}
            </span>
            <span>
              {/* अपनी ही भाषा में लोकेल - उदा: हिन्दी */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकेल की भाषा में - उदा: Hindi (यदि वर्तमान लोकेल अंग्रेजी है) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में लोकेल - उदा: Hindi */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> एक विकल्प `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग करना है। अधिक उन्नत उपयोगों और गहराई से स्पष्टीकरण के लिए [दस्तावेज़ का `useLocale` संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md) देखें।

### (वैकल्पिक) चरण 10: सर्वर एक्शन (Server Action) में वर्तमान लोकेल का उपयोग करें

यदि आपको वर्तमान लोकेल (Current Locale) का उपयोग करके सर्वर एक्शन (Server Action) को ट्रिगर करने की आवश्यकता है (उदाहरण के लिए ईमेल भेजना या एपीआई अनुरोध [API request] के लिए), तो आप `next-intlayer/server` से `getLocale` फ़ंक्शन का उपयोग कर सकते हैं।

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // لوकेल का उपयोग करके कुछ सर्वर एक्शन करें
};
```

> `getLocale` फ़ंक्शन निम्नलिखित प्राथमिकताओं (priorities) के साथ लोकेल निर्धारित करता है:
>
> 1. Next.js डिफ़ॉल्ट हेडर (headers) का निरीक्षण करता है।
> 2. यह कुकी में सहेजे गए लोकेल का निरीक्षण करता है।
> 3. यदि कुकी में कोई लोकेल सेट नहीं है, तो यह क्लाइंट प्राथमिकताओं (client preferences) का निरीक्षण करता है।
> 4. यदि कोई क्लाइंट प्राथमिकताएं सेट नहीं हैं, तो यह `intlayer.config.ts` कॉन्फ़िगरेशन में सेट डैफ़ॉल्ट (default) लोकेल का निरीक्षण करता है।

### (वैकल्पिक) चरण 11: अपने बंडल को अनुकूलित (Optimize) करें

`next-intlayer` के साथ, क्लाइंट साइड में प्रत्येक पेज घटक (page component) के साथ डिक्शनरी (dictionary) का बंडल (bundle) किया जाएगा।
यह बड़े डिक्शनरियों के लिए एक समस्या हो सकती है, क्योंकि यह आपके एप्लिकेशन के बंडल आकार (bundle size) को बढ़ा सकती है।
इसे हल करने के लिए, आप `@intlayer/swc` का उपयोग कर सकते हैं, जो एक इंटलेयर SWC प्लगइन (plugin) है। यह केवल उपयोग किए गए स्ट्रिंग सामग्री को आपकी बिल्ड में इंजेक्ट करता है, और जो उपयोग नहीं किए गए हैं उन्हें हटा देता है।

आप SWC प्लगइन (plugin) स्थापित कर सकते हैं:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> ध्यान दें: यह प्लगइन प्रायोगिक (experimental) है और केवल Next.js संस्करण > 13 के लिए काम कर रहा है।

> ध्यान दें: क्योंकि Next.js SWC प्लगइन के लिए `Suspense` घटक (component) की आवश्यकता होती है, इसलिए किसी भी घटक (component) में `importMode` के रूप में `dynamic` या `fetch` का उपयोग करते हुए `useIntlayer` के लिए `Suspense` घटकों का होना आवश्यक है। ऐसा न करने पर Next.js सर्वर (server) लेआउट का निर्माण करते समय क्रैश हो सकता है।

### Turbopack के साथ Intlayer देखना (Watching)

चूंकि Turbopack के भीतर Next.js के साथ Webpack प्लगिन (plugin) के काम करने के तरीके के कारण (Next App router के `next dev`), Turbopack एक साथ संकलन (parallel compilation) का समर्थन नहीं कर सकता है।
नतीजतन, Intlayer प्लगइन पृष्ठभूमि (background) में अद्यतन (update) होने पर डिक्शनरी फ़ाइलों के परिवर्तन (file modification) को नहीं पहचान पा रहा है।

प्रक्रिया को सही तरीके से काम करने के लिए, आपको अपनी प्रक्रिया (process) को `intlayer watch` कमांड के साथ चलाना होगा।

अतः `package.json` को संशोधित (Modify) करें:

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> यदि आप Next-Intlayer के < `6.x.x` संस्करण का उपयोग कर रहे हैं (इसलिए `Intlayer Turbopack Watcher` के बिना), तो ਤੁਹਾਨੂੰ `--turbopack` फ्लैग का उपयोग करना चाहिए: `"dev": "intlayer watch --with 'next dev --turbopack'"`। नवीनतम बिल्ड (>= `7.0.0`) में זה बिल्ट-इन (built-in) है।

### TypeScript विन्यास (Configuration)

चूंकि कंपाइलर (compiler) आपके कॉन्फ़िगर किए गए कॉन्फ़िगरेशन (configured configuration) के आधार पर छुपी (hidden) डिक्शनरी की सामग्री और प्रकार उत्पन्न करता है, इसलिए आपको अपने `.tsconfig` में `.intlayer` फ़ोल्डर को शामिल करने की आवश्यकता है।

![ऑटोकम्पलीट पूर्व-दृश्य (Autocomplete preview)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![अनुवाद त्रुटि पूर्व-दृश्य (Translation error preview)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

अपने `.tsconfig` फ़ाइल में निम्नलिखित जोड़ें:

```json5 fileName="tsconfig.json"
{
  "include": [
    // आपकी मौजूदा शामिल की गई फाइलें
    ".intlayer/**/*.ts",
  ],
}
```

### Git विन्यास (Configuration)

चूंकि `.intlayer` फ़ोल्डर और `.content.ts` फ़ाइलें (यदि आप कॉन्फ़िगरेशन में सामग्री उत्पन्न करने का विकल्प चुनते हैं) बिल्ड प्रक्रिया के भाग के रूप में उत्पन्न होती हैं, इसलिए आपको उन्हें संस्करण नियंत्रण (version control) (जैसे Git) में जोड़ने से बचना चाहिए।

इसके लिए, अपने `.gitignore` फ़ाइल में निम्नलिखित चीज़ें जोड़ें:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलें
.intlayer
```

### कोडिंग के लिए VS Code प्लगइन

डिक्शनरी सामग्री बनाते और प्रबंधित करते समय अपने अनुभव और उत्पादकता को बेहतर बनाने के लिए, आप Intlayer VS Code एक्सटेंशन स्थापित (install) कर सकते हैं। यह अतिरिक्त कार्यक्षमता और उपकरण प्रदान कर सकता है।

[यहाँ से VS Code एक्सटेंशन डाउनलोड करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

एक्सटेंशन आपको यह करने की अनुमति देगा:

- **ऑटो-कम्पलीट (Auto-complete)**: अनुवाद कुंजियों (translation keys) के लिए इंटेलिजेंट ऑटो-कम्पलीट सुझाव प्रदान करता है।
- **इन-लाइन अनुवाद त्रुटियाँ (In-line translation errors)**: स्रोत कोड (source code) फ़ाइलों में सीधे लापता अनुवादों (missing translations) को उजागर (highlight) करता है।
- **अनुवाद कुंजियों को प्रदर्शित करना**: कोड में ترجمہ (translation) कुंजियों के लिए पॉप-अप दिखाते हैं।
- **सामग्री को प्रबंधित करना**: सीधे स्रोत कोड से सामग्री डिक्शनरी (content dictionaries) बनाने और प्रबंधित करने के लिए उपकरण।

इसके उपयोग के बारे में अधिक विस्तृत निर्देशों के लिए [VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) पढ़ें।

### आगे क्या?

एक बार जब आप इंटलेयर (Intlayer) सेटअप पूरा कर लेते हैं, तो आप इसके अन्य भागों का अन्वेषण शुरू कर सकते हैं:

[विज़ुअल एডিटर (Visual editor) कॉन्फ़िगर करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md).
विज़ुअल एডিटर (Visual Editor) एक ऐसा टूल है जिसे UI सीधे संपादित (edit) करने और आपके सामग्री फ़ाइलों के भीतर डिक्शनरी को प्रबंधित करने के लिए डिज़ाइन किया गया है।

[CMS कॉन्फ़िगर करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md).
Intlayer CMS एक ऐसा एप्लिकेशन है जिसे दूर से (remotely) अपनी डिक्शनरी को प्रबंधित करने के लिए डिज़ाइन किया गया है।
