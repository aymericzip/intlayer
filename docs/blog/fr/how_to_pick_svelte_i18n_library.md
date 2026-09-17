---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Comment choisir la bonne bibliothèque i18n pour Svelte en 2026"
description: Un guide de décision pour l'internationalisation avec Svelte et SvelteKit. Les questions à se poser avant de comparer svelte-i18n, Paraglide, typesafe-i18n, wuchale et Intlayer, et ce que chaque choix implique en bundle size, typage et sécurité SSR.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte internationalisation
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - comparaison bibliothèques i18n
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Comment choisir la bonne bibliothèque i18n pour Svelte

Svelte ne fournit rien pour l'i18n. Pas de `$t`, pas de primitive de locale, pas de format de message. Chaque option est un choix tiers, et l'écosystème Svelte est celui où l'i18n à la compilation est allée le plus loin, de sorte que les candidats diffèrent davantage les uns des autres que dans React ou Vue.

Ce guide liste les questions à se poser en premier, puis associe les réponses à `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` et Intlayer, pour Vite + Svelte et pour SvelteKit.

![Écosystème des bibliothèques i18n pour Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Table of Contents

<TOC/>

## Six questions à se poser avant de comparer les bibliothèques

1. **SPA Vite ou SvelteKit ?** Dans une SPA, un store au niveau du module est correct : un onglet, un utilisateur, une locale. Sur SvelteKit, ce même singleton est partagé entre les requêtes concurrentes sur le serveur, et la requête B s'affiche dans la langue de la requête A. La bibliothèque vous fournit soit une structure par requête (contexte, `locals`), soit vous laisse la gérer.
2. **Qui rédige les traductions ?** Les développeurs, un TMS, une agence fournissant des chaînes ICU, ou un pipeline IA. `svelte-i18n` utilise ICU. Paraglide et `typesafe-i18n` utilisent leur propre syntaxe. Adaptez-vous à vos prestataires.
3. **Combien de locales et de pages ?** Deux locales et cinq pages peuvent tout embarquer. Dix locales et quarante routes ne le peuvent pas, et la différence entre catalogues au runtime et messages compilés devient le coût principal.
4. **Avez-vous besoin du typage sur les clés ?** `$_("cart.totl")` est une erreur au runtime dans `svelte-i18n`. Les bibliothèques à la compilation en font une erreur de type par construction.
5. **Stores Svelte 4 ou runes Svelte 5 ?** Les runes changent la syntaxe de l'état de la locale, pas le problème de partage. Mais `$state` dans un fichier `.ts` compile en une simple variable, le runtime de la bibliothèque doit donc être compatible avec les runes si vous êtes sur Svelte 5.
6. **Pouvez-vous accepter des fichiers générés dans le dépôt ?** Paraglide et `typesafe-i18n` génèrent tous deux du JavaScript ou du TypeScript dans votre arborescence source. Certaines équipes s'en accommodent très bien, d'autres rencontrent des conflits de fusion sur chaque branche parallèle.

Notez vos réponses. Tout ce qui suit y fait référence.

## Le paysage en une image

L'i18n dans Svelte est arrivée plus tard que dans React ou Vue, et est passée directement aux vagues de compilation.

![Histoire des bibliothèques i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Dictionnaires au runtime (2019 à 2020) : svelte-i18n, sveltekit-i18n">

Catalogues JSON, ICU parsé dans le navigateur via `intl-messageformat`, locale dans des stores au niveau du module (`$locale`, `$_`). Les plus adoptés, bien documentés, la configuration SSR vous incombe.

</Accordion>
<Accordion header="Types générés (2020 à 2022) : typesafe-i18n">

Un générateur surveille vos catalogues et émet des accesseurs typés (`$LL.cart.total()`). Modèle solide, fichiers générés dans le dépôt, et le dépôt a peu évolué récemment.

</Accordion>
<Accordion header="Compilateur et contenu colocalisé (2022 à 2026) : Paraglide, wuchale, Intlayer">

Paraglide compile chaque message en une fonction exportée afin que le bundler élimine par tree-shaking ce qu'une route n'appelle jamais. `wuchale` extrait les chaînes du balisage lors du build. Intlayer déclare le contenu par composant et génère des types ainsi que des dictionnaires par composant.

</Accordion>
</AccordionGroup>

L'[histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md) détaille chaque vague.

## La décision la plus importante : où vit le contenu et quand il se charge

Deux choix structurels expliquent la majeure partie des différences de taille de bundle entre les configurations :

- **Contenu centralisé ou scopé.** Un seul fichier `locales/en.json` pour l'application, ou une déclaration par composant.
- **Import statique ou dynamique.** Tout charger au démarrage, ou récupérer la locale active (et idéalement la route active) à la demande.

Le graphique estime la charge utile pour une application théorique de 1 à 10 pages, traduite en 1 à 10 locales, avec environ 30 Ko de texte par page.

![Fuite de contenu théorique par architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n` se situe en haut à gauche par défaut : `register("fr", () => import("./fr.json"))` permet un chargement dynamique par locale, mais un catalogue de locale est un objet unique et son chargement charge le texte de chaque page. Paraglide représente le cas intéressant : comme chaque message est son propre export, le tree-shaking prend en charge l'axe des pages sans surcoût, et le [benchmark Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/svelte.md) confirme qu'il fonctionne comme annoncé sur Vite + Svelte (ce n'était pas le cas dans les benchmarks React et Next.js). Intlayer atteint le même résultat grâce aux déclarations par composant.

Si votre réponse à la question 3 était "beaucoup de pages", accordez plus de poids à cette section qu'à n'importe quelle préférence d'API. L'article sur l'[i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md) aborde l'aspect maintenance de ce même compromis.

## Les candidats

Les tailles des bibliothèques sont issues du [benchmark Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/svelte.md) : store plus accesseur dans un composant vide, après bundling, tree-shaking et minification, sur une application de 10 pages et 10 locales. Le contenu est mesuré séparément.

| Bibliothèque    | Emplacement des messages            | État de la locale                          | Sûreté des types          | Format des messages           | Découpage par route   | Taille de la bibliothèque                                  |
| :-------------- | :---------------------------------- | :----------------------------------------- | :------------------------ | :---------------------------- | :-------------------- | :--------------------------------------------------------- |
| `svelte-i18n`   | Catalogues JSON par locale          | Store Svelte au niveau du module           | 2/5 — Union manuelle      | ICU                           | Non                   | ~16.6 kB                                                   |
| `typesafe-i18n` | Modules TS générés                  | Adaptateur de store                        | 4/5 — Générés             | Propre                        | Partiel               | Petite                                                     |
| Paraglide       | Projet inlang, compilé en fonctions | Lu par appel depuis cookie, URL ou storage | 3.5/5 — Générés           | Propre                        | Oui, via tree-shaking | Proche de zéro (grâce au code généré dans la base de code) |
| `wuchale`       | Extrait du balisage lors du build   | Store                                      | N/A (pas de clés)         | Propre                        | Oui                   | ~30.7 kB                                                   |
| Intlayer        | `.content.ts` à côté du composant   | Contexte plus store, compatible runes      | 5/5 — Générés, par défaut | Intlayer (+ ICU, i18next, PO) | Oui, par composant    | ~3.6 kB                                                    |

> Les chiffres sont un aperçu des versions testées lors du benchmark. Exécutez-le sur votre propre application avant de décider uniquement sur la base de la taille.
> Sûreté des types : 5/5 signifie que les clés, les paramètres et chaque locale sont vérifiés sans configuration manuelle, y compris le formateur d'URL et les helpers.

La taille quasi nulle de la bibliothèque Paraglide est obtenue par construction : le runtime est généré dans votre dépôt. Intlayer nécessite `vite-intlayer`, il ne peut donc pas fonctionner sans étape de build.

## Associer vos réponses à une bibliothèque

<AccordionGroup>
<Accordion header="SPA Vite, petite équipe, peu de locales">

`svelte-i18n`. C'est l'option la plus documentée, `$_` se lit naturellement dans le balisage, et `register` associé à `waitLocale()` prend en charge le lazy loading par locale. Conditionnez le premier affichage sur `isLoading`, sinon des clés brutes apparaîtront brièvement. Si l'application est amenée à utiliser un serveur plus tard, placez la locale dans le contexte Svelte dès le premier jour au lieu de dépendre du store de module ; cela ne coûte rien maintenant et évite un bug difficile à détecter en production.

</Accordion>
<Accordion header="SvelteKit avec routage par locale et SSR">

Le problème de partage d'état décide de ce choix. `svelte-i18n` fonctionne sur SvelteKit, mais la configuration par requête (`hooks.server.ts`, `locals`, `load`, puis `setContext`) est à votre charge et facile à implémenter de travers. Paraglide fournit une intégration SvelteKit qui gère le routing et lit la locale à chaque appel, ce qui évite le singleton. Intlayer configure la locale depuis les données de `load` dans le contexte. L'article sur l'[i18n SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/sveltekit.md) explique le choix entre `[[lang]]` et `reroute`, que vous devriez faire avant de choisir la bibliothèque.

</Accordion>
<Accordion header="Les traductions proviennent d'un TMS ou d'une agence livrant de l'ICU">

`svelte-i18n` supporte nativement ICU via `intl-messageformat`, il s'intègre donc directement avec la plupart des prestataires. Paraglide et `typesafe-i18n` utilisent leur propre syntaxe et nécessitent une conversion. Le support ICU d'Intlayer est partiel, donc si vous recevez déjà des chaînes ICU aujourd'hui, considérez cela comme un point bloquant.

</Accordion>
<Accordion header="La taille du bundle est la contrainte principale">

La compilation. Le tree-shaking de Paraglide fonctionne sur Vite + Svelte et le coût de la bibliothèque est proche de zéro. Les dictionnaires par composant d'Intlayer offrent le même résultat sans fichiers générés dans le dépôt. `svelte-i18n` embarque le parser ICU ainsi que l'ensemble du catalogue et atteint environ 4,5× la taille de `svelte-intlayer` dans le benchmark avant tout contenu.

</Accordion>
<Accordion header="La sécurité de typage est non négociable">

N'importe quelle option sauf une configuration `svelte-i18n` basique, où le seul typage repose sur une union écrite à la main qui diverge immédiatement du JSON. `typesafe-i18n`, Paraglide et Intlayer génèrent tous des types à partir du contenu. Vérifiez l'activité du dépôt de `typesafe-i18n` avant d'y engager une codebase. L'article sur la [détection des traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md) compare ce que chaque solution détecte au build.

</Accordion>
<Accordion header="Vous ne voulez pas de fichiers générés dans le dépôt">

Cela élimine Paraglide et `typesafe-i18n`. `svelte-i18n` et Intlayer conservent leur sortie dans `node_modules` ou un répertoire de build ; avec Intlayer, les fichiers `.content.ts` constituent le code source écrit à la main, tandis que les dictionnaires compilés et les types résident dans `.intlayer/` et sont ignorés par git.

</Accordion>
<Accordion header="Les traductions seront produites par l'IA">

Dans ce cas, le JSON centralisé n'a plus de raison d'être. Du contenu colocalisé combiné à une CLI qui complète les locales manquantes constitue la solution la plus directe. La commande `fill` d'Intlayer s'exécute avec votre propre clé d'API (OpenAI, Anthropic, Mistral, Gemini) et ne retraduit que ce qui a changé. L'écosystème inlang de Paraglide propose des équivalents hébergés avec leurs propres forfaits.

</Accordion>
</AccordionGroup>

## Où chaque bibliothèque montre ses limites

- **`svelte-i18n`** : la plus lourde de l'ensemble, aucun type sur les clés, aucun découpage par route, store au niveau du module qui fuit entre les requêtes sur SvelteKit à moins de configurer le contexte vous-même.
- **`typesafe-i18n`** : un processus de surveillance (watcher), des fichiers générés dans le dépôt, et un projet qui a peu évolué récemment.
- **Paraglide** : fichiers générés commités dans le dépôt et régénérés avant chaque push, conflits de fusion sur les branches parallèles, et locale lue depuis un cookie ou le storage à chaque appel de message plutôt que depuis un store, ce qui demande du travail lors du changement de locale.
- **`wuchale`** : idée d'extraction intéressante, encore jeune. Le benchmark React a rencontré des problèmes de réactivité nécessitant de forcer des re-renders de provider, et la documentation est succincte.
- **Intlayer** : plugin de build obligatoire, écosystème plus restreint, support partiel d'ICU, et contenu réparti dans la codebase par conception, de sorte que l'exportation d'un JSON unique pour un traducteur nécessite des outils spécifiques.

## À quoi ressemble chaque option en code

Le même composant, un récapitulatif de panier avec un titre et un pluriel, écrit avec chaque candidat. La partie intéressante n'est pas le balisage, c'est l'emplacement du contenu, la façon dont la locale est stockée et ce que sait le vérificateur de types.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU via `intl-messageformat`, locale dans un store au niveau du module. `$_` accepte n'importe quelle chaîne de caractères ; le seul typage est une union que vous écrivez à la main.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Chaque message est une fonction générée et typée, éliminée par tree-shaking si elle n'est jamais appelée. Le dossier `paraglide/` est généré dans votre dépôt, et la locale est lue par appel plutôt que depuis un store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Accesseurs typés générés par un processus de surveillance. Le modèle est solide ; les fichiers générés résident dans le dépôt et le projet a été peu actif récemment.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Toutes les locales dans un seul fichier à côté du composant. `useIntlayer` renvoie un store lisible, `$content` correspond donc à l'auto-souscription que vous connaissez déjà, et la locale est conservée dans le contexte (sécurisé pour le SSR) plutôt que dans un singleton de module.

  </Tab>
</Tabs>

Vous utilisez déjà `svelte-i18n` ? L'[adaptateur de compatibilité `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/svelte-i18n.md) crée un alias pour le package au niveau du bundler afin que `$_`, `$date`, `$number` et vos clés plates continuent de fonctionner pendant qu'Intlayer gère le contenu.

## Avant de vous engager

Un tableau de fonctionnalités indique ce qu'une bibliothèque fait aujourd'hui. Ces points montrent ce que sera son utilisation au quotidien.

**Vérifiez l'activité du dépôt.**

Les commits, le temps de réponse aux issues, et si la dernière release mineure a eu lieu cette année. Une conception solide sans mainteneur est une future migration programmée.

**Ne choisissez pas en fonction des téléchargements npm.**

La bibliothèque la plus installée est celle qui est sortie en premier, pas celle qui convient à une codebase Svelte en 2026. Les téléchargements mesurent l'histoire, pas l'adéquation.

![Classement des bibliothèques i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Renseignez-vous sur qui finance le mainteneur, et ce qu'il vend.**

`svelte-i18n` est soutenu par Crowdin, comme `next-intl` et `vue-i18n`. `i18next` est soutenu par Locize. Tolgee, Paraglide (inlang) et Intlayer exploitent chacun leur propre plateforme. Un fournisseur dont les revenus dépendent d'une traduction hébergée a peu d'intérêt à rendre la traduction gratuite au sein de votre chaîne d'outils. Intlayer est le seul de la sélection à proposer la traduction par IA via la CLI avec votre propre clé d'API, ainsi qu'un CMS auto-hébergeable.

**Est-elle prête pour les agents IA ?**

Les agents rencontrent encore des difficultés avec l'i18n : ils oublient des locales, inventent des clés et mélangent les syntaxes de messages. La bibliothèque propose-t-elle des [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md) ou un [serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md) pour que l'agent puisse lister, compléter et tester le contenu ? Et le chargement du contenu est-il optimisé par défaut, ou faut-il revoir les namespaces et les lazy imports chaque trimestre ?

**Sécurité de typage prête à l'emploi.**

Pas "pouvant être typé avec de la configuration supplémentaire", mais "une mauvaise clé échoue à `tsc` sur une installation neuve". Vérifiez ce qui se passe avec une clé inexistante, ou avec une locale à laquelle il manque une traduction.

**Détection du contenu inutilisé.**

Les catalogues ne font que grossir. Le build d'Intlayer purge les champs inutilisés et les consigne (`build.purge`). Paraglide y parvient par architecture, puisqu'une fonction de message non appelée est éliminée par tree-shaking. Tout le reste vous laisse le soin du nettoyage.

**Expérience développeur.**

Le temps nécessaire pour afficher la première chaîne traduite, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md) ou une [extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md) qui affiche la traduction au survol et renvoie à la déclaration, une [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md) pour compléter, tester et déployer, un [compilateur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) ou extracteur qui extrait les chaînes codées en dur de vos composants pour ne pas tout gérer clé par clé, ainsi qu'un moyen pour les non-développeurs d'éditer le contenu ([éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)) sans pull request.

## Foire aux questions

<FAQ>

<Question title="svelte-i18n est-elle toujours le bon choix par défaut en 2026 ?">

Pour une SPA Vite avec un petit catalogue, oui. C'est l'option la plus documentée et la compatibilité ICU est importante pour de nombreuses équipes. Sur SvelteKit ou au-delà de quelques dizaines de pages, ses coûts (pas de typage, pas de scoping, store partagé) commencent à s'accumuler.

</Question>

<Question title="Le tree-shaking de Paraglide est-il réel ?">

Sur Vite + Svelte, oui, le benchmark le confirme. Sur React avec TanStack Start ou Next.js, il n'a pas pris effet dans le même benchmark. Vérifiez sur votre propre stack plutôt que de vous fier aveuglément à l'un ou l'autre résultat.

</Question>

<Question title="Les runes changent-elles la bibliothèque que je devrais choisir ?">

Elles changent la syntaxe de votre propre état de locale, pas le problème de partage. Ce qui compte, c'est de savoir si le runtime de la bibliothèque prend en charge les runes sur Svelte 5 et s'il utilise le contexte plutôt qu'un store de module. Vérifiez les deux.

</Question>

<Question title="Le choix de la bibliothèque affecte-t-il le SEO ?">

Indirectement. Les robots d'indexation se soucient du routage, de `hreflang`, de `<html lang>` et de la présence du texte dans le HTML rendu côté serveur. Consultez le [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Pour aller plus loin

- [Benchmark i18n Svelte : bundle size, fuites et temps de changement de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/svelte.md)
- [i18n Svelte : stores, runes et le piège du niveau module](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/svelte.md) et [i18n SvelteKit : routage, SSR et état partagé](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/sveltekit.md)
- [Adaptateur de compatibilité `svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/svelte-i18n.md)
- [L'histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md)
- [i18n à la compilation vs i18n déclarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md)
- [i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md)
- [Comment fonctionne l'optimisation de bundle au build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md)
- [Configurer l'i18n dans une application Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+svelte.md) et dans une [application SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_svelte_kit.md)
- Même guide pour [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_vue_i18n_library.md) et [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_solid_i18n_library.md)
