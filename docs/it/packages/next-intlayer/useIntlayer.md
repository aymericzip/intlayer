# Next.js integrazione: Documentazione del Hook `useIntlayer`

L'hook `useIntlayer` è progettato per le applicazioni Next.js per recuperare e gestire contenuti localizzati in modo efficiente. Questa documentazione si concentrerà su come utilizzare l'hook all'interno dei progetti Next.js, garantendo pratiche corrette di localizzazione.

## Importazione di `useIntlayer` in Next.js

A seconda che tu stia lavorando su componenti lato client o lato server in un'applicazione Next.js, puoi importare l'hook `useIntlayer` come segue:

- **Componente Client:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // Utilizzato nei componenti lato client
  ```

- **Componente Server:**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // Utilizzato nei componenti lato server
  ```

## Parametri

1. **`key`**: Un identificatore stringa per la chiave del dizionario da cui desideri recuperare il contenuto.
2. **`locale`** (opzionale): Una specifica lingua da utilizzare. Se omesso, l'hook predefinito utilizza la lingua impostata nel contesto client o server.

## File di Dichiarazione dei Contenuti

È cruciale che tutte le chiavi di contenuto siano definite all'interno dei file di dichiarazione dei contenuti per prevenire errori di runtime e garantire la sicurezza dei tipi. Questo approccio facilita anche l'integrazione di TypeScript per la validazione a tempo di compilazione.

Le istruzioni per impostare i file di dichiarazione dei contenuti sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

## Esempio di Utilizzo in Next.js

Ecco come puoi implementare l'hook `useIntlayer` all'interno di una pagina Next.js per caricare dinamicamente contenuti localizzati in base alla lingua corrente dell'applicazione:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

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

import { useIntlayer } from "next-intlayer/server";

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

## Gestione della Localizzazione degli Attributi

Per localizzare attributi come `alt`, `title`, `href`, `aria-label`, ecc., assicurati di fare riferimento al contenuto correttamente:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Ulteriori Informazioni

- **Editor Visivo Intlayer**: Scopri come utilizzare l'editor visivo per una gestione più semplice dei contenuti [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

Questa documentazione delinea l'uso dell'hook `useIntlayer` specificamente all'interno degli ambienti Next.js, fornendo una soluzione robusta per gestire la localizzazione delle tue applicazioni Next.js.
