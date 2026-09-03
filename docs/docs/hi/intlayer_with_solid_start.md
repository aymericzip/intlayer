---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - अपने ऐप का अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की आवश्यकता नहीं। 2026 में बहुभाषी (i18n) SolidStart ऐप बनाने की गाइड। सर्वर-रेंडर्ड लोकेल रूटिंग, hreflang, साइटमैप और AI-सहायता प्राप्त अनुवाद।"
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# Intlayer का उपयोग करके अपनी SolidStart वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<Tabs defaultTab="video">
  <Tab label="वीडियो" value="video">

<iframe title="Vite और Solid के लिए सबसे अच्छा i18n समाधान? Intlayer की खोज करें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन का अंतर्राष्ट्रीयकरण कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>

<Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Solid Start Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## विषय सूची

<TOC/>

यह गाइड एक **सर्वर-रेंडर्ड** SolidStart एप्लिकेशन को कवर करती है: अनुरोध पर लोकेल का पता लगाया जाता है, पेज सही भाषा में सर्वर पर रेंडर होते हैं, और खोज इंजनों के लिए आवश्यक `<html lang>`, `hreflang` और sitemap सिग्नल सर्वर-साइड से जारी किए जाते हैं।

## अन्य विकल्पों की तुलना में Intlayer क्यों?

`@solid-primitives/i18n` या `i18next` जैसे प्रमुख समाधानों की तुलना में, Intlayer एकीकृत अनुकूलन प्रदान करने वाला समाधान है जैसे:

<AccordionGroup>
<Accordion header="पूर्ण Solid कवरेज">

Intlayer को Solid के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है, जो **कंपोनेंट-स्तरीय सामग्री स्कोपिंग**, **प्रतिक्रियाशील (reactive) अनुवाद**, और अंतर्राष्ट्रीयकरण (i18n) को बढ़ाने के लिए आवश्यक सभी सुविधाएं प्रदान करता है।

</Accordion>

<Accordion header="बंडल साइज़">

अपनी पृष्ठों में विशाल JSON फ़ाइलों को लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। Intlayer आपके **बंडल और पेज के आकार को 50% तक कम करने में मदद करता है**।

</Accordion>

<Accordion header="रखरखाव (Maintainability)">

अपने एप्लिकेशन की सामग्री को स्कोप करने से बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव में आसानी** होती है। आप अपने संपूर्ण कोडबेस की समीक्षा किए बिना किसी एक सुविधा फ़ोल्डर को डुप्लिकेट या हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया (fully typed)** है।

</Accordion>

<Accordion header="AI एजेंट">

सामग्री को एक साथ रखने से बड़े भाषा मॉडल (LLMs) के लिए **आवश्यक संदर्भ (context) कम हो जाता है**। Intlayer कई टूल के साथ आता है, जैसे गायब अनुवादों का परीक्षण करने के लिए **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**, ताकि AI एजेंट्स के लिए डेवलपर अनुभव (DX) और भी सुगम हो सके।

</Accordion>

<Accordion header="स्वचालन (Automation)">

अपने AI प्रदाता की लागत पर अपनी पसंद के LLM का उपयोग करके अपनी CI/CD पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। Intlayer सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर**, साथ ही **पृष्ठभूमि में अनुवाद** करने में मदद करने के लिए एक [वेब प्लेटफॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

</Accordion>

<Accordion header="प्रदर्शन (Performance)">

विशाल JSON फ़ाइलों को कंपोनेंट्स से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता में समस्याएं आ सकती हैं। Intlayer निर्माण समय (build time) पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

</Accordion>

<Accordion header="गैर-डेवलपर्स के साथ स्केल करना">

केवल एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** प्रदान करता है ताकि आप **वास्तविक समय (real-time)** में अपनी बहुभाषी सामग्री को प्रबंधित कर सकें, जिससे अनुवादकों, कॉपीराइटर्स और अन्य टीम के सदस्यों के साथ सहज सहयोग हो सके। सामग्री को स्थानीय रूप से और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

</Accordion>
</AccordionGroup>

---

## SolidStart एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण गाइड

<Steps>

<Step number={1} title="निर्भरता (Dependencies) स्थापित करें">

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

> `--interactive` फ़्लैग वैकल्पिक है। यदि आप एक AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके वातावरण का पता लगाएगा और आवश्यक पैकेज स्थापित करेगा। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  कोर पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), ट्रांसपाइलेशन, और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **solid-intlayer**

  पैकेज जो Intlayer को Solid एप्लिकेशन के साथ एकीकृत करता है। यह Solid अंतर्राष्ट्रीयकरण के लिए संदर्भ प्रदाता (context providers) और हुक्स (hooks) प्रदान करता है।

