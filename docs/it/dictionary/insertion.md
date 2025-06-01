# Contenuto di Inserimento / Insertion in Intlayer

## Come Funziona l'Inserimento

In Intlayer, il contenuto di inserimento viene realizzato attraverso la funzione `insertion`, che identifica i campi segnaposto in una stringa (come `{{name}}` o `{{age}}`) che possono essere sostituiti dinamicamente durante l'esecuzione. Questo approccio consente di creare stringhe flessibili, simili a modelli, in cui parti specifiche del contenuto sono determinate dai dati passati dalla tua applicazione.

Quando integrato con React Intlayer o Next Intlayer, puoi semplicemente fornire l'oggetto dati contenente i valori per ciascun segnaposto, e Intlayer renderizzerà automaticamente il contenuto con i segnaposto sostituiti.

## Configurazione del Contenuto di Inserimento

Per configurare il contenuto di inserimento nel tuo progetto Intlayer, crea un modulo di contenuto che includa le tue definizioni di inserimento. Di seguito sono riportati esempi in vari formati.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Ciao, mi chiamo {{name}} e ho {{age}} anni!"),
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
    myInsertion: insert("Ciao, mi chiamo {{name}} e ho {{age}} anni!"),
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
    myInsertion: insert("Ciao, mi chiamo {{name}} e ho {{age}} anni!"),
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
      "insertion": "Ciao, mi chiamo {{name}} e ho {{age}} anni!",
    },
  },
}
```

## Utilizzo del Contenuto di Inserimento con React Intlayer

Per utilizzare il contenuto di inserimento all'interno di un componente React, importa e utilizza il hook `useIntlayer` dal pacchetto `react-intlayer`. Questo hook recupera il contenuto per la chiave specificata e ti consente di passare un oggetto che mappa ciascun segnaposto nel tuo contenuto al valore che desideri visualizzare.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: "Ciao, mi chiamo John e ho 30 anni!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Puoi riutilizzare lo stesso inserimento con valori diversi */
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
          /* Output: "Ciao, mi chiamo John e ho 30 anni!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Puoi riutilizzare lo stesso inserimento con valori diversi */
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
          /* Output: "Ciao, mi chiamo John e ho 30 anni!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Puoi riutilizzare lo stesso inserimento con valori diversi */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Risorse Aggiuntive

Per informazioni più dettagliate sulla configurazione e sull'uso, consulta le seguenti risorse:

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)

Queste risorse offrono ulteriori approfondimenti sulla configurazione e sull'uso di Intlayer in vari ambienti e framework.
