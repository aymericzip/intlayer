---
docName: dictionary__function_fetching
url: https://intlayer.org/doc/concept/content/function-fetching
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/function_fetching.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Funktionsabruf
description: Entdecken Sie, wie Sie Funktionsabrufe in Ihrer mehrsprachigen Website deklarieren und verwenden. Folgen Sie den Schritten in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - Funktionsabruf
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Funktionsabruf

Intlayer ermöglicht es Ihnen, Inhaltsfunktionen in Ihren Inhaltsmodulen zu deklarieren, die entweder synchron oder asynchron sein können. Wenn die Anwendung gebaut wird, führt Intlayer diese Funktionen aus, um das Ergebnis der Funktion zu erhalten. Der Rückgabewert muss ein JSON-Objekt oder ein einfacher Wert wie ein String oder eine Zahl sein.

> Warnung: Funktionsabruf ist derzeit in JSON-Inhaltsdeklarationen und entfernten Inhaltsdeklarationsdateien nicht verfügbar.

## Funktionsdeklarationen

Hier ist ein Beispiel für eine einfache synchrone Funktion, die Inhalte abruft:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Dies ist der Inhalt, der von einer Funktion gerendert wird",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Dies ist der Inhalt, der von einer Funktion gerendert wird",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
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
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Dies ist der Inhalt, der von einer Funktion gerendert wird"
  }
}
```

In diesem Beispiel enthält der Schlüssel `text` eine Funktion, die einen String zurückgibt. Dieser Inhalt kann in Ihren React-Komponenten mit den Interpreter-Paketen von Intlayer wie `react-intlayer` gerendert werden.

## Asynchrone Funktionsabfrage

Neben synchronen Funktionen unterstützt Intlayer auch asynchrone Funktionen, die es ermöglichen, Daten aus externen Quellen abzurufen oder die Datenabfrage mit Mock-Daten zu simulieren.

Nachfolgend ein Beispiel für eine asynchrone Funktion, die einen Serverabruf simuliert:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Warte 200ms, um einen Abruf vom Server zu simulieren
  return await setTimeout(200).then(
    () => "Dies ist der vom Server abgerufene Inhalt"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Warte 200ms, um einen Abruf vom Server zu simulieren
  await setTimeout(200);
  return "Dies ist der vom Server abgerufene Inhalt";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Warte 200ms, um einen Abruf vom Server zu simulieren
  await setTimeout(200);
  return "Dies ist der vom Server abgerufene Inhalt";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Es ist nicht möglich, Inhalte aus einer JSON-Datei abzurufen, verwenden Sie stattdessen eine .ts- oder .js-Datei
```

In diesem Fall simuliert die Funktion `fakeFetch` eine Verzögerung, um die Serverantwortzeit nachzuahmen. Intlayer führt die asynchrone Funktion aus und verwendet das Ergebnis als Inhalt für den Schlüssel `text`.

## Verwendung von funktionsbasierten Inhalten in React-Komponenten

Um funktionsbasierte Inhalte in einer React-Komponente zu verwenden, müssen Sie `useIntlayer` aus `react-intlayer` importieren und mit der Inhalts-ID aufrufen, um den Inhalt abzurufen. Hier ist ein Beispiel:

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

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Initialer Verlauf
