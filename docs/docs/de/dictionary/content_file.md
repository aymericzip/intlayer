---
createdAt: 2025-02-07
updatedAt: 2025-09-20
title: Inhaltsdatei
description: Erfahren Sie, wie Sie die Erweiterungen für Ihre Inhaltsdeklarationsdateien anpassen können. Folgen Sie dieser Dokumentation, um Bedingungen effizient in Ihrem Projekt umzusetzen.
keywords:
  - Inhaltsdatei
  - Dokumentation
  - Intlayer
slugs:
  - doc
  - konzept
  - inhalt
---

# Inhaltsdatei

<iframe title="i18n, Markdown, JSON… eine einzige Lösung, um alles zu verwalten | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Was ist eine Inhaltsdatei?

Eine Inhaltsdatei in Intlayer ist eine Datei, die Wörterbuchdefinitionen enthält.
Diese Dateien deklarieren den Textinhalt, die Übersetzungen und Ressourcen Ihrer Anwendung.
Inhaltsdateien werden von Intlayer verarbeitet, um Wörterbücher zu generieren.

Die Wörterbücher sind das Endergebnis, das Ihre Anwendung mit dem `useIntlayer` Hook importieren wird.

### Schlüsselkonzepte

#### Wörterbuch

Ein Wörterbuch ist eine strukturierte Sammlung von Inhalten, die nach Schlüsseln organisiert ist. Jedes Wörterbuch enthält:

- **Schlüssel**: Ein eindeutiger Bezeichner für das Wörterbuch
- **Inhalt**: Die tatsächlichen Inhaltswerte (Text, Zahlen, Objekte usw.)
- **Metadaten**: Zusätzliche Informationen wie Titel, Beschreibung, Tags usw.

#### Inhaltsdatei

