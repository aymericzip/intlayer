---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Comment choisir la bonne bibliothèque i18n Vue en 2026"
description: Un guide de décision pour l'internationalisation de Vue et Nuxt. Les questions à se poser avant de comparer vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide et Intlayer, et ce que chaque choix coûte en taille de bundle, typage et payload SSR.
keywords:
  - vue i18n
  - internationalisation vue
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - comparaison bibliothèques i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Comment choisir la bonne bibliothèque i18n pour Vue

"Vue i18n" est à la fois un terme générique et le nom de la bibliothèque que presque tout le monde installe. C'est à la fois pratique et trompeur : `vue-i18n` est un choix par défaut tout à fait convenable, mais ce n'est pas la seule option, et les questions qui devraient guider votre choix (SSR ou non, nombre de pages, qui rédige les traductions) sont rarement posées avant d'exécuter `npm install`.

Ce guide pose d'abord ces questions, puis fait correspondre les réponses aux bibliothèques adaptées, pour Vite + Vue standard et pour Nuxt.

![Écosystème des bibliothèques i18n pour Vue](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Table des matières

<TOC/>

## Six questions à se poser avant de comparer les bibliothèques

1. **Vite SPA ou Nuxt ?** Dans une SPA, le coût du catalogue est un problème de bundle JS. Dans Nuxt, c'est aussi un problème de payload HTML, car les messages sont sérialisés dans l'état SSR puis hydratés. La plupart des retours disant que "vue-i18n est lent" proviennent d'applications Nuxt pour cette raison.
2. **Qui rédige les traductions ?** Des développeurs, un TMS, une agence fournissant des chaînes ICU, ou un pipeline IA. `vue-i18n` utilise sa propre syntaxe de pluriel séparée par des barres verticales (`|`), et non ICU. Cela a son importance si les chaînes proviennent de l'extérieur.
3. **Combien de locales et de pages ?** Deux locales et cinq pages peuvent tout embarquer d'un coup. Dix locales et quarante routes ne le peuvent pas, et la stratégie de chargement devient le coût principal.
4. **Avez-vous besoin du typage sur les clés ?** `t("cart.totl")` compile dans `vue-i18n` à moins de passer un generic de schéma de message, et ce schéma entre en conflit avec les catalogues chargés en lazy loading.
5. **Que contient votre contenu ?** Uniquement des libellés d'interface utilisateur, ou du markdown, des liens au milieu des phrases et des blocs spécifiques à chaque locale ? C'est avec le contenu riche que le retour sous forme de chaîne de caractères de `t()` devient fastidieux.
6. **Le CSP est-il une contrainte ?** Le build par défaut de `vue-i18n` compile les messages dans le navigateur avec `new Function`. Les builds runtime-only nécessitent `@intlify/unplugin-vue-i18n` pour précompiler au moment du build.

Notez vos réponses. Tout ce qui suit y fait référence.

## Le paysage en une image

L'écosystème Vue compte moins de bibliothèques i18n que React, et elles sont issues de différentes vagues architecturales.

![Histoire des bibliothèques i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Dictionnaires au runtime (2015 à 2019) : vue-i18n, @nuxt/i18n">

`vue-i18n` est apparu en 2015 et est resté le choix par défaut depuis. `@nuxt/i18n` l'encapsule avec le routing par locale, les balises SEO et le lazy loading par locale. Les messages sont compilés en fonctions de rendu, au moment du build si vous ajoutez l'unplugin, dans le navigateur sinon.

</Accordion>
<Accordion header="Formats alternatifs (2020) : fluent-vue">

Les fichiers `.ftl` de Mozilla Fluent ont apporté une syntaxe de message plus conviviale avec des variantes grammaticales. Pas de typage sur les clés, et le plugin Vite charge chaque locale dans chaque page.

</Accordion>
<Accordion header="Compilateur et contenu colocalisé (2024 à 2026) : Paraglide, Intlayer">

Paraglide génère une fonction par message et laisse le bundler éliminer le reste via tree-shaking. Intlayer déclare le contenu par composant dans des fichiers `.content.ts`, génère les types, et n'embarque que ce qu'une route affiche.

</Accordion>
</AccordionGroup>

L'[histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md) détaille chaque vague en profondeur.

## La décision la plus importante : où vit le contenu et quand se charge-t-il

Deux choix structurels expliquent la majeure partie des différences de taille de bundle entre les configurations :

- **Contenu centralisé ou scopé.** Un seul `locales/fr.json` pour toute l'application, ou une déclaration par composant.
- **Import statique ou dynamique.** Tout charger au démarrage, ou récupérer la locale active (et idéalement la route active) à la demande.

Le graphique estime le payload pour une application théorique de 1 à 10 pages, traduite en 1 à 10 locales, avec environ 30 Ko de texte par page.

![Fuite théorique de contenu par architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

`vue-i18n` prend en charge l'axe dynamique : appeler `setLocaleMessage` après un `import()` vous évite d'expédier neuf locales que personne ne lit. Ce qu'il ne permet pas, c'est l'axe de la page. Un catalogue de locale est un objet unique, et le charger charge les textes de chaque page. Dans une SPA, personne ne s'en aperçoit. Dans Nuxt, avec `@nuxtjs/i18n` et plus de dix pages, chaque route transporte les chaînes de toutes les autres routes, en double : dans le chunk JS et dans le payload SSR.

Le [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/vue.md) mesure cela sous forme de "fuite des autres routes" et "fuite des autres locales". Si votre réponse à la question 3 était "beaucoup de pages", cette section l'emporte sur toute préférence d'API. L'article sur l'[i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md) aborde la maintenance de ce même compromis.

## Les candidats

Les tailles des bibliothèques sont issues du [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/vue.md) : plugin plus composable dans un composant vide, après bundling, tree-shaking et minification, sur une application de 10 pages et 10 locales. Le contenu est mesuré séparément.

| Bibliothèque   | Modèle de contenu                                             | Types sur les clés              | Format de message      | Découpage par route   | Taille de la bibliothèque |
| :------------- | :------------------------------------------------------------ | :------------------------------ | :--------------------- | :-------------------- | :------------------------ |
| `vue-i18n`     | Catalogues centraux par locale, blocs SFC `<i18n>` optionnels | Optionnel via generic de schéma | Propre (pluriels pipe) | Non                   | ~24.3 Ko                  |
| `@nuxtjs/i18n` | Identique à `vue-i18n`, plus routing et balises SEO           | Identique                       | Identique              | Non, par locale seule | En supplément             |
| `fluent-vue`   | Fichiers `.ftl` (Mozilla Fluent)                              | Aucun                           | Fluent                 | Non                   | ~29.7 Ko                  |
| Paraglide      | Projet inlang, fonctions générées                             | Générés                         | Propre                 | Via tree-shaking      | Proche de zéro            |
| Intlayer       | Un fichier `.content.ts` par composant                        | Générés, activés par défaut     | Helpers (`plural`)     | Oui, par composant    | Baseline                  |

> Les chiffres représentent un instantané basé sur les versions du benchmark. Exécutez-le sur votre propre application avant de décider uniquement sur la taille.

La taille quasi nulle de la bibliothèque Paraglide découle de sa conception : le runtime est généré dans votre repository, ce qui implique une étape de regénération avant chaque push et des conflits de fusion sur les fichiers générés. Intlayer nécessite `vite-intlayer` (ou le module Nuxt), il ne peut donc pas fonctionner sans étape de build.

## Associez vos réponses à une bibliothèque

<AccordionGroup>
<Accordion header="Vite SPA, petite équipe, peu de locales">

`vue-i18n` en mode Composition (`legacy: false`), avec `@intlify/unplugin-vue-i18n` pour ne livrer que le build runtime-only. Chargez les locales en lazy loading avec `import()`. Cela couvre la plupart des petites applications et les réponses de la communauté sont disponibles partout. Les blocs SFC `<i18n>` colocalisent les messages avec le composant, ce qui aide, mais les outils d'extraction et de TMS qui les entourent sont plus limités que pour les catalogues JSON, décidez donc tôt de ce que l'équipe utilisera.

</Accordion>
<Accordion header="Nuxt avec routing par locale, sitemap et hreflang">

`@nuxtjs/i18n` vous offre la stratégie de routing, les balises `hreflang` et la détection de la locale sans écrire de code, ce qui justifie à lui seul son choix pour des sites de contenu avec une poignée de pages. Sa limite réside dans le catalogue par locale : au-delà d'une dizaine de pages, le payload SSR transporte les textes de chaque route. Si tel est votre cas, configurez `vue-i18n` à la main avec des messages par route, ou passez à un contenu scopé. L'article sur [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/nuxt.md) guide d'abord le choix de la stratégie de routing.

</Accordion>
<Accordion header="Les traductions proviennent d'un TMS ou d'une agence fournissant de l'ICU">

La syntaxe de pluriel de `vue-i18n` (`"aucun article | un article | {count} articles"`) n'est pas compatible ICU et n'est pas portable. Les traducteurs doivent en être informés, et un export TMS ne la produira pas. Mettez-vous d'accord sur le format avant la création du premier catalogue, ou choisissez une bibliothèque dont le format correspond à votre prestataire. Le support d'ICU par Intlayer est partiel, donc si vous recevez des chaînes ICU aujourd'hui, considérez cela également comme un point bloquant.

</Accordion>
<Accordion header="Grande application, nombreuses routes, budget bundle ou payload SSR strict">

Privilégiez le contenu scopé compilé au moment du build. Paraglide y parvient grâce au tree-shaking, qui fonctionne comme annoncé sur Vite. Intlayer y parvient grâce aux déclarations par composant et n'expédie que ce que la route affiche. Avec `vue-i18n`, vous pouvez découper les messages par route manuellement, mais rien ne l'impose et un composant partagé important un namespace global peut discrètement annuler ces efforts.

</Accordion>
<Accordion header="Le typage strict est non négociable">

`vue-i18n` peut être typé en passant un generic de schéma à `createI18n`. Cela fonctionne, mais se brise dès que les catalogues sont chargés en lazy loading, car le schéma décrit des messages qui ne sont potentiellement pas encore là. Si vous ne souhaitez pas maintenir cela, optez pour une bibliothèque dont les types sont générés à partir du contenu : Paraglide ou Intlayer. L'article sur la [détection des traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md) compare ce que chacune détecte au moment du build.

</Accordion>
<Accordion header="Le contenu est plus complexe que de simples libellés d'interface">

Pages en markdown, phrases contenant un `<RouterLink>` au milieu, composants par locale. `vue-i18n` propose `<i18n-t>` pour l'interpolation de composants, ce qui fonctionne mais s'avère verbeux. Les nœuds de contenu d'Intlayer acceptent directement du markdown, du HTML et des objets imbriqués, ce qui convient mieux lorsque l'application est riche en contenu.

</Accordion>
<Accordion header="Les traductions seront produites par l'IA">

Dans ce cas, le JSON centralisé n'a plus d'intérêt pour le justifier. Un contenu colocalisé couplé à une CLI qui remplit les locales manquantes représente le chemin le plus court. La commande `fill` d'Intlayer s'exécute avec votre propre clé API (OpenAI, Anthropic, Mistral, Gemini) et ne retraduit que ce qui a été modifié.

</Accordion>
</AccordionGroup>

## Les limites de chaque bibliothèque

- **`vue-i18n`** : la plus lourde du groupe, format de pluriel propriétaire, types optionnels et fragiles avec le lazy loading, pas de découpage par route, accumulation silencieuse de clés mortes. Laisser `legacy: true` dans une application Vue 3 conserve la couche de compatibilité Vue 2 et fait perdre le typage de `useI18n()`.
- **`@nuxtjs/i18n`** : hérite de tous les points ci-dessus, et le payload SSR transporte les chaînes de chaque page dès qu'on dépasse une douzaine de routes.
- **`fluent-vue`** : syntaxe de message agréable, pas de typage sur les clés, et le plugin Vite charge tout le contenu dans toutes les langues sur chaque page. La plus lourde du benchmark.
- **Paraglide** : fichiers générés commités dans le repo, regénération avant chaque push, et la locale est lue depuis un cookie ou le storage à chaque appel de message plutôt que depuis un store réactif, ce qui entraîne un surcoût lors des changements de locale.
- **Intlayer** : plugin de build obligatoire, écosystème plus restreint, support partiel d'ICU, et contenu réparti dans toute la codebase par conception, ce qui nécessite des outils pour exporter un JSON unique destiné à un traducteur.

## Ce que chaque option donne en code

Le même composant, un récapitulatif de panier avec un titre et un pluriel, écrit avec chaque candidat. La partie intéressante n'est pas le template, mais l'endroit où réside le contenu et ce que `vue-tsc` en sait.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Les pluriels séparés par des barres verticales (`|`) sont un format propre à vue-i18n, pas du standard ICU. `t` accepte n'importe quelle chaîne, à moins de passer un generic de schéma de message à `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

La syntaxe de Fluent gère très bien les pluriels et les variantes grammaticales. Les identifiants de messages sont des chaînes non typées, et le plugin Vite intègre chaque locale dans chaque page.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Chaque message est une fonction typée générée, une clé manquante provoque donc une erreur d'import. Le dossier `paraglide/` est généré dans votre repo et regénéré à chaque modification.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ fr: "Votre panier", en: "Your cart", es: "Tu carrito" }),
    items: t({
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Toutes les locales réunies dans un seul fichier à côté du composant. Les types sont générés au build, `title` bénéficie donc de l'autocomplétion et une faute de frappe fait échouer `vue-tsc`. `<title />` effectue le rendu d'un nœud ciblable par l'éditeur visuel ; `{{ items(props.count) }}` retourne la chaîne brute.

  </Tab>
</Tabs>

Vous utilisez déjà `vue-i18n` ? L'[adaptateur de compatibilité `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/vue-i18n.md) crée un alias du package au niveau du bundler, de sorte que `useI18n()`, `$t`, les pluriels pipe et `v-t` continuent de fonctionner pendant qu'Intlayer sert le contenu. Le [guide de migration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_vue-i18n_to_intlayer.md) explique comment se détacher de l'adaptateur par la suite, et il existe un [guide spécifique à Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_nuxtjs_i18n_to_intlayer.md).

## Avant de vous engager

Un tableau de fonctionnalités indique ce qu'une bibliothèque fait aujourd'hui. Les points suivants expliquent à quoi ressemblera votre quotidien avec elle.

**Vérifiez l'activité du repository.**

Commits, temps de réponse sur les issues, et si la dernière release mineure date de cette année. Une conception solide sans mainteneur est une future migration forcée.

**Ne choisissez pas en fonction des téléchargements npm.**

La bibliothèque la plus installée est celle qui est sortie en premier, pas nécessairement celle qui convient à une codebase Vue en 2026. Les téléchargements mesurent l'ancienneté, pas l'adéquation.

![Tier list des bibliothèques i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Renseignez-vous sur qui finance le mainteneur et ce qu'il vend.**

`vue-i18n` est soutenu par Crowdin, tout comme `next-intl` et `svelte-i18n`. `i18next` est soutenu par Locize. Tolgee, Paraglide (inlang) et Intlayer gèrent chacun leur propre plateforme. Un fournisseur dont les revenus reposent sur l'hébergement des traductions a peu d'intérêt à rendre la traduction gratuite au sein de votre toolchain. Intlayer est le seul de la liste à intégrer la traduction par IA via la CLI avec votre propre clé API, ainsi qu'un CMS que vous pouvez auto-héberger.

**Est-il prêt pour les agents IA ?**

Les agents rencontrent encore des difficultés avec l'i18n : ils oublient des locales, inventent des clés et mélangent les syntaxes de messages. La bibliothèque fournit-elle des [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md) ou un [serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md) pour permettre à l'agent de lister, compléter et tester le contenu ? Et le chargement du contenu est-il optimisé par défaut, ou quelqu'un doit-il auditer les namespaces et les imports lazy chaque trimestre ?

**Typage strict dès l'installation.**

Pas un simple "peut être typé avec de la configuration supplémentaire", mais "une mauvaise clé fait échouer `tsc` sur une installation neuve". Regardez ce qui se produit avec une clé inexistante, ainsi qu'avec une locale à laquelle il manque une traduction.

**Détection du contenu inutilisé.**

Les catalogues ne font que grossir. Le build d'Intlayer purge les champs inutilisés et les consigne (`build.purge`). Paraglide y parvient par architecture, puisqu'une fonction de message non appelée est éliminée via tree-shaking. Tout le reste vous laisse le soin de faire le ménage.

**Expérience développeur.**

Le temps de configuration jusqu'à la première chaîne traduite, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md) ou une [extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md) qui affiche la traduction au survol et renvoie vers la déclaration, une [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md) pour compléter, tester et synchroniser (push), et un moyen pour les non-développeurs d'éditer le contenu ([éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)) sans pull request.

## Foire Aux Questions

<FAQ>

<Question title="vue-i18n est-il toujours le bon choix par défaut en 2026 ?">

Pour la plupart des applications Vue, oui. L'écosystème est le plus large, la documentation est complète, et les coûts sont prévisibles : un runtime lourd, un format de pluriel propriétaire, et un découpage par route que vous devez concevoir et maintenir vous-même.

</Question>

<Question title="Dois-je utiliser @nuxtjs/i18n ou configurer vue-i18n manuellement dans Nuxt ?">

Utilisez le module, à moins que votre routing soit inhabituel ou que votre application ne compte que peu de pages. Une configuration manuelle implique de recréer vous-même les routes par locale, les middlewares, `hreflang` et le sitemap, ce qui s'avère plus complexe qu'il n'y paraît.

</Question>

<Question title="Ai-je besoin d'une bibliothèque basée sur un compilateur ?">

Seulement si la taille du bundle, le payload SSR, les types générés ou la vérification des clés manquantes au build sont de réelles exigences. L'article sur l'[i18n basée sur compilateur vs déclarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md) explique ce que les compilateurs apportent et les pièges potentiels.

</Question>

<Question title="Le choix de la bibliothèque influence-t-il le SEO ?">

Indirectement. Les robots d'indexation s'intéressent au routing, au `hreflang`, à `<html lang>` et à la présence du texte dans le HTML rendu côté serveur. Consultez le [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Pour aller plus loin

- [Benchmark Vue i18n : taille de bundle, fuites et temps de changement de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/vue.md)
- [Vue i18n : comment fonctionne vue-i18n et ses points faibles](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/vue.md) et l'[article sur Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer, fonctionnalité par fonctionnalité](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer.md) et le [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/vue-i18n_vs_intlayer_benchmark.md)
- [vue-i18n est-il obsolète ?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/is_vue-i18n_outdated.md)
- [L'histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md)
- [i18n basée sur compilateur vs déclarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md)
- [i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md)
- [Configurer l'i18n dans une application Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md) et dans une [application Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nuxt.md)
- Le même guide pour [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_svelte_i18n_library.md) et [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_solid_i18n_library.md)
