---
createdAt: 2024-03-07
updatedAt: 2026-09-06
priority: 8
title: "मौजूदा Vite और React ऐप को बाद में बहुभाषी (i18n) कैसे बनाएं (i18n गाइड 2026)"
description: "2026 में मौजूदा Vite और React ऐप को बिना किसी जटिल रीफैक्टरिंग के बहुभाषी (i18n) बनाने की संपूर्ण गाइड। Intlayer के साथ स्वचालित निष्कर्षण, AI अनुवाद और बंडल अनुकूलन।"
keywords:
  - Vite i18n
  - React i18n
  - अंतर्राष्ट्रीयकरण
  - मौजूदा Vite ऐप का अनुवाद करें
  - मौजूदा React ऐप का अनुवाद करें
  - Intlayer
  - बहुभाषी
  - कंपाइलर
  - AI अनुवाद
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
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

# मौजूदा Vite और React ऐप को बाद में बहुभाषी (i18n) कैसे बनाएं (i18n गाइड 2026)

शुरुआत से ही Vite और React प्रोजेक्ट में अंतर्राष्ट्रीयकरण (i18n) जोड़ना अपेक्षाकृत आसान है। लेकिन तब क्या होता है जब आपके पास पहले से ही केवल एक भाषा में बना परिपक्व एप्लिकेशन हो और आपको उसे **बाद में** बहुभाषी बनाना पड़े?

यदि आपने कभी `react-i18next` या `react-intl` जैसी पारंपरिक लाइब्रेरी के साथ ऐसा करने का प्रयास किया है, तो आप इसकी जटिलता जानते हैं:

- सैकड़ों JSX और TSX फ़ाइलों में हार्डकोडेड टेक्स्ट को मैन्युअल रूप से ढूँढना।
- नेस्टेड JSON फ़ाइलें तैयार करना और मनमानी अनुवाद कीज़ (`components.header.title` आदि) बनाना।
- UI टेक्स्ट को अनुवाद हुक्स (`t('...')`) से बदलना।
- क्लाइंट-साइड रूटिंग, स्टेट मैनेजमेंट और भाषा बदलने के लॉजिक को दोबारा लिखना।

2026 में आपको अपना कोडबेस फिर से लिखने की ज़रूरत नहीं है। **Intlayer** के साथ आप स्वचालित एक्सट्रैक्शन, AI अनुवाद और सहज Vite इंटीग्रेशन की मदद से मिनटों में किसी भी मौजूदा Vite और React ऐप को बहुभाषी बना सकते हैं।

> Vite और React के लिए चरण-दर-चरण तकनीकी गाइड खोज रहे हैं? हमारा दस्तावेज़ देखें: [Intlayer के साथ Vite और React का अनुवाद करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)।

## विषय सूची

<TOC/>

## मौजूदा ऐप को बहुभाषी बनाने की प्रमुख चुनौतियाँ

मौजूदा Vite और React एप्लिकेशन में अंतर्राष्ट्रीयकरण जोड़ते समय डेवलपर्स को तीन प्रमुख बाधाओं का सामना करना पड़ता है:

1. **कोडबेस में भारी फेरबदल**: JSON शब्दकोशों में स्ट्रिंग्स को मैन्युअल रूप से निकालने के लिए लगभग हर कॉम्पोनेंट फ़ाइल को संपादित करना पड़ता है। इससे बड़े Git diffs बनते हैं, मर्ज संघर्ष का जोखिम बढ़ता है और लेआउट में खराबी आने की संभावना रहती है।
2. **कीज़ प्रबंधन का तनाव**: हर टेक्स्ट के लिए `dashboard.hero.ctaButton` जैसी कीज़ गढ़ना विकास की गति को धीमा करता है और हर बदलाव पर अतिरिक्त तनाव पैदा करता है।
3. **थकाऊ अनुवाद प्रक्रिया**: स्ट्रिंग्स निकालने के बाद 5, 10 या 20 भाषाओं में शब्दकोश भरने के लिए अंतहीन कॉपी-पेस्ट या महंगी अनुवाद सेवाओं की आवश्यकता होती है।

Intlayer इन समस्याओं को **कंपाइलर-आधारित निष्कर्षण**, **कॉम्पोनेंट-स्तरीय डिक्लेरेटिव डिक्शनरी** और **Vite के साथ आसान एकीकरण** के माध्यम से हल करता है।

