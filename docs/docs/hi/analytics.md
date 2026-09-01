---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | सामग्री के प्रदर्शन को ट्रैक करें और A/B परीक्षण चलाएं
description: जानें कि @intlayer/analytics कैसे पेज/लोकेल व्यू और सामग्री के प्रदर्शन को ट्रैक करता है, और अपने Intlayer सामग्री पर A/B परीक्षण चलाने के लिए इसका उपयोग कैसे करें।
keywords:
  - Analytics (एनालिटिक्स)
  - A/B Testing (A/B परीक्षण)
  - Audience (दर्शक)
  - Internationalization (अंतर्राष्ट्रीयकरण)
  - Documentation (दस्तावेज़ीकरण)
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "`@intlayer/analytics` इंस्टॉल होने पर एनालिटिक्स डिफ़ॉल्ट रूप से सक्षम किया गया"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — @intlayer/analytics पैकेज, प्रोवाइडर/नोड-लेवल ट्रैकिंग, A/B परीक्षण, डैशबोर्ड"
author: aymericzip
---

# Intlayer Analytics दस्तावेज़ीकरण

`@intlayer/analytics` एक वैकल्पिक सहयोगी पैकेज है जो आपको बताता है कि आपके आगंतुकों को **वास्तव में कौन सी सामग्री दिखाई जा रही है** — कौन सा पृष्ठ, किस लोकेल में, और अनुवादित सामग्री का कौन सा विशिष्ट हिस्सा — ताकि आप अपने दर्शकों को समझ सकें और **सामग्री पर A/B परीक्षण चला सकें**।

## विषय-सूची (Table of Contents)

<TOC/>

---

## यह क्या ट्रैक करता है

`@intlayer/analytics` तीन प्रकार की अनाम घटनाओं को बैच में एकत्रित करता है:

| घटना (Event)       | कहाँ कैप्चर होता है                            | यह आपको क्या बताता है                                                                                                                                       |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | प्रोवाइडर स्तर (`IntlayerProvider`)            | प्रारंभिक लोड, मार्ग (route) परिवर्तन, या लोकेल स्विच पर एक सत्र (session) ने कौन सा पृष्ठ और लोकेल देखा।                                                   |
| `content_exposure` | नोड स्तर (`useIntlayer` / इंटरप्रेटर प्लगइन्स) | कौन सी डिक्शनरी कुंजी (dictionary key) / कुंजी पथ वास्तव में हल (resolved) और प्रदर्शित किया गया था — और यदि एक प्रयोग का हिस्सा है, तो कौन सा **वेरिएंट**। |
| `conversion`       | जहाँ भी आप `useConversion()` कॉल करते हैं      | एक लक्ष्य पूरा हुआ (साइनअप, क्लिक, खरीदारी...) जो उस A/B वेरिएंट को जिम्मेदार ठहराया गया है जिसके संपर्क में सत्र आया था।                                   |

घटनाएँ मेमोरी में एकत्रित की जाती हैं और **लगभग हर 20 सेकंड में एक एकल बैच अनुरोध** के रूप में भेजी जाती हैं — प्रत्येक कीस्ट्रोक या रेंडर पर कभी नहीं — इसलिए एनालिटिक्स कभी भी पहले रेंडर के समय को प्रभावित नहीं करता है या प्रति इंटरैक्शन एक अनुरोध नहीं जोड़ता है।

## यह सामग्री पर A/B परीक्षण को कैसे सशक्त बनाता है

