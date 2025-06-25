---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione del hook useLocale | next-intlayer
description: Scopri come utilizzare il hook useLocale per il pacchetto next-intlayer
keywords:
  - useLocale
  - dizionario
  - chiave
  - Intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
---

# Integrazione Next.js: Documentazione del hook `useLocale` per `next-intlayer`

Questa sezione offre una documentazione dettagliata sul hook `useLocale` progettato per applicazioni Next.js all'interno della libreria `next-intlayer`. È progettato per gestire i cambiamenti di lingua e il routing in modo efficiente.

## Importare `useLocale` in Next.js

Per utilizzare il hook `useLocale` nella tua applicazione Next.js, importalo come mostrato di seguito:

```javascript
import { useLocale } from "next-intlayer"; // Utilizzato per gestire le lingue e il routing in Next.js
```

## Utilizzo

Ecco come implementare il hook `useLocale` all'interno di un componente Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Lingua corrente: {locale}</h1>
      <p>Lingua predefinita: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Lingua corrente: {locale}</h1>
      <p>Lingua predefinita: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Lingua corrente: {locale}</h1>
      <p>Lingua predefinita: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Parametri e Valori Restituiti

Quando invochi il hook `useLocale`, restituisce un oggetto contenente le seguenti proprietà:

- **`locale`**: La lingua corrente impostata nel contesto React.
- **`defaultLocale`**: La lingua principale definita nella configurazione.
- **`availableLocales`**: Un elenco di tutte le lingue disponibili come definito nella configurazione.
- **`setLocale`**: Una funzione per cambiare la lingua dell'applicazione e aggiornare l'URL di conseguenza. Si occupa delle regole di prefisso, se aggiungere o meno la lingua al percorso in base alla configurazione. Utilizza `useRouter` da `next/navigation` per funzioni di navigazione come `push` e `refresh`.
- **`pathWithoutLocale`**: Una proprietà calcolata che restituisce il percorso senza la lingua. È utile per confrontare gli URL. Ad esempio, se la lingua corrente è `fr`, e l'url `fr/my_path`, il percorso senza lingua è `/my_path`. Utilizza `usePathname` da `next/navigation` per ottenere il percorso corrente.

## Conclusione

Il hook `useLocale` di `next-intlayer` è uno strumento cruciale per gestire le lingue nelle applicazioni Next.js. Offre un approccio integrato per adattare la tua applicazione a più lingue gestendo lo storage delle lingue, la gestione dello stato e le modifiche agli URL in modo fluido.
