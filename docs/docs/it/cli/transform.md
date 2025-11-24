---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Trasformare Componenti
description: Scopri come trasformare componenti esistenti per utilizzare Intlayer.
keywords:
  - Trasformare
  - Componenti
  - Migrazione
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# Trasformare componenti

```bash
npx intlayer transform
```

Questo comando analizza i tuoi file di codice per aiutarti a migrare componenti esistenti all'uso di Intlayer. Supporta la selezione interattiva dei file o il targeting di file specifici.

## Alias:

- `npx intlayer trans`

## Argomenti:

**Opzioni di selezione file:**

- **`-f, --file [files...]`**: Elenco di file specifici da trasformare. Se non fornito, la CLI cercherà i file corrispondenti (`**/*.{tsx,jsx,vue,svelte,ts,js}`) e ti chiederà di selezionare quali trasformare.

  > Esempio: `npx intlayer transform -f src/components/MyComponent.tsx`

**Opzioni di output:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Directory in cui salvare i file di dichiarazione dei contenuti generati.

  > Esempio: `npx intlayer transform -o src/content`

- **`--code-only`**: Trasforma solo il codice del componente (non scrivere la dichiarazione dei contenuti).

  > Esempio: `npx intlayer transform --code-only`

- **`--declaration-only`**: Genera solo la dichiarazione dei contenuti (non riscrivere il componente).

  > Esempio: `npx intlayer transform --declaration-only`

**Opzioni di configurazione:**

- **`--base-dir`**: Specifica la directory base per il progetto.
- **`--env`**: Specifica l'ambiente.
- **`--env-file`**: Fornisci un file di ambiente personalizzato.
- **`--verbose`**: Abilita il logging dettagliato.

**Plugin richiesti:**

Il comando transform funziona senza plugin aggiuntivi per file TypeScript / JSX. Tuttavia, richiede l'installazione dei seguenti plugin per i progetti Vue e Svelte:

- **`@intlayer/vue-transformer`**: Per i file Vue.
- **`@intlayer/svelte-transformer`**: Per i file Svelte.
