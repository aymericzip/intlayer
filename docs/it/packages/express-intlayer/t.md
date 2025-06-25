---
docName: package__express-intlayer__t
url: /doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2024-12-02
title: Documentazione della funzione t | express-intlayer
description: Scopri come utilizzare la funzione t per il pacchetto express-intlayer
keywords:
  - t
  - traduzione
  - Intlayer
  - Internazionalizzazione
  - Documentazione
  - Express
  - JavaScript
  - React
---

# Documentazione: Funzione `t` in `express-intlayer`

La funzione `t` nel pacchetto `express-intlayer` è l'utilità principale per fornire risposte localizzate nella tua applicazione Express. Semplifica l'internazionalizzazione (i18n) selezionando dinamicamente il contenuto in base alla lingua preferita dell'utente.

---

## Panoramica

La funzione `t` viene utilizzata per definire e recuperare traduzioni per un determinato set di lingue. Determina automaticamente la lingua appropriata da restituire in base alle impostazioni della richiesta del client, come l'intestazione `Accept-Language`. Se la lingua preferita non è disponibile, passa senza problemi alla lingua predefinita specificata nella configurazione.

---

## Caratteristiche principali

- **Localizzazione dinamica**: seleziona automaticamente la traduzione più appropriata per il client.
- **Fallback alla lingua predefinita**: passa a una lingua predefinita se la lingua preferita del client non è disponibile, garantendo continuità nell'esperienza utente.
- **Leggero e veloce**: progettato per applicazioni ad alte prestazioni, garantendo un sovraccarico minimo.
- **Supporto alla modalità rigorosa**: applica un'aderenza rigorosa alle lingue dichiarate per un comportamento affidabile.

---

## Firma della funzione

```typescript
t(translations: Record<string, string>): string;
```

### Parametri

- `translations`: un oggetto in cui le chiavi sono codici di lingua (ad esempio, `en`, `fr`, `es-MX`) e i valori sono le stringhe tradotte corrispondenti.

### Restituisce

- Una stringa che rappresenta il contenuto nella lingua preferita del client.

---

## Caricamento del gestore delle richieste di internazionalizzazione

Per garantire che la funzionalità di internazionalizzazione fornita da `express-intlayer` funzioni correttamente, **devi** caricare il middleware di internazionalizzazione all'inizio della tua applicazione Express. Questo abilita la funzione `t` e garantisce una corretta gestione del rilevamento della lingua e della traduzione.

Posiziona il middleware `app.use(intlayer())` **prima di qualsiasi route** nella tua applicazione per garantire che tutte le route beneficino dell'internazionalizzazione:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Carica il gestore delle richieste di internazionalizzazione
app.use(intlayer());

// Definisci le tue route dopo aver caricato il middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Carica il gestore delle richieste di internazionalizzazione
app.use(intlayer());

// Definisci le tue route dopo aver caricato il middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Carica il gestore delle richieste di internazionalizzazione
app.use(intlayer());

// Definisci le tue route dopo aver caricato il middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Perché è necessario

- **Rilevamento della lingua**: il middleware `intlayer` elabora le richieste in arrivo per rilevare la lingua preferita dell'utente in base a intestazioni, cookie o altri metodi configurati.
- **Contesto di traduzione**: imposta il contesto necessario affinché la funzione `t` operi correttamente, garantendo che le traduzioni vengano restituite nella lingua corretta.
- **Prevenzione degli errori**: senza questo middleware, l'utilizzo della funzione `t` genererà errori di runtime poiché le informazioni sulla lingua non saranno disponibili.

---

## Esempi di utilizzo

### Esempio base

Servire contenuti localizzati in diverse lingue:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Richieste del client:**

- Un client con `Accept-Language: fr` riceverà `Bienvenue!`.
- Un client con `Accept-Language: es` riceverà `¡Bienvenido!`.
- Un client con `Accept-Language: de` riceverà `Welcome!` (lingua predefinita).

### Gestione degli errori

Fornire messaggi di errore in più lingue:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Utilizzo di varianti di lingua

Specificare traduzioni per varianti specifiche di lingua:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Argomenti avanzati

### Meccanismo di fallback

Se una lingua preferita non è disponibile, la funzione `t` passerà alla lingua predefinita definita nella configurazione:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Ad esempio:

- Se `defaultLocale` è `Locales.CHINESE` e un client richiede `Locales.DUTCH`, la traduzione restituita sarà quella di `Locales.CHINESE`.
- Se `defaultLocale` non è definito, la funzione `t` passerà al valore di `Locales.ENGLISH`.

---

### Applicazione della modalità rigorosa

Configura la funzione `t` per applicare un'aderenza rigorosa alle lingue dichiarate:

| Modalità    | Comportamento                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------- |
| `strict`    | Tutte le lingue dichiarate devono avere traduzioni fornite. Le lingue mancanti generano errori.     |
| `inclusive` | Le lingue dichiarate devono avere traduzioni. Le lingue mancanti generano avvisi ma sono accettate. |
| `loose`     | Qualsiasi lingua esistente è accettata, anche se non dichiarata.                                    |

Esempio di configurazione:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... La tua configurazione esistente
  internationalization: {
    // ... La tua configurazione di internazionalizzazione esistente
    strictMode: "strict", // Applica la modalità rigorosa
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... La tua configurazione esistente
  internationalization: {
    // ... La tua configurazione di internazionalizzazione esistente
    strictMode: "strict", // Applica la modalità rigorosa
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... La tua configurazione esistente
  internationalization: {
    // ... La tua configurazione di internazionalizzazione esistente
    strictMode: "strict", // Applica la modalità rigorosa
  },
};

module.exports = config;
```

---

### Integrazione con TypeScript

La funzione `t` è sicura per i tipi quando utilizzata con TypeScript. Definisci un oggetto di traduzioni sicuro per i tipi:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Errori comuni e risoluzione dei problemi

| Problema                      | Causa                                             | Soluzione                                                            |
| ----------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| Funzione `t` non funzionante  | Middleware non caricato                           | Assicurati che `app.use(intlayer())` sia aggiunto prima delle route. |
| Errore di traduzioni mancanti | Modalità rigorosa abilitata senza tutte le lingue | Fornisci tutte le traduzioni richieste.                              |

---

## Suggerimenti per un utilizzo efficace

1. **Centralizza le traduzioni**: utilizza un modulo centralizzato o file JSON per gestire le traduzioni e migliorare la manutenibilità.
2. **Valida le traduzioni**: assicurati che ogni variante di lingua abbia una traduzione corrispondente per evitare fallback non necessari.
3. **Combina con i18n frontend**: sincronizza con l'internazionalizzazione frontend per un'esperienza utente senza interruzioni in tutta l'app.
4. **Valuta le prestazioni**: testa i tempi di risposta dell'app quando aggiungi traduzioni per garantire un impatto minimo.

---

## Conclusione

La funzione `t` è uno strumento potente per l'internazionalizzazione backend. Utilizzandola efficacemente, puoi creare un'applicazione più inclusiva e user-friendly per un pubblico globale. Per un utilizzo avanzato e opzioni di configurazione dettagliate, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).
