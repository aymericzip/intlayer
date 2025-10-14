---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: getPathWithoutLocale Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketinde getPathWithoutLocale fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getPathWithoutLocale
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
  - getPathWithoutLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Dokümantasyon: `intlayer` Paketinde `getPathWithoutLocale` Fonksiyonları

## Açıklama

Verilen URL veya yol adından yerel ayar segmentini varsa kaldırır. Hem mutlak URL'lerle hem de göreli yol adlarıyla çalışır.

## Parametreler

- `inputUrl: string`
  - **Açıklama**: İşlenecek tam URL dizesi veya yol adı.
  - **Tür**: `string`

- `locales: Locales[]`
  - **Açıklama**: İsteğe bağlı desteklenen yerel ayarlar dizisi. Varsayılan olarak projede yapılandırılan yerel ayarları kullanır.
  - **Tür**: `Locales[]`

## Döndürür

- **Tür**: `string`
- **Açıklama**: Yerel ayar segmenti olmadan URL dizesi veya yol adı.

## Kullanım Örneği

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Çıktı: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Çıktı: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Çıktı: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Çıktı: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Çıktı: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Çıktı: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Çıktı: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Çıktı: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Çıktı: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Çıktı: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Çıktı: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Çıktı: "https://example.com/dashboard"
```
