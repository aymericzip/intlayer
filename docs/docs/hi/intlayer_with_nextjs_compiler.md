---
createdAt: 2026-01-10
updatedAt: 2026-06-23
title: "Next.js i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Next.js ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - कंपाइलर
  - AI
slugs:
  - doc
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "प्रारंभिक विमोचन"
author: aymericzip
---

# मौजूदा Next.js एप्लिकेशन को बहुभाषी (i18n) कैसे बनाएं (i18n गाइड 2026)

<Tabs defaultTab="video">
  <Tab label="वीडियो" value="video">

<iframe title="Best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
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

यदि आपने कभी किसी ऐसे एप्लिकेशन में कई भाषाएँ जोड़ने का प्रयास किया है जो केवल एक के लिए बनाया गया था, तो आप इससे होने वाली परेशानी को जानते हैं। यह सिर्फ "कठिन" नहीं है, यह थकाऊ है। आपको हर फ़ाइल से गुजरना होगा, हर टेक्स्ट स्ट्रिंग को ढूंढना होगा, और उन्हें अलग-अलग शब्दकोश (dictionary) फ़ाइलों में ले जाना होगा।

फिर सबसे जोखिम भरा हिस्सा आता है: लेआउट या लॉजिक को तोड़े बिना उस सभी टेक्स्ट को कोड हुक (hooks) से बदलना। यह उस तरह का काम है जो हफ्तों तक नई सुविधाओं के विकास को रोक देता है और एक न खत्म होने वाले रीफैक्टोरिंग जैसा लगता है।

## Intlayer Compiler क्या है?

**Intlayer Compiler** को उस मैन्युअल काम को छोड़ने के लिए बनाया गया था। स्ट्रिंग्स को मैन्युअल रूप से निकालने के बजाय, यह कंपाइलर आपके लिए ऐसा करता है। यह आपके कोड को स्कैन करता है, टेक्स्ट ढूंढता है, और पृष्ठभूमि में शब्दकोश उत्पन्न करने के लिए AI का उपयोग करता है।
फिर, यह आवश्यक i18n हुक को इंजेक्ट करने के लिए बिल्ड चरण के दौरान आपके सोर्स कोड को संशोधित करता है। मूल रूप से, आप अपना ऐप लिखते रहें जैसे कि वह एक भाषा में हो, और कंपाइलर बहुभाषी रूपांतरण को मूल रूप से संभालता है।

> कंपाइलर दस्तावेज़: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md)

### सीमाएं

चूंकि कंपाइलर **कंपाइल समय** पर कोड विश्लेषण और रूपांतरण (हुक इंजेक्ट करना और डिक्शनरी बनाना) करता है, इसलिए यह आपके एप्लिकेशन की **बिल्ड प्रक्रिया को धीमा** कर सकता है।

विकास के दौरान इस प्रभाव को सीमित करने के लिए, आप कंपाइलर को [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) मोड में चलाने के लिए सेट कर सकते हैं या आवश्यकता न होने पर इसे अक्षम कर सकते हैं।

---

## Next.js एप्लिकेशन में Intlayer सेट करने के लिए चरण-दर-चरण मार्गदर्शिका

<Steps>

<Step number={1} title="निर्भरताएं स्थापित करें">

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
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपिलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**

  पैकेज जो Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js अंतर्राष्ट्रीयकरण के लिए कॉन्टेक्स्ट प्रोवाइडर और हुक प्रदान करता है। इसके अतिरिक्त, इसमें Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन शामिल है, साथ ही उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने, कुकीज़ और URL पुनर्निर्देशन को संभालने के लिए मिडिलवेयर भी शामिल है।

</Step>

<Step number={2} title="अपना प्रोजेक्ट कॉन्फ़िगर करें">

अपने एप्लिकेशन की भाषाओं को परिभाषित करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.HINDI],
    defaultLocale: Locales.HINDI,
  },
  routing: {
    mode: "search-params",
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
    applicationContext: "यह एप्लिकेशन एक साधारण मैप एप्लिकेशन उदाहरण है",
  },
};

