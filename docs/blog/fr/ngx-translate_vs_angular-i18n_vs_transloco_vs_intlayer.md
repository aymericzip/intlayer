---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco ou Intlayer ? Comparez les bibliothèques i18n Angular : changement de langue à l'exécution, typage, lazy loading, pluriels et SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - internationalisation angular
  - ngx-translate vs transloco
  - Intlayer
  - comparaison bibliothèques i18n
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular est le seul grand framework à fournir son propre i18n, et il prend le contre-pied des bibliothèques construites par la communauté autour de lui. `@angular/localize` traduit au moment du build et produit une application par langue. `ngx-translate` et Transloco traduisent à l'exécution à partir de fichiers JSON. Intlayer compile le contenu au build mais conserve une seule application qui change de langue à l'exécution.

Cet article compare les quatre sur ce qui décide du choix en pratique : comment la langue change, où vit le contenu, ce que le compilateur détecte et ce qui est chargé dans le navigateur.

## Table des matières

<TOC/>

## En bref

- **`@angular/localize`** (Angular i18n) : aucun coût à l'exécution et ICU natif, mais un build et un déploiement par locale, et changer de langue recharge l'application.
- **`ngx-translate`** : l'option runtime la plus ancienne et la plus simple. Un fichier JSON par locale chargé en HTTP, des clés non typées, les pluriels via un plugin.
- **Transloco** : l'option runtime pensée pour les applications plus grandes. Les scopes chargent les traductions par fonctionnalité, et un écosystème de plugins couvre ICU, le formatage par locale et l'extraction des clés.
- **Intlayer** : contenu déclaré à côté de chaque composant, typé au build, découpé par composant et par locale, avec changement de langue à l'exécution. Nécessite un builder esbuild personnalisé.

> Pour comprendre d'où vient chaque bibliothèque, lisez l'[histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md).

