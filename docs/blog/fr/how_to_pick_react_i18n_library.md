---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Comment choisir la bonne bibliothèque i18n pour React en 2026"
description: Un guide de décision pour l'internationalisation avec React. Les questions à se poser avant de comparer react-i18next, react-intl, Lingui, use-intl, Paraglide et Intlayer, et ce que chaque choix implique en bundle size, typage et maintenance.
keywords:
  - react i18n
  - react internationalisation
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - comparaison bibliothèques i18n
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# Comment choisir la bonne bibliothèque i18n pour React

React ne fournit aucune primitive i18n. La bibliothèque que vous choisissez dès le premier jour détermine la manière dont les traductions sont stockées, comment elles arrivent dans le bundle, et la charge de maintenance qui vous incombera pour les années à venir. La plupart des équipes choisissent par popularité, puis découvrent les compromis une fois arrivées à 2 000 clés.

Ce guide adopte l'approche inverse : répondez d'abord à quelques questions sur votre projet, puis associez ces réponses aux bibliothèques correspondantes. Il se concentre sur React pur (Vite, React Router, TanStack Start). Next.js a ses propres contraintes, détaillées dans le [comparatif Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md).

![Écosystème des bibliothèques i18n pour React](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Table of Contents

<TOC/>

## Six questions à se poser avant de comparer les bibliothèques

Un tableau de fonctionnalités est inutile si vous ne savez pas quelles lignes comptent pour vous. Commencez par répondre à celles-ci.

1. **Comment l'application est-elle rendue ?** SPA uniquement, SSR avec hydratation, ou React Server Components. Les hooks basés sur le contexte fonctionnent partout dans une SPA. Avec RSC, un hook impose `"use client"` sur chaque composant qui affiche du texte, vous aurez donc également besoin d'une API côté serveur.
2. **Qui rédige les traductions ?** Les développeurs, une équipe interne utilisant un TMS, une agence livrant des fichiers ICU, ou un pipeline IA. Cela dicte le format de catalogue bien plus que n'importe quel détail d'API.
3. **Combien de locales et de pages ?** Deux locales et cinq pages peuvent se permettre de tout inclure dans le bundle. Dix locales et cinquante routes ne le peuvent pas, et la stratégie de chargement devient alors le coût principal.
4. **Avez-vous besoin du typage sur les clés ?** Une faute de frappe dans `t("checkout.totl")` compile dans toutes les bibliothèques basées sur des clés, à moins de configurer le typage vous-même. Décidez si cela est acceptable.
5. **Que contient la chaîne de caractères ?** Du texte brut, des pluriels, ou des phrases avec un composant `<Link>` au milieu. Le contenu riche est le point où la plupart des API deviennent peu pratiques.
6. **Combien de temps vivra le projet ?** Un prototype de trois mois et un produit de cinq ans ne nécessitent pas la même quantité d'outillage de build.

Notez vos réponses. Tout ce qui suit y fait référence.

## Le paysage en une image

Quinze ans d'i18n JavaScript se résument en quatre vagues architecturales, et les bibliothèques React que vous allez comparer sont issues de vagues différentes.

![Histoire des bibliothèques i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Dictionnaires au runtime (2011 à 2017) : i18next, react-intl">

Catalogues JSON chargés en mémoire, résolution de `t("a.b")` au runtime, syntaxe ICU ou personnalisée analysée dans le navigateur. Plus grands écosystèmes, runtimes les plus lourds, typage optionnel.

</Accordion>
<Accordion header="Macros à la compilation (2018 à 2021) : Lingui, typesafe-i18n">

Messages extraits au build, compilés en catalogues compacts, arguments typés. Une étape de build supplémentaire (`extract`, `compile`) en échange de bundles plus légers.

</Accordion>
<Accordion header="Server-first (2022 à 2024) : use-intl / next-intl">

Conçus autour du SSR et des Server Components. Rendu sur le serveur, hydratation uniquement de ce dont le client a besoin. Toujours basés sur des clés et centralisés.

</Accordion>
<Accordion header="Compilateur et contenu colocalisé (2024 à 2026) : Paraglide, Intlayer, wuchale">

Le contenu est compilé en fonctions optimisées pour le tree-shaking ou en dictionnaires par composant. Les types sont générés, les traductions manquantes font échouer le build, et la traduction par IA s'exécute depuis la CLI.

</Accordion>
</AccordionGroup>

L'[histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md) détaille la manière dont chaque vague a répondu aux problèmes de la précédente.

## La décision la plus importante : où vit le contenu et quand il se charge

Toutes les bibliothèques React i18n partagent la même structure : un store, un provider, un hook. Tout ce que le provider reçoit se retrouve dans le bundle client ou dans le payload d'hydratation. Les deux choix structurels sont donc :

- **Contenu centralisé ou scopé.** Un seul `en.json` pour toute l'application, ou une déclaration par composant (ou par namespace).
- **Import statique ou dynamique.** Tout est packagé au démarrage, ou bien la locale active et la route sont récupérées à la demande.

Le graphique ci-dessous estime le payload pour une application théorique de 1 à 10 pages, traduite en 1 à 10 locales, avec environ 30 Ko de texte par page.

![Fuite de contenu théorique selon l'architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

Le contenu centralisé avec imports statiques augmente sur les deux axes : 10 pages multipliées par 10 locales représentent 300 Ko de texte sur chaque page. Les imports dynamiques suppriment l'axe des locales. Le scoping supprime l'axe des pages. Seule la combinaison des deux permet de maintenir un payload constant.

Ce n'est pas une propriété intrinsèque de la bibliothèque, mais une question de discipline. `react-i18next` peut être scopé avec des namespaces et des backends asynchrones. `use-intl` peut être découpé par route. Mais rien ne l'impose, et un simple `<Button>` partagé appelant `t("common:cta")` transforme discrètement `common` en une dépendance de chaque route. Le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md) mesure cela sous les termes de « fuite depuis d'autres routes » et « fuite depuis d'autres locales », et c'est de là que provient la majeure partie des écarts entre les bibliothèques.

Si votre réponse à la question 3 était « beaucoup de locales, beaucoup de pages », accordez plus d'importance à cette section qu'à toute préférence d'API. L'article [i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md) approfondit l'impact sur la maintenance de ce même choix.

## Les candidats

La taille des bibliothèques provient du [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) : provider et hook dans un composant vide, après bundling, tree-shaking et minification, pour 10 pages et 10 locales. Le contenu est mesuré séparément.

| Bibliothèque            | Vague        | Modèle de contenu                              | Typage des clés                 | Format de message              | Taille de la bibliothèque |
| :---------------------- | :----------- | :--------------------------------------------- | :------------------------------ | :----------------------------- | :------------------------ |
| `react-i18next`         | Runtime      | JSON centralisé, namespaces                    | Optionnel (`CustomTypeOptions`) | i18next (pluriels par suffixe) | ~18.4 ko                  |
| `react-intl` (FormatJS) | Runtime      | JSON centralisé, ICU                           | Optionnel (extraction + union)  | ICU                            | ~15.3 ko                  |
| `use-intl`              | Server-first | JSON centralisé, ICU                           | Optionnel (declaration merging) | ICU                            | ~14.1 ko                  |
| `@tolgee/react`         | Runtime      | Centralisé, édition in-context                 | Non                             | ICU                            | ~11.1 ko                  |
| Lingui                  | Macro        | Texte source dans le code, catalogues compilés | Bon, via le compilateur         | ICU via macros                 | Légère                    |
| Paraglide               | Compilateur  | Projet inlang, fonctions générées              | Généré                          | Propriétaire                   | Proche de zéro            |
| Intlayer                | Compilateur  | `.content.ts` par composant                    | Généré, actif par défaut        | Helpers (`plural`, `enu`)      | Référence                 |

> Les chiffres correspondent à un instantané basé sur les versions du benchmark et évoluent au fil des publications. Exécutez le benchmark sur votre propre application avant de vous décider uniquement sur la taille.

Deux éléments que le tableau ne montre pas. `Paraglide` n'embarque presque aucune bibliothèque car il génère du code directement dans votre codebase, ce qui implique une étape de régénération avant chaque commit et de potentiels conflits de fusion sur les fichiers générés. De son côté, `Intlayer` nécessite un plugin de bundler (`vite-intlayer` ou équivalent), et ne peut donc pas fonctionner dans une configuration sans étape de build.

## Associer vos réponses à une bibliothèque

<AccordionGroup>
<Accordion header="Prototype, petite équipe, peu de locales">

Choisissez la solution la plus simple qui fonctionne sans surinvestir. `react-i18next` avec un seul fichier JSON par locale convient très bien, et dix ans de réponses sur Stack Overflow vous feront gagner du temps. Ignorez les namespaces tant que vous n'en avez pas besoin. Si le prototype devient un produit, prévoyez une migration vers un contenu scopé ; l'[adaptateur de compatibilité react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-i18next.md) permet de le faire de manière incrémentale.

</Accordion>
<Accordion header="Les traductions proviennent d'une agence ou d'un TMS utilisant ICU">

Le format de votre catalogue est imposé. `react-intl` gère nativement ICU et l'outillage d'extraction FormatJS est conçu pour ce pipeline. `use-intl` lit également ICU. `react-i18next` nécessite le plugin ICU et ses propres clés de pluriel dans le cas contraire. Le support ICU d'Intlayer est encore partiel, donc si vous recevez des chaînes ICU aujourd'hui, considérez cela comme bloquant jusqu'à son intégration complète.

</Accordion>
<Accordion header="Grande application, nombreuses routes, budget de bundle strict">

Privilégiez le contenu scopé et le chargement dynamique par défaut, plutôt que par simple convention. `Lingui` et `Paraglide` y parviennent grâce à la compilation. Intlayer y parvient grâce aux déclarations par composant, et le compilateur n'embarque que ce qu'une route affiche. Avec `react-i18next` ou `use-intl`, planifiez la stratégie de namespaces et de lazy loading dès le premier jour et faites-la respecter en revue de code, car l'outillage ne le fera pas à votre place.

</Accordion>
<Accordion header="La sûreté de typage n'est pas négociable">

Toutes les bibliothèques basées sur des clés peuvent être typées, mais presque aucune ne l'est par défaut. Si vous ne souhaitez pas maintenir du declaration merging devant survivre aux namespaces chargés paresseusement, choisissez une bibliothèque où les types sont générés à partir du contenu : `Lingui`, `Paraglide` ou Intlayer. L'article sur la [détection des traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md) compare ce que chacune détecte au moment du build.

</Accordion>
<Accordion header="Beaucoup de contenu riche : markdown, liens dans les phrases, composants par locale">

Les nœuds riches sont l'endroit où le modèle de `t()` renvoyant une simple chaîne de caractères montre ses limites. `react-i18next` et `Lingui` utilisent `<Trans>`, `react-intl` utilise des balises de texte riche, des approches toutes plus verbeuses que pour de simples chaînes. Les nœuds de contenu d'Intlayer acceptent directement du JSX, du markdown et des objets imbriqués, ce qui est bien plus adapté lorsque le contenu dépasse de simples libellés d'interface.

</Accordion>
<Accordion header="Les traductions seront produites par l'IA et revues par les développeurs">

Un JSON centralisé n'est alors plus obligatoire, puisqu'il n'y a pas de TMS externe vers lequel importer les données. Un contenu colocalisé associé à une CLI qui complète les locales manquantes est la voie la plus directe. La commande `fill` d'Intlayer s'exécute avec votre propre clé d'API (OpenAI, Anthropic, Mistral, Gemini) et ne traduit que ce qui a été modifié. Paraglide et Tolgee proposent des équivalents hébergés avec leurs propres forfaits.

</Accordion>
<Accordion header="Vous pourriez migrer vers Next.js App Router plus tard">

Le contexte React ne traverse pas la frontière client/serveur. Les bibliothèques basées uniquement sur un hook client (`react-i18next`, `react-intl`) nécessiteront une API serveur parallèle dès que vous adopterez les RSC. `use-intl` (via `next-intl`) et Intlayer (via `next-intlayer`) intègrent déjà cette distinction. Consultez l'article sur [l'i18n avec Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/nextjs.md) avant d'uniformiser un pattern.

</Accordion>
</AccordionGroup>

## Les limites de chaque bibliothèque

Des limites en toute transparence, car chaque option en présente.

- **`react-i18next`** : la plus lourde de l'ensemble, format de pluriel propriétaire, typage à configurer et maintenir soi-même, accumulation silencieuse de clés mortes.
- **`react-intl`** : DX verbeuse (`useIntl()` puis `formatMessage({ id })`), instance globale liée à de nombreux nœuds.
- **`use-intl`** : simple pour débuter, complexe à optimiser. Les namespaces, le chargement dynamique et le typage combinés ralentissent nettement le développement.
- **`Lingui`** : étape de build supplémentaire (`extract` / `compile`), plusieurs syntaxes concurrentes (`t()`, template taggé, `i18n.t()`, `<Trans>`) qui créent de la confusion tant pour les humains que pour les assistants IA.
- **`Paraglide`** : fichiers générés dans la codebase, le tree-shaking n'a pas été effectif lors du benchmark React, et la locale est lue depuis le storage sur chaque nœud plutôt qu'à partir d'un store.
- **`Tolgee`** : aucun typage des clés, intégration plus difficile, l'édition in-context est son principal atout commercial.
- **`Intlayer`** : plugin de build obligatoire, écosystème plus restreint, support partiel d'ICU, contenu réparti dans la codebase par conception nécessitant un outillage pour exporter un JSON unique à un traducteur.
- **`gt-react`, `lingo.dev`** : non recommandés dans le benchmark : erreurs de quota lors du build, verrouillage propriétaire (vendor lock-in), et problèmes de réactivité nécessitant de forcer le re-rendu du provider.

## À quoi ressemble chaque option en code

Le même composant, un récapitulatif de panier avec un titre et un pluriel, écrit avec chaque candidat. L'aspect intéressant n'est pas le composant lui-même, mais l'endroit où réside le contenu et les informations dont dispose le vérificateur de types.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Les pluriels sont des clés suffixées résolues via `Intl.PluralRules`. `t` a pour signature `(key: string) => string` sauf si vous déclarez `CustomTypeOptions`, ce qui fait que `t("titel")` compile sans erreur.

  </Tab>
  <Tab label="react-intl" value="react-intl">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

ICU de bout en bout, ce que la plupart des plateformes TMS exportent. Les types sur `id` proviennent de l'étape d'extraction `formatjs` et d'une union générée, et non d'un comportement par défaut.

  </Tab>
  <Tab label="use-intl" value="use-intl">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Même structure que `next-intl` sans les liaisons spécifiques à Next.js. Les clés sont typées une fois que vous étendez `AppConfig` avec le type des messages ; la séparation des namespaces reste à votre charge.

  </Tab>
  <Tab label="Lingui" value="lingui">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

La langue source réside dans le composant ; les autres locales se trouvent dans des fichiers `.po` sous des identifiants hachés après l'exécution de `lingui extract`. Oublier `extract` ou `compile` bascule silencieusement vers l'anglais.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

Chaque message est une fonction générée et typée, de sorte qu'une clé manquante se traduit par une erreur d'import. Le dossier `paraglide/` est généré dans votre dépôt et régénéré à chaque modification.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

Toutes les locales dans un seul fichier à côté du composant. Les types sont générés au build, ce qui permet à `title` d'être autocomplété et à une faute de frappe de faire échouer `tsc` sans recourir au declaration merging. Supprimer le dossier supprime également les chaînes associées.

  </Tab>
</Tabs>

Vous utilisez déjà `react-i18next`, `react-intl` ou `Lingui` ? Les adaptateurs de compatibilité ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md)) créent des alias d'imports au niveau du bundler pour que l'API existante continue de fonctionner pendant votre migration composant par composant. Le [guide de migration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-i18next_to_intlayer.md) couvre le reste.

