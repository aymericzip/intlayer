---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Automatisches Ausfüllen
description: Erfahren Sie, wie Sie die Funktion zum automatischen Ausfüllen in Intlayer verwenden, um Inhalte basierend auf vordefinierten Mustern automatisch zu befüllen. Folgen Sie dieser Dokumentation, um Funktionen zum automatischen Ausfüllen effizient in Ihrem Projekt zu implementieren.
keywords:
  - Automatisches Ausfüllen
  - Inhaltsautomatisierung
  - Dynamische Inhalte
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "Globale Konfiguration hinzugefügt"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Variable `{{fileName}}` hinzugefügt"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historie initialisiert"
author: aymericzip
---

# Füllen Sie Content Declaration File Translations aus

**Autofill content declaration files** in Ihrer CI sind eine Möglichkeit, Ihren Entwicklungs-Workflow zu beschleunigen.

## Das Verhalten verstehen

Der `fill`-Befehl umfasst zwei Modi:

- **Complete**: Füllt automatisch alle fehlenden Inhalte für jedes Locale aus und bearbeitet die aktuelle Datei oder eine andere angegebene Datei. Das heißt, der Complete-Modus überspringt die Übersetzung bereits vorhandener Inhalte, falls diese bereits übersetzt wurden.
- **Review**: Füllt automatisch **alle** Inhalte für jedes Locale aus und generiert für eine bestimmte Datei oder eine andere angegebene Datei.

Der `fill`-Befehl verarbeitet alle Ihre Locale-Content-Deklarationsdateien. Das heißt, er verarbeitet nicht Ihre Remote-Inhalte aus dem CMS. Das CMS umfasst sein eigenes Übersetzungsverwaltungssystem.
Wenn Sie Plugins wie `@intlayer/sync-json-plugin` verwenden, wird Intlayer die JSON-Dateien in Locale-Content-Deklarationsdateien umwandeln. Das heißt, sie werden vom `fill`-Befehl verarbeitet.

Die neu generierten Dateien enthalten eine `filled`-Anweisung als Dictionary-Metadaten. Diese Anweisung wird von Intlayer verwendet, um zu erkennen, ob die Datei automatisch ausgefüllt wurde oder nicht, und überspringt diese Datei, falls vorhanden, vor erneuter Übersetzung.

Intlayer berücksichtigt auch die folgende Anweisung zum automatischen Ausfüllen:

- Aus Ihrer `.content.{ts|js|json}` → `fill`-Anweisung
- Aus Ihrer Konfigurationsdatei `.intlayer.config.ts` → `dictionary.fill`-Anweisung
- Wird standardmäßig auf `true` gesetzt, ansonsten

Bei Pro-Locale-Content-Deklarationsdateien wird die `true`-Anweisung durch `./{{fileName}}.fill.content.json` ersetzt. Dies ist der Fall, da eine Pro-Locale-Content-Deklarationsdatei keine zusätzlichen lokalisierten Inhalte erhalten kann. Daher wird eine neue Datei generiert, um die vorhandene Datei nicht zu überschreiben.

## Standardverhalten

Standardmäßig ist `fill` global auf `true` eingestellt, was bedeutet, dass Intlayer automatisch alle Content-Dateien ausfüllt und die Datei selbst bearbeitet. Dieses Verhalten kann auf verschiedene Weise angepasst werden:

### Globale Konfigurationsoptionen

1. **`fill: true` (Standard)** - Füllt automatisch alle Locales aus und bearbeitet die aktuelle Datei
2. **`fill: false`** - Deaktiviert das automatische Ausfüllen für diese Content-Datei
3. **`fill: "./relative/path/to/file"`** - Erstellt/aktualisiert die angegebene Datei, ohne die aktuelle zu bearbeiten, indem auf einen relativen Pfad verwiesen wird, der basierend auf dem Speicherort der aktuellen Datei aufgelöst wird
4. **`fill: "/absolute/path/to/file"`** - Erstellt/aktualisiert die angegebene Datei, ohne die aktuelle zu bearbeiten, indem auf einen relativen Pfad verwiesen wird, der basierend auf dem Speicherort des Basisverzeichnisses aufgelöst wird (Feld `baseDir` in der Konfigurationsdatei `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`** - Erstellt/aktualisiert die angegebene Datei, ohne die aktuelle zu bearbeiten, indem auf einen absoluten Pfad verwiesen wird, der basierend auf Ihrem Betriebssystem aufgelöst wird
6. **`fill: { [key in Locales]?: string }`** - Erstellt/aktualisiert die angegebene Datei für jede Locale

### v7 Behavior Changes

In v7 hat sich das Verhalten des `fill`-Befehls aktualisiert:

- **`fill: true`** - Schreibt die aktuelle Datei mit gefülltem Inhalt für alle Locales um
- **`fill: "path/to/file"`** - Füllt die angegebene Datei, ohne die aktuelle Datei zu ändern
- **`fill: false`** - Deaktiviert Auto-Fill vollständig

Bei Verwendung einer Path-Option zum Schreiben in eine andere Datei funktioniert der Fill-Mechanismus über eine _Master-Slave_-Beziehung zwischen Content-Declaration-Dateien. Die Hauptdatei (Master) dient als Single Source of Truth, und wenn sie aktualisiert wird, wendet Intlayer diese Änderungen automatisch auf die abgeleiteten (gefüllten) Declaration-Dateien an, die durch den Path angegeben werden.

# Übersetzungen der Deklarationsdatei für automatisches Ausfüllen von Inhalten

**Deklarationsdateien für automatisches Ausfüllen von Inhalten** sind eine Möglichkeit, Ihren Entwicklungsworkflow zu beschleunigen.

Der Mechanismus des automatischen Ausfüllens funktioniert durch eine _Master-Slave_-Beziehung zwischen Inhaltsdeklarationsdateien. Wenn die Hauptdatei (Master) aktualisiert wird, wendet Intlayer diese Änderungen automatisch auf die abgeleiteten (automatisch ausgefüllten) Deklarationsdateien an.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "Dies ist ein Beispielinhalt", // Beispielinhalt
  },
} satisfies Dictionary;

