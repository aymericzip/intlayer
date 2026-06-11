---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: डोमेन-आधारित रूटिंग कैसे कॉन्फ़िगर करें?
description: डोमेन-आधारित रूटिंग को कॉन्फ़िगर करना सीखें।
keywords:
  - डोमेन
  - रूटिंग
  - intlayer
  - कॉन्फ़िगरेशन
  - मिडलवेयर
  - react-router
  - vue-router
  - next.js
  - vite
  - फ्रेमवर्क
slugs:
  - frequent-questions
  - domain-routing
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# मैं Intlayer के साथ `/[locale]/` पथों के बजाय **डोमेन-आधारित रूटिंग** कैसे कॉन्फ़िगर करूं?

## संक्षिप्त उत्तर

डोमेन-आधारित रूटिंग पथ-आधारित रूटिंग (`example.com/[locale]/`) की तुलना में सरल है क्योंकि आप सभी मिडलवेयर और रूटिंग कॉन्फ़िगरेशन को छोड़ सकते हैं। बस अपने ऐप को प्रत्येक भाषा डोमेन पर तैनात करें और प्रत्येक डोमेन के लिए एक पर्यावरण चर सेट करें।

## चरण-दर-चरण

1. **प्रत्येक डोमेन पर एक बार तैनात करें** (`example.com`, `exemple.fr`, `ejemplo.es`, …)।
2. प्रत्येक तैनाती के लिए, `LOCALE` (और सामान्य Intlayer पर्यावरण चर) को उस लोकेल पर सेट करें जिसे डोमेन सेवा देना चाहिए।
3. उस चर को अपने `intlayer.config.[ts|js]` में `defaultLocale` के रूप में संदर्भित करें।

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 डोमेन लोकेल निर्धारित करता है
  },
  // ... आपके कॉन्फ़िग का बाकी हिस्सा
};

export default config;
```

बस इतना ही-यह **Next.js**, **Vite + React**, **Vite + Vue**, आदि के लिए समान रूप से काम करता है।

## अगर हर डोमेन एक ही तैनाती को हिट करता है तो क्या होगा?

यदि सभी डोमेन एक ही एप्लिकेशन बंडल की ओर इशारा करते हैं, तो आपको रनटाइम पर होस्ट का पता लगाना होगा और प्रदाता के माध्यम से लोकेल को मैन्युअल रूप से पास करना होगा।

### Next.js के लिए

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname(); // यदि locale नहीं है तो होस्टनाम से लोकेल प्राप्त करें
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Vue के लिए

```ts
ts;
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname()); // getLocaleFromHostname() को अपनी खुद की खोज लॉजिक से बदलें
app.mount("#app");
```

`getLocaleFromHostname()` को अपनी खुद की खोज लॉजिक से बदलें।

## अपने लोकेल स्विचर को अपडेट करें

डोमेन-आधारित रूटिंग का उपयोग करते समय, भाषाओं को बदलना दूसरे डोमेन पर नेविगेट करने का मतलब होता है:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## डोमेन-आधारित रूटिंग के लाभ

1. **सरल कॉन्फ़िगरेशन**: `intlayerProxy`, `generateStaticParams`, `react-router`, या `vue-router` को कॉन्फ़िगर करने की आवश्यकता नहीं
2. **बेहतर SEO**: प्रत्येक भाषा का अपना डोमेन होता है
3. **साफ-सुथरे URL**: पथ में कोई लोकेल उपसर्ग नहीं होता
4. **आसान रखरखाव**: प्रत्येक भाषा की तैनाती स्वतंत्र होती है
