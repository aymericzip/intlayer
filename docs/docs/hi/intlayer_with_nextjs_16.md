---
createdAt: 2024-12-06
updatedAt: 2025-12-30
title: Next.js i18n - अपना Next.js 16 ऐप कैसे अनुवाद करें – गाइड 2026
description: जानें कि अपनी Next.js 16 वेबसाइट को बहुभाषी कैसे बनाएं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js 16
  - जावास्क्रिप्ट
  - रिएक्ट
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init कमांड जोड़ें
  - version: 7.0.6
    date: 2025-11-01
    changes: `alternates` ऑब्जेक्ट में `x-default` का उल्लेख जोड़ा गया
  - version: 7.0.0
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# Intlayer का उपयोग करके अपनी Next.js 16 वेबसाइट का अनुवाद करें | अंतरराष्ट्रीयकरण (i18n)

<Tabs defaultTab="video">
  <Tab label="वीडियो" value="video">
  
<iframe title="Next.js के लिए सबसे अच्छा i18n समाधान? Intlayer खोजें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="कोड" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतरराष्ट्रीय स्तर पर कैसे बनाएं"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [एप्लिकेशन टेम्प्लेट](https://github.com/aymericzip/intlayer-next-16-template) देखें।

## विषय-सूची

<TOC/>

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js 16** फ्रेमवर्क के साथ सहजता से एकीकृत होता है, जिसमें इसका शक्तिशाली **App Router** शामिल है। यह कुशल रेंडरिंग के लिए **Server Components** के साथ काम करने के लिए अनुकूलित है और पूरी तरह से [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) के साथ संगत है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कि कंपोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **क्लाइंट-साइड और सर्वर-साइड दोनों कंपोनेंट्स में अनुवादों तक पहुँच प्राप्त करें**।
- **स्वचालित रूप से उत्पन्न प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें**, जिससे ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार होता है।
- **उन्नत विशेषताओं का लाभ उठाएं**, जैसे गतिशील लोकल डिटेक्शन और स्विचिंग।

> Intlayer Next.js 12, 13, 14, और 16 के साथ संगत है। यदि आप Next.js Page Router का उपयोग कर रहे हैं, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_page_router.md) को देख सकते हैं।
> लोकल रूटिंग SEO, बंडल आकार और प्रदर्शन के लिए उपयोगी है। यदि आपको इसकी आवश्यकता नहीं है, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_no_locale_path.md) को देख सकते हैं।
> Next.js 12, 13, 14 के App Router के लिए, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_14.md) को देखें।

---

## Next.js एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**

  वह पैकेज जो Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अतिरिक्त, इसमें Next.js प्लगइन शामिल है जो Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए प्रॉक्सी भी शामिल है।

### चरण 2: अपने प्रोजेक्ट को कॉन्फ़िगर करें

यहाँ अंतिम संरचना है जो हम बनाएंगे:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Intlayer प्रदाता के लिए लोकल लेआउट
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # शैली और वैश्विक प्रदाताओं के लिए रूट लेआउट
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> यदि आप लोकल रूटिंग नहीं चाहते हैं, तो intlayer को एक साधारण प्रदाता / हुक के रूप में उपयोग किया जा सकता है। अधिक जानकारी के लिए [यह मार्गदर्शिका](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_no_locale_path.md) देखें।

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपकी अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, प्रॉक्सी पुनर्निर्देशन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटरों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने Next.js कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने Next.js सेटअप को Intlayer का उपयोग करने के लिए कॉन्फ़िगर करें:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* यहाँ कॉन्फ़िग विकल्प */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* यहाँ कॉन्फ़िग विकल्प */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* यहाँ कॉन्फ़िग विकल्प */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट डिक्लेरेशन फाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरण के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर कंपोनेंट्स के साथ संगतता सुनिश्चित करता है।

