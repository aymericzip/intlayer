---
docName: ci_cd
url: https://intlayer.org/doc/concept/ci-cd
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Intégration CI/CD
description: Apprenez comment intégrer Intlayer dans votre pipeline CI/CD pour la gestion et le déploiement automatisés du contenu.
keywords:
  - CI/CD
  - Intégration Continue
  - Déploiement Continu
  - Automatisation
  - Internationalisation
  - Documentation
  - Intlayer
---

# Génération Automatique des Traductions dans un Pipeline CI/CD

Intlayer permet la génération automatique des traductions pour vos fichiers de déclaration de contenu. Plusieurs méthodes existent selon votre flux de travail.

## Utilisation du CMS

Avec Intlayer, vous pouvez adopter un flux de travail où une seule locale est déclarée localement, tandis que toutes les traductions sont gérées à distance via le CMS. Cela permet de détacher complètement le contenu et les traductions de la base de code, offrant plus de flexibilité aux éditeurs de contenu et permettant le rechargement dynamique du contenu (pas besoin de reconstruire l'application pour appliquer les modifications).

### Exemple de Configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Les locales optionnelles seront gérées à distance
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // Le contenu distant a la priorité

    applicationURL: process.env.APPLICATION_URL, // URL de l'application utilisée par le CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Identifiants du CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // Aide à garantir une génération cohérente des traductions
  },
};

export default config;
```

Pour en savoir plus sur le CMS, consultez la [documentation officielle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

## Utilisation de Husky

Vous pouvez intégrer la génération de traductions dans votre flux de travail Git local en utilisant [Husky](https://typicode.github.io/husky/).

### Exemple de Configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Les locales optionnelles sont gérées à distance
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Utilisez votre propre clé API

    applicationContext: "This is a test application", // Aide à garantir une génération cohérente des traductions
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Pour s'assurer que les dictionnaires sont à jour
npx intlayer fill --unpushed --mode fill    # Remplit uniquement le contenu manquant, ne met pas à jour les contenus existants
```

> Pour plus d'informations sur les commandes CLI d'Intlayer et leur utilisation, consultez la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

> Si vous avez plusieurs applications dans votre dépôt utilisant des instances intlayer séparées, vous pouvez utiliser l'argument `--base-dir` comme ceci :

```bash fileName=".husky/pre-push"
# Application 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Application 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Utilisation de GitHub Actions

Intlayer fournit une commande CLI pour remplir automatiquement et réviser le contenu du dictionnaire. Cela peut être intégré dans votre workflow CI/CD en utilisant GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Remplissage automatique Intlayer
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ Récupérer le dépôt
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Configurer Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Installer les dépendances
        run: npm ci

      - name: ⚙️ Compiler le projet Intlayer
        run: npx intlayer build

      - name: 🤖 Remplir automatiquement les traductions manquantes
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Créer ou mettre à jour la PR de traduction
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: remplissage automatique des traductions manquantes [skip ci]
          branch: auto-translations
          title: chore: mise à jour des traductions manquantes
          labels: translation, automated
```

> Comme pour Husky, dans le cas d'un monorepo, vous pouvez utiliser l'argument `--base-dir` pour traiter séquentiellement chaque application.

> Par défaut, l'argument `--git-diff` filtre les dictionnaires qui incluent les modifications de la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).

> Pour plus d'informations sur les commandes Intlayer CLI et leur utilisation, consultez la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
