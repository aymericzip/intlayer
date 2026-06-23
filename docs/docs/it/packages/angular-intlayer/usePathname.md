---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentazione dell'Hook usePathname | angular-intlayer
description: Scopri come utilizzare l'hook usePathname per il pacchetto angular-intlayer
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
    changes: "Aggiunta utilità usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inizializzazione della cronologia"
author: aymericzip
---

# Integrazione Angular: Documentazione dell'Hook `usePathname`

L'hook `usePathname` restituisce il percorso del browser corrente con il segmento della locale rimosso, sotto forma di `Signal<string>` Angular. È utile per creare una navigazione consapevole della locale — ad esempio, per determinare quale voce di navigazione è attiva — senza dover rimuovere manualmente il prefisso della locale.

## Importare `usePathname` in Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Panoramica

`usePathname` legge `window.location.pathname`, rimuove il prefisso della locale tramite `getPathWithoutLocale` e aggiorna il segnale ogni volta che il browser attiva un evento `popstate` (navigazione indietro/avanti). Utilizza il `DestroyRef` di Angular per pulire automaticamente il listener di eventi quando il componente viene distrutto.

## Utilizzo

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

## Valore di ritorno

| Tipo             | Descrizione                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| `Signal<string>` | Segnale Angular contenente il percorso corrente senza il prefisso della locale. |

## Comportamento

- **Rimozione della locale**: Rimuove il segmento iniziale della locale (es. `/it/dashboard` → `/dashboard`).
- **Reattivo**: Si aggiorna automaticamente in seguito a eventi `popstate` (navigazione indietro / avanti del browser).
- **Sicuro per SSR**: Restituisce `""` quando `window` non è disponibile.
- **Pulizia**: Il listener `popstate` viene rimosso tramite `DestroyRef.onDestroy` quando il componente host viene distrutto.

## Esempio

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
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Impostazioni" },
  ];

  readonly pathname = usePathname();
}
```

## Correlati

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/angular-intlayer/exports.md) — locale corrente + selettore della locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md) — l'utilità sottostante utilizzata da questo hook
