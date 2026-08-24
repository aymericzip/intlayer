---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Pluriel
description: Découvrez comment déclarer et utiliser du contenu au pluriel adapté à la locale (basé sur CLDR) dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - Pluriel
  - Pluralisation
  - CLDR
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
author: aymericzip
---

# Contenu au Pluriel / Le pluriel dans Intlayer

## Comment fonctionne le pluriel

Dans Intlayer, le contenu au pluriel est réalisé via la fonction `plural`, qui mappe les catégories de pluriel CLDR, `zero`, `one`, `two`, `few`, `many`, `other`, à leur contenu correspondant. La catégorie correcte est sélectionnée automatiquement en fonction de la locale active et d'une valeur de compteur, en utilisant l'API intégrée à la plateforme [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules).

Contrairement à [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/enumeration.md), qui sélectionne le contenu en fonction de plages numériques que vous définissez vous-même, `plural` délègue la sélection aux règles CLDR. C'est ce qui le rend évolutif pour les langues ayant des règles de pluralisation complexes, telles que le russe, le polonais, l'arabe ou le gallois, sans avoir à écrire manuellement de logique de modulo.

## Quand utiliser `plural` vs `enu`

To use plural content inside a React component, retrieve it via the `useIntlayer` hook and call it with a count. The active locale and the count are combined to pick the matching CLDR category.

To use plural content in Next.js Client Components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

## Configuration du contenu au pluriel

Pour configurer du contenu au pluriel dans votre projet Intlayer, créez un module de contenu qui utilise l'assistant `plural`. La catégorie `other` est obligatoire et sert de repli lorsqu'une locale ne définit pas de catégorie plus spécifique.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} poste ouvert",
        other: "{{count}} postes ouverts",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "fr": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} poste ouvert",
            "other": "{{count}} postes ouverts"
          }
        }
      }
    }
  }
}
```

> Les catégories prises en charge sont `zero`, `one`, `two`, `few`, `many`, `other`. Vous n'avez qu'à déclarer les catégories utilisées par votre langue cible, Intlayer revient à `other` lorsqu'aucune catégorie spécifique ne correspond.
>
> L'espace réservé `{{count}}` est automatiquement remplacé par le nombre que vous passez au moment de l'exécution. Vous pouvez également inclure d'autres espaces réservés (voir [Espaces réservés personnalisés](#custom-placeholders) ci-dessous).

## Utilisation du contenu au pluriel avec React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

Pour utiliser du contenu au pluriel dans un composant React, récupérez-le via le hook `useIntlayer` et appelez-le avec un nombre. La locale active et le nombre sont combinés pour choisir la catégorie CLDR correspondante.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* En anglais :                                  */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Pour utiliser du contenu pluriel dans les Client Components Next.js, récupérez-le via le hook `useIntlayer` et appelez-le avec un compte. Voici un exemple :

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Pour utiliser du contenu pluralisé dans les composants Vue, récupérez-le via le hook `useIntlayer` et appelez-le avec un décompte. Voici un exemple :

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { totalOpenings } = useIntlayer("total_openings");
</script>

<template>
  <div>
    <p>{{ totalOpenings(count) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Pour utiliser du contenu pluriel dans les composants Svelte, récupérez-le via le hook `useIntlayer` et appelez-le avec un count. Le store est accessible avec `$`. Voici un exemple :

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("total_openings");
</script>

<div>
  <p>{$content.totalOpenings(count)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Pour utiliser le contenu pluriel dans les composants Preact, récupérez-le via le hook `useIntlayer` et appelez-le avec un compte. Voici un exemple :

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Pour utiliser du contenu au pluriel dans les composants SolidJS, récupérez-le via le hook `useIntlayer` et appelez-le avec un nombre. Voici un exemple :

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const OpeningsComponent: Component<{ count: number }> = (props) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(props.count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Pour utiliser du contenu pluriel dans les composants Angular, récupérez-le via le hook `useIntlayer` et appelez-le avec un count. Voici un exemple :

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-openings",
  template: `
    <div>
      <p>{{ content().totalOpenings(count) }}</p>
    </div>
  `,
})
export class OpeningsComponent {
  @Input() count!: number;

  content = useIntlayer("total_openings");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Vous pouvez appeler la fonction retournée de deux manières équivalentes :

```tsx
totalOpenings(21); // raccourci : nombre uniquement
totalOpenings({ count: 21 }); // forme explicite
```

  </Tab>
</Tabs>

## Espaces réservés personnalisés

Les chaînes au pluriel peuvent inclure des espaces réservés autres que `{{count}}`. Passez-les sous forme d'objet aux côtés de `count` :

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, vous avez {{count}} nouveau message",
      other: "{{name}}, vous avez {{count}} nouveaux messages",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, vous avez 1 nouveau message"

summary({ count: 7, name: "Alice" });
// → "Alice, vous avez 7 nouveaux messages"
```

## Les catégories CLDR en un coup d'œil

Différentes langues utilisent différents sous-ensembles des catégories CLDR. Quelques cas courants :

| Langue             | Catégories utilisées                         |
| ------------------ | -------------------------------------------- |
| Anglais (`en`)     | `one`, `other`                               |
| Français (`fr`)    | `one`, `many`, `other`                       |
| Russe (`ru`)       | `one`, `few`, `many`, `other`                |
| Polonais (`pl`)    | `one`, `few`, `many`, `other`                |
| Arabe (`ar`)       | `zero`, `one`, `two`, `few`, `many`, `other` |
| Japonais / Chinois | `other` uniquement                           |

Vous n'avez pas besoin de mémoriser cela, déclarez les catégories pour lesquelles vous avez des traductions, et Intlayer reviendra à `other` si nécessaire.

## Limitation

Contrairement aux autres nœuds, le nœud `plural` ne peut pas encore être imbriqué avec des nœuds enfants.

Exemple :

Valide :

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

Invalide :

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## Ressources supplémentaires

Pour des informations plus détaillées sur la configuration et l'utilisation, reportez-vous aux ressources suivantes :

- [Documentation sur l'énumération](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/enumeration.md)
- [Documentation sur l'insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md)
- [Documentation de l'CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)

Ces ressources offrent des informations supplémentaires sur la configuration et l'utilisation d'Intlayer dans divers environnements et frameworks.
