---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: getLocaleLang Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketinde getLocaleLang fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getLocaleLang
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
  - getLocaleLang
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Dokümantasyon: `intlayer` Paketinde `getLocaleLang` Fonksiyonu

## Açıklama

`getLocaleLang` fonksiyonu, bir yerel ayar dizesinden dil kodunu çıkarır. Ülke kodları ile veya olmadan yerel ayarları destekler. Yerel ayar sağlanmazsa, varsayılan olarak boş bir dize döndürür.

## Parametreler

- `locale?: Locales`
  - **Açıklama**: Dil kodunun çıkarıldığı yerel ayar dizesi (örneğin, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`).
  - **Tür**: `Locales` (isteğe bağlı)

## Döndürür

- **Tür**: `string`
- **Açıklama**: Yerel ayardan çıkarılan dil kodu. Yerel ayar sağlanmazsa, boş bir dize (`''`) döndürür.

## Kullanım Örneği

### Dil Kodlarını Çıkarma:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Çıktı: "en"
getLocaleLang(Locales.ENGLISH); // Çıktı: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Çıktı: "fr"
getLocaleLang(Locales.FRENCH); // Çıktı: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Çıktı: "en"
getLocaleLang(Locales.ENGLISH); // Çıktı: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Çıktı: "fr"
getLocaleLang(Locales.FRENCH); // Çıktı: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Çıktı: "en"
getLocaleLang(Locales.ENGLISH); // Çıktı: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Çıktı: "fr"
getLocaleLang(Locales.FRENCH); // Çıktı: "fr"
```

## Kenar Durumları

- **Yerel Ayar Sağlanmadı:**
  - `locale` `undefined` olduğunda fonksiyon boş bir dize döndürür.

- **Hatalı Biçimlendirilmiş Yerel Ayar Dizeleri:**
  - `locale` `language-country` formatını takip etmezse (örneğin, `Locales.ENGLISH-US`), fonksiyon `'-'` öncesindeki kısmı güvenli bir şekilde döndürür veya `'-'` yoksa tüm dizeyi döndürür.
