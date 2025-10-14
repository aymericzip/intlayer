---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Yerel Ayar Eşleyici
description: Yerel Ayar Eşleyici'nin nasıl çalıştığını keşfedin. Uygulamanızda Yerel Ayar Eşleyici tarafından kullanılan adımları görün. Farklı paketlerin ne yaptığını görün.
keywords:
  - Yerel Ayar Eşleyici
  - Başlarken
  - Intlayer
  - Uygulama
  - Paketler
slugs:
  - doc
  - locale-mapper
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Yerel ayar eşleyici dokümantasyonu eklendi
---

# Yerel Ayar Eşleyici

Yerel Ayar Eşleyici, Intlayer uygulamanızda uluslararasılaştırma verileriyle çalışmanıza yardımcı olan güçlü bir yardımcı programdır. Yerel ayara özgü verileri dönüştürmek ve düzenlemek için üç ana işlev sağlar: `localeMap`, `localeFlatMap` ve `localeRecord`.

## Yerel Ayar Eşleyici Nasıl Çalışır

Yerel Ayar Eşleyici, bir yerel ayar hakkında gerekli tüm bilgileri içeren bir `LocaleData` nesnesi üzerinde çalışır:

```typescript
type LocaleData = {
  locale: LocalesValues; // Geçerli yerel ayar kodu (ör. 'en', 'fr')
  defaultLocale: LocalesValues; // Varsayılan yerel ayar kodu
  isDefault: boolean; // Bunun varsayılan yerel ayar olup olmadığı
  locales: LocalesValues[]; // Kullanılabilir tüm yerel ayarların dizisi
  urlPrefix: string; // Bu yerel ayar için URL öneki (ör. '/fr' veya '')
};
```

Eşleyici işlevleri yapılandırmanızdaki her yerel ayar için bu verileri otomatik olarak oluşturur ve şunları dikkate alır:

- Yapılandırılmış yerel ayarlar listeniz
- Varsayılan yerel ayar ayarı
- Varsayılan yerel ayar URL'lerde öneklenmeli mi

## Temel İşlevler

### `localeMap`

Her yerel ayarı bir eşleyici işlevi kullanarak tek bir nesneye dönüştürür.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Örnek: Rota nesneleri oluşturma**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Sonuç:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

`localeMap`'e benzer, ancak eşleyici işlevi tek bir diziye düzleştirilen nesneler dizisi döndürür.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Örnek: Yerel ayar başına birden fazla rota oluşturma**

```typescript
import { localeFlatMap } from "intlayer";

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

// Sonuç:
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

Her yerel ayar bir anahtar olan ve eşleyici işlevi tarafından dönüştürülen bir değere eşlenen bir kayıt nesnesi oluşturur.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Örnek: Çeviri dosyalarını yükleme**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Sonuç:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Yerel Ayar Eşleyici'yi Kurma

Yerel Ayar Eşleyici otomatik olarak Intlayer yapılandırmanızı kullanır, ancak parametreler geçirerek varsayılanları geçersiz kılabilirsiniz:

### Varsayılan Yapılandırmayı Kullanma

```typescript
import { localeMap } from "intlayer";

// intlayer.config.ts'deki yapılandırmayı kullanır
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Yapılandırmayı Geçersiz Kılma

```typescript
import { localeMap } from "intlayer";

// Yerel ayarları ve varsayılan yerel ayarı geçersiz kıl
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // Özel yerel ayarlar
  "en", // Özel varsayılan yerel ayar
  true // URL'lerde varsayılan yerel ayarı önekle
);
```

## Gelişmiş Kullanım Örnekleri

### Navigasyon Menüleri Oluşturma

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Site Haritası Verisi Oluşturma

```typescript
import { localeFlatMap } from "intlayer";

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
    changefreq: "monthly",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### Dinamik Çeviri Yükleme

```typescript
import { localeRecord } from "intlayer";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr",
  },
}));
```

## Yapılandırma Entegrasyonu

Yerel Ayar Eşleyici Intlayer yapılandırmanızla sorunsuz bir şekilde entegre olur:

- **Yerel Ayarlar**: Otomatik olarak `configuration.internationalization.locales` kullanır
- **Varsayılan Yerel Ayar**: `configuration.internationalization.defaultLocale` kullanır
- **URL Önekleme**: `configuration.middleware.prefixDefault` değerini dikkate alır

Bu, uygulamanız genelinde tutarlılığı sağlar ve yapılandırma çoğaltmasını azaltır.
