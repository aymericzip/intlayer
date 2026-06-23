---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentation der Funktion comparePaths | intlayer
description: Erfahren Sie, wie Sie die Funktion comparePaths für das intlayer-Paket verwenden
keywords:
  - comparePaths
  - normalizePath
  - aktiver Link
  - Navigation
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Initiale Dokumentation"
author: aymericzip
---

# Dokumentation: Funktion `comparePaths` in `intlayer`

## Beschreibung

Die Funktion `comparePaths` vergleicht zwei URLs oder Pfade auf Gleichheit und ignoriert dabei das Locale-Segment, das Protokoll/den Host, die Suchanfrage (Query-String), den Hash und abschließende Schrägstriche (Trailing Slashes). Dies ist die empfohlene Methode, um festzustellen, ob ein Navigationslink auf die aktuelle Seite verweist — beispielsweise um den aktiven Link hervorzuheben —, ohne dass Sie eine eigene (fehleranfällige) Normalisierungslogik erstellen müssen.

Intern verwendet sie [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md), um das Locale-Segment zu entfernen, sodass Ihr konfiguriertes Routing-Verfahren und Ihre Locales berücksichtigt werden.

Das Paket exportiert auch den zugrundeliegenden Helper [`normalizePath`](#normalizepath), der den kanonischen, Locale-unabhängigen Pfad für den Vergleich zurückgibt.

**Hauptmerkmale:**

- Locale-unabhängiger Vergleich (`/de/about` entspricht `/about`)
- Funktioniert sowohl mit absoluten URLs als auch mit relativen Pfaden
- Ignoriert Query-Strings, Hashes und abschließende Schrägstriche
- Toleriert fehlende führende Schrägstriche und leere Werte (normalisiert zu `/`)
- Leichtgewichtig — baut auf `getPathWithoutLocale` auf

---

## Funktionssignatur

```typescript
comparePaths(
  pathname: string,  // Erforderlich
  href: string,      // Erforderlich
  locales?: Locales[] // Optional
): boolean

normalizePath(
  inputUrl: string,   // Erforderlich
  locales?: Locales[] // Optional
): string
```

---

## Parameter

- `pathname: string`
  - **Beschreibung**: Der erste zu vergleichende URL-String oder Pfad (üblicherweise der aktuelle Pfad).
  - **Typ**: `string`
  - **Erforderlich**: Ja

- `href: string`
  - **Beschreibung**: Der zweite zu vergleichende URL-String oder Pfad (üblicherweise das `href` eines Navigationslinks).
  - **Typ**: `string`
  - **Erforderlich**: Ja

- `locales: Locales[]`
  - **Beschreibung**: Optionales Array unterstützter Locales. Standardmäßig die im Projekt konfigurierten Locales.
  - **Typ**: `Locales[]`
  - **Erforderlich**: Nein (Optional)

### Rückgabewert

- **Typ**: `boolean`
- **Beschreibung**: `true`, wenn beide Eingaben auf denselben Locale-unabhängigen Pfad auflösen, ansonsten `false`.

---

## Anwendungsbeispiel

### Grundlegende Nutzung

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### Absolute und relative URLs

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Hervorheben des aktiven Navigationslinks

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` gibt den kanonischen, Locale-unabhängigen Pfad zurück, der von `comparePaths` verwendet wird. Es entfernt das Locale-Segment, das Protokoll/den Host, den Query-String und den Hash, stellt einen einzelnen führenden Schrägstrich sicher, entfernt jegliche abschließenden Schrägstriche (außer für das Stammverzeichnis) und greift für leere Werte auf `/` zurück.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Verwandte Funktionen

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md): Entfernt das Locale-Segment aus einer URL oder einem Pfad.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPrefix.md): Ermittelt das URL-Präfix für ein bestimmtes Locale.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md): Generiert eine lokalisierte URL für ein bestimmtes Locale.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
