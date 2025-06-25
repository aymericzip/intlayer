---
docName: package__react-intlayer__useLocale
url: /doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione dell'hook useLocale | react-intlayer
description: Scopri come utilizzare l'hook useLocale per il pacchetto react-intlayer
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

# Integrazione React: Documentazione del Hook `useLocale`

Questa sezione fornisce dettagli completi sull'hook `useLocale` della libreria `react-intlayer`, progettata per gestire la gestione delle impostazioni locali nelle applicazioni React.

## Importare `useLocale` in React

Per integrare l'hook `useLocale` nella tua applicazione React, importalo dal relativo pacchetto:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Utilizzato nei componenti React per la gestione delle impostazioni locali
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Utilizzato nei componenti React per la gestione delle impostazioni locali
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Utilizzato nei componenti React per la gestione delle impostazioni locali
```

## Panoramica

L'hook `useLocale` offre un modo semplice per accedere e manipolare le impostazioni locali all'interno dei componenti React. Fornisce accesso alla lingua corrente, alla lingua predefinita, a tutte le lingue disponibili e a funzioni per aggiornare le impostazioni locali.

## Utilizzo

Ecco come puoi utilizzare l'hook `useLocale` all'interno di un componente React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

export default LocaleSwitcher;
```

## Parametri e Valori Restituiti

Quando invochi l'hook `useLocale`, restituisce un oggetto contenente le seguenti proprietà:

- **`locale`**: La lingua corrente impostata nel contesto React.
- **`defaultLocale`**: La lingua principale definita nella configurazione.
- **`availableLocales`**: Un elenco di tutte le lingue disponibili come definite nella configurazione.
- **`setLocale`**: Una funzione per aggiornare la lingua corrente all'interno del contesto dell'applicazione.

## Esempio

Questo esempio mostra un componente che utilizza l'hook `useLocale` per rendere un selettore di lingua, consentendo agli utenti di cambiare dinamicamente la lingua dell'applicazione:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Conclusione

L'hook `useLocale` di `react-intlayer` è uno strumento essenziale per gestire le lingue nelle tue applicazioni React, fornendo la funzionalità necessaria per adattare efficacemente la tua applicazione a diversi pubblici internazionali.
