---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useLocale Hook Dokümantasyonu | solid-intlayer
description: solid-intlayer paketi için useLocale hookunun nasıl kullanılacağını görün
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm exports için birleştirilmiş dokümantasyon
---

# useLocale Hook Dokümantasyonu

`useLocale` hook'u Solid uygulamanızda mevcut locale'i yönetmenizi sağlar. Mevcut locale'e (bir accessor olarak), varsayılan locale'e, kullanılabilir locale'lere ve locale'i güncellemek için bir fonksiyona erişim sağlar.

## Kullanım

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Açıklama

Hook aşağıdaki özelliklere sahip bir obje döndürür:

1. **locale**: Geçerli locale'i döndüren bir Solid accessor'ı (`() => string`).
2. **defaultLocale**: `intlayer.config.ts` içinde tanımlı varsayılan locale.
3. **availableLocales**: Uygulamanız tarafından desteklenen tüm locale'lerin bir dizisi.
4. **setLocale**: Uygulamanın locale'ini güncelleyen bir fonksiyon. Etkinleştirildiyse kalıcılığı (cookies/local storage) de yönetir.

## Parametreler

- **props** (isteğe bağlı):
  - **onLocaleChange**: Locale her değiştiğinde çağrılan bir callback fonksiyonu.
  - **isCookieEnabled**: Locale'ı bir cookie'de saklayıp saklamayacağını belirtir.
