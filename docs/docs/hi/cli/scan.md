---
createdAt: 2026-06-11
updatedAt: 2026-09-26
priority: 5
title: वेबसाइट स्कैन करें
description: किसी भी वेबसाइट के पेज आकार को मापने और i18n/SEO स्वास्थ्य का ऑडिट करने के लिए Intlayer CLI scan कमांड का उपयोग करने का तरीका जानें।
keywords:
  - स्कैन
  - SEO
  - i18n
  - ऑडिट
  - CLI
  - Intlayer
  - पेज आकार
  - बंडल
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "रूटिंग रणनीति और i18n स्टैक (लाइब्रेरी, TMS) का पता लगाना; hreflang पारस्परिकता, og:locale और भाषा स्विचर की जाँच जोड़ना; robots.txt साइटमैप, साइटमैप इंडेक्स और gzip संपीड़ित साइटमैप को ट्रैक करना"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`--ci` फ़्लैग जोड़ा गया"
  - version: 9.0.0
    date: 2026-06-11
    changes: "scan कमांड जोड़ा गया"
author: aymericzip
---

# वेबसाइट स्कैन करें

`scan` कमांड एक सार्वजनिक URL प्राप्त करता है, कुल पेज आकार को मापता है, और पेज के i18n और SEO स्वास्थ्य का ऑडिट करता है। यह एक स्कोर रिपोर्ट (0-100) तैयार करता है जिसमें HTML विशेषताएँ, कैनोनिकल लिंक, hreflang टैग और उनके रिटर्न लिंक, robots.txt, साइटमैप, स्थानीयकृत आंतरिक लिंक और JavaScript बंडल में स्थानीयकरण डेटा का भार शामिल होता है।

