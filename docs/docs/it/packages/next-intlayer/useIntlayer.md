---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione Hook useIntlayer | next-intlayer
description: Scopri come utilizzare l'hook useIntlayer per il pacchetto next-intlayer
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
  - next-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Storia iniziale
---

# Integrazione Next.js: Documentazione Hook `useIntlayer`

L'hook `useIntlayer` è progettato per applicazioni Next.js per recuperare e gestire contenuti localizzati in modo efficiente. Questa documentazione si concentrerà su come utilizzare l'hook all'interno di progetti Next.js, garantendo pratiche di localizzazione corrette.

## Importare `useIntlayer` in Next.js

A seconda che tu stia lavorando su componenti client-side o server-side in un'applicazione Next.js, puoi importare l'hook `useIntlayer` come segue:

- **Componente Client:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Usato nei componenti client-side
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Usato nei componenti client-side
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Usato nei componenti client-side
  ```

- **Componente Server:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Usato nei componenti server-side
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Usato nei componenti server-side
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Usato nei componenti server-side
  ```

## Parametri

1. **`key`**: Un identificatore stringa per la chiave del dizionario da cui si desidera recuperare il contenuto.
2. **`locale`** (opzionale): Una locale specifica da utilizzare. Se omesso, l'hook utilizza la locale impostata nel contesto client o server.

## File del Dizionario

È fondamentale che tutte le chiavi di contenuto siano definite all'interno dei file di dichiarazione del contenuto per evitare errori di runtime e garantire la sicurezza dei tipi. Questo approccio facilita anche l'integrazione con TypeScript per la validazione a tempo di compilazione.

Le istruzioni per configurare i file di dichiarazione del contenuto sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

## Esempio di utilizzo in Next.js

Ecco come implementare il hook `useIntlayer` all'interno di una pagina Next.js per caricare dinamicamente contenuti localizzati in base alla locale corrente dell'applicazione:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
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

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduzione}</p>
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

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduzione}</p>
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

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Gestione della Localizzazione degli Attributi

Per localizzare attributi come `alt`, `title`, `href`, `aria-label`, ecc., assicurati di fare riferimento correttamente al contenuto:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Ulteriori Informazioni

- **Intlayer Visual Editor**: Scopri come utilizzare l'editor visuale per una gestione più semplice dei contenuti [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

Questa documentazione illustra l'uso del hook `useIntlayer` specificamente negli ambienti Next.js, fornendo una soluzione robusta per la gestione della localizzazione nelle tue applicazioni Next.js.
