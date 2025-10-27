---
createdAt: 2024-12-06
updatedAt: 2025-06-29
title: अपना Next.js 15 ऐप कैसे अनुवाद करें – i18n गाइड 2025
description: जानें कि कैसे अपनी Next.js 15 वेबसाइट को बहुभाषी बनाया जाए। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js 15
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 15
applicationTemplate: https://github.com/aymericzip/intlayer-next-15-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# Intlayer के साथ अपना Next.js 15 अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<iframe title="Next.js के लिए सबसे अच्छा i18n समाधान? Intlayer खोजें" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-next-15-template) देखें।

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js 15** फ्रेमवर्क के साथ सहजता से एकीकृत होता है, जिसमें इसका शक्तिशाली **App Router** शामिल है। यह कुशल रेंडरिंग के लिए **Server Components** के साथ काम करने के लिए अनुकूलित है और पूरी तरह से [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) के साथ संगत है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कंपोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **क्लाइंट-साइड और सर्वर-साइड दोनों कंपोनेंट्स में अनुवादों तक पहुंच प्राप्त करें**।
- **स्वचालित रूप से उत्पन्न प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें**, जिससे ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार होता है।
- **उन्नत सुविधाओं से लाभ उठाएं**, जैसे गतिशील स्थानीयकरण पहचान और स्विचिंग।

> Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js Page Router का उपयोग कर रहे हैं, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_page_router.md) को देख सकते हैं। Next.js 12, 13, 14 के लिए App Router के साथ, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_14.md) को देखें।

---

## Next.js एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **next-intlayer**
- **next-intlayer**

  वह पैकेज जो Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक प्रदान करता है। इसके अतिरिक्त, इसमें Next.js प्लगइन शामिल है जो Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

### चरण 2: अपने प्रोजेक्ट को कॉन्फ़िगर करें

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

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर पुनर्निर्देशन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और भी बहुत कुछ। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

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

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरण के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर कंपोनेंट्स के साथ संगतता सुनिश्चित करता है।

### चरण 4: डायनामिक लोकल रूट्स परिभाषित करें

`RootLayout` से सब कुछ हटा दें और इसे निम्नलिखित कोड से बदलें:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

// `RootLayout` को खाली रखने से `<html>` टैग में [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) और [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) एट्रिब्यूट सेट करना संभव होता है।
module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> डायनामिक रूटिंग को लागू करने के लिए, अपने `[locale]` डायरेक्टरी में एक नया लेआउट जोड़कर लोकल के लिए पथ प्रदान करें:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

// `LocaleLayout` एक लेआउट कंपोनेंट है जो स्थानीय भाषा के अनुसार HTML टैग के `lang` और `dir` एट्रिब्यूट सेट करता है।
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

// `LocaleLayout` एक लेआउट कंपोनेंट है जो स्थानीय भाषा के अनुसार HTML टैग के `lang` और `dir` एट्रिब्यूट सेट करता है।
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

> इस चरण पर, आपको त्रुटि का सामना करना पड़ेगा: `Error: Missing <html> and <body> tags in the root layout.`। यह अपेक्षित है क्योंकि `/app/page.tsx` फ़ाइल अब उपयोग में नहीं है और इसे हटा दिया जा सकता है। इसके बजाय, `[locale]` पाथ सेगमेंट `/app/[locale]/page.tsx` पेज को सक्रिय करेगा। परिणामस्वरूप, पेज आपके ब्राउज़र में `/en`, `/fr`, `/es` जैसे पाथ के माध्यम से सुलभ होंगे। डिफ़ॉल्ट लोकल को रूट पेज के रूप में सेट करने के लिए, चरण 7 में `middleware` सेटअप देखें।

फिर, अपने एप्लिकेशन लेआउट में `generateStaticParams` फ़ंक्शन को लागू करें।

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // सम्मिलित करने के लिए लाइन

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... कोड का बाकी हिस्सा */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // सम्मिलित करने के लिए लाइन

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... कोड का बाकी हिस्सा */
};