- **vite-intlayer**

  Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करने के लिए Vite प्लगइन शामिल है, साथ ही लोकेल-रूटिंग हैंडलर जो उपयोगकर्ता की पसंदीदा भाषा का पता लगाता है, कुकीज़ प्रबंधित करता है, और URL पुनर्निर्देशन (redirection) संभालता है।

> यहाँ `vite-intlayer` एक सर्वर-साइड विषय है, न कि केवल एक बिल्ड-टाइम विषय: यह अनुरोध हैंडलर की आपूर्ति करता है जिसे SolidStart का Nitro सर्वर चलाता है। इसे `dependencies` में रखना सुरक्षित डिफ़ॉल्ट है — आप इसे केवल तभी `devDependencies` में ले जा सकते हैं यदि आप निर्मित `.output` निर्देशिका को तैनात करते हैं, जिसमें Nitro हैंडलर को इनलाइन करता है।

</Step>

<Step number={2} title="अपने प्रोजेक्ट का कॉन्फ़िगरेशन">

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

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
    mode: "prefix-no-default",
  },
};

export default config;
```

`prefix-no-default` के साथ, डिफ़ॉल्ट लोकेल बिना उपसर्ग वाले URL से परोसा जाता है:

```plaintext
/            /about          → अंग्रेजी  (डिफ़ॉल्ट लोकेल)
/fr          /fr/about       → फ्रेंच
/es          /es/about       → स्पैनिश
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर पुनर्निर्देशन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग अक्षम कर सकते हैं, और बहुत कुछ। उपलब्ध मापदंडों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) देखें।

</Step>

<Step number={3} title="अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें">

अपने कॉन्फ़िगरेशन में Intlayer प्लगइन जोड़ें:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> `intlayer()` Vite प्लगइन आपकी सामग्री घोषणा फ़ाइलों को बनाता है, विकास मोड में उन्हें देखता है, और एप्लिकेशन के अंदर Intlayer पर्यावरण चर (environment variables) को परिभाषित करता है। यह ऐसे उपनाम (aliases) भी प्रदान करता है जो प्रदर्शन को अनुकूलित करते हैं।

### लोकेल रूटिंग प्लगइन के साथ आती है

SolidStart [Nitro](https://nitro.build) पर चलता है, और `intlayer()` अपने लोकेल-रूटिंग हैंडलर को सीधे Nitro के सर्वर पाइपलाइन में पंजीकृत करता है (`routing.enableProxy` विकल्प के माध्यम से, जो डिफ़ॉल्ट रूप से `true` है)। कुछ भी जोड़ने की आवश्यकता नहीं है: निर्मित सर्वर पर, प्रत्येक अनुरोध को राउटर तक पहुंचने से पहले जांचा जाता है, और

- लोकेल को URL उपसर्ग से, फिर `INTLAYER_LOCALE` कुकी से, फिर `Accept-Language` हेडर से पढ़ा जाता है;
- एक गैर-उपसर्ग वाला URL इसके स्थानीयकृत समकक्ष पर पुनर्निर्देशित किया जाता है जब हल की गई लोकेल डिफ़ॉल्ट नहीं होती है (`/` → `/fr`);
- एक अनावश्यक उपसर्ग वाले URL को उसके विहित (canonical) रूप में वापस पुनर्निर्देशित किया जाता है (`/en/about` → `/about`);
- लोकेल कुकी को प्रतिक्रिया पर वापस लिखा जाता है।

</Step>

<Step number={4} title="अपनी सामग्री घोषित करें">

अनुवाद संग्रहीत करने के लिए अपनी सामग्री घोषणाएं बनाएं और प्रबंधित करें:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **SolidStart-विशिष्ट चेतावनी**: `src/routes` के तहत प्रत्येक `.ts` / `.tsx` फ़ाइल एक मार्ग बन जाती है, और एक `.content.ts` फ़ाइल में डिफ़ॉल्ट निर्यात होता है, इसलिए इसे एक पेज के रूप में ले लिया जाएगा। अपने **पेजों** की सामग्री घोषणाओं को मार्ग निर्देशिका के बाहर रखें (`src/contents/` अच्छी तरह से काम करता है)। **कंपोनेंट्स** की सामग्री सह-स्थित रह सकती है, क्योंकि `src/components` को फ़ाइल-सिस्टम राउटर द्वारा स्कैन नहीं किया जाता है।

> आपकी सामग्री घोषणाओं को आपके एप्लिकेशन में कहीं भी परिभाषित किया जा सकता है जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल हैं, और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) से मेल खाते हैं।
>
> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) देखें।

