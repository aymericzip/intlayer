---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Strings extrahieren
description: Erfahren Sie, wie Sie Strings aus Ihren Komponenten in eine .content-Datei in der Nähe der Komponente extrahieren.
keywords:
  - Extrahieren
  - Komponenten
  - Migration
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Strings extrahieren

```bash
npx intlayer extract
```

Dieser Befehl analysiert Ihre Code-Dateien, um Strings aus Komponenten in eine .content-Datei nahe bei der Komponente zu extrahieren. Er unterstützt interaktive Dateiauswahl oder die gezielte Angabe einzelner Dateien.

## Aliase:

- `npx intlayer ext`

## Argumente:

**Optionen zur Dateiauswahl:**

- **`-f, --file [files...]`**: Liste spezifischer Dateien, die extrahiert werden sollen. Wenn nicht angegeben, durchsucht das CLI nach passenden Dateien (`**/*.{tsx,jsx,vue,svelte,ts,js}`) und fordert dich auf, auszuwählen, welche extrahiert werden sollen.

  > Beispiel: `npx intlayer extract -f src/components/MyComponent.tsx`

**Ausgabeoptionen:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Verzeichnis, in dem die generierten Content-Declaration-Dateien gespeichert werden.

  > Beispiel: `npx intlayer extract -o src/content`

- **`--code-only`**: Extrahiert nur den Komponenten-Code (schreibt keine Content-Declaration).

  > Beispiel: `npx intlayer extract --code-only`

- **`--declaration-only`**: Erzeugt nur die Content-Declaration (schreibt die Komponente nicht neu).

  > Beispiel: `npx intlayer extract --declaration-only`

**Konfigurationsoptionen:**

- **`--base-dir`**: Gibt das Basisverzeichnis des Projekts an.
- **`--env`**: Gibt die Umgebung an.
- **`--env-file`**: Gibt eine benutzerdefinierte Umgebungsdatei an.
- **`--verbose`**: Aktiviert ausführliche Protokollierung.

**Erforderliche Plugins:**

Der extract-Befehl funktioniert ohne zusätzliche Plugins für TypeScript-/JSX-Dateien. Für Vue- und Svelte-Projekte müssen jedoch die folgenden Plugins installiert sein:

- **`@intlayer/vue-transformer`**: Für Vue-Dateien.
- **`@intlayer/svelte-transformer`**: Für Svelte-Dateien.
