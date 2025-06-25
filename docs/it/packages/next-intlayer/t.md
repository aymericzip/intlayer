---
docName: package__next-intlayer__t
url: /doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione della funzione t | next-intlayer
description: Scopri come utilizzare la funzione t per il pacchetto next-intlayer
keywords:
  - t
  - traduzione
  - Intlayer
  - next-intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `t` in `next-intlayer`

La funzione `t` nel pacchetto `next-intlayer` è uno strumento fondamentale per l'internazionalizzazione inline all'interno della tua applicazione Next.js. Ti consente di definire traduzioni direttamente nei tuoi componenti, rendendo semplice la visualizzazione di contenuti localizzati in base alla lingua corrente.

---

## Panoramica

La funzione `t` viene utilizzata per fornire traduzioni per diverse lingue direttamente nei tuoi componenti. Passando un oggetto contenente traduzioni per ogni lingua supportata, `t` restituisce la traduzione appropriata in base al contesto della lingua corrente nella tua applicazione Next.js.

---

## Caratteristiche principali

- **Traduzioni inline**: Ideale per testi rapidi e inline che non richiedono una dichiarazione di contenuto separata.
- **Selezione automatica della lingua**: Restituisce automaticamente la traduzione corrispondente alla lingua corrente.
- **Supporto TypeScript**: Fornisce sicurezza dei tipi e completamento automatico quando utilizzato con TypeScript.
- **Integrazione semplice**: Funziona perfettamente sia nei componenti client che server in Next.js.

---

## Firma della funzione

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametri

- `translations`: Un oggetto in cui le chiavi sono codici lingua (ad esempio, `en`, `fr`, `es`) e i valori sono le stringhe tradotte corrispondenti.

### Restituisce

- Una stringa che rappresenta il contenuto tradotto per la lingua corrente.

---

## Esempi di utilizzo

### Utilizzo di `t` in un componente client

Assicurati di includere la direttiva `'use client';` all'inizio del file del tuo componente quando utilizzi `t` in un componente lato client.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
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
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un esempio di componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un esempio di componente cliente",
    })}
  </p>
);
```

### Utilizzo di `t` in un componente server

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un esempio di componente server",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un esempio di componente server",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es il contenuto di un esempio di componente server",
    })}
  </p>
);
```

### Traduzioni inline negli attributi

La funzione `t` è particolarmente utile per traduzioni inline negli attributi JSX.
Quando localizzi attributi come `alt`, `title`, `href` o `aria-label`, puoi utilizzare `t` direttamente all'interno dell'attributo.

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

## Argomenti avanzati

### Integrazione con TypeScript

La funzione `t` è sicura per i tipi quando utilizzata con TypeScript, garantendo che tutte le lingue richieste siano fornite.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Rilevamento della lingua e contesto

In `next-intlayer`, la lingua corrente è gestita tramite i provider di contesto: `IntlayerClientProvider` e `IntlayerServerProvider`. Assicurati che questi provider avvolgano i tuoi componenti e che la prop `locale` sia passata correttamente.

#### Esempio:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

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
import { IntlayerServerProvider } from "next-intlayer/server";

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
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* I tuoi componenti qui */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Errori comuni e risoluzione dei problemi

### `t` restituisce undefined o una traduzione errata

- **Causa**: La lingua corrente non è impostata correttamente o la traduzione per la lingua corrente manca.
- **Soluzione**:
  - Verifica che `IntlayerClientProvider` o `IntlayerServerProvider` siano configurati correttamente con la lingua appropriata.
  - Assicurati che il tuo oggetto di traduzioni includa tutte le lingue necessarie.

### Traduzioni mancanti in TypeScript

- **Causa**: L'oggetto delle traduzioni non soddisfa le lingue richieste, causando errori in TypeScript.
- **Soluzione**: Usa il tipo `IConfigLocales` per garantire la completezza delle traduzioni.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Mancanza di 'es' causerà un errore in TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Mancanza di 'es' causerà un errore in TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Mancanza di 'es' causerà un errore in TypeScript [!code error]
};

const text = t(translations);
```

---

## Consigli per un utilizzo efficace

1. **Usa `t` per traduzioni inline semplici**: Ideale per tradurre piccoli pezzi di testo direttamente nei tuoi componenti.
2. **Preferisci `useIntlayer` per contenuti strutturati**: Per traduzioni più complesse e riutilizzo dei contenuti, definisci il contenuto nei file di dichiarazione e usa `useIntlayer`.
3. **Fornitura coerente della lingua**: Assicurati che la tua lingua sia fornita in modo coerente in tutta l'applicazione tramite i provider appropriati.
4. **Sfrutta TypeScript**: Usa i tipi TypeScript per individuare traduzioni mancanti e garantire la sicurezza dei tipi.

---

## Conclusione

La funzione `t` in `next-intlayer` è uno strumento potente e conveniente per gestire traduzioni inline nelle tue applicazioni Next.js. Integrandola efficacemente, migliori le capacità di internazionalizzazione della tua app, offrendo un'esperienza migliore agli utenti di tutto il mondo.

Per un utilizzo più dettagliato e funzionalità avanzate, consulta la [documentazione di next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md).

---

**Nota**: Ricorda di configurare correttamente i tuoi `IntlayerClientProvider` e `IntlayerServerProvider` per garantire che la lingua corrente venga passata correttamente ai tuoi componenti. Questo è cruciale affinché la funzione `t` restituisca le traduzioni corrette.
