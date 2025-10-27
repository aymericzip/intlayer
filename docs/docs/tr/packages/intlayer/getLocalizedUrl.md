---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: getLocalizedUrl Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketinde getLocalizedUrl fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Dokümantasyon: `intlayer` Paketinde `getLocalizedUrl` Fonksiyonu

## Açıklama

`getLocalizedUrl` fonksiyonu, verilen URL'yi belirtilen yerel ayar ile önekleyerek yerelleştirilmiş bir URL oluşturur. Hem mutlak hem de göreli URL'leri işler ve yapılandırmaya göre doğru yerel ayar önekini uygular.

**Ana Özellikler:**

- Sadece 2 parametre gereklidir: `url` ve `currentLocale`
- 3 isteğe bağlı parametre: `locales`, `defaultLocale` ve `prefixDefault`
- Varsayılan olarak projenizin uluslararasılaştırma yapılandırmasını kullanır
- Basit durumlar için minimum parametrelerle veya karmaşık senaryolar için tamamen özelleştirilmiş olarak kullanılabilir

---

## Fonksiyon İmzası

```typescript
getLocalizedUrl(
  url: string,                   // Gerekli
  currentLocale: Locales,        // Gerekli
  locales?: Locales[],           // İsteğe bağlı
  defaultLocale?: Locales,       // İsteğe bağlı
  prefixDefault?: boolean        // İsteğe bağlı
): string
```

---

## Parametreler

### Gerekli Parametreler

- `url: string`
  - **Açıklama**: Yerel ayar ile öneklenecek orijinal URL dizesi.
  - **Tür**: `string`
  - **Gerekli**: Evet

- `currentLocale: Locales`
  - **Açıklama**: URL'nin yerelleştirildiği mevcut yerel ayar.
  - **Tür**: `Locales`
  - **Gerekli**: Evet

### İsteğe Bağlı Parametreler

