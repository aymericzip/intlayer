---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Formatierer
description: Ortsabhängige Formatierungswerkzeuge basierend auf Intl für Zahlen, Prozentsätze, Währungen, Daten, relative Zeit, Einheiten und kompakte Notation. Enthält einen zwischengespeicherten Intl-Helfer.
keywords:
  - Formatierer
  - Intl
  - Zahl
  - Währung
  - Prozentsatz
  - Datum
  - Relative Zeit
  - Einheiten
  - Kompakt
  - Liste
  - Internationalisierung
slugs:
  - doc
  - formatters
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: "Vue-Formatter hinzugefügt"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Dokumentation der Formatter hinzugefügt"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Hinzufügen von Vue-Formatierern"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Hinzufügen der Dokumentation zu Formatierern"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Hinzufügen der Dokumentation zum Listen-Formatter"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Hinzufügen zusätzlicher Intl-Dienstprogramme (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Hinzufügen von Locale-Dienstprogrammen (getLocaleName, getLocaleLang, getLocaleFromPath, etc.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Hinzufügen von Dienstprogrammen zur Inhaltsverwaltung (getContent, getTranslation, getIntlayer, etc.)"
author: aymericzip
---

# Intlayer Formatierer

## Table of Contents

<TOC/>

## Überblick

Intlayer stellt eine Reihe von leichtgewichtigen Helfern bereit, die auf den nativen `Intl`-APIs aufbauen, sowie einen zwischengespeicherten `Intl`-Wrapper, um die wiederholte Erstellung schwerer Formatierer zu vermeiden. Diese Werkzeuge sind vollständig ortsabhängig und können aus dem Hauptpaket `intlayer` verwendet werden.

## React Formatters

### Import

```ts
import {
  Intl,
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

Wenn Sie React verwenden, sind auch Hooks verfügbar; siehe `react-intlayer/format`.

### Verfügbare Hooks

Alle Hooks verwenden automatisch das Locale aus `IntlayerProvider` oder `IntlayerServerProvider`.

| Hook                | Description                              | Example Output                   |
| ------------------- | ---------------------------------------- | -------------------------------- |
| `useNumber()`       | Zahlen mit Gruppierung formatieren       | `"123,456.789"`                  |
| `useCurrency()`     | Währungswerte formatieren                | `"€1,234.50"`                    |
| `usePercentage()`   | Prozentsätze formatieren                 | `"25%"`                          |
| `useDate()`         | Daten und Zeiten formatieren             | `"Aug 2, 2025"`                  |
| `useRelativeTime()` | Relative Zeit formatieren                | `"in 3 days"`                    |
| `useUnit()`         | Werte mit Einheiten formatieren          | `"5 kilometers"`                 |
| `useCompact()`      | Zahlen in kompakter Notation formatieren | `"1.2K"`                         |
| `useList()`         | Arrays als Listen formatieren            | `"apple, banana, and orange"`    |
| `useIntl()`         | Locale-gebundenes `Intl` Objekt abrufen  | Vollständiger `Intl` API Zugriff |

### Vollständiges Beispiel

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date(Date.now() + 86400000))}</p>
      <p>{unit(5, { unit: "kilometer" })}</p>
    </div>
  );
};
```

### `useIntl` Hook

Der `useIntl` Hook bietet direkten Zugriff auf ein locale-gebundenes `Intl` Objekt. Dies ist nützlich, wenn Sie die vollständige `Intl` API benötigen (z. B. `DisplayNames`, `Collator`, `PluralRules`) mit automatischer Locale-Injektion.

```tsx
import { useIntl } from "react-intlayer/format";

const MyComponent = () => {
  const intl = useIntl(); // nutzt die Kontext-Locale

  // Standard Intl API, aber Locale wird automatisch injiziert, wenn undefined
  const formatted = new intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(123.45);

  // Sie können die Locale bei Bedarf trotzdem überschreiben
  const date = new intl.DateTimeFormat("fr-FR").format(new Date());

  // Zugriff auf weitere Intl Features
  const displayNames = new intl.DisplayNames(undefined, { type: "language" });
  const languageName = displayNames.of("fr"); // "French" (oder lokalisiert)

  return (
    <div>
      <p>{formatted}</p>
      <p>{date}</p>
      <p>{languageName}</p>
    </div>
  );
};
```

## Vue Formatters

### `Intl.DisplayNames`

Für lokalisierte Namen von Sprachen, Regionen, Währungen und Schriftsystemen:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "Französisch"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### Verfügbare Composables

Alle Composables geben berechnete Refs zurück, die automatisch das Gebietsschema vom eingefügten `IntlayerProvider` verwenden.

| Composable          | Beschreibung                                | Beispielausgabe                  |
| ------------------- | ------------------------------------------- | -------------------------------- |
| `useNumber()`       | Formatiere Zahlen mit Gruppierung           | `"123,456.789"`                  |
| `useCurrency()`     | Formatiere Währungswerte                    | `"€1,234.50"`                    |
| `usePercentage()`   | Formatiere Prozentsätze                     | `"25%"`                          |
| `useDate()`         | Formatiere Daten und Zeiten                 | `"Aug 2, 2025"`                  |
| `useRelativeTime()` | Formatiere relative Zeit                    | `"in 3 days"`                    |
| `useUnit()`         | Formatiere Werte mit Einheiten              | `"5 kilometers"`                 |
| `useCompact()`      | Formatiere Zahlen in kompakter Notation     | `"1.2K"`                         |
| `useList()`         | Formatiere Arrays als Listen                | `"apple, banana, and orange"`    |
| `useIntl()`         | Rufe gebietsschemagebendes `Intl` Objekt ab | Vollständiger `Intl` API-Zugriff |

### Vollständiges Beispiel

```vue
<script setup>
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";

const number = useNumber();
const currency = useCurrency();
const date = useDate();
const percentage = usePercentage();
const compact = useCompact();
const list = useList();
const relativeTime = useRelativeTime();
const unit = useUnit();
</script>

<template>
  <div>
    <p>{{ number.value(123456.789) }}</p>
    <p>{{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>{{ date.value(new Date(), "short") }}</p>
    <p>{{ percentage.value(0.25) }}</p>
    <p>{{ compact.value(1200) }}</p>
    <p>{{ list.value(["apple", "banana", "orange"]) }}</p>
    <p>{{ relativeTime.value(new Date(), new Date(Date.now() + 86400000)) }}</p>
    <p>{{ unit.value(5, { unit: "kilometer" }) }}</p>
  </div>
</template>
```

### `Intl.Collator`

Für lokalisierte Zeichenfolgenvergleiche und Sortierungen:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

## Vanilla JS / Node.js Formatters

For non-framework contexts, import formatters directly from `intlayer`. Note that you must pass the locale manually.

### `Intl.PluralRules`

Zur Bestimmung von Pluralformen in verschiedenen Sprachräumen:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

### Formatter-Funktionen

#### `number(value, options?)`

Formatiert einen numerischen Wert mit lokalisierter Gruppierung und Dezimalstellen.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Formatiert eine Zahl als Prozentsatz-String. Werte größer als 1 werden normalisiert (z. B. `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Formatiert einen Wert als lokalisierte Währung. Standardmäßig `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Formatiert einen Datums-/Zeitwert.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` oder Voreinstellung: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // z. B. "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Formatiert relative Zeit zwischen zwei Zeitpunkten.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (Standardwert: `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

#### `units(value, options?)`

Formatiert einen numerischen Wert mit einer Einheit.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (z. B. `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Formatiert eine Nummer mit kompakter Notation.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Formatiert ein Array in eine lokalisierte Listzeichenkette.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Häufig: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Cached Intl

Das von `intlayer` exportierte `Intl` ist ein gecachter Wrapper um das globale `Intl`. Es speichert Formatter-Instanzen (`NumberFormat`, `DateTimeFormat`, usw.) im Cache, um zu vermeiden, dass diese wiederholt erstellt werden, was die Performance verbessert.

```ts
import { Intl } from "intlayer";

// Zahlenformatierung
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Anzeigenamen für Sprachen, Regionen usw.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Sortierung (Collation)
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (equal)

// Pluralregeln
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Zusätzliche Intl-Funktionen

#### `Intl.DisplayNames`

Für lokalisierte Namen von Sprachen, Regionen, Währungen und Schriften:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

Für gebietsschemaabhängigen Stringvergleich und Sortierung:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

#### `Intl.PluralRules`

Zur Bestimmung von Pluralformen in verschiedenen Locales:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Locale-Dienstprogramme

### `getLocaleName(displayLocale, targetLocale?)`

Ermittelt den lokalisierten Namen eines Sprachraums in einem anderen Sprachraum:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: Die Sprachregion, für die der Name ermittelt werden soll
- **targetLocale**: Die Sprachregion, in der der Name angezeigt wird (Standard ist displayLocale)

### `getLocaleLang(locale?)`

Extrahiert den Sprachcode aus einem Locale-String:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: Die Sprachregion, aus der die Sprache extrahiert werden soll (Standard ist die aktuelle Sprachregion)

### `getLocaleFromPath(inputUrl)`

Extrahiert das Locale-Segment aus einer URL oder einem Pfadnamen:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (Standard-Sprachregion)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: Der vollständige URL-String oder Pfadname, der verarbeitet werden soll
- **returns**: Die erkannte Sprachregion oder die Standard-Sprachregion, falls keine gefunden wird

### `getPathWithoutLocale(inputUrl, locales?)`

Entfernt das Sprachregion-Segment aus einer URL oder einem Pfadnamen:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: Der vollständige URL-String oder Pfadname, der verarbeitet werden soll
- **locales**: Optionale Liste der unterstützten Sprachregionen (Standard sind die konfigurierten Sprachregionen)
- **returns**: Die URL ohne den Sprachregionsabschnitt

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Erzeugt eine lokalisierte URL für die aktuelle Sprachregion:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: Die ursprüngliche URL, die lokalisiert werden soll
- **currentLocale**: Die aktuelle Sprachregion
- **locales**: Optionale Liste der unterstützten Sprachregionen (Standard sind die konfigurierten Sprachregionen)
- **defaultLocale**: Optionale Standardsprache (Standard ist die konfigurierte Standardsprache)
- **prefixDefault**: Ob die Standardsprache als Präfix verwendet wird (Standard ist der konfigurierte Wert)

### `getHTMLTextDir(locale?)`

Gibt die Schreibrichtung für eine Sprache zurück:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: Die Sprache, für die die Schreibrichtung ermittelt wird (Standard ist die aktuelle Sprache)
- **returns**: `"ltr"`, `"rtl"` oder `"auto"`

## Dienstprogramme zur Inhaltsverarbeitung

### `getContent(node, nodeProps, locale?)`

Transformiert einen Inhaltsknoten mit allen verfügbaren Plugins (Übersetzung, Aufzählung, Einfügung usw.):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: Der zu transformierende Inhaltsknoten
- **nodeProps**: Eigenschaften für den Transformationskontext
- **locale**: Optionale Sprache (Standard ist die konfigurierte Standardsprache)

### `getTranslation(languageContent, locale?, fallback?)`

Extrahiert Inhalte für eine bestimmte Sprache aus einem Sprachinhaltsobjekt:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    de: "Hallo",
  },
  "fr",
  true
); // "Bonjour"
```

- **languageContent**: Objekt, das Sprachen mit Inhalten abbildet
- **locale**: Ziel-Sprache (Standard ist die konfigurierte Standardsprache)
- **fallback**: Ob auf die Standardsprache zurückgegriffen werden soll (Standard ist true)

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

Ruft asynchron Inhalte aus einem entfernten Wörterbuch ab:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: Der Schlüssel des abzurufenden Wörterbuchs
- **locale**: Optionale Locale (Standard ist die konfigurierte Standard-Locale)
- **plugins**: Optionale Liste von benutzerdefinierten Transformations-Plugins

## Hinweise

- Alle Hilfsfunktionen akzeptieren Eingaben vom Typ `string`; diese werden intern in Zahlen oder Daten umgewandelt.
- Die Locale wird standardmäßig auf Ihre konfigurierte `internationalization.defaultLocale` gesetzt, falls keine Locale angegeben wird.
- Diese Hilfsfunktionen sind dünne Wrapper; für erweiterte Formatierungen können die Standard-`Intl`-Optionen direkt verwendet werden.