// ... कोड का बाकी हिस्सा
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // सम्मिलित करने के लिए लाइन

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... कोड का बाकी हिस्सा */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` यह सुनिश्चित करता है कि आपका एप्लिकेशन सभी लोकल के लिए आवश्यक पृष्ठों को पूर्व-निर्मित करता है, जिससे रनटाइम गणना कम होती है और उपयोगकर्ता अनुभव बेहतर होता है। अधिक जानकारी के लिए, [Next.js दस्तावेज़ में generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) देखें।

### चरण 5: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

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
        en: "संपादन करके शुरू करें",
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
        "en": "संपादन करके शुरू करें",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> आपकी सामग्री घोषणाएँ आपके आवेदन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

### चरण 6: अपने कोड में सामग्री का उपयोग करें

अपने आवेदन में अपनी सामग्री शब्दकोशों तक पहुँचें:

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

- **`IntlayerClientProvider`** का उपयोग क्लाइंट-साइड कंपोनेंट्स को लोकल प्रदान करने के लिए किया जाता है। इसे किसी भी पैरेंट कंपोनेंट में रखा जा सकता है, जिसमें लेआउट भी शामिल है। हालांकि, इसे लेआउट में रखना अनुशंसित है क्योंकि Next.js पेजों के बीच लेआउट कोड साझा करता है, जिससे यह अधिक कुशल हो जाता है। लेआउट में `IntlayerClientProvider` का उपयोग करके, आप हर पेज के लिए इसे पुनः आरंभ करने से बचते हैं, प्रदर्शन में सुधार करते हैं और आपके एप्लिकेशन में एक सुसंगत स्थानीयकरण संदर्भ बनाए रखते हैं।
- **`IntlayerServerProvider`** का उपयोग सर्वर चाइल्ड कंपोनेंट्स को लोकल प्रदान करने के लिए किया जाता है। इसे लेआउट में सेट नहीं किया जा सकता।

  > लेआउट और पेज एक सामान्य सर्वर संदर्भ साझा नहीं कर सकते क्योंकि सर्वर संदर्भ प्रणाली प्रति अनुरोध डेटा स्टोर (React के कैश [React's cache](https://react.dev/reference/react/cache) तंत्र के माध्यम से) पर आधारित है, जिससे एप्लिकेशन के विभिन्न सेगमेंट के लिए प्रत्येक "संदर्भ" पुनः बनाया जाता है। प्रदाता को साझा लेआउट में रखने से यह पृथक्करण टूट जाएगा, जिससे आपके सर्वर कंपोनेंट्स को सही सर्वर संदर्भ मानों का प्रसार नहीं हो पाएगा।

  > लेआउट और पेज एक सामान्य सर्वर संदर्भ साझा नहीं कर सकते क्योंकि सर्वर संदर्भ प्रणाली प्रति अनुरोध डेटा स्टोर (React के कैश [React's cache](https://react.dev/reference/react/cache) तंत्र के माध्यम से) पर आधारित है, जिससे एप्लिकेशन के विभिन्न खंडों के लिए प्रत्येक "संदर्भ" पुनः बनाया जाता है। प्रदाता को साझा लेआउट में रखना इस पृथक्करण को तोड़ देगा, जिससे आपके सर्वर घटकों को सर्वर संदर्भ मानों का सही प्रचारित होना बाधित हो जाएगा।

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

> यदि आप अपनी सामग्री को `string` एट्रिब्यूट में उपयोग करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useIntlayer.md) देखें।

### (वैकल्पिक) चरण 7: स्थान पहचान के लिए मिडलवेयर कॉन्फ़िगर करें

उपयोगकर्ता की पसंदीदा भाषा का पता लगाने के लिए मिडलवेयर सेट करें:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

// उपयोगकर्ता की पसंदीदा भाषा का पता लगाने और उपयुक्त URL पर पुनर्निर्देशित करने के लिए कॉन्फ़िगरेशन सेट करें
const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> `intlayerMiddleware` का उपयोग उपयोगकर्ता की पसंदीदा भाषा का पता लगाने और उन्हें [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में निर्दिष्ट उपयुक्त URL पर पुनर्निर्देशित करने के लिए किया जाता है। इसके अतिरिक्त, यह उपयोगकर्ता की पसंदीदा भाषा को कुकी में सहेजने की अनुमति भी देता है।

### (वैकल्पिक) चरण 8: अपने मेटाडेटा का अंतरराष्ट्रीयकरण

यदि आप अपने मेटाडेटा को अंतरराष्ट्रीयकृत करना चाहते हैं, जैसे कि आपके पृष्ठ का शीर्षक, तो आप Next.js द्वारा प्रदान किया गया `generateMetadata` फ़ंक्शन उपयोग कर सकते हैं। इसके अंदर, आप अपने मेटाडेटा का अनुवाद करने के लिए `getIntlayer` फ़ंक्शन से सामग्री प्राप्त कर सकते हैं।

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
          "es": "Logo Preact",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "hi": "create next app द्वारा उत्पन्न",
      },
    },
  },
};
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
   * प्रत्येक स्थानीय भाषा के लिए सभी URL वाले ऑब्जेक्ट को उत्पन्न करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // लौटाता है
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
   * प्रत्येक लोकल के लिए सभी URL शामिल करने वाला एक ऑब्जेक्ट बनाता है।
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

// ... बाकी कोड
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
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

> ध्यान दें कि `next-intlayer` से आयात किया गया `getIntlayer` फ़ंक्शन आपके कंटेंट को एक `IntlayerNode` में लपेट कर लौटाता है, जो विज़ुअल एडिटर के साथ एकीकरण की अनुमति देता है। इसके विपरीत, `intlayer` से आयात किया गया `getIntlayer` फ़ंक्शन आपके कंटेंट को सीधे बिना अतिरिक्त गुणों के लौटाता है।

वैकल्पिक रूप से, आप अपने मेटाडेटा को घोषित करने के लिए `getTranslation` फ़ंक्शन का उपयोग कर सकते हैं। हालांकि, मेटाडेटा के अनुवाद को स्वचालित करने और किसी बिंदु पर कंटेंट को बाहरी बनाने के लिए कंटेंट घोषणा फ़ाइलों का उपयोग करना अनुशंसित है।

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
      en: "मेवर्णन",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... बाकी कोड
```

