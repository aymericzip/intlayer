---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Dokumentation | angular-intlayer
description: Erfahren Sie, wie Sie den usePathname Hook im angular-intlayer Paket verwenden
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisierung
  - Dokumentation
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
    changes: "usePathname-Dienstprogramm hinzugefügt"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Historie initialisiert"
author: aymericzip
---

# Angular-Integration: `usePathname` Hook Dokumentation

Der `usePathname`-Hook gibt den aktuellen Browser-Pfad als Angular `Signal<string>` zurück, wobei das Gebietsschema-Segment (Locale) entfernt wurde. Er ist nützlich für den Aufbau einer gebietsschema-basierten Navigation — zum Beispiel, um festzustellen, welches Navigationselement aktiv ist —, ohne das Gebietsschema-Präfix manuell entfernen zu müssen.

## `usePathname` in Angular importieren

```typescript
import { usePathname } from "angular-intlayer";
```

## Überblick

`usePathname` liest `window.location.pathname`, entfernt das Gebietsschema-Präfix mittels `getPathWithoutLocale` und aktualisiert das Signal bei jedem `popstate`-Ereignis des Browsers (Zurück-/Vorwärts-Navigation). Er nutzt Angulars `DestroyRef`, um den Event-Listener bei Zerstörung der Komponente automatisch zu entfernen.

## Verwendung

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

## Rückgabewert

| Typ              | Beschreibung                                                                  |
| ---------------- | ----------------------------------------------------------------------------- |
| `Signal<string>` | Angular-Signal, das den aktuellen Pfad ohne das Gebietsschema-Präfix enthält. |

## Verhalten

- **Gebietsschema entfernen**: Entfernt das führende Gebietsschema-Segment (z. B. `/de/dashboard` → `/dashboard`).
- **Reaktiv**: Aktualisiert sich automatisch bei `popstate`-Ereignissen (Zurück-/Vorwärts-Navigation im Browser).
- **SSR-kompatibel**: Gibt `""` zurück, wenn `window` nicht verfügbar ist.
- **Bereinigung**: Der `popstate`-Listener wird über `DestroyRef.onDestroy` entfernt, wenn die Host-Komponente zerstört wird.

## Beispiel

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
    { href: "/settings", label: "Settings" },
  ];

  readonly pathname = usePathname();
}
```

## Verwandt

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/angular-intlayer/exports.md) — aktuelles Gebietsschema + Gebietsschema-Wechsler
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md) — das von diesem Hook zugrundeliegende genutzte Dienstprogramm
