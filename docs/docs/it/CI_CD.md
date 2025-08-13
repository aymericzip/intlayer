---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: Integrazione CI/CD
description: Scopri come integrare Intlayer nella tua pipeline CI/CD per la gestione e il deployment automatizzato dei contenuti.
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

Intlayer consente la generazione automatica delle traduzioni per i tuoi file di dichiarazione dei contenuti. Ci sono diversi modi per raggiungere questo obiettivo a seconda del tuo flusso di lavoro.

## Utilizzo del CMS

Con Intlayer, puoi adottare un flusso di lavoro in cui viene dichiarata localmente una sola lingua, mentre tutte le traduzioni sono gestite da remoto tramite il CMS. Questo permette che contenuti e traduzioni siano completamente separati dal codice, offrendo maggiore flessibilità agli editor di contenuti e abilitando il caricamento dinamico dei contenuti (senza bisogno di ricostruire l'applicazione per applicare le modifiche).

### Configurazione di Esempio

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

### Configurazione di Esempio

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

> Se hai più app nel tuo repository che utilizzano istanze separate di Intlayer, puoi usare l'argomento `--base-dir` in questo modo:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Utilizzo di GitHub Actions

Intlayer fornisce un comando CLI per l'autocompletamento e la revisione del contenuto del dizionario. Questo può essere integrato nel tuo flusso di lavoro CI/CD utilizzando GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Compilazione Automatica Intlayer
# Condizioni di attivazione per questo workflow
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Passo 1: Recupera l'ultima versione del codice dal repository
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Mantieni le credenziali per la creazione delle PR
          fetch-depth: 0 # Ottieni tutta la cronologia git per l'analisi delle differenze

      # Passo 2: Configura l'ambiente Node.js
      - name: 🟢 Configura Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Usa Node.js 20 LTS per stabilità

      # Passo 3: Installa le dipendenze del progetto
      - name: 📦 Installa dipendenze
        run: npm install

      # Passo 4: Installa globalmente Intlayer CLI per la gestione delle traduzioni
      - name: 📦 Installa Intlayer
        run: npm install -g intlayer-cli

      # Passo 5: Compila il progetto Intlayer per generare i file di traduzione
      - name: ⚙️ Compila progetto Intlayer
        run: npx intlayer build

      # Passo 6: Usa l'IA per compilare automaticamente le traduzioni mancanti
      - name: 🤖 Compila automaticamente le traduzioni mancanti
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Passo 7: Controlla se ci sono modifiche e committale
      - name: � Controlla modifiche
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Passo 8: Commit e push delle modifiche se presenti
      - name: 📤 Commit e push delle modifiche
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: compila automaticamente le traduzioni mancanti [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Per configurare le variabili d'ambiente, vai su GitHub → Impostazioni → Segreti e variabili → Azioni e aggiungi il segreto (API_KEY).

> Come per Husky, nel caso di un monorepo, puoi usare l'argomento `--base-dir` per trattare sequenzialmente ogni app.

> Per impostazione predefinita, l'argomento `--git-diff` filtra i dizionari che includono modifiche dalla base (default `origin/main`) al ramo corrente (default: `HEAD`).

> Per maggiori informazioni sui comandi CLI di Intlayer e sul loro utilizzo, consulta la [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

## Cronologia del documento

| Versione | Data       | Modifiche                 |
| -------- | ---------- | ------------------------- |
| 5.5.10   | 2025-06-29 | Inizializza la cronologia |
