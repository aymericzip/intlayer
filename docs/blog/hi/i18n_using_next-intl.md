---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: next-intl का उपयोग करके अपने Next.js एप्लिकेशन को अंतरराष्ट्रीयकृत कैसे करें
description: next-intl के साथ i18n सेटअप करें: बहुभाषी Next.js ऐप्स के लिए सर्वोत्तम प्रथाएं और SEO सुझाव, जिसमें अंतरराष्ट्रीयकरण, सामग्री संगठन, और तकनीकी सेटअप शामिल हैं।
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: प्रारंभिक संस्करण
---

# 2025 में next-intl का उपयोग करके अपने Next.js एप्लिकेशन को अंतरराष्ट्रीयकृत कैसे करें

## सामग्री सूची

<TOC/>

## next-intl क्या है?

**next-intl** एक लोकप्रिय अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जो विशेष रूप से Next.js App Router के लिए डिज़ाइन की गई है। यह उत्कृष्ट TypeScript समर्थन और अंतर्निर्मित अनुकूलन के साथ बहुभाषी Next.js एप्लिकेशन बनाने का एक सहज तरीका प्रदान करती है।

> यदि आप चाहें, तो आप [next-i18next गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_next-i18next.md) को भी संदर्भित कर सकते हैं, या सीधे [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_next-intl.md) का उपयोग कर सकते हैं।

> तुलना देखें [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md) में।

## आपको जिन प्रथाओं का पालन करना चाहिए

कार्यान्वयन में जाने से पहले, यहां कुछ प्रथाएं हैं जिन्हें आपको पालन करना चाहिए:

- **HTML `lang` और `dir` एट्रिब्यूट सेट करें**  
  अपने लेआउट में, `getLocaleDirection(locale)` का उपयोग करके `dir` की गणना करें और उचित पहुंच और SEO के लिए `<html lang={locale} dir={dir}>` सेट करें।
- **संदेशों को namespace द्वारा विभाजित करें**  
  JSON फ़ाइलों को locale और namespace (जैसे, `common.json`, `about.json`) के अनुसार व्यवस्थित करें ताकि आप केवल आवश्यक चीज़ें लोड करें।
- **क्लाइंट पेलोड को न्यूनतम करें**  
  पृष्ठों पर, केवल आवश्यक namespaces को `NextIntlClientProvider` को भेजें (जैसे, `pick(messages, ['common', 'about'])`)।
- **स्थैतिक पृष्ठों को प्राथमिकता दें**  
  बेहतर प्रदर्शन और SEO के लिए जहां संभव हो स्थैतिक पृष्ठों का उपयोग करें।
- **सर्वर कंपोनेंट्स में I18n**
- **सर्वर कंपोनेंट्स**  
  पेज़ या सभी कंपोनेंट्स जो `client` के रूप में चिह्नित नहीं हैं, वे स्थैतिक होते हैं और बिल्ड समय पर प्री-रेंडर किए जा सकते हैं। इसलिए हमें अनुवाद फ़ंक्शंस को प्रॉप्स के रूप में उन्हें पास करना होगा।
- **TypeScript प्रकार सेट करें**  
  अपने locales के लिए ताकि आपके पूरे एप्लिकेशन में टाइप सुरक्षा सुनिश्चित हो सके।
- **रिडायरेक्शन के लिए प्रॉक्सी**  
  locale डिटेक्शन और रूटिंग को संभालने के लिए प्रॉक्सी का उपयोग करें और उपयोगकर्ता को उपयुक्त locale-प्रिफिक्स्ड URL पर रीडायरेक्ट करें।
- **अपने मेटाडेटा, साइटमैप, robots.txt का अंतरराष्ट्रीयकरण**  
  Next.js द्वारा प्रदान किए गए `generateMetadata` फ़ंक्शन का उपयोग करके अपने मेटाडेटा, साइटमैप, robots.txt का अंतरराष्ट्रीयकरण करें ताकि सभी locales में खोज इंजन द्वारा बेहतर खोज सुनिश्चित हो सके।
