---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Comment tester les traductions sans écrire de tests fragiles"
description: Ce qui vaut la peine d'être testé dans une application i18n et ce qui ne l'est pas. Tests de rendu avec provider, pseudolocalisation, couverture RTL et pluriels, et le piège des snapshots.
keywords:
  - tester traductions
  - tests i18n
  - testing library i18n
  - pseudolocalisation
  - test provider locale
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# Comment tester les traductions sans écrire de tests fragiles

La plupart des suites de tests i18n échouent de deux manières. Soit elles vérifient le texte littéral, de sorte que chaque modification de formulation casse cinquante tests et pousse l'équipe à les supprimer. Soit elles effectuent le rendu uniquement dans la locale par défaut, ne prouvant rien sur les dix-sept autres. Les deux mènent au même résultat, une suite en laquelle personne n'a confiance.

## Table des matières

<TOC/>

## Les patterns sont indépendants de la bibliothèque

Chaque pattern ci-dessous fonctionne sur n'importe quelle stack i18n. Remplacez le provider par `I18nextProvider`, `NextIntlClientProvider` ou `IntlProvider` et les tests restent identiques, car ils valident la sortie rendue plutôt qu'une API spécifique.

L'outillage de couverture s'adapte également : avec le [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) branché sur vos catalogues existants, ou un [adaptateur de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) créant un alias sur vos imports actuels, la vérification de couverture s'exécute sur le JSON déjà en place.

## Déterminer ce que vous testez réellement

La qualité d'une traduction ne se teste pas par assertion. Aucune assertion ne vous dira si l'allemand est idiomatique, et prétendre le contraire produit une suite encombrée de chaînes écrites en dur.

Ce qui mérite d'être testé est mécanique :

| Vaut la peine d'être testé                | Ne vaut pas la peine d'être testé |
| :---------------------------------------- | :-------------------------------- |
| Chaque locale requise possède une valeur  | La formulation est-elle élégante  |
| La bonne locale parvient au composant     | Le libellé exact de chaque texte  |
| Les pluriels fonctionnent pour chaque cas | Le traducteur a bien fait son job |
| Les locales RTL appliquent sens et miroir | Chaque chaîne dans chaque locale  |
| Les dates et nombres respectent la locale | L'exactitude interne d'`Intl`     |

La couverture relève d'un seul test automatisé orienté données, et non de vos tests de composants. Ce sujet est abordé dans [détecter les traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md) ; cet article traite du reste.

## Effectuer le rendu dans un provider et cibler par rôle

Le pattern central consiste à monter le composant au sein d'un provider de locale et à interroger par rôle ou identifiant de test plutôt que par le texte.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("affiche le titre du récapitulatif en français", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

Interroger `getByRole("heading")` résiste aux changements de texte. `getByText("Récapitulatif")` échoue au moindre ajustement. N'utilisez le texte exact que lorsque la chaîne elle-même constitue l'élément testé, ce qui reste rare.

Pour les attributs comme `aria-label`, vous avez besoin de la chaîne brute plutôt que d'un nœud affichable. Dans React, les entrées `useIntlayer` exposent un champ `.value` pour cela.

## Paramétrer les tests à travers les locales

Un seul corps de test exécuté sur chaque locale apporte bien plus de valeur qu'un test distinct par locale.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("s'affiche sans revenir à la clé brute", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // Une clé affichée signifie que la résolution a échoué.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("définit la bonne direction de texte", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

La première assertion constitue un gain générique appréciable : si une clé échoue et que votre bibliothèque affiche la clé, le DOM contient une structure du type `cart.summary.title`. Cela détecte toute une classe de bugs sans citer une seule phrase.

## La pseudolocalisation révèle ce que les catalogues ne voient pas

Ajoutez une fausse locale qui transforme chaque chaîne, par exemple en remplaçant `Checkout` par `[!!! Çĥéçķöũţ !!!]`. Affichez ensuite la page dans cette langue.

Tout ce qui apparaît encore en anglais standard est écrit en dur dans le code. Aucun contrôle basé sur un catalogue ne peut l'identifier, car du point de vue des outils, la chaîne n'existe pas. Les crochets jouent un second rôle : ils allongent le texte d'environ 30 pour cent, révélant les ruptures de mise en page avant même de tester l'allemand.

