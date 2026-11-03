---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Plugin Prettier | Trier les traductions Intlayer
description: "Triez les locales de t(), les catégories de plural(), les conditions de enu(), les cas de select() et les clés de vos déclarations de contenu avec prettier-plugin-intlayer."
keywords:
  - Intlayer
  - Prettier
  - Formatage
  - Trier traductions
  - Trier locales
  - i18n
  - Internationalisation
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Historique initial"
author: aymericzip
---

# Plugin Prettier

`prettier-plugin-intlayer` ordonne les clés de vos traductions dans un ordre fixe à chaque formatage Prettier. Les diffs restent réduits, les conflits de fusion deviennent plus rares et une locale manquante se repère immédiatement.

```ts
// avant
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// après
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Installation

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Nécessite Prettier 3 ou une version ultérieure.

Si votre projet utilise déjà Prettier, `intlayer init prettier` installe le plugin et l'ajoute automatiquement à votre configuration.

## Utilisation

Ajoutez le plugin à votre configuration Prettier :

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Pour l'appliquer uniquement à vos déclarations de contenu, utilisez un override :

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

## Ce qui est trié

### `t()` : locales

Les locales épinglées apparaissent en premier (`en` par défaut). Les autres locales suivent par ordre alphabétique.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()` : ordre CLDR

Les catégories vont de la plus petite quantité vers la solution de repli : `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()` : seuils croissants

Les conditions sont triées par leur nombre, puis par opérateur (`<1`, `<=1`, `1`, `>=1`, `>1`). `fallback` est placé en dernier.

```ts
enu({
  "<-1": "Moins de moins une voiture",
  "0": "Aucune voiture",
  "2": "Deux voitures",
  ">=3": "Plusieurs voitures",
  fallback: "Quelques voitures",
});
```

Au moment de l'exécution, la première condition correspondante l'emporte. Le plugin n'applique le nouvel ordre que si chaque quantité donne toujours le même contenu. Lorsque l'ordre détermine le résultat, l'objet reste inchangé. Par exemple, dans `{ '<1': …, '<=-2.3': … }`, la clé `'<1'` intercepte tous les nombres négatifs.

### `select()` : ordre alphabétique

Les cas sont triés par ordre alphabétique et `fallback` est placé en dernier.

```ts
select({
  draft: "Ce message est un brouillon",
  published: "Ce message est publié",
  scheduled: "Ce message est planifié",
  fallback: "Statut inconnu",
});
```

Sans clé `fallback` ni clé `other`, le dernier cas sert de solution de repli. Ce cas reste en dernier et seuls les cas qui le précèdent sont triés.

### Fichiers `.content.json`

La forme sérialisée est triée de la même façon : `{ "nodeType": "translation", "translation": { … } }`, ainsi que les nœuds `plural`, `enumeration` et `select`.

### Clés de contenu (optionnel)

Avec `intlayerSortContentKeys: true`, le plugin trie également les clés de `content` du dictionnaire par ordre alphabétique, à chaque niveau d'imbrication. Cela s'applique uniquement aux fichiers `*.content.*`.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

Le tri continue à travers chaque helper (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) pour atteindre les objets qu'ils contiennent. La structure interne de chaque helper conserve son propre ordonnancement. Les clés passées à `cond()` et `gender()` ne sont jamais réordonnées, car leur dernière clé sert de repli. Les champs situés au même niveau que `content` (`key`, `title`, `locale`…) restent inchangés.

## Options

| Option                    | Valeur par défaut | Description                                                                                       |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]`          | Locales conservées en tête dans `t()`, dans cet ordre. Passez `[]` pour trier toutes les locales. |
| `intlayerSortContentKeys` | `false`           | Dans les fichiers `*.content.*`, trie également les clés de contenu et les objets imbriqués.      |

## Ce qui n'est pas modifié

- Objets contenant une décomposition (`...base`), une clé calculée (`[key]`), une méthode ou une clé dupliquée.
- Mappages `plural()` contenant une clé qui n'est pas une catégorie CLDR.
- Mappages `enu()` dont le nouvel ordre modifierait le contenu résolu.
- Appels à toute autre fonction portant le même nom qu'un helper mais recevant un argument qui n'est pas un objet.

Les commentaires se déplacent avec la clé à laquelle ils appartiennent.

## Analyseurs pris en charge

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` et `jsonc`. Les blocs `<script>` des fichiers Vue, Svelte et Astro sont formatés avec ces analyseurs.

> **Limite connue.** Prettier n'exécute qu'un seul plugin par analyseur. Si un autre plugin remplace également les analyseurs JavaScript/TypeScript (par exemple `prettier-plugin-tailwindcss`), seul le dernier listé s'applique à ces fichiers. Limitez `prettier-plugin-intlayer` aux fichiers `*.content.*` avec un override pour éviter tout conflit.
