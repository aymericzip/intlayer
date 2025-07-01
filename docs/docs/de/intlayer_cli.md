---
docName: intlayer_cli
url: https://intlayer.org/doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CLI
description: Entdecken Sie, wie Sie die Intlayer CLI verwenden, um Ihre mehrsprachige Website zu verwalten. Folgen Sie den Schritten in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - CLI
  - Befehlszeilenschnittstelle
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer CLI

## Paket installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Wenn das `intlayer`-Paket bereits installiert ist, wird die CLI automatisch installiert. Sie können diesen Schritt überspringen.

## intlayer-cli Paket

Das `intlayer-cli` Paket dient dazu, Ihre [intlayer-Deklarationen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md) in Wörterbücher zu transpiliieren.

Dieses Paket transpiliert alle intlayer-Dateien, wie z.B. `src/**/*.content.{ts|js|mjs|cjs|json}`. [Siehe, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Um intlayer-Wörterbücher zu interpretieren, können Sie Interpreter verwenden, wie z.B. [react-intlayer](https://www.npmjs.com/package/react-intlayer) oder [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Unterstützung für Konfigurationsdateien

Intlayer akzeptiert mehrere Konfigurationsdateiformate:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Um zu sehen, wie verfügbare Sprachen oder andere Parameter konfiguriert werden, siehe die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## CLI SDK

Das CLI SDK ist eine Bibliothek, die es Ihnen ermöglicht, die Intlayer CLI in Ihrem eigenen Code zu verwenden.

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
```

Beispiel für die Verwendung:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Intlayer-Befehle ausführen

### Wörterbücher erstellen

Um Ihre Wörterbücher zu erstellen, können Sie die folgenden Befehle ausführen:

```bash
npx intlayer build
```

oder im Überwachungsmodus

```bash
npx intlayer build --watch
```

Dieser Befehl findet standardmäßig Ihre Deklarationsinhaltsdateien unter `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` und erstellt die Wörterbücher im Verzeichnis `.intlayer`.

##### Aliase:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Wörterbücher hochladen

```bash
npx intlayer dictionary push
```

Wenn der [intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) installiert ist, können Sie Wörterbücher auch an den Editor senden. Dieser Befehl ermöglicht es, die Wörterbücher im [Editor](https://intlayer.org/dashboard) verfügbar zu machen. Auf diese Weise können Sie Ihre Wörterbücher mit Ihrem Team teilen und Ihre Inhalte bearbeiten, ohne den Code Ihrer Anwendung ändern zu müssen.

##### Aliase:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argumente:

- `-d`, `--dictionaries`: IDs der Wörterbücher, die gepusht werden sollen. Wenn nicht angegeben, werden alle Wörterbücher gepusht.
  > Beispiel: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Überspringt die Frage, ob die Verzeichnisse der Sprachen gelöscht werden sollen, nachdem die Wörterbücher hochgeladen wurden, und entfernt sie. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der entfernten Wörterbücher überschrieben.
  > Beispiel: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Überspringt die Frage, ob die Verzeichnisse der Sprachen gelöscht werden sollen, nachdem die Wörterbücher hochgeladen wurden, und behält sie. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der entfernten Wörterbücher überschrieben.
  > Beispiel: `npx intlayer dictionary push -k`
- `--env`: Gibt die Umgebung an (z.B. `development`, `production`).
- `--env-file`: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- `--base-dir`: Gibt das Basisverzeichnis für das Projekt an.
- `--verbose`: Aktiviert ausführliche Protokollierung zur Fehlerbehebung.
- `--git-diff`: Führt den Befehl nur für Wörterbücher aus, die Änderungen vom Basis-Branch (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.
- `--git-diff-base`: Gibt die Basis-Referenz für den Git-Diff an (Standard `origin/main`).
- `--git-diff-current`: Gibt die aktuelle Referenz für den Git-Diff an (Standard: `HEAD`).
- `--uncommitted`: Bezieht nicht festgeschriebene Änderungen mit ein.
- `--unpushed`: Bezieht nicht gepushte Änderungen mit ein.
- `--untracked`: Bezieht nicht verfolgte Dateien mit ein.

### Entfernte Wörterbücher abrufen

```bash
npx intlayer pull
```

Wenn der [intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) installiert ist, können Sie auch Wörterbücher aus dem Editor abrufen. Auf diese Weise können Sie den Inhalt Ihrer Wörterbücher für die Bedürfnisse Ihrer Anwendung überschreiben.

##### Aliase:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argumente:

- `-d, --dictionaries`: IDs der abzurufenden Wörterbücher. Wenn nicht angegeben, werden alle Wörterbücher abgerufen.
  > Beispiel: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Pfad zum Verzeichnis, in dem die neuen Wörterbücher gespeichert werden. Wenn nicht angegeben, werden die neuen Wörterbücher im Verzeichnis `./intlayer-dictionaries` des Projekts gespeichert. Wenn in Ihrem Wörterbuchinhalt ein `filePath`-Feld angegeben ist, wird dieses Argument von den Wörterbüchern nicht berücksichtigt und sie werden im angegebenen `filePath`-Verzeichnis gespeichert.
- `--env`: Gibt die Umgebung an (z. B. `development`, `production`).
- `--env-file`: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- `--base-dir`: Gibt das Basisverzeichnis für das Projekt an.
- `--verbose`: Aktiviert ausführliche Protokollierung zur Fehlerbehebung.

##### Beispiel:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Wörterbücher füllen / prüfen / übersetzen

```bash
npx intlayer fill
```

Dieser Befehl analysiert Ihre Inhaltsdeklarationsdateien auf mögliche Probleme wie fehlende Übersetzungen, strukturelle Inkonsistenzen oder Typabweichungen. Wenn Probleme gefunden werden, schlägt **intlayer fill** Aktualisierungen vor oder wendet sie an, um Ihre Wörterbücher konsistent und vollständig zu halten.

##### Aliase:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argumente:

- `-f, --file [files...]`
  Eine Liste spezifischer Inhaltsdeklarationsdateien, die geprüft werden sollen. Wenn nicht angegeben, werden alle gefundenen `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` Dateien geprüft.

- `--exclude [excludedGlobs...]`
  Globs-Muster, die von der Prüfung ausgeschlossen werden sollen (z.B. `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`
  Die Quellsprache, aus der übersetzt werden soll. Wenn nicht angegeben, wird die Standardsprache aus Ihrer Konfiguration verwendet.

- `--output-locales [outputLocales...]`
  Zielsprachen, in die übersetzt werden soll. Wenn nicht angegeben, werden alle Sprachen aus Ihrer Konfiguration verwendet, außer der Quellsprache.

- `--mode [mode]`
  Übersetzungsmodus: 'complete', 'review' oder 'missing-only'. Standard ist 'missing-only'.

- `--git-diff`
  Filtert Wörterbücher, die Änderungen vom Basis-Branch (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.

- `--git-diff-base`
  Gibt die Basisreferenz für den Git-Diff an (Standard `origin/main`).

- `--git-diff-current`
  Gibt die aktuelle Referenz für den Git-Diff an (Standard: `HEAD`).

- `--uncommitted`
  Filtert Wörterbücher, die nicht committete Änderungen enthalten.

- `--unpushed`
- Filtert Wörterbücher, die unübertragene Änderungen enthalten.

- `--untracked`
  Filtert Wörterbücher, die nicht verfolgte Dateien enthalten.

- `--keys [keys...]`
  Filtert Wörterbücher basierend auf angegebenen Schlüsseln.

- `--excluded-keys [excludedKeys...]`
  Schließt Wörterbücher basierend auf angegebenen Schlüsseln aus.

- `--path-filter [pathFilters...]`
  Filtert Wörterbücher basierend auf einem Glob-Muster für Dateipfade.

- `--model [model]`
  Das KI-Modell, das für die Übersetzung verwendet wird (z. B. `gpt-3.5-turbo`).

- `--provider [provider]`
  Der KI-Anbieter, der für die Übersetzung verwendet wird.

- `--temperature [temperature]`
  Temperatureinstellung für das KI-Modell.

- `--api-key [apiKey]`
  Geben Sie Ihren eigenen API-Schlüssel für den KI-Dienst an.

- `--custom-prompt [prompt]`
  Geben Sie eine benutzerdefinierte Eingabeaufforderung für Ihre Übersetzungsanweisungen an.
- `--application-context [applicationContext]`  
  Zusätzlichen Kontext für die KI-Übersetzung bereitstellen.

- `--env`  
  Die Umgebung angeben (z.B. `development`, `production`).

- `--env-file [envFile]`  
  Eine benutzerdefinierte Umgebungsdatei zum Laden von Variablen bereitstellen.

- `--base-dir`  
  Das Basisverzeichnis für das Projekt angeben.

- `--verbose`  
  Ausführliche Protokollierung zur Fehlerbehebung aktivieren.

##### Beispiel:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Dieser Befehl übersetzt Inhalte von Englisch nach Französisch und Spanisch für alle Inhaltsdeklarationsdateien im Verzeichnis `src/home/` unter Verwendung des GPT-3.5 Turbo Modells.

### Konfiguration verwalten

#### Konfiguration abrufen

Der Befehl `configuration get` ruft die aktuelle Konfiguration für Intlayer ab, insbesondere die Locale-Einstellungen. Dies ist nützlich, um Ihre Einrichtung zu überprüfen.

```bash
npx intlayer configuration get
```

##### Aliase:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Argumente:

- **`--env`**: Gibt die Umgebung an (z. B. `development`, `production`).
- **`--env-file`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an.
- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung.

#### Konfiguration hochladen

Der Befehl `configuration push` lädt Ihre Konfiguration in das Intlayer CMS und den Editor hoch. Dieser Schritt ist notwendig, um die Verwendung entfernter Wörterbücher im Intlayer Visual Editor zu ermöglichen.

```bash
npx intlayer configuration push
```

##### Aliase:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Argumente:

- **`--env`**: Gibt die Umgebung an (z. B. `development`, `production`).
- **`--env-file`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an.
- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung.

Durch das Pushen der Konfiguration ist Ihr Projekt vollständig in das Intlayer CMS integriert, was eine nahtlose Verwaltung von Wörterbüchern über Teams hinweg ermöglicht.

### Dokumentationsverwaltung

Die `doc`-Befehle bieten Werkzeuge zur Verwaltung und Übersetzung von Dokumentationsdateien in mehreren Sprachen.

#### Dokumentation übersetzen

Der Befehl `doc translate` übersetzt automatisch Dokumentationsdateien von einer Basissprache in Zielsprachen mithilfe von KI-Übersetzungsdiensten.

```bash
npx intlayer doc translate
```

##### Argumente:

- **`--doc-pattern [docPattern...]`**: Glob-Muster, um die zu übersetzenden Dokumentationsdateien auszuwählen.
  > Beispiel: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Glob-Muster, um Dateien von der Übersetzung auszuschließen.
  > Beispiel: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Anzahl der Dateien, die gleichzeitig zur Übersetzung verarbeitet werden.
  > Beispiel: `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**: Ziel-Lokalisierungen, in die die Dokumentation übersetzt werden soll.
  > Beispiel: `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**: Ausgangslokalisierung, von der übersetzt wird.
  > Beispiel: `npx intlayer doc translate --base-locale en`
- **`--model [model]`**: Das für die Übersetzung zu verwendende KI-Modell (z. B. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Der KI-Anbieter, der für die Übersetzung verwendet wird.
- **`--temperature [temperature]`**: Temperatureinstellung für das KI-Modell.
- **`--api-key [apiKey]`**: Eigener API-Schlüssel für den KI-Dienst.
- **`--custom-prompt [prompt]`**: Eigene Eingabeaufforderung für Übersetzungsanweisungen.
- **`--application-context [applicationContext]`**: Zusätzlicher Kontext für die KI-Übersetzung.
- **`--env`**: Gibt die Umgebung an (z.B. `development`, `production`).
- **`--env-file [envFile]`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an.
- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung.
- **`--custom-instructions [customInstructions]`**: Benutzerdefinierte Anweisungen, die dem Prompt hinzugefügt werden. Nützlich, um spezifische Regeln bezüglich Formatierung, URL-Übersetzung usw. anzuwenden.

##### Beispiel:

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> Beachten Sie, dass der Ausgabedateipfad durch Ersetzen der folgenden Muster bestimmt wird
>
> - `/{{baseLocale}}/` durch `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` durch `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` durch `_{{locale}}.`
> - `{{baseLocale}}_` durch `{{locale}}_`
> - `.{{baseLocaleName}}.` durch `.{{localeName}}.`
>
> Wenn das Muster nicht gefunden wird, fügt die Ausgabedatei die Endung `.{{locale}}` an den Dateiendungen hinzu. `./my/file.md` wird für die französische Locale zu `./my/file.fr.md` übersetzt.

#### Dokumentation überprüfen

Der Befehl `doc review` analysiert Dokumentationsdateien auf Qualität, Konsistenz und Vollständigkeit über verschiedene Sprachen hinweg.

```bash
npx intlayer doc review
```

##### Argumente:

Der Befehl `doc review` akzeptiert dieselben Argumente wie `doc translate`, sodass Sie bestimmte Dokumentationsdateien überprüfen und Qualitätsprüfungen anwenden können.

##### Beispiel:

```bash
npx intlayer doc review
 --doc-pattern "docs/de/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

## Verwenden von intlayer-Befehlen in Ihrer `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## Intlayer-Befehl debuggen

### 1. **Stellen Sie sicher, dass Sie die neueste Version verwenden**

Führen Sie aus:

```bash
npx intlayer --version                  # aktuelle lokale intlayer-Version
npx intlayer@latest --version           # aktuellste intlayer-Version
```

### 2. **Überprüfen, ob der Befehl registriert ist**

Sie können dies überprüfen mit:

```bash
npx intlayer --help                     # Zeigt die Liste der verfügbaren Befehle und Nutzungsinformationen an
npx intlayer dictionary build --help    # Zeigt die Liste der verfügbaren Optionen für einen Befehl an
```

### 3. **Starten Sie Ihr Terminal neu**

Manchmal ist ein Neustart des Terminals erforderlich, damit neue Befehle erkannt werden.

### 4. **Leeren Sie den npx-Cache (wenn Sie mit einer älteren Version feststecken)**

```bash
npx clear-npx-cache
```

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Historie initialisiert
