---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: কাস্টম ডোমেইন (Custom Domains)
description: ডেডিকেটেড হোস্টনেম থেকে বিভিন্ন লোকেল (locales) পরিবেশন করার জন্য Intlayer-এ ডোমেইন-ভিত্তিক লোকেল রাউটিং কীভাবে কনফিগার করবেন তা শিখুন।
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
    changes: "routing.domains কনফিগারেশনের মাধ্যমে ডোমেইন-ভিত্তিক লোকেল রাউটিং যোগ করা হয়েছে।"
---

# কাস্টম ডোমেইন (Custom Domains)

Intlayer ডোমেইন-ভিত্তিক লোকেল রাউটিং সমর্থন করে, যা আপনাকে ডেডিকেটেড হোস্টনেম থেকে নির্দিষ্ট লোকেল পরিবেশন করতে দেয়। উদাহরণস্বরূপ, চীনা দর্শকদের `intlayer.org/zh`-এর পরিবর্তে `intlayer.zh`-এ নির্দেশিত করা যেতে পারে।

## এটি কীভাবে কাজ করে

`routing`-এ `domains` ম্যাপ প্রতিটি লোকেলকে একটি হোস্টনেমের সাথে যুক্ত করে। Intlayer এই ম্যাপটি দুটি জায়গায় ব্যবহার করে:

১. **ইউআরএল জেনারেশন** (`getLocalizedUrl`): যখন টার্গেট লোকেল বর্তমান পৃষ্ঠার তুলনায় _আলাদা_ ডোমেইনে থাকে, তখন একটি পরম (absolute) ইউআরএল ফেরত দেওয়া হয় (যেমন `https://intlayer.zh/about`)। যখন উভয় ডোমেইন মিলে যায়, তখন একটি আপেক্ষিক (relative) ইউআরএল ফেরত দেওয়া হয় (যেমন `/fr/about`)।
২. **সার্ভার প্রক্সি** (Next.js এবং Vite): ইনকামিং অনুরোধগুলি যে ডোমেইনে এসেছে তার উপর ভিত্তি করে পুনঃনির্দেশিত বা পুনঃলিখিত হয়।

### এক্সক্লুসিভ বনাম শেয়ার্ড ডোমেইন (Exclusive vs. shared domains)

মূল পার্থক্য হল **এক্সক্লুসিভিটি (exclusivity)**:

- **এক্সক্লুসিভ ডোমেইন (Exclusive domain)** — শুধুমাত্র একটি লোকেল সেই হোস্টনেমে ম্যাপ করা হয় (যেমন `zh → intlayer.zh`)। ডোমেইন নিজেই লোকেলকে শনাক্ত করে, তাই পাথে (path) কোনো লোকেল উপসর্গ (prefix) যোগ করা হয় না। `https://intlayer.zh/about` চীনা কন্টেন্ট পরিবেশন করে।
- **শেয়ার্ড ডোমেইন (Shared domain)** — একাধিক লোকেল একই হোস্টনেমে ম্যাপ করা হয় (যেমন `en` এবং `fr` উভয়ই `intlayer.org`-এ ম্যাপ করা হয়)। সাধারণ উপসর্গ-ভিত্তিক রাউটিং প্রযোজ্য হয়। `intlayer.org/fr/about` ফরাসি কন্টেন্ট পরিবেশন করে।

## কনফিগারেশন

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
      // শেয়ার্ড ডোমেইন — en এবং fr intlayer.org-এ উপসর্গ রাউটিং ব্যবহার করে
      en: "intlayer.org",
      // এক্সক্লুসিভ ডোমেইন — zh-এর নিজস্ব হোস্টনেম রয়েছে, কোনো /zh/ উপসর্গের প্রয়োজন নেই
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

যে লোকেলগুলো `domains`-এ তালিকাভুক্ত নয়, সেগুলো ডোমেইন ওভাররাইড ছাড়াই মানক উপসর্গ রাউটিং ব্যবহার করা চালিয়ে যায়।

## ইউআরএল জেনারেশন (URL Generation)

`getLocalizedUrl` কলিং কনটেক্সটের উপর ভিত্তি করে স্বয়ংক্রিয়ভাবে সঠিক ইউআরএল প্রকার তৈরি করে।

### এক-ডোমেইন লোকেল (আপেক্ষিক ইউআরএল)

```ts
// বর্তমান পৃষ্ঠা: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (ডিফল্ট লোকেল, কোনো উপসর্গ নেই)
```

### ক্রস-ডোমেইন লোকেল (পরম ইউআরএল)

```ts
// বর্তমান পৃষ্ঠা: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (এক্সক্লুসিভ ডোমেইন, কোনো /zh/ উপসর্গ নেই)
```

### লোকেলে নিজস্ব ডোমেইন থেকে পরিবেশন করা

```ts
// বর্তমান পৃষ্ঠা: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (ইতিমধ্যেই সঠিক ডোমেইনে আছে — আপেক্ষিক ইউআরএল)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (intlayer.org-এ ফিরে ক্রস-ডোমেইন লিঙ্ক)
```

### বর্তমান ডোমেইন অটো-ডিটেকশন (Current domain auto-detection)

`currentDomain` ঐচ্ছিক। বাদ দিলে, `getLocalizedUrl` এটিকে এই ক্রমে সমাধান করে:

