---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentation des intlayer-cli-Pakets
description: CLI-Tool für Intlayer, das Befehle zum Erstellen und Prüfen von Wörterbüchern bereitstellt.
keywords:
  - cli
  - tools
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Vereinheitlichte Dokumentation für alle Exporte"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Paket intlayer-cli

Das Paket `intlayer-cli` bietet eine Reihe von Befehlen zum Verwalten von Intlayer-Wörterbüchern und der Konfiguration.

## Installation

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="bun"
bun add intlayer-cli
```

## Exporte

### CLI-Befehle (Funktionen)

Das Paket exportiert Funktionen, die die CLI-Befehle antreiben und es Ihnen ermöglichen, Intlayer-Operationen programmgesteuert auszulösen.

Importieren:

```tsx
import "intlayer-cli";
```

| Funktion       | Beschreibung                                                    |
| -------------- | --------------------------------------------------------------- |
| `build`        | Erstellt die Intlayer-Wörterbücher.                             |
| `audit`        | Prüft die Wörterbücher auf fehlende Übersetzungen.              |
| `liveSync`     | Synchronisiert Wörterbücher in Echtzeit.                        |
| `pull`         | Holt Wörterbücher aus einer entfernten Quelle.                  |
| `push`         | Schiebt Wörterbücher zu einer entfernten Quelle.                |
| `test`         | Führt Tests für Wörterbücher durch.                             |
| `transform`    | Transformiert Wörterbücher zwischen Formaten.                   |
| `fill`         | Füllt Wörterbücher mit fehlenden Übersetzungen mithilfe von KI. |
| `reviewDoc`    | Überprüft die Dokumentation auf Internationalisierungsaspekte.  |
| `translateDoc` | Übersetzt die Dokumentation mithilfe von KI.                    |
