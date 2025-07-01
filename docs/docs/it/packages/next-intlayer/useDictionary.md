---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione Hook useDictionary | next-intlayer
description: Scopri come utilizzare l'hook useDictionary per il pacchetto next-intlayer
keywords:
  - useDictionary
  - dizionario
  - chiave
  - Intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useDictionary
---

# Integrazione React: Documentazione Hook `useDictionary`

Questa sezione fornisce una guida dettagliata sull'uso dell'hook `useDictionary` all'interno delle applicazioni React, permettendo una gestione efficiente dei contenuti localizzati senza un editor visuale.

## Importazione di `useDictionary` in React

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
2. **`locale`** (opzionale): La localizzazione desiderata. Per default è quella del contesto corrente se non specificata.

## Dizionario

Tutti gli oggetti dizionario devono essere dichiarati in file di contenuto strutturati per garantire la sicurezza dei tipi e prevenire errori a runtime. Puoi trovare le [istruzioni di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md). Ecco un esempio di dichiarazione del contenuto:

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
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Esempio di utilizzo in un componente client React

Di seguito è riportato un esempio di come utilizzare l'hook `useDictionary` in un componente React:

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

## Esempio di utilizzo in un componente React Server

Se stai utilizzando l'hook `useDictionary` al di fuori di `IntlayerServerProvider`, la locale deve essere fornita esplicitamente come parametro durante il rendering del componente:

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

A differenza delle integrazioni che utilizzano editor visuali, attributi come `buttonTitle.value` non si applicano qui. Invece, accedi direttamente alle stringhe localizzate come dichiarato nel tuo contenuto.

```jsx
<button title={content.title}>{content.content}</button>
```

## Suggerimenti Aggiuntivi

- **Sicurezza dei Tipi**: Usa sempre `Dictionary` per definire i tuoi dizionari per garantire la sicurezza dei tipi.
- **Aggiornamenti di Localizzazione**: Quando si aggiorna il contenuto, assicurarsi che tutte le localizzazioni siano coerenti per evitare traduzioni mancanti.

Questa documentazione si concentra sull'integrazione del hook `useDictionary`, offrendo un approccio semplificato per gestire contenuti localizzati senza fare affidamento sulle funzionalità degli editor visuali.

## Cronologia Documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
