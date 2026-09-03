---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Formater les dates et les nombres par locale avec Intl"
description: Vous n'avez probablement pas besoin d'une bibliothèque de formatage. Comment Intl gère les dates, nombres, devises et listes par locale, le coût de mise en cache et le bug de fuseau horaire en production.
keywords:
  - formater date par locale
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - format devise locale
  - format temps relatif
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Formater les dates et les nombres par locale avec Intl

Traduire des chaînes n'est que la partie visible de l'i18n. La moitié qui génère des retours de bugs concerne le formatage : un utilisateur allemand qui voit `1,234.56` au lieu de `1.234,56`, un utilisateur japonais qui voit `08/02/2026` et le lit comme le mois d'août, ou une date qui s'affiche différemment entre le serveur et le client, cassant la page lors de l'hydratation.

Rien de tout cela ne nécessite de bibliothèque externe. L'API `Intl` est disponible dans tous les runtimes modernes.

## Table des matières

<TOC/>

## Commencez par supprimer vos helpers maison de date

Presque chaque projet possède une fonction `formatDate` écrite avant même que quiconque ne songe aux locales. Elle fige un ordre arbitraire, un séparateur et le plus souvent des noms de mois en anglais.

```ts
// Le code à supprimer.
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` la remplace avantageusement et gère parfaitement chaque locale :

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

Le même constat s'applique aux nombres. `toFixed(2)` produit `1234.56` partout, ce qui est erroné dans la majeure partie de l'Europe.

## Ce que couvre `Intl`

| API                       | Cas d'usage                                                 |
| :------------------------ | :---------------------------------------------------------- |
| `Intl.DateTimeFormat`     | Dates et heures, avec préréglages `dateStyle` / `timeStyle` |
| `Intl.NumberFormat`       | Décimaux, devises, pourcentages, unités, notation compacte  |
| `Intl.RelativeTimeFormat` | "il y a 3 jours", "dans 2 heures"                           |
| `Intl.ListFormat`         | "a, b et c" contre "a, b, and c"                            |
| `Intl.PluralRules`        | Catégorie plurielle dans laquelle se classe un nombre       |
| `Intl.Collator`           | Tri linguistique correct des chaînes                        |

`Intl.Collator` est celui que l'on oublie fréquemment. `array.sort()` sur des chaînes utilise l'ordre des points de code Unicode, ce qui place les caractères accentués après `z` et classe le `ö` suédois au mauvais endroit. Si vous triez des listes destinées aux utilisateurs, triez avec un collator.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("fr").compare);
// ["apple", "édouard", "zebra"]
```

## Privilégiez les préréglages aux options manuelles

`dateStyle` et `timeStyle` laissent la locale décider de l'ordre logique et des séparateurs. Spécifier individuellement `year`, `month` et `day` vous donne un contrôle rarement souhaitable, car l'ordre correct diffère selon la région et vous risquez d'écraser les données CLDR avec vos propres hypothèses.

```ts
// La locale décide de la structure.
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// Vous forcez la structure, et vous vous tromperez ailleurs.
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

N'utilisez des composants explicites que lorsque le design impose impérativement une largeur fixe, par exemple dans une colonne de tableau étroite.

## Instancier les formateurs est coûteux

C'est le détail de performance qui change tout. Construire une instance de `Intl.NumberFormat` charge des données de locale volumineuses, et cette étape coûte bien plus cher que l'appel ultérieur à `.format()`. Le faire dans une boucle de rendu sur un millier de lignes crée un goulet d'étranglement évident.

```ts
// Reconstruit le formateur à chaque ligne.
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Construit une seule fois, puis réutilisé.
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` et `toLocaleString()` souffrent du même travers caché : chaque invocation instancie un formateur. C'est tout à fait tolérable pour une valeur isolée, mais inadapté pour une liste.

Mettez-les en cache en combinant la locale et les options retenues :

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## Le bug de fuseau horaire exclusif à la production

Ce problème a déjà coûté des après-midis entiers à de nombreuses équipes. Un serveur rend une date en SSR, le navigateur tente de l'hydrater, et React déclenche une erreur d'hydration mismatch car les deux ont généré un texte différent.

La cause est simple : `Intl.DateTimeFormat` se base sur le fuseau horaire ambiant de la machine lorsque vous n'en spécifiez aucun. Votre serveur de production tourne en UTC, alors que votre ordinateur portable de développement se trouve dans un autre fuseau horaire. L'anomalie est invisible en local et ne se produit qu'en production.

