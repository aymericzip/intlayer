---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: astro-intlayer Package Documentation
description: Astro integration for Intlayer, providing setup for locale-based routing and dictionary management.
keywords:
  - astro-intlayer
  - astro
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# astro-intlayer Package

The `astro-intlayer` package provides the necessary tools to integrate Intlayer into Astro applications. It configures locale-based routing and dictionary management.

## Installation

```bash
npm install astro-intlayer
```

## Exports

### Integration

The `astro-intlayer` package provides an Astro integration to set Intlayer up in your project.

Import:

```tsx
import "astro-intlayer";
```

or add it to `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Function   | Description                                              |
| ---------- | -------------------------------------------------------- |
| `intlayer` | Astro integration that sets Intlayer up in your project. |
