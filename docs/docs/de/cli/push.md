---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Wörterbücher pushen
description: Erfahren Sie, wie Sie Ihre Wörterbücher in den Intlayer-Editor und das CMS pushen.
keywords:
  - Push
  - Wörterbücher
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Wörterbücher pushen

```bash
npx intlayer dictionary push
```

Wenn der [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) installiert ist, können Sie Wörterbücher auch in den Editor pushen. Dieser Befehl ermöglicht es, die Wörterbücher im [Editor](https://app.intlayer.org/) verfügbar zu machen. So können Sie Ihre Wörterbücher mit Ihrem Team teilen und Ihre Inhalte bearbeiten, ohne den Code Ihrer Anwendung zu ändern.

## Aliase:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Argumente:

**Wörterbuch-Optionen:**

- **`-d`, `--dictionaries`**: IDs der Wörterbücher, die gepusht werden sollen. Wenn nicht angegeben, werden alle Wörterbücher gepusht.

  > Beispiel: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: IDs der Wörterbücher, die gepusht werden sollen (Alias für --dictionaries).

  > Beispiel: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Konfigurationsoptionen:**

- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an. Um die Intlayer-Konfiguration zu laden, sucht der Befehl im Basisverzeichnis nach der Datei `intlayer.config.{ts,js,json,cjs,mjs}`.

  > Beispiel: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Deaktiviert den Cache.

  > Beispiel: `npx intlayer build --no-cache`

**Optionen für Umgebungsvariablen:**

- **`--env`**: Gibt die Umgebung an (z.B. `development`, `production`). Nützlich, wenn Sie Umgebungsvariablen in Ihrer Intlayer-Konfigurationsdatei verwenden.
- **`--env-file`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden. Nützlich, wenn Sie Umgebungsvariablen in Ihrer Intlayer-Konfigurationsdatei verwenden.

  > Beispiel: `npx intlayer dictionary push --env-file .env.production.local`

  > Beispiel: `npx intlayer dictionary push --env production`

**Ausgabeoptionen:**

- **`-r`, `--delete-locale-dictionary`**: Überspringt die Frage, ob die Verzeichnisse der Sprachen gelöscht werden sollen, nachdem die Wörterbücher hochgeladen wurden, und entfernt diese. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der entfernten Wörterbücher überschrieben.

  > Beispiel: `npx intlayer dictionary push -r`

  > Beispiel: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Überspringt die Frage, ob die Verzeichnisse der Sprachen gelöscht werden sollen, nachdem die Wörterbücher hochgeladen wurden, und behält diese. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der entfernten Wörterbücher überschrieben.

  > Beispiel: `npx intlayer dictionary push -k`

  > Beispiel: `npx intlayer dictionary push --keep-locale-dictionary`

**Vorbereitungsoptionen:**

- **`--build`**: Baut die Wörterbücher vor dem Hochladen, um sicherzustellen, dass der Inhalt aktuell ist. True erzwingt den Build, false überspringt den Build, undefined erlaubt die Verwendung des Build-Caches.

**Protokollierungsoptionen:**

- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung. (Standardmäßig true bei Verwendung der CLI)

**Git-Optionen:**

- **`--git-diff`**: Führt den Vorgang nur für Wörterbücher aus, die Änderungen vom Basis-Branch (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.
- **`--git-diff-base`**: Gibt die Basisreferenz für den Git-Diff an (Standard `origin/main`).
- **`--git-diff-current`**: Gibt die aktuelle Referenz für den Git-Diff an (Standard: `HEAD`).
- **`--uncommitted`**: Bezieht nicht committete Änderungen mit ein.
- **`--unpushed`**: Bezieht nicht gepushte Änderungen mit ein.
- **`--untracked`**: Bezieht nicht verfolgte Dateien mit ein.

  > Beispiel: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Beispiel: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
