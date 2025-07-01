---
docName: dictionary__nesting
url: https://intlayer.org/doc/concept/content/nesting
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Nesting del dizionario
description: Scopri come utilizzare l’annidamento dei contenuti in Intlayer per riutilizzare e strutturare il tuo contenuto multilingue in modo efficiente. Segui questa documentazione per implementare facilmente l’annidamento nel tuo progetto.
keywords:
  - Nesting
  - Riutilizzo del contenuto
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Annidamento / Riferimento a Contenuti Annidati

## Come Funziona l'Annidamento

In Intlayer, l'annidamento viene realizzato tramite la funzione `nest`, che consente di fare riferimento e riutilizzare contenuti da un altro dizionario. Invece di duplicare i contenuti, è possibile puntare a un modulo di contenuto esistente tramite la sua chiave.

## Configurazione dell'Annidamento

Per configurare l'annidamento nel tuo progetto Intlayer, devi prima definire il contenuto base che desideri riutilizzare. Successivamente, in un modulo di contenuto separato, utilizzi la funzione `nest` per importare quel contenuto.

### Dizionario Base

Di seguito è riportato un esempio di un dizionario base da annidare in un altro dizionario:

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

### Riferimento con Annidamento

Ora, crea un altro modulo di contenuto che utilizza la funzione `nest` per fare riferimento al contenuto sopra. Puoi fare riferimento all'intero contenuto o a un valore specifico annidato:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Riferisce all'intero dizionario:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Riferisce a un valore specifico annidato:
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

Come secondo parametro, puoi specificare un percorso verso un valore annidato all'interno di quel contenuto. Quando non viene fornito alcun percorso, viene restituito l'intero contenuto del dizionario di riferimento.

## Utilizzo dell'Annidamento con React Intlayer

Per utilizzare contenuti annidati in un componente React, sfrutta il hook `useIntlayer` del pacchetto `react-intlayer`. Questo hook recupera il contenuto corretto in base alla chiave specificata. Ecco un esempio di come utilizzarlo:

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
        Contenuto Annidato Completo: {JSON.stringify(fullNestedContent)}
        {/* Output: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valore Annidato Parziale: {partialNestedContent}
        {/* Output: 0 */}
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
        Contenuto Annidato Completo: {JSON.stringify(fullNestedContent)}
        {/* Output: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valore Annidato Parziale: {partialNestedContent}
        {/* Output: 0 */}
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
        Contenuto Annidato Completo: {JSON.stringify(fullNestedContent)}
        {/* Output: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valore Annidato Parziale: {partialNestedContent}
        {/* Output: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Risorse Aggiuntive

Per informazioni più dettagliate sulla configurazione e sull'utilizzo, consulta le seguenti risorse:

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)

Queste risorse forniscono ulteriori approfondimenti sulla configurazione e sull'utilizzo di Intlayer in diversi ambienti e con vari framework.