Intlayer आपको पहले से ही सामग्री [वेरिएंट (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) घोषित करने की अनुमति देता है (उदाहरण के लिए `control` और `black_friday` वेरिएंट के साथ एक `hero-banner` डिक्शनरी)। `@intlayer/analytics` इस प्रक्रिया को पूरा करता है:

1. `getVariant(experimentKey, variants)` प्रत्येक अनाम सत्र को निश्चित रूप से एक वेरिएंट सौंपता है — यह सत्र आईडी और प्रयोग कुंजी का एक शुद्ध फ़ंक्शन (pure function) है, इसलिए यह असाइनमेंट **सत्र भर में स्थिर** रहता है और पहले रेंडर से पहले **सर्वर राउंड-ट्रिप** की आवश्यकता नहीं होती है (कोई झिलमिलाहट (flicker) नहीं, कोई लेआउट शिफ्ट नहीं)।
2. प्रत्येक `content_exposure` घटना उस `variant` को वहन करती है जो दिखाया गया था।
3. `useConversion()` आपको उस वेरिएंट में एक लक्ष्य (जैसे `"cta_click"`) को जिम्मेदार ठहराने (attribute) की अनुमति देता है।
4. डैशबोर्ड का प्रयोग परिणाम एंडपॉइंट सांख्यिकीय महत्व (ज़ेड-टेस्ट) सहित प्रति वेरिएंट रूपांतरण दरों (conversion rates) की तुलना करता है।

## इंस्टालेशन (Installation)

`@intlayer/analytics` हर फ्रेमवर्क पैकेज (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …) की एक **वैकल्पिक निर्भरता (optional dependency)** है, इसलिए अधिकांश प्रोजेक्ट्स में यह पहले से मौजूद होती है। यदि आपका सेटअप वैकल्पिक निर्भरताओं को छोड़ देता है (`npm install --no-optional`, …), तो इसे स्पष्ट रूप से इंस्टॉल करें:

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

एनालिटिक्स चालू करने के लिए पैकेज इंस्टॉल करना ही पर्याप्त है: `analytics.enabled` का डिफ़ॉल्ट `true` है, और जब पैकेज आपके प्रोजेक्ट में नहीं मिलता तो `@intlayer/config` इसे `false` कर देता है। यदि आप इसे स्थापित नहीं करते हैं, तो प्रत्येक एकीकरण बिंदु (integration point) एक नो-ऑप (no-op) के रूप में हल हो जाता है — नीचे [स्थापित न होने पर शून्य लागत](#स्थापित-न-होने-पर-शून्य-लागत) देखें।

## कॉन्फ़िगरेशन (Configuration)

शुरू करने के लिए एनालिटिक्स को किसी कॉन्फ़िगरेशन की आवश्यकता नहीं है: यह **डिफ़ॉल्ट रूप से सक्षम** है और अपने एंडपॉइंट तथा प्रोजेक्ट कुंजी के लिए **मौजूदा `editor` कॉन्फ़िगरेशन ब्लॉक का ही पुनः उपयोग करता है**।

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // एनालिटिक्स घटनाओं के लिए अंतर्ग्रहण (ingestion) एंडपॉइंट के रूप में भी उपयोग किया जाता है
    clientId: "your-client-id", // एनालिटिक्स प्रोजेक्ट कुंजी के रूप में भी उपयोग किया जाता है
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — वह बेस URL जहाँ एनालिटिक्स घटनाएँ भेजी जाती हैं (`POST {backendURL}/api/analytics/events`)।
- `editor.clientId` — प्रत्येक अंतर्ग्रहण घटना के लिए जिम्मेदार सार्वजनिक प्रोजेक्ट कुंजी। यह **सक्षम स्विच (enable switch)** के रूप में भी कार्य करता है: जब तक `clientId` कॉन्फ़िगर नहीं किया जाता है, तब तक एनालिटिक्स पूरी तरह से अक्षम (और ट्री-शेक (tree-shaken), नीचे देखें) रहता है।

यदि आप Intlayer को सेल्फ-होस्ट करते हैं, तो एनालिटिक्स स्वचालित रूप से आपके स्वयं के इंस्टेंस को इंगित करता है क्योंकि यह `editor.backendURL` साझा करता है।

### ब्राउज़र से API कॉल करना

वही टोकन बिना किसी क्रेडेंशियल के एक छोटे क्लाइंट को सहारा देता है, ताकि एक स्टैटिक साइट या SPA बिना किसी सर्वर, बिना सर्वर एक्शन, और बंडल में बिना किसी सीक्रेट के, रनटाइम पर अपने CMS कंटेंट को पढ़ सके:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

यह `editor.clientId` के आधार पर स्वयं को प्रमाणित करता है: एक्सचेंज, कैशिंग और नवीनीकरण आंतरिक रूप से संभाला जाता है। स्कोप यह सीमित करते हैं कि यह किस तक पहुँच सकता है: प्रकाशित डिक्शनरी कंटेंट और एनालिटिक्स इनजेशन। इसके अलावा कुछ भी (डिक्शनरी पुश करना, प्रोजेक्ट पढ़ना, AI क्रेडिट खर्च करना) एक वास्तविक क्रेडेंशियल की आवश्यकता है, और इसलिए एक सर्वर या साइन-इन किए गए उपयोगकर्ता की।

### ऑप्ट-आउट कैसे करें

वैकल्पिक `analytics` ब्लॉक संग्रहण को समायोजित करता है — या बंद कर देता है:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // डिफ़ॉल्ट: true — संपूर्ण इंटीग्रेशन को बंडल से बाहर कर देता है
    flushInterval: 20_000, // दो बैच फ़्लश के बीच मिलीसेकंड
    sampleRate: 1, // रिकॉर्ड की जाने वाली सत्रों का अंश, 0 (कोई नहीं) से 1 (सभी) तक
  },
};

