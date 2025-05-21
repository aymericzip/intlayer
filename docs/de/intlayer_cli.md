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

Das `intlayer-cli`-Paket dient dazu, Ihre [Intlayer-Deklarationen](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md) in Wörterbücher zu transpilieren.

Dieses Paket wird alle Intlayer-Dateien transpilieren, wie z. B. `src/**/*.content.{ts|js|mjs|cjs|json}`. [Erfahren Sie hier, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren können](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Um Intlayer-Wörterbücher zu interpretieren, können Sie Interpreter wie [react-intlayer](https://www.npmjs.com/package/react-intlayer) oder [next-intlayer](https://www.npmjs.com/package/next-intlayer) verwenden.

## Unterstützung für Konfigurationsdateien

Intlayer akzeptiert mehrere Formate für Konfigurationsdateien:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Um zu sehen, wie verfügbare Lokalisierungen oder andere Parameter konfiguriert werden, lesen Sie die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Intlayer-Befehle ausführen

### Wörterbücher erstellen

Um Ihre Wörterbücher zu erstellen, können Sie die folgenden Befehle ausführen:

```bash
npx intlayer dictionaries build
```

oder im Watch-Modus

```bash
npx intlayer dictionaries build --watch
```

Dieser Befehl findet standardmäßig Ihre Deklarationsinhaltsdateien unter `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` und erstellt die Wörterbücher im Verzeichnis `.intlayer`.

### Wörterbücher hochladen

```bash
npx intlayer dictionary push
```

Wenn der [Intlayer-Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) installiert ist, können Sie Wörterbücher auch in den Editor hochladen. Dieser Befehl macht die Wörterbücher im [Editor](https://intlayer.org/dashboard) verfügbar. Auf diese Weise können Sie Ihre Wörterbücher mit Ihrem Team teilen und Inhalte bearbeiten, ohne den Code Ihrer Anwendung zu ändern.

##### Argumente:

- `-d`, `--dictionaries`: IDs der zu übertragenden Wörterbücher. Wenn nicht angegeben, werden alle Wörterbücher übertragen.
  > Beispiel: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Überspringen Sie die Frage, ob die Locale-Verzeichnisse nach dem Übertragen der Wörterbücher gelöscht werden sollen, und löschen Sie sie. Standardmäßig überschreibt das Wörterbuch, wenn es lokal definiert ist, den Inhalt der entfernten Wörterbücher.
  > Beispiel: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Überspringen Sie die Frage, ob die Locale-Verzeichnisse nach dem Übertragen der Wörterbücher gelöscht werden sollen, und behalten Sie sie. Standardmäßig überschreibt das Wörterbuch, wenn es lokal definiert ist, den Inhalt der entfernten Wörterbücher.
  > Beispiel: `npx intlayer dictionary push -k`
- `--env`: Geben Sie die Umgebung an (z.B. `development`, `production`).
- `--env-file`: Stellen Sie eine benutzerdefinierte Umgebungsdatei zum Laden der Variablen bereit.
- `--base-dir`: Geben Sie das Basisverzeichnis des Projekts an.
- `--verbose`: Aktivieren Sie die detaillierte Protokollierung für Debugging-Zwecke.
- `--git-diff`: Nur für Wörterbücher mit nicht übertragenen Änderungen ausführen.
- `--git-diff-base`: Geben Sie die Basis-Referenz für git diff an.
- `--git-diff-current`: Geben Sie die aktuelle Referenz für git diff an.
- `--uncommitted`: Nicht committete Änderungen einschließen.
- `--unpushed`: Nicht übertragene Änderungen einschließen.
- `--untracked`: Nicht verfolgte Dateien einschließen.

### Entfernte Wörterbücher abrufen

```bash
npx intlayer dictionary pull
```

Wenn der [intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) installiert ist, können Sie auch Wörterbücher vom Editor abrufen. Auf diese Weise können Sie den Inhalt Ihrer Wörterbücher für die Anforderungen Ihrer Anwendung überschreiben.

##### Argumente:

- `-d, --dictionaries`: IDs der abzurufenden Wörterbücher. Wenn nicht angegeben, werden alle Wörterbücher abgerufen.
  > Beispiel: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Pfad zum Verzeichnis, in dem die neuen Wörterbücher gespeichert werden sollen. Wenn nicht angegeben, werden die neuen Wörterbücher im Verzeichnis `./intlayer-dictionaries` des Projekts gespeichert. Wenn ein `filePath`-Feld im Inhalt Ihres Wörterbuchs angegeben ist, berücksichtigen die Wörterbücher dieses Argument nicht und werden im angegebenen `filePath`-Verzeichnis gespeichert.
- `--env`: Geben Sie die Umgebung an (z.B. `development`, `production`).
- `--env-file`: Stellen Sie eine benutzerdefinierte Umgebungsdatei zum Laden der Variablen bereit.
- `--base-dir`: Geben Sie das Basisverzeichnis des Projekts an.
- `--verbose`: Aktivieren Sie die detaillierte Protokollierung für Debugging-Zwecke.

##### Beispiel:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Wörterbücher prüfen

```bash
npx intlayer audit
```

Dieser Befehl analysiert Ihre Inhaltsdeklarationsdateien auf potenzielle Probleme wie fehlende Übersetzungen, strukturelle Inkonsistenzen oder Typinkompatibilitäten. Wenn Probleme gefunden werden, wird **intlayer audit** Aktualisierungen vorschlagen oder anwenden, um Ihre Wörterbücher konsistent und vollständig zu halten.

##### Argumente:

- **`-f, --files [files...]`**  
  Eine Liste spezifischer Inhaltsdeklarationsdateien zur Prüfung. Wenn nicht angegeben, werden alle gefundenen `*.content.{ts,js,mjs,cjs,tsx,jsx,json}`-Dateien geprüft.

- **`--exclude [excludedGlobs...]`**  
  Glob-Muster zum Ausschließen von der Prüfung (z.B. `--exclude "src/test/**"`).

- **`--source-locale [sourceLocale]`**  
  Die Quell-Locale, von der übersetzt werden soll. Wenn nicht angegeben, wird die Standard-Locale aus Ihrer Konfiguration verwendet.

- **`--output-locales [outputLocales...]`**  
  Ziel-Locales, in die übersetzt werden soll. Wenn nicht angegeben, werden alle Locales aus Ihrer Konfiguration außer der Quell-Locale verwendet.

- **`--mode [mode]`**  
  Übersetzungsmodus: 'complete', 'review' oder 'missing-only'. Standard ist 'missing-only'.

- **`--git-diff`**  
  Nur für Wörterbücher mit nicht übertragenen Änderungen im Git-Repository ausführen.

- **`--git-diff-base`**  
  Geben Sie die Basis-Referenz für git diff an.

- **`--git-diff-current`**  
  Geben Sie die aktuelle Referenz für git diff an.

- **`--uncommitted`**  
  Nicht committete Änderungen einschließen.

- **`--unpushed`**  
  Nicht übertragene Änderungen einschließen.

- **`--untracked`**  
  Nicht verfolgte Dateien einschließen.

- **`--keys [keys...]`**  
  Wörterbücher basierend auf angegebenen Schlüsseln filtern.

- **`--excluded-keys [excludedKeys...]`**  
  Wörterbücher basierend auf angegebenen Schlüsseln ausschließen.

- **`--path-filter [pathFilters...]`**  
  Wörterbücher basierend auf Glob-Muster für Dateipfade filtern.

- **`--model [model]`**  
  Das KI-Modell für die Übersetzung (z.B. `gpt-3.5-turbo`).

- **`--provider [provider]`**  
  Der KI-Anbieter für die Übersetzung.

- **`--temperature [temperature]`**  
  Temperatur-Einstellung für das KI-Modell.

- **`--api-key [apiKey]`**  
  Stellen Sie Ihren eigenen API-Schlüssel für den KI-Dienst bereit.

- **`--custom-prompt [prompt]`**  
  Stellen Sie einen benutzerdefinierten Prompt für Ihre Übersetzungsanweisungen bereit.

- **`--application-context [applicationContext]`**  
  Stellen Sie zusätzlichen Kontext für die KI-Übersetzung bereit.

- **`--env`**  
  Geben Sie die Umgebung an (z.B. `development`, `production`).

- **`--env-file [envFile]`**  
  Stellen Sie eine benutzerdefinierte Umgebungsdatei zum Laden der Variablen bereit.

- **`--base-dir`**  
  Geben Sie das Basisverzeichnis des Projekts an.

- **`--verbose`**  
  Aktivieren Sie die detaillierte Protokollierung für Debugging-Zwecke.

##### Beispiel:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Dieser Befehl übersetzt Inhalte vom Englischen ins Französische und Spanische für alle Inhaltsdeklarationsdateien im Verzeichnis `src/home/` unter Verwendung des GPT-3.5 Turbo-Modells.

### Konfiguration verwalten

#### Konfiguration abrufen

Der Befehl `get configuration` ruft die aktuelle Konfiguration für Intlayer ab, insbesondere die Locale-Einstellungen. Dies ist nützlich, um Ihre Konfiguration zu überprüfen.

```bash
npx intlayer config get
```

##### Argumente:

- **`--env`**: Geben Sie die Umgebung an (z.B. `development`, `production`).
- **`--env-file`**: Stellen Sie eine benutzerdefinierte Umgebungsdatei zum Laden der Variablen bereit.
- **`--base-dir`**: Geben Sie das Basisverzeichnis des Projekts an.
- **`--verbose`**: Aktivieren Sie die detaillierte Protokollierung für Debugging-Zwecke.

#### Konfiguration übertragen

Der Befehl `push configuration` lädt Ihre Konfiguration in das Intlayer CMS und den Editor hoch. Dieser Schritt ist notwendig, um die Verwendung entfernter Wörterbücher im Intlayer Visual Editor zu aktivieren.

```bash
npx intlayer config push
```

##### Argumente:

- **`--env`**: Geben Sie die Umgebung an (z.B. `development`, `production`).
- **`--env-file`**: Stellen Sie eine benutzerdefinierte Umgebungsdatei zum Laden der Variablen bereit.
- **`--base-dir`**: Geben Sie das Basisverzeichnis des Projekts an.
- **`--verbose`**: Aktivieren Sie die detaillierte Protokollierung für Debugging-Zwecke.

Durch das Übertragen der Konfiguration ist Ihr Projekt vollständig in das Intlayer CMS integriert, was eine nahtlose Wörterbuchverwaltung zwischen Teams ermöglicht.

## Intlayer-Befehle in Ihrer `package.json` verwenden

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
