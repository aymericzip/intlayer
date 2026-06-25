---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Vue I18n से Intlayer में माइग्रेट करें"
description: "सीखें कि compat adapter का उपयोग करके अपने Vue एप्लिकेशन को vue-i18n से Intlayer में कैसे माइग्रेट करें।"
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Vue I18n से Intlayer में माइग्रेट करें

यदि आपका Vue एप्लिकेशन वर्तमान में `vue-i18n` का उपयोग करता है, तो आप अपने components को फिर से लिखे बिना या translating hooks के बिना Intlayer में माइग्रेट कर सकते हैं। Intlayer एक compat adapter प्रदान करता है जो `vue-i18n` के API को perfectly mirror करता है जबकि hood के तहत Intlayer की शक्तिशाली features का लाभ उठाता है।

## क्या करें

शुरुआत करने के लिए, बस अपने प्रोजेक्ट में initialization command चलाएं:

```bash
npx intlayer init
```

Initialization के दौरान, Intlayer आपकी configuration file (`intlayer.config.ts`) को सेट अप करेगा और आपके प्रोजेक्ट को migration के लिए तैयार करेगा। आपको बस Intlayer plugin को अपनी Vite configuration में जोड़ना होगा ताकि `vue-i18n` imports को स्वचालित रूप से alias किया जा सके।

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## यह हुड के नीचे क्या करता है

`vueI18nVitePlugin` आपके bundler में एक मॉड्यूल alias को inject करता है। आपके codebase में `vue-i18n` का कोई भी import पारदर्शी रूप से `@intlayer/vue-i18n` पर रीडायरेक्ट किया जाएगा।

**हुड के नीचे, adapter जटिल `vue-i18n` syntax को natively संभालता है:**

- **Interpolation & Plurals:** `{name}` और list `{0}` interpolations को resolve करता है। Pipe plurals (`"car | cars"`) को positional semantics के आधार पर Intlayer enumeration/plural nodes में परिवर्तित किया जाता है।
- **Formats:** `d()` और `n()` जैसे functions हुड के नीचे `Intl` को wrap करते हैं, आपके options में परिभाषित `datetimeFormats` और `numberFormats` को honor करते हुए।
- **Global & Local State:** `global.locale` को एक `WritableComputedRef` पर मैप किया जाता है जो Intlayer client द्वारा समर्थित है, इसलिए reactivity बिल्कुल अपेक्षित रूप से व्यवहार करता है (उदाहरण के लिए `locale.value = 'fr'`)।
- **Directives:** `v-t` directive को register किया जाता है और सामान्य रूप से कार्य करता है।

आपका application पहले की तरह ही बिल्कुल rendering करता रहता है, लेकिन content आपके Intlayer dictionaries द्वारा powered होता है, जो आपको type safety, बेहतर bundle optimization, और seamless CMS integration देता है।
