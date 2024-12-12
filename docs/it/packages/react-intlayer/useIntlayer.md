# Integrazione di React: Documentazione del Hook `useIntlayer`

Questa sezione fornisce una guida dettagliata su come utilizzare l'hook `useIntlayer` all'interno delle applicazioni React, consentendo una localizzazione efficiente dei contenuti.

## Importare `useIntlayer` in React

L'hook `useIntlayer` può essere integrato nelle applicazioni React importandolo in base al contesto:

- **Componente Client:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // Utilizzato nei componenti React lato client
  ```

- **Componente Server:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // Utilizzato nei componenti React lato server
  ```

## Parametri

L'hook accetta due parametri:

1. **`key`**: La chiave del dizionario per recuperare contenuti localizzati.
2. **`locale`** (opzionale): La locale desiderata. Di default è impostata sulla locale del contesto, se non specificata.

## Dichiarazione dei Contenuti

Tutte le chiavi del dizionario devono essere dichiarate all'interno dei file di dichiarazione dei contenuti per migliorare la sicurezza dei tipi ed evitare errori. Puoi trovare le istruzioni per la configurazione [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

## Esempio di Utilizzo in React

Dimostrazione dell'hook `useIntlayer` all'interno di un componente React:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
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

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Gestione degli Attributi

Quando localizzi gli attributi, accedi ai valori del contenuto in modo appropriato:

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Risorse Aggiuntive

- **Editor Visivo di Intlayer**: Per un'esperienza di gestione dei contenuti più intuitiva, consulta la documentazione dell'editor visivo [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

Questa sezione si concentra specificamente sull'integrazione dell'hook `useIntlayer` nelle applicazioni React, semplificando il processo di localizzazione e garantendo coerenza dei contenuti tra le diverse locali.