Beispiel einer Inhaltsdatei:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string; // Zeichenketteninhalt
      numberContent: number; // Zahleninhalt
      booleanContent: boolean; // Wahrheitswertinhalt
      javaScriptContent: string; // JavaScript-Inhalt
    };
  };
  multilingualContent: string; // Mehrsprachiger Inhalt
  quantityContent: string; // Mengeninhalt
  conditionalContent: string; // Bedingter Inhalt
  markdownContent: never; // Markdown-Inhalt
  externalContent: string; // Externer Inhalt
  insertionContent: string; // Einfügeinhalt
  nestedContent: string; // Verschachtelter Inhalt
  fileContent: string; // Dateiinhalt
  jsxContent: ReactNode; // JSX-Inhalt
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      de: "Deutscher Inhalt",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
    conditionalContent: cond({
      true: "Validierung ist aktiviert",
      false: "Validierung ist deaktiviert",
    }),
    insertionContent: insert("Hallo {{name}}!"),
    nestedContent: nest(
      "navbar", // Der Schlüssel des Wörterbuchs zum Verschachteln
      "login.button" // [Optional] Der Pfad zum Inhalt, der verschachtelt werden soll
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Markdown-Beispiel"),

    /*
     * Nur verfügbar mit `react-intlayer` oder `next-intlayer`
     */
    jsxContent: <h1>Mein Titel</h1>,
  },
} satisfies Dictionary<Content>; // [optional] Dictionary ist generisch und ermöglicht es Ihnen, die Formatierung Ihres Wörterbuchs zu stärken
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hallo Welt",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "Englischer Inhalt",
      "en-GB": "Englischer Inhalt (UK)",
      fr: "Französischer Inhalt",
      es: "Spanischer Inhalt",
    }),
    quantityContent: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
    conditionalContent: cond({
      true: "Validierung ist aktiviert",
      false: "Validierung ist deaktiviert",
    }),
    insertionContent: insert("Hallo {{name}}!"),
    nestedContent: nest(
      "navbar", // Der Schlüssel des Wörterbuchs zum Einfügen
      "login.button" // [Optional] Der Pfad zum einzufügenden Inhalt
    ),
    markdownContent: md("# Markdown-Beispiel"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Nur verfügbar mit `react-intlayer` oder `next-intlayer`
    jsxContent: <h1>Mein Titel</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hallo Welt",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      de: "Deutscher Inhalt",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
    conditionalContent: cond({
      true: "Validierung ist aktiviert",
      false: "Validierung ist deaktiviert",
    }),
    insertionContent: insert("Hallo {{name}}!"),
    nestedContent: nest(
      "navbar", // Der Schlüssel des Wörterbuchs zum Einbetten
      "login.button" // [Optional] Der Pfad zum einzubettenden Inhalt
    ),
    markdownContent: md("# Markdown-Beispiel"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Nur verfügbar mit `react-intlayer` oder `next-intlayer`
    jsxContent: <h1>Mein Titel</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Hallo Welt",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Keine Autos",
        "1": "Ein Auto",
        "<-1": "Weniger als minus ein Auto",
        "-1": "Minus ein Auto",
        ">5": "Einige Autos",
        ">19": "Viele Autos",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Validierung ist aktiviert",
        "false": "Validierung ist deaktiviert",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Hallo {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown-Beispiel",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Mein Titel"],
      },
    },
  },
}
```

#### Inhaltsknoten

Inhaltsknoten sind die Bausteine des Wörterbuchinhalts. Sie können sein:

- **Primitive Werte**: Zeichenketten, Zahlen, Booleans, null, undefined
- **Typisierte Knoten**: Spezielle Inhaltstypen wie Übersetzungen, Bedingungen, Markdown usw.
- **Funktionen**: Dynamische Inhalte, die zur Laufzeit ausgewertet werden können [siehe Funktionsabruf](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/function_fetching.md)
- **Verschachtelte Inhalte**: Verweise auf andere Wörterbücher

#### Inhaltstypen

Intlayer unterstützt verschiedene Inhaltstypen durch typisierte Knoten:

- **Übersetzungsinhalt**: Mehrsprachiger Text mit lokalisierungsspezifischen Werten [siehe Übersetzungsinhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation_content.md)
- **Bedingungsinhalt**: Bedingter Inhalt basierend auf booleschen Ausdrücken [siehe Bedingungsinhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/condition_content.md)
- **Enumerationsinhalt**: Inhalt, der sich basierend auf aufzählbaren Werten ändert [siehe Enumerationsinhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/enumeration_content.md)
- **Einfügeinhalt**: Inhalt, der in anderen Inhalt eingefügt werden kann [siehe Einfügeinhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion_content.md)
- **Markdown-Inhalt**: Rich-Text-Inhalt im Markdown-Format [siehe Markdown-Inhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown_content.md)
- **Verschachtelter Inhalt**: Verweise auf andere Wörterbücher [siehe Verschachtelter Inhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/nested_content.md)
- **Geschlechtsabhängiger Inhalt**: Inhalt, der sich je nach Geschlecht unterscheidet [siehe Geschlechtsabhängiger Inhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender_content.md)
- **Dateiinhalt**: Verweise auf externe Dateien [siehe Dateiinhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/file_content.md)

## Wörterbuchstruktur

Ein Wörterbuch in Intlayer wird durch den Typ `Dictionary` definiert und enthält mehrere Eigenschaften, die sein Verhalten steuern:

### Erforderliche Eigenschaften

#### `key` (string)

Der Bezeichner für das Wörterbuch. Wenn mehrere Wörterbücher denselben Schlüssel haben, werden diese von Intlayer automatisch zusammengeführt.

> Verwenden Sie die kebab-case-Namenskonvention (z. B. `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

Die Eigenschaft `content` enthält die eigentlichen Wörterbuchdaten und unterstützt:

- **Primitive Werte**: Zeichenketten, Zahlen, Booleans, null, undefined
- **Typed nodes**: Spezielle Inhaltstypen unter Verwendung der Hilfsfunktionen von Intlayer
- **Verschachtelte Objekte**: Komplexe Datenstrukturen
- **Arrays**: Sammlungen von Inhalten
- **Funktionen**: Dynamische Inhaltsevaluierung

