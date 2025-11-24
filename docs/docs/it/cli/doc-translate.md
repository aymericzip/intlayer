---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Traduci Documento
description: Scopri come tradurre automaticamente i file di documentazione utilizzando servizi di traduzione AI.
keywords:
  - Traduci
  - Documento
  - Documentazione
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Traduci Documento

Il comando `doc translate` traduce automaticamente i file di documentazione da una locale base a locali target utilizzando servizi di traduzione AI.

```bash
npx intlayer doc translate
```

## Argomenti:

**Opzioni lista file:**

- **`--doc-pattern [docPattern...]`**: Pattern glob per selezionare i file di documentazione da tradurre.

  > Esempio: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Pattern glob da escludere dalla traduzione.

  > Esempio: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Salta il file se è stato modificato prima del tempo indicato.
  - Può essere un tempo assoluto come "2025-12-05" (stringa o Date)
  - Può essere un tempo relativo in ms `1 * 60 * 60 * 1000` (1 ora)
  - Questa opzione controlla il tempo di aggiornamento del file usando il metodo `fs.stat`. Quindi potrebbe essere influenzata da Git o altri strumenti che modificano il file.

  > Esempio: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Salta il file se è stato modificato entro il tempo indicato.
  - Può essere un tempo assoluto come "2025-12-05" (stringa o Date)
  - Può essere un tempo relativo in ms `1 * 60 * 60 * 1000` (1 ora)
  - Questa opzione controlla il tempo di aggiornamento del file usando il metodo `fs.stat`. Quindi potrebbe essere influenzata da Git o altri strumenti che modificano il file.

  > Esempio: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Salta il file se esiste già.

  > Esempio: `npx intlayer doc translate --skip-if-exists`

**Opzioni di output delle voci:**

- **`--locales [locales...]`**: Locali di destinazione per tradurre la documentazione.

  > Esempio: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Locale sorgente da cui tradurre.

  > Esempio: `npx intlayer doc translate --base-locale en`

**Opzioni di elaborazione dei file:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Numero di file da processare simultaneamente per la traduzione.

  > Esempio: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opzioni AI:**

- **`--model [model]`**: Il modello AI da utilizzare per la traduzione (es. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Il provider AI da utilizzare per la traduzione.
- **`--temperature [temperature]`**: Impostazione della temperatura per il modello AI.
- **`--api-key [apiKey]`**: Fornisci la tua chiave API per il servizio AI.
- **`--application-context [applicationContext]`**: Fornisci un contesto aggiuntivo per la traduzione AI.
- **`--custom-prompt [prompt]`**: Personalizza il prompt base utilizzato per la traduzione. (Nota: per la maggior parte dei casi d'uso, si consiglia invece l'opzione `--custom-instructions` in quanto offre un controllo migliore sul comportamento della traduzione.)

  > Esempio: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "La mia applicazione è un negozio di gatti"`

**Opzioni variabili d'ambiente:**

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file [envFile]`**: Fornisce un file ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base per il progetto.
- **`--no-cache`**: Disabilita la cache.

  > Esempio: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debugging. (impostazione predefinita a true usando la CLI)

  > Esempio: `npx intlayer doc translate --verbose`

**Opzioni istruzioni personalizzate:**

- **`--custom-instructions [customInstructions]`**: Istruzioni personalizzate aggiunte al prompt. Utile per applicare regole specifiche riguardo al formato, alla traduzione degli URL, ecc.
  - Può essere un tempo assoluto come "2025-12-05" (stringa o Date)
  - Può essere un tempo relativo in ms `1 * 60 * 60 * 1000` (1 ora)
  - Questa opzione controlla il tempo di aggiornamento del file usando il metodo `fs.stat`. Quindi potrebbe essere influenzata da Git o altri strumenti che modificano il file.

  > Esempio: `npx intlayer doc translate --custom-instructions "Evita di tradurre gli URL e mantieni il formato markdown"`

  > Esempio: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opzioni Git:**

- **`--git-diff`**: Esegui solo sui dizionari che includono modifiche dalla base (predefinita `origin/main`) al branch corrente (predefinito: `HEAD`).
- **`--git-diff-base`**: Specifica il riferimento base per il git diff (predefinito `origin/main`).
- **`--git-diff-current`**: Specifica il riferimento corrente per il git diff (predefinito `HEAD`).
- **`--uncommitted`**: Includi le modifiche non committate.
- **`--unpushed`**: Includi le modifiche non pushate.
- **`--untracked`**: Includi i file non tracciati.

  > Esempio: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Esempio: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Nota che il percorso del file di output sarà determinato sostituendo i seguenti pattern
>
> - `/{{baseLocale}}/` con `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` con `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` con `_{{locale}}.`
> - `{{baseLocale}}_` con `{{locale}}_`
> - `.{{baseLocaleName}}.` con `.{{localeName}}.`
>
> Se il pattern non viene trovato, il file di output aggiungerà `.{{locale}}` all'estensione del file. `./my/file.md` sarà tradotto in `./my/file.fr.md` per la localizzazione francese.
