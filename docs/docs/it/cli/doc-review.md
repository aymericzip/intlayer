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
---

# Revisione Documento

Il comando `doc review` analizza i file di documentazione per qualità, coerenza e completezza tra diverse localizzazioni.

```bash
npx intlayer doc review
```

Può essere utilizzato per revisionare file già tradotti e per verificare se la traduzione è corretta.

Per la maggior parte dei casi d'uso,

- preferisci usare `doc translate` quando la versione tradotta di questo file non è disponibile.
- preferisci usare `doc review` quando la versione tradotta di questo file esiste già.

> Nota che il processo di revisione consuma più token di input rispetto al processo di traduzione per revisionare completamente lo stesso file. Tuttavia, il processo di revisione ottimizzerà i chunk da revisionare e salterà le parti che non sono state modificate.

## Argomenti:

Il comando `doc review` accetta gli stessi argomenti di `doc translate`, permettendoti di revisionare file di documentazione specifici e applicare controlli di qualità.

Se hai attivato una delle opzioni git, il comando revisionerà solo la parte dei file che viene modificata. Lo script processerà il file suddividendolo in chunk e revisionerà ogni chunk. Se non ci sono modifiche nel chunk, lo script lo salterà per velocizzare il processo di revisione e limitare il costo dell'API del provider AI.

Per un elenco completo degli argomenti, consulta la documentazione del comando [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-translate.md).
