---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentation de la fonction getDictionary | intlayer
description: Voir comment utiliser la fonction getDictionary pour le package intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Documentation initiale"
author: aymericzip
---

# Documentation : fonction `getDictionary` dans `intlayer`

## Description

La fonction `getDictionary` interprète un objet dictionnaire **que vous passez vous-même** et retourne son contenu résolu pour une locale donnée. Elle parcourt le contenu en une seule passe et applique chaque plugin interpréteur selon les besoins, en résolvant les traductions `t()`, les énumérations, les conditions, les insertions, l'imbrication, le markdown, le HTML et les nœuds de fichier.

Contrairement à [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayer.md), qui recherche un dictionnaire par clé dans le registre généré, `getDictionary` prend le dictionnaire lui-même. Cela en fait l'outil idéal pour le contenu construit à l'exécution, récupéré à partir d'une API ou d'un CMS, ou déclaré en ligne dans un test.

**Fonctionnalités clés :**

- Fonctionne avec n'importe quel objet suivant la structure du dictionnaire (`{ key, content }`)
- Accepte également un groupe de dictionnaire qualifié (collections, variantes) avec un sélecteur
- Entièrement typé : l'objet retourné reflète le `content` que vous avez passé
- Accepte les plugins interpréteurs personnalisés

---

## Signature de fonction

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Requis
  localeOrSelector?: LocalesValues | DictionarySelector, // Optionnel
  plugins?: Plugins[]                                // Optionnel
): DeepTransformContent<...>
```

---

## Paramètres

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Description**: Le dictionnaire (ou groupe de dictionnaire qualifié) à interpréter.
  - **Type**: `Dictionary | QualifiedDictionaryGroup`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: La locale pour interpréter le contenu avec, ou un objet sélecteur (`{ item }`, `{ variant }`, optionnellement avec `locale`). Voir [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Un tableau de transformateurs de nœuds définissant comment les nœuds reconnus sont interprétés. Si omis, l'ensemble par défaut des plugins d'interprétation est utilisé.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Retours

- **Type** : Le contenu interprété du dictionnaire.
- **Description** : Le `content` que vous avez transmis, avec chaque nœud Intlayer résolu pour la locale demandée. Pour un groupe de collection sans sélecteur `item`, un tableau ordonné d'entrées interprétées est retourné ; `null` est retourné lorsque le sélecteur ne cible rien.

---

## Exemple d'utilisation

### Utilisation de base

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        fr: "Bonjour",
        en: "Hello",
      }),
    },
  },
  "fr"
);

console.log(content.greeting); // "Bonjour"
```

### Interprétation du contenu récupéré à l'exécution

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### Avec un sélecteur

```typescript
import { getDictionary } from "intlayer";

// Un groupe de dictionnaire qualifié est résolu en une seule entrée…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …ou en un tableau ordonné quand aucun `item` n'est fourni
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Fonctions Associées

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getIntlayer.md): Même interprétation, mais le dictionnaire est recherché par clé dans le registre généré.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getDictionaryAsync.md): Équivalent pour les cartes de chargeurs par locale.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useDictionary.md): L'équivalent du hook React, lisant la locale depuis le fournisseur.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
