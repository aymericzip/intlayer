---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: Next.js में SEO और i18n
description: next-intl, next-i18next, और Intlayer का उपयोग करके अपने Next.js ऐप में बहुभाषी SEO सेटअप करना सीखें।
keywords:
  - Intlayer
  - SEO
  - अंतरराष्ट्रीयकरण
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - seo
  - i18n
  - nextjs
---

# Next.js में SEO और i18n: केवल अनुवाद करना पर्याप्त नहीं है

जब डेवलपर्स अंतरराष्ट्रीयकरण (i18n) के बारे में सोचते हैं, तो पहला प्रतिक्रिया अक्सर होती है: _सामग्री का अनुवाद करें_। लेकिन लोग आमतौर पर भूल जाते हैं कि अंतरराष्ट्रीयकरण का मुख्य उद्देश्य आपकी वेबसाइट को दुनिया के लिए अधिक दृश्यनीय बनाना है।
यदि आपका बहुभाषी Next.js ऐप सर्च इंजन को यह नहीं बताता कि आपकी विभिन्न भाषा संस्करणों को कैसे क्रॉल और समझा जाए, तो आपका अधिकांश प्रयास अनदेखा रह सकता है।

इस ब्लॉग में, हम यह पता लगाएंगे कि **क्यों i18n एक SEO सुपरपावर है** और इसे Next.js में `next-intl`, `next-i18next`, और `Intlayer` के साथ सही तरीके से कैसे लागू किया जाए।

---

## क्यों SEO और i18n

भाषाएँ जोड़ना केवल UX के बारे में नहीं है। यह **ऑर्गेनिक विजिबिलिटी** के लिए एक शक्तिशाली साधन भी है। यहाँ कारण हैं:

1. **बेहतर खोज योग्यता:** सर्च इंजन स्थानीयकृत संस्करणों को इंडेक्स करते हैं और उपयोगकर्ताओं के लिए उनकी मातृभाषा में खोज करने पर उन्हें रैंक करते हैं।
2. **डुप्लिकेट सामग्री से बचाव:** उचित कैनोनिकल और वैकल्पिक टैग क्रॉलर को बताते हैं कि कौन सा पेज किस लोकल का है।
3. **बेहतर UX:** आगंतुक तुरंत आपकी साइट के सही संस्करण पर पहुँचते हैं।
4. **प्रतिस्पर्धात्मक लाभ:** कुछ ही साइटें बहुभाषी SEO को अच्छी तरह लागू करती हैं, जिसका मतलब है कि आप अलग दिख सकते हैं।

---

## Next.js में बहुभाषी SEO के लिए सर्वोत्तम प्रथाएँ

यहाँ एक चेकलिस्ट है जिसे हर बहुभाषी ऐप को लागू करना चाहिए:

- **`<head>` में `hreflang` मेटा टैग सेट करें**  
  यह Google को समझने में मदद करता है कि प्रत्येक भाषा के लिए कौन-कौन से संस्करण मौजूद हैं।

- **सभी अनुवादित पृष्ठों को `sitemap.xml` में सूचीबद्ध करें**  
  `xhtml` स्कीमा का उपयोग करें ताकि क्रॉलर वैकल्पिक पृष्ठों को आसानी से खोज सकें।

- **`robots.txt` में निजी/स्थानीयकृत रूट्स को बाहर करें**  
  उदाहरण के लिए, `/dashboard`, `/fr/dashboard`, `/es/dashboard` को इंडेक्स न होने दें।

- **स्थानीयकृत लिंक का उपयोग करें**  
  उदाहरण: डिफ़ॉल्ट `/about` के बजाय `<a href="/fr/about">À propos</a>` का उपयोग करें।

ये सरल कदम हैं — लेकिन इन्हें छोड़ना आपकी दृश्यता को प्रभावित कर सकता है।

---

## कार्यान्वयन उदाहरण

डेवलपर्स अक्सर अपने पृष्ठों को विभिन्न स्थानीय भाषाओं में सही ढंग से संदर्भित करना भूल जाते हैं, इसलिए आइए देखें कि यह विभिन्न लाइब्रेरीज़ के साथ व्यावहारिक रूप में कैसे काम करता है।

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// स्थानीयकृत पथ प्राप्त करने का फ़ंक्शन
function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
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

// ... पृष्ठ कोड का बाकी हिस्सा
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** डिफ़ॉल्ट लोकल के अलावा लोकल के साथ पथ को प्रीफिक्स करें */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** पूर्ण URL सहायक */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // सही JSON फ़ाइल को गतिशील रूप से आयात करें
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * प्रत्येक लोकल के लिए सभी URL वाले ऑब्जेक्ट को जनरेट करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // रिटर्न करता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... पेज कोड का बाकी हिस्सा
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// सभी मल्टीलिंगुअल URL को एकत्रित करता है
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// रोबोट्स नियम सेट करता है
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // सभी यूजर एजेंट्स के लिए नियम
    allow: ["/"], // अनुमति प्राप्त पथ
    disallow: getAllMultilingualUrls(["/dashboard"]), // निषिद्ध पथ
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer आपके साइटमैप के लिए मल्टीलिंगुअल URL जनरेट करने के लिए `getMultilingualUrls` फ़ंक्शन प्रदान करता है।

  </TabItem>
</Tabs>

---

## निष्कर्ष

Next.js में i18n को सही तरीके से लागू करना केवल टेक्स्ट का अनुवाद करने के बारे में नहीं है, बल्कि यह सुनिश्चित करने के बारे में है कि सर्च इंजन और उपयोगकर्ता ठीक उसी संस्करण को जानें जो आपकी सामग्री का सर्वर करना है।
hreflang, साइटमैप, और रोबोट्स नियम सेट करना वह है जो अनुवादों को वास्तविक SEO मूल्य में बदल देता है।

जबकि next-intl और next-i18next आपको इसे सेटअप करने के ठोस तरीके देते हैं, वे आमतौर पर स्थानीय संस्करणों के बीच संगति बनाए रखने के लिए बहुत मैनुअल सेटअप की आवश्यकता होती है।

यहीं पर Intlayer वास्तव में चमकता है:

यह getMultilingualUrls जैसे बिल्ट-इन हेल्पर्स के साथ आता है, जो hreflang, साइटमैप, और रोबोट्स इंटीग्रेशन को लगभग बिना किसी प्रयास के बनाता है।

मेटाडेटा JSON फ़ाइलों या कस्टम यूटिलिटीज़ में बिखरे होने के बजाय केंद्रीकृत रहता है।

यह पूरी तरह से Next.js के लिए डिज़ाइन किया गया है, इसलिए आप कॉन्फ़िगरेशन डिबग करने में कम समय और शिपिंग में अधिक समय व्यतीत करते हैं।

यदि आपका लक्ष्य केवल अनुवाद करना नहीं बल्कि बिना किसी रुकावट के मल्टीलिंगुअल SEO को स्केल करना है, तो Intlayer आपको सबसे साफ़, सबसे भविष्य-सबूत सेटअप प्रदान करता है।