> `withIntlayer()` फ़ंक्शन एक प्रॉमिस फ़ंक्शन है। यह बिल्ड शुरू होने से पहले Intlayer शब्दकोशों को तैयार करने की अनुमति देता है। यदि आप इसे अन्य प्लगइन्स के साथ उपयोग करना चाहते हैं, तो आप इसे await कर सकते हैं। उदाहरण:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> यदि आप इसे सिंक्रोनसली उपयोग करना चाहते हैं, तो आप `withIntlayerSync()` फ़ंक्शन का उपयोग कर सकते हैं। उदाहरण:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer स्वचालित रूप से पता लगाता है कि आपका प्रोजेक्ट कमांड-लाइन फ्लैग `--webpack`, `--turbo`, या `--turbopack` के साथ-साथ आपके वर्तमान **Next.js संस्करण** के आधार पर **webpack** या **Turbopack** का उपयोग कर रहा है या नहीं।
>
> चूँकि `next>=16` है, यदि आप **Rspack** का उपयोग कर रहे हैं, तो आपको Turbopack को अक्षम करके Intlayer को स्पष्ट रूप से webpack कॉन्फ़िगरेशन का उपयोग करने के लिए बाध्य करना होगा:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### चरण 4: डायनामिक लोकल रूट्स परिभाषित करें

`RootLayout` से सब कुछ हटा दें और इसे निम्नलिखित कोड से बदलें:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // आप अभी भी बच्चों को अन्य प्रोवाइडर्स के साथ लपेट सकते हैं, जैसे `next-themes`, `react-query`, `framer-motion`, आदि।
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // आप अभी भी बच्चों को अन्य प्रोवाइडर्स के साथ लपेट सकते हैं, जैसे `next-themes`, `react-query`, `framer-motion`, आदि।
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // आप अभी भी बच्चों को अन्य प्रोवाइडर्स के साथ लपेट सकते हैं, जैसे `next-themes`, `react-query`, `framer-motion`, आदि।
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> `RootLayout` कॉम्पोनेंट को खाली रखने से `<html>` टैग में [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) और [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) एट्रिब्यूट्स सेट करने की अनुमति मिलती है।

डायनामिक रूटिंग को लागू करने के लिए, अपने `[locale]` डायरेक्टरी में एक नया लेआउट जोड़कर लोकल के लिए पाथ प्रदान करें:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> `[locale]` पाथ सेगमेंट का उपयोग लोकल को परिभाषित करने के लिए किया जाता है। उदाहरण: `/en-US/about` `en-US` को संदर्भित करेगा और `/fr/about` `fr` को।

> इस चरण में, आपको त्रुटि का सामना करना पड़ेगा: `Error: Missing <html> and <body> tags in the root layout.`। यह अपेक्षित है क्योंकि `/app/page.tsx` फ़ाइल अब उपयोग में नहीं है और इसे हटा दिया जा सकता है। इसके बजाय, `[locale]` पाथ सेगमेंट `/app/[locale]/page.tsx` पेज को सक्रिय करेगा। परिणामस्वरूप, आपके ब्राउज़र में पेज `/en`, `/fr`, `/es` जैसे पाथ के माध्यम से सुलभ होंगे। डिफ़ॉल्ट लोकल को रूट पेज के रूप में सेट करने के लिए, चरण 7 में `proxy` सेटअप को देखें।

फिर, अपने एप्लिकेशन लेआउट में `generateStaticParams` फ़ंक्शन को लागू करें।

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // सम्मिलित करने के लिए लाइन

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... बाकी कोड */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // सम्मिलित करने के लिए लाइन

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... बाकी कोड */
};

