---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: La meilleure solution i18n pour Vue en 2026 - Rapport de Benchmark
description: Comparez les bibliothèques d'internationalisation (i18n) pour Vue comme vue-i18n, fluent-vue et Intlayer. Rapport de performance détaillé sur la taille du bundle, les fuites et la réactivité.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - performance
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.7.12
    date: 2026-01-06
    changes: "Initialisation du benchmark"
---

# Bibliothèques i18n Vue — Rapport de Benchmark 2026

Cette page est un rapport de benchmark pour les solutions i18n sur Vue.

## Table des Matières

<Toc/>

## Benchmark Interactif

<I18nBenchmark framework="vite-vue" vertical/>

## Référence des résultats :

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> [Voir les données complètes du benchmark](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

Voir le dépôt complet du benchmark [ici](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introduction

Les solutions d'internationalisation figurent parmi les dépendances les plus lourdes d'une application Vue. Le risque principal est d'embarquer du contenu inutile : les traductions d'autres pages et d'autres locales dans le bundle d'une seule route.

À mesure que votre application grandit, ce problème peut rapidement faire exploser la quantité de JavaScript envoyée au client et ralentir la navigation.

En pratique, pour les implémentations les moins optimisées, une page internationalisée peut finir par être plusieurs fois plus lourde que la version sans i18n.

L'autre impact concerne l'expérience développeur (DX) : la façon dont vous déclarez le contenu, les types, l'organisation des namespaces, le chargement dynamique et la réactivité lors du changement de langue.

## TL;DR

- **Intlayer** : La solution la plus légère (v8.7.12) avec découpage (scoping) et chargement dynamique natifs.
- **vue-i18n** : Le standard de l'industrie avec un riche écosystème, mais peut être nettement plus lourd et difficile à optimiser pour le code-splitting dans les grandes applications.
- **fluent-vue** : Organisation innovante des messages mais manque de sécurité de type et s'avère extrêmement lourd.

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

Les syntaxes basées sur `const { t } = useI18n()` + `t('a.b.c')` sont très pratiques mais encouragent souvent la conservation de gros objets JSON au runtime. Ce modèle rend le tree-shaking difficile à moins que la bibliothèque ne propose une réelle stratégie de découpage par page.

## Méthodologie

Pour ce benchmark, nous avons comparé les bibliothèques suivantes :

- `Base App` (Pas de bibliothèque i18n)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

Le framework utilisé est `Vue` avec une application multilingue de **10 pages** et **10 langues**.

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

### Ce que j'ai mesuré :

J'ai fait tourner la même application multilingue dans un vrai navigateur pour chaque stack, puis j'ai noté ce qui passait réellement sur le réseau et combien de temps cela prenait. Les tailles sont indiquées **après compression web normale**, car c'est plus proche de ce que les gens téléchargent réellement.

- **Taille de la bibliothèque d'internationalisation** : Après bundling, tree-shaking et minification, la taille de la bibliothèque i18n est la taille du code des providers + composables dans un composant vide. Cela n'inclut pas le chargement des fichiers de traduction. Cela montre à quel point la bibliothèque est "coûteuse" avant même que votre contenu n'entre en jeu.

- **JavaScript par page** : Pour chaque route du benchmark, quelle quantité de scripts le navigateur récupère pour cette visite, en moyenne sur les pages du test (et sur les locales). Les pages lourdes sont des pages lentes.

- **Fuite des autres locales (Leakage)** : C'est le contenu de la même page mais dans une autre langue qui serait chargé par erreur dans la page auditée. Ce contenu est inutile et doit être évité (ex: contenu de la page `/fr/about` dans le bundle de la page `/en/about`).

- **Fuite des autres routes** : Même idée pour les **autres écrans** de l'application : si leurs textes sont embarqués alors que vous n'avez ouvert qu'une seule page (ex: contenu de la page `/en/about` dans le bundle de la page `/en/contact`). Un score élevé indique un faible découpage ou des bundles trop larges.

- **Taille moyenne du bundle d'un composant** : Les éléments UI communs sont mesurés **un par un**, au lieu d'être cachés dans un seul chiffre global d'application. Cela montre si l'internationalisation gonfle discrètement les composants du quotidien. Par exemple, si votre composant se re-rend, il chargera toutes ces données depuis la mémoire. Attacher un JSON géant à n'importe quel composant revient à connecter un grand entrepôt de données inutilisées qui ralentira les performances de vos composants.

- **Réactivité du changement de langue** : Je change la langue via le contrôle de l'application et je mesure le temps nécessaire pour que la page ait clairement basculé, ce qu'un visiteur remarquerait.

- **Travail de rendu après un changement de langue** : Un indicateur plus précis : quel effort l'interface a fourni pour se redessiner dans la nouvelle langue une fois le changement lancé. Utile lorsque le temps "ressenti" et le coût du framework divergent.

- **Temps de chargement initial de la page** : De la navigation jusqu'au moment où le navigateur considère la page comme entièrement chargée pour les scénarios testés. Utile pour comparer les démarrages à froid.

- **Temps d'hydratation (Hydration)** : Temps que le client passe à transformer le HTML du serveur en interface interactive. Un tiret dans les tableaux signifie que l'implémentation n'a pas fourni de chiffre d'hydratation fiable dans ce test.

## Résultats en détail

### 1 — Solutions à éviter

> Aucune solution claire à éviter dans l'écosystème Vue.

### 2 — Solutions acceptables

**(vue-i18n)** (`vue-i18n@11.4.0`) :

- **vue-i18n** est sans conteste la bibliothèque i18n la plus utilisée pour Vue, elle possède énormément de fonctionnalités et un immense écosystème. Mais sous le capot, la solution est assez lourde. Même si vue-i18n intègre le lazy loading des messages, il lui manque une fonctionnalité de découpage (scoping). Dans le cas d'une application Vue SPA classique, cela ne pose pas de problème, mais pour une application Nuxt utilisant @nuxt/i18n, cela conduit à inclure les messages de toutes les pages dans une seule. Pour une grosse application Nuxt de plus de 10 pages, cela peut devenir vraiment problématique.

Le paquet est très lourd (~24.3 Ko, soit environ 9× `vue-intlayer`).

**(fluent-vue)** (`fluent-vue@0.5.0`) :

- **fluent-vue** propose une tentative d'innovation via le format .ftl. L'organisation des messages est excellente, plus facile pour débuter. Mais en pratique, le manque de sécurité de type augmente le risque d'erreur et peut vite devenir chronophage à déboguer. De plus, cette solution charge les messages via un plugin vite qui force le chargement de tout le contenu dans toutes les langues dans chaque page. Enfin, c'est une solution extrêmement lourde (~92.7 Ko, soit environ 34× `vue-intlayer`).

### 3 — Recommandations

**(Intlayer)** (`vue-intlayer@8.7.12`) :

Je ne jugerai pas personnellement `vue-intlayer` par souci d'objectivité, puisqu'il s'agit de ma propre solution.
