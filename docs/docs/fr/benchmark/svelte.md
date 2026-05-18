---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: La meilleure solution i18n pour Svelte en 2026 - Rapport de Benchmark
description: Comparez les bibliothèques d'internationalisation (i18n) pour Svelte comme svelte-i18n, Paraglide et Intlayer. Rapport de performance détaillé sur la taille du bundle, les fuites et la réactivité.
keywords:
  - benchmark
  - i18n
  - intl
  - svelte
  - performance
  - intlayer
slugs:
  - doc
  - benchmark
  - svelte
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-svelte-template
history:
  - version: 8.7.12
    date: 2026-01-06
    changes: "Initialisation du benchmark"
---

# Bibliothèques i18n Svelte — Rapport de Benchmark 2026

Cette page est un rapport de benchmark pour les solutions i18n sur Svelte.

## Table des Matières

<Toc/>

## Benchmark Interactif

<I18nBenchmark framework="vite-svelte" vertical/>

## Référence des résultats :

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Voir les données complètes du benchmark](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md)

Voir le dépôt complet du benchmark [ici](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introduction

Les solutions d'internationalisation figurent parmi les dépendances les plus lourdes d'une application Svelte. Le risque principal est d'embarquer du contenu inutile : les traductions d'autres pages et d'autres locales dans le bundle d'une seule route.

À mesure que votre application grandit, ce problème peut rapidement faire exploser la quantité de JavaScript envoyée au client et ralentir la navigation.

En pratique, pour les implémentations les moins optimisées, une page internationalisée peut finir par être plusieurs fois plus lourde que la version sans i18n.

L'autre impact concerne l'expérience développeur (DX) : la façon dont vous déclarez le contenu, les types, l'organisation des namespaces, le chargement dynamique et la réactivité lors du changement de langue.

## TL;DR

- **Intlayer** : Le choix le plus performant (v8.7.12) avec l'empreinte la plus faible.
- **Paraglide** : Candidat sérieux pour le tree-shaking mais possède une expérience développeur plus complexe et un surcoût de réactivité.
- **svelte-i18n** : Complet et standard pour Svelte, mais transporte un poids de bundle beaucoup plus important (~7× Intlayer).

## Testez votre application

Pour repérer rapidement les problèmes de fuite i18n, j'ai mis en place un scanner gratuit disponible [ici](https://intlayer.org/i18n-seo-scanner).

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Le problème

Deux leviers sont essentiels pour limiter le coût d'une application multilingue :

- Découper le contenu par page / namespace afin de ne pas charger des dictionnaires entiers quand on n'en a pas besoin
- Charger la bonne locale dynamiquement, uniquement quand nécessaire

Comprendre les limitations techniques de ces approches :

**Chargement dynamique**

Sans chargement dynamique, la plupart des solutions gardent les messages en mémoire dès le premier rendu, ce qui ajoute un surcoût important pour les applications ayant beaucoup de routes et de langues.

Avec le chargement dynamique, vous acceptez un compromis : moins de JS initial, mais parfois une requête supplémentaire lors du changement de langue.

**Découpage du contenu (Splitting)**

Les syntaxes basées sur `t('a.b.c')` sont très pratiques mais encouragent souvent la conservation de gros objets JSON au runtime. Ce modèle rend le tree-shaking difficile à moins que la bibliothèque ne propose une réelle stratégie de découpage par page.

## Méthodologie

Pour ce benchmark, nous avons comparé les bibliothèques suivantes :

- `Base App` (Pas de bibliothèque i18n)
- `svelte-intlayer` (v8.7.12)
- `svelte-i18n` (v4.0.1)
- `@inlang/paraglide-js` (v2.17.0)

Le framework utilisé est `Svelte` avec une application multilingue de **10 pages** et **10 langues**.

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

## Étoiles GitHub

Les étoiles GitHub sont un indicateur fort de la popularité d'un projet, de la confiance de la communauté et de sa pertinence à long terme. Bien qu'elles ne soient pas une mesure directe de la qualité technique, elles reflètent le nombre de développeurs qui trouvent le projet utile, suivent ses progrès et sont susceptibles de l'adopter. Pour estimer la valeur d'un projet, les étoiles aident à comparer l'attraction entre les alternatives et fournissent des informations sur la croissance de l'écosystème.

[![Star History Chart](https://api.star-history.com/chart?repos=kaisermann%2Fsvelte-i18n%2Copral%2Finlang%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#kaisermann/svelte-i18n&opral/paraglide-js&aymericzip/intlayer)

## Résultats détaillés

### 1 — Solutions à éviter

> Aucune solution claire à éviter dans l'écosystème Svelte.

### 2 — Solutions acceptables

**(Paraglide)** (`@inlang/paraglide-js@2.17.0`) :

`Paraglide` propose une approche innovante et bien pensée. Dans le contexte d'une application Vite + Svelte, le tree-shaking dont leur entreprise fait la publicité fonctionne comme prévu, ce qui est excellent.
Mais dans le cas de React + TanStack Start, le tree-shaking n'a pas fonctionné comme prévu, de même pour Next.js. Cela dit, l'usage de Paraglide dans un projet Svelte et TanStack Start mériterait d'être vérifié de près.
Le workflow et la DX sont également plus complexes qu'avec d'autres options.
Personnellement, je n'aime pas devoir régénérer des fichiers JS avant chaque push, ce qui crée un risque constant de conflit de fusion via les PRs. L'outil semble également plus axé sur Vite que sur Next.js.
Enfin, par rapport à d'autres solutions, Paraglide n'utilise pas de store (ex: Svelte store) pour récupérer la locale actuelle afin de rendre le contenu. Pour chaque nœud analysé, il demandera la locale au localStorage / cookie etc. Cela conduit à l'exécution d'une logique inutile qui impacte la réactivité des composants.

> Note sur paraglide : cette solution injecte du code dans votre base de code pour les imports, par conséquent, la métrique 'lib size' dans le rapport de benchmark est presque de 0. La génération de code est une bonne chose, car la fonction utilisée n'inclura que la logique nécessaire (préfixe partout vs pas de préfixe, cookie vs stockage, etc.). En comparaison, Intlayer effectue ce filtrage via des injections de variables d'environnement pendant le build pour forcer le bundler à tree-shaker le contenu en fonction de la logique. Grâce à cela, paraglide et intlayer finissent par être des solutions 6 à 10 fois plus légères qu'i18next ou next-intl.

**(svelte-i18n)** (`svelte-i18n@3.4.0`) :

Cette solution répond à tous les besoins i18n dans un projet Svelte. Mais comme c'est le cas pour i18next ou d'autres solutions majeures, elle est un peu lourde (~15.9 Ko, soit environ 7× `svelte-intlayer`).

### 3 — Recommandations

**(Intlayer)** (`svelte-intlayer@8.7.12`) :

Je ne jugerai pas personnellement `svelte-intlayer` par souci d'objectivité, puisqu'il s'agit de ma propre solution.

### Note personnelle

Cette note est personnelle et n'affecte pas les résultats du benchmark. Pourtant, dans le monde de l'i18n, on voit souvent un consensus autour d'un pattern comme `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` pour le contenu traduit.

Dans les applications Svelte, injecter une fonction en tant que `Slot` est, à mon avis, un anti-pattern. Cela ajoute également une complexité évitable et un surcoût d'exécution JavaScript (même s'il est à peine perceptible).
