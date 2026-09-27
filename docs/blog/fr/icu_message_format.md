---
createdAt: 2026-09-02
updatedAt: 2026-09-26
priority: 8
title: "Format de Message ICU : Syntaxe, Pluriels et Select"
description: Une référence pratique sur ICU MessageFormat, interpolation d'arguments, branches plural et select, catégories de pluriels CLDR par langue et erreurs fréquentes.
keywords:
  - format de message icu
  - icu messageformat
  - règles de pluriel cldr
  - catégories de pluriel
  - selectordinal
  - pluralisation i18n
  - syntaxe de message
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# Format de Message ICU : la syntaxe et les pièges courants

ICU MessageFormat est une syntaxe de chaîne permettant à une traduction d'embarquer sa propre logique conditionnelle : pluriels, formes selon le genre, formatage de nombres et de dates. Elle part du principe que la grammaire appartient au traducteur, non au développeur qui écrirait `if (count === 1)`. Cet article aborde la syntaxe, les aspects linguistiques qui mettent en échec les implémentations naïves et la façon dont l'écosystème JS gère ces problématiques.

## Table des matières

<TOC/>

## Le problème, concrètement

Voici le code que presque tout le monde écrit au début :

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

Cette approche fonctionne en anglais mais échoue partout ailleurs :

- **Le russe et le polonais** nécessitent trois ou quatre formes, et non deux.
- **Le japonais** n'en requiert qu'une seule, et l'espace concaténé est erroné.
- **L'arabe** en exige six, et le nombre lui-même devrait être rendu dans le système numérique adapté à la locale.
- **Le français** place une espace insécable avant certaines ponctuations, que votre `+ " "` vient de casser.

Le problème de fond réside dans le découpage de la phrase en fragments isolés. Le traducteur se retrouve face à `item` et `items` sans contexte, incapable de réordonner la phrase. ICU MessageFormat résout ce problème en maintenant la phrase entière dans une chaîne traduisible unique tout en offrant des opérateurs logiques au traducteur.

## Arguments simples

L'unité de base est un espace réservé (placeholder) entre accolades simples :

```text
Hello, {name}!
```

Vous fournissez `{ name: "Alice" }` au formatage pour obtenir `Hello, Alice!`. Les accolades constituent les seuls caractères spéciaux. Pour afficher une accolade littérale, entourez-la de guillemets simples : `'{'`.

C'est l'ensemble du système d'interpolation. Tout le reste dans ICU s'appuie sur cette base.

## Pluriel

`plural` sélectionne une branche selon une valeur numérique :

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Trois points essentiels à connaître :

- **`#`** est remplacé par la valeur formatée de `count`, adaptée à la locale. Ainsi, `1234` devient `1,234` en `en-US` et `1 234` en `fr-FR`.
- **`other` est obligatoire.** Chaque implémentation ICU générera une erreur ou échouera à la validation en son absence. Il s'agit du repli lorsque aucune catégorie ne correspond.
- **`=0`, `=1`, … ciblent des valeurs exactes** et sont vérifiés _avant_ les catégories CLDR. Utilisez-les pour des messages spécifiques ("Aucun message"), et non en remplacement de `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n` soustrait `n` de la valeur avant la sélection de la catégorie et la substitution de `#`. Cela permet de gérer le modèle "Alice et 3 autres personnes ont aimé ceci" :

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

Avec `count: 4`, `#` affichera `3`. L'option `offset` est très utile mais parfois mal supportée selon les runtimes, pensez donc à vérifier votre environnement.

## Les catégories de pluriel dépendent de la langue

