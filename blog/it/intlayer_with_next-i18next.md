---
blogName: intlayer_with_next-i18next
url: /blog/intlayer-with-next-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_next-i18next.md
createdAt: 2024-08-11
updatedAt: 2025-01-02
title: Intlayer e next-i18next
description: Integra Intlayer con next-i18next per un'app Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internazionalizzazione
  - Blogumentazione
  - Next.js
  - JavaScript
  - React
---

# Next.js Internazionalizzazione (i18n) con next-i18next e Intlayer

Sia next-i18next che Intlayer sono framework di internazionalizzazione (i18n) open-source progettati per applicazioni Next.js. Sono ampiamente utilizzati per gestire traduzioni, localizzazione e cambio di lingua nei progetti software.

Entrambe le soluzioni includono tre nozioni principali:

1. **Dichiarazione dei Contenuti**: Il metodo per definire i contenuti traducibili della tua applicazione.

   - Chiamata `resource` nel caso di `i18next`, la dichiarazione dei contenuti è un oggetto JSON strutturato contenente coppie chiave-valore per traduzioni in una o più lingue. Vedi [documentazione di i18next](https://www.i18next.com/translation-function/essentials) per ulteriori informazioni.
   - Chiamata `file di dichiarazione dei contenuti` nel caso di `Intlayer`, la dichiarazione dei contenuti può essere un file JSON, JS o TS che esporta i dati strutturati. Vedi [documentazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/doc/concept/content) per ulteriori informazioni.

2. **Utilities**: Strumenti per costruire e interpretare le dichiarazioni dei contenuti nell'applicazione, come `getI18n()`, `useCurrentLocale()`, o `useChangeLocale()` per next-i18next, e `useIntlayer()` o `useLocale()` per Intlayer.

3. **Plugin e Middleware**: Funzionalità per gestire la reindirizzamento degli URL, ottimizzazione del bundle e altro, come `next-i18next/middleware` per next-i18next o `intlayerMiddleware` per Intlayer.

## Intlayer vs. i18next: Principali Differenze

Per esplorare le differenze tra i18next e Intlayer, controlla il nostro post sul blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/blog/it/i18next_vs_next-intl_vs_intlayer.md).

## Come Generare Dizionari next-i18next con Intlayer

### Perché Usare Intlayer con next-i18next?

I file di dichiarazione dei contenuti di Intlayer offrono generalmente una migliore esperienza per gli sviluppatori. Sono più flessibili e manutenibili grazie a due principali vantaggi:

1. **Posizionamento Flessibile**: Un file di dichiarazione dei contenuti di Intlayer può essere posizionato ovunque nell'albero dei file dell'applicazione, semplificando la gestione di componenti duplicati o eliminati senza lasciare dichiarazioni di contenuti non utilizzate.

   Esempi di strutture di file:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # File di dichiarazione dei contenuti
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # File di dichiarazione dei contenuti
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # File di dichiarazione dei contenuti
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # File di dichiarazione dei contenuti
               └── index.jsx
   ```

2. **Traduzioni Centralizzate**: Intlayer memorizza tutte le traduzioni in un unico file, garantendo che nessuna traduzione manchi. Quando si utilizza TypeScript, le traduzioni mancanti vengono automaticamente rilevate e segnalate come errori.

### Installazione

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Configurare Intlayer per Esportare Dizionari i18next

> L'esportazione delle risorse di i18next non garantisce una compatibilità 1:1 con altri framework. Si consiglia di attenersi a una configurazione basata su Intlayer per minimizzare i problemi.

Per esportare le risorse di i18next, configura Intlayer in un file `intlayer.config.ts`. Esempi di configurazioni:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

Ecco la continuazione e la correzione delle parti rimanenti del tuo documento:

---

### Importare Dizionari nella Tua Configurazione i18next

Per importare le risorse generate nella tua configurazione i18next, utilizza `i18next-resources-to-backend`. Di seguito sono riportati esempi:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### Dichiarazione dei Contenuti

Esempi di file di dichiarazione dei contenuti in vari formati:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Costruire le Risorse next-i18next

Per costruire le risorse next-i18next, esegui il seguente comando:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Questo genererà risorse nella directory `./i18next/resources`. L'output atteso:

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Nota: Il namespace di i18next corrisponde alla chiave di dichiarazione di Intlayer.

### Implementare il Plugin Next.js

Una volta configurato, implementa il plugin Next.js per ricostruire le tue risorse i18next ogni volta che i file di dichiarazione dei contenuti di Intlayer vengono aggiornati.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Usare il Contenuto nei Componenti Next.js

Dopo aver implementato il plugin Next.js, puoi utilizzare il contenuto nei tuoi componenti:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