### Optionale Eigenschaften

#### `title` (string)

Menschlich lesbarer Titel für das Wörterbuch, der dabei hilft, es in Editoren und CMS-Systemen zu identifizieren. Dies ist besonders nützlich beim Verwalten großer Mengen von Wörterbüchern oder bei der Arbeit mit Inhaltsverwaltungsschnittstellen.

**Beispiel:**

```typescript
{
  key: "about-page-meta",
  title: "Metadaten der Über-Seite",
  content: { /* ... */ }
}
```

#### `description` (string)

Detaillierte Beschreibung, die den Zweck des Wörterbuchs, Nutzungshinweise und besondere Überlegungen erklärt. Diese Beschreibung wird auch als Kontext für KI-gestützte Übersetzungserstellung verwendet, was sie wertvoll für die Aufrechterhaltung der Übersetzungsqualität und Konsistenz macht.

**Beispiel:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Dieses Wörterbuch verwaltet die Metadaten der Über-Seite",
    "Berücksichtigen Sie bewährte Methoden für SEO:",
    "- Der Titel sollte zwischen 50 und 60 Zeichen lang sein",
    "- Die Beschreibung sollte zwischen 150 und 160 Zeichen lang sein",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Array von Zeichenketten zur Kategorisierung und Organisation von Wörterbüchern. Tags bieten zusätzlichen Kontext und können zum Filtern, Suchen oder Organisieren von Wörterbüchern in Editoren und CMS-Systemen verwendet werden.

**Beispiel:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `locale` (LocalesValues)

Wandelt das Wörterbuch in ein pro-Locale-Wörterbuch um, bei dem jedes im Inhalt deklarierte Feld automatisch in einen Übersetzungsknoten umgewandelt wird. Wenn diese Eigenschaft gesetzt ist:

- Das Wörterbuch wird als einsprachiges Wörterbuch behandelt
- Jedes Feld wird zu einem Übersetzungsknoten für diese spezifische Sprache
- Sie sollten KEINE Übersetzungsknoten (`t()`) im Inhalt verwenden, wenn Sie diese Eigenschaft nutzen
- Wenn diese Eigenschaft fehlt, wird das Wörterbuch als mehrsprachiges Wörterbuch behandelt

> Siehe [Per-Locale Content Declaration in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) für weitere Informationen.

**Beispiel:**

```json
// Einsprachiges Wörterbuch
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Dies wird zu einem Übersetzungsknoten für 'en'
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

Anweisungen zum automatischen Ausfüllen von Wörterbuchinhalten aus externen Quellen. Dies kann global in `intlayer.config.ts` oder pro Wörterbuch konfiguriert werden. Unterstützt mehrere Formate:

- **`true`**: Automatisches Ausfüllen für alle Sprachen aktivieren
- **`string`**: Pfad zu einer einzelnen Datei oder Vorlage mit Variablen
- **`object`**: Pfade zu Dateien pro Sprache

**Beispiele:**

```json
// Für alle Sprachen aktivieren
{
  "autoFill": true
}
// Einzelne Datei
{
  "autoFill": "./translations/aboutPage.content.json"
}
// Vorlage mit Variablen
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Feine Konfiguration pro Sprache
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Verfügbare Variablen:**

- `{{locale}}` – Sprachcode (z.B. `fr`, `es`)
- `{{fileName}}` – Dateiname (z.B. `example`)
- `{{key}}` – Wörterbuchschlüssel (z.B. `example`)

> Siehe [Auto-Fill-Konfiguration in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md) für weitere Informationen.

##### `priority` (Zahl)

Gibt die Priorität des Wörterbuchs zur Konfliktlösung an. Wenn mehrere Wörterbücher denselben Schlüssel haben, überschreibt das Wörterbuch mit der höchsten Prioritätszahl die anderen. Dies ist nützlich zur Verwaltung von Inhalts-Hierarchien und Überschreibungen.

