---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Geschlechtsspezifische Inhalte
description: Erfahren Sie, wie Sie geschlechtsspezifische Inhalte in Intlayer verwenden, um Inhalte dynamisch basierend auf dem Geschlecht anzuzeigen. Folgen Sie dieser Dokumentation, um geschlechtsspezifische Inhalte effizient in Ihrem Projekt zu implementieren.
keywords:
  - Geschlechtsspezifische Inhalte
  - Dynamische Darstellung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
---

# Geschlechtsspezifische Inhalte / Geschlecht in Intlayer

## Wie Geschlecht funktioniert

In Intlayer wird geschlechtsspezifischer Inhalt durch die Funktion `gender` realisiert, die bestimmte Geschlechtswerte ('male', 'female') ihren entsprechenden Inhalten zuordnet. Dieser Ansatz ermöglicht es Ihnen, Inhalte dynamisch basierend auf einem gegebenen Geschlecht auszuwählen. In Kombination mit React Intlayer oder Next Intlayer wird der passende Inhalt automatisch entsprechend dem zur Laufzeit angegebenen Geschlecht ausgewählt.

## Einrichtung geschlechtsspezifischer Inhalte

Um geschlechtsspezifische Inhalte in Ihrem Intlayer-Projekt einzurichten, erstellen Sie ein Inhaltsmodul, das Ihre geschlechtsspezifischen Definitionen enthält. Nachfolgend finden Sie Beispiele in verschiedenen Formaten.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "mein Inhalt für männliche Nutzer",
      female: "mein Inhalt für weibliche Nutzer",
      fallback: "mein Inhalt, wenn das Geschlecht nicht angegeben ist", // Optional
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "mein Inhalt für männliche Nutzer",
      female: "mein Inhalt für weibliche Nutzer",
      fallback: "mein Inhalt, wenn das Geschlecht nicht angegeben ist", // Optional
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "mein Inhalt für männliche Nutzer",
      female: "mein Inhalt für weibliche Nutzer",
      fallback: "mein Inhalt, wenn das Geschlecht nicht angegeben ist", // Optional
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "mein Inhalt für männliche Nutzer",
        "female": "mein Inhalt für weibliche Nutzer",
        "fallback": "mein Inhalt, wenn das Geschlecht nicht angegeben ist", // Optional
      },
    },
  },
}
```

> Wenn kein Fallback angegeben ist, wird der zuletzt deklarierte Schlüssel als Fallback verwendet, falls das Geschlecht nicht angegeben ist oder keinem definierten Geschlecht entspricht.

## Verwendung von geschlechtsspezifischen Inhalten mit React Intlayer

Um geschlechtsspezifische Inhalte innerhalb einer React-Komponente zu nutzen, importieren Sie den `useIntlayer` Hook aus dem `react-intlayer` Paket. Dieser Hook ruft die Inhalte für den angegebenen Schlüssel ab und ermöglicht es, ein Geschlecht zu übergeben, um die passende Ausgabe auszuwählen.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: mein Inhalt für männliche Nutzer */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für weibliche Nutzer */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für männliche Nutzer */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für weibliche Nutzer */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn kein Geschlecht angegeben ist */
          myGender("")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn kein Geschlecht angegeben ist */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: mein Inhalt für männliche Nutzer */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für weibliche Nutzer */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für männliche Nutzer */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für weibliche Nutzer */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn das Geschlecht nicht angegeben ist */
          myGender("")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn das Geschlecht nicht angegeben ist */
          /* Ausgabe: mein Inhalt für weibliche Nutzer */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für männliche Nutzer */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für weibliche Nutzer */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn das Geschlecht nicht angegeben ist */
          myGender("")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn das Geschlecht nicht angegeben ist */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: mein Inhalt für männliche Nutzer */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für weibliche Nutzer */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für männliche Nutzer */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt für weibliche Nutzer */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn das Geschlecht nicht angegeben ist */
          myGender("")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn das Geschlecht nicht angegeben ist */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
        {
          /* Ausgabe: mein Inhalt, wenn das Geschlecht nicht angegeben ist */
          myGender("")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn das Geschlecht nicht angegeben ist */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Zusätzliche Ressourcen

Für detailliertere Informationen zur Konfiguration und Nutzung verweisen wir auf die folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Nutzung von Intlayer in verschiedenen Umgebungen und Frameworks.

## Dokumentationshistorie

| Version | Datum      | Änderungen                                 |
| ------- | ---------- | ------------------------------------------ |
| 5.7.2   | 2025-07-27 | Einführung geschlechtsspezifischer Inhalte |
