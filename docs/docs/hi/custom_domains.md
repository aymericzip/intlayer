---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: कस्टम डोमेन (Custom Domains)
description: समर्पित होस्टनेम से विभिन्न लोकेल (locales) की सेवा के लिए Intlayer में डोमेन-आधारित लोकेल रूटिंग कॉन्फ़िगर करना सीखें।
keywords:
  - Custom Domains
  - Domain Routing
  - Routing
  - Internationalization
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "routing.domains कॉन्फ़िगरेशन के माध्यम से डोमेन-आधारित लोकेल रूटिंग जोड़ी गई।"
---

# कस्टम डोमेन (Custom Domains)

Intlayer डोमेन-आधारित लोकेल रूटिंग का समर्थन करता है, जिससे आप समर्पित होस्टनेम से विशिष्ट लोकेल की सेवा कर सकते हैं। उदाहरण के लिए, चीनी आगंतुकों को `intlayer.org/zh` के बजाय `intlayer.zh` पर निर्देशित किया जा सकता है।

## यह कैसे काम करता है

`routing` में `domains` मैप प्रत्येक लोकेल को एक होस्टनेम के साथ जोड़ता है। Intlayer इस मैप का उपयोग दो स्थानों पर करता है:

1. **URL जनरेशन** (`getLocalizedUrl`): जब लक्ष्य लोकेल वर्तमान पेज की तुलना में _अलग_ डोमेन पर होता है, तो एक पूर्ण (absolute) URL लौटाया जाता है (जैसे `https://intlayer.zh/about`)। जब दोनों डोमेन मैच करते हैं, तो एक सापेक्ष (relative) URL लौटाया जाता है (जैसे `/fr/about`)।
2. **सर्वर प्रॉक्सी** (Next.js और Vite): आने वाले अनुरोधों को उस डोमेन के आधार पर रीडायरेक्ट या रीराइट किया जाता है जिस पर वे आते हैं।

### विशेष बनाम साझा डोमेन (Exclusive vs. shared domains)

मुख्य अंतर **विशेषता (exclusivity)** है:

- **विशेष डोमेन (Exclusive domain)** — केवल एक लोकेल उस होस्टनेम पर मैप होता है (जैसे `zh → intlayer.zh`)। डोमेन स्वयं लोकेल की पहचान करता है, इसलिए पथ (path) में कोई लोकेल उपसर्ग (prefix) नहीं जोड़ा जाता है। `https://intlayer.zh/about` चीनी सामग्री परोसता है।
- **साझा डोमेन (Shared domain)** — एक ही होस्टनेम पर कई लोकेल मैप होते हैं (जैसे `en` और `fr` दोनों `intlayer.org` पर मैप होते हैं)। सामान्य उपसर्ग-आधारित रूटिंग लागू होती है। `intlayer.org/fr/about` फ्रांसीसी सामग्री परोसता है।

## कॉन्फ़िगरेशन

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // साझा डोमेन — en और fr intlayer.org पर उपसर्ग रूटिंग का उपयोग करते हैं
      en: "intlayer.org",
      // विशेष डोमेन — zh का अपना होस्टनेम है, किसी /zh/ उपसर्ग की आवश्यकता नहीं है
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

जो लोकेल `domains` में सूचीबद्ध नहीं हैं, वे बिना किसी डोमेन ओवरराइड के मानक उपसर्ग रूटिंग का उपयोग करना जारी रखते हैं।

## URL जनरेशन

`getLocalizedUrl` कॉल के संदर्भ के आधार पर स्वचालित रूप से सही URL प्रकार उत्पन्न करता है।

### समान-डोमेन लोकेल (relative URL)

```ts
// वर्तमान पेज: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (डिफ़ॉल्ट लोकेल, कोई उपसर्ग नहीं)
```

### क्रॉस-डोमेन लोकेल (absolute URL)

```ts
// वर्तमान पेज: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (विशेष डोमेन, कोई /zh/ उपसर्ग नहीं)
```

### लोकेल के अपने डोमेन से सेवा करना

```ts
// वर्तमान पेज: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (पहले से ही सही डोमेन पर है — सापेक्ष URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (intlayer.org पर वापस क्रॉस-डोमेन लिंक)
```

### वर्तमान डोमेन ऑटो-डिटेक्शन

`currentDomain` वैकल्पिक है। छोड़े जाने पर, `getLocalizedUrl` इसे इस क्रम में हल करता है:

