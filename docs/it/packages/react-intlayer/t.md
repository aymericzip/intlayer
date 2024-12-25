# Documentazione: `t` Funzione in `react-intlayer`

La funzione `t` nel pacchetto `react-intlayer` è uno strumento fondamentale per l'internazionalizzazione inline all'interno della tua applicazione React. Ti permette di definire traduzioni direttamente all'interno dei tuoi componenti, rendendo semplice visualizzare contenuti localizzati in base alla locale attuale.

---

## Panoramica

La funzione `t` è utilizzata per fornire traduzioni per diverse locali direttamente nei tuoi componenti. Passando un oggetto contenente traduzioni per ciascuna locale supportata, `t` restituisce la traduzione appropriata in base al contesto della locale attuale nella tua applicazione React.

---

## Caratteristiche Chiave

- **Traduzioni Inline**: Ideale per testo veloce inline che non richiede una dichiarazione di contenuto separata.
- **Selezione Automatica della Locale**: Restituisce automaticamente la traduzione corrispondente alla locale attuale.
- **Supporto TypeScript**: Fornisce sicurezza di tipo e completamento automatico quando utilizzato con TypeScript.
- **Facile Integrazione**: Funziona senza problemi all'interno dei componenti React.

---

## Firma della Funzione

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametri

- `translations`: Un oggetto dove le chiavi sono codici delle locali (ad es., `en`, `fr`, `es`) e i valori sono le corrispondenti stringhe tradotte.

### Restituisce

- Una stringa che rappresenta il contenuto tradotto per la locale attuale.

---

## Esempi di Utilizzo

### Utilizzo di Base di `t` in un Componente

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
          es: "Este es un esempio di componente",
        })}
      </p>
    </div>
  );
};
```

### Traduzioni Inline negli Attributi

La funzione `t` è particolarmente utile per traduzioni inline negli attributi JSX. Quando si localizzano attributi come `alt`, `title`, `href`, o `aria-label`, puoi usare `t` direttamente all'interno dell'attributo.

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

### Integrazione TypeScript

La funzione `t` è sicura per il tipo quando utilizzata con TypeScript, assicurando che tutte le locali richieste siano fornite.

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

### Rilevamento della Locale e Contesto

In `react-intlayer`, la locale attuale è gestita attraverso il `IntlayerProvider`. Assicurati che questo provider avvolga i tuoi componenti e che la prop `locale` sia correttamente passata.

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

### `t` Restituisce Undefined o Traduzione Corretta

- **Causa**: La locale attuale non è impostata correttamente, oppure la traduzione per la locale attuale è mancante.
- **Soluzione**:
  - Verifica che il `IntlayerProvider` sia impostato correttamente con la `locale` appropriata.
  - Assicurati che il tuo oggetto traduzioni includa tutte le locali necessarie.

### Traduzioni Mancanti in TypeScript

- **Causa**: L'oggetto traduzioni non soddisfa le locali richieste, portando a errori in TypeScript.
- **Soluzione**: Utilizza il tipo `IConfigLocales` per garantire la completezza delle tue traduzioni.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore TypeScript
};

const text = t(translations);
```

---

## Suggerimenti per un Utilizzo Efficace

1. **Usa `t` per Traduzioni Inline Semplici**: Ideale per tradurre piccole porzioni di testo direttamente all'interno dei tuoi componenti.
2. **Preferisci `useIntlayer` per Contenuti Strutturati**: Per traduzioni più complesse e riutilizzo dei contenuti, definisci il contenuto in file di dichiarazione e utilizza `useIntlayer`.
3. **Fornitura Consistente della Locale**: Assicurati che la tua locale sia fornita in modo coerente in tutta la tua applicazione attraverso il `IntlayerProvider`.
4. **Sfrutta TypeScript**: Utilizza i tipi di TypeScript per individuare traduzioni mancanti e garantire la sicurezza del tipo.

---

## Conclusione

La funzione `t` in `react-intlayer` è uno strumento potente e conveniente per gestire traduzioni inline nelle tue applicazioni React. Integrandolo efficacemente, migliori le capacità di internazionalizzazione della tua app, fornendo una migliore esperienza agli utenti di tutto il mondo.

Per ulteriori dettagli sull'uso e funzioni avanzate, fai riferimento alla [documentazione di react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

---

**Nota**: Ricorda di configurare correttamente il tuo `IntlayerProvider` per assicurarti che la locale attuale venga passata correttamente ai tuoi componenti. Questo è cruciale affinché la funzione `t` restituisca le traduzioni corrette.
