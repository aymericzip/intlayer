# Integrazione React: Documentazione del Hook `useDictionary`

Questa sezione fornisce indicazioni dettagliate su come utilizzare il hook `useDictionary` all'interno delle applicazioni React, consentendo una gestione efficiente dei contenuti localizzati senza un editor visivo.

## Importazione di `useDictionary` in React

Il hook `useDictionary` può essere integrato nelle applicazioni React importandolo in base al contesto:

- **Componente Client:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Usato nei componenti React lato client
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Usato nei componenti React lato client
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Usato nei componenti React lato client
  ```

- **Componente Server:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Usato nei componenti React lato server
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Usato nei componenti React lato server
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Usato nei componenti React lato server
  ```

## Parametri

Il hook accetta due parametri:

1. **`dictionary`**: Un oggetto del dizionario dichiarato contenente contenuti localizzati per chiavi specifiche.
2. **`locale`** (opzionale): La lingua desiderata. Predefinito alla lingua del contesto attuale se non specificato.

## Dichiarazione dei Contenuti

Tutti gli oggetti del dizionario dovrebbero essere dichiarati in file di contenuti strutturati per garantire la sicurezza dei tipi e prevenire errori a runtime. Puoi trovare le istruzioni per la configurazione [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md). Ecco un esempio di dichiarazione dei contenuti:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */ // Tipo di contenuto dichiarato
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */ // Tipo di contenuto dichiarato
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Esempio di Utilizzo nel Componente Client di React

Di seguito è riportato un esempio di come utilizzare il hook `useDictionary` in un componente React:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Esempio di Utilizzo nel Componente Server di React

Se stai usando il hook `useDictionary` al di fuori di `IntlayerServerProvider`, la lingua deve essere fornita esplicitamente come parametro durante il rendering del componente:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Note sugli Attributi

A differenza delle integrazioni che utilizzano editor visivi, attributi come `buttonTitle.value` non si applicano qui. Accedi direttamente alle stringhe localizzate come dichiarato nei tuoi contenuti.

```jsx
<button title={content.title}>{content.content}</button>
```

## Suggerimenti Aggiuntivi

- **Sicurezza dei Tipi**: Usa sempre `DeclarationContent` per definire i tuoi dizionari per garantire la sicurezza dei tipi.
- **Aggiornamenti della Localizzazione**: Quando aggiorni contenuti, assicurati che tutte le lingue siano coerenti per evitare traduzioni mancanti.

Questa documentazione si concentra sull'integrazione del hook `useDictionary`, fornendo un approccio semplificato per gestire contenuti localizzati senza fare affidamento sulle funzionalità degli editor visivi.
