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
---

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

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
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

## Dokumentationsverlauf

| Version | Datum      | Änderungen                          |
| ------- | ---------- | ----------------------------------- |
| 6.0.0   | 2025-09-20 | Globale Konfiguration hinzugefügt   |
| 6.0.0   | 2025-09-17 | Variable `{{fileName}}` hinzugefügt |
| 5.5.10  | 2025-06-29 | Historie initialisiert              |
