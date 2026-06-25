---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: getMultilingualUrls Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketinde getMultilingualUrls fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getMultilingualUrls
  - çeviri
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# Dokümantasyon: `intlayer` Paketinde `getMultilingualUrls` Fonksiyonu

## Açıklama

`getMultilingualUrls` fonksiyonu, verilen URL'yi desteklenen her yerel dilde bir önek ekleyerek çok dilli URL'lerin bir haritasını oluşturur. Hem mutlak hem de göreceli URL'leri işleyebilir ve sağlanan yapılandırmaya veya varsayılanlara göre uygun yerel dil önekini uygular.

**Temel Özellikler:**

- Yalnızca 1 parametre gereklidir: `url`
- `locales`, `defaultLocale` ve `mode` ile isteğe bağlı `options` nesnesi
- Varsayılan olarak projenizin uluslararasılaştırma yapılandırmasını kullanır
- Birden fazla yönlendirme modunu destekler: `prefix-no-default`, `prefix-all`, `no-prefix` ve `search-params`
- Tüm yerel dilleri anahtar olarak ve karşılık gelen URL'leri değer olarak içeren bir harita nesnesi döndürür

---

## Açıklama

`getMultilingualUrls` fonksiyonu, verilen URL'yi her desteklenen yerel ayar ile öneklendirerek çok dilli URL'lerin bir eşlemesini oluşturur. Hem mutlak hem de göreli URL'leri işleyebilir ve sağlanan yapılandırma veya varsayılanlara göre uygun yerel ayar önekini uygular.

---

## Parametreler

## Parametreler

- `url: string`
  - **Açıklama**: Yerel ayarlarla öneklendirilecek orijinal URL dizesi.
  - **Tür**: `string`

- `locales: Locales[]`
  - **Açıklama**: İsteğe bağlı desteklenen yerel ayarlar dizisi. Varsayılan olarak projede yapılandırılan yerel ayarları kullanır.
  - **Tür**: `Locales[]`
  - **Varsayılan**: `localesDefault`

- `defaultLocale: Locales`
  - **Açıklama**: Uygulamanın varsayılan yerel ayarı. Varsayılan olarak projede yapılandırılan varsayılan yerel ayarı kullanır.
  - **Tür**: `Locales`
  - **Varsayılan**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Açıklama**: Varsayılan yerel ayarı öneklendirip öneklendirmeyeceğinizi belirtir. Varsayılan olarak projede yapılandırılan değeri kullanır.
  - **Tür**: `boolean`
  - **Varsayılan**: `prefixDefaultDefault`

### İsteğe Bağlı Parametreler

- `options?: object`
  - **Description**: URL yerelleştirme davranışı için yapılandırma nesnesi.
  - **Type**: `object`
  - **Required**: No (İsteğe Bağlı)

  - `options.locales?: Locales[]`
    - **Description**: Desteklenen locale'lerin dizisi. Sağlanmazsa, proje yapılandırmanızdan yapılandırılmış locale'leri kullanır.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: Uygulama için varsayılan locale. Sağlanmazsa, proje yapılandırmanızdan yapılandırılmış varsayılan locale'yi kullanır.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: Locale işleme için URL yönlendirme modu. Sağlanmazsa, proje yapılandırmanızdan yapılandırılmış modu kullanır.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Varsayılan locale için ön ek yok, diğerleri için ön ek
      - `prefix-all`: Varsayılan dahil tüm locale'ler için ön ek
      - `no-prefix`: URL'de locale ön eki yok
      - `search-params`: Locale için sorgu parametreleri kullan (örn. `?locale=fr`)

### Döndürür

- **Tür**: `IConfigLocales<string>`
- **Açıklama**: Her yerel ayarı karşılık gelen çok dilli URL'sine eşleyen bir nesne.

---

## Kullanım Örneği

### Temel Kullanım (Proje Yapılandırmasını Kullanır)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// Projenizin locales, defaultLocale ve mode yapılandırmasını kullanır
getMultilingualUrls("/dashboard");
// Çıktı (proje yapılandırması en, fr'ye sahip olduğunu ve mode 'prefix-no-default' olduğunu varsayıyorsa):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Göreli URL'ler

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Çıktı: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Mutlak URL'ler

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Çıktı: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

### Farklı Yönlendirme Modları

```typescript
// prefix-no-default: Varsayılan locale için önek yok
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Çıktı: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Tüm locales için önek
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Çıktı: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: URL'lerde locale öneki yok
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Çıktı: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Locale sorgu parametresi olarak
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Çıktı: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## Kenar Durumları

- **Yerel Ayar Segmenti Yok:**
  - Fonksiyon, çok dilli eşlemeleri oluşturmadan önce URL'den mevcut herhangi bir yerel ayar segmentini kaldırır.

- **Varsayılan Yerel Ayar:**
  - `prefixDefault` `false` olduğunda, fonksiyon varsayılan yerel ayar için URL'yi öneklendirmez.

- **Desteklenmeyen Yerel Ayarlar:**
  - Sadece `locales` dizisinde sağlanan yerel ayarlar URL'leri oluşturmak için dikkate alınır.

---

## Uygulamalarda Kullanım

Çok dilli bir uygulamada, doğru dilin görüntülenmesini sağlamak için uluslararasılaştırma ayarlarını `locales` ve `defaultLocale` ile yapılandırmak kritiktir. Aşağıda `getMultilingualUrls`'un uygulama kurulumunda nasıl kullanılabileceğine dair bir örnek verilmiştir:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// Desteklenen yerel ayarlar ve varsayılan yerel ayar için yapılandırma
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

Yukarıdaki yapılandırma, uygulamanın `ENGLISH`, `FRENCH` ve `SPANISH`'i desteklenen diller olarak tanımasını ve `ENGLISH`'i geri dönüş dili olarak kullanmasını sağlar.

Bu yapılandırmayı kullanarak, `getMultilingualUrls` fonksiyonu uygulamanın desteklenen yerel ayarlarına göre dinamik olarak çok dilli URL eşlemeleri oluşturabilir:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Çıktı:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Çıktı:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

`getMultilingualUrls`'ü entegre ederek, geliştiriciler birden fazla dilde tutarlı URL yapıları koruyabilir, hem kullanıcı deneyimini hem de SEO'yu geliştirebilir.
