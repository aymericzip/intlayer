---
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
description: Documentation for the useLocale hook in the next-intlayer package
createdAt: 2025-09-07
updatedAt: 2026-01-26
title: useLocale Hook Dokümantasyonu | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: `onLocaleChange` varsayılan olarak `replace` olarak ayarlandı
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

## Parametreler

`useLocale` hook'u aşağıdaki parametreleri kabul eder:

- **`onLocaleChange`**: Yerel ayar değiştiğinde URL'nin nasıl güncelleneceğini belirleyen bir dize. `"replace"`, `"push"` veya `"none"` olabilir.

  > Bir örnek verelim:
  >
  > 1. `/fr/home` sayfasındasınız
  > 2. `/fr/about` sayfasına gidiyorsunuz
  > 3. Yerel ayarı `/es/about` olarak değiştiriyorsunuz
  > 4. Tarayıcının "geri" düğmesine tıklıyorsunuz
  >
  > Davranış, `onLocaleChange` değerine bağlı olarak farklılık gösterecektir:
  >
  > - `"replace"` (varsayılan): Mevcut URL'yi yeni yerelleştirilmiş URL ile değiştirir ve çerezi ayarlar.
  >   -> "Geri" düğmesi `/es/home` sayfasına gidecektir
  > - `"push"`: Yeni yerelleştirilmiş URL'yi tarayıcı geçmişine ekler ve çerezi ayarlar.
  >   -> "Geri" düğmesi `/fr/about` sayfasına gidecektir
  > - `"none"`: URL'yi değiştirmeden yalnızca istemci bağlamındaki yerel ayarı günceller ve çerezi ayarlar.
  >   -> "Geri" düğmesi `/fr/home` sayfasına gidecektir
  > - `(locale) => void`: Çerezi ayarlar ve yerel ayar değiştiğinde çağrılacak özel bir işlevi tetikler.
  >
  >   `undefined` seçeneği varsayılan davranıştır; yeni yerel ayara gitmek için `Link` bileşenini kullanmanızı öneririz.
  >   Örnek:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     Hakkımızda
  >   </Link>
  >   ```

## Dönüş Değerleri

- **`locale`**: React bağlamında ayarlanan mevcut yerel ayar.
- **`defaultLocale`**: Yapılandırmada tanımlanan birincil yerel ayar.
- **`availableLocales`**: Yapılandırmada tanımlanan tüm kullanılabilir yerel ayarların listesi.
- **`setLocale`**: Uygulamanın yerel ayarını değiştirmek ve URL'yi buna göre güncellemek için bir işlev. Yapılandırmaya göre yola yerel ayar eklenip eklenmeyeceğine ilişkin önek kurallarını halleder. Navigasyon işlevleri için `next/navigation`'dan `useRouter`'ı kullanır.
- **`pathWithoutLocale`**: Yerel ayar olmadan yolu döndüren hesaplanmış bir özellik. URL'leri karşılaştırmak için kullanışlıdır. Örneğin, mevcut yerel ayar `fr` ise ve url `fr/my_path`, yerel ayar olmadan yol `/my_path` olur. Geçerli yolu almak için `next/navigation`'dan `usePathname`'ı kullanır.

## Sonuç

`next-intlayer`'dan `useLocale` hook'u, Next.js uygulamalarında yerel ayarları yönetmek için önemli bir araçtır. Yerel ayar depolamayı, durum yönetimini ve URL değişikliklerini sorunsuz bir şekilde hallederek uygulamanızı birden fazla yerel ayar için uyarlamak için entegre bir yaklaşım sağlar.
