---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, बहुभाषी SEO के लिए गाइड"
description: "Hreflang क्या है, search engines द्वारा लागू किए जाने वाले नियम, x-default लगभग हमेशा गलत क्यों है, और Next.js और TanStack Start में सही tags कैसे generate करें।"
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: बहुभाषी SEO के लिए गाइड

आपने अपने ऐप को translate किया। आपने `/en`, `/fr`, `/es` ship किए। और फ्रांसीसी users अभी भी English पेज पर लैंड कर रहे हैं।

अनुवाद करना आसान आधा है। कठिन आधा यह है कि सर्च इंजन को बताया जाए कि ये पेज **दूसरी भाषा में एक ही पेज हैं**, तीन दस्तावेज़ जो एक-दूसरे के साथ प्रतिस्पर्धा कर रहे हैं। यह वही है जो `hreflang` करता है, और यह वह जगह है जहां ज्यादातर बहुभाषी साइटें चुप-चाप अपनी ट्रैफिक खो देती हैं।

---

## Hreflang वास्तव में क्या है

एक पेज पर एक एनोटेशन जो कहता है: _इस URL के उन भाषाओं के लिए समान संस्करण हैं।_

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

यह आपको दो चीजें देता है: सही उपयोगकर्ता को सही संस्करण दिखाया जाना, और आपके locales को एक cluster में consolidated करना बजाय duplicates के रूप में एक-दूसरे को cannibalize करने के।

यह स्पष्ट होना महत्वपूर्ण है कि यह क्या नहीं है। यह **redirect नहीं है** — यह एक hint है, और Google इसे override कर सकता है। यह **ranking boost नहीं है** — यह बदलता है _कौन सा_ version ranks करता है, न कि _क्या_ आप rank करते हैं। और Bing इसे पूरी तरह ignore करता है, इसके बजाय `content-language` और geo-targeting पर भरोसा करता है।

---

## इसे कहाँ declare करें

तीन placements, सभी valid हैं। एक चुनें और वहीं रहें — एक ही cluster को दो जगहों पर declare करना यह है कि sets कैसे अलग हो जाते हैं।

**HTML `<head>`** सामान्य विकल्प है। एक caveat: hydration के बाद inject किए गए tags unreliable हैं। यदि आपका framework केवल client-side पर उन्हें add करता है, तो crawler उन्हें कभी नहीं देख सकता है।

**XML sitemap** बड़े पैमाने पर बेहतर है। दस locales को 5,000 pages में फैलाने का मतलब है 50,000 `<link>` elements को browsers में बेकार भेजना; एक sitemap में इसकी कीमत आपकी pages से शून्य bytes है।

**HTTP `Link` header** PDFs जैसी गैर-HTML files के लिए एकमात्र विकल्प है।

---

## नियम

### Self-reference और reciprocity

`/fr/about` पर सेट में `hreflang="fr"` होना चाहिए जो `/fr/about` की ओर इशारा करे। और अगर `/about` `/fr/about` की ओर इशारा करता है, तो `/fr/about` को वापस इशारा करना चाहिए। Google एकतरफा reference को "no return tag" कहता है और इसे drop कर देता है।

व्यावहारिक रूप से इसका मतलब है कि **एक cluster में प्रत्येक page identical links का सेट भेजता है**। उन्हें एक shared locale list से generate करना सुविधा नहीं है, यह सही रहने का एकमात्र तरीका है एक बार जब आपके पास दो से अधिक locales हों।

### Absolute URLs, हमेशा

