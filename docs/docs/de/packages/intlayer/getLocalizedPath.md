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
    changes: "Implement custom URL rewrites"
author: aymericzip
---

# Dokumentation: `getLocalizedPath`-Funktion in `intlayer`

## Beschreibung

Die Funktion `getLocalizedPath` wandelt einen kanonischen Pfad (interner Anwendungs-Pfad) in sein lokalisiertes Äquivalent um, basierend auf der angegebenen Locale und den Rewrite-Regeln. Sie ist besonders nützlich, um SEO-freundliche URLs zu erzeugen, die je nach Sprache variieren.

Es ist das relative Gegenstück zu [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md) — für eine relative Eingabe geben beide den gleichen Wert zurück. Im Gegensatz zu `getLocalizedUrl` gibt es niemals eine absolute URL zurück: die `domains`-Konfiguration wird ignoriert, daher ergibt eine Locale, die von ihrer eigenen Domain bedient wird, immer noch einen Pfad. Eine absolute Eingabe wird akzeptiert, aber ihr Ursprung wird verworfen — nur ihr Pfad, Query String und Hash werden beibehalten.

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

### Optionale Parameter

- `locale?: Locales`
  - **Description**: The target locale for which the path should be localized.
  - **Type**: `Locales`
  - **Default**: The default locale of your project's configuration.

- `options?: object`
  - **Description**: Routing-Überschreibungen. Jeder Eintrag verwendet standardmäßig die Konfiguration Ihres Projekts.
  - **Type**: `object`

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Beschreibung**: Ein Objekt, das benutzerdefinierte Rewrite-Regeln definiert. Wenn nicht angegeben, wird standardmäßig die Eigenschaft `routing.rewrite` aus der Konfiguration Ihres Projekts verwendet.
  - **Typ**: `RoutingConfig['rewrite']`
  - **Standard**: `configuration.routing.rewrite`

---

## Rückgabewert

- **Typ**: `string`
- **Beschreibung**: Der lokalisierte Pfad für die angegebene Locale.

Der Typ wird durch die in Ihrer Konfiguration deklarierten Rewrite-Regeln eingegrenzt, sodass der Editor den aufgelösten Pfad statt eines einfachen `string` anzeigt:

```typescript codeFormat="typescript"
// Konfiguration: Modus 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (keine Umschreiberregel passt, nur das Präfix wird angewendet)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

Die gleiche Eingrenzung fließt in [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md), die die Rewrite-Regeln anwendet, bevor das Locale-Präfix hinzugefügt wird.

Zwei Fälle bleiben zu `string` verbreitert, da sie zur Compile-Zeit nicht aufgelöst werden können:

- ein Pfad, der kein String-Literal ist (z. B. einer, der aus einer Variablen erstellt wird);
- ein Pfad, der einer Regel mit einem Multi-Segment- oder optionalen Parameter entspricht (`[...slug]`, `[[...slug]]`, `:param?`).

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

### Weglassen des Locales

Wenn kein Locale angegeben ist, wird der Pfad für das konfigurierte Standard-Locale lokalisiert:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Konfiguration: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Ausgabe: "/about"
```

---

## Verwandte Funktionen

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getCanonicalPath.md): Löst einen lokalisierten Pfad zurück auf seinen internen kanonischen Pfad.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md): Erzeugt eine vollständig lokalisierte URL (inkl. Protokoll, Host und Locale-Präfix).
