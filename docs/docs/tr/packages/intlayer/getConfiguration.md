---
createdAt: 2025-09-07
updatedAt: 2025-09-07
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
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Dokümantasyon: `intlayer` Paketinde `getConfiguration` Fonksiyonu

## Açıklama

`getConfiguration` fonksiyonu, ortam değişkenlerini çıkararak `intlayer` uygulaması için tüm yapılandırmayı alır. Bu fonksiyon, aynı yapılandırmayı hem istemci hem de sunucu tarafında kullanma esnekliği sağlar ve uygulamanın genelinde tutarlılığı garanti eder.

---

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

---

## Kullanım Örneği

### Tam Yapılandırmayı Alma

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

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

Yapılandırmanın `internationalization` bölümü, `locales` (kullanılabilir yerel ayarlar) ve `defaultLocale` (varsayılan dil) gibi yerel ayarlarla ilgili ayarları sağlar.

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Çıktı örneği: ["en", "fr", "es"]
console.log(defaultLocale); // Çıktı örneği: "en"
console.log(cookieName); // Çıktı: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Çıktı örneği: ["en", "fr", "es"]
console.log(defaultLocale); // Çıktı örneği: "en"
console.log(cookieName); // Çıktı: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

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
