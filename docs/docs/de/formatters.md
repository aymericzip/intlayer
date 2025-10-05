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
---

# Intlayer Formatierer

## Überblick

Intlayer stellt eine Reihe von leichtgewichtigen Helfern bereit, die auf den nativen `Intl`-APIs aufbauen, sowie einen zwischengespeicherten `Intl`-Wrapper, um die wiederholte Erstellung schwerer Formatierer zu vermeiden. Diese Werkzeuge sind vollständig ortsabhängig und können aus dem Hauptpaket `intlayer` verwendet werden.

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
  getLocalizedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

Wenn Sie React verwenden, sind auch Hooks verfügbar; siehe `react-intlayer/format`.

## Zwischengespeichertes Intl

Das exportierte `Intl` ist ein schlanker, zwischengespeicherter Wrapper um das globale `Intl`. Es merkt sich Instanzen von `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator` und `PluralRules`, wodurch vermieden wird, denselben Formatierer wiederholt neu zu erstellen.

Da die Erstellung von Formatierern relativ aufwendig ist, verbessert dieses Caching die Leistung, ohne das Verhalten zu ändern. Der Wrapper bietet die gleiche API wie das native `Intl`, sodass die Verwendung identisch ist.

- Das Caching erfolgt pro Prozess und ist für die Aufrufer transparent.

> Wenn `Intl.DisplayNames` in der Umgebung nicht verfügbar ist, wird eine einzelne Entwickler-Warnung ausgegeben (ein Polyfill wird empfohlen).

Beispiele:

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

// Sortierung mit Collator
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (gleich)

// Pluralregeln
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## Zusätzliche Intl-Dienstprogramme

Neben den Formatierer-Helfern können Sie den zwischengespeicherten Intl-Wrapper auch direkt für andere Intl-Funktionen verwenden:

### `Intl.DisplayNames`

Für lokalisierte Namen von Sprachen, Regionen, Währungen und Schriftsystemen:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "Französisch"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
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

### `getLocalizedContent(node, locale, nodeProps, fallback?)`

Transformiert einen Inhaltsknoten nur mit dem Übersetzungs-Plugin:

```ts
import { getLocalizedContent } from "intlayer";

const content = getLocalizedContent(
  contentNode,
  "fr",
  { dictionaryKey: "common" },
  true // Fallback auf Standardsprache, falls Übersetzung fehlt
);
```

- **node**: Der zu transformierende Inhaltsknoten
- **locale**: Die für die Übersetzung zu verwendende Sprache
- **nodeProps**: Eigenschaften für den Transformationskontext
- **fallback**: Ob auf die Standardsprache zurückgegriffen werden soll (Standard ist false)

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

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Ruft Inhalte aus einem Wörterbuch anhand eines Schlüssels ab und transformiert sie:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: Der Schlüssel des abzurufenden Wörterbuchs
- **locale**: Optionale Locale (Standard ist die konfigurierte Standard-Locale)
- **plugins**: Optionale Liste von benutzerdefinierten Transformations-Plugins

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

Ruft asynchron Inhalte aus einem entfernten Wörterbuch ab:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: Der Schlüssel des abzurufenden Wörterbuchs
- **locale**: Optionale Locale (Standard ist die konfigurierte Standard-Locale)
- **plugins**: Optionale Liste von benutzerdefinierten Transformations-Plugins

## Formatierer

Alle nachfolgenden Hilfsfunktionen werden aus `intlayer` exportiert.

### `number(value, options?)`

Formatiert einen numerischen Wert unter Verwendung von lokalisierungsspezifischer Gruppierung und Dezimalstellen.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Beispiele:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formatiert eine Zahl als Prozentwert-String.

