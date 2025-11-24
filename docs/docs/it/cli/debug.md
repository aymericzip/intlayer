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
---

# Debug del comando intlayer

## 1. **Assicurati di utilizzare l'ultima versione**

Esegui:

```bash
npx intlayer --version                  # versione locale corrente di intlayer
npx intlayer@latest --version           # versione più recente disponibile di intlayer
```

## 2. **Verifica se il comando è registrato**

Puoi verificare con:

```bash
npx intlayer --help                     # Mostra la lista dei comandi disponibili e le informazioni sull'uso
npx intlayer dictionary build --help    # Mostra la lista delle opzioni disponibili per un comando
```

## 3. **Riavvia il terminale**

A volte è necessario riavviare il terminale per riconoscere nuovi comandi.

## 4. **Pulisci la cache di npx (se sei bloccato su una versione più vecchia)**

```bash
npx clear-npx-cache
```