</Step>

<Step number={5} title="स्थानीयकृत रूटिंग जोड़ें">

इस चरण का लक्ष्य प्रत्येक भाषा को अपना URL देना है, जिसे खोज इंजन अनुक्रमित (index) करते हैं।

अपने पेजों को एक **वैकल्पिक गतिशील खंड (optional dynamic segment)** के तहत ले जाएं। SolidStart के फ़ाइल-सिस्टम राउटर में, `[[locale]]` `:locale?` पाथ पैटर्न में संकलित होता है:

```plaintext
src/routes/
  [[locale]].tsx          ← लेआउट जो सेगमेंट को मान्य करता है
  [[locale]]/
    index.tsx             → /        और /fr        और /es
    about.tsx             → /about   और /fr/about  और /es/about
  [...404].tsx            → किसी भी अन्य चीज़ के लिए कैच-ऑल
```

लेआउट फ़ाइल का एकमात्र काम सेगमेंट को कॉन्फ़िगर किए गए लोकेल तक सीमित करना है:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` `:locale?` को दो पैटर्न में विस्तारित करता है — एक सेगमेंट के साथ और एक बिना — और विशिष्टता के घटते क्रम में उन्हें आजमाता है। `matchFilters` वही है जो एक काम करने वाले सेटअप और एक भ्रमित करने वाले सेटअप के बीच अंतर पैदा करता है:

| URL         | matchFilters के बिना                         | matchFilters के साथ                  |
| ----------- | -------------------------------------------- | ------------------------------------ |
| `/fr/about` | फ्रेंच अबाउट पेज                             | फ्रेंच अबाउट पेज                     |
| `/about`    | अबाउट पेज (स्टैटिक सेगमेंट जीतता है)         | अबाउट पेज                            |
| `/unknown`  | **होम पेज**, चुपचाप, `locale=unknown` के साथ | कोई मैच नहीं → कैच-ऑल 404 पर जाता है |

> यदि आप `'prefix-all'` रूटिंग मोड का उपयोग करते हैं तो `[[locale]]` के बजाय `[locale]` (आवश्यक) को प्राथमिकता दें, और `'no-prefix'` या `'search-params'` के लिए सेगमेंट को पूरी तरह से हटा दें।

</Step>

<Step number={6} title="अपने एप्लिकेशन को लोकेल प्रदान करें">

URL लोकेल के लिए सत्य का एकमात्र स्रोत है: मिडलवेयर ने पहले ही अनुरोध को उसके स्थानीयकृत मार्ग पर पुनर्निर्देशित कर दिया है, इसलिए रूट लेआउट में पाथ को पढ़ने से सर्वर रेंडर और क्लाइंट हाइड्रेशन सहमत रहते हैं, और हर क्लाइंट-साइड नेविगेशन लोकेल को मुफ्त में अपडेट करता है।

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // सर्वर entry-server.tsx में <html> रेंडर करता है;
  // लोकेल के बीच क्लाइंट-साइड नेविगेशन को विशेषताओं को स्वयं अपडेट करना होगा।
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` अपने `locale` प्रोप पर प्रतिक्रिया करता है, इसलिए JSX के अंदर एक्सेस कॉलिंग `locale()` पास करना पर्याप्त है — Solid इसे एक गेटर में संकलित करता है, और URL बदलने पर पूरा ट्री नई भाषा में फिर से रेंडर होता है।

</Step>

<Step number={7} title="सर्वर पर HTML lang और dir विशेषताएं सेट करें">

`<html>` तत्व `Router` के बाहर `entry-server.tsx` द्वारा रेंडर किया जाता है। इसके बजाय अनुरोध URL से लोकेल पढ़ें:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

