---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Contenu Basé sur la Sélection
description: Apprenez à utiliser le contenu basé sur la sélection dans Intlayer pour afficher dynamiquement du contenu en fonction d'une valeur de chaîne arbitraire. Suivez cette documentation pour implémenter efficacement du contenu de type switch dans votre projet.
keywords:
  - Contenu Basé sur la Sélection
  - Contenu Switch
  - ICU select
  - Rendu Dynamique
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Introduire le contenu basé sur la sélection"
author: aymericzip
---

# Contenu Basé sur la Sélection / Select dans Intlayer

## Comment fonctionne la Sélection (Select)

Dans Intlayer, le contenu basé sur la sélection est réalisé grâce à la fonction `select`, qui mappe des valeurs de chaîne arbitraires à leur contenu correspondant. C'est l'équivalent d'un message ICU `{value, select, …}`, ou d'une instruction `switch` dans le code de votre application.

Utilisez `select` lorsque le discriminant est une chaîne de caractères libre — un statut, un forfait, une plateforme, un rôle. Pour les autres discriminants, Intlayer fournit des nœuds dédiés :

| Discriminant                 | Nœud       |
| ---------------------------- | ---------- |
| Une quantité                 | `enu()`    |
| Un booléen                   | `cond()`   |
| Un genre                     | `gender()` |
| Toute autre valeur de chaîne | `select()` |

## Configuration du contenu basé sur la sélection

Pour configurer le contenu basé sur la sélection dans votre projet Intlayer, créez un module de contenu qui inclut vos définitions de sélection. Vous trouverez ci-dessous des exemples dans différents formats.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // Optionnel
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // Optionnel
      },
    },
  },
}
```

> Si aucun `fallback` n'est déclaré, la dernière clé déclarée sera prise comme valeur par défaut lorsque la valeur fournie ne correspond à aucun cas déclaré — le même contrat que pour `cond()` et `gender()`.

### Sécurité du typage

L'argument accepté est déduit des cas déclarés :

- Sans `fallback`, seuls les cas déclarés sont acceptés — une faute de frappe est une erreur de typage.
- Avec un `fallback`, n'importe quelle chaîne de caractères est acceptée (la valeur par défaut couvre les valeurs non correspondantes) tandis que les cas déclarés sont toujours proposés en autocomplétion.

## Pourquoi ne pas utiliser un objet simple ?

Il est tentant de déclarer un objet simple et de l'indexer avec la valeur d'exécution :

```tsx
// ❌ Ne faites pas cela
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Le compilateur Intlayer analyse votre code source pour supprimer le contenu inutilisé et minifier les clés restantes. Un accès calculé dynamique (`obj[expr]`) ne peut pas être résolu de manière statique, de sorte que toute la branche est marquée comme opaque : elle est conservée dans le bundle et ses clés ne sont pas minifiées.

Avec `select()`, la résolution du cas se produit à l'intérieur d'un appel de fonction plutôt que comme un accès à une propriété. Le compilateur voit un seul accès à un champ statique et optimise le nœud exactement comme `enu()`, `cond()` ou `gender()` :

```tsx
// ✅ Faites ceci
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Utilisation du contenu basé sur la sélection

<Tabs group="framework">
  <Tab label="React" value="react">

Pour utiliser le contenu basé sur la sélection dans un composant React, importez et utilisez le hook `useIntlayer` du package `react-intlayer`. Ce hook récupère le contenu de la clé spécifiée et vous permet de transmettre une valeur pour sélectionner la sortie appropriée.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Sortie : This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Sortie : This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Sortie : Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Pour utiliser le contenu basé sur la sélection dans les composants clients Next.js, récupérez-le via le hook `useIntlayer`. Voici un exemple :

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Pour utiliser le contenu basé sur la sélection dans des composants Vue, récupérez-le via le hook `useIntlayer`. Voici un exemple :

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Pour utiliser le contenu basé sur la sélection dans des composants Svelte, récupérez-le via le hook `useIntlayer`. Le store est accessible avec `$`. Voici un exemple :

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Pour utiliser le contenu basé sur la sélection dans des composants Preact, récupérez-le via le hook `useIntlayer`. Voici un exemple :

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

Pour utiliser le contenu basé sur la sélection dans des composants SolidJS, récupérez-le via le hook `useIntlayer`. Voici un exemple :

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Pour utiliser le contenu basé sur la sélection dans des composants Angular, récupérez-le via le hook `useIntlayer`. Voici un exemple :

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Pour utiliser le contenu basé sur la sélection avec `vanilla-intlayer`, récupérez-le via le hook `useIntlayer`. Voici un exemple :

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Rendu initial
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Combinaison de Select avec d'autres Nœuds

Chaque cas contient un nœud de contenu complet, de sorte que `select` se combine avec `t()`, `insert()`, `md()` et les autres :

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Sortie : Alice a enregistré un brouillon
```

## Migration depuis `select` d'ICU

Les messages utilisant l'argument `select` d'ICU sont importés en tant que nœuds `select` :

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

devient

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

Le cas `other` d'ICU est renommé en `fallback`, qui est le nom canonique d'Intlayer pour la valeur par défaut de rattrapage. Le deuxième argument enregistre le nom de la variable ICU afin que le message puisse être reconverti exactement dans la même chaîne ICU lors de son exportation.

> Un `select` ICU dont les cas sont des valeurs de genre (`male` / `female` / `other`) est importé en tant que nœud [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md) à la place.

## Ressources Supplémentaires

Pour des informations plus détaillées sur la configuration et l'utilisation, consultez les ressources suivantes :

- [Documentation de la CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md)
- [Documentation de React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)
- [Documentation de Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)

Ces ressources offrent des informations approfondies sur la configuration et l'utilisation d'Intlayer dans divers environnements et frameworks.
