---
docName: package__react-intlayer__useDictionary
url: https://intlayer.org/doc/package/react-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useDictionary.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hook useDictionary - Documentazione React Intlayer
description: Guida completa all'uso del hook useDictionary nelle applicazioni React con Intlayer per una gestione efficiente dei contenuti localizzati senza editor visuale.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localizzazione
  - i18n
  - dizionario
  - traduzione
---

# Integrazione React: Documentazione del Hook `useDictionary`

Questa sezione fornisce una guida dettagliata sull'uso del hook `useDictionary` nelle applicazioni React, consentendo una gestione efficiente dei contenuti localizzati senza un editor visuale.

## Importazione di `useDictionary` in React

Il hook `useDictionary` può essere integrato nelle applicazioni React importandolo in base al contesto:

- **Componente Client:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Usato nei componenti React lato client
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Usato nei componenti React lato client
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Usato nei componenti React lato client
  ```

- **Componente Server:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Usato nei componenti React lato server
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Usato nei componenti React lato server
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Usato nei componenti React lato server
  ```

## Parametri

Il hook accetta due parametri:

1. **`dictionary`**: Un oggetto dizionario dichiarato contenente contenuti localizzati per chiavi specifiche.
2. **`locale`** (opzionale): La locale desiderata. Per default è quella del contesto corrente se non specificata.

## Dizionario

Tutti gli oggetti dizionario devono essere dichiarati in file di contenuti strutturati per garantire la sicurezza dei tipi e prevenire errori a runtime. Puoi trovare le [istruzioni di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md). Ecco un esempio di dichiarazione del contenuto:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Dichiarazione del contenuto del componente
const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Contenuto del componente
const componentContent = {
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

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente",
        "it": "Esempio di componente client"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "it": "Questo è il contenuto di un esempio di componente client"
      }
    }
  }
}
```

## Esempio di utilizzo in React

Di seguito un esempio di come utilizzare l'hook `useDictionary` in un componente React:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Integrazione lato server

Se si utilizza l'hook `useDictionary` al di fuori di `IntlayerProvider`, la localizzazione deve essere fornita esplicitamente come parametro durante il rendering del componente:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

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

- **Sicurezza del Tipo**: Usa sempre `Dictionary` per definire i tuoi dizionari per garantire la sicurezza del tipo.
- **Aggiornamenti di Localizzazione**: Quando aggiorni il contenuto, assicurati che tutte le localizzazioni siano coerenti per evitare traduzioni mancanti.

Questa documentazione si concentra sull'integrazione del hook `useDictionary`, fornendo un approccio semplificato per gestire contenuti localizzati senza fare affidamento sulle funzionalità degli editor visuali.

## Cronologia Documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