C'est l'erreur la plus répandue. Les catégories `zero`, `one`, `two`, `few`, `many`, `other` ne sont pas des réceptacles universels valables pour toutes les langues. Chaque locale utilise un _sous-ensemble_, défini par les [règles de pluriel CLDR](https://cldr.unicode.org/index/cldr-spec/plural-rules), qui reposent sur la grammaire et non sur l'intuition.

| Langue   | Tag  | Catégories utilisées             | Total |
| -------- | ---- | -------------------------------- | ----- |
| Japonais | `ja` | other                            | 1     |
| Chinois  | `zh` | other                            | 1     |
| Anglais  | `en` | one, other                       | 2     |
| Allemand | `de` | one, other                       | 2     |
| Français | `fr` | one, many, other                 | 3     |
| Tchèque  | `cs` | one, few, many, other            | 4     |
| Polonais | `pl` | one, few, many, other            | 4     |
| Russe    | `ru` | one, few, many, other            | 4     |
| Arabe    | `ar` | zero, one, two, few, many, other | 6     |
| Gallois  | `cy` | zero, one, two, few, many, other | 6     |

Deux conséquences souvent inattendues :

- **`one` ne signifie pas strictement "1".** En russe, `one` englobe 1, 21, 31, 101 : tout nombre se terminant par 1 à l'exception de 11. En français, `0` relève de la catégorie `one`.
- **Ajouter une catégorie au texte source anglais n'a aucun effet.** Le message anglais n'a besoin que de `one` et `other`. La traduction polonaise exige quatre branches, et cette structure réside dans la chaîne polonaise, non dans l'anglaise. Tout format contraignant chaque locale à partager la même structure de clés posera problème ici.

Vous pouvez vérifier le comportement réel d'un runtime sans rien installer :

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

`Intl.PluralRules` fournit les données CLDR dans tous les navigateurs modernes et dans Node. Une bibliothèque revendiquant la pluralisation CLDR s'appuie presque systématiquement sur cette API native.

## select et selectordinal

`select` permet de créer des branches à partir d'une chaîne arbitraire : un genre, un rôle, un statut ou un niveau d'abonnement.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

Les clés sont comparées littéralement et `other` reste obligatoire ici aussi. `select` est l'outil adapté dès que la structure d'une phrase dépend d'une valeur énumérée, car les langues ne s'accordent pas sur les catégories qui influencent leur grammaire.

`selectordinal` adopte la même forme que `plural` mais utilise les règles de pluriels **ordinaux**, distinctes de celles des nombres cardinaux :

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

L'anglais emploie quatre catégories ordinales (1st, 2nd, 3rd, 4th) alors qu'il n'en utilise que deux pour les cardinaux. Cette asymétrie justifie l'existence de deux opérateurs distincts.

## Arguments de nombres, dates et heures

ICU permet également de formater directement les valeurs interpolées :

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

La syntaxe moderne s'appuie sur les **skeletons**, introduits avec ICU 60 et préfixés par `::`. Les skeletons s'avèrent bien plus expressifs que les styles traditionnels :

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

Le support des skeletons reste variable selon les solutions. FormatJS les gère intégralement, tandis que d'autres runtimes n'acceptent que les formes historiques `number, currency` ou `date, long`. Vérifiez la prise en charge de `::` dans votre environnement avant mise en production.

## Imbrication et lisibilité

ICU est composable. Une branche de pluriel peut contenir un select, qui lui-même peut contenir un autre pluriel :

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

Il s'agit de l'exemple classique d'ICU, mais aussi de l'illustration parfaite des dérives de l'imbrication profonde. Dès le deuxième niveau, les erreurs d'accolades se multiplient et les éditeurs TMS peinent à assister le traducteur. Limitez l'imbrication à deux niveaux maximum. Si un troisième niveau s'avère nécessaire, scindez la phrase en deux messages distincts.

## Prise en charge d'ICU par les bibliothèques JS

| Bibliothèque          | Support ICU            | Ce que vous écrivez réellement                                        |
| --------------------- | ---------------------- | --------------------------------------------------------------------- |
| react-intl (FormatJS) | Natif, complet         | Chaînes ICU, y compris les skeletons et balises rich-text             |
| next-intl             | Natif                  | Chaînes ICU, via `intl-messageformat` de FormatJS                     |
| i18next               | Nécessite un plugin    | Suffixes `key_one` / `key_other` et `{{name}}`, ICU via `i18next-icu` |
| vue-i18n              | Partiel / propriétaire | Interpolation `{name}` et branches de pluriel séparées par des barres |
| Angular (`$localize`) | Sous-ensemble          | ICU `plural` / `select` dans les templates, extrait vers XLIFF        |

Quelques précisions pour une lecture éclairée du tableau :

- **La syntaxe par défaut d'i18next n'est pas ICU**, sans que ce soit un défaut. Les suffixes (`item_one`, `item_few`) correspondent aux catégories de `Intl.PluralRules` et sont souvent plus simples à manipuler dans un fichier JSON plat. Cependant, `select` et les imbrications complexes n'en font pas partie, ce qui impose d'ajouter `i18next-icu` ou de gérer la logique dans le code.
- **Les pluriels de vue-i18n** s'appuient sur une fonction de règles propre à la locale plutôt que sur les catégories CLDR par défaut. Cela fonctionne, mais la règle se situe dans la configuration de l'application et non dans les données.
- **FormatJS constitue la référence** en JS. Lorsqu'on évoque "ICU MessageFormat" dans le contexte JavaScript, on fait généralement référence à ce que FormatJS prend en charge.

## L'approche d'Intlayer

Intlayer n'utilise pas de DSL sous forme de chaîne de caractères. Les opérateurs logiques sont des fonctions déclarées dans un fichier de contenu TypeScript ou JavaScript. La structure est ainsi typée et chaque locale ne déclare que les catégories exigées par sa propre grammaire :

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Locale polonaise → "5 ofert"
```

La correspondance avec les concepts ICU est directe :

| Concept ICU                   | Intlayer                                     |
| ----------------------------- | -------------------------------------------- |
| `{name}`                      | `insert("Hello {{name}}")` ou détection auto |
| `{count, plural, …}`          | `plural({ one, few, many, other })`          |
| `{value, select, …}`          | `select({ draft, published, fallback })`     |
| branche de genre de `select`  | `gender({ male, female, fallback })`         |
| branche booléenne de `select` | `cond({ true, false })`                      |
| plages numériques (non-CLDR)  | `enu({ "0": …, ">5": …, fallback: … })`      |
| `{n, number, ::currency/EUR}` | `useCurrency()(1234.5, { currency: "EUR" })` |

`plural` délègue la sélection des catégories à `Intl.PluralRules`, ce qui permet d'appliquer la table CLDR ci-dessus sans altération. Le formatage reste découplé : nombres, dates, devises et listes sont gérés via des [hooks de formatage](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) plutôt que d'être intégrés directement dans le message textuel.

Limites objectives :

- Intlayer requiert une étape de build : le compilateur extrait les déclarations lors de la compilation. Si vous recherchez un simple JSON chargé dynamiquement au runtime, le paradigme est différent.
- `plural` ne permet pas d'imbriquer un `t()` à l'intérieur de ses branches pour l'instant : vous enveloppez `plural` dans `t()`, et non l'inverse.
- L'écosystème est plus récent que celui d'i18next, avec moins d'intégrations TMS directes ou de retours d'expérience sur StackOverflow.

Pour les projets existants contenant déjà des chaînes ICU, [l'adaptateur de compatibilité react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-intl.md) les analyse directement : `plural`, `select`, `selectordinal`, `#` et les arguments historiques `number`, `date`, `time`. Les skeletons et l'option `offset:` n'étant pas pris en charge par ce résolveur, vérifiez ces messages lors d'une migration. [L'adaptateur i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/i18next.md) résout quant à lui les suffixes (`key_one`, `key_male`) via `Intl.PluralRules`.

## Erreurs courantes

- **Coder la logique de pluriel en dur dans le code.** La condition `count === 1 ? a : b` produit un résultat erroné pour 8 des 10 langues listées dans le tableau précédent. Une fois la ternaire intégrée au code, le traducteur ne peut plus intervenir.
- **Concaténer des segments de texte traduits.** L'ordre des mots, les accords grammaticaux et les espaces devant la ponctuation dépendent de la locale. Conservez toujours la phrase dans son ensemble.
- **Omettre `other`.** Il s'agit d'une obligation de la spécification et non d'une convention facultative. La plupart des parseurs rejetteront le message, et les autres n'afficheront rien.
- **Supposer que vos catégories se transposent directement.** Une source anglaise avec `one` et `other` ne signifie pas que le fichier polonais comportera deux branches. Chaque locale doit pouvoir déclarer ses propres règles. Consultez la [déclaration de contenu par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md).
- **Utiliser `=1` à la place de `one`.** `=1` cible uniquement la valeur numérique 1. En russe, 21 exige `one`, et la règle `=1` ne s'activera jamais pour ce cas.
- **Placer `#` en dehors d'une branche de pluriel.** Ce caractère n'a de signification spéciale qu'au sein d'un bloc `plural` ou `selectordinal`. Ailleurs, il est traité comme un simple dièse.
- **Oublier que `#` est déjà formaté.** Si vous souhaitez afficher le nombre brut sans séparateur de milliers, interpolez plutôt l'argument par son nom.

## Pour aller plus loin

- [Contenu pluriel dans Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md)
- [Contenu basé sur select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/select.md)
- [Espaces réservés d'insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md)
- [Benchmark des bibliothèques i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/react-i18next_vs_react-intl_vs_intlayer.md)
- [Qu'est-ce que l'internationalisation ?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/what_is_internationalization.md)
