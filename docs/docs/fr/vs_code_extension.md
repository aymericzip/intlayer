---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Extension officielle VS Code
description: Apprenez à utiliser l'extension Intlayer dans VS Code pour améliorer votre flux de travail de développement. Naviguez rapidement entre les contenus localisés et gérez efficacement vos dictionnaires.
keywords:
  - Extension VS Code
  - Intlayer
  - Localisation
  - Outils de développement
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
history:
  - version: 6.1.5
    date: 2025-09-30
    changes: Ajout d’un gif de démonstration
  - version: 6.1.0
    date: 2025-09-24
    changes: Ajout de la section de sélection de l’environnement
  - version: 6.0.0
    date: 2025-09-22
    changes: Onglet Intlayer / Commandes Remplir & Tester
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Extension officielle VS Code

## Aperçu

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) est l'extension officielle Visual Studio Code pour **Intlayer**, conçue pour améliorer l'expérience développeur lors du travail avec du contenu localisé dans vos projets.

![Extension Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

Lien de l'extension : [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Fonctionnalités

![Extraire le contenu](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_extract_content.gif?raw=true)

- **Extraire le contenu** – Extrayez le contenu de vos composants React / Vue / Svelte

![Remplir les dictionnaires](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Navigation instantanée** – Accédez rapidement au fichier de contenu correct en cliquant sur une clé `useIntlayer`.
- **Remplir les dictionnaires** – Remplissez les dictionnaires avec le contenu de votre projet.

![Liste des commandes](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Accès facile aux commandes Intlayer** – Construisez, poussez, tirez, remplissez, testez les dictionnaires de contenu en toute simplicité.

![Créer un fichier de contenu](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Générateur de déclaration de contenu** – Créez des fichiers de contenu de dictionnaire dans divers formats (`.ts`, `.esm`, `.cjs`, `.json`).

![Tester les dictionnaires](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Tester les dictionnaires** – Testez les dictionnaires pour détecter les traductions manquantes.

![Reconstruire le dictionnaire](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Gardez vos dictionnaires à jour** – Maintenez vos dictionnaires à jour avec le contenu le plus récent de votre projet.

![Onglet Intlayer (Barre d'activité)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Onglet Intlayer (Barre d'activité)** – Parcourez et recherchez les dictionnaires depuis un onglet latéral dédié avec une barre d'outils et des actions contextuelles (Construire, Tirer, Pousser, Remplir, Actualiser, Tester, Créer un fichier).

## Utilisation

### Navigation rapide

1. Ouvrez un projet utilisant **react-intlayer**.
2. Localisez un appel à `useIntlayer()`, tel que :

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Cliquez avec la commande** (`⌘+Click` sur macOS) ou **Ctrl+Click** (sur Windows/Linux) sur la clé (par exemple, `"app"`).
4. VS Code ouvrira automatiquement le fichier de dictionnaire correspondant, par exemple, `src/app.content.ts`.

### Onglet Intlayer (Barre d'activité)

Utilisez l'onglet latéral pour parcourir et gérer les dictionnaires :

- Ouvrez l'icône Intlayer dans la Barre d'activité.
- Dans **Recherche**, tapez pour filtrer les dictionnaires et les entrées en temps réel.
- Dans **Dictionnaires**, parcourez les environnements, dictionnaires et fichiers. Utilisez la barre d'outils pour Construire, Tirer, Pousser, Remplir, Actualiser, Tester et Créer un fichier de dictionnaire. Cliquez avec le bouton droit pour les actions contextuelles (Tirer/Pousser sur les dictionnaires, Remplir sur les fichiers). Le fichier actuel de l'éditeur se révèle automatiquement dans l'arborescence lorsque c'est applicable.

### Accéder aux commandes

Vous pouvez accéder aux commandes depuis la **Palette de commandes**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Construire les dictionnaires**
- **Pousser les dictionnaires**
- **Tirer les dictionnaires**
- **Remplir les dictionnaires**
- **Tester les dictionnaires**
- **Créer un fichier de dictionnaire**

### Chargement des variables d'environnement

Intlayer recommande de stocker vos clés API d'IA, ainsi que l'ID client et le secret Intlayer dans des variables d'environnement.

L'extension peut charger les variables d'environnement depuis votre espace de travail pour exécuter les commandes Intlayer avec le contexte correct.

- **Ordre de chargement (par priorité)** : `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Non destructif** : les valeurs existantes de `process.env` ne sont pas écrasées.
- **Portée** : les fichiers sont résolus à partir du répertoire de base configuré (par défaut la racine de l'espace de travail).

#### Sélection de l'environnement actif

- **Palette de commandes** : ouvrez la palette et exécutez `Intlayer : Sélectionner l’environnement`, puis choisissez l’environnement (par exemple, `development`, `staging`, `production`). L’extension tentera de charger le premier fichier disponible dans la liste de priorité ci-dessus et affichera une notification comme « Environnement chargé depuis .env.<env>.local ».
- **Paramètres** : allez dans `Paramètres → Extensions → Intlayer`, et configurez :
  - **Environnement** : le nom de l’environnement utilisé pour résoudre les fichiers `.env.<env>*`.
  - (Optionnel) **Fichier Env** : un chemin explicite vers un fichier `.env`. Lorsqu’il est fourni, il prend le pas sur la liste déduite.

#### Monorepos et répertoires personnalisés

Si vos fichiers `.env` se trouvent en dehors de la racine de l’espace de travail, définissez le **Répertoire de base** dans `Paramètres → Extensions → Intlayer`. Le chargeur recherchera les fichiers `.env` relatifs à ce répertoire.
