---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Riempire Dizionari
description: Impara come riempire, controllare e tradurre i tuoi dizionari usando l'AI.
keywords:
  - Riempire
  - Controllare
  - Tradurre
  - Dizionari
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Riempire / controllare / tradurre dizionari

```bash
npx intlayer fill
```

Questo comando analizza i tuoi file di dichiarazione dei contenuti per potenziali problemi come traduzioni mancanti, incoerenze strutturali o discrepanze di tipo. Se trova problemi, **intlayer fill** proporrà o applicherà aggiornamenti per mantenere i tuoi dizionari coerenti e completi.

## Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Argomenti:

**Opzioni lista file:**

- **`-f, --file [files...]`**: Una lista di file specifici di dichiarazione dei contenuti da controllare. Se non fornito, verranno controllati tutti i file `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` scoperti in base alla configurazione del tuo file.

  > Esempio: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtra i dizionari in base alle chiavi. Se non fornito, verranno controllati tutti i dizionari.

  > Esempio: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Filtra i dizionari in base alle chiavi (alias di --keys).

  > Esempio: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Esclude i dizionari in base alle chiavi. Se non fornito, verranno controllati tutti i dizionari.

  > Esempio: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Esclude i dizionari in base alle chiavi (alias di --excluded-keys).

  > Esempio: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Filtra i dizionari in base a un pattern glob per i percorsi dei file.

  > Esempio: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opzioni di output delle voci:**

- **`--source-locale [sourceLocale]`**: La locale sorgente da cui tradurre. Se non specificata, verrà usata la locale predefinita dalla tua configurazione.

- **`--output-locales [outputLocales...]`**: Locali di destinazione in cui tradurre. Se non specificate, verranno usate tutte le locali della tua configurazione eccetto la locale sorgente.

- **`--mode [mode]`**: Modalità di traduzione: `complete`, `review`. Il valore predefinito è `complete`. `complete` riempirà tutti i contenuti mancanti, `review` riempirà i contenuti mancanti e rivedrà le chiavi esistenti.

**Opzioni Git:**

- **`--git-diff`**: Esegui solo sui dizionari che includono modifiche dalla base (predefinita `origin/main`) al ramo corrente (predefinito: `HEAD`).
- **`--git-diff-base`**: Specifica il riferimento base per il git diff (predefinito `origin/main`).
- **`--git-diff-current`**: Specifica il riferimento corrente per il git diff (predefinito `HEAD`).
- **`--uncommitted`**: Includi le modifiche non commesse.
- **`--unpushed`**: Includi le modifiche non pushate.
- **`--untracked`**: Includi i file non tracciati.

  > Esempio: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Esempio: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opzioni AI:**

- **`--model [model]`**: Il modello AI da utilizzare per la traduzione (es. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Il provider AI da utilizzare per la traduzione.
- **`--temperature [temperature]`**: Impostazione della temperatura per il modello AI.
- **`--api-key [apiKey]`**: Fornisci la tua chiave API per il servizio AI.
- **`--custom-prompt [prompt]`**: Fornisci un prompt personalizzato per le tue istruzioni di traduzione.
- **`--application-context [applicationContext]`**: Fornisci un contesto aggiuntivo per la traduzione AI.

  > Esempio: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "La mia applicazione è un negozio di gatti"`

**Opzioni per le variabili d'ambiente:**

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file [envFile]`**: Fornisce un file di ambiente personalizzato da cui caricare le variabili.

  > Esempio: `npx intlayer fill --env-file .env.production.local`

  > Esempio: `npx intlayer fill --env production`

**Opzioni di configurazione:**

- **`--base-dir`**: Specifica la directory base per il progetto.

  > Esempio: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Disabilita la cache.

  > Esempio: `npx intlayer build --no-cache`

**Opzioni di preparazione:**

- **`--build`**: Costruisce i dizionari prima del push per assicurarsi che il contenuto sia aggiornato. True forza la build, false la salta, undefined permette di usare la cache della build.

- **`--skip-metadata`**: Salta il riempimento dei metadati mancanti (descrizione, titolo, tag) per i dizionari.

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debug. (impostazione predefinita a true usando la CLI)

## Esempio:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Questo comando tradurrà il contenuto dall'inglese al francese e allo spagnolo per tutti i file di dichiarazione del contenuto nella directory `src/home/` utilizzando il modello GPT-3.5 Turbo.