> मेटाडेटा अनुकूलन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़ में](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)।

### (वैकल्पिक) चरण 9: अपने sitemap.xml और robots.txt का अंतरराष्ट्रीयकरण

अपने `sitemap.xml` और `robots.txt` का अंतरराष्ट्रीयकरण करने के लिए, आप Intlayer द्वारा प्रदान की गई `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपके साइटमैप के लिए बहुभाषी URL उत्पन्न करने की अनुमति देता है।

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
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
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
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
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

// सभी बहुभाषी URL प्राप्त करें
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// रोबोट्स नियम सेट करें
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // सभी यूजर एजेंट्स के लिए नियम
    allow: ["/"], // सभी पथों की अनुमति
    disallow: getAllMultilingualUrls(["/login", "/register"]), // लॉगिन और रजिस्टर पथों को अस्वीकार करें
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

// robots नियम सेट करता है जो विभिन्न पृष्ठों के लिए अनुमति और अस्वीकृति को परिभाषित करता है
const robots = () => ({
  rules: {
    userAgent: "*", // सभी उपयोगकर्ता एजेंटों के लिए नियम लागू करें
    allow: ["/"], // मुख्य पृष्ठ की अनुमति दें
    disallow: getAllMultilingualUrls(["/login", "/register"]), // लॉगिन और रजिस्टर पृष्ठों के लिए मल्टीलिंगुअल URLs को अस्वीकृत करें
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`, // साइटमैप का URL
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*", // सभी उपयोगकर्ता एजेंटों के लिए नियम लागू करें
    allow: ["/"], // मुख्य पृष्ठ की अनुमति दें
    disallow: getAllMultilingualUrls(["/login", "/register"]), // लॉगिन और रजिस्टर पृष्ठों के लिए मल्टीलिंगुअल URLs को अस्वीकृत करें
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`, // साइटमैप का URL
});
});

module.exports = robots;
```

> साइटमैप अनुकूलन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) पर। robots.txt अनुकूलन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) पर।

### (वैकल्पिक) चरण 10: अपनी सामग्री की भाषा बदलें

