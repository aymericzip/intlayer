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
    changes: Geçmiş başlatıldı
---

# Dokümantasyon: `intlayer` Paketinde `getMultilingualUrls` Fonksiyonu

## Açıklama

`getMultilingualUrls` fonksiyonu, verilen URL'yi her desteklenen yerel ayar ile öneklendirerek çok dilli URL'lerin bir eşlemesini oluşturur. Hem mutlak hem de göreli URL'leri işleyebilir ve sağlanan yapılandırma veya varsayılanlara göre uygun yerel ayar önekini uygular.

---

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

### Döndürür

- **Tür**: `IConfigLocales<string>`
- **Açıklama**: Her yerel ayarı karşılık gelen çok dilli URL'sine eşleyen bir nesne.

---

## Kullanım Örneği

### Göreli URL'ler

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

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

```tsx codeFormat="typescript"
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

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
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
