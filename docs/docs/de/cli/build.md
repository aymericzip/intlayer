---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Wörterbücher erstellen
description: Erfahren Sie, wie Sie Ihre Intlayer-Wörterbücher aus Inhaltsdeklarationsdateien erstellen.
keywords:
  - Erstellen
  - Wörterbücher
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
history:
  - version: 8.1.5
    date: 2026-02-23
    changes: "checkTypes-Option hinzugefügt"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Wörterbücher erstellen

Um Ihre Wörterbücher zu erstellen, können Sie die folgenden Befehle ausführen:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

oder im Watch-Modus

```bash packageManager="npm"
npx intlayer build --watch
```

```bash packageManager="yarn"
yarn intlayer build --watch
```

```bash packageManager="pnpm"
pnpm intlayer build --watch
```

```bash packageManager="bun"
bun x intlayer build --watch
```

Dieser Befehl findet standardmäßig Ihre Deklarations-Inhaltsdateien unter `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}` und erstellt die Wörterbücher im Verzeichnis `.intlayer`.

## Aliase:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Argumente:

- **`--base-dir`**: Geben Sie das Basisverzeichnis für das Projekt an. Um die Intlayer-Konfiguration zu laden, sucht der Befehl im Basisverzeichnis nach der Datei `intlayer.config.{ts,js,json,cjs,mjs}`.

  > Beispiel: `npx intlayer build --base-dir ./src`

- **`--env`**: Geben Sie die Umgebung an (z. B. `development`, `production`). Nützlich, wenn Sie Umgebungsvariablen in Ihrer Intlayer-Konfigurationsdatei verwenden.

  > Beispiel: `npx intlayer build --env production`

- **`--env-file`**: Geben Sie eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden sollen. Nützlich, wenn Sie Umgebungsvariablen in Ihrer Intlayer-Konfigurationsdatei verwenden.

  > Beispiel: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Startet einen Befehl parallel zum Build-Prozess.

  > Beispiel: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Überspringen Sie den Prepare-Schritt.

  > Beispiel: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Deaktivieren Sie den Cache.

  > Beispiel: `npx intlayer build --no-cache`

- **`--check-types`**: Überprüft die Typen der Inhaltsdeklarationsdateien.

  > Beispiel: `npx intlayer build --check-types`
