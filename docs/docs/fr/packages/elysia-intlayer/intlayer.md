---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Documentation du plugin intlayer pour Elysia | elysia-intlayer
description: Découvrez comment utiliser le plugin intlayer pour le package elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Initialisation de la documentation"
author: aymericzip
---

# Documentation du plugin intlayer pour Elysia

Le plugin `intlayer` pour Elysia détecte la locale de l'utilisateur et injecte un objet `intlayer` dans le contexte de route. Il permet également l'utilisation des fonctions globales de traduction dans le contexte de la requête.

## Utilisation

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> Le plugin enregistre son contexte via un `derive` **global**, que Elysia type comme `Partial<{ intlayer: IntlayerContext }>`. La valeur est toujours présente à l'exécution pour les routes enregistrées après `.use(intlayer())`, utilisez donc l'assertion non-nulle (`intlayer!.t`) — ou l'optional chaining — pour satisfaire TypeScript en mode `strict`.

Les mêmes helpers sont disponibles en tant qu'exports autonomes, afin de pouvoir les appeler sans déstructurer le contexte de route :

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Description

Le plugin effectue les opérations suivantes :

1. **Détection de la locale** : Il lit la locale explicitement définie par le client depuis le storage (cookie, header), puis se rabat sur la locale négociée à partir du header `Accept-Language`.
2. **Injection dans le contexte** : Il ajoute une propriété `intlayer` au contexte de route Elysia (voir le tableau Contexte de la route ci-dessous).
3. **Gestion du contexte** : Il utilise `AsyncLocalStorage` pour gérer un contexte asynchrone, permettant aux fonctions globales d'Intlayer (`t`, `getIntlayer`, `getDictionary`) d'accéder à la locale spécifique à la requête sans avoir à transmettre l'objet de contexte.
4. **Préparation des dictionnaires** : Il appelle `prepareIntlayer` à la création du plugin, afin que les dictionnaires soient construits au démarrage de l'application.

### Contexte de la route

| Propriété         | Type                   | Description                                                                                        |
| ----------------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | La locale à utiliser pour cette requête, `locale_storage` étant prioritaire sur `locale_detected`. |
| `locale_storage`  | `Locale` (optionnel)   | La locale explicitement demandée par le client via un cookie ou un header.                         |
| `locale_detected` | `Locale`               | La locale négociée à partir des headers de la requête.                                             |
| `defaultLocale`   | `Locale`               | La locale configurée comme fallback dans `intlayer.config.ts`.                                     |
| `t`               | `TranslateFunction`    | Une fonction de traduction.                                                                        |
| `getIntlayer`     | `typeof getIntlayer`   | Une fonction pour récupérer les dictionnaires par clé.                                             |
| `getDictionary`   | `typeof getDictionary` | Une fonction pour traiter les objets dictionnaire.                                                 |

> Contrairement aux plugins Intlayer basés sur Node, `elysia-intlayer` s'appuie sur `AsyncLocalStorage` plutôt que sur `cls-hooked`, car `cls-hooked` dépend de `async_hooks.createHook`, que Bun n'implémente pas.

Le contexte de requête est libéré une fois la réponse mappée, afin que les helpers autonomes ne se résolvent jamais sur une requête déjà terminée. Lorsqu'ils sont appelés en dehors d'une requête gérée par le plugin, ils se rabattent sur la locale par défaut configurée.

## Ordre de résolution de la locale

Par défaut, le plugin résout la locale dans cet ordre :

1. Le cookie `INTLAYER_LOCALE`.
2. Le header `x-intlayer-locale`.
3. La négociation du header `Accept-Language`.
4. La `defaultLocale` configurée.

```bash
# Négociée depuis `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# Le cookie a la priorité sur `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# Le header a la priorité sur `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Configuration

Le plugin lit votre fichier `intlayer.config.ts`. Vous pouvez personnaliser le cookie et le header utilisés pour la détection de la locale :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Pour plus d'informations sur la configuration, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Documentation associée

- [Documentation du package elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/elysia-intlayer/exports.md)
- [Elysia i18n - Guide complet pour traduire votre application](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_elysia.md)