Verhalten: Werte größer als 1 werden als ganze Prozentsätze interpretiert und normalisiert (z.B. `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Beispiele:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23,7%"
```

### `currency(value, options?)`

Formatiert einen Wert als lokalisierte Währung. Standardmäßig `USD` mit zwei Nachkommastellen.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Häufige Felder: `currency` (z.B. `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Beispiele:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1.234,50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Formatiert einen Datum-/Uhrzeitwert mit `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` oder eines der Presets:
  - Presets: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Beispiele:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // z.B. "08.02.25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Formatiert relative Zeit zwischen zwei Zeitpunkten mit `Intl.RelativeTimeFormat`.

- Übergebe "now" als erstes Argument und das Ziel als zweites, um eine natürliche Formulierung zu erhalten.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (Standard ist `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - Standardmäßig ist `unit` `"second"`.

Beispiele:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 Tagen"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "vor 2 Stunden"
```

### `units(value, options?)`

Formatiert einen numerischen Wert als lokalisierten Einheiten-String mit `Intl.NumberFormat` und `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Gemeinsame Felder: `unit` (z.B. `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Standardwerte: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Beispiele:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (abhängig von der Locale)
```

### `compact(value, options?)`

Formatiert eine Zahl mit kompakter Notation (z.B. `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (verwendet intern `notation: 'compact'`)

Beispiele:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

Formatiert ein Array von Werten zu einem lokalisierten Listenstring unter Verwendung von `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Gemeinsame Felder: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Standardwerte: `type: 'conjunction'`, `style: 'long'`

Beispiele:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Hinweise

- Alle Hilfsfunktionen akzeptieren Eingaben vom Typ `string`; diese werden intern in Zahlen oder Daten umgewandelt.
- Die Locale wird standardmäßig auf Ihre konfigurierte `internationalization.defaultLocale` gesetzt, falls keine Locale angegeben wird.
- Diese Hilfsfunktionen sind dünne Wrapper; für erweiterte Formatierungen können die Standard-`Intl`-Optionen direkt verwendet werden.

## Einstiegspunkte und Re-Exports (`@index.ts`)

Die Formatierer befinden sich im Core-Paket und werden aus höherstufigen Paketen erneut exportiert, um Importe über verschiedene Laufzeitumgebungen hinweg ergonomisch zu gestalten:

Beispiele:

```ts
// App-Code (empfohlen)
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getLocalizedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

### React

Client-Komponenten:

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
// oder in Next.js-Anwendungen
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/client/format";

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
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

Server-Komponenten (oder React Server-Laufzeit):

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/server/format";
// oder in Next.js-Anwendungen
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/server/format";
```

> Diese Hooks berücksichtigen die Locale vom `IntlayerProvider` oder `IntlayerServerProvider`

### Vue

Client-Komponenten:

```ts
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
```

> Diese Composables berücksichtigen die Locale vom injizierten `IntlayerProvider`

## Dokumentationshistorie

| Version | Datum      | Änderungen                              |
| ------- | ---------- | --------------------------------------- |
| 5.8.0   | 2025-08-20 | Vue-Formatter hinzugefügt               |
| 5.8.0   | 2025-08-18 | Dokumentation der Formatter hinzugefügt |

Client-Komponenten:

```ts
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
```

> Diese Composables berücksichtigen die Locale vom injizierten `IntlayerProvider`

## Dokumentationshistorie

| Version | Datum      | Änderungen                                                                                            |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| 5.8.0   | 2025-08-20 | Hinzufügen von Vue-Formatierern                                                                       |
| 5.8.0   | 2025-08-18 | Hinzufügen der Dokumentation zu Formatierern                                                          |
| 5.8.0   | 2025-08-20 | Hinzufügen der Dokumentation zum Listen-Formatter                                                     |
| 5.8.0   | 2025-08-20 | Hinzufügen zusätzlicher Intl-Dienstprogramme (DisplayNames, Collator, PluralRules)                    |
| 5.8.0   | 2025-08-20 | Hinzufügen von Locale-Dienstprogrammen (getLocaleName, getLocaleLang, getLocaleFromPath, etc.)        |
| 5.8.0   | 2025-08-20 | Hinzufügen von Dienstprogrammen zur Inhaltsverwaltung (getContent, getTranslation, getIntlayer, etc.) |
