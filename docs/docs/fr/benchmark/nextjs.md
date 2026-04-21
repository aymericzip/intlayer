---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: La meilleure solution i18n pour Next.js en 2026 - Rapport de Benchmark
description: Comparez les bibliothèques d'internationalisation (i18n) pour Next.js comme next-intl, next-i18next et Intlayer. Rapport de performance détaillé sur la taille du bundle, les fuites et la réactivité.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - performance
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Initialisation du benchmark"
---

# Bibliothèques i18n Next.js — Rapport de Benchmark 2026

Cette page est un rapport de benchmark pour les solutions i18n sur Next.js.

## Table des Matières

<Toc/>

## Benchmark Interactif

<I18nBenchmark framework="nextjs" vertical/>

## Référence des résultats :

<iframe 
  src="https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-nextjs.md

Voir le dépôt complet du benchmark [ici](https://github.com/intlayer-org/benchmark-i18n).

## Introduction

Les bibliothèques d'internationalisation ont un impact lourd sur votre application. Le risque principal est de charger du contenu pour chaque page et chaque langue alors que l'utilisateur ne visite qu'une seule page.

À mesure que votre application grandit, la taille du bundle peut augmenter de manière exponentielle, ce qui peut nuire considérablement aux performances.

Par exemple, pour les cas les plus critiques, une fois internationalisée, votre page peut finir par être près de 4 fois plus volumineuse.

Un autre impact des bibliothèques i18n est le ralentissement du développement. Transformer des composants en contenu multilingue à travers plusieurs langues prend du temps.

Parce que le problème est complexe, de nombreuses solutions existent — certaines axées sur la DX (expérience développeur), d'autres sur la performance ou la scalabilité, etc.

Intlayer tente d'optimiser l'ensemble de ces dimensions.

## Testez votre application

Pour mettre en lumière ces problèmes, j'ai construit un scanner gratuit que vous pouvez essayer [ici](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Le problème

Il existe deux manières majeures de limiter l'impact d'une application multilingue sur votre bundle :

- Diviser votre JSON (ou contenu) par fichiers / variables / namespaces afin que le bundler puisse "tree-shaker" le contenu inutilisé pour une page donnée
- Charger dynamiquement le contenu de votre page uniquement dans la langue de l'utilisateur

Limitations techniques pour ces approches :

**Chargement dynamique**

Même lorsque vous déclarez des routes comme `[locale]/page.tsx`, avec Webpack ou Turbopack, et même si `generateStaticParams` est défini, le bundler ne traite pas `locale` comme une constante statique. Cela signifie qu'il peut inclure le contenu de toutes les langues dans chaque page. Le principal moyen de limiter cela est de charger le contenu via un import dynamique (ex: `import('./locales/${locale}.json')`).

Ce qui se passe au moment du build, c'est que Next.js émet un bundle JS par locale (ex: `./locales_fr_12345.js`). Une fois le site envoyé au client, lors de l'exécution de la page, le navigateur effectue une requête HTTP supplémentaire pour le fichier JS nécessaire (ex: `./locales_fr_12345.js`).

> Une autre façon de traiter le même problème est d'utiliser `fetch()` pour charger le JSON dynamiquement. C'est ainsi que `Tolgee` fonctionne lorsque le JSON se trouve sous `/public`, ou `next-translate`, qui s'appuie sur `getStaticProps` pour charger le contenu. Le flux est le même : le navigateur fait une requête HTTP supplémentaire pour charger l'asset.

**Découpage du contenu (Splitting)**

Si vous utilisez une syntaxe comme `const t = useTranslation()` + `t('mon-objet.mon-sous-objet.ma-cle')`, l'intégralité du JSON doit généralement être présent dans le bundle pour que la bibliothèque puisse le parser et résoudre la clé. Une grande partie de ce contenu est donc expédiée même lorsqu'il est inutilisé sur la page.

Pour atténuer cela, certaines bibliothèques vous demandent de déclarer par page quels namespaces charger — ex: `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`.

En revanche, `Paraglide` ajoute une étape supplémentaire avant le build pour transformer le JSON en symboles plats comme `const en_my_var = () => 'ma valeur'`. En théorie, cela permet au tree-shaking de supprimer le contenu inutilisé sur la page. Comme nous le verrons, cette méthode présente tout de même des compromis.

Enfin, `Intlayer` applique une optimisation au moment du build afin que `useIntlayer('ma-cle')` soit remplacé directement par le contenu correspondant.

## Méthodologie

Pour ce benchmark, nous avons comparé les bibliothèques suivantes :

- `Base App` (Pas de bibliothèque i18n)
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

J'ai utilisé `Next.js` en version `16.2.4` avec l'App Router.

J'ai construit une application multilingue avec **10 pages** et **10 langues**.

J'ai comparé **quatre stratégies de chargement** :

| Stratégie                | Sans namespaces (global)                          | Avec namespaces (scoped)                                             |
| :----------------------- | :------------------------------------------------ | :------------------------------------------------------------------- |
| **Chargement statique**  | **Static** : Tout en mémoire au démarrage.        | **Scoped static** : Divisé par namespace ; tout chargé au démarrage. |
| **Chargement dynamique** | **Dynamic** : Chargement à la demande par locale. | **Scoped dynamic** : Chargement granulaire par namespace et locale.  |

## Résumé des stratégies

- **Static** : Simple ; pas de latence réseau après le chargement initial. Inconvénient : taille de bundle importante.
- **Dynamic** : Réduit le poids initial (lazy-loading). Idéal lorsque vous avez de nombreuses locales.
- **Scoped static** : Organise bien le code (séparation logique) sans requêtes réseau supplémentaires complexes.
- **Scoped dynamic** : Meilleure approche pour le _code splitting_ et la performance. Minimise la mémoire en ne chargeant que ce dont la vue actuelle et la locale active ont besoin.

### Ce que j'ai mesuré :

J'ai fait tourner la même application multilingue dans un navigateur réel pour chaque stack, puis j'ai noté ce qui passait réellement sur le réseau et combien de temps les choses prenaient. Les tailles sont reportées **après compression web normale**, car c'est ce qui est le plus proche de ce que les gens téléchargent réellement.

- **Taille de la bibliothèque d'internationalisation** : Après bundling, tree-shaking et minification, la taille de la bibliothèque i18n est la taille des providers (ex: `NextIntlClientProvider`) + le code des hooks (ex: `useTranslations`) dans un composant vide. Cela n'inclut pas le chargement des fichiers de traduction. Cela répond à la question du coût de la bibliothèque avant même que votre contenu n'entre en jeu.

- **JavaScript par page** : Pour chaque route du benchmark, quelle quantité de script le navigateur récupère pour cette visite, moyennée sur l'ensemble des pages de la suite (et sur l'ensemble des locales lorsque le rapport les regroupe). Des pages lourdes sont des pages lentes.

