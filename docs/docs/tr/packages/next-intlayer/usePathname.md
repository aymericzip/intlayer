---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Dokümantasyonu | next-intlayer
description: next-intlayer paketi için usePathname hook'unun nasıl kullanılacağını öğrenin
keywords:
  - usePathname
  - pathname
  - locale
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
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname aracı eklendi"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Geçmişin başlatılması"
author: aymericzip
---

# Next.js Entegrasyonu: `usePathname` Hook Dokümantasyonu

`usePathname` hook'u, yerel ayar (locale) segmenti kaldırılmış olan geçerli Next.js yolunu (pathname) döndürür. Bu, yerel ayar ön ekini manuel olarak kaldırmak zorunda kalmadan, yerel ayar duyarlı gezinme oluşturmak (örneğin, hangi gezinme öğesinin aktif olduğunu belirlemek) için kullanışlıdır.

## `usePathname`'i Next.js'te İçe Aktarma

```typescript
import { usePathname } from "next-intlayer";
```

## Genel Bakış

`usePathname`, `next/navigation`'dan gelen Next.js'in yerleşik `usePathname()` fonksiyonunu sarar, herhangi bir arama parametresini (search params) ekler ve yerel ayar önekini `getPathWithoutLocale` aracılığıyla kaldırır. Her istemci tarafı gezinmesinde (client-side navigation) yeniden render (re-render) tetikler. Hook yalnızca Client Component'lerde kullanılabilir (`"use client"` gerektirir).

## Kullanım

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Dönüş Değeri

| Tip      | Açıklama                                                                                                              |
| -------- | --------------------------------------------------------------------------------------------------------------------- |
| `string` | Yerel ayar öneki ve yerel ayarla ilgili sorgu parametreleri (query parameters) kaldırılmış mevcut yol adı (pathname). |

## Davranış

- **Yerel ayar kırpma**: Başlangıçtaki yerel ayar segmentini kaldırır (örneğin `/tr/dashboard` → `/dashboard`).
- **Arama parametresi kırpma**: Arama parametresi (search param) tabanlı yönlendirme modu kullanıldığında `?locale=...` sorgu parametresini de kaldırır.
- **Reaktif**: Next.js App Router üzerinden yapılan her istemci tarafı gezinmede otomatik olarak güncellenir.
- **SSR Güvenli**: İlk render sırasında sunucu tarafı yolu döndürür, ardından istemcideki arama parametrelerini eşitler (sync).

## `useLocale` ile Karşılaştırma

`next-intlayer`'dan alınan `useLocale`, dönüş değerinin bir parçası olarak zaten `pathWithoutLocale`'i sunar. Yerel ayar değiştirme işlevine ihtiyaç duymadan sadece yola (path) ihtiyacınız olduğunda `usePathname`'i kullanın.

```tsx codeFormat={["typescript", "esm"]}
// Hem yerel ayar durumuna hem de yola ihtiyacınız olduğunda:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Sadece yola ihtiyacınız olduğunda:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Örnek

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Kontrol Paneli" },
  { href: "/settings", label: "Ayarlar" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## İlgili Dokümanlar

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md) — mevcut yerel ayar + yerel ayar değiştirici (ayrıca `pathWithoutLocale`'i de sunar)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md) — bu hook tarafından kullanılan temel yardımcı araç