**Beispiel:**

```typescript
// Basis-Wörterbuch
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Willkommen!" }
}

// Überschreibendes Wörterbuch
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Willkommen bei unserem Premium-Service!" }
}
// Dies überschreibt das Basis-Wörterbuch
```

### CMS-Eigenschaften

##### `version` (string)

Versionskennung für Remote-Wörterbücher. Hilft dabei nachzuverfolgen, welche Version des Wörterbuchs aktuell verwendet wird, besonders nützlich bei der Arbeit mit Remote-Content-Management-Systemen.

##### `live` (boolean)

Für Remote-Wörterbücher gibt an, ob das Wörterbuch zur Laufzeit live abgerufen werden soll. Wenn aktiviert:

- Muss `importMode` in `intlayer.config.ts` auf "live" gesetzt sein
- Ein Live-Server muss laufen
- Das Wörterbuch wird zur Laufzeit über die Live-Sync-API abgerufen
- Wenn live, aber der Abruf fehlschlägt, wird auf den dynamischen Wert zurückgegriffen
- Wenn nicht live, wird das Wörterbuch zur Build-Zeit für optimale Leistung transformiert

### Systemeigenschaften (Automatisch generiert)

Diese Eigenschaften werden automatisch von Intlayer generiert und sollten nicht manuell verändert werden:

##### `$schema` (string)

JSON-Schema zur Validierung der Wörterbuchstruktur. Wird automatisch von Intlayer hinzugefügt, um die Integrität des Wörterbuchs sicherzustellen.

##### `id` (string)

Für entfernte Wörterbücher ist dies die eindeutige Kennung des Wörterbuchs auf dem entfernten Server. Wird zum Abrufen und Verwalten von entfernten Inhalten verwendet.

##### `localId` (LocalDictionaryId)

Eindeutige Kennung für lokale Wörterbücher. Wird automatisch von Intlayer generiert, um das Wörterbuch zu identifizieren und festzustellen, ob es lokal oder entfernt ist, sowie dessen Standort.

##### `localIds` (LocalDictionaryId[])

Für zusammengeführte Wörterbücher enthält dieses Array die IDs aller Wörterbücher, die zusammengeführt wurden. Nützlich zur Nachverfolgung der Quelle des zusammengeführten Inhalts.

##### `filePath` (string)

Der Dateipfad des lokalen Wörterbuchs, der angibt, aus welcher `.content`-Datei das Wörterbuch generiert wurde. Hilft bei der Fehlerbehebung und Quellenverfolgung.

##### `availableVersions` (string[])

Für entfernte Wörterbücher enthält dieses Array alle verfügbaren Versionen des Wörterbuchs. Hilft dabei, nachzuvollziehen, welche Versionen verwendet werden können.

##### `autoFilled` (true)

Gibt an, ob das Wörterbuch automatisch aus externen Quellen ausgefüllt wurde. Im Falle von Konflikten überschreiben Basis-Wörterbücher automatisch ausgefüllte Wörterbücher.

##### `location` ('distant' | 'locale')

Gibt den Standort des Wörterbuchs an:

- `'locale'`: Lokales Wörterbuch (aus Inhaltsdateien)
- `'distant'`: Entferntes Wörterbuch (aus externer Quelle)

## Inhaltstypen von Knoten

Intlayer bietet mehrere spezialisierte Inhaltstypen von Knoten, die grundlegende primitive Werte erweitern:

### Übersetzungsinhalt (`t`)

Mehrsprachiger Inhalt, der je nach Gebietsschema variiert:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Bedingter Inhalt (`cond`)

Inhalt, der sich basierend auf booleschen Bedingungen ändert:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### Aufzählungsinhalt (`enu`)

