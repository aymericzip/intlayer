# Funzione di Fetching

## Dichiarazioni di Funzione

Intlayer ti consente di dichiarare funzioni di contenuto nei tuoi moduli di contenuto, che possono essere sia sincrone che asincrone. Quando l'applicazione viene costruita, Intlayer esegue queste funzioni per ottenere il risultato della funzione. Il valore di ritorno deve essere un oggetto JSON o un valore semplice come una stringa o un numero.

Ecco un esempio di una semplice funzione sincrona che recupera contenuto:

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Questo è il contenuto reso da una funzione",
  },
} satisfies DeclarationContent;

export default functionContent;
```

In questo esempio, la chiave `text` contiene una funzione che restituisce una stringa. Questo contenuto può essere visualizzato nei tuoi componenti React utilizzando i pacchetti di interprete di Intlayer come `react-intlayer`.

## Funzione di Fetching Asincrona

Oltre alle funzioni sincrone, Intlayer supporta funzioni asincrone, che ti permettono di recuperare dati da fonti esterne o simulare il recupero di dati con dati fittizi.

Di seguito un esempio di una funzione asincrona che simula un fetch dal server:

```typescript
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

In questo caso, la funzione `fakeFetch` imita un ritardo per simulare il tempo di risposta del server. Intlayer esegue la funzione asincrona e utilizza il risultato come contenuto per la chiave `text`.

## Utilizzo di Contenuti Basati su Funzioni nei Componenti React

Per utilizzare contenuti basati su funzioni in un componente React, è necessario importare `useIntlayer` da `react-intlayer` e chiamarlo con l'ID del contenuto per recuperare il contenuto. Ecco un esempio:

```javascript
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
