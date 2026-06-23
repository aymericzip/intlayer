---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Dokumentation | react-intlayer
description: Erfahren Sie, wie Sie den usePathname Hook aus dem react-intlayer Paket verwenden, um den aktuellen URL-Pfad ohne das Locale-Segment zu erhalten.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - internationalisierung
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Dienstprogramm usePathname hinzufügen"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Historie initialisieren"
author: aymericzip
---

# React Integration: `usePathname` Hook Dokumentation

Der `usePathname` Hook von `react-intlayer` gibt den aktuellen Pfadnamen (pathname) des Browsers zurück, wobei das Locale-Segment entfernt wurde. Er stützt sich auf das native `window.location.pathname` und reagiert auf Browser-Navigationsereignisse via `popstate`.

## Importieren von `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Übersicht

Im Gegensatz zu Framework-spezifischen Routing-Hooks (wie denen in `next-intlayer` oder `react-router`), ist dieser Hook eine leichtgewichtige, Framework-unabhängige Lösung für einfache React-Anwendungen. Er extrahiert die aktuelle URL und entfernt jedes übereinstimmende Locale-Präfix (z. B. wird `/de/about` zu `/about`).

## Verwendung

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Startseite
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        Über uns
      </a>
    </nav>
  );
};

export default Navigation;
```

## Rückgabewert

| Typ      | Beschreibung                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `string` | Der aktuelle Pfadname des Browsers mit entferntem Locale-Präfix (z. B. `/de/dashboard` → `/dashboard`). |

## Verhalten

- **Locale-Entfernung**: Verwendet das `getPathWithoutLocale` Dienstprogramm im Hintergrund, um das Gebietsschema automatisch aus dem Pfadnamen zu erkennen und zu entfernen, basierend auf der Intlayer-Konfiguration der Anwendung.
- **Reaktivität**: Hört auf das `popstate` Ereignis. Wenn der Benutzer mit den Zurück-/Vorwärts-Schaltflächen des Browsers navigiert oder wenn `pushState`/`replaceState` aufgerufen wird, aktualisiert der Hook den zurückgegebenen Pfadnamen.
- **SSR Fallback**: Auf dem Server (wo `window` undefiniert ist), wird standardmäßig `/` zurückgegeben, da es in einem reinen React-Kontext standardmäßig keinen Zugriff auf die anfordernde URL hat.

## Verwandte Dokumentation

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md)
