# Documentazione: Funzione `t` in `express-intlayer`

La funzione `t` nel pacchetto `express-intlayer` è l'utilità principale per fornire risposte localizzate nella tua applicazione Express. Semplifica l'internazionalizzazione (i18n) selezionando dinamicamente il contenuto in base alla lingua preferita dell'utente.

---

## Panoramica

La funzione `t` viene utilizzata per definire e recuperare traduzioni per un determinato set di lingue. Determina automaticamente la lingua appropriata da restituire in base alle impostazioni della richiesta del client, come l'intestazione `Accept-Language`. Se la lingua preferita non è disponibile, torna in modo elegante alla lingua predefinita specificata nella tua configurazione.

---

## Caratteristiche Principali

- **Localizzazione Dinamica**: Seleziona automaticamente la traduzione più appropriata per il client.
- **Ripristino alla Lingua Predefinita**: Torna a una lingua predefinita se la lingua preferita del client non è disponibile, assicurando continuità nell'esperienza utente.
- **Leggero e Veloce**: Progettato per applicazioni ad alte prestazioni, assicurando un sovraccarico minimo.
- **Supporto per la Modalità Strict**: Applica una rigorosa aderenza alle lingue dichiarate per un comportamento affidabile.

---

## Firma della Funzione

```typescript
t(traduzioni: Record<string, string>): string;
```

### Parametri

- `traduzioni`: Un oggetto in cui le chiavi sono codici lingua (es. `en`, `fr`, `es-MX`) e i valori sono le corrispondenti stringhe tradotte.

### Restituisce

- Una stringa che rappresenta il contenuto nella lingua preferita del client.

---

## Caricamento del Gestore delle Richieste di Internazionalizzazione

Per assicurarti che la funzionalità di internazionalizzazione fornita da `express-intlayer` funzioni correttamente, **devi** caricare il middleware di internazionalizzazione all'inizio della tua applicazione Express. Questo abilita la funzione `t` e assicura una corretta gestione della rilevazione delle lingue e della traduzione.

### Configurazione del Middleware Necessario

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Carica il gestore delle richieste di internazionalizzazione
app.use(intlayer());
```

### Posizionamento nell'Applicazione

Posiziona il middleware `app.use(intlayer())` **prima di qualsiasi route** nella tua applicazione per garantire che tutte le route traggano vantaggio dall'internazionalizzazione:

```typescript
app.use(intlayer());

// Definisci le tue routes dopo aver caricato il middleware
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

- **Rilevazione della Lingua**: Il middleware `intlayer` elabora le richieste in arrivo per rilevare la lingua preferita dell'utente in base a intestazioni, cookie o altri metodi configurati.
- **Contesto di Traduzione**: Imposta il contesto necessario affinché la funzione `t` operi correttamente, assicurando che le traduzioni vengano restituite nella lingua corretta.
- **Prevenzione degli Errori**: Senza questo middleware, l'uso della funzione `t` comporterà errori a tempo di esecuzione perché le informazioni necessarie sulla lingua non saranno disponibili.

---

## Esempi di Utilizzo

### Esempio Base

Serve contenuti localizzati in diverse lingue:

```typescript
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

Fornisci messaggi di errore in più lingue:

```typescript
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

### Utilizzo delle Varianti di Lingua

Specifica traduzioni per varianti specifiche della lingua:

```typescript
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

### Meccanismo di Ripristino

Se una lingua preferita non è disponibile, la funzione `t` tornerà alla lingua predefinita definita nella configurazione:

```typescript
const config = {
  internazionalizzazione: {
    lingue: [Locali.INGLESE, Locali.FRANCESE, Locali.SPANISH],
    linguaPredefinita: Locali.INGLESE,
  },
};
```

Ad esempio:

- Se `linguaPredefinita` è `Locali.CINESE` e un client richiede `Locali.OLANDESI`, la traduzione restituita tornerà al valore di `Locali.CINESE`.
- Se `linguaPredefinita` non è definita, la funzione `t` tornerà al valore di `Locali.INGLESE`.

---

### Applicazione della Modalità Strict

Configura la funzione `t` per applicare una rigorosa aderenza alle lingue dichiarate:

| Modalità        | Comportamento                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------- |
| `strict`        | Tutte le lingue dichiarate devono avere traduzioni fornite. Le lingue mancanti genereranno errori.  |
| `required_only` | Le lingue dichiarate devono avere traduzioni. Le lingue mancanti generano avvisi ma sono accettate. |
| `loose`         | Qualsiasi lingua esistente è accettata, anche se non dichiarata.                                    |

Esempio di Configurazione:

```typescript
const config = {
  internazionalizzazione: {
    strictMode: "strict", // Applica la modalità strict
  },
};
```

---

### Integrazione con TypeScript

La funzione `t` è sicura dal punto di vista del tipo quando utilizzata con TypeScript. Definisci un oggetto di traduzioni sicuro dal punto di vista del tipo:

```typescript
import { type LanguageContent } from "express-intlayer";

const traduzioni: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(traduzioni));
});
```

---

### Errori Comuni e Risoluzione dei Problemi

| Problema                      | Causa                                          | Soluzione                                                             |
| ----------------------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| Funzione `t` non funzionante  | Middleware non caricato                        | Assicurati che `app.use(intlayer())` sia aggiunto prima delle routes. |
| Errore di traduzione mancante | Modalità strict attivata senza tutte le lingue | Fornisci tutte le traduzioni richieste.                               |

---

## Suggerimenti per un Uso Efficace

1. **Centralizza le Traduzioni**: Usa un modulo centralizzato o file JSON per gestire le traduzioni per migliorare la manutenibilità.
2. **Convalida le Traduzioni**: Assicurati che ogni variante linguistica abbia una traduzione corrispondente per evitare di dover tornare inutilmente.
3. **Combina con l'i18n Frontend**: Sincronizza con l'internazionalizzazione frontend per un'esperienza utente senza soluzione di continuità in tutta l'app.
4. **Misura le Performance**: Testa i tempi di risposta della tua app quando aggiungi traduzioni per garantire un impatto minimo.

---

## Conclusione

La funzione `t` è uno strumento potente per l'internazionalizzazione del backend. Utilizzandola in modo efficace, puoi creare un'applicazione più inclusiva e user-friendly per un pubblico globale. Per utilizzi avanzati e opzioni di configurazione dettagliate, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).
