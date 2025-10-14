---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: getLocaleName Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketinde getLocaleName fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getLocaleName
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
  - getLocaleName
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Dokümantasyon: `intlayer` Paketinde `getLocaleName` Fonksiyonu

## Açıklama

`getLocaleName` fonksiyonu, verilen bir yerel ayar (`targetLocale`) adını görüntü yerel ayarında (`displayLocale`) döndürür. `targetLocale` sağlanmazsa, `displayLocale`'un kendi dilindeki adını döndürür.

## Parametreler

- `displayLocale: Locales`
  - **Açıklama**: Hedef yerel ayar adının görüntüleneceği yerel ayar.
  - **Tür**: Geçerli yerel ayarları temsil eden enum veya dize.

- `targetLocale?: Locales`
  - **Açıklama**: Adının yerelleştirileceği yerel ayar.
  - **Tür**: İsteğe bağlı. Geçerli yerel ayarları temsil eden enum veya dize.

## Döndürür

- **Tür**: `string`
- **Açıklama**: `targetLocale`'un `displayLocale`'daki yerelleştirilmiş adı veya `targetLocale` sağlanmazsa `displayLocale`'un kendi adı. Çeviri bulunamazsa, `"Unknown locale"` döndürür.

## Kullanım Örneği

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Çıktı: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Çıktı: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Çıktı: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Çıktı: "English"

getLocaleName(Locales.FRENCH); // Çıktı: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Çıktı: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Çıktı: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Çıktı: "French"

getLocaleName(Locales.CHINESE); // Çıktı: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Çıktı: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Çıktı: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Çıktı: "Chinese"

getLocaleName("unknown-locale"); // Çıktı: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Çıktı: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Çıktı: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Çıktı: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Çıktı: "English"

getLocaleName(Locales.FRENCH); // Çıktı: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Çıktı: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Çıktı: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Çıktı: "French"

getLocaleName(Locales.CHINESE); // Çıktı: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Çıktı: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Çıktı: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Çıktı: "Chinese"

getLocaleName("unknown-locale"); // Çıktı: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Çıktı: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Çıktı: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Çıktı: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Çıktı: "English"

getLocaleName(Locales.FRENCH); // Çıktı: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Çıktı: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Çıktı: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Çıktı: "French"

getLocaleName(Locales.CHINESE); // Çıktı: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Çıktı: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Çıktı: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Çıktı: "Chinese"

getLocaleName("unknown-locale"); // Çıktı: "Unknown locale"
```

## Kenar Durumları

- **`targetLocale` sağlanmadı:**
  - Fonksiyon varsayılan olarak `displayLocale`'un kendi adını döndürür.
- **Eksik çeviriler:**
  - `localeNameTranslations` `targetLocale` veya belirli `displayLocale` için bir giriş içermezse, fonksiyon `ownLocalesName`'e geri döner veya `"Unknown locale"` döndürür.
