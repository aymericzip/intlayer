---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: La meilleure solution i18n pour TanStack Start en 2026 - Rapport de Benchmark
description: Comparez les bibliothèques d'internationalisation pour TanStack Start comme react-i18next, use-intl et Intlayer. Rapport de performance détaillé sur la taille du bundle, les fuites et la réactivité.
keywords:
  - benchmark
  - i18n
  - intl
  - tanstack
  - performance
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Initialisation du benchmark"
---

# Bibliothèques i18n TanStack Start — Rapport de Benchmark 2026

Cette page est un rapport de benchmark pour les solutions i18n sur TanStack Start.

## Table des Matières

<Toc/>

## Benchmark Interactif

<I18nBenchmark framework="tanstack" vertical/>

## Référence des résultats :

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md

Voir le dépôt complet du benchmark [ici](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introduction

Les solutions d'internationalisation figurent parmi les dépendances les plus lourdes d'une application React. Sur TanStack Start, le risque principal est d'embarquer du contenu inutile : les traductions d'autres pages et d'autres locales dans le bundle d'une seule route.

À mesure que votre application grandit, ce problème peut rapidement faire exploser la quantité de JavaScript envoyée au client et ralentir la navigation.

En pratique, pour les implémentations les moins optimisées, une page internationalisée peut finir par être plusieurs fois plus lourde que la version sans i18n.

L'autre impact concerne l'expérience développeur (DX) : la façon dont vous déclarez le contenu, les types, l'organisation des namespaces, le chargement dynamique et la réactivité lors du changement de langue.

## Testez votre application

Pour repérer rapidement les problèmes de fuite i18n, j'ai mis en place un scanner gratuit disponible [ici](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Le problème

Deux leviers sont essentiels pour limiter le coût d'une application multilingue :

- Découper le contenu par page / namespace afin de ne pas charger des dictionnaires entiers quand on n'en a pas besoin
- Charger la bonne locale dynamiquement, uniquement quand nécessaire

Comprendre les limitations techniques de ces approches :

**Chargement dynamique**

Sans chargement dynamique, la plupart des solutions gardent les messages en mémoire dès le premier rendu, ce qui ajoute un surcoût important pour les applications ayant beaucoup de routes et de langues.

Avec le chargement dynamique, vous acceptez un compromis : moins de JS initial, mais parfois une requête supplémentaire lors du changement de langue.

**Découpage du contenu (Splitting)**

Les syntaxes basées sur `const t = useTranslation()` + `t('a.b.c')` sont très pratiques mais encouragent souvent la conservation de gros objets JSON au runtime. Ce modèle rend le tree-shaking difficile à moins que la bibliothèque ne propose une réelle stratégie de découpage par page.

## Méthodologie

Pour ce benchmark, nous avons comparé les bibliothèques suivantes :

- `Base App` (Pas de bibliothèque i18n)
- `react-intlayer` (v8.7.5-canary.0)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

Le framework utilisé est `TanStack Start` avec une application multilingue de **10 pages** et **10 langues**.

Nous avons comparé **quatre stratégies de chargement** :

| Stratégie                | Sans namespaces (global)                          | Avec namespaces (scoped)                                             |
| :----------------------- | :------------------------------------------------ | :------------------------------------------------------------------- |
| **Chargement statique**  | **Static** : Tout en mémoire au démarrage.        | **Scoped static** : Divisé par namespace ; tout chargé au démarrage. |
| **Chargement dynamique** | **Dynamic** : Chargement à la demande par locale. | **Scoped dynamic** : Chargement granulaire par namespace et locale.  |

## Résumé des stratégies

- **Static** : Simple ; pas de latence réseau après le chargement initial. Inconvénient : taille de bundle importante.
- **Dynamic** : Réduit le poids initial (lazy-loading). Idéal lorsque vous avez de nombreuses locales.
- **Scoped static** : Organise bien le code (séparation logique) sans requêtes réseau supplémentaires complexes.
- **Scoped dynamic** : Meilleure approche pour le _code splitting_ et la performance. Minimise la mémoire en ne chargeant que ce dont la vue actuelle et la locale active ont besoin.

## Résultats détaillés

### 1 — Solutions à éviter

Certaines solutions, telles que `gt-react` ou `lingo.dev`, sont clairement à fuir. Elles combinent un verrouillage propriétaire avec une pollution de votre base de code. Pire : malgré de nombreuses heures passées à essayer de les implémenter, je n'ai jamais réussi à les faire fonctionner correctement sur TanStack Start (comme pour Next.js avec `gt-next`).

Problèmes rencontrés :

**(General Translation)** (`gt-react@latest`) :

- Pour une application d'environ 110 Ko, `gt-react` peut ajouter plus de 440 Ko supplémentaires (ordre de grandeur observé sur l'implémentation Next.js du même benchmark).
- `Quota Exceeded, please upgrade your plan` dès le tout premier build avec General Translation.
- Les traductions ne sont pas rendues ; j'obtiens l'erreur `Error: <T> used on the client-side outside of <GTProvider>`, ce qui semble être un bug de la bibliothèque.
- Lors de l'implémentation de **gt-tanstack-start-react**, je suis également tombé sur un [problème](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) avec la bibliothèque : `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, ce qui cassait l'application. Après avoir signalé ce problème, le mainteneur l'a corrigé sous 24 heures.
- Ces bibliothèques utilisent un anti-pattern via la fonction `initializeGT()`, empêchant le bundle d'être tree-shaké proprement.

**(Lingo.dev)** (`lingo.dev@0.133.9`) :

