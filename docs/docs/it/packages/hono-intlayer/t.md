---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Documentazione della Funzione t | hono-intlayer
description: Scopri come usare la funzione t per il pacchetto hono-intlayer
keywords:
  - t
  - traduzione
  - Intlayer
  - Internazionalizzazione
  - Documentazione
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizializzazione cronologia
---

# Documentazione: Funzione `t` in `hono-intlayer`

La funzione `t` nel pacchetto `hono-intlayer` è l'utilità principale per fornire risposte localizzate nella tua applicazione Hono. Semplifica l'internazionalizzazione (i18n) selezionando dinamicamente il contenuto in base alla lingua preferita dell'utente.

---

## Panoramica

La funzione `t` viene utilizzata per definire e recuperare traduzioni per un determinato set di lingue. Determina automaticamente la lingua appropriata da restituire in base alle impostazioni della richiesta del client, come l'intestazione `Accept-Language`. Se la lingua preferita non è disponibile, ripiega elegantemente sulla locale predefinita specificata nella configurazione.

---

## Caratteristiche Principali

- **Localizzazione Dinamica**: Seleziona automaticamente la traduzione più appropriata per il client.
- **Fallback alla Locale Predefinita**: Ripiega su una locale predefinita se la lingua preferita del client non è disponibile, garantendo continuità nell'esperienza utente.
- **Leggero e Veloce**: Progettato per applicazioni ad alte prestazioni, garantendo un overhead minimo.
- **Supporto Modalità Strict**: Impone il rispetto rigoroso delle locali dichiarate per un comportamento affidabile.

---

## Firma della Funzione

```typescript
t(translations: Record<string, string>): string;
```

### Parametri

- `translations`: Un oggetto dove le chiavi sono codici locale (es. `en`, `fr`, `it`) e i valori sono le stringhe tradotte corrispondenti.

### Restituisce

- Una stringa che rappresenta il contenuto nella lingua preferita del client.

---

## Caricamento del Gestore delle Richieste di Internazionalizzazione

Per garantire che la funzionalità di internazionalizzazione fornita da `hono-intlayer` funzioni correttamente, **devi** caricare il middleware di internazionalizzazione all'inizio della tua applicazione Hono. Questo abilita la funzione `t` e assicura una corretta gestione del rilevamento della locale e della traduzione.

Posiziona il middleware `app.use("*", intlayer())` **prima di qualsiasi rotta** nella tua applicazione per assicurarti che tutte le rotte beneficino dell'internazionalizzazione:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Carica il gestore delle richieste di internazionalizzazione
app.use("*", intlayer());

// Definisci le tue rotte dopo aver caricato il middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      it: "Ciao, Mondo!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Carica il gestore delle richieste di internazionalizzazione
app.use("*", intlayer());

// Definisci le tue rotte dopo aver caricato il middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      it: "Ciao, Mondo!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Carica il gestore delle richieste di internazionalizzazione
app.use("*", intlayer());

// Definisci le tue rotte dopo aver caricato il middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      it: "Ciao, Mondo!",
    })
  );
});
```

### Perché Questo è Necessario

- **Rilevamento della Locale**: Il middleware `intlayer` elabora le richieste in entrata per rilevare la locale preferita dell'utente in base a intestazioni, cookie o altri metodi configurati.
- **Contesto di Traduzione**: Imposta il contesto necessario affinché la funzione `t` operi correttamente, assicurando che le traduzioni vengano restituite nella lingua corretta.
- **Prevenzione degli Errori**: Senza questo middleware, l'uso della funzione `t` risulterà in errori di runtime perché le informazioni sulla locale necessarie non saranno disponibili.

---

## Esempi di Utilizzo

### Esempio di Base

Servi contenuti localizzati in diverse lingue:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      it: "Benvenuto!",
    })
  );
});
```

**Richieste del Client:**

- Un client con `Accept-Language: fr` riceverà `Bienvenue!`.
- Un client con `Accept-Language: it` riceverà `Benvenuto!`.
- Un client con `Accept-Language: de` riceverà `Welcome!` (locale predefinita).

### Gestione degli Errori

Fornisci messaggi di errore in più lingue:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      it: "Si è verificato un errore imprevisto.",
    }),
    500
  );
});
```

---

### Utilizzo delle Varianti di Locale

Specifica traduzioni per varianti specifiche della locale:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      it: "Ciao!",
    })
  );
});
```

---

## Argomenti Avanzati

### Meccanismo di Fallback

Se una locale preferita non è disponibile, la funzione `t` ripiegherà sulla locale predefinita definita nella configurazione:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.ITALIAN],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### Esecuzione della Modalità Strict

Configura la funzione `t` per imporre il rispetto rigoroso delle locali dichiarate:

| Modalità    | Comportamento                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------- |
| `strict`    | Tutte le locali dichiarate devono avere traduzioni fornite. Le locali mancanti genereranno errori.  |
| `inclusive` | Le locali dichiarate devono avere traduzioni. Le locali mancanti attivano avvisi ma sono accettate. |
| `loose`     | Qualsiasi locale esistente è accettata, anche se non dichiarata.                                    |

---

### Integrazione TypeScript

La funzione `t` è type-safe quando utilizzata con TypeScript. Definisci un oggetto traduzioni type-safe:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  it: "Buongiorno!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Errori Comuni e Risoluzione dei Problemi

| Problema                     | Causa                                           | Soluzione                                                                 |
| ---------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| La funzione `t` non funziona | Middleware non caricato                         | Assicurati che `app.use("*", intlayer())` sia aggiunto prima delle rotte. |
| Errore traduzioni mancanti   | Modalità strict abilitata senza tutte le locali | Fornisci tutte le traduzioni richieste.                                   |

---

## Conclusione

La funzione `t` è uno strumento potente per l'internazionalizzazione del backend. Usandola efficacemente, puoi creare un'applicazione più inclusiva e intuitiva per un pubblico globale. Per un utilizzo avanzato e opzioni di configurazione dettagliate, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