- **लिंक को स्थानीयकृत करें**
- `Link` कंपोनेंट का उपयोग करके लिंक को लोकलाइज़ करें ताकि उपयोगकर्ता को उपयुक्त locale-प्रिफिक्स्ड URL पर रीडायरेक्ट किया जा सके। यह सुनिश्चित करना महत्वपूर्ण है कि आपकी पेज सभी locales में खोजे जा सकें।
- **टेस्ट और अनुवाद को स्वचालित करें**  
  टेस्ट और अनुवाद को स्वचालित करने से आपके बहुभाषी एप्लिकेशन के रखरखाव में समय की बचत होती है।

> हमारे डॉक्यूमेंट में देखें जो अंतरराष्ट्रीयकरण और SEO के बारे में आपको सब कुछ जानना आवश्यक है: [next-intl के साथ अंतरराष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/internationalization_and_SEO.md)।

---

## Next.js एप्लिकेशन में next-intl सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"  
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतरराष्ट्रीयकृत कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/next-intl-template) देखें।

यहाँ वह प्रोजेक्ट संरचना है जिसे हम बनाएंगे:

```bash
.
├── global.ts
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src # Src वैकल्पिक है
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (होम संसाधनों के साथ सभी पृष्ठों को प्रदूषित न करने के लिए रूट समूह)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### चरण 1: निर्भरताएँ स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Next.js App Router के लिए मुख्य अंतरराष्ट्रीयकरण लाइब्रेरी जो अनुवादों के प्रबंधन के लिए hooks, सर्वर फ़ंक्शन, और क्लाइंट प्रदाता प्रदान करती है।

### चरण 2: अपने प्रोजेक्ट को कॉन्फ़िगर करें

अपने समर्थित लोकल्स को परिभाषित करने और next-intl के अनुरोध कॉन्फ़िगरेशन को सेट अप करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएं। यह फ़ाइल आपके i18n सेटअप के लिए सत्य का एकमात्र स्रोत के रूप में कार्य करती है और आपके एप्लिकेशन में टाइप सुरक्षा सुनिश्चित करती है।

अपने लोकल कॉन्फ़िगरेशन को केंद्रीकृत करने से असंगतियों से बचा जाता है और भविष्य में लोकल्स को जोड़ना या हटाना आसान हो जाता है। `getRequestConfig` फ़ंक्शन हर अनुरोध पर चलता है और केवल प्रत्येक पृष्ठ के लिए आवश्यक अनुवाद लोड करता है, जिससे कोड-स्प्लिटिंग सक्षम होती है और बंडल का आकार कम होता है।

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// टाइप सुरक्षा के साथ समर्थित लोकल्स को परिभाषित करें
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// कोड-स्प्लिटिंग सक्षम करने के लिए प्रत्येक लोकल के अनुसार संदेशों को डायनामिक रूप से लोड करें
// बेहतर प्रदर्शन के लिए Promise.all समानांतर में नेमस्पेस लोड करता है
async function loadMessages(locale: Locale) {
  // केवल वे नेमस्पेस लोड करें जिनकी आपकी लेआउट/पेजेस को आवश्यकता है
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... भविष्य के JSON फाइलें यहाँ जोड़ी जानी चाहिए
  ]);

  return { common, home, about } as const;
}

// स्थानीयकृत URLs उत्पन्न करने में सहायक (जैसे, /about बनाम /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig प्रत्येक अनुरोध पर चलता है और सर्वर कंपोनेंट्स को संदेश प्रदान करता है
// यहीं next-intl Next.js के सर्वर-साइड रेंडरिंग में हुक करता है
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 वर्ष
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // /en/... रूट को /... में बदलें
  // वैकल्पिक: स्थानीयकृत पाथनेम्स
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // कुकी से "/" -> "/en" रीडायरेक्ट को रोकें
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### चरण 3: डायनामिक लोकल रूट्स परिभाषित करें

अपने ऐप फ़ोल्डर में `[locale]` डायरेक्टरी बनाकर स्थानीयताओं के लिए डायनेमिक रूटिंग सेट करें। इससे Next.js स्थानीय-आधारित रूटिंग को संभाल सकता है जहाँ प्रत्येक स्थानीयता URL सेगमेंट बन जाती है (जैसे, `/en/about`, `/fr/about`)।

डायनेमिक रूट्स का उपयोग करने से Next.js सभी स्थानीयताओं के लिए बिल्ड समय पर स्थैतिक पृष्ठ उत्पन्न कर सकता है, जिससे प्रदर्शन और SEO में सुधार होता है। लेआउट कॉम्पोनेंट HTML के `lang` और `dir` एट्रिब्यूट्स को स्थानीयता के आधार पर सेट करता है, जो पहुंच और सर्च इंजन की समझ के लिए महत्वपूर्ण है।

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// सभी स्थानीयताओं के लिए बिल्ड समय पर स्थैतिक पृष्ठ पूर्व-उत्पन्न करें (SSG)
// यह प्रदर्शन और SEO में सुधार करता है
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Next.js App Router में, params एक Promise है (जिसे await किया जा सकता है)
  // यह डायनेमिक रूट सेगमेंट्स को असिंक्रोनस तरीके से हल करने की अनुमति देता है
  const { locale } = await params;

  // महत्वपूर्ण: setRequestLocale next-intl को बताता है कि इस अनुरोध के लिए कौन सी locale का उपयोग करना है
  // इसके बिना, getTranslations() को पता नहीं चलेगा कि सर्वर कंपोनेंट्स में कौन सी locale का उपयोग करना है
  setRequestLocale(locale);

  // उचित HTML रेंडरिंग के लिए टेक्स्ट दिशा (LTR/RTL) प्राप्त करें
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // संदेश सर्वर-साइड पर लोड किए जाते हैं। केवल आवश्यक चीज़ें क्लाइंट को भेजें।
  // इससे ब्राउज़र को भेजे जाने वाले JavaScript बंडल का आकार कम होता है
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // केवल सर्वर-साइड अनुवाद/फॉर्मेटिंग
  // ये सर्वर पर चलते हैं और इन्हें कंपोनेंट्स को props के रूप में पास किया जा सकता है
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider क्लाइंट कंपोनेंट्स के लिए अनुवाद उपलब्ध कराता है
    // केवल वे namespaces पास करें जिनका आपके क्लाइंट कंपोनेंट्स वास्तव में उपयोग करते हैं
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### चरण 4: अपने अनुवाद फ़ाइलें बनाएं

प्रत्येक locale और namespace के लिए JSON फ़ाइलें बनाएं। यह संरचना आपको अनुवादों को तार्किक रूप से व्यवस्थित करने और प्रत्येक पेज के लिए केवल आवश्यक अनुवाद लोड करने की अनुमति देती है।

namespace के अनुसार अनुवादों को व्यवस्थित करना (जैसे, `common.json`, `about.json`) कोड स्प्लिटिंग सक्षम करता है और बंडल आकार को कम करता है। आप केवल उन अनुवादों को लोड करते हैं जो प्रत्येक पेज के लिए आवश्यक हैं, जिससे प्रदर्शन में सुधार होता है।

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### चरण 5: अपने पृष्ठों में अनुवादों का उपयोग करें

एक पेज कंपोनेंट बनाएं जो सर्वर पर अनुवाद लोड करता है और उन्हें सर्वर और क्लाइंट दोनों कंपोनेंट्स को पास करता है। यह सुनिश्चित करता है कि अनुवाद रेंडरिंग से पहले लोड हो जाएं और कंटेंट फ्लैशिंग को रोका जा सके।

सर्वर-साइड अनुवाद लोडिंग SEO में सुधार करती है और FOUC (अनुवादित नहीं हुआ कंटेंट का फ्लैश) को रोकती है। `pick` का उपयोग करके केवल आवश्यक namespaces को क्लाइंट प्रोवाइडर को भेजकर, हम ब्राउज़र को भेजे जाने वाले जावास्क्रिप्ट बंडल को न्यूनतम करते हैं।

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // संदेश सर्वर-साइड लोड किए जाते हैं। केवल आवश्यक चीज़ें क्लाइंट को भेजें।
  // इससे ब्राउज़र को भेजे जाने वाले जावास्क्रिप्ट बंडल का आकार कम होता है
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // सख्ती से सर्वर-साइड अनुवाद/फॉर्मेटिंग
  // ये सर्वर पर चलते हैं और कंपोनेंट्स को props के रूप में पास किए जा सकते हैं
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider क्लाइंट कंपोनेंट्स के लिए अनुवाद उपलब्ध कराता है
    // केवल वे namespaces पास करें जिनकी आपके क्लाइंट कंपोनेंट्स को वास्तव में आवश्यकता है
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### चरण 6: क्लाइंट कंपोनेंट्स में अनुवाद का उपयोग करें

क्लाइंट कंपोनेंट्स `useTranslations` और `useFormatter` hooks का उपयोग करके अनुवाद और फॉर्मेटिंग फ़ंक्शंस तक पहुँच सकते हैं। ये hooks `NextIntlClientProvider` context से पढ़ते हैं।

क्लाइंट कंपोनेंट्स को अनुवादों तक पहुँचने के लिए React hooks की आवश्यकता होती है। `useTranslations` और `useFormatter` hooks next-intl के साथ सहजता से एकीकृत होते हैं और जब locale बदलता है तो प्रतिक्रियाशील अपडेट प्रदान करते हैं।

> आवश्यक namespaces को पेज के क्लाइंट संदेशों में जोड़ना न भूलें (केवल वे namespaces शामिल करें जिनकी आपके क्लाइंट कंपोनेंट्स को वास्तव में आवश्यकता है)।

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // सीधे nested ऑब्जेक्ट के लिए स्कोप करें
  // useTranslations/useFormatter वे hooks हैं जो NextIntlClientProvider context से पढ़ते हैं
  // ये केवल तभी काम करते हैं जब component को NextIntlClientProvider में लपेटा गया हो
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

### चरण 7: सर्वर कंपोनेंट्स में अनुवादों का उपयोग करें

सर्वर कंपोनेंट्स React hooks का उपयोग नहीं कर सकते, इसलिए वे अपने पैरेंट कंपोनेंट्स से props के माध्यम से अनुवाद और फॉर्मैटर प्राप्त करते हैं। यह तरीका सर्वर कंपोनेंट्स को synchronous रखता है और उन्हें क्लाइंट कंपोनेंट्स के अंदर नेस्ट करने की अनुमति देता है।

क्लाइंट बाउंड्रीज़ के अंतर्गत नेस्टेड हो सकने वाले सर्वर कंपोनेंट्स को सिंक्रोनस होना आवश्यक है। अनुवादित स्ट्रिंग्स और फॉर्मेटेड वैल्यूज़ को प्रॉप्स के रूप में पास करके, हम असिंक्रोनस ऑपरेशंस से बचते हैं और सही रेंडरिंग सुनिश्चित करते हैं। पेरेंट पेज कंपोनेंट में अनुवाद और फॉर्मेटिंग को प्री-कंप्यूट करें।

```tsx fileName="src/components/ServerComponent.tsx"
// क्लाइंट कंपोनेंट्स के अंदर नेस्टेड सर्वर कंपोनेंट्स को सिंक्रोनस होना चाहिए
// React सर्वर/क्लाइंट बाउंड्री के पार असिंक्रोनस फंक्शंस को सीरियलाइज़ नहीं कर सकता
// समाधान: पेरेंट में अनुवाद/फॉर्मेट्स को प्री-कंप्यूट करें और प्रॉप्स के रूप में पास करें
type ServerComponentProps = {
  formattedCount: string; // फॉर्मेट किया गया काउंट
  label: string; // लेबल
  increment: string; // इंक्रीमेंट टेक्स्ट
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> अपने पेज/लेआउट में, `next-intl/server` से `getTranslations` और `getFormatter` का उपयोग करें ताकि अनुवाद और फॉर्मेटिंग को पहले से गणना किया जा सके, फिर उन्हें props के रूप में सर्वर कंपोनेंट्स को पास करें।

---

### (वैकल्पिक) चरण 8: अपनी सामग्री की भाषा बदलें

next-intl के साथ अपनी सामग्री की भाषा बदलने के लिए, ऐसे locale-aware लिंक रेंडर करें जो locale बदलते समय उसी pathname की ओर इशारा करें। प्रदाता URLs को स्वचालित रूप से पुनर्लेखित करता है, इसलिए आपको केवल वर्तमान रूट को लक्षित करना होता है।

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // बेस पथ प्राप्त करने के लिए पथनाम से लोकल प्रीफिक्स हटाएं
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="भाषा चयनकर्ता">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // href बनाएँ यह देखते हुए कि क्या यह डिफ़ॉल्ट locale है
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (वैकल्पिक) चरण 9: स्थानीयकृत Link कॉम्पोनेंट का उपयोग करें

`next-intl` एक उप-पैकेज `next-intl/navigation` प्रदान करता है जिसमें एक स्थानीयकृत लिंक कॉम्पोनेंट होता है जो स्वचालित रूप से सक्रिय locale लागू करता है। हमने इसे आपके लिए `@/i18n` फ़ाइल में पहले ही निकाला है, इसलिए आप इसे इस प्रकार उपयोग कर सकते हैं:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (वैकल्पिक) चरण 10: Server Actions के अंदर सक्रिय locale तक पहुँचें

Server Actions वर्तमान locale को `next-intl/server` का उपयोग करके पढ़ सकते हैं। यह स्थानीयकृत ईमेल भेजने या सबमिट किए गए डेटा के साथ भाषा प्राथमिकताएँ संग्रहीत करने के लिए उपयोगी है।

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // टेम्पलेट्स, एनालिटिक्स लेबल आदि चुनने के लिए locale का उपयोग करें।
  console.log(`locale ${locale} से संपर्क फ़ॉर्म प्राप्त हुआ`);
}
```

> `getLocale` उस locale को पढ़ता है जो `next-intl` प्रॉक्सी द्वारा सेट किया गया है, इसलिए यह सर्वर पर कहीं भी काम करता है: Route Handlers, Server Actions, और edge functions।

### (वैकल्पिक) चरण 11: अपने मेटाडेटा का अंतरराष्ट्रीयकरण करें

सामग्री का अनुवाद करना महत्वपूर्ण है, लेकिन अंतरराष्ट्रीयकरण का मुख्य उद्देश्य आपकी वेबसाइट को दुनिया के लिए अधिक दृश्य बनाना है। I18n आपकी वेबसाइट की दृश्यता को उचित SEO के माध्यम से सुधारने के लिए एक अद्भुत उपकरण है।

सही ढंग से अंतरराष्ट्रीयकृत मेटाडेटा खोज इंजनों को यह समझने में मदद करता है कि आपकी पृष्ठों पर कौन-कौन सी भाषाएँ उपलब्ध हैं। इसमें hreflang मेटा टैग सेट करना, शीर्षक और विवरणों का अनुवाद करना, और प्रत्येक लोकल के लिए कैनोनिकल URL को सही ढंग से सेट करना शामिल है।

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata प्रत्येक लोकल के लिए चलता है, SEO-अनुकूल मेटाडेटा उत्पन्न करता है
// यह सर्च इंजन को वैकल्पिक भाषा संस्करणों को समझने में मदद करता है
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... पेज कोड का बाकी हिस्सा
```