## स्वचालित कंटेंट निष्कर्षण (मैन्युअल खोज की आवश्यकता नहीं)

JSX से हर हार्डकोडेड स्ट्रिंग को मैन्युअल रूप से निकालने के बजाय, Intlayer दो आसान रास्ते प्रदान करता है:

### विकल्प A: CLI एक्सट्रैक्टर (`npx intlayer extract`)

आप सीधे अपने कोडबेस पर Intlayer के एक्सट्रैक्शन टूल को चला सकते हैं:

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

यह कमांड आपके React कॉम्पोनेंट्स को स्कैन करता है, यूज़र-फेसिंग टेक्स्ट का पता लगाता है और कॉम्पोनेंट्स के पास ही कंटेंट डिक्लेरेशन फ़ाइलें (`.content.ts`) अपने-आप बना देता है। आपका लॉजिक साफ़ और टाइप-सुरक्षित रहता है, बिना कोई अनुवाद कुंजी लिखे।

### विकल्प B: Intlayer कंपाइलर (बिल्ड-टाइम निष्कर्षण)

कॉन्फ़िगरेशन में Intlayer कंपाइलर सक्रिय होने पर आप अपनी डिफ़ॉल्ट भाषा में सामान्य टेक्स्ट के साथ कॉम्पोनेंट लिखना जारी रख सकते हैं। बिल्ड के समय कंपाइलर टेक्स्ट निकालता है और स्थानीयकृत सामग्री को अपने-आप इंजेक्ट करता है:

```tsx fileName="src/App.tsx"
// सामान्य React कोड लिखें। कंपाइलर टेक्स्ट को अपने-आप निकाल लेता है
export default function App() {
  return (
    <section>
      <h1>हमारे प्लेटफ़ॉर्म में आपका स्वागत है</h1>
      <p>आज ही आधुनिक सुविधाओं का अनुभव करें।</p>
    </section>
  );
}
```

पर्दे के पीछे Intlayer शब्दकोश बनाता है और कॉम्पोनेंट को उसकी अनूदित सामग्री से जोड़ता है, जिससे मैन्युअल रीफैक्टरिंग की आवश्यकता पूरी तरह समाप्त हो जाती है।

इस स्थिति में यह निम्नलिखित संरचना वाली `src/App.content.ts` फ़ाइल बनाता है:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    hamarePlatformMeinAapkaSwagat: t({
      hi: "हमारे प्लेटफ़ॉर्म में आपका स्वागत है",
    }),
    aajHiAadhunikSuvidhaonKa: t({
      hi: "आज ही आधुनिक सुविधाओं का अनुभव करें।",
    }),
  },
};

export default content;
```

## अपने पसंदीदा LLM के साथ AI-संचालित अनुवाद

कंटेंट निष्कर्षण के बाद दर्जनों भाषाओं में अनुवाद करने में कई दिन नहीं लगने चाहिए। Intlayer में एक अंतर्निहित AI अनुवाद CLI शामिल है जो आपके अपने API कीज़ का उपयोग करके सीधे OpenAI, Anthropic, DeepSeek या Mistral से जुड़ता है:

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

`intlayer.config.ts` में भाषाएँ और AI प्रदाता कॉन्फ़िगर करें:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HINDI],
    defaultLocale: Locales.HINDI,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Vite और React के साथ निर्मित आधुनिक SaaS एप्लिकेशन और डैशबोर्ड",
  },
};

export default config;
```

