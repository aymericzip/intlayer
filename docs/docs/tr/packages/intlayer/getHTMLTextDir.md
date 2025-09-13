---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: getHTMLTextDir Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketinde getHTMLTextDir fonksiyonunun nasıl kullanılacağını görün
keywords:
  - getHTMLTextDir
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
  - getHTMLTextDir
---

# Dokümantasyon: `intlayer` Paketinde `getHTMLTextDir` Fonksiyonu

## Açıklama

`getHTMLTextDir` fonksiyonu, sağlanan yerel ayara göre metin yönünü (`ltr`, `rtl` veya `auto`) belirler. Geliştiricilerin HTML'de `dir` özelliğini doğru metin işleme için ayarlamasına yardımcı olmak için tasarlanmıştır.

## Parametreler

- `locale?: Locales`
  - **Açıklama**: Metin yönünü belirlemek için kullanılan yerel ayar dizesi (örneğin, `Locales.ENGLISH`, `Locales.ARABIC`).
  - **Tür**: `Locales` (isteğe bağlı)

## Döndürür

- **Tür**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Açıklama**: Yerel ayara karşılık gelen metin yönü:
  - `'ltr'` soldan sağa diller için.
  - `'rtl'` sağdan sola diller için.
  - `'auto'` yerel ayar tanınmazsa.

## Kullanım Örneği

### Metin Yönünü Belirleme

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Çıktı: "ltr"
getHTMLTextDir(Locales.FRENCH); // Çıktı: "ltr"
getHTMLTextDir(Locales.ARABIC); // Çıktı: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Çıktı: "ltr"
getHTMLTextDir(Locales.FRENCH); // Çıktı: "ltr"
getHTMLTextDir(Locales.ARABIC); // Çıktı: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Çıktı: "ltr"
getHTMLTextDir(Locales.FRENCH); // Çıktı: "ltr"
getHTMLTextDir(Locales.ARABIC); // Çıktı: "rtl"
```

## Kenar Durumları

- **Yerel Ayar Sağlanmadı:**
  - `locale` `undefined` olduğunda fonksiyon `'auto'` döndürür.

- **Tanınmayan Yerel Ayar:**
  - Tanınmayan yerel ayarlar için fonksiyon varsayılan olarak `'auto'` döndürür.

## Bileşenlerde Kullanım:

`getHTMLTextDir` fonksiyonu, yerel ayara göre HTML belgesinde `dir` özelliğini dinamik olarak ayarlamak için kullanılabilir.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

Yukarıdaki örnekte, `dir` özelliği yerel ayara göre dinamik olarak ayarlanır.

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
