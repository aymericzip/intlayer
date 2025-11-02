---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: next-i18next का उपयोग करके अपने Next.js एप्लिकेशन का अंतरराष्ट्रीयकरण कैसे करें
description: next-i18next के साथ i18n सेट करें: बहुभाषी Next.js ऐप्स के लिए सर्वोत्तम प्रथाएं और SEO सुझाव, जिसमें अंतरराष्ट्रीयकरण, सामग्री संगठन, और तकनीकी सेटअप शामिल हैं।
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: प्रारंभिक संस्करण
---

# 2025 में next-i18next का उपयोग करके अपने Next.js एप्लिकेशन का अंतरराष्ट्रीयकरण कैसे करें

## सामग्री सूची

<TOC/>

## next-i18next क्या है?

**next-i18next** Next.js एप्लिकेशन के लिए एक लोकप्रिय अंतरराष्ट्रीयकरण (i18n) समाधान है। जबकि मूल `next-i18next` पैकेज पेजेस राउटर के लिए डिज़ाइन किया गया था, यह गाइड आपको दिखाता है कि आधुनिक **App Router** के साथ `i18next` और `react-i18next` का सीधे उपयोग करके i18next को कैसे लागू किया जाए।

इस दृष्टिकोण के साथ, आप कर सकते हैं:

- **अनुवादों को व्यवस्थित करें** नेमस्पेस (जैसे, `common.json`, `about.json`) का उपयोग करके बेहतर सामग्री प्रबंधन के लिए।
- **अनुवादों को कुशलतापूर्वक लोड करें** केवल प्रत्येक पेज के लिए आवश्यक नेमस्पेस लोड करके, जिससे बंडल आकार कम होता है।
- **सर्वर और क्लाइंट दोनों कंपोनेंट्स का समर्थन करें** उचित SSR और हाइड्रेशन हैंडलिंग के साथ।
- **TypeScript समर्थन सुनिश्चित करें** टाइप-सेफ लोकल कॉन्फ़िगरेशन और अनुवाद कुंजियों के साथ।
- **SEO के लिए अनुकूलित करें** उचित मेटाडेटा, साइटमैप, और robots.txt अंतरराष्ट्रीयकरण के साथ।

> एक विकल्प के रूप में, आप [next-intl गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_with_next-intl.md) को भी देख सकते हैं, या सीधे [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md) का उपयोग कर सकते हैं।

> तुलना देखें [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md) में।

## आपको जिन प्रथाओं का पालन करना चाहिए

इम्प्लीमेंटेशन में जाने से पहले, यहां कुछ प्रथाएं हैं जिनका आपको पालन करना चाहिए:

- **HTML के `lang` और `dir` एट्रिब्यूट सेट करें**
- अपने लेआउट में, `dir` की गणना `getLocaleDirection(locale)` का उपयोग करके करें और उचित पहुंच और SEO के लिए `<html lang={locale} dir={dir}>` सेट करें।
- **संदेशों को namespace के अनुसार विभाजित करें**
  JSON फ़ाइलों को locale और namespace (जैसे, `common.json`, `about.json`) के अनुसार व्यवस्थित करें ताकि केवल आवश्यक चीज़ें ही लोड हों।
- **क्लाइंट पेलोड को न्यूनतम करें**
  पृष्ठों पर, केवल आवश्यक namespaces को `NextIntlClientProvider` को भेजें (जैसे, `pick(messages, ['common', 'about'])`)।
- **स्थैतिक पृष्ठों को प्राथमिकता दें**
  बेहतर प्रदर्शन और SEO के लिए जितना संभव हो स्थैतिक पृष्ठों का उपयोग करें।
- **सर्वर कंपोनेंट्स में I18n**
  सर्वर कंपोनेंट्स, जैसे पृष्ठ या सभी कंपोनेंट्स जो `client` के रूप में चिह्नित नहीं हैं, स्थैतिक होते हैं और बिल्ड समय पर प्री-रेंडर किए जा सकते हैं। इसलिए हमें अनुवाद फ़ंक्शंस को उन्हें props के रूप में पास करना होगा।
- **TypeScript प्रकार सेट करें**
- आपके locales के लिए पूरे एप्लिकेशन में type safety सुनिश्चित करने के लिए TypeScript types सेट करें।
- **पुनर्निर्देशन के लिए प्रॉक्सी**
  locale पहचान और रूटिंग को संभालने के लिए प्रॉक्सी का उपयोग करें और उपयोगकर्ता को उचित locale-प्रिफिक्स्ड URL पर पुनर्निर्देशित करें।
- **अपने मेटाडेटा, साइटमैप, robots.txt का अंतरराष्ट्रीयकरण**
  Next.js द्वारा प्रदान किए गए `generateMetadata` फ़ंक्शन का उपयोग करके अपने मेटाडेटा, साइटमैप, robots.txt का अंतरराष्ट्रीयकरण करें ताकि सभी locales में सर्च इंजन द्वारा बेहतर खोज सुनिश्चित हो सके।
- **लिंक को स्थानीयकृत करें**
  उपयोगकर्ता को उचित locale-प्रिफिक्स्ड URL पर पुनर्निर्देशित करने के लिए `Link` कंपोनेंट का उपयोग करके लिंक को स्थानीयकृत करें। यह सुनिश्चित करना महत्वपूर्ण है कि आपके पृष्ठ सभी locales में खोजे जा सकें।
