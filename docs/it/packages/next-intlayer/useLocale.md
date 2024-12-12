# Integrazione Next.js: Documentazione del Hook `useLocale` per `next-intlayer`

Questa sezione offre una documentazione dettagliata sull'hook `useLocale` progettato per le applicazioni Next.js all'interno della libreria `next-intlayer`. È progettato per gestire cambiamenti di locale e routing in modo efficiente.

## Importazione di `useLocale` in Next.js

Per utilizzare l'hook `useLocale` nella tua applicazione Next.js, importalo come mostrato di seguito:

```javascript
import { useLocale } from "next-intlayer"; // Utilizzato per gestire i locali e il routing in Next.js
```

## Utilizzo

Ecco come implementare l'hook `useLocale` all'interno di un componente Next.js:

```jsx
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

export default LocaleSwitcher;
```

## Parametri e Valori di Ritorno

Quando invochi l'hook `useLocale`, restituisce un oggetto contenente le seguenti proprietà:

- **`locale`**: Il locale corrente impostato nel contesto React.
- **`defaultLocale`**: Il locale principale definito nella configurazione.
- **`availableLocales`**: Una lista di tutti i locali disponibili come definiti nella configurazione.
- **`setLocale`**: Una funzione per cambiare il locale dell'applicazione e aggiornare l'URL di conseguenza. Si occupa delle regole di prefisso, se aggiungere o meno il locale al percorso in base alla configurazione. Utilizza `useRouter` da `next/navigation` per funzioni di navigazione come `push` e `refresh`.
- **`pathWithoutLocale`**: Una proprietà calcolata che restituisce il percorso senza il locale. È utile per confrontare URL. Ad esempio, se il locale corrente è `fr`, e l'url `fr/my_path`, il percorso senza locale è `/my_path`. Utilizza `usePathname` da `next/navigation` per ottenere il percorso corrente.

## Conclusione

L'hook `useLocale` di `next-intlayer` è uno strumento cruciale per gestire i locali nelle applicazioni Next.js. Offre un approccio integrato per adattare la tua applicazione a più locali gestendo il salvataggio dei locali, la gestione dello stato e le modifiche all'URL in modo fluido.
