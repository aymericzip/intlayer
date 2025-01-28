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

## intlayer-cli-Paket

Das `intlayer-cli`-Paket beabsichtigt, Ihre [Intlayer-Deklarationen](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md) in Wörterbücher zu transpiliieren.

Dieses Paket wird alle Intlayer-Dateien transpiliieren, wie `src/**/*.content.{ts|js|mjs|cjs|json}`. [Sehen Sie, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Um Intlayer-Wörterbücher zu interpretieren, können Sie Interpreten wie [react-intlayer](https://www.npmjs.com/package/react-intlayer) oder [next-intlayer](https://www.npmjs.com/package/next-intlayer) verwenden.

## Unterstützung für Konfigurationsdateien

Intlayer akzeptiert mehrere Formate für Konfigurationsdateien:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Um zu sehen, wie Sie verfügbare Locales oder andere Parameter konfigurieren, beziehen Sie sich auf die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Führen Sie Intlayer-Befehle aus

### Wörterbücher erstellen

Um Ihre Wörterbücher zu erstellen, können Sie die Befehle ausführen:

```bash
npx intlayer build
```

oder im Überwachungsmodus

```bash
npx intlayer build --watch
```

Dieser Befehl findet Ihre Deklarationsinhaltsdateien standardmäßig unter `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Und erstellt die Wörterbücher im `.intlayer`-Verzeichnis.

### Wörterbücher pushen

```bash
npx intlayer dictionary push
```

Wenn der [Intlayer-Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md) installiert ist, können Sie auch Wörterbücher an den Editor senden. Dieser Befehl ermöglicht es, die Wörterbücher im [Editor](https://intlayer.org/dashboard) verfügbar zu machen. Auf diese Weise können Sie Ihre Wörterbücher mit Ihrem Team teilen und Ihren Inhalt bearbeiten, ohne den Code Ihrer Anwendung zu ändern.

##### Argumente:

- `-d`, `--dictionaries`: ids der Wörterbücher, die abgerufen werden sollen. Wenn nicht angegeben, werden alle Wörterbücher gepusht.
  > Beispiel: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Überspringen Sie die Frage, die fragt, ob die Locales-Verzeichnisse gelöscht werden sollen, nachdem die Wörterbücher gepusht wurden, und löschen Sie sie. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der fernen Wörterbücher überschrieben.
  > Beispiel: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Überspringen Sie die Frage, die fragt, ob die Locales-Verzeichnisse gelöscht werden sollen, nachdem die Wörterbücher gepusht wurden, und behalten Sie sie. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der fernen Wörterbücher überschrieben.
  > Beispiel: `npx intlayer dictionary push -k`

### Fernwörterbücher abrufen

```bash
npx intlayer dictionary pull
```

Wenn der [Intlayer-Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md) installiert ist, können Sie auch Wörterbücher vom Editor abrufen. Auf diese Weise können Sie den Inhalt Ihrer Wörterbücher nach Bedarf Ihrer Anwendung überschreiben.

##### Argumente:

- `-d, --dictionaries`: Ids der Wörterbücher, die abgerufen werden sollen. Wenn nicht angegeben, werden alle Wörterbücher abgerufen.
  > Beispiel: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Pfad zum Verzeichnis, in dem die neuen Wörterbücher gespeichert werden. Wenn nicht angegeben, werden die neuen Wörterbücher im Verzeichnis `./intlayer-dictionaries` des Projekts gespeichert. Wenn ein `filePath`-Feld in Ihrem Wörterbuchinhalt angegeben ist, ignorieren die Wörterbücher dieses Argument und werden im angegebenen `filePath`-Verzeichnis gespeichert.

##### Beispiel:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Wörterbücher prüfen

```bash
npx intlayer audit
```

Dieser Befehl analysiert Ihre Deklarationsinhaltsdateien auf potenzielle Probleme wie fehlende Übersetzungen, strukturelle Inkonsistenzen oder Typenunterschiede. Wenn Probleme gefunden werden, wird **intlayer audit** Aktualisierungen vorschlagen oder anwenden, um Ihre Wörterbücher konsistent und vollständig zu halten.

##### Argumente:

- **`-f, --files [files...]`**  
  Eine Liste spezifischer Deklarationsinhaltsdateien zur Prüfung. Wenn nicht angegeben, werden alle entdeckten `*.content.{ts,js,mjs,cjs,tsx,jsx,json}`-Dateien geprüft.

- **`--exclude [excludedGlobs...]`**  
  Globs-Muster, die von der Prüfung ausgeschlossen werden sollen (z.B. `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  Das ChatGPT-Modell, das für die Prüfung verwendet werden soll (z.B. `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Geben Sie einen benutzerdefinierten Eingabeaufforderung für Ihre Prüfanweisungen an.

- **`-l, --async-limit [asyncLimit]`**  
  Maximale Anzahl von Dateien, die gleichzeitig verarbeitet werden sollen.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Geben Sie Ihren eigenen OpenAI API-Schlüssel an, um die OAuth2-Authentifizierung zu umgehen.

##### Beispiel:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Dieser Befehl ignoriert alle Dateien unter `tests/**` und verwendet das Modell `gpt-3.5-turbo`, um die entdeckten Deklarationsinhaltsdateien zu prüfen. Wenn Probleme gefunden werden – wie fehlende Übersetzungen – werden sie direkt korrigiert und die ursprüngliche Dateistruktur bleibt erhalten.

## Verwenden Sie Intlayer-Befehle in Ihrer `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
