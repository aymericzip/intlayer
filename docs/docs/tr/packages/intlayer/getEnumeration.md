---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: getEnumeration Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketinde getEnumeration fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getEnumeration
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
  - getEnumeration
---

# Dokümantasyon: `intlayer` Paketinde `getEnumeration` Fonksiyonu

## Açıklama

`getEnumeration` fonksiyonu, bir numaralandırma nesnesindeki önceden tanımlanmış koşullara göre belirli bir miktara karşılık gelen içeriği alır. Koşullar anahtarlar olarak tanımlanır ve öncelik, nesnedeki sıralarına göre belirlenir.

## Parametreler

- `enumerationContent: QuantityContent<Content>`
  - **Açıklama**: Anahtarların koşullar (örneğin, `<=`, `<`, `>=`, `=`) temsil ettiği ve değerlerin karşılık gelen içeriği temsil ettiği bir nesne. Anahtarların sırası, eşleşme önceliklerini tanımlar.
  - **Tür**: `QuantityContent<Content>`
    - `Content` herhangi bir tür olabilir.

- `quantity: number`
  - **Açıklama**: `enumerationContent`'teki koşullara karşı eşleştirmek için kullanılan sayısal değer.
  - **Tür**: `number`

## Döndürür

- **Tür**: `Content`
- **Açıklama**: `enumerationContent`'teki ilk eşleşen koşula karşılık gelen içerik. Eşleşme bulunamazsa, varsayılan olarak uygulama tabanlı işleme yapılır (örneğin, hata veya yedek içerik).

## Kullanım Örneği

### Temel Kullanım

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "Şundan azınız var: -2.3",
    "<1": "Şundan azınız var: bir",
    "2": "İkiniz var",
    ">=3": "Üç veya daha fazlasınız var",
  },
  2
);

console.log(content); // Çıktı: "İkiniz var"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "Şundan azınız var: bir",
    "2": "İkiniz var",
    ">=3": "Üç veya daha fazlasınız var",
  },
  2
);

console.log(content); // Çıktı: "İkiniz var"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "Şundan azınız var: bir",
    "2": "İkiniz var",
    ">=3": "Üç veya daha fazlasınız var",
  },
  2
);

console.log(content); // Çıktı: "İkiniz var"
```

### Koşulların Önceliği

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Dörtten azınız var",
    "2": "İkiniz var",
  },
  2
);

console.log(content); // Çıktı: "Dörtten azınız var"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Dörtten azınız var",
    "2": "İkiniz var",
  },
  2
);

console.log(content); // Çıktı: "Dörtten azınız var"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Dörtten azınız var",
    "2": "İkiniz var",
  },
  2
);

console.log(content); // Çıktı: "Dörtten azınız var"
```

## Kenar Durumları

- **Eşleşen Koşul Yok:**
  - Sağlanan miktarla eşleşen koşul yoksa, fonksiyon `undefined` döndürür veya varsayılan/yedek senaryoyu açıkça işler.

- **Belirsiz Koşullar:**
  - Koşullar çakışırsa, ilk eşleşen koşul (nesne sırasına göre) öncelik kazanır.

- **Geçersiz Anahtarlar:**
  - Fonksiyon, `enumerationContent`'teki tüm anahtarların geçerli ve koşullar olarak ayrıştırılabilir olduğunu varsayar. Geçersiz veya yanlış biçimlendirilmiş anahtarlar beklenmedik davranışlara yol açabilir.

- **TypeScript Zorlaması:**
  - Fonksiyon, `Content` türünün tüm anahtarlar arasında tutarlı olmasını sağlar, böylece alınan içerikte tür güvenliği sağlar.

## Notlar

- Uygun koşulu verilen miktara göre belirlemek için `findMatchingCondition` yardımcı programı kullanılır.

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
