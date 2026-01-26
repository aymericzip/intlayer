---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: कस्टम URL रीराइट्स
description: यह जानें कि Intlayer में लोकल-विशिष्ट पथ निर्धारित करने के लिए कस्टम URL रीराइट्स को कैसे कॉन्फ़िगर और उपयोग करें।
keywords:
  - कस्टम URL रीराइट्स
  - Routing
  - Internationalization
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: फ़्रेमवर्क-विशिष्ट फॉर्मेटर्स और useRewriteURL हुक का उपयोग करके केंद्रीकृत URL रीराइट्स लागू करें।
---

# कस्टम URL रीराइट्स का कार्यान्वयन

Intlayer कस्टम URL रीराइट्स को सपोर्ट करता है, जिससे आप मानक `/locale/path` संरचना से भिन्न लोकल-विशिष्ट पथ परिभाषित कर सकते हैं। इससे अंग्रेज़ी के लिए `/about` और फ्रेंच के लिए `/a-propos` जैसे URL संभव होते हैं, जबकि आंतरिक एप्लिकेशन लॉजिक canonical बना रहता है।

## कॉन्फ़िगरेशन

कस्टम रीव्राइट्स को आपके `intlayer.config.ts` फ़ाइल के `routing` सेक्शन में फ्रेमवर्क-विशिष्ट फ़ॉर्मैटर्स का उपयोग करके कॉन्फ़िगर किया जाता है। ये फ़ॉर्मैटर्स आपके पसंदीदा router के लिए सही सिंटैक्स प्रदान करते हैं।

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // अन्य कॉन्फ़िगरेशन
      routing: {
        mode: "prefix-no-default",
        rewrite: nextjsRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="React Router" value="reactrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { reactRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: reactRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="TanStack राउटर" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (अन्य कॉन्फ़िगरेशन)
      routing: {
        mode: "prefix-all",
        rewrite: tanstackRouterRewrite({
          "/$locale/about": {
            fr: "/$locale/a-propos",
            es: "/$locale/acerca-de",
          },
          "/$locale/products/$id": {
            fr: "/$locale/produits/$id",
            es: "/$locale/productos/$id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Vue राउटर" value="vuerouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { vueRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: vueRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="SvelteKit" value="sveltekit">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { svelteKitRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // और बाकी कॉन्फ़िगरेशन
      routing: {
        mode: "prefix-all",
        rewrite: svelteKitRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Solid Router" value="solidrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { solidRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // और बाकी कॉन्फ़िगरेशन
      routing: {
        mode: "prefix-all",
        rewrite: solidRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Nuxt" value="nuxt">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nuxtRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: nuxtRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
</Tabs>

### उपलब्ध फ़ॉर्मेटर्स

Intlayer सभी लोकप्रिय फ्रेमवर्क्स के लिए फ़ॉर्मेटर्स प्रदान करता है:

- `nextjsRewrite`: Next.js App Router के लिए। `[slug]`, `[...slug]` (1+), और `[[...slug]]` (0+) का समर्थन करता है।
- `svelteKitRewrite`: SvelteKit के लिए। `[slug]`, `[...path]` (0+), और `[[optional]]` (0-1) का समर्थन करता है।
- `reactRouterRewrite`: React Router के लिए। `:slug` और `*` (0+) का समर्थन करता है।
- `vueRouterRewrite`: Vue Router 4 के लिए। `:slug`, `:slug?` (0-1), `:slug*` (0+), और `:slug+` (1+) का समर्थन करता है।
- `solidRouterRewrite`: Solid Router के लिए। `:slug` और `*slug` (0+) का समर्थन करता है।
- `tanstackRouterRewrite`: TanStack Router के लिए। `$slug` और `*` (0+) का समर्थन करता है।
- `nuxtRewrite`: Nuxt 3 के लिए। `[slug]` और `[...slug]` (0+) का समर्थन करता है।
- `viteRewrite`: किसी भी Vite-आधारित प्रोजेक्ट के लिए जेनरिक फ़ॉर्मैटर। Vite प्रॉक्सी के लिए सिंटैक्स को सामान्यीकृत करता है।

### उन्नत पैटर्न

Intlayer इन पैटर्नों को आंतरिक रूप से एकीकृत सिंटैक्स में सामान्यीकृत करता है, जिससे परिष्कृत पथ मिलान और जेनरेशन संभव होता है:

- **वैकल्पिक सेगमेंट**: `[[optional]]` (SvelteKit) या `:slug?` (Vue/React) समर्थित हैं।
- **Catch-all (शून्य या अधिक)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt), या `*` (React/TanStack) कई सेगमेंट से मेल खाने की अनुमति देते हैं।
- **अनिवार्य Catch-all (एक या अधिक)**: `[...slug]` (Next.js) या `:slug+` (Vue) सुनिश्चित करते हैं कि कम से कम एक सेगमेंट मौजूद हो।

## क्लाइंट-साइड URL सुधार: `useRewriteURL`

ब्राउज़र के एड्रेस बार में हमेशा "pretty" स्थानीयकृत URL दिखे यह सुनिश्चित करने के लिए, Intlayer `useRewriteURL` हुक प्रदान करता है। यह हुक जब कोई उपयोगकर्ता कैनोनिकल पाथ पर आता है तो `window.history.replaceState` का उपयोग करके चुपचाप URL अपडेट कर देता है।

### फ़्रेमवर्क्स में उपयोग

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      // स्वचालित रूप से /fr/about को /fr/a-propos में सही करता है
      useRewriteURL();
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // स्वचालित रूप से /fr/about को /fr/a-propos में सही करता है

      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="Vue" value="vue">
  
    ```vue
    <script setup>
    import { useRewriteURL } from "vue-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
  <Tab label="Solid" value="solid">
  
    ```tsx
    import { useRewriteURL } from "solid-intlayer";

    const Layout = (props) => {
      useRewriteURL();
      return <>{props.children}</>;
    };
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    ```svelte
    <script>
    import { useRewriteURL } from "svelte-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
</Tabs>

## राउटर एकीकरण और प्रॉक्सियाँ

Intlayer के सर्वर-साइड प्रॉक्सी (Vite और Next.js) SEO संगतता सुनिश्चित करने के लिए कस्टम रीराइट्स को स्वचालित रूप से संभालते हैं।

1. **Internal Rewrites**: जब कोई उपयोगकर्ता `/fr/a-propos` पर जाता है, प्रॉक्सी इसे आंतरिक रूप से `/fr/about` पर मैप कर देता है ताकि आपका फ्रेमवर्क सही रूट से मेल खा सके।
2. **Authoritative Redirects**: यदि कोई उपयोगकर्ता मैन्युअल रूप से `/fr/about` टाइप करता है, तो प्रॉक्सी `/fr/a-propos` पर 301/302 रीडायरेक्ट जारी करता है, जिससे सर्च इंजन केवल एक ही संस्करण को इंडेक्स करें।

### Next.js इंटीग्रेशन

Next.js इंटीग्रेशन पूरी तरह से `intlayerProxy` मिडलवेयर के माध्यम से संभाला जाता है।

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Vite एकीकरण

SolidJS, Vue, और Svelte के लिए, `intlayerProxy` Vite प्लगइन विकास के दौरान री-राइट्स को प्रबंधित करता है।

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## मुख्य विशेषताएँ

### 1. मल्टी-कॉन्टेक्स्ट रीराइट्स

प्रत्येक फ़ॉर्मेटर एक `RewriteObject` बनाता है जिसमें विभिन्न उपभोक्ताओं के लिए विशेष नियम होते हैं:

- `url`: क्लाइंट-साइड URL बनावट के लिए अनुकूलित (locale segments को हटा देता है)।
- `nextjs`: Next.js middleware के लिए `[locale]` को संरक्षित करता है।
- `vite`: Vite प्रॉक्सी के लिए `:locale` को संरक्षित करता है।

### 2. स्वचालित पैटर्न सामान्यीकरण

Intlayer आंतरिक रूप से सभी पैटर्न सिन्टैक्स को सामान्यीकृत करता है (उदा., `[param]` को `:param` में कन्वर्ट करना) ताकि मैचिंग स्रोत फ्रेमवर्क की परवाह किए बिना सुसंगत रहे।

### 3. SEO प्राधिकृत URL

कैनोनिकल पथों से pretty aliases पर रिडायरेक्ट्स लागू करके, Intlayer डुप्लिकेट कंटेंट समस्याओं को रोकता है और साइट की discoverability को बेहतर बनाता है।

## कोर यूटिलिटीज़

- `getLocalizedUrl(url, locale)`: रीराइट नियमों का पालन करते हुए एक स्थानीयकृत URL जनरेट करता है।
- `getCanonicalPath(path, locale)`: एक स्थानीयकृत URL को उसके आंतरिक कैनोनिकल पथ में रेज़ॉल्व करता है।
- `getRewritePath(pathname, locale)`: जाँचता है कि क्या किसी pathname को उसके prettier localized alias में सही करने की आवश्यकता है।
