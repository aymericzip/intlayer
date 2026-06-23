---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Dokumentation | solid-intlayer
description: Erfahren Sie, wie Sie den usePathname Hook aus dem Paket solid-intlayer verwenden.
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisierung
  - Dokumentation
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
    changes: "usePathname-Dienstprogramm hinzufügen"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Init history"
author: aymericzip
---

# Solid Integration: `usePathname` Hook Dokumentation

Der `usePathname` Hook gibt den aktuellen Browser-Pfadnamen (pathname) ohne das Locale-Segment als Solid `Accessor<string>` zurück. Dies ist nützlich für locale-sensitive Navigation — zum Beispiel um zu bestimmen, welches Navigationselement aktiv ist — ohne den Locale-Präfix manuell entfernen zu müssen.

## Importieren von `usePathname` in Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Überblick

`usePathname` erstellt ein reaktives Signal, das von `window.location.pathname` initialisiert wird, entfernt das Locale-Präfix über `getPathWithoutLocale` und aktualisiert das Signal, wann immer der Browser ein `popstate`-Ereignis auslöst (Zurück-/Vorwärtsnavigation). Der Ereignis-Listener wird automatisch über `onCleanup` bereinigt.

## Nutzung

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

## Rückgabewert

| Typ                | Beschreibung                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Solid Accessor (reaktiver Getter), der den aktuellen Pfadnamen ohne das Locale-Präfix zurückgibt. |

## Verhalten

- **Locale-Entfernung**: Entfernt das führende Locale-Segment (z.B. `/de/dashboard` → `/dashboard`).
- **Reaktiv**: Aktualisiert sich automatisch bei `popstate`-Ereignissen (Zurück / Vorwärts-Navigation im Browser).
- **SSR-sicher**: Gibt `""` zurück, wenn `window` nicht verfügbar ist.
- **Bereinigung**: Der `popstate`-Listener wird automatisch über Solids `onCleanup` entfernt.

## Beispiel

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Einstellungen" },
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

## Verwandte Dokumente

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useLocale.md) — aktuelle Locale + Locale-Umschalter
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md) — das zugrunde liegende Dienstprogramm, das von diesem Hook verwendet wird
