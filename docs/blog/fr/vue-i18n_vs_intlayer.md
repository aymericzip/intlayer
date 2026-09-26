---
createdAt: 2024-08-11
updatedAt: 2026-09-22
priority: 8
title: vue-i18n vs Intlayer
description: Comparaison de vue-i18n avec Intlayer pour l'internationalisation (i18n) dans les applications Vue/Nuxt
keywords:
  - vue-i18n
  - Intlayer
  - Internationalisation
  - i18n
  - Blog
  - Vue
  - Nuxt
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n VS Intlayer | Internationalisation Vue (i18n)

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Ce guide compare deux options i18n populaires pour **Vue 3** (et **Nuxt**) : **vue-i18n** et **Intlayer**.
Nous nous concentrons sur les outils modernes de Vue (Vite, Composition API) et évaluons :

1. **Architecture & organisation du contenu**
2. **TypeScript & sécurité**
3. **Gestion des traductions manquantes**
4. **Stratégie de routage & URL**
5. **Performance & comportement de chargement**
6. **Expérience développeur (DX), outils & maintenance**
7. **SEO & évolutivité pour les grands projets**

<TOC/>

> **en résumé** : Les deux peuvent localiser des applications Vue. Si vous souhaitez un **contenu scoped par composant**, des **types TypeScript stricts**, des **vérifications des clés manquantes à la compilation**, des **dictionnaires optimisés par tree-shaking**, ainsi que des **helpers intégrés pour le routeur/SEO** et en plus un **éditeur visuel & des traductions assistées par IA**, **Intlayer** est le choix le plus complet et moderne.

## Positionnement général

- **vue-i18n** - La bibliothèque i18n de référence pour Vue. Formatage flexible des messages (style ICU), blocs SFC `<i18n>` pour les messages locaux, et un large écosystème. La sécurité et la maintenance à grande échelle dépendent principalement de vous.
- **Intlayer** - Modèle de contenu centré sur les composants pour Vue/Vite/Nuxt avec **typage TS strict**, **vérifications à la compilation**, **tree-shaking**, **helpers pour le routeur & SEO**, **éditeur visuel/CMS** optionnel, et **traductions assistées par IA**.

## Ce que cela coûte au moment de la compilation

