---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: useLocale Hook Dokümantasyonu | next-intlayer
description: next-intlayer paketi için useLocale hook'unun nasıl kullanılacağını görün
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Next.js Entegrasyonu: `useLocale` Hook Dokümantasyonu `next-intlayer` için

Bu bölüm, `next-intlayer` kütüphanesinde Next.js uygulamaları için uyarlanmış `useLocale` hook'una ilişkin detaylı dokümantasyon sağlar. Yerel ayar değişikliklerini ve yönlendirmeyi verimli bir şekilde yönetmek için tasarlanmıştır.

## Next.js'te `useLocale` İçe Aktarma

Next.js uygulamanızda `useLocale` hook'unu kullanmak için aşağıdaki gibi içe aktarın:

```javascript
import { useLocale } from "next-intlayer"; // Next.js'te yerel ayarları ve yönlendirmeyi yönetmek için kullanılır
```

## Kullanım

İşte `useLocale` hook'unu bir Next.js bileşeninde nasıl uygulayabileceğiniz:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Mevcut Yerel Ayar: {locale}</h1>
      <p>Varsayılan Yerel Ayar: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Mevcut Yerel Ayar: {locale}</h1>
      <p>Varsayılan Yerel Ayar: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Mevcut Yerel Ayar: {locale}</h1>
      <p>Varsayılan Yerel Ayar: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Parametreler ve Dönüş Değerleri

`useLocale` hook'unu çağırdığınızda, aşağıdaki özellikleri içeren bir nesne döndürür:

- **`locale`**: React bağlamında ayarlanan mevcut yerel ayar.
- **`defaultLocale`**: Yapılandırmada tanımlanan birincil yerel ayar.
- **`availableLocales`**: Yapılandırmada tanımlanan tüm kullanılabilir yerel ayarların listesi.
- **`setLocale`**: Uygulamanın yerel ayarını değiştirmek ve URL'yi buna göre güncellemek için bir işlev. Yapılandırmaya göre yola yerel ayar eklenip eklenmeyeceğine ilişkin önek kurallarını halleder. Navigasyon işlevleri için `next/navigation`'dan `useRouter`'ı kullanır.
- **`pathWithoutLocale`**: Yerel ayar olmadan yolu döndüren hesaplanmış bir özellik. URL'leri karşılaştırmak için kullanışlıdır. Örneğin, mevcut yerel ayar `fr` ise ve url `fr/my_path`, yerel ayar olmadan yol `/my_path` olur. Geçerli yolu almak için `next/navigation`'dan `usePathname`'ı kullanır.

## Sonuç

`next-intlayer`'dan `useLocale` hook'u, Next.js uygulamalarında yerel ayarları yönetmek için önemli bir araçtır. Yerel ayar depolamayı, durum yönetimini ve URL değişikliklerini sorunsuz bir şekilde hallederek uygulamanızı birden fazla yerel ayar için uyarlamak için entegre bir yaklaşım sağlar.
