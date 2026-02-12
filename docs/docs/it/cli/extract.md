---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Estrai stringhe
description: Scopri come estrarre le stringhe dai tuoi componenti in un file .content vicino al componente.
keywords:
  - Estrazione
  - Componenti
  - Migrazione
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Estrai stringhe

```bash
npx intlayer extract
```

Questo comando analizza i tuoi file di codice per estrarre le stringhe dai componenti in un file .content vicino al componente. Supporta la selezione interattiva dei file o l'indicazione di file specifici.

## Alias:

- `npx intlayer ext`

## Argomenti:

**Opzioni di selezione dei file:**

- **`-f, --file [files...]`**: Elenco dei file specifici da estrarre. Se non fornito, la CLI eseguirà la scansione dei file corrispondenti (`**/*.{tsx,jsx,vue,svelte,ts,js}`) e ti chiederà di selezionare quali estrarre.

  > Esempio: `npx intlayer extract -f src/components/MyComponent.tsx`

**Opzioni di output:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Directory in cui salvare i file di dichiarazione dei contenuti generati.

  > Esempio: `npx intlayer extract -o src/content`

- **`--code-only`**: Estrai solo il codice del componente (non scrivere la dichiarazione di contenuto).

  > Esempio: `npx intlayer extract --code-only`

- **`--declaration-only`**: Genera solo la dichiarazione dei contenuti (non riscrivere il componente).

  > Esempio: `npx intlayer extract --declaration-only`

**Opzioni di configurazione:**

- **`--base-dir`**: Specifica la directory base per il progetto.
- **`--env`**: Specifica l'ambiente.
- **`--env-file`**: Specifica un file di ambiente personalizzato.
- **`--verbose`**: Abilita il logging dettagliato.

**Plugin richiesti:**

Il comando extract funziona senza plugin aggiuntivi per file TypeScript/JSX. Tuttavia, richiede che i seguenti plugin siano installati per i progetti Vue e Svelte:

- **`@intlayer/vue-transformer`**: Per i file Vue.
- **`@intlayer/svelte-transformer`**: Per i file Svelte.
