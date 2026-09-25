---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: Intlayer est-il plus léger que Paraglide ?
description: Paraglide semble presque gratuit dans les benchmarks i18n car son code est généré dans votre repo. Voici où se trouve réellement ce poids, pourquoi les lectures de locale par nœud vous coûtent des ressources, et comment le chargement dynamique d'Intlayer n'envoie qu'une seule locale au lieu de toutes.
keywords:
  - Paraglide
  - Intlayer
  - Internationalisation
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Intlayer est-il plus léger que Paraglide ?

Oui.

`Paraglide` a la réputation d'être la solution i18n la plus légère du marché, et à première vue le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) semble le confirmer : la taille de sa bibliothèque est proche de zéro. Mais une taille de bibliothèque égale à zéro ne signifie pas zéro octet envoyé au client. Cela signifie simplement que les octets se trouvent à un endroit que cette métrique n'analyse pas.

<TOC/>

## Points clés à retenir

**La taille de la bibliothèque est cachée, pas éliminée :**

Paraglide génère son runtime et ses fonctions de messages directement dans votre codebase. Ce code est bel et bien envoyé au navigateur, mais il est comptabilisé comme étant _votre_ code, et non celui de la bibliothèque.

**L'absence de provider n'est pas un gain gratuit :**

Chaque appel `m.my_key()` résout la locale de manière autonome, en lisant le cookie ou le storage pour chaque nœud rendu, au lieu de la lire une seule fois depuis un contexte.

**Aucun chargement dynamique :**

Paraglide importe chaque locale d'un message dans votre bundle client. Intlayer, avec `importMode: 'dynamic'` ou `'fetch'`, ne charge que la locale actuellement affichée.

**Le tree shaking n'est pas garanti :**

Dans certains de nos benchmarks, le tree shaking annoncé par Paraglide n'a pas fonctionné. Vérifiez vos propres bundles.

## Où passe le poids de Paraglide ?

Dans les rapports de benchmark, la métrique « taille de la bibliothèque » mesure le provider et les hooks de chaque bibliothèque i18n dans un composant vide, avant l'ajout de tout contenu.

| Bibliothèque (TanStack Start) | Taille lib (gz) | Taille lib (min) |
| ----------------------------- | --------------- | ---------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB          | 4.5 KB           |
| `react-intlayer@9.5.1`        | 5.0 KB          | 15.2 KB          |

Isolé de tout contexte, Paraglide semble gagner. Mais Paraglide est un compilateur : il lit vos fichiers `messages/*.json` et écrit un dossier `paraglide/` dans votre dépôt, contenant un fichier `runtime.js` (détection de locale, stratégies de cookies et de storage, localisation des URLs) ainsi qu'une fonction JavaScript par message.

```bash
src/paraglide/
├── runtime.js      # détection de locale, stratégies, helpers d'URL
├── server.js
├── messages.js     # réexporte chaque message
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Puisque ce code réside dans votre dossier `src/` et que vous l'importez avec un chemin relatif, le bundler l'attribue à votre application, et non à un package tiers dans `node_modules`. La colonne de taille de bibliothèque n'affiche donc presque rien, alors que la même logique est toujours envoyée dans le bundle de votre page.

Générer du code n'est pas une mauvaise idée en soi : le runtime généré n'inclut que la logique requise par votre configuration (stratégie de préfixe, cookie vs. local storage, etc.). Intlayer parvient au même résultat différemment, en injectant des variables d'environnement au moment du build afin que le bundler élimine les branches non utilisées par votre configuration. Les deux approches s'avèrent de 3 à 10 fois plus légères qu'`i18next` ou `next-intl`.

La comparaison équitable ne repose donc pas sur la taille de la bibliothèque. Elle repose sur **le JavaScript réellement envoyé par page**.

## Poids par page, mesuré

Application TanStack Start, 10 pages, mesuré sur les routes `en` et `fr`, compressé avec gzip :

| Configuration                      | JS page moy (gz) | Au-dessus de la base | Fuite de locale | Fuite autres pages |
| ---------------------------------- | ---------------- | -------------------- | --------------- | ------------------ |
| Base (sans i18n)                   | 111.0 KB         | -                    | 0.0%            | 0.0%               |
| `paraglide` (toutes stratégies)    | 125.1 KB         | +14.1 KB             | 49.7%           | 0.0%               |
| `intlayer` (`importMode: static`)  | 125.8 KB         | +14.8 KB             | 50.0%           | 0.0%               |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**     | **+7.6 KB**          | **0.0%**        | **0.0%**           |

Next.js 16 App Router, même application :

| Configuration    | JS page moy (gz) | Au-dessus de la base |
| ---------------- | ---------------- | -------------------- |
| Base (sans i18n) | 141.0 KB         | -                    |
| `paraglide-next` | 155.3 KB         | +14.3 KB             |
| `next-intlayer`  | **141.3 KB**     | **+0.3 KB**          |

<I18nBenchmark framework="tanstack" vertical/>

> Données complètes dans le [rapport de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) et le [rapport de benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md). Chaque bundle peut être inspecté dans le [dépôt du benchmark](https://github.com/intlayer-org/benchmark-i18n).

Deux constats majeurs s'imposent :

- En mode `static`, Intlayer envoie pratiquement le même contenu que Paraglide (125.8 KB contre 125.1 KB). C'est attendu : les deux incluent chaque locale des messages utilisés par une page.
- Paraglide reste à 125.1 KB quelle que soit la stratégie, car il ne propose aucun mode dynamique. Chaque ligne du tableau ci-dessus correspond à la version statique.

## L'absence de Provider : une fausse bonne idée

Paraglide n'utilise aucun provider. Vous importez un message et vous l'appelez :

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Pas de contexte, pas de wrapper, pas de hook. Cela semble plus simple. Pourtant, la locale doit bien être obtenue quelque part. Chaque fonction de message générée ressemble approximativement à ceci (version simplifiée) :

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // résolu à chaque appel

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...une branche par locale
};
```

