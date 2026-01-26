---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer Paketdokumentation
description: Next.js-spezifische Integration für Intlayer, die Middleware und Provider für App Router und Page Router bereitstellt.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# next-intlayer Paket

Das `next-intlayer`-Paket stellt die notwendigen Werkzeuge zur Integration von Intlayer in Next.js-Anwendungen bereit. Es unterstützt sowohl den App Router als auch den Page Router und enthält Middleware für auf Locale basierendes Routing.

## Installation

```bash
npm install next-intlayer
```

## Exports

### Middleware

| Funktion             | Beschreibung                                                                |
| -------------------- | --------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js-Middleware für lokalisierungsbasiertes Routing und Weiterleitungen. |

### Provider

| Komponente               | Beschreibung                                                    |
| ------------------------ | --------------------------------------------------------------- |
| `IntlayerClientProvider` | Provider für clientseitige Komponenten in Next.js.              |
| `IntlayerServerProvider` | Provider für serverseitige Komponenten in Next.js (App Router). |

### Hooks (Client-seitig)

Re-exportiert die meisten Hooks aus `react-intlayer`.

| Hook            | Beschreibung                                                                  |
| --------------- | ----------------------------------------------------------------------------- |
| `useIntlayer`   | Wählt ein Wörterbuch anhand seines Schlüssels aus und gibt den Inhalt zurück. |
| `useDictionary` | Wählt ein Wörterbuch anhand seines Schlüssels aus und gibt den Inhalt zurück. |
| `useLocale`     | Gibt die aktuelle Locale und eine Funktion zum Setzen derselben zurück.       |
| `useI18n`       | Gibt die aktuellen Intlayer-Kontextwerte zurück.                              |

### Funktionen (Server-seitig)

| Funktion               | Beschreibung                                                               |
| ---------------------- | -------------------------------------------------------------------------- |
| `t`                    | Serverseitige Version der Übersetzungsfunktion für den Next.js App Router. |
| `generateStaticParams` | Generiert statische Parameter für die dynamischen Routen von Next.js.      |

### Typen

| Type                 | Beschreibung                                        |
| -------------------- | --------------------------------------------------- |
| `NextPageIntlayer`   | Typ für Next.js-Seiten mit Intlayer-Unterstützung.  |
| `NextLayoutIntlayer` | Typ für Next.js-Layouts mit Intlayer-Unterstützung. |
