---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Datums- und Zahlenformatierung nach Locale mit Intl"
description: Sie brauchen wahrscheinlich keine externe Formatierungsbibliothek. Wie Intl Daten, Zahlen, Währungen und Listen nach Locale handhabt, Caching-Aufwand und Hydration-Bugs in Produktion.
keywords:
  - datum nach locale formatieren
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - währungsformatierung locale
  - relative zeit formatieren
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Datums- und Zahlenformatierung nach Locale mit Intl

Das Übersetzen von Texten ist nur die sichtbare Hälfte der Internationalisierung. Die andere Hälfte, die regelmäßig Fehlerberichte erzeugt, ist die Formatierung: ein deutscher Nutzer, der `1,234.56` statt `1.234,56` sieht, ein japanischer Nutzer, der `08/02/2026` als August liest, oder ein Datum, das auf Server und Client unterschiedlich rendert und beim Hydrieren die Anwendung zum Absturz bringt.

Für nichts davon ist eine externe Bibliothek erforderlich. `Intl` ist in jeder modernen JavaScript-Laufzeitumgebung integriert.

## Inhaltsverzeichnis

<TOC/>

## Beginnen Sie damit, eigene Datums-Hilfsfunktionen zu löschen

Fast jede Codebasis enthält irgendwo ein selbst geschriebenes `formatDate`, das entstand, bevor jemand an Locales dachte. Es legt eine starre Reihenfolge, Trennzeichen und meist englische Monatsnamen fest.

```ts
// Zu löschen:
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` ersetzt dies vollständig und ist für jede Locale korrekt:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

Dasselbe gilt für Zahlenwerte. `toFixed(2)` erzeugt überall `1234.56`, was im Großteil Europas schlichtweg falsch ist.

## Was `Intl` abdeckt

| API                       | Verwendungszweck                                          |
| :------------------------ | :-------------------------------------------------------- |
| `Intl.DateTimeFormat`     | Datums- und Zeitangaben mit `dateStyle` / `timeStyle`     |
| `Intl.NumberFormat`       | Dezimalzahlen, Währungen, Prozent, Einheiten, Kompaktform |
| `Intl.RelativeTimeFormat` | "vor 3 Tagen", "in 2 Stunden"                             |
| `Intl.ListFormat`         | "a, b und c" im Vergleich zu "a, b, and c"                |
| `Intl.PluralRules`        | Pluralisierungskategorien für Zahlenwerte                 |
| `Intl.Collator`           | Sprachlich korrekte Sortierung von Zeichenketten          |

`Intl.Collator` wird gern übersehen. Ein einfaches `array.sort()` auf Strings nutzt die Unicode-Codepoint-Reihenfolge, wodurch Umlaute hinter das `z` rutschen und das schwedische `ö` an falscher Stelle landet. Wer für Nutzer sichtbare Listen sortiert, sollte stets einen Collator einsetzen.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("de").compare);
// ["apple", "édouard", "zebra"]
```

## Voreinstellungen bevorzugen statt manueller Optionen

`dateStyle` und `timeStyle` überlassen der jeweiligen Locale die logische Reihenfolge und Trennzeichen. Wer `year`, `month` und `day` manuell kombiniert, greift in Bereiche ein, die man besser meidet, da die korrekte Anordnung je nach Land variiert und man CLDR-Daten mit eigenen Annahmen überschreibt.

```ts
// Die Locale bestimmt die Struktur:
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// Selbst bestimmt, und in anderen Regionen fehlerhaft:
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

Spezifizieren Sie Einzelteile nur dann explizit, wenn das Design zwingend eine feste Breite vorschreibt, beispielsweise in einer engen Tabellenspalte.

## Das Erstellen von Formatierern ist rechenintensiv

Dies ist das Performance-Detail, auf das es ankommt. Die Initialisierung eines `Intl.NumberFormat` lädt umfangreiche Locale-Daten und ist deutlich teurer als der eigentliche Aufruf von `.format()`. Dies in einer Schleife über tausend Tabellenzeilen auszuführen, bremst spürbar.

```ts
// Erstellt den Formatierer für jede Zeile neu:
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Einmal erstellen und wiederverwenden:
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` und `toLocaleString()` verbergen intern denselben Mechanismus: Jeder Aufruf instanziiert einen neuen Formatierer. Für Einzelwerte völlig in Ordnung, für Listen fehl am Platz.

Cachen Sie Formatierer basierend auf Locale und Optionen:

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## Der Zeitzonen-Fehler, der nur in Produktion auftritt

Dieses Problem hat schon unzählige Stunden gekostet. Der Server rendert ein Datum bei der serverseitigen Generierung, der Browser hydriert es im Client, und React bricht mit einem Hydration Mismatch ab, weil beide Umgebungen unterschiedlichen Text erzeugt haben.