```ts
// Un serveur en UTC et un navigateur en UTC+9 sont en désaccord. Hydration mismatch.
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Tout le monde s'accorde.
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Trois approches pragmatiques :

- **Fixer un fuseau horaire** côté serveur et le transmettre explicitement. Déterministe et rigoureux, mais tout le monde voit l'heure UTC.
- **Rendre côté client uniquement**, avec un placeholder stable lors de la passe serveur. Précis pour l'utilisateur, mais implique un léger saut visuel.
- **Enregistrer le fuseau de l'utilisateur** et le transmettre des deux côtés. Le rendu idéal, mais demande plus de tuyauterie.

Quelle que soit la solution retenue, spécifiez toujours `timeZone` explicitement pour toute date rendue à la fois côté serveur et côté client. Une date sans fuseau horaire explicite est une date à deux valeurs.

## Une devise a besoin d'une devise, pas d'une locale

La locale et la devise sont deux concepts orthogonaux. `fr-FR` ne signifie pas euro : un utilisateur français peut tout à fait consulter une facture en dollars américains.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

La locale pilote les séparateurs, les regroupements de chiffres et l'emplacement du symbole. La devise provient de votre modèle de données. Déduire l'une de l'autre est une source d'erreurs comptables.

Notez également l'utilité de `currencyDisplay`. Dans une interface où cohabitent plusieurs devises portant le symbole dollar, l'option `"code"` élimine toute ambiguïté entre dollars américains, canadiens et australiens.

## Le temps relatif est plus naturel que le temps absolu

Pour les événements récents, "il y a 2 heures" est bien plus lisible qu'un horodatage complet, et `Intl.RelativeTimeFormat` s'en charge nativement.

```ts
new Intl.RelativeTimeFormat("fr", { numeric: "auto" }).format(-1, "day");
// "hier"
```

`numeric: "auto"` permet d'obtenir "hier" au lieu de "il y a 1 jour". Sans cette option, vous n'obtiendrez que la forme numérique stricte, qui sonne très mécanique.

## Ce qu'Intlayer apporte en complément

Intlayer englobe ces mécanismes dans des utilitaires pré-cachés afin que vous n'ayez pas à maintenir la Map de cache ci-dessus, et applique la locale active par défaut sans avoir à la transmettre à chaque appel.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1 234,5"
currency(1234.5, { currency: "EUR" }); // "1 234,50 €"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "il y a 2 heures"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 kilomètres"
compact(1200); // "1,2 k"
list(["pomme", "banane", "orange"]); // "pomme, banane et orange"
```

La fonction `date()` accepte également des préréglages (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`), évitant d'avoir à manipuler un objet d'options pour les cas courants. Des équivalents React et Vue existent sous forme de hooks et de composables, résolvant la locale active directement depuis le contexte applicatif.

Il s'agit essentiellement d'une couche de mise en cache et d'injection de locale par défaut au-dessus de l'API standard. Le comportement de formatage reste celui d'`Intl`. Retrouvez les signatures complètes dans la [documentation des formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md).

## Erreurs courantes

- **`toLocaleDateString()` sans locale spécifiée.** Utilise la locale de la machine hôte, ce qui dépend entièrement de la configuration du conteneur sur un serveur.
- **Formater dans une boucle sans cache.** L'instanciation du formateur absorbe l'essentiel du temps d'exécution.
- **Oublier `timeZone` sur les dates isomorphes.** Erreur d'hydratation impossible à reproduire sur votre poste local.
- **Déduire la devise depuis la locale.** `fr-FR` ne signifie pas automatiquement euros.
- **`sort()` standard sur des textes affichés.** Utilisez toujours `Intl.Collator`.
- **Coder les noms de mois ou de jours en dur.** Ils existent déjà dans le CLDR, pour chaque langue.
- **Garder `numeric: "always"` pour le temps relatif.** Vous obtenez "il y a 1 jour" là où chaque langue possède un mot dédié pour hier.

## Pour aller plus loin

- [Formateurs et utilitaires de locale : `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md)
- [Référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
- [Rapports de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md)
- [Adaptateur de compatibilité react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-intl.md)
- [Format de message ICU : pluriels, sélections et skeletons numériques](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/icu_message_format.md)
- [Comment tester les traductions, formateurs et pluriels compris](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_testing_strategies.md)
- [Ce que couvre réellement l'internationalisation](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/what_is_internationalization.md)
