---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerProxy Vite प्लगइन दस्तावेज़ | vite-intlayer
description: Vite dev/preview सर्वर और उत्पादन SSR के लिए लोकेल-रूटिंग मिडलवेयर। लोकेल डिटेक्शन, URL रीडायरेक्ट और आंतरिक पुनर्लेखन को संभालता है।
keywords:
  - intlayerProxy
  - vite
  - प्लगइन
  - मिडलवेयर
  - लोकेल
  - रूटिंग
  - अंतर्राष्ट्रीयकरण
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "configOptions को सिंगल ऑप्शंस ऑब्जेक्ट में मर्ज किया गया; प्रॉक्सी को intlayer() में बंडल किया गया"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` एक Vite प्लगइन है जो **हर वातावरण**: dev सर्वर, पूर्वावलोकन (preview) सर्वर और उत्पादन SSR (Nitro / TanStack Start) के लिए लोकेल-रूटिंग मिडलवेयर पंजीकृत करता है।

> **Intlayer v9 से** `intlayerProxy` स्वचालित रूप से मुख्य [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayer.md) प्लगइन के अंदर शामिल होता है और `routing.enableProxy: true` के माध्यम से डिफ़ॉल्ट रूप से सक्षम होता है। आपको इसे अलग से पंजीकृत करने की आवश्यकता केवल तब होती है जब आपको निम्न-स्तरीय नियंत्रण की आवश्यकता होती है या आप इसे मानक `intlayer()` सेटअप के बाहर उपयोग कर रहे हैं।

## उपयोग

### `intlayer()` के हिस्से के रूप में (अनुशंसित, v9+)

`intlayerProxy` को अलग से पंजीकृत करने के बजाय मुख्य प्लगइन में `proxy` विकल्प पास करें:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### स्टैंडअलोन (जब आवश्यकता हो)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## विकल्प

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

सभी विकल्प वैकल्पिक हैं और एक एकल ऑब्जेक्ट के रूप में पास किए जाते हैं:

| विकल्प          | प्रकार                              | विवरण                                                                                                                                                                                            |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ignore`        | `(req: IncomingMessage) => boolean` | विधेय (predicate) जो अनुरोधों को लोकेल रूटिंग से बाहर करता है। अनुरोध को छोड़ने के लिए `true` लौटाएं (जैसे API रूट, स्वास्थ्य जांच)।                                                             |
| `configOptions` | `GetConfigurationOptions`           | Intlayer कॉन्फ़िगरेशन ओवरराइड्स जो `getConfiguration()` को अग्रेषित किए जाते हैं। तब उपयोग करें जब आपको प्रॉक्सी को एक विशिष्ट कॉन्फ़िगरेशन फ़ाइल पढ़ने या मानों को ओवरराइड करने की आवश्यकता हो। |

### उदाहरण

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` एक स्टैंडअलोन, फ्रेमवर्क-अज्ञेयवादी Node.js `(req, res, next)` मिडलवेयर बनाता है जिसमें सभी लोकेल-रूटिंग लॉजिक शामिल होते हैं। यह उन वातावरणों में उपयोगी है जहां Vite प्लगइन API अनुपलब्ध है (जैसे एक सादा Node.js सर्वर या एक कस्टम Nitro मॉड्यूल)।

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### उत्पादन SSR (TanStack Start / h3 के माध्यम से Nitro)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## रूटिंग व्यवहार

मिडलवेयर `next-intlayer` मिडलवेयर से रूटिंग लॉजिक को मिरर करता है और सभी Intlayer रूटिंग मोड का समर्थन करता है।

### रूटिंग मोड

| मोड             | ब्राउज़र में दिखने वाला URL | व्यवहार                                                                                                                                  |
| --------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/hi/about`                 | डिफ़ॉल्ट। URL में लोकेल उपसर्ग। डिफ़ॉल्ट लोकेल बिना उपसर्ग वाले URL पर रीडायरेक्ट करता है जब तक कि `prefix-all` सक्रिय न हो।             |
| `prefix-all`    | `/en/about`, `/hi/about`    | सभी लोकेल — डिफ़ॉल्ट सहित — हमेशा उपसर्ग वाले होते हैं।                                                                                  |
| `no-prefix`     | `/about`                    | URL में कोई लोकेल नहीं। लोकेल केवल कुकीज़ में संग्रहीत होता है; URL पुनर्लेखन आंतरिक रूप से होता है।                                     |
| `search-params` | `/about?locale=hi`          | लोकेल को क्वेरी पैरामीटर के रूप में पास किया गया। गायब या बासी होने पर `locale` पैरामीटर को जोड़ने/अपडेट करने के लिए रीडायरेक्ट करता है। |

