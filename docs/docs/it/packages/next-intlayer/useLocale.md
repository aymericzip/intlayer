---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione Hook useLocale | next-intlayer
description: Scopri come utilizzare l'hook useLocale per il pacchetto next-intlayer
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

# Integrazione Next.js: Documentazione dell'hook `useLocale` per `next-intlayer`

Questa sezione offre una documentazione dettagliata sull'hook `useLocale` pensato per applicazioni Next.js all'interno della libreria `next-intlayer`. È progettato per gestire in modo efficiente i cambiamenti di locale e il routing.

## Importare `useLocale` in Next.js

Per utilizzare l'hook `useLocale` nella tua applicazione Next.js, importalo come mostrato di seguito:

```javascript
import { useLocale } from "next-intlayer"; // Usato per gestire i locali e il routing in Next.js
```

## Utilizzo

Ecco come implementare l'hook `useLocale` all'interno di un componente Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale Corrente: {locale}</h1>
      <p>Locale Predefinito: {defaultLocale}</p>
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
      <h1>Locale Corrente: {locale}</h1>
      <p>Locale Predefinito: {defaultLocale}</p>
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
      <h1>Locale Corrente: {locale}</h1>
      <p>Locale Predefinito: {defaultLocale}</p>
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

## Parametri e Valori di Ritorno

Quando si invoca l'hook `useLocale`, restituisce un oggetto contenente le seguenti proprietà:

- **`locale`**: La locale corrente come impostata nel contesto React.
- **`defaultLocale`**: La locale primaria definita nella configurazione.
- **`availableLocales`**: Una lista di tutte le localizzazioni disponibili come definite nella configurazione.
- **`setLocale`**: Una funzione per cambiare la locale dell'applicazione e aggiornare di conseguenza l'URL. Gestisce le regole del prefisso, decidendo se aggiungere o meno la locale al percorso in base alla configurazione. Utilizza `useRouter` da `next/navigation` per le funzioni di navigazione come `push` e `refresh`.
- **`pathWithoutLocale`**: Una proprietà calcolata che restituisce il percorso senza la locale. È utile per confrontare gli URL. Ad esempio, se la locale corrente è `fr` e l'URL è `fr/my_path`, il percorso senza locale è `/my_path`. Utilizza `usePathname` da `next/navigation` per ottenere il percorso corrente.

## Conclusione

L'hook `useLocale` di `next-intlayer` è uno strumento fondamentale per la gestione delle localizzazioni nelle applicazioni Next.js. Offre un approccio integrato per adattare la tua applicazione a più localizzazioni gestendo senza soluzione di continuità l'archiviazione della locale, la gestione dello stato e le modifiche degli URL.

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
