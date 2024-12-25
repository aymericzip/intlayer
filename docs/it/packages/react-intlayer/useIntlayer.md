# Integrazione React: Documentazione del Hook `useIntlayer`

Questa sezione fornisce indicazioni dettagliate sull'uso del hook `useIntlayer` all'interno delle applicazioni React, consentendo una localizzazione dei contenuti efficiente.

## Importazione di `useIntlayer` in React

Il hook `useIntlayer` può essere integrato nelle applicazioni React importandolo in base al contesto:

- **Componente Client:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Utilizzato nei componenti React lato client
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Utilizzato nei componenti React lato client
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Utilizzato nei componenti React lato client
  ```

- **Componente Server:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Utilizzato nei componenti React lato server
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Utilizzato nei componenti React lato server
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Utilizzato nei componenti React lato server
  ```

## Parametri

Il hook accetta due parametri:

1. **`key`**: La chiave del dizionario per recuperare contenuti localizzati.
2. **`locale`** (opzionale): La locale desiderata. Per impostazione predefinita è la locale del contesto se non specificata.

## Dichiarazione dei Contenuti

Tutte le chiavi del dizionario devono essere dichiarate all'interno dei file di dichiarazione dei contenuti per migliorare la sicurezza dei tipi ed evitare errori. Puoi trovare le istruzioni per la configurazione [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

## Esempio di Utilizzo in React

Dimostrando il hook `useIntlayer` all'interno di un componente React:

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
      <p>{content.description}</p>
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
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
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

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

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

Quando si localizzano gli attributi, accedi ai valori dei contenuti in modo appropriato:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Risorse Aggiuntive

- **Editor Visivo Intlayer**: Per un'esperienza di gestione dei contenuti più intuitiva, consulta la documentazione dell'editor visivo [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

Questa sezione si concentra specificamente sull'integrazione del hook `useIntlayer` nelle applicazioni React, semplificando il processo di localizzazione e garantendo coerenza dei contenuti attraverso diverse locali.
