---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: Documentation de la fonction getIntlayer | intlayer
description: "Utilisez getIntlayer pour lire le contenu d'un dictionnaire pour une locale n'importe où, l'équivalent agnostique du hook useIntlayer."
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayer
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "Sans locale, résolution de la locale de la requête ou de la locale stockée avant la locale par défaut"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Documentation initiale"
author: aymericzip
---

# Documentation : Fonction `getIntlayer` dans `intlayer`

## Description

La fonction `getIntlayer` récupère un dictionnaire par sa clé et retourne son contenu interprété pour une locale donnée. C'est l'équivalent agnostique du framework du hook `useIntlayer` : même contenu, mêmes sélecteurs, mais utilisable n'importe où où un contexte React n'est pas disponible, scripts Node, fonctions serveur, chargeurs de routes, constructeurs de métadonnées, gestionnaires Express/Fastify, tests.

Elle lit les dictionnaires générés par Intlayer dans `.intlayer/`, donc l'argument `key` est typé et autocompléé à partir de vos propres déclarations de contenu, et l'objet retourné est entièrement typé jusqu'à chaque feuille.

**Fonctionnalités principales :**

- Clés de dictionnaire typées et contenu retourné typé
- Interprète chaque nœud de contenu (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Accepte une locale ou un objet sélecteur (collections, variantes)
- Les résultats sont mémorisés par `key + locale + selector`
- Bascule vers un proxy sûr en développement quand un dictionnaire est manquant, au lieu de planter

## Signature de la fonction

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Requis
  localeOrSelector?: LocalesValues | DictionarySelector, // Optionnel
  plugins?: Plugins[]                         // Optionnel
): DeepTransformContent<...>
```

## Paramètres

- `key: DictionaryKeys`
  - **Description**: La clé du dictionnaire à lire, telle que déclarée dans vos fichiers de contenu.
  - **Type**: `DictionaryKeys`, une union de chaque clé de dictionnaire déclarée.
  - **Requis**: Oui

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: La locale pour interpréter le contenu avec, ou un objet sélecteur pour [les dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md).
    - `'fr'`: une locale
    - `{ item: 2 }`: un élément de [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/collections.md) (omettez `item` pour obtenir chaque élément sous forme de tableau)
    - `{ variant: 'black-friday' }`: une [variante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/variants.md) nommée (omettez pour la variante `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: une variante structurée
    - Tout sélecteur peut porter une locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Requis** : Non (optionnel). Si elle est omise, voir [Sans locale](#sans-locale).

- `plugins: Plugins[]`
  - **Description**: Des transformateurs de nœuds personnalisés remplaçant les plugins interpréteur de base. Usage avancé uniquement; omettez-le pour conserver le comportement par défaut.
  - **Type**: `Plugins[]`
  - **Requis**: Non (optionnel)

### Retours

- **Type** : Le contenu interprété du dictionnaire, typé à partir de votre déclaration.
- **Description** : Un objet simple miroir du champ `content` de votre dictionnaire, où chaque nœud Intlayer a été résolu à sa valeur finale pour la locale demandée.

## Exemple d'utilisation

### Utilisation de base

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      fr: "Bonjour",
      en: "Hello",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### Sans locale

Lorsqu'aucune locale n'est passée, `getIntlayer` ne se rabat pas directement sur la locale par défaut. Elle résout, dans l'ordre :

1. **La locale de la requête en cours**, côté serveur, lorsqu'une intégration Intlayer la gère : les middlewares `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer` et `elysia-intlayer`, les middlewares `remix-intlayer` et `astro-intlayer`, ainsi que `IntlayerProvider` / `setLocale` dans les React Server Components. Chaque requête est résolue à partir de ses propres cookies et headers : des utilisateurs simultanés ne partagent jamais leur locale.
2. **La locale stockée dans le navigateur** (cookie, `localStorage`, `sessionStorage`), celle que persiste un sélecteur de langue.
3. **La `defaultLocale`** déclarée dans votre [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

- [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Locale de la requête, sinon locale stockée, sinon locale par défaut
```

La même résolution s'applique à `getDictionary`, aux appels réécrits par les [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md), et à `useIntlayer` / `useDictionaryDynamic` rendus en dehors d'un provider. Une locale passée explicitement l'emporte toujours.

- [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md)

> `getIntlayer` n'est pas réactive : après un changement de locale, appelez-la de nouveau pour lire la nouvelle locale. Sur une page rendue côté serveur, un appel fait en dehors de tout provider rend la locale par défaut sur le serveur et la locale stockée dans le navigateur, ce qui peut provoquer une incohérence d'hydratation. Dans ce cas, montez le provider de votre framework ou passez la locale.

### À l'intérieur d'un gestionnaire de serveur

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### Avec un sélecteur (collections et variantes)

```typescript
import { getIntlayer } from "intlayer";

// Un seul élément de collection
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Tous les éléments de la collection, sous forme de tableau ordonné
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Une variante nommée
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

## Notes de comportement

### Mise en cache

Les résultats sont mémorisés dans un cache au niveau du module, indexé par `key + locale + selector`. L'appel répété de `getIntlayer("app", "fr")` interprète le dictionnaire une seule fois et retourne le même objet par la suite.

### Dictionnaires manquants

En développement, demander une clé qui n'a pas de dictionnaire généré enregistre un avertissement une seule fois et retourne un proxy de secours sûr : lire `content.title` produit la chaîne `"app.title"` au lieu de lever une exception. Cela maintient une page utilisable pendant que la déclaration manquante est corrigée. Exécutez la construction Intlayer (ou le serveur de développement) afin que le dictionnaire soit généré.

### Taille du bundle

`getIntlayer` lit le dictionnaire fusionné, qui contient **toutes** les locales. Dans les bundles client, les [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) réécrivent l'appel afin que seul le contenu nécessaire soit livré. Quand vous lisez du contenu en dehors du rendu (métadonnées, loaders, fonctions serveur) et que vous souhaitez charger une seule locale à la demande, utilisez [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayerAsync.md) à la place.

- [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md)
- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayerAsync.md)

## Fonctions associées

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayerAsync.md)
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getDictionary.md)
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md)

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
