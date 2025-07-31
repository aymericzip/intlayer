---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione Hook useIntlayer | react-intlayer
description: Vedi come utilizzare l'hook useIntlayer per il pacchetto react-intlayer
keywords:
  - useIntlayer
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
  - react-intlayer
  - useIntlayer
---

# Integrazione React: Documentazione Hook `useIntlayer`

Questa sezione fornisce una guida dettagliata sull'uso dell'hook `useIntlayer` all'interno delle applicazioni React, permettendo una localizzazione efficiente dei contenuti.

## Importare `useIntlayer` in React

L'hook `useIntlayer` può essere integrato nelle applicazioni React importandolo in base al contesto:

- **Componente Client:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Usato nei componenti React lato client
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Usato nei componenti React lato client
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Usato nei componenti React lato client
  ```

- **Componente Server:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Usato nei componenti React lato server
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Usato nei componenti React lato server
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Usato nei componenti React lato server
  ```

## Parametri

L'hook accetta due parametri:

1. **`key`**: La chiave del dizionario per recuperare il contenuto localizzato.
2. **`locale`** (opzionale): La localizzazione desiderata. Di default è la localizzazione del contesto se non specificata.

## Dizionario

Tutte le chiavi del dizionario devono essere dichiarate all'interno dei file di dichiarazione dei contenuti per migliorare la sicurezza dei tipi ed evitare errori. Puoi trovare le [istruzioni di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

## Esempio di utilizzo in React

Dimostrazione dell'hook `useIntlayer` all'interno di un componente React:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p> {/* descrizione del contenuto */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p> {/* descrizione del contenuto */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

jsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p> {/* descrizione del contenuto */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p> {/* descrizione del contenuto */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p> {/* descrizione del contenuto */}
    </div>
  );
};
```

## Gestione degli attributi

Quando si localizzano gli attributi, accedere ai valori del contenuto in modo appropriato:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Risorse aggiuntive

- **Editor Visivo Intlayer**: Per un'esperienza di gestione dei contenuti più intuitiva, fare riferimento alla documentazione dell'editor visivo [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

Questa sezione si rivolge specificamente all'integrazione del hook `useIntlayer` nelle applicazioni React, semplificando il processo di localizzazione e garantendo la coerenza dei contenuti tra le diverse località.

## Risorse Aggiuntive

- **Intlayer Visual Editor**: Per un'esperienza di gestione dei contenuti più intuitiva, fare riferimento alla documentazione dell'editor visuale [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

Questa sezione si concentra specificamente sull'integrazione del hook `useIntlayer` nelle applicazioni React, semplificando il processo di localizzazione e garantendo la coerenza dei contenuti tra le diverse località.

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Storia iniziale
