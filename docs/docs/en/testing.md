---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: Testing your content
description: Discover how to test your content with Intlayer.
keywords:
  - Testing
  - Intlayer
  - Internationalization
  - CMS
  - Content Management System
  - Visual Editor
slugs:
  - doc
  - testing
---

# Testing your content

This guide shows how to automatically verify your dictionaries are complete, catch missing translations before shipping, and test localized UI in your app.

---

## What you can test

- **Missing translations**: fail CI if any required locales are missing for any dictionary.
- **Localized UI rendering**: render components with a specific locale provider and assert on visible text/attributes.
- **Build-time audits**: run a quick audit locally via CLI.

---

## Quick start: audit via CLI

Run the audit from your project root:

```bash
npx intlayer content test
```

Useful flags:

- `--env-file [path]`: load environment variables from a file.
- `-e, --env [name]`: select an environment profile.
- `--base-dir [path]`: set the app base directory for resolution.
- `--verbose`: show verbose logs.
- `--prefix [label]`: prefix log lines.

Note: the CLI prints a detailed report but does not exit non‑zero on failures. For CI gating, add a unit test (below) that asserts zero missing required locales.

---

## Programmatic test (Vitest/Jest)

Use the Intlayer CLI API to assert there are no missing translations for your required locales.

```ts file=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Helpful when the test fails locally or in CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Jest equivalent:

```ts file=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // Helpful when the test fails locally or in CI
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

How it works:

- Intlayer reads your configuration (locales, requiredLocales) and declared dictionaries, then reports:
  - `missingTranslations`: per‑key, which locales are missing and from which file.
  - `missingLocales`: union of all missing locales.
  - `missingRequiredLocales`: subset limited to `requiredLocales` (or all locales if `requiredLocales` is not set).

---

## Testing localized UI (React / Next.js)

Render components under an Intlayer provider and assert on visible content.

React example (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Expected English title")).toBeInTheDocument();
});
```

Next.js (App Router) example: use the framework wrapper:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("renders localized heading in French", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Tips:

- When you need raw string values for attributes (e.g., `aria-label`), access the `.value` field returned by `useIntlayer` in React.
- Keep dictionaries colocated with components for easier unit testing and cleanup.

---

## Continuous Integration

Add a test that fails the build when required translations are missing.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

GitHub Actions example:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Optional: run the CLI audit for a human-readable summary alongside tests:

```bash
npx intlayer content test --verbose
```

---

## Troubleshooting

- Ensure your Intlayer configuration defines `locales` and (optionally) `requiredLocales`.
- If your app uses dynamic or remote dictionaries, run tests in an environment where the dictionaries are available.
- For mixed monorepos, use `--base-dir` to point the CLI at the correct application root.

---

## Doc History

| Version | Date       | Changes                 |
| ------- | ---------- | ----------------------- |
| 6.0.0   | 2025-09-20 | Introduction of testing |