`npx intlayer fill` चलाने से आपकी सामग्री फ़ाइलों में सभी भाषाओं के लिए सटीक अनुवाद भर जाते हैं:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    hamarePlatformMeinAapkaSwagat: t({
      hi: "हमारे प्लेटफ़ॉर्म में आपका स्वागत है",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    aajHiAadhunikSuvidhaonKa: t({
      hi: "आज ही आधुनिक सुविधाओं का अनुभव करें।",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

क्योंकि Intlayer मॉडल को `applicationContext` प्रदान करता है, इसलिए उत्पन्न अनुवाद सामान्य टूल्स की तुलना में तकनीकी संदर्भ और ब्रांड टोन को बेहतर ढंग से सुरक्षित रखते हैं।

उत्पादन में तैनात करने से पहले यह जाँचने के लिए कि कोई टेक्स्ट छूटा तो नहीं:

```bash
npx intlayer test
```

## Vite इंटीग्रेशन और Provider सेटअप

Vite में Intlayer को जोड़ना बेहद सरल है; बस `vite.config.ts` में प्लगइन जोड़ें और रूट कॉम्पोनेंट को `IntlayerProvider` से लपेटें:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Intlayer v9 से कंपाइलर सीधे `intlayer()` प्लगइन में शामिल है और `intlayer.config.ts` में `compiler.enabled` सेट करते ही स्वचालित रूप से सक्रिय हो जाता है।

रूट कॉम्पोनेंट में अपने एप्लिकेशन को `IntlayerProvider` से रैप करें:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### गतिशील रूप से भाषा बदलें

`useLocale` हुक का उपयोग करके एप्लिकेशन में कहीं भी आसानी से भाषा बदलें:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## बहुभाषी SEO (Sitemap और Robots.txt)

Intlayer में `generateSitemap` और `getMultilingualUrls` जैसे उपयोगिता फ़ंक्शन शामिल हैं, जो स्थिर Vite परिनियोजन के लिए क्रॉलर-अनुकूल बहुभाषी `sitemap.xml` और `robots.txt` फ़ाइलें बनाते हैं:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("SEO फ़ाइलें सफलतापूर्वक उत्पन्न हुईं।");
```

`vite build` से पहले इस स्क्रिप्ट को चलाने के लिए अपने `package.json` में `prebuild` हुक जोड़ें:

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

## गहराई से समझें: क्या आप चरण-दर-चरण कार्यान्वयन के लिए तैयार हैं?

इस गाइड ने 2026 में बिना किसी जटिलता के मौजूदा Vite और React ऐप को बहुभाषी बनाने का एक वैचारिक अवलोकन प्रस्तुत किया।

यदि आप विस्तृत कॉन्फ़िगरेशन, TypeScript प्रकार सुरक्षा, गतिशील शब्दकोश और विज़ुअल एडिटर सहित प्रत्येक भाग को सेट अप करने के लिए तैयार हैं, तो हमारे व्यापक गाइड पर जाएँ:

👉 **[Intlayer के साथ Vite और React का अनुवाद करने की संपूर्ण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)**

## अक्सर पूछे जाने वाले प्रश्न (FAQ)

<FAQ>

<Question title="क्या मैं सभी स्ट्रिंग्स को मैन्युअल रूप से बदले बिना अपने Vite और React ऐप को बहुभाषी बना सकता हूँ?">

हाँ। आप हार्डकोडेड टेक्स्ट को स्वचालित रूप से निकालने के लिए `npx intlayer extract` का उपयोग कर सकते हैं, या Intlayer कंपाइलर का उपयोग कर सकते हैं जो बिल्ड के समय कॉम्पोनेंट्स को बदल देता है जबकि आप मानक JSX लिखना जारी रख सकते हैं।

</Question>
<Question title="react-i18next या react-intl की तुलना में Intlayer Vite बंडल आकार को कैसे कम करता है?">

Intlayer प्रति-कॉम्पोनेंट शब्दकोश परिभाषाओं और बिल्ड-टाइम मैक्रो अनुकूलन का उपयोग करता है। बंडल केवल उन्हीं फ़ील्ड्स को प्राप्त करते हैं जिनकी आवश्यकता स्क्रीन पर प्रदर्शित कॉम्पोनेंट्स को होती है। डायनामिक डिक्शनरी आवश्यकतानुसार भाषाओं को लोड करने की सुविधा भी देती है।

</Question>
<Question title="क्या मैं अपने मौजूदा कॉम्पोनेंट्स का कई भाषाओं में अनुवाद करने के लिए AI का उपयोग कर सकता हूँ?">

हाँ। Intlayer CLI में `npx intlayer fill` कमांड शामिल है, जो आपके चुने हुए AI प्रदाता (OpenAI, Anthropic, Mistral, DeepSeek) से जुड़कर पूरे प्रोजेक्ट में छूटे हुए अनुवाद तैयार करता है।

</Question>
<Question title="क्या मैं कॉम्पोनेंट्स को दोबारा लिखे बिना react-i18next या react-intl से माइग्रेट कर सकता हूँ?">

हाँ। Intlayer `react-i18next` और `react-intl` के लिए संगतता एडेप्टर प्रदान करता है, साथ ही मौजूदा JSON अनुवाद फ़ाइलों को सिंक्रनाइज़ करने के लिए प्लगइन्स (`sync-json`) भी देता है।

</Question>

</FAQ>