- [histoire de l'i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md)

## Build ou runtime : la décision qui divise le terrain

**`@angular/localize`** intègre les traductions directement dans les templates compilés. `ng build --localize` produit `dist/app/en`, `dist/app/fr`, etc., chacun ne contenant que sa propre langue. Rien n'est téléchargé et rien n'est interprété à l'exécution, ce qui en fait l'option la plus rapide une fois chargée. Le coût est opérationnel : N builds à tester, N dossiers à déployer, une règle serveur ou CDN pour router `/fr/` vers le bon, et un rechargement complet de la page quand l'utilisateur change de langue. `ng serve` ne sert aussi qu'une seule locale à la fois.

**`ngx-translate` et Transloco** conservent un seul build. Un service télécharge `fr.json` quand la locale change et chaque pipe ou directive se met à jour. Le changement est instantané, mais le premier rendu attend la requête HTTP, les clés sont de simples chaînes, et avec le SSR le loader doit aussi fonctionner côté serveur (URLs absolues ou loader sur système de fichiers, plus `TransferState` pour éviter de télécharger deux fois).

**Intlayer** conserve aussi un seul build, mais le contenu est compilé dans le bundle au lieu d'être téléchargé sous forme de JSON brut. `useIntlayer()` renvoie un Signal, donc un changement de locale met à jour les composants qui le lisent, sans rechargement.

Un détail d'Angular est facile à manquer avec les bibliothèques runtime : `DatePipe`, `CurrencyPipe` et `DecimalPipe` lisent `LOCALE_ID`, qui est fixé au bootstrap. Changer de langue avec `ngx-translate` ne change donc pas le format des dates et des prix. Transloco le résout avec `@jsverse/transloco-locale`, Intlayer avec `useDate`, `useNumber` et `useCurrency` qui suivent la locale active. `@angular/localize` n'a pas ce problème, puisque chaque build a son propre `LOCALE_ID`. Le [guide du formatage des dates, heures et nombres](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/date_time_number_formatting_locales.md) couvre le côté `Intl`.

- [guide du formatage des dates, heures et nombres](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/date_time_number_formatting_locales.md)

## Comparatif des fonctionnalités

|                              | `@angular/localize`                                             | `ngx-translate`                                    | Transloco                                              | Intlayer                                                                   |
| :--------------------------- | :-------------------------------------------------------------- | :------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------- |
| **Traduction appliquée**     | Au build, intégrée                                              | À l'exécution                                      | À l'exécution                                          | Compilée au build, résolue à l'exécution                                   |
| **Builds par release**       | Un par locale                                                   | Un                                                 | Un                                                     | Un                                                                         |
| **Changement de langue**     | Rechargement vers un autre build                                | Instantané                                         | Instantané                                             | Instantané                                                                 |
| **Où vit le contenu**        | Texte source dans les templates, traductions en XLIFF/JSON      | Un JSON par locale                                 | Un JSON par locale, plus un par scope                  | `.content.ts` (ou JSON) à côté de chaque composant, ou centralisé          |
| **Pluriels / ICU**           | ✅ ICU natif dans les templates                                 | ⚠️ Plugin (`ngx-translate-messageformat-compiler`) | ⚠️ Plugin (`@jsverse/transloco-messageformat`)         | ✅ `plural()` avec règles CLDR, ⚠️ chaînes ICU partielles                  |
| **Clés typées**              | Sans objet, le texte source est le message                      | ❌ Non                                             | ❌ Non, Keys Manager trouve les clés manquantes en CLI | ✅ Générées, une mauvaise clé fait échouer `ng build`                      |
| **Traductions manquantes**   | Avertissement au build, ou erreur avec `i18nMissingTranslation` | Affiche la clé brute à l'exécution                 | Langue de repli à l'exécution, vérification en CLI     | Signalées par TypeScript, `intlayer test` en CI                            |
| **Lazy loading**             | Inutile, chaque build contient une seule locale                 | Fichier de locale entier, découpage à la main      | ✅ Par scope (route ou composant)                      | ✅ Par composant et par locale                                             |
| **Signals**                  | Sans objet, le texte est statique                               | Pipe et Observables                                | `translateSignal()`                                    | `useIntlayer()` renvoie un Signal                                          |
| **Configuration du build**   | `ng add @angular/localize`, locales dans `angular.json`         | Aucune                                             | Aucune                                                 | `@angular-builders/custom-esbuild` et un plugin esbuild                    |
| **Workflow des traducteurs** | ✅ XLIFF, le format attendu par les outils TMS                  | JSON                                               | JSON                                                   | `.content.ts`/JSON, plugins de sync, éditeur visuel, remplissage IA en CLI |

Quelques lignes méritent du contexte.

**Les ID de message dans `@angular/localize`.** Sans ID personnalisé (`i18n="@@cartTitle"`), l'ID de chaque message est un hash de son texte source. Corrigez une faute dans le texte anglais et toutes les traductions de ce message deviennent orphelines jusqu'à ce que les traducteurs les refassent. Définissez des ID personnalisés dès le premier jour.

**Découper avec `ngx-translate`.** Le loader par défaut télécharge tout `fr.json`, donc chaque page embarque les chaînes de toutes les autres. On peut découper par fonctionnalité avec un loader personnalisé ou plusieurs instances de `TranslateService`, mais rien ne l'impose. L'article [i18n par composant vs centralisé](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md) détaille ce compromis.

- [i18n par composant vs centralisé](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md)

**Les scopes de Transloco.** Un scope est un dossier de fichiers JSON (`i18n/cart/en.json`) chargé quand une route ou un composant le fournit. C'est ce qui se rapproche le plus du contenu par composant dans les bibliothèques runtime, et cela fonctionne bien tant que les composants partagés ne piochent pas dans le scope d'une autre fonctionnalité.

**Le builder d'Intlayer.** Angular CLI n'expose pas les plugins esbuild, donc Intlayer nécessite `@angular-builders/custom-esbuild` dans `angular.json`. C'est un petit changement, mais c'est un builder tiers à garder aligné avec les mises à jour d'Angular. Le [guide d'installation pour Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_angular_21.md) montre la configuration complète.