- `locales?: Locales[]`
  - **Açıklama**: Desteklenen yerel ayarlar dizisi. Sağlanmazsa, proje yapılandırmanızdan yapılandırılan yerel ayarları kullanır.
  - **Tür**: `Locales[]`
  - **Gerekli**: Hayır (İsteğe bağlı)
  - **Varsayılan**: [`Proje Yapılandırması`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

- `defaultLocale?: Locales`
  - **Açıklama**: Uygulamanın varsayılan yerel ayarı. Sağlanmazsa, proje yapılandırmanızdan yapılandırılan varsayılan yerel ayarı kullanır.
  - **Tür**: `Locales`
  - **Gerekli**: Hayır (İsteğe bağlı)
  - **Varsayılan**: [`Proje Yapılandırması`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

- `prefixDefault?: boolean`
  - **Açıklama**: Varsayılan yerel ayar için URL'yi öneklendirip öneklendirmeyeceğinizi belirtir. Sağlanmazsa, proje yapılandırmanızdan yapılandırılan değeri kullanır.
  - **Tür**: `boolean`
  - **Gerekli**: Hayır (İsteğe bağlı)
  - **Varsayılan**: [`Proje Yapılandırması`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#middleware)

### Döndürür

- **Tür**: `string`
- **Açıklama**: Belirtilen yerel ayar için yerelleştirilmiş URL.

---

## Kullanım Örneği

### Temel Kullanım (Sadece Gerekli Parametreler)

Projenizi uluslararasılaştırma ayarları ile yapılandırdığınızda, fonksiyonu sadece gerekli parametrelerle kullanabilirsiniz:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Yerel ayarlar, defaultLocale ve prefixDefault için proje yapılandırmanızı kullanır
getLocalizedUrl("/about", Locales.FRENCH);
// Çıktı: "/fr/about" (Fransızca yapılandırmanızda desteklendiğini varsayarak)

getLocalizedUrl("/about", Locales.ENGLISH);
// Çıktı: "/about" veya "/en/about" (prefixDefault ayarınıza bağlı olarak)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Proje yapılandırmanızı kullanır
getLocalizedUrl("/about", Locales.FRENCH);
// Çıktı: "/fr/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Proje yapılandırmanızı kullanır
getLocalizedUrl("/about", Locales.FRENCH);
// Çıktı: "/fr/about"
```

### Gelişmiş Kullanım (İsteğe Bağlı Parametrelerle)

İsteğe bağlı parametreler sağlayarak varsayılan yapılandırmayı geçersiz kılabilirsiniz:

### Göreli URL'ler (Tüm Parametreler Belirtilmiş)

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Tüm isteğe bağlı parametreleri açıkça sağlayarak
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // yerel ayarlar
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Fransızca yerel ayar için çıktı: "/fr/about"
// Varsayılan (İngilizce) yerel ayar için çıktı: "/about"
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Tüm isteğe bağlı parametreleri açıkça sağlayarak
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // yerel ayarlar
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Fransızca yerel ayar için çıktı: "/fr/about"
// Varsayılan (İngilizce) yerel ayar için çıktı: "/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer";

// Tüm isteğe bağlı parametreleri açıkça sağlayarak
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // yerel ayarlar
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Fransızca yerel ayar için çıktı: "/fr/about"
// Varsayılan (İngilizce) yerel ayar için çıktı: "/about"
```

### Kısmi Yapılandırma Geçersiz Kılma

İsteğe bağlı parametrelerin sadece bazılarını sağlayabilirsiniz. Fonksiyon, belirtmediğiniz parametreler için proje yapılandırmanızı kullanacaktır:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Sadece yerel ayarları geçersiz kılın, defaultLocale ve prefixDefault için proje yapılandırmasını kullanın
getLocalizedUrl(
  "/about",
  Locales.SPANISH,
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH] // Sadece yerel ayarları belirtin
);

// Sadece prefixDefault'u geçersiz kılın, yerel ayarlar ve defaultLocale için proje yapılandırmasını kullanın
getLocalizedUrl(
  "/about",
  Locales.ENGLISH,
  undefined, // Yerel ayarlar için proje yapılandırmasını kullanın
  undefined, // defaultLocale için proje yapılandırmasını kullanın
  true // Varsayılan yerel ayar için öneki zorlayın
);
```

### Mutlak URL'ler

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Mevcut Yerel Ayar
  [Locales.ENGLISH, Locales.FRENCH], // Desteklenen Yerel Ayarlar
  Locales.ENGLISH, // Varsayılan Yerel Ayar
  false // Varsayılan Yerel Ayarı Öneklendir
); // Fransızca için çıktı: "https://example.com/fr/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Mevcut Yerel Ayar
  [Locales.ENGLISH, Locales.FRENCH], // Desteklenen Yerel Ayarlar
  Locales.ENGLISH, // Varsayılan Yerel Ayar
  false // Varsayılan Yerel Ayarı Öneklendir
); // İngilizce için çıktı: "https://example.com/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Mevcut Yerel Ayar
  [Locales.ENGLISH, Locales.FRENCH], // Desteklenen Yerel Ayarlar
  Locales.ENGLISH, // Varsayılan Yerel Ayar
  true // Varsayılan Yerel Ayarı Öneklendir
); // İngilizce için çıktı: "https://example.com/en/about"
```

### Desteklenmeyen Yerel Ayar

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Mevcut Yerel Ayar
  [Locales.ENGLISH, Locales.FRENCH], // Desteklenen Yerel Ayarlar
  Locales.ENGLISH // Varsayılan Yerel Ayar
); // Çıktı: "/about" (desteklenmeyen yerel ayar için önek uygulanmaz)
```

---

## Kenar Durumları

- **Yerel Ayar Segmenti Yok:**
  - URL herhangi bir yerel ayar segmenti içermezse, fonksiyon uygun yerel ayarı güvenli bir şekilde öneklendirir.

- **Varsayılan Yerel Ayar:**
  - `prefixDefault` `false` olduğunda, fonksiyon varsayılan yerel ayar için URL'yi öneklendirmez.

- **Desteklenmeyen Yerel Ayarlar:**
  - `locales`'te listelenmeyen yerel ayarlar için fonksiyon herhangi bir önek uygulamaz.

---

## Uygulamalarda Kullanım

Çok dilli bir uygulamada, doğru dilin görüntülenmesini sağlamak için uluslararasılaştırma ayarlarını `locales` ve `defaultLocale` ile yapılandırmak kritiktir. Aşağıda `getLocalizedUrl`'un uygulama kurulumunda nasıl kullanılabileceğine dair bir örnek verilmiştir:

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

Bu yapılandırmayı kullanarak, `getLocalizedUrl` fonksiyonu kullanıcının dil tercihine göre dinamik olarak yerelleştirilmiş URL'ler oluşturabilir:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Çıktı: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Çıktı: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Çıktı: "/about"
```

`getLocalizedUrl`'ü entegre ederek, geliştiriciler birden fazla dilde tutarlı URL yapıları koruyabilir, hem kullanıcı deneyimini hem de SEO'yu geliştirebilir.
