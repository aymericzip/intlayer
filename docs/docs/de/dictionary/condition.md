---
docName: dictionary__condition
url: https://intlayer.org/doc/concept/content/condition
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Bedingte Inhalte
description: Erfahren Sie, wie Sie bedingte Inhalte in Intlayer nutzen können, um Inhalte dynamisch basierend auf bestimmten Bedingungen anzuzeigen. Folgen Sie dieser Dokumentation, um Bedingungen effizient in Ihr Projekt zu integrieren.
keywords:
  - Bedingte Inhalte
  - Dynamische Darstellung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Bedingter Inhalt / Bedingung in Intlayer

## Wie Bedingung funktioniert

In Intlayer wird bedingter Inhalt durch die `cond`-Funktion erreicht, die spezifische Bedingungen (typischerweise boolesche Werte) ihren entsprechenden Inhalten zuordnet. Dieser Ansatz ermöglicht es Ihnen, Inhalte dynamisch basierend auf einer gegebenen Bedingung auszuwählen. Wenn es mit React Intlayer oder Next Intlayer integriert ist, wird der entsprechende Inhalt automatisch gemäß der zur Laufzeit bereitgestellten Bedingung ausgewählt.

## Einrichten von bedingtem Inhalt

Um bedingten Inhalt in Ihrem Intlayer-Projekt einzurichten, erstellen Sie ein Inhaltsmodul, das Ihre bedingten Definitionen enthält. Nachfolgend finden Sie Beispiele in verschiedenen Formaten.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mein Inhalt, wenn es wahr ist",
      false: "mein Inhalt, wenn es falsch ist",
      fallback: "mein Inhalt, wenn die Bedingung fehlschlägt", // Optional
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mein Inhalt, wenn es wahr ist",
      false: "mein Inhalt, wenn es falsch ist",
      fallback: "mein Inhalt, wenn die Bedingung fehlschlägt", // Optional
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "mein Inhalt, wenn es wahr ist",
      false: "mein Inhalt, wenn es falsch ist",
      fallback: "mein Inhalt, wenn die Bedingung fehlschlägt", // Optional
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "mein Inhalt, wenn es wahr ist",
        "false": "mein Inhalt, wenn es falsch ist",
        "fallback": "mein Inhalt, wenn die Bedingung fehlschlägt", // Optional
      },
    },
  },
}
```

> Wenn kein Fallback deklariert ist, wird der zuletzt deklarierte Schlüssel als Fallback verwendet, falls die Bedingung nicht erfüllt ist.

## Verwendung von bedingtem Inhalt mit React Intlayer

Um bedingten Inhalt innerhalb einer React-Komponente zu verwenden, importieren und nutzen Sie den `useIntlayer`-Hook aus dem `react-intlayer`-Paket. Dieser Hook ruft den Inhalt für den angegebenen Schlüssel ab und ermöglicht es Ihnen, eine Bedingung zu übergeben, um die entsprechende Ausgabe auszuwählen.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn es wahr ist */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn es falsch ist */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn die Bedingung fehlschlägt */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn die Bedingung fehlschlägt */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn es wahr ist */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn es falsch ist */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn die Bedingung fehlschlägt */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn die Bedingung fehlschlägt */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn es wahr ist */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn es falsch ist */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn die Bedingung fehlschlägt */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Ausgabe: mein Inhalt, wenn die Bedingung fehlschlägt */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Zusätzliche Ressourcen

Für detailliertere Informationen zur Konfiguration und Nutzung finden Sie in den folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Nutzung von Intlayer in verschiedenen Umgebungen und Frameworks.
