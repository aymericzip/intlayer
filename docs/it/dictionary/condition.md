# Contenuto Condizionale / Condizione in Intlayer

## Come Funziona la Condizione

In Intlayer, il contenuto condizionale si ottiene tramite la funzione `cond`, che mappa condizioni specifiche (tipicamente valori booleani) al loro contenuto corrispondente. Questo approccio consente di selezionare dinamicamente il contenuto in base a una condizione fornita. Quando integrata con React Intlayer o Next Intlayer, il contenuto appropriato viene automaticamente scelto in base alla condizione fornita durante l'esecuzione.

## Configurazione del Contenuto Condizionale

Per configurare il contenuto condizionale nel tuo progetto Intlayer, crea un modulo di contenuto che includa le tue definizioni condizionali. Di seguito sono riportati esempi in vari formati.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "il mio contenuto quando è vero",
      false: "il mio contenuto quando è falso",
      fallback: "il mio contenuto quando la condizione fallisce", // Opzionale
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
      true: "il mio contenuto quando è vero",
      false: "il mio contenuto quando è falso",
      fallback: "il mio contenuto quando la condizione fallisce", // Opzionale
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
      true: "il mio contenuto quando è vero",
      false: "il mio contenuto quando è falso",
      fallback: "il mio contenuto quando la condizione fallisce", // Opzionale
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
        "true": "il mio contenuto quando è vero",
        "false": "il mio contenuto quando è falso",
        "fallback": "il mio contenuto quando la condizione fallisce", // Opzionale
      },
    },
  },
}
```

> Se non viene dichiarato alcun fallback, l'ultima chiave dichiarata verrà presa come fallback se la condizione non è validata.

## Utilizzo del Contenuto Condizionale con React Intlayer

Per utilizzare il contenuto condizionale all'interno di un componente React, importa e usa il hook `useIntlayer` dal pacchetto `react-intlayer`. Questo hook recupera il contenuto per la chiave specificata e consente di passare una condizione per selezionare il risultato appropriato.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: il mio contenuto quando è vero */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando è falso */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando la condizione fallisce */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando la condizione fallisce */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

### Modulo ECMAScript (`.mjx`)

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: il mio contenuto quando è vero */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando è falso */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando la condizione fallisce */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando la condizione fallisce */
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
          /* Output: il mio contenuto quando è vero */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando è falso */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando la condizione fallisce */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando la condizione fallisce */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Risorse Aggiuntive

Per informazioni più dettagliate sulla configurazione e sull'utilizzo, consulta le seguenti risorse:

- [Documentazione Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)

Queste risorse offrono ulteriori approfondimenti sull'impostazione e sull'utilizzo di Intlayer in vari ambienti e framework.
