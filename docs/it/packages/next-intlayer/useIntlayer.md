# Integrazione Next.js: Documentazione del Hook `useIntlayer`

Il hook `useIntlayer` è progettato per le applicazioni Next.js per recuperare e gestire contenuti localizzati in modo efficiente. Questa documentazione si concentrerà su come utilizzare il hook nei progetti Next.js, garantendo pratiche di localizzazione corrette.

## Importare `useIntlayer` in Next.js

A seconda che si stia lavorando su componenti lato client o lato server in un'applicazione Next.js, è possibile importare il hook `useIntlayer` come segue:

- **Componente Client:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Utilizzato nei componenti lato client
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Utilizzato nei componenti lato client
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Utilizzato nei componenti lato client
  ```

- **Componente Server:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Utilizzato nei componenti lato server
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Utilizzato nei componenti lato server
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Utilizzato nei componenti lato server
  ```

## Parametri

1. **`key`**: Un identificatore stringa per la chiave del dizionario da cui si desidera recuperare il contenuto.
2. **`locale`** (opzionale): Una specifica localizzazione da utilizzare. Se omesso, il hook utilizza per impostazione predefinita la localizzazione impostata nel contesto client o server.

## File del Dizionario

È fondamentale che tutte le chiavi dei contenuti siano definite all'interno dei file di dichiarazione dei contenuti per prevenire errori di runtime e garantire la sicurezza dei tipi. Questo approccio facilita anche l'integrazione con TypeScript per la validazione durante la compilazione.

Le istruzioni per configurare i file di dichiarazione dei contenuti sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md).

## Esempio di Utilizzo in Next.js

Ecco come è possibile implementare il hook `useIntlayer` all'interno di una pagina Next.js per caricare dinamicamente contenuti localizzati in base alla localizzazione corrente dell'applicazione:

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

Per localizzare attributi come `alt`, `title`, `href`, `aria-label`, ecc., assicurarsi di fare riferimento correttamente al contenuto:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Ulteriori Informazioni

- **Editor Visivo Intlayer**: Scopri come utilizzare l'editor visivo per una gestione più semplice dei contenuti [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md).

Questa documentazione descrive l'uso del hook `useIntlayer` specificamente negli ambienti Next.js, fornendo una soluzione robusta per gestire la localizzazione nelle applicazioni Next.js.
