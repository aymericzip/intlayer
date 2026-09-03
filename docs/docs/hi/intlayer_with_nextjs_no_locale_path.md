---
createdAt: 2026-01-10
updatedAt: 2026-06-23
title: "Next.js 16 i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Next.js 16 ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - डॉक्यूमेंटेशन
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 8.0.0
    date: 2026-01-10
    changes: "प्रारंभिक रिलीज़"
author: aymericzip
---

# Intlayer का उपयोग करके अपने Next.js 16 वेबसाइट का अनुवाद (पृष्ठ पथ में [locale] के बिना) | अंतर्राष्ट्रीयकरण (i18n)

<Tabs defaultTab="video">
  <Tab label="वीडियो" value="video">

<iframe title="Next.js के लिए सबसे अच्छा i18n समाधान? Intlayer खोजें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीयकृत कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [Application Template](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) देखें।

## सामग्री सूची

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`नेक्स्ट-इंटल` या `आई18नेक्स्ट` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

<AccordionGroup>
<Accordion header="पूर्ण Next.js कवरेज">

कुशल रेंडरिंग के लिए इंटलेयर को **सर्वर कंपोनेंट्स** के साथ काम करने के लिए अनुकूलित किया गया है और यह [**टर्बोपैक**](https://nextjs.org/docs/architecture/turbopack) के साथ पूरी तरह से संगत है। यह स्थैतिक रेंडरिंग को अवरुद्ध नहीं करता है और मिडलवेयर के साथ-साथ अंतर्राष्ट्रीयकरण (i18n) को स्केल करने के लिए आवश्यक सभी सुविधाएँ प्रदान करता है।

> इंटलेयर Next.js 12, 13, 14, 15 और 16 के साथ संगत है। यदि आप Next.js पेज राउटर का उपयोग कर रहे हैं, तो आप इस [गाइड] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md) को देख सकते हैं।
> लोकेल रूटिंग एसईओ, बंडल आकार और प्रदर्शन के लिए उपयोगी है। यदि आपको इसकी आवश्यकता नहीं है, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) का संदर्भ ले सकते हैं।
> ऐप राउटर के साथ Next.js 12, 13, 14, और 15 के लिए, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md) को देखें।

</Accordion>

<Accordion header="Bundle size">

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

</Accordion>

<Accordion header="रखरखाव">

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

</Accordion>

<Accordion header="AI Agent">

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

</Accordion>

<Accordion header="Automation">

अपने एआई प्रदाता की कीमत पर अपनी पसंद के एलएलएम का उपयोग करके अपने सीआई/सीडी पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। इंटलेयर सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

</Accordion>

<Accordion header="प्रदर्शन">

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। इंटलेयर बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

</Accordion>

<Accordion header="किसी भी देव के साथ स्केलिंग">

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण] प्रदान करता है सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

</Accordion>
</AccordionGroup>

---

## Next.js एप्लिकेशन में Intlayer सेटअप करने के चरण-दर-चरण मार्गदर्शन

<Steps>

<Step number={1} title="Dependencies इंस्टॉल करें">

आवश्यक पैकेज npm का उपयोग करके इंस्टॉल करें:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` ध्वज (flag) वैकल्पिक है। यदि आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके एनवायरनमेंट को डिटेक्ट करेगी और आवश्यक पैकेज इंस्टॉल करेगी। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  यह मुख्य पैकेज है जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), transpilation, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए internationalization उपकरण प्रदान करता है।

- **next-intlayer**

यह पैकेज Intlayer को Next.js के साथ एकीकृत करता है। यह Next.js इंटरनेशनलाइज़ेशन के लिए context providers और hooks प्रदान करता है। इसके अलावा, इसमें Next.js प्लगइन शामिल है जो Intlayer को [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा locale का पता लगाने, कुकीज़ प्रबंधित करने और URL रीडायरेक्शन को संभालने के लिए एक proxy भी शामिल है।

</Step>

<Step number={2} title="अपने प्रोजेक्ट को कॉन्फ़िगर करें">

यहाँ वह अंतिम संरचना है जो हम बनाएँगे:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> अगर आप locale routing नहीं चाहते हैं, तो intlayer को एक सरल provider / hook के रूप में उपयोग किया जा सकता है। अधिक जानकारी के लिए [इस गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_no_locale_path.md) देखें।

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक config फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपके अन्य locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // या `no-prefix` - middleware का पता लगाने के लिए उपयोगी
  },
};

export default config;
```