export default config;
```

`@intlayer/analytics` को अनइंस्टॉल करने का प्रभाव `enabled: false` के समान ही है। पूरी फ़ील्ड सूची के लिए [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## उपयोग (Usage)

### स्वचालित प्रोवाइडर-स्तर ट्रैकिंग (Automatic provider-level tracking)

कोड में कोई परिवर्तन आवश्यक नहीं है। एक बार जब `@intlayer/analytics` स्थापित हो जाता है और `editor.clientId` कॉन्फ़िगर हो जाता है, तो `IntlayerProvider` स्वचालित रूप से:

- माउंट होने पर एनालिटिक्स क्लाइंट को इनिशियलाइज़ करता है,
- प्रारंभिक लोड पर एक `page_view` रिकॉर्ड करता है,
- हर लोकेल परिवर्तन पर एक `page_view` रिकॉर्ड करता है,
- ~20 सेकंड का फ्लश लूप शुरू करता है और अनमाउंट/टैब बंद होने पर किसी भी शेष घटनाओं को फ्लश करता है (`navigator.sendBeacon` के माध्यम से, `fetch(..., { keepalive: true })` पर फ़ॉलबैक करते हुए)।

एंट्री पॉइंट हर फ्रेमवर्क में अलग होता है, लेकिन हर मामले में यह वही जगह है जिसे आप पहले से ही Intlayer सेट करने के लिए उपयोग कर रहे हैं, इसलिए जोड़ने के लिए कुछ भी अतिरिक्त नहीं है:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` आंतरिक रूप से एनालिटिक्स प्रोवाइडर को माउंट करता है।

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer`, React के `IntlayerProvider` को फिर से एक्सपोर्ट करता है, इसलिए एनालिटिक्स भी उसी तरह जुड़ता है।

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `intlayer` प्लगइन रूट कंपोनेंट के लाइफसाइकल में एनालिटिक्स हुक्स को रजिस्टर करता है।

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > Nuxt के साथ, `nuxt-intlayer` आपके लिए प्लगइन इंस्टॉल कर देता है — कुछ भी करने की आवश्यकता नहीं है।

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` उस कंपोनेंट से एनालिटिक्स शुरू करता है जो Intlayer को सेट करता है।

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider` आंतरिक रूप से एनालिटिक्स प्रोवाइडर को माउंट करता है।

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider` एनालिटिक्स प्रोवाइडर को लेज़ी (lazy) तरीके से माउंट करता है, ताकि यह चंक क्रिटिकल पाथ से बाहर रहे।

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()` में पहले से ही `provideIntlayerAnalytics()` शामिल है।

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > `provideIntlayerAnalytics()` का अकेले उपयोग केवल तभी करें जब आप प्रोवाइडर्स को अलग-अलग प्रबंधित करते हों।

  </Tab>
</Tabs>

### स्वचालित नोड-स्तर ट्रैकिंग (Automatic node-level tracking)

हर बार जब `useIntlayer` प्रदर्शन के लिए सामग्री के एक टुकड़े को हल करता है, तो इंटरप्रेटर उस सटीक `dictionaryKey` + कुंजी पथ + लोकेल के लिए एक `content_exposure` घटना की रिपोर्ट करता है — फिर से, कोई कोड परिवर्तन आवश्यक नहीं है। फ्लश विंडो (लगभग 20 सेकंड) के भीतर एक ही नोड के दोहराए गए एक्सपोज़र को `count` के साथ एक ही घटना में मिला दिया जाता है (coalesced), इसलिए 50 बार फिर से रेंडर होने वाली सूची 50 घटनाएँ नहीं भेजती है।

### A/B परीक्षण के लिए रूपांतरण ट्रैक करना (Tracking conversions for A/B tests)

उस वेरिएंट को लक्ष्य (goal) सौंपने के लिए `useConversion()` का उपयोग करें जिसे एक सत्र (session) ने देखा था:

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "react-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          शुरू करें (Get started)
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          शुरू करें (Get started)
        </button>
      );
    };
    ```

    > `useConversion` एक क्लाइंट हुक है: कंपोनेंट को `"use client"` से चिह्नित करें।

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        शुरू करें (Get started)
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      शुरू करें (Get started)
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          शुरू करें (Get started)
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          शुरू करें (Get started)
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">शुरू करें (Get started)</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### क्लाइंट-साइड वेरिएंट को हल करना (Resolving a variant client-side)