### (वैकल्पिक) चरण 12: अपने साइटमैप को अंतरराष्ट्रीयकृत करें

अपने पृष्ठों के सभी स्थानीय संस्करणों को शामिल करने वाला एक साइटमैप जनरेट करें। यह खोज इंजन को आपकी सामग्री के सभी भाषा संस्करणों को खोजने और अनुक्रमित करने में मदद करता है।

एक सही ढंग से अंतरराष्ट्रीयकृत साइटमैप सुनिश्चित करता है कि खोज इंजन आपके पृष्ठों के सभी भाषा संस्करणों को खोज और अनुक्रमित कर सकें। इससे अंतरराष्ट्रीय खोज परिणामों में दृश्यता में सुधार होता है।

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * सभी स्थानीय भाषाओं और उनके स्थानीयकृत पथों का मानचित्र प्राप्त करें
 *
 * उदाहरण आउटपुट:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// बेहतर SEO के लिए सभी locale संस्करणों के साथ sitemap जनरेट करें
// alternates फ़ील्ड सर्च इंजन को भाषा संस्करणों के बारे में बताता है
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (वैकल्पिक) चरण 13: अपने robots.txt को अंतरराष्ट्रीयकृत करें

एक robots.txt फ़ाइल बनाएं जो आपके सभी स्थानीय संस्करणों वाले संरक्षित रूट्स को सही ढंग से संभाले। यह सुनिश्चित करता है कि सर्च इंजन किसी भी भाषा में एडमिन या डैशबोर्ड पेजों को इंडेक्स न करें।

