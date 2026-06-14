---
createdAt: 2026-06-11
updatedAt: 2026-06-11
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
  - version: 9.0.0
    date: 2026-06-11
    changes: "scan कमांड जोड़ा गया"
author: aymericzip
---

# वेबसाइट स्कैन करें

`scan` कमांड एक सार्वजनिक URL प्राप्त करता है, कुल पेज आकार को मापता है, और पेज के i18n और SEO स्वास्थ्य का ऑडिट करता है। यह एक स्कोर रिपोर्ट (0-100) तैयार करता है जिसमें HTML विशेषताएँ, कैनोनिकल लिंक, hreflang टैग, robots.txt, sitemap.xml, स्थानीयकृत आंतरिक लिंक और JavaScript बंडल में स्थानीयकरण डेटा का भार शामिल होता है।

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
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
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
- **`--verbose`** — विस्तृत लॉगिंग सक्षम करें (CLI मोड में डिफ़ॉल्ट)।
- **`--prefix`** — कस्टम लॉग उपसर्ग।

## क्या जाँच की जाती है

| जाँच                      | विवरण                                               | स्कोर भार |
| ------------------------- | --------------------------------------------------- | --------- |
| `html lang`               | `<html lang="…">` विशेषता मौजूद है                  | 9         |
| `html dir`                | `<html dir="…">` विशेषता मौजूद है                   | 3         |
| `canonical`               | `<link rel="canonical">` मौजूद है                   | 10        |
| `hreflang`                | `<link rel="alternate" hreflang="…">` टैग मौजूद हैं | 9         |
| `x-default hreflang`      | एक `x-default` hreflang विकल्प मौजूद है             | 7         |
| `localized links`         | कम से कम एक आंतरिक लिंक में भाषा खंड शामिल है       | 5         |
| `all links localized`     | प्रत्येक आंतरिक लिंक में भाषा खंड शामिल है          | 5         |
| `current locale`          | पेज की भाषा का पता लगाया जा सकता है                 | 3         |
| `robots.txt present`      | `/robots.txt` एक 200 प्रतिक्रिया देता है            | 10        |
| `robots.txt locale paths` | robots.txt में कोई भी भाषा पथ अवरुद्ध नहीं है       | 10        |
| `sitemap.xml present`     | `/sitemap.xml` एक 200 प्रतिक्रिया देता है           | 10        |
| `sitemap locale coverage` | प्रत्येक पहचानी गई भाषा साइटमैप में दिखाई देती है   | 10        |
| `sitemap alternates`      | साइटमैप में `hreflang` वैकल्पिक लिंक शामिल हैं      | 5         |
| `sitemap x-default`       | साइटमैप में `x-default` hreflang शामिल है           | 5         |
| `unused bundle content`   | JS बंडल अत्यधिक अप्रयुक्त भाषा डेटा नहीं ले जाता है | 9         |

अंतिम स्कोर उत्तीर्ण की गई सभी जाँचों का भारित योग प्रतिशत में (0-100) होता है।

## प्रोग्रामेटिक रूप से स्कैन फ़ंक्शन का उपयोग करना

`scan` फ़ंक्शन को `@intlayer/cli` से भी निर्यात किया जाता है ताकि इसे आपकी अपनी स्क्रिप्ट से कॉल किया जा सके:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

निम्न-स्तरीय पहुँच के लिए, `@intlayer/chokidar/scan` से `scanWebsite` एक संरचित `ScanResult` ऑब्जेक्ट लौटाता है:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
