# Intlayer CLI

## Paket installieren

Installieren Sie die erforderlichen Pakete mit npm:

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> Hinweis: Wenn das `intlayer`-Paket bereits installiert ist, wird die CLI automatisch installiert. Sie können diesen Schritt überspringen.

## intlayer-cli-Paket

Das `intlayer-cli`-Paket beabsichtigt, Ihre [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md) Deklarationen in Wörterbücher zu transpilieren.

Dieses Paket wird alle intlayer-Dateien transpilen, wie `src/**/*.content.{ts|js|mjs|cjs|json}`. [Siehe, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Um intlayer-Wörterbücher zu interpretieren, können Sie Interpreter verwenden, wie [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/README.md) oder [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/README.md).

## Unterstützung von Konfigurationsdateien

Intlayer akzeptiert mehrere Formate von Konfigurationsdateien:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Um zu sehen, wie Sie verfügbare Lokalisierungen oder andere Parameter konfigurieren, beachten Sie die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Führen Sie intlayer-Befehle aus

### Wörterbücher erstellen

Um Ihre Wörterbücher zu erstellen, können Sie die Befehle ausführen:

```bash
npx intlayer build
```

oder im Überwachungsmodus

```bash
npx intlayer build --watch
```

Dieser Befehl findet standardmäßig Ihre Deklarations-Inhaltsdateien als `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Und erstellt die Wörterbücher im Verzeichnis `.intlayer`.

### Wörterbücher pushen

```bash
npx intlayer push
```

Wenn der [intlayer-Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md) installiert ist, können Sie auch Wörterbücher an den Editor pushen. Dieser Befehl ermöglicht es, die Wörterbücher im Editor unter [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content) verfügbar zu machen. Auf diese Weise können Sie Ihre Wörterbücher mit Ihrem Team teilen und Ihren Inhalt bearbeiten, ohne den Code Ihrer Anwendung zu ändern.

##### Argumente:

- `-d`, `--dictionaries`: IDs der Wörterbücher, die heruntergeladen werden sollen. Wenn nicht angegeben, werden alle Wörterbücher gepusht.
  > Beispiel: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Überspringen Sie die Frage, die fragt, ob die Lokalisierungsverzeichnisse gelöscht werden sollen, sobald die Wörterbücher gepusht sind, und entfernen Sie sie. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der fernen Wörterbücher überschrieben.
  > Beispiel: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: Überspringen Sie die Frage, die fragt, ob die Lokalisierungsverzeichnisse gelöscht werden sollen, sobald die Wörterbücher gepusht sind, und behalten Sie sie. Standardmäßig wird, wenn das Wörterbuch lokal definiert ist, der Inhalt der fernen Wörterbücher überschrieben.
  > Beispiel: `npx intlayer push -k`

### Entfernen Sie entfernte Wörterbücher

```bash
npx intlayer pull
```

Wenn der [intlayer-Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md) installiert ist, können Sie auch Wörterbücher vom Editor herunterladen. Auf diese Weise können Sie den Inhalt Ihrer Wörterbücher für die Bedürfnisse Ihrer Anwendung überschreiben.

##### Argumente:

- `-d, --dictionaries`: IDs der Wörterbücher, die heruntergeladen werden sollen. Wenn nicht angegeben, werden alle Wörterbücher heruntergeladen.
  > Beispiel: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Pfad zum Verzeichnis, in dem die neuen Wörterbücher gespeichert werden. Wenn nicht angegeben, werden die neuen Wörterbücher im Verzeichnis `./intlayer-dictionaries` des Projekts gespeichert. Wenn ein `filePath`-Feld in Ihrem Wörterbuchinhalt angegeben ist, werden die Wörterbücher dieses Argument nicht berücksichtigen und im angegebenen `filePath`-Verzeichnis gespeichert.
  > Beispiel: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## Verwenden Sie intlayer-Befehle in Ihrer `package.json`:

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