- **टेस्ट और अनुवादों को स्वचालित करें**
  टेस्ट और अनुवादों को स्वचालित करना आपके बहुभाषी एप्लिकेशन के रखरखाव में समय की बचत करता है।

> हमारे दस्तावेज़ को देखें जिसमें अंतरराष्ट्रीयकरण और SEO के बारे में आपको जानने के लिए सब कुछ सूचीबद्ध है: [next-intl के साथ अंतरराष्ट्रीयकरण (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/internationalization_and_SEO.md)।

---

## Next.js एप्लिकेशन में i18next सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन का अंतरराष्ट्रीयकरण कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/next-i18next-template) देखें।

यहाँ प्रोजेक्ट संरचना है जिसे हम बनाएंगे:

```bash
.
├── i18n.config.ts
└── src # Src वैकल्पिक है
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (रूट ग्रुप ताकि होम संदेशों से सभी पृष्ठ प्रदूषित न हों)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### चरण 1: Dependencies इंस्टॉल करें

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: मुख्य अंतरराष्ट्रीयकरण फ्रेमवर्क जो अनुवाद लोडिंग और प्रबंधन को संभालता है।
- **react-i18next**: i18next के लिए React बाइंडिंग्स जो क्लाइंट कंपोनेंट्स के लिए `useTranslation` जैसे हुक प्रदान करता है।
- **i18next-resources-to-backend**: एक प्लगइन जो अनुवाद फ़ाइलों को डायनामिक रूप से लोड करने में सक्षम बनाता है, जिससे आप केवल आवश्यक namespaces को लोड कर सकते हैं।

### चरण 2: अपने प्रोजेक्ट को कॉन्फ़िगर करें

एक कॉन्फ़िगरेशन फ़ाइल बनाएं जिसमें आपके समर्थित लोकल, डिफ़ॉल्ट लोकल, और URL लोकलाइज़ेशन के लिए सहायक फ़ंक्शन परिभाषित हों। यह फ़ाइल आपके i18n सेटअप के लिए एकमात्र सत्य स्रोत के रूप में कार्य करती है और आपके एप्लिकेशन में टाइप सुरक्षा सुनिश्चित करती है।

अपने लोकल कॉन्फ़िगरेशन को केंद्रीकृत करने से असंगतताओं से बचा जाता है और भविष्य में लोकल जोड़ना या हटाना आसान हो जाता है। सहायक फ़ंक्शन SEO और रूटिंग के लिए सुसंगत URL जनरेशन सुनिश्चित करते हैं।

```ts fileName="i18n.config.ts"
// टाइप सुरक्षा के लिए समर्थित लोकल को const array के रूप में परिभाषित करें
// 'as const' असर्शन TypeScript को string[] के बजाय literal types अनुमानित करने देता है
export const locales = ["en", "fr"] as const;

// locales array से Locale टाइप निकालें
// यह एक यूनियन टाइप बनाता है: "en" | "fr"
export type Locale = (typeof locales)[number];

// जब कोई लोकल निर्दिष्ट नहीं किया गया हो तो उपयोग किया जाने वाला डिफ़ॉल्ट लोकल सेट करें
export const defaultLocale: Locale = "en";

// दाएं से बाएं भाषाएँ जिन्हें विशेष टेक्स्ट दिशा हैंडलिंग की आवश्यकता होती है
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// जांचें कि क्या किसी लोकल को RTL (दाएं से बाएं) टेक्स्ट दिशा की आवश्यकता है
// अरबी, हिब्रू, फारसी, और उर्दू जैसी भाषाओं के लिए उपयोग किया जाता है
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// दिए गए लोकल और पथ के लिए एक स्थानीयकृत पथ उत्पन्न करें
// डिफ़ॉल्ट लोकल पथों में कोई उपसर्ग नहीं होता (जैसे "/about" बजाय "/en/about")
// अन्य लोकल के लिए उपसर्ग होता है (जैसे "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// पूर्ण URL के लिए बेस URL (साइटमैप, मेटाडेटा आदि में उपयोग किया जाता है)
const ORIGIN = "https://example.com";

// लोकल प्रीफिक्स के साथ पूर्ण URL जनरेट करें
// SEO मेटाडेटा, साइटमैप्स, और कैनोनिकल URLs के लिए उपयोग किया जाता है
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// ब्राउज़र में लोकल कुकी सेट करने के लिए उपयोग किया जाता है
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 वर्ष
    "SameSite=Lax",
  ].join("; ");
}
```

### चरण 3: अनुवाद नेमस्पेसेस को केंद्रीकृत करें

अपने एप्लिकेशन द्वारा एक्सपोज़ किए गए प्रत्येक namespace के लिए एक सिंगल सोर्स ऑफ ट्रूथ बनाएं। इस सूची का पुन: उपयोग सर्वर, क्लाइंट, और टूलिंग कोड को सिंक में रखता है और ट्रांसलेशन हेल्पर्स के लिए मजबूत टाइपिंग को अनलॉक करता है।

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### चरण 4: TypeScript के साथ ट्रांसलेशन कीज़ को मजबूत टाइप करें

`i18next` को अपने कैनोनिकल भाषा फ़ाइलों (आमतौर पर अंग्रेज़ी) की ओर बढ़ाएं। TypeScript तब प्रत्येक namespace के लिए वैध कीज़ का अनुमान लगाता है, इसलिए `t()` कॉल्स को एंड-टू-एंड चेक किया जाता है।

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> सुझाव: इस घोषणा को `src/types` के अंतर्गत स्टोर करें (यदि फ़ोल्डर मौजूद नहीं है तो बनाएं)। Next.js पहले से ही `tsconfig.json` में `src` को शामिल करता है, इसलिए यह ऑगमेंटेशन स्वचालित रूप से पकड़ लिया जाता है। यदि नहीं, तो अपने `tsconfig.json` फ़ाइल में निम्नलिखित जोड़ें:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

इसके साथ आप ऑटोकंप्लीट और कंपाइल-टाइम चेक्स पर भरोसा कर सकते हैं:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// ठीक है, टाइप किया गया: t("counter.increment")
// त्रुटि, कंपाइल त्रुटि: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### चरण 5: सर्वर-साइड i18n इनिशियलाइज़ेशन सेट करें

सर्वर-साइड i18n इनिशियलाइज़ेशन फ़ंक्शन बनाएं जो सर्वर कंपोनेंट्स के लिए अनुवाद लोड करता है। यह फ़ंक्शन सर्वर-साइड रेंडरिंग के लिए एक अलग i18next इंस्टेंस बनाता है, यह सुनिश्चित करते हुए कि रेंडरिंग से पहले अनुवाद लोड हो जाएं।

सर्वर कंपोनेंट्स को अपना खुद का i18next इंस्टेंस चाहिए क्योंकि वे क्लाइंट कंपोनेंट्स से अलग संदर्भ में चलते हैं। सर्वर पर अनुवादों को प्रीलोड करने से अनुवादित नहीं हुए कंटेंट का फ्लैश रोका जाता है और SEO में सुधार होता है क्योंकि सर्च इंजन अनुवादित कंटेंट देख पाते हैं।

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// i18next के लिए डायनामिक रिसोर्स लोडिंग कॉन्फ़िगर करें
// यह फ़ंक्शन locale और namespace के आधार पर अनुवाद JSON फ़ाइलों को डायनामिक रूप से इम्पोर्ट करता है
// उदाहरण: locale="fr", namespace="about" -> "@/locales/fr/about.json" को इम्पोर्ट करता है
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * सर्वर-साइड रेंडरिंग के लिए i18next इंस्टेंस इनिशियलाइज़ करें
 *
 * @returns सर्वर-साइड उपयोग के लिए तैयार इनिशियलाइज़्ड i18next इंस्टेंस
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // एक नया i18next इंस्टेंस बनाएं (क्लाइंट-साइड इंस्टेंस से अलग)
  const i18n = createInstance();

  // React इंटीग्रेशन और बैकएंड लोडर के साथ इनिशियलाइज़ करें
  await i18n
    .use(initReactI18next) // React hooks सपोर्ट सक्षम करें
    .use(backend) // डायनामिक रिसोर्स लोडिंग सक्षम करें
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // बेहतर प्रदर्शन के लिए केवल निर्दिष्ट namespaces लोड करें
      defaultNS: "common", // जब कोई namespace निर्दिष्ट न हो तो डिफ़ॉल्ट namespace
      interpolation: { escapeValue: false }, // HTML को escape न करें (React XSS सुरक्षा संभालता है)
      react: { useSuspense: false }, // SSR संगतता के लिए Suspense अक्षम करें
      returnNull: false, // गायब keys के लिए null की बजाय खाली स्ट्रिंग लौटाएं
      initImmediate: false, // संसाधन लोड होने तक इनिशियलाइज़ेशन को स्थगित करें (तेज़ SSR)
    });
  return i18n;
}
```

