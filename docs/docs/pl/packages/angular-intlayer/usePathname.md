---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentacja hooka usePathname | angular-intlayer
description: Dowiedz się, jak korzystać z hooka usePathname w pakiecie angular-intlayer
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
    changes: "Dodano narzędzie usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Zainicjowano historię"
author: aymericzip
---

# Integracja Angular: Dokumentacja hooka `usePathname`

Hook `usePathname` zwraca bieżącą ścieżkę przeglądarki po usunięciu segmentu ustawień regionalnych jako `Signal<string>` Angulara. Jest przydatny do budowania nawigacji opartej na języku — na przykład do określania, który element nawigacji jest aktywny — bez konieczności ręcznego usuwania prefiksu ustawień regionalnych.

## Importowanie `usePathname` w Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Przegląd

`usePathname` odczytuje `window.location.pathname`, usuwa prefiks ustawień regionalnych za pomocą `getPathWithoutLocale` i aktualizuje sygnał za każdym razem, gdy przeglądarka wywoła zdarzenie `popstate` (nawigacja wstecz/dalej). Używa `DestroyRef` Angulara, aby automatycznie oczyścić nasłuchiwacz zdarzeń, gdy komponent zostaje zniszczony.

## Zastosowanie

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

## Zwracana wartość

| Typ              | Opis                                                                           |
| ---------------- | ------------------------------------------------------------------------------ |
| `Signal<string>` | Sygnał Angular zawierający bieżącą ścieżkę bez prefiksu ustawień regionalnych. |

## Zachowanie

- **Usuwanie ustawień regionalnych**: Usuwa wiodący segment ustawień regionalnych (np. `/pl/dashboard` → `/dashboard`).
- **Reaktywność**: Aktualizuje się automatycznie przy zdarzeniach `popstate` (nawigacja wstecz / dalej w przeglądarce).
- **Bezpieczne dla SSR**: Zwraca `""`, gdy `window` nie jest dostępne.
- **Czyszczenie**: Nasłuchiwacz `popstate` jest usuwany przez `DestroyRef.onDestroy` gdy komponent główny zostaje zniszczony.

## Przykład

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
    { href: "/dashboard", label: "Pulpit" },
    { href: "/settings", label: "Ustawienia" },
  ];

  readonly pathname = usePathname();
}
```

## Powiązane

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/angular-intlayer/exports.md) — bieżący język + przełącznik języka
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md) — narzędzie pomocnicze wykorzystywane przez ten hook
