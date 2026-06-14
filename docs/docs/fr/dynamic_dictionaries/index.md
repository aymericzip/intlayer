---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Dictionnaires Dynamiques
description: Présentation des trois fonctionnalités de dictionnaire dynamique d'Intlayer — collections, variantes et enregistrements dynamiques — pour créer un contenu i18n flexible et piloté à l'exécution.
keywords:
  - Dictionnaires Dynamiques
  - Collections
  - Variantes
  - Enregistrements Dynamiques
  - Intlayer
  - Internationalisation
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Lancement de la fonctionnalité des dictionnaires dynamiques"
author: aymericzip
---

# Dictionnaires Dynamiques

Intlayer prend en charge trois mécanismes pour exprimer un contenu qui va au-delà d'un seul dictionnaire statique par clé. Chacun est déclaré via un **champ de métadonnées de premier niveau** dans le fichier de contenu ; aucune fonction d'enveloppement (wrapper) n'est nécessaire.

| Fonctionnalité                                                                                                                      | Champ de métadonnées | Sélecteur dans `useIntlayer` |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------- |
| [Collections](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/collections.md)                    | `item: N`            | `{ item: N }`                |
| [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/variants.md)                         | `variant: "name"`    | `{ variant: "name" }`        |
| [Enregistrements Dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }`    | `{ id, … }`                  |

Tous trois se composent avec l'argument de locale et prennent en charge le chargement sélectif / différé via `importMode`.

## Quand utiliser lequel

- **Collections** — liste ordonnée d'éléments gérés dans des fichiers séparés (entrées de FAQ, articles de blog, produits).
- **Variantes** — alternatives de contenu nommées pour les tests A/B, les bannières saisonnières ou les feature flags (drapeaux de fonctionnalités).
- **Enregistrements dynamiques** — contenu récupéré au moment de l'exécution à l'aide d'un identifiant opaque (enregistrements CMS, copie spécifique à l'utilisateur).

## Résolution des conflits de sélecteurs

Lorsque plusieurs sélecteurs sont présents sur un dictionnaire, l'ordre de résolution est :

```
variant → meta → item
```
