---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Intlayer initialisieren
description: Erfahren Sie, wie Sie Intlayer in Ihrem Projekt initialisieren.
keywords:
  - Initialisieren
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Init-Befehl hinzugefügt
---

# Intlayer initialisieren

```bash
npx intlayer init
```

Der `init`-Befehl richtet Intlayer automatisch in Ihrem Projekt ein, indem er die erforderlichen Dateien und Einstellungen konfiguriert. Er ist der empfohlene Weg, um mit Intlayer zu starten.

## Aliase:

- `npx intlayer init`

## Argumente:

- `--project-root [projectRoot]` - Optional. Geben Sie das Projektstammverzeichnis an. Wenn nicht angegeben, sucht der Befehl das Projektstammverzeichnis ausgehend vom aktuellen Arbeitsverzeichnis.

## Was es macht:

Der `init`-Befehl führt die folgenden Einrichtungsaufgaben aus:

1. **Validiert die Projektstruktur** - Stellt sicher, dass Sie sich in einem gültigen Projektverzeichnis mit einer `package.json`-Datei befinden
2. **Aktualisiert `.gitignore`** - Fügt `.intlayer` zu Ihrer `.gitignore`-Datei hinzu, um generierte Dateien von der Versionskontrolle auszuschließen
3. **Konfiguriert TypeScript** - Aktualisiert alle `tsconfig.json`-Dateien, um Intlayer-Typdefinitionen einzuschließen (`.intlayer/**/*.ts`)
4. **Erstellt Konfigurationsdatei** - Generiert eine `intlayer.config.ts` (für TypeScript-Projekte) oder `intlayer.config.mjs` (für JavaScript-Projekte) mit Standardeinstellungen
5. **Aktualisiert Vite-Konfiguration** - Wenn eine Vite-Konfigurationsdatei erkannt wird, fügt es den Import des `vite-intlayer`-Plugins hinzu

Der `init`-Befehl führt die folgenden Einrichtungsschritte aus:

1. **Validiert Projektstruktur** - Stellt sicher, dass Sie sich in einem gültigen Projektverzeichnis mit einer `package.json`-Datei befinden
2. **Aktualisiert `.gitignore`** - Fügt `.intlayer` zu Ihrer `.gitignore`-Datei hinzu, um generierte Dateien von der Versionskontrolle auszuschließen
3. **Konfiguriert TypeScript** - Aktualisiert alle `tsconfig.json`-Dateien, um Intlayer-Typdefinitionen einzuschließen (`.intlayer/**/*.ts`)
4. **Erstellt Konfigurationsdatei** - Generiert eine `intlayer.config.ts` (für TypeScript-Projekte) oder `intlayer.config.mjs` (für JavaScript-Projekte) mit Standardeinstellungen
5. **Aktualisiert Vite-Konfiguration** - Falls eine Vite-Konfigurationsdatei erkannt wird, fügt es den `vite-intlayer`-Plugin-Import hinzu
6. **Aktualisiert Next.js-Konfiguration** - Wenn eine Next.js-Konfigurationsdatei erkannt wird, fügt es den `next-intlayer` Plugin-Import hinzu

## Beispiele:

### Grundlegende Initialisierung:

```bash
npx intlayer init
```

Dies initialisiert Intlayer im aktuellen Verzeichnis und erkennt automatisch das Projekt-Root.

### Initialisierung mit benutzerdefiniertem Projekt-Root:

```bash
npx intlayer init --project-root ./my-project
```

Dies initialisiert Intlayer im angegebenen Verzeichnis.

## Beispielausgabe:

```bash
npx intlayer init
Prüfe Intlayer-Konfiguration...
✓ .intlayer zur .gitignore hinzugefügt
✓ tsconfig.json aktualisiert, um intlayer-Typen einzuschließen
Erstellt intlayer.config.ts
✓ Import in vite.config.ts eingefügt
✓ Intlayer-Init abgeschlossen.
```

## Hinweise:

- Der Befehl ist idempotent — Sie können ihn mehrfach gefahrlos ausführen. Er überspringt Schritte, die bereits konfiguriert sind.
- Wenn bereits eine Konfigurationsdatei existiert, wird sie nicht überschrieben.
- TypeScript-Konfigurationsdateien ohne ein `include`-Array (z. B. solution-style-Konfigurationen mit references) werden übersprungen.
- Der Befehl bricht mit einem Fehler ab, wenn im Projektstamm kein `package.json` gefunden wird.
