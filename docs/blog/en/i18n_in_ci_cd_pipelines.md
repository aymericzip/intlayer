---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Automating translations in CI/CD without shipping bad copy"
description: Three places to automate i18n, pre-push, pull request and runtime. How to gate a build on coverage, auto-fill safely, and avoid the CI loop that commits forever.
keywords:
  - automate translations ci
  - i18n ci cd
  - github actions translations
  - husky pre-push
  - continuous localization
  - translation pipeline
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Automating translations in CI/CD without shipping bad copy

Manual translation does not survive contact with a release cadence. Someone adds a string on Friday, the export happens next sprint, and by then three more locales are behind. Automating it is straightforward. Automating it without quietly publishing machine output to customers is the part worth thinking about.

## Table of Contents

<TOC/>

## You do not have to migrate to automate

The pipeline shapes below are library-agnostic, and so is the tooling. If your messages are JSON catalogs for i18next, next-intl, react-intl, vue-i18n or next-translate, the [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) reads and writes those files in place:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // or "icu" for next-intl / react-intl
    }),
  ],
};

export default config;
```

Your app keeps importing what it imports. The CI jobs below then fill and gate your existing catalogs, and the diff a reviewer sees is a change to `locales/fr/checkout.json`, not a migration. There is a [Sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) for gettext workflows, and [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md) if you also want the runtime API to stay unchanged.

## Separate the gate from the fill

Two different jobs get confused constantly.

A **gate** is a check that fails. It says this build must not ship because required locales are missing. It writes nothing.

A **fill** is a mutation. It generates the missing translations and commits them. It never fails a build.

Running only a fill means nothing ever blocks, and machine output flows to production unreviewed. Running only a gate means the build goes red and a human has to unblock it every time. Most teams want both, wired to different triggers: fill on a pull request, gate on merge to the release branch.

## Where automation can live

| Stage          | Trigger   | Good for                                   | Cost                                              |
| :------------- | :-------- | :----------------------------------------- | :------------------------------------------------ |
| Pre-push hook  | Local git | Fast feedback, no CI minutes               | Runs on the developer's machine and their API key |
| Pull request   | CI job    | Review before merge, one place for secrets | CI minutes plus model calls per PR                |
| Release branch | CI job    | Hard gate on coverage                      | Cheap, no model calls                             |
| Runtime        | CMS       | Content changes without a rebuild          | Hosted dependency                                 |

## Pre-push: fastest loop

Husky runs the fill before the code leaves the machine, so the translations arrive in the same push as the strings that needed them.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` limits the work to content that has not been pushed yet, which is what keeps this from taking a minute on every push. `--mode complete` fills what is missing without rewriting entries that already have a value, so a reviewed translation is never silently replaced.

For a monorepo, scope each app:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

The downside is real: every developer needs an API key, and the cost lands on whoever pushes. That is why most teams move this to CI once there are more than a few of them.

## Pull request: fill where the review is

The same work in GitHub Actions, scoped to the diff:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

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
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Four details in there are load-bearing:

- **`fetch-depth: 0`** is required for `--git-diff` to work. A shallow clone has no base to diff against, and the fill silently covers nothing.
- **`[skip ci]` in the commit message** stops the workflow retriggering itself. Without it the job commits, which opens a run, which commits again. This is the classic way to burn a CI budget overnight.
- **`concurrency` with `cancel-in-progress`** stops two pushes racing to write the same files.
- **`--git-diff`** scopes the fill to what changed in the PR. Omit it and you re-translate the whole catalog on every run.

The translations land as a commit on the PR branch, which means a reviewer sees them in the diff. That is the entire point of doing it here rather than after merge.

## Release branch: the gate

The gate needs no model access and should be fast.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Backed by a test that asserts coverage rather than by the CLI report:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` prints a report but exits zero, so it informs and does not gate. Use it locally; use the assertion in CI. More on the distinction in [finding missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/detecting_missing_translations.md).

## `requiredLocales` is what makes the gate survivable

A gate that demands all eighteen locales blocks every release until the slowest language lands, and gets disabled within a month.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Declare the locales you serve, require the ones that block a release. The rest are filled asynchronously and never hold up a deploy.

## Taking translations out of the repo entirely

The other model is to declare one locale in code and manage the rest remotely, through the CMS with Live Sync. Content changes then do not require a rebuild at all, which decouples the copy cadence from the deploy cadence.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

This suits teams where non-developers own the copy. It is a trade, not an upgrade: you gain editor autonomy and lose the property that a git checkout fully describes what the app renders. Details in the [CMS documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

Note that `clientSecret` is a server-side credential. It belongs in CI secrets and in your server environment, never in anything that reaches a client bundle.

## The honest limitation

Everything above automates _coverage_, not _quality_. A machine fill turns a visible gap into an invisible one: the audit goes green because the key now has a value, and nobody read it.

That is acceptable for an internal tool, a changelog, or a beta locale. It is not acceptable for pricing, legal copy, error messages that tell someone their payment failed, or anything a customer reads before deciding. Route those through a human, and use `--mode complete` everywhere so a reviewed string is never overwritten by a later run.

Give the model context so its output is at least consistent:

```ts
ai: {
  applicationContext: "B2B invoicing app. Formal register. Never translate the product name.",
}
```

## Common mistakes

- **No `[skip ci]` on the auto-commit.** The job retriggers itself in a loop.
- **Shallow clone with `--git-diff`.** No base to diff, so nothing is filled and nothing complains.
- **Filling the whole catalog every run.** Scope with `--git-diff` or `--unpushed` or watch the bill.
- **Using the CLI report as a gate.** It exits zero.
- **Requiring every locale.** The gate gets removed the first time it blocks a release.
- **A fill job with no gate anywhere.** Nothing ever fails, so machine copy reaches production unreviewed.
- **Model API keys in the repo.** They belong in CI secrets, same as `clientSecret`.

## Going further

- [CI/CD: auto-generating translations with Husky, GitHub Actions and the CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md)
- [Testing your content and gating a build on coverage](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/testing.md)
- [autoFill: generating per-locale declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/autoFill.md)
- [Configuration reference: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Benchmark reports across frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md)
- [Drop-in i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md)
- [How to find missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/detecting_missing_translations.md)
- [How to test translations without brittle tests](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_testing_strategies.md)
