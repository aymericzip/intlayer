---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Estrazione Dizionari
description: Scopri come estrarre dizionari dall'editor Intlayer e dal CMS.
keywords:
  - Estrazione
  - Dizionari
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Estrazione Dizionari Remoti

```bash
npx intlayer pull
```

Se l'[editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) è installato, puoi anche estrarre dizionari direttamente dall'editor. In questo modo, puoi sovrascrivere il contenuto dei tuoi dizionari in base alle esigenze della tua applicazione.

## Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Argomenti:

**Opzioni dizionario:**

- **`-d, --dictionaries`**: Id degli dizionari da estrarre. Se non specificato, verranno estratti tutti i dizionari.

  > Esempio: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Id degli dizionari da estrarre (alias di --dictionaries).

  > Esempio: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Opzioni di configurazione:**

- **`--base-dir`**: Specifica la directory base del progetto. Per recuperare la configurazione di intlayer, il comando cercherà il file `intlayer.config.{ts,js,json,cjs,mjs}` nella directory base.

  > Esempio: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Disabilita la cache.

  > Esempio: `npx intlayer build --no-cache`

**Opzioni delle variabili d'ambiente:**

- **`--env`**: Specifica l'ambiente (es. `development`, `production`).
- **`--env-file`**: Fornisce un file di ambiente personalizzato da cui caricare le variabili.
- **`--base-dir`**: Specifica la directory base del progetto. Per recuperare la configurazione di intlayer, il comando cercherà il file `intlayer.config.{ts,js,json,cjs,mjs}` nella directory base.

  > Esempio: `npx intlayer dictionary push --env-file .env.production.local`

  > Esempio: `npx intlayer dictionary push --env production`

**Opzioni di output:**

- **`--new-dictionaries-path`** : Percorso della directory in cui verranno salvati i nuovi dizionari. Se non specificato, i nuovi dizionari saranno salvati nella directory `./intlayer-dictionaries` del progetto. Se nel contenuto del dizionario è specificato un campo `filePath`, i dizionari non considereranno questo argomento e saranno salvati nella directory `filePath` specificata.

**Opzioni di log:**

- **`--verbose`**: Abilita il logging dettagliato per il debug. (impostazione predefinita a true usando la CLI)

## Esempio:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
