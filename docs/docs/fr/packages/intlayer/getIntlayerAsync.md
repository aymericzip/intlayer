---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentation de la fonction getIntlayerAsync | intlayer
description: Découvrez comment utiliser la fonction getIntlayerAsync du package intlayer
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
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
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation : Fonction `getIntlayerAsync` dans `intlayer`

## Description

La fonction `getIntlayerAsync` sélectionne un dictionnaire par sa clé et résout son contenu pour une locale donnée, **en chargeant cette locale seule**.

C'est l'équivalent asynchrone de [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayer.md), destiné aux endroits où un dictionnaire est lu en dehors du rendu — constructeurs de `head` / métadonnées de route, loaders, fonctions serveur.

Où `getIntlayer` récupère le dictionnaire fusionné contenant chaque locale, les [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) réécrivent cet appel en `getDictionaryAsync(loaderMap, key, locale)`, le pointant vers les chunks par locale dans `.intlayer/dynamic_dictionaries/`. Le bundle ne porte donc que la locale réellement demandée.

Sans ces plugins — une build non optimisée — l'appel se résout à travers le registre de dictionnaire synchrone à la place : le même contenu, sans la division par locale.

**Fonctionnalités clés :**

- Mêmes clés typées, sélecteurs et contenu retourné que `getIntlayer`
- Charge uniquement le chunk de la locale demandée dans les builds optimisées
- Les appels concurrents pour le même chunk partagent un seul chargement
- Sûr à utiliser dans les constructeurs de métadonnées `async`, loaders et fonctions serveur

---

## Signature de fonction

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Requis
  localeOrSelector?: LocalesValues | DictionarySelector, // Optionnel
  plugins?: Plugins[]                         // Optionnel
): Promise<DeepTransformContent<...>>
```

---

## Paramètres

- `key: DictionaryKeys`
  - **Description**: La clé du dictionnaire à lire, telle que déclarée dans vos fichiers de contenu.
  - **Type**: `DictionaryKeys` — une union de chaque clé de dictionnaire déclarée.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: La locale pour interpréter le contenu avec, ou un objet sélecteur pour les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md).
    - `'fr'` — une locale
    - `{ item: 2 }` — un élément de [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/collections.md) (omettez `item` pour obtenir chaque élément en tant que tableau)
    - `{ variant: 'black-friday' }` — une [variante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/variants.md) nommée (omettez pour celle par `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — une variante structurée
    - N'importe quel sélecteur peut porter une locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Des transformateurs de nœuds personnalisés remplaçant les plugins d'interpréteur de base. Utilisation avancée uniquement.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Retours

- **Type**: `Promise<Content>` — une promise qui se résout avec le contenu interprété du dictionnaire, typé à partir de votre déclaration.

---

## Exemple d'utilisation

### Utilisation de base

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

### Dans une route TanStack Start `head`

Parce que le chunk de locale est chargé à la demande, `head` devient `async` :

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayerAsync } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale } = params;

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

### Dans un `generateMetadata` Next.js

```tsx fileName="src/app/[locale]/page.tsx"
import { getIntlayerAsync } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description } = await getIntlayerAsync(
    "page-metadata",
    locale
  );

  return { title, description };
};
```

### Dans une fonction serveur

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getCookie, getIntlayerAsync, getLocale } from "intlayer";

export const getLocalizedContent = createServerFn().handler(async () => {
  const locale = await getLocale({
    getCookie: (name) => getCookie(name, getRequestHeader("cookie")),
    getHeader: (name) => getRequestHeader(name),
  });

  const content = await getIntlayerAsync("app", locale);

  return { locale, content };
});
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Returns            | Le contenu                                                                                                      | Une promesse du contenu                                     |
| Dictionary loaded  | Le dictionnaire fusionné (toutes les locales)                                                                   | Le chunk de la locale demandée uniquement                   |
| Best suited for    | Rendu, chemins de code synchrone                                                                                | Métadonnées, loaders, fonctions serveur                     |
| Requires a plugin? | Non                                                                                                             | Non — la division par locale nécessite les plugins de build |

Both accept the same arguments and return the same content: switching from one to the other only changes **when** and **how much** is loaded.

---

## Fonctions Associées

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayer.md): Équivalent synchrone lisant le dictionnaire fusionné.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getDictionaryAsync.md): La fonction de bas niveau que les plugins de build réécrivent dans cet appel.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocale.md): Détecte la locale d'une requête entrante.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