## Avant de faire votre choix

Un tableau de fonctionnalités indique ce qu'une bibliothèque propose aujourd'hui. Les points suivants expliquent ce que sera son utilisation au quotidien.

**Vérifiez l'activité du dépôt.**

Commits, temps de réponse sur les issues et date de la dernière version mineure. Une architecture solide sans mainteneur est une future migration programmée.

**Ne choisissez pas selon les téléchargements npm.**

La bibliothèque la plus installée est celle qui est sortie en premier, pas nécessairement celle qui convient à une codebase React en 2026. Les téléchargements mesurent l'antériorité, pas la pertinence.

![Classement des bibliothèques i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Demandez-vous qui finance le mainteneur et ce qu'il vend.**

`i18next` est soutenu par Locize. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` et Lingui sont soutenus par Crowdin. Tolgee, Paraglide (inlang) et Intlayer exploitent chacun leur propre plateforme. Un fournisseur dont le modèle économique repose sur l'hébergement des traductions a peu d'intérêt à rendre la traduction gratuite au sein de votre chaîne d'outils. Intlayer est le seul du groupe à intégrer la traduction par IA via la CLI avec votre propre clé d'API, ainsi qu'un CMS auto-hébergeable.

**Est-elle prête pour les agents IA ?**

Les agents rencontrent encore des difficultés avec l'i18n : ils oublient des locales, inventent des clés et mélangent les syntaxes de messages. La bibliothèque fournit-elle des [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md) ou un [serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md) afin que l'agent puisse lister, compléter et tester le contenu ? Et le chargement du contenu est-il optimisé par défaut, ou bien quelqu'un doit-il auditer les namespaces et les imports asynchrones chaque trimestre ?

**Sûreté de typage prête à l'emploi.**

Pas simplement « peut être typé avec une configuration supplémentaire », mais « une clé invalide fait échouer `tsc` dès l'installation initiale ». Vérifiez le comportement en cas de clé inexistante et lorsqu'une locale omet une traduction.

**Détection du contenu inutilisé.**

Les catalogues ne font que grossir. Le build d'Intlayer purge les champs inutilisés et les consigne dans les logs (`build.purge`). Paraglide y parvient par son architecture, puisqu'une fonction de message non appelée est éliminée par tree-shaking. Toutes les autres solutions vous laissent gérer ce nettoyage manuellement.

**Expérience développeur.**

Temps de configuration avant la première chaîne traduite, présence d'un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md) ou d'une [extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md) affichant la traduction au survol et permettant d'accéder à la déclaration, une [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md) pour compléter (fill), tester et publier (push), et un moyen pour les non-développeurs d'éditer le contenu ([éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)) sans passer par une pull request.

## Foire aux questions

<FAQ>

<Question title="react-i18next reste-t-il un bon choix par défaut en 2026 ?">

Oui pour la plupart des équipes. Il dispose du plus vaste écosystème et du plus grand nombre de ressources en ligne. Ses inconvénients sont réels mais prévisibles : le runtime le plus lourd, un format de pluriel propriétaire, ainsi qu'une sûreté de typage et un scoping que vous devez configurer et maintenir vous-même.

</Question>

<Question title="Ai-je besoin d'une bibliothèque basée sur un compilateur ?">

Uniquement si la taille du bundle, les types générés ou les vérifications de clés manquantes à la compilation font partie de vos exigences. Pour une petite application avec deux locales, une bibliothèque au runtime est plus simple. L'article [compilateur vs i18n déclarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md) détaille les avantages des compilateurs et leurs pièges potentiels.

</Question>

<Question title="Puis-je changer de bibliothèque plus tard sans réécrire chaque composant ?">

Partiellement. Les bibliothèques basées sur des clés partagent une structure suffisamment proche pour qu'un adaptateur de compatibilité puisse faire correspondre une API à une autre, ce qui correspond au fonctionnement des adaptateurs Intlayer. Les formats de messages (ICU vs i18next vs helpers) ne se convertissent pas automatiquement, les pluriels et l'interpolation constituent donc la partie que vous devrez adapter.

</Question>

<Question title="Le choix de la bibliothèque influence-t-il le SEO ?">

Indirectement. Ce que voient les moteurs de recherche dépend du routage, des balises `hreflang`, de `<html lang>` et de la présence du texte dans le HTML rendu côté serveur. Certaines bibliothèques fournissent des helpers dédiés, la plupart vous laissent gérer cela. Consultez le [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Pour aller plus loin

- [Benchmark des bibliothèques i18n : bundle size, fuites et temps de basculement de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md) et le [rapport TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md)
- [React i18n : fonctionnement du modèle provider et ses coûts](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/react.md)
- [react-i18next vs react-intl vs Intlayer, fonctionnalité par fonctionnalité](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md)
- [L'histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md)
- [Compilateur vs i18n déclarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md)
- [i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md)
- [Comment fonctionne l'optimisation de bundle au moment du build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md)
- [Configurer l'i18n dans une application Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)
- Même guide pour [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_svelte_i18n_library.md) et [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_solid_i18n_library.md)