export default config;
```

> **ध्यान दें**: सुनिश्चित करें कि आपने अपने पर्यावरण चर में `OPEN_AI_API_KEY` सेट किया हुआ है।

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, प्रॉक्सी रीडायरेक्ट, कुकी मैपिंग, सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग अक्षम कर सकते हैं, और बहुत कुछ कर सकते हैं। उपलब्ध मापदंडों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपने Next.js कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

Intlayer का उपयोग करने के लिए अपने Next.js सेटअप को कॉन्फ़िगर करें:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* वैकल्पिक अतिरिक्त Next.js कॉन्फ़िगरेशन यहाँ */
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह शब्दकोश फ़ाइलों का निर्माण सुनिश्चित करता है और देव मोड में उन्हें वॉच करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरण के भीतर Intlayer पर्यावरण चर परिभाषित करता है। इसके अलावा, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर कंपोनेंट्स के साथ पूरी तरह काम करता है।

</Step>

<Step number={4} title="Babel कॉन्फ़िगर करें">

Intlayer कंपाइलर को आपकी सामग्री निकालने और अनुकूलित करने के लिए Babel की आवश्यकता होती है। Intlayer प्लगइन्स शामिल करने के लिए अपना `babel.config.js` (या `babel.config.json`) अपडेट करें:

```typescript fileName="babel.config.js"
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

</Step>

<Step number={5} title="अपने पेजों में लोकेल डिटेक्शन">

अपने `RootLayout` की सामग्री साफ़ करें और उसे नीचे दिए गए उदाहरण से बदलें:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
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
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="अपने कंपोनेंट्स कंपाइल करें">

कंपाइलर सक्षम होने के साथ, आपको अब सामग्री शब्दकोशों (जैसे `.content.ts` फ़ाइलें) को मैन्युअल रूप से घोषित करने की **आवश्यकता नहीं** है।

इसके बजाय, आप सीधे अपने कोड में हार्डकोडेड स्ट्रिंग्स के रूप में अपनी सामग्री लिखते हैं। Intlayer स्रोत कोड को स्कैन करेगा, कॉन्फ़िगर किए गए AI प्रदाता का उपयोग करके अनुवाद उत्पन्न करेगा, और बिल्ड कंपाइल चरण के दौरान उन स्ट्रिंग्स को स्थानीयकृत सामग्री के साथ चुपचाप बदल देगा। यह सब पूरी तरह से स्वचालित है।

बस अपने डिफ़ॉल्ट लोकेल में हार्ड-कोडेड स्ट्रिंग्स के साथ अपने घटकों का उपयोग करें और Intlayer कंपाइलर को बाकी काम करने दें।