> इस कॉन्फ़िगरेशन फाइल के माध्यम से, आप localized URLs, proxy redirection, cookie नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में Intlayer लॉग को अक्षम करना, और भी बहुत कुछ सेट कर सकते हैं। उपलब्ध पैरामीटरों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपने Next.js कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

अपने Next.js सेटअप को Intlayer का उपयोग करने के लिए कॉन्फ़िगर करें:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* कॉन्फ़िग विकल्प यहाँ */};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ एकीकृत करने के लिए किया जाता है। यह सामग्री घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरणों के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है और सर्वर घटकों के साथ संगतता सुनिश्चित करता है।

> `withIntlayer()` फ़ंक्शन एक promise फ़ंक्शन है। यह build शुरू होने से पहले intlayer dictionaries को तैयार करने की अनुमति देता है। यदि आप इसे अन्य plugins के साथ उपयोग करना चाहते हैं, तो आप इसे await कर सकते हैं। उदाहरण:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> यदि आप इसे synchronously उपयोग करना चाहते हैं, तो आप `withIntlayerSync()` फ़ंक्शन का उपयोग कर सकते हैं। उदाहरण:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> `withIntlayer()` Next.js प्लगइन का उपयोग Intlayer को Next.js के साथ इंटीग्रेट करने के लिए किया जाता है। यह content declaration files के निर्माण को सुनिश्चित करता है और development मोड में उनका मॉनिटरिंग करता है। यह [Webpack](https://webpack.js.org/) या [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) वातावरण में Intlayer के environment variables को परिभाषित करता है। साथ ही यह performance को ऑप्टिमाइज़ करने के लिए aliases प्रदान करता है और server components के साथ संगतता सुनिश्चित करता है।
>
> `withIntlayer()` फ़ंक्शन एक promise फ़ंक्शन है। यह build शुरू होने से पहले Intlayer डिक्शनरीज़ को तैयार करने की अनुमति देता है। यदि आप इसे अन्य plugins के साथ उपयोग करना चाहते हैं, तो आप इसे await कर सकते हैं। उदाहरण:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> यदि आप इसे synchronous तरीके से उपयोग करना चाहते हैं, तो आप `withIntlayerSync()` फ़ंक्शन का उपयोग कर सकते हैं। उदाहरण:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer स्वचालित रूप से पहचानता है कि आपका प्रोजेक्ट **webpack** या **Turbopack** का उपयोग कर रहा है या नहीं, यह कमांड-लाइन फ्लैग `--webpack`, `--turbo`, या `--turbopack`, साथ ही आपकी वर्तमान **Next.js version** के आधार पर निर्धारित होता है।
>
> यदि `next>=16` है और आप **Rspack** का उपयोग कर रहे हैं, तो आपको स्पष्ट रूप से Intlayer को webpack कॉन्फ़िगरेशन उपयोग करने के लिए मजबूर करना होगा, इसके लिए Turbopack को अक्षम करें:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="डायनामिक Locale रूट्स परिभाषित करें">

`RootLayout` से सब कुछ हटाएँ और इसे निम्नलिखित कोड से बदलें:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
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
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

> एक single `IntlayerProvider` tree के दोनों हिस्सों को कवर करता है: यह request-scoped server context को seed करता है जिसे server hooks द्वारा पढ़ा जाता है, और client provider को mount करता है ताकि client components को same locale प्राप्त हो।

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
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

 </Tab>
</Tabs>

</Step>

<Step number={5} title="अपनी सामग्री घोषित करें">

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      hi: "मेरा प्रोजेक्ट शीर्षक",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      hi: "हमारा अभिनव प्लेटफ़ॉर्म खोजें जिसे आपके वर्कफ़्लो को सुव्यवस्थित करने और उत्पादकता बढ़ाने के लिए डिज़ाइन किया गया है।",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      hi: ["नवाचार", "उत्पादकता", "वर्कफ़्लो", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      hi: ["नवाचार", "उत्पादकता", "कार्यप्रवाह", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "hi": "मेरा प्रोजेक्ट शीर्षक",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "hi": "हमारे नवाचारी प्लेटफ़ॉर्म की खोज करें जो आपके वर्कफ़्लो को सरल बनाने और उत्पादकता बढ़ाने के लिए डिज़ाइन किया गया है।",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "hi": ["नवाचार", "उत्पादकता", "कार्यप्रवाह", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        hi: "संपादन करके शुरू करें",
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "hi": "संपादन करके शुरू करें",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> आपकी content घोषणाएँ आपकी एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं, बशर्ते वे `contentDir` निर्देशिका (डिफ़ॉल्ट: `./src`) में शामिल हों। और content declaration फ़ाइल एक्सटेंशन से मेल खानी चाहिए (डिफ़ॉल्ट: `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)।
>
> अधिक जानकारी के लिए, [content declaration दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

> अधिक विवरण के लिए, [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) को देखें।

</Step>

<Step number={6} title="अपने कोड में Content का उपयोग करें">

अपने एप्लिकेशन के दौरान अपने content dictionaries को access करें:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  // पृष्ठ सामग्री प्राप्त करें
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** को एक बार root layout में mount किया जाता है। यह server और client दोनों components को locale प्रदान करता है, इसलिए pages अब खुद को wrap नहीं करते हैं।
- `[locale]` path segment के बिना locale हमेशा request से आता है — `x-intlayer-locale` header जो Intlayer proxy द्वारा सेट किया जाता है, फिर locale cookie — जिसे server hooks अपने आप पढ़ते हैं जब provider नहीं चला हो।

अपने कंटेंट डिक्शनरीज़ को पूरे एप्लिकेशन में एक्सेस करें:

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** क्लाइंट-साइड कॉम्पोनेंट्स को locale प्रदान करने के लिए उपयोग किया जाता है। इसे किसी भी पैरेंट कॉम्पोनेंट में रखा जा सकता है, जिसमें layout भी शामिल है। हालांकि, इसे layout में रखना अनुशंसित है क्योंकि Next.js पृष्ठों के बीच layout को साझा करता है, जिससे यह अधिक कुशल हो जाता है। layout में `IntlayerClientProvider` का उपयोग करने से आप इसे हर पृष्ठ के लिए फिर से इनिशियलाइज़ करने से बचते हैं, प्रदर्शन में सुधार होता है और आपके एप्लिकेशन में एक सुसंगत localization context बना रहता है।
- **`IntlayerServerProvider`** का उपयोग सर्वर चाइल्ड को locale प्रदान करने के लिए किया जाता है। इसे layout में सेट नहीं किया जा सकता।

  > Layout और page एक सामान्य server context साझा नहीं कर सकते क्योंकि server context सिस्टम per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism) पर आधारित है, जिससे एप्लिकेशन के अलग-अलग segments के लिए हर "context" पुनः बनाया जाता है। provider को किसी साझा layout में रखने से यह isolation टूट जाएगी, और आपके server components तक server context मानों का सही propagation असंभव हो जाएगा।

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // संबंधित कंटेंट घोषणा बनाएं

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // संबंधित content declaration बनाएं

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` एक isomorphic import path है: `react-server` export condition server components को ambient-locale implementation देता है, जबकि client components को context-backed implementation मिलता है। यही call दोनों तरफ से काम करती है।

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएं

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> यदि आप अपनी सामग्री को `string` गुण में उपयोग करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, उदाहरण के लिए:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useIntlayer.md) देखें।

</Step>

<Step number={7} title="लोकल की पहचान के लिए प्रॉक्सी कॉन्फ़िगर करें" isOptional={true}>

उपयोगकर्ता की पसंदीदा भाषा (locale) का पता लगाने के लिए प्रॉक्सी सेट करें:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` का उपयोग उपयोगकर्ता की पसंदीदा locale का पता लगाने और उन्हें उस उपयुक्त URL पर रीडायरेक्ट करने के लिए किया जाता है जैसा कि [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में निर्दिष्ट है। इसके अतिरिक्त, यह उपयोगकर्ता की पसंदीदा locale को कुकी में सहेजने की सुविधा भी देता है।

> Intlayer v9 के बाद से, यह middleware `routing.enableProxy` विकल्प का सम्मान करता है (`true` डिफ़ॉल्ट रूप से)। इस फ़ाइल को हटाए बिना इसे pass-through में बदलने के लिए अपने कॉन्फ़िगरेशन में `routing.enableProxy: false` सेट करें। [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/releases/v9.md) देखें।

> यदि आपको कई प्रॉक्सीज़ को श्रृंखलाबद्ध करना है (उदाहरण के लिए, प्रमाणीकरण या कस्टम प्रॉक्सी के साथ `intlayerProxy`), तो Intlayer अब `multipleProxies` नामक एक सहायक प्रदान करता है।

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

Next.js में अपने कंटेंट की भाषा बदलने के लिए, सुझाई गई विधि यह है कि उपयोगकर्ताओं को उपयुक्त स्थानीयकृत पेज पर रीडायरेक्ट करने के लिए `Link` कंपोनेंट का उपयोग करें। `Link` कंपोनेंट पेज की प्रीफेचिंग सक्षम करता है, जिससे पूरा पेज रीलोड होने से बचता है।

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
              {/* Locale - उदाहरण: FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - उदाहरण: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - उदाहरण: Francés (वर्तमान Locale: Locales.SPANISH) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* अंग्रेज़ी में भाषा - उदाहरण: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> एक वैकल्पिक तरीका है `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग करना। यह फ़ंक्शन पेज को prefetch करने की अनुमति नहीं देगा। अधिक जानकारी के लिए [`useLocale` हुक दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md) देखें।

> डॉक्यूमेंटेशन संदर्भ:
>
> - [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Server Actions में वर्तमान locale प्राप्त करें" isOptional={true}>

यदि आपको Server Action के अंदर सक्रिय locale की आवश्यकता है (उदा., ईमेल लोकलाइज़ करने या locale-aware लॉजिक चलाने के लिए), तो `next-intlayer/server` से `getLocale` को कॉल करें:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // locale के साथ कुछ करें
};
```

> `getLocale` फ़ंक्शन उपयोगकर्ता की locale निर्धारित करने के लिए एक क्रमिक रणनीति का पालन करता है:
>
> 1. सबसे पहले, यह प्रॉक्सी द्वारा सेट किए गए संभव locale मान के लिए request headers की जाँच करता है
> 2. अगर headers में कोई locale नहीं मिलता, तो यह cookies में संग्रहीत locale की तलाश करता है
> 3. यदि कोई cookie नहीं मिलता, तो यह उपयोगकर्ता की पसंदीदा भाषा का पता लगाने का प्रयास करता है, जो उनके ब्राउज़र सेटिंग्स से ली जाती है
> 4. अंततः, यह एप्लिकेशन में कॉन्फ़िगर किए गए डिफ़ॉल्ट locale पर लौट आता है
>
> यह सुनिश्चित करता है कि उपलब्ध संदर्भ के आधार पर सबसे उपयुक्त लोकल चुना जाए।

</Step>

<Step number={10} title="अपने बंडल आकार का अनुकूलन करें" isOptional={true}>

जब आप `next-intlayer` का उपयोग करते हैं, तो डिक्शनरी डिफ़ॉल्ट रूप से हर पेज के बंडल में शामिल की जाती हैं। बंडल आकार को अनुकूलित करने के लिए, Intlayer एक वैकल्पिक SWC प्लगइन प्रदान करता है जो मैक्रो का उपयोग करके बुद्धिमत्ता से `useIntlayer` कॉल्स को बदल देता है। यह सुनिश्चित करता है कि डिक्शनरी केवल उन पेजों के बंडलों में शामिल हों जो वास्तव में उनका उपयोग करते हैं।

इस अनुकूलन को सक्षम करने के लिए, `@intlayer/swc` पैकेज इंस्टॉल करें। एक बार इंस्टॉल होने पर, `next-intlayer` स्वचालित रूप से प्लगइन का पता लगा कर उपयोग कर लेगा:

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

> नोट: यह अनुकूलन केवल Next.js 13 और उससे ऊपर के लिए उपलब्ध है।

> नोट: यह पैकेज डिफ़ॉल्ट रूप से स्थापित नहीं होता क्योंकि Next.js पर SWC प्लगइन्स अभी भी प्रायोगिक हैं। भविष्य में यह बदल सकता है।

> नोट: यदि आप विकल्प को `importMode: 'dynamic'` या `importMode: 'fetch'` (in the `dictionary` configuration) के रूप में सेट करते हैं, तो यह Suspense पर निर्भर करेगा, इसलिए आपको अपने `useIntlayer` कॉल्स को एक `Suspense` बाउंड्री में रैप करना होगा। इसका मतलब है कि आप अपने Page / Layout कॉम्पोनेंट के शीर्ष स्तर पर सीधे `useIntlayer` का उपयोग नहीं कर पाएंगे।

</Step>

</Steps>

### Turbopack पर डिक्शनरी परिवर्तनों की निगरानी

जब आप Turbopack को अपने development server के रूप में `next dev` कमांड के साथ उपयोग करते हैं, तो dictionary में किए गए परिवर्तन डिफ़ॉल्ट रूप से स्वतः पहचान में नहीं आते।

यह सीमा इसलिए होती है क्योंकि Turbopack आपके content files में बदलावों की निगरानी करने के लिए webpack plugins को parallel रूप से नहीं चला सकता। इस समस्याओं का समाधान करने के लिए, आपको `intlayer watch` कमांड का उपयोग करना होगा ताकि development server और Intlayer build watcher दोनों एक ही समय पर चल सकें।

```json5 fileName="package.json"
{
  // ... Your existing package.json configurations
  "scripts": {
    // ... Your existing scripts configurations
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> यदि आप next-intlayer@<=6.x.x का उपयोग कर रहे हैं, तो Next.js 16 ऐप्लिकेशन को Turbopack के साथ सही ढंग से कार्य करने के लिए `--turbopack` फ्लैग बनाए रखना आवश्यक है। इस सीमा से बचने के लिए हम next-intlayer@>=7.x.x का उपयोग करने की सलाह देते हैं।

### TypeScript कॉन्फ़िगर करें

Intlayer TypeScript के फायदे उठाने और आपके कोडबेस को मजबूत बनाने के लिए module augmentation का उपयोग करता है।

![ऑटोकम्प्लीशन](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![अनुवाद त्रुटि](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

सुनिश्चित करें कि आपका TypeScript कॉन्फ़िगरेशन autogenerated types को शामिल करता है।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // स्वचालित रूप से जनरेट किए गए प्रकार शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

सुझाव दिया जाता है कि Intlayer द्वारा जनरेट की गई फाइलों को नज़रअंदाज़ किया जाए। इससे आप इन्हें अपने Git रिपॉज़िटरी में कमिट करने से बच सकते हैं।

इसके लिए, आप अपने `.gitignore` फ़ाइल में निम्न निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जनरेट की गई फ़ाइलों को नज़रअंदाज़ करें
.intlayer
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने डेवलपमेंट अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code Extension** स्थापित कर सकते हैं।

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- **Autocompletion** अनुवाद कुंजियों के लिए।
- गायब अनुवादों के लिए **Real-time error detection**।
- **इनलाइन प्रीव्यू** अनुवादित सामग्री का पूर्वावलोकन।
- **क्विक एक्शन्स** अनुवादों को आसानी से बनाने और अपडेट करने के लिए।

एक्सटेंशन का उपयोग कैसे करें, इस बारे में अधिक जानकारी के लिए, देखें [Intlayer VS Code Extension दस्तावेज़](https://intlayer.org/doc/vs-code-extension).

### आगे बढ़ें

और आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को externalize कर सकते हैं।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Next.js ऐप को अंतरराष्ट्रीयकृत करने के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

`next.config.js` का `i18n` फ़ील्ड App Router पर लागू नहीं होता है, इसलिए स्थानीयकरण परत हमेशा एक लाइब्रेरी विकल्प होती है:

- **`next-intl`**, **`next-i18next` / `i18next`** और **`react-intl`**: प्रति नेमस्पेस लोड किए गए JSON या ICU कैटलॉग।
- **`Lingui`**: एक्सट्रैक्शन-संचालित, बिल्ड समय पर संकलित ICU संदेशों के साथ।
- **`Intlayer`**: सबसे उन्नत समाधान। आपके कोडबेस में कहीं भी घोषित सामग्री ([प्रत्येक घटक के बगल में या केंद्रीकृत](https://intlayer.org/blog/per-component-vs-centralized-i18n)) और प्रति घटक संकलित, पूरी तरह से टाइप की गई, AI अनुवाद, एक विज़ुअल एडिटर और एक CMS के साथ।

यह मार्गदर्शिका पथ में लोकेल के बिना सेटअप को कवर करती है। देखें [Intlayer क्यों](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) और [Next.js i18n बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md).

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

नहीं। `npx intlayer extract` चलाएं और Intlayer आपके घटकों को पढ़ता है, उपयोगकर्ता के सामने आने वाली स्ट्रिंग्स को निकालता है और प्रत्येक के बगल में एक `.content` फ़ाइल लिखता है, ताकि आप एक बार में एक कैटलॉग में स्ट्रिंग्स को कॉपी करने के बजाय एक diff की समीक्षा करें।

पूरी तरह से स्वचालित पाइपलाइन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) निर्माण समय पर ऐसा ही करता है: यह प्रत्येक परिवर्तन पर आपके JSX, TSX, Vue और Svelte स्रोत को स्कैन करता है, शब्दकोश उत्पन्न करता है और उन्हें हॉट मॉड्यूल रिप्लेसमेंट के माध्यम से सिंक में रखता है, इसलिए हाथ से बनाए रखने के लिए कोई कुंजी नहीं है।

कंपाइलर को चालू करने से पहले दो सीमाएं जानने योग्य हैं। यह स्थिर विश्लेषण द्वारा काम करता है, इसलिए जो स्ट्रिंग्स केवल रनटाइम पर मौजूद होती हैं, जैसे कि API त्रुटि कोड या CMS फ़ील्ड, वे पहुंच से बाहर रहती हैं। और इसे `className="active"` या स्थिति कोड जैसे एप्लिकेशन लॉजिक से उपयोगकर्ता के सामने आने वाले टेक्स्ट को अलग करना होगा, जिसके लिए एक बड़े कोडबेस में कुछ एनोटेशन की आवश्यकता होती है। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) आपको लूप में रखकर दोनों से बचाता है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="मैं URL में लोकेल के बिना अपना ऐप क्यों पेश करूँगा?">

क्योंकि लोकेल हमेशा पृष्ठ पहचान का हिस्सा नहीं होता है। एक प्रमाणित डैशबोर्ड, एक आंतरिक उपकरण या लॉगिन के पीछे एक ऐप के पास हर URL में `/fr/` उजागर करने का कोई कारण नहीं है: भाषा एक उपयोगकर्ता प्राथमिकता है, एक अलग दस्तावेज़ नहीं। उपसर्ग को हटाने से आपके रूट, आपके लिंक और आपके एनालिटिक्स भी पाथ के एक ही सेट पर रहते हैं।

</Question>

<Question title="URL में लोकेल न होने के SEO परिणाम क्या हैं?">

वे वास्तविक हैं, इसलिए सोच-समझकर चुनें। प्रति भाषा एक अलग URL के बिना, खोज इंजनों के पास प्रत्येक लोकेल के लिए अनुक्रमित करने के लिए कोई अलग पृष्ठ नहीं होता है, `hreflang` के पास इंगित करने के लिए कुछ भी नहीं होता है, और एक क्रॉलर केवल वही भाषा देखता है जो आपकी डिफ़ॉल्ट पहचान इसे प्रदान करती है। यह लॉगिन के पीछे की सामग्री के लिए ठीक है, जो वैसे भी अनुक्रमित नहीं है, और सार्वजनिक विपणन साइट या दस्तावेज़ीकरण के लिए उपयुक्त नहीं है। यदि प्रति भाषा कार्बनिक ट्रैफ़िक मायने रखता है, तो इसके बजाय [Next.js 16 मार्गदर्शिका](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md) में उपसर्ग वाले सेटअप का उपयोग करें।

</Question>

<Question title="`no-prefix` और `search-params` मोड में क्या अंतर है?">

`"no-prefix"` लोकेल को पूरी तरह से URL से बाहर रखता है और इसे कुकी, हेडर या डोमेन से हल करता है, इसलिए हर भाषा एक पता साझा करती है। `"search-params"` इसे `/dashboard?locale=fr` के रूप में क्वेरी स्ट्रिंग में रखता है, जो आपके रूट ट्री को बदले बिना प्रत्येक भाषा को एक अलग, लिंक करने योग्य और बुकमार्क करने योग्य URL देता है। जब आप प्रति भाषा साझा करने योग्य लिंक चाहते हैं तो `"search-params"` को प्राथमिकता दें।

</Question>

<Question title="फिर लोकेल का पता कैसे लगाया जाता है?">

`routing.storage` में सूचीबद्ध स्रोतों से, डिफ़ॉल्ट रूप से पहले एक कुकी और फिर `Accept-Language` हेडर, आपके डिफ़ॉल्ट लोकेल पर वापस आ जाता है। चरण 7 इसे लागू करने वाला प्रॉक्सी जोड़ता है। उपयोगकर्ता द्वारा स्पष्ट रूप से चुनी गई भाषा बनी रहती है, इसलिए यह अगली यात्रा में भी बनी रहती है। [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Question>

<Question title="क्या मैं इसके बजाय प्रत्येक भाषा को उसके अपने डोमेन पर मैप कर सकता हूँ?">

हाँ, और यह वह विकल्प है जिस पर विचार करना चाहिए जब आपने सौंदर्य कारणों से उपसर्ग हटा दिया हो लेकिन फिर भी SEO चाहते हों। `routing.domains` एक लोकेल को एक होस्टनाम पर मैप करता है, इसलिए डोमेन भाषा की पहचान करता है, पाथ में कोई उपसर्ग नहीं जोड़ा जाता है, और प्रत्येक भाषा को एक अनुक्रमणीय URL मिलता है जिसे `hreflang` इंगित कर सकता है।

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
