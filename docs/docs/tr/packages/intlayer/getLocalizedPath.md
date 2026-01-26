---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getLocalizedPath Fonksiyon Dokümantasyonu | intlayer
description: intlayer paketi için getLocalizedPath fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Özel URL yeniden yazımları uygulandı
---

# Dokümantasyon: `intlayer` İçindeki `getLocalizedPath` Fonksiyonu

## Açıklama

getLocalizedPath fonksiyonu, verilen locale ve yeniden yazma (rewrite) kurallarına göre bir canonical path'i (uygulama içi yol) hedef dildeki karşılığına çözer. Dil bazlı olarak değişen, SEO dostu URL'ler üretmek için özellikle faydalıdır.

**Temel Özellikler:**

- `[param]` sözdizimini kullanarak dinamik rota parametrelerini destekler.
- Yapılandırmanızda tanımlı özel rewrite kurallarına göre yolları çözer.
- Belirtilen locale için herhangi bir rewrite kuralı bulunmazsa otomatik olarak canonical path'e geri dönüşü (fallback) yönetir.

---

## Fonksiyon İmzası

```typescript
getLocalizedPath(
  canonicalPath: string,         // Gerekli
  locale: Locales,               // Gerekli
  rewriteRules?: RoutingConfig['rewrite'] // İsteğe bağlı
): string
```

---

## Parametreler

### Gerekli Parametreler

- `canonicalPath: string`
  - **Açıklama**: Dahili uygulama yolu (ör. `/about`, `/product/[id]`).
  - **Tür**: `string`
  - **Gerekli**: Evet

- `locale: Locales`
  - **Açıklama**: Yolun yerelleştirileceği hedef yerel.
  - **Tür**: `Locales`
  - **Gerekli**: Evet

### İsteğe Bağlı Parametreler

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Açıklama**: Özel yeniden yazma kurallarını tanımlayan bir nesne. Sağlanmazsa, proje yapılandırmanızdaki `routing.rewrite` özelliği varsayılan olarak kullanılır.
  - **Tür**: `RoutingConfig['rewrite']`
  - **Varsayılan**: `configuration.routing.rewrite`

---

## Dönüş Değeri

- **Tür**: `string`
- **Açıklama**: Belirtilen yerel için yerelleştirilmiş yol.

---

## Örnek Kullanım

### Temel Kullanım (Yapılandırma ile)

Eğer `intlayer.config.ts` dosyanızda özel yeniden yazma kuralları yapılandırdıysanız:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Output: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Output: "/about"
```

### Dinamik Rotalarla Kullanım

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Output: "/produit/123"
```

### Manuel Yeniden Yazma Kuralları

Ayrıca fonksiyona manuel yeniden yazma kuralları da geçebilirsiniz:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Output: "/contactez-nous"
```

---

## İlgili Fonksiyonlar

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getCanonicalPath.md): Yerelleştirilmiş bir yolu dahili kanonik yoluna çözer.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md): Tam yerelleştirilmiş bir URL oluşturur (protokol, host ve dil öneki dahil).
