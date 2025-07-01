---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Integrazione CI/CD
description: Scopri come integrare Intlayer nella tua pipeline CI/CD per la gestione e il deployment automatico dei contenuti.
keywords:
  - CI/CD
  - Integrazione Continua
  - Deployment Continuo
  - Automazione
  - Internazionalizzazione
  - Documentazione
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
---

# Generazione Automatica delle Traduzioni in una Pipeline CI/CD

Intlayer consente la generazione automatica delle traduzioni per i tuoi file di dichiarazione dei contenuti. Ci sono diversi modi per ottenere questo risultato a seconda del tuo flusso di lavoro.

## Utilizzo del CMS

Con Intlayer, puoi adottare un flusso di lavoro in cui viene dichiarata localmente una sola lingua, mentre tutte le traduzioni sono gestite da remoto tramite il CMS. Questo permette che i contenuti e le traduzioni siano completamente separati dal codice, offrendo maggiore flessibilità agli editor di contenuti e abilitando il caricamento dinamico dei contenuti (senza necessità di ricostruire l'applicazione per applicare le modifiche).

### Configurazione di esempio

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Le lingue opzionali saranno gestite da remoto
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // Il contenuto remoto ha la priorità

    applicationURL: process.env.APPLICATION_URL, // URL dell'applicazione usato dal CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Credenziali del CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // Aiuta a garantire una generazione coerente delle traduzioni
  },
};

export default config;
```

Per saperne di più sul CMS, consulta la [documentazione ufficiale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

## Uso di Husky

Puoi integrare la generazione delle traduzioni nel tuo flusso di lavoro Git locale usando [Husky](https://typicode.github.io/husky/).

### Configurazione di esempio

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Le localizzazioni opzionali sono gestite da remoto
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Usa la tua chiave API

    applicationContext: "This is a test application", // Aiuta a garantire una generazione coerente delle traduzioni
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Per assicurarsi che i dizionari siano aggiornati
npx intlayer fill --unpushed --mode fill    # Riempie solo i contenuti mancanti, non aggiorna quelli esistenti
```

> Per maggiori informazioni sui comandi CLI di Intlayer e sul loro utilizzo, consulta la [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

> Se hai più app nel tuo repository che utilizzano istanze intlayer separate, puoi usare l'argomento `--base-dir` in questo modo:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Uso di GitHub Actions

Intlayer fornisce un comando CLI per l'autocompletamento e la revisione del contenuto del dizionario. Questo può essere integrato nel tuo flusso di lavoro CI/CD utilizzando GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Configura Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Installa le dipendenze
        run: npm ci

      - name: ⚙️ Compila il progetto Intlayer
        run: npx intlayer build

      - name: 🤖 Compila automaticamente le traduzioni mancanti
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Crea o aggiorna la PR di traduzione
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Come per Husky, nel caso di un monorepo, puoi utilizzare l'argomento `--base-dir` per trattare sequenzialmente ogni app.

> Per impostazione predefinita, l'argomento `--git-diff` filtra i dizionari che includono modifiche dalla base (default `origin/main`) al branch corrente (default: `HEAD`).

> Per maggiori informazioni sui comandi CLI di Intlayer e sul loro utilizzo, consulta la [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

## Cronologia della Documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
