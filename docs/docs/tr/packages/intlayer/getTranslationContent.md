---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: getTranslation Fonksiyonu - Intlayer JavaScript Dokümantasyonu
description: Intlayer'da getTranslation fonksiyonu için dokümantasyon, belirli yerel ayarlar için yerelleştirilmiş içeriği alır ve varsayılan yerel ayara geri döner.
keywords:
  - getTranslation
  - intlayer
  - fonksiyon
  - yerelleştirme
  - i18n
  - JavaScript
  - çeviri
  - yerel ayar
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Dokümantasyon: `intlayer` Paketinde `getTranslation` Fonksiyonu

## Açıklama

`getTranslation` fonksiyonu, özelleştirilebilir dil içeriğinin bir kümesinden belirli bir yerel ayara karşılık gelen içeriği alır. Belirtilen yerel ayar bulunamazsa, projede yapılandırılan varsayılan yerel ayar için içeriği döndürür.

## Parametreler

- `languageContent: CustomizableLanguageContent<Content>`
  - **Açıklama**: Çeşitli yerel ayarlar için çeviriler içeren bir nesne. Her anahtar bir yerel ayarı temsil eder ve değeri karşılık gelen içeriktir.
  - **Tür**: `CustomizableLanguageContent<Content>`
    - `Content` herhangi bir tür olabilir, varsayılan olarak `string`.

- `locale: Locales`
  - **Açıklama**: İçeriğin alınacağı yerel ayar.
  - **Tür**: `Locales`

## Döndürür

- **Tür**: `Content`
- **Açıklama**: Belirtilen yerel ayara karşılık gelen içerik. Yerel ayar bulunamazsa, varsayılan yerel ayar için içerik döndürülür.

## Kullanım Örneği

### Temel Kullanım

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Çıktı: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Çıktı: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Çıktı: "Bonjour"
```

### Eksik Yerel Ayar:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Çıktı: "Hello" (varsayılan yerel ayar içeriği)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Çıktı: "Hello" (varsayılan yerel ayar içeriği)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Çıktı: "Hello" (varsayılan yerel ayar içeriği)
```

### Özel İçerik Türlerini Kullanma:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Çıktı: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Çıktı: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Çıktı: "Bonjour"
```

## Kenar Durumları

- **Yerel Ayar Bulunamadı:**
  - `locale` `languageContent`'te bulunamadığında, fonksiyon varsayılan yerel ayar için içeriği döndürür.
- **Eksik Dil İçeriği:**
  - Bir yerel ayar kısmen tanımlanmışsa, fonksiyon içerikleri birleştirmez. Kesinlikle belirtilen yerel ayarın değerini alır veya varsayılana geri döner.
- **TypeScript Zorlaması:**
  - `languageContent`'teki yerel ayarlar proje yapılandırmasıyla eşleşmezse, TypeScript tüm gerekli yerel ayarların tanımlanmasını zorunlu kılar, böylece içerik tam ve tür açısından güvenli olur.