- Quota AI dépassé (ou dépendance serveur bloquante), rendant le build / la production risqués sans payer.
- Le compilateur ratait presque 40 % du contenu traduit. J'ai dû réécrire tous les `.map` en blocs de composants plats pour que cela fonctionne.
- Leur CLI est buggée et réinitialisait le fichier de config sans raison.
- Au build, il effaçait totalement les JSONs générés quand il y avait du nouveau contenu. Résultat : vous pouviez vous retrouver avec seulement quelques clés effaçant des centaines de clés existantes.
- J'ai rencontré des problèmes de réactivité avec la bibliothèque sur TanStack Start : au changement de langue, je devais forcer le re-rendu du provider pour que cela fonctionne.

### 2 — Solutions expérimentales

**(Wuchale)** (`wuchale@0.22.11`) :

L'idée derrière `Wuchale` est intéressante mais ce n'est pas encore une solution viable. J'ai rencontré des problèmes de réactivité avec la bibliothèque et j'ai dû forcer le re-rendu du provider pour faire fonctionner l'application sur TanStack Start. La documentation est également assez floue, ce qui rend l'adoption difficile.

### 3 — Solutions acceptables

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`) :

`Paraglide` propose une approche innovante et bien pensée. Pourtant, dans ce benchmark, le tree-shaking dont leur entreprise fait la publicité n'a pas fonctionné pour mon implémentation Next.js ou pour TanStack Start. Le workflow et la DX sont également plus complexes d'autres options. Personnellement, je ne suis pas fan de devoir régénérer des fichiers JS avant chaque push, ce qui crée un risque constant de conflit de fusion pour les développeurs via les PRs.

**(Tolgee)** (`tolgee@7.0.0`) :

`Tolgee` traite bon nombre des problèmes mentionnés plus haut. Je l'ai trouvé plus difficile à prendre en main que d'autres outils aux approches similaires. Il n'offre pas de sécurité de type, ce qui rend également beaucoup plus difficile la détection des clés manquantes à la compilation. J'ai dû wrapper les APIs de Tolgee avec les miennes pour ajouter la détection des clés manquantes.

Sur TanStack Start, j'ai également eu des problèmes de réactivité : au changement de locale, je devais forcer le provider à se re-rendre et souscrire aux événements de changement de locale pour que le chargement dans une autre langue se comporte correctement.

**(use-intl)** (`use-intl@4.9.1`) :

`use-intl` est la pièce "intl" la plus à la mode dans l'écosystème React (même famille que `next-intl`) et est souvent poussée par les agents IA — mais à mon avis à tort dans un contexte privilégiant la performance. La mise en route est assez simple. En pratique, le processus pour optimiser et limiter les fuites est assez complexe. De même, combiner chargement dynamique + namespacing + types TypeScript ralentit beaucoup le développement.

Sur TanStack Start, vous évitez les pièges spécifiques à Next.js (`setRequestLocale`, rendu statique), mais le problème de fond est le même : sans une discipline stricte, le bundle transporte rapidement trop de messages et la maintenance des namespaces par route devient pénible.

**(react-i18next)** (`react-i18next@17.0.2`) :

`react-i18next` est probablement l'option la plus populaire car elle fut l'une des premières à servir les besoins i18n des applications JS. Elle dispose également d'un large éventail de plugins communautaires pour des problèmes spécifiques.

Pourtant, elle partage les mêmes inconvénients majeurs que les stacks basées sur `t('a.b.c')` : les optimisations sont possibles mais très gourmandes en temps, et les gros projets risquent de mauvaises pratiques (namespaces + chargement dynamique + types).

Les formats de messages divergent également : `use-intl` utilise ICU MessageFormat, tandis qu'i18next utilise son propre format — ce qui complique l'outillage ou les migrations si vous les mélangez.

**(Lingui)** (`@lingui/core@5.3.0`) :

`Lingui` est souvent loué. Personnellement, j'ai trouvé le workflow autour de `lingui extract` / `lingui compile` plus complexe que d'autres approches, sans avantage clair dans ce benchmark TanStack Start. J'ai également remarqué des syntaxes inconsistantes qui perturbent les IAs (ex: `t()`, `t''`, `i18n.t()`, `<Trans>`).

**(react-intl)** (`react-intl@10.1.1`) :

`react-intl` est une implémentation performante de l'équipe Format.js. La DX reste verbeuse : `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` ajoute de la complexité, du travail JavaScript supplémentaire et lie l'instance globale i18n à de nombreux nœuds dans l'arbre React.

### 4 — Recommandations

Ce benchmark TanStack Start n'a pas d'équivalent direct à `next-translate` (plugin Next.js + `getStaticProps`). Pour les équipes qui veulent vraiment une API `t()` avec un écosystème mature, `react-i18next` et `use-intl` restent des choix "raisonnables" — mais attendez-vous à investir beaucoup de temps dans l'optimisation pour éviter les fuites.

**(Intlayer)** (`react-intlayer@8.7.5-canary.0`) :

Je ne jugerai pas personnellement `react-intlayer` par souci d'objectivité, puisqu'il s'agit de ma propre solution.

### Note personnelle

Cette note est personnelle et n'affecte pas les résultats du benchmark. Pourtant, dans le monde de l'i18n, on voit souvent un consensus autour d'un pattern comme `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` pour le contenu traduit.

Dans les applications React, injecter une fonction en tant que `ReactNode` est, à mon avis, un anti-pattern. Cela ajoute également une complexité évitable et un surcoût d'exécution JavaScript (même s'il est à peine perceptible).
