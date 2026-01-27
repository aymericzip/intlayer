---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-intlayer Paketdokumentation
description: React-spezifische Implementierung von Intlayer, die Hooks und Provider für React-Anwendungen bereitstellt.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# react-intlayer-Paket

Das `react-intlayer`-Paket stellt die notwendigen Werkzeuge zur Integration von Intlayer in React-Anwendungen bereit. Es enthält Context-Provider, Hooks und Komponenten zur Verarbeitung mehrsprachiger Inhalte.

## Installation

```bash
npm install react-intlayer
```

## Exporte

### Provider

Import:

```tsx
import "react-intlayer";
```

| Komponente                | Beschreibung                                                                                                                                            | Zugehöriges Dokument                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | Der Haupt-Provider, der Ihre Anwendung umschließt und den Intlayer-Kontext bereitstellt. Enthält standardmäßig Editor-Unterstützung.                    | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | Eine Provider-Komponente, die sich auf Inhalte ohne Editor-Funktionen konzentriert. Verwenden Sie diese, wenn Sie den visuellen Editor nicht benötigen. | -                                                                                                                             |
| `HTMLProvider`            | Provider für HTML-bezogene Internationalisierungseinstellungen. Ermöglicht das Überschreiben von Komponenten für HTML-Tags.                             | -                                                                                                                             |

### Hooks

Importieren:

```tsx
import "react-intlayer";
```

| Hook                   | Beschreibung                                                                                                                                                              | Verwandte Dokumentation                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `useHTMLRenderer`      | Hook, um eine vorkonfigurierte HTML-Renderer-Funktion zu erhalten.                                                                                                        | -                                                                                                                               |
| `useMarkdownRenderer`  | Hook, um eine vorkonfigurierte Markdown-Renderer-Funktion zu erhalten.                                                                                                    | -                                                                                                                               |
| `useIntlayer`          | Client-seitiger Hook, der ein Dictionary anhand seines Schlüssels auswählt und dessen Inhalt zurückgibt. Verwendet die Locale aus dem Kontext, falls keine angegeben ist. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md)             |
| `useDictionary`        | Hook, der ein Dictionary-Objekt transformiert und den Inhalt für die aktuelle locale zurückgibt. Verarbeitet `t()`-Übersetzungen, Enumerationen usw.                      | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook, der asynchrone Dictionaries verarbeitet. Akzeptiert eine promise-basierte Dictionary-Map und löst sie für die aktuelle locale auf.                                  | -                                                                                                                               |
| `useDictionaryDynamic` | Hook, der dynamische, nach Schlüssel geladene Wörterbücher verwaltet. Verwendet intern React Suspense für Ladezustände.                                                   | -                                                                                                                               |
| `useLocale`            | Client-seitiger Hook, um die aktuelle Locale, die Standard-Locale, verfügbare Locales und eine Funktion zum Aktualisieren der Locale zu erhalten.                         | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)                 |
| `useLocaleBase`        | Hook, um die aktuelle Locale und alle zugehörigen Felder (locale, defaultLocale, availableLocales, setLocale) aus dem Kontext zu erhalten.                                | -                                                                                                                               |
| `useRewriteURL`        | Client-seitiger Hook, um URL-Rewrites zu verwalten. Wenn eine Rewrite-Regel für den aktuellen pathname und die locale existiert, wird die URL aktualisiert.               | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useRewriteURL.md)         |
| `useI18n`              | Hook, der eine Übersetzungsfunktion `t()` bereitstellt, um per Schlüssel auf verschachtelte Inhalte zuzugreifen. Imitiert das Verhalten von i18next/next-intl.            | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useI18n.md)                     |
| `useIntl`              | Hook, der ein lokalgebundenes `Intl`-Objekt bereitstellt. Injiziert automatisch die aktuelle Locale und verwendet optimiertes Caching.                                    | -                                                                                                                               |
| `useLocaleStorage`     | Hook, der die Persistenz der Locale im Local Storage oder in Cookies bereitstellt. Gibt Getter- und Setter-Funktionen zurück.                                             | -                                                                                                                               |
| `useLocaleCookie`      | Veraltet. Verwenden Sie stattdessen `useLocaleStorage`. Hook, der die Persistenz der Locale in Cookies verwaltet.                                                         | -                                                                                                                               |
| `useLoadDynamic`       | Hook zum Laden dynamischer Dictionaries mithilfe von React Suspense. Akzeptiert einen key und ein Promise, cached die Ergebnisse.                                         | -                                                                                                                               |
| `useIntlayerContext`   | Hook, der die aktuellen Intlayer-Client-Kontextwerte (locale, setLocale, etc.) bereitstellt.                                                                              | -                                                                                                                               |
| `useHTMLContext`       | Hook, um auf HTML-Komponenten-Overrides aus dem HTMLProvider-Kontext zuzugreifen.                                                                                         | -                                                                                                                               |