सभी स्थानीय संस्करणों के लिए robots.txt को सही ढंग से कॉन्फ़िगर करने से यह सुनिश्चित होता है कि जब आपके रूट्स प्रत्येक स्थानीय संस्करण के लिए अलग हों, तब भी सर्च इंजन संवेदनशील पेजों को इंडेक्स न करें।

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// सभी स्थानीय संस्करणों के लिए पथ उत्पन्न करें (जैसे, /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### (वैकल्पिक) चरण 14: लोकल रूटिंग के लिए प्रॉक्सी सेट करें

एक प्रॉक्सी बनाएं जो स्वचालित रूप से उपयोगकर्ता की पसंदीदा भाषा (locale) का पता लगाए और उन्हें उपयुक्त लोकल-प्रिफिक्स्ड URL पर पुनः निर्देशित करे। next-intl एक सुविधाजनक प्रॉक्सी फ़ंक्शन प्रदान करता है जो इसे स्वचालित रूप से संभालता है।

प्रॉक्सी सुनिश्चित करता है कि जब उपयोगकर्ता आपकी साइट पर आते हैं तो उन्हें स्वचालित रूप से उनकी पसंदीदा भाषा में पुनः निर्देशित किया जाए। यह भविष्य की यात्राओं के लिए उपयोगकर्ता की पसंद को भी सहेजता है, जिससे उपयोगकर्ता अनुभव में सुधार होता है।

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// मिडलवेयर रूट्स से पहले चलता है, जो लोकल डिटेक्शन और रूटिंग को संभालता है
// localeDetection: true Accept-Language हेडर का उपयोग करके स्वचालित रूप से लोकल का पता लगाता है
export default proxy;

