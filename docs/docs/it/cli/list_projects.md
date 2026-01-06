---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Elencare i progetti Intlayer
description: Scopri come elencare tutti i progetti Intlayer in una directory o in un repository git.
keywords:
  - Elenco
  - Progetti
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
---

# Elencare i progetti Intlayer

```bash
npx intlayer projects list
```

Questo comando cerca ed elenca tutti i progetti Intlayer trovando le directory che contengono file di configurazione di Intlayer. È utile per scoprire tutti i progetti Intlayer in un monorepo, workspace o repository git.

## Alias:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Argomenti:

- **`--base-dir [path]`**: Specifica la directory base da cui avviare la ricerca. Predefinita è la directory di lavoro corrente.

  > Esempio: `npx intlayer projects list --base-dir /path/to/workspace`

  > Esempio: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Effettua la ricerca dalla root del repository git invece che dalla directory base. Questo è utile per trovare tutti i progetti Intlayer in un monorepo o in un repository git.

  > Esempio: `npx intlayer projects list --git-root`

- **`--json`**: Mostra i risultati come JSON invece di testo formattato. Utile per scripting e accesso programmatico.

  > Esempio: `npx intlayer projects list --json`

## Come funziona:

Il comando cerca i file di configurazione di Intlayer nella directory specificata (o nella root git se viene usato `--git-root`). Cerca i seguenti pattern di file di configurazione:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Ogni directory che contiene uno di questi file è considerata un progetto Intlayer e verrà elencata nell'output.

## Esempi:

### Elencare i progetti nella directory corrente:

```bash
npx intlayer projects list
```

### Elencare i progetti in una directory specifica:

```bash
npx intlayer projects list --base-dir ./packages
```

### Elencare tutti i progetti nel repository git:

```bash
npx intlayer projects list --git-root
```

### Utilizzo dell'alias rapido:

```bash
npx intlayer pl --git-root
```

### Output come JSON:

```bash
npx intlayer projects list --json
```

## Esempio di output:

### Output formattato:

```bash
$ npx intlayer projects list --git-root

Trovati 3 progetti Intlayer:

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### Output JSON:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Casi d'uso:

- **Monorepo management**: Scoprire tutti i progetti Intlayer in una struttura monorepo
- **Project discovery**: Trovare tutti i progetti abilitati a Intlayer in uno workspace
- **CI/CD**: Verificare i progetti Intlayer nei workflow automatizzati
- **Documentazione**: Generare documentazione che elenchi tutti i progetti che utilizzano Intlayer

L'output fornisce i percorsi assoluti di ogni directory di progetto, rendendo semplice navigare verso di essi o scrivere script per operazioni su più progetti Intlayer.