১. একটি পরম ইনপুট ইউআরএল-এর হোস্টনেম (যেমন `https://intlayer.org/about` → `intlayer.org`)।
২. ব্রাউজার পরিবেশে `window.location.hostname` ।
৩. যদি কোনোটিই উপলব্ধ না থাকে (সুস্পষ্ট বিকল্প ছাড়া এসএসআর), তবে একই-ডোমেইন লোকেলের জন্য একটি আপেক্ষিক ইউআরএল ফেরত দেওয়া হয় এবং কোনো পরম ইউআরএল তৈরি হয় না — এটি নিরাপদ ফলব্যাক।

```ts
// ব্রাউজার — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (উইন্ডো থেকে অটো-ডিটেক্টেড)

// থেকে একটি পরম ইউআরএল — ডোমেইন স্বয়ংক্রিয়ভাবে ডিটেক্ট হয়েছে
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### ডোমেইন সহ `getMultilingualUrls`

`getMultilingualUrls` প্রতিটি লোকেলের জন্য `getLocalizedUrl` কল করে, তাই এটি কলকারীর ডোমেইনের উপর ভিত্তি করে আপেক্ষিক এবং পরম ইউআরএল-এর মিশ্রণ তৈরি করে:

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

এই পরম ইউআরএলগুলো এসইও-র জন্য `<link rel="alternate" hreflang="...">` ট্যাগে ব্যবহার করার জন্য প্রস্তুত।

## প্রক্সি আচরণ (Proxy Behaviour)

### Next.js

`intlayerProxy` মিডলওয়্যার ডোমেইন রাউটিং স্বয়ংক্রিয়ভাবে পরিচালনা করে। এটি আপনার `middleware.ts`-এ যোগ করুন:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**পুনঃনির্দেশ (Redirect)** — অনুরোধ একটি নির্দিষ্ট লোকেল উপসর্গের জন্য ভুল ডোমেইনে এসেছে:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**পুনঃলিখন (Rewrite)** — অনুরোধ উপসর্গ ছাড়াই লোকেলের এক্সক্লুসিভ ডোমেইনে এসেছে:

```
GET intlayer.zh/about
→ /zh/about-এ পুনঃলিখন (শুধুমাত্র অভ্যন্তরীণ Next.js রাউটিং, ইউআরএল পরিষ্কার থাকে)
```

### Vite

`intlayerProxy` Vite প্লাগইন বিকাশের সময় একই যুক্তি প্রয়োগ করে:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **দ্রষ্টব্য**: স্থানীয় বিকাশে আপনি সাধারণত `localhost`-এ থাকেন, তাই ক্রস-ডোমেইন পুনঃনির্দেশগুলি অন্য স্থানীয় পোর্টের পরিবর্তে লাইভ ডোমেইনগুলোর দিকে নির্দেশ করবে। যদি আপনার স্থানীয়ভাবে মাল্টি-ডোমেইন রাউটিং পরীক্ষা করার প্রয়োজন হয়, তবে hosts-ফাইল ওভাররাইড (যেমন `127.0.0.1 intlayer.zh`) বা একটি রিভার্স প্রক্সি ব্যবহার করুন।

## লোকেল সুইচার (Locale Switcher)

`next-intlayer` থেকে `useLocale` হুক ডোমেইন-সচেতন নেভিগেশন স্বয়ংক্রিয়ভাবে পরিচালনা করে। যখন একজন ব্যবহারকারী অন্য ডোমেইনে একটি লোকেলে স্যুইচ করেন, তখন হুক ক্লায়েন্ট-সাইড রাউটার পুশের পরিবর্তে পূর্ণ-পৃষ্ঠা নেভিগেশন (`window.location.href`) করে, কারণ Next.js রাউটার উৎসগুলো (origins) অতিক্রম করতে পারে না।

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

কোনো অতিরিক্ত কনফিগারেশনের প্রয়োজন নেই — `useLocale` অভ্যন্তরীণভাবে `window.location.hostname` শনাক্ত করে এবং `router.replace` (একই ডোমেইন) এবং `window.location.href` (ডোমেইন-জুড়ে)-এর মধ্যে সিদ্ধান্ত নেয়।

## এসইও: `hreflang` বিকল্প লিঙ্ক (Alternate Links)

ডোমেইন-ভিত্তিক রাউটিং সাধারণত `hreflang`-এর সাথে সার্চ ইঞ্জিনকে প্রতিটি ভাষার জন্য কোন ইউআরএল ইনডেক্স করতে হবে তা বলতে ব্যবহার করা হয়। বিকল্প ইউআরএল-এর সম্পূর্ণ সেট তৈরি করতে `getMultilingualUrls` ব্যবহার করুন:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // যেমন "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

এটি তৈরি করে:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## মূল উপযোগিতা (Core Utilities)

| উপযোগিতা (Utility)                                | বর্ণনা                                                                                                     |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | আপেক্ষিক বা পরম ইউআরএল ফেরত দেয়, এটি টার্গেট লোকেল বর্তমান ডোমেইনে আছে কি না তার ওপর নির্ভর করে।          |
| `getMultilingualUrls(url, { currentDomain })`     | লোকেল-কীয়ড (locale-keyed) ম্যাপ ফেরত দেয়, যেখানে প্রয়োজন অনুযায়ী আপেক্ষিক এবং পরম ইউআরএল মিশ্রিত থাকে। |
| `getPrefix(locale, { domains })`                  | এক্সক্লুসিভ-ডোমেইন লোকেলের জন্য একটি খালি উপসর্গ ফেরত দেয়, অন্যথায় সাধারণ উপসর্গ।                        |