export default exampleContent;
```

Hier ist eine [pro-Locale Inhaltsdeklarationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) mit der `autoFill`-Anweisung.

Dann, wenn Sie den folgenden Befehl ausführen:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer generiert automatisch die abgeleitete Deklarationsdatei unter `src/components/example/example.content.json` und füllt alle Lokalisierungen aus, die in der Hauptdatei noch nicht deklariert sind.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Anschließend werden beide Deklarationsdateien zu einem einzigen Wörterbuch zusammengeführt, das über den Standard-`useIntlayer("example")` Hook (React) / Composable (Vue) zugänglich ist.

## Globale Konfiguration

Sie können die globale Auto-Fill-Konfiguration in der Datei `intlayer.config.ts` konfigurieren.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Fehlende Übersetzungen automatisch für alle Wörterbücher generieren
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // Fehlende Übersetzungen automatisch für alle Wörterbücher generieren wie die Verwendung von "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

Sie können die Konfiguration pro Wörterbuch noch optimieren, indem Sie das Feld `fill` in Content-Dateien verwenden. Intlayer berücksichtigt zunächst die Pro-Wörterbuch-Konfiguration und fällt dann auf die globale Konfiguration zurück.

## Automatisch ausgefülltes Dateiformat

Das empfohlene Format für automatisch ausgefüllte Deklarationsdateien ist **JSON**, da es Formatierungsbeschränkungen vermeidet. Intlayer unterstützt jedoch auch `.ts`, `.js`, `.mjs`, `.cjs` und andere Formate.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Ihr Inhalt
  },
};
```

Dies erzeugt die Datei unter:

```
src/components/example/example.filled.content.ts
```

> Die Generierung von `.js`, `.ts` und ähnlichen Dateien funktioniert wie folgt:
>
> - Wenn die Datei bereits existiert, analysiert Intlayer sie mithilfe des AST (Abstract Syntax Tree), um jedes Feld zu finden und fehlende Übersetzungen einzufügen.
> - Wenn die Datei nicht existiert, generiert Intlayer sie mit der Standardvorlage für Inhaltsdeklarationsdateien.

## Absolute Pfade

Das Feld `autoFill` unterstützt auch absolute Pfade.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Ihr Inhalt
  },
};
```

Dies erzeugt die Datei unter:

```
/messages/example.content.json
```

## Automatische Generierung von Inhaltsdeklarationsdateien pro Locale

Das Feld `autoFill` unterstützt auch die Generierung von **pro Locale** Inhaltsdeklarationsdateien.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Ihr Inhalt
  },
};
```

Dies erzeugt zwei separate Dateien:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> In diesem Fall, wenn das Objekt nicht alle Sprachen enthält, überspringt Intlayer die Generierung der verbleibenden Sprachen.

## Filter für bestimmte Sprach-Autofill

Die Verwendung eines Objekts für das Feld `autoFill` ermöglicht es Ihnen, Filter anzuwenden und nur bestimmte Sprachdateien zu generieren.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Ihr Inhalt
  },
};
```

Dies generiert nur die französische Übersetzungsdatei.

## Pfadvariablen

Sie können Variablen im `autoFill`-Pfad verwenden, um die Zielpfade für die generierten Dateien dynamisch aufzulösen.

**Verfügbare Variablen:**

- `{{locale}}` – Sprachcode (z. B. `fr`, `es`)
- `{{fileName}}` – Dateiname (z. B. `index`)
- `{{key}}` – Wörterbuchschlüssel (z. B. `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Ihr Inhalt
  },
};
```

Dies erzeugt:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // Ihr Inhalt
  },
};
```

Dies erzeugt:

- `./index.content.json`
- `./index.content.json`
