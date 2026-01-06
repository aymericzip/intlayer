---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Intlayer-Projekte auflisten
description: Erfahre, wie du alle Intlayer-Projekte in einem Verzeichnis oder Git-Repository auflistest.
keywords:
  - List
  - Projects
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: Absolute Ausgabeoption zum Befehl list projects hinzufügen
---

# Intlayer-Projekte auflisten

```bash
npx intlayer projects list
```

Dieser Befehl sucht nach und listet alle Intlayer-Projekte, indem er Verzeichnisse findet, die Intlayer-Konfigurationsdateien enthalten. Er ist nützlich, um alle Intlayer-Projekte in einem Monorepo, Workspace oder Git-Repository zu entdecken.

## Aliase:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Argumente:

- **`--base-dir [path]`**: Gibt das Basisverzeichnis an, in dem gesucht werden soll. Standard ist das aktuelle Arbeitsverzeichnis.

  > Beispiel: `npx intlayer projects list --base-dir /path/to/workspace`

  > Beispiel: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Suche vom Git-Root-Verzeichnis aus statt vom Basisverzeichnis. Das ist nützlich, um alle Intlayer-Projekte in einem Monorepo oder Git-Repository zu finden.

  > Beispiel: `npx intlayer projects list --git-root`

- **`--json`**: Gibt die Ergebnisse als JSON statt als formatierten Text aus. Nützlich für Skripte und programmatischen Zugriff.

  > Beispiel: `npx intlayer projects list --json`

- **`--absolute`**: Gibt die Ergebnisse als absolute Pfade statt als relative Pfade aus.

  > Beispiel: `npx intlayer projects list --absolute`

## Funktionsweise:

Der Befehl durchsucht das angegebene Verzeichnis (oder das Git-Root, wenn `--git-root` verwendet wird) nach Intlayer-Konfigurationsdateien. Es wird nach den folgenden Konfigurationsdateinamensmustern gesucht:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Jedes Verzeichnis, das eine dieser Dateien enthält, gilt als Intlayer-Projekt und wird in der Ausgabe aufgeführt.

## Beispiele:

### Projekte im aktuellen Verzeichnis auflisten:

```bash
npx intlayer projects list
```

### Projekte in einem bestimmten Verzeichnis auflisten:

```bash
npx intlayer projects list --base-dir ./packages
```

### Alle Projekte im Git-Repository auflisten:

```bash
npx intlayer projects list --git-root
```

### Verwendung des Kurzbefehls (Alias):

```bash
npx intlayer pl --git-root
```

### Ausgabe als JSON:

```bash
npx intlayer projects list --json
```

## Beispielausgabe:

### Formatierte Ausgabe:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### JSON-Ausgabe:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Anwendungsfälle:

- **Monorepo-Management**: Entdecke alle Intlayer-Projekte in einer Monorepo-Struktur
- **Projekterkennung**: Finde alle Intlayer-aktivierten Projekte in einem Workspace
- **CI/CD**: Überprüfe Intlayer-Projekte in automatisierten Workflows
- **Dokumentation**: Dokumentation erstellen, die alle mit Intlayer verwendeten Projekte auflistet

Die Ausgabe liefert absolute Pfade zu jedem Projektverzeichnis, wodurch das Navigieren zu oder das Automatisieren von Vorgängen für mehrere Intlayer-Projekte erleichtert wird.
