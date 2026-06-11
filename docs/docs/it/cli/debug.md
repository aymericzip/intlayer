---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Debug del comando Intlayer
description: Scopri come eseguire il debug e risolvere i problemi della CLI di Intlayer.
keywords:
  - Debug
  - Risoluzione problemi
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Debug del comando intlayer

## 1. **Assicurati di utilizzare l'ultima versione**

Esegui:

```bash packageManager="npm"
npx intlayer --version                  # versione locale corrente di intlayer
npx intlayer@latest --version           # versione più recente disponibile di intlayer
```

```bash packageManager="yarn"
yarn intlayer --version                  # versione locale corrente di intlayer
yarn intlayer@latest --version           # versione più recente disponibile di intlayer
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # versione locale corrente di intlayer
pnpm intlayer@latest --version           # versione più recente disponibile di intlayer
```

```bash packageManager="bun"
bun x intlayer --version                  # versione locale corrente di intlayer
bun x intlayer@latest --version           # versione più recente disponibile di intlayer
```

## 2. **Verifica se il comando è registrato**

Puoi verificare con:

```bash packageManager="npm"
npx intlayer --help                     # Mostra la lista dei comandi disponibili e le informazioni sull'uso
npx intlayer dictionary build --help    # Mostra la lista delle opzioni disponibili per un comando
```

```bash packageManager="yarn"
yarn intlayer --help                     # Mostra la lista dei comandi disponibili e le informazioni sull'uso
yarn intlayer dictionary build --help    # Mostra la lista delle opzioni disponibili per un comando
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # Mostra la lista dei comandi disponibili e le informazioni sull'uso
pnpm intlayer dictionary build --help    # Mostra la lista delle opzioni disponibili per un comando
```

```bash packageManager="bun"
bun x intlayer --help                     # Mostra la lista dei comandi disponibili e le informazioni sull'uso
bun x intlayer dictionary build --help    # Mostra la lista delle opzioni disponibili per un comando
```

## 3. **Riavvia il terminale**

A volte è necessario riavviare il terminale per riconoscere nuovi comandi.

## 4. **Pulisci la cache di npx (se sei bloccato su una versione più vecchia)**

```bash
npx clear-npx-cache
```
