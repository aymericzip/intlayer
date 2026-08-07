---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du plugin Vite intlayer | vite-intlayer
description: Découvrez comment utiliser le plugin intlayer pour le package vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Initialisation de la doc"
author: aymericzip
---

# Documentation du plugin Vite intlayer

Le plugin Vite `intlayer` intègre la configuration Intlayer dans le processus de build. Il gère les alias des dictionnaires, lance le watcher des dictionnaires en mode développement, et prépare les dictionnaires pour le build.

## Utilisation

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Options

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` extends `GetConfigurationOptions` (voir `@intlayer/config`) avec les champs supplémentaires suivants :

| Option          | Type                            | Default     | Description                                                                                                                                                                            |
| --------------- | ------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Patterns d'appelants supplémentaires pour les packages compat-adapter (par ex. `@intlayer/react-i18next`). Transmis à l'analyseur d'utilisation de champs au moment de la compilation. |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Options transmises au proxy de routage de locale inclus. Utilisez `ignore` pour exclure des chemins spécifiques (par ex. les routes API) du routage de locale.                         |

Toutes les autres options (`override`, `configFile`, …) sont transmises directement à `getConfiguration()`.

### Exemples

#### Ignorer les routes API du routage des locales

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### Avec un chemin de fichier de configuration personnalisé

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### Avec les callers compat-adapter

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## Ce que fait le plugin

### 1. Préparation du dictionnaire

Avant le démarrage de la construction (et une fois par heure en dev), `intlayer` appelle `prepareIntlayer` pour compiler tous les fichiers `.content.ts` en dictionnaires JSON optimisés stockés dans `.intlayer/`.

### 2. Alias de modules

Le plugin ajoute des alias de résolution Vite afin que `import { myDict } from 'intlayer/dictionaries/my-dict'` soit résolu vers le fichier JSON compilé sur le disque. Les builds SSR utilisent `ssr.noExternal` pour s'assurer que tous les packages `@intlayer/*` sont regroupés avec les alias appliqués.

### 3. Dev-server watcher

En mode développement, un watcher `chokidar` est démarré. Quand un fichier `.content.ts` change, les dictionnaires sont recompilés et le HMR de Vite propage la mise à jour au navigateur.

### 4. Proxy de routage des locales intégré (v9+)

Depuis Intlayer v9, le middleware `intlayerProxy` est enregistré automatiquement à l'intérieur de `intlayer()`. Il gère :

- La détection de la locale à partir du préfixe d'URL, des cookies et de l'en-tête `Accept-Language`.
- Les redirections 301 lorsque la locale détectée ne correspond pas à l'URL actuelle.
- Les réécritures d'URL internes afin que le framework voie le bon paramètre de route `[locale]`.

Le proxy est contrôlé par `routing.enableProxy` (par défaut `true`) dans votre configuration Intlayer. Pour le désactiver complètement :

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Pour personnaliser le comportement du proxy sans appel `intlayerProxy()` séparé, transmettez les options `proxy` au plugin principal :

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Consultez la [documentation intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerProxy.md) pour la référence complète du comportement du routage.

### 5. Compilateur fourni (v9+)

Quand `compiler.enabled` est `true` **et** `compiler.output` est défini dans votre config Intlayer, `intlayer()` enregistre `intlayerCompiler` automatiquement. Le compilateur extrait les déclarations de contenu inline écrites directement dans les fichiers de composants et les écrit dans les dictionnaires au moment de la transformation. Voir la [documentation intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerCompiler.md).

### 6. Optimisations de build

Pendant un build de production, le plugin ajoute :

- **intlayerOptimize** – transformation Babel qui réécrit `useIntlayer('key')` → `useDictionary(hash)` et injecte les imports JSON directs.
- **intlayerPrune** – supprime les champs de contenu inutilisés du JSON du dictionnaire.
- **intlayerMinify** – compacte le JSON du dictionnaire et optionnellement modifie les noms de champs.

Ces derniers sont inactifs en mode développement.

## Aliases dépréciés

| Export déprécié  | Remplacement |
| ---------------- | ------------ |
| `intlayerPlugin` | `intlayer`   |
| `intLayerPlugin` | `intlayer`   |
