---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Einfügung
description: Erfahren Sie, wie Sie Einfügeplatzhalter in Ihren Inhalten deklarieren und verwenden. Diese Dokumentation führt Sie durch die Schritte, um Werte dynamisch innerhalb vordefinierter Inhaltsstrukturen einzufügen.
keywords:
  - Einfügung
  - Dynamischer Inhalt
  - Platzhalter
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initiale Historie
---

# Einfügeinhalt / Einfügung in Intlayer

## Wie Einfügung funktioniert

In Intlayer wird Einfügeinhalt durch die Funktion `insertion` realisiert, die Platzhalterfelder in einem String erkennt (wie `{{name}}` oder `{{age}}`), welche zur Laufzeit dynamisch ersetzt werden können. Dieser Ansatz ermöglicht es Ihnen, flexible, vorlagenähnliche Strings zu erstellen, bei denen bestimmte Teile des Inhalts durch Daten bestimmt werden, die aus Ihrer Anwendung übergeben werden.

Wenn Intlayer mit React Intlayer oder Next Intlayer integriert ist, können Sie einfach das Datenobjekt bereitstellen, das die Werte für jeden Platzhalter enthält, und Intlayer rendert den Inhalt automatisch mit den ersetzten Platzhaltern.

## Einfügeinhalt einrichten

Um Einfügeinhalt in Ihrem Intlayer-Projekt einzurichten, erstellen Sie ein Inhaltsmodul, das Ihre Einfügedefinitionen enthält. Nachfolgend finden Sie Beispiele in verschiedenen Formaten.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Hallo, mein Name ist {{name}} und ich bin {{age}} Jahre alt!"
    ),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Hallo, mein Name ist {{name}} und ich bin {{age}} Jahre alt!"
    ),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Hallo, mein Name ist {{name}} und ich bin {{age}} Jahre alt!"
    ),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Hallo, mein Name ist {{name}} und ich bin {{age}} Jahre alt!",
    },
  },
}
```

## Verwendung von Insertion Content mit React Intlayer

markdown

## Verwendung von Einfügeinhalten mit React Intlayer

Um Einfügeinhalte innerhalb einer React-Komponente zu verwenden, importieren Sie den `useIntlayer`-Hook aus dem `react-intlayer`-Paket und verwenden ihn. Dieser Hook ruft den Inhalt für den angegebenen Schlüssel ab und ermöglicht es Ihnen, ein Objekt zu übergeben, das jeden Platzhalter in Ihrem Inhalt auf den Wert abbildet, den Sie anzeigen möchten.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: "Hallo, mein Name ist John und ich bin 30 Jahre alt!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Sie können denselben Einfügeinhalt mit unterschiedlichen Werten wiederverwenden */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: "Hallo, mein Name ist John und ich bin 30 Jahre alt!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Sie können dieselbe Einfügung mit unterschiedlichen Werten wiederverwenden */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: "Hallo, mein Name ist John und ich bin 30 Jahre alt!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Sie können denselben Einfügeinhalt mit unterschiedlichen Werten wiederverwenden */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Zusätzliche Ressourcen

Für detailliertere Informationen zur Konfiguration und Nutzung verweisen wir auf die folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Nutzung von Intlayer in verschiedenen Umgebungen und Frameworks.
