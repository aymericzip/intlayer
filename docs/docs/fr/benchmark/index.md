---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Benchmark des bibliothèques i18n
description: Découvrez comment Intlayer se compare aux autres bibliothèques i18n en termes de performance et de taille de bundle.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Initialisation du benchmark"
---

# Benchmark Bloom — Rapport

Benchmark Bloom est une suite de tests de performance qui mesure l'impact réel des bibliothèques i18n (internationalisation) sur plusieurs frameworks React et stratégies de chargement.

Retrouvez les rapports détaillés et la documentation technique pour chaque framework ci-dessous :

- [**Rapport de Benchmark Next.js**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md)
- [**Rapport de Benchmark TanStack Start**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md)

---

## Résultats Actuels

Consultez [**le tableau de bord interactif du benchmark**](https://intlayer.org/benchmark) pour des comparaisons en direct et des données résumées.
| `scoped-dynamic` | Élevée (fuite quasi nulle) | Élevée |

Passer du mode `static` au mode `scoped-dynamic` réduit généralement le contenu inutilisé de 60 à 90 %, mais nécessite beaucoup plus de configuration. Les bibliothèques comme Intlayer automatisent le pattern `scoped-dynamic` afin que les développeurs bénéficient de l'efficacité sans le code répétitif.

### Interprétation des chiffres de fuite (leakage)

Une fuite de page de **35 %** signifie que 35 % du JavaScript téléchargé pour cette page contient des chaînes de caractères provenant d'autres pages — du contenu que l'utilisateur ne peut pas voir sur cette page. Sur une page de 400 Ko, cela représente environ 140 Ko de données évitables.

Une fuite de locale de **10 %** signifie que 10 % du bundle contient des traductions dans des langues que l'utilisateur actuel n'utilise pas.

### Réactivité vs temps de rendu

- **Réactivité E2E** mesure l'expérience utilisateur complète : réseau, surcoût du framework, mise à jour du DOM.
- **Temps React Profiler** isole le coût de re-rendu de l'arbre React.

Une bibliothèque peut avoir un temps Profiler faible mais un temps E2E élevé si le changement de langue implique une requête réseau (récupération du nouveau fichier de langue). Inversement, une bibliothèque peut avoir un temps Profiler élevé mais paraître rapide si elle regroupe les mises à jour efficacement.
