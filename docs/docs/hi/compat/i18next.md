---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "i18next से Intlayer में माइग्रेट करें"
description: "Learn how to migrate your Vanilla JS/TS application from i18next to Intlayer using the compat adapter."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# i18next से Intlayer में माइग्रेट करें

विस्तृत चरण-दर-चरण ट्यूटोरियल के लिए, कृपया हमारी संपूर्ण [i18next Migration Guide](../migration_from_i18next_to_intlayer.md) देखें।

Intlayer perfectly replicates the core runtime characteristics of `i18next`. compat package का उपयोग करके, आपके Vanilla applications या internal modules परिचित syntax का लाभ उठाना जारी रख सकते हैं।

## क्या करें

शुरुआत करने के लिए, अपनी project में Intlayer को initialize करें:

```bash
npx intlayer init
```

यदि आप Vite का उपयोग कर रहे हैं, तो `@intlayer/i18next` के लिए imports को route करने के लिए Intlayer plugin को शामिल करें:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## यह हुड के नीचे क्या करता है

`i18nextVitePlugin` `i18next` imports को `@intlayer/i18next` के लिए alias करता है, JSON फ़ाइल inclusions से bundle bloat को रोकता है।

हुड के नीचे:

- **Instance configuration:** `createInstance` namespace fallbacks को सही तरीके से parse और apply करता है जबकि dictionary retrieval के लिए Intlayer के compilation pipeline का लाभ उठाता है।
- **Interpolation:** `{{name}}` replacements और `$t(key)` nesting के लिए native support recursively।
- **Context & Plurals:** `key_male` और `key_one`/`key_other` जैसे suffix formats को identify और resolve करता है, standard `Intl.PluralRules` के विरुद्ध evaluate करते हुए।
- **Return objects:** `returnObjects: true` mode safely Intlayer dictionaries से trees को extract करता है।