Inhalt, der auf aufgezählten Werten basiert und variiert:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Ihre Anfrage ist ausstehend",
  approved: "Ihre Anfrage wurde genehmigt",
  rejected: "Ihre Anfrage wurde abgelehnt",
});
```

### Einfügeinhalt (`insert`)

Inhalt, der in anderen Inhalt eingefügt werden kann:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Dieser Text kann überall eingefügt werden");
```

### Verschachtelter Inhalt (`nest`)

Verweise auf andere Wörterbücher:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Markdown-Inhalt (`md`)

Rich-Text-Inhalt im Markdown-Format:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Willkommen\n\nDies ist **fetter** Text mit [Links](https://example.com)"
);
```

### Geschlechtsabhängiger Inhalt (`gender`)

Inhalt, der sich je nach Geschlecht unterscheidet:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "Er ist Entwickler",
  female: "Sie ist Entwicklerin",
  other: "Sie sind Entwickler",
});
```

### Dateiinhalt (`file`)

Verweise auf externe Dateien:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Erstellen von Inhaltsdateien

### Grundstruktur einer Inhaltsdatei

Eine Inhaltsdatei exportiert ein Standardobjekt, das dem Typ `Dictionary` entspricht:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Inhalt der Willkommensseite",
  description:
    "Inhalte für die Haupt-Willkommensseite einschließlich Hero-Bereich und Funktionen",
  tags: ["Seite", "Willkommen", "Startseite"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          de: "Einfach zu bedienen",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          de: "Intuitive Benutzeroberfläche für alle Erfahrungsstufen",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### JSON-Inhaltsdatei

Sie können Inhaltsdateien auch im JSON-Format erstellen:

```json
{
  "key": "welcome-page",
  "title": "Inhalt der Willkommensseite",
  "description": "Inhalt für die Haupt-Willkommensseite",
  "tags": ["Seite", "Willkommen"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Willkommen auf unserer Plattform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Erstellen Sie mühelos erstaunliche Anwendungen",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Inhalt pro Locale-Dateien

Für Wörterbücher pro Locale geben Sie die Eigenschaft `locale` an:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Willkommen auf unserer Plattform",
      subtitle: "Erstellen Sie mühelos erstaunliche Anwendungen",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## Dateierweiterungen für Inhalte

Intlayer ermöglicht es Ihnen, die Erweiterungen für Ihre Inhaltsdeklarationsdateien anzupassen. Diese Anpassung bietet Flexibilität bei der Verwaltung von Großprojekten und hilft, Konflikte mit anderen Modulen zu vermeiden.

### Standarderweiterungen

Standardmäßig überwacht Intlayer alle Dateien mit den folgenden Erweiterungen für Inhaltsdeklarationen:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Diese Standarderweiterungen sind für die meisten Anwendungen geeignet. Wenn Sie jedoch spezielle Anforderungen haben, können Sie benutzerdefinierte Erweiterungen definieren, um den Build-Prozess zu optimieren und das Risiko von Konflikten mit anderen Komponenten zu verringern.

> Um die Dateierweiterungen anzupassen, die Intlayer zur Identifizierung von Inhaltsdeklarationsdateien verwendet, können Sie diese in der Intlayer-Konfigurationsdatei angeben. Dieser Ansatz ist besonders vorteilhaft für groß angelegte Projekte, bei denen die Begrenzung des Überwachungsbereichs die Build-Leistung verbessert.

## Erweiterte Konzepte

### Wörterbuchzusammenführung

Wenn mehrere Wörterbücher denselben Schlüssel haben, führt Intlayer diese automatisch zusammen. Das Zusammenführungsverhalten hängt von mehreren Faktoren ab:

- **Priorität**: Wörterbücher mit höheren `priority`-Werten überschreiben diejenigen mit niedrigeren Werten
- **Automatisch ausfüllen vs. Basis**: Basis-Wörterbücher überschreiben automatisch ausgefüllte Wörterbücher
- **Ort**: Lokale Wörterbücher überschreiben entfernte Wörterbücher (wenn die Prioritäten gleich sind)

### Typensicherheit

Intlayer bietet vollständige TypeScript-Unterstützung für Inhaltsdateien:

```typescript
// Definieren Sie Ihren Inhaltstyp
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Verwenden Sie es in Ihrem Wörterbuch
export default {
  key: "welcome-page",
  content: {
    // TypeScript bietet Autovervollständigung und Typprüfung
    hero: {
      title: "Willkommen",
      subtitle: "Erstellen Sie erstaunliche Apps",
      cta: "Loslegen",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Verschachtelung von Knoten

Sie können ohne Probleme Funktionen in andere Funktionen verschachteln.

Beispiel:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` gibt `['Hi', ' ', 'John Doe']` zurück
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Zusammengesetzter Inhalt, der Bedingung, Enumeration und mehrsprachigen Inhalt verschachtelt
    // `getIntlayer('page','en').advancedContent(true)(10)` gibt 'Multiple items found' zurück
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Kein Artikel gefunden",
          es: "Keine Artikel gefunden",
        }),
        "1": t({
          en: "Ein Artikel gefunden",
          fr: "Ein Artikel gefunden",
          es: "Ein Artikel gefunden",
        }),
        ">1": t({
          en: "Mehrere Artikel gefunden",
          fr: "Mehrere Artikel gefunden",
          es: "Mehrere Artikel gefunden",
        }),
      }),
      false: t({
        en: "Keine gültigen Daten verfügbar",
        fr: "Keine gültigen Daten verfügbar",
        es: "Keine gültigen Daten verfügbar",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','de').hiMessage` gibt `['Hallo', ' ', 'John Doe']` zurück
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Zusammengesetzter Inhalt, der Bedingung, Enumeration und mehrsprachigen Inhalt verschachtelt
    // `getIntlayer('page','de').advancedContent(true)(10)` gibt 'Mehrere Elemente gefunden' zurück
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Mehrere Elemente gefunden",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "Keine gültigen Daten verfügbar",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` gibt `['Hi', ' ', 'John Doe']` zurück
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Zusammengesetzter Inhalt, der Bedingung, Enumeration und mehrsprachigen Inhalt verschachtelt
    // `getIntlayer('page','en').advancedContent(true)(10)` gibt 'Mehrere Elemente gefunden' zurück
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Keine gültigen Daten verfügbar",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Hi", // Begrüßung auf Englisch
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          nodeType: "enumeration",
          enumeration: {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "de": "Keine Elemente gefunden",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "de": "Ein Element gefunden",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "de": "Mehrere Elemente gefunden",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### Beste Praktiken

1. **Benennungskonventionen**:
   - Verwenden Sie kebab-case für Wörterbuchschlüssel (`"about-page-meta"`)
   - Gruppieren Sie verwandte Inhalte unter demselben Schlüsselpräfix

2. **Inhaltsorganisation**:
   - Halten Sie verwandte Inhalte im selben Wörterbuch zusammen
   - Verwenden Sie verschachtelte Objekte, um komplexe Inhaltsstrukturen zu organisieren
   - Nutzen Sie Tags zur Kategorisierung
   - Verwenden Sie `autoFill`, um fehlende Übersetzungen automatisch zu ergänzen

3. **Leistung**:
   - Passen Sie die Inhaltskonfiguration an, um den Umfang der überwachten Dateien zu begrenzen
   - Verwenden Sie Live-Wörterbücher nur, wenn Echtzeit-Updates erforderlich sind (z. B. A/B-Tests usw.)
   - Stellen Sie sicher, dass das Build-Transformations-Plugin (`@intlayer/swc` oder `@intlayer/babel`) aktiviert ist, um das Wörterbuch zur Build-Zeit zu optimieren

## Dokumentationshistorie

| Version | Datum      | Änderungen                    |
| ------- | ---------- | ----------------------------- |
| 6.0.0   | 2025-09-20 | Felddokumentation hinzugefügt |
| 5.5.10  | 2025-06-29 | Historie initialisiert        |
