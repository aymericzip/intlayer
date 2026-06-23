---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Dokumentation | preact-intlayer
description: Erfahre, wie der usePathname Hook aus dem Paket preact-intlayer verwendet wird
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisierung
  - Dokumentation
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
    changes: "usePathname-Dienstprogramm hinzufügen"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Verlauf initialisieren"
author: aymericzip
---

# Preact Integration: `usePathname` Hook Dokumentation

Der `usePathname` Hook gibt den aktuellen Pfadnamen (pathname) des Browsers zurück, wobei das Locale-Segment entfernt wurde. Dies ist nützlich für den Aufbau einer Locale-bewussten Navigation — beispielsweise, um festzustellen, welches Navigationselement aktiv ist — ohne den Locale-Präfix manuell entfernen zu müssen.

## Importieren von `usePathname` in Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Überblick

`usePathname` liest `window.location.pathname`, entfernt das Locale-Präfix über `getPathWithoutLocale` und führt bei jedem `popstate`-Ereignis des Browsers (Zurück-/Vorwärts-Navigation) ein erneutes Rendern (Re-Render) der Komponente aus. Während des serverseitigen Renderings (SSR) gibt es einen leeren String zurück.

## Verwendung

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

## Rückgabewert

| Typ      | Beschreibung                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------- |
| `string` | Der aktuelle Pfadname ohne Locale-Präfix. Leerer String während des serverseitigen Renderings (SSR). |

## Verhalten

- **Locale entfernen (Locale stripping)**: Entfernt das führende Locale-Segment (z. B. `/de/dashboard` → `/dashboard`).
- **Reaktiv**: Aktualisiert sich automatisch bei `popstate`-Ereignissen (Zurück / Vorwärts-Navigation des Browsers).
- **SSR-sicher**: Gibt `""` zurück, wenn `window` nicht verfügbar ist.
- **Aufräumen (Cleanup)**: Der `popstate`-Listener wird automatisch entfernt, wenn die Komponente entladen (unmounted) wird.

## Beispiel

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Einstellungen" },
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

## Verwandt

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/preact-intlayer/exports.md) — Aktuelle Locale + Locale-Umschalter
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md) — Das zugrunde liegende Dienstprogramm (Utility), das von diesem Hook verwendet wird
