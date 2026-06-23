---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Dokümantasyonu | preact-intlayer
description: preact-intlayer paketi için usePathname hook'unun nasıl kullanılacağını öğrenin
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname yardımcı programı eklendi"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Geçmişi başlat"
author: aymericzip
---

# Preact Entegrasyonu: `usePathname` Hook Dokümantasyonu

`usePathname` hook'u, locale segmenti çıkarılmış olarak mevcut tarayıcı pathname'ini (yolu) döndürür. Bu, locale ön ekini manuel olarak kaldırmak zorunda kalmadan locale'e duyarlı bir navigasyon oluşturmak — örneğin, hangi navigasyon öğesinin aktif olduğunu belirlemek — için yararlıdır.

## Preact'te `usePathname` İçe Aktarımı

```typescript
import { usePathname } from "preact-intlayer";
```

## Genel Bakış

`usePathname`, `window.location.pathname` değerini okur, `getPathWithoutLocale` aracılığıyla locale ön ekini çıkarır ve tarayıcı her `popstate` olayı (geri/ileri gezinme) tetiklediğinde bileşeni yeniden render (re-render) eder. Sunucu tarafı oluşturma (SSR) sırasında boş bir dize (string) döndürür.

## Kullanım

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
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

| Tür      | Açıklama                                                                                                    |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| `string` | Locale ön eki olmayan mevcut pathname (yol). Sunucu tarafı oluşturma (SSR) sırasında boş bir dize döndürür. |

## Davranış

- **Locale çıkarma (Locale stripping)**: Öndeki locale segmentini kaldırır (örn. `/tr/dashboard` → `/dashboard`).
- **Reaktif**: `popstate` olaylarında (tarayıcı geri / ileri gezinme) otomatik olarak güncellenir.
- **SSR güvenli (SSR-safe)**: `window` mevcut olmadığında `""` döndürür.
- **Temizleme (Cleanup)**: Bileşen DOM'dan kaldırıldığında (unmount), `popstate` dinleyicisi otomatik olarak kaldırılır.

## Örnek

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Kontrol Paneli" },
  { href: "/settings", label: "Ayarlar" },
];

const Sidebar: FunctionComponent = () => {
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

## İlgili Konular

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/preact-intlayer/exports.md) — mevcut locale + locale değiştirici
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md) — bu hook tarafından kullanılan temel yardımcı program
