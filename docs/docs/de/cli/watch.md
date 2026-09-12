---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Wörterbücher beobachten
description: Erfahren Sie, wie Sie Änderungen in Ihren Inhaltsdeklarationsdateien überwachen und Wörterbücher automatisch erstellen.
keywords:
  - Beobachten
  - Wörterbücher
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author: aymericzip
---

# Wörterbücher beobachten

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

Dieser Befehl überwacht Änderungen in Ihren Inhaltsdeklarationsdateien und erstellt die Wörterbücher im Verzeichnis `.intlayer`.
Dieser Befehl entspricht `npx intlayer build --watch --skip-prepare`.

## Aliase:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Argumente:

- **`--with`**: Startet einen Befehl parallel zum Watch-Modus.

  > Beispiel: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: Führt den Befehl in jedem Intlayer-Projekt des Monorepos aus (oder nur im aktuellen, wenn er aus einem Projektverzeichnis gestartet wird). Projektspezifische Zugangsdaten können über `INTLAYER_PROJECT_CREDENTIALS` eingefügt werden, ein JSON-Objekt, das jedem Projektpfad `{ "clientId", "clientSecret" }` zuordnet.

  > Beispiel: `npx intlayer watch --ci`
