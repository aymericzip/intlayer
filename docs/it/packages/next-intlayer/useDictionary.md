---
docName: package__next-intlayer__useDictionary
url: /doc/packages/next-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useDictionary.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione del hook useDictionary | next-intlayer
description: Scopri come usare il hook useDictionary per il pacchetto next-intlayer
keywords:
  - useDictionary
  - dizionario
  - chiave
  - Intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - Reagire
---

# Integrazione React: Documentazione del Hook `useDictionary`

Questa sezione fornisce una guida dettagliata sull'utilizzo dell'hook `useDictionary` all'interno delle applicazioni React, consentendo una gestione efficiente dei contenuti localizzati senza un editor visivo.

## Importare `useDictionary` in React

L'hook `useDictionary` può essere integrato nelle applicazioni React importandolo in base al contesto:

- **Componente Client:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Utilizzato nei componenti React lato client
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Utilizzato nei componenti React lato client
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Utilizzato nei componenti React lato client
  ```

- **Componente Server:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Utilizzato nei componenti React lato server
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Utilizzato nei componenti React lato server
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Utilizzato nei componenti React lato server
  ```

## Parametri

L'hook accetta due parametri:

1. **`dictionary`**: Un oggetto dizionario dichiarato contenente contenuti localizzati per chiavi specifiche.
2. **`locale`** (opzionale): La lingua desiderata. Se non specificata, utilizza la lingua del contesto corrente.

## Dizionario

Tutti gli oggetti dizionario devono essere dichiarati in file di contenuto strutturati per garantire la sicurezza dei tipi ed evitare errori a runtime. Puoi trovare le istruzioni di configurazione [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md). Ecco un esempio di dichiarazione di contenuto:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

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

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
      es: "Este es el contenido de un esempio di componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Esempio di Utilizzo in un Componente Client React

Di seguito un esempio di utilizzo dell'hook `useDictionary` in un componente React:

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

## Esempio di Utilizzo in un Componente Server React

Se utilizzi l'hook `useDictionary` al di fuori del `IntlayerServerProvider`, la lingua deve essere fornita esplicitamente come parametro durante il rendering del componente:

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

A differenza delle integrazioni che utilizzano editor visivi, attributi come `buttonTitle.value` non si applicano qui. Accedi direttamente alle stringhe localizzate come dichiarato nel tuo contenuto.

```jsx
<button title={content.title}>{content.content}</button>
```

## Suggerimenti Aggiuntivi

- **Sicurezza dei Tipi**: Utilizza sempre `Dictionary` per definire i tuoi dizionari per garantire la sicurezza dei tipi.
- **Aggiornamenti di Localizzazione**: Quando aggiorni i contenuti, assicurati che tutte le lingue siano coerenti per evitare traduzioni mancanti.

Questa documentazione si concentra sull'integrazione dell'hook `useDictionary`, fornendo un approccio semplificato alla gestione dei contenuti localizzati senza fare affidamento sulle funzionalità di editor visivi.