### डिटेक्शन प्राथमिकता

1. URL पथ उपसर्ग (जैसे `/hi/about` → `hi`)।
2. कुकी / localStorage मान (`intlayer-locale`)।
3. `Accept-Language` हेडर।
4. कॉन्फ़िगरेशन से `defaultLocale`।

### स्वचालित बाईपास

मिडलवेयर इन अनुरोधों को बिना लोकेल हैंडलिंग के हमेशा सीधे पास करता है:

- `ignore` विधेय से मेल खाने वाले अनुरोध।
- `/node_modules/**`
- `/@**` – Vite आंतरिक (`@vite/`, `@fs/`, `@id/`, आदि)।
- `/_**` – सर्वर आंतरिक (`__vite_ping`, `__manifest`, आदि)।
- अनुरोध जिनका पथ फ़ाइल एक्सटेंशन के साथ समाप्त होता है (स्थिर संपत्ति)। यदि एक स्थिर संपत्ति पथ (जैसे `/hi/logo.png`) पर एक लोकेल उपसर्ग मौजूद है, तो उसे हटा दिया जाता है ताकि फ़ाइल को सही ढंग से परोसा जा सके।

### डोमेन रूटिंग

जब आपके Intlayer कॉन्फ़िगरेशन में `routing.domains` कॉन्फ़िगर किया जाता है, तो मिडलवेयर क्रॉस-डोमेन लोकेल रूटिंग को संभालता है:

- `intlayer.org` पर `/zh/about` के लिए अनुरोध `https://intlayer.zh/about` पर रीडायरेक्ट किया जाता है जब `domains.zh = "intlayer.zh"` होता है।
- `intlayer.zh/about` के अनुरोध को आंतरिक रूप से `/zh/about` में फिर से लिखा जाता है ताकि `[locale]` रूट पैरामीटर आबाद हो जाए।

### रीडायरेक्ट लूप सुरक्षा

मिडलवेयर 2-सेकंड की स्लाइडिंग विंडो के भीतर प्रति `originalUrl → newUrl` जोड़ी रीडायरेक्ट गणनाओं को ट्रैक करता है। उस विंडो के भीतर 10 से अधिक रीडायरेक्ट हमेशा के लिए लूप करने के बजाय एक वर्णनात्मक त्रुटि के साथ `500` प्रतिक्रिया लौटाते हैं।

## Nitro / उत्पादन SSR (स्वचालित इंजेक्शन, v9+)

जब `intlayerProxy` को Vite प्लगइन के रूप में उपयोग किया जाता है, तो यह एक `.nitro` संपत्ति रखता है। `nitro/vite` बिल्ड प्लगइन इस संपत्ति को पढ़ता है और इसे `nitroConfig.modules` में धकेलता है, इसलिए `intlayerNitroHandler` स्वचालित रूप से एक Nitro सर्वर मिडलवेयर के रूप में पंजीकृत हो जाता है — उत्पादन SSR के लिए किसी मैन्युअल कॉन्फ़िगरेशन की आवश्यकता नहीं होती है।

Nitro हैंडलर h3 v2 के वेब फ़ेच API ईवेंट मॉडल (ना कि `fromNodeMiddleware`) का उपयोग करता है इसलिए यह सभी Nitro प्रीसेट के साथ संगत है: Node, Bun, Deno, edge runtimes।

## अप्रचलित उपनाम (Deprecated Aliases)

| अप्रचलित निर्यात           | प्रतिस्थापन     |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
