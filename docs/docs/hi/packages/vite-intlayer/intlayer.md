---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite प्लगइन दस्तावेज़ीकरण | vite-intlayer
description: vite-intlayer पैकेज के लिए intlayer प्लगइन का उपयोग कैसे करें देखें
keywords:
  - intlayer
  - vite
  - प्लगइन
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "प्रारम्भिक डॉक्यूमेंटेशन"
author: aymericzip
---

# intlayer Vite प्लगइन दस्तावेज़ीकरण

`intlayer` Vite प्लगइन Intlayer कॉन्फ़िगरेशन को बिल्ड प्रक्रिया में एकीकृत करता है। यह डिक्शनरी एलियस को हैंडल करता है, डेवलपमेंट मोड में डिक्शनरी वॉचर शुरू करता है, और बिल्ड के लिए डिक्शनरी तैयार करता है।

## उपयोग

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
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` `GetConfigurationOptions` को विस्तृत करता है (देखें `@intlayer/config`) निम्नलिखित अतिरिक्त फ़ील्ड के साथ:

| विकल्प          | प्रकार                          | डिफ़ॉल्ट    | विवरण                                                                                                                                                     |
| --------------- | ------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | compat-adapter packages के लिए अतिरिक्त caller पैटर्न (उदाहरण के लिए `@intlayer/react-i18next`)। बिल्ड समय पर field-usage विश्लेषक को पास किया गया।       |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | bundled locale-routing proxy को आगे बढ़ाए गए विकल्प। विशिष्ट पाथ (उदाहरण के लिए API routes) को locale routing से बाहर करने के लिए `ignore` का उपयोग करें। |

अन्य सभी विकल्प (`override`, `configFile`, …) सीधे `getConfiguration()` को आगे बढ़ाए जाते हैं।

### उदाहरण

#### locale routing से API routes को ignore करें

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

#### कस्टम config फ़ाइल पथ के साथ

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### compat-adapter callers के साथ

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## प्लगइन क्या करता है

### 1. Dictionary preparation

बिल्ड शुरू होने से पहले (और dev में एक घंटे में एक बार), `intlayer` सभी `.content.ts` फ़ाइलों को `.intlayer/` में संग्रहीत अनुकूलित JSON शब्दकोशों में संकलित करने के लिए `prepareIntlayer` को कॉल करता है।

### 2. Module aliases

प्लगइन Vite resolve aliases जोड़ता है ताकि `import { myDict } from 'intlayer/dictionaries/my-dict'` डिस्क पर compiled JSON फ़ाइल को resolve करे। SSR builds `ssr.noExternal` का उपयोग करते हैं ताकि सभी `@intlayer/*` packages को aliases के साथ bundled किया जाए।

### 3. Dev-server watcher

विकास मोड में एक `chokidar` watcher शुरू किया जाता है। जब कोई `.content.ts` फ़ाइल बदलती है तो dictionaries को फिर से compile किया जाता है और Vite का HMR browser को अपडेट प्रसारित करता है।

### 4. Bundled locale-routing proxy (v9+)

Intlayer v9 के बाद से `intlayerProxy` middleware को `intlayer()` के अंदर स्वचालित रूप से पंजीकृत किया जाता है। यह निम्नलिखित को संभालता है:

- URL prefix, cookies, और `Accept-Language` header से locale detection।
- 301 redirects जब detected locale वर्तमान URL से मेल नहीं खाता।
- Internal URL rewrites ताकि framework को सही `[locale]` route parameter दिखे।

Proxy को आपके Intlayer config में `routing.enableProxy` (डिफ़ॉल्ट `true`) द्वारा नियंत्रित किया जाता है। इसे पूरी तरह से अक्षम करने के लिए:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

एक अलग `intlayerProxy()` कॉल के बिना proxy के व्यवहार को कस्टमाइज़ करने के लिए, मुख्य plugin को `proxy` विकल्प pass करें:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

पूर्ण routing व्यवहार reference के लिए [intlayerProxy documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerProxy.md) देखें।

### 5. Bundled compiler (v9+)

जब `compiler.enabled` `true` **और** `compiler.output` आपकी Intlayer कॉन्फ़िग में सेट हो, तो `intlayer()` स्वचालित रूप से `intlayerCompiler` को रजिस्टर करता है। कंपाइलर component फ़ाइलों के अंदर सीधे लिखी गई inline content declarations को निकालता है और transform time पर उन्हें dictionaries में लिखता है। [intlayerCompiler documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerCompiler.md) देखें।

### 6. बिल्ड ऑप्टिमाइज़ेशन

एक प्रोडक्शन बिल्ड के दौरान प्लगइन निम्नलिखित जोड़ता है:

- **intlayerOptimize** – Babel transform जो `useIntlayer('key')` → `useDictionary(hash)` को फिर से लिखता है और सीधे JSON आयात को इंजेक्ट करता है।
- **intlayerPrune** – डिक्शनरी JSON से अप्रयुक्त कंटेंट फील्ड को हटाता है।
- **intlayerMinify** – डिक्शनरी JSON को कॉम्पैक्ट करता है और वैकल्पिक रूप से फील्ड नामों को बदलता है।

ये डेवलपमेंट मोड में निष्क्रिय हैं।

## Deprecated aliases

| Deprecated export | Replacement |
| ----------------- | ----------- |
| `intlayerPlugin`  | `intlayer`  |
| `intLayerPlugin`  | `intlayer`  |
