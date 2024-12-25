# Integrazione React: Documentazione del `useLocale` Hook

Questa sezione fornisce dettagli completi sul `useLocale` hook della libreria `react-intlayer`, progettato per gestire la gestione delle localizzazioni nelle applicazioni React.

## Importazione del `useLocale` in React

Per integrare il `useLocale` hook nella tua applicazione React, importalo dal suo pacchetto rispettivo:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Usato nei componenti React per la gestione delle localizzazioni
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Usato nei componenti React per la gestione delle localizzazioni
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Usato nei componenti React per la gestione delle localizzazioni
```

## Panoramica

Il `useLocale` hook offre un modo semplice per accedere e manipolare le impostazioni delle localizzazioni all'interno dei componenti React. Fornisce accesso alla localizzazione corrente, alla localizzazione predefinita, a tutte le localizzazioni disponibili e a funzioni per aggiornare le impostazioni delle localizzazioni.

## Utilizzo

Ecco come puoi utilizzare il `useLocale` hook all'interno di un componente React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

export default LocaleSwitcher;
```

## Parametri e Valori di Ritorno

Quando invochi il `useLocale` hook, restituisce un oggetto contenente le seguenti proprietà:

- **`locale`**: La localizzazione corrente impostata nel contesto React.
- **`defaultLocale`**: La localizzazione principale definita nella configurazione.
- **`availableLocales`**: Un elenco di tutte le localizzazioni disponibili come definite nella configurazione.
- **`setLocale`**: Una funzione per aggiornare la localizzazione corrente all'interno del contesto dell'applicazione.

## Esempio

Questo esempio mostra un componente che utilizza il `useLocale` hook per visualizzare un selettore di localizzazione, consentendo agli utenti di cambiare dinamicamente la localizzazione dell'applicazione:

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

Il `useLocale` hook di `react-intlayer` è uno strumento essenziale per gestire le localizzazioni nelle tue applicazioni React, fornendo la funzionalità necessaria per adattare la tua applicazione a diverse audience internazionali in modo efficace.
