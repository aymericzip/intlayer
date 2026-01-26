---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: astro-intlayer पैकेज दस्तावेज़
description: Intlayer के लिए Astro इंटीग्रेशन, जो locale-आधारित राउटिंग और डिक्शनरी प्रबंधन की सेटअप प्रदान करता है।
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
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत दस्तावेज़ीकरण
---

# astro-intlayer पैकेज

`astro-intlayer` पैकेज Intlayer को Astro एप्लिकेशनों में इंटीग्रेट करने के लिए आवश्यक टूल प्रदान करता है। यह locale-आधारित राउटिंग और डिक्शनरी प्रबंधन को कॉन्फ़िगर करता है।

## इंस्टॉलेशन

```bash
npm install astro-intlayer
```

## एक्सपोर्ट्स

### इंटीग्रेशन

astro-intlayer पैकेज आपके प्रोजेक्ट में Intlayer सेटअप करने के लिए एक Astro integration प्रदान करता है।

इम्पोर्ट:

```tsx
import "astro-intlayer";
```

या `astro.config.mjs` में जोड़ें:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| फ़ंक्शन    | विवरण                                                              |
| ---------- | ------------------------------------------------------------------ |
| `intlayer` | Astro integration जो आपके प्रोजेक्ट में Intlayer को सेटअप करता है। |
