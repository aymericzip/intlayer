---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Özel Alan Adları
description: Farklı yerel ayarları özel ana makine adlarından sunmak için Intlayer'da alan adı tabanlı yerel ayar yönlendirmesini nasıl yapılandıracağınızı öğrenin.
keywords:
  - Özel Alan Adları
  - Alan Adı Yönlendirme
  - Yönlendirme
  - Uluslararasılaştırma
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "routing.domains yapılandırması aracılığıyla alan adı tabanlı yerel ayar yönlendirmesi eklendi."
---

# Özel Alan Adları

Intlayer, belirli yerel ayarları özel ana makine adlarından sunmanıza olanak tanıyan alan adı tabanlı yerel ayar yönlendirmesini destekler. Örneğin, Çinli ziyaretçiler `intlayer.org/zh` yerine `intlayer.zh` adresine yönlendirilebilir.

## Nasıl Çalışır?

`routing` içindeki `domains` eşlemesi, her yerel ayarı bir ana makine adıyla ilişkilendirir. Intlayer bu eşlemeyi iki yerde kullanır:

1. **URL oluşturma** (`getLocalizedUrl`): Hedef yerel ayar mevcut sayfadan _farklı_ bir alan adındaysa, mutlak bir URL döndürülür (örneğin `https://intlayer.zh/about`). Her iki alan adı da eşleştiğinde, göreli bir URL döndürülür (örneğin `/fr/about`).
2. **Sunucu proxy'si** (Next.js ve Vite): Gelen istekler, ulaştıkları alan adına göre yeniden yönlendirilir veya yeniden yazılır.

### Özel ve paylaşılan alan adları

Temel ayrım **münhasırlıktır**:

- **Özel alan adı** — Bu ana makine adına yalnızca bir yerel ayar eşlenir (örneğin `zh → intlayer.zh`). Alan adının kendisi yerel ayarı tanımlar, bu nedenle yola herhangi bir yerel ayar öneki eklenmez. `https://intlayer.zh/about` Çince içerik sunar.
- **Paylaşılan alan adı** — Birden fazla yerel ayar aynı ana makine adına eşlenir (örneğin hem `en` hem de `fr` `intlayer.org` adresine eşlenir). Normal önek tabanlı yönlendirme uygulanır. `intlayer.org/fr/about` Fransızca içerik sunar.

## Yapılandırma

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Paylaşılan alan adı — en ve fr, intlayer.org'da önek yönlendirmesini kullanır
      en: "intlayer.org",
      // Özel alan adı — zh'nin kendi ana makine adı vardır, /zh/ önekine gerek yoktur
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

`domains` içinde listelenmeyen yerel ayarlar, herhangi bir alan adı geçersiz kılma olmaksızın standart önek yönlendirmesini kullanmaya devam eder.

## URL Oluşturma

`getLocalizedUrl`, çağırma bağlamına bağlı olarak otomatik olarak doğru URL türünü oluşturur.

### Aynı alan adı yerel ayarı (göreli URL)

```ts
// Mevcut sayfa: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (varsayılan yerel ayar, önek yok)
```

### Alan adları arası yerel ayar (mutlak URL)

```ts
// Mevcut sayfa: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (özel alan adı, /zh/ öneki yok)
```

### Yerel ayarın kendi alan adından sunulması

```ts
// Mevcut sayfa: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (zaten doğru alan adında — göreli URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (intlayer.org'a geri dönen alan adları arası bağlantı)
```

### Mevcut alan adını otomatik algılama

`currentDomain` isteğe bağlıdır. Atlandığında, `getLocalizedUrl` bunu şu sırayla çözer:

1. Mutlak bir giriş URL'sinin ana makine adı (örneğin `https://intlayer.org/about` → `intlayer.org`).
2. Tarayıcı ortamlarında `window.location.hostname`.
3. Hiçbiri mevcut değilse (açık seçenek olmadan SSR), aynı alan adı yerel ayarları için göreli bir URL döndürülür ve mutlak bir URL oluşturulmaz — bu güvenli geri dönüştür.

```ts
// Tarayıcı — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (pencereden otomatik algılandı)

// Mutlak bir URL'den — alan adı otomatik olarak algılandı
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### Alan adları ile `getMultilingualUrls`

`getMultilingualUrls`, her yerel ayar için `getLocalizedUrl` çağırır, bu nedenle çağıranın alan adına bağlı olarak göreli ve mutlak URL'lerin bir karışımını oluşturur:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

Bu mutlak URL'ler, SEO için `<link rel="alternate" hreflang="...">` etiketlerinde kullanılmaya hazırdır.

## Proxy Davranışı

### Next.js

`intlayerProxy` ara katman yazılımı, alan adı yönlendirmesini otomatik olarak yönetir. `middleware.ts` dosyanıza ekleyin:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Yeniden Yönlendirme (Redirect)** — İstek, belirli bir yerel ayar öneki için yanlış alan adına ulaşır:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Yeniden Yazma (Rewrite)** — İstek, önek olmadan yerel ayarın özel alan adına ulaşır:

```
GET intlayer.zh/about
→ /zh/about adresine yeniden yaz (yalnızca dahili Next.js yönlendirmesi, URL temiz kalır)
```

### Vite

`intlayerProxy` Vite eklentisi, geliştirme sırasında aynı mantığı uygular:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Not**: Yerel geliştirmede genellikle `localhost` üzerindesinizdir, bu nedenle alan adları arası yeniden yönlendirmeler başka bir yerel bağlantı noktası yerine canlı alan adlarını işaret edecektir. Çoklu alan adı yönlendirmesini yerel olarak test etmeniz gerekiyorsa, bir hosts dosyası geçersiz kılması (örneğin `127.0.0.1 intlayer.zh`) veya bir ters proxy kullanın.

## Yerel Ayar Değiştirici (Locale Switcher)

`next-intlayer` paketindeki `useLocale` kancası, alan adına duyarlı gezinmeyi otomatik olarak yönetir. Bir kullanıcı farklı bir alan adındaki bir yerel ayara geçtiğinde, kanca istemci tarafı yönlendirici itmesi yerine tam sayfa gezinme (`window.location.href`) gerçekleştirir; çünkü Next.js yönlendiricisi kaynakları (origins) aşamaz.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Ek yapılandırma gerekmez — `useLocale` dahili olarak `window.location.hostname` algılar ve `router.replace` (aynı alan adı) ile `window.location.href` (alan adları arası) arasında karar verir.

## SEO: `hreflang` Alternatif Bağlantılar

Alan adı tabanlı yönlendirme, arama motorlarına her dil için hangi URL'yi dizine ekleyeceklerini söylemek için genellikle `hreflang` ile birlikte kullanılır. Tam alternatif URL setini oluşturmak için `getMultilingualUrls` kullanın:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // örneğin "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Bu şunları oluşturur:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Temel Yardımcı Programlar

| Yardımcı Program                                  | Açıklama                                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `getLocalizedUrl(url, locale, { currentDomain })` | Hedef yerel ayarın mevcut alan adında olup olmadığına bağlı olarak göreli veya mutlak URL döndürür.          |
| `getMultilingualUrls(url, { currentDomain })`     | Gerektiğinde göreli ve mutlak URL'leri karıştırarak yerel ayarlı bir yerelleştirilmiş URL haritası döndürür. |
| `getPrefix(locale, { domains })`                  | Özel alan adı yerel ayarları için boş bir önek, aksi takdirde normal önek döndürür.                          |