क्रॉलर्स को अब पहले बाइट पर सही भाषा मिलती है:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="अपने पेजों में Intlayer का उपयोग करें">

अपने संपूर्ण एप्लिकेशन में अपनी सामग्री शब्दकोशों तक पहुंचें:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> Solid में, `useIntlayer` प्रतिक्रियाशील सामग्री (जैसे `content`) लौटाता है। आप इसकी संपत्तियों को सीधे एक्सेस कर सकते हैं।

> यदि आप अपनी सामग्री को `string` विशेषता जैसे `alt`, `title`, `href`, `aria-label`, आदि में उपयोग करना चाहते हैं, तो आप फ़ंक्शन के मान का उपयोग कर सकते हैं, जैसे:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md) देखें।

सामग्री नोड्स केवल साधारण अनुवादों तक सीमित नहीं हैं। उदाहरण के लिए, एक बहुवचन काउंटर:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` सक्रिय लोकेल के लिए `Intl.PluralRules` के माध्यम से श्रेणी का चयन करता है, इसलिए दो से अधिक बहुवचन रूपों वाली भाषाएं बिना किसी अतिरिक्त कोड के काम करती हैं।

</Step>

<Step number={9} title="एक स्थानीयकृत लिंक कंपोनेंट बनाएं">

एक कस्टम `Link` कंपोनेंट बनाएं जो आंतरिक URL को वर्तमान भाषा के साथ स्वचालित रूप से उपसर्ग करता है:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

एक बार `href="/about"` लिखने पर अब सक्रिय लोकेल के आधार पर `/about`, `/fr/about` या `/es/about` उत्पन्न होता है — आपके पेजों में कहीं भी मैन्युअल उपसर्ग की आवश्यकता नहीं है।

</Step>

<Step number={10} title="एक लोकेल स्विचर कंपोनेंट बनाएं">

स्विचर को `<select>` के बजाय **वास्तविक एंकर** के रूप में रेंडर करें: वर्तमान पेज की प्रत्येक भाषा एक क्रॉल करने योग्य लिंक बन जाती है जिसे एक नए टैब में खोला जा सकता है, जो केवल JavaScript वाला नियंत्रण प्रदान नहीं कर सकता है।

`getPathWithoutLocale` वर्तमान मार्ग से लोकेल सेगमेंट को हटाता है, और `getLocalizedUrl` इसे लक्षित लोकेल के लिए फिर से बनाता है, इसलिए लिंक बिना कुछ हार्ड-कोड किए आपके रूटिंग मोड का पालन करते हैं। नेविगेशन वह है जो रेंडर की गई लोकेल को बदलता है — `[[locale]]` रूट इसे URL से प्राप्त करता है — जबकि `setLocale` विकल्प को `INTLAYER_LOCALE` कुकी में बनाए रखता है ताकि लोकेल-मुक्त URL पर बाद में की गई यात्रा समान भाषा में हल हो।

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // वर्तमान में प्रदर्शित पेज का विहित (लोकेल-मुक्त) मार्ग
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // केवल सटीक मिलान, ताकि डिफ़ॉल्ट-लोकेल लिंक हर पेज पर सक्रिय के रूप में चिह्नित न हो
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // यह सुनिश्चित करता है कि ब्राउज़र का "वापस जाएं" बटन पिछले पेज पर लौटे
              replace
            >
              {/* भाषा उसकी अपनी भाषा में - जैसे Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> Solid में, `useLocale` से `locale` एक **सिग्नल एक्सेससर (signal accessor)** है। इसके वर्तमान मान को प्रतिक्रियात्मक रूप से पढ़ने के लिए `locale()` (कोष्ठक के साथ) का उपयोग करें।
>
> `getLocaleName(localeItem)` प्रत्येक भाषा को उसकी अपनी भाषा में रेंडर करता है — `English / Français / Español`। इसके बजाय वर्तमान में प्रदर्शित भाषा में नामों का अनुवाद करने के लिए दूसरा तर्क पास करें: `getLocaleName(localeItem, locale())` अंग्रेजी में `English / French / Spanish` देता है, फ्रेंच में `anglais / français / espagnol`।
>
> `<A>` पहले से ही वर्तमान URL से मेल खाने वाले लिंक पर `aria-current="page"` सेट करता है, इसलिए इसके लिए कुछ भी जोड़ने की आवश्यकता नहीं है। `replace` को राउटर द्वारा रेंडर की गई विशेषता से वापस पढ़ा जाता है: यह एक प्रविष्टि को पुश करने के बजाय इतिहास प्रविष्टि को बदल देता है, इसलिए ब्राउज़र "वापस जाएं" बटन पिछली भाषा में उसी पेज के बजाय स्विच से पहले देखे गए पेज पर लौटता है।
>
> प्रत्येक लिंक पर `dir` और `hreflang` दाएं-से-बाएं भाषा के नामों को सही ढंग से उन्मुख रखते हैं और सहायक तकनीकों और क्रॉलर्स को बताते हैं कि प्रत्येक लिंक किस भाषा की ओर इंगित करता है।
>
> `useLocale` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md) देखें।

</Step>

<Step number={11} title="कैनोनिकल (canonical) और hreflang लिंक उत्सर्जित करें" isOptional={true}>

`hreflang` एनोटेशन खोज इंजनों को बताते हैं कि `/about`, `/fr/about` और `/es/about` अलग-अलग भाषाओं में एक ही पेज हैं। `getMultilingualUrls` आपके रूटिंग मोड का पालन करते हुए विहित (लोकेल-मुक्त) मार्ग से उन्हें प्राप्त करता है, इसलिए कुछ भी हार्ड-कोड नहीं किया गया है:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** रेंडर किए जा रहे पेज का पूर्ण URL। */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

इसे दस्तावेज़ प्रमुख (head) में रेंडर करें, जहाँ अनुरोध URL उपलब्ध है:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … <head> के अंदर, अन्य मेटा टैग के बगल में:
<AlternateLinks url={url} />;
```

