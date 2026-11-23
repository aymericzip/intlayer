---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Plugin Prettier x Oxfmt | Trier les traductions Intlayer et corriger .value
description: "Triez les locales de t(), plural(), enu() et select() dans vos déclarations de contenu, et ajoutez .value là où le contenu est utilisé comme chaîne pour garder un typage valide avec l'éditeur visuel. Compatible avec Prettier et oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Formatage
  - Trier traductions
  - Trier locales
  - i18n
  - Internationalisation
  - plural
  - enumeration
  - select
  - Éditeur visuel
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "Ajout de la réécriture .value pour le contenu utilisé comme chaîne"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Historique initial"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Ajout de l'utilisation avec oxfmt"
author: aymericzip
---

# Plugin Prettier x Oxfmt

`prettier-plugin-intlayer` fait deux choses à chaque formatage Prettier :

1. **Trie vos traductions** dans un ordre fixe. Les diffs restent réduits, les conflits de fusion deviennent plus rares et une locale manquante se repère immédiatement.
2. **Ajoute `.value`** là où le contenu est utilisé comme chaîne, pour que votre typage reste valide une fois l'éditeur visuel activé.

```ts
// avant
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// après
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Installation

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Nécessite Prettier 3 ou une version ultérieure.

Si votre projet utilise déjà Prettier, `intlayer init prettier` installe le plugin et l'ajoute automatiquement à votre configuration.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt ne peut pas charger de plugins tiers, le tri passe donc par Prettier. Installez Prettier à côté d'oxfmt. Il sert uniquement à trier vos déclarations de contenu, oxfmt continue de formater votre projet.

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

Nécessite Prettier 3 ou une version ultérieure. `intlayer init` ne configure le plugin que dans les projets qui utilisent déjà Prettier. Configurez-le donc manuellement comme ci-dessous.

  </Tab>
</Tabs>

## Utilisation

Le plugin fonctionne avec Prettier et avec [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Ajoutez le plugin à votre configuration Prettier :

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Pour trier uniquement vos déclarations de contenu, utilisez un override. La réécriture `.value` ne s'applique alors plus à vos composants :

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

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

Le script de formatage exécute deux outils, chacun avec un seul rôle :

1. **Prettier** exécute le plugin. Le premier glob trie vos déclarations de contenu, le second ajoute `.value` dans vos composants. Retirez le second glob si vous voulez seulement trier.
2. **oxfmt** formate tout le projet, déclarations de contenu comprises.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

Respectez cet ordre. oxfmt remplace la mise en forme écrite par Prettier par la sienne, mais ne réordonne jamais les clés des objets, l'ordre trié est donc conservé.

Cette configuration a quelques limites :

- **Formatage à l'enregistrement.** Un éditeur qui formate avec oxfmt n'exécute pas le plugin. Lancez plutôt le script `format`.
- **Mode check.** N'utilisez pas `prettier --check` sur des fichiers formatés par oxfmt : les mises en forme diffèrent, il signale donc chaque fichier. Pour vérifier l'ordre en CI, lancez le script `format` et faites échouer le job en cas de changements :

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### Traductions identiques

Dans les fichiers `*.content.*`, un `t()` dont toutes les locales contiennent la même chaîne est remplacé par cette chaîne. Une chaîne simple est servie à toutes les locales, le résultat ne change donc pas.

```ts
// avant
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// après
nextjs: "Next.js",
```

Un `t()` avec une seule locale, un argument de type (`t<string>()`), un commentaire ou des valeurs qui ne sont pas des chaînes est conservé. Passez `intlayerCollapseIdenticalTranslations: false` pour le désactiver.

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

## Contenu utilisé comme chaîne

Avec l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) activé (`editor.enabled: true`), un champ renvoyé par `useIntlayer` ou `getIntlayer` est un nœud affichable, pas une chaîne. Le passer à un attribut d'élément natif ou appeler une méthode de chaîne dessus ne passe plus le typage. Les template literals, la concaténation et `String()` acceptent n'importe quel type et restent inchangés. Le plugin ajoute `.value`, qui contient la chaîne que l'éditeur soit activé ou non.

```tsx
// avant
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// après
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

Réécrits :

- méthodes de chaîne : `content.name.toUpperCase()`
- attributs des éléments natifs : `<img alt={content.alt} />`

Laissés tels quels, car ils acceptent un nœud :

- enfants JSX : `<h1>{content.title}</h1>`
- props de composant : `<Card title={content.title} />`
- templates taggés : `` html`<h1>${content.title}</h1>` `` (Lit)

Cela concerne les composants, pas les déclarations de contenu : le plugin doit donc s'exécuter sur vos fichiers de composants. Une variable dont le nom est déclaré ailleurs dans le fichier est ignorée. Les templates Vue et Svelte ne sont pas réécrits : utilisez pour eux la [règle ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md), qui dispose aussi d'un autofix.

Elle retire aussi `.value` d'un enfant JSX : `<h1>{content.title.value}</h1>` devient `<h1>{content.title}</h1>`, pour que l'éditeur visuel puisse sélectionner le texte. Cela s'applique à React, Next.js, Preact, Solid et React Native.

Désactivez-la avec `intlayerNodeValueAccess: false`.

## Options

| Option                                  | Valeur par défaut | Description                                                                                                             |
| --------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]`          | Locales conservées en tête dans `t()`, dans cet ordre. Passez `[]` pour trier toutes les locales.                       |
| `intlayerSortContentKeys`               | `false`           | Dans les fichiers `*.content.*`, trie également les clés de contenu et les objets imbriqués.                            |
| `intlayerCollapseIdenticalTranslations` | `true`            | Dans les fichiers `*.content.*`, remplace un `t()` dont toutes les locales contiennent la même chaîne par cette chaîne. |
| `intlayerNodeValueAccess`               | `true`            | Ajoute `.value` là où le contenu est utilisé comme chaîne (`alt={content.alt}`, `content.name.toUpperCase()`).          |

## Ce qui n'est pas modifié

- Objets contenant une décomposition (`...base`), une clé calculée (`[key]`), une méthode ou une clé dupliquée.
- Mappages `plural()` contenant une clé qui n'est pas une catégorie CLDR.
- Mappages `enu()` dont le nouvel ordre modifierait le contenu résolu.
- Appels à toute autre fonction portant le même nom qu'un helper mais recevant un argument qui n'est pas un objet.

Les commentaires se déplacent avec la clé à laquelle ils appartiennent.

## Analyseurs pris en charge

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` et `jsonc`. Les blocs `<script>` des fichiers Vue, Svelte et Astro sont formatés avec ces analyseurs.

> **Limite connue.** Prettier n'exécute qu'un seul plugin par analyseur. Si un autre plugin remplace également les analyseurs JavaScript/TypeScript (par exemple `prettier-plugin-tailwindcss`), seul le dernier listé s'applique à ces fichiers. Limitez `prettier-plugin-intlayer` aux fichiers `*.content.*` avec un override pour éviter tout conflit. Avec oxfmt, les classes Tailwind sont triées par son option intégrée `sortTailwindcss`, ce conflit ne s'applique donc pas. Dans ce cas, appuyez-vous sur la [règle ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md) pour `.value` dans les composants.
