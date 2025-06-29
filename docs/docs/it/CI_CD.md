---
docName: ci_cd
url: https://intlayer.org/doc/concept/ci-cd
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Integrazione CI/CD
description: Scopri come integrare Intlayer nel tuo pipeline CI/CD per la gestione e il deployment automatizzato dei contenuti.
keywords:
  - CI/CD
  - Integrazione Continua
  - Deployment Continuo
  - Automazione
  - Internazionalizzazione
  - Documentazione
  - Intlayer
---

# Generazione Automatica di Traduzioni in un Pipeline CI/CD

Intlayer consente la generazione automatica delle traduzioni per i file di dichiarazione dei contenuti. Esistono diversi modi per ottenere questo risultato a seconda del tuo flusso di lavoro.

## Utilizzo del CMS

Con Intlayer, puoi adottare un flusso di lavoro in cui viene dichiarata localmente solo una singola lingua, mentre tutte le traduzioni vengono gestite in remoto tramite il CMS. Questo consente di separare completamente i contenuti e le traduzioni dal codice, offrendo maggiore flessibilità agli editor di contenuti e abilitando il ricaricamento dinamico dei contenuti (non è necessario ricostruire l'applicazione per applicare le modifiche).

### Configurazione di Esempio

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Le lingue opzionali saranno gestite in remoto
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // I contenuti remoti hanno la priorità

    applicationURL: process.env.APPLICATION_URL, // URL dell'applicazione utilizzato dal CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Credenziali del CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "Questa è un'applicazione di test", // Aiuta a garantire una generazione di traduzioni coerente
  },
};

export default config;
```

Per saperne di più sul CMS, consulta la [documentazione ufficiale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

## Utilizzo di Husky

Puoi integrare la generazione delle traduzioni nel tuo flusso di lavoro Git locale utilizzando [Husky](https://typicode.github.io/husky/).

### Configurazione di Esempio

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Le lingue opzionali sono gestite in remoto
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Usa la tua chiave API

    applicationContext: "Questa è un'applicazione di test", // Aiuta a garantire una generazione di traduzioni coerente
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Per garantire che i dizionari siano aggiornati
npx intlayer fill --unpushed --mode fill    # Riempie solo i contenuti mancanti, non aggiorna quelli esistenti
```

> Per ulteriori informazioni sui comandi CLI di Intlayer e sul loro utilizzo, consulta la [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

> Se hai più applicazioni nel tuo repository che utilizzano istanze separate di Intlayer, puoi utilizzare l'argomento `--base-dir` come segue:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Utilizzo di GitHub Actions

Intlayer fornisce un comando CLI per riempire automaticamente e rivedere i contenuti dei dizionari. Questo può essere integrato nel tuo flusso di lavoro CI/CD utilizzando GitHub Actions.

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

      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Install dependencies
        run: npm ci

      - name: ⚙️ Build Intlayer project
        run: npx intlayer build

      - name: 🤖 Auto-fill missing translations
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Create or update translation PR
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Come per Husky, nel caso di un monorepo, puoi utilizzare l'argomento `--base-dir` per trattare sequenzialmente ogni applicazione.

> Per impostazione predefinita, l'argomento `--git-diff` filtra i dizionari che includono modifiche dalla base (default `origin/main`) al branch corrente (default: `HEAD`).

> Per ulteriori informazioni sui comandi CLI di Intlayer e sul loro utilizzo, consulta la [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).
