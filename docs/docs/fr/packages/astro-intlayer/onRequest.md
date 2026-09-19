---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentation du middleware onRequest | astro-intlayer
description: Découvrez comment utiliser le middleware onRequest dans les applications Astro pour résoudre la locale de la requête et remplir Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - internationalisation
  - documentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc initiale"
author: aymericzip
---

# Documentation du middleware Astro onRequest

Le middleware `onRequest` de `astro-intlayer/middleware` résout la locale de chaque requête HTTP entrante et remplit `Astro.locals.intlayer`.

Lorsque vous enregistrez l'intégration `intlayer()` dans `astro.config.mjs`, ce middleware est injecté automatiquement. Vous n'avez besoin de l'importer directement que si vous composez manuellement le middleware Astro avec `sequence(...)`.

## Utilisation

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Accédez à la locale résolue dans votre middleware personnalisé
  const { locale } = context.locals.intlayer;
  console.log(`Traitement de la requête pour la locale : ${locale}`);

  return next();
});
```

## Description

Le middleware effectue les actions suivantes :

1. **Détection de la locale** :
   - **URL** : Analyse le préfixe de chemin d'URL ou le paramètre de recherche `?locale=` (sauf si `routing.mode` est défini sur `no-prefix`).
   - **Cookies / En-têtes** : Vérifie les cookies de locale persistants ou les valeurs d'en-tête personnalisées.
   - **Accept-Language** : Utilise en dernier recours la négociation de langue préférée du navigateur.
   - Pour les pages pré-rendues (`context.isPrerendered`), la locale est extraite strictement de l'URL afin d'éviter les avertissements de build Astro.
2. **Remplissage du contexte** : Remplit `Astro.locals.intlayer` avec :
   - `locale` : La locale résolue.
   - `defaultLocale` : La locale de secours par défaut.
   - `availableLocales` : Le tableau des locales configurées.
3. **Portée AsyncLocalStorage** : Enveloppe le traitement de la requête en aval dans une portée `AsyncLocalStorage`, permettant à `useIntlayer()`, `useDictionary()` et `useLocale()` d'accéder à l'état de la requête sans passer d'arguments.

## Type `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Documentation associée

- [Intégration `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useLocale.md)
