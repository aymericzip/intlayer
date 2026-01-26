---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentation des Pakets angular-intlayer
description: Angular-spezifische Integration für Intlayer, die Provider und Services für Angular-Anwendungen bereitstellt.
keywords:
  - angular-intlayer
  - angular
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# Paket angular-intlayer

Das Paket `angular-intlayer` stellt die notwendigen Werkzeuge bereit, um Intlayer in Angular-Anwendungen zu integrieren. Es enthält Provider und Services zur Handhabung mehrsprachiger Inhalte.

## Installation

```bash
npm install angular-intlayer
```

## Exporte

### Einrichtung

| Funktion          | Beschreibung                                                      |
| ----------------- | ----------------------------------------------------------------- |
| `provideIntlayer` | Funktion, um Intlayer in Ihrer Angular-Anwendung bereitzustellen. |

### Dienste

| Service           | Beschreibung                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `IntlayerService` | Service, der ein Wörterbuch anhand seines Schlüssels auswählt und den Inhalt zurückgibt.         |
| `LocaleService`   | Service, der die aktuelle Locale zurückgibt und eine Funktion zum Setzen derselben bereitstellt. |

### Komponenten

| Komponente                  | Beschreibung                                      |
| --------------------------- | ------------------------------------------------- |
| `IntlayerMarkdownComponent` | Angular-Komponente, die Markdown-Inhalte rendert. |
