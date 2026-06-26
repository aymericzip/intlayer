---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Dictionnaires dynamiques
description: Vue d'ensemble des fonctionnalités de dictionnaires dynamiques d'Intlayer — collections et variantes — pour créer du contenu i18n flexible et piloté à l'exécution.
keywords:
  - Dictionnaires dynamiques
  - Collections
  - Variantes
  - Intlayer
  - Internationalisation
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Sortie de la fonctionnalité des dictionnaires dynamiques"
  - version: 9.1.0
    date: 2026-06-26
    changes: "Fusion des enregistrements dynamiques dans les variantes — `variant` accepte désormais une chaîne ou un objet"
author: aymericzip
---

# Dictionnaires dynamiques

Intlayer prend en charge deux mécanismes pour exprimer du contenu qui dépasse un simple dictionnaire statique par clé. Chacun est déclaré via un **champ de métadonnées de premier niveau** dans le fichier de contenu ; aucune fonction d'encapsulation n'est nécessaire.

| Fonctionnalité                                                                                                   | Champ de métadonnées                    | Sélecteur dans `useIntlayer`                    |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------- |
| [Collections](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/collections.md) | `item: N`                               | `{ item: N }`                                   |
| [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/variants.md)      | `variant: "name"` _ou_ `variant: { … }` | `{ variant: "name" }` _ou_ `{ variant: { … } }` |

Les deux se combinent avec l'argument de locale et prennent en charge le chargement sélectif / différé via `importMode`.

## Quand utiliser quoi

- **Collections** — liste ordonnée d'éléments gérés dans des fichiers séparés (entrées de FAQ, articles de blog, produits).
- **Variantes** — alternatives de contenu nommées ou structurées :
  - une variante **chaîne** pour les tests A/B, les bannières saisonnières ou les feature flags ;
  - une variante **objet** pour les enregistrements de CMS, le contenu propre à un utilisateur ou tout contenu adressé par un ensemble de champs (les anciens « enregistrements dynamiques »).

> Les versions précédentes exposaient un champ `meta` distinct pour le contenu indexé par enregistrement. Il a été fusionné dans `variant` : passez un **objet** à `variant` au lieu d'utiliser `meta`.

## Désambiguïsation du sélecteur

Une clé peut déclarer les deux dimensions à la fois (par ex. une collection dont chaque élément possède une variante). Elles sont résolues dans l'ordre :

```
variant → item
```

Ainsi `{ variant: "promo" }` sur une clé variante × item renvoie tous les éléments promo sous forme de tableau, et ajouter `{ item: 2 }` réduit le résultat à une seule entrée.