### चरण 6: क्लाइंट-साइड i18n प्रोवाइडर बनाएं

एक क्लाइंट कंपोनेंट प्रोवाइडर बनाएं जो आपके एप्लिकेशन को i18next संदर्भ के साथ लपेटता है। यह प्रोवाइडर सर्वर से पहले से लोड की गई अनुवाद सामग्री प्राप्त करता है ताकि अनुवादित सामग्री के फ्लैश (FOUC) को रोका जा सके और डुप्लिकेट फेचिंग से बचा जा सके।

क्लाइंट कंपोनेंट्स को अपना खुद का i18next इंस्टेंस चाहिए जो ब्राउज़र में चलता है। सर्वर से पहले से लोड किए गए संसाधनों को स्वीकार करके, हम निर्बाध हाइड्रेशन सुनिश्चित करते हैं और सामग्री के फ्लैशिंग को रोकते हैं। यह प्रोवाइडर स्थानीय भाषा परिवर्तन और नेमस्पेस लोडिंग को भी गतिशील रूप से प्रबंधित करता है।

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// क्लाइंट-साइड के लिए डायनामिक रिसोर्स लोडिंग कॉन्फ़िगर करें
// सर्वर-साइड के समान पैटर्न, लेकिन यह इंस्टेंस ब्राउज़र में चलता है
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // सर्वर से प्री-लोडेड संसाधन (FOUC - अनुवादित सामग्री के फ्लैश को रोकता है)
  // प्रारूप: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * क्लाइंट-साइड i18n प्रदाता जो ऐप को i18next संदर्भ के साथ लपेटता है
 * सर्वर से पहले से लोड किए गए संसाधन प्राप्त करता है ताकि अनुवादों को पुनः प्राप्त करने से बचा जा सके
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // useState लेज़ी इनिशियलाइज़र का उपयोग करके i18n इंस्टेंस केवल एक बार बनाएं
  // यह सुनिश्चित करता है कि इंस्टेंस केवल एक बार बनाया जाए, हर रेंडर पर नहीं
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // यदि संसाधन (सर्वर से) प्रदान किए गए हैं, तो क्लाइंट-साइड से पुनः प्राप्ति से बचने के लिए उनका उपयोग करें
        // यह FOUC को रोकता है और प्रारंभिक लोड प्रदर्शन में सुधार करता है
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // अपरिभाषित मान लौटने से रोकें
      });

    return i18nInstance;
  });

  // जब locale prop बदलता है तो भाषा अपडेट करें
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // सुनिश्चित करें कि सभी आवश्यक namespaces क्लाइंट-साइड पर लोड हों
  // सही ढंग से arrays की तुलना के लिए join("|") को dependency के रूप में उपयोग करना
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // React context के माध्यम से सभी child components को i18n instance प्रदान करें
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### चरण 7: डायनामिक लोकल रूट्स परिभाषित करें

