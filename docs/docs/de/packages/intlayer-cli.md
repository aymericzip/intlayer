---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer-cli Paketdokumentation
description: CLI-Tool für Intlayer, das Befehle zum Erstellen und Auditieren von Wörterbüchern bereitstellt.
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# intlayer-cli Paket

Das `intlayer-cli`-Paket stellt eine Reihe von Befehlen zur Verwaltung von Intlayer-Wörterbüchern und -Konfiguration bereit.

## Installation

```bash
npm install intlayer-cli
```

## Exporte

### CLI-Befehle (Funktionen)

Das Paket exportiert Funktionen, die die CLI-Befehle ausführen.

| Funktion    | Beschreibung                                        |
| ----------- | --------------------------------------------------- |
| `build`     | Erstellt die Intlayer-Dictionaries.                 |
| `audit`     | Prüft die Dictionaries auf fehlende Übersetzungen.  |
| `liveSync`  | Synchronisiert Dictionaries in Echtzeit.            |
| `pull`      | Lädt Dictionaries von einer Remote-Quelle herunter. |
| `push`      | Überträgt Dictionaries zu einer Remote-Quelle.      |
| `test`      | Führt Tests für Dictionaries aus.                   |
| `transform` | Transformiert Dictionaries zwischen Formaten.       |
