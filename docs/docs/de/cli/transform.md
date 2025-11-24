---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Komponenten transformieren
description: Erfahren Sie, wie Sie bestehende Komponenten für die Nutzung von Intlayer transformieren.
keywords:
  - Transformieren
  - Komponenten
  - Migration
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# Komponenten transformieren

```bash
npx intlayer transform
```

Dieser Befehl analysiert Ihre Code-Dateien, um bei der Migration bestehender Komponenten zur Nutzung von Intlayer zu helfen. Er unterstützt eine interaktive Dateiauswahl oder die gezielte Auswahl bestimmter Dateien.

## Aliase:

- `npx intlayer trans`

## Argumente:

**Optionen zur Dateiauswahl:**

- **`-f, --file [files...]`**: Liste spezifischer Dateien, die transformiert werden sollen. Wenn nicht angegeben, durchsucht die CLI passende Dateien (`**/*.{tsx,jsx,vue,svelte,ts,js}`) und fordert Sie auf, auszuwählen, welche transformiert werden sollen.

  > Beispiel: `npx intlayer transform -f src/components/MyComponent.tsx`

**Ausgabeoptionen:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Verzeichnis zum Speichern der generierten Content-Declaration-Dateien.

  > Beispiel: `npx intlayer transform -o src/content`

- **`--code-only`**: Nur den Komponenten-Code transformieren (keine Content-Declaration schreiben).

  > Beispiel: `npx intlayer transform --code-only`

- **`--declaration-only`**: Nur Content-Declaration generieren (Komponente nicht umschreiben).

  > Beispiel: `npx intlayer transform --declaration-only`

**Konfigurationsoptionen:**

- **`--base-dir`**: Basisverzeichnis für das Projekt angeben.
- **`--env`**: Umgebung angeben.
- **`--env-file`**: Eine benutzerdefinierte Umgebungsdatei bereitstellen.
- **`--verbose`**: Aktiviert ausführliche Protokollierung.

**Erforderliche Plugins:**

Der Transform-Befehl funktioniert ohne zusätzliche Plugins bei TypeScript- / JSX-Dateien. Für Vue- und Svelte-Projekte müssen jedoch die folgenden Plugins installiert sein:

- **`@intlayer/vue-transformer`**: Für Vue-Dateien.
- **`@intlayer/svelte-transformer`**: Für Svelte-Dateien.
