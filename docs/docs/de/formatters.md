---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Formatierer
description: Ortsabhängige Formatierungswerkzeuge basierend auf Intl für Zahlen, Prozentsätze, Währungen, Daten, relative Zeit, Einheiten und kompakte Notation. Enthält einen gecachten Intl-Helfer.
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
  - Internationalisierung
slugs:
  - doc
  - formatters
---

# Intlayer Formatierer

## Übersicht

Intlayer bietet eine Reihe von leichtgewichtigen Helfern, die auf den nativen `Intl`-APIs aufbauen, sowie einen gecachten `Intl`-Wrapper, um das wiederholte Erstellen schwerer Formatierer zu vermeiden. Diese Werkzeuge sind vollständig ortsabhängig und können aus dem Hauptpaket `intlayer` verwendet werden.

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
} von "intlayer";
```

Wenn Sie React verwenden, sind auch Hooks verfügbar; siehe `react-intlayer/format`.

## Gecachter Intl

Das exportierte `Intl` ist ein dünner, gecachter Wrapper um das globale `Intl`. Es merkt sich Instanzen von `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, wodurch vermieden wird, denselben Formatierer wiederholt neu zu erstellen.

Da die Erstellung von Formatierern relativ aufwendig ist, verbessert dieses Caching die Leistung, ohne das Verhalten zu ändern. Der Wrapper bietet dieselbe API wie das native `Intl`, sodass die Nutzung identisch ist.

- Das Caching erfolgt pro Prozess und ist für Aufrufer transparent.

> Wenn `Intl.DisplayNames` in der Umgebung nicht verfügbar ist, wird eine einmalige Entwickler-Warnung ausgegeben (ein Polyfill wird empfohlen).

Beispiel:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## Formatierer

Alle untenstehenden Hilfsfunktionen werden von `intlayer` exportiert.

### `number(value, options?)`

Formatiert einen numerischen Wert unter Verwendung von lokalisierter Gruppierung und Dezimalstellen.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Beispiele:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formatiert eine Zahl als Prozentzeichenkette.

Verhalten: Werte größer als 1 werden als ganze Prozentsätze interpretiert und normalisiert (z. B. `25` → `25%`, `0.25` → `25%`).

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
  - Häufige Felder: `currency` (z. B. `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Beispiele:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1.234,50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Formatiert einen Datum-/Uhrzeitwert mit `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` oder eines der Presets:
  - Presets: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Beispiele:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // z.B. "02.08.25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Formatiert relative Zeit zwischen zwei Zeitpunkten mit `Intl.RelativeTimeFormat`.

- Übergebe "now" als erstes Argument und das Ziel als zweites, um eine natürliche Formulierung zu erhalten.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (Standard ist `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - Standard-`unit` ist `"second"`.

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

Formatiert einen numerischen Wert als lokalisierten Einheitentext unter Verwendung von `Intl.NumberFormat` mit `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Häufige Felder: `unit` (z.B. `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
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

## Hinweise

- Alle Helfer akzeptieren Eingaben als `string`; diese werden intern in Zahlen oder Daten umgewandelt.
- Die Locale verwendet standardmäßig die konfigurierte `internationalization.defaultLocale`, falls keine angegeben ist.
- Diese Hilfsfunktionen sind dünne Wrapper; für erweiterte Formatierungen können die Standard-`Intl`-Optionen direkt verwendet werden.

## Einstiegspunkte und Re-Exports (`@index.ts`)

Die Formatter befinden sich im Core-Paket und werden von höherstufigen Paketen erneut exportiert, um Importe über verschiedene Laufzeitumgebungen hinweg ergonomisch zu gestalten:

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
  Intl,
} from "intlayer";
```

### React

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
```

Server-Komponenten (oder React Server Runtime):

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
} from "intlayer/server/format";
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

## Dokumentationshistorie

| Version | Datum      | Änderungen                            |
| ------- | ---------- | ------------------------------------- |
| 5.8.0   | 2025-08-18 | Formatierer-Dokumentation hinzugefügt |
