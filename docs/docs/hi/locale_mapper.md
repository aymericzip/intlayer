---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: लोकल मैपर
description: जानें कि लोकल मैपर कैसे काम करता है। अपने एप्लिकेशन में लोकल मैपर द्वारा उपयोग किए गए चरण देखें। जानें कि विभिन्न पैकेज क्या करते हैं।
keywords:
  - लोकल मैपर
  - शुरू करें
  - इंटलेयर
  - एप्लिकेशन
  - पैकेज
slugs:
  - doc
  - locale-mapper
---

# लोकल मैपर

लोकल मैपर एक शक्तिशाली उपकरण है जो आपके इंटलेयर एप्लिकेशन में अंतरराष्ट्रीयकरण डेटा के साथ काम करने में मदद करता है। यह लोकल-विशिष्ट डेटा को परिवर्तित और व्यवस्थित करने के लिए तीन मुख्य फ़ंक्शन प्रदान करता है: `localeMap`, `localeFlatMap`, और `localeRecord`।

## लोकल मैपर कैसे काम करता है

लोकल मैपर एक `LocaleData` ऑब्जेक्ट पर काम करता है जिसमें किसी लोकल के बारे में सभी आवश्यक जानकारी होती है:

```typescript
type LocaleData = {
  locale: LocalesValues; // वर्तमान लोकल कोड (जैसे, 'en', 'fr')
  defaultLocale: LocalesValues; // डिफ़ॉल्ट लोकल कोड
  isDefault: boolean; // क्या यह डिफ़ॉल्ट लोकल है
  locales: LocalesValues[]; // सभी उपलब्ध लोकल्स की सूची
  urlPrefix: string; // इस लोकल के लिए URL उपसर्ग (जैसे, '/fr' या '')
};
```

मैपर फ़ंक्शन आपके कॉन्फ़िगरेशन में प्रत्येक लोकल के लिए यह डेटा स्वचालित रूप से उत्पन्न करते हैं, निम्न बातों को ध्यान में रखते हुए:

- आपके कॉन्फ़िगर किए गए लोकल्स की सूची
- डिफ़ॉल्ट लोकल सेटिंग
- क्या डिफ़ॉल्ट लोकल को URL में उपसर्गित किया जाना चाहिए

## मुख्य फ़ंक्शन

### `localeMap`

एक मैपर फ़ंक्शन का उपयोग करके प्रत्येक लोकल को एक एकल ऑब्जेक्ट में परिवर्तित करता है।

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**उदाहरण: रूट ऑब्जेक्ट्स बनाना**

```typescript
import { localeMap } from "@intlayer/core";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// परिणाम:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

`localeMap` के समान, लेकिन मैपर फ़ंक्शन ऑब्जेक्ट्स की एक सरणी लौटाता है जिसे एक एकल सरणी में समतल किया जाता है।

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**उदाहरण: प्रत्येक लोकल के लिए कई रूट बनाना**

```typescript
import { localeFlatMap } from "@intlayer/core";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// परिणाम:
// [
//   { path: '/', name: 'en', isDefault: true },
//   { path: '/about', name: 'en-about', isDefault: true },
//   { path: '/fr', name: 'fr', isDefault: false },
//   { path: '/fr/about', name: 'fr-about', isDefault: false },
//   { path: '/es', name: 'es', isDefault: false },
//   { path: '/es/about', name: 'es-about', isDefault: false }
// ]
```

### `localeRecord`

एक रिकॉर्ड ऑब्जेक्ट बनाता है जहाँ प्रत्येक लोकल एक कुंजी होती है जो मैपर फ़ंक्शन द्वारा परिवर्तित मान से मैप होती है।

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**उदाहरण: अनुवाद फ़ाइलें लोड करना**

```typescript
import { localeRecord } from "@intlayer/core";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// परिणाम:
// {
//   en: { welcome: 'स्वागत है', hello: 'नमस्ते' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## लोकल मैपर सेट करना

लोकल मैपर स्वचालित रूप से आपके Intlayer कॉन्फ़िगरेशन का उपयोग करता है, लेकिन आप पैरामीटर पास करके डिफ़ॉल्ट सेटिंग्स को ओवरराइड कर सकते हैं:

### डिफ़ॉल्ट कॉन्फ़िगरेशन का उपयोग करना

```typescript
import { localeMap } from "@intlayer/core";

// intlayer.config.ts से कॉन्फ़िगरेशन का उपयोग करता है
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### कॉन्फ़िगरेशन ओवरराइड करना

```typescript
import { localeMap } from "@intlayer/core";

// लोकल और डिफ़ॉल्ट लोकल को ओवरराइड करें
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // कस्टम लोकल
  "en", // कस्टम डिफ़ॉल्ट लोकल
  true // URLs में डिफ़ॉल्ट लोकल का प्रीफिक्स जोड़ें
);
```

## उन्नत उपयोग के उदाहरण

### नेविगेशन मेनू बनाना

```typescript
import { localeMap } from "@intlayer/core";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### साइटमैप डेटा जनरेट करना

```typescript
import { localeFlatMap } from "@intlayer/core";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: data.isDefault ? 1.0 : 0.8,
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "मासिक",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### डायनेमिक अनुवाद लोडिंग

```typescript
import { localeRecord } from "@intlayer/core";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr",
  },
}));
```

## कॉन्फ़िगरेशन एकीकरण

Locale Mapper आपके Intlayer कॉन्फ़िगरेशन के साथ सहजता से एकीकृत होता है:

- **लोकल**: स्वचालित रूप से `configuration.internationalization.locales` का उपयोग करता है
- **डिफ़ॉल्ट लोकल**: `configuration.internationalization.defaultLocale` का उपयोग करता है
- **URL प्रीफिक्सिंग**: `configuration.middleware.prefixDefault` का सम्मान करता है

यह आपके एप्लिकेशन में स्थिरता सुनिश्चित करता है और कॉन्फ़िगरेशन की पुनरावृत्ति को कम करता है।

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                   |
| ------- | ---------- | -------------------------- |
| 5.7.2   | 2025-07-27 | लोकल मैपर दस्तावेज़ जोड़ें |