// ... बाकी कोड
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // सम्मिलित करने के लिए लाइन

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... बाकी कोड */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` यह सुनिश्चित करता है कि आपका एप्लिकेशन सभी लोकल के लिए आवश्यक पृष्ठों को पूर्व-निर्मित करता है, जिससे रनटाइम गणना कम होती है और उपयोगकर्ता अनुभव बेहतर होता है। अधिक जानकारी के लिए, [Next.js दस्तावेज़ीकरण generateStaticParams पर](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) देखें।

> Intlayer `export const dynamic = 'force-static';` के साथ काम करता है ताकि यह सुनिश्चित किया जा सके कि पृष्ठ सभी लोकल के लिए पूर्व-निर्मित हों।

### चरण 5: अपनी सामग्री घोषित करें

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### चरण 6: अपने कोड में सामग्री का उपयोग करें

अपने एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुँचें:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** क्लाइंट-साइड कंपोनेंट्स को लोकल प्रदान करने के लिए उपयोग किया जाता है। इसे किसी भी पैरेंट कंपोनेंट में रखा जा सकता है, जिसमें लेआउट भी शामिल है। हालांकि, इसे लेआउट में रखना अनुशंसित है क्योंकि Next.js पेजों के बीच लेआउट कोड साझा करता है, जिससे यह अधिक कुशल हो जाता है। लेआउट में `IntlayerClientProvider` का उपयोग करके, आप हर पेज के लिए इसे पुनः आरंभ करने से बचते हैं, प्रदर्शन में सुधार करते हैं और आपके एप्लिकेशन में एक सुसंगत स्थानीयकरण संदर्भ बनाए रखते हैं।
- **`IntlayerServerProvider`** सर्वर चाइल्ड्स को लोकल प्रदान करने के लिए उपयोग किया जाता है। इसे लेआउट में सेट नहीं किया जा सकता।

  > लेआउट और पेज एक सामान्य सर्वर संदर्भ साझा नहीं कर सकते क्योंकि सर्वर संदर्भ प्रणाली प्रति अनुरोध डेटा स्टोर (React के कैश [React's cache](https://react.dev/reference/react/cache) मैकेनिज्म के माध्यम से) पर आधारित है, जिससे एप्लिकेशन के विभिन्न सेगमेंट के लिए प्रत्येक "संदर्भ" पुनः बनाया जाता है। प्रदाता को साझा लेआउट में रखना इस पृथक्करण को तोड़ देगा, जिससे आपके सर्वर कंपोनेंट्स को सर्वर संदर्भ मानों का सही प्रसार नहीं हो पाएगा।

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> यदि आप अपनी सामग्री को किसी `string` एट्रिब्यूट में उपयोग करना चाहते हैं, जैसे कि `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useIntlayer.md) देखें।

> यदि आपका ऐप पहले से मौजूद है, तो आप हजारों घटकों को एक सेकंड में बदलने के लिए [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) को [एक्सट्रैक्ट कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) के साथ उपयोग कर सकते हैं।

### (वैकल्पिक) चरण 7: लोकल डिटेक्शन के लिए प्रॉक्सी कॉन्फ़िगर करें

उपयोगकर्ता की पसंदीदा लोकल का पता लगाने के लिए प्रॉक्सी सेट करें:

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

