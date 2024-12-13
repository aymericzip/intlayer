# Iniziare con l'internazionalizzazione (i18n) di Intlayer e Express

`express-intlayer` è un potente middleware di internazionalizzazione (i18n) per applicazioni Express, progettato per rendere i tuoi servizi backend globalmente accessibili fornendo risposte localizzate in base alle preferenze del cliente.

## Perché internazionalizzare il tuo backend?

Internazionalizzare il tuo backend è essenziale per servire efficacemente un pubblico globale. Consente alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ciascun utente. Questa capacità migliora l'esperienza dell'utente e amplia la portata della tua applicazione rendendola più accessibile e pertinente a persone provenienti da diversi contesti linguistici.

### Casi d'uso pratici

- **Visualizzazione degli errori del backend nella lingua dell'utente**: Quando si verifica un errore, visualizzare i messaggi nella lingua nativa dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per i messaggi di errore dinamici che potrebbero essere mostrati in componenti del front-end come toast o modali.

- **Recuperare contenuti multilingue**: Per le applicazioni che estraggono contenuti da un database, l'internazionalizzazione garantisce che tu possa servire questi contenuti in più lingue. Questo è cruciale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono visualizzare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.

- **Inviare email multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, inviare email nella lingua del destinatario può aumentare significativamente l'engagement e l'efficacia.

- **Notifiche push multilingue**: Per le applicazioni mobili, inviare notifiche push nella lingua preferita dall'utente può migliorare l'interazione e la retention. Questo tocco personale può rendere le notifiche più pertinenti e attivabili.

- **Altre comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, beneficia di essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza complessiva dell'utente.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea anche meglio con le esigenze del mercato globale, rendendola un passaggio chiave per scalare i tuoi servizi a livello mondiale.

## Iniziare

### Installazione

Per iniziare a utilizzare `express-intlayer`, installa il pacchetto usando npm:

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### Configurazione

Configura le impostazioni di internazionalizzazione creando un `intlayer.config.ts` nella root del tuo progetto:

```typescript
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Configurazione dell'app Express

Configura la tua applicazione Express per utilizzare `express-intlayer`:

```typescript
// src/index.ts
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Carica il gestore della richiesta di internazionalizzazione
app.use(intlayer());

// Route
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Esempio di contenuto restituito in inglese",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Esempio di contenuto d'errore restituito in inglese",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// Avvia il server
app.listen(3000, () => {
  console.info(`Listening on port 3000`);
});
```

### Compatibilità

`express-intlayer` è completamente compatibile con:

- `react-intlayer` per applicazioni React
- `next-intlayer` per applicazioni Next.js

Funziona inoltre senza problemi con qualsiasi soluzione di internazionalizzazione attraverso vari ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la lingua tramite intestazioni o cookie:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // Altre opzioni di configurazione
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

Per impostazione predefinita, `express-intlayer` interpreterà l'intestazione `Accept-Language` per determinare la lingua preferita del client.

> Per ulteriori informazioni sulla configurazione e argomenti avanzati, visita la nostra [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/concept/configuration.md).

## Alimentato da TypeScript

`express-intlayer` sfrutta le robuste capacità di TypeScript per migliorare il processo di internazionalizzazione. Il typing statico di TypeScript garantisce che ogni chiave di traduzione sia presa in considerazione, riducendo il rischio di mancate traduzioni e migliorando la manutenibilità.

> Assicurati che i tipi generati (per impostazione predefinita in ./types/intlayer.d.ts) siano inclusi nel tuo file tsconfig.json.