आपका `page.tsx` कैसा दिखेगा इसका उदाहरण:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>संपादन करके शुरू करें!</p>
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
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditingThis: "Get started by editing this!",
      },
      fr: {
        getStartedByEditingThis: "Commencez par éditer ceci !",
      },
      hi: {
        getStartedByEditingThis: "संपादन करके शुरू करें!",
      },
    }
  }
}
```

<Tabs>
  <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditingThis}</p>
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

- **`IntlayerProvider`** को root layout में एक बार mount किया जाता है। यह server और client दोनों components को locale प्रदान करता है, इसलिए pages अब स्वयं को wrap नहीं करते हैं।
- बिना `[locale]` path segment के locale हमेशा request से आता है — `x-intlayer-locale` header जो Intlayer proxy द्वारा set किया जाता है, फिर locale cookie — जिसे server hooks अपने आप पढ़ते हैं जब provider नहीं चलाया गया हो।

</Tabs>

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

- **`IntlayerClientProvider`** का उपयोग क्लाइंट साइड पर बच्चों को लोकेल प्रदान करने के लिए किया जाता है।
- जबकि **`IntlayerServerProvider`** का उपयोग सर्वर साइड पर बच्चों को लोकेल प्रदान करने के लिए किया जाता है।

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

  </Tab>

</Tabs>

</Step>

<Step number={7} title="छूटे हुए अनुवाद भरें" isOptional={true}>

Intlayer छूटे हुए अनुवादों को भरने में आपकी मदद करने के लिए एक CLI टूल प्रदान करता है। आप अपने कोड से छूटे हुए अनुवादों का परीक्षण करने और उन्हें भरने के लिए `intlayer` कमांड का उपयोग कर सकते हैं।

```bash packageManager="npm"
npx intlayer test         # परीक्षण करें कि क्या अनुवाद छूटे हुए हैं
```

```bash packageManager="yarn"
yarn intlayer test         # परीक्षण करें कि क्या अनुवाद छूटे हुए हैं
```

```bash packageManager="pnpm"
pnpm intlayer test         # परीक्षण करें कि क्या अनुवाद छूटे हुए हैं
```

```bash packageManager="bun"
bun x intlayer test         # परीक्षण करें कि क्या अनुवाद छूटे हुए हैं
```

```bash packageManager="npm"
npx intlayer fill         # छूटे हुए अनुवाद भरें
```

```bash packageManager="yarn"
yarn intlayer fill         # छूटे हुए अनुवाद भरें
```

```bash packageManager="pnpm"
pnpm intlayer fill         # छूटे हुए अनुवाद भरें
```

```bash packageManager="bun"
bun x intlayer fill         # छूटे हुए अनुवाद भरें
```

> अधिक विवरण के लिए, [CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/ci.md) देखें।

</Step>

<Step number={8} title="लोकेल रूटिंग प्रॉक्सी मिडिलवेयर" isOptional={true}>

यदि आप उपयोगकर्ता को उनकी पसंदीदा लोकेल पर स्वचालित रूप से रीडायरेक्ट करना चाहते हैं, तो एक प्रॉक्सी मिडिलवेयर स्थापित करें:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` का उपयोग उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने और उन्हें [कॉन्फ़िगरेशन फ़ाइल सेटिंग्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में निर्दिष्ट उपयुक्त URL पर रीडायरेक्ट करने के लिए किया जाता है। इसके अतिरिक्त, यह उपयोगकर्ता की पसंदीदा लोकेल को कुकी में सहेजने में सक्षम बनाता है।

> Intlayer v9 के बाद से, यह middleware `routing.enableProxy` विकल्प का सम्मान करता है (`true` डिफ़ॉल्ट रूप से)। इसे pass-through में बदलने के लिए अपने कॉन्फ़िगरेशन में `routing.enableProxy: false` सेट करें बिना इस फ़ाइल को हटाए। [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/releases/v9.md) देखें।

</Step>

<Step number={9} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

Next.js के भीतर सामग्री की भाषा बदलने का सबसे अनुशंसित तरीका उपयोगकर्ता को उपयुक्त भाषा के लिए एक रूट पर निर्देशित करने के लिए `Link` घटक का उपयोग करना है। यह Next.js पूर्व-प्राप्त क्षमताओं का लाभ उठाएगा और पूर्ण पृष्ठ के पुनः लोड को रोकेगा।

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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
              {/* वर्तमान लोकेल की भाषा में - उदा: Francés यदि वर्तमान लोकेल Locales.SPANISH है */}
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

> एक विकल्प `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग करना है। यह फ़ंक्शन पेज प्रीफेचिंग की अनुमति नहीं देगा। अधिक जानकारी के लिए [`useLocale` हुक दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md) देखें।

</Step>

<Step number={10} title="अपने बंडल आकार को अनुकूलित करें" isOptional={true}>

`next-intlayer` का उपयोग करते समय, डिक्शनरी डिफ़ॉल्ट रूप से प्रत्येक पेज के बंडल में शामिल की जाएंगी। बंडल आकार को अनुकूलित करने के लिए, Intlayer एक वैकल्पिक SWC प्लगइन प्रदान करता है जो मैक्रो का उपयोग करके `useIntlayer` कॉल्स को बुद्धिमानी से बदल देता है। यह सुनिश्चित करता है कि डिक्शनरी केवल उन पेजों के बंडल में शामिल हैं जो वास्तव में उनका उपयोग करते हैं।

`@intlayer/babel` प्लगइन पहले से ही bundling optimization को एकीकृत करता है (`babel.config.js` देखें)। लेकिन `@intlayer/swc` प्लगइन अधिक प्रदर्शनशील है। यदि आप `@intlayer/babel` प्लगइन को हटा देते हैं, तो आप `@intlayer/swc` प्लगइन का उपयोग कर सकते हैं।

इस अनुकूलन को सक्षम करने के लिए, `@intlayer/swc` पैकेज स्थापित करें। एक बार स्थापित होने के बाद, `next-intlayer` स्वचालित रूप से प्लगइन का पता लगाएगा और उसका उपयोग करेगा:

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

> नोट: यह अनुकूलन केवल Next.js 13 और उसके बाद के वर्ज़न के लिए उपलब्ध है।

> नोट: यह पैकेज डिफ़ॉल्ट रूप से स्थापित नहीं है क्योंकि Next.js SWC प्लगइन्स अभी भी प्रयोगात्मक हैं। भविष्य में यह बदल सकता है।

> नोट: यदि आप `importMode: 'dynamic'` या `importMode: 'fetch'` (डिक्शनरी कॉन्फ़िगरेशन में) विकल्प सेट करते हैं, तो यह Suspense पर निर्भर करेगा, इसलिए आपको `useIntlayer` कॉल्स को `Suspense` सीमा में लपेटना होगा। इसका मतलब है कि आप अपने पेज / लेआउट घटक के शीर्ष स्तर पर सीधे `useIntlayer` का उपयोग नहीं कर पाएंगे।
> </Step>

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

> v9 के बाद से, `intlayerCompiler` को `intlayer` plugin में शामिल किया गया है। इसलिए आपको इसे manually जोड़ने की आवश्यकता नहीं है।

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // घटकों से शब्दकोशों में सामग्री निकालें
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
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
</Step>

</Steps>

### TypeScript कॉन्फ़िगरेशन

Intlayer TypeScript लाभ प्राप्त करने और आपकी कोडबेस को अधिक मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन (module augmentation) का उपयोग करता है।

![ऑटोकम्पलीट](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![अनुवाद त्रुटि](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जेनरेटेड टाइप शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जेनरेटेड टाइप शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करने की अनुशंसा की जाती है। यह उन्हें आपके Git रिपॉजिटरी में कमिट करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्न निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS Code एक्सटेंशन

Intlayer के साथ आपके विकास के अनुभव को बेहतर बनाने के लिए, आप **आधिकारिक Intlayer VS Code एक्सटेंशन** स्थापित कर सकते हैं।

[VS Code Marketplace से स्थापित करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्पलीट**।
- छूटे हुए अनुवादों के लिए **रीयल-टाइम त्रुटि डिटेक्शन**।
- अनुवादित सामग्री के **इनलाइन प्रीव्यू**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं (Quick actions)**।

एक्सटेंशन का उपयोग करने के बारे में अधिक विवरण के लिए [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) पढ़ें।

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी बना सकते हैं।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Intlayer कंपाइलर क्या करता है?">

कंपाइलर बिल्ड समय पर आपके JSX और TSX कोड का विश्लेषण करता है, स्वचालित रूप से उपयोगकर्ता-सामना करने वाले टेक्स्ट को निकालता है और अलग से सामग्री फ़ाइलें लिखे बिना शब्दकोश उत्पन्न करता है।

</Question>

<Question title="i18n मेरे Next.js बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित समाधानों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। सर्वर घटक सर्वर पर सामग्री का समाधान करते हैं, और बिल्ड-टाइम कंपाइलर `useIntlayer` कॉल को घटक द्वारा उपयोग की जाने वाली सटीक प्रविष्टियों से बदल देता है। [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) शेष को प्रति लोकेल विभाजित करते हैं, जिससे बंडल का आकार 50% तक कम हो जाता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना next-intl, next-i18next या i18next से माइग्रेट कर सकता हूँ?">

हाँ, इसके दो रास्ते हैं। आप [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) या [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md) के साथ सामग्री को धीरे-धीरे स्थानांतरित कर सकते हैं। या आप अपने वर्तमान API को पूरी तरह से रख सकते हैं: [संगतता एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) बिल्कुल समान API प्रदान करते हैं लेकिन Intlayer शब्दकोशों द्वारा संचालित होते हैं।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

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

<Question title="कंपाइलर कैसे तय करता है कि उपयोगकर्ता टेक्स्ट क्या है?">

कंपाइलर स्थिर विश्लेषण नियमों का उपयोग करता है: JSX नोड्स और सामान्य विशेषताओं (`aria-label`, `title`, `placeholder`) में टेक्स्ट को स्थानीयकृत माना जाता है, जबकि CSS क्लास और कोड पहचानकर्ताओं को अनदेखा किया जाता है।

</Question>

<Question title="उन स्ट्रिंग्स का क्या होता है जिन्हें कंपाइलर नहीं देख सकता?">

रनटाइम पर या API प्रतिक्रियाओं से उत्पन्न गतिशील स्ट्रिंग्स कंपाइलर द्वारा नहीं पकड़ी जाती हैं। उनके लिए आप स्पष्ट रूप से `t()` या मानक `.content` फ़ाइल का उपयोग करते हैं।

</Question>

<Question title="क्या मुझे कंपाइलर का उपयोग करना चाहिए या सामग्री को स्वयं घोषित करना चाहिए?">

त्वरित प्रोटोटाइप के लिए कंपाइलर बहुत सुविधाजनक है। जटिल इंटरफेस, बहुवचन नियमों या विशेष प्रारूपण के लिए, स्पष्ट सामग्री फ़ाइलें बेहतर नियंत्रण देती हैं।

</Question>

<Question title="क्या Intlayer React Server Components के साथ काम करता है?">

हाँ। सर्वर घटकों में सामग्री सीधे सर्वर पर हल की जाती है, इसलिए सर्वर द्वारा रेंडर किए गए टेक्स्ट के लिए क्लाइंट को कोई शब्दकोश नहीं भेजा जाता है। क्लाइंट घटक प्रदाता के माध्यम से शब्दकोश पढ़ते हैं।

</Question>

<Question title="मैं ऐप को AI के साथ स्वचालित रूप से कैसे अनुवाद करूँ?">

`npx intlayer fill` चलाएं। CLI अनुपलब्ध अनुवादों का पता लगाता है और आपके द्वारा चुने गए LLM के साथ आपके स्वयं के प्रदाता और API कुंजी का उपयोग करके उन्हें भरता है। `--git-diff` ध्वज वर्तमान शाखा पर बदली गई सामग्री तक सीमित करता है। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

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
