---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "मौजूदा Next.js ऐप को बाद में बहुभाषी (i18n) कैसे बनाएं (i18n गाइड 2026)"
description: "2026 में मौजूदा Next.js ऐप को बिना किसी जटिल रीफैक्टरिंग के बहुभाषी (i18n) बनाने की संपूर्ण गाइड। Intlayer के साथ स्वचालित निष्कर्षण, AI अनुवाद और उच्च-प्रदर्शन रूटिंग।"
keywords:
  - Next.js i18n
  - अंतर्राष्ट्रीयकरण
  - मौजूदा Next.js ऐप का अनुवाद करें
  - Next.js 16
  - Intlayer
  - बहुभाषी
  - React i18n
  - कंपाइलर
  - AI अनुवाद
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# मौजूदा Next.js ऐप को बाद में बहुभाषी (i18n) कैसे बनाएं (i18n गाइड 2026)

शुरुआत से ही Next.js प्रोजेक्ट में अंतर्राष्ट्रीयकरण (i18n) जोड़ना अपेक्षाकृत आसान है। लेकिन तब क्या होता है जब आपके पास पहले से ही केवल एक भाषा में बना परिपक्व Next.js ऐप हो और आपको उसे **बाद में** बहुभाषी बनाना पड़े?

`next-intl` या `next-i18next` जैसी पारंपरिक लाइब्रेरी के साथ यह प्रक्रिया बहुत कठिन होती है:

- सैकड़ों JSX/TSX फ़ाइलों में हार्डकोडेड टेक्स्ट को मैन्युअल रूप से खोजना।
- नेस्टेड JSON फ़ाइलें बनाना और मनमाने अनुवाद कीज़ (`pages.dashboard.header.title`) गढ़ना।
- टेक्स्ट को अनुवाद हुक्स (`t('...')`) से बदलना।
- पूरे `app/` फ़ोल्डर को `app/[locale]/...` में पुनर्गठित करना, जिससे पुराने यूआरएल और सर्च इंजन रैंकिंग प्रभावित होते हैं।

2026 में आपको अपना कोड दोबारा लिखने की ज़रूरत नहीं है। **Intlayer** के साथ आप स्वचालित एक्सट्रैक्शन, AI अनुवाद और लचीले रूटिंग की मदद से मिनटों में किसी भी मौजूदा Next.js ऐप को बहुभाषी बना सकते हैं।

> Next.js 16 App Router के लिए चरण-दर-चरण तकनीकी गाइड खोज रहे हैं? हमारा दस्तावेज़ देखें: [Intlayer के साथ Next.js 16 का अनुवाद करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)।

## विषय सूची

<TOC/>

## मौजूदा ऐप को बहुभाषी बनाने की प्रमुख चुनौतियाँ

डेवलपर्स को 3 मुख्य बाधाओं का सामना करना पड़ता है:

1. **कोडबेस में भारी बदलाव**: मैन्युअल स्ट्रिंग एक्सट्रैक्शन से लगभग हर फ़ाइल में बदलाव करना पड़ता है।
2. **रूटिंग की बाध्यता**: पुरानी लाइब्रेरीज़ आपको पेजों को `[locale]` डायनामिक सेगमेंट में ले जाने के लिए मजबूर करती हैं।
3. **अनुवाद का भारी काम**: कई भाषाओं में JSON अनुवाद डिक्शनरी भरना बहुत थकाऊ होता है।

Intlayer **कंपाइलर-सहायता प्राप्त एक्सट्रैक्शन**, **डिक्लेरेटिव डिक्शनरी** और **लचीली रूटिंग** के साथ इन समस्याओं को हल करता है।

## स्वचालित सामग्री निष्कर्षण (मैन्युअल खोज की आवश्यकता नहीं)

### विकल्प A: CLI एक्सट्रैक्टर (`npx intlayer extract`)

सीधे अपने कोडबेस पर Intlayer का एक्सट्रैक्शन टूल चलाएं:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

यह कमांड React घटकों का विश्लेषण करता है और सीधे कॉम्पोनेंट के बगल में डिक्लेरेटिव फ़ाइलें (`.content.ts`) बनाता है।

### विकल्प B: Intlayer कंपाइलर (बिल्ड-टाइम एक्सट्रैक्शन)

कंपाइलर सक्षम होने पर आप अपने घटकों में सामान्य टेक्स्ट लिखना जारी रख सकते हैं। बिल्ड के समय कंपाइलर अपने आप अनुवाद लिंक कर देता है:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

