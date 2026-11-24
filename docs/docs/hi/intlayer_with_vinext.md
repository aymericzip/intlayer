---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Vite पर अपने Next.js ऐप का अनुवाद करने की संपूर्ण गाइड"
description: "vinext के साथ Intlayer सेट करें, जो Vite पर Next.js API है: proxy.ts के साथ लोकेल रूटिंग, Server और Client Components, स्थानीयकृत मेटाडेटा, sitemap और Cloudflare Workers पर डिप्लॉयमेंट।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# Intlayer से अपनी vinext वेबसाइट का अनुवाद करें

[vinext](https://github.com/cloudflare/vinext) Next.js API को Vite के ऊपर दोबारा लागू करता है। आपकी `app/` डायरेक्टरी, `next/*` इम्पोर्ट और `proxy.ts` काम करते रहते हैं, लेकिन बिल्ड Turbopack या webpack की जगह Vite से चलता है।

Intlayer इस सेटअप में दो पैकेज के साथ जुड़ता है: `next-intlayer`, उन hooks, providers और proxy के लिए जिन्हें आपके कंपोनेंट Next.js पर पहले से इस्तेमाल करते हैं, और `vite-intlayer`, बिल्ड वाले हिस्से के लिए (डिक्शनरी कंपाइलेशन, वॉचिंग और बंडल ऑप्टिमाइज़ेशन)।

> क्या आप Next.js को उसके अपने टूलचेन के साथ चला रहे हैं? तो इसके बजाय [Next.js 16 गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md) देखें।

- [Next.js 16 गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)

## विषय-सूची

<TOC/>

## दूसरे विकल्पों की जगह Intlayer क्यों?

`next-intl` या `i18next` जैसे समाधानों की तुलना में, Intlayer में ऑप्टिमाइज़ेशन पहले से शामिल हैं:

<AccordionGroup>
<Accordion header="Vite पर Next.js API के लिए बनाया गया">

वही `next-intlayer` कोड Next.js और vinext दोनों पर चलता है। Server Components कंटेंट को सर्वर पर हल करते हैं, Client Components उसे provider के ज़रिए पढ़ते हैं, और लोकेल रूटिंग आपके `proxy.ts` से चलती है। दोनों टूलचेन के बीच जाने पर आपके कंपोनेंट में कोई बदलाव नहीं करना पड़ता।

</Accordion>
<Accordion header="बंडल का आकार">

अपने पेजों में बड़ी JSON फ़ाइलें लोड करने की जगह केवल ज़रूरी कंटेंट लोड करें। Vite प्लगइन हर `useIntlayer` कॉल को उन एंट्री से बदल देता है जिन्हें कंपोनेंट वास्तव में इस्तेमाल करता है, जिससे **बंडल और पेज का आकार 50% तक घट जाता है**।

</Accordion>
<Accordion header="रखरखाव में आसानी">

कंटेंट को कंपोनेंट के हिसाब से बाँटने से बड़े एप्लिकेशन का **रखरखाव आसान हो जाता है**। आप पूरे कंटेंट कोडबेस की समीक्षा किए बिना किसी फ़ीचर फ़ोल्डर को डुप्लिकेट या डिलीट कर सकते हैं, और Intlayer **पूरी तरह टाइप्ड** है ताकि आपका कंटेंट सटीक रहे।

</Accordion>
<Accordion header="AI एजेंट">

कंटेंट को कंपोनेंट के पास रखने से LLM को **कम संदर्भ की ज़रूरत** पड़ती है। Intlayer में छूटे हुए अनुवादों की जाँच के लिए **CLI**, एक **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**, एक **[MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)** और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)** शामिल हैं।

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)
- [MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)

</Accordion>
<Accordion header="ऑटोमेशन">

अपनी पसंद के LLM के साथ अपनी CI/CD पाइपलाइन में अनुवाद करें, जिसका खर्च आपका AI प्रदाता उठाता है। Intlayer कंटेंट एक्सट्रैक्शन को ऑटोमेट करने वाला **कंपाइलर** और **बैकग्राउंड में अनुवाद** करने वाला [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) भी देता है।

