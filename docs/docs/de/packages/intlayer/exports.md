---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentation des intlayer-Pakets
description: Das Kernpaket von Intlayer, das die grundlegenden Funktionen und Typen für die Internationalisierung bereitstellt.
keywords:
  - intlayer
  - core
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Einheitliche Dokumentation für alle Exporte
---

# intlayer-Paket

Das `intlayer`-Paket ist die Kernbibliothek des Intlayer-Ökosystems. Es stellt die grundlegenden Funktionen, Typen und Hilfsfunktionen zur Verwaltung mehrsprachiger Inhalte in JavaScript- und TypeScript-Anwendungen bereit.

## Installation

```bash
npm install intlayer
```

## Exporte

### Konfiguration

Import:

```tsx
import "intlayer";
```

| Variable           | Typ                    | Beschreibung                                                                                          | Zugehöriges Dokument                                                                                                            |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Das Intlayer-Konfigurationsobjekt.                                                                    | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getConfiguration.md)         |
| `getConfiguration` | `() => IntlayerConfig` | Gibt das Intlayer-Konfigurationsobjekt zurück. (**Deprecated**: Verwende stattdessen `configuration`) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | Die Liste aller unterstützten Locales.                                                                | -                                                                                                                               |
| `requiredLocales`  | `Locales[]`            | Die Liste aller erforderlichen Locales.                                                               | -                                                                                                                               |
| `defaultLocale`    | `Locales`              | Die Standard-Locale.                                                                                  | -                                                                                                                               |

### Typen

Import:

```tsx
import "intlayer";
```

| Typ                   | Beschreibung                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `Dictionary`          | Der Dictionary-Typ, der verwendet wird, um die Struktur eines Dictionarys zu definieren. |
| `DeclarationContent`  | (**Veraltet**) Verwenden Sie stattdessen `Dictionary<T>`.                                |
| `IntlayerConfig`      | Der Typ, der die Intlayer-Konfiguration definiert.                                       |
| `ContentNode`         | Ein Knoten im Dictionary-Inhalt.                                                         |
| `Locale`              | Der Typ, der eine Locale repräsentiert.                                                  |
| `LocalesValues`       | Die möglichen Werte für eine Locale.                                                     |
| `StrictModeLocaleMap` | Eine Map von Locales mit strikter Typprüfung.                                            |

### Content-Funktionen

Import:

```tsx
import "intlayer";
```

| Funktion                 | Typ        | Beschreibung                                                                                                                  | Verwandte Dokumentation                                                                                |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | Wählt Inhalte basierend auf der aktuellen Locale aus.                                                                         | [Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | Wählt Inhalte basierend auf einer Anzahl/Quantität aus.                                                                       | [Aufzählung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/enumeration.md)  |
| `cond` / `getCondition`  | `Function` | Wählt Inhalte basierend auf einer booleschen Bedingung aus.                                                                   | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/condition.md)     |
| `gender`                 | `Function` | Wählt Inhalte basierend auf dem Geschlecht aus.                                                                               | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md)           |
| `insert`                 | `Function` | Fügt Werte in einen Inhalts-String ein.                                                                                       | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md)     |
| `nest` / `getNesting`    | `Function` | Schachtelt ein anderes Dictionary.                                                                                            | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/nesting.md)         |
| `md`                     | `Function` | Verarbeitet Markdown-Inhalte.                                                                                                 | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md)       |
| `html`                   | `Function` | Verarbeitet HTML-Inhalte.                                                                                                     | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/html.md)               |
| `file`                   | `Function` | Verarbeitet Dateiinhalt.                                                                                                      | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/file.md)               |
| `getDictionary`          | `Function` | Verarbeitet Objekte, die wie Wörterbücher aussehen (Schlüssel, Inhalt). Es verarbeitet `t()`-Übersetzungen, Aufzählungen usw. | -                                                                                                      |
| `getIntlayer`            | `Function` | Basierend auf `getDictionary`, injiziert es jedoch eine optimierte Version des Wörterbuchs aus der generierten Deklaration.   | -                                                                                                      |

### Lokalisierungs-Hilfsfunktionen

Import:

```tsx
import "intlayer";
```

| Funktion               | Typ        | Beschreibung                                                 | Zugehörige Dokumentation                                                                                                        |
| ---------------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Ermittelt die Locale aus einem String oder Pfad.             | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Gibt den Sprachteil einer Locale zurück.                     | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Gibt den Anzeigenamen einer Locale zurück.                   | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Löst einen kanonischen Pfad in einen lokalisierten Pfad auf. | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Löst einen lokalisierten Pfad in den kanonischen Pfad auf.   | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Erzeugt eine lokalisierte URL.                               | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Erzeugt URLs für alle unterstützten Locales.                 | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Entfernt das Locale-Präfix aus einem Pfad.                   | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Ermittelt das Locale-Präfix aus einem Pfad.                  | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Gibt die Schreibrichtung (LTR/RTL) zurück.                   | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Validiert ein Locale-Präfix.                                 | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/validatePrefix.md)             |

### Browser-Dienstprogramme

Importieren:

```tsx
import "intlayer";
```

| Funktion               | Typ        | Beschreibung                                 |
| ---------------------- | ---------- | -------------------------------------------- |
| `getBrowserLocale`     | `Function` | Ermittelt die vom Browser bevorzugte Locale. |
| `getCookie`            | `Function` | Liest einen Cookie-Wert aus.                 |
| `getLocaleFromStorage` | `Function` | Liest die Locale aus dem Speicher.           |
| `setLocaleInStorage`   | `Function` | Speichert die Locale im Speicher.            |

### Formatierer

Importieren:

```tsx
import "intlayer";
```

| Funktion       | Beschreibung                            |
| -------------- | --------------------------------------- |
| `number`       | Formatiert eine Zahl.                   |
| `currency`     | Formatiert einen Währungswert.          |
| `percentage`   | Formatiert einen Prozentsatz.           |
| `compact`      | Formatiert eine Zahl in kompakter Form. |
| `date`         | Formatiert ein Datum.                   |
| `relativeTime` | Formatiert relative Zeitangaben.        |
| `units`        | Formatiert einen Wert mit Einheiten.    |
| `Intl`         | Das Standard-Intl-Objekt.               |
