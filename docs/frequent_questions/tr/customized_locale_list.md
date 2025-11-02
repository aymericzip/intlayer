---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Dil listesi nasıl özelleştirilir?
description: Dil listesini nasıl özelleştireceğinizi öğrenin.
keywords:
  - diller
  - liste
  - intlayer
  - yapılandırma
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - locale
  - list
slugs:
  - frequent-questions
  - customized-locale-list
---

# İngilizce gibi bir dil tipini engellemek mümkün mü? Sözlüklerime İngilizce ekliyorum ama henüz sitede İngilizceyi aktif etmek istemiyorum

Evet, İngilizce gibi bir dili `availableLocales` seçeneğiyle engelleyebilirsiniz.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

veya

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Bu yapılandırma, `t()` fonksiyonunuzun tiplerini sadece kullanılabilir dillerle sınırlar.

`availableLocales` isteğe bağlıdır, belirtmezseniz tüm diller kullanılabilir olur.

Dikkat: `availableLocales`'a eklediğiniz tüm diller, `locales` içinde de olmalıdır.

Eğer `useLocale` hook'unu kullanırsanız, `availableLocales` seçeneği dil listesini belirler.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
