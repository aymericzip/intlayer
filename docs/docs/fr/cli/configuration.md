---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Gérer la Configuration
description: Apprenez à récupérer et pousser votre configuration Intlayer vers le CMS.
keywords:
  - Configuration
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# Gérer la Configuration

## Récupérer la Configuration

La commande `configuration get` récupère la configuration actuelle pour Intlayer, en particulier les paramètres de locale. Ceci est utile pour vérifier votre configuration.

```bash
npx intlayer configuration get
```

## Alias :

- `npx intlayer config get`
- `npx intlayer conf get`

## Arguments :

- **`--env`** : Spécifie l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournit un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifie le répertoire de base pour le projet.
- **`--verbose`** : Active la journalisation détaillée pour le débogage. (par défaut à true via la CLI)
- **`--no-cache`** : Désactive le cache.

## Pousser la Configuration

La commande `configuration push` télécharge votre configuration vers le CMS et l'éditeur Intlayer. Cette étape est nécessaire pour permettre l'utilisation des dictionnaires distants dans l'éditeur visuel Intlayer.

```bash
npx intlayer configuration push
```

## Alias :

- `npx intlayer config push`
- `npx intlayer conf push`

## Arguments :

- **`--env`** : Spécifie l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournit un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifie le répertoire de base pour le projet.
- **`--verbose`** : Active la journalisation détaillée pour le débogage. (par défaut à true via la CLI)
- **`--no-cache`** : Désactive le cache.

En poussant la configuration, votre projet est entièrement intégré au CMS Intlayer, permettant une gestion fluide des dictionnaires entre les équipes.