Next.js में अपनी सामग्री की भाषा बदलने के लिए, अनुशंसित तरीका है कि `Link` कॉम्पोनेंट का उपयोग करके उपयोगकर्ताओं को उपयुक्त स्थानीयकृत पृष्ठ पर पुनः निर्देशित किया जाए। `Link` कॉम्पोनेंट पृष्ठ की प्रीफ़ेचिंग सक्षम करता है, जो पूर्ण पृष्ठ पुनः लोड से बचने में मदद करता है।

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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* लोकल - उदाहरण के लिए FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए French */}
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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* लोकल - उदाहरण के लिए FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी लोकल में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान लोकल में भाषा - उदाहरण के लिए Francés जब वर्तमान लोकल Locales.SPANISH पर सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए French */}
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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* स्थानीय भाषा - उदाहरण के लिए FR */}
              {localeItem}
            </span>
            <span>
              {/* अपनी स्थानीय भाषा में भाषा - उदाहरण के लिए Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* वर्तमान स्थानीय भाषा में भाषा - उदाहरण के लिए Francés, जब वर्तमान स्थानीय भाषा Locales.SPANISH सेट हो */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण के लिए फ्रेंच */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> एक वैकल्पिक तरीका है `useLocale` हुक द्वारा प्रदान किया गया `setLocale` फ़ंक्शन उपयोग करना। यह फ़ंक्शन पेज को प्रीफ़ेच करने की अनुमति नहीं देगा और पेज को पुनः लोड करेगा।

> इस मामले में, `router.push` का उपयोग किए बिना पुनर्निर्देशन के, केवल आपका सर्वर-साइड कोड सामग्री की भाषा को बदल देगा।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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
  <button onClick={() => setLocale(Locales.FRENCH)}>फ्रेंच में बदलें</button>
);
```

> प्रलेखन संदर्भ:
>
> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (वैकल्पिक) चरण 11: एक स्थानीयकृत लिंक कॉम्पोनेंट बनाना

यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन का नेविगेशन वर्तमान लोकल का सम्मान करता है, आप एक कस्टम `Link` कॉम्पोनेंट बना सकते हैं। यह कॉम्पोनेंट आंतरिक URL को स्वचालित रूप से वर्तमान भाषा के साथ प्रीफिक्स करता है। उदाहरण के लिए, जब एक फ्रेंच-भाषी उपयोगकर्ता "About" पेज के लिंक पर क्लिक करता है, तो उसे `/fr/about` पर रीडायरेक्ट किया जाता है, न कि `/about` पर।

यह व्यवहार कई कारणों से उपयोगी है:

- **SEO और उपयोगकर्ता अनुभव**: स्थानीयकृत URL खोज इंजन को भाषा-विशिष्ट पृष्ठों को सही ढंग से इंडेक्स करने में मदद करते हैं और उपयोगकर्ताओं को उनकी पसंदीदा भाषा में सामग्री प्रदान करते हैं।
- **संगति**: अपने एप्लिकेशन में स्थानीयकृत लिंक का उपयोग करके, आप सुनिश्चित करते हैं कि नेविगेशन वर्तमान लोकल के भीतर ही रहता है, जिससे अप्रत्याशित भाषा परिवर्तन से बचा जा सके।
- **रखरखाव क्षमता**: स्थानीयकरण लॉजिक को एक ही कंपोनेंट में केंद्रीकृत करने से URL प्रबंधन सरल हो जाता है, जिससे आपका कोडबेस बनाए रखना और बढ़ाना आसान हो जाता है क्योंकि आपका एप्लिकेशन बढ़ता है।

नीचे TypeScript में एक स्थानीयकृत `Link` कंपोनेंट का कार्यान्वयन दिया गया है:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * उपयोगिता फ़ंक्शन यह जांचने के लिए कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम Link कॉम्पोनेंट जो वर्तमान लोकल के आधार पर href एट्रिब्यूट को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करता है ताकि URL के आगे लोकल जोड़ा जा सके (जैसे, /fr/about)।
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
 * यह उपयोगिता फ़ंक्शन जांचता है कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम Link कॉम्पोनेंट जो वर्तमान locale के आधार पर href attribute को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करता है ताकि URL के साथ locale का उपसर्ग जोड़ा जा सके (जैसे, /fr/about)।
 * यह सुनिश्चित करता है कि नेविगेशन उसी locale संदर्भ के भीतर रहे।
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
 * यह उपयोगिता फ़ंक्शन जांचता है कि दिया गया URL बाहरी है या नहीं।
 * यदि URL http:// या https:// से शुरू होता है, तो इसे बाहरी माना जाता है।
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * एक कस्टम Link कॉम्पोनेंट जो वर्तमान locale के आधार पर href attribute को अनुकूलित करता है।
 * आंतरिक लिंक के लिए, यह `getLocalizedUrl` का उपयोग करता है ताकि URL के आगे locale जोड़ा जा सके (जैसे, /fr/about)।
 * यह सुनिश्चित करता है कि नेविगेशन एक ही locale संदर्भ के भीतर रहता है।
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
- **बाहरी लिंक का पता लगाना**:  
  सहायक फ़ंक्शन `checkIsExternalLink` यह निर्धारित करता है कि कोई URL बाहरी है या नहीं। बाहरी लिंक को अपरिवर्तित छोड़ दिया जाता है क्योंकि उन्हें स्थानीयकरण की आवश्यकता नहीं होती है।

- **वर्तमान भाषा प्राप्त करना**:  
  `useLocale` हुक वर्तमान भाषा प्रदान करता है (जैसे, फ्रेंच के लिए `fr`)।

- **URL का स्थानीयकरण**:  
  आंतरिक लिंक (अर्थात् गैर-बाहरी) के लिए, `getLocalizedUrl` का उपयोग वर्तमान भाषा के साथ URL को स्वचालित रूप से उपसर्गित करने के लिए किया जाता है। इसका मतलब है कि यदि आपका उपयोगकर्ता फ्रेंच में है, तो `/about` को `href` के रूप में पास करने पर यह `/fr/about` में बदल जाएगा।

- **लिंक लौटाना**:  
  यह कॉम्पोनेंट स्थानीयकृत URL के साथ एक `<a>` तत्व लौटाता है, जिससे नेविगेशन भाषा के अनुरूप रहता है।

अपने एप्लिकेशन में इस `Link` कंपोनेंट को एकीकृत करके, आप एक सुसंगत और भाषा-सचेत उपयोगकर्ता अनुभव बनाए रखते हैं, साथ ही बेहतर SEO और उपयोगिता का लाभ भी प्राप्त करते हैं।

### (वैकल्पिक) चरण 12: अपने बंडल आकार को अनुकूलित करें

जब आप `next-intlayer` का उपयोग करते हैं, तो डिक्शनरी डिफ़ॉल्ट रूप से हर पेज के बंडल में शामिल होती हैं। बंडल आकार को अनुकूलित करने के लिए, Intlayer एक वैकल्पिक SWC प्लगइन प्रदान करता है जो मैक्रोज़ का उपयोग करके `useIntlayer` कॉल्स को बुद्धिमानी से बदलता है। यह सुनिश्चित करता है कि डिक्शनरी केवल उन पेजों के बंडल में शामिल हों जो वास्तव में उनका उपयोग करते हैं।

इस अनुकूलन को सक्षम करने के लिए, `@intlayer/swc` पैकेज इंस्टॉल करें। एक बार इंस्टॉल हो जाने पर, `next-intlayer` स्वचालित रूप से इस प्लगइन का पता लगाएगा और उपयोग करेगा:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> नोट: यह अनुकूलन केवल Next.js 13 और उससे ऊपर के लिए उपलब्ध है।

> नोट: यह पैकेज डिफ़ॉल्ट रूप से इंस्टॉल नहीं होता क्योंकि SWC प्लगइन्स अभी Next.js में प्रयोगात्मक हैं। भविष्य में इसमें बदलाव हो सकता है।

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में ऑटो-जेनरेटेड टाइप्स शामिल हैं।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से उत्पन्न प्रकार शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

यह अनुशंसा की जाती है कि Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा किया जाए। इससे आप उन्हें अपनी Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- **अनुवादों के लिए रियल-टाइम त्रुटि पहचान।**
- **अनुवादित सामग्री के इनलाइन पूर्वावलोकन।**
- **तेजी से क्रियाएं** जो अनुवादों को आसानी से बनाने और अपडेट करने में मदद करती हैं।

विस्तृत जानकारी के लिए, एक्सटेंशन का उपयोग कैसे करें, देखें [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी रूप से प्रबंधित कर सकते हैं।
