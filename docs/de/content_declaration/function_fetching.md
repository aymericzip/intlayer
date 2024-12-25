# Funktion Abrufen

Intlayer ermöglicht es Ihnen, Inhaltsfunktionen in Ihren Inhaltsmodulen zu deklarieren, die entweder synchron oder asynchron sein können. Wenn die Anwendung gebaut wird, führt Intlayer diese Funktionen aus, um das Ergebnis der Funktion zu erhalten. Der Rückgabewert muss ein JSON-Objekt oder ein einfacher Wert wie eine Zeichenfolge oder Zahl sein.

> Warnung: Das Abrufen von Funktionen ist derzeit nicht in der JSON-Inhaltsdeklaration und in Dateien für entfernte Inhaltsdeklarationen verfügbar.

## Funktionsdeklarationen

Hier ist ein Beispiel für eine einfache synchrone Funktion, die Inhalte abruft:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Dies ist der Inhalt, der von einer Funktion gerendert wird",
  },
} satisfies DeclarationContent;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Dies ist der Inhalt, der von einer Funktion gerendert wird",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Dies ist der Inhalt, der von einer Funktion gerendert wird",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "function_content",
  "content": {
    "text": "Dies ist der Inhalt, der von einer Funktion gerendert wird"
  }
}
```

In diesem Beispiel enthält der `text`-Schlüssel eine Funktion, die eine Zeichenfolge zurückgibt. Dieser Inhalt kann in Ihren React-Komponenten mithilfe von Intlayers Interpreter-Paketen wie `react-intlayer` gerendert werden.

## Asynchrone Funktionsabruf

Neben synchronen Funktionen unterstützt Intlayer auch asynchrone Funktionen, mit denen Sie Daten aus externen Quellen abrufen oder mit Mock-Daten die Datenbeschaffung simulieren können.

Nachfolgend ein Beispiel für eine asynchrone Funktion, die eine Serverabfrage simuliert:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Warten Sie 200 ms, um eine Abfrage vom Server zu simulieren
  return await setTimeout(200).then(
    () => "Dies ist der Inhalt, der vom Server abgerufen wurde"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // Warten Sie 200 ms, um eine Abfrage vom Server zu simulieren
  await setTimeout(200);
  return "Dies ist der Inhalt, der vom Server abgerufen wurde";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // Warten Sie 200 ms, um eine Abfrage vom Server zu simulieren
  await setTimeout(200);
  return "Dies ist der Inhalt, der vom Server abgerufen wurde";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Es gibt keine Möglichkeit, Inhalte aus einer JSON-Datei abzurufen, verwenden Sie stattdessen eine .ts- oder .js-Datei
```

In diesem Fall ahmt die `fakeFetch`-Funktion eine Verzögerung nach, um die Antwortzeit des Servers zu simulieren. Intlayer führt die asynchrone Funktion aus und verwendet das Ergebnis als Inhalt für den `text`-Schlüssel.

## Verwendung von funktionsbasiertem Inhalt in React-Komponenten

Um funktionsbasierten Inhalt in einer React-Komponente zu verwenden, müssen Sie `useIntlayer` aus `react-intlayer` importieren und mit der Inhalts-ID aufrufen, um den Inhalt abzurufen. Hier ist ein Beispiel:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Ausgabe: Dies ist der Inhalt, der von einer Funktion gerendert wird */}
      <p>{asyncFunctionContent.text}</p>
      {/* Ausgabe: Dies ist der Inhalt, der vom Server abgerufen wurde */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Ausgabe: Dies ist der Inhalt, der von einer Funktion gerendert wird */}
      <p>{asyncFunctionContent.text}</p>
      {/* Ausgabe: Dies ist der Inhalt, der vom Server abgerufen wurde */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Ausgabe: Dies ist der Inhalt, der von einer Funktion gerendert wird */}
      <p>{asyncFunctionContent.text}</p>
      {/* Ausgabe: Dies ist der Inhalt, der vom Server abgerufen wurde */}
    </div>
  );
};

module.exports = MyComponent;
```
