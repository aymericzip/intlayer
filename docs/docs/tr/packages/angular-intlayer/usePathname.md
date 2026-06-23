---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Belgeleri | angular-intlayer
description: angular-intlayer paketinde usePathname hook'unun nasıl kullanılacağını öğrenin
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
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

# Angular Entegrasyonu: `usePathname` Hook Belgeleri

`usePathname` hook'u, yerel ayar segmenti kaldırılmış geçerli tarayıcı yol adını bir Angular `Signal<string>` olarak döndürür. Bu, yerel ayar ön ekini manuel olarak kaldırmak zorunda kalmadan yerel ayara duyarlı gezinme oluşturmak (örneğin hangi gezinme öğesinin etkin olduğunu belirlemek) için yararlıdır.

## Angular'da `usePathname` İçe Aktarımı

```typescript
import { usePathname } from "angular-intlayer";
```

## Genel Bakış

`usePathname` `window.location.pathname` değerini okur, `getPathWithoutLocale` aracılığıyla yerel ayar ön ekini kaldırır ve tarayıcı her `popstate` olayı (geri/ileri gezinme) tetiklediğinde sinyali günceller. Bileşen yok edildiğinde olay dinleyicisini otomatik olarak temizlemek için Angular'ın `DestroyRef` sınıfını kullanır.

## Kullanım

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## Dönüş Değeri

| Tür              | Açıklama                                                            |
| ---------------- | ------------------------------------------------------------------- |
| `Signal<string>` | Yerel ayar ön eki olmayan geçerli yol adını içeren Angular sinyali. |

## Davranış

- **Yerel ayar kaldırma**: Öndeki yerel ayar segmentini kaldırır (örn. `/tr/dashboard` → `/dashboard`).
- **Reaktif**: `popstate` olaylarında (tarayıcı geri / ileri gezinme) otomatik olarak güncellenir.
- **SSR güvenli**: `window` mevcut olmadığında `""` döndürür.
- **Temizlik**: Barındıran bileşen yok edildiğinde `DestroyRef.onDestroy` aracılığıyla `popstate` dinleyicisi kaldırılır.

## Örnek

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "Kontrol Paneli" },
    { href: "/settings", label: "Ayarlar" },
  ];

  readonly pathname = usePathname();
}
```

## İlgili

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/angular-intlayer/exports.md) — mevcut yerel ayar + yerel ayar değiştirici
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md) — bu hook tarafından kullanılan temel yardımcı program
