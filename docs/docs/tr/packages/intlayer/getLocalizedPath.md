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
    changes: "Özel URL yeniden yazımları uygulandı"
author: aymericzip
---

# Dokümantasyon: `intlayer` İçindeki `getLocalizedPath` Fonksiyonu

## Açıklama

getLocalizedPath fonksiyonu, verilen locale ve yeniden yazma (rewrite) kurallarına göre bir canonical path'i (uygulama içi yol) hedef dildeki karşılığına çözer. Dil bazlı olarak değişen, SEO dostu URL'ler üretmek için özellikle faydalıdır.

[`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md) işlevinin göreceli karşılığıdır — göreceli bir giriş için her ikisi de aynı değeri döndürür. `getLocalizedUrl`'den farklı olarak, asla mutlak bir URL döndürmez: `domains` yapılandırması yok sayılır, bu nedenle kendi alanından sunulan bir locale yine de bir yol döndürür. Mutlak bir giriş kabul edilir, ancak kaynağı atılır — yalnızca yol, sorgu dizesi ve hash korunur.

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

### İsteğe Bağlı Parametreler

- `locale?: Locales`
  - **Description**: Yolun yerelleştirilmesi gereken hedef locale.
  - **Type**: `Locales`
  - **Default**: Projenizin yapılandırmasının varsayılan locale'i.

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Açıklama**: Özel yeniden yazma kurallarını tanımlayan bir nesne. Sağlanmazsa, proje yapılandırmanızdaki `routing.rewrite` özelliği varsayılan olarak kullanılır.
  - **Tür**: `RoutingConfig['rewrite']`
  - **Varsayılan**: `configuration.routing.rewrite`

  - `options.locales?: Locales[]` — desteklenen locale'ler. **Varsayılan**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — varsayılan locale. **Varsayılan**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — locale'nin yolda nasıl göründüğü. **Varsayılan**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — özel rewrite kuralları. **Varsayılan**: `configuration.routing.rewrite`

---

## Dönüş Değeri

- **Tür**: `string`
- **Açıklama**: Belirtilen yerel için yerelleştirilmiş yol.

Tür, yapılandırmanızda bildirilen yeniden yazma kurallarından daraltılır, bu nedenle düzenleyici çıplak `string` yerine çözülmüş yolu gösterir:

```typescript codeFormat="typescript"
// Yapılandırma: mod 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (eşleşen yeniden yazma kuralı yok, sadece önek uygulanır)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

Aynı daraltma [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md) içine akar, bu da locale'i ön ekleme yapmadan önce yeniden yazma kurallarını uygular.

İki durumun `string`'e genişletilmesi gerekir, çünkü bunlar derleme zamanında çözümlenemez:

- string literal olmayan bir yol (örneğin bir değişkenden oluşturulan);
- çok segmentli veya isteğe bağlı bir parametre kullanan bir kuralla eşleşen bir yol (`[...slug]`, `[[...slug]]`, `:param?`).

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

### Yerel Ayarı Atlamak

Yerel ayar verilmediğinde, yol yapılandırılan varsayılan yerel ayar için yerelleştirilir:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Yapılandırma: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Çıktı: "/about"
```

---

## İlgili Fonksiyonlar

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getCanonicalPath.md): Yerelleştirilmiş bir yolu dahili kanonik yoluna çözer.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md): Tam yerelleştirilmiş bir URL oluşturur (protokol, host ve dil öneki dahil).
