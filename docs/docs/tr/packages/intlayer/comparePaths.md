---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: comparePaths Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketi için comparePaths fonksiyonunun nasıl kullanılacağını görün
keywords:
  - comparePaths
  - normalizePath
  - aktif bağlantı
  - navigasyon
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
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "İlk dokümantasyon"
author: aymericzip
---

# Dokümantasyon: `intlayer` İçinde `comparePaths` Fonksiyonu

## Açıklama

`comparePaths` fonksiyonu, locale (dil) segmentini, protokolü/sunucuyu, sorgu dizesini, karma değerini (hash) ve sondaki eğik çizgileri göz ardı ederek iki URL'nin veya yolun eşitliğini karşılaştırır. Bir gezinme bağlantısının mevcut sayfayı işaret edip etmediğini belirlemenin —örneğin aktif bağlantıyı vurgulamak için— kendi (hataya açık) normalleştirme mantığınızı yazmanıza gerek kalmadan önerilen yoludur.

İçeride locale segmentini kaldırmak için [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md)'i yeniden kullanır, böylece yapılandırılmış yönlendirme modunuza ve dillerinize saygı duyar.

Paket ayrıca, karşılaştırma için kullanılan standartlaştırılmış, dilden bağımsız yolu döndüren temel [`normalizePath`](#normalizepath) yardımcısını da dışa aktarır.

**Anahtar Özellikler:**

- Dilden bağımsız karşılaştırma (`/tr/about`, `/about` ile eşleşir)
- Hem mutlak URL'lerle hem de göreceli yollarla çalışır
- Sorgu dizesini, karmayı ve sondaki eğik çizgileri yoksayar
- Eksik baştaki eğik çizgileri ve boş değerleri tolere eder (`/` olarak normalleştirilir)
- Hafif — `getPathWithoutLocale` üzerine inşa edilmiştir

---

## Fonksiyon İmzası

```typescript
comparePaths(
  pathname: string,  // Gerekli
  href: string,      // Gerekli
  locales?: Locales[] // İsteğe Bağlı
): boolean

normalizePath(
  inputUrl: string,   // Gerekli
  locales?: Locales[] // İsteğe Bağlı
): string
```

---

## Parametreler

- `pathname: string`
  - **Açıklama**: Karşılaştırılacak ilk URL dizesi veya yolu (genellikle mevcut yol).
  - **Tip**: `string`
  - **Gerekli**: Evet

- `href: string`
  - **Açıklama**: Karşılaştırılacak ikinci URL dizesi veya yolu (genellikle bir gezinme bağlantısının `href`'i).
  - **Tip**: `string`
  - **Gerekli**: Evet

- `locales: Locales[]`
  - **Açıklama**: Desteklenen dillerin isteğe bağlı dizisi. Varsayılan olarak projede yapılandırılan dillere eşittir.
  - **Tip**: `Locales[]`
  - **Gerekli**: Hayır (İsteğe Bağlı)

### Döndürür

- **Tip**: `boolean`
- **Açıklama**: Her iki giriş de aynı dilden bağımsız yola çözümlenirse `true`, aksi takdirde `false` döner.

---

## Örnek Kullanım

### Temel Kullanım

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### Mutlak ve Göreceli URL'ler

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Aktif gezinme bağlantısını vurgulama

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath`, `comparePaths` tarafından kullanılan standartlaştırılmış, dilden bağımsız yolu döndürür. Locale segmentini, protokolü/sunucuyu, sorgu dizesini ve karmayı kaldırır, tek bir baştaki eğik çizgi sağlar, herhangi bir sondaki eğik çizgiyi kaldırır (kök dizin hariç) ve boş değerler için `/`'a geri döner.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## İlgili Fonksiyonlar

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md): Bir URL'den veya yoldan locale segmentini kaldırır.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPrefix.md): Verilen bir locale için URL önekini belirler.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md): Belirli bir locale için yerelleştirilmiş bir URL oluşturur.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