```html
<!-- मूक रूप से अनदेखा किया गया -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- सही -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

इसका कारण समझना महत्वपूर्ण है बजाय इसे याद रखने के। `hreflang` एक cross-document reference है: search engines एक cluster बनाते हैं जो URL से keyed होता है, इसमें शामिल हर page में साझा किया जाता है। एक relative path का केवल उस document के सापेक्ष अर्थ है जिसमें यह बैठा है, इसलिए यह इसे express नहीं कर सकता। यह एक host को भी cross नहीं कर सकता — और एक alternate अक्सर ऐसा करता है, जब एक locale `example.fr` या `fr.example.com` पर रहता है। एक sitemap या एक HTTP header में resolve करने के लिए कोई base document नहीं है।

इसका कोड में सीधा प्रभाव पड़ता है। `getLocalizedUrl("/about", "fr")` `/fr/about` देता है — relative in, relative out। `hreflang` के लिए आपको इसे एक absolute URL देना चाहिए:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ dropped
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

एक अपवाद है एक framework जो rendering से पहले relative values को आपके लिए resolve करता है: Next.js relative `alternates` को `metadataBase` के विरुद्ध expand करता है। ठीक है — लेकिन नियम **emitted HTML** पर लागू होता है, इसलिए `curl` के साथ जांच करें, DevTools inspector नहीं।

### भाषा कोड

ISO 639-1 भाषा के लिए, ISO 3166-1 Alpha 2 optional region के लिए: `fr`, `fr-CA`, `pt-BR`।

दो समस्याएं लगभग सभी को पकड़ती हैं। केवल एक region अमान्य है — `hreflang="ca"` कातालान है, कनाडा नहीं; आपको `en-CA` या `fr-CA` की आवश्यकता है। और `en-UK` मौजूद नहीं है: यूनाइटेड किंगडम के लिए country code `GB` है, इसलिए यह `en-GB` है।

केवल तभी एक region जोड़ें जब आप वास्तव में उस region को अलग content provide करते हों — अलग कीमतें, अलग कानूनी नोटिस। `fr` और `fr-FR` समान content पर शोर है।

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

एक अवधारणा जो सबसे अधिक भूली हुई है, और गलत तरीके से समझी जाती है, वह है `x-default` — 30% से भी कम apps इसे सही तरीके से लागू करते हैं।

यह उन उपयोगकर्ताओं के लिए fallback है जिनकी भाषा आपके सेट में किसी भी चीज़ से मेल नहीं खाती। एक डच भाषी व्यक्ति एक ऐसी साइट पर जो अंग्रेजी, फ्रेंच और स्पेनिश प्रदान करती है, किसी भी प्रविष्टि से मेल नहीं खाता; बिना `x-default` के, Google आपके लिए चुनता है।

लोग इसका मतलब गलत समझते हैं। `x-default` **"अंग्रेजी संस्करण" नहीं है** और **"डिफॉल्ट locale" नहीं है**, भले ही यह आमतौर पर वहां इशारा करता है। इसका मतलब है _उन उपयोगकर्ताओं के लिए पृष्ठ जिन्हें यह सेट cover नहीं करता_। यही कारण है कि यह legitimate है — और अक्सर बेहतर है — इसे `/en` के बजाय एक language-selector या geo-redirecting landing page पर इशारा करना। यदि आपके पास ऐसा कोई पृष्ठ नहीं है, तो आपकी primary language एक sensible उत्तर है।

दो चीजें स्पष्ट रखने के लिए: `x-default` सेट में एक अतिरिक्त entry है, self-referencing वाले की जगह नहीं, और हर दूसरी entry की तरह इसे cluster के हर पेज पर identically दिखना चाहिए।

---

## कैनोनिकल ट्रैप

प्रत्येक localized पेज **अपना खुद का canonical** होना चाहिए:

```html
<!-- https://example.com/fr/about पर -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

हर locale के canonical को English version की ओर इंगित करना इसके बजाय:

```html
<!-- https://example.com/fr/about पर — पेज को हटा देता है -->
<link rel="canonical" href="https://example.com/about" />
```

कहता है कि फ्रेंच पेज एक डुप्लिकेट है जिसे इंडेक्स नहीं किया जाना चाहिए, जबकि `hreflang` कहता है कि यह फ्रेंच उपयोगकर्ताओं को परोसने के लिए पेज है। सिग्नल विरोधाभासी हैं, canonical जीतता है, और आपके फ्रेंच पेज इंडेक्स से बाहर निकल जाते हैं।

**Canonical स्व-संदर्भी है प्रति लोकेल। `hreflang` क्लस्टर का वर्णन करता है।**

---

## URL संरचना चुनना

`hreflang` URLs को एनोटेट करता है, इसलिए संरचना पहले आती है।

| संरचना             | उदाहरण            | Trade-off                                                        |
| ------------------ | ----------------- | ---------------------------------------------------------------- |
| **Subdirectories** | `example.com/fr/` | एक डोमेन, साझा authority — कमजोर geo-signal                      |
| **Subdomains**     | `fr.example.com`  | लोकेल जोड़ना या हटाना आसान — अलग साइट के रूप में पढ़ा जा सकता है |
| **ccTLDs**         | `example.fr`      | सबसे मजबूत देश संकेत — प्रत्येक domain के लिए authority बनाई गई  |

Subdirectories अधिकांश projects के लिए सही default हैं। ccTLDs तक केवल तब पहुंचें जब आप वाकई अलग-अलग देशों के businesses के रूप में काम कर रहे हों।

एक structure जिससे बचना है: **same URL** पर विभिन्न languages को `Accept-Language` या IP के आधार पर serve करना। Crawlers एक version देखते हैं और एक version को index करते हैं; बाकी सब अदृश्य है।

> Intlayer तीनों को `routing.mode` और `routing.domains` के माध्यम से cover करता है। [custom domains](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/custom_domains.md) और [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

---

## Implementation

इन टैग्स को हाथ से लिखना दूसरे locale के साथ संपर्क में नहीं टिकता। इसके बजाय उन्हें अपनी locale सूची से प्राप्त करें।

<Steps>

<Step number={1} title="हर पेज पर cluster emit करें">

हर जगह एक ही सेट, हर locale के लिए canonical, absolute URLs, `x-default` शामिल।

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata API `alternates.languages` को expose करता है, और `getMultilingualUrls` आपकी configured locales से पूरा record बनाता है:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) returns:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  // getMultilingualUrls(`${SITE_URL}/about`) यह रिटर्न करता है:
  // {
  //   en: 'https://example.com/about',
  //   fr: 'https://example.com/fr/about',
  //   es: 'https://example.com/es/about',
  // }
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

