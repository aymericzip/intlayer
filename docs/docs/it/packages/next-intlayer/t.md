---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione t | next-intlayer
description: Scopri come utilizzare la funzione t per il pacchetto next-intlayer
keywords:
  - t
  - traduzione
  - Intlayer
  - next-intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizio cronologia
---

# Documentazione: Funzione `t` in `next-intlayer`

La funzione `t` nel pacchetto `next-intlayer` è uno strumento fondamentale per l'internazionalizzazione inline all'interno della tua applicazione Next.js. Ti permette di definire traduzioni direttamente nei tuoi componenti, rendendo semplice la visualizzazione di contenuti localizzati in base alla lingua corrente.

---

## Panoramica

La funzione `t` viene utilizzata per fornire traduzioni per diverse località direttamente nei tuoi componenti. Passando un oggetto contenente le traduzioni per ogni lingua supportata, `t` restituisce la traduzione appropriata basata sul contesto della lingua corrente nella tua applicazione Next.js.

---

## Caratteristiche principali

- **Traduzioni inline**: Ideale per testi rapidi e inline che non richiedono una dichiarazione di contenuto separata.
- **Selezione automatica della lingua**: Restituisce automaticamente la traduzione corrispondente alla lingua corrente.
- **Supporto TypeScript**: Fornisce sicurezza di tipo e completamento automatico quando utilizzato con TypeScript.
- **Integrazione semplice**: Funziona perfettamente sia nei componenti client che server in Next.js.

---

## Firma della funzione

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametri

- `translations`: Un oggetto in cui le chiavi sono i codici delle lingue (ad esempio, `en`, `fr`, `es`) e i valori sono le stringhe tradotte corrispondenti.

### Ritorna

- Una stringa che rappresenta il contenuto tradotto per la lingua corrente.

---

## Esempi di utilizzo

### Utilizzo di `t` in un componente client

Assicurati di includere la direttiva `'use client';` all'inizio del file del componente quando usi `t` in un componente lato client.

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
      es: "Este es el contenido d un ejemplo de componente cliente",
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
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### Uso di `t` in un Componente Server

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
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

###Traduzioni Inline negli Attributi

La funzione `t` è particolarmente utile per le traduzioni inline negli attributi JSX.
Quando si localizzano attributi come `alt`, `title`, `href` o `aria-label`, è possibile utilizzare `t` direttamente all'interno dell'attributo.

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

La funzione `t` è type-safe quando utilizzata con TypeScript, garantendo che tutte le localizzazioni richieste siano fornite.

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
// Definizione delle traduzioni per le diverse lingue
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

// Uso della funzione t per ottenere la traduzione corretta
const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
// Definizione delle traduzioni per le diverse lingue
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

// Uso della funzione t per ottenere la traduzione corretta
const greeting = t(translations);
```

### Rilevamento della Locale e Contesto

In `next-intlayer`, la locale corrente è gestita tramite provider di contesto: `IntlayerClientProvider` e `IntlayerServerProvider`. Assicurati che questi provider avvolgano i tuoi componenti e che la proprietà `locale` sia passata correttamente.

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

## Errori Comuni e Risoluzione dei Problemi

### `t` Restituisce undefined o una traduzione errata

- **Causa**: La locale corrente non è impostata correttamente oppure manca la traduzione per la locale corrente.
- **Soluzione**:
  - Verifica che `IntlayerClientProvider` o `IntlayerServerProvider` siano configurati correttamente con la `locale` appropriata.
  - Assicurati che il tuo oggetto delle traduzioni includa tutte le locale necessarie.

### Traduzioni mancanti in TypeScript

- **Causa**: L'oggetto delle traduzioni non soddisfa le locale richieste, causando errori in TypeScript.
- **Soluzione**: Usa il tipo `IConfigLocales` per garantire la completezza delle tue traduzioni.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore TypeScript [!code error]
};

const text = t(translations);
```

---

## Consigli per un Uso Efficace

1. **Usa `t` per Traduzioni Inline Semplici**: Ideale per tradurre brevi testi direttamente all'interno dei tuoi componenti.
2. **Preferisci `useIntlayer` per Contenuti Strutturati**: Per traduzioni più complesse e il riutilizzo dei contenuti, definisci i contenuti nei file di dichiarazione e utilizza `useIntlayer`.
3. **Fornitura Coerente della Locale**: Assicurati che la tua locale sia fornita in modo coerente in tutta l'applicazione tramite i provider appropriati.
4. **Sfrutta TypeScript**: Usa i tipi di TypeScript per individuare traduzioni mancanti e garantire la sicurezza dei tipi.

---

## Conclusione

La funzione `t` in `next-intlayer` è uno strumento potente e comodo per gestire le traduzioni inline nelle tue applicazioni Next.js. Integrandola efficacemente, migliori le capacità di internazionalizzazione della tua app, offrendo un'esperienza migliore agli utenti di tutto il mondo.

Per un utilizzo più dettagliato e funzionalità avanzate, consulta la [documentazione di next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

---

**Nota**: Ricorda di configurare correttamente `IntlayerClientProvider` e `IntlayerServerProvider` per garantire che la locale corrente venga passata correttamente ai tuoi componenti. Questo è fondamentale affinché la funzione `t` restituisca le traduzioni corrette.
