---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Automatizzare le traduzioni in CI/CD senza rilasciare testi errati"
description: Tre punti in cui automatizzare l'i18n, pre-push, pull request e runtime. Come bloccare una build sulla copertura, eseguire l'auto-fill in sicurezza ed evitare il loop infinito di commit.
keywords:
  - automatizzare traduzioni ci
  - i18n ci cd
  - github actions traduzioni
  - husky pre-push
  - localizzazione continua
  - pipeline di traduzione
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Automatizzare le traduzioni in CI/CD senza rilasciare testi errati

La traduzione manuale non resiste ai ritmi di rilascio moderni. Qualcuno aggiunge una stringa il venerdì, l'esportazione avviene nello sprint successivo e nel frattempo altre tre lingue sono rimaste indietro. Automatizzarla è semplice. Automatizzarla senza pubblicare silenziosamente testi grezzi generati dalle macchine ai clienti è la vera sfida.

## Indice

<TOC/>

## Non serve migrare per automatizzare

I flussi di pipeline descritti di seguito sono indipendenti dalla libreria, così come gli strumenti. Se i tuoi messaggi sono cataloghi JSON per i18next, next-intl, react-intl, vue-i18n o next-translate, il [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) legge e scrive direttamente quei file sul posto:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // o "icu" per next-intl / react-intl
    }),
  ],
};

export default config;
```

La tua applicazione continua a importare ciò che importa normalmente. I job di CI completano e proteggono i cataloghi esistenti, e il diff visualizzato dal revisore è una modifica a `locales/fr/checkout.json`, non una migrazione complessa. È disponibile anche un [plugin Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) per i flussi gettext, e [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) per mantenere inalterata l'API a runtime.

## Separare il controllo di blocco (gate) dal riempimento (fill)

Due operazioni distinte vengono continuamente confuse.

Un **gate** è un controllo che fallisce. Stabilisce che la build non deve essere rilasciata perché mancano lingue richieste. Non scrive alcun file.

Un **fill** è un'operazione di mutazione. Genera le traduzioni mancanti e ne esegue il commit. Non fa mai fallire una build.

Eseguire solo un fill significa che nulla si blocca mai e che testi tradotti automaticamente arrivano in produzione senza revisione. Eseguire solo un gate significa che la build diventa rossa e un operatore umano deve intervenire ogni volta. La maggior parte dei team desidera entrambi con trigger separati: fill su pull request, gate al momento del merge sul branch di rilascio.

## Dove collocare l'automazione

| Fase           | Trigger    | Ideale per                                  | Costo                                           |
| :------------- | :--------- | :------------------------------------------ | :---------------------------------------------- |
| Hook pre-push  | Git locale | Feedback rapido, zero minuti CI             | Gira sulla macchina e con la chiave API del dev |
| Pull request   | Job di CI  | Revisione prima del merge, segreti protetti | Minuti CI più chiamate al modello per PR        |
| Branch release | Job di CI  | Blocco severo sulla copertura               | Economico, nessuna chiamata a modelli           |
| Runtime        | CMS        | Modifiche ai testi senza ricompilazione     | Dipendenza ospitata                             |

## Pre-push: il ciclo più veloce

Husky esegue il fill prima che il codice lasci la macchina dello sviluppatore, così le traduzioni arrivano nello stesso push che ha introdotto le nuove stringhe.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` limita l'elaborazione ai contenuti non ancora inviati, evitando ritardi a ogni push. `--mode complete` riempie solo ciò che manca senza sovrascrivere voci già tradotte, garantendo che una traduzione revisionata non venga mai rimpiazzata.

In un monorepo, isola ogni applicazione:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

Lo svantaggio è reale: ogni sviluppatore necessita di una chiave API e i costi ricadono su chi effettua il push. Per questo molti team spostano l'operazione nella CI con la crescita del team.

## Pull request: generare dove avviene la revisione

Lo stesso flusso in GitHub Actions, mirato sul diff:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

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
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Quattro dettagli sono fondamentali:

- **`fetch-depth: 0`** è indispensabile affinché `--git-diff` funzioni. Un clone shallow non ha una base su cui calcolare il diff e l'operazione non elabora nulla silenziosamente.
- **`[skip ci]` nel messaggio di commit** evita che il workflow si attivi all'infinito. Senza di esso il job fa commit, parte una nuova esecuzione, che fa un altro commit, esaurendo il budget CI in una notte.
- **`concurrency` con `cancel-in-progress`** blocca due push concorrenti dall'eseguire scritture simultanee sugli stessi file.
- **`--git-diff`** limita il riempimento alle modifiche della PR. Omettendolo, si ritraduce l'intero catalogo a ogni passaggio.

Le traduzioni vengono caricate come commit sul branch della PR, così il revisore può vederle nel diff. Questo è il reale vantaggio rispetto a eseguirlo dopo il merge.

## Branch di release: il gate

Il gate non ha bisogno di accedere a modelli AI e deve essere veloce.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Supportato da un test che verifica la copertura con asserzioni invece di affidarsi solo all'output CLI:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("non ha lingue richieste mancanti", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` genera un report ma restituisce codice di uscita zero, quindi informa senza bloccare. Usalo in locale; usa l'asserzione in CI. Approfondimenti in [individuare le traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md).

## `requiredLocales` rende il gate sostenibile

Un gate che richieda tutte le diciotto lingue complete blocca ogni rilascio finché l'ultima lingua non è pronta, e viene disabilitato entro un mese.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Dichiara le lingue supportate e richiedi come bloccanti solo quelle essenziali al rilascio. Il resto viene tradotto in modo asincrono senza frenare i deploy.

## Gestire le traduzioni completamente fuori dal repository

L'altro approccio consiste nel dichiarare una lingua di base nel codice e gestire il resto da remoto tramite il CMS con Live Sync. Le modifiche ai testi non richiedono alcuna ricompilazione, separando i tempi redazionali da quelli di sviluppo.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Questo modello si adatta ai team in cui personale non tecnico gestisce i contenuti. È un compromesso: si ottiene autonomia editoriale ma si perde la caratteristica per cui un checkout git descrive completamente l'output dell'app. Maggiori dettagli nella [documentazione del CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

Nota che `clientSecret` è una credenziale lato server. Va inserita nei segreti della CI e nelle variabili d'ambiente del server, mai nel codice destinato al client.

## Il limite reale

Tutto ciò che è descritto sopra automatizza la _copertura_, non la _qualità_. Un riempimento automatico trasforma una mancanza evidente in una invisibile: l'audit diventa verde perché la chiave ha un valore, ma nessuno ne ha verificato la correttezza.

Questo è accettabile per strumenti interni, changelog o lingue in fase beta. Non lo è per pagine di prezzi, note legali, messaggi di errore di pagamento o qualsiasi contenuto letto prima di una decisione d'acquisto. Inoltra questi testi a una revisione umana e usa `--mode complete` per evitare che stringhe già revisionate vengano sovrascritte.

Fornisci contesto al modello per garantire coerenza:

```ts
ai: {
  applicationContext: "App di fatturazione B2B. Registro formale. Non tradurre mai il nome del prodotto.",
}
```

## Errori comuni

- **Dimenticare `[skip ci]` nel commit automatico.** Il job entra in loop infinito rieseguendosi continuamente.
- **Clone superficiale con `--git-diff`.** Nessuna base per il diff, nulla viene riempito senza alcun messaggio d'errore.
- **Riempire l'intero catalogo a ogni esecuzione.** Limita l'ambito con `--git-diff` o `--unpushed` per contenere i costi.
- **Usare il report CLI come gate.** Esce sempre con codice 0.
- **Richiedere ogni lingua come obbligatoria.** Il controllo viene rimosso al primo blocco di un rilascio.
- **Un job di fill privo di gate.** Nulla fallisce mai e testi non revisionati finiscono in produzione.
- **Chiavi API dei modelli nel repository.** Devono risiedere nei segreti di CI, come `clientSecret`.

## Per approfondire

- [CI/CD: auto-generare traduzioni con Husky, GitHub Actions e il CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/CI_CD.md)
- [Testare i contenuti e bloccare una build sulla copertura](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md)
- [autoFill: generare file di dichiarazione per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md)
- [Riferimento configurazione: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [Report di benchmark tra framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md)
- [Adattatore di compatibilità i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/i18next.md)
- [Come individuare le traduzioni mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/detecting_missing_translations.md)
- [Come testare le traduzioni senza test fragili](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_testing_strategies.md)