- [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)

</Accordion>
<Accordion header="गैर-डेवलपर्स के साथ स्केल करना">

Intlayer **सेल्फ-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)** और **[पूर्ण CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)** देता है, ताकि आप अनुवादकों और कॉपीराइटर्स के साथ **रियल टाइम** में बहुभाषी कंटेंट प्रबंधित कर सकें। कंटेंट को लोकल और/या रिमोट रूप से स्टोर किया जा सकता है।

- [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
- [पूर्ण CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## vinext एप्लिकेशन में Intlayer सेट करने की चरण-दर-चरण गाइड

<Steps>
<Step number={1} title="डिपेंडेंसी इंस्टॉल करें">

एक चलते हुए vinext प्रोजेक्ट से शुरू करें। नया प्रोजेक्ट बनाने के लिए `npm create vinext-app@latest` चलाएँ। मौजूदा Next.js ऐप को माइग्रेट करने के लिए `npx vinext init` चलाएँ।

फिर Intlayer इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  कोर पैकेज, जो अंतर्राष्ट्रीयकरण के टूल देता है: कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [कंटेंट डिक्लेरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)।

- **next-intlayer**

  Next.js API के लिए providers, hooks और proxy देता है। vinext, `next/navigation`, `next/headers` और `next/server` को अपने ही इम्प्लीमेंटेशन से जोड़ देता है, इसलिए `next-intlayer` बिना बदलाव के काम करता है।

- **vite-intlayer**

  Vite प्लगइन, जो आपके कंटेंट डिक्लेरेशन बनाता है, डेवलपमेंट में उन पर नज़र रखता है और प्रोडक्शन बंडल में डिक्शनरी को ऑप्टिमाइज़ करता है। यह Next.js प्लगइन `withIntlayer()` की जगह लेता है, जिसे vinext नहीं चलाता।

</Step>
<Step number={2} title="अपना प्रोजेक्ट कॉन्फ़िगर करें">

तय करें कि आपका एप्लिकेशन स्थानीयकृत URL पाथ (जैसे `/en/about`, `/fr/about`) इस्तेमाल करेगा, या पाथ में लोकेल सेगमेंट के बिना कंटेंट देगा (जैसे `/about`, जहाँ लोकेल कुकीज़, हेडर या क्वेरी पैरामीटर से पहचाना जाता है)।

<Tabs group="routing-mode">
<Tab label="लोकेल पाथ के साथ" value="with-locale-path">

### आर्किटेक्चर

सभी स्थानीयकृत पेज एक डायनामिक `[locale]` सेगमेंट के अंदर रखे जाते हैं। SEO और स्टैटिक रेंडरिंग के लिए यह सुझाया जाता है, क्योंकि हर भाषा का अपना URL होता है:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
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
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### कॉन्फ़िगरेशन

समर्थित भाषाएँ घोषित करने के लिए `intlayer.config.ts` फ़ाइल बनाएँ:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="लोकेल पाथ के बिना" value="without-locale-path">

### आर्किटेक्चर

रूट में `[locale]` सेगमेंट नहीं होता। सभी पेज सीधे `src/app/` के अंदर होते हैं, और लोकेल कुकीज़, हेडर या क्वेरी पैरामीटर से आता है। यह डैशबोर्ड और ऑथेंटिकेटेड ऐप्स के लिए उपयुक्त है:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### कॉन्फ़िगरेशन

`routing.mode` को `"search-params"` (जैसे `/about?locale=fr`) या `"no-prefix"` पर सेट करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> यह फ़ाइल proxy रीडायरेक्शन, कुकी के नाम, आपके कंटेंट डिक्लेरेशन की जगह और एक्सटेंशन, लॉग और बहुत कुछ भी सेट करती है। पूरी सूची के लिए [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

- [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

</Step>
<Step number={3} title="अपने Vite कॉन्फ़िगरेशन में Intlayer जोड़ें">

`vite.config.ts` में `vinext()` के बगल में `intlayer()` प्लगइन जोड़ें:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> `intlayer()` प्लगइन बिल्ड शुरू होने से पहले आपकी डिक्शनरी बनाता है, डेवलपमेंट में कंटेंट फ़ाइलों पर नज़र रखता है, और RSC, SSR और क्लाइंट एनवायरनमेंट में `next-intlayer` द्वारा इस्तेमाल किए जाने वाले alias और ऑप्टिमाइज़ेशन सेट करता है।

> `intlayer()` Vite डेव सर्वर के लिए एक लोकेल रूटिंग middleware भी देता है। vinext पर `src/proxy.ts` यह काम पहले से करता है, डेवलपमेंट में भी और आपके प्रोडक्शन रनटाइम पर भी, इसलिए `ignore` विकल्प Vite वाले को बंद कर देता है ताकि हर रिक्वेस्ट दो बार रूट न हो।

> `next.config.ts` में `withIntlayer()` का इस्तेमाल न करें। vinext, `next.config.ts` को `redirects`, `rewrites` और `headers` जैसे विकल्पों के लिए पढ़ता है, लेकिन webpack या Turbopack प्लगइन नहीं चलाता।

अगर आप Cloudflare Workers पर डिप्लॉय करते हैं, तो `vinext init` द्वारा बनाया गया `cloudflare()` प्लगइन रखें:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="डायनामिक लोकेल रूट परिभाषित करें">

<Tabs group="routing-mode">
<Tab label="लोकेल पाथ के साथ" value="with-locale-path">

`RootLayout` की सारी सामग्री हटाएँ और उसे नीचे दिए कोड से बदल दें:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> `RootLayout` को खाली रखने से लोकेल लेआउट `<html>` टैग पर [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) और [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) एट्रिब्यूट सेट कर पाता है।

अपनी `[locale]` डायरेक्टरी में एक लेआउट जोड़ें:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> एक अकेला `IntlayerProvider` ट्री के दोनों हिस्सों को कवर करता है: वह Server Components को लोकेल देता है और क्लाइंट provider माउंट करता है, ताकि Client Components को वही लोकेल मिले।

> `[locale]` सेगमेंट लोकेल को रखता है: `/en-US/about` का मतलब `en-US` है, `/fr/about` का `fr`। पहले वाली `src/app/page.tsx` अब इस्तेमाल नहीं होती और हटाई जा सकती है। proxy (चरण 7) रूट पर डिफ़ॉल्ट लोकेल देता है।

> `generateStaticParams` vinext को हर लोकेल के लिए हर पेज प्रीरेंडर करने देता है। vinext `dynamicParams` भी लागू करता है, इसलिए जब आप `export const dynamicParams = false` सेट करते हैं तो अज्ञात लोकेल 404 लौटाता है।

</Tab>
<Tab label="लोकेल पाथ के बिना" value="without-locale-path">

`[locale]` डायरेक्टरी नहीं है। `src/app/layout.tsx` को इस तरह कॉन्फ़िगर करें कि वह रिक्वेस्ट से लोकेल पढ़े और आपके एप्लिकेशन को `IntlayerProvider` में लपेटे:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

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
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="अपना कंटेंट घोषित करें">

अपने अनुवाद स्टोर करने के लिए कंटेंट डिक्लेरेशन बनाएँ:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        hi: "संपादित करके शुरू करें",
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

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "hi": "संपादित करके शुरू करें",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> कंटेंट डिक्लेरेशन `contentDir` डायरेक्टरी (डिफ़ॉल्ट रूप से `./src`) में कहीं भी रखे जा सकते हैं, बशर्ते वे कंटेंट डिक्लेरेशन एक्सटेंशन (डिफ़ॉल्ट रूप से `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) से मेल खाते हों।

> अधिक जानकारी के लिए [कंटेंट डिक्लेरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

- [कंटेंट डिक्लेरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md)

</Step>
<Step number={6} title="अपने कोड में कंटेंट इस्तेमाल करें">

किसी भी कंपोनेंट से अपनी डिक्शनरी तक पहुँचें:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` आइसोमॉर्फिक है: `react-server` एक्सपोर्ट कंडीशन, जिसे vinext अपने RSC एनवायरनमेंट पर लागू करता है, Server Components को सर्वर इम्प्लीमेंटेशन देती है, जबकि Client Components को कॉन्टेक्स्ट-आधारित इम्प्लीमेंटेशन मिलता है। वही कॉल दोनों तरफ़ काम करती है।

> अपने कंटेंट को `alt`, `title`, `href` या `aria-label` जैसे `string` एट्रिब्यूट में इस्तेमाल करने के लिए उसकी value पढ़ें:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> अधिक जानकारी के लिए [`useIntlayer` दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useIntlayer.md) देखें।

- [`useIntlayer` दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useIntlayer.md)

> अगर आपका ऐप पहले से मौजूद है, तो [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) और [extract कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) हज़ारों कंपोनेंट को एक सेकंड में बदल देते हैं।

- [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md)
- [extract कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md)

</Step>
<Step number={7} title="लोकेल पहचान के लिए proxy कॉन्फ़िगर करें">

vinext, Next.js 16 की तरह `proxy.ts` (और `middleware.ts`) को डेवलपमेंट और प्रोडक्शन दोनों में चलाता है, Cloudflare Workers पर भी। Intlayer proxy एक्सपोर्ट करें:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` उपयोगकर्ता की पसंदीदा लोकेल पहचानता है, [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) के अनुसार मेल खाते URL पर रीडायरेक्ट करता है, और लोकेल को कुकी में स्टोर करता है। यह लोकेल को `getLocale()` और सर्वर hooks तक भी पहुँचाता है, इसलिए लोकेल पाथ के बिना वाले आर्किटेक्चर में भी इसे रखें।

- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

> कई proxy को जोड़ने के लिए (उदाहरण के लिए, ऑथेंटिकेशन के साथ `intlayerProxy`), `multipleProxies` का इस्तेमाल करें:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="अपने मेटाडेटा का अंतर्राष्ट्रीयकरण" isOptional={true}>

vinext, Metadata API को सपोर्ट करता है। अपने पेज के मेटाडेटा का अनुवाद करने के लिए `generateMetadata` के साथ `getIntlayer` इस्तेमाल करें:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      hi: "मेरा vinext ऐप",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      hi: "Vite पर चलने वाला एक Next.js ऐप",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
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

// ... Rest of the code
````

> `intlayer` से इम्पोर्ट किया गया `getIntlayer` फ़ंक्शन रॉ वैल्यू लौटाता है, जो मेटाडेटा ऑब्जेक्ट के लिए तैयार होती हैं। `next-intlayer` वाला फ़ंक्शन उन्हें विज़ुअल एडिटर के लिए लपेट देता है।

</Step>
<Step number={9} title="अपने sitemap.xml और robots.txt का अंतर्राष्ट्रीयकरण" isOptional={true}>

`sitemap.ts` और `robots.ts` Next.js की तरह ही काम करते हैं। हर स्थानीयकृत URL की सूची बनाने के लिए `getMultilingualUrls` इस्तेमाल करें:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

</Step>
<Step number={10} title="अपने कंटेंट की भाषा बदलें" isOptional={true}>

स्थानीयकृत पेज पर जाने के लिए `next/link` का इस्तेमाल करें। vinext क्लाइंट-साइड नेविगेशन और prefetching बनाए रखता है, इसलिए बदलाव पूरे रीलोड के बिना हो जाता है:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> दस्तावेज़ संदर्भ:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` फ़ंक्शन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` फ़ंक्शन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` फ़ंक्शन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="स्थानीयकृत Link कंपोनेंट बनाएँ" isOptional={true}>

एक कस्टम `Link` कंपोनेंट आंतरिक URL के आगे मौजूदा लोकेल जोड़ देता है, ताकि `/about` पर क्लिक करने वाला फ़्रेंच उपयोगकर्ता `/fr/about` पर पहुँचे:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Server Actions में मौजूदा लोकेल पाएँ" isOptional={true}>

किसी Server Action के अंदर `next-intlayer/server` से `getLocale` कॉल करें:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` पहले रिक्वेस्ट हेडर में proxy द्वारा सेट की गई लोकेल पढ़ता है, फिर लोकेल कुकी, फिर ब्राउज़र का `Accept-Language` हेडर, और अंत में डिफ़ॉल्ट लोकेल पर लौट आता है।

</Step>
<Step number={13} title="Cloudflare Workers पर डिप्लॉय करें" isOptional={true}>

Intlayer बिल्ड के समय डिक्शनरी को बंडल में कंपाइल कर देता है, इसलिए रनटाइम पर कुछ भी फ़ाइल सिस्टम नहीं पढ़ता और ऐप workerd में जैसा है वैसा ही चलता है। vinext CLI से बिल्ड और डिप्लॉय करें:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> कहीं और डिप्लॉय करने के लिए (Vercel, Netlify, AWS, Node.js), `vinext()` के बगल में [Nitro](https://v3.nitro.build/) Vite प्लगइन जोड़ें, या `next.config.ts` में `output: "standalone"` सेट करें। Intlayer सेटअप नहीं बदलता।

</Step>
<Step number={14} title="अपने कंपोनेंट से कंटेंट निकालें" isOptional={true}>

मौजूदा कोडबेस पर Intlayer एक [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) और एक [एक्सट्रैक्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देता है, जो हार्डकोड की गई स्ट्रिंग को कंटेंट डिक्लेरेशन में ले जाते हैं।

- [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md)
- [एक्सट्रैक्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md)

`intlayer.config.ts` में कंपाइलर सक्षम करें:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

अपने कंपोनेंट को बदलने और कंटेंट निकालने के लिए एक्सट्रैक्टर चलाएँ:

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
 <Tab value='Vite compiler'>

`intlayer()` Vite प्लगइन में कंपाइलर शामिल है। `compiler.enabled` सेट होने के बाद अपना डेव सर्वर या बिल्ड हमेशा की तरह चलाएँ:

```bash packageManager="npm"
npm run build # Or npm run dev
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

### TypeScript कॉन्फ़िगर करें

Intlayer आपकी कंटेंट कीज़ और values को टाइप करने के लिए module augmentation का इस्तेमाल करता है।

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

जनरेट किए गए टाइप को अपने TypeScript कॉन्फ़िगरेशन में शामिल करें:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git कॉन्फ़िगरेशन

Intlayer द्वारा जनरेट की गई फ़ाइलों को अनदेखा करें:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code एक्सटेंशन

कीज़ के ऑटोकम्प्लीशन, छूटे अनुवाद की त्रुटियों, इनलाइन प्रीव्यू और क्विक एक्शन के लिए आधिकारिक **[Intlayer VS Code एक्सटेंशन](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** इंस्टॉल करें। [एक्सटेंशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md) देखें।

- [एक्सटेंशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)

### और आगे

[विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) जोड़ें या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के साथ अपना कंटेंट बाहर रखें।

- [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="vinext क्या है?">

vinext एक ओपन सोर्स Vite प्लगइन है, जिसका रखरखाव Cloudflare करता है और जो Next.js की सार्वजनिक API को दोबारा लागू करता है: App Router और Pages Router, React Server Components, Server Actions, `proxy.ts`, route handlers और `next/*` मॉड्यूल। आपका Next.js कोड Vite पर चलता है, और Cloudflare Workers पर नेटिव रूप से या Nitro के ज़रिए दूसरे प्लेटफ़ॉर्म पर डिप्लॉय होता है।

</Question>
<Question title="Next.js सेटअप की तुलना में क्या बदलता है?">

केवल बिल्ड इंटीग्रेशन। Next.js पर `withIntlayer()` `next.config.ts` को लपेटता है। vinext पर इसके बजाय `vite-intlayer` का `intlayer()` प्लगइन `vite.config.ts` में जाता है। Providers, hooks, `proxy.ts`, मेटाडेटा और sitemap का कोड वैसा ही रहता है, इसलिए जो इस पेज में शामिल नहीं है उसके लिए आप [Next.js 16 गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md) देख सकते हैं।

- [Next.js 16 गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)

</Question>
<Question title="क्या मुझे Next.js की i18n कॉन्फ़िगरेशन या SWC प्लगइन चाहिए?">

नहीं। `next.config.ts` का `i18n` फ़ील्ड vinext पर केवल Pages Router के लोकेल प्रीफ़िक्स को कवर करता है, और Intlayer `proxy.ts` के ज़रिए अपनी रूटिंग खुद करता है। `@intlayer/swc` प्लगइन की भी ज़रूरत नहीं है: Vite प्लगइन पहले से `useIntlayer` कॉल बदल देता है, ताकि हर पेज केवल वही डिक्शनरी भेजे जो वह इस्तेमाल करता है। [बंडल ऑप्टिमाइज़ेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

- [बंडल ऑप्टिमाइज़ेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)

</Question>
<Question title="क्या डेवलपमेंट में मुझे `intlayer watch` की ज़रूरत है?">

नहीं। `intlayer()` Vite प्लगइन `vite dev` के साथ कंटेंट वॉचर शुरू कर देता है, और कंटेंट एडिट करने पर केवल वही कंपोनेंट हॉट-अपडेट होते हैं जो बदली हुई डिक्शनरी पढ़ते हैं।

</Question>
<Question title="क्या मैं अपने कंपोनेंट दोबारा लिखे बिना `next-intl` या `i18next` से माइग्रेट कर सकता हूँ?">

हाँ। [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md) या [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) का पालन करें, या [कम्पैट एडाप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) से अपनी मौजूदा API रखें, जो Intlayer डिक्शनरी पर चलने वाली `next-intl`, `react-i18next` और `react-intl` API उपलब्ध कराते हैं।

- [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md)
- [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md)
- [कम्पैट एडाप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md)

</Question>
<Question title="क्या मुझे लोकेल को URL में रखना ज़रूरी है, जैसे /fr/about?">

नहीं। `routing.mode` ये मान लेता है:

- `"prefix-no-default"` (डिफ़ॉल्ट): डिफ़ॉल्ट लोकेल के लिए `/about`, बाकी के लिए `/fr/about`।
- `"prefix-all"`: हर लोकेल पर प्रीफ़िक्स लगता है, `/en/about` और `/fr/about`।
- `"no-prefix"`: पाथ में कोई लोकेल नहीं, कुकी या हेडर से तय होता है।
- `"search-params"`: `/about?locale=fr`।

[कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) और चरण 2 में लोकेल पाथ के बिना वाला आर्किटेक्चर देखें।

- [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

</Question>
<Question title="मैं अपने ऐप का AI से अपने आप अनुवाद कैसे करूँ?">

`npx intlayer fill` चलाएँ। CLI छूटे हुए अनुवाद पहचानता है और आपकी पसंद के LLM से उन्हें भर देता है, आपके अपने प्रदाता और API कुंजी के साथ। [fill कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD इंटीग्रेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

- [fill कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md)
- [CI/CD इंटीग्रेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md)

</Question>
<Question title="रिलीज़ से पहले छूटे हुए अनुवाद कैसे पकड़ें?">

CI में `npx intlayer test` चलाएँ। जब किसी घोषित लोकेल में कंटेंट कम होता है तो बिल्ड फ़ेल हो जाता है। [VS Code एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md) टाइप करते समय वही त्रुटियाँ दिखाता है, और [ESLint प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md) हार्डकोड की गई स्ट्रिंग को चिह्नित करता है।

- [VS Code एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)
- [ESLint प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)

</Question>
<Question title="क्या Intlayer मुफ़्त और ओपन सोर्स है?">

हाँ। Intlayer Apache 2.0 लाइसेंस के तहत ओपन सोर्स है, और लाइब्रेरी, CLI, विज़ुअल एडिटर और कंपाइलर व्यावसायिक उपयोग सहित मुफ़्त हैं। होस्टेड CMS एक वैकल्पिक सशुल्क सेवा है, और इसे [सेल्फ-होस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

- [सेल्फ-होस्टिंग](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md)

</Question>

</FAQ>
