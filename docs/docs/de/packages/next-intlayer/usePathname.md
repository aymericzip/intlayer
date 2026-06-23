---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Dokumentation | next-intlayer
description: Erfahren Sie, wie Sie den usePathname Hook für das next-intlayer Paket verwenden
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisierung
  - Dokumentation
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
    changes: "usePathname-Dienstprogramm hinzugefügt"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Initialisierung des Verlaufs"
author: aymericzip
---

# Next.js Integration: `usePathname` Hook Dokumentation

Der `usePathname` Hook gibt den aktuellen Next.js-Pfad ohne das Gebietsschema-Segment zurück. Dies ist nützlich für den Aufbau einer lokalisierungsbasierten Navigation – zum Beispiel, um festzustellen, welches Navigationselement aktiv ist – ohne das Gebietsschema-Präfix manuell entfernen zu müssen.

## Importieren von `usePathname` in Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Übersicht

`usePathname` verpackt die integrierte Funktion `usePathname()` von Next.js aus `next/navigation`, fügt alle Suchparameter (search params) hinzu und entfernt das Gebietsschema-Präfix mittels `getPathWithoutLocale`. Es führt bei jeder clientseitigen Navigation ein erneutes Rendern durch. Der Hook ist nur in Client Components verfügbar (erfordert `"use client"`).

## Verwendung

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

## Rückgabewert

| Typ      | Beschreibung                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| `string` | Der aktuelle Pfad ohne das Gebietsschema-Präfix und ohne gebietsschemaspezifische Abfrageparameter (query params). |

## Verhalten

- **Gebietsschema-Entfernung**: Entfernt das führende Gebietsschema-Segment (z.B. `/de/dashboard` → `/dashboard`).
- **Entfernung der Suchparameter**: Entfernt auch einen `?locale=...` Abfrageparameter, wenn der auf Suchparametern basierende Routing-Modus verwendet wird.
- **Reaktiv**: Aktualisiert sich automatisch bei jeder clientseitigen Navigation über den Next.js App Router.
- **SSR-sicher**: Gibt den serverseitigen Pfad während des ersten Renderings zurück und synchronisiert dann die Suchparameter auf dem Client.

## Vergleich mit `useLocale`

`useLocale` aus `next-intlayer` legt `pathWithoutLocale` bereits als Teil seines Rückgabewerts offen. Verwenden Sie `usePathname`, wenn Sie nur den Pfad benötigen und keine Funktionalität zum Wechseln des Gebietsschemas erforderlich ist.

```tsx codeFormat={["typescript", "esm"]}
// Wenn Sie sowohl den Gebietsschema-Status als auch den Pfad benötigen:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Wenn Sie nur den Pfad benötigen:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Beispiel

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Einstellungen" },
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

## Verwandt

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md) — aktuelles Gebietsschema + Gebietsschema-Umschalter (legt auch `pathWithoutLocale` offen)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md) — das grundlegende Dienstprogramm, das von diesem Hook verwendet wird
