# Documentazione: Funzione `t` in `react-intlayer`

La funzione `t` nel pacchetto `react-intlayer` è uno strumento fondamentale per l'internazionalizzazione inline all'interno della tua applicazione React. Ti consente di definire traduzioni direttamente nei tuoi componenti, rendendo semplice visualizzare contenuti localizzati in base alla lingua corrente.

---

## Panoramica

La funzione `t` viene utilizzata per fornire traduzioni per diverse lingue direttamente nei tuoi componenti. Passando un oggetto contenente le traduzioni per ogni lingua supportata, `t` restituisce la traduzione appropriata in base al contesto della lingua corrente nella tua applicazione React.

---

## Caratteristiche Principali

- **Traduzioni Inline**: Ideale per testi rapidi e inline che non richiedono una dichiarazione di contenuto separata.
- **Selezione Automatica della Lingua**: Restituisce automaticamente la traduzione corrispondente alla lingua corrente.
- **Supporto TypeScript**: Fornisce sicurezza dei tipi e completamento automatico quando utilizzato con TypeScript.
- **Integrazione Facile**: Funziona perfettamente all'interno dei componenti React.

---

## Firma della Funzione

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametri

- `translations`: Un oggetto in cui le chiavi sono i codici delle lingue (ad esempio, `en`, `fr`, `es`) e i valori sono le stringhe tradotte corrispondenti.

### Restituisce

- Una stringa che rappresenta il contenuto tradotto per la lingua corrente.

---

## Esempi di Utilizzo

### Utilizzo Base di `t` in un Componente

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Traduzioni Inline negli Attributi

La funzione `t` è particolarmente utile per traduzioni inline negli attributi JSX. Quando si localizzano attributi come `alt`, `title`, `href` o `aria-label`, puoi utilizzare `t` direttamente all'interno dell'attributo.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Argomenti Avanzati

### Integrazione con TypeScript

La funzione `t` è sicura per i tipi quando utilizzata con TypeScript, garantendo che tutte le lingue richieste siano fornite.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Rilevamento della Lingua e Contesto

In `react-intlayer`, la lingua corrente è gestita tramite il `IntlayerProvider`. Assicurati che questo provider racchiuda i tuoi componenti e che la prop `locale` sia passata correttamente.

#### Esempio:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* I tuoi componenti qui */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* I tuoi componenti qui */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* I tuoi componenti qui */}
  </IntlayerProvider>
);
```

---

## Errori Comuni e Risoluzione dei Problemi

### `t` Restituisce Undefined o Traduzione Errata

- **Causa**: La lingua corrente non è impostata correttamente o manca la traduzione per la lingua corrente.
- **Soluzione**:
  - Verifica che il `IntlayerProvider` sia configurato correttamente con la lingua appropriata.
  - Assicurati che il tuo oggetto di traduzioni includa tutte le lingue necessarie.

### Traduzioni Mancanti in TypeScript

- **Causa**: L'oggetto delle traduzioni non soddisfa le lingue richieste, causando errori in TypeScript.
- **Soluzione**: Usa il tipo `IConfigLocales` per garantire la completezza delle tue traduzioni.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore in TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore in TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore in TypeScript
};

const text = t(translations);
```

---

## Suggerimenti per un Utilizzo Efficace

1. **Usa `t` per Traduzioni Inline Semplici**: Ideale per tradurre piccoli pezzi di testo direttamente nei tuoi componenti.
2. **Preferisci `useIntlayer` per Contenuti Strutturati**: Per traduzioni più complesse e riutilizzo del contenuto, definisci il contenuto nei file di dichiarazione e usa `useIntlayer`.
3. **Fornitura Consistente della Lingua**: Assicurati che la lingua sia fornita in modo coerente in tutta l'applicazione tramite il `IntlayerProvider`.
4. **Sfrutta TypeScript**: Usa i tipi di TypeScript per individuare traduzioni mancanti e garantire la sicurezza dei tipi.

---

## Conclusione

La funzione `t` in `react-intlayer` è uno strumento potente e conveniente per gestire traduzioni inline nelle tue applicazioni React. Integrandola efficacemente, migliori le capacità di internazionalizzazione della tua app, offrendo un'esperienza migliore agli utenti di tutto il mondo.

Per un utilizzo più dettagliato e funzionalità avanzate, consulta la [documentazione di react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md).

---

**Nota**: Ricorda di configurare correttamente il tuo `IntlayerProvider` per garantire che la lingua corrente venga passata correttamente ai tuoi componenti. Questo è cruciale affinché la funzione `t` restituisca le traduzioni corrette.