- **Fuite depuis d'autres locales** : C'est le contenu de la même page mais dans une autre langue qui serait chargé par erreur dans la page auditée. Ce contenu est inutile et devrait être évité (ex: contenu de la page `/fr/about` dans le bundle de la page `/en/about`).

- **Fuite depuis d'autres routes** : La même idée pour les **autres écrans** de l'application : si leur texte accompagne le chargement alors que vous n'avez ouvert qu'une seule page (ex: contenu de la page `/en/about` dans le bundle de la page `/en/contact`). Un score élevé suggère un mauvais découpage ou des bundles trop larges.

- **Taille moyenne de bundle par composant** : Les éléments d'interface communs sont mesurés **un par un** au lieu de se cacher derrière un gros chiffre global de l'application. Cela montre si l'internationalisation gonfle silencieusement les composants quotidiens. Par exemple, si votre composant re-rend, il chargera toutes ces données depuis la mémoire. Attacher un JSON géant à n'importe quel composant revient à connecter un grand réservoir de données inutilisées qui ralentira la performance de vos composants.

- **Réactivité du changement de langue** : Je change la langue en utilisant le propre contrôle de l'application et je mesure le temps nécessaire jusqu'à ce que la page ait clairement basculé — ce qu'un visiteur remarquerait, et non une micro-étape de laboratoire.

