---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Eigenständiges Bundle (Standalone)
description: Erfahren Sie, wie Sie ein eigenständiges JavaScript-Bundle für Ihren Anwendungsinhalt erstellen.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Initialisierung der Dokumentation für den Standalone-Befehl"
---

# Eigenständiges Bundle (Standalone)

Der Befehl `standalone` ermöglicht es Ihnen, ein eigenständiges JavaScript-Bundle zu erstellen, das Intlayer und alle anderen angegebenen Pakete enthält. Dies ist besonders nützlich, um Intlayer in Umgebungen ohne Paketmanager oder Bundler zu verwenden, wie z. B. in einer reinen HTML/JS-Anwendung.

Das Bundle verwendet [esbuild](https://esbuild.github.io/), um die angeforderten Pakete und deren Abhängigkeiten in einer einzigen Datei zu kombinieren, die einfach in jedes Webprojekt importiert werden kann.

## Verwendung

```bash
npx intlayer standalone --packages [pakete...] [optionen]
```

## Optionen

- `-o, --outfile [outfile]` - Optional. Der Name der Ausgabedatei. Standardmäßig `intlayer-bundle.js`.
- `--packages [pakete...]` - Erforderlich. Eine Liste von Paketen, die in das Bundle aufgenommen werden sollen (z. B. `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Optional. Die Version der zu bündelnden Pakete. Wenn nicht angegeben, wird standardmäßig die Version des Intlayer-CLI verwendet.
- `--minify` - Optional. Legt fest, ob die Ausgabe minifiziert werden soll. Standardmäßig `true`.
- `--platform [platform]` - Optional. Die Zielplattform für das Bundle (z. B. `browser`, `node`). Standardmäßig `browser`.
- `--format [format]` - Optional. Das Ausgabeformat für das Bundle (z. B. `esm`, `cjs`, `iife`). Standardmäßig `esm`.

## Gemeinsame Optionen

- `--env-file [envFile]` - Umgebungsdatei.
- `-e, --env [env]` - Umgebung.
- `--base-dir [baseDir]` - Basisverzeichnis.
- `--no-cache` - Cache deaktivieren.
- `--verbose` - Ausführliche Ausgabe.

## Beispiele:

### Ein Bundle für Vanilla JS erstellen:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Dies erstellt eine Datei `intlayer.js`, die sowohl die Pakete `intlayer` als auch `vanilla-intlayer` enthält, minifiziert und im ESM-Format, bereit für die Verwendung im Browser über ein `<script>`-Tag.

### Eine spezifische Version bündeln:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Mit anderem Format bündeln:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Funktionsweise:

1. **Erstellt eine temporäre Umgebung** - Richtet ein temporäres Verzeichnis zur Verwaltung von Abhängigkeiten ein.
2. **Installiert Pakete** - Verwendet `npm` oder `bun` (sofern verfügbar), um die angeforderten Pakete und deren Abhängigkeiten zu installieren.
3. **Generiert einen Einstiegspunkt** - Erstellt eine temporäre Einstiegsdatei, die alle angeforderten Pakete exportiert und sie beim Ausführen im Browser als globale Variablen bereitstellt.
4. **Bündelt mit esbuild** - Verwendet esbuild, um alles in einer einzigen Datei zu bündeln, wobei Minifizierung und Formatierung wie angefordert angewendet werden.
5. **Gibt die Datei aus** - Schreibt das resultierende Bundle in den angegebenen Pfad.

## Globale Variablen

Wenn das Bundle in einem Browser geladen wird, stellt es die angeforderten Pakete als globale Variablen auf dem `window`-Objekt bereit. Die Variablennamen leiten sich von den Paketnamen ab (z. B. wird `intlayer` zu `Intlayer`, `vanilla-intlayer` zu `VanillaIntlayer`).

```javascript
// Zugriff auf Intlayer aus dem Bundle
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
