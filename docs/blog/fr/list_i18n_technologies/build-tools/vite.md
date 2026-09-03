---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n : imports glob, chunks et messages au build"
description: Ce qui est réellement spécifique à Vite dans l'i18n. Catalogues asynchrones avec import.meta.glob, découpage par route, limites du HMR et plugins au build.
keywords:
  - vite i18n
  - import.meta.glob
  - vite code splitting
  - lazy load traductions
  - vite plugin i18n
  - rollup chunks
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n : les mécanismes propres à Vite, pas à votre framework

La plupart des tutoriels "Vite i18n" sont en réalité des guides React ou Vue qui se trouvent utiliser Vite. Cet article s'intéresse à la couche sous-jacente : comment les catalogues sont importés, ce que Rollup en fait et pourquoi le lazy loading que vous avez écrit n'est probablement pas si asynchrone que vous le croyez.

## Table des matières

<TOC/>

## L'import statique est le choix par défaut, et il est synchrone

La configuration la plus intuitive importe chaque catalogue au sommet d'un module.

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

Cela place trois catalogues dans le chunk d'entrée initial, sur chaque page, pour chaque visiteur. C'est tolérable pour deux locales et une centaine de chaînes. Dès dix locales, c'est le surcoût évitable le plus lourd de votre bundle.

## `import.meta.glob` et l'option que tout le monde configure mal

L'import par motif (glob import) de Vite constitue la solution habituelle.

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

Le chargement asynchrone (lazy) est activé par défaut : chaque entrée est une fonction renvoyant un import dynamique, et Rollup génère un chunk par fichier. Ajouter `{ eager: true }` incorpore tout le contenu directement dans le module appelant, ce qui annule précisément l'optimisation visée.

```ts
// Toutes les locales dans le chunk d'entrée. Presque jamais ce que l'on souhaite.
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

Le piège est que les deux variantes fonctionnent parfaitement en dev, car Vite sert les modules de manière non empaquetée. La différence n'apparaît que dans le dossier `dist`. Vérifiez avec `npx vite build && npx vite preview`, puis examinez ce que contient réellement le chunk d'entrée.

## Le découpage par route découpe rarement comme prévu

Voici un comportement qui surprend fréquemment. Vous organisez vos catalogues par page :

```
locales/en/home.json
locales/en/checkout.json
```

Puis deux routes distinctes importent toutes deux `checkout.json`, et Rollup hisse ce fichier dans un chunk commun chargé par les deux pages. La stratégie de découpage de Rollup est guidée par le graphe de dépendances, et non par le nom de vos dossiers : un module accessible depuis plusieurs points d'entrée devient partagé. Ajouter une troisième route qui l'utilise ne change rien, et une quatrième peut réorganiser la répartition différemment.

Le découpage par route ne tient donc que si votre graphe d'importation est strictement disjoint. Si cela compte pour votre budget de performance, mesurez-le plutôt que de le supposer :

```bash
npx vite build && npx vite-bundle-visualizer
```

Si vous devez impérativement forcer la frontière de découpage, `build.rollupOptions.output.manualChunks` constitue la porte de sortie, au prix d'une maintenance manuelle.

## Les catalogues ne bénéficient pas du rechargement à chaud (HMR)

Modifiez un composant, Vite le met à jour instantanément. Modifiez `locales/fr.json` et, selon la manière dont il est importé, rien ne se passe. Le JSON importé dynamiquement ne possède pas de frontière HMR native, de sorte que le graphe de modules ne sait pas comment invalider les consommateurs.

Les développeurs contournent souvent cela en redémarrant le serveur de dev à chaque modification de texte, sans réaliser que cela peut être évité. La solution incombe au plugin i18n : il doit intercepter la mise à jour HMR et injecter les nouveaux messages dans l'application en cours d'exécution. Lors du choix d'une bibliothèque, vérifiez si son plugin Vite gère cela, car c'est un point de friction quotidien.

## `define` fige la locale dans le marbre

Il est tentant de résoudre la locale par défaut au moment du build :

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` procède à un remplacement textuel pur exécuté à la compilation. La valeur injectée au build est celle qui sera livrée, ce qui vous contraint à un build séparé par langue. C'est une stratégie légitime, et c'est exactement ce que propose l'i18n officielle d'Angular. Mais ce n'est pas ce que vous cherchez si un déploiement unique doit servir toutes les langues.