- **Travail de rendu après un changement de langue** : Un suivi plus précis : quel effort l'interface a fourni pour se redessiner dans la nouvelle langue une fois le basculement lancé. Utile lorsque le ressenti utilisateur et le coût du framework divergent.

- **Temps de chargement initial de la page** : De la navigation jusqu'à ce que le navigateur considère la page comme entièrement chargée pour les scénarios testés. Idéal pour comparer les démarrages à froid (cold starts).

- **Temps d'hydratation** : Lorsque l'application le permet, combien de temps le client passe à transformer le HTML serveur en quelque chose sur lequel on peut réellement cliquer. Un tiret dans les tableaux signifie que cette implémentation n'a pas fourni de valeur d'hydratation fiable dans ce benchmark.

## Résultats détaillés

### 1 — Solutions à éviter

Certaines solutions, telles que `gt-next` ou `lingo.dev`, sont clairement à éviter. Elles combinent un verrouillage propriétaire (vendor lock-in) avec une pollution de votre base de code. Malgré de nombreuses heures passées à essayer de les implémenter, je n'ai jamais réussi à les faire fonctionner correctement — ni sur TanStack Start, ni sur Next.js.

Problèmes rencontrés :

**(General Translation)** (`gt-next@6.16.5`) :

- Pour une application de 110 Ko, `gt-react` ajoute plus de 440 Ko supplémentaires.
- `Quota Exceeded, please upgrade your plan` dès le tout premier build avec General Translation.
- Les traductions ne sont pas rendues ; j'obtiens l'erreur `Error: <T> used on the client-side outside of <GTProvider>`, ce qui semble être un bug de la bibliothèque.
- Lors de l'implémentation de **gt-tanstack-start-react**, je suis également tombé sur un [problème](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) avec la bibliothèque : `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, ce qui cassait l'application. Après avoir signalé ce problème, le mainteneur l'a corrigé sous 24 heures.
- La bibliothèque bloque le rendu statique des pages Next.js.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`) :

- Quota AI dépassé, bloquant entièrement le build — vous ne pouvez donc pas mettre en production sans payer.
- Le compilateur ratait presque 40 % du contenu traduit. J'ai dû réécrire tous les `.map` en blocs de composants plats pour que cela fonctionne.
- Leur CLI est buggée et réinitialisait régulièrement le fichier de configuration sans raison.
- Au build, il effaçait totalement les JSONs générés lorsque du nouveau contenu était ajouté. Résultat : une poignée de clés pouvait rayer de la carte plus de 300 clés existantes.

### 2 — Solutions expérimentales

**(Wuchale)** (`wuchale@0.22.11`) :

L'idée derrière `Wuchale` est intéressante mais pas encore viable. J'ai rencontré des problèmes de réactivité et j'ai dû forcer le re-rendu du provider pour faire fonctionner l'application. La documentation est également assez floue, ce qui rend l'adoption difficile.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`) :

`Paraglide` propose une approche innovante et bien pensée. Pourtant, dans ce benchmark, le tree-shaking annoncé n'a pas fonctionné pour mes configurations Next.js ou TanStack Start. Le workflow et la DX sont plus complexes que d'autres options.
Personnellement, je n'aime pas devoir régénérer des fichiers JS avant chaque push, ce qui crée un risque constant de conflit de fusion via les PRs. L'outil semble également plus axé sur Vite que sur Next.js.
Enfin, par rapport aux autres solutions, Paraglide n'utilise pas de "store" (ex: contexte React) pour récupérer la langue actuelle afin de rendre le contenu. Pour chaque nœud analysé, il demandera la langue au localStorage / cookie etc. Cela conduit à l'exécution d'une logique inutile qui impacte la réactivité des composants.

