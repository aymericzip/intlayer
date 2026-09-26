---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 5
title: CLI - Intlayer-Pakete aktualisieren
description: Erfahren Sie, wie Sie mit dem Befehl upgrade des Intlayer-CLI alle Intlayer-Pakete Ihres Projekts oder Monorepos auflisten und auf die neueste Version aktualisieren.
keywords:
  - CLI
  - Upgrade
  - Update
  - Pakete
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Befehl upgrade hinzufügen"
author: aymericzip
---

# Intlayer-Pakete aktualisieren

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

Der Befehl `upgrade` listet die in jeder `package.json` Ihres Projekts deklarierten Intlayer-Pakete auf, einschließlich Monorepo-Workspaces, und aktualisiert sie auf die neueste veröffentlichte Version. Er führt denselben Paketaktualisierungsschritt wie `intlayer init` eigenständig aus.

## Argumente:

- `--project-root [projectRoot]` - Optional. Das Projekt-Stammverzeichnis. Standardmäßig startet der Befehl von der nächstgelegenen `package.json` oberhalb des aktuellen Arbeitsverzeichnisses.
- `--dry-run` - Optional. Listet die Pakete und ihre Zielversion auf, ohne Dateien zu ändern.
- `--tag <tag>` - Optional. Das npm-dist-tag, auf das aktualisiert werden soll (zum Beispiel `canary`). Standardmäßig `latest`.

## Funktionsweise:

1. **Listet die Intlayer-Pakete auf** - Durchsucht jede `package.json` des Projekts (ignoriert `node_modules` und Build-Ausgaben) nach Abhängigkeiten und Dev-Abhängigkeiten wie `intlayer`, `@intlayer/*`, `*-intlayer` und `intlayer-*`.
2. **Ruft die Zielversion ab** - Liest die Version des ausgewählten dist-tags (standardmäßig `latest`) jedes Pakets aus der npm-Registry.
3. **Schreibt die Versionsbereiche neu** - Aktualisiert jeden veralteten Bereich direkt in der Datei unter Beibehaltung des Operators (`^`, `~` oder keiner) sowie der Dateieinrückung.
4. **Einmalige Installation** - Führt eine einzelne Installation aus dem Workspace-Root aus (dem nächstgelegenen Verzeichnis mit einer Lock-Datei), unter Verwendung des Paketmanagers, dem die Lock-Datei gehört:

| Lock-Datei                     | Befehl         |
| ------------------------------ | -------------- |
| `bun.lock` / `bun.lockb`       | `bun install`  |
| `pnpm-lock.yaml`               | `pnpm install` |
| `yarn.lock`                    | `yarn install` |
| `package-lock.json` oder keine | `npm install`  |

Wenn keine Lock-Datei vorhanden ist, wird das Feld `packageManager` der `package.json` (zum Beispiel `"bun@1.2.0"`) verwendet, bevor auf npm zurückgegriffen wird.

Bereiche, die nicht auf die Registry verweisen, wie `workspace:*`, `file:`, `link:`, `catalog:` oder Git-URLs, werden niemals geändert.

## Beispiele:

### Verfügbare Upgrades auflisten, ohne sie anzuwenden:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Auf das Canary-Release aktualisieren:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Beispielausgabe:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Hinweise:

- Führen Sie den Befehl im Stammverzeichnis Ihres Repositorys aus, um alle Workspaces zu aktualisieren. Führen Sie ihn in einem Workspace aus, um nur diesen Workspace zu aktualisieren.
- Pakete, deren Version nicht abgerufen werden kann (offline, privates oder unveröffentlichtes Paket), werden aufgelistet und unverändert gelassen.
- Schlägt die Installation fehl, bleiben die aktualisierten Bereiche in `package.json` erhalten. Führen Sie den Installationsbefehl Ihres Paketmanagers manuell aus.
