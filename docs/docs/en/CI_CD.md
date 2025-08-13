---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: CI/CD Integration
description: Learn how to integrate Intlayer into your CI/CD pipeline for automated content management and deployment.
keywords:
  - CI/CD
  - Continuous Integration
  - Continuous Deployment
  - Automation
  - Internationalization
  - Documentation
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
---

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

To learn more about the CMS, refer to the [official documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

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

> For more information about Intlayer CLI commands and their usage, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md).

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
# Trigger conditions for this workflow
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Step 1: Get the latest code from the repository
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Keep credentials for creating PRs
          fetch-depth: 0 # Get full git history for diff analysis

      # Step 2: Set up Node.js environment
      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Use Node.js 20 LTS for stability

      # Step 3: Install project dependencies
      - name: 📦 Install dependencies
        run: npm install

      # Step 4: Install Intlayer CLI globally for translation management
      - name: 📦 Install Intlayer
        run: npm install -g intlayer-cli

      # Step 5: Build the Intlayer project to generate translation files
      - name: ⚙️ Build Intlayer project
        run: npx intlayer build

      # Step 6: Use AI to automatically fill missing translations
      - name: 🤖 Auto-fill missing translations
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Step 7: Check if there are changes and commit them
      - name: � Check for changes
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Step 8: Commit and push changes if any exist
      - name: 📤 Commit and push changes
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: auto-fill missing translations [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

To set up the environment variables, go to GitHub → Settings → Secrets and variables → Actions and add the secret .

> Same as for Husky, in the case of a monorepo, you can use the `--base-dir` argument to sequentially treat each app.

> By default, the `--git-diff` argument filters dictionaries that include changes from base (default `origin/main`) to current branch (default: `HEAD`).

> For more information about Intlayer CLI commands and their usage, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md).

## Doc History

| Version | Date       | Changes      |
| ------- | ---------- | ------------ |
| 5.5.10  | 2025-06-29 | Init history |
