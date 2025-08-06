---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione Hook useI18n | react-intlayer
description: Scopri come utilizzare l'hook useI18n nel pacchetto react-intlayer
keywords:
  - useI18n
  - i18n
  - traduzione
  - dizionario
  - Intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
---

# Integrazione React: Documentazione Hook `useI18n`

Questa sezione fornisce una guida dettagliata su come utilizzare l'hook `useI18n` all'interno delle applicazioni React, permettendo una localizzazione efficiente dei contenuti.

## Importare `useI18n` in React

L'hook `useI18n` può essere importato e integrato nelle applicazioni React a seconda del contesto come segue:

- **Componenti Client:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Usare nei componenti React lato client
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Usare nei componenti React lato client
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Usare nei componenti React lato client
  ```

- **Componenti Server:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Usare nei componenti React lato server
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Usare nei componenti React lato server
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Usare nei componenti React lato server
  ```

## Parametri

Questo hook accetta due parametri:

1. **`namespace`**: Un namespace del dizionario per delimitare le chiavi di traduzione.
2. **`locale`** (opzionale): La locale desiderata. Se non specificata, verrà usata come default la locale del contesto.

## Dizionario

Tutte le chiavi del dizionario devono essere dichiarate all'interno dei file di dichiarazione del contenuto per migliorare la sicurezza dei tipi e prevenire errori. [Le istruzioni di configurazione si trovano qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md).

## Esempi di utilizzo in React

Esempi di utilizzo dell'hook `useI18n` all'interno di componenti React:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduzione")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduzione")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostra il titolo */}
      <p>{t("description")}</p> {/* Mostra la descrizione */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostra il titolo */}
      <p>{t("description")}</p> {/* Mostra la descrizione */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostra il titolo */}
      <p>{t("description")}</p> {/* Mostra la descrizione */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostra il titolo */}
      <p>{t("description")}</p> {/* Mostra la descrizione */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react.intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Mostra il titolo */}
      <p>{t("description")}</p> {/* Mostra la descrizione */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react.intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## Gestione degli Attributi

Quando si localizzano gli attributi, accedere correttamente ai valori di traduzione:

```jsx
<button title={t("buttonTitle.value")}>{t("buttonText")}</button>

<!-- Per gli attributi di accessibilità (es. aria-label), usare .value poiché sono richieste stringhe pure -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Risorse Aggiuntive

- **Intlayer Visual Editor**: Per un'esperienza di gestione dei contenuti più intuitiva, fare riferimento alla documentazione dell'editor visuale [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

Questa sezione copre specificamente l'integrazione del hook `useI18n` nelle applicazioni React, semplificando il processo di localizzazione e garantendo la coerenza dei contenuti tra le diverse localizzazioni.

## Cronologia della Documentazione

- 6.0.0 - 2025-06-29: Scrittura iniziale della documentazione dell'hook `useI18n`
