---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - मौजूदा Next.js ऐप को बहुभाषी ऐप में बदलें 2026 में
description: जानें कि Intlayer Compiler का उपयोग करके अपने मौजूदा Next.js एप्लिकेशन को बहुभाषी कैसे बनाया जाए। AI का उपयोग करके अपने ऐप का अंतर्राष्ट्रीयकरण (i18n) और अनुवाद करने के लिए दस्तावेज़ का पालन करें।
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

### चरण 1: निर्भरताएं स्थापित करें

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

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपिलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**

  पैकेज जो Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js अंतर्राष्ट्रीयकरण के लिए कॉन्टेक्स्ट प्रोवाइडर और हुक प्रदान करता है। इसके अतिरिक्त, इसमें Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करने के लिए Next.js प्लगइन शामिल है, साथ ही उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने, कुकीज़ और URL पुनर्निर्देशन को संभालने के लिए मिडिलवेयर भी शामिल है।

### चरण 2: अपना प्रोजेक्ट कॉन्फ़िगर करें

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
     * इंगित करता है कि कंपाइलर सक्षम होना चाहिए या नहीं।
     */
    enabled: true,

    /**
     * ऑप्टिमाइज़ किए गए शब्दकोशों के लिए आउटपुट डायरेक्टरी।
     */
    outputDir: "compiler",

    /**
     * डिक्शनरी कुंजी उपसर्ग (प्रीफ़िक्स)
     */
    dictionaryKeyPrefix: "", // बेस प्रीफ़िक्स हटाएँ

    /**
     * इंगित करता है कि क्या ट्रांसफ़ॉर्म होने के बाद कंपोनेंट्स को सहेजा जाना चाहिए।
     * इस तरह, ऐप को ट्रांसफ़ॉर्म करने के लिए कंपाइलर को केवल एक बार चलाया जा सकता है, और फिर इसे हटाया जा सकता है।
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

### चरण 3: अपने Next.js कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

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

### चरण 4: Babel कॉन्फ़िगर करें

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

### चरण 5: अपने पेजों में लोकेल डिटेक्शन

अपने `RootLayout` की सामग्री साफ़ करें और उसे नीचे दिए गए उदाहरण से बदलें:

```tsx fileName="src/app/layout.tsx"
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

### चरण 6: अपने कंपोनेंट्स कंपाइल करें

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

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** का उपयोग क्लाइंट साइड पर बच्चों को लोकेल प्रदान करने के लिए किया जाता है।
- जबकि **`IntlayerServerProvider`** का उपयोग सर्वर साइड पर बच्चों को लोकेल प्रदान करने के लिए किया जाता है।

### (वैकल्पिक) चरण 7: छूटे हुए अनुवाद भरें

Intlayer छूटे हुए अनुवादों को भरने में आपकी मदद करने के लिए एक CLI टूल प्रदान करता है। आप अपने कोड से छूटे हुए अनुवादों का परीक्षण करने और उन्हें भरने के लिए `intlayer` कमांड का उपयोग कर सकते हैं।

```bash
npx intlayer test         # परीक्षण करें कि क्या अनुवाद छूटे हुए हैं
```

```bash
npx intlayer fill         # छूटे हुए अनुवाद भरें
```

> अधिक विवरण के लिए, [CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/ci.md) देखें।

### (वैकल्पिक) चरण 8: लोकेल रूटिंग प्रॉक्सी मिडिलवेयर

यदि आप उपयोगकर्ता को उनकी पसंदीदा लोकेल पर स्वचालित रूप से रीडायरेक्ट करना चाहते हैं, तो एक प्रॉक्सी मिडिलवेयर स्थापित करें:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` का उपयोग उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने और उन्हें [कॉन्फ़िगरेशन फ़ाइल सेटिंग्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में निर्दिष्ट उपयुक्त URL पर रीडायरेक्ट करने के लिए किया जाता है। इसके अतिरिक्त, यह उपयोगकर्ता की पसंदीदा लोकेल को कुकी में सहेजने में सक्षम बनाता है।

### (वैकल्पिक) चरण 9: अपनी सामग्री की भाषा बदलें

Next.js के भीतर सामग्री की भाषा बदलने का सबसे अनुशंसित तरीका उपयोगकर्ता को उपयुक्त भाषा के लिए एक रूट पर निर्देशित करने के लिए `Link` घटक का उपयोग करना है। यह Next.js पूर्व-प्राप्त क्षमताओं का लाभ उठाएगा और पूर्ण पृष्ठ के पुनः लोड को रोकेगा।

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
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

### (वैकल्पिक) चरण 10: अपने बंडल आकार को अनुकूलित करें

`next-intlayer` का उपयोग करते समय, डिक्शनरी डिफ़ॉल्ट रूप से प्रत्येक पेज के बंडल में शामिल की जाएंगी। बंडल आकार को अनुकूलित करने के लिए, Intlayer एक वैकल्पिक SWC प्लगइन प्रदान करता है जो मैक्रो का उपयोग करके `useIntlayer` कॉल्स को बुद्धिमानी से बदल देता है। यह सुनिश्चित करता है कि डिक्शनरी केवल उन पेजों के बंडल में शामिल हैं जो वास्तव में उनका उपयोग करते हैं।

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
