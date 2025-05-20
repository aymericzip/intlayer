# Auto-Generate Translations in a CI/CD Pipeline

Intlayer allows the automatic generation of translations for your content declaration files. There are multiple ways to achieve this depending on your workflow.

## Using the CMS

With Intlayer, you can adopt a workflow where only a single locale is declared locally, while all translations are managed remotely through the CMS. This allows content and translations to be completely detached from the codebase, offering more flexibility for content editors and enabling hot content reloading (no need to rebuild the application to apply changes).

### Example Configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Optional locales will be managed remotely
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // Remote content takes priority

    applicationURL: process.env.APPLICATION_URL, // Application URL used by the CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS credentials
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // Helps ensure consistent translation generation
  },
};

export default config;
```

To learn more about the CMS, refer to the [official documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md).

## Using Husky

You can integrate translation generation into your local Git workflow using [Husky](https://typicode.github.io/husky/).

### Example Configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Optional locales are handled remotely
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Use your own API key

    applicationContext: "This is a test application", // Helps ensure consistent translation generation
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # To ensure dictionaries are up to date
npx intlayer fill --unpushed --mode fill    # Only fill missing content, does not update existing ones
```

> For more information about Intlayer CLI commands and their usage, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md).

> If you have multiple apps in your repo using separate intlayer instances, you can use the `--base-dir` argument like this:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Using GitHub Actions

Intlayer provides a CLI command to autofill and review dictionary content. This can be integrated into your CI/CD workflow using GitHub Actions.

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
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Install dependencies
        run: npm ci

      - name: ⚙️ Build Intlayer project
        run: npx intlayer build

      - name: 🤖 Auto-fill missing translations
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Create or update translation PR
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Same as for Husky, in the case of a monorepo, you can use the `--base-dir` argument to sequentially treat each app.
> By default, the `--git-diff` argument filters dictionaries that include changes from base (default `origin/main`) to current branch (default: `HEAD`).
> For more information about Intlayer CLI commands and their usage, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md).