1. पूर्ण इनपुट URL का होस्टनेम (जैसे `https://intlayer.org/about` → `intlayer.org`)।
2. ब्राउज़र वातावरण में `window.location.hostname` ।
3. यदि कोई भी उपलब्ध नहीं है (बिना स्पष्ट विकल्प के SSR), तो समान-डोमेन लोकेल के लिए एक सापेक्ष URL लौटाया जाता है और कोई पूर्ण URL उत्पन्न नहीं होता है — यह सुरक्षित फॉलबैक है।

```ts
// ब्राउज़र — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (विंडो से ऑटो-डिटेक्टेड)

// पूर्ण URL से — डोमेन स्वचालित रूप से डिटेक्ट हो गया
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### डोमेन के साथ `getMultilingualUrls`

`getMultilingualUrls` प्रत्येक लोकेल के लिए `getLocalizedUrl` कॉल करता है, इसलिए यह कॉलर के डोमेन के आधार पर सापेक्ष और पूर्ण URL का मिश्रण उत्पन्न करता है:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

ये पूर्ण URL SEO के लिए `<link rel="alternate" hreflang="...">` टैग में उपयोग करने के लिए तैयार हैं।

## प्रॉक्सी व्यवहार (Proxy Behaviour)

### Next.js

`intlayerProxy` मिडलवेयर डोमेन रूटिंग को स्वचालित रूप से संभालता है। इसे अपने `middleware.ts` में जोड़ें:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**रीडायरेक्ट (Redirect)** — अनुरोध किसी दिए गए लोकेल उपसर्ग के लिए गलत डोमेन पर आता है:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**रीराइट (Rewrite)** — अनुरोध बिना उपसर्ग के लोकेल के विशेष डोमेन पर आता है:

```
GET intlayer.zh/about
→ /zh/about पर रीराइट (केवल आंतरिक Next.js रूटिंग, URL साफ रहता है)
```

### Vite

`intlayerProxy` Vite प्लगइन विकास के दौरान समान तर्क लागू करता है:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **नोट**: स्थानीय विकास में आप आमतौर पर `localhost` पर होते हैं, इसलिए क्रॉस-डोमेन रीडायरेक्ट किसी अन्य स्थानीय पोर्ट के बजाय लाइव डोमेन की ओर इशारा करेंगे। यदि आपको स्थानीय रूप से मल्टी-डोमेन रूटिंग का परीक्षण करने की आवश्यकता है, तो hosts-फ़ाइल ओवरराइड (जैसे `127.0.0.1 intlayer.zh`) या रिवर्स प्रॉक्सी का उपयोग करें।

## लोकेल स्विचर (Locale Switcher)

`next-intlayer` का `useLocale` हुक डोमेन-जागरूक नेविगेशन को स्वचालित रूप से संभालता है। जब कोई उपयोगकर्ता किसी दूसरे डोमेन पर लोकेल पर स्विच करता है, तो हुक क्लाइंट-साइड राउटर पुश के बजाय पूर्ण-पेज नेविगेशन (`window.location.href`) करता है, क्योंकि Next.js राउटर ओरिजिन (origins) को पार नहीं कर सकता है।

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

किसी अतिरिक्त कॉन्फ़िगरेशन की आवश्यकता नहीं है — `useLocale` आंतरिक रूप से `window.location.hostname` का पता लगाता है और `router.replace` (समान डोमेन) और `window.location.href` (क्रॉस-डोमेन) के बीच निर्णय लेता है।

## SEO: `hreflang` वैकल्पिक लिंक

डोमेन-आधारित रूटिंग का उपयोग आमतौर पर `hreflang` के साथ खोज इंजन को यह बताने के लिए किया जाता है कि प्रत्येक भाषा के लिए किस URL को इंडेक्स करना है। वैकल्पिक URL का पूरा सेट उत्पन्न करने के लिए `getMultilingualUrls` का उपयोग करें:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // जैसे "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

यह उत्पन्न करता है:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## मुख्य उपयोगिताएँ (Core Utilities)

| उपयोगिता (Utility)                                | विवरण                                                                                                |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | सापेक्ष या पूर्ण URL लौटाता है, यह इस पर निर्भर करता है कि लक्ष्य लोकेल वर्तमान डोमेन पर है या नहीं। |
| `getMultilingualUrls(url, { currentDomain })`     | लोकेल-कीड (locale-keyed) मैप लौटाता है, जिसमें आवश्यकतानुसार सापेक्ष और पूर्ण URL मिश्रित होते हैं।  |
| `getPrefix(locale, { domains })`                  | विशेष-डोमेन लोकेल के लिए एक खाली उपसर्ग लौटाता है, अन्यथा सामान्य उपसर्ग।                            |
