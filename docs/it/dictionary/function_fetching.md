---
docName: dictionary__function_fetching
url: /doc/concept/content/function-fetching
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/function_fetching.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Recupero Funzione
description: Scopri come dichiarare e utilizzare il recupero della funzione nel tuo sito web multilingue. Segui i passaggi di questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - Recupero Funzione
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Funzione di Recupero

Intlayer consente di dichiarare funzioni di contenuto nei tuoi moduli di contenuto, che possono essere sincrone o asincrone. Quando l'applicazione viene costruita, Intlayer esegue queste funzioni per ottenere il risultato della funzione. Il valore restituito deve essere un oggetto JSON o un valore semplice come una stringa o un numero.

> Avviso: il recupero delle funzioni non è attualmente disponibile nella dichiarazione di contenuti JSON e nei file di dichiarazione di contenuti remoti.

## Dichiarazioni di Funzioni

Ecco un esempio di una semplice funzione sincrona per il recupero del contenuto:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Questo è il contenuto reso da una funzione",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Questo è il contenuto reso da una funzione",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Questo è il contenuto reso da una funzione",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Questo è il contenuto reso da una funzione"
  }
}
```

In questo esempio, la chiave `text` contiene una funzione che restituisce una stringa. Questo contenuto può essere reso nei tuoi componenti React utilizzando i pacchetti interprete di Intlayer come `react-intlayer`.

## Recupero di Funzioni Asincrone

Oltre alle funzioni sincrone, Intlayer supporta funzioni asincrone, consentendo di recuperare dati da fonti esterne o simulare il recupero di dati con dati mock.

Di seguito è riportato un esempio di una funzione asincrona che simula un recupero dal server:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Attendi 200ms per simulare un recupero dal server
  return await setTimeout(200).then(
    () => "Questo è il contenuto recuperato dal server"
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
  // Attendi 200ms per simulare un recupero dal server
  await setTimeout(200);
  return "Questo è il contenuto recuperato dal server";
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
  // Attendi 200ms per simulare un recupero dal server
  await setTimeout(200);
  return "Questo è il contenuto recuperato dal server";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Nessun modo per recuperare contenuti da un file JSON, usa un file .ts o .js invece
```

In questo caso, la funzione `fakeFetch` simula un ritardo per simulare il tempo di risposta del server. Intlayer esegue la funzione asincrona e utilizza il risultato come contenuto per la chiave `text`.

## Utilizzo di Contenuti Basati su Funzioni nei Componenti React

Per utilizzare contenuti basati su funzioni in un componente React, è necessario importare `useIntlayer` da `react-intlayer` e chiamarlo con l'ID del contenuto per recuperare il contenuto. Ecco un esempio:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Output: Questo è il contenuto reso da una funzione */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: Questo è il contenuto recuperato dal server */}
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
      {/* Output: Questo è il contenuto reso da una funzione */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: Questo è il contenuto recuperato dal server */}
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
      {/* Output: Questo è il contenuto reso da una funzione */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: Questo è il contenuto recuperato dal server */}
    </div>
  );
};

module.exports = MyComponent;
```
