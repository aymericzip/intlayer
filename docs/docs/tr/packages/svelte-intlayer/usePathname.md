---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Fonksiyonu Dokümantasyonu | svelte-intlayer
description: svelte-intlayer paketindeki usePathname fonksiyonunun nasıl kullanılacağını öğrenin
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Uluslararasılaştırma (Internationalization)
  - Dokümantasyon
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname yardımcı programını ekle"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Geçmişi başlat"
author: aymericzip
---

# Svelte Entegrasyonu: `usePathname` Dokümantasyonu

`usePathname` fonksiyonu, locale segmenti kaldırılmış geçerli tarayıcı yol adını (pathname) bir Svelte `Readable<string>` store'u olarak döndürür. Locale önekini manuel olarak kaldırmanıza gerek kalmadan, locale farkındalığına sahip navigasyonlar oluşturmak (örneğin hangi navigasyon öğesinin aktif olduğunu belirlemek) için yararlıdır.

## Svelte'de `usePathname` Kullanımı

```typescript
import { usePathname } from "svelte-intlayer";
```

## Genel Bakış

`usePathname`, `window.location.pathname` üzerinden okuma yapan ve locale önekini `getPathWithoutLocale` aracılığıyla kaldıran bir Svelte okuma (readable) store'u oluşturur ve tarayıcı her `popstate` olayı tetiklediğinde (geri/ileri gezinme) yeni bir değer yayar. Bileşenlerde `$` store sözdizimi ile abone olunur.

## Kullanım

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## Döndürülen Değer

| Tür                | Açıklama                                                                          |
| ------------------ | --------------------------------------------------------------------------------- |
| `Readable<string>` | Locale öneki olmadan geçerli yol adını (pathname) içeren Svelte readable store'u. |

## Davranış

- **Locale kaldırma**: Başta bulunan locale segmentini kaldırır (ör. `/tr/dashboard` → `/dashboard`).
- **Reaktif**: Her `popstate` olayında (tarayıcıda geri / ileri navigasyonu) yeni bir değer yayar.
- **SSR-güvenli**: `window` mevcut olmadığında `""` döndürür.
- **Temizleme (Cleanup)**: Son abone abonelikten çıktığında `popstate` dinleyicisi otomatik olarak kaldırılır.

## Örnek

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Gösterge Paneli" },
    { href: "/settings", label: "Ayarlar" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## İlgili

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/svelte-intlayer/useLocale.md) — mevcut locale + locale değiştirici
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md) — bu hook tarafından kullanılan temel yardımcı program