Avant les tableaux de fonctionnalités, la partie mesurée. [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construit la même application Vite + Vue 3 (10 pages, 10 locales) avec chaque bibliothèque et enregistre ce que le navigateur télécharge :

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

Le runtime de `vue-i18n` pèse à lui seul **6x** celui d'Intlayer, chaque page transporte **90% de chaînes de pages étrangères**, et un composant compilé isolément pèse **196 KB** car `useI18n()` le lie à l'arborescence globale des messages. L'exécution complète, avec les temps de réactivité et de chargement de page, se trouve dans le [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer_benchmark.md).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tableau complet dans le [rapport de benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/vue.md).

## Comparaison des fonctionnalités côte à côte (axée sur Vue)

| Fonctionnalité                                          | **Intlayer**                                                                                    | **vue-i18n**                                                                                           |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Traductions proches des composants**                  | ✅ Oui, contenu collé par composant (ex. `MyComp.content.ts`)                                   | ✅ Oui, via les blocs SFC `<i18n>` (optionnel)                                                         |
| **Intégration TypeScript**                              | ✅ Avancée, types **stricts** auto-générés & autocomplétion des clés                            | ✅ Bon typage ; **la sécurité stricte des clés nécessite une configuration/discipline supplémentaire** |
| **Détection des traductions manquantes**                | ✅ Avertissements/erreurs **à la compilation** et remontée dans TS                              | ⚠️ Repli/exceptions à l'exécution                                                                      |
| **Contenu enrichi (composants/Markdown)**               | ✅ Support direct pour les nœuds enrichis et les fichiers de contenu Markdown                   | ⚠️ Limité (composants via `<i18n-t>`, Markdown via des plugins externes)                               |
| **Traduction assistée par IA**                          | ✅ Flux de travail intégrés utilisant vos propres clés de fournisseur IA                        | ❌ Non intégré                                                                                         |
| **Éditeur visuel / CMS**                                | ✅ Éditeur visuel gratuit & CMS optionnel                                                       | ❌ Non intégré (utilisez des plateformes externes)                                                     |
| **Routage localisé**                                    | ✅ Aides pour Vue Router/Nuxt afin de générer des chemins localisés, des URLs et des `hreflang` | ⚠️ Pas natif (utiliser Nuxt i18n ou une configuration personnalisée de Vue Router)                     |
| **Génération dynamique de routes**                      | ✅ Oui                                                                                          | ❌ Non fourni (fourni par Nuxt i18n)                                                                   |
| **Pluriels et formatage**                               | ✅ Modèles d'énumération ; formatteurs basés sur Intl                                           | ✅ Messages au format ICU ; formatteurs Intl                                                           |
| **Formats de contenu**                                  | ✅ `.ts`, `.js`, `.json`, `.md`, `.txt` (YAML en cours de développement)                        | ✅ `.json`, `.js` (plus blocs SFC `<i18n>`)                                                            |
| **Support ICU**                                         | ⚠️ En cours de développement                                                                    | ✅ Oui                                                                                                 |
| **Aides SEO (sitemap, robots, métadonnées)**            | ✅ Aides intégrées (indépendantes du framework)                                                 | ❌ Pas natif (Nuxt i18n/communauté)                                                                    |
| **SSR/SSG**                                             | ✅ Fonctionne avec Vue SSR et Nuxt ; ne bloque pas le rendu statique                            | ✅ Fonctionne avec Vue SSR/Nuxt                                                                        |
| **Tree-shaking (livrer uniquement le contenu utilisé)** | ✅ Par composant au moment de la compilation                                                    | ⚠️ Partiel ; nécessite un découpage manuel du code/messages asynchrones                                |
| **Chargement paresseux**                                | ✅ Par locale / par dictionnaire                                                                | ✅ Messages de locale asynchrones supportés                                                            |
| **Purge du contenu inutilisé**                          | ✅ Oui (au moment de la compilation)                                                            | ❌ Non intégré                                                                                         |
| **Maintenabilité des grands projets**                   | ✅ Encourage une structure modulaire, adaptée aux design systems                                | ✅ Possible, mais nécessite une discipline stricte des fichiers/namespaces                             |
| **Écosystème / communauté**                             | ⚠️ Plus petite mais en forte croissance                                                         | ✅ Large et mature dans l'écosystème Vue                                                               |

## Comparaison approfondie

<AccordionGroup>
<Accordion header="1) Architecture et évolutivité">

- **vue-i18n** : Les configurations courantes utilisent des **catalogues centralisés** par locale (optionnellement divisés en fichiers/namespaces). Les blocs SFC `<i18n>` permettent des messages locaux, mais les équipes reviennent souvent à des catalogues partagés à mesure que les projets grandissent. Voir [i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md).
- **Intlayer** : Favorise des **dictionnaires par composant** stockés à côté du composant qu'ils servent. Cela réduit les conflits entre équipes, maintient le contenu facilement accessible et limite naturellement la dérive/les clés inutilisées.

**Pourquoi c'est important :** Dans les grandes applications Vue ou les design systems, le **contenu modulaire** évolue mieux que les catalogues monolithiques.

</Accordion>
<Accordion header="2) TypeScript et sécurité">

- **vue-i18n** : Bon support TS ; la **typage strict des clés** nécessite généralement des schémas/génériques personnalisés et des conventions rigoureuses.
- **Intlayer** : **Génère des types stricts** à partir de votre contenu, offrant **l’autocomplétion dans l’IDE** et des **erreurs à la compilation** pour les fautes de frappe ou les clés manquantes.

**Pourquoi c’est important :** Le typage fort détecte les problèmes **avant** l’exécution.

</Accordion>
<Accordion header="3) Gestion des traductions manquantes">

- **vue-i18n** : Avertissements/repli **à l’exécution** (par exemple, locale ou clé de repli). Voir [détection des traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md).
- **Intlayer** : Détection **à la compilation** avec avertissements/erreurs sur les locales et les clés.

**Pourquoi c’est important :** L’application à la compilation garantit une interface utilisateur propre et cohérente en production.

</Accordion>
<Accordion header="4) Stratégie de routage et d'URL (Vue Router/Nuxt)">

- **Les deux** peuvent fonctionner avec des routes localisées. Voir le [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md).
- **Intlayer** fournit des helpers pour **générer des chemins localisés**, **gérer les préfixes de locale**, et émettre des **`<link rel="alternate" hreflang>`** pour le SEO. Avec Nuxt, il complète le routage du framework.

**Pourquoi c’est important :** Moins de couches personnalisées et un **SEO plus propre** à travers les locales.

</Accordion>
<Accordion header="5) Performance et comportement de chargement">

- **vue-i18n** : Supporte les messages de locale asynchrones ; éviter le sur-emballage dépend de vous (divisez les catalogues avec soin). Le benchmark ci-dessus illustre ces chiffres : 134.9 KB contre 57.1 KB par page.
- **Intlayer** : **Élimine le code mort** à la compilation et **charge paresseusement par dictionnaire/locale**. Le contenu inutilisé n’est pas embarqué.

**Pourquoi c’est important :** Des bundles plus petits et un démarrage plus rapide pour les applications Vue multi-locales.

</Accordion>
<Accordion header="6) Expérience développeur et outillage">

- **vue-i18n** : Documentation et communauté matures ; vous vous appuierez généralement sur des **plateformes de localisation externes** pour les flux éditoriaux.
- **Intlayer** : Propose un **éditeur visuel gratuit**, un **CMS** optionnel (compatible Git ou externalisé), une **extension VSCode**, des utilitaires **CLI/CI**, et des **traductions assistées par IA** utilisant vos propres clés de fournisseur., un **serveur MCP**

**Pourquoi c’est important :** Réduction des coûts opérationnels et boucle dev–contenu plus courte.

</Accordion>
<Accordion header="7) SEO, SSR et SSG">

- **Les deux** fonctionnent avec Vue SSR et Nuxt. Voir [internationalisation et SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md).
- **Intlayer** : Ajoute des **aides SEO** (sitemaps/métadonnées/`hreflang`) indépendantes du framework et compatibles avec les builds Vue/Nuxt.

**Pourquoi c’est important :** SEO international sans câblage personnalisé.

</Accordion>
</AccordionGroup>

## Pourquoi Intlayer ? (Problème & approche)

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

La plupart des stacks i18n (y compris **vue-i18n**) partent de **catalogues centralisés** :

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="Un fichier par locale" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="Un dossier par locale" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

Ce dossier ne cesse de croître, un namespace par fonctionnalité, dans chaque locale :

```txt
locales
├── EN
│   ├── blog.json
│   ├── about.json
│   ├── auth.json
│   ├── blog.json
│   ├── cart.json
│   ├── categories.json
│   ├── contact.json
│   ├── dashboard.json
│   ├── errors.json
│   ├── faq.json
│   ├── footer.json
│   ├── form.json
│   ├── home.json
│   ├── language.json
│   ├── navbar.json
│   ├── ... 65 files
│   └── validation.json
└── ES
```

Cela ralentit souvent le développement à mesure que les applications grandissent :

1. **Pour un nouveau composant**, vous créez/modifiez des catalogues distants, configurez les espaces de noms, et traduisez (souvent via un copier/coller manuel depuis des outils d’IA).
2. **Lors de modifications de composants**, vous recherchez les clés partagées, traduisez, maintenez les locales synchronisées, supprimez les clés obsolètes, et alignez les structures JSON.

**Intlayer** scope le contenu **par composant** et le garde **à côté du code**, comme nous le faisons déjà avec le CSS, les stories, les tests et la documentation :

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

Chaque fichier de locale doit être modifié à la main, et la clé est une simple chaîne de caractères : une faute de frappe s'affiche sous la forme `componentExample.greting` en production.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

Toutes les locales se trouvent dans un seul fichier typé à côté du composant.

</Tab>
</Tabs>

Cette approche :

- **Accélère le développement** (déclarez une fois ; autocomplétion IDE/IA).
- **Nettoie la base de code** (1 composant = 1 dictionnaire).
- **Facilite la duplication/migration** (copiez un composant et son contenu ensemble).
- **Évite les clés mortes** (les composants inutilisés n’importent pas de contenu).
- **Optimise le chargement** (les composants chargés à la demande apportent leur contenu avec eux).

## Fonctionnalités supplémentaires d’Intlayer (pertinentes pour Vue)

- **Support multi-framework** : Fonctionne avec Vue, Nuxt, Vite, React, Express, et plus encore.
- **Gestion de contenu pilotée par JavaScript** : Déclarez dans le code avec une flexibilité totale.
- **Fichier de déclaration par locale** : Initialisez toutes les locales et laissez les outils générer le reste.
- **Environnement typé sécurisé** : Configuration TS robuste avec autocomplétion.
- **Récupération de contenu simplifiée** : Un seul hook/composable pour récupérer tout le contenu d’un dictionnaire.
- **Codebase organisée** : 1 composant = 1 dictionnaire dans le même dossier.
- **Routage amélioré** : Helpers pour les chemins localisés et métadonnées de **Vue Router/Nuxt**.
- **Support Markdown** : Importez du Markdown distant/local par locale ; exposez le frontmatter au code.
- **Éditeur visuel gratuit & CMS optionnel** : Création de contenu sans plateforme de localisation payante ; synchronisation compatible Git.
- **Contenu tree-shakable** : Ne livre que ce qui est utilisé ; supporte le chargement paresseux.
- **Compatible rendu statique** : Ne bloque pas le SSG.
- **Traductions assistées par IA** : Traduisez en 231 langues en utilisant votre propre fournisseur IA/clé API.
- **Serveur MCP & extension VSCode** : Automatisez les workflows i18n et la rédaction directement dans votre IDE.
- **Interopérabilité** : Ponts avec **vue-i18n**, **react-i18next** et **react-intl** selon les besoins.

## Quand choisir quoi ?

<AccordionGroup>
<Accordion header="Choisir vue-i18n">

Vous souhaitez **l'approche standard de Vue**, vous êtes à l'aise pour gérer vous-même les catalogues et les namespaces, et votre application est de **taille petite à moyenne** (ou vous vous appuyez déjà sur Nuxt i18n). Les blocs SFC `<i18n>` et le chargement `setLocaleMessage()` au runtime sont des fonctionnalités qu'Intlayer ne reproduit délibérément pas.

</Accordion>
<Accordion header="Choisir Intlayer">

Vous privilégiez le **contenu par composant**, un **TypeScript strict**, des **garanties à la compilation**, le **tree-shaking** et des outils intégrés de routage, SEO et d'édition, en particulier pour les **grandes bases de code modulaires Vue/Nuxt** et les design systems. Commencez avec [Intlayer avec Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md) ou [avec Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nuxt.md).

</Accordion>
<Accordion header="Choisir @intlayer/vue-i18n">

Vous utilisez `vue-i18n` aujourd'hui et souhaitez bénéficier des gains de bundle sans modifier de fichier `.vue`. L'[adaptateur de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/vue-i18n.md) conserve `createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t` et `v-t`, et les sert à partir de dictionnaires compilés. Mesuré côte à côte dans [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer-vue-i18n.md).

</Accordion>
</AccordionGroup>

## Interopérabilité avec vue-i18n

`intlayer` peut aussi vous aider à gérer vos namespaces `vue-i18n`.

En utilisant `intlayer`, vous pouvez déclarer votre contenu dans le format de votre bibliothèque i18n préférée, et intlayer générera vos namespaces à l'emplacement de votre choix (exemple : `/messages/{{locale}}/{{namespace}}.json`). Voir la [documentation de compatibilité vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/vue-i18n.md) et l'[adaptateur Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/nuxtjs-i18n.md).

## FAQ

<FAQ>

<Question title="Intlayer est-il un remplaçant pour vue-i18n ou une couche par-dessus ?">

Les deux, selon la façon dont vous l'adoptez. `vue-intlayer` est un runtime natif avec son propre composable `useIntlayer()`. `@intlayer/vue-i18n` est un adaptateur de compatibilité qui conserve l'API `vue-i18n` et remplace ce à quoi elle est liée, afin que vous puissiez migrer sans toucher aux composants et progresser fichier par fichier ensuite.

</Question>

<Question title="Qu'advient-il de mes blocs SFC <i18n> ?">

L'adaptateur ne les lit pas. Déplacez ces messages dans votre JSON de locale, ou dans un `.content.ts` à côté du composant, ce qui est la même idée avec des types générés. C'est la seule fonctionnalité de `vue-i18n` qui n'est pas reportée.

</Question>

<Question title="Intlayer fonctionne-t-il avec Nuxt ?">

Oui. [Intlayer avec Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nuxt.md) prend en charge le routage multilingue, le middleware de détection de locale et la génération de sitemaps. Si vous utilisez `@nuxtjs/i18n`, l'[adaptateur de compatibilité Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/nuxtjs-i18n.md) constitue la voie de migration.

</Question>

<Question title="Puis-je conserver mes locales/{locale}.json comme source de vérité ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/vue-i18n.md) les lit avec le dialecte `vue-i18n` (`{name}`, `{0}`, les pluriels en pipe `"car | cars"`) et réécrit les traductions lorsque la CLI ou le CMS les met à jour.

</Question>

<Question title="ICU fonctionne-t-il avec Intlayer sur Vue ?">

Le support natif d'ICU est en cours de développement. L'adaptateur `@intlayer/vue-i18n` gère la syntaxe propre à `vue-i18n`, y compris les pluriels et l'interpolation de listes et de variables nommées. Pour le modèle de pluralisation d'Intlayer, consultez le [contenu d'énumération](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/enumeration.md).

</Question>

</FAQ>

## GitHub STARs

Les étoiles GitHub sont un indicateur fort de la popularité d'un projet, de la confiance de la communauté et de sa pertinence à long terme. Bien qu'elles ne constituent pas une mesure directe de la qualité technique, elles reflètent le nombre de développeurs qui trouvent le projet utile, suivent ses progrès et sont susceptibles de l'adopter. Pour estimer la valeur d'un projet, les étoiles aident à comparer l'attraction entre les alternatives et donnent un aperçu de la croissance de l'écosystème.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Conclusion

Les deux, **vue-i18n** et **Intlayer**, localisent bien les applications Vue. La différence réside dans **la quantité de travail que vous devez faire vous-même** pour obtenir une configuration robuste et évolutive :

- Avec **Intlayer**, le **contenu modulaire**, **TS strict**, la **sécurité à la compilation**, les **bundles optimisés par tree-shaking**, ainsi que les **outils pour le routeur/SEO/éditeur** sont disponibles **nativement**.
- Si votre équipe privilégie la **maintenabilité et la rapidité** dans une application Vue/Nuxt multi-locale et pilotée par composants, Intlayer offre aujourd’hui l’expérience la **plus complète**.

## Lectures complémentaires

- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer_benchmark.md), l’exécution mesurée derrière le tableau ci-dessus
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer-vue-i18n.md), l’adaptateur sur la même application
- [Is vue-i18n outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/is_vue-i18n_outdated.md)
- [How to pick a Vue i18n library](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_vue_i18n_library.md)
- [Using Intlayer with vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/intlayer_with_vue-i18n.md)
- [Vue benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/vue.md)
- [Migration guide: vue-i18n to Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_vue-i18n_to_intlayer.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md)

Refer to ['Why Intlayer?' doc](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) for more details.