Die Ursache: `Intl.DateTimeFormat` verwendet die lokale Zeitzone des Systems, wenn keine angegeben wird. Ihr Produktionsserver läuft unter UTC, Ihr lokaler Entwicklungsrechner nicht. Der Fehler ist lokal unsichtbar und tritt erst in Produktion auf.

```ts
// Server in UTC und Browser in UTC+9 liefern unterschiedliche Texte. Hydration Mismatch.
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Beide Umgebungen stimmen überein:
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Drei gangbare Lösungswege:

- **Zeitzone auf dem Server fixieren** und explizit übergeben. Deterministisch, aber alle Nutzer sehen UTC.
- **Nur auf dem Client rendern**, mit einem Platzhalter während des Server-Passes. Individuell korrekt, erzeugt jedoch ein leichtes Nachladen.
- **Zeitzone des Nutzers speichern** und an beiden Stellen übergeben. Das beste Ergebnis bei moderatem Mehraufwand.

Unabhängig von der Wahl: Übergeben Sie `timeZone` bei isomorphen Datumsangaben immer explizit. Ein Datum ohne definierte Zeitzone führt unweigerlich zu zwei abweichenden Werten.

## Währungen benötigen eine Währung, keine Locale

Locale und Währung sind unabhängig voneinander. `fr-FR` bedeutet nicht automatisch Euro: Ein französischer Kunde kann durchaus eine Rechnung in US-Dollar betrachten.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

Die Locale steuert Trennzeichen, Zifferngruppierung und die Platzierung des Währungssymbols. Die Währung selbst stammt aus Ihren Geschäftsdaten. Die Ableitung des einen aus dem anderen führt unweigerlich zu Fehlern in der Buchhaltung.

Beachten Sie auch `currencyDisplay`. In Systemen mit mehreren Währungen, die das Dollarzeichen teilen, beseitigt `"code"` jegliche Mehrdeutigkeit zwischen US-, kanadischen und australischen Dollar.

## Relative Zeitangaben sind oft lesbarer als absolute Daten

Für kürzlich zurückliegende Ereignisse ist "vor 2 Stunden" weit eingängiger als ein Zeitstempel, und `Intl.RelativeTimeFormat` lokalisiert dies automatisch.

```ts
new Intl.RelativeTimeFormat("de", { numeric: "auto" }).format(-1, "day");
// "gestern"
```

`numeric: "auto"` liefert "gestern" statt "vor 1 Tag". Ohne diese Option erhält man die unnatürlich wirkende rein numerische Schreibweise.

## Was Intlayer ergänzt

Intlayer bündelt diese APIs in gecachten Hilfsfunktionen, sodass Sie keine eigene Cache-Map verwalten müssen, und wendet die aktive Locale standardmäßig an, ohne dass sie an jeder Aufrufstelle übergeben werden muss.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1.234,5"
currency(1234.5, { currency: "EUR" }); // "1.234,50 €"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "vor 2 Stunden"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 Kilometer"
compact(1200); // "1,2 Tsd."
list(["Apfel", "Banane", "Orange"]); // "Apfel, Banane und Orange"
```

Die Funktion `date()` unterstützt zudem Presets (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`), womit typische Anwendungsfälle ohne Options-Objekt auskommen. Für React und Vue stehen Hooks und Composables bereit, die die aktive Sprache direkt aus dem Kontext ermitteln.

Dabei handelt es sich um eine komfortable Caching- und Locale-Schicht über der nativen Plattform-API. Das eigentliche Formatierungsverhalten basiert vollständig auf `Intl`. Sämtliche Signaturen finden sich in der [Formatierungsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md).

## Häufige Fehler

- **`toLocaleDateString()` ohne Locale-Angabe.** Verwendet die Standard-Locale des Systems, die auf einem Server vom Container abhängt.
- **Formatieren in einer Schleife ohne Caching.** Die Instanziierung des Formatierers dominiert die Laufzeit.
- **Fehlende `timeZone`-Angabe bei isomorphen Datumsangaben.** Führt zu Hydration-Fehlern, die lokal nicht auftreten.
- **Währung aus der Locale ableiten.** `fr-FR` garantiert keine Euro-Werte.
- **Einfaches `sort()` auf sichtbaren Texten.** Nutzen Sie stets `Intl.Collator`.
- **Monats- oder Wochentagsnamen fest codieren.** Sie sind bereits in jeder Sprache im CLDR hinterlegt.
- **`numeric: "always"` bei relativen Zeiten beibehalten.** Erzeugt "vor 1 Tag", obwohl jede Sprache ein Wort wie gestern kennt.

## Weiterführende Ressourcen

- [Formatierer und Locale-Hilfsfunktionen: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md)
- [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [Framework-Benchmarkberichte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md)
- [react-intl-Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-intl.md)
- [ICU Message Format: Plurale, Select und Zahlenskelette](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/icu_message_format.md)
- [Übersetzungen testen: Inklusive Formatierer und Pluralregeln](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_testing_strategies.md)
- [Was Internationalisierung wirklich umfasst](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/what_is_internationalization.md)