पर्दे के पीछे, Intlayer डिक्शनरी बनाता है और कॉम्पोनेंट को उसकी स्थानीयकृत सामग्री से जोड़ता है, जिससे मैन्युअल रीफैक्टरिंग की आवश्यकता पूरी तरह समाप्त हो जाती है।

इस स्थिति में यह निम्नलिखित सामग्री के साथ एक `src/app/page.content.ts` फ़ाइल उत्पन्न करेगा:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## अपने पसंदीदा LLM के साथ AI अनुवाद

OpenAI, Anthropic, DeepSeek या Mistral का उपयोग करके सामग्री का तुरंत अनुवाद करें:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "उत्पादकता और टीम सहयोग के लिए SaaS डैशबोर्ड",
  },
};

export default config;
```

`npx intlayer fill` चलाने से आपकी कॉन्फ़िगर की गई सभी भाषाओं के अनुवाद स्वचालित रूप से `.content.ts` घोषणाओं में भर जाते हैं:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      hi: "हमारे प्लेटफ़ॉर्म में आपका स्वागत है",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      hi: "आज ही हमारी आधुनिक सुविधाओं को एक्सप्लोर करना शुरू करें।",
    }),
  },
};

export default content;
```

चूंकि Intlayer LLM को उच्च-स्तरीय `applicationContext` प्रदान करता है, इसलिए उत्पन्न अनुवाद पारंपरिक स्वचालित उपकरणों की तुलना में तकनीकी बारीकियों, ब्रांड टोन और व्याकरण संबंधी संदर्भ को बेहतर बनाए रखते हैं।

प्रोडक्शन में भेजने से पहले यह सत्यापित करने के लिए कि कोई स्ट्रिंग छूटी तो नहीं है:

```bash
npx intlayer test
```

## मौजूदा URLs को बदले बिना बहुभाषी रूटिंग

Intlayer कई रूटिंग विकल्प प्रदान करता है:

- **सर्च पैरामीटर / कुकी मोड (`search-params`)**: फ़ाइलों को `[locale]` में स्थानांतरित किए बिना अपनी फ़ोल्डर संरचना बनाए रखें।
- **उपसर्ग मोड (`prefix` / `prefix-all-locales`)**: SEO-अनुकूल यूआरएल का पूर्ण समर्थन।

सेकंडों में अपना Next.js इंटीग्रेशन कॉन्फ़िगर करें:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

अपने रूट लेआउट को `IntlayerProvider` से लपेटें:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## बहुभाषी SEO

खोज इंजनों में वैश्विक दृश्यता के लिए स्थानीयकृत मेटाडेटा और `hreflang` टैग उत्पन्न करें:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## गहराई से जानें: क्या आप चरण-दर-चरण सेटअप के लिए तैयार हैं?

मिडलवेयर, स्टैटिक जनरेशन (`generateStaticParams`) और सर्वर कंपोनेंट्स के विस्तृत तकनीकी दस्तावेज़ के लिए हमारी संपूर्ण गाइड देखें:

👉 **[Intlayer के साथ Next.js 16 का अनुवाद करने की संपूर्ण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)**

## अक्सर पूछे जाने वाले प्रश्न (FAQ)

<FAQ>

<Question title="क्या मैं फ़ाइलों को app/[locale] में ले जाए बिना Next.js ऐप को बहुभाषी बना सकता हूँ?">

हाँ। Intlayer `search-params` मोड और कुकीज़/हेडर डिटेक्शन का समर्थन करता है, जिससे मौजूदा संरचना सुरक्षित रहती है।

</Question>
<Question title="क्या मुझे कोड में हर स्ट्रिंग को मैन्युअल रूप से बदलना होगा?">

नहीं। `npx intlayer extract` या Intlayer कंपाइलर स्वचालित रूप से स्ट्रिंग्स को निकालता है।

</Question>
<Question title="Intlayer बंडल आकार को कैसे कम करता है?">

प्रति-घटक घोषणा और बिल्ड-टाइम मैक्रो अनुकूलन के माध्यम से केवल आवश्यक अनुवाद डेटा लोड किया जाता है।

</Question>
<Question title="क्या मैं घटकों के स्वचालित अनुवाद के लिए AI का उपयोग कर सकता हूँ?">

हाँ। `npx intlayer fill` कमांड शीर्ष AI मॉडल्स से जुड़कर संदर्भ-जागरूक अनुवाद तैयार करता है।

</Question>
</FAQ>