Et `getLocale()` parcourt l'ensemble des stratégies configurées (cookie, local storage, URL, locale de base) pour trouver la locale active. Chaque nœud de texte affiché (`<>{m.my_key()}</>`) exécute sa propre résolution de locale, ce qui implique de lire `document.cookie` dans le navigateur. Une page avec 200 chaînes traduites résout la locale 200 fois par rendu, puis à nouveau à chaque nouveau rendu.

Une bibliothèque reposant sur un provider lit la locale **une seule fois**, la stocke dans un contexte (ou un signal, ou un store), et chaque nœud lit une valeur déjà présente en mémoire. Le provider coûte quelques centaines d'octets. S'en passer coûte des cycles CPU à chaque rendu, et les résultats du benchmark le montrent bien : les temps de chargement de page et de changement de langue de Paraglide sont systématiquement en retrait par rapport à Intlayer sur TanStack Start (22.1 ms contre 14.6 ms pour le chargement de page, 4.3 ms contre 3.2 ms pour la réactivité E2E).

## Expérience Développeur

La source de vérité de Paraglide repose sur des fichiers JSON, mais vous n'importez jamais ces JSON directement. Vous importez le fichier `.js` généré :

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/fr.json"
{
  "hero_title": "Publiez votre app dans toutes les langues"
}
```

```tsx fileName="Hero.tsx"
// Existe uniquement après régénération par le compilateur à partir du JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      fr: "Publiez votre app dans toutes les langues",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Cette boucle de travail a un coût :

- Chaque modification apportée à un fichier JSON nécessite une régénération avant que l'importation ne soit résolue ou que les types ne soient mis à jour.
- Le dossier généré `paraglide/` doit soit être commité, ce qui crée des conflits de fusion sur les fichiers générés à chaque PR modifiant du texte, soit être ignoré, ce qui impose une étape de génération avant chaque vérification de types, test ou job de CI.
- Chaque chaîne devient un appel de fonction. Les constantes se transforment partout en `m.key()`, y compris là où une simple valeur suffirait.

## Tree Shaking : vérifiez votre bundle

La promesse principale de Paraglide est d'éliminer les messages non utilisés via le tree shaking, puisque chaque message est son propre export. Dans le benchmark Svelte + Vite, cela fonctionne comme prévu.

Dans d'autres environnements, ce n'est pas le cas. Dans notre test sur [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md), les pages Paraglide pèsent 14 KB de plus que l'application de base, là où `next-intlayer` n'ajoute que 0.3 KB. Des tests précédents sur TanStack Start ont également montré que des messages d'autres pages se retrouvaient inclus dans le bundle de la route.

Le tree shaking dépend fortement de votre bundler (Turbopack, Rolldown, Rollup), de la manière dont les messages sont importés (`import { m }` vs. `import * as m`), et de l'analyse des effets de bord. Si vous choisissez Paraglide pour sa taille, ouvrez votre visualiseur de bundle et vérifiez son comportement réel dans votre application.

## Pas de chargement dynamique

Il s'agit d'une limite structurelle. Paraglide ne permet pas de charger une seule locale à la fois : chaque fonction de message importe statiquement l'implémentation de chaque langue, de sorte que toutes les langues finissent dans votre bundle client.

Avec 2 langues, cela représente la moitié de votre payload de traduction gaspillée, ce qui correspond aux ~50% de fuite de locale mesurés plus haut. Avec 10 langues, c'est 90% de gaspillage. Avec 30 langues, 97%.

Passer à un chargement dynamique ne résoudrait rien : avec une fonction par message, charger chaque fonction à la demande impliquerait des milliers de requêtes réseau.

Intlayer vous laisse choisir, globalement ou par dictionnaire :

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | Ce qui est envoyé au client                               | vs. Paraglide                        |
| ------------ | --------------------------------------------------------- | ------------------------------------ |
| `static`     | Toutes les locales des dictionnaires utilisés             | Contenu théoriquement identique      |
| `dynamic`    | Seulement la locale active, chargée à la demande          | **N fois plus léger** avec N langues |
| `fetch`      | Seulement la locale active, récupérée via l'API Live Sync | **N fois plus léger** avec N langues |

Grâce à la [transformation au build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et `importMode: 'static'`, Intlayer charge, en théorie, exactement le même contenu que Paraglide. Avec `'dynamic'` ou `'fetch'`, il ne charge que ce dont la locale actuelle a besoin : pour une application disponible en N langues, le payload de traduction est divisé par N par rapport à Paraglide.

## Quand Paraglide reste-t-il pertinent ?

<AccordionGroup>
<Accordion header="Svelte + Vite avec peu de langues">

Si votre stack repose sur Svelte avec Vite et que vous ne gérez que deux ou trois langues, le tree shaking fonctionne comme prévu et la surcharge liée aux langues reste minime.

</Accordion>
<Accordion header="Workflow inlang existant">

Si votre équipe utilise déjà l'écosystème inlang (Fink, Sherlock, plugins de format de message), Paraglide s'y intègre nativement.

</Accordion>
</AccordionGroup>

## Testez sur votre application

Mesurez le payload et les fuites de locales de votre application en production avec l'[i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) gratuit :

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Pour installer Intlayer :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

## Pour aller plus loin

- [Benchmark i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md)
- [Benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md)
- [Optimisation de bundle et `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md)
- [Comment choisir une bibliothèque i18n pour React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_react_i18n_library.md)
- [Pourquoi choisir une internationalisation basée sur un compilateur](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md)
