---
docName: autoFill
url: https://intlayer.org/doc/concept/auto-fill
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/autoFill.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Automatisches Ausfüllen
description: Erfahren Sie, wie Sie die automatische Ausfüllfunktion in Intlayer nutzen können, um Inhalte basierend auf vordefinierten Mustern automatisch zu füllen. Folgen Sie dieser Dokumentation, um Auto-Fill-Funktionen effizient in Ihr Projekt zu integrieren.
keywords:
  - Automatisches Ausfüllen
  - Inhaltsautomatisierung
  - Dynamischer Inhalt
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Automatisch ausgefüllte Inhaltsdeklarationsdateien

**Automatisch ausgefüllte Inhaltsdeklarationsdateien** sind eine Möglichkeit, Ihren Entwicklungsarbeitsablauf zu beschleunigen.

Der Autofill-Mechanismus funktioniert über eine _Master-Slave_-Beziehung zwischen Inhaltsdeklarationsdateien. Wenn die Hauptdatei (Master) aktualisiert wird, werden diese Änderungen von Intlayer automatisch auf die abgeleiteten (automatisch ausgefüllten) Deklarationsdateien angewendet.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

Hier ist eine [pro-Sprache Inhaltsdeklarationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) mit der `autoFill`-Anweisung.

Wenn Sie dann den folgenden Befehl ausführen:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer generiert automatisch die abgeleitete Deklarationsdatei unter `src/components/example/example.content.json` und füllt alle Sprachen aus, die in der Hauptdatei noch nicht deklariert sind.

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

Anschließend werden beide Deklarationsdateien in ein einzelnes Wörterbuch zusammengeführt, das über den Standard-Hook `useIntlayer("example")` (react) / Composable (vue) zugänglich ist.

## Format automatisch ausgefüllter Dateien

Das empfohlene Format für automatisch ausgefüllte Deklarationsdateien ist **JSON**, was hilft, Formatierungsbeschränkungen zu vermeiden. Intlayer unterstützt jedoch auch die Formate `.ts`, `.js`, `.mjs`, `.cjs` und andere.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Ihr Inhalt
  },
};
```

Dies generiert die Datei unter:

```
src/components/example/example.filled.content.ts
```

> Die Generierung von `.js`, `.ts` und ähnlichen Dateien funktioniert wie folgt:
>
> - Wenn die Datei bereits existiert, analysiert Intlayer sie mit dem AST (Abstract Syntax Tree), um jedes Feld zu lokalisieren und fehlende Übersetzungen einzufügen.
> - Wenn die Datei nicht existiert, generiert Intlayer sie mit der Standardvorlage für Inhaltsdeklarationsdateien.

## Absolute Pfade

Das `autoFill`-Feld unterstützt auch absolute Pfade.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Ihr Inhalt
  },
};
```

Dies generiert die Datei unter:

```
/messages/example.content.json
```

## Automatische Generierung von pro-Sprache Inhaltsdeklarationsdateien

Das `autoFill`-Feld unterstützt auch die Generierung von **pro-Sprache** Inhaltsdeklarationsdateien.

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

Dies generiert zwei separate Dateien:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## Filtern des Autofills nach bestimmter Sprache

Die Verwendung eines Objekts für das `autoFill`-Feld ermöglicht es Ihnen, Filter anzuwenden und nur bestimmte Sprachdateien zu generieren.

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

Sie können Variablen innerhalb des `autoFill`-Pfads verwenden, um die Zielpfade für die generierten Dateien dynamisch aufzulösen.

**Verfügbare Variablen:**

- `{{locale}}` – Sprachcode (z.B. `fr`, `es`)
- `{{key}}` – Wörterbuchschlüssel (z.B. `example`)

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Ihr Inhalt
  },
};
```

Dies generiert:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`
