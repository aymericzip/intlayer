# Enumerazione / Pluralizzazione

## Come Funziona l'Enumerazione

In Intlayer, l'enumerazione è realizzata attraverso la funzione `enu`, che mappa chiavi specifiche al loro contenuto corrispondente. Queste chiavi possono rappresentare valori numerici, intervalli o identificatori personalizzati. Quando utilizzato con React Intlayer o Next Intlayer, il contenuto appropriato viene selezionato automaticamente in base alla lingua dell'applicazione e alle regole definite.

## Configurazione dell'Enumerazione

Per configurare l'enumerazione nel tuo progetto Intlayer, devi creare un modulo di contenuti che includa definizioni di enumerazione. Ecco un esempio di una semplice enumerazione per il numero di auto:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Meno di meno di un'auto",
      "-1": "Meno di un'auto",
      "0": "Nessuna auto",
      "1": "Un'auto",
      ">5": "Alcune auto",
      ">19": "Molte auto",
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
      "<-1": "Meno di meno di un'auto",
      "-1": "Meno di un'auto",
      "0": "Nessuna auto",
      "1": "Un'auto",
      ">5": "Alcune auto",
      ">19": "Molte auto",
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type Dictionary } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Meno di meno di un'auto",
      "-1": "Meno di un'auto",
      "0": "Nessuna auto",
      "1": "Un'auto",
      ">5": "Alcune auto",
      ">19": "Molte auto",
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
      "<-1": "Meno di meno di un'auto",
      "-1": "Meno di un'auto",
      "0": "Nessuna auto",
      "1": "Un'auto",
      ">5": "Alcune auto",
      ">19": "Molte auto"
    }
  }
}
```

In questo esempio, `enu` mappa varie condizioni a contenuti specifici. Quando utilizzato in un componente React, Intlayer può scegliere automaticamente il contenuto appropriato in base alla variabile fornita.

## Utilizzo dell'Enumerazione con React Intlayer

Per utilizzare l'enumerazione in un componente React, puoi sfruttare l'hook `useIntlayer` dal pacchetto `react-intlayer`. Questo hook recupera il contenuto corretto in base all'ID specificato. Ecco un esempio di come utilizzarlo:

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Output: Nessuna auto */}
      <p>{content.numberOfCar(6)}</p> {/* Output: Alcune auto */}
      <p>{content.numberOfCar(20)}</p> {/* Output: Alcune auto */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Output: Nessuna auto */}
      <p>{content.numberOfCar(6)}</p> {/* Output: Alcune auto */}
      <p>{content.numberOfCar(20)}</p> {/* Output: Alcune auto */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Output: Nessuna auto */}
      <p>{content.numberOfCar(6)}</p> {/* Output: Alcune auto */}
      <p>{content.numberOfCar(20)}</p> {/* Output: Alcune auto */}
    </div>
  );
};

module.exports = CarComponent;
```

In questo esempio, il componente regola dinamicamente il suo output in base al numero di auto. Il contenuto corretto viene scelto automaticamente, a seconda dell'intervallo specificato.

## Note Importanti

- L'ordine di dichiarazione è cruciale nelle enumerazioni di Intlayer. La prima dichiarazione valida è quella che verrà utilizzata.
- Se più condizioni si applicano, assicurati che siano ordinate correttamente per evitare comportamenti inaspettati.

## Best Practices per l'Enumerazione

Per garantire che le tue enumerazioni funzionino come previsto, segui queste migliori pratiche:

- **Nomenclatura Coerente**: Usa ID chiari e consistenti per i moduli di enumerazione per evitare confusione.
- **Documentazione**: Documenta le chiavi della tua enumerazione e i loro output attesi per garantire la manutenibilità futura.
- **Gestione degli Errori**: Implementa la gestione degli errori per gestire i casi in cui non viene trovata alcuna enumerazione valida.
- **Ottimizzazione delle Prestazioni**: Per grandi applicazioni, riduci il numero di estensioni di file monitorate per migliorare le prestazioni.

## Risorse Aggiuntive

Per informazioni più dettagliate su configurazione e utilizzo, fai riferimento alle seguenti risorse:

- [Documentazione Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)

Queste risorse forniscono ulteriori approfondimenti sulla configurazione e l'utilizzo di Intlayer in diversi ambienti e con vari framework.