`useExperiment()` सत्र को एक वेरिएंट सौंपता है और उस एक्सपोज़र को रिकॉर्ड करता है जो रूपांतरण दर का हर (denominator) बनता है। वेरिएंट पर निर्भर सबट्री को केवल तभी दिखाएँ जब `isAssigned` सत्य हो, ताकि असाइनमेंट तय होने से पहले किसी आगंतुक को कंट्रोल का पल भर के लिए दिखना न हो:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` एक सामान्य स्ट्रिंग है।

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` एक सामान्य स्ट्रिंग है। असाइनमेंट ब्राउज़र में होता है, इसलिए कंपोनेंट को एक क्लाइंट कंपोनेंट होना चाहिए।

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` और `isAssigned`, `Ref` हैं।

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` और `isAssigned`, स्टोर (store) हैं: इन्हें `$` प्रीफ़िक्स के साथ पढ़ें।

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` एक सामान्य स्ट्रिंग है।

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` और `isAssigned`, `Accessor` हैं: मान पढ़ने के लिए इन्हें कॉल करें।

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` और `isAssigned`, `Signal` हैं: मान पढ़ने के लिए इन्हें कॉल करें।

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

Weights वैकल्पिक हैं — विभाजन को तिरछा करने के लिए प्रति वेरिएंट एक पास करें, उदाहरण के लिए `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`।

फिर चाइल्ड मिलान करने वाली डिक्शनरी के [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/variants.md) को पढ़ता है:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> **चाइल्ड** कंपोनेंट में वेरिएंट को पढ़ना ही इसे React के बाहर काम करने योग्य बनाता है: Vue, Svelte, Solid और Angular में, `useIntlayer` को दिया गया सेलेक्टर कंपोनेंट सेटअप के समय कैप्चर होता है, इसलिए पढ़ना ऐसे कंपोनेंट में होना चाहिए जो वेरिएंट ज्ञात होने के बाद ही माउंट होता है।

यदि प्रयोग एक ही डिक्शनरी के बजाय पूरे पेज को कवर करता है, तो इसके बजाय वेरिएंट को प्रोवाइडर पर होइस्ट करें — देखें [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/variants.md#ambient-variant)। नीचे दिया गया प्रत्येक `useIntlayer` फिर बिना किसी कॉल-साइट परिवर्तन के इसके विरुद्ध हल होता है।

यदि आपको किसी कंपोनेंट के बाहर रॉ असाइनमेंट की आवश्यकता है, तो सीधे क्लाइंट का उपयोग करें:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` केवल असाइन करता है — यह एक्सपोज़र को रिकॉर्ड नहीं करता है। इसके बजाय `useExperiment()` का उपयोग करें, अन्यथा रूपांतरण दर का कोई हर नहीं होगा।

## गोपनीयता और प्रदर्शन (Privacy & performance)

- **डिज़ाइन द्वारा अनाम (Anonymous by design)**: सत्र (sessions) एक घूर्णन आईडी (rotating id) द्वारा पहचाने जाते हैं; बैकएंड कभी भी केवल उस आईडी का **SHA-256 हैश** संग्रहीत करता है — कच्चा आईडी (raw id) कभी नहीं, और आईपी (IP) पता कभी नहीं।
- **स्थान अनुमानित है (Location is coarse)**: केवल एक देश कोड, जिसे CDN जियोलोकेशन हेडर (`cf-ipcountry`, `x-vercel-ip-country`, ...) से प्राप्त किया जाता है — कोई IP पढ़ा या संग्रहीत नहीं किया जाता है।
- **URL खोज मापदंडों (search params) को बाहर करते हैं** डिफ़ॉल्ट रूप से, इसलिए क्वेरी स्ट्रिंग कभी भी कैप्चर नहीं की जाती हैं।
- **सैंपलिंग (Sampling)**: `sampleRate` आपको उच्च-ट्रैफ़िक ऐप्स पर सामग्री-एक्सपोज़र घटनाओं का केवल एक अंश (fraction) रखने की अनुमति देता है।
- **बैचिंग (Batched)**: लगभग हर 20 सेकंड में एक अनुरोध (`flushInterval`), या यदि बफ़र भर जाता है तो पहले (`maxBufferSize`) — प्रति घटना कभी भी एक अनुरोध नहीं।

### स्थापित न होने पर शून्य लागत (Zero-cost when not installed)

`@intlayer/analytics` पूरी तरह से उसी वैकल्पिक-निर्भरता पैटर्न का पालन करता है जैसा कि `@intlayer/editor`:

