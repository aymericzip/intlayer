---
createdAt: 2026-09-28
updatedAt: 2026-10-02
priority: 4
title: "Puis-je utiliser Intlayer sans provider global ?"
description: "Lire le contenu Intlayer sans monter de provider, comment la locale est résolue sur le serveur et dans le navigateur, et la différence de performance avec un provider."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - performance
  - hydratation
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Puis-je utiliser Intlayer sans provider global ?

Oui. `getIntlayer` et `getDictionary` sont de simples fonctions qui n'ont besoin d'aucun provider, et `useIntlayer` fonctionne aussi en dehors d'un provider.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Aucune locale passée
```

## Quelle locale est utilisée ?

Une locale passée explicitement l'emporte toujours. Sinon, la locale est résolue dans cet ordre :

1. **La locale de la requête en cours**, côté serveur, lorsqu'une intégration Intlayer la gère : les middlewares de `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` et `astro-intlayer`, ou `IntlayerProvider` dans les React Server Components.
2. **La locale stockée dans le navigateur** (cookie, `localStorage`, `sessionStorage`), celle que persiste votre sélecteur de langue.
3. **La `defaultLocale`** de votre configuration.

Chaque requête est résolue à partir de ses propres cookies et headers, et conservée dans un contexte propre à la requête. Des utilisateurs simultanés avec des locales différentes ne partagent jamais leur locale.

La même résolution s'applique à `getDictionary`, aux appels réécrits par l'[optimisation du build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md), ainsi qu'à `useIntlayer` et `useDictionaryDynamic` rendus en dehors d'un provider.

- [optimisation du build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md)

Les [formatteurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) (`number`, `date`, `list`…) et leurs hooks (`useNumber`, `useDate`, `useList`…) suivent le même ordre lorsqu'aucune `locale` n'est passée.

- [formatteurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md)

### Server Components Next.js

Sur Next.js, la locale de la requête n'est lisible que de façon asynchrone, via `headers()` et `cookies()`. Utilisez [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayerAsync.md), qui l'attend de la même manière que `getLocale()` de `next-intlayer/server` :

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Locale de la requête

  return { title };
};
```

Lire les headers fait passer la route en rendu dynamique. Lorsque `IntlayerProvider` fournit déjà la locale, les headers ne sont pas lus et la route reste statique.

## Performance : avec ou sans provider

Le contenu est le même. La différence porte sur la réactivité et le coût de rendu.

|                      | Avec un provider                                           | Sans provider                                                                                                                                      |
| -------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changement de locale | Les composants sont re-rendus sur place, sans rechargement | Rien n'est re-rendu ; la nouvelle locale apparaît au prochain appel (navigation, rechargement)                                                     |
| Coût d'une lecture   | Lecture du contexte et abonnement à la locale              | Un appel de fonction mémoïsé, même objet pour le même `key + locale`                                                                               |
| Coût d'un changement | Re-rendu de chaque consommateur                            | Aucun                                                                                                                                              |
| Rendu serveur        | Le serveur et le navigateur rendent la même locale         | En dehors d'une intégration de requête, le serveur rend la `defaultLocale` et le navigateur la locale stockée : incohérence d'hydratation possible |
| Bundle               | Le code du provider                                        | Environ 100 octets (gzip) pour lire la locale stockée, mise en cache jusqu'au prochain changement                                                  |

Gardez le provider pour les applications interactives qui changent de locale sur place ou qui font du rendu côté serveur. Passez-vous-en pour les backends, les scripts, les pages statiques dont la locale vient de l'URL (passez-la explicitement), ou le code qui lit le contenu une seule fois.

Voir [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayer.md) pour plus de détails.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayer.md)