यह यह भी रिपोर्ट करता है कि साइट अपने URL में भाषा (locale) को कैसे एनकोड करती है (रूटिंग रणनीति) और कौन सा फ्रेमवर्क, i18n लाइब्रेरी, अनुवाद प्रबंधन प्रणाली (TMS) या अनुवाद प्रॉक्सी उपयोग करती है। यही जाँच [ऑनलाइन i18n SEO स्कैनर](https://intlayer.org/i18n-seo-scanner) और Intlayer Chrome एक्सटेंशन को संचालित करती है।

किसी अतिरिक्त निर्भरता की आवश्यकता नहीं है। जब [puppeteer](https://pptr.dev/) स्थापित होता है, तो स्कैन अधिक सटीक बंडल विश्लेषण के लिए धीरे-धीरे लोड होने वाले (lazy-loaded) JavaScript टुकड़ों को कैप्चर कर सकता है; अन्यथा यह HTML में घोषित सीधे लोड होने वाली लिपियों के निरीक्षण पर वापस आ जाता है।

## उपयोग

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### उदाहरण

```bash packageManager="npm"
npx intlayer scan https://example.com
```

नमूना आउटपुट:

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## विकल्प

### `<url>` (आवश्यक)

स्कैन करने के लिए पूर्ण URL (जैसे `https://example.com`)।

### `--no-deep`

गहन रेंडर-आधारित स्कैन को अक्षम करें।

डिफ़ॉल्ट रूप से कमांड किसी हेडलेस ब्राउज़र में पेज रेंडर करने, धीरे-धीरे लोड होने वाले JavaScript टुकड़ों को कैप्चर करने और वास्तविक ट्रांसफर आकार को मापने के लिए [puppeteer](https://pptr.dev/) का उपयोग करने का प्रयास करता है। यदि puppeteer स्थापित नहीं है, तो कमांड स्वचालित रूप से मूल मोड पर वापस आ जाता है।

puppeteer उपलब्ध होने पर भी मूल मोड को बाध्य करने के लिए `--no-deep` पास करें।

> उदाहरण: `npx intlayer scan https://example.com --no-deep`

### `--json`

स्वरूपित रिपोर्ट के बजाय संपूर्ण स्कैन परिणाम को JSON ऑब्जेक्ट के रूप में आउटपुट करें। प्रोग्रामेटिक उपयोग या CI पाइपलाइनों के लिए उपयोगी।

> उदाहरण: `npx intlayer scan https://example.com --json`

### मानक कॉन्फ़िगरेशन विकल्प

- **`--base-dir`** — `intlayer.config.*` फ़ाइल का पता लगाने के लिए उपयोग की जाने वाली मूल निर्देशिका।
- **`-e, --env`** — लक्ष्य वातावरण (जैसे `development`, `production`)।
- **`--env-file`** — कस्टम `.env` फ़ाइल का पथ।
- **`--no-cache`** — कॉन्फ़िगरेशन कैश को अक्षम करें।
- **`--ci`** — मोनोरेपो के हर Intlayer प्रोजेक्ट में कमांड चलाता है (प्रोजेक्ट डायरेक्टरी से चलाने पर केवल वर्तमान प्रोजेक्ट में)। प्रति-प्रोजेक्ट क्रेडेंशियल `INTLAYER_PROJECT_CREDENTIALS` के माध्यम से इंजेक्ट किए जा सकते हैं, जो प्रोजेक्ट पाथ को `{ "clientId", "clientSecret" }` से मैप करने वाला JSON ऑब्जेक्ट है।
- **`--verbose`** — विस्तृत लॉगिंग सक्षम करें (CLI मोड में डिफ़ॉल्ट)।
- **`--prefix`** — कस्टम लॉग उपसर्ग।

## रूटिंग रणनीति

पेज के hreflang विकल्पों द्वारा साझा किया गया भाषा पैटर्न यह दर्शाता है कि साइट अपनी भाषाओं को कैसे रूट करती है। विकल्पों के बिना, केवल स्कैन किए गए URL का उपयोग किया जाता है (कम विश्वसनीयता)।

| रणनीति              | उदाहरण                                  |
| ------------------- | --------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                |
| `prefix-no-default` | `/about` (डिफ़ॉल्ट भाषा), `/fr/about`   |
| `search-params`     | `/about?lang=fr`                        |
| `subdomain`         | `fr.example.com`                        |
| `domain`            | `example.fr`, `example.de`              |
| `no-prefix`         | प्रत्येक भाषा के लिए एक ही URL (cookie) |

लिंक, कैनोनिकल, robots.txt और साइटमैप की जाँच इस रणनीति के माध्यम से प्रत्येक URL का विश्लेषण करती है। उदाहरण के लिए, एक बिना उपसर्ग वाला लिंक `prefix-no-default` साइट की डिफ़ॉल्ट भाषा पर सही है, और बिना `?lang=` वाला लिंक `search-params` साइट पर भाषा से बाहर निकलता है।

## पहचाना गया स्टैक

फ्रेमवर्क, i18n लाइब्रेरीज़ (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), अनुवाद प्रबंधन प्रणालियाँ (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) और अनुवाद प्रॉक्सी (Weglot, Localize, GTranslate…) HTML, लोड किए गए संसाधनों और JavaScript बंडलों से पहचाने जाते हैं। डीप मोड window ग्लोबल वेरिएबल्स और कुकीज़ को भी पढ़ता है।

## क्या जाँच की जाती है

| जाँच                            | विवरण                                                                                                     | स्कोर भार |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | --------- |
| `html lang`                     | `<html lang>` मौजूद है और एक मान्य BCP 47 टैग है                                                          | 9         |
| `html dir`                      | दाएँ से बाएँ लिखी जाने वाली भाषाओं के लिए `dir="rtl"` सेट है (`ltr` डिफ़ॉल्ट है)                          | 3         |
| `locale signals consistent`     | `<html lang>`, URL की भाषा और स्वयं-संदर्भ hreflang प्रविष्टि एक दूसरे से मेल खाते हैं                    | 5         |
| `og:locale`                     | `og:locale` सेट है और `<html lang>` से मेल खाता है                                                        | 3         |
| `canonical`                     | एक कैनोनिकल लिंक मौजूद है और किसी अन्य भाषा संस्करण की ओर इंगित नहीं करता है                              | 10        |
| `hreflang`                      | मान्य कोड, पूर्ण URL, बिना दोहराव और स्वयं-संदर्भ के साथ hreflang टैग मौजूद हैं                           | 9         |
| `x-default hreflang`            | एक `x-default` hreflang विकल्प मौजूद है                                                                   | 7         |
| `hreflang alternates link back` | विकल्प 200 के साथ उत्तर देते हैं, पुनर्निर्देशित नहीं होते हैं, वापस लिंक करते हैं और भाषा घोषित करते हैं | 8         |
| `localized links`               | आंतरिक लिंक पेज की भाषा की ओर इंगित करते हैं                                                              | 8         |
| `all links keep the locale`     | कोई भी आंतरिक लिंक भाषा को बदलता या हटाता नहीं है                                                         | 6         |
| `language switcher`             | अन्य भाषा संस्करणों के लिए क्रॉल करने योग्य `<a href>` लिंक मौजूद हैं                                     | 6         |
| `robots.txt present`            | `/robots.txt` एक 200 प्रतिक्रिया देता है                                                                  | 10        |
| `robots.txt localized URLs`     | न तो साइट और न ही इसके स्थानीयकृत URL Googlebot के लिए अवरुद्ध हैं                                        | 8         |
| `sitemap present`               | एक साइटमैप पाया जाता है (robots.txt `Sitemap:` निर्देश, `/sitemap.xml`, `/sitemap_index.xml`)             | 10        |
| `sitemap locale coverage`       | प्रत्येक भाषा सूचीबद्ध है, और विकल्पों वाली प्रविष्टियाँ स्वयं को भी सूचीबद्ध करती हैं                    | 9         |
| `sitemap alternates`            | साइटमैप में `hreflang` वैकल्पिक लिंक शामिल हैं                                                            | 8         |
| `sitemap x-default`             | साइटमैप में एक `x-default` hreflang शामिल है                                                              | 7         |
| `unused bundle content`         | मुख्य JS बंडल अन्य भाषाओं के अनुवाद नहीं ले जाता है                                                       | 8         |

चेतावनी को आधा भार मिलता है। अंतिम स्कोर चलाए गए परीक्षणों का भारित योग प्रतिशत (0-100) के रूप में होता है। असफल परीक्षण पहली मिली समस्याओं को प्रिंट करते हैं; पूर्ण विवरण के लिए `--json` का उपयोग करें।

## प्रोग्रामेटिक रूप से स्कैन फ़ंक्शन का उपयोग करना

`scan` फ़ंक्शन को `@intlayer/cli` से भी निर्यात किया जाता है ताकि इसे आपकी अपनी स्क्रिप्ट से कॉल किया जा सके:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

निम्न-स्तरीय पहुँच के लिए, `@intlayer/engine/scan` से `scanWebsite` एक संरचित `ScanResult` ऑब्जेक्ट लौटाता है:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