> `intlayerProxy` का उपयोग उपयोगकर्ता की पसंदीदा भाषा का पता लगाने और उन्हें उपयुक्त URL पर पुनर्निर्देशित करने के लिए किया जाता है जैसा कि [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में निर्दिष्ट है। इसके अतिरिक्त, यह उपयोगकर्ता की पसंदीदा भाषा को कुकी में सहेजने की सुविधा भी प्रदान करता है।

> यदि आपको कई प्रॉक्सी को एक साथ जोड़ने की आवश्यकता है (उदाहरण के लिए, प्रमाणीकरण या कस्टम प्रॉक्सी के साथ `intlayerProxy`), तो Intlayer अब `multipleProxies` नामक एक सहायक प्रदान करता है।

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (वैकल्पिक) चरण 8: अपने मेटाडेटा का अंतरराष्ट्रीयकरण

यदि आप अपने मेटाडेटा का अंतरराष्ट्रीयकरण करना चाहते हैं, जैसे कि आपके पृष्ठ का शीर्षक, तो आप Next.js द्वारा प्रदान की गई `generateMetadata` फ़ंक्शन का उपयोग कर सकते हैं। इसके अंदर, आप अपने मेटाडेटा का अनुवाद करने के लिए `getIntlayer` फ़ंक्शन से सामग्री प्राप्त कर सकते हैं।

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * प्रत्येक लोकल के लिए सभी URL वाले ऑब्जेक्ट को जनरेट करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // रिटर्न करता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... बाकी कोड
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * प्रत्येक भाषा के लिए सभी URL वाले ऑब्जेक्ट को जनरेट करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // रिटर्न करता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... बाकी कोड
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * प्रत्येक भाषा के लिए सभी URL वाला ऑब्जेक्ट बनाता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // लौटाता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

module.exports = { generateMetadata };

// ... बाकी कोड
````

> ध्यान दें कि `next-intlayer` से आयातित `getIntlayer` फ़ंक्शन आपकी सामग्री को `IntlayerNode` में लपेट कर लौटाता है, जो विज़ुअल एडिटर के साथ एकीकरण की अनुमति देता है। इसके विपरीत, `intlayer` से आयातित `getIntlayer` फ़ंक्शन आपकी सामग्री को सीधे बिना अतिरिक्त गुणों के लौटाता है।

वैकल्पिक रूप से, आप अपने मेटाडेटा को घोषित करने के लिए `getTranslation` फ़ंक्शन का उपयोग कर सकते हैं। हालांकि, मेटाडेटा के अनुवाद को स्वचालित करने और किसी बिंदु पर सामग्री को बाहरी बनाने के लिए कंटेंट घोषणा फ़ाइलों का उपयोग करने की सिफारिश की जाती है।

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... बाकी कोड
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... बाकी कोड
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... बाकी कोड
```

> आधिकारिक Next.js दस्तावेज़ में मेटाडेटा अनुकूलन के बारे में अधिक जानें [यहाँ](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)।

### (वैकल्पिक) चरण 9: अपने sitemap.xml और robots.txt का अंतरराष्ट्रीयकरण

अपने `sitemap.xml` और `robots.txt` का अंतरराष्ट्रीयकरण करने के लिए, आप Intlayer द्वारा प्रदान की गई `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको अपने साइटमैप के लिए बहुभाषी URL उत्पन्न करने की अनुमति देता है।

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> आधिकारिक Next.js दस्तावेज़ में साइटमैप अनुकूलन के बारे में अधिक जानें [यहाँ](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)। आधिकारिक Next.js दस्तावेज़ में robots.txt अनुकूलन के बारे में अधिक जानें [यहाँ](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)।

### (वैकल्पिक) चरण 10: अपनी सामग्री की भाषा बदलें

Next.js में अपनी सामग्री की भाषा बदलने के लिए, अनुशंसित तरीका `Link` कॉम्पोनेंट का उपयोग करके उपयोगकर्ताओं को उपयुक्त स्थानीयकृत पृष्ठ पर पुनर्निर्देशित करना है। `Link` कॉम्पोनेंट पृष्ठ के प्रीफ़ेचिंग को सक्षम करता है, जो पूर्ण पृष्ठ पुनः लोड से बचने में मदद करता है।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // यह सुनिश्चित करेगा कि ब्राउज़र का "पीछे जाएँ" बटन पिछले पृष्ठ पर पुनर्निर्देशित करेगा
          >
            <span>
              {/* लोकल - उदा. FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी भाषा में भाषा का नाम - उदा. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा का नाम - उदा. Francés यदि वर्तमान लोकल Locales.SPANISH है */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा का नाम - उदा. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // यह सुनिश्चित करेगा कि ब्राउज़र का "पीछे जाएँ" बटन पिछले पृष्ठ पर पुनर्निर्देशित करेगा
          >
            <span>
              {/* लोकल - उदा. FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी भाषा में भाषा का नाम - उदा. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा का नाम - उदा. Francés यदि वर्तमान लोकल Locales.SPANISH है */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा का नाम - उदा. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // यह सुनिश्चित करेगा कि ब्राउज़र का "पीछे जाएँ" बटन पिछले पृष्ठ पर पुनर्निर्देशित करेगा
          >
            <span>
              {/* लोकल - उदा. FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी भाषा में भाषा का नाम - उदा. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा का नाम - उदा. Francés यदि वर्तमान लोकल Locales.SPANISH है */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेजी में भाषा का नाम - उदा. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> एक वैकल्पिक तरीका `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग करना है। यह फ़ंक्शन पृष्ठ के प्रीफ़ेचिंग की अनुमति नहीं देगा। अधिक जानकारी के लिए [`useLocale` हुक दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md) देखें।

> आप भाषा बदलने पर कस्टम फ़ंक्शन को ट्रिगर करने के लिए `onLocaleChange` विकल्प में एक फ़ंक्शन भी सेट कर सकते हैं।

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... बाकी कोड

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>फ़्रेंच में बदलें</button>
);
```

> दस्तावेज़ीकरण संदर्भ:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (वैकल्पिक) चरण 11: एक स्थानीयकृत लिंक कॉम्पोनेंट बनाना

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन का नेविगेशन वर्तमान लोकल का सम्मान करता है, आप एक कस्टम `Link` कॉम्पोनेंट बना सकते हैं। यह कॉम्पोनेंट स्वचालित रूप से आंतरिक URL को वर्तमान भाषा के साथ प्रीफ़िक्स करता है। उदाहरण के लिए, जब कोई फ़्रेंच भाषी उपयोगकर्ता "About" पृष्ठ के लिंक पर क्लिक करता है, तो उन्हें `/about` के बजाय `/fr/about` पर पुनर्निर्देशित किया जाता है।

यह व्यवहार कई कारणों से उपयोगी है:

- **SEO और उपयोगकर्ता अनुभव**: स्थानीयकृत URL खोज इंजनों को भाषा-विशिष्ट पृष्ठों को सही ढंग से अनुक्रमित करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **स्थिरता**: अपने पूरे एप्लिकेशन में स्थानीयकृत लिंक का उपयोग करके, आप गारंटी देते हैं कि नेविगेशन वर्तमान लोकल के भीतर रहता है, जिससे अप्रत्याशित भाषा परिवर्तन रुक जाते हैं।
- **रखरखाव**: स्थानीयकरण तर्क को एक ही घटक में केंद्रित करना URL के प्रबंधन को सरल बनाता है, जिससे आपके एप्लिकेशन के बढ़ने पर आपके कोडबेस को बनाए रखना और विस्तारित करना आसान हो जाता है।

नीचे TypeScript में एक स्थानीयकृत `Link` घटक का कार्यान्वयन है:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * यह जांचने के लिए उपयोगिता फ़ंक्शन कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम लिंक घटक जो वर्तमान लोकल के आधार पर href विशेषता को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह URL को लोकल (उदा. /fr/about) के साथ प्रीफ़िक्स करने के लिए `getLocalizedUrl` का उपयोग करता है।
 * यह सुनिश्चित करता है कि नेविगेशन उसी लोकल संदर्भ के भीतर रहे।
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * यह जांचने के लिए उपयोगिता फ़ंक्शन कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम लिंक घटक जो वर्तमान लोकल के आधार पर href विशेषता को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह URL को लोकल (उदा. /fr/about) के साथ प्रीफ़िक्स करने के लिए `getLocalizedUrl` का उपयोग करता है।
 * यह सुनिश्चित करता है कि नेविगेशन उसी लोकल संदर्भ के भीतर रहे।
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * यह जांचने के लिए उपयोगिता फ़ंक्शन कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम लिंक घटक जो वर्तमान लोकल के आधार पर href विशेषता को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह URL को लोकल (उदा. /fr/about) के साथ प्रीफ़िक्स करने के लिए `getLocalizedUrl` का उपयोग करता है।
 * यह सुनिश्चित करता है कि नेविगेशन उसी लोकल संदर्भ के भीतर रहे।
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // यदि लिंक आंतरिक है और एक मान्य href प्रदान किया गया है, तो स्थानीयकृत URL प्राप्त करें।
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### यह कैसे काम करता है

- **बाहरी लिंक का पता लगाना**:  
  उपयोगिता फ़ंक्शन `checkIsExternalLink` निर्धारित करता है कि क्या URL बाहरी है। बाहरी लिंक अपरिवर्तित छोड़ दिए जाते हैं क्योंकि उन्हें स्थानीयकरण की आवश्यकता नहीं होती है।

- **वर्तमान लोकल प्राप्त करना**:  
  `useLocale` हुक वर्तमान लोकल (उदा. फ़्रेंच के लिए `fr`) प्रदान करता है।

- **URL को स्थानीयकृत करना**:  
  आंतरिक लिंक (अर्थात गैर-बाहरी) के लिए, URL को वर्तमान लोकल के साथ स्वचालित रूप से प्रीफ़िक्स करने के लिए `getLocalizedUrl` का उपयोग किया जाता है। इसका मतलब यह है कि यदि आपका उपयोगकर्ता फ़्रेंच में है, तो `href` के रूप में `/about` पास करने से यह `/fr/about` में बदल जाएगा।

- **लिंक लौटना**:  
  कॉम्पोनेंट स्थानीयकृत URL के साथ एक `<a>` तत्व लौटाता है, यह सुनिश्चित करते हुए कि नेविगेशन लोकल के अनुरूप है।

अपने एप्लिकेशन में इस `Link` कॉम्पोनेंट को एकीकृत करके, आप एक सुसंगत और भाषा-जागरूक उपयोगकर्ता अनुभव बनाए रखते हैं और बेहतर SEO और उपयोगिता से भी लाभान्वित होते हैं।
