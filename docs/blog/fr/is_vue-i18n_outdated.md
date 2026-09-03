---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: vue-i18n est-il obsolète en 2026 ?
description: vue-i18n est la référence des applications Vue et Nuxt depuis dix ans. Pourtant, nos benchmarks révèlent qu'il s'agit du runtime i18n le plus lourd du web. Explications.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalisation
  - i18n
  - Vue
  - Nuxt
  - Taille de bundle
  - Blog
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# vue-i18n est-il obsolète en 2026 ?

Dans l'écosystème Vue, peu de projets sont aussi populaires que `vue-i18n`. Maintenu par Kazupon depuis Vue 2, il équipe `@nuxtjs/i18n` et sert d'outil par défaut pour la quasi-totalité des projets Vue multilingues.

Pourtant, nos benchmarks 2026 ont mis en lumière un résultat inattendu : **`vue-i18n` est le runtime d'internationalisation le plus volumineux parmi tous les frameworks frontend testés.**

Sur une application de base Vite + Vue très légère de 31.5 Ko, l'ajout de `vue-i18n` fait bondir le JavaScript moyen par page à **136.4 Ko**, multipliant la charge utile par plus de quatre.

Comment un framework réputé pour sa légèreté en est-il arrivé à un coût i18n aussi élevé ? Et son architecture classique d'exécution a-t-elle encore du sens aujourd'hui ?

<TOC/>

## Points clés

**Le runtime le plus lourd testé :**

À **24.3 Ko gzippés (83.2 Ko minifiés)** avant même l'ajout de contenu, `vue-i18n` est environ **9 fois plus lourd** que le runtime d'`intlayer` (2.7 Ko).

**Surpoids de 330% sur la charge utile :**

`vue-i18n` a fait passer une page Vue de 31.5 Ko à 136.4 Ko. Intlayer stabilise la page à 59.3 Ko, soit une **charge utile 56% plus compacte**.

**Un compilateur embarqué dans le navigateur :**

Par défaut, sans configuration spécifique d'alias au niveau du bundler, `vue-i18n` expédie un compilateur complet dans le navigateur pour analyser les chaînes à la volée.

**Rythme de maintenance :**

Sur l'année écoulée, `vue-i18n` a enregistré environ 259 commits, concentrés sur des correctifs de bugs et l'alignement avec les versions de Vue.

**Absence d'outillage moderne natif :**

Pas de support officiel pour serveurs de langage (LSP), serveurs MCP d'IA ou commandes de traduction automatique en CLI.

## Maintenance ou outillage moderne

| Répertoire            | Étoiles                                                                                                                                                | Commits totaux                                                                                                                                                      | Commits / an                                                                                                                                                       | Dernier commit                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Activité sur les douze derniers mois :

- `intlify/vue-i18n` : **259 commits** (maintenance continue pour Vue 3 et Nuxt).
- `aymericzip/intlayer` : **4 343 commits** (optimisations de compilation, intégrations LSP et outillage pour agents IA).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

Une bibliothèque éprouvée a l'avantage de la maturité. Cependant, les stacks modernes s'appuient sur la transformation AST au build, l'élimination du code mort et la localisation assistée par IA. Un système reposant principalement sur l'exécution dynamique peine à intégrer ces gains.

## Mesure des performances avec Vite + Vue

