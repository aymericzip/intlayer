---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: onRequest Ara Yazılım Dokümantasyonu | astro-intlayer
description: İstek yerel ayarını çözümlemek ve Astro.locals.intlayer'ı doldurmak için Astro uygulamalarında onRequest ara yazılımının nasıl kullanılacağını görün.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - uluslararasılaştırma
  - dokümantasyon
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Başlangıç dokümantasyonu"
author: aymericzip
---

# onRequest Astro Ara Yazılım Dokümantasyonu

`astro-intlayer/middleware` paketindeki `onRequest` ara yazılımı, gelen her HTTP isteğinin yerel ayarını çözer ve `Astro.locals.intlayer` nesnesini doldurur.

`astro.config.mjs` içinde `intlayer()` entegrasyonunu kaydettiğinizde bu ara yazılım otomatik olarak eklenir. Yalnızca `sequence(...)` kullanarak Astro ara yazılımını manuel olarak oluşturuyorsanız doğrudan içe aktarmanız gerekir.

## Kullanım

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Özel ara yazılımınızda çözümlenen yerel ayara erişin
  const { locale } = context.locals.intlayer;
  console.log(`Yerel ayar için istek işleniyor: ${locale}`);

  return next();
});
```

## Açıklama

Ara yazılım aşağıdaki işlemleri gerçekleştirir:

1. **Yerel Ayar Algılama**:
   - **URL**: URL yolu önekini veya `?locale=` arama parametresini analiz eder (`routing.mode` `no-prefix` olarak ayarlanmadığı sürece).
   - **Çerezler / Başlıklar**: Kalıcı yerel ayar çerezlerini veya özel başlık değerlerini kontrol eder.
   - **Accept-Language**: Tarayıcının tercih edilen dil anlaşmasına geri döner.
   - Önceden oluşturulmuş sayfalar (`context.isPrerendered`) için, Astro derleme uyarılarını önlemek amacıyla yerel ayar kesinlikle URL'den ayıklanır.
2. **Bağlam Doldurma**: `Astro.locals.intlayer`'ı şunlarla doldurur:
   - `locale`: Çözümlenen yerel ayar.
   - `defaultLocale`: Varsayılan geri dönüş yerel ayarı.
   - `availableLocales`: Yapılandırılmış yerel ayarlar dizisi.
3. **AsyncLocalStorage Kapsamı**: Sonraki istek işlemeyi bir `AsyncLocalStorage` kapsamı içinde sararak `useIntlayer()`, `useDictionary()` ve `useLocale()`'ün argüman iletmeden istek durumuna erişmesine olanak tanır.

## `IntlayerLocals` Tipi

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## İlgili Dokümantasyon

- [`intlayer` Entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useLocale.md)
