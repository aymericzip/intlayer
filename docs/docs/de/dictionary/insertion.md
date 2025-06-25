---
docName: dictionary__insertion
url: https://intlayer.org/doc/concept/content/insertion
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/insertion.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Einfügung
description: Erfahren Sie, wie Sie Platzhalter für Einfügungen in Ihrem Inhalt deklarieren und verwenden. Diese Dokumentation führt Sie durch die Schritte zur dynamischen Einfügung von Werten in vordefinierte Inhaltsstrukturen.
keywords:
  - Einfügung
  - Dynamischer Inhalt
  - Platzhalter
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Einfügeinhalte

## Wie das Einfügen funktioniert

In Intlayer wird das Einfügen von Inhalten durch die Funktion `insertion` erreicht, die Platzhalterfelder in einem String (wie `{{name}}` oder `{{age}}`) identifiziert, die zur Laufzeit dynamisch ersetzt werden können. Dieser Ansatz ermöglicht es Ihnen, flexible, vorlagenähnliche Strings zu erstellen, bei denen spezifische Teile des Inhalts durch Daten aus Ihrer Anwendung bestimmt werden.

Wenn Sie React Intlayer oder Next Intlayer integrieren, können Sie einfach das Datenobjekt bereitstellen, das die Werte für jeden Platzhalter enthält, und Intlayer rendert den Inhalt automatisch mit den ersetzten Platzhaltern.

## Einrichtung von Einfügeinhalten

Um Einfügeinhalte in Ihrem Intlayer-Projekt einzurichten, erstellen Sie ein Inhaltsmodul, das Ihre Einfügedefinitionen enthält. Nachfolgend finden Sie Beispiele in verschiedenen Formaten.

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

## Verwendung von Einfügeinhalten mit React Intlayer

Um Einfügeinhalte in einer React-Komponente zu verwenden, importieren und verwenden Sie den `useIntlayer`-Hook aus dem Paket `react-intlayer`. Dieser Hook ruft den Inhalt für den angegebenen Schlüssel ab und ermöglicht es Ihnen, ein Objekt zu übergeben, das jeden Platzhalter in Ihrem Inhalt mit dem Wert abbildet, den Sie anzeigen möchten.

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
          /* Sie können dieselbe Einfügung mit unterschiedlichen Werten wiederverwenden */
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
          /* Sie können dieselbe Einfügung mit unterschiedlichen Werten wiederverwenden */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Zusätzliche Ressourcen

Für detailliertere Informationen zur Konfiguration und Nutzung finden Sie in den folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Nutzung von Intlayer in verschiedenen Umgebungen und Frameworks.
