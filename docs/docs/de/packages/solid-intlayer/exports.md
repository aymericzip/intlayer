---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: solid-intlayer Paketdokumentation
description: Solid-spezifische Integration für Intlayer, die Provider und Hooks für Solid-Anwendungen bereitstellt.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Einheitliche Dokumentation für alle Exporte
---

# solid-intlayer Paket

Das Paket `solid-intlayer` stellt die notwendigen Werkzeuge zur Integration von Intlayer in Solid-Anwendungen bereit. Es enthält Provider und Hooks zum Umgang mit mehrsprachigen Inhalten.

## Installation

```bash
npm install solid-intlayer
```

## Exporte

### Provider

Import:

```tsx
import "solid-intlayer";
```

| Komponente         | Beschreibung                                                                            | Zugehöriges Dokument                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Der Hauptprovider, der Ihre Anwendung umschließt und den Intlayer-Kontext bereitstellt. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/IntlayerProvider.md) |

### Hooks

Import:

```tsx
import "solid-intlayer";
```

| Hook                   | Beschreibung                                                                                                                                       | Zugehörige Dokumentation                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Basierend auf `useDictionary`, injiziert es jedoch eine optimierte Version des Dictionarys aus der generierten Deklaration.                        | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Verarbeitet Objekte, die wie Wörterbücher aussehen (key, content). Unterstützt `t()`-Übersetzungen, Enumerationen usw.                             | -                                                                                                                       |
| `useDictionaryAsync`   | Wie `useDictionary`, behandelt jedoch asynchrone Wörterbücher.                                                                                     | -                                                                                                                       |
| `useDictionaryDynamic` | Wie `useDictionary`, jedoch für dynamische Wörterbücher.                                                                                           | -                                                                                                                       |
| `useLocale`            | Gibt die aktuelle Locale zurück und eine Funktion, um sie zu setzen.                                                                               | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Client-seitiger Hook zur Verwaltung von URL-Umschreibungen. Aktualisiert die URL automatisch, wenn eine lokalisierte Umschreibregel vorhanden ist. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Gibt das Intl-Objekt für die aktuelle Locale zurück.                                                                                               | -                                                                                                                       |
| `useLoadDynamic`       | Hook zum Laden dynamischer Wörterbücher.                                                                                                           | -                                                                                                                       |
| `t`                    | Wählt Inhalte basierend auf der aktuellen Locale.                                                                                                  | [Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md)                  |

### Komponenten

Import:

```tsx
import "solid-intlayer";
```

| Komponente         | Beschreibung                                 |
| ------------------ | -------------------------------------------- |
| `MarkdownProvider` | Provider für den Markdown-Rendering-Kontext. |
