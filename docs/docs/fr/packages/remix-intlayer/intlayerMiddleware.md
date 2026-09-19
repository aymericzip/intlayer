---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentation du middleware intlayer | remix-intlayer
description: Découvrez comment utiliser le middleware intlayer dans les applications Remix 3 pour le routage par locale et la gestion du contexte de requête.
keywords:
  - intlayer
  - intlayerMiddleware
  - remix
  - remix-3
  - middleware
  - routage
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentation du middleware Remix 3 intlayer

Le middleware `intlayer` pour Remix 3 gère la couche d'internationalisation dans l'ensemble de votre application. Conçu sur les standards web (`Request` et `Response`), il gère le routage par locale (redirections et réécritures internes), détecte la locale de la requête, la persiste dans les cookies et en-têtes, et configure une portée `AsyncLocalStorage` pour que les gestionnaires et composants puissent accéder aux traductions sans passage explicite de props.

## Utilisation

Enregistrez le middleware `intlayer` lors de l'initialisation de votre routeur Remix 3 :

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Dessert `/`, `/fr`, `/es`, la locale est résolue depuis la requête
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Description

Le middleware `intlayer` effectue les tâches suivantes :

1. **Préparation des dictionnaires** : Exécute `prepareIntlayer` au démarrage pour garantir que tous les dictionnaires générés sont construits et disponibles.
2. **Routage par locale** : Évalue la requête selon la stratégie de routage configurée (`prefix_always`, `prefix_as_needed`, `no_prefix`) :
   - **Redirections** : Si un utilisateur visite `/about` et doit être redirigé vers un préfixe de locale (ex. `/fr/about`), le middleware renvoie une réponse de redirection avec les en-têtes `location` et `Set-Cookie` appropriés.
   - **Réécritures internes** : Lorsqu'un utilisateur accède à `/fr/about`, l'URL est réécrite en interne pour que votre gestionnaire de route corresponde à `/about`, tandis que la locale résolue est capturée sous forme `fr`.
   - **Alias d'URL localisés** : Respecte les règles de réécriture d'URL définies dans `intlayer.config.ts` (ex. réécrire `/fr/about` vers `/fr/a-propos`).
3. **Résolution de la locale** : Détecte la locale active en fonction du préfixe d'URL, des cookies persistés, des en-têtes personnalisés ou des préférences du navigateur `Accept-Language`.
4. **Injection de contexte** :
   - Attache `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) au `RequestContext` Remix sous la clé `Intlayer` et `context.intlayer`.
   - Exécute le reste de la requête dans une portée `AsyncLocalStorage` (`requestStorage`), permettant à `useIntlayer`, `useDictionary` et `useLocale` d'être appelés proprement dans les gestionnaires, vues et composants.
5. **Persistance** : Attache les en-têtes et cookies de locale sortants à la réponse HTTP finale pour conserver la préférence de l'utilisateur.

## Paramètres

La fonction `intlayer` accepte des `IntlayerMiddlewareOptions` optionnelles :

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Remplacements personnalisés de la configuration de routage
};

const middleware = intlayer(options);
```

## Accès direct au contexte

En plus de l'utilisation des hooks, vous pouvez accéder directement à l'`IntlayerState` résolu depuis le contexte de requête Remix :

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Via context.get()
  const state = context.get(Intlayer);

  // Ou via la propriété directe context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Documentation associée

- [Contexte `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/Intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useLocale.md)