### 3 — Solutions acceptables

**(Tolgee)** (`tolgee@7.0.0`) :

`Tolgee` traite bon nombre des problèmes mentionnés plus haut. Je l'ai trouvé plus difficile à adopter que des outils similaires. Il n'offre pas de sécurité de type (type safety), ce qui rend également plus difficile la détection des clés manquantes à la compilation. J'ai dû wrapper les fonctions de Tolgee avec les miennes pour ajouter la détection des clés manquantes.

**(Next Intl)** (`next-intl@4.9.1`) :

`next-intl` est l'option la plus à la mode et celle que les agents IA poussent le plus — mais à mon avis à tort. La mise en route est facile. En pratique, l'optimisation pour limiter les fuites est complexe. Combiner chargement dynamique + namespacing + types TypeScript ralentit beaucoup le développement. Le package est également assez lourd (env. 13 Ko pour `NextIntlClientProvider` + `useTranslations`, soit plus de 2 fois `next-intlayer`). **next-intl** bloquait auparavant le rendu statique des pages Next.js. Il fournit un helper nommé `setRequestLocale()`. Cela semble partiellement résolu pour les fichiers centralisés comme `en.json` / `fr.json`, mais le rendu statique casse toujours lorsque le contenu est divisé en namespaces tels que `en/shared.json` / `fr/shared.json` / `es/shared.json`.

**(Next I18next)** (`next-i18next@16.0.5`) :

`next-i18next` est probablement l'option la plus populaire car elle fut l'une des premières solutions i18n pour les applications JavaScript. Elle dispose de nombreux plugins communautaires. Elle partage les mêmes inconvénients majeurs que `next-intl`. Le package est particulièrement lourd (env. 18 Ko pour `I18nProvider` + `useTranslation`, environ 3 fois `next-intlayer`).

Les formats de messages diffèrent également : `next-intl` utilise ICU MessageFormat, tandis qu'i18next utilise son propre format.

**(Next International)** (`next-international@1.3.1`) :

`next-international` s'attaque également aux problèmes ci-dessus mais ne diffère pas beaucoup de `next-intl` ou `next-i18next`. Il inclut `scopedT()` pour les traductions spécifiques à un namespace — mais son utilisation n'a pratiquement aucun impact sur la taille du bundle.

**(Lingui)** (`@lingui/core@5.3.0`) :

`Lingui` est souvent vanté. Personnellement, j'ai trouvé le workflow `lingui extract` / `lingui compile` plus complexe que les alternatives, sans avantage clair. J'ai également remarqué des syntaxes inconsistantes qui perturbent les IAs (ex: `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 — Recommandations

**(Next Translate)** (`next-translate@3.1.2`) :

`next-translate` est ma recommandation principale si vous aimez une API de style `t()`. C'est élégant via `next-translate-plugin`, chargeant les namespaces via `getStaticProps` avec un loader Webpack / Turbopack. C'est aussi l'option la plus légère ici (env. 2,5 Ko). Pour le découpage en namespaces, la définition par page ou par route dans la config est bien pensée et plus facile à maintenir que les alternatives principales comme **next-intl** ou **next-i18next**. Dans la version `3.1.2`, j'ai noté que le rendu statique ne fonctionnait pas ; Next.js se repliait sur le rendu dynamique.

**(Intlayer)** (`next-intlayer@8.7.5`) :

Je ne jugerai pas personnellement `next-intlayer` par souci d'objectivité, puisqu'il s'agit de ma propre solution.

### Note personnelle

Cette note est personnelle et n'affecte pas les résultats du benchmark. Dans le monde de l'i18n, on voit souvent un consensus autour de `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`.

Dans les applications React, injecter une fonction en tant que `ReactNode` est, à mon avis, un anti-pattern. Cela ajoute également une complexité évitable et un surcoût d'exécution JavaScript (même s'il est à peine perceptible).
