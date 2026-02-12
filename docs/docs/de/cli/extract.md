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

Dieser Befehl analysiert Ihre Codedateien, um Strings aus Komponenten in eine .content-Datei in der Nähe der Komponente zu extrahieren. Er unterstützt die interaktive Dateiauswahl oder das gezielte Ansprechen spezifischer Dateien.

## Aliase:

- `npx intlayer ext`

## Argumente:

**Optionen zur Dateiauswahl:**

- **`-f, --file [files...]`**: Liste spezifischer Dateien zum Extrahieren. Falls nicht angegeben, scannt die CLI nach passenden Dateien (`**/*.{tsx,jsx,vue,svelte,ts,js}`) und fordert Sie auf, die zu extrahierenden Dateien auszuwählen.

  > Beispiel: `npx intlayer extract -f src/components/MyComponent.tsx`

**Ausgabeoptionen:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Verzeichnis zum Speichern der generierten Content-Deklarationsdateien.

  > Beispiel: `npx intlayer extract -o src/content`

- **`--code-only`**: Nur den Komponenten-Code extrahieren (keine Content-Deklaration schreiben).

  > Beispiel: `npx intlayer extract --code-only`

- **`--declaration-only`**: Nur die Content-Deklaration generieren (Komponente nicht umschreiben).

  > Beispiel: `npx intlayer extract --declaration-only`

**Konfigurationsoptionen:**

- **`--base-dir`**: Spezifizieren Sie das Basis-Verzeichnis für das Projekt.
- **`--env`**: Spezifizieren Sie die Umgebung.
- **`--env-file`**: Geben Sie eine benutzerdefinierte Umgebungsdatei an.
- **`--verbose`**: Aktivieren Sie die ausführliche Protokollierung (Verbose Logging).

**Erforderliche Plugins:**

Der `extract`-Befehl funktioniert ohne zusätzliche Plugins bei TypeScript / JSX-Dateien. Für Vue- und Svelte-Projekte müssen jedoch die folgenden Plugins installiert sein:

- **`@intlayer/vue-transformer`**: Für Vue-Dateien.
- **`@intlayer/svelte-transformer`**: Für Svelte-Dateien.