पूरा सेटअप: [Next.js 16 i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

route का `head` फ़ंक्शन links को बनाता है। `localeMap` आपके कॉन्फ़िगर किए गए locales को iterate करता है, इसलिए config में एक locale जोड़ने से यह सभी जगह एक साथ जुड़ जाता है:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    // URL को define करें
    const url = `${SITE_URL}/about`;

    return {
      links: [
        // canonical link को set करें
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        // सभी configured locales के लिए alternate links generate करें
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` सर्वर पर चलता है, इसलिए टैग प्रारंभिक HTML में आते हैं। पूर्ण सेटअप: [TanStack Start i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)।

</Tab>

</Tabs>

</Step>

<Step number={2} title="या इसे सभी को sitemap में स्थानांतरित करें">

बड़े पैमाने पर, annotations को अपने pages से पूरी तरह बाहर रखें। `generateSitemap` प्रत्येक entry के लिए `xhtml:link` alternates emit करता है, अपने config से locales और routing mode को पढ़ता है:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

दो विकल्प जानने लायक हैं:

- `xhtmlLinks` (डिफ़ॉल्ट `true`) — alternates केवल वहीं emit किए जाते हैं जहां locale URLs वास्तव में भिन्न होते हैं। `no-prefix` मोड में हर locale एक ही URL साझा करता है, इसलिए वे तब तक छोड़ दिए जाते हैं जब तक `routing.domains` locales को उनके अपने hostnames नहीं देता।
- `entryPerLocale` (default `false`) — डिफ़ॉल्ट रूप से एक `<url>` entry सभी alternates को ले जाता है। दोनों forms वैध हैं, लेकिन केवल एक URL जो `<loc>` के रूप में listed है वह Search Console में _submitted_ के रूप में गिना जाता है; alternate-only locales discoverable रहते हैं लेकिन किसी भी sitemap को attributed नहीं होते। इसे चालू करने से हर localized URL को अपना entry मिलता है जिसमें पूरा alternate set दोहराया जाता है। यह entries को locale count से गुणा करता है, इसलिए 50,000 URL / 50 MB limit को देखें और इससे आगे sitemap index में विभाजित करें।

</Step>

<Step number={3} title="Verify करें कि crawler क्या प्राप्त करता है">

`hreflang` silently fail होता है, इसलिए इसे assume करने की बजाय check करें।

स्रोत को पढ़ें, इंस्पेक्टर को नहीं — `curl https://example.com/fr/about | grep hreflang` दिखाता है कि एक crawler को क्या मिलता है; DevTools JavaScript चलने के बाद DOM दिखाता है। फिर प्रत्येक alternate को follow करें और पुष्टि करें कि यह समान set के साथ वापस इंगित करता है, और कि उनमें से कोई भी redirect नहीं करता है। Search Console की International Targeting report पूरी साइट में बाकी को पकड़ता है।

एक multilingual-specific crawl के लिए, [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) आपके localized pages में missing tags, broken alternates, और canonical conflicts की जांच करता है।

</Step>

</Steps>

---

## Checklist

- [ ] प्रत्येक locale के पास एक distinct, crawlable URL है
- [ ] हर page self-references करता है, और हर reference reciprocal है
- [ ] समान set cluster में हर page पर ship होता है
- [ ] सभी `href` values emitted HTML में absolute हैं
- [ ] Codes ISO 639-1 + ISO 3166-1 Alpha 2 हैं (`en-GB`, `en-UK` नहीं)
- [ ] `x-default` present है, और यह दर्शाता है कि unmatched users को कहाँ जाना चाहिए
- [ ] Canonical प्रत्येक locale के लिए self-referential है
- [ ] Tags server-rendered हैं, hydration के बाद inject नहीं किए गए
- [ ] बिल्कुल एक जगह declared हैं
- [ ] कोई alternate redirects नहीं

---

## निष्कर्ष

`hreflang` सरल और unforgiving है। एक missing return tag, एक relative URL, एक cross-locale canonical, और cluster को बिना किसी error के discard कर दिया जाता है। ये सभी tags को manually लिखने से आते हैं।

एक एकल locale list से set प्राप्त करें, इसे server-side पर render करें, canonical को self-referential रखें, और `x-default` को वह विचार दें जिसके लायक है। ऐसा एक बार करें और correctness कुछ ऐसी चीज़ बन जाएगी जिसे आप maintain नहीं करते हैं।

### आगे बढ़ना

- [SEO और Internationalization](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/internationalization_and_SEO.md) — व्यापक multilingual SEO चित्र
- [SEO और i18n in Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Next.js 16 i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)
- [TanStack Start i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)
- [Custom domains per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/custom_domains.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
