---
docName: package__react-intlayer__t
url: https://intlayer.org/doc/packages/react-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione t | react-intlayer
description: Scopri come utilizzare la funzione t per il pacchetto react-intlayer
keywords:
  - t
  - traduzione
  - Intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `t` in `react-intlayer`

La funzione `t` nel pacchetto `react-intlayer` è uno strumento fondamentale per l'internazionalizzazione inline all'interno della tua applicazione React. Ti permette di definire traduzioni direttamente all'interno dei tuoi componenti, rendendo semplice la visualizzazione di contenuti localizzati in base alla locale corrente.

---

## Panoramica

La funzione `t` viene utilizzata per fornire traduzioni per diverse località direttamente nei tuoi componenti. Passando un oggetto contenente le traduzioni per ogni locale supportato, `t` restituisce la traduzione appropriata basata sul contesto della locale corrente nella tua applicazione React.

---

## Caratteristiche principali

- **Traduzioni inline**: Ideale per testi rapidi e inline che non richiedono una dichiarazione di contenuto separata.
- **Selezione automatica della locale**: Restituisce automaticamente la traduzione corrispondente alla locale corrente.
- **Supporto TypeScript**: Fornisce sicurezza di tipo e completamento automatico quando utilizzato con TypeScript.
- **Integrazione semplice**: Funziona perfettamente all'interno dei componenti React.

---

## Firma della funzione

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametri

- `translations`: Un oggetto in cui le chiavi sono codici di locale (ad esempio, `en`, `fr`, `es`) e i valori sono le stringhe tradotte corrispondenti.

### Ritorna

- Una stringa che rappresenta il contenuto tradotto per la locale corrente.

---

## Esempi di utilizzo

### Uso base di `t` in un componente

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

La funzione `t` è particolarmente utile per le traduzioni inline negli attributi JSX. Quando si localizzano attributi come `alt`, `title`, `href` o `aria-label`, è possibile usare `t` direttamente all'interno dell'attributo.

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
      en: "Un bellissimo paesaggio",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Argomenti Avanzati

### Integrazione con TypeScript

La funzione `t` è sicura dal punto di vista dei tipi quando usata con TypeScript, garantendo che tutte le localizzazioni richieste siano fornite.

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
  es: "Benvenuto",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Benvenuto",
};

const greeting = t(translations);
```

### Rilevamento della Localizzazione e Contesto

In `react-intlayer`, la localizzazione corrente è gestita tramite `IntlayerProvider`. Assicurati che questo provider avvolga i tuoi componenti e che la proprietà `locale` sia passata correttamente.

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

- **Causa**: La locale corrente non è impostata correttamente, oppure manca la traduzione per la locale corrente.
- **Soluzione**:
  - Verifica che `IntlayerProvider` sia configurato correttamente con la `locale` appropriata.
  - Assicurati che il tuo oggetto delle traduzioni includa tutte le locale necessarie.

### Traduzioni Mancanti in TypeScript

- **Causa**: L'oggetto delle traduzioni non soddisfa le locale richieste, causando errori in TypeScript.
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

## Consigli per un Uso Efficace

1. **Usa `t` per Traduzioni Inline Semplici**: Ideale per tradurre piccoli pezzi di testo direttamente all'interno dei tuoi componenti.
2. **Preferisci `useIntlayer` per Contenuti Strutturati**: Per traduzioni più complesse e riutilizzo di contenuti, definisci i contenuti nei file di dichiarazione e usa `useIntlayer`.
3. **Fornitura Coerente della Localizzazione**: Assicurati che la tua localizzazione sia fornita in modo coerente in tutta l'applicazione tramite `IntlayerProvider`.
4. **Sfrutta TypeScript**: Usa i tipi di TypeScript per individuare traduzioni mancanti e garantire la sicurezza dei tipi.

---

## Conclusione

La funzione `t` in `react-intlayer` è uno strumento potente e comodo per gestire traduzioni inline nelle tue applicazioni React. Integrandola efficacemente, migliori le capacità di internazionalizzazione della tua app, offrendo un'esperienza migliore agli utenti di tutto il mondo.

Per un utilizzo più dettagliato e funzionalità avanzate, consulta la [documentazione di react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

---

**Nota**: Ricorda di configurare correttamente il tuo `IntlayerProvider` per garantire che la localizzazione corrente venga passata correttamente ai tuoi componenti. Questo è fondamentale affinché la funzione `t` restituisca le traduzioni corrette.

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Inizio cronologia
