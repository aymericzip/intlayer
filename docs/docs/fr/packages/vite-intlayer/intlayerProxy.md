---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentation du plugin Vite intlayerProxy | vite-intlayer
description: Middleware de routage par langue pour les serveurs dev/preview de Vite et le SSR en production. Gère la détection de la langue, les redirections d'URL et les réécritures internes.
keywords:
  - intlayerProxy
  - vite
  - plugin
  - middleware
  - langue
  - routage
  - internationalisation
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Fusion de configOptions dans un seul objet d'options ; proxy intégré dans intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` est un plugin Vite qui enregistre un middleware de routage par langue pour **chaque environnement** : serveur de développement, serveur de prévisualisation et SSR en production (Nitro / TanStack Start).

> **Depuis Intlayer v9**, `intlayerProxy` est automatiquement inclus dans le plugin principal [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayer.md) et activé par défaut via `routing.enableProxy: true`. Vous n'avez besoin de l'enregistrer séparément que si vous avez besoin d'un contrôle de plus bas niveau ou si vous l'utilisez en dehors de la configuration standard d'`intlayer()`.

## Utilisation

### En tant que partie de `intlayer()` (recommandé, v9+)

Transmettez les options `proxy` au plugin principal au lieu d'enregistrer `intlayerProxy` séparément :

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

### Autonome (si nécessaire)

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
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Toutes les options sont facultatives et transmises sous la forme d'un seul objet :

| Option          | Type                                | Description                                                                                                                                                                                    |
| --------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | Prédicat qui exclut des requêtes du routage par langue. Retournez `true` pour ignorer une requête (ex. routes d'API, vérifications de santé).                                                  |
| `configOptions` | `GetConfigurationOptions`           | Surcharges de configuration Intlayer transmises à `getConfiguration()`. À utiliser lorsque vous avez besoin que le proxy lise un fichier de configuration spécifique ou surcharge des valeurs. |

### Exemple

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` crée un middleware Node.js `(req, res, next)` autonome et indépendant du framework qui contient toute la logique de routage par langue. Il est utile dans les environnements où l'API du plugin Vite n'est pas disponible (ex. un serveur Node.js brut ou un module Nitro personnalisé).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### SSR en production (TanStack Start / Nitro via h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Comportement de routage

Le middleware reproduit la logique de routage du middleware de `next-intlayer` et prend en charge tous les modes de routage d'Intlayer.

### Modes de routage

| Mode            | URL visible dans le navigateur | Comportement                                                                                                                          |
| --------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/fr/about`                    | Par défaut. Préfixe de langue dans l'URL. La langue par défaut redirige vers l'URL sans préfixe, sauf si `prefix-all` est activé.     |
| `prefix-all`    | `/en/about`, `/fr/about`       | Toutes les langues — y compris celle par défaut — sont toujours préfixées.                                                            |
| `no-prefix`     | `/about`                       | Aucune langue dans l'URL. La langue est stockée uniquement dans les cookies ; les réécritures d'URL se font en interne.               |
| `search-params` | `/about?locale=fr`             | Langue transmise comme paramètre de requête. Redirige pour ajouter/mettre à jour le paramètre `locale` s'il est manquant ou obsolète. |

### Priorité de détection

1. Préfixe du chemin de l'URL (ex. `/fr/about` → `fr`).
2. Valeur du cookie / localStorage (`intlayer-locale`).
3. En-tête `Accept-Language`.
4. `defaultLocale` de la configuration.

### Contournement automatique

Le middleware laisse toujours passer ces requêtes directement sans gestion de la langue :

- Requêtes correspondant au prédicat `ignore`.
- `/node_modules/**`
- `/@**` – Internes de Vite (`@vite/`, `@fs/`, `@id/`, etc.).
- `/_**` – Internes du serveur (`__vite_ping`, `__manifest`, etc.).
- Requêtes dont le chemin se termine par une extension de fichier (actifs statiques). Si un préfixe de langue est présent sur le chemin d'un actif statique (ex. `/fr/logo.png`), il est supprimé afin que le fichier puisse être servi correctement.

### Routage par domaine

Lorsque `routing.domains` est configuré dans votre configuration Intlayer, le middleware gère le routage de langue inter-domaines :

- Une requête pour `/zh/about` sur `intlayer.org` est redirigée vers `https://intlayer.zh/about` quand `domains.zh = "intlayer.zh"`.
- Une requête vers `intlayer.zh/about` est réécrite en interne en `/zh/about` afin que le paramètre de route `[locale]` soit renseigné.

### Protection contre les boucles de redirection

Le middleware suit le nombre de redirections par paire `originalUrl → newUrl` dans une fenêtre glissante de 2 secondes. Plus de 10 redirections dans cette fenêtre renvoient une réponse `500` avec une erreur descriptive au lieu de boucler indéfiniment.

## Nitro / SSR en production (injection automatique, v9+)

Lorsque `intlayerProxy` est utilisé comme plugin Vite, il porte une propriété `.nitro`. Le plugin de build `nitro/vite` lit cette propriété et l'ajoute dans `nitroConfig.modules`, de sorte qu'`intlayerNitroHandler` est enregistré automatiquement comme middleware de serveur Nitro — aucune configuration manuelle n'est nécessaire pour le SSR en production.

Le gestionnaire Nitro utilise le modèle d'événement Web Fetch API d'h3 v2 (pas `fromNodeMiddleware`), il est donc compatible avec tous les profils de Nitro : Node, Bun, Deno, les runtimes edge.

## Alias obsolètes

| Export obsolète            | Remplacement    |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
