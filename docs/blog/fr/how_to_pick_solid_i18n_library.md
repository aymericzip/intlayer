---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "Comment choisir la bonne bibliothèque i18n pour Solid en 2026"
description: Un guide de décision pour l'internationalisation avec SolidJS et SolidStart. Les questions à se poser avant de comparer @solid-primitives/i18n, solid-i18next, Paraglide, Lingui et Intlayer, et ce que chaque choix implique en réactivité, bundle size et typage.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internationalisation
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - comparaison bibliothèques i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Comment choisir la bonne bibliothèque i18n pour Solid

Le modèle de réactivité de Solid change la donne pour les bibliothèques i18n. Les composants ne s'exécutent qu'une seule fois, ce qui signifie qu'une traduction stockée dans une `const` au setup devient une chaîne figée. Une bibliothèque qui fournit des chaînes au lieu d'accessors produira une page où la langue change partout, sauf dans les trois composants où cette erreur a été commise. Choisir une bibliothèque pour Solid est donc autant une question d'API que de savoir laquelle rend cette erreur difficile à commettre.

Ce guide liste les questions à se poser en premier, puis les applique à `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` et Intlayer, aussi bien pour Vite + Solid que pour SolidStart.

![Écosystème des bibliothèques i18n pour Solid](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Table of Contents

<TOC/>

## Six questions à se poser avant de comparer les bibliothèques

1. **SPA Vite ou SolidStart ?** Dans une SPA, la locale peut simplement résider dans un signal. Sur SolidStart, la locale doit être résolue sur le serveur à partir de l'URL, et tout ce qu'un crawler doit voir sans JavaScript (`<html lang>`, `hreflang`) doit se trouver dans `entry-server.tsx`.
2. **À quel point le changement de locale doit-il être réactif ?** Un rechargement complet de la page lors du changement de langue est acceptable pour certaines applications. Si ce n'est pas le cas, les valeurs de la bibliothèque doivent être des signals ou des accessors, et leur lecture doit être trackée, non copiée.
3. **Qui rédige les traductions ?** Les développeurs, un TMS, une agence fournissant des fichiers ICU, ou un pipeline IA. `solid-i18next` utilise le format d'i18next. `@solid-primitives/i18n` s'adapte à la structure de votre objet dictionnaire. Choisissez en fonction de vos intervenants.
4. **Combien de locales et de pages ?** Deux locales et cinq pages peuvent tout embarquer dans le bundle. Dix locales et quarante routes ne le peuvent pas, et les catalogues lazy combinés au scoping deviennent le coût principal.
5. **Avez-vous besoin du typage sur les clés ?** `@solid-primitives/i18n` les infère depuis le dictionnaire source. `solid-i18next` nécessite une déclaration manuelle. Les bibliothèques basées sur la compilation les génèrent automatiquement.
6. **De quelles fonctionnalités avez-vous besoin ?** Gestion des cookies, routing avec préfixe de locale, redirections, formateurs. L'option la plus légère n'en propose aucune, ce qui convient parfaitement jusqu'à ce que le besoin se fasse sentir.

Notez vos réponses. Tout ce qui suit y fait référence.

## Le paysage en une image

Solid est le plus jeune des écosystèmes et compte le moins d'options, réparties sur trois vagues.

![Histoire des bibliothèques i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Dictionnaires au runtime : solid-i18next">

i18next adapté pour Solid. Namespaces, backends, détecteurs et dix ans de plugins. La plus lourde du groupe, avec les mêmes coûts d'évaluation de `t("a.b")` que dans React.

</Accordion>
<Accordion header="Primitives minimales (2022) : @solid-primitives/i18n">

Un dictionnaire plat dont vous avez la charge, une fonction `translator()` qui retourne des accessors, et des types inférés depuis l'objet source. Très léger, sans scoping, sans routing ni formateurs. Le choix par défaut de la communauté.

</Accordion>
<Accordion header="Compilateur et contenu colocalisé (2024 à 2026) : Paraglide, Intlayer, @lingui/solid">

Paraglide génère une fonction par message. Intlayer déclare le contenu par composant dans des fichiers `.content.ts` et retourne des nœuds adossés à des signals. L'intégration Solid de Lingui, arrivée en 2026, apporte son extraction basée sur des macros.

</Accordion>
</AccordionGroup>

L'[histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md) détaille chaque vague en profondeur.

## La décision la plus importante : où vit le contenu et quand il se charge

Deux choix structurels expliquent la majeure partie des différences de taille de bundle entre les configurations :

- **Contenu centralisé ou scopé.** Un seul dictionnaire pour toute l'application, ou une déclaration par composant.
- **Import statique ou dynamique.** Tout charger au démarrage, ou récupérer la locale active (et idéalement la route active) à la demande.

Le graphique ci-dessous estime le payload pour une application théorique de 1 à 10 pages, traduite en 1 à 10 locales, avec environ 30 Ko de texte par page.

![Fuite de contenu théorique selon l'architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` ne gère aucun de ces deux axes par défaut : vous créez une ressource avec `createResource` pour charger un dictionnaire par locale, ce qui vous donne un chargement dynamique, et le reste est à votre charge. `solid-i18next` dispose de namespaces et de backends asynchrones, mais rien n'impose le découpage, de sorte qu'un composant partagé important `common` en fait une dépendance de chaque route. Paraglide gère l'axe des pages via le tree-shaking, bien que cela n'ait pas pris effet dans l'implémentation du [benchmark Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/solid.md). Intlayer gère cela grâce aux déclarations par composant.

Si votre réponse à la question 4 était « beaucoup de pages », accordez plus d'importance à cette section qu'à toute préférence d'API. L'article [i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md) traite de la maintenance liée à ce même arbitrage.

## Les candidats

La taille des bibliothèques provient du [benchmark Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/solid.md) : provider plus accessor dans un composant vide, après bundling, tree-shaking et minification, sur une application de 10 pages et 10 locales. Le contenu est mesuré séparément.

| Bibliothèque             | Modèle de contenu                              | Réactivité au changement de locale                         | Sûreté des types                           | Scoping et lazy loading       | Taille de la bibliothèque                                  |
| :----------------------- | :--------------------------------------------- | :--------------------------------------------------------- | :----------------------------------------- | :---------------------------- | :--------------------------------------------------------- |
| `@solid-primitives/i18n` | Dictionnaire plat géré par vos soins           | Signal, accessors retournés par translator                 | 3/5 — Inféré depuis le dictionnaire source | Aucun intégré                 | ~0,6 ko                                                    |
| `solid-i18next`          | Catalogues et namespaces i18next               | Store, re-render via le provider                           | 2/5 — Déclaration manuelle                 | Namespaces, backends lazy     | ~14,9 ko                                                   |
| Paraglide                | Projet inlang, fonctions générées              | Lecture par appel depuis cookie/storage                    | 3.5/5 — Généré                             | Tree-shaking (hors benchmark) | Proche de zéro (grâce au code généré dans la base de code) |
| `@lingui/solid`          | Texte source dans le code, catalogues compilés | Basé sur des signals                                       | 2/5 — Depuis le compilateur                | Par catalogue                 | ~11,8 ko                                                   |
| Intlayer                 | Un `.content.ts` par composant                 | Nœuds adossés à des signals, pas de re-render du composant | 5/5 — Généré, activé par défaut            | Oui, par composant            | ~4,3 ko                                                    |

> Ces chiffres sont un instantané basé sur les versions du benchmark. La taille de `@lingui/solid` provient du benchmark TanStack Start. Testez sur votre propre application avant de décider uniquement sur la taille.
> Sûreté des types : 5/5 signifie que les clés, les paramètres et chaque locale sont vérifiés sans configuration manuelle, y compris le formateur d'URL et les helpers.

La taille quasi nulle de Paraglide s'explique par sa conception : le runtime est généré directement dans votre dépôt. Intlayer nécessite `vite-intlayer`, il ne peut donc pas fonctionner sans étape de build.

## Associez vos réponses à une bibliothèque

<AccordionGroup>
<Accordion header="SPA Vite, petit catalogue, vous voulez aller au plus simple">

`@solid-primitives/i18n`. Un dictionnaire plat, une fonction `translator()` qui retourne des accessors, des types inférés sans configuration supplémentaire. C'est le bon choix pour une petite application, et lire le code source prend dix minutes. Ce que vous devrez écrire vous-même : la persistance de la locale, le routing, les formateurs et le découpage par route. Si cette liste s'allonge, c'est le signal qu'il faut changer d'approche.

</Accordion>
<Accordion header="Migration depuis React avec une codebase i18next">

`solid-i18next` vous permet de réutiliser vos catalogues, namespaces, backends et détecteurs tels quels. C'est l'option la plus lourde et elle comporte les mêmes inconvénients que `react-i18next` : déclaration manuelle des types, optimisations possibles mais chronophages, et une fonction `t()` qui retourne une chaîne de caractères, rendant le bug de traduction figée facile à introduire. Enveloppez les lectures dans du JSX ou un memo et ne les stockez jamais au setup.

</Accordion>
<Accordion header="SolidStart avec routes préfixées par la locale et SSR">

La locale doit provenir de l'URL sur le serveur pour que les deux côtés soient synchronisés ; la détecter sur le client intervient trop tard. `@solid-primitives/i18n` et `solid-i18next` vous laissent gérer la route `[[locale]]`, les `matchFilters`, la redirection et les balises dans `entry-server.tsx`. Paraglide propose un plugin Vite qui prend en charge le routing. Intlayer fournit le middleware et les helpers de route. Quel que soit votre choix, placez `<html lang>` et `hreflang` dans `entry-server.tsx` ; `@solidjs/meta` s'applique côté client après l'hydratation dans SolidStart v2. L'[article sur l'i18n avec Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/solid.md) détaille cette configuration.

</Accordion>
<Accordion header="Le changement de locale doit être instantané et granulaire">

Choisissez une bibliothèque dont les valeurs sont des signals ou des accessors et dont les lectures sont trackées. Les accessors de `@solid-primitives/i18n` et les nœuds d'Intlayer mettent à jour uniquement les nœuds du DOM qui les lisent, sans réexécuter le composant. `solid-i18next` effectue un re-render via le provider. Paraglide lit la locale depuis les cookies ou le storage à chaque appel de message plutôt qu'à partir d'un signal, ce qui fonctionne mais effectue plus de travail par nœud que nécessaire.

</Accordion>
<Accordion header="Grande application, nombreuses routes, budget de bundle strict">

Contenu scopé compilé au build. Intlayer ne livre que ce qu'une route affiche. Paraglide devrait y parvenir via le tree-shaking ; vérifiez-le dans votre configuration, car ce n'était pas le cas dans celle du benchmark. Avec `solid-i18next`, prévoyez la stratégie de namespaces et de lazy loading dès le premier jour et faites-la respecter lors des revues de code.

</Accordion>
<Accordion header="La sécurité du typage est non négociable">

`@solid-primitives/i18n` offre l'inférence de types gratuitement, ce qui est déjà plus que ce que proposent la plupart des bibliothèques React. Pour des types générés qui survivent au lazy loading et au découpage par route, Paraglide, `@lingui/solid` et Intlayer les produisent tous à partir du contenu. L'article sur la [détection des traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md) compare ce que chaque solution détecte au moment du build.

</Accordion>
<Accordion header="Les traductions seront produites par l'IA">

Dans ce cas, un dictionnaire centralisé n'a plus de raison d'être. Du contenu colocalisé combiné à une CLI qui complète les locales manquantes représente la voie la plus directe. La commande `fill` d'Intlayer fonctionne avec votre propre clé d'API (OpenAI, Anthropic, Mistral, Gemini) et ne retraduit que ce qui a changé.

</Accordion>
</AccordionGroup>

## Les limites de chaque bibliothèque

- **`@solid-primitives/i18n`** : pas de lazy loading ni de scoping au-delà de ce que vous construisez, pas de routing, pas de gestion des cookies, pas de formateurs. Excellent pour les petites applications, rapidement limité pour les projets d'envergure professionnelle.
- **`solid-i18next`** : la plus lourde du groupe, typage manuel, format de pluriel propre, et `t()` retourne une chaîne de caractères, ce qui fige les traductions si elles sont stockées au setup.
- **Paraglide** : fichiers générés commités dans le dépôt et régénérés avant chaque push, le tree-shaking n'a pas fonctionné dans le benchmark Solid, et la locale est lue dans le storage à chaque appel plutôt que depuis un signal.
- **`@lingui/solid`** : récente (2026), donc peu de retours d'expérience en production pour l'instant. Hérite de l'étape de build `extract` / `compile` de Lingui et de ses syntaxes multiples qui se chevauchent.
- **Intlayer** : plugin de build obligatoire, écosystème plus restreint, support ICU partiel, et contenu réparti dans la codebase par conception, ce qui nécessite des outils pour exporter un JSON unique destiné à un traducteur externe.

## Ce que chaque option donne en code

Le même composant, un récapitulatif de panier avec un titre et un pluriel, écrit avec chaque candidat. Observez l'endroit où la traduction est lue : dans le JSX, elle est trackée ; dans le corps du setup, c'est une chaîne figée.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

  <Tabs group="locale">
  <Tab value="en" label="Anglais">

```ts fileName="src/i18n/en.ts"
export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export type Dict = typeof en;
```

  </Tab>
  <Tab value="fr" label="Français">

```ts fileName="src/i18n/fr.ts"
import type { Dict } from "./en";

export const fr: Dict = {
  cart: { title: "Votre panier", items: "{{ count }} articles" },
};
```

  </Tab>
  <Tab value="es" label="Espagnol">

```ts fileName="src/i18n/es.ts"
import type { Dict } from "./en";

export const es: Dict = {
  cart: { title: "Tu carrito", items: "{{ count }} artículos" },
};
```

  </Tab>
  </Tabs>

```ts fileName="src/i18n/index.ts"
import { createSignal } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type Locale = "en" | "fr" | "es";

const dictionaries = {
  en: i18n.flatten(en),
  fr: i18n.flatten(fr),
  es: i18n.flatten(es),
};

export const [locale, setLocale] = createSignal<Locale>("en");
export const dictionary = () => dictionaries[locale()];
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Les clés sont typées à partir de l'objet anglais sans génération de code. Il n'y a pas de règle de pluriel, pas de lazy loading et pas de routing ; chacun de ces éléments est à votre charge.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

  <Tabs group="locale">
  <Tab value="en" label="Anglais">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Français">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="Espagnol">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Les catalogues, namespaces et plugins i18next tels quels. `t` retourne une chaîne de caractères, donc `const title = t("cart:title")` au setup la fige ; conservez l'appel à l'intérieur du JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Anglais">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Français">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Espagnol">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Chaque message est une fonction générée et typée. La locale est lue depuis un cookie ou le storage à chaque appel plutôt que depuis un signal, la réactivité lors du changement de langue est donc à implémenter vous-même.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ fr: "Votre panier", en: "Your cart", es: "Tu carrito" }),
    items: plural({
      one: t({ fr: "{{count}} article", en: "{{count}} item" }),
      other: t({ fr: "{{count}} articles", en: "{{count}} items" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Toutes les locales dans un seul fichier à côté du composant. `useIntlayer` retourne des nœuds adossés à des signals, ainsi un changement de locale ne met à jour que les nœuds du DOM qui les lisent. `{content.title}` dans le JSX est tracké ; `content.title.value` dans le corps du setup ne l'est pas.

  </Tab>
</Tabs>

Sur une codebase i18next existante, l'[adaptateur de compatibilité i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18next.md) crée un alias pour le package au niveau du bundler afin que les catalogues et `t()` continuent de fonctionner pendant qu'Intlayer sert le contenu, et le [guide de migration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md) couvre le reste.

## Avant de vous engager

Un tableau de fonctionnalités vous indique ce qu'une bibliothèque fait aujourd'hui. Ces points vous montrent ce que sera son utilisation au quotidien.

**Vérifiez l'activité du dépôt.**

Les commits, le délai de réponse aux issues, et si la dernière version mineure date de cette année. Une conception solide sans mainteneur est une migration en attente.

**Ne choisissez pas en fonction des téléchargements npm.**

La bibliothèque la plus installée est celle qui est sortie en premier, pas celle qui convient à une codebase Solid en 2026. Les téléchargements mesurent l'historique, pas l'adéquation à vos besoins.

![Classement par tier des bibliothèques i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Renseignez-vous sur qui finance le mainteneur, et ce qu'il vend.**

`i18next` (derrière `solid-i18next`) est soutenu par Locize. `next-intl`, `vue-i18n`, `svelte-i18n` et Lingui sont soutenus par Crowdin. Tolgee, Paraglide (inlang) et Intlayer exploitent chacun leur propre plateforme. Un éditeur dont les revenus reposent sur l'hébergement de traductions a peu d'intérêt à rendre la traduction gratuite au sein de votre chaîne d'outils. Intlayer est le seul du groupe à proposer la traduction par IA via la CLI avec votre propre clé d'API, ainsi qu'un CMS auto-hébergeable.

**Est-ce prêt pour les agents IA ?**

Les agents rencontrent encore des difficultés avec l'i18n : ils oublient des locales, inventent des clés et mélangent les syntaxes de messages. La bibliothèque propose-t-elle des [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md) ou un [serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md) pour que l'agent puisse lister, compléter et tester le contenu ? Et le chargement du contenu est-il optimisé par défaut, ou faut-il revoir les namespaces et les imports lazy chaque trimestre ?

**Sécurité du typage prête à l'emploi.**

Pas un simple « peut être typé avec de la configuration supplémentaire », mais « une clé erronée fait échouer `tsc` sur une installation neuve ». Vérifiez ce qui se passe avec une clé inexistante et avec une locale à laquelle il manque une traduction.

**Détection du contenu inutilisé.**

Les catalogues ne font que grossir. Le build d'Intlayer purge les champs inutilisés et les consigne (`build.purge`). Paraglide y parvient par son architecture, puisqu'une fonction de message non appelée est éliminée par le tree-shaking. Toutes les autres options vous laissent gérer ce nettoyage vous-même.

**Expérience développeur (DX).**

Le temps de configuration jusqu'à la première chaîne traduite, un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md) ou une [extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md) qui affiche la traduction au survol et redirige vers la déclaration, une [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md) pour compléter, tester et synchroniser (push), un [compilateur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) ou extracteur qui extrait les chaînes codées en dur de vos composants pour ne pas tout gérer clé par clé, et un moyen pour les non-développeurs d'éditer le contenu ([éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)) sans pull request.

## Foire aux questions

<FAQ>

<Question title="Est-ce que @solid-primitives/i18n suffit pour une application en production ?">

Pour une petite application, oui, et c'est l'option la plus légère disponible. Elle cesse de suffire dès lors que vous avez besoin de catalogues lazy par route, de routing par locale sur SolidStart, de persistance par cookie ou de formateurs, car tout cela sera à votre charge.

</Question>

<Question title="Pourquoi ma traduction ne se met-elle pas à jour lors du changement de locale ?">

Parce que les composants Solid ne s'exécutent qu'une seule fois. Une traduction lue dans une `const` au setup est une simple chaîne de caractères, pas une souscription. Lisez-la dans le JSX, dans un effect ou dans un memo, ou optez pour une bibliothèque dont les valeurs sont des accessors afin que la mauvaise syntaxe soit plus difficile à écrire.

</Question>

<Question title="Ai-je besoin d'une bibliothèque basée sur un compilateur ?">

Uniquement si la taille du bundle, les types générés ou la vérification des clés manquantes au build sont de véritables exigences. L'article [compilateur vs i18n déclarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md) explique ce que les compilateurs apportent et leurs limites potentielles.

</Question>

<Question title="Le choix de la bibliothèque influence-t-il le SEO ?">

Indirectement. Les robots d'indexation s'intéressent au routing, au `hreflang`, au `<html lang>` et au fait que le texte soit présent dans le HTML rendu par le serveur, ce qui sur SolidStart implique `entry-server.tsx`. Consultez le [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Pour aller plus loin

- [Benchmark i18n Solid : taille de bundle, fuites et temps de bascule de locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/solid.md)
- [Solid i18n : pourquoi les traductions se figent lors du changement de locale](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/list_i18n_technologies/frameworks/solid.md)
- [Adaptateur de compatibilité i18next clé en main](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18next.md) et le [guide de migration depuis i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md)
- [L'histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md)
- [Compilateur vs i18n déclarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md)
- [i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md)
- [Comment fonctionne l'optimisation de bundle au moment du build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md)
- [Configurer l'i18n dans une application Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+solid.md) et dans une [application SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_solid_start.md)
- Même guide pour [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_vue_i18n_library.md) et [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_svelte_i18n_library.md)