Pour les valeurs qui doivent varier à chaque requête, évitez `define` et résolvez-les au runtime.

## Déplacer l'analyse des messages au build

Toute solution mature dans cet écosystème converge vers le même principe : cesser de parser les messages dans le navigateur.

| Plugin                       | Ce qu'il déplace au build                                               |
| :--------------------------- | :---------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | Compile les messages vue-i18n en fonctions de rendu (build runtime pur) |
| Lingui (macro + plugin)      | Extrait et compile les catalogues, remplace les macros par des IDs      |
| Paraglide (inlang)           | Compile chaque message en sa propre fonction tree-shakable              |
| `vite-intlayer`              | Construit les dictionnaires par composant, purge et minifie l'inutilisé |

Le bénéfice est double : le compilateur de messages au runtime n'est plus embarqué dans le bundle, et les entrées inutilisées deviennent supprimables statiquement. Le coût associé est que votre serveur de dev et votre CI doivent tous deux exécuter le plugin, et un simple `tsc` ou un exécuteur de tests non-Vite nécessitera une configuration d'alias supplémentaire.

vue-i18n illustre parfaitement le premier bénéfice. Sans `@intlify/unplugin-vue-i18n`, vous livrez un compilateur qui fait appel à `new Function`, ce qui représente à la fois des octets superflus et un problème de Content Security Policy (CSP).

## SSR : ne stockez jamais la locale dans l'état d'un module

Si vous utilisez le SSR, que ce soit via un framework ou `vite-plugin-ssr`, la règle absolue est la suivante : une variable au niveau du module contenant la locale courante est partagée entre toutes les requêtes concurrentes sur ce processus serveur.

```ts
// Sans danger dans un navigateur. Une fuite de données entre requêtes sur un serveur.
export let currentLocale = "en";
```

Deux utilisateurs interrogeant le serveur simultanément vont entrer en concurrence, et l'un recevra la langue de l'autre. Le problème est invisible en développement local car vous êtes le seul visiteur. Résolvez la locale par requête et transmettez-la explicitement via le contexte ou le stockage local de requête de votre framework.

## Le plugin Vite d'Intlayer

Intlayer intègre un plugin unique qui prend en charge la compilation des dictionnaires, l'observation des modifications en dev et le pipeline d'optimisation.

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

La réécriture d'imports, la purge et la minification sont activées par défaut. Les deux options clés se trouvent dans `intlayer.config.ts` :

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // supprime les champs qu'aucun composant ne lit
    minify: true, // renomme les clés en alias courts
  },
};

export default config;
```

Puisque le contenu est déclaré par composant plutôt que dans de gros fichiers globaux par langue, la passe de purge s'appuie sur le graphe de modules, ce qui sécurise l'élagage. Le compromis reste le même : le plugin devient requis partout où le code est compilé, y compris en CI et dans les runners de tests. Détails dans [l'optimisation de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md).

## Erreurs courantes

- **`{ eager: true }` sur un glob que l'on pensait charger à la demande.** Fonctionne en dev, livre toutes les langues en production.
- **Croire que la structure des dossiers détermine les chunks.** Rollup suit les imports, pas l'arborescence. Mesurez votre build.
- **Redémarrer le serveur de dev pour voir un changement de texte.** C'est le symptôme d'un gestionnaire HMR absent, pas un comportement normal.
- **Mettre la locale dans `define`.** Vous vous engagez à devoir créer un build par langue.
- **État de locale au niveau du module en SSR.** Fuite de données entre requêtes indétectable en local.
- **Prendre le serveur de dev comme référence de performance.** Les modules non empaquetés ne reflètent en rien la réalité du bundle de production.

## Pour aller plus loin

- [Optimisation du bundle : purge, minification et ce qui parvient au navigateur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md)
- [Rapports de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md)
- [Référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [Configurer Intlayer avec Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)
- [Adaptateur de compatibilité i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18next.md)
- [React i18n : fonctionnement du modèle de providers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/react.md)
- [Vue i18n : son fonctionnement et ses limites](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/vue.md)
- [i18n par composant vs i18n centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md)