- प्रत्येक एकीकरण बिंदु पैकेज को **`try/catch` में लिपटे गतिशील (dynamic) `import()`** के माध्यम से लोड करता है — एक ऐप जो कभी भी `@intlayer/analytics` स्थापित नहीं करता है वह बंडल-आकार या रनटाइम लागत का भुगतान नहीं करता है, और कभी कोई त्रुटि नहीं देखता है;
- एक कंपाइल-टाइम एनवायरनमेंट वेरिएबल (`INTLAYER_ANALYTICS_ENABLED`), जिसे `@intlayer/config` तब स्वतः `'false'` कर देता है जब पैकेज इंस्टॉल न हो, `analytics.enabled` `false` हो, या `editor.clientId` कॉन्फ़िगर न हो — जिससे बंडलर संपूर्ण इंटीग्रेशन को **डेड कोड के रूप में हटा (dead-code-eliminate)** सकते हैं;
- एनालिटिक्स Intlayer संपादक/CMS पूर्वावलोकन (preview) iframe के अंदर अक्षम है, इसलिए संपादक सत्रों को कभी भी वास्तविक ट्रैफ़िक के रूप में नहीं गिना जाता है।

## डैशबोर्ड: एनालिटिक्स पृष्ठ (Dashboard: Analytics page)

एक बार जब आपका प्रोजेक्ट घटनाओं को एकत्र कर लेता है, तो [Intlayer डैशबोर्ड](https://app.intlayer.org/analytics) में **Analytics** पृष्ठ (प्रोजेक्ट का चयन करने के बाद साइडबार में दिखाई देता है) दिखाता है:

- **सक्रिय उपयोगकर्ता (Active users)** — चयनित रोलिंग विंडो (7 / 30 / 90 दिन) में विशिष्ट आगंतुक (distinct visitors)।
- **आज के उपयोगकर्ता** और **पिछले 7 दिनों में उपयोगकर्ता**।
- चयनित विंडो के दौरान **पेज व्यू (Page views)**।
- दैनिक विशिष्ट आगंतुकों का **विकास ग्राफ (Evolution graph)**।
- **लोकेल्स (Locales)** और **स्थान (Location)** ब्रेकडाउन टैब, जो आपके दर्शकों को लोकेल और देश के अनुसार रैंक करते हैं।

## बैकएंड API संदर्भ (Backend API reference)

सभी रीड एंडपॉइंट्स (read endpoints) के लिए प्रमाणीकरण की आवश्यकता होती है; अंतर्ग्रहण (ingestion) सार्वजनिक है और बॉडी (body) में `clientId` द्वारा जिम्मेदार ठहराया जाता है।

| विधि (Method) | एंडपॉइंट (Endpoint)                         | विवरण (Description)                                                                 |
| ------------- | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| `POST`        | `/api/analytics/events`                     | घटनाओं का एक बैच अंतर्ग्रहण करें (सार्वजनिक, बॉडी में `clientId` द्वारा जिम्मेदार)। |
| `GET`         | `/api/analytics/overview`                   | प्रमाणित प्रोजेक्ट के लिए पृष्ठ/लोकेल का कुल योग।                                   |
| `GET`         | `/api/analytics/audience?days=30`           | विशिष्ट आगंतुक, पेज व्यू, दैनिक श्रृंखला, लोकेल + देश ब्रेकडाउन।                    |
| `GET`         | `/api/analytics/content-stats`              | प्रति-सामग्री एक्सपोज़र का कुल योग, डिक्शनरी कुंजी / पथ / लोकेल द्वारा समूहीकृत।    |
| `GET`         | `/api/analytics/experiments/:experimentKey` | A/B प्रयोग के लिए प्रति-वेरिएंट रूपांतरण दर और सांख्यिकीय महत्व।                    |

आप इन्हें [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के साथ प्रोग्रामेटिक रूप से भी कॉल कर सकते हैं:

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

> **केवल सर्वर-साइड।** `createIntlayerCMS()`, `clientId` + `clientSecret` के साथ प्रमाणित होता है, और सीक्रेट कभी भी ब्राउज़र में उपलब्ध नहीं होता है: यह स्निपेट वहाँ चलने पर अप्रमाणित अनुरोध जारी करेगा। इसे रूट हैंडलर, सर्वर एक्शन, या स्क्रिप्ट में ही रखें।

## उपयोगी कड़ियाँ (Useful links)

- [डायनामिक डिक्शनरीज़ - कलेक्शंस और वेरिएंट्स (Dynamic Dictionaries)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)
- [Intlayer विज़ुअल एडिटर (Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
- [कॉन्फ़िगरेशन संदर्भ (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
- [सेल्फ-होस्टिंग गाइड (Self-Hosting Guide)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md)
