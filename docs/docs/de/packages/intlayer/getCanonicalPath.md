---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getCanonicalPath Funktionsdokumentation | intlayer
description: Anleitung zur Verwendung der Funktion getCanonicalPath im intlayer-Paket
keywords:
  - getCanonicalPath
  - Übersetzung
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Benutzerdefinierte URL-Umschreibungen implementiert
---

# Dokumentation: `getCanonicalPath`-Funktion in `intlayer`

## Beschreibung

Die Funktion `getCanonicalPath` löst einen lokalisierten URL-Pfad (z. B. `/a-propos`) zurück auf seinen internen kanonischen Anwendungs-Pfad (z. B. `/about`). Dies ist wichtig, damit Router die richtige interne Route unabhängig von der URL-Sprache finden können.

**Hauptmerkmale:**

- Unterstützt dynamische Routenparameter mit der `[param]`-Syntax.
- Vergleicht lokalisierte Pfade mit benutzerdefinierten Rewrite-Regeln, die in Ihrer Konfiguration definiert sind.
- Gibt den ursprünglichen Pfad zurück, wenn keine passende Rewrite-Regel gefunden wird.

---

## Funktionssignatur

```typescript
getCanonicalPath(
  localizedPath: string,         // Erforderlich
  locale: Locales,               // Erforderlich
  rewriteRules?: RoutingConfig['rewrite'] // Optionaler Parameter
): string
```

---

## Parameter

### Erforderliche Parameter

- `localizedPath: string`
  - **Beschreibung**: Der lokalisierte Pfad, wie er im Browser angezeigt wird (z. B. `/a-propos`).
  - **Typ**: `string`
  - **Erforderlich**: Ja

- `locale: Locales`
  - **Beschreibung**: Die für die Auflösung des Pfads verwendete Locale.
  - **Typ**: `Locales`
  - **Erforderlich**: Ja

### Optionale Parameter

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Beschreibung**: Ein Objekt, das benutzerdefinierte Rewrite-Regeln definiert. Wenn nicht angegeben, verwendet es standardmäßig die Eigenschaft `routing.rewrite` aus der Konfiguration Ihres Projekts.
  - **Typ**: `RoutingConfig['rewrite']`
  - **Standard**: `configuration.routing.rewrite`

---

## Rückgabewert

- **Typ**: `string`
- **Beschreibung**: Der interne kanonische Pfad.

---

## Beispielverwendung

### Grundlegende Verwendung (mit Konfiguration)

Wenn Sie in Ihrer `intlayer.config.ts` benutzerdefinierte Rewrites konfiguriert haben:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Konfiguration: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Ausgabe: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Ausgabe: "/about"
```

### Verwendung mit dynamischen Routen

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Konfiguration: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Ausgabe: "/product/123"
```

### Manuelle Rewrite-Regeln

Sie können der Funktion auch manuelle Rewrite-Regeln übergeben:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Output: "/contact"
```

---

## Verwandte Funktionen

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedPath.md): Löst einen kanonischen Pfad in sein lokalisiertes Äquivalent auf.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md): Erzeugt eine vollständig lokalisierte URL (einschließlich Protokoll, Host und Locale-Präfix).