- [guide d'installation pour Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_angular_21.md)

## Activité des commits

`@angular/localize` vit dans le monorepo `angular/angular`, son nombre de commits n'est donc pas comparable et n'est pas affiché.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## Téléchargements npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Les téléchargements mesurent l'historique plus que les choix actuels : `ngx-translate` est encore installé dans toutes les applications créées avant l'arrivée de Transloco, et les assistants IA continuent de le suggérer parce qu'il domine le code sur lequel ils ont été entraînés. Transloco est passé de `@ngneat/transloco` à `@jsverse/transloco` en 2024, et l'ancien scope est toujours téléchargé.

## Le même composant avec chaque bibliothèque

Un résumé de panier avec un titre et un pluriel. Le template change à peine, ce qui change, c'est où vivent les chaînes et ce que le compilateur sait à leur sujet.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

Le texte anglais reste dans le template. Les traducteurs travaillent sur le XLIFF extrait, et chaque locale devient son propre build. Les chaînes en TypeScript utilisent le tag `$localize`.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Le pluriel ICU ne fonctionne qu'avec `ngx-translate-messageformat-compiler`, le parseur par défaut ne remplace que `{{count}}`. `"cart.titel"` compile et affiche la clé brute à l'exécution.

  </Tab>
  <Tab label="Transloco" value="transloco">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Le scope `cart` est téléchargé au premier rendu du composant. Les pluriels ICU nécessitent `@jsverse/transloco-messageformat`. Les clés ne sont pas typées, `transloco-keys-manager` signale les clés manquantes et inutilisées.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ fr: "Votre panier", en: "Your cart" }),
    items: t({
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

Toutes les locales sont dans un seul fichier à côté du composant. Les types sont générés au build, donc `content().titel` fait échouer `ng build`, et une locale manquante dans `t()` est signalée dans l'éditeur.

  </Tab>
</Tabs>

## Lequel convient à votre application

<AccordionGroup>
<Accordion header="Site public, peu d'interactions, SEO en priorité">

`@angular/localize`. Chaque locale est un build séparé avec sa propre URL, les pages prérendues sont livrées déjà traduites, et il n'y a aucun runtime i18n à charger. Le coût d'un build par locale est faible quand l'application est surtout du contenu et que les changements de langue sont rares. Associez-le à des balises `hreflang` correctes, voir le [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md).

- [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Dashboard ou SaaS où les utilisateurs changent de langue dans l'application">

Une option runtime. Recharger vers un autre build fait perdre l'état en mémoire, et un menu de langue qui recharge l'application paraît cassé. `ngx-translate` suffit pour une petite application avec deux ou trois locales. Transloco est le choix runtime le plus sûr au-delà d'une douzaine de fonctionnalités, grâce aux scopes.

</Accordion>
<Accordion header="Les traductions viennent d'un TMS ou d'une agence">

`@angular/localize` exporte du XLIFF, que tous les TMS savent lire, et le texte source dans le template donne aux traducteurs un vrai contexte. Le JSON de `ngx-translate` et de Transloco est aussi très bien supporté. Vérifiez que votre prestataire gère les pluriels ICU avant de choisir une bibliothèque runtime, car les deux ont besoin d'un plugin pour cela.

</Accordion>
<Accordion header="Grande application, nombreuses routes lazy, budget de bundle">

Les scopes Transloco ou Intlayer. Les deux évitent d'envoyer les chaînes de chaque fonctionnalité à chaque route. La différence est l'application de la règle : un scope Transloco est une convention, un dictionnaire Intlayer n'est inclus dans le bundle que là où `useIntlayer()` l'importe. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md).

- [optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md)
- [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="Le typage est une exigence">

Seul Intlayer type les clés d'emblée. Avec `ngx-translate` et Transloco, une faute dans une clé compile et apparaît en production sous forme de clé brute. Transloco Keys Manager peut l'attraper en CI, ce qui vaut mieux que rien mais n'équivaut pas à une erreur de compilation. L'article [détecter les traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md) compare les approches.

- [détecter les traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md)

</Accordion>
<Accordion header="Les traductions seront produites par IA">

Un contenu colocalisé et une CLI qui complète les locales manquantes forment le chemin le plus court. La [commande `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) d'Intlayer s'exécute avec votre propre clé d'API et ne retraduit que ce qui a changé. Avec des catalogues XLIFF ou JSON, vous scripterez vous-même la même boucle.

- [commande `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md)

</Accordion>
</AccordionGroup>

## Les limites de chacun

- **`@angular/localize`** : un build et un déploiement par locale, rechargement au changement de langue, des ID hashés qui orphelinent les traductions quand le texte source change, et aucun moyen de charger des traductions depuis un CMS après le build sans astuces au bootstrap.
- **`ngx-translate`** : clés non typées, pluriels et ICU via un plugin, le fichier de locale complet sur chaque page, un pipe impur réévalué à chaque détection de changements, et aucune gestion de `LOCALE_ID` pour les dates et les nombres.
- **Transloco** : clés non typées, ICU via un plugin, et des scopes qui sont une convention plutôt qu'une garantie. Plusieurs plugins à assembler pour ce que `@angular/localize` fournit nativement.
- **Intlayer** : un builder tiers dans `angular.json`, une communauté Angular plus petite que les trois autres, un support ICU partiel, et un contenu réparti dans le codebase par conception, donc exporter un seul fichier pour un traducteur demande le [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) ou la CLI.

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md)

## Migrer depuis ngx-translate

L'[adaptateur de compatibilité `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/ngx-translate.md) conserve `TranslateService`, le pipe `translate` et la directive `[translate]` fonctionnels pendant qu'Intlayer sert le contenu, ce qui permet de migrer les templates un par un. Le [guide de migration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_ngx-translate_to_intlayer.md) l'explique pas à pas. Pour Transloco ou `@angular/localize`, le [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) peut garder les catalogues JSON existants comme source de vérité pendant la migration.

- [adaptateur de compatibilité `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/ngx-translate.md)
- [guide de migration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_ngx-translate_to_intlayer.md)
- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md)

## Foire aux questions

<FAQ>

<Question title="ngx-translate est-il toujours maintenu ?">

Oui. Après des années de faible activité, le projet a reçu un nouveau mainteneur en 2024 et a depuis publié des API standalone comme `provideTranslateService`. Sa conception n'a pas changé : JSON à l'exécution, clés en chaînes, pluriels via un plugin.

</Question>

<Question title="ngx-translate ou Transloco pour une nouvelle application Angular ?">

Transloco, sauf si l'application est petite. Il couvre ce que fait `ngx-translate` et ajoute les scopes, les helpers de signals, des recommandations SSR et des outils pour les clés. Les deux API sont assez proches pour qu'un changement ultérieur soit surtout mécanique, mais il n'y a aucune raison de commencer par la plus simple si l'application doit grandir.

</Question>

<Question title="@angular/localize peut-il changer de langue sans rechargement ?">

Pas tel qu'il est conçu. Les traductions sont intégrées au build, donc une autre langue signifie un autre build. On peut appeler `loadTranslations()` avant le bootstrap pour charger des traductions à l'exécution, mais changer de langue exige tout de même de redémarrer l'application.

</Question>

<Question title="Quelle option est la meilleure pour le SEO d'Angular ?">

La bibliothèque compte moins que le routage : une URL par locale, des balises `hreflang`, `<html lang>` et un HTML rendu côté serveur et traduit. `@angular/localize` obtient presque tout cela gratuitement puisque chaque locale est un build séparé. Les bibliothèques runtime demandent du SSR et des routes localisées pour l'égaler. Voir [internationalisation et SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md).

- [internationalisation et SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md)

</Question>

<Question title="Intlayer fonctionne-t-il avec Analog ?">

Oui, via Vite. Voir le [guide Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_analog.md).

- [guide Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_analog.md)

</Question>

</FAQ>

## Pour aller plus loin

- [Configurer Intlayer dans Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_angular_21.md)
- [Configurer Intlayer dans Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_angular_19.md)
- [Benchmarks i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md)
- [Compilateur vs i18n déclaratif](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/compiler_vs_declarative_i18n.md)
- [Format de message ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/icu_message_format.md)
- [Adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md)

Même comparatif pour

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/how_to_pick_solid_i18n_library.md)
