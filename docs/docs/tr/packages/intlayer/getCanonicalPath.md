---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getCanonicalPath Fonksiyon Dokümantasyonu | intlayer
description: intlayer paketi için getCanonicalPath fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Özel URL yeniden yazma kurallarının uygulanması
---

# Dokümantasyon: `intlayer`'de `getCanonicalPath` Fonksiyonu

## Açıklama

`getCanonicalPath` fonksiyonu yerelleştirilmiş bir URL yolunu (ör. `/a-propos`) dahili kanonik uygulama yoluna (ör. `/about`) çözer. Bu, yönlendiricilerin URL dilinden bağımsız olarak doğru dahili rotayı eşlemesi için gereklidir.

**Ana Özellikler:**

- `[param]` sözdizimini kullanarak dinamik rota parametrelerini destekler.
- Yerelleştirilmiş yolları, yapılandırmanızda tanımlı özel yeniden yazma kurallarıyla eşleştirir.
- Eşleşen bir yeniden yazma kuralı bulunamazsa orijinal yolu döndürür.

---

## Fonksiyon İmzası

```typescript
getCanonicalPath(
  localizedPath: string,         // Gerekli
  locale: Locales,               // Gerekli
  rewriteRules?: RoutingConfig['rewrite'] // Opsiyonel
): string
```

---

## Parametreler

### Gerekli Parametreler

- `localizedPath: string`
  - **Açıklama**: Tarayıcıda görülen yerelleştirilmiş yol (ör. `/a-propos`).
  - **Tür**: `string`
  - **Gerekli**: Evet

- `locale: Locales`
  - **Açıklama**: Çözülmekte olan yol için kullanılan yerel ayar.
  - **Tür**: `Locales`
  - **Gerekli**: Evet

### Opsiyonel Parametreler

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Açıklama**: Özelleştirilmiş yeniden yazma kurallarını tanımlayan bir nesne. Sağlanmazsa, proje konfigürasyonunuzdaki `routing.rewrite` özelliği varsayılan olarak kullanılır.
  - **Tür**: `RoutingConfig['rewrite']`
  - **Varsayılan**: `configuration.routing.rewrite`

---

## Döndürülen Değer

- **Tür**: `string`
- **Açıklama**: Dahili kanonik yol.

---

## Örnek Kullanım

### Temel Kullanım (Konfigürasyon ile)

Eğer `intlayer.config.ts` dosyanızda özel yeniden yazma kuralları yapılandırdıysanız:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Konfigürasyon: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Çıktı: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Çıktı: "/about"
```

### Dinamik Rotalarla Kullanım

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Konfigürasyon: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Çıktı: "/product/123"
```

### Manuel Yeniden Yazma Kuralları

Ayrıca fonksiyona manuel yeniden yazma kuralları da geçirebilirsiniz:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Output: "/contact"
```

---

## İlgili Fonksiyonlar

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedPath.md): Bir canonical path'i yerelleştirilmiş eşdeğerine çözer.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md): Tamamen yerelleştirilmiş bir URL üretir (protokol, host ve locale öneki dahil).
