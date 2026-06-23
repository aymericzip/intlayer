---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Dokümantasyonu | solid-intlayer
description: solid-intlayer paketindeki usePathname hook'unun nasıl kullanılacağını öğrenin
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
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

# Solid Entegrasyonu: `usePathname` Hook Dokümantasyonu

`usePathname` hook'u, geçerli tarayıcı yol adını (pathname) locale segmenti çıkarılmış olarak bir Solid `Accessor<string>` biçiminde döndürür. Locale duyarlı navigasyon oluşturmak — örneğin hangi navigasyon öğesinin aktif olduğunu belirlemek — için locale ön ekini manuel olarak kaldırmanıza gerek kalmadan kullanışlıdır.

## Solid'de `usePathname` İçe Aktarımı

```typescript
import { usePathname } from "solid-intlayer";
```

## Genel Bakış

`usePathname`, `window.location.pathname`'den başlatılan reaktif bir sinyal (reactive signal) oluşturur, `getPathWithoutLocale` aracılığıyla locale ön ekini kaldırır ve tarayıcı ne zaman bir `popstate` olayı (geri/ileri navigasyon) tetiklerse sinyali günceller. Olay dinleyicisi (event listener) `onCleanup` aracılığıyla otomatik olarak temizlenir.

## Kullanım

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Dönüş Değeri

| Tür                | Açıklama                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Locale ön eki olmayan mevcut yol adını (pathname) döndüren Solid Accessor (reaktif getter). |

## Davranış

- **Locale çıkarma**: Baştaki locale segmentini kaldırır (örn. `/tr/dashboard` → `/dashboard`).
- **Reaktif**: `popstate` olaylarında (tarayıcıda geri / ileri gitme) otomatik olarak güncellenir.
- **SSR-güvenli**: `window` kullanılamadığında `""` döndürür.
- **Temizleme (Cleanup)**: `popstate` dinleyicisi, Solid'in `onCleanup`'ı aracılığıyla otomatik olarak kaldırılır.

## Örnek

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Panel" },
  { href: "/settings", label: "Ayarlar" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## İlgili

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useLocale.md) — mevcut locale + locale değiştirici
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md) — bu hook tarafından kullanılan temel yardımcı program