Benchmark réalisé sur une application de 10 pages et 10 langues avec Vite et Vue 3 :

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tests réalisés dans de vrais navigateurs avec compression gzip. Données exhaustives dans la [documentation du benchmark Vue](https://intlayer.org/fr/doc/benchmark/vue).

### Poids initial des bibliothèques

Surcharge initiale avant l'ajout des textes de traduction :

| Bibliothèque      | Gzippé     | Minifié    |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 Ko    | 83.2 Ko    |
| `intlayer@8.7.12` | **2.7 Ko** | **7.6 Ko** |

Le moteur de `vue-i18n` pèse **24.3 Ko gzippés**, soit presque le poids du cœur de Vue lui-même. Intlayer n'ajoute que **2.7 Ko**.

### Poids des pages et dispersion des contenus

| Configuration    | JS moyen / page (gz) | Fuite de langues | Fuite autres pages | Composant moyen (gz) |
| ---------------- | -------------------- | ---------------- | ------------------ | -------------------- |
| Base (sans i18n) | 31.5 Ko              | 0.0%             | 90.0%              | 0.9 Ko               |
| `vue-i18n`       | **136.4 Ko**         | 50.2%            | 90.0%              | 196.0 Ko             |
| Intlayer         | **59.3 Ko**          | 51.1%            | **0.0%**           | **6.5 Ko**           |

### Principaux constats

**Gonflement proportionnel marquant :**

Comme la base Vue est très épurée (~31 Ko), l'impact de `vue-i18n` multiplie par plus de quatre la charge utile globale.

**Fuite vers d'autres pages :**

Par défaut, **90% des textes traduits** envoyés à une route appartiennent à d'autres pages. Intlayer élimine complètement cette fuite pour atteindre **0.0%**.

**Poids des composants isolés :**

Les composants compilés avec des portées locales ont atteint une moyenne de 196 Ko sous `vue-i18n` en raison de catalogues dupliqués, contre seulement **6.5 Ko** avec Intlayer.

## Pourquoi vue-i18n est-il lourd ?

### Un compilateur AST embarqué dans le navigateur

`vue-i18n` intègre son propre compilateur de messages. Les règles de pluriel et les interpolations sont analysées en arbres syntaxiques abstraits directement lors de l'exécution.

Pour contourner ce surcoût, il faut configurer des alias bundler vers `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` et précompiler les catalogues via `@intlify/unplugin-vue-i18n`. Beaucoup de projets omettent cette étape et livrent sans le savoir un compilateur complet à leurs utilisateurs.

### Un périmètre monolithique

`vue-i18n` regroupe des moteurs de dates, de nombres, des ponts pour l'Options API legacy (`$t`, `v-t`) et des proxys réactifs. Même pour afficher de simples textes dans `<script setup>`, l'ensemble de ces briques est chargé.

### Les clés dynamiques bloquent le tree-shaking

Puisque `"home.hero.title"` est une chaîne résolue au runtime, les bundlers ne peuvent pas vérifier quelles traductions sont réellement utilisées. Les textes inutilisés ne peuvent donc pas être supprimés.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

Le [compilateur Intlayer](https://intlayer.org/fr/doc/compiler) trace précisément les propriétés invoquées et élimine le contenu non utilisé avant l'assemblage des bundles clients. Voir [l'optimisation de bundle](https://intlayer.org/fr/doc/concept/bundle-optimization) pour approfondir.

## Expérience développeur

### Catalogues distants ou co-localisation

Avec `vue-i18n`, les traductions sont regroupées dans un répertoire `locales/` distant. Intlayer co-localise les fichiers de contenu directement à côté des composants :

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/fr.json"
{
  "hero": {
    "title": "Livrez dans toutes les langues"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      fr: "Livrez dans toutes les langues",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

Lorsque `Hero.vue` est supprimé ou renommé, son fichier de contenu est déplacé ou supprimé simultanément.

### Autocomplétion ou validation stricte de l'exhaustivité

`DefineLocaleMessage` fournit l'autocomplétion IDE sur la base du schéma canonique. Il ne garantit toutefois pas que toutes les langues soient complètes. Oublier une clé dans `fr.json` ne déclenche aucune erreur TypeScript au build.

Avec Intlayer, les dictionnaires sont validés strictement. L'activation du [`strictMode`](https://intlayer.org/fr/doc/concept/configuration) bloque la compilation dès qu'une traduction fait défaut.

### Outillage pour les IDEs et l'IA

| Fonctionnalité               | `vue-i18n`         | Intlayer                                                                    |
| ---------------------------- | ------------------ | --------------------------------------------------------------------------- |
| **Extension VS Code**        | Tierce (i18n Ally) | ✅ [Extension officielle](https://intlayer.org/fr/doc/vs-code-extension)    |
| **Serveur de langage (LSP)** | ❌ Aucun           | ✅ [LSP intégré](https://intlayer.org/fr/doc/lsp)                           |
| **Serveur MCP pour l'IA**    | ❌ Aucun           | ✅ [Serveur MCP inclus](https://intlayer.org/fr/doc/mcp-server)             |
| **Compétences agents**       | ❌ Aucune          | ✅ [Compétences autonomes](https://intlayer.org/fr/doc/agent_skills)        |
| **CMS visuel en contexte**   | ❌ Aucun           | ✅ [CMS gratuit et open source](https://intlayer.org/fr/doc/concept/editor) |

## Pipelines de traduction

`vue-i18n` n'intègre pas de commande de traduction native. Les équipes doivent exporter leurs fichiers vers des solutions tierces comme Crowdin ou Phrase.

Intlayer intègre ces fonctionnalités directement :

**Traduction automatique par IA locale (`intlayer fill`) :**

Complète automatiquement les traductions absentes grâce à vos clés API OpenAI, Anthropic, Mistral ou Gemini.

**CMS visuel auto-hébergeable :**

Déployez le [CMS Intlayer](https://intlayer.org/fr/doc/concept/cms) pour permettre aux équipes éditoriales de modifier le contenu avec validation directe dans Git.

**Licence libre et ouverte :**

L'ensemble de la suite est sous licence Apache 2.0.

## Dans quels cas vue-i18n reste-t-il pertinent ?

<AccordionGroup>
<Accordion header="Projets Nuxt 2 ou Nuxt 3 existants">

Si votre routage est intimement lié à `@nuxtjs/i18n`, une refonte n'est pas toujours prioritaire.

</Accordion>
<Accordion header="Besoins pointus en ICU">

Si votre produit utilise des formats de dates avancés, des messages liés ou des règles de pluriels très particulières.

</Accordion>
<Accordion header="Projets personnels modestes">

Si la taille finale du bundle n'est pas un facteur déterminant pour vous.

</Accordion>
</AccordionGroup>

## Comment améliorer ma configuration vue-i18n existante ?

Intlayer propose des packages de compatibilité prêts à l'emploi qui reprennent à l'identique les signatures de fonctions de `vue-i18n` et `@nuxtjs/i18n` (`useI18n`, `$t`, `<i18n-t>`). Vous n'avez pas besoin de réécrire vos templates ou vos composables pour profiter d'une architecture légère optimisée par la compilation.

L'installation s'effectue en une seule commande :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

Cette CLI interactive :

1. Installe le package de compatibilité `@intlayer/vue-i18n` ou `@intlayer/nuxt-i18n`.
2. Configure les alias du bundler (Vite ou Nuxt) afin que vos imports et balises de template habituels soient redirigés vers Intlayer, vous permettant de retirer `vue-i18n` de votre `package.json`.
3. Active immédiatement le support du serveur de langage (LSP), élimine le parseur AST de 24 Ko de votre bundle client et débloque les flux de traduction IA locale sans refactorisation complexe.

Pour des instructions détaillées étape par étape, consultez nos guides dédiés :

- **Compatibilité directe :** Conservez vos templates actuels avec la [couche de compatibilité `vue-i18n`](https://intlayer.org/fr/doc/compatibility/vue-i18n) ou [`@nuxtjs/i18n`](https://intlayer.org/fr/doc/compatibility/nuxtjs-i18n).
- **Guides de migration automatisée :** Convertissez vos fichiers JSON vers des dictionnaires typés grâce à nos guides : [depuis vue-i18n](https://intlayer.org/fr/doc/migration/vue-i18n) ou [depuis @nuxtjs/i18n](https://intlayer.org/fr/doc/migration/nuxtjs-i18n).
- **Configuration hybride :** Conservez `vue-i18n` à l'exécution tout en [utilisant Intlayer avec vue-i18n](https://intlayer.org/fr/blog/intlayer-with-vue-i18n) pour bénéficier du typage strict et de la traduction locale par IA.

Évaluez le volume de transfert et les fuites de votre application avec le [scanner SEO i18n gratuit](https://intlayer.org/i18n-seo-scanner) :

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Lectures complémentaires

- [Benchmark i18n Vue & Vite : analyse complète des performances](https://intlayer.org/fr/doc/benchmark/vue)
- [vue-i18n vs Intlayer : comparatif point par point](https://intlayer.org/fr/blog/vue-i18n-vs-intlayer)
- [next-intl est-il obsolète en 2026 ?](https://intlayer.org/fr/blog/is-next-intl-outdated)
- [Internationalisation par compilation vs déclarative](https://intlayer.org/fr/blog/compiler-vs-declarative-i18n)
