---
createdAt: 2025-09-07
updatedAt: 2026-09-25
priority: 5
title: getConfiguration Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketinde getConfiguration fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getConfiguration
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
  - getConfiguration
history:
  - version: 9.5.9
    date: 2026-09-25
    changes: "getConfiguration yerine intlayer üzerinden doğrudan içe aktarmalar önerildi"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# Dokümantasyon: `intlayer` Paketinde `getConfiguration` Fonksiyonu (Kullanım Dışı)

> [!WARNING]
> **Kullanım Dışı (Deprecated)**: `getConfiguration` fonksiyonu artık kullanılmamaktadır. Yeni önerilen yöntem, `{ availableLocale, defaultLocales, internationalization, routing, ... }` (örneğin `defaultLocale`, `locales`, `requiredLocales` veya `editor`) doğrudan `'intlayer'` üzerinden içe aktarmaktır:
>
> ```typescript
> import { defaultLocale, locales, requiredLocales, editor } from "intlayer";
> ```

## Açıklama

`getConfiguration` fonksiyonu, ortam değişkenlerini çıkararak `intlayer` uygulaması için tüm yapılandırmayı alır. Bu fonksiyon, aynı yapılandırmayı hem istemci hem de sunucu tarafında kullanma esnekliği sağlar ve uygulamanın genelinde tutarlılığı garanti eder.

## Parametreler

Fonksiyon herhangi bir parametre almaz. Bunun yerine, yapılandırma için ortam değişkenlerini kullanır.

### Döndürür

- **Tür**: `IntlayerConfig`
- **Açıklama**: `intlayer` için tam yapılandırmayı içeren bir nesne. Yapılandırma aşağıdaki bölümleri içerir:
  - `internationalization`: Yerel ayarlar ve katı mod ile ilgili ayarlar.
  - `middleware`: URL ve çerez yönetimi ile ilgili ayarlar.
  - `content`: İçerik dosyaları, dizinler ve desenlerle ilgili ayarlar.
  - `editor`: Düzenleyiciye özel yapılandırmalar.

Daha fazla detay için [Intlayer yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

## Kullanım Örneği

### Tam Yapılandırmayı Alma

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Çıktı:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### `availableLocales` ve `defaultLocale` Çıkarma

> [!TIP]
> **Önerilen Yöntem**: Yerel ayarları `getConfiguration()` üzerinden çıkarmak yerine, doğrudan `'intlayer'` üzerinden içe aktarın:
>
> ```typescript
> import { defaultLocale, locales } from "intlayer";
> ```

Yapılandırmanın `internationalization` bölümü, `locales` (kullanılabilir yerel ayarlar) ve `defaultLocale` (varsayılan dil) gibi yerel ayarlarla ilgili ayarları sağlar.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Çıktı örneği: ["en", "fr", "es"]
console.log(defaultLocale); // Çıktı örneği: "en"
console.log(cookieName); // Çıktı: "INTLAYER_LOCALE"
```

## Notlar

- Bu fonksiyonu çağırmadan önce tüm gerekli ortam değişkenlerinin doğru şekilde ayarlandığından emin olun. Eksik değişkenler başlatma sırasında hatalara neden olur.
- Bu fonksiyon hem istemci hem de sunucu tarafında kullanılabilir, bu da onu çok yönlü bir araç haline getirir.

## Uygulamalarda Kullanım

`getConfiguration` fonksiyonu, bir `intlayer` uygulamasının yapılandırmasını başlatmak ve yönetmek için temel bir yardımcıdır. Yerel ayarlar, ara yazılım ve içerik dizinleri gibi ayarlara erişim sağlayarak, çok dilli ve içerik odaklı uygulamalarda tutarlılık ve ölçeklenebilirlik sağlar.
