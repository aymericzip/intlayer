---
docName: dictionary__nesting
url: https://intlayer.org/doc/concept/content/nesting
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Verschachtelung des Wörterbuchs
description: Erfahren Sie, wie Sie die Inhaltsverschachtelung in Intlayer nutzen können, um Ihre mehrsprachigen Inhalte effizient wiederzuverwenden und zu strukturieren. Folgen Sie dieser Dokumentation, um die Verschachtelung nahtlos in Ihr Projekt zu integrieren.
keywords:
  - Nesting
  - Inhaltswiederverwendung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Verschachtelung / Sub-Content-Referenzierung

## Wie Verschachtelung funktioniert

In Intlayer wird die Verschachtelung durch die Funktion `nest` erreicht, die es Ihnen ermöglicht, Inhalte aus einem anderen Wörterbuch zu referenzieren und wiederzuverwenden. Anstatt Inhalte zu duplizieren, können Sie auf ein bestehendes Inhaltsmodul mit seinem Schlüssel verweisen.

## Einrichtung der Verschachtelung

Um die Verschachtelung in Ihrem Intlayer-Projekt einzurichten, definieren Sie zunächst die Basisinhalte, die Sie wiederverwenden möchten. Anschließend verwenden Sie in einem separaten Inhaltsmodul die Funktion `nest`, um diese Inhalte zu importieren.

### Basis-Wörterbuch

Nachfolgend ein Beispiel für ein Basis-Wörterbuch, das in einem anderen Wörterbuch verschachtelt wird:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### Referenzierung mit Nest

Erstellen Sie nun ein weiteres Inhaltsmodul, das die Funktion `nest` verwendet, um auf die oben genannten Inhalte zu verweisen. Sie können auf den gesamten Inhalt oder einen spezifischen verschachtelten Wert verweisen:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Referenziert das gesamte Wörterbuch:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Referenziert einen spezifischen verschachtelten Wert:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

Als zweiten Parameter können Sie einen Pfad zu einem verschachtelten Wert innerhalb dieses Inhalts angeben. Wenn kein Pfad angegeben wird, wird der gesamte Inhalt des referenzierten Wörterbuchs zurückgegeben.

## Verwendung der Verschachtelung mit React Intlayer

Um verschachtelte Inhalte in einer React-Komponente zu verwenden, nutzen Sie den `useIntlayer`-Hook aus dem Paket `react-intlayer`. Dieser Hook ruft den richtigen Inhalt basierend auf dem angegebenen Schlüssel ab. Hier ist ein Beispiel, wie Sie ihn verwenden können:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Vollständiger verschachtelter Inhalt:{" "}
        {JSON.stringify(fullNestedContent)}
        {/* Ausgabe: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Teilweise verschachtelter Wert: {partialNestedContent}
        {/* Ausgabe: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Vollständiger verschachtelter Inhalt:{" "}
        {JSON.stringify(fullNestedContent)}
        {/* Ausgabe: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Teilweise verschachtelter Wert: {partialNestedContent}
        {/* Ausgabe: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Vollständiger verschachtelter Inhalt:{" "}
        {JSON.stringify(fullNestedContent)}
        {/* Ausgabe: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Teilweise verschachtelter Wert: {partialNestedContent}
        {/* Ausgabe: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Zusätzliche Ressourcen

Für detailliertere Informationen zur Konfiguration und Nutzung lesen Sie die folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Nutzung von Intlayer in verschiedenen Umgebungen und mit verschiedenen Frameworks.
