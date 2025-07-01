---
docName: package__express-intlayer__t
url: https://intlayer.org/doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2025-06-29
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

# Documentazione: funzione `t` in `express-intlayer`

La funzione `t` nel pacchetto `express-intlayer` è l'utilità principale per fornire risposte localizzate nella tua applicazione Express. Semplifica l'internazionalizzazione (i18n) selezionando dinamicamente il contenuto in base alla lingua preferita dall'utente.

---

## Panoramica

La funzione `t` viene utilizzata per definire e recuperare le traduzioni per un insieme di lingue specificato. Determina automaticamente la lingua appropriata da restituire in base alle impostazioni della richiesta del client, come l'intestazione `Accept-Language`. Se la lingua preferita non è disponibile, effettua un fallback elegante alla locale predefinita specificata nella tua configurazione.

---

## Caratteristiche principali

- **Localizzazione Dinamica**: Seleziona automaticamente la traduzione più appropriata per il client.
- **Fallback alla locale predefinita**: Effettua un fallback a una locale predefinita se la lingua preferita dal client non è disponibile, garantendo continuità nell'esperienza utente.
- **Leggero e Veloce**: Progettato per applicazioni ad alte prestazioni, assicurando un overhead minimo.
- **Supporto alla Modalità Strict**: Impone un'aderenza rigorosa alle localizzazioni dichiarate per un comportamento affidabile.

---

## Firma della Funzione

```typescript
t(translations: Record<string, string>): string;
```

### Parametri

- `translations`: Un oggetto in cui le chiavi sono codici di localizzazione (es. `en`, `fr`, `es-MX`) e i valori sono le stringhe tradotte corrispondenti.

### Ritorna

- Una stringa che rappresenta il contenuto nella lingua preferita dal client.

---

## Caricamento del Gestore di Richieste per l'Internazionalizzazione

Per garantire che la funzionalità di internazionalizzazione fornita da `express-intlayer` funzioni correttamente, **devi** caricare il middleware di internazionalizzazione all'inizio della tua applicazione Express. Questo abilita la funzione `t` e assicura una corretta gestione del rilevamento della locale e della traduzione.

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

### Perché è Necessario

- **Rilevamento della Lingua**: Il middleware `intlayer` elabora le richieste in arrivo per rilevare la lingua preferita dall'utente basandosi su header, cookie o altri metodi configurati.
- **Contesto di Traduzione**: Imposta il contesto necessario affinché la funzione `t` operi correttamente, garantendo che le traduzioni vengano restituite nella lingua corretta.
- **Prevenzione degli Errori**: Senza questo middleware, l'uso della funzione `t` genererà errori a runtime perché le informazioni sulla lingua necessarie non saranno disponibili.

---

## Esempi di Utilizzo

### Esempio Base

Servi contenuti localizzati in diverse lingue:

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

**Richieste Client:**

- Un client con `Accept-Language: fr` riceverà `Bienvenue!`.
- Un client con `Accept-Language: es` riceverà `¡Bienvenido!`.
- Un client con `Accept-Language: de` riceverà `Welcome!` (locale predefinito).

### Gestione degli Errori

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

### Uso delle Varianti di Locale

Specifica traduzioni per varianti specifiche di locale:

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

## Argomenti Avanzati

### Meccanismo di Fallback

Se un locale preferito non è disponibile, la funzione `t` utilizzerà come fallback il locale predefinito definito nella configurazione:

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

Per esempio:

- Se `defaultLocale` è `Locales.CHINESE` e un client richiede `Locales.DUTCH`, la traduzione restituita sarà quella di `Locales.CHINESE`.
- Se `defaultLocale` non è definito, la funzione `t` utilizzerà come fallback il valore di `Locales.ENGLISH`.

---

### Applicazione della modalità rigorosa

Configura la funzione `t` per far rispettare rigorosamente le localizzazioni dichiarate:

| Modalità    | Comportamento                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `strict`    | Tutte le localizzazioni dichiarate devono avere traduzioni fornite. Le localizzazioni mancanti genereranno errori.  |
| `inclusive` | Le localizzazioni dichiarate devono avere traduzioni. Le localizzazioni mancanti generano avvisi ma sono accettate. |
| `loose`     | Qualsiasi localizzazione esistente è accettata, anche se non dichiarata.                                            |

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

La funzione `t` è type-safe quando usata con TypeScript. Definisci un oggetto di traduzioni type-safe:

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

### Errori Comuni e Risoluzione dei Problemi

| Problema                      | Causa                                                  | Soluzione                                                             |
| ----------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------- |
| Funzione `t` non funziona     | Middleware non caricato                                | Assicurarsi che `app.use(intlayer())` sia aggiunto prima delle rotte. |
| Errore di traduzioni mancanti | Modalità strict attivata senza tutte le localizzazioni | Fornire tutte le traduzioni richieste.                                |

---

## Consigli per un Uso Efficace

1. **Centralizza le Traduzioni**: Usa un modulo centralizzato o file JSON per gestire le traduzioni e migliorare la manutenibilità.
2. **Valida le Traduzioni**: Assicurati che ogni variante linguistica abbia una traduzione corrispondente per evitare fallback non necessari.
3. **Combina con l'i18n del Frontend**: Sincronizza con l'internazionalizzazione del frontend per un'esperienza utente fluida in tutta l'app.
4. **Valuta le Prestazioni**: Testa i tempi di risposta della tua app quando aggiungi traduzioni per garantire un impatto minimo.

---

## Conclusione

La funzione `t` è uno strumento potente per l'internazionalizzazione del backend. Usandola efficacemente, puoi creare un'applicazione più inclusiva e facile da usare per un pubblico globale. Per un utilizzo avanzato e opzioni di configurazione dettagliate, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Inizio cronologia
