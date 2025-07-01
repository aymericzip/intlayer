---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione Hook useLocale | react-intlayer
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
slugs:
  - doc
  - packages
  - react-intlayer
  - useLocale
---

# Integrazione React: Documentazione Hook `useLocale`

Questa sezione fornisce dettagli completi sull'hook `useLocale` della libreria `react-intlayer`, progettato per gestire la gestione delle localizzazioni nelle applicazioni React.

## Importare `useLocale` in React

Per integrare l'hook `useLocale` nella tua applicazione React, importalo dal rispettivo pacchetto:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Usato nei componenti React per la gestione della localizzazione
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Usato nei componenti React per la gestione della localizzazione
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Usato nei componenti React per la gestione della localizzazione
```

## Panoramica

L'hook `useLocale` offre un modo semplice per accedere e manipolare le impostazioni della localizzazione all'interno dei componenti React. Fornisce accesso alla localizzazione corrente, alla localizzazione predefinita, a tutte le localizzazioni disponibili e alle funzioni per aggiornare le impostazioni della localizzazione.

## Utilizzo

Ecco come puoi usare l'hook `useLocale` all'interno di un componente React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Localizzazione corrente: {locale}</h1>
      <p>Localizzazione predefinita: {defaultLocale}</p>
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
      <h1>Localizzazione corrente: {locale}</h1>
      <p>Localizzazione predefinita: {defaultLocale}</p>
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
      <h1>Localizzazione corrente: {locale}</h1>
      <p>Localizzazione predefinita: {defaultLocale}</p>
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

## Parametri e Valori di Ritorno

Quando si invoca l'hook `useLocale`, restituisce un oggetto contenente le seguenti proprietà:

- **`locale`**: La localizzazione corrente impostata nel contesto React.
- **`defaultLocale`**: La localizzazione primaria definita nella configurazione.
- **`availableLocales`**: Una lista di tutte le localizzazioni disponibili come definite nella configurazione.
- **`setLocale`**: Una funzione per aggiornare la localizzazione corrente all'interno del contesto dell'applicazione.

## Esempio

Questo esempio mostra un componente che utilizza l'hook `useLocale` per rendere un selettore di localizzazione, permettendo agli utenti di cambiare dinamicamente la localizzazione dell'applicazione:

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

Il hook `useLocale` di `react-intlayer` è uno strumento essenziale per gestire le localizzazioni nelle tue applicazioni React, fornendo le funzionalità necessarie per adattare efficacemente la tua applicazione a diversi pubblici internazionali.

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Inizio cronologia
