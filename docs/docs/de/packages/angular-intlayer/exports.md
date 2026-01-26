---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer Paketdokumentation
description: Angular-spezifische Integration für Intlayer, stellt Provider und Services für Angular-Anwendungen bereit.
keywords:
  - angular-intlayer
  - angular
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# angular-intlayer Paket

Das Paket `angular-intlayer` stellt die notwendigen Werkzeuge zur Integration von Intlayer in Angular-Anwendungen bereit. Es enthält Provider und Services zur Handhabung mehrsprachiger Inhalte.

## Installation

```bash
npm install angular-intlayer
```

## Exporte

Import:

```tsx
import "angular-intlayer";
```

### Einrichtung

| Funktion          | Beschreibung                                                      |
| ----------------- | ----------------------------------------------------------------- |
| `provideIntlayer` | Funktion, um Intlayer in Ihrer Angular-Anwendung bereitzustellen. |

### Hooks

| Hook                   | Beschreibung                                                                                                                | Zugehöriges Dokument |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `useIntlayer`          | Basierend auf `useDictionary`, injiziert es jedoch eine optimierte Version des Dictionarys aus der generierten Deklaration. | -                    |
| `useDictionary`        | Verarbeitet Objekte, die wie Dictionaries aussehen (key, content). Verarbeitet `t()`-Übersetzungen, Enumerationen usw.      | -                    |
| `useDictionaryAsync`   | Wie `useDictionary`, behandelt jedoch asynchrone Dictionaries.                                                              | -                    |
| `useDictionaryDynamic` | Wie `useDictionary`, behandelt jedoch dynamische Dictionaries.                                                              | -                    |
| `useLocale`            | Gibt die aktuelle Locale und eine Funktion zurück, um diese zu setzen.                                                      | -                    |
| `useIntl`              | Gibt das Intl-Objekt für die aktuelle Locale zurück.                                                                        | -                    |
| `useLoadDynamic`       | Hook zum Laden dynamischer Dictionaries.                                                                                    | -                    |

### Komponenten

| Komponente                  | Beschreibung                                      |
| --------------------------- | ------------------------------------------------- |
| `IntlayerMarkdownComponent` | Angular-Komponente, die Markdown-Inhalte rendert. |
