# Documentazione: `t` Funzione in `next-intlayer`

La funzione `t` nel pacchetto `next-intlayer` è uno strumento fondamentale per la localizzazione inline all'interno della tua applicazione Next.js. Ti consente di definire traduzioni direttamente all'interno dei tuoi componenti, rendendo semplice visualizzare contenuti localizzati in base alla lingua corrente.

---

## Panoramica

La funzione `t` viene utilizzata per fornire traduzioni per diverse lingue direttamente nei tuoi componenti. Passando un oggetto contenente traduzioni per ogni lingua supportata, `t` restituisce la traduzione appropriata in base al contesto della lingua corrente nella tua applicazione Next.js.

---

## Caratteristiche Chiave

- **Traduzioni Inline**: Ideale per testi rapidi e inline che non richiedono una dichiarazione di contenuto separata.
- **Selezione Automatica della Lingua**: Restituisce automaticamente la traduzione corrispondente alla lingua corrente.
- **Supporto TypeScript**: Fornisce sicurezza dei tipi e completamento automatico quando viene utilizzato con TypeScript.
- **Integrazione Facilmente**: Funziona senza problemi all'interno di componenti sia client che server in Next.js.

---

## Firma della Funzione

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametri

- `translations`: Un oggetto in cui le chiavi sono codici lingua (ad esempio, `en`, `fr`, `es`) e i valori sono le stringhe tradotte corrispondenti.

### Restituisce

- Una stringa che rappresenta il contenuto tradotto per la lingua corrente.

---

## Esempi di Utilizzo

### Utilizzare `t` in un Componente Client

Assicurati di includere la direttiva `'use client';` in cima al file del tuo componente quando utilizzi `t` in un componente lato client.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "Questo è il contenuto di un esempio di componente client",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "Questo è il contenuto di un esempio di componente client",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un esempio de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "Questo è il contenuto di un esempio di componente client",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un esempio de componente cliente",
    })}
  </p>
);
```

### Utilizzare `t` in un Componente Server

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "Questo è il contenuto di un esempio di componente server",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "Questo è il contenuto di un esempio di componente server",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "Questo è il contenuto di un esempio di componente server",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Traduzioni Inline negli Attributi

La funzione `t` è particolarmente utile per le traduzioni inline negli attributi JSX.
Quando localizzi attributi come `alt`, `title`, `href` o `aria-label`, puoi utilizzare `t` direttamente all'interno dell'attributo.

```jsx
<button
  aria-label={t({
    en: "Invia",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Invia",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "Uno scenario bello",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Argomenti Avanzati

### Integrazione con TypeScript

La funzione `t` è sicura per i tipi quando viene utilizzata con TypeScript, assicurando che tutte le lingue richieste siano incluse.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Benvenuto",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Benvenuto",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Benvenuto",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Rilevamento della Lingua e Contesto

In `next-intlayer`, la lingua corrente è gestita attraverso i provider di contesto: `IntlayerClientProvider` e `IntlayerServerProvider`. Assicurati che questi provider avvolgano i tuoi componenti e che la prop `locale` sia passata correttamente.

#### Esempio:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* I tuoi componenti qui */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* I tuoi componenti qui */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* I tuoi componenti qui */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Errori Comuni e Risoluzione dei Problemi

### `t` restituisce indefinito o traduzione errata

- **Causa**: La lingua corrente non è impostata correttamente, oppure la traduzione per la lingua corrente è mancante.
- **Soluzione**:
  - Verifica che il `IntlayerClientProvider` o `IntlayerServerProvider` sia configurato correttamente con il `locale` appropriato.
  - Assicurati che il tuo oggetto di traduzioni includa tutte le lingue necessarie.

### Traduzioni Mancanti in TypeScript

- **Causa**: L'oggetto delle traduzioni non soddisfa le lingue richieste, causando errori di TypeScript.
- **Soluzione**: Utilizza il tipo `IConfigLocales` per garantire la completezza delle tue traduzioni.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Testo",
  fr: "Texte",
  // es: 'Texto', // Mancante 'es' causerà un errore TypeScript [!code errore]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Testo",
  fr: "Texte",
  // es: 'Texto', // Mancante 'es' causerà un errore TypeScript [!code errore]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Testo",
  fr: "Texte",
  // es: 'Texto', // Mancante 'es' causerà un errore TypeScript [!code errore]
};

const text = t(translations);
```

---

## Suggerimenti per un Uso Efficace

1. **Usa `t` per Traduzioni Inline Semplici**: Ideale per tradurre piccoli pezzi di testo direttamente all'interno dei tuoi componenti.
2. **Preferisci `useIntlayer` per Contenuti Strutturati**: Per traduzioni più complesse e riutilizzo del contenuto, definisci contenuti in file di dichiarazione e utilizza `useIntlayer`.
3. **Fornitura Coerente della Lingua**: Assicurati che la tua lingua sia fornita in modo coerente in tutta la tua applicazione tramite i provider appropriati.
4. **Sfrutta TypeScript**: Utilizza i tipi TypeScript per catturare traduzioni mancanti e garantire la sicurezza dei tipi.

---

## Conclusione

La funzione `t` in `next-intlayer` è uno strumento potente e conveniente per gestire traduzioni inline nelle tue applicazioni Next.js. Integrandola efficacemente, migliori le capacità di internazionalizzazione della tua app, fornendo una migliore esperienza per gli utenti di tutto il mondo.

Per un utilizzo più dettagliato e funzionalità avanzate, consulta la [documentazione di next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

---

**Nota**: Ricorda di configurare correttamente il tuo `IntlayerClientProvider` e `IntlayerServerProvider` per garantire che la lingua corrente venga passata correttamente ai tuoi componenti. Questo è cruciale affinché la funzione `t` restituisca le traduzioni corrette.
