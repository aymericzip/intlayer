# Integrazione React: Documentazione del Hook `useLocale`

Questa sezione fornisce dettagli completi sul hook `useLocale` della libreria `react-intlayer`, progettato per gestire la gestione delle locale nelle applicazioni React.

## Importare `useLocale` in React

Per integrare il hook `useLocale` nella tua applicazione React, importalo dal suo pacchetto rispettivo:

```javascript
import { useLocale } from "react-intlayer"; // Utilizzato nei componenti React per la gestione delle locale
```

## Panoramica

Il hook `useLocale` offre un modo facile per accedere e manipolare le impostazioni delle locale all'interno dei componenti React. Fornisce accesso alla locale corrente, alla locale predefinita, a tutte le locale disponibili e a funzioni per aggiornare le impostazioni delle locale.

## Utilizzo

Ecco come puoi utilizzare il hook `useLocale` all'interno di un componente React:

```jsx
import React from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale Corrente: {locale}</h1>
      <p>Locale Predefinita: {defaultLocale}</p>
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

Quando invochi il hook `useLocale`, esso restituisce un oggetto contenente le seguenti proprietà:

- **`locale`**: La locale corrente impostata nel contesto di React.
- **`defaultLocale`**: La locale primaria definita nella configurazione.
- **`availableLocales`**: Un elenco di tutte le locale disponibili come definite nella configurazione.
- **`setLocale`**: Una funzione per aggiornare la locale corrente all'interno del contesto dell'applicazione.

## Esempio

Questo esempio mostra un componente che utilizza il hook `useLocale` per visualizzare un selettore di locale, consentendo agli utenti di cambiare dinamicamente la locale dell'applicazione:

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
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
}

export default LocaleSelector;
```

## Conclusione

Il hook `useLocale` di `react-intlayer` è uno strumento essenziale per gestire le locale nelle tue applicazioni React, fornendo la funzionalità necessaria per adattare la tua applicazione a vari pubblici internazionali in modo efficace.
