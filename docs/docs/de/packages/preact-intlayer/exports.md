---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "Dokumentation des preact-intlayer-Pakets"
description: "Preact-spezifische Integration für Intlayer, die Provider und Hooks für Preact-Anwendungen bereitstellt."
keywords:
  - preact-intlayer
  - preact
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Vereinheitlichte Dokumentation für alle Exporte"
---

# preact-intlayer-Paket

Das `preact-intlayer`-Paket stellt die notwendigen Werkzeuge zur Integration von Intlayer in Preact-Anwendungen bereit. Es enthält Provider und Hooks zur Verarbeitung mehrsprachiger Inhalte.

## Installation

```bash
npm install preact-intlayer
```

## Exporte

### Provider

| Komponente         | Beschreibung                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Der Haupt-Provider, der Ihre Anwendung umschließt und den Intlayer-Kontext bereitstellt. |

### Hooks

| Hook            | Beschreibung                                                                                                                | Zugehörige Doku                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `useIntlayer`   | Basierend auf `useDictionary`, injiziert es jedoch eine optimierte Version des Dictionarys aus der generierten Deklaration. | -                                                                                                      |
| `useDictionary` | Verarbeitet Objekte, die wie Dictionaries aussehen (key, content). Es verarbeitet `t()`-Übersetzungen, Enumerationen usw.   | -                                                                                                      |
| `useLocale`     | Gibt die aktuelle Locale und eine Funktion zum Ändern zurück.                                                               | -                                                                                                      |
| `t`             | Wählt Inhalte basierend auf der aktuellen Locale aus.                                                                       | [Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md) |

### Komponenten

| Komponente         | Beschreibung                                                  |
| ------------------ | ------------------------------------------------------------- |
| `MarkdownProvider` | Provider für den Markdown-Rendering-Kontext.                  |
| `MarkdownRenderer` | Rendert Markdown-Inhalte mit benutzerdefinierten Komponenten. |
