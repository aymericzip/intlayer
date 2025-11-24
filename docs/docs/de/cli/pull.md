---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Wörterbücher herunterladen
description: Erfahren Sie, wie Sie Wörterbücher aus dem Intlayer-Editor und CMS herunterladen.
keywords:
  - Herunterladen
  - Wörterbücher
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Entfernte Wörterbücher herunterladen

```bash
npx intlayer pull
```

Wenn der [Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) installiert ist, können Sie Wörterbücher auch direkt aus dem Editor herunterladen. Auf diese Weise können Sie den Inhalt Ihrer Wörterbücher für die Anforderungen Ihrer Anwendung überschreiben.

## Aliase:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Argumente:

**Wörterbuch-Optionen:**

- **`-d, --dictionaries`**: IDs der Wörterbücher, die heruntergeladen werden sollen. Wenn nicht angegeben, werden alle Wörterbücher heruntergeladen.

  > Beispiel: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: IDs der Wörterbücher, die heruntergeladen werden sollen (Alias für --dictionaries).

  > Beispiel: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Konfigurationsoptionen:**

- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an. Um die Intlayer-Konfiguration zu finden, sucht der Befehl im Basisverzeichnis nach der Datei `intlayer.config.{ts,js,json,cjs,mjs}`.

  > Beispiel: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Deaktiviert den Cache.

  > Beispiel: `npx intlayer build --no-cache`

**Umgebungsvariablen-Optionen:**

- **`--env`**: Gibt die Umgebung an (z. B. `development`, `production`).
- **`--env-file`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an. Um die Intlayer-Konfiguration zu finden, sucht der Befehl im Basisverzeichnis nach der Datei `intlayer.config.{ts,js,json,cjs,mjs}`.

  > Beispiel: `npx intlayer dictionary push --env-file .env.production.local`

  > Beispiel: `npx intlayer dictionary push --env production`

**Ausgabeoptionen:**

- **`--new-dictionaries-path`** : Pfad zum Verzeichnis, in dem die neuen Wörterbücher gespeichert werden. Wenn nicht angegeben, werden die neuen Wörterbücher im Verzeichnis `./intlayer-dictionaries` des Projekts gespeichert. Wenn in Ihrem Wörterbuchinhalt ein `filePath`-Feld angegeben ist, wird dieses Argument von den Wörterbüchern nicht berücksichtigt und sie werden im angegebenen `filePath`-Verzeichnis gespeichert.

**Protokollierungsoptionen:**

- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung. (Standardmäßig über CLI auf true gesetzt)

## Beispiel:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
