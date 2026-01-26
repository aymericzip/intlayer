---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer Paketdokumentation
description: Next.js-spezifische Integration für Intlayer, die Middleware und Provider für App Router und Page Router bereitstellt.
keywords:
  - next-intlayer
  - nextjs
  - react
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# next-intlayer-Paket

Das `next-intlayer`-Paket stellt die notwendigen Werkzeuge bereit, um Intlayer in Next.js-Anwendungen zu integrieren. Es unterstützt sowohl den App Router als auch den Page Router und bietet Middleware für locale-basiertes Routing.

## Installation

```bash
npm install next-intlayer
```

## Exporte

### Middleware

Import:

```tsx
import "next-intlayer/middleware";
```

| Funktion             | Beschreibung                                                                                                                                                                   | Zugehörige Dokumentation                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js-Middleware, die lokalisierungsbasiertes Routing und Weiterleitungen handhabt. Erkennt die Locale aus Headern/Cookies und leitet zum entsprechenden Locale-Pfad weiter. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/intlayerMiddleware.md) |

### Konfigurations-Helfer

Importieren:

```tsx
import "next-intlayer/server";
```

| Funktion           | Beschreibung                                                                                                                                                                                                   | Verwandte Doku |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `withIntlayer`     | Asynchroner Helfer zum Umschließen der Next.js-Konfiguration, der sicherstellt, dass Intlayer-Dictionaries vor dem Build vorbereitet werden. Bereitet Content-Dateien vor und richtet webpack/SWC-Plugins ein. | -              |
| `withIntlayerSync` | Synchroner Helfer zum Umschließen der Next.js-Konfiguration, ideal für Konfigurationen, in denen async nicht möglich oder gewünscht ist. Bereitet Dictionaries beim Serverstart nicht vor.                     | -              |

### Provider

Import:

```tsx
import "next-intlayer";
```

oder

```tsx
import "next-intlayer/server";
```

| Komponente               | Beschreibung                                                                                                             | Zugehöriges Doc |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `IntlayerClientProvider` | Provider für clientseitige Komponenten im Next.js App Router. Kapselt `IntlayerProvider` von react-intlayer.             | -               |
| `IntlayerServerProvider` | Provider für serverseitige Komponenten in Next.js (App Router). Stellt auf dem Server den Locale-Kontext bereit.         | -               |
| `IntlayerServer`         | Serverseitiger Wrapper für Intlayer-Inhalte im App Router. Gewährleistet korrektes Locale-Handling in Server Components. | -               |

### Hooks (Client-seitig)

Import:

```tsx
import "next-intlayer";
```

Re-exportiert die meisten Hooks aus `react-intlayer`.

| Hook                   | Beschreibung                                                                                                                                                            | Verwandtes Dokument                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Clientseitiger Hook, der ein Wörterbuch anhand seines Schlüssels auswählt und dessen Inhalt zurückgibt. Verwendet die Locale aus dem Context, wenn keine angegeben ist. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook, der ein Wörterbuch-Objekt transformiert und den Inhalt für die aktuelle Locale zurückgibt. Verarbeitet `t()`-Übersetzungen, Enumerationen usw.                    | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook, der asynchrone Dictionaries verarbeitet. Akzeptiert eine auf Promises basierende Dictionary-Map und löst sie für die aktuelle locale auf.                         | -                                                                                                                       |
| `useDictionaryDynamic` | Hook, der dynamische Dictionaries behandelt, die per key geladen werden. Verwendet intern React Suspense für Ladezustände.                                              | -                                                                                                                       |
| `useLocale`            | Client-seitiger Hook, um die aktuelle Locale und eine Funktion zum Setzen derselben zu erhalten. Für den Next.js App Router erweitert und mit Navigationsunterstützung. | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Client-seitiger Hook zur Verwaltung von URL-Umschreibungen. Aktualisiert die URL automatisch, wenn eine besser lesbare lokalisierte Umschreibregel existiert.           | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Spezifischer Hook für den Next.js Page Router zur Verwaltung von Locales. Handhabt Weiterleitungen und Seiten-Neuladungen bei Locale-Änderungen.                        | -                                                                                                                       |
| `useI18n`              | Hook, der eine Übersetzungsfunktion `t()` bereitstellt, um verschachtelte Inhalte per Schlüssel abzurufen. Orientiert sich am i18next/next-intl-Muster.                 | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook, der ein an die Locale gebundenes `Intl`-Objekt bereitstellt. Injiziert automatisch die aktuelle Locale und verwendet optimiertes Caching.                         | -                                                                                                                       |
| `useLoadDynamic`       | Hook zum Laden dynamischer Dictionaries mittels React Suspense. Nimmt einen `key` und ein `promise` entgegen und cached die Ergebnisse.                                 | -                                                                                                                       |

### Funktionen (Serverseitig)

Import:

```tsx
import "next-intlayer/server";
```

| Funktion               | Beschreibung                                                                                                                                                            | Zugehöriges Dokument                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                    | Serverseitige Version der Übersetzungsfunktion für den Next.js App Router. Gibt die Übersetzung mehrsprachiger Inhalte für die Server-locale zurück.                    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md) |
| `getLocale`            | Hilfsfunktion zum Extrahieren der aktuellen locale aus Next.js-Headern und Cookies. Entwickelt für Server Components, Server Actions oder Route Handlers.               | -                                                                                                      |
| `generateStaticParams` | Generiert statische Parameter für Next.js' dynamische Routen basierend auf den konfigurierten Locales. Gibt ein Array von Locale-Objekten zur Vorab-Generierung zurück. | -                                                                                                      |
| `locale`               | Funktion, um die Locale im Server-Kontext (App Router) zu lesen oder zu setzen. Stellt Locale-Verwaltung in Server Components bereit.                                   | -                                                                                                      |

### Typen

Import:

```tsx
import "next-intlayer";
```

| Typ                    | Beschreibung                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Typ für Next.js-Seiten mit Intlayer-Unterstützung. Generischer Typ, der den locale-Parameter enthält.                                 |
| `Next14PageIntlayer`   | Typ für Next.js 14-Seiten mit Intlayer-Unterstützung.                                                                                 |
| `Next15PageIntlayer`   | Typ für Next.js 15-Seiten mit Intlayer-Unterstützung.                                                                                 |
| `NextLayoutIntlayer`   | Typ für Next.js-Layouts mit Intlayer-Unterstützung. Generischer Typ, der den locale-Parameter enthält.                                |
| `Next14LayoutIntlayer` | Typ für Next.js 14 Layouts mit Intlayer-Unterstützung.                                                                                |
| `Next15LayoutIntlayer` | Typ für Next.js 15 Layouts mit Intlayer-Unterstützung.                                                                                |
| `LocalParams`          | Typ für Next.js Routenparameter mit Locale. Objekt mit der Eigenschaft `locale`.                                                      |
| `LocalPromiseParams`   | Typ für Next.js Routenparameter mit Locale (async-Version). Promise, das zu einem Objekt mit der Eigenschaft `locale` aufgelöst wird. |
