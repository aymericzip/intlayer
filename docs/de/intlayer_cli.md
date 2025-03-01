# Intlayer CLI

## Paket installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
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
npx intlayer build
```

oder im Watch-Modus

```bash
npx intlayer build --watch
```

Dieser Befehl findet standardmäßig Ihre Deklarationsinhaltsdateien unter `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` und erstellt die Wörterbücher im Verzeichnis `.intlayer`.

### Wörterbücher hochladen

```bash
npx intlayer dictionary push
```

Wenn der [Intlayer-Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) installiert ist, können Sie Wörterbücher auch in den Editor hochladen. Dieser Befehl macht die Wörterbücher im [Editor](https://intlayer.org/dashboard) verfügbar. Auf diese Weise können Sie Ihre Wörterbücher mit Ihrem Team teilen und Inhalte bearbeiten, ohne den Code Ihrer Anwendung zu ändern.

##### Argumente:

- `-d`, `--dictionaries`: IDs der Wörterbücher, die hochgeladen werden sollen. Wenn nicht angegeben, werden alle Wörterbücher hochgeladen.
  > Beispiel: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Überspringt die Frage, ob die Lokalisierungsverzeichnisse nach dem Hochladen der Wörterbücher gelöscht werden sollen, und entfernt sie. Standardmäßig wird der lokale Wörterbuchinhalt überschrieben, wenn das Wörterbuch lokal definiert ist.
  > Beispiel: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Überspringt die Frage, ob die Lokalisierungsverzeichnisse nach dem Hochladen der Wörterbücher gelöscht werden sollen, und behält sie bei. Standardmäßig wird der lokale Wörterbuchinhalt überschrieben, wenn das Wörterbuch lokal definiert ist.
  > Beispiel: `npx intlayer dictionary push -k`

### Entfernte Wörterbücher abrufen

```bash
npx intlayer dictionary pull
```

Wenn der [Intlayer-Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) installiert ist, können Sie Wörterbücher auch aus dem Editor abrufen. Auf diese Weise können Sie den Inhalt Ihrer Wörterbücher für die Anforderungen Ihrer Anwendung überschreiben.

##### Argumente:

- `-d, --dictionaries`: IDs der Wörterbücher, die abgerufen werden sollen. Wenn nicht angegeben, werden alle Wörterbücher abgerufen.
  > Beispiel: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Pfad zum Verzeichnis, in dem die neuen Wörterbücher gespeichert werden. Wenn nicht angegeben, werden die neuen Wörterbücher im Verzeichnis `./intlayer-dictionaries` des Projekts gespeichert. Wenn ein `filePath`-Feld in Ihrem Wörterbuchinhalt angegeben ist, wird dieses Argument ignoriert und die Wörterbücher werden im angegebenen `filePath`-Verzeichnis gespeichert.

##### Beispiel:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Wörterbücher prüfen

```bash
npx intlayer audit
```

Dieser Befehl analysiert Ihre Inhaltsdeklarationsdateien auf potenzielle Probleme wie fehlende Übersetzungen, strukturelle Inkonsistenzen oder Typabweichungen. Wenn Probleme gefunden werden, schlägt **intlayer audit** Updates vor oder wendet sie an, um Ihre Wörterbücher konsistent und vollständig zu halten.

##### Argumente:

- **`-f, --files [files...]`**  
  Eine Liste spezifischer Inhaltsdeklarationsdateien, die geprüft werden sollen. Wenn nicht angegeben, werden alle gefundenen `*.content.{ts,js,mjs,cjs,tsx,jsx,json}`-Dateien geprüft.

- **`--exclude [excludedGlobs...]`**  
  Glob-Muster, die von der Prüfung ausgeschlossen werden sollen (z. B. `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  Das ChatGPT-Modell, das für die Prüfung verwendet werden soll (z. B. `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Benutzerdefinierte Eingabeaufforderung für Ihre Prüfungsanweisungen bereitstellen.

- **`-l, --async-limit [asyncLimit]`**  
  Maximale Anzahl von Dateien, die gleichzeitig verarbeitet werden sollen.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Eigener OpenAI-API-Schlüssel, um die OAuth2-Authentifizierung zu umgehen.

##### Beispiel:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Dieser Befehl ignoriert alle Dateien unter `tests/**` und verwendet das Modell `gpt-3.5-turbo`, um die gefundenen Inhaltsdeklarationsdateien zu prüfen. Wenn Probleme wie fehlende Übersetzungen gefunden werden, werden diese direkt korrigiert, wobei die ursprüngliche Dateistruktur erhalten bleibt.

### Konfiguration verwalten

#### Konfiguration abrufen

Der Befehl `get configuration` ruft die aktuelle Konfiguration für Intlayer ab, insbesondere die Lokalisierungseinstellungen. Dies ist nützlich, um Ihre Einrichtung zu überprüfen.

```bash
npx intlayer config get
```

##### Argumente:

- **`--env`**: Geben Sie die Umgebung an (z. B. `development`, `production`).
- **`--env-file`**: Benutzerdefinierte Umgebungsdatei angeben, aus der Variablen geladen werden sollen.
- **`--verbose`**: Aktivieren Sie ausführliche Protokollierung für Debugging.

#### Konfiguration hochladen

Der Befehl `push configuration` lädt Ihre Konfiguration in das Intlayer-CMS und den Editor hoch. Dieser Schritt ist erforderlich, um die Verwendung entfernter Wörterbücher im Intlayer Visual Editor zu ermöglichen.

```bash
npx intlayer config push
```

##### Argumente:

- **`--env`**: Geben Sie die Umgebung an (z. B. `development`, `production`).
- **`--env-file`**: Benutzerdefinierte Umgebungsdatei angeben, aus der Variablen geladen werden sollen.
- **`--verbose`**: Aktivieren Sie ausführliche Protokollierung für Debugging.

Durch das Hochladen der Konfiguration wird Ihr Projekt vollständig in das Intlayer-CMS integriert, was eine nahtlose Wörterbuchverwaltung über Teams hinweg ermöglicht.

## Intlayer-Befehle in Ihrer `package.json` verwenden

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