`GET /fr/about` फिर प्रदान करता है:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **`@solidjs/meta` पर ध्यान दें**: लिखते समय, `@solidjs/meta` से `<Title>` और `<Meta>` हाइड्रेशन के बाद क्लाइंट पर लागू होते हैं, लेकिन SolidStart v2 में सर्वर-रेंडर्ड `<head>` में उत्सर्जित **नहीं** होते हैं। जब तक इसे अपस्ट्रीम में ठीक नहीं किया जाता, तब तक क्रॉलर्स को बिना JavaScript के देखने के लिए आवश्यक टैग — `canonical`, `hreflang`, और यदि आवश्यक हो तो `title` / `description` — को सीधे `entry-server.tsx` में रेंडर करें, जैसा कि ऊपर दिखाया गया है।

</Step>

<Step number={12} title="पेज न मिलने (404) को प्रबंधित करें" isOptional={true}>

`src/routes` के रूट पर एक स्प्लैट मार्ग (splat route) हर उस रास्ते को पकड़ता है जिससे लोकेल सेगमेंट मेल नहीं खाता — जिसमें `matchFilters` द्वारा अस्वीकार किए गए अमान्य लोकेल उपसर्ग शामिल हैं। चूँकि लोकेल अभी भी रूट लेआउट के माध्यम से URL से आता है, इसलिए 404 पेज आगंतुक की भाषा में प्रदर्शित होता है:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| अनुरोध            | परिणाम                                        |
| ----------------- | --------------------------------------------- |
| `/xx`             | `404` — `xx` एक कॉन्फ़िगर की गई लोकेल नहीं है |
| `/nonexistent`    | डिफ़ॉल्ट लोकेल में `404`                      |
| `/fr/nonexistent` | फ्रेंच में `404` (`Page introuvable`)         |

</Step>

<Step number={13} title="एक बहुभाषी साइटमैप (sitemap) उत्पन्न करें" isOptional={true}>

Intlayer का साइटमैप जनरेटर प्रत्येक पाथ को प्रति लोकेल एक प्रविष्टि में विस्तारित करता है और उनके बीच `xhtml:link` विकल्पों को जोड़ता है, इसलिए मार्ग को केवल विहित (canonical), लोकेल-मुक्त रास्तों को सूचीबद्ध करना पड़ता है।

> केवल फ्लैट URL उत्सर्जित करने वाले बुनियादी जनरेटरों के विपरीत, Intlayer प्रत्येक पृष्ठ के प्रत्येक स्थानीयकृत रूप के बीच द्विदिश (bidirectional) लिंक जोड़ता है, जो खोज इंजनों को स्थानीयकृत URL को जोड़ने और सही दर्शकों को सही परोसने में मदद करता है।

