---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Valider les dictionnaires avec des schémas (Zod)"
description: "Déclarez des schémas Zod dans intlayer.config.ts et attachez-les à vos dictionnaires pour valider chaque locale au build et typer le contenu dans votre éditeur."
keywords:
  - Schéma
  - Zod
  - Validation
  - Dictionnaire
  - Déclaration de contenu
  - Typage
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Initialisation de la doc"
author: aymericzip
---

# Valider les dictionnaires avec des schémas

Un schéma décrit la forme attendue du contenu d'un dictionnaire. Vous le déclarez une seule fois dans `intlayer.config.ts`, vous lui donnez un nom, puis vous attachez ce nom à n'importe quel dictionnaire via le champ `schema`.

Intlayer va alors :

- **Valider** le dictionnaire pour chaque locale lors du build des dictionnaires, et signaler chaque erreur avec sa locale et le chemin du champ.
- **Typer** le contenu du dictionnaire dans votre éditeur, pour qu'un champ manquant ou mal typé soit détecté avant le build.

Les schémas sont utiles quand plusieurs dictionnaires doivent partager la même structure (métadonnées SEO, fiches produit, entrées de type CMS), ou quand le contenu doit respecter des contraintes que TypeScript ne peut pas exprimer, comme une longueur maximale sur chaque traduction.

<Steps>
<Step number={1} title="Déclarer les schémas dans la configuration">

Installez [Zod](https://zod.dev) :

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Puis déclarez vos schémas sous la clé `schemas`. Chaque clé est le nom que vous référencerez depuis vos dictionnaires.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Attacher un schéma à un dictionnaire">

Renseignez le champ `schema` d'un dictionnaire avec l'un des noms déclarés dans la configuration.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

Un même schéma peut être attaché à autant de dictionnaires que nécessaire.

</Step>
<Step number={3} title="Lancer le build et lire le rapport">

La validation s'exécute à chaque build des dictionnaires : avec `npx intlayer build`, ou via le plugin de votre bundler en mode dev et build. Si une traduction ne respecte pas le schéma, Intlayer affiche la locale, le chemin du champ et le message Zod :

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Une exécution ponctuelle de `intlayer build` échoue si le schéma est inconnu ou si la validation échoue. En mode watch, Intlayer exclut le dictionnaire invalide jusqu’à ce que son contenu soit corrigé.

</Step>
</Steps>

## Typer le contenu à partir du schéma

Les paramètres génériques de `Dictionary` déterminent la rigueur du contrôle TypeScript sur un dictionnaire :

| Déclaration                                             | Champ `schema`                              | Champ `content`                     |
| ------------------------------------------------------- | ------------------------------------------- | ----------------------------------- |
| `satisfies Dictionary`                                  | Autocomplété, un nom inconnu est une erreur | Non vérifié par TypeScript          |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Doit valoir `"seo-metadata"`                | Typé depuis le schéma               |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Doit valoir `"seo-metadata"`                | Typé depuis le schéma et votre type |

Avec un schéma typé, chaque champ accepte soit une valeur brute, soit un nœud de contenu qui produit cette valeur, `t()` reste donc autorisé :

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer génère ces types à partir de vos schémas Zod dans `.intlayer/types` à chaque build des dictionnaires. Seule la forme est typée : les contraintes comme `.min()`, `.max()` ou `.regex()` sont vérifiées au build.

## Ce qui est validé

Pour chaque locale listée dans `internationalization.locales`, Intlayer résout le contenu du dictionnaire pour cette locale, puis valide le résultat. Le schéma décrit donc la valeur finale d'un champ (`title: string`), et non le nœud `t()` qui contient les traductions.

- **Traductions manquantes** : avec le `strictMode` par défaut, une traduction manquante se rabat sur la locale par défaut avant la validation. Avec `strictMode: "strict"`, une traduction manquante fait échouer un champ requis.
- **Autres nœuds de contenu** : `enu()`, `plural()`, `cond()`, `gender()`, `select()` et `insert()` sont résolus en fonctions, et `md()` ou `html()` en nœuds. Déclarez ces champs avec `z.any()`, et gardez les contraintes sur les champs résolus en valeurs brutes.
- **Non validé** : le contenu fourni par une fonction ou une Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/function_fetching.md)), et les dictionnaires récupérés depuis le [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

## Utiliser une autre librairie de validation

Les entrées de `schemas` ne sont pas liées à Zod. Tout objet exposant une méthode `safeParse(data)` compatible avec Zod fonctionne, tant qu'elle retourne `{ success: true }` ou `{ success: false, error: { issues } }`, où chaque issue possède un tableau `path` et un `message`. Le typage du contenu n'est généré qu'à partir des schémas Zod : avec une autre librairie, le contenu des dictionnaires attachés est typé `any`.

## Questions fréquentes

<FAQ>

<Question title="Une erreur de schéma bloque-t-elle mon build ?">

Une exécution ponctuelle de `intlayer build` échoue si le dictionnaire ne respecte pas son schéma. En mode watch, Intlayer signale les erreurs et exclut le dictionnaire invalide jusqu’à ce que vous le corrigiez et l’enregistriez.

</Question>
<Question title="Plusieurs dictionnaires peuvent-ils partager le même schéma ?">

Oui. Un schéma est référencé par son nom, donc autant de dictionnaires que nécessaire peuvent pointer dessus. C'est le cas d'usage principal : imposer une même structure à toutes les métadonnées de page, fiches produit ou templates d'email.

</Question>
<Question title="Que se passe-t-il si le nom du schéma n'existe pas ?">

TypeScript le signale dès qu'au moins un schéma est déclaré, car le champ `schema` n'accepte que les noms déclarés. Pour un fichier JSON, Intlayer signale le nom de schéma inconnu lors du build et rejette le dictionnaire.

</Question>
<Question title="Toutes les locales sont-elles validées, ou seulement celle par défaut ?">

Toutes les locales listées dans `internationalization.locales`. Le rapport indique la locale en échec, il est donc facile de repérer une traduction trop longue uniquement en allemand.

</Question>

</FAQ>

## Pour aller plus loin

- [Fichiers de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [Traduction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md)
- [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md)
