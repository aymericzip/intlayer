---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Revisione Documento
description: Scopri come revisionare i file di documentazione per qualità, coerenza e completezza tra diverse localizzazioni.
keywords:
  - Revisione
  - Documento
  - Documentazione
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
author: aymericzip
---

# Revisione Documento

Il comando `doc review` analizza i file di documentazione per qualità, coerenza e completezza tra diverse localizzazioni.

## Punti chiave:

- Divide i file markdown grandi in parti per rimanere entro i limiti della finestra di contesto del modello AI.
- Ottimizza le parti da revisionare e salta le parti che sono già tradotte e non modificate.
- Elabora file, parti e locali in parallelo utilizzando un sistema di code per aumentare la velocità.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Può essere utilizzato per revisionare file già tradotti e per verificare se la traduzione è corretta.

Per la maggior parte dei casi d'uso,

- preferisci usare `doc translate` quando la versione tradotta di questo file non è disponibile.
- preferisci usare `doc review` quando la versione tradotta di questo file esiste già.

> Nota che il processo di revisione consuma più token di input rispetto al processo di traduzione per revisionare completamente lo stesso file. Tuttavia, il processo di revisione ottimizzerà i chunk da revisionare e salterà le parti che non sono state modificate.

## Argomenti:

**Opzioni lista file:**

- **`--doc-pattern [docPattern...]`**: Pattern glob per selezionare i file di documentazione da revisionare.

  > Esempio: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Pattern glob da escludere dalla revisione.

  > Esempio: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Salta il file se è stato modificato prima del tempo indicato.
  - Può essere un tempo assoluto como "2025-12-05" (stringa o Date)
  - Può essere un tempo relativo in ms `1 * 60 * 60 * 1000` (1 ora)
  - Questa opzione controlla il tempo di aggiornamento del file usando il metodo `fs.stat`. Quindi potrebbe essere influenzata da Git o altri strumenti che modificano il file.

  > Esempio: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Salta il file se è stato modificato entro il tempo indicato.
  - Può essere un tempo assoluto como "2025-12-05" (stringa o Date)
  - Può essere un tempo relativo in ms `1 * 60 * 60 * 1000` (1 ora)
  - Cette opzione controlla il tempo di aggiornamento del file usando il metodo `fs.stat`. Quindi potrebbe essere influenzata da Git o altri strumenti che modificano il file.

  > Esempio: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Salta il file se esiste già.

  > Esempio: `npx intlayer doc review --skip-if-exists`

**Opzioni di modalità di revisione:**

- **`--log`**: Modalità solo log. Non traduce con l'IA; registra invece i blocchi che richiedono attenzione (con numeri di riga e contenuto) per i locali base e target, per aiutare un altro agente a generare le traduzioni.

  > Esempio: `npx intlayer doc review --log`

**Opzioni di output delle voci:**

- **`--locales [locales...]`**: Locales di destinazione per revisionare la documentazione.

  > Esempio: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Locale sorgente (documento base) con cui confrontare.

  > Esempio: `npx intlayer doc review --base-locale en`

**Opzioni di elaborazione dei file:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Numero di file da processare simultaneamente per la revisione.

  > Esempio: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**Opzioni AI:**

- **`--model [model]`**: Il modello AI da utilizzare per la revisione (es. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Il provider AI da utilizzare per la revisione.
- **`--temperature [temperature]`**: Impostazione della temperatura per il modello AI.
- **`--api-key [apiKey]`**: Fornisci la tua chiave API per il servizio AI.
- **`--application-context [applicationContext]`**: Fornisci un contesto aggiuntivo per la revisione AI.
- **`--data-serialization [dataSerialization]`**: Il formato di serializzazione dei dati da utilizzare per le funzionalità AI di Intlayer. Opzioni: `json` (standard, affidabile), `toon` (meno token, meno coerente).
- **`--custom-prompt [prompt]`**: Personalizza il prompt base utilizzato per la revisione. (Nota: per la maggior parte dei casi d'uso, si consiglia invece l'opzione `--custom-instructions` in quanto offre un controllo migliore.)

  > Esempio: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "La mia applicazione è un negozio di gatti"`

**Opzioni variabili d'ambiente:**

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file [envFile]`**: Fornisce un file ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto.
- **`--no-cache`**: Disabilita la cache.

  > Esempio: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debugging. (impostazione predefinita a true usando la CLI)

  > Esempio: `npx intlayer doc review --verbose`

**Opzioni istruzioni personalizzate:**

- **`--custom-instructions [customInstructions]`**: Istruzioni personalizzate aggiunte al prompt. Utile per applicare regole specifiche riguardo al formato, alla traduzione degli URL, ecc.

  > Esempio: `npx intlayer doc review --custom-instructions "Evita di tradurre gli URL e mantieni il formato markdown"`

  > Esempio: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Opzioni Git:**

- **`--git-diff`**: Esegui solo sui file che includono modifiche dalla base (predefinita `origin/main`) al branch corrente (predefinito: `HEAD`).
- **`--git-diff-base`**: Specifica il riferimento base per il git diff (predefinito `origin/main`).
- **`--git-diff-current`**: Specifica il riferimento corrente per il git diff (predefinito `HEAD`).
- **`--uncommitted`**: Includi le modifiche non committate.
- **`--unpushed`**: Includi le modifiche non pushate.
- **`--untracked`**: Includi i file non tracciati.

  > Esempio: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Esempio: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Nota che il percorso del file di output sarà determinato sostituendo i seguenti pattern:
>
> - `/{{baseLocale}}/` con `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` con `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` con `_{{locale}}.`
> - `{{baseLocale}}_` con `{{locale}}_`
> - `.{{baseLocaleName}}.` con `.{{localeName}}.`
>
> Se il pattern non viene trovato, il file di output aggiungerà `.{{locale}}` all'estensione del file. `./my/file.md` sarà revisionato e aggiornato in `./my/file.fr.md` per la localizzazione francese.
