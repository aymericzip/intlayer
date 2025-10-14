---
createdAt: 2024-08-11
updatedAt: 2025-07-11
title: CLI
description: Entdecken Sie, wie Sie die Intlayer CLI verwenden, um Ihre mehrsprachige Website zu verwalten. Folgen Sie den Schritten in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - CLI
  - Kommandozeilenschnittstelle
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 5.5.11
    date: 2025-07-11
    changes: Aktualisierung der Dokumentation zu CLI-Befehlsparametern
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
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

Das `intlayer-cli` Paket dient dazu, Ihre [intlayer Deklarationen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md) in Wörterbücher zu transpillieren.

Dieses Paket transpilliert alle Intlayer-Dateien, wie z.B. `src/**/*.content.{ts|js|mjs|cjs|json}`. [Siehe, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Um Intlayer-Wörterbücher zu interpretieren, können Sie Interpreter verwenden, wie z.B. [react-intlayer](https://www.npmjs.com/package/react-intlayer) oder [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Unterstützung von Konfigurationsdateien

Intlayer akzeptiert mehrere Formate für Konfigurationsdateien:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Um zu sehen, wie verfügbare Sprachen oder andere Parameter konfiguriert werden, lesen Sie die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## Intlayer-Befehle ausführen

### Wörterbücher erstellen

Um Ihre Wörterbücher zu erstellen, können Sie die folgenden Befehle ausführen:

```bash
npx intlayer build
```

oder im Watch-Modus

```bash
npx intlayer build --watch
```

Dieser Befehl findet standardmäßig Ihre Deklarations-Content-Dateien unter `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` und erstellt die Wörterbücher im Verzeichnis `.intlayer`.

##### Aliase:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Wörterbücher pushen

```bash
bash
npx intlayer dictionary push
```

Wenn der [intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) installiert ist, können Sie Wörterbücher auch an den Editor senden. Dieser Befehl ermöglicht es, die Wörterbücher im [Editor](https://intlayer.org/dashboard) verfügbar zu machen. So können Sie Ihre Wörterbücher mit Ihrem Team teilen und Ihre Inhalte bearbeiten, ohne den Code Ihrer Anwendung ändern zu müssen.

##### Aliase:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argumente:

**Wörterbuch-Optionen:**

- **`-d`, `--dictionaries`**: IDs der Wörterbücher, die gepusht werden sollen. Wenn nicht angegeben, werden alle Wörterbücher gepusht.

  > Beispiel: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**Konfigurationsoptionen:**

- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an. Um die intlayer-Konfiguration zu laden, sucht der Befehl im Basisverzeichnis nach der Datei `intlayer.config.{ts,js,json,cjs,mjs}`.

  > Beispiel: `npx intlayer dictionary push --env-file .env.production.local`

**Optionen für Umgebungsvariablen:**

- **`--env`**: Gibt die Umgebung an (z. B. `development`, `production`). Nützlich, wenn Sie Umgebungsvariablen in Ihrer intlayer-Konfigurationsdatei verwenden.
- **`--env-file`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden sollen. Nützlich, wenn Sie Umgebungsvariablen in Ihrer intlayer-Konfigurationsdatei verwenden.

  > Beispiel: `npx intlayer dictionary push --env-file .env.production.local`

  > Beispiel: `npx intlayer dictionary push --env production`

**Ausgabeoptionen:**

- **`-r`, `--delete-locale-dictionary`**: Überspringt die Frage, ob die Verzeichnisse der Sprachen gelöscht werden sollen, nachdem die Wörterbücher hochgeladen wurden, und entfernt diese. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der entfernten Wörterbücher überschrieben.

  > Beispiel: `npx intlayer dictionary push -r`

  > Beispiel: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Überspringt die Frage, ob die Verzeichnisse der Sprachen gelöscht werden sollen, nachdem die Wörterbücher hochgeladen wurden, und behält diese bei. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der entfernten Wörterbücher überschrieben.

  > Beispiel: `npx intlayer dictionary push -k`

  > Beispiel: `npx intlayer dictionary push --keep-locale-dictionary`

**Protokolloptionen:**

- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung.

**Git-Optionen:**

- **`--git-diff`**: Führt den Befehl nur für Wörterbücher aus, die Änderungen vom Basis-Branch (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.
- **`--git-diff-base`**: Gibt die Basis-Referenz für den Git-Diff an (Standard `origin/main`).
- **`--git-diff-current`**: Gibt die aktuelle Referenz für den Git-Diff an (Standard: `HEAD`).
- **`--uncommitted`**: Bezieht nicht festgeschriebene Änderungen mit ein.
- **`--unpushed`**: Bezieht nicht gepushte Änderungen mit ein.
- **`--untracked`**: Bezieht nicht verfolgte Dateien mit ein.

  > Beispiel: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Beispiel: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Entfernte Wörterbücher abrufen

```bash
npx intlayer pull
```

Wenn der [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) installiert ist, können Sie Wörterbücher auch direkt aus dem Editor abrufen. Auf diese Weise können Sie den Inhalt Ihrer Wörterbücher für die Anforderungen Ihrer Anwendung überschreiben.

##### Aliase:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argumente:

**Wörterbuch-Optionen:**

- **`-d, --dictionaries`**: IDs der Wörterbücher, die abgerufen werden sollen. Wenn nicht angegeben, werden alle Wörterbücher abgerufen.

  > Beispiel: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**Konfigurationsoptionen:**

- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an. Um die Intlayer-Konfiguration abzurufen, sucht der Befehl im Basisverzeichnis nach der Datei `intlayer.config.{ts,js,json,cjs,mjs}`.

  > Beispiel: `npx intlayer dictionary push --env-file .env.production.local`

**Optionen für Umgebungsvariablen:**

- **`--env`**: Gibt die Umgebung an (z. B. `development`, `production`).
- **`--env-file`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an. Um die Intlayer-Konfiguration abzurufen, sucht der Befehl im Basisverzeichnis nach der Datei `intlayer.config.{ts,js,json,cjs,mjs}`.

  > Beispiel: `npx intlayer dictionary push --env-file .env.production.local`

  > Beispiel: `npx intlayer dictionary push --env production`

**Ausgabeoptionen:**

- **`--new-dictionaries-path`**: Pfad zum Verzeichnis, in dem die neuen Wörterbücher gespeichert werden. Wenn nicht angegeben, werden die neuen Wörterbücher im Verzeichnis `./intlayer-dictionaries` des Projekts gespeichert. Wenn in Ihrem Wörterbuchinhalt ein `filePath`-Feld angegeben ist, wird dieses Argument von den Wörterbüchern nicht berücksichtigt und die Wörterbücher werden im angegebenen `filePath`-Verzeichnis gespeichert.

**Protokollierungsoptionen:**

- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung.

##### Beispiel:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Wörterbücher füllen / prüfen / übersetzen

```bash
npx intlayer fill
```

Dieser Befehl analysiert Ihre Content-Deklarationsdateien auf potenzielle Probleme wie fehlende Übersetzungen, strukturelle Inkonsistenzen oder Typinkompatibilitäten. Wenn Probleme gefunden werden, wird **intlayer fill** Aktualisierungen vorschlagen oder anwenden, um Ihre Wörterbücher konsistent und vollständig zu halten.

##### Aliase:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argumente:

**Optionen für die Dateiliste:**

- **`-f, --file [files...]`**: Eine Liste spezifischer Content-Deklarationsdateien, die geprüft werden sollen. Wenn nicht angegeben, werden alle entdeckten `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` basierend auf Ihrer Konfigurationsdatei geprüft.

  > Beispiel: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtert Wörterbücher basierend auf Schlüsseln. Wenn nicht angegeben, werden alle Wörterbücher geprüft.

  > Beispiel: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Schließt Wörterbücher basierend auf Schlüsseln aus. Wenn nicht angegeben, werden alle Wörterbücher geprüft.

  > Beispiel: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: Filtert Wörterbücher basierend auf einem Glob-Muster für Dateipfade.

  > Beispiel: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Optionen für die Ausgabe der Einträge:**

- **`--source-locale [sourceLocale]`**: Die Quellsprache, aus der übersetzt werden soll. Wenn nicht angegeben, wird die Standardsprache aus Ihrer Konfiguration verwendet.

- **`--output-locales [outputLocales...]`**: Ziel-Lokalisierungen, in die übersetzt werden soll. Wenn nicht angegeben, werden alle Lokalisierungen aus Ihrer Konfiguration verwendet, außer der Quell-Lokalisierung.

- **`--mode [mode]`**: Übersetzungsmodus: 'complete' (vollständig), 'review' (Überprüfung) oder 'missing-only' (nur fehlende). Standard ist 'missing-only'.

**Git-Optionen:**

- **`--git-diff`**: Nur auf Wörterbücher anwenden, die Änderungen vom Basis-Branch (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.
- **`--git-diff-base`**: Basis-Referenz für den Git-Diff angeben (Standard `origin/main`).
- **`--git-diff-current`**: Aktuelle Referenz für den Git-Diff angeben (Standard: `HEAD`).
- **`--uncommitted`**: Uncommittete Änderungen einbeziehen.
- **`--unpushed`**: Nicht gepushte Änderungen einbeziehen.
- **`--untracked`**: Nicht verfolgte Dateien einbeziehen.

  > Beispiel: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Beispiel: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**KI-Optionen:**

- **`--model [model]`**: Das KI-Modell, das für die Übersetzung verwendet werden soll (z.B. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Der KI-Anbieter, der für die Übersetzung verwendet werden soll.
- **`--temperature [temperature]`**: Temperatureinstellung für das KI-Modell.
- **`--api-key [apiKey]`**: Geben Sie Ihren eigenen API-Schlüssel für den KI-Dienst an.
- **`--custom-prompt [prompt]`**: Geben Sie eine benutzerdefinierte Eingabeaufforderung für Ihre Übersetzungsanweisungen an.
- **`--application-context [applicationContext]`**: Geben Sie zusätzlichen Kontext für die KI-Übersetzung an.

  > Beispiel: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Meine Anwendung ist ein Katzenladen"`

**Optionen für Umgebungsvariablen:**

- **`--env`**: Gibt die Umgebung an (z. B. `development`, `production`).
- **`--env-file [envFile]`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.

  > Beispiel: `npx intlayer fill --env-file .env.production.local`

  > Beispiel: `npx intlayer fill --env production`

**Konfigurationsoptionen:**

- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an.

  > Beispiel: `npx intlayer fill --base-dir ./src`

**Protokollierungsoptionen:**

- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung.

##### Beispiel:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Dieser Befehl übersetzt Inhalte von Englisch ins Französische und Spanische für alle Inhaltsdeklarationsdateien im Verzeichnis `src/home/` unter Verwendung des GPT-3.5 Turbo Modells.

### Konfiguration verwalten

#### Konfiguration abrufen

Der Befehl `configuration get` ruft die aktuelle Konfiguration von Intlayer ab, insbesondere die Locale-Einstellungen. Dies ist nützlich, um Ihre Einrichtung zu überprüfen.

```bash
npx intlayer configuration get
```

##### Aliase:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Argumente:

- **`--env`**: Geben Sie die Umgebung an (z.B. `development`, `production`).
- **`--env-file`**: Geben Sie eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an.
- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung.

#### Konfiguration pushen

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

Die `doc`-Befehle bieten Werkzeuge zur Verwaltung und Übersetzung von Dokumentationsdateien in mehreren Sprachversionen.

#### Dokumentation übersetzen

Der Befehl `doc translate` übersetzt Dokumentationsdateien automatisch von einer Basissprache in Zielsprachen mithilfe von KI-Übersetzungsdiensten.

```bash
npx intlayer doc translate
```

##### Argumente:

**Optionen für die Dateiliste:**

- **`--doc-pattern [docPattern...]`**: Glob-Muster, um Dokumentationsdateien zum Übersetzen auszuwählen.

  > Beispiel: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Glob-Muster, die von der Übersetzung ausgeschlossen werden sollen.

  > Beispiel: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Überspringe die Datei, wenn sie vor dem angegebenen Zeitpunkt geändert wurde.

  - Kann eine absolute Zeit wie "2025-12-05" sein (String oder Date)
  - Kann eine relative Zeit in ms sein `1 * 60 * 60 * 1000` (1 Stunde)
  - Diese Option prüft die Aktualisierungszeit der Datei mit der Methode `fs.stat`. Daher kann sie durch Git oder andere Tools, die die Datei ändern, beeinflusst werden.

  > Beispiel: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Überspringe die Datei, wenn sie innerhalb des angegebenen Zeitraums geändert wurde.

  - Kann eine absolute Zeit sein wie "2025-12-05" (String oder Date)
  - Kann eine relative Zeit in ms sein `1 * 60 * 60 * 1000` (1 Stunde)
  - Diese Option überprüft die Aktualisierungszeit der Datei mit der Methode `fs.stat`. Daher kann sie durch Git oder andere Tools, die die Datei ändern, beeinflusst werden.

  > Beispiel: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**Optionen für die Ausgabe:**

- **`--locales [locales...]`**: Ziel-Lokalisierungen, in die die Dokumentation übersetzt werden soll.

  > Beispiel: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Quell-Lokalisierung, aus der übersetzt werden soll.

  > Beispiel: `npx intlayer doc translate --base-locale en`

**Optionen zur Dateiverarbeitung:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Anzahl der Dateien, die gleichzeitig für die Übersetzung verarbeitet werden sollen.

  > Beispiel: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**KI-Optionen:**

- **`--model [model]`**: Das KI-Modell, das für die Übersetzung verwendet werden soll (z. B. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Der KI-Anbieter, der für die Übersetzung verwendet werden soll.
- **`--temperature [temperature]`**: Temperatureinstellung für das KI-Modell.
- **`--api-key [apiKey]`**: Eigener API-Schlüssel für den KI-Dienst.
- **`--application-context [applicationContext]`**: Zusätzlicher Kontext für die KI-Übersetzung.
- **`--custom-prompt [prompt]`**: Passen Sie den Basis-Prompt für die Übersetzung an. (Hinweis: Für die meisten Anwendungsfälle wird stattdessen die Option `--custom-instructions` empfohlen, da sie eine bessere Kontrolle über das Übersetzungsverhalten bietet.)

  > Beispiel: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Meine Anwendung ist ein Katzenladen"`

**Optionen für Umgebungsvariablen:**

- **`--env`**: Geben Sie die Umgebung an (z. B. `development`, `production`).
- **`--env-file [envFile]`**: Geben Sie eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Geben Sie das Basisverzeichnis für das Projekt an.

  > Beispiel: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Protokollierungsoptionen:**

- **`--verbose`**: Aktivieren Sie ausführliche Protokollierung zur Fehlerbehebung.

  > Beispiel: `npx intlayer doc translate --verbose`

**Optionen für benutzerdefinierte Anweisungen:**

- **`--custom-instructions [customInstructions]`**: Benutzerdefinierte Anweisungen, die dem Prompt hinzugefügt werden. Nützlich, um spezifische Regeln bezüglich Formatierung, URL-Übersetzung usw. anzuwenden.

  - Kann eine absolute Zeit wie "2025-12-05" (String oder Datum) sein
  - Kann eine relative Zeit in ms `1 * 60 * 60 * 1000` (1 Stunde) sein
  - Diese Option überprüft die Aktualisierungszeit der Datei mit der Methode `fs.stat`. Daher kann sie von Git oder anderen Tools beeinflusst werden, die die Datei ändern.

  > Beispiel: `npx intlayer doc translate --custom-instructions "Vermeide die Übersetzung von URLs und behalte das Markdown-Format bei"`

  > Beispiel: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git-Optionen:**

- **`--git-diff`**: Nur auf Wörterbüchern ausführen, die Änderungen vom Basis-Branch (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.
- **`--git-diff-base`**: Basis-Referenz für den Git-Diff angeben (Standard `origin/main`).
- **`--git-diff-current`**: Aktuelle Referenz für den Git-Diff angeben (Standard: `HEAD`).
- **`--uncommitted`**: Uncommittete Änderungen einbeziehen.
- **`--unpushed`**: Nicht gepushte Änderungen einbeziehen.
- **`--untracked`**: Nicht verfolgte Dateien einbeziehen.

  > Beispiel: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Beispiel: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Beachten Sie, dass der Ausgabedateipfad durch Ersetzen der folgenden Muster bestimmt wird
>
> - `/{{baseLocale}}/` wird durch `/{{locale}}/` ersetzt (Unix)
> - `\{{baseLocale}}\` wird durch `\{{locale}}\` ersetzt (Windows)
> - `_{{baseLocale}}.` wird durch `_{{locale}}.` ersetzt
> - `{{baseLocale}}_` wird durch `{{locale}}_` ersetzt
> - `.{{baseLocaleName}}.` wird durch `.{{localeName}}.` ersetzt
>
> Wenn das Muster nicht gefunden wird, wird die Ausgabedatei die Endung `.{{locale}}` erhalten. `./my/file.md` wird für die französische Locale zu `./my/file.fr.md` übersetzt.

#### Dokumentation überprüfen

Der Befehl `doc review` analysiert Dokumentationsdateien auf Qualität, Konsistenz und Vollständigkeit über verschiedene Sprachen hinweg.

```bash
npx intlayer doc review
```

Er kann verwendet werden, um bereits übersetzte Dateien zu überprüfen und zu kontrollieren, ob die Übersetzung korrekt ist.

Für die meisten Anwendungsfälle,

- Verwenden Sie bevorzugt den Befehl `doc translate`, wenn die übersetzte Version dieser Datei nicht verfügbar ist.
- Verwenden Sie bevorzugt den Befehl `doc review`, wenn die übersetzte Version dieser Datei bereits existiert.

> Beachten Sie, dass der Überprüfungsprozess mehr Eingabetoken verbraucht als der Übersetzungsprozess, um dieselbe Datei vollständig zu überprüfen. Der Überprüfungsprozess optimiert jedoch die zu überprüfenden Abschnitte und überspringt die Teile, die nicht geändert wurden.

##### Argumente:

Der Befehl `doc review` akzeptiert dieselben Argumente wie `doc translate`, sodass Sie bestimmte Dokumentationsdateien überprüfen und Qualitätsprüfungen anwenden können.

Wenn Sie eine der Git-Optionen aktiviert haben, überprüft der Befehl nur den Teil der Dateien, der geändert wird. Das Skript verarbeitet die Datei, indem es sie in Abschnitte unterteilt, und überprüft jeden Abschnitt. Wenn es in einem Abschnitt keine Änderungen gibt, überspringt das Skript diesen, um den Überprüfungsprozess zu beschleunigen und die Kosten für die AI-Provider-API zu begrenzen.

## Verwendung der Intlayer-Befehle in Ihrer `package.json`

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

## CLI SDK

Das CLI SDK ist eine Bibliothek, die es Ihnen ermöglicht, das Intlayer CLI in Ihrem eigenen Code zu verwenden.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
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

## Intlayer-Befehl debuggen

### 1. **Stellen Sie sicher, dass Sie die neueste Version verwenden**

Führen Sie aus:

```bash
npx intlayer --version                  # aktuelle lokale Intlayer-Version
npx intlayer@latest --version           # aktuellste Intlayer-Version
```

### 2. **Überprüfen, ob der Befehl registriert ist**

Sie können dies überprüfen mit:

```bash
npx intlayer --help                     # Zeigt die Liste der verfügbaren Befehle und Nutzungshinweise an
npx intlayer dictionary build --help    # Zeigt die Liste der verfügbaren Optionen für einen Befehl an
```

### 3. **Starten Sie Ihr Terminal neu**

Manchmal ist ein Neustart des Terminals erforderlich, damit neue Befehle erkannt werden.

### 4. **Leeren Sie den npx-Cache (wenn Sie bei einer älteren Version hängen bleiben)**

```bash
npx clear-npx-cache
```
