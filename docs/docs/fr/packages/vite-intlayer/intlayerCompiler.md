---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentation du plugin Vite intlayerCompiler | vite-intlayer
description: Plugin Vite qui extrait les déclarations de contenu Intlayer en ligne des fichiers de composants et les écrit dans des fichiers JSON de dictionnaire lors du build ou de la phase de transformation.
keywords:
  - intlayerCompiler
  - vite
  - plugin
  - compilateur
  - contenu
  - dictionnaire
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Intégré dans intlayer() ; initialisation de la doc"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` est un plugin Vite qui scanne les fichiers sources des composants à la recherche de **déclarations de contenu Intlayer en ligne** — du contenu défini directement à l'intérieur d'un composant plutôt que dans un fichier `.content.ts` séparé — et les écrit dans des fichiers JSON de dictionnaire pendant la phase de transformation.

> **Depuis Intlayer v9**, `intlayerCompiler` est automatiquement inclus dans le plugin principal [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayer.md) lorsque `compiler.enabled` est à `true` et que `compiler.output` est défini dans votre configuration Intlayer. Vous n'avez besoin de l'enregistrer séparément que si vous souhaitez un contrôle total sur la configuration spécifique au compilateur.

## Utilisation

### En tant que partie de `intlayer()` (recommandé, v9+)

Activez le compilateur via votre configuration Intlayer :

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // où les dictionnaires extraits sont écrits
  },
});
```

Ensuite, utilisez le plugin standard sans enregistrement supplémentaire :

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Autonome (si nécessaire)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Options

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Option           | Type                      | Description                                                                                                   |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Surcharges de configuration Intlayer transmises à `getConfiguration()`.                                       |
| `compilerConfig` | `Partial<CompilerConfig>` | Surcharges pour la section de configuration spécifique au compilateur (ex. `enabled`, `output`, `filesList`). |

### Exemple

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Comment ça fonctionne

### Phase de transformation

Pour chaque fichier source qui correspond à `compiler.filesList`, le plugin du compilateur :

1. Passe le contenu du fichier via `extractContent` de `@intlayer/babel`.
2. Appelle `onExtract` pour chaque déclaration trouvée, ce qui écrit le JSON du dictionnaire résultant dans `compiler.output`.
3. Renvoie le code source transformé avec les déclarations en ligne remplacées par des appels standard `useIntlayer('key')` / `getIntlayer('key')`.

Types de fichiers pris en charge : `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

Lorsqu'un fichier de composant est enregistré en mode développement, le compilateur :

1. Détecte le changement de fichier via le hook `handleHotUpdate` de Vite.
2. Extrait à nouveau le contenu du fichier mis à jour.
3. Écrit le JSON du dictionnaire mis à jour.
4. Déclenche un rechargement complet de la page (`server.ws.send({ type: 'full-reload' })`).

Un debounce de 500 ms empêche l'écriture du dictionnaire elle-même (qui déclenche également un événement de modification de fichier) de provoquer une boucle d'extraction infinie.

### Dédoublonnage

`intlayerCompiler` utilise le même mécanisme de dédoublonnage `createPrimaryInstanceGuard` que les autres plugins intégrés. Lorsque `intlayer()` (qui intègre le compilateur) et un appel manuel à `intlayerCompiler()` sont tous deux présents, seule la première instance enregistrée s'exécute — aucun dictionnaire n'est écrit deux fois.
