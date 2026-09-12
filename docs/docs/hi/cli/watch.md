---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: डिक्शनरी देखें
description: जानें कि अपनी कंटेंट घोषणा फ़ाइलों में परिवर्तनों को कैसे देखें और स्वचालित रूप से डिक्शनरी बनाएं।
keywords:
  - देखें
  - डिक्शनरी
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author: aymericzip
---

# डिक्शनरी देखें

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

यह कमांड आपकी कंटेंट घोषणा फ़ाइलों में परिवर्तनों को देखेगा और `.intlayer` निर्देशिका में डिक्शनरी बनाएगा।
यह कमांड `npx intlayer build --watch --skip-prepare` के समान है।

## उपनाम:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## तर्क:

- **`--with`**: watch के साथ समानांतर में कमांड शुरू करें।

> उदाहरण: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: मोनोरेपो के हर Intlayer प्रोजेक्ट में कमांड चलाता है (प्रोजेक्ट डायरेक्टरी से चलाने पर केवल वर्तमान प्रोजेक्ट में)। प्रति-प्रोजेक्ट क्रेडेंशियल `INTLAYER_PROJECT_CREDENTIALS` के माध्यम से इंजेक्ट किए जा सकते हैं, जो प्रोजेक्ट पाथ को `{ "clientId", "clientSecret" }` से मैप करने वाला JSON ऑब्जेक्ट है।

> उदाहरण: `npx intlayer watch --ci`