Ce contrôle s'exécute idéalement lors d'une passe visuelle ou end-to-end plutôt qu'en test unitaire, car l'erreur saute directement aux yeux.

## Les pluriels exigent un test par catégorie, pas par langue

Les anomalies de pluriel passent inaperçues car l'anglais n'utilise que deux formes, sur lesquelles la majorité des développeurs se concentrent. Le polonais en compte quatre, l'arabe six.

```ts fileName="plural.test.ts"
// L'arabe couvre zero, one, two, few, many, other.
describe.each([0, 1, 2, 3, 11, 100])("quantité %i", (count) => {
  it("produit une chaîne non vide en arabe", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Choisissez des nombres ciblant chaque catégorie CLDR pour votre langue la plus complexe, plutôt que de vous limiter à 1 et 2 partout. `Intl.PluralRules` indique la catégorie attribuée à un nombre, ce qui permet de déduire vos jeux de test sans tâtonner. Retrouvez plus de précisions sur les catégories dans [l'article sur le format de message ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/icu_message_format.md).

## Le piège des tests par instantané (snapshots)

Les snapshots et l'internationalisation font mauvais ménage. Le snapshot d'un composant localisé fige chaque chaîne. Dès qu'un traducteur corrige une faute en portugais, une suite verte devient rouge, sur un fichier qu'aucun relecteur ne comprend vraiment. Au bout de quelques alertes, quelqu'un relance `-u` sans lire le diff, et les snapshots perdent toute valeur.

Si vous tenez aux snapshots, prenez-les dans une seule locale et traitez-les comme un contrôle structurel plutôt que textuel. Tout ce qui dépend d'une locale spécifique doit faire l'objet d'assertions ciblées.

## Tester la négociation de la locale, pas seulement le rendu

Le bug i18n le plus fréquent en production n'est pas une chaîne manquante. C'est le choix d'une mauvaise locale : une URL indique `/fr/`, le client lit `navigator.language`, et les deux entrent en conflit.

Testez la logique de résolution directement, sous forme de fonction pure, indépendamment de tout composant :

```ts fileName="locale-resolution.test.ts"
it("privilégie l'URL par rapport à la préférence enregistrée", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("utilise l'en-tête lorsque l'URL ne comporte pas de préfixe", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

C'est le test d'internationalisation ayant la plus forte valeur ajoutée qui manque dans la plupart des projets, et il ne requiert aucun DOM.

## Que lancer et à quel moment

- **Unitaire** : négociation de locale, formateurs, catégories de pluriels. Rapide, sans DOM.
- **Composant** : un rendu avec provider par locale, validant les rôles et l'absence de clés brutes.
- **Couverture** : un test orienté données garantissant l'absence de clés manquantes sur les locales requises.
- **Visuel ou end-to-end** : passage en pseudolocalisation et une page RTL, car ces défauts sont purement visuels.

Conservez les trois premiers dans la CI à chaque commit. Le dernier reste idéal lors d'exécutions nocturnes, étant plus coûteux à chaque push.

## Erreurs courantes

- **Valider le texte exact partout.** Condamne la suite de tests à l'abandon d'ici quelques mois.
- **Prendre des snapshots de composants localisés.** Les traducteurs cassent le build et les relecteurs valident à l'aveugle.
- **Tester uniquement la locale par défaut.** La seule locale qui ne peut jamais manquer.
- **Tester uniquement 1 et 2 pour les pluriels.** Ignore toutes les catégories absentes de l'anglais.
- **Mocker la bibliothèque i18n.** Vous testez alors uniquement que votre mock renvoie des chaînes.
- **Omettre de tester la négociation.** L'erreur la plus fréquente en production, pourtant la plus simple à vérifier.

## Pour aller plus loin

- [Tester votre contenu : audit CLI, API programmatique et assertions UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md)
- [Plugin ESLint : détecter les chaînes en dur et le contenu inutilisé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)
- [Formateurs et utilitaires de locale, dont `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md)
- [Rapports de benchmark à travers différents frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/index.md)
- [Adaptateur de compatibilité react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/react-i18next.md)
- [Comment détecter les traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/detecting_missing_translations.md)
- [Format de message ICU : pluriels, select et formats squelettes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/icu_message_format.md)