अपने ऐप फ़ोल्डर में `[locale]` डायरेक्टरी बनाकर लोकल के लिए डायनामिक रूटिंग सेट करें। इससे Next.js लोकल-आधारित रूटिंग को संभाल सकता है जहाँ प्रत्येक लोकल URL सेगमेंट बन जाता है (जैसे, `/en/about`, `/fr/about`)।

डायनामिक रूट्स का उपयोग करने से Next.js बिल्ड समय पर सभी लोकल के लिए स्थैतिक पेज जेनरेट कर सकता है, जिससे प्रदर्शन और SEO में सुधार होता है। लेआउट कंपोनेंट HTML के `lang` और `dir` एट्रिब्यूट्स को लोकल के आधार पर सेट करता है, जो पहुंच और सर्च इंजन की समझ के लिए महत्वपूर्ण है।

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// डायनामिक पैरामीटर को अक्षम करें - सभी लोकल्स को बिल्ड समय पर जाना जाना चाहिए
// यह सभी लोकल रूट्स के लिए स्थैतिक जेनरेशन सुनिश्चित करता है
export const dynamicParams = false;

/**
 * बिल्ड समय पर सभी लोकल्स के लिए स्थैतिक पैरामीटर जनरेट करें
 * Next.js यहां लौटाए गए प्रत्येक लोकल के लिए पेज प्री-रेंडर करेगा
 * उदाहरण: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * रूट लेआउट कॉम्पोनेंट जो लोकल-विशिष्ट HTML एट्रिब्यूट्स को संभालता है
 * लोकल के आधार पर lang एट्रिब्यूट और टेक्स्ट दिशा (ltr/rtl) सेट करता है
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  /// URL पैरामीटर से locale को मान्य करें
  // यदि अमान्य locale प्रदान किया गया है, तो डिफ़ॉल्ट locale पर वापस जाएं
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // locale के आधार पर टेक्स्ट दिशा निर्धारित करें
  // अरबी जैसी RTL भाषाओं के लिए सही टेक्स्ट रेंडरिंग हेतु dir="rtl" आवश्यक है
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### चरण 8: अपनी अनुवाद फ़ाइलें बनाएं

प्रत्येक locale और namespace के लिए JSON फ़ाइलें बनाएं। यह संरचना आपको अनुवादों को तार्किक रूप से व्यवस्थित करने और केवल उस पृष्ठ के लिए आवश्यक अनुवाद लोड करने की अनुमति देती है।

नामस्थान (namespace) के अनुसार अनुवादों को व्यवस्थित करना (जैसे, `common.json`, `about.json`) कोड स्प्लिटिंग को सक्षम बनाता है और बंडल का आकार कम करता है। आप केवल उन अनुवादों को लोड करते हैं जो प्रत्येक पेज के लिए आवश्यक होते हैं, जिससे प्रदर्शन में सुधार होता है।

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/hi/home.json"
{
  "title": "मुखपृष्ठ",
  "description": "मुखपृष्ठ विवरण",
  "welcome": "स्वागत है",
  "greeting": "नमस्ते, दुनिया!",
  "aboutPage": "के बारे में पृष्ठ",
  "documentation": "प्रलेखन"
}
```

```json fileName="src/locales/hi/about.json"
{
  "title": "के बारे में",
  "description": "के बारे में पृष्ठ विवरण",
  "counter": {
    "label": "काउंटर",
    "increment": "बढ़ाएं",
    "description": "काउंटर बढ़ाने के लिए बटन पर क्लिक करें"
  }
}
```

### चरण 9: अपने पृष्ठों में अनुवादों का उपयोग करें

एक पेज कॉम्पोनेंट बनाएं जो सर्वर पर i18next को इनिशियलाइज़ करता है और अनुवादों को सर्वर और क्लाइंट दोनों कॉम्पोनेंट्स को पास करता है। यह सुनिश्चित करता है कि अनुवाद रेंडरिंग से पहले लोड हो जाएं और कंटेंट फ्लैशिंग से बचा जा सके।

सर्वर-साइड इनिशियलाइज़ेशन पेज के रेंडर होने से पहले अनुवाद लोड करता है, जिससे SEO बेहतर होता है और FOUC (फ्लैश ऑफ अनस्टाइल्ड कंटेंट) से बचाव होता है। प्रीलोडेड रिसोर्सेज को क्लाइंट प्रोवाइडर को पास करके, हम डुप्लिकेट फेचिंग से बचते हैं और स्मूथ हाइड्रेशन सुनिश्चित करते हैं।

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * सर्वर कंपोनेंट पेज जो i18n इनिशियलाइज़ेशन को संभालता है
 * सर्वर पर अनुवादों को प्री-लोड करता है और उन्हें क्लाइंट कंपोनेंट्स को पास करता है
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // परिभाषित करें कि इस पेज को कौन से अनुवाद नेमस्पेस की आवश्यकता है
  // टाइप सुरक्षा और ऑटोकंप्लीट के लिए केंद्रीकृत सूची का पुन: उपयोग करें
  const pageNamespaces = allNamespaces;

  // आवश्यक नेमस्पेस के साथ सर्वर पर i18next को इनिशियलाइज़ करें
  // यह सर्वर-साइड अनुवाद JSON फ़ाइलें लोड करता है
  const i18n = await initI18next(locale, pageNamespaces);

  // "about" namespace के लिए एक स्थिर अनुवाद फ़ंक्शन प्राप्त करें
  // getFixedT namespace को लॉक करता है, इसलिए t("title") का उपयोग करें बजाय t("about:title") के
  const tAbout = i18n.getFixedT(locale, "about");

  // i18n instance से अनुवाद बंडल निकालें
  // यह डेटा I18nProvider को पास किया जाता है ताकि क्लाइंट-साइड i18n को हाइड्रेट किया जा सके
  // FOUC (Flash of Untranslated Content) को रोकता है और डुप्लिकेट fetching से बचाता है
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### चरण 10: क्लाइंट कंपोनेंट्स में अनुवाद का उपयोग करें

क्लाइंट कंपोनेंट्स अनुवादों तक पहुँचने के लिए `useTranslation` हुक का उपयोग कर सकते हैं। यह हुक अनुवाद फ़ंक्शन और i18n इंस्टेंस तक पहुँच प्रदान करता है, जिससे आप सामग्री का अनुवाद कर सकते हैं और लोकल जानकारी प्राप्त कर सकते हैं।

क्लाइंट कंपोनेंट्स को अनुवादों तक पहुँचने के लिए React हुक्स की आवश्यकता होती है। `useTranslation` हुक i18next के साथ सहजता से एकीकृत होता है और जब लोकल बदलता है तो प्रतिक्रियाशील अपडेट प्रदान करता है।

> सुनिश्चित करें कि पेज/प्रोवाइडर में केवल आवश्यक namespaces शामिल हों (जैसे, `about`)।  
> यदि आप React < 19 का उपयोग कर रहे हैं, तो भारी फॉर्मेटर्स जैसे `Intl.NumberFormat` को मेमोज़ करें।

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * क्लाइंट कंपोनेंट उदाहरण जो React hooks का उपयोग करता है अनुवादों के लिए
 * useState, useEffect, और useTranslation जैसे hooks का उपयोग कर सकता है
 */
