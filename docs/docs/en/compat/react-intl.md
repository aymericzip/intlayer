---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from React Intl to Intlayer"
description: "Learn how to migrate your React application from react-intl to Intlayer using the compat adapter."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compat
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from React Intl to Intlayer

If your React application uses `react-intl` (FormatJS), transitioning to Intlayer is a breeze. Our compat layer seamlessly handles ICU MessageFormat and all existing `Formatted*` components.

## What to do

Start by running the initialization command in your project:

```bash
npx intlayer init
```

Then, set up the Intlayer Vite or Next.js plugin in your configuration. This plugin injects build-time aliases to redirect `react-intl` imports to `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## What it does under the hood

The bundler plugin aliases `react-intl` to `@intlayer/react-intl`. Instead of parsing large JSON files manually and wrapping your app in an `IntlProvider`, the Intlayer plugin statically extracts keys and uses Intlayer dictionaries at runtime.

Under the hood:

- **ICU MessageFormat:** Intlayer uses the `resolveMessage(..., 'icu')` resolver which fully supports the ICU pluralization, selection, date/number formatting, and rich text tags natively.
- **Method & JSX callers:** `intl.formatMessage({ id: 'a.b' })` and `<FormattedMessage id="a.b">` are identified by the Intlayer compiler plugins (`@intlayer/babel` / `@intlayer/swc`), converting flat dotted keys so that the first segment correctly resolves to the Intlayer dictionary key.
- **Formatters:** `<FormattedNumber>`, `<FormattedDate>`, etc., bridge over to the native `core/formatters` using `Intl`.