### Funktionen

Import:

```tsx
import "react-intlayer";
```

| Funktion             | Beschreibung                                                                                                                                                                     | Verwandtes Dokument                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `renderHTML`         | Eigenständiges Utility zum Rendern von HTML außerhalb von Komponenten.                                                                                                           | -                                                                                                      |
| `renderMarkdown`     | Eigenständiges Utility zum Rendern von Markdown außerhalb von Komponenten.                                                                                                       | -                                                                                                      |
| `t`                  | Clientseitige Übersetzungsfunktion, die die Übersetzung des bereitgestellten mehrsprachigen Inhalts zurückgibt. Verwendet die Locale aus dem Kontext, falls keine angegeben ist. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md) |
| `getDictionary`      | Verarbeitet Wörterbuchobjekte und gibt Inhalte für die angegebene locale zurück. Verarbeitet `t()`-Übersetzungen, Aufzählungen, Markdown, HTML usw.                              | -                                                                                                      |
| `getIntlayer`        | Ruft ein Wörterbuch anhand seines Schlüssels aus der generierten Deklaration ab und gibt dessen Inhalt für die angegebene locale zurück. Optimierte Version von `getDictionary`. | -                                                                                                      |
| `setLocaleInStorage` | Setzt die locale im Speicher (Local Storage oder Cookie, abhängig von der Konfiguration).                                                                                        | -                                                                                                      |
| `setLocaleCookie`    | Veraltet. Verwende stattdessen `setLocaleInStorage`. Legt die locale in einem Cookie fest.                                                                                       | -                                                                                                      |
| `localeInStorage`    | Holt die Locale aus dem Speicher (localStorage oder Cookie).                                                                                                                     | -                                                                                                      |
| `localeCookie`       | Veraltet. Verwenden Sie stattdessen `localeInStorage`. Holt die Locale aus dem Cookie.                                                                                           | -                                                                                                      |

### Komponenten

Importieren:

```tsx
import "react-intlayer";
```

oder

```tsx
import "react-intlayer/markdown";
```

| Komponente         | Beschreibung                                                                                                                                 | Zugehöriges Dokument                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `HTMLRenderer`     | Rendert HTML-Inhalte mit benutzerdefinierten Komponenten.                                                                                    | -                                                                                                                             |
| `MarkdownProvider` | Provider für den Markdown-Rendering-Kontext. Ermöglicht benutzerdefinierte Komponentenüberschreibungen für Markdown-Elemente.                | -                                                                                                                             |
| `MarkdownRenderer` | Rendert Markdown-Inhalte mit benutzerdefinierten Komponenten. Unterstützt alle Standard-Markdown-Funktionen und Intlayer-spezifische Syntax. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/MarkdownRenderer.md) |

### Typen

Import:

```tsx
import "react-intlayer";
```

| Typ            | Beschreibung                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Typ, der einen Knoten im Intlayer-Inhaltsbaum repräsentiert. Wird für typsichere Inhaltsmanipulation verwendet. |

### Server-seitig (react-intlayer/server)

Import:

```tsx
import "react-intlayer/server";
```

| Export                   | Typ         | Beschreibung                                                     |
| ------------------------ | ----------- | ---------------------------------------------------------------- |
| `IntlayerServerProvider` | `Component` | Provider für serverseitiges Rendering.                           |
| `IntlayerServer`         | `Component` | Serverseitiger Wrapper für Intlayer-Inhalte.                     |
| `t`                      | `Function`  | Serverseitige Version der Übersetzungsfunktion.                  |
| `useLocale`              | `Hook`      | Hook, um serverseitig auf die Locale zuzugreifen.                |
| `useIntlayer`            | `Hook`      | Serverseitige Version von `useIntlayer`.                         |
| `useDictionary`          | `Hook`      | Serverseitige Version von `useDictionary`.                       |
| `useI18n`                | `Hook`      | Serverseitige Version von `useI18n`.                             |
| `locale`                 | `Function`  | Funktion, um die Locale auf dem Server abzurufen oder zu setzen. |
