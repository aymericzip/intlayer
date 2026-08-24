---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentation de la fonction getDictionaryAsync | intlayer
description: Découvrez comment utiliser la fonction getDictionaryAsync du package intlayer
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation : fonction `getDictionaryAsync` dans `intlayer`

## Description

La fonction `getDictionaryAsync` charge un **chunk de locale unique** d'un dictionnaire et retourne son contenu interprété.

C'est l'équivalent de [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getDictionary.md) pour les maps de loaders par locale émis dans `.intlayer/dynamic_dictionaries/` : au lieu de recevoir un dictionnaire contenant chaque locale, elle reçoit la map de loader et attend uniquement le chunk dont la locale demandée a besoin.

> Dans le code de l'application, vous appelez normalement [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayerAsync.md), et non cette fonction. Les [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) réécrivent chaque appel `getIntlayerAsync('key', locale)` en `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` est exportée pour les loaders personnalisés et pour les outils qui construisent leurs propres maps de loader.

**Fonctionnalités clés :**

- Charge uniquement le chunk de locale qui est demandé
- Supporte les maps de loaders simples (`locale → loader`) et qualifiées (`locale → qualifierId → loader`)
- Déduplique les chargements concurrents du même chunk et met en cache le contenu résolu
- Les chargements échoués sont évincés du cache afin qu'un appel ultérieur relance le chunk

---

## Signature de fonction

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Requis
  key: string,                                           // Requis
  localeOrSelector?: LocalesValues | DictionarySelector, // Optionnel
  plugins?: Plugins[]                                    // Optionnel
): Promise<DeepTransformContent<...>>
```

---

## Paramètres

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: La carte des loaders par locale. Les cartes simples associent une locale à un loader ; les cartes qualifiées (utilisées par les collections et les variantes) associent une locale à un id de qualifiant, puis à un loader. Pour une carte qualifiée, seul le ou les chunk(s) ciblé(s) par le sélecteur sont chargés.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: La clé du dictionnaire, utilisée pour namespacecer le cache des chunks.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: La locale pour interpréter le contenu, ou un objet sélecteur (`{ item }`, `{ variant }`, optionnellement avec `locale`). Voir [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Node transformers. Defaults to the base interpreter set.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Retourne

- **Type**: `Promise<Content>` — une promesse qui se résout au contenu interprété du chunk chargé.
- **Description**: Se résout à `null` lorsque la map n'émet aucun chunk pour la locale demandée ni pour l'une de ses alternatives, reflétant la façon dont une coordonnée qualifiée manquante se résout.

---

## Exemple d'utilisation

### Avec une carte de chargement générée

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### Avec une carte de chargeur personnalisée

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### Avec un sélecteur sur une map qualifiée

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Notes sur le comportement

### Mise en cache et déduplication

Le cache stocke la **promise** de chaque triplet `key + locale + selector`, de sorte que les appels concurrents pour le même chunk attendent un seul chargement. Un chargement rejeté est supprimé du cache, donc un chunk défaillant est réessayé lors de l'appel suivant au lieu de rejouer le même échec indéfiniment.

### Fallback de locale

Une carte de chargeur simple est parcourue selon la même chaîne de fallback que le mode synchrone : d'abord la locale demandée, puis ses fallbacks, puis `null` si aucun n'a émis un chunk.

---

## Fonctions associées

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayerAsync.md): La fonction que les applications appellent ; les plugins de build la réécrivent en `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getDictionary.md): Équivalent synchrone prenant un dictionnaire complet.
- [Dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md): Collections et variantes, et les cartes de loader qu'elles génèrent.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
