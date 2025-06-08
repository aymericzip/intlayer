# Génération Automatique de Traductions dans un Pipeline CI/CD

Intlayer permet la génération automatique de traductions pour vos fichiers de déclaration de contenu. Il existe plusieurs façons d'y parvenir en fonction de votre flux de travail.

## Utilisation du CMS

Avec Intlayer, vous pouvez adopter un flux de travail où une seule locale est déclarée localement, tandis que toutes les traductions sont gérées à distance via le CMS. Cela permet de détacher complètement le contenu et les traductions de la base de code, offrant plus de flexibilité aux éditeurs de contenu et permettant un rechargement à chaud du contenu (pas besoin de reconstruire l'application pour appliquer les modifications).

### Exemple de Configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalisation: {
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
    applicationContext: "Ceci est une application de test", // Aide à garantir une génération cohérente des traductions
  },
};

export default config;
```

Pour en savoir plus sur le CMS, consultez la [documentation officielle](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md).

## Utilisation de Husky

Vous pouvez intégrer la génération de traductions dans votre flux de travail Git local en utilisant [Husky](https://typicode.github.io/husky/).

### Exemple de Configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalisation: {
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

    applicationContext: "Ceci est une application de test", // Aide à garantir une génération cohérente des traductions
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Pour s'assurer que les dictionnaires sont à jour
npx intlayer fill --unpushed --mode fill    # Remplit uniquement le contenu manquant, sans mettre à jour les existants
```

> Pour plus d'informations sur les commandes CLI d'Intlayer et leur utilisation, consultez la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).

> Si vous avez plusieurs applications dans votre dépôt utilisant des instances Intlayer distinctes, vous pouvez utiliser l'argument `--base-dir` comme ceci :

```bash fileName=".husky/pre-push"
# Application 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Application 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Utilisation de GitHub Actions

Intlayer fournit une commande CLI pour remplir automatiquement et réviser le contenu des dictionnaires. Cela peut être intégré dans votre flux de travail CI/CD en utilisant GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
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
      - name: ⬇️ Cloner le dépôt
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Configurer Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Installer les dépendances
        run: npm ci

      - name: ⚙️ Construire le projet Intlayer
        run: npx intlayer build

      - name: 🤖 Remplir automatiquement les traductions manquantes
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Créer ou mettre à jour une PR de traduction
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Comme pour Husky, dans le cas d'un monorepo, vous pouvez utiliser l'argument `--base-dir` pour traiter chaque application séquentiellement.

> Par défaut, l'argument `--git-diff` filtre les dictionnaires qui incluent des modifications entre la base (par défaut `origin/main`) et la branche actuelle (par défaut : `HEAD`).

> Pour plus d'informations sur les commandes CLI d'Intlayer et leur utilisation, consultez la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md).
