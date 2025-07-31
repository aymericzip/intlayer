---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Contenuto Basato sul Genere
description: Scopri come utilizzare contenuti basati sul genere in Intlayer per visualizzare dinamicamente contenuti in base al genere. Segui questa documentazione per implementare contenuti specifici per genere in modo efficiente nel tuo progetto.
keywords:
  - Contenuto Basato sul Genere
  - Rendering Dinamico
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
---

# Contenuto Basato sul Genere / Genere in Intlayer

## Come Funziona il Genere

In Intlayer, il contenuto basato sul genere viene realizzato tramite la funzione `gender`, che associa valori di genere specifici ('male', 'female') ai contenuti corrispondenti. Questo approccio consente di selezionare dinamicamente il contenuto in base a un genere dato. Quando integrato con React Intlayer o Next Intlayer, il contenuto appropriato viene scelto automaticamente in base al genere fornito a runtime.

## Configurare il Contenuto Basato sul Genere

Per configurare contenuti basati sul genere nel tuo progetto Intlayer, crea un modulo di contenuto che includa le tue definizioni specifiche per genere. Di seguito sono riportati esempi in vari formati.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "il mio contenuto per utenti maschi",
      female: "il mio contenuto per utenti femmine",
      fallback: "il mio contenuto quando il genere non è specificato", // Opzionale
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "il mio contenuto per utenti maschi",
      female: "il mio contenuto per utenti femmine",
      fallback: "il mio contenuto quando il genere non è specificato", // Opzionale
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "il mio contenuto per utenti maschi",
      female: "il mio contenuto per utenti femmine",
      fallback: "il mio contenuto quando il genere non è specificato", // Opzionale
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "il mio contenuto per utenti maschi",
        "female": "il mio contenuto per utenti femmine",
        "fallback": "il mio contenuto quando il genere non è specificato", // Opzionale
      },
    },
  },
}
```

> Se non viene dichiarato un fallback, l'ultima chiave dichiarata verrà utilizzata come fallback se il genere non è specificato o non corrisponde a nessun genere definito.

## Utilizzo del Contenuto Basato sul Genere con React Intlayer

Per utilizzare contenuti basati sul genere all'interno di un componente React, importa e usa l'hook `useIntlayer` dal pacchetto `react-intlayer`. Questo hook recupera il contenuto per la chiave specificata e ti permette di passare un genere per selezionare l'output appropriato.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: il mio contenuto per utenti maschi */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere femminile */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere maschile */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere femminile */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando il genere non è specificato */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando il genere non è specificato */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere maschile */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere femminile */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere maschile */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere femminile */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando il genere non è specificato */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando il genere non è specificato */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere maschile */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere femminile */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere maschile */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto per utenti di genere femminile */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando il genere non è specificato */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: il mio contenuto quando il genere non è specificato */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Risorse Aggiuntive

Per informazioni più dettagliate sulla configurazione e l'uso, consulta le seguenti risorse:

- [Documentazione Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)

Queste risorse offrono ulteriori approfondimenti sulla configurazione e l'uso di Intlayer in diversi ambienti e framework.

## Cronologia del Documento

| Versione | Data       | Modifiche                                    |
| -------- | ---------- | -------------------------------------------- |
| 5.7.2    | 2025-07-27 | Introduzione del contenuto basato sul genere |
