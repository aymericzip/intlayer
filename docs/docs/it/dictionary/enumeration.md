---
docName: dictionary__enumeration
url: https://intlayer.org/doc/concept/content/enumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Enumerazione
description: Scopri come dichiarare e utilizzare le enumerazioni nel tuo sito web multilingue. Segui i passaggi in questa documentazione online per impostare il tuo progetto in pochi minuti.
keywords:
  - Enumerazione
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Enumerazione / Pluralizzazione

## Come Funziona l'Enumerazione

In Intlayer, l'enumerazione viene realizzata tramite la funzione `enu`, che mappa chiavi specifiche ai loro contenuti corrispondenti. Queste chiavi possono rappresentare valori numerici, intervalli o identificatori personalizzati. Quando utilizzata con React Intlayer o Next Intlayer, il contenuto appropriato viene selezionato automaticamente in base alla lingua dell'applicazione e alle regole definite.

## Configurazione dell'Enumerazione

Per configurare l'enumerazione nel tuo progetto Intlayer, devi creare un modulo di contenuto che includa le definizioni di enumerazione. Ecco un esempio di una semplice enumerazione per il numero di auto:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Meno di meno una macchina",
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
      "fallback": "Valore di fallback", // Opzionale
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Meno di meno una macchina",
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
      "fallback": "Valore di fallback", // Opzionale
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Meno di meno una macchina",
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
      "fallback": "Valore di fallback", // Opzionale
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Meno di meno una macchina",
        "-1": "Meno una macchina",
        "0": "Nessuna macchina",
        "1": "Una macchina",
        ">5": "Alcune macchine",
        ">19": "Molte macchine",
        "fallback": "Valore di fallback" // Opzionale
      }
    }
  }
}
```

In questo esempio, `enu` mappa varie condizioni a contenuti specifici. Quando utilizzato in un componente React, Intlayer può scegliere automaticamente il contenuto appropriato in base alla variabile fornita.

> L'ordine di dichiarazione è importante nelle enumerazioni di Intlayer. La prima dichiarazione valida è quella che verrà selezionata. Se si applicano più condizioni, assicurati che siano ordinate correttamente per evitare comportamenti inaspettati.

> Se non viene dichiarato un valore di fallback, la funzione restituirà `undefined` se nessuna chiave corrisponde.

## Utilizzo dell'Enumerazione con React Intlayer

Per utilizzare l'enumerazione in un componente React, puoi sfruttare il hook `useIntlayer` del pacchetto `react-intlayer`. Questo hook recupera il contenuto corretto in base all'ID specificato. Ecco un esempio di come usarlo:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: Nessuna macchina
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Alcune macchine
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Molte macchine
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Valore di fallback
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: Nessuna macchina
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Alcune macchine
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Molte macchine
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Valore di fallback
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: Nessuna macchina
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Alcune macchine
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Molte macchine
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Valore di fallback
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

In questo esempio, il componente regola dinamicamente il suo output in base al numero di macchine. Il contenuto corretto viene scelto automaticamente, a seconda dell'intervallo specificato.

## Risorse Aggiuntive

Per informazioni più dettagliate sulla configurazione e sull'utilizzo, consulta le seguenti risorse:

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)

Queste risorse forniscono ulteriori approfondimenti sulla configurazione e sull'utilizzo di Intlayer in diversi ambienti e con vari framework.