export const config = {
  // API, Next के आंतरिक हिस्सों और स्थैतिक संसाधनों को छोड़ें
  // Regex: सभी रूट्स से मेल खाता है सिवाय उन रूट्स के जो api, _next से शुरू होते हैं या जिनमें डॉट (फाइलें) होती हैं
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (वैकल्पिक) चरण 15: लोकल के लिए TypeScript टाइप्स सेट करें

TypeScript सेटअप करने से आपको अपने कीज़ के लिए ऑटो-कम्प्लीशन और टाइप सुरक्षा प्राप्त करने में मदद मिलेगी।

इसके लिए, आप अपने प्रोजेक्ट रूट में एक global.ts फ़ाइल बना सकते हैं और निम्नलिखित कोड जोड़ सकते हैं:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... भविष्य की JSON फ़ाइलें भी यहाँ जोड़ी जानी चाहिए
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

यह कोड Module Augmentation का उपयोग करेगा ताकि locales और messages को next-intl के AppConfig टाइप में जोड़ा जा सके।

### (वैकल्पिक) चरण 15: Intlayer का उपयोग करके अपने अनुवादों को स्वचालित करें

Intlayer एक **मुफ़्त** और **ओपन-सोर्स** लाइब्रेरी है जिसे आपके एप्लिकेशन में लोकलाइज़ेशन प्रक्रिया में सहायता करने के लिए डिज़ाइन किया गया है। जबकि next-intl अनुवाद लोडिंग और प्रबंधन को संभालता है, Intlayer अनुवाद वर्कफ़्लो को स्वचालित करने में मदद करता है।

अनुवादों का मैन्युअल प्रबंधन समय लेने वाला और त्रुटिपूर्ण हो सकता है। Intlayer अनुवाद परीक्षण, निर्माण, और प्रबंधन को स्वचालित करता है, जिससे आपका समय बचता है और आपके एप्लिकेशन में स्थिरता सुनिश्चित होती है।

Intlayer आपको निम्नलिखित की अनुमति देता है:

- **अपने कोडबेस में जहाँ चाहें अपना कंटेंट घोषित करें**
  Intlayer आपको `.content.{ts|js|json}` फ़ाइलों का उपयोग करके अपने कोडबेस में जहाँ चाहें अपना कंटेंट घोषित करने की अनुमति देता है। यह आपके कंटेंट के बेहतर संगठन की अनुमति देगा, जिससे आपके कोडबेस की पठनीयता और रखरखाव में सुधार होगा।

- **गायब अनुवादों का परीक्षण करें**
  Intlayer आपके CI/CD पाइपलाइन में या आपके यूनिट टेस्ट में एकीकृत किए जा सकने वाले टेस्ट फंक्शन प्रदान करता है। अपने अनुवादों का परीक्षण करने के बारे में अधिक जानने के लिए [testing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/testing.md) देखें।

- **अपने अनुवादों को स्वचालित करें**,
  Intlayer आपके अनुवादों को स्वचालित करने के लिए एक CLI और VSCode एक्सटेंशन प्रदान करता है। इसे आपके CI/CD पाइपलाइन में एकीकृत किया जा सकता है। अपने अनुवादों को स्वचालित करने के बारे में अधिक जानने के लिए [automating your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।
  आप अपनी **अपनी API कुंजी और अपनी पसंद के AI प्रदाता** का उपयोग कर सकते हैं। यह संदर्भ-सचेत अनुवाद भी प्रदान करता है, देखें [fill content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md)।

- **बाहरी सामग्री से कनेक्ट करें**
  Intlayer आपको अपने कंटेंट को एक बाहरी कंटेंट मैनेजमेंट सिस्टम (CMS) से कनेक्ट करने की अनुमति देता है। इसे एक अनुकूलित तरीके से प्राप्त करने और अपने JSON संसाधनों में सम्मिलित करने के लिए। अधिक जानने के लिए [बाहरी कंटेंट प्राप्त करना](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/function_fetching.md) देखें।

- **विज़ुअल एडिटर**  
  Intlayer एक मुफ्त विज़ुअल एडिटर प्रदान करता है जिससे आप अपने कंटेंट को विज़ुअल एडिटर का उपयोग करके संपादित कर सकते हैं। अधिक जानने के लिए [अपने अनुवादों का विज़ुअल संपादन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

और भी बहुत कुछ। Intlayer द्वारा प्रदान की गई सभी विशेषताओं को खोजने के लिए, कृपया [Intlayer के महत्व की दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।