const ClientComponent = () => {
  // useTranslation hook अनुवाद फ़ंक्शन और i18n इंस्टेंस तक पहुंच प्रदान करता है
  // केवल "about" namespace के अनुवाद लोड करने के लिए namespace निर्दिष्ट करें
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // locale-संवेदनशील संख्या स्वरूपक बनाएँ
  // i18n.language वर्तमान locale प्रदान करता है (जैसे, "en", "fr")
  // Intl.NumberFormat संख्याओं को locale के अनुसार स्वरूपित करता है
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* स्थानीय-विशिष्ट स्वरूपण का उपयोग करके संख्या स्वरूपित करें */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### चरण 11: सर्वर कंपोनेंट्स में अनुवादों का उपयोग करें

सर्वर कंपोनेंट्स React hooks का उपयोग नहीं कर सकते हैं, इसलिए वे अपने पैरेंट कंपोनेंट्स से props के माध्यम से अनुवाद प्राप्त करते हैं। यह तरीका सर्वर कंपोनेंट्स को synchronous बनाए रखता है और उन्हें क्लाइंट कंपोनेंट्स के अंदर नेस्ट करने की अनुमति देता है।

सर्वर कंपोनेंट्स जो क्लाइंट बाउंड्रीज़ के अंतर्गत नेस्ट हो सकते हैं, उन्हें synchronous होना आवश्यक है। अनुवादित स्ट्रिंग्स और locale जानकारी को props के रूप में पास करके, हम async ऑपरेशंस से बचते हैं और सही रेंडरिंग सुनिश्चित करते हैं।

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // पैरेंट सर्वर कंपोनेंट से पास किया गया अनुवाद फ़ंक्शन
  // सर्वर कंपोनेंट्स hooks का उपयोग नहीं कर सकते, इसलिए अनुवाद props के माध्यम से आते हैं
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * सर्वर कंपोनेंट उदाहरण - अनुवाद props के माध्यम से प्राप्त करता है
 * क्लाइंट कंपोनेंट्स (async सर्वर कंपोनेंट्स) के अंदर नेस्ट किया जा सकता है
 * React hooks का उपयोग नहीं कर सकता, इसलिए सभी डेटा props या async ऑपरेशंस से आना चाहिए
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // locale का उपयोग करके सर्वर-साइड नंबर फॉर्मेट करें
  // यह SSR के दौरान सर्वर पर चलता है, जिससे प्रारंभिक पेज लोड बेहतर होता है
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* prop के रूप में पास किए गए अनुवाद फ़ंक्शन का उपयोग करें */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (वैकल्पिक) चरण 12: अपनी सामग्री की भाषा बदलें

Next.js में अपनी सामग्री की भाषा बदलने के लिए, अनुशंसित तरीका है locale-पूर्वसर्ग वाले URL और Next.js लिंक का उपयोग करना। नीचे दिया गया उदाहरण वर्तमान locale को route से पढ़ता है, pathname से इसे हटाता है, और उपलब्ध प्रत्येक locale के लिए एक लिंक रेंडर करता है।

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="भाषा चयनकर्ता">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

        const href =
          locale === defaultLocale ? basePath : `/${locale}${basePath}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "पृष्ठ" : undefined}
            onClick={() => {
              document.cookie = getCookie(locale);
            }}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (वैकल्पिक) चरण 13: एक स्थानीयकृत Link कॉम्पोनेंट बनाएं

अपने ऐप में स्थानीयकृत URLs का पुन: उपयोग नेविगेशन को सुसंगत और SEO-अनुकूल बनाए रखता है। `next/link` को एक छोटे हेल्पर में लपेटें जो आंतरिक रूट्स के सामने सक्रिय locale जोड़ता है जबकि बाहरी URLs को अपरिवर्तित छोड़ता है।

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> सुझाव: क्योंकि `LocalizedLink` एक ड्रॉप-इन रिप्लेसमेंट है, इसलिए आयातों को धीरे-धीरे बदलकर और कंपोनेंट को locale-विशिष्ट URLs संभालने दें, क्रमिक रूप से माइग्रेट करें।

### (वैकल्पिक) चरण 14: सर्वर एक्शन्स के अंदर सक्रिय locale तक पहुँचें

सर्वर एक्शन्स को अक्सर ईमेल, लॉगिंग, या थर्ड-पार्टी इंटीग्रेशन के लिए वर्तमान locale की आवश्यकता होती है। अपने प्रॉक्सी द्वारा सेट किए गए locale कुकी को `Accept-Language` हेडर के साथ एक फॉलबैक के रूप में संयोजित करें।

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// वर्तमान locale का उपयोग करने वाली सर्वर क्रिया का उदाहरण
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // स्थानीयकृत साइड इफेक्ट्स (ईमेल, CRM, आदि) के लिए locale का उपयोग करें
  console.log(`Stuff from server with locale ${locale}`);
}
```

> क्योंकि यह हेल्पर Next.js कुकीज़ और हेडर्स पर निर्भर करता है, यह Route Handlers, Server Actions, और अन्य केवल सर्वर-संदर्भों में काम करता है।

### (वैकल्पिक) चरण 15: अपने मेटाडेटा का अंतरराष्ट्रीयकरण करें

सामग्री का अनुवाद करना महत्वपूर्ण है, लेकिन अंतरराष्ट्रीयकरण का मुख्य उद्देश्य आपकी वेबसाइट को दुनिया के लिए अधिक दृश्यनीय बनाना है। I18n आपकी वेबसाइट की दृश्यता को उचित SEO के माध्यम से बढ़ाने के लिए एक अद्भुत साधन है।

सही तरीके से अंतरराष्ट्रीयकृत मेटाडेटा खोज इंजन को यह समझने में मदद करता है कि आपकी पृष्ठों पर कौन-कौन सी भाषाएँ उपलब्ध हैं। इसमें hreflang मेटा टैग सेट करना, शीर्षक और विवरणों का अनुवाद करना, और प्रत्येक लोकल के लिए कैनोनिकल URL सही ढंग से सेट करना शामिल है।

यहाँ बहुभाषी SEO के संबंध में कुछ अच्छी प्रथाओं की सूची है:

- `<head>` टैग में hreflang मेटा टैग सेट करें ताकि सर्च इंजन समझ सकें कि पेज पर कौन-कौन सी भाषाएँ उपलब्ध हैं
- sitemap.xml में सभी पेज अनुवादों को `http://www.w3.org/1999/xhtml` XML स्कीमा का उपयोग करके सूचीबद्ध करें
- robots.txt से प्रीफिक्स वाले पेजों को बाहर निकालना न भूलें (जैसे, `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- सबसे स्थानीयकृत पेज पर रीडायरेक्ट करने के लिए कस्टम Link कंपोनेंट का उपयोग करें (जैसे, फ्रेंच में `<a href="/fr/about">À propos</a>`)

डेवलपर्स अक्सर अपने पेजों को विभिन्न लोकल्स में सही ढंग से संदर्भित करना भूल जाते हैं। आइए इसे ठीक करें:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * प्रत्येक लोकल संस्करण के लिए SEO मेटाडेटा जनरेट करें
 * यह फ़ंक्शन प्रत्येक locale के लिए build समय पर चलता है
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // इस locale के लिए अनुवाद फ़ाइल को डायनामिक रूप से इम्पोर्ट करें
  // मेटाडेटा के लिए अनुवादित शीर्षक और विवरण प्राप्त करने के लिए उपयोग किया जाता है
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // सभी locales के लिए hreflang मैपिंग बनाएं
  // खोज इंजन को भाषा विकल्प समझने में मदद करता है
  // प्रारूप: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // इस लोकल संस्करण के लिए कैनोनिकल URL
      canonical: absoluteUrl(locale, "/about"),
      // SEO के लिए भाषा विकल्प (hreflang टैग्स)
      // "x-default" डिफ़ॉल्ट लोकल संस्करण निर्दिष्ट करता है
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

### (वैकल्पिक) चरण 16: अपने साइटमैप को अंतरराष्ट्रीयकृत करें

एक साइटमैप बनाएं जिसमें आपके पृष्ठों के सभी लोकल संस्करण शामिल हों। यह सर्च इंजन को आपकी सामग्री के सभी भाषा संस्करणों को खोजने और इंडेक्स करने में मदद करता है।

एक सही तरीके से अंतरराष्ट्रीयकृत साइटमैप सुनिश्चित करता है कि सर्च इंजन आपके पृष्ठों के सभी भाषा संस्करणों को खोज और इंडेक्स कर सके। इससे अंतरराष्ट्रीय खोज परिणामों में दृश्यता में सुधार होता है।

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// स्थानीयकृत पथ स्वरूपित करने का फ़ंक्शन
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

ts fileName="src/app/sitemap.ts"
// बेहतर SEO के लिए सभी locale वेरिएंट्स के साथ साइटमैप जनरेट करें
// alternates फ़ील्ड सर्च इंजनों को भाषा संस्करणों के बारे में बताता है
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

### (वैकल्पिक) चरण 17: अपने robots.txt को अंतरराष्ट्रीयकृत करें

अपने संरक्षित रूट्स के सभी लोकल संस्करणों को सही ढंग से संभालने के लिए एक robots.txt फ़ाइल बनाएं। यह सुनिश्चित करता है कि सर्च इंजन किसी भी भाषा में एडमिन या डैशबोर्ड पेजों को इंडेक्स न करें।

सभी लोकल के लिए robots.txt को सही तरीके से कॉन्फ़िगर करने से सर्च इंजन संवेदनशील पृष्ठों को किसी भी भाषा में इंडेक्स करने से रोकता है। यह सुरक्षा और गोपनीयता के लिए महत्वपूर्ण है।

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// सभी लोकल के लिए पथ उत्पन्न करें (जैसे, /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (वैकल्पिक) चरण 18: लोकल रूटिंग के लिए मिडलवेयर सेट करें

एक प्रॉक्सी बनाएं जो स्वचालित रूप से उपयोगकर्ता की पसंदीदा भाषा का पता लगाए और उन्हें उपयुक्त लोकल-प्रिफिक्स्ड URL पर पुनः निर्देशित करे। यह उपयोगकर्ता अनुभव को बेहतर बनाता है क्योंकि सामग्री उनकी पसंदीदा भाषा में दिखाई जाती है।

मिडलवेयर यह सुनिश्चित करता है कि जब उपयोगकर्ता आपकी साइट पर आते हैं तो उन्हें स्वचालित रूप से उनकी पसंदीदा भाषा में पुनः निर्देशित किया जाए। यह भविष्य की यात्राओं के लिए उपयोगकर्ता की पसंद को कुकी में भी सहेजता है।

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// एक्सटेंशन्स वाले फाइलों से मेल खाने के लिए Regex (जैसे .js, .css, .png)
// लोकल रूटिंग से स्टैटिक एसेट्स को बाहर करने के लिए उपयोग किया जाता है
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Accept-Language हेडर से लोकल निकालना
 * "fr-CA", "en-US" जैसे फॉर्मेट्स को संभालता है
 * अगर ब्राउज़र भाषा समर्थित नहीं है तो डिफ़ॉल्ट लोकल पर वापस जाता है
 */
const pickLocale = (accept: string | null) => {
  // पहली भाषा प्राथमिकता प्राप्त करें (जैसे "fr-CA" से "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // बेस भाषा कोड निकालें (जैसे "fr" से "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // जांचें कि क्या हम इस लोकल का समर्थन करते हैं, अन्यथा डिफ़ॉल्ट का उपयोग करें
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Next.js के लिए locale पहचान और रूटिंग का प्रॉक्सी
 * पेज रेंडर होने से पहले हर अनुरोध पर चलता है
 * आवश्यक होने पर स्वचालित रूप से locale-पूर्वसर्ग वाले URL पर पुनर्निर्देशित करता है
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Next.js के आंतरिक हिस्सों, API रूट्स, और स्थैतिक फाइलों के लिए प्रॉक्सी को छोड़ दें
  // इन्हें locale-पूर्वसर्ग नहीं होना चाहिए
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // जांचें कि URL में पहले से ही locale पूर्वसर्ग है या नहीं
  // उदाहरण: "/fr/about" या "/en" सही लौटाएगा
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // यदि कोई locale उपसर्ग नहीं है, तो locale का पता लगाएं और पुनर्निर्देशित करें
  if (!hasLocale) {
    // पहले कुकी से locale प्राप्त करने का प्रयास करें (उपयोगकर्ता की प्राथमिकता)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // यदि कुकी locale मान्य है तो उसका उपयोग करें, अन्यथा ब्राउज़र हेडर से पता लगाएं
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // pathname संशोधित करने के लिए URL क्लोन करें
    const url = request.nextUrl.clone();
    // pathname में locale उपसर्ग जोड़ें
    // डबल स्लैश से बचने के लिए रूट पथ को विशेष रूप से संभालें
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // रीडायरेक्ट प्रतिक्रिया बनाएं और locale कुकी सेट करें
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // सभी पथों से मेल खाएं सिवाय:
    // - API रूट्स (/api/*)
    // - Next.js आंतरिक (/_next/*)
    // - स्थैतिक फाइलें (/static/*)
    // - एक्सटेंशन वाली फाइलें (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (वैकल्पिक) चरण 19: Intlayer का उपयोग करके अपने अनुवादों को स्वचालित करें

Intlayer एक **मुफ्त** और **ओपन-सोर्स** लाइब्रेरी है जो आपके एप्लिकेशन में स्थानीयकरण प्रक्रिया में सहायता करने के लिए डिज़ाइन की गई है। जबकि i18next अनुवाद लोडिंग और प्रबंधन को संभालता है, Intlayer अनुवाद कार्यप्रवाह को स्वचालित करने में मदद करता है।

अनुवादों का प्रबंधन मैन्युअल रूप से करना समय लेने वाला और त्रुटिपूर्ण हो सकता है। Intlayer अनुवाद परीक्षण, निर्माण, और प्रबंधन को स्वचालित करता है, जिससे आपका समय बचता है और आपके एप्लिकेशन में स्थिरता सुनिश्चित होती है।

Intlayer आपको निम्नलिखित सुविधाएँ प्रदान करता है:

- **अपने कोडबेस में अपनी सामग्री जहाँ चाहें घोषित करें**
  Intlayer आपको `.content.{ts|js|json}` फाइलों का उपयोग करके अपनी सामग्री अपने कोडबेस में जहाँ चाहें घोषित करने की अनुमति देता है। यह आपकी सामग्री के बेहतर संगठन की अनुमति देगा, जिससे आपके कोडबेस की पठनीयता और रखरखाव में सुधार होगा।

- **लापता अनुवादों का परीक्षण करें**
  Intlayer परीक्षण फ़ंक्शन प्रदान करता है जिन्हें आप अपनी CI/CD पाइपलाइन में या अपनी यूनिट टेस्ट में एकीकृत कर सकते हैं। अपने अनुवादों के परीक्षण के बारे में अधिक जानने के लिए देखें [testing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/testing.md)।

- **अपने अनुवादों को स्वचालित करें**,
  Intlayer आपके अनुवादों को स्वचालित करने के लिए एक CLI और VSCode एक्सटेंशन प्रदान करता है। इसे आपके CI/CD पाइपलाइन में एकीकृत किया जा सकता है। [अपने अनुवादों को स्वचालित करने के बारे में अधिक जानें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)।
  आप अपनी **अपनी API कुंजी और अपनी पसंद के AI प्रदाता का उपयोग कर सकते हैं**। यह संदर्भ-सचेत अनुवाद भी प्रदान करता है, देखें [सामग्री भरें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md)।

- **बाहरी सामग्री से कनेक्ट करें**
- **अपने अनुवादों को स्वचालित करें**,  
  Intlayer एक CLI और एक VSCode एक्सटेंशन प्रदान करता है ताकि आप अपने अनुवादों को स्वचालित कर सकें। इसे आपकी CI/CD पाइपलाइन में एकीकृत किया जा सकता है। [अपने अनुवादों को स्वचालित करने](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के बारे में अधिक जानें।  
  आप अपनी **अपनी API कुंजी और अपनी पसंद के AI प्रदाता** का उपयोग कर सकते हैं। यह संदर्भ-सचेत अनुवाद भी प्रदान करता है, देखें [सामग्री भरें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md)।

- **बाहरी सामग्री से कनेक्ट करें**  
  Intlayer आपको अपनी सामग्री को एक बाहरी कंटेंट मैनेजमेंट सिस्टम (CMS) से जोड़ने की अनुमति देता है। इसे एक अनुकूलित तरीके से प्राप्त करने और अपनी JSON संसाधनों में सम्मिलित करने के लिए। [बाहरी सामग्री प्राप्त करने](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/function_fetching.md) के बारे में अधिक जानें।

- **विज़ुअल एडिटर**  
  Intlayer एक मुफ्त विज़ुअल एडिटर प्रदान करता है जिससे आप अपनी सामग्री को विज़ुअल एडिटर का उपयोग करके संपादित कर सकते हैं। [अपने अनुवादों का विज़ुअल संपादन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) के बारे में अधिक जानें।

और भी बहुत कुछ। Intlayer द्वारा प्रदान की गई सभी विशेषताओं को खोजने के लिए, कृपया [Intlayer के महत्व की दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।