SolidStart HTTP विधि को निर्यात करने वाली फ़ाइल को एक API मार्ग में बदल देता है, और पथ से `.ts` एक्सटेंशन हटा देता है — इसलिए `src/routes/sitemap.xml.ts` को `/sitemap.xml` पर परोसा जाता है:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> API मार्ग वैकल्पिक मापदंडों का समर्थन नहीं करते हैं, इसलिए इस फ़ाइल को `[[locale]]` सेगमेंट से बाहर, `src/routes` के रूट पर रखें। साइटमैप में पहले से ही हर लोकेल शामिल है।

आप `getMultilingualUrls` के साथ उसी तरह से `robots.txt` बना सकते हैं, ताकि `Disallow` प्रविष्टियां किसी संवेदनशील मार्ग के प्रत्येक स्थानीयकृत वर्तनी को कवर करें:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="अपने सर्वर फ़ंक्शंस में लोकेल प्राप्त करें" isOptional={true}>

आप सर्वर फ़ंक्शन या API मार्ग के अंदर से वर्तमान लोकेल तक पहुंचना चाह सकते हैं।

इस तरह के उपसर्ग आधारित सेटअप में, **URL आधिकारिक है**: `getLocaleFromPath` अनुरोध URL से उपसर्ग पढ़ता है। `getLocale` उन अनुरोधों के लिए फ़ॉलबैक है जो कोई लोकेल उपसर्ग नहीं ले जाते हैं — यह `INTLAYER_LOCALE` कुकी का निरीक्षण करता है, फिर `x-intlayer-locale` हेडर, फिर `Accept-Language` पर बातचीत करता है।

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // अनुरोध से कुकी प्राप्त करें (डिफ़ॉल्ट: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // अनुरोध से हेडर प्राप्त करें (डिफ़ॉल्ट: 'x-intlayer-locale'),
      // Accept-Language वार्ता पर वापस जाना
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // getIntlayer() का उपयोग करके कंपोनेंट के बाहर कुछ सामग्री प्राप्त करें
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> यहाँ केवल `getLocale` पर भरोसा न करें: लोकेल कुकी केवल तभी लिखी जाती है जब कोई आगंतुक सक्रिय रूप से भाषा बदलता है, इसलिए `/fr/...` की पहली यात्रा डिफ़ॉल्ट लोकेल में हल होगी।

</Step>

<Step number={15} title="अपने कंपोनेंट्स की सामग्री निकालें" isOptional={true}>

यदि आपके पास मौजूदा कोडबेस है, तो हज़ारों फ़ाइलों को परिवर्तित करने में समय लग सकता है।

