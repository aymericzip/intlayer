---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getLocalizedPath Funktionsdokumentation | intlayer
description: Anleitung zur Verwendung der Funktion getLocalizedPath im intlayer-Paket
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implement custom URL rewrites
---

# Dokumentation: `getLocalizedPath`-Funktion in `intlayer`

## Beschreibung

Die Funktion `getLocalizedPath` wandelt einen kanonischen Pfad (interner Anwendungs-Pfad) in sein lokalisiertes Äquivalent um, basierend auf der angegebenen Locale und den Rewrite-Regeln. Sie ist besonders nützlich, um SEO-freundliche URLs zu erzeugen, die je nach Sprache variieren.

**Wesentliche Merkmale:**

- Unterstützt dynamische Routenparameter mithilfe der `[param]`-Syntax.
- Löst Pfade entsprechend benutzerdefinierten Rewrite-Regeln, die in deiner Konfiguration definiert sind.
- Handhabt automatisch einen Fallback auf den kanonischen Pfad, falls keine Rewrite-Regel für die angegebene Locale gefunden wird.

---

## Funktionssignatur

```typescript
getLocalizedPath(
  canonicalPath: string,         // Erforderlich
  locale: Locales,               // Erforderlich
  rewriteRules?: RoutingConfig['rewrite'] // Optional
): string
```

---

## Parameter

### Erforderliche Parameter

- `canonicalPath: string`
  - **Beschreibung**: Der interne Anwendungs-Pfad (z. B. `/about`, `/product/[id]`).
  - **Typ**: `string`
  - **Erforderlich**: Ja

- `locale: Locales`
  - **Beschreibung**: Die Ziel-Locale, für die der Pfad lokalisiert werden soll.
  - **Typ**: `Locales`
  - **Erforderlich**: Ja

### Optionale Parameter

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Beschreibung**: Ein Objekt, das benutzerdefinierte Rewrite-Regeln definiert. Wenn nicht angegeben, wird standardmäßig die Eigenschaft `routing.rewrite` aus der Konfiguration Ihres Projekts verwendet.
  - **Typ**: `RoutingConfig['rewrite']`
  - **Standard**: `configuration.routing.rewrite`

---

## Rückgabewert

- **Typ**: `string`
- **Beschreibung**: Der lokalisierte Pfad für die angegebene Locale.

---

## Beispielverwendung

### Grundlegende Verwendung (mit Konfiguration)

Wenn Sie benutzerdefinierte Rewrite-Regeln in Ihrer `intlayer.config.ts` konfiguriert haben:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Output: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Output: "/about"
```

### Verwendung mit dynamischen Routen

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuration: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Output: "/produit/123"
```

### Manuelle Rewrite-Regeln

Sie können der Funktion auch manuelle Rewrite-Regeln übergeben:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Ausgabe: "/contactez-nous"
```

---

## Verwandte Funktionen

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getCanonicalPath.md): Löst einen lokalisierten Pfad zurück auf seinen internen kanonischen Pfad.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md): Erzeugt eine vollständig lokalisierte URL (inkl. Protokoll, Host und Locale-Präfix).
