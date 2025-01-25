# Documentazione: `t` Funzione in `express-intlayer`

La funzione `t` nel pacchetto `express-intlayer` è l'utilità principale per fornire risposte localizzate nella tua applicazione Express. Semplifica l'internazionalizzazione (i18n) selezionando dinamicamente i contenuti in base alla lingua preferita dell'utente.

---

## Panoramica

La funzione `t` viene utilizzata per definire e recuperare traduzioni per un determinato insieme di lingue. Determina automaticamente la lingua appropriata da restituire in base alle impostazioni della richiesta del client, come l'intestazione `Accept-Language`. Se la lingua preferita non è disponibile, torna elegantemente alla lingua predefinita specificata nella tua configurazione.

---

## Caratteristiche Chiave

- **Localizzazione Dinamica**: Seleziona automaticamente la traduzione più appropriata per il client.
- **Ritorno alla Lingua Predefinita**: Torna a una lingua predefinita se la lingua preferita del client non è disponibile, garantendo continuità nell'esperienza utente.
- **Leggero e Veloce**: Progettato per applicazioni ad alte prestazioni, garantendo un sovraccarico minimo.
- **Supporto per Modalità Strict**: Impone una rigorosa aderenza alle lingue dichiarate per un comportamento affidabile.

---

## Firma della Funzione

```typescript
t(translations: Record<string, string>): string;
```

### Parametri

- `translations`: Un oggetto in cui le chiavi sono codici locali (ad esempio, `en`, `fr`, `es-MX`) e i valori sono le corrispondenti stringhe tradotte.

### Restituisce

- Una stringa che rappresenta il contenuto nella lingua preferita del client.

---

## Caricamento del Gestore della Richiesta di Internazionalizzazione

Per garantire che la funzionalità di internazionalizzazione fornita da `express-intlayer` funzioni correttamente, **devi** caricare il middleware di internazionalizzazione all'inizio della tua applicazione Express. Questo abilita la funzione `t` e garantisce una corretta gestione della rilevazione delle lingue e della traduzione.

Posiziona il middleware `app.use(intlayer())` **prima di qualsiasi route** nella tua applicazione per garantire che tutte le route beneficino dell'internazionalizzazione:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Carica il gestore della richiesta di internazionalizzazione
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

// Carica il gestore della richiesta di internazionalizzazione
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

// Carica il gestore della richiesta di internazionalizzazione
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

### Perché Questo È Necessario

- **Rilevamento della Lingua**: Il middleware `intlayer` elabora le richieste in arrivo per rilevare la lingua preferita dell'utente in base a intestazioni, cookie o altri metodi configurati.
- **Contesto di Traduzione**: Imposta il contesto necessario affinché la funzione `t` funzioni correttamente, garantendo che le traduzioni siano restituite nella lingua corretta.
- **Prevenzione degli Errori**: Senza questo middleware, l'utilizzo della funzione `t` risulterà in errori di runtime poiché le informazioni sulla lingua necessarie non saranno disponibili.

---

## Esempi di Utilizzo

### Esempio Base

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

**Richieste del Client:**

- Un client con `Accept-Language: fr` riceverà `Bienvenue!`.
- Un client con `Accept-Language: es` riceverà `¡Bienvenido!`.
- Un client con `Accept-Language: de` riceverà `Welcome!` (lingua predefinita).

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

### Utilizzo delle Varianti Locali

Specificare traduzioni per le varianti locali specifiche:

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

Se una lingua preferita non è disponibile, la funzione `t` tornerà alla lingua predefinita definita nella configurazione:

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

- Se `defaultLocale` è `Locales.CHINESE` e un client richiede `Locales.DUTCH`, la traduzione restituita tornerà al valore di `Locales.CHINESE`.
- Se `defaultLocale` non è definito, la funzione `t` tornerà al valore di `Locales.ENGLISH`.

---

### Applicazione della Modalità Strict

Configura la funzione `t` per imporre una rigorosa aderenza alle lingue dichiarate:

| Modalità        | Comportamento                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------- |
| `strict`        | Tutte le lingue dichiarate devono avere traduzioni fornite. Le lingue mancanti genereranno errori.  |
| `required_only` | Le lingue dichiarate devono avere traduzioni. Le lingue mancanti attivano avvisi ma sono accettate. |
| `loose`         | Qualsiasi lingua esistente è accettata, anche se non dichiarata.                                    |

Esempio di Configurazione:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... La tua configurazione esistente
  internationalization: {
    // ... La tua configurazione di internazionalizzazione esistente
    strictMode: "strict", // Imposta la modalità strict
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
    strictMode: "strict", // Imposta la modalità strict
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
    strictMode: "strict", // Imposta la modalità strict
  },
};

module.exports = config;
```

---

### Integrazione con TypeScript

La funzione `t` è sicura nei tipi quando utilizzata con TypeScript. Definisci un oggetto di traduzione sicuro nei tipi:

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

| Problema                      | Causa                                          | Soluzione                                                            |
| ----------------------------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| Funzione `t` non funzionante  | Middleware non caricato                        | Assicurati che `app.use(intlayer())` sia aggiunto prima delle route. |
| Errore di traduzioni mancanti | Modalità strict attivata senza tutte le lingue | Fornisci tutte le traduzioni richieste.                              |

---

## Suggerimenti per un Uso Efficace

1. **Centralizza le Traduzioni**: Usa un modulo centralizzato o file JSON per gestire le traduzioni per migliorare la manutenibilità.
2. **Valida le Traduzioni**: Assicurati che ogni variante linguistica abbia una traduzione corrispondente per prevenire fallimenti inutili.
3. **Combina con i18n Frontend**: Sincronizza con l'internazionalizzazione frontend per un'esperienza utente senza soluzione di continuità nell'app.
4. **Valuta le Prestazioni**: Testa i tempi di risposta della tua app quando aggiungi traduzioni per garantire un impatto minimo.

---

## Conclusione

La funzione `t` è uno strumento potente per l'internazionalizzazione del backend. Utilizzandola efficacemente, puoi creare un'applicazione più inclusiva e user-friendly per un pubblico globale. Per un utilizzo avanzato e opzioni di configurazione dettagliate, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).
