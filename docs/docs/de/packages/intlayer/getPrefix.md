---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: getPrefix Funktionsdokumentation | intlayer
description: Siehe, wie die Funktion getPrefix für das intlayer-Paket verwendet wird
keywords:
  - getPrefix
  - prefix
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Erste Dokumentation
---

# Dokumentation: `getPrefix` Funktion in `intlayer`

## Beschreibung

Die Funktion `getPrefix` bestimmt das URL-Präfix für eine gegebene Locale basierend auf der Routing-Modus-Konfiguration. Sie vergleicht die Locale mit der Standard-Locale und gibt ein Objekt zurück, das drei verschiedene Präfix-Formate für eine flexible URL-Konstruktion enthält.

**Hauptmerkmale:**

- Nimmt eine Locale als ersten Parameter (erforderlich)
- Optionales `options`-Objekt mit `defaultLocale` und `mode`
- Gibt ein Objekt mit den Eigenschaften `prefix` und `localePrefix` zurück
- Unterstützt alle Routing-Modi: `prefix-no-default`, `prefix-all`, `no-prefix` und `search-params`
- Leichtgewichtige Utility zur Bestimmung, wann Locale-Präfixe hinzugefügt werden sollen

---

## Funktionssignatur

```typescript
getPrefix(
  locale: Locales,               // Erforderlich
  options?: {                    // Optional
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // z.B. 'fr/' oder ''
  localePrefix?: Locale; // z.B. 'fr' oder undefined
}
```

---

## Parameter

- `locale: Locales`
  - **Beschreibung**: Die Locale, für die das Präfix generiert werden soll. Wenn der Wert falsch ist (undefined, null, leerer String), gibt die Funktion einen leeren String zurück.
  - **Typ**: `Locales`
  - **Erforderlich**: Ja

- `options?: object`
  - **Beschreibung**: Konfigurationsobjekt zur Bestimmung des Präfixes.
  - **Typ**: `object`
  - **Erforderlich**: Nein (Optional)

  - `options.defaultLocale?: Locales`
    - **Beschreibung**: Die Standard-Locale für die Anwendung. Wenn nicht angegeben, wird die konfigurierte Standard-Locale aus der Projektkonfiguration verwendet.
    - **Typ**: `Locales`
    - **Standard**: [`Projektkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Beschreibung**: Der URL-Routing-Modus für die Locale-Verarbeitung. Wenn nicht angegeben, wird der konfigurierte Modus aus Ihrer Projektkonfiguration verwendet.
    - **Typ**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Standard**: [`Projektkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#middleware)
    - **Modi**:
      - `prefix-no-default`: Gibt leere Strings zurück, wenn die Locale der Standard-Locale entspricht
      - `prefix-all`: Gibt für alle Locales, einschließlich der Standard-Locale, ein Präfix zurück
      - `no-prefix`: Gibt leere Strings zurück (kein Präfix in URLs)
      - `search-params`: Gibt leere Strings zurück (Locale in Abfrageparametern)

### Rückgabe

- **Typ**: `GetPrefixResult`
- **Beschreibung**: Ein Objekt, das drei verschiedene Präfix-Formate enthält:
  - `prefix`: Das Pfadpräfix mit abschließendem Schrägstrich (z.B. `'fr/'`, `''`)
  - `localePrefix`: Der Locale-Bezeichner ohne Schrägstriche (z.B. `'fr'`, `undefined`)

---

## Beispielanwendung

### Grundlegende Verwendung

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Präfix für die englische Locale prüfen
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Gibt zurück: { prefix: 'en/', localePrefix: 'en' }

// Präfix für die französische Locale prüfen
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Gibt zurück: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Gibt zurück: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Gibt zurück: { prefix: '', localePrefix: undefined }
```

### Verschiedene Routing-Modi

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Gibt immer ein Präfix zurück
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Gibt zurück: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: Kein Präfix, wenn die Locale der Standard-Locale entspricht
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Gibt zurück: { prefix: '', localePrefix: undefined }

// prefix-no-default: Gibt ein Präfix zurück, wenn die Locale von der Standard-Locale abweicht
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Gibt zurück: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Gibt niemals ein Präfix zurück
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Gibt zurück: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Gibt zurück: { prefix: '', localePrefix: undefined }
```

### Praktisches Beispiel

```typescript
import { getPrefix, Locales } from "intlayer";

// URLs mit dem passenden Präfix für eine bestimmte Locale erstellen
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Verwendung des Präfixes für die Pfadkonstruktion
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Ergebnis: "/fr/about"

// Verwendung von localePrefix zur Identifikation der Locale
console.log(`Aktuelle Locale: ${localePrefix}`);
// Ausgabe: "Aktuelle Locale: fr"
```

---

## Verwandte Funktionen

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md): Generiert eine lokalisierte URL für eine bestimmte Locale
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getMultilingualUrls.md): Generiert URLs für alle konfigurierten Locales

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // Das Pfadpräfix mit abschließendem Schrägstrich (z.B. 'fr/' oder '')
  localePrefix?: Locale; // Der Locale-Bezeichner ohne Schrägstriche (z.B. 'fr' oder undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
