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
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Storia iniziale"
author: aymericzip
---

# Integrazione React: Documentazione Hook `useIntlayer`

Questa sezione fornisce una guida dettagliata sull'uso dell'hook `useIntlayer` all'interno delle applicazioni React, permettendo una localizzazione efficiente dei contenuti.

## Esempio di utilizzo in React

Dimostrazione dell'hook `useIntlayer` all'interno di un componente React:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

## Risorse Aggiuntive

- **Intlayer Visual Editor**: Per un'esperienza di gestione dei contenuti più intuitiva, fare riferimento alla documentazione dell'editor visuale [qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

Questa sezione si concentra specificamente sull'integrazione del hook `useIntlayer` nelle applicazioni React, semplificando il processo di localizzazione e garantendo la coerenza dei contenuti tra le diverse località.
