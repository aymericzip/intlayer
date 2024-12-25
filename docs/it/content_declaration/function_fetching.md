# Funzione Fetching

Intlayer ti permette di dichiarare funzioni di contenuto nei tuoi moduli di contenuto, che possono essere sia sincrone che asincrone. Quando l'applicazione viene costruita, Intlayer esegue queste funzioni per ottenere il risultato della funzione. Il valore di ritorno deve essere un oggetto JSON o un valore semplice come una stringa o un numero.

> Attenzione: il fetching delle funzioni non è attualmente disponibile nella dichiarazione di contenuto JSON e nei file di dichiarazione di contenuto remoto.

## Dichiarazioni di Funzione

Ecco un esempio di una semplice funzione sincrona che recupera contenuto:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Questo è il contenuto renderizzato da una funzione",
  },
} satisfies DeclarationContent;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Questo è il contenuto renderizzato da una funzione",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Questo è il contenuto renderizzato da una funzione",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "function_content",
  "content": {
    "text": "Questo è il contenuto renderizzato da una funzione"
  }
}
```

In questo esempio, la chiave `text` contiene una funzione che restituisce una stringa. Questo contenuto può essere renderizzato nei tuoi componenti React utilizzando i pacchetti interpreti di Intlayer come `react-intlayer`.

## Fetching di Funzioni Asincrone

Oltre alle funzioni sincrone, Intlayer supporta funzioni asincrone, consentendo di recuperare dati da fonti esterne o simulare il recupero di dati con dati fittizi.

Di seguito è riportato un esempio di una funzione asincrona che simula un fetch dal server:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Aspetta 200ms per simulare un fetch dal server
  return await setTimeout(200).then(
    () => "Questo è il contenuto recuperato dal server"
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
  // Aspetta 200ms per simulare un fetch dal server
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

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // Aspetta 200ms per simulare un fetch dal server
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
Impossibile recuperare contenuto da un file JSON, utilizza un file .ts o .js invece
```

In questo caso, la funzione `fakeFetch` simula un ritardo per mimare il tempo di risposta del server. Intlayer esegue la funzione asincrona e utilizza il risultato come contenuto per la chiave `text`.

## Utilizzo del Contenuto Basato su Funzione nei Componenti React

Per utilizzare il contenuto basato su funzioni in un componente React, è necessario importare `useIntlayer` da `react-intlayer` e chiamarlo con l'ID del contenuto per recuperare il contenuto. Ecco un esempio:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Output: Questo è il contenuto renderizzato da una funzione */}
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
      {/* Output: Questo è il contenuto renderizzato da una funzione */}
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
      {/* Output: Questo è il contenuto renderizzato da una funzione */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: Questo è il contenuto recuperato dal server */}
    </div>
  );
};

module.exports = MyComponent;
```