इस प्रक्रिया को आसान बनाने के लिए, Intlayer आपके कंपोनेंट्स को बदलने और सामग्री निकालने के लिए एक [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [एक्सट्रैक्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) का प्रस्ताव करता है।

इसे सेट करने के लिए, आप अपनी `intlayer.config.ts` फ़ाइल में एक `compiler` अनुभाग जोड़ सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... आपके कॉन्फ़िगरेशन का शेष भाग
  compiler: {
    /**
     * इंगित करता है कि कंपाइलर सक्षम होना चाहिए या नहीं।
     */
    enabled: true,

    /**
     * आउटपुट फ़ाइलों का पथ परिभाषित करता है
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * इंगित करता है कि कंपोनेंट्स को ट्रांसफॉर्म करने के बाद सेव किया जाना चाहिए या नहीं।
     *
     * - यदि `true` है, तो कंपाइलर डिस्क में कंपोनेंट फ़ाइल को फिर से लिखेगा। इसलिए परिवर्तन स्थायी होगा, और कंपाइलर अगली प्रक्रिया के लिए परिवर्तन को छोड़ देगा। उस तरह, कंपाइलर ऐप को बदल सकता है, और फिर इसे हटाया जा सकता है।
     *
     * - यदि `false` है, तो कंपाइलर केवल बिल्ड आउटपुट में कोड में `useIntlayer()` फ़ंक्शन कॉल को इंजेक्ट करेगा, और बेस कोडबेस को बरकरार रखेगा। परिवर्तन केवल मेमोरी में किया जाएगा।
     */
    saveComponents: false,

    /**
     * डिक्शनरी कुंजी उपसर्ग
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='निकालें कमांड'>

अपने कंपोनेंट्स को बदलने और सामग्री निकालने के लिए एक्सट्रैक्टर चलाएं

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

> इसके बाद अपने पेजों की जनरेट की गई सामग्री फ़ाइलों को `src/routes` से बाहर ले जाएं, जैसा कि चरण 5 में बताया गया है।

 </Tab>
 <Tab value='बैबेल कंपाइलर'>

> v9 से, `intlayerCompiler` को `intlayer` प्लगइन में शामिल किया गया है। इसलिए आपको इसे मैन्युअल रूप से जोड़ने की आवश्यकता नहीं है।

`intlayerCompiler` प्लगइन को शामिल करने के लिए अपना `vite.config.ts` अपडेट करें:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // कंपाइलर प्लगइन जोड़ता है
  ],
});
```

```bash packageManager="npm"
npm run build # या npm run dev
```

```bash packageManager="pnpm"
pnpm run build # या pnpm run dev
```

```bash packageManager="yarn"
yarn build # या yarn dev
```

```bash packageManager="bun"
bun run build # या bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="TypeScript को कॉन्फ़िगर करें">

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल संवर्धन (module augmentation) का उपयोग करता है।

सुनिश्चित करें कि आपके TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से जनरेट किए गए प्रकार शामिल हैं:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... आपके मौजूदा कॉन्फ़िगरेशन
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // स्वचालित रूप से जनरेट किए गए प्रकार शामिल करें
  ],
}
```

डिक्शनरी कुंजियाँ और सामग्री पथ अब संकलन समय (compile time) पर जाँचे जाते हैं:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## अपने सेटअप का सत्यापन

सर्वर बनाएं और प्रारंभ करें, फिर जांचें कि ये अनुरोध अपेक्षा के अनुसार व्यवहार करते हैं:

```bash
npm run build
node .output/server/index.mjs
```

| अनुरोध                                   | अपेक्षित प्रतिक्रिया                   |
| ---------------------------------------- | -------------------------------------- |
| `GET /`                                  | `200` — अंग्रेजी                       |
| `GET /` `Accept-Language: fr` के साथ     | `302` → `/fr`                          |
| `GET /` `INTLAYER_LOCALE=es` कुकी के साथ | `302` → `/es`                          |
| `GET /fr`                                | `200` — फ्रेंच, `<html lang="fr">`     |
| `GET /fr/about`                          | `200` — फ्रेंच अबाउट पेज               |
| `GET /en/about`                          | `302` → `/about` (कैनोनिकल रीडायरेक्ट) |
| `GET /xx`                                | `404`                                  |
| `GET /fr/nonexistent`                    | `404` फ्रेंच में                       |
| `GET /sitemap.xml`                       | `200` — बहुभाषी XML साइटमैप            |

पेज को रेंडर करने वाली पंक्तियाँ `vite dev` के तहत समान रूप से व्यवहार करती हैं। तीन रीडायरेक्ट पंक्तियाँ केवल एक निर्मित सर्वर पर लागू होती हैं जब तक कि आप स्वयं हैंडलर को मिडलवेयर के रूप में पंजीकृत न करें — चरण 3 देखें।

> डेवलपर सर्वर को Bun (`bun --bun vite dev`) के बजाय Node (`vite dev`) पर चलाएं: SolidStart का SSR वर्तमान में Bun रनटाइम के तहत `Expected a Response object, but received 'NodeResponse'` के साथ विफल रहता है। यह Intlayer से असंबंधित है — यह सादे टेम्पलेट पर भी पुनः प्रस्तुत होता है — और केवल देव सर्वर को प्रभावित करता है, `vite build` को नहीं।

---

## Git कॉन्फ़िगरेशन

Intlayer द्वारा जनरेट की गई फ़ाइलों को अनदेखा करने की सिफारिश की जाती है। यह आपको उन्हें अपने Git रिपॉजिटरी में प्रतिबद्ध (commit) करने से बचने की अनुमति देता है।

ऐसा करने के लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जनरेट की गई फ़ाइलों को अनदेखा करें
.intlayer
```

---

## VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** स्थापित कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटो-कंपलीशन**।
- गायब अनुवादों के लिए **वास्तविक समय त्रुटि पहचान**।
- अनुवादित सामग्री का **इनलाइन पूर्वावलोकन**।
- आसानी से अनुवाद बनाने और अपडेट करने के लिए **त्वरित कार्य (quick actions)**।

---

## आगे बढ़ें

आगे बढ़ने के लिए, आप [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) को लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी रूप से प्रबंधित कर सकते हैं।

---

## दस्तावेज़ीकरण संदर्भ

- [Intlayer दस्तावेज़](https://intlayer.org)
- [SolidStart दस्तावेज़](https://start.solidjs.com)
- [useIntlayer हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [useLocale हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Solid Start अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **`@solid-primitives/i18n`**: सीमित SSR समर्थन वाला सरल सिग्नल-आधारित शब्दकोश।
- **`Intlayer`**: SSR और प्रीरेंडर समर्थन, रूट सेगमेंट, Solid सिग्नल, AI अनुवाद और विज़ुअल एडिटर।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे Solid Start बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित समाधानों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। बिल्ड-टाइम कंपाइलर `useIntlayer` कॉल को घटक द्वारा उपयोग की जाने वाली सटीक प्रविष्टियों से बदल देता है, और [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) शेष को प्रति लोकेल विभाजित करते हैं, जिससे बंडल 50% तक कम हो जाता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना @solid-primitives/i18n या i18next से माइग्रेट कर सकता हूँ?">

काफी हद तक हाँ। [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) का पालन करें।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी फ़ाइलों को पढ़ता है, उपयोगकर्ता के अनुकूल स्ट्रिंग्स निकालता है, और प्रत्येक के बगल में एक `.content` फ़ाइल लिखता है, जिससे आप कैटलॉग में मैन्युअल रूप से कॉपी करने के बजाय एक diff की समीक्षा करते हैं।

पूर्ण स्वचालन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) बिल्ड समय पर यही काम करता है: प्रत्येक परिवर्तन पर कोड स्कैन करता है, शब्दकोश उत्पन्न करता है और HMR के साथ सिंक करता है।

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

<Question title="क्या Intlayer Solid Start में सर्वर-साइड रेंडरिंग (SSR) के साथ काम करता है?">

हाँ। SSR के दौरान सामग्री का समाधान किया जाता है, और चरण 16 प्रति लोकेल स्थिर HTML उत्पन्न करने के लिए प्रीरेंडर कॉन्फ़िगरेशन को कवर करता है।

</Question>

<Question title="क्या भाषा बदलने से पूरा ऐप फिर से रेंडर होता है?">

नहीं। सामग्री Solid सिग्नलों द्वारा संचालित होती है, इसलिए भाषा बदलने पर घटक ट्री को फिर से बनाए बिना केवल बदले हुए टेक्स्ट DOM नोड्स अपडेट होते हैं।

</Question>

<Question title="कैनोनिकल लिंक और hreflang टैग कैसे जोड़ें?">

`generateSitemap` या `getMultilingualUrls` का उपयोग करके साइटमैप में, जो सर्च इंजनों के लिए `xhtml:link` विकल्प बनाते हैं।

</Question>

<Question title="स्थानीयकृत मार्गों पर 404 पृष्ठों को कैसे संभालें?">

चरण 14 इसे समझाता है। `validatePrefix` जाँचता है कि क्या URL में भाषा खंड मान्य है, अज्ञात मार्गों के लिए 404 स्थिति लौटाता है।

</Question>

<Question title="क्या मुझे URL में लोकेल शामिल करना अनिवार्य है?">

नहीं। `routing.mode` सेटिंग `"prefix-no-default"` (डिफ़ॉल्ट), `"prefix-all"`, `"no-prefix"`, और `"search-params"` स्वीकार करती है।

</Question>

<Question title="सर्वर फ़ंक्शन में लोकेल कैसे प्राप्त करें?">

Solid Start सर्वर फ़ंक्शंस में, `getIntlayer` फ़ंक्शन अनुरोध संदर्भ से स्वचालित रूप से लोकेल का समाधान करता है।

</Question>

<Question title="मैं ऐप को AI के साथ स्वचालित रूप से कैसे अनुवाद करूँ?">

`npx intlayer fill` चलाएं। यह कमांड आपके चुने हुए LLM का उपयोग करके आपके अपने प्रदाता और API कुंजी के साथ लापता अनुवादों को भरता है, और `--git-diff` बदली गई फ़ाइलों तक संचालन को सीमित करता है। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

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
